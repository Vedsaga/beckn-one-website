<template>
	<div class="modal-wrapper" :class="{ show }">
		<div class="modal">
			<h1>Want to Delete?</h1>
			<p>Are you sure you want to delete?</p>
			<div class="modal-buttons">
				<button id="no" @click="changeShow">cancel</button>
				<button id="delete" @click="removeCollection(toBeDeleted, page.currentTab)">yes</button>
			</div>
		</div>
	</div>
	<PostLoginHeader />
	<div class="main">
		<div class="main-progress">
			<CurvedButton
				@click="setTab('participantInfoPage')"
				:class="[page.participantInfoPage && page.participantInfoDone ? 'main-progress-tab-done' : 'main-progress-tab']"
			>
				Participant Info
				<img v-if="page.participantInfoDone" src="../assets/svgs/success.svg" alt="success" />
			</CurvedButton>
			<div :class="[page.participantInfoDone ? 'main-progress-line-done' : 'main-progress-line']"></div>
			<CurvedButton
				@click="setTab('networkRolePage')"
				:disabled="!page.networkRolePage"
				:class="[page.networkRoleDone && !page.editNetworkRolePage ? 'main-progress-tab-done' : 'main-progress-tab']"
			>
				Network Role
				<img v-if="page.networkRoleDone && !page.editNetworkRolePage" src="../assets/svgs/success.svg" alt="success" />
			</CurvedButton>
			<div :class="[page.networkRoleDone ? 'main-progress-line-done' : 'main-progress-line']"></div>
			<CurvedButton
				@click="setTab('participationKeyPage')"
				:disabled="!page.participationKeyPage"
				:class="[
					page.participationKeyPage && page.participationKeyDone ? 'main-progress-tab-done' : 'main-progress-tab',
				]"
			>
				Participation Key
				<img v-if="page.participationKeyDone" src="../assets/svgs/success.svg" alt="success" />
			</CurvedButton>
		</div>
		<section class="main-progress-participant" v-if="page.currentTab === 'participantInfoPage'">
			<CustomInput
				id="ParticipantID"
				placeholder="example.myID.com"
				v-model="participant.id"
				label-id="participantId"
				label-text="Please Enter Participant Id"
				type="text"
			/>
			<div class="main-progress-participant-info">
				<img src="@/assets/svgs/info.svg" alt="" />
				<p>participant Id can be of your choices. This id will be your Subscriber Id too.</p>
			</div>
			<CurvedButton v-if="page.participantInfoDone !== true" @click="newNetworkParticipant"> Save & Next</CurvedButton>
			<CurvedButton id="edit" v-if="page.participantInfoDone === true" @click="page.participantInfoDone = false">
				<img src="@/assets/svgs/edit.svg" alt="" />
				Edit
			</CurvedButton>
		</section>
		<section class="main-progress-role" v-if="page.currentTab === 'networkRolePage'">
			<div v-if="page.networkRoleDone && !page.editNetworkRolePage" class="main-grid">
				<div class="main-grid-buttons">
					<SquareButton @click="editOrNot">
						Create
						<img alt="create icon" src="@/assets/svgs/create.svg" />
					</SquareButton>
				</div>
				<CustomTable
					v-model:data-array="listOfNetworkRolesCreated"
					:remove="changeShow"
					:edit="setDataValueOnClickEdit"
					:header-list="table.headerForRolePage"
					:to-be-shown="table.toBeShownForRolePage"
					button-message="CREATE BUTTON"
					head-warning="No Role have been defined yet!"
					warning="Please create role by clicking on "
					index="2"
					:route-to-this-id="routeToThisPage"
				>
				</CustomTable>
			</div>
			<div v-if="page.networkRolePage && page.editNetworkRolePage" class="main-progress-role-input">
				<Dropdown
					:list-of-elements="networkDomain.list"
					label-name=" Network Domain"
					id="domain"
					v-model="networkDomain.id"
				>
				</Dropdown>
				<Dropdown :list-of-elements="ListOfNetworkRolesOptions" label-name="Role Type" id="roles" v-model="networkRole">
					>
				</Dropdown>
				<CustomInput
					label-id="subscriberID"
					label-text="Subscriber Id"
					placeholder="example.subscriberId.com"
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
			<div class="actions" v-if="page.editNetworkRolePage">
				<CurvedButton @click="createNetworkRole(networkDomain.id)">Save & Next</CurvedButton>
				<CurvedButton id="cancel" @click="editOrNot"> Cancel</CurvedButton>
			</div>
		</section>
		<section class="main-grid" v-if="page.currentTab === 'participationKeyPage'">
			<div class="main-grid-buttons">
				<SquareButton class="generateKey" @click="generateKey">
					Generate
					<img alt="create icon" src="@/assets/svgs/key.svg" />
				</SquareButton>
				<SquareButton @click="showPopup" class="enterKey">
					Enter
					<img alt="create icon" src="@/assets/svgs/key.svg" />
				</SquareButton>
			</div>
			<CustomTable
				v-model:data-array="listOfParticipantKeys"
				:remove="changeShow"
				:edit="showPopup"
				:header-list="table.headerForParticipantKeyPage"
				:to-be-shown="table.toBeShownForParticipantPage"
				button-message="ENTER or GENERATE BUTTON"
				head-warning="No Key have been created yet!"
				warning="Please create key by clicking on "
				index="0"
			></CustomTable>
			<CustomTextArea
				v-if="false"
				label-id="testing"
				label="testing"
				placeholder="testing...."
				v-model="testing"
			></CustomTextArea>
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
import NetworkDomain from "@/mixin/network-domain";

