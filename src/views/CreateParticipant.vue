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
		<div class="main-content">
			<section v-if="currentTab === 'participantInfoPage'">
				<label for="ParticipantID">Please Enter Participant ID</label>
				<CustomInput id="ParticipantID" placeholder="example.myID.com" v-model="participantID" />
				<CurvedButton @click="newNetworkParticipant"> Save & Next</CurvedButton>
			</section>
			<section v-if="currentTab === 'networkRolePage'">
				<div>
					<label for="networkDomain">Please Select Network Domain</label>
					<select class="dropdown" id="networkDomain" v-model="networkDomain" @click="getNetworkDomainList">
						<option
							class="dropdown-options"
							v-for="(domain, index) in ListOfNetworkDomains"
							:key="index"
							:value="domain"
						>
							{{ domain }}
						</option>
					</select>
				</div>
				<div>
					<label for="networkRole">Please Select Network Role</label>
					<select class="dropdown" id="networkRole" v-model="networkRole">
						<option v-for="(role, index) in ListOfNetworkRoles" :key="index" :value="role">{{ role }}</option>
					</select>
				</div>
				<div>
					<label for="roleStatus">Please Select Status</label>
					<select class="dropdown" id="roleStatus" v-model="roleStatus">
						<option v-for="(roleStatus, index) in ListOfRoleStatus" :key="index" :value="roleStatus">
							{{ roleStatus }}
						</option>
					</select>
				</div>
				<label for="subscriberId">Subscriber Id</label>
				<CustomInput id="subscriberId" placeholder="example.myID.com" v-model="subscriberId" />
				<label for="enterURL">Please Enter URL</label>
				<CustomInput id="enterURL" placeholder="example.myID.com" v-model="url" />
				<CurvedButton @click="createNetworkRole(networkDomain)"> Save & Next</CurvedButton>
			</section>
		</div>
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

export default {
	name: "CreateParticipant",
	components: {
		PostLoginHeader,
		CustomInput,
		CurvedButton,
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
			console.log(this.participantDetails);
			console.log(this.participantDetails["id"]);
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
.dropdown {
	display: flex;
	width: 21em;
	height: 4em;
	border: none;
	border-radius: var(--box-radius--normal);
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
	background: var(--white-color);
	font-family: "Montserrat", sans-serif;
	font-size: 0.812rem;
}
.main {
	display: grid;
	margin: 4.2em auto 5em auto;
	align-items: flex-start;

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
	}

	&-content {
		display: flex;
		width: 23em;
		height: 23em;
		flex-direction: column;
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
</style>
