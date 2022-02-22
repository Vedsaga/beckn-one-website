<template>
	<div class="modal-wrapper" :class="{ show }">
		<div class="modal">
			<h1>Want to Delete?</h1>
			<p>Are you sure you want to delete?</p>
			<div class="modal-buttons">
				<button id="no" @click="changeVisibility">cancel</button>
				<button id="delete" @click="removeOperatingRegion(operatingRegion.operationId)">yes</button>
			</div>
		</div>
	</div>
	<PostLoginHeader />
	<div class="main">
		<div class="main-tabs-container">
			<CustomTab
				:class="[tab.active === 'info' ? 'main-tabs-container-active-tab' : null]"
				tab-name="Role Info"
				@click="tab.active = 'info'"
			>
			</CustomTab>
			<CustomTab
				:class="[tab.active === 'region' ? 'main-tabs-container-active-tab' : null]"
				tab-name="Operating Region"
				@click="tab.active = 'region'"
			>
				>
			</CustomTab>
			<CustomTab
				:class="[tab.active === 'test' ? 'main-tabs-container-active-tab' : null]"
				tab-name="API Test"
				@click="tab.active = 'test'"
			>
				>
			</CustomTab>
		</div>
		<section v-if="tab.active === 'info'">
			<div class="main-info-container">
				<div class="main-info-container-column">
					<CustomViewInput
						id="domainName"
						label-text="Network Domain"
						type="text"
						v-model="networkInfo.domain.description"
						:disabled="true"
						placeholder="example.retail"
					>
					</CustomViewInput>
					<CustomViewInput
						id="role"
						label-text="Role Type"
						type="text"
						v-model="networkInfo.roleType"
						:disabled="true"
						placeholder="example.BPP"
					>
					</CustomViewInput>
					<CustomViewInput
						id="createdAt"
						label-text="Created At"
						type="text"
						v-model="networkInfo.createdAt"
						:disabled="true"
						placeholder=""
					>
					</CustomViewInput>
				</div>
				<div class="main-info-container-column">
					<CustomViewInput
						id="subscriberId"
						label-text="Subscriber Id"
						type="text"
						v-model="networkInfo.subscriberId"
						:disabled="true"
						placeholder="example.subscriberId"
					>
					</CustomViewInput>
					<CustomViewInput
						id="status"
						label-text="Status"
						type="text"
						v-model="networkInfo.status"
						:disabled="true"
						placeholder="example.subscriberId"
					>
					</CustomViewInput>
					<CustomViewInput
						id="updatedAt"
						label-text="Updated At"
						type="text"
						v-model="networkInfo.updatedAt"
						:disabled="true"
						placeholder=""
					>
					</CustomViewInput>
				</div>
			</div>
		</section>
		<section v-if="tab.active === 'region'">
			<ButtonTable v-if="!tab.editing">
				<template v-slot:button>
					<SquareButton @click="changeEditing">
						Region
						<img alt="create icon" src="@/assets/svgs/create.svg" />
					</SquareButton>
				</template>
				<template v-slot:table>
					<CustomTable
						button-message=" by clicking the REGION BUTTON"
						warning="please add region to your network"
						head-warning="No region have been Defined!"
						:to-be-shown="operatingRegion.toBeShown"
						:header-list="operatingRegion.tableHeader"
						:edit="editOperatingRegion"
						:remove="changeVisibility"
						v-model:data-array="operatingRegion.listOfMap"
						index="0"
						:routing-required="false"
					>
					</CustomTable>
				</template>
			</ButtonTable>

			<div v-if="tab.editing" class="main-input-container">
				<InputLayout :on-done="newOperatingRegion" :on-cancel="changeEditing">
					<template v-slot:field>
						<Dropdown
							id="networkRole"
							label-name="Select Network Role"
							v-model="operatingRegion.subscriberName"
							:list-of-elements="networkRole.listOfSubscriberId"
						>
						</Dropdown>
						<Dropdown
							id="country"
							label-name="Select Country"
							v-model="operatingRegion.country.selected"
							:list-of-elements="operatingRegion.country.list"
						>
						</Dropdown>
						<Dropdown
							id="country"
							label-name="Select City"
							v-model="operatingRegion.country.city.selected"
							:list-of-elements="operatingRegion.country.city.list"
						>
						</Dropdown>
					</template>
				</InputLayout>
			</div>
		</section>
		<section v-if="tab.active === 'test'">
			<h1>Yet to be implemented</h1>
		</section>
	</div>
</template>

<script>
import PostLoginHeader from "@/components/headers/PostLoginHeader";
import CustomViewInput from "@/components/inputs/Custom-View-Input";
import axios from "@/axios";
import api_map from "@/axios/api_map";
import CustomTab from "@/components/inputs/CustomTab";
import SquareButton from "@/components/buttons/SquareButton";
import ButtonTable from "@/components/layouts/Button-Table";
import NetworkDomain from "@/mixin/network-page";
import InputLayout from "@/components/layouts/Input-Layout";
import Dropdown from "@/components/dropdown/dropdown";
import CustomTable from "@/components/tabel/CustomTable";

