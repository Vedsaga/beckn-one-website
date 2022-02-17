<template>
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
			<ButtonEmptyContent v-if="!tab.editing">
				<template v-slot:button>
					<SquareButton @click="changeEditing">
						Region
						<img alt="create icon" src="@/assets/svgs/create.svg" />
					</SquareButton>
				</template>
				<template v-slot:message> No region have been Defined!</template>
				<template v-slot:info> please add region in which you want to operate in.</template>
			</ButtonEmptyContent>
			<div v-if="tab.editing" class="main-input-container">
				<InputLayout :on-done="newOperatingRegion" :on-cancel="changeEditing">
					<template v-slot:field>
						<Dropdown
							id="networkRole"
							label-name="Select Network Role"
							v-model="operatingRegion.selectedSubscriberId"
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
import ButtonEmptyContent from "@/components/layouts/Button-Empty-Content";
import NetworkDomain from "@/mixin/network-page";
import InputLayout from "@/components/layouts/Input-Layout";
import Dropdown from "@/components/dropdown/dropdown";

export default {
	name: "View-Test-Roles",
	mixins: [NetworkDomain, Request],
	components: {
		PostLoginHeader,
		CustomViewInput,
		CustomTab,
		SquareButton,
		ButtonEmptyContent,
		InputLayout,
		Dropdown,
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
			},
			deep: true,
			immediate: true,
		},
	},
	data() {
		return {
			tab: {
				active: "info",
				editing: false,
			},
			operatingRegion: {
				selectedSubscriberId: null,
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
			// wait for 300ms
			setTimeout(() => 500);
			this.getNetworkInfo(this.participantId);
		}
	},
	methods: {
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

			if (!cityId || !countryId) {
				// show alert
				alert(" county or city can not be empty ");
				return;
			}

			axios
				.post(
					api_map.singleNetworkParticipant +
						participantId +
						api_map.getNetworkRoleDetails +
						this.networkInfo.id +
						api_map.newOperatingRegion,
					{
						network_role_id: this.operatingRegion.networkRole,
						country_id: countryId,
						cityId: cityId,
					}
				)
				.then((response) => {
					//	if response.status !== 200 return
					if (response.status !== 200) {
						console.log("Error: " + response.status);
						return;
					}
					this.changeEditing();
				})
				.catch((error) => {
					console.log(error);
				});
		},

		returnDetails: function (searchIn, searchBy, searchFor, askedFor) {
			if (searchIn && searchBy && searchFor) {
				for (let index in searchIn) {
					if (searchIn[index][searchBy] === searchFor) {
						return searchIn[index][askedFor];
					}
				}
			}
		},
		setToDefault: function () {
			this.operatingRegion.selectedSubscriberId = null;
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
