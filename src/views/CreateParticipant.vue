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
		<section class="main-progress-participant" v-if="currentTab === 'participantInfoPage'">
			<CustomInput id="ParticipantID" placeholder="example.myID.com" v-model="participantID"
			             :get-value="getParticipantId" label-id="participantId" label-text="Please Enter Participant Id"
			             type="text" />
			<div class="main-progress-participant-info">
				<img src="@/assets/svgs/info.svg" alt="" />
				<p>participant Id can be of your choices. This id will be your Subscriber Id too.</p>
			</div>
			<CurvedButton class="main-progress-participant-margin" @click="newNetworkParticipant"> Save & Next</CurvedButton>
		</section>
		<section class="main-progress-role" v-if="currentTab === 'networkRolePage'">
			<div class="main-progress-role-input">
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
				<CustomInput :get-value="getSubscriberId" label-id="subscriberID" label-text="Subscriber Id"
				             :placeholder="subscriberId" type="text"></CustomInput>
				<CustomInput type="url" label-text="Please Enter URL" label-id="url" :get-value="getUrl" placeholder="example.myUrl.com" />
				<Dropdown
						:get-selected-element="getRoleStatus"
						:list-of-elements="ListOfRoleStatus"
						label-name="Role Status"
				></Dropdown>
			</div>
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
		Dropdown
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
			networkRoleDetails: null
		};
	},

	methods: {
		getParticipantId(value) {
			this.participantID = value;
		},
		getSubscriberId(value) {
			this.subscriberId = value;
		},
		getUrl(value) {
			this.url = value;
		},
		getNetworkRole: function(element) {
			this.networkRole = element;
		},
		getNetworkDomain: function(element) {
			this.networkDomain = element;
		},
		getRoleStatus: function(element) {
			this.roleStatus = element;
		},
		newNetworkParticipant: async function() {
			await axios
					.post(api_map.newNetworkParticipant, {
						participant_id: this.participantID
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

		setTab: function(tab) {
			this.currentTab = tab;
		},
		getNetworkDomainList: async function() {
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
								network_domain_id: rawData[index]["id"]
							});
							this.ListOfNetworkDomains.push(rawData[index]["name"]);
						}
					})
					.catch((error) => {
						console.log(error);
					});
		},
		setDomainID: function(domain) {
			for (let index in this.ListOfMapOfNetworkDomains) {
				if (this.ListOfMapOfNetworkDomains[index]["domain"] === domain) {
					this.domainID = this.ListOfMapOfNetworkDomains[index]["network_domain_id"];
				}
			}
		},
		createNetworkRole: async function(domain) {
			this.setDomainID(domain);
			await axios
					.post(api_map.singleNetworkParticipant + this.participantDetails["id"] + api_map.newNetworkRole, {
						network_domain_id: this.domainID,
						type: this.networkRole,
						status: this.roleStatus,
						subscriber_id: this.subscriberId,
						url: this.url,
						network_participant_id: this.participantDetails["id"]
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
		}
	}
};
</script>

<style lang="scss" scoped>
.main {
	display: flex;
	flex-direction: column;
	margin: 4.2em auto 5em auto;
	max-height: max-content;

	&-progress {
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
			background: var(--dark-bg-header);
			box-shadow: none;
			gap: 0.8rem;
			transition: all 0.5s ease-in-out;
			color: var(--info-text);

			&-done {
				display: flex;
				background: var(--light-green);
				box-shadow: none;
				gap: 0.8rem;
				transition: all 0.5s ease-in-out;
			}
		}

		&-line {
			border: 2px dashed var(--gray-complement);
			width: 14.5em;
			transition: all 0.5s ease-in-out;

			&-done {
				width: 14.5em;
				border: 2px dashed var(--light-green);
				transition: all 0.5s ease-in-out;
			}
		}

		&-participant {
			display: grid;
			grid-gap: 1em;
			margin-right: auto;

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
				color: var(--info-text);
			}
		}

		&-role {
			display: grid;
			height: max-content;
			gap: 5em;
			grid-template-rows: repeat(2, 1fr);
			position: relative;

			&-input {
				display: grid;
				grid-template-columns: repeat( 3, 1fr);
				gap: 3rem;
				flex-flow: row wrap;
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
