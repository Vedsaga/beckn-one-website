<template>
	<PostLoginHeader />
	<div class="main">
		<div class="main-progress">
			<CurvedButton
				@click="setTab('participantInfoPage')"
				:class="[participantInfoPage && participantInfoDone ? 'main-progress-tab-done' : 'main-progress-tab']"
			>
				Participant Info
				<img v-if="participantInfoDone" src="../assets/svgs/success.svg" alt="success" />
			</CurvedButton>
			<div :class="[participantInfoDone ? 'main-progress-line-done' : 'main-progress-line']"></div>
			<CurvedButton
				@click="setTab('networkRolePage')"
				:disabled="!networkRolePage"
				:class="[networkRolePage && networkRoleDone ? 'main-progress-tab-done' : 'main-progress-tab']"
			>
				Network Role
				<img v-if="networkRoleDone" src="../assets/svgs/success.svg" alt="success" />
			</CurvedButton>
			<div :class="[networkRoleDone ? 'main-progress-line-done' : 'main-progress-line']"></div>
			<CurvedButton
				@click="setTab('participationKeyPage')"
				:disabled="!participationKeyPage"
				:class="[participationKeyPage && participationKeyDone ? 'main-progress-tab-done' : 'main-progress-tab']"
			>
				Participation Key
				<img v-if="participationKeyDone" src="../assets/svgs/success.svg" alt="success" />
			</CurvedButton>
		</div>
		<section class="main-progress-content" v-if="currentTab === 'participantInfoPage'">
			<CustomInput id="ParticipantID" placeholder="example.myID.com" v-model="participantID" />
			<div class="main-progress-content-info">
				<img src="@/assets/svgs/info.svg" alt="" />
				<p>this will be the ID of the participant you want to create.</p>
			</div>
			<CurvedButton class="main-progress-content-margin" @click="newNetworkParticipant"> Save & Next</CurvedButton>
		</section>
		<section v-if="currentTab === 'networkRolePage'">
			<Dropdown
				:get-selected-element="getNetworkDomain"
				:list-of-elements="ListOfNetworkDomains"
				label-name=" Network Domain"
				@click="getNetworkDomainList"
			></Dropdown>
			<Dropdown
				:get-selected-element="getNetworkRole"
				:list-of-elements="ListOfNetworkRoles"
				label-name="Role Type"
			></Dropdown>
			<Dropdown
				:get-selected-element="getRoleStatus"
				:list-of-elements="ListOfRoleStatus"
				label-name="Role Status"
			></Dropdown>
			<CurvedButton @click="createNetworkRole(networkDomain)"> Save & Next</CurvedButton>
		</section>

		<section class="main-key" v-if="currentTab === 'participationKeyPage'">
			<p>To generate <strong>Participant Key</strong> click below button</p>
			<CurvedButton>
				Generate Key
				<img src="../assets/svgs/key.svg" alt="success" />
			</CurvedButton>
		</section>
	</div>
</template>

<script>
import axios from "@/axios";
import api_map from "@/axios/api_map";
import PostLoginHeader from "@/components/headers/PostLoginHeader";
import CustomInput from "@/components/inputs/CustomInput";
import CurvedButton from "@/components/buttons/CurvedButton";
import Dropdown from "@/components/dropdown/dropdown";

