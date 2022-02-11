<template>
	<div class="modal-wrapper" :class="{ show }">
		<div class="modal">
			<h1>Want to Delete?</h1>
			<p>Are you sure you want to delete?</p>
			<div class="modal-buttons">
				<button id="cancel" @click="changeShow">cancel</button>
				<button id="delete" @click="removeParticipant(removeParticipantId)">yes</button>
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
					<router-link :to="'/create-participant/' + participant.participant_id">
						<div class="main-grid-info-content">
							<span class="main-grid-info-content-text">
								{{ participant["participant_name"] }}
							</span>
						</div>
					</router-link>
					<button
						:class="{ 'cross-show': showRemoveIcon }"
						class="cross"
						@click="changeShow(participant.participant_id)"
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
			id: localStorage.getItem("id"),
			showRemoveIcon: false,
			participantList: [],
			removeParticipantId: null,
			show: false,
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
		changeShow: function (id) {
			this.show = !this.show;
			this.removeParticipantId = id;
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
					this.changeShow();
				}
			} catch (error) {
				console.log(error);
			}
		},

		getParticipantList: async function () {
			await axios
				.get(api_map.networkParticipantsList + this.id)
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

#cancel {
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
				color: var(--dark-bg-header);
				box-shadow: var(--light-shadow);
				border-radius: var(--border-radius);
				padding: 1.8em 2.8em;
				width: 13rem;
				height: 1.8rem;
				overflow: hidden;
				text-overflow: ellipsis;
				text-align: start;
				& > span {
					white-space: nowrap;
					display: inline;
					text-overflow: ellipsis;
				}
			}

			&-button {
				position: relative;
				display: inline;
				margin: 1rem;
				transition: all 0.3s ease-in-out;
				border-radius: var(--border-radius);

				&:hover {
					transform: scale(1.1);
					background: var(--gray-complement);
					box-shadow: none !important;
				}
			}
		}
	}

	.cross {
		height: 2em;
		width: 2em;
		background-color: var(--dark-red);
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
