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
			<CustomInput
				id="ParticipantID"
				placeholder="example.myID.com"
				v-model="participantID"
				label-id="participantId"
				label-text="Please Enter Participant Id"
				type="text"
			/>
			<div class="main-progress-participant-info">
				<img src="@/assets/svgs/info.svg" alt="" />
				<p>participant Id can be of your choices. This id will be your Subscriber Id too.</p>
			</div>
			<CurvedButton v-if="participantInfoDone !== true" @click="newNetworkParticipant"> Save & Next </CurvedButton>
			<CurvedButton id="edit" v-if="participantInfoDone === true" @click="participantInfoDone = false">
				<img src="@/assets/svgs/edit.svg" alt="" />
				Edit
			</CurvedButton>
		</section>
		<section class="main-progress-role" v-if="currentTab === 'networkRolePage'">
			<div v-if="networkRoleDone === true" class="main-grid">
				<div class="main-grid-button">
					<SquareButton @click="networkRoleDone = false">
						Create
						<img alt="create icon" src="@/assets/svgs/create.svg" />
					</SquareButton>
				</div>
				<div class="main-grid-info">
					<CustomTable v-model="tableData" edit="" :remove="removeNetworkRole"></CustomTable>
				</div>
			</div>
			<div v-if="networkRoleDone !== true" class="main-progress-role-input">
				<Dropdown
					:list-of-elements="ListOfNetworkDomains"
					label-name=" Network Domain"
					id="domain"
					v-model="networkDomain"
				>
				</Dropdown>
				<Dropdown :list-of-elements="ListOfNetworkRolesOptions" label-name="Role Type" id="roles" v-model="networkRole">
					>
				</Dropdown>
				<CustomInput
					label-id="subscriberID"
					label-text="Subscriber Id"
					:placeholder="subscriberId"
					v-model="subscriberId"
					type="text"
				></CustomInput>
				<CustomInput
					type="url"
					label-text="Please Enter URL"
					label-id="url"
					placeholder="example.myUrl.com"
					v-model="url"
				/>
				<Dropdown
					:list-of-elements="ListOfRoleStatus"
					label-name="Role Status"
					id="status"
					v-model="roleStatus"
				></Dropdown>
			</div>
			<div id="actions">
				<CurvedButton v-if="networkRoleDone !== true" @click="createNetworkRole(networkDomain)">
					Save & Next
				</CurvedButton>
				<CurvedButton id="cancel" v-if="networkRoleDone !== true" @click="networkRoleDone = true"> Cancel</CurvedButton>
			</div>
		</section>
		<section class="main-key" v-if="currentTab === 'participationKeyPage'">
			<p>To generate <strong>Participant Key</strong> click below button</p>
			<CurvedButton>
				Generate Key
				<img src="../assets/svgs/key.svg" alt="success" />
			</CurvedButton>
			<CustomTextArea id="testing" label="testing" placeholder="testing...." v-model="testing"></CustomTextArea>
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
import CustomTable from "@/components/tabel/CustomTable";
import SquareButton from "@/components/buttons/SquareButton";
import router from "@/router";
import CustomTextArea from "@/components/inputs/CustomTextArea";
import { computed, provide, ref } from "vue";