export default {
	name: "View-Test-Roles",
	mixins: [NetworkDomain, Request],
	components: {
		PostLoginHeader,
		CustomViewInput,
		CustomTab,
		SquareButton,
		ButtonTable,
		InputLayout,
		Dropdown,
		CustomTable,
	},
	watch: {
		tab: {
			handler() {
				if (this.tab.editing && this.networkRole.listOfSubscriberId.length < 1) {
					if (this.operatingRegion.country.list.length < 1) {
						this.getCounties();
					}
					if (this.operatingRegion.country.city.list.length < 1) {
						this.getCities();
					}
					if (this.networkRole.listOfSubscriberId.length < 1) {
						this.getNetworkRoleList(this.participantId);
					}
				}
				if (this.tab.active === "info" && this.networkDomain.list) {
					if (!this.networkInfo.subscriberId) {
						this.getNetworkInfo(this.participantId);
					}
				}
			},
			deep: true,
			immediate: true,
		},
	},
	data() {
		return {
			tab: {
				active: "region",
				editing: false,
				modifying: false,
			},
			show: false,
			operatingRegion: {
				subscriberName: null,
				operationId: null,
				tableHeader: ["Action", "ID", "Subscriber ID", "City", "Country", "Active"],
				toBeShown: ["id", "subscriberId", "city", "country", "active"],
				list: [],
				listOfMap: [],
				country: {
					listMapDetails: [],
					list: [],
					selected: null,
					city: {
						listMapDetails: [],
						list: [],
						selected: null,
					},
				},
			},
			participantId: localStorage.getItem("viewingParticipantId"),
			networkInfo: {
				id: this.$route.params.id,
				domain: {
					name: null,
					id: null,
					description: null,
				},
				subscriberId: null,
				roleType: null,
				url: null,
				status: null,
				createdAt: null,
				createdBy: null,
				updatedAt: null,
				updatedBy: null,
			},
			rawData: null,
		};
	},
	created() {
		if (this.participantId) {
			this.getNetworkDomainList();
			this.getOperatingRegions(this.participantId);
		}
	},
	methods: {
		changeVisibility: function (id) {
			this.show = !this.show;
			this.operatingRegion.operationId = id;
		},
		editOperatingRegion: function (value) {
			//	extract out value from this.operationRegion.listOfMap
			const data = this.returnDetails(this.operatingRegion.listOfMap, "id", value);
			if (data) {
				this.changeEditing();
				this.operatingRegion.operationId = value;
				this.tab.modifying = true;
				this.operatingRegion.subscriberName = data["subscriberId"];
				this.operatingRegion.country.selected = data["country"];
				this.operatingRegion.country.city.selected = data["city"];
			}
		},
		removeOperatingRegion: async function (operatingID) {
			axios
				.post(
					api_map.singleNetworkParticipant +
						this.participantId +
						api_map.getNetworkRoleDetails +
						this.networkInfo.id +
						api_map.removeOperatingRegion +
						operatingID
				)
				.then((response) => {
					if (response.status !== 200) {
						console.log("Error: " + response.status);
						return;
					}
					for (let index in this.operatingRegion.listOfMap) {
						//	remove that operatingID from this.operatingRegion.listOfMap
						if (this.operatingRegion.listOfMap[index]["id"] === operatingID) {
							this.operatingRegion.listOfMap = this.operatingRegion.listOfMap.filter(
								(item) => item !== this.operatingRegion.listOfMap[index]
							);
							this.changeVisibility(null);
							break;
						}
					}
				})
				.catch((error) => {
					console.log(error);
					console.log(error.response);
				});
		},

		getNetworkInfo: async function (participantId) {
			axios
				.get(api_map.singleNetworkParticipant + participantId + api_map.getNetworkRoleDetails + this.networkInfo.id)
				.then((response) => {
					// if response.status is 200 then route to the dashboard
					if (response.status !== 200) {
						console.log("Error: " + response.status);
						return;
					}
					const rawData = response.data;
					if (rawData.length === 0) return;
					this.mapNetworkInfo(rawData);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		getOperatingRegions: async function (participantId) {
			axios
				.get(
					api_map.singleNetworkParticipant +
						participantId +
						api_map.getNetworkRoleDetails +
						this.networkInfo.id +
						api_map.getOperatingRegions
				)
				.then((response) => {
					if (response.status !== 200) {
						console.log("Error: " + response.status);
						return;
					}
					const rawData = response.data["operating_regions"];
					if (rawData.length < 1) return;
					this.operatingRegion.listOfMap = [];
					for (let index in rawData) {
						this.operatingRegion.listOfMap.push({
							id: rawData[index]["id"],
							subscriberId: rawData[index]["network_role"]["subscriber_id"],
							country: rawData[index]["country"]["name"],
							city: rawData[index]["city"]["name"],
							active: rawData[index]["active"],
						});
					}
				});
		},
		getCounties: async function () {
			axios.get(api_map.getCountryList).then((response) => {
				//	if response.status !== 200 return
				if (response.status !== 200) {
					console.log("Error: " + response.status);
					return;
				}
				const rawData = response.data["countries"];
				if (rawData.length === 0) return;
				for (let index in rawData) {
					this.operatingRegion.country.listMapDetails.push({
						isoCode: rawData[index]["iso_code"],
						id: rawData[index]["id"],
						name: rawData[index]["name"],
					});
					this.operatingRegion.country.list.push(rawData[index]["name"]);
				}
			});
		},
		getCities: async function () {
			axios.get(api_map.getCityList).then((response) => {
				//	if response.status !== 200 return
				if (response.status !== 200) {
					console.log("Error: " + response.status);
					return;
				}
				const rawData = response.data["cities"];
				if (rawData.length === 0) return;
				for (let index in rawData) {
					this.operatingRegion.country.city.listMapDetails.push({
						stdCode: rawData[index]["code"],
						name: rawData[index]["name"],
						id: rawData[index]["id"],
						stateName: rawData[index]["state"]["name"],
						stateID: rawData[index]["state"]["id"],
						stateCode: rawData[index]["state"]["code"],
						country: rawData[index]["state"]["country"]["name"],
					});
					this.operatingRegion.country.city.list.push(rawData[index]["name"]);
				}
			});
		},
		mapNetworkInfo: function (rawData) {
			this.networkInfo.domain.name = rawData["network_domain"]["name"];
			this.networkInfo.domain.id = rawData["network_domain"]["id"];
			this.networkInfo.domain.description = this.returnDomainDetails(
				"id",
				rawData["network_domain"]["id"],
				"description"
			);
			this.networkInfo.subscriberId = rawData["subscriber_id"];
			this.networkInfo.roleType = rawData["type"];
			this.networkInfo.url = rawData["url"];
			this.networkInfo.status = rawData["status"];
			this.networkInfo.createdAt = rawData["created_at"];
			this.networkInfo.updatedAt = rawData["updated_at"];
		},
		newOperatingRegion: async function (participantId) {
			if (!this.operatingRegion.country.selected || !this.operatingRegion.country.city.selected) {
				return;
			}
			const countryId = this.returnDetails(
				this.operatingRegion.country.listMapDetails,
				"name",
				this.operatingRegion.country.selected,
				"id"
			);
			const cityId = this.returnDetails(
				this.operatingRegion.country.city.listMapDetails,
				"name",
				this.operatingRegion.country.city.selected,
				"id"
			);
			const networkRoleId = this.returnDetails(
				this.networkRole.listOfMap,
				"subscriber",
				this.operatingRegion.subscriberName,
				"id"
			);
			if (!cityId || !countryId) {
				// show alert
				alert(" county or city can not be empty ");
				return;
			}
			if (this.tab.modifying) {
				axios
					.post(
						api_map.singleNetworkParticipant +
							participantId +
							api_map.getNetworkRoleDetails +
							this.networkInfo.id +
							api_map.newOperatingRegion,
						{
							network_role_id: networkRoleId,
							country_id: countryId,
							city_id: cityId,
							id: this.operatingRegion.operationId,
						}
					)
					.then((response) => {
						//	if response.status !== 200 return
						if (response.status !== 200) {
							console.log("Error: " + response.status);
							return;
						}
						this.tab.modifying = false;
						this.getOperatingRegions();
						this.changeEditing();
					})
					.catch((error) => {
						console.log(error);
					});
			}
			if (!this.tab.modifying) {
				axios
					.post(
						api_map.singleNetworkParticipant +
							participantId +
							api_map.getNetworkRoleDetails +
							this.networkInfo.id +
							api_map.newOperatingRegion,
						{
							network_role_id: networkRoleId,
							country_id: countryId,
							city_id: cityId,
						}
					)
					.then((response) => {
						//	if response.status !== 200 return
						if (response.status !== 200) {
							console.log("Error: " + response.status);
							return;
						}
						this.getOperatingRegions();
						this.changeEditing();
					})
					.catch((error) => {
						console.log(error);
					});
			}
		},

		returnDetails: function (searchIn, searchBy, searchFor, askedFor) {
			if (searchIn && searchBy && searchFor) {
				for (let index in searchIn) {
					if (searchIn[index][searchBy] === searchFor) {
						if (askedFor) {
							return searchIn[index][askedFor];
						}
						return searchIn[index];
					}
				}
			}
		},
		setToDefault: function () {
			this.operatingRegion.subscriberName = null;
			this.operatingRegion.operationId = null;
			this.operatingRegion.country.selected = null;
			this.operatingRegion.country.city.selected = null;
		},
		changeEditing: function () {
			this.tab.editing = !this.tab.editing;
			this.setToDefault();
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
	margin-top: 5em;
	display: grid;
	gap: 3em;
	height: max-content;

	&-tabs-container {
		display: flex;

		&-active-tab {
			background: var(--dark-bg-header);
			color: var(--white-bg);
		}
	}

	&-info-container {
		display: grid;
		gap: 2em;

		&-column {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 1em;
			height: 93px;
		}
	}

	&-region-conatiner {
	}
}
</style>