export default {
	name: "CreateParticipant",
	components: {
		PostLoginHeader,
		CustomInput,
		CurvedButton,
		Dropdown,
	},
	data() {
		return {
			currentTab: "participantInfoPage",
			participantID: null,
			participantDetails: null,
			participantInfoPage: true,
			participantInfoDone: false,
			networkRolePage: false,
			networkRoleDone: false,
			participationKeyPage: false,
			participationKeyDone: false,
			networkDomain: null,
			domainID: null,
			ListOfNetworkDomains: [],
			ListOfMapOfNetworkDomains: [],
			networkRole: null,
			ListOfNetworkRoles: ["BAP", "BPP", "BG", "LREG", "CREG", "RREG"],
			roleStatus: null,
			ListOfRoleStatus: ["INITIATED", "SUBSCRIBED", "UNDER_SUBSCRIPTION", "UNSUBSCRIBED", "INVALID_SSL"],
			url: null,
			subscriberId: null,
			networkRoleDetails: null,
		};
	},

	methods: {
		getNetworkRole: function (element) {
			this.networkRole = element;
		},
		getNetworkDomain: function (element) {
			this.networkDomain = element;
		},
		getRoleStatus: function (element) {
			this.roleStatus = element;
		},
		newNetworkParticipant: async function () {
			await axios
				.post(api_map.newNetworkParticipant, {
					participant_id: this.participantID,
				})
				.then((response) => {
					// if response.status is 200 then route to the dashboard
					if (response.status !== 200) {
						console.log("Error: " + response.status);
						return;
					}

					this.participantDetails = response.data["network_participants"][0];
					this.participantInfoDone = true;
					this.networkRolePage = true;
					this.currentTab = "networkRolePage";
					this.subscriberId = this.participantID;
				})
				.catch((error) => {
					console.log(error);
				});
		},

		setTab: function (tab) {
			this.currentTab = tab;
		},
		getNetworkDomainList: async function () {
			axios
				.get(api_map.networkDomainsList)
				.then((response) => {
					// if response.status is 200 then route to the dashboard
					if (response.status !== 200) {
						console.log("Error: " + response.status);
						return;
					}

					const rawData = response.data["network_domains"];
					if (rawData.length === 0) return;

					this.ListOfNetworkDomains = [];
					this.ListOfMapOfNetworkDomains = [];

					for (let index in rawData) {
						this.ListOfMapOfNetworkDomains.push({
							domain: rawData[index]["name"],
							network_domain_id: rawData[index]["id"],
						});
						this.ListOfNetworkDomains.push(rawData[index]["name"]);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		setDomainID: function (domain) {
			for (let index in this.ListOfMapOfNetworkDomains) {
				if (this.ListOfMapOfNetworkDomains[index]["domain"] === domain) {
					this.domainID = this.ListOfMapOfNetworkDomains[index]["network_domain_id"];
				}
			}
		},
		createNetworkRole: async function (domain) {
			this.setDomainID(domain);
			await axios
				.post(api_map.singleNetworkParticipant + this.participantDetails["id"] + api_map.newNetworkRole, {
					network_domain_id: this.domainID,
					type: this.networkRole,
					status: this.roleStatus,
					subscriber_id: this.subscriberId,
					url: this.url,
					network_participant_id: this.participantDetails["id"],
				})
				.then((response) => {
					if (response.status !== 200) {
						console.log("Error: " + response.status);
						return;
					}

					this.networkRoleDetails = response.data["network_roles"][0];
					this.networkRoleDone = true;
					this.participationKeyPage = true;
					this.currentTab = "participationKeyPage";
				})
				.catch((error) => {
					console.log(error);
					console.log(error.response);
				});
		},
	},
};
</script>

<style lang="scss" scoped>
.main {
	display: flex;
	flex-direction: column;
	margin: 4.2em auto 5em auto;
	align-items: flex-start;
	border: #df0000 solid 1px;
	max-height: max-content;

	&-progress {
		border: black solid 1px;
		height: 3em;
		margin: 0 auto 6em auto;
		//border: var(--red-color) solid 1px;
		width: max-content;
		align-items: center;
		justify-content: space-evenly;
		display: flex;
		flex-direction: row;

		&-tab {
			display: flex;
			background: var(--black-color);
			box-shadow: none;
			gap: 0.8rem;
			transition: all 0.5s ease-in-out;

			&-done {
				display: flex;
				background: var(--green-color);
				box-shadow: none;
				gap: 0.8rem;
				transition: all 0.5s ease-in-out;
			}
		}

		&-line {
			border: 2px dashed #9d9d9d;
			width: 14.5em;
			transition: all 0.5s ease-in-out;

			&-done {
				width: 14.5em;
				border: 2px dashed var(--green-color);
				transition: all 0.5s ease-in-out;
			}
		}

		&-content {
			display: grid;
			grid-gap: 1em;

			&-margin {
				margin: 0 auto;
			}

			&-info {
				display: grid;
				grid-auto-flow: column;
				width: 23rem;
				grid-gap: 1.25em;
				align-items: center;
				font-size: 0.5rem;
				color: var(--info-text-color);
			}
		}

		&-key {
			display: flex;
			width: max-content;
			flex-direction: column;
			margin: auto;
			align-items: center;
			position: relative;
			z-index: 100;
			bottom: 20em;
			float: top;
		}
	}
}
</style>