export default {
	name: "CreateParticipant",
	mixins: [NetworkDomain],
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
			table: {
				headerForRolePage: ["Network Domain", "Role Type", "Subscriber Id", "URL", "Role Status", "Action"],
				toBeShownForRolePage: ["domainDescription", "roleType", "subscriberId", "url", "status"],
				headerForParticipantKeyPage: ["Key ID", "Signing Key", "Encryption Key", "Valid From", "Valid To", "Action"],
				toBeShownForParticipantPage: ["keyId", "signingPublicKey", "encryptPublicKey", "validFrom", "validUntil"],
			},
			participant: {
				id: null,
				details: null,
			},
			show: false,
			testing: "",
			page: {
				currentTab: "participantInfoPage",
				participantInfoPage: true,
				participantInfoDone: false,
				networkRolePage: false,
				editNetworkRolePage: false,
				networkRoleDone: false,
				participationKeyPage: false,
				participationKeyDone: false,
			},

			domainID: null,
			domainDescription: null,
			networkRole: null,
			ListOfNetworkRolesOptions: ["BAP", "BPP", "BG", "LREG", "CREG", "RREG"],
			roleStatus: null,
			ListOfRoleStatus: ["INITIATED", "SUBSCRIBED", "UNDER_SUBSCRIPTION", "UNSUBSCRIBED", "INVALID_SSL"],
			url: null,
			subscriberId: null,
			listOfNetworkRolesCreated: [],
			toBeDeleted: null,
			key: {
				createdAt: null,
				id: null,
				encryptPublicKey: null,
				keyId: null,
				signingPublicKey: null,
				lastUpdatedAt: null,
				validFrom: null,
				validUntil: null,
				verified: null,
			},
			listOfParticipantKeys: [],
		};
	},
	created() {
		if (this.participant.id) {
			this.getParticipantInfo(this.$route.params.id);
		}
		this.getNetworkDomainList();
	},
	// add watchEffect to get the data from the api and store it in the data array of the table component and then display it in the table
	watch: {
		listOfNetworkRolesCreated: {
			handler() {
				if (this.listOfNetworkRolesCreated.length > 0 && !this.page.editNetworkRolePage) {
					this.page.networkRoleDone = true;
					this.page.participationKeyPage = true;
				}
				if (!this.listOfNetworkRolesCreated.length) {
					this.page.networkRoleDone = false;
					this.page.participationKeyPage = false;
				}
			},
			deep: true,
			immediate: true,
		},
		listOfParticipantKeys: {
			handler() {
				if (this.listOfParticipantKeys.length > 0) {
					this.page.participationKeyDone = true;
				}
				if (this.listOfParticipantKeys.length === 0) {
					this.page.participationKeyDone = false;
				}
			},
			deep: true,
			immediate: true,
		},
		participant: {
			handler() {
				if (this.participant.details !== null) {
					this.participant.id = this.participant.details["participant_id"];
					this.page.participantInfoDone = true;
				}
				if (this.participant.details === null) {
					this.page.participantInfoDone = false;
				}
			},
			deep: true,
			immediate: true,
		},
		page: {
			handler() {
				if (this.page.participantInfoDone) {
					this.getNetworkRolesList(this.participant.details["id"]);
				}
				if (this.page.participantInfoDone === false) {
					this.page.networkRolePage = false;
				}
				if (this.page.networkRoleDone === true) {
					this.getParticipantKeys(this.participant.details["id"]);
				}
				if (this.page.networkRoleDone === false) {
					this.page.participationKeyPage = false;
				}
			},
			deep: true,
			immediate: true,
		},
	},
	methods: {
		showPopup() {
			alert("We are working on it. Thank you for your patience :)");
		},
		routeToThisPage(subscriberId) {
			const _id = this.returnFromListOfNetworkRolesCreated("subscriberId", subscriberId, "id", null, null);
			localStorage.setItem("viewingParticipantId", this.participant.details["id"]);
			router.push(`/view-test-roles/${_id}`);
		},
		getParticipantInfo(id) {
			axios
				.get(api_map.singleNetworkParticipant + id)
				.then((response) => {
					if (response.status === 200) {
						this.participant.details = response.data;
						this.page.participantInfoDone = true;
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		newNetworkParticipant: async function () {
			await axios
				.post(api_map.newNetworkParticipant, {
					participant_id: this.participant.id,
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
					this.participant.details = response.data["network_participants"][0];
					this.page.participantInfoDone = true;
					this.page.networkRolePage = true;
					this.page.currentTab = "networkRolePage";
					this.subscriberId = this.participant.details["participant_id"];
				})
				.catch((error) => {
					console.log(error);
				});
		},
		setTab: function (tab) {
			this.page.currentTab = tab;
		},
		editOrNot: function () {
			this.page.editNetworkRolePage = !this.page.editNetworkRolePage;
			this.page.networkRoleDone = !this.page.networkRoleDone;
		},
		setDomainDetails: function (domain) {
			for (let index in this.networkDomain.listOfMap) {
				if (this.networkDomain.listOfMap[index]["domain"] === domain) {
					this.domainID = this.networkDomain.listOfMap[index]["id"];
					this.domainDescription = this.networkDomain.listOfMap[index]["description"];
				}
			}
		},
		createNetworkRole: async function (domain) {
			this.setDomainDetails(domain);
			await axios
				.post(api_map.singleNetworkParticipant + this.participant.details["id"] + api_map.newNetworkRole, {
					network_domain_id: this.domainID,
					type: this.networkRole,
					status: this.roleStatus,
					subscriber_id: this.subscriberId,
					url: this.url,
					network_participant_id: this.participant.details["id"],
				})
				.then((response) => {
					if (response.status !== 200) {
						console.log("Error: " + response.status);
						return;
					}
					this.filterNetworkRole(response.data["network_roles"], "single");
					this.editOrNot();
					this.page.participationKeyPage = true;
				})
				.catch((error) => {
					console.log(error);
					console.log(error.response);
				});
		},
		extractNetworkData: function (data) {
			return {
				createdAt: data["created_at"],
				domainId: data["network_domain"]["id"],
				domainDescription: this.returnDomainDetails("id", data["network_domain"]["id"], "description"),
				id: data["id"],
				status: data["status"],
				subscriberId: data["subscriber_id"],
				roleType: data["type"],
				updatedAt: data["updated_at"],
				url: data["url"] ? data["url"] : this.url,
			};
		},
		filterNetworkRole: function (data, type) {
			if (data.length) {
				if (type === "multiple") {
					for (let index in data) {
						if (!this.returnFromListOfNetworkRolesCreated("subscriberId", data[index]["subscriber_id"], null)) {
							this.listOfNetworkRolesCreated.push(this.extractNetworkData(data[index]));
						}
					}
					this.page.networkRolePage = true;
					this.page.networkRoleDone = true;
					return;
				}
				const _data = data[0];
				if (this.returnFromListOfNetworkRolesCreated("id", _data["id"], null, this.extractNetworkData(_data), "add")) {
					this.page.networkRolePage = true;
					this.page.networkRoleDone = true;
					return;
				}
				if (type === "single") {
					this.listOfNetworkRolesCreated.push(this.extractNetworkData(_data));
					this.page.networkRolePage = true;
					this.page.networkRoleDone = true;
				}
			}
		},
		returnFromListOfNetworkRolesCreated: function (searchBy, value, askFor, newData, action) {
			if (searchBy && value) {
				const listOfNetworkRolesCreated = this.listOfNetworkRolesCreated;
				for (let index in listOfNetworkRolesCreated) {
					if (listOfNetworkRolesCreated[index][searchBy] === value) {
						if (newData && action === "add") {
							listOfNetworkRolesCreated[index] = newData;
							this.listOfNetworkRolesCreated = listOfNetworkRolesCreated;
							return true;
						}
						if (action === "edit") {
							return listOfNetworkRolesCreated[index];
						}
						if (action === "remove") {
							this.changeShow();
							this.listOfNetworkRolesCreated = listOfNetworkRolesCreated.filter(
								(item) => item !== listOfNetworkRolesCreated[index]
							);
							return true;
						}
						if (askFor) {
							return listOfNetworkRolesCreated[index][askFor];
						}
						return true;
					}
				}
			}
		},
		setDataValueOnClickEdit: function (subscriberId) {
			const received = this.returnFromListOfNetworkRolesCreated("subscriberId", subscriberId, null, null, "edit");
			console.log(received);
			if (received) {
				this.networkDomain.id = this.returnDomainDetails("id", received["domainId"], "domain");
				this.networkRole = received["roleType"];
				this.roleStatus = received["status"];
				this.subscriberId = received["subscriberId"];
				this.url = received["url"];
				this.page.currentTab = "networkRolePage";
				this.page.networkRolePage = true;
				this.page.networkRoleDone = false;
				this.page.editNetworkRolePage = true;
			}
		},
		removeNetworkRole: async function (subscriberId) {
			const id = this.returnFromListOfNetworkRolesCreated("subscriberId", subscriberId, "id");
			axios
				.post(api_map.singleNetworkParticipant + this.participant.details["id"] + api_map.removeNetworkRole + id)
				.then((response) => {
					if (response.status !== 200) {
						console.log("Error: " + response.status);
						return;
					}
					this.returnFromListOfNetworkRolesCreated("subscriberId", subscriberId, null, null, "remove");
				})
				.catch((error) => {
					console.log(error);
					console.log(error.response);
				});
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
					this.page.networkRolePage = true;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		changeShow: function (id) {
			this.show = !this.show;
			this.toBeDeleted = id;
		},
		filterParticipantKeys: function (data) {
			if (data.length) {
				for (let index in data) {
					this.setKey(data[index]);
					if (this.returnFromListOfParticipantKeys("keyId", data[index]["key_id"], null, "add")) {
						// set null the all value for each key in this.keys
						this.getDefaultValue();
						this.page.participationKeyPage = true;
						this.page.participationKeyDone = true;
					} else {
						this.listOfParticipantKeys.push(this.key);
						return true;
					}
				}
			}
		},
		setKey: function (data) {
			return (this.key = {
				createdAt: data["created_at"],
				encryptPublicKey: data["encr_public_key"],
				id: data["id"],
				keyId: data["key_id"],
				signingPublicKey: data["signing_public_key"],
				lastUpdatedAt: data["updated_at"],
				validFrom: data["valid_from"],
				validUntil: data["valid_until"],
				verified: data["verified"],
			});
		},
		getDefaultValue: function () {
			// set null the all value for each key in this.keys
			this.key = {
				createdAt: null,
				encryptPublicKey: null,
				id: null,
				keyId: null,
				signingPublicKey: null,
				lastUpdatedAt: null,
				validFrom: null,
				validUntil: null,
				verified: null,
			};
		},
		generateKey: async function () {
			axios
				.post(api_map.generateKeys + this.participant.details["id"])
				.then((response) => {
					if (response.status !== 200) {
						console.log("Error: " + response.status);
						return;
					}
					this.getParticipantKeys(this.participant.details["id"]);
				})
				.catch((error) => {
					console.log(error);
					console.log(error.response);
				});
		},
		returnFromListOfParticipantKeys: function (searchBy, value, askFor, action) {
			if (searchBy && value) {
				const listOfParticipantKeys = this.listOfParticipantKeys;
				if (this.listOfParticipantKeys.length < 1) {
					this.listOfParticipantKeys.push(this.key);
					return true;
				}
				for (let index in listOfParticipantKeys) {
					if (listOfParticipantKeys[index][searchBy] === value) {
						if (action === "add") {
							listOfParticipantKeys[index] = this.key;
							this.listOfParticipantKeys = listOfParticipantKeys;
							return true;
						}
						if (action === "remove") {
							this.listOfParticipantKeys = listOfParticipantKeys.filter(
								(item) => item !== listOfParticipantKeys[index]
							);
						}
						return listOfParticipantKeys[index][askFor];
					}
				}
			}
		},
		removeParticipantKey: async function (keyId) {
			const toBeRemove = this.returnFromListOfParticipantKeys("keyId", keyId, "id");
			axios
				.post(
					api_map.singleNetworkParticipant + this.participant.details["id"] + api_map.removeParticipantKey + toBeRemove
				)
				.then((response) => {
					if (response.status !== 200) {
						console.log("Error: " + response.status);
					}
					this.changeShow();
					this.returnFromListOfParticipantKeys("keyId", keyId, null, "remove");
				})
				.catch((error) => {
					console.log(error);
					console.log(error.response);
				});
		},
		getParticipantKeys: async function (id) {
			axios
				.get(api_map.singleNetworkParticipant + id + api_map.getParticipantKeys)
				.then((response) => {
					// if response.status is 200 then route to the dashboard
					if (response.status !== 200) {
						console.log("Error: " + response.status);
						return;
					}
					if (response.data["participant_keys"][0] !== undefined) {
						this.filterParticipantKeys(response.data["participant_keys"]);
						this.page.participationKeyPage = true;
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		removeCollection: function (value, pageName) {
			console.log(value, pageName);
			if (pageName === "networkRolePage") {
				this.removeNetworkRole(value);
			}
			if (pageName === "participationKeyPage") {
				this.removeParticipantKey(value);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.modal-wrapper {
	display: none;
	place-items: center;
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	inset: 0;
	z-index: 100;
}

.show {
	display: grid;
}

.modal {
	margin: 0.8em;
	display: grid;
	place-items: center;
	background-color: var(--white-bg);
	border-radius: 1.5em;
	padding: 2em;

	h1 {
		width: 100%;
		font-family: Montserrat, serif;
		font-style: normal;
		font-weight: bold;
		font-size: 1.3em;
		line-height: 1.1em;
		margin-bottom: 0;
	}

	p {
		margin-bottom: 2em;
	}

	&-buttons {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: flex-end;
		gap: var(--medium-gap);
	}
}

#no {
	font-family: inherit;
	font-style: normal;
	font-weight: bold;
	font-size: 1em;
	line-height: 1.2em;
	color: var(--dark-green);
	border: none;
	outline: none;
	background: transparent;
}

#delete {
	font-family: inherit;
	font-style: normal;
	font-weight: bold;
	font-size: 1em;
	line-height: 1.2em;
	color: var(--white-bg);
	border: none;
	outline: none;
	background: linear-gradient(90deg, #b00000 0%, #f90000 98.26%, #df0000 98.27%);
	border-radius: 0.5em;
	padding: 0.5em 1.5em;
}

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
			column-gap: 1rem;
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
			display: grid;
			grid-gap: 1em;
			margin-right: auto;
		}
	}

	&-key {
		display: flex;
		margin: 0 auto;
		flex-direction: column;
		align-content: center;
		align-items: center;
		align-self: center;
		position: relative;
		z-index: 100;
		bottom: 20em;
		float: top;
	}
}

.actions {
	display: flex;
	gap: 3.5em;
}

#edit {
	background: var(--light-blue);
}

#cancel {
	background: var(--dark-red);
}

.enterKey {
	background: var(--dark-bg);
	color: var(--white-bg);

	&:hover {
		background: var(--dark-bg);
		color: var(--white-bg);
	}
}

.generateKey {
	background: var(--light-blue);
	color: var(--white-bg);

	&:hover {
		background: var(--light-blue);
		color: var(--white-bg);
	}
}
</style>
