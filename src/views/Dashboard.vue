<template>
	<PostLoginHeader class="fix" />
	<div class="main">
		<h2>Your participation information</h2>
		<div class="main-grid">
			<div class="main-grid-buttons">
				<router-link to="/create-participant">
					<SquareButton>
						Create
						<img alt="create icon" src="@/assets/svgs/create.svg" />
					</SquareButton>
				</router-link>
				<SquareButton @click="showIcon">
					Remove
					<img alt="create icon" src="@/assets/svgs/remove.svg" />
				</SquareButton>
			</div>
			<div class="main-grid-info">
				<div class="main-grid-info-button" v-for="(participant, index) in participantList" :key="index">
					<div class="main-grid-info-content">
						<span class="main-grid-info-content-text">
							{{ participant["participant_name"] }}
						</span>
					</div>
					<button v-if="showRemoveIcon" id="cross" @click="removeParticipant(participant.participant_id)">
						<img alt="create icon" src="@/assets/svgs/cross.svg" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "@/axios";
import api_map from "@/axios/api_map";
import PostLoginHeader from "@/components/headers/PostLoginHeader";
import SquareButton from "@/components/buttons/SquareButton";

export default {
	name: "Dashboard",
	components: {
		PostLoginHeader,
		SquareButton,
	},

	data() {
		return {
			id: this.$store.getters.getId,
			showRemoveIcon: false,
			participantList: [],
		};
	},

	created() {
		this.getParticipantList();
	},

	methods: {
		showIcon: function () {
			//	change the value of showRemoveIcon to true or false
			this.showRemoveIcon = !this.showRemoveIcon;
		},

		removeParticipantLocally: function (participant_id) {
			//	remove the participant from the local list
			this.participantList = this.participantList.filter(
				(participant) => participant.participant_id !== participant_id
			);
		},

		removeParticipant: async function (participantID) {
			try {
				const response = await axios.get(api_map.removeNetworkParticipant + participantID);
				if (response.status === 200) {
					this.removeParticipantLocally(participantID);
				}
			} catch (error) {
				console.log(error);
			}
		},

		getParticipantList: async function () {
			await axios
				.get(api_map.networkParticipantsList)
				.then((response) => {
					if (response.status !== 200) return;

					const rawData = response.data["network_participants"];
					if (rawData.length === 0) return;

					for (let index in rawData) {
						this.participantList.push({
							participant_id: rawData[index]["id"],
							participant_name: rawData[index]["participant_id"],
						});
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
	margin-top: 3rem;

	&-grid {
		display: flex;
		width: 50%;
		justify-content: space-between;

		&-buttons {
			height: 14.625em;
			display: grid;
			padding: 1rem;
		}

		&-info {
			width: 50%;
			gap: 3rem;

			&-content {
				color: var(--text-color);
				box-shadow: var(--box-shadow);
				border-radius: 21px;
				padding: 1.8em 2.8em;
				width: 13rem;
				height: 1.8rem;
				position: relative;
				overflow: hidden;
				text-overflow: ellipsis;

				& > span {
					white-space: nowrap;
					display: inline;
					align-self: center;
					margin: 0 auto;
				}
			}

			&-button {
				contain: content;
				display: inline;
				margin: 1rem;
				:hover {
					transform: scale(1.1);
					background: var(--bg-color-light);
					transition: all 0.3s ease-in-out;
				}
			}
		}
	}

	#cross {
		height: 2em;
		width: 2em;
		background-color: var(--red-color);
		border-radius: 50%;
		align-items: center;
		border: none;
		outline: none;
		top: -6rem;
		right: -17.5rem;
		position: relative;
		display: inline-block;

		& > img {
			position: static;
			width: 0.8em;
			height: 0.8em;
			margin: 0 auto;
			z-index: 1;
		}
	}
}
</style>