export default {
	name: "CreateParticipant",
	components: {
		PostLoginHeader,
		CustomInput,
		CurvedButton,
		Dropdown,
		CustomTable,
		SquareButton,
		CustomTextArea,
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
			domainDescription: null,
			ListOfNetworkDomains: [],
			ListOfMapOfNetworkDomains: [],
			networkRole: null,
			ListOfNetworkRolesOptions: ["BAP", "BPP", "BG", "LREG", "CREG", "RREG"],
			roleStatus: null,
			ListOfRoleStatus: ["INITIATED", "SUBSCRIBED", "UNDER_SUBSCRIPTION", "UNSUBSCRIBED", "INVALID_SSL"],
			url: null,
			subscriberId: null,
			listOfNetworkRolesCreated: [],
			tableData: [],
		};
	},
	provide() {
		const dataArray = ref(
			computed(() => {
				return this.tableData;
			})
		);
		provide(
			"dataArray",
			computed(() => dataArray)
		);
		return {
			dataArray,
		};
	},
	methods: {
		filterDataForTable(data) {
			const toBeIncludes = ["domainDescription", "roleType", "subscriberId", "url", "status"];
			if (data.length) {
				return data.map((item) => {
					const newItem = [];
					toBeIncludes.forEach((key) => {
						newItem.push(item[key]);
					});
					// tableData is array which contain collection of arrays
					// loop over tableData and then loop over tableData[index]
					// if subscriberId is in tableData then update the value of that key
					if (this.tableData.length) {
						for (let i = 0; i < this.tableData.length; i++) {
							console.log(this.tableData[i]["subscriberId"]);
							const tableDataItem = this.tableData[i];
							if (tableDataItem.includes(newItem)) {
								for (let j = 0; j < tableDataItem.length; j++) {
									if (tableDataItem[j] === newItem[j]) {
										tableDataItem[j] = newItem[j];
									}
								}
								return;
							}
						}
					}
					if (!this.tableData.length) {
						this.tableData.push(newItem);
					}
				});
			}
		},
		newNetworkParticipant: async function () {
			await axios
				.post(api_map.newNetworkParticipant, {
					participant_id: this.participantID,
				})
				.then((response) => {
					// if response.status is 200 then route to the dashboard
					if (response.status === 400) {
						alert("Participant ID already exists");
						return;
					}
					if (response.status > 400 && response.status < 500) {
						alert("Bad Request Try Again");
						return;
					}
					if (response.status >= 500) {
						alert("Internal Server Error");
						router.push("/error");
						return;
					}
					this.participantDetails = response.data["network_participants"][0];
					this.getNetworkDomainList();
					// wait for 1 second
					setTimeout(() => {
						this.getNetworkRolesList(this.participantDetails["id"]);
					}, 1000);
					setTimeout(() => {
						this.participantInfoDone = true;
						this.networkRolePage = true;
						this.currentTab = "networkRolePage";
						this.subscriberId = this.participantID;
					}, 2000);
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
							id: rawData[index]["id"],
							description: rawData[index]["description"],
						});
						this.ListOfNetworkDomains.push(rawData[index]["name"]);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		setDomainDetails: function (domain) {
			for (let index in this.ListOfMapOfNetworkDomains) {
				if (this.ListOfMapOfNetworkDomains[index]["domain"] === domain) {
					this.domainID = this.ListOfMapOfNetworkDomains[index]["id"];
					this.domainDescription = this.ListOfMapOfNetworkDomains[index]["description"];
				}
			}
		},
		returnFromListOfMapOfNetworkDomains: function (searchBy, value, askFor) {
			if (searchBy && value && askFor) {
				const ListOfMapOfNetworkDomains = this.ListOfMapOfNetworkDomains;
				for (let index in ListOfMapOfNetworkDomains) {
					if (ListOfMapOfNetworkDomains[index][searchBy] === value) {
						return ListOfMapOfNetworkDomains[index][askFor];
					}
				}
			}
		},
		returnFromListOfNetworkRolesCreated: function (searchBy, value, askFor) {
			if (searchBy && value && askFor) {
				const listOfNetworkRolesCreated = this.listOfNetworkRolesCreated;
				for (let index in listOfNetworkRolesCreated) {
					if (listOfNetworkRolesCreated[index][searchBy] === value) {
						return listOfNetworkRolesCreated[index][askFor];
					}
				}
			}
		},
		createNetworkRole: async function (domain) {
			this.setDomainDetails(domain);
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
					this.filterNetworkRole(response.data["network_roles"], "single");
					this.networkRoleDone = true;
					this.participationKeyPage = true;
					this.currentTab = "participationKeyPage";
				})
				.catch((error) => {
					console.log(error);
					console.log(error.response);
				});
		},
		removeNetworkRole: async function (subscriberId) {
			const roleId = this.returnFromListOfNetworkRolesCreated("subscriberId", subscriberId, "roleId");
			axios
				.post(api_map.singleNetworkParticipant + this.participantDetails["id"] + api_map.removeNetworkRole + roleId)
				.then((response) => {
					if (response.status !== 200) {
						console.log("Error: " + response.status);
						return;
					}
					console.log("---------list----before------------", this.listOfNetworkRolesCreated);
					console.log("------tableData-- After---", this.tableData);
					this.removeNetworkRoleFromList(subscriberId);
					console.log("---------list----before------------", this.listOfNetworkRolesCreated);
					console.log("------tableData-- After---", this.tableData);
				})
				.catch((error) => {
					console.log(error);
					console.log(error.response);
				});
		},
		removeNetworkRoleFromList: function (subscriberId) {
			this.listOfNetworkRolesCreated = this.listOfNetworkRolesCreated.filter(
				(participant) => participant.subscriberId !== subscriberId
			);
			this.tableData = this.tableData.filter((participant) => participant.subscriberId !== subscriberId);
		},
		filterNetworkRole: function (data, type) {
			if (data.length) {
				if (this.returnFromListOfNetworkRolesCreated("id", data["id"], "id")) {
					console.log("Already Exists");
					return;
				}
				if (type === "multiple") {
					for (let index in data) {
						this.listOfNetworkRolesCreated.push({
							createdAt: data[index]["created_at"],
							networkRoleId: data[index]["id"],
							domainId: data[index]["network_domain"]["id"],
							domainDescription: this.returnFromListOfMapOfNetworkDomains(
								"id",
								data[index]["network_domain"]["id"],
								"description"
							),
							roleId: data[index]["id"],
							status: data[index]["status"],
							subscriberId: data[index]["subscriber_id"],
							roleType: data[index]["type"],
							updatedAt: data[index]["updated_at"],
							url: data[index]["url"],
						});
					}
				}

				if (type === "single") {
					const _data = data[0];
					this.listOfNetworkRolesCreated.push({
						createdAt: _data["created_at"],
						networkRoleId: _data["id"],
						domainId: _data["network_domain"]["id"],
						domainDescription: this.returnFromListOfMapOfNetworkDomains(
							"id",
							_data["network_domain"]["id"],
							"description"
						),
						roleId: _data["id"],
						status: _data["status"],
						subscriberId: _data["subscriber_id"],
						roleType: _data["type"],
						updatedAt: _data["updated_at"],
						url: this.url,
					});
				}
				this.filterDataForTable(this.listOfNetworkRolesCreated);
				this.networkRolePage = true;
				this.networkRoleDone = true;
			}
		},
		getNetworkRolesList: async function (id) {
			axios
				.get(api_map.singleNetworkParticipant + id + api_map.networkRolesCreatedList)
				.then((response) => {
					// if response.status is 200 then route to the dashboard
					if (response.status !== 200) {
						console.log("Error: " + response.status);
						return;
					}
					if (response.data["network_roles"][0] !== undefined) {
						this.filterNetworkRole(response.data["network_roles"], "multiple");
					}
				})
				.catch((error) => {
					console.log(error);
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
	max-height: max-content;

	&-grid {
		display: flex;
		justify-content: space-between;
		gap: 1em;

		&-info {
			display: flex;
			flex-flow: row wrap;
			width: 100%;
			gap: 3rem;
		}

		&-buttons {
			height: 14.625em;
			display: grid;
			padding: 1rem;
		}
	}

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
				grid-template-columns: repeat(3, 1fr);
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

#actions {
	display: flex;
	gap: 3.5em;
}

#edit {
	background: var(--light-blue);
}

#cancel {
	background: var(--dark-red);
}
</style>
