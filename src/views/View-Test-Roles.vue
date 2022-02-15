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
			<ButtonEmptyContent>
				<template v-slot:button>
					<SquareButton>
						Region
						<img alt="create icon" src="@/assets/svgs/create.svg" />
					</SquareButton>
				</template>
				<template v-slot:message> No region have been Defined!</template>
				<template v-slot:info> please add region in which you want to operate in.</template>
			</ButtonEmptyContent>
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
import NetworkDomain from "@/mixin/network-domain";

export default {
	name: "View-Test-Roles",
	mixins: [NetworkDomain],
	components: {
		PostLoginHeader,
		CustomViewInput,
		CustomTab,
		SquareButton,
		ButtonEmptyContent,
	},
	data() {
		return {
			tab: {
				active: "info",
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
		};
	},
	created() {
		if (this.participantId) {
			this.getNetworkInfo(this.participantId);
		}
		this.getNetworkDomainList();
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
