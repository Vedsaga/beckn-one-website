<template>
	<div class="modal-wrapper" :class="{ show: true }">
		<div class="modal">
			<h1>Want to Delete?</h1>
			<p>Are you sure you want to delete?</p>

			<div class="modal-buttons">
				<a id="cancel">cancel</a>
				<a id="delete">yes</a>
			</div>
		</div>
	</div>

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
					<button
						:class="{ 'cross-show': showRemoveIcon }"
						class="cross"
						@click="removeParticipant(participant.participant_id)"
					>
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
	background-color: #fff;
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
		gap: 2em;
	}
}

#cancel {
	font-family: inherit;
	font-style: normal;
	font-weight: bold;
	font-size: 1em;
	line-height: 1.2em;
	color: #02a786;
}

#delete {
	font-family: inherit;
	font-style: normal;
	font-weight: bold;
	font-size: 1em;
	line-height: 1.2em;
	color: #ffffff;

	background: linear-gradient(90deg, #b00000 0%, #f90000 98.26%, #df0000 98.27%);
	border-radius: 0.5em;
	padding: 0.5em 1.5em;
}

.main {
	margin-top: 3rem;

	&-grid {
		display: flex;
		justify-content: space-between;
		gap: 1em;

		&-buttons {
			height: 14.625em;
			display: grid;
			padding: 1rem;
		}

		&-info {
			display: flex;
			flex-flow: row wrap;
			width: 100%;
			gap: 3rem;

			&-content {
				color: var(--text-color);
				box-shadow: var(--box-shadow);
				border-radius: 21px;
				padding: 1.8em 2.8em;
				width: 13rem;
				height: 1.8rem;
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
				position: relative;
				display: inline;
				margin: 1rem;
				transition: all 0.3s ease-in-out;
				border-radius: 21px;

				&:hover {
					transform: scale(1.1);
					background: var(--bg-color-light);
				}
			}
		}
	}

	.cross {
		height: 2em;
		width: 2em;
		background-color: var(--red-color);
		border-radius: 50%;
		align-items: center;
		border: none;
		outline: none;
		top: -1em;
		right: -1em;
		position: absolute;
		display: inline-block;
		transform: scale(0) rotate(-90deg);
		transition: all 0.3s ease-in-out;

		&:hover {
			transform: scale(1.2);
		}

		&-show {
			transform: scale(1) rotate(0);
		}

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
