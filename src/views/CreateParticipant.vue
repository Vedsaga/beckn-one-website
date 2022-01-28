<template>
	<PostLoginHeader />

	<div class="main">
		<div class="main-progress">
			<div class="main-progress-tab">
					Participant Info
			</div>
			<div class="main-progress-line"></div>
			<div class="main-progress-tab">
					Network Role Info
			</div>
			<div class="main-progress-line"></div>
			<div class="main-progress-tab">
				Participation Key
			</div>
		</div>
		<div class="main-content">
			<label for="ParticipantID">Please Enter Participant ID</label>
				<CustomInput id="ParticipantID" placeholder="example.myID.com" v-model="participantID" />
			<CurvedButton>
				Save & Next
			</CurvedButton>
		</div>

	</div>
</template>

<script>
import PostLoginHeader from "@/components/headers/PostLoginHeader";
import CustomInput from "@/components/inputs/CustomInput";
import CurvedButton from "@/components/buttons/CurvedButton";
export default {
	name: "CreateParticipant",
	components: {
		PostLoginHeader,
		CustomInput,
		CurvedButton
	},
	data() {
		return {
			participantID: null,
		};
	},
};
</script>

<style lang="scss" scoped>
.main {
	display: grid;
	margin: 4.2em auto 0 auto;
	//border: #130f26 solid 1px;
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

		&-tab{
			display: flex;
			padding: 0.9em 1.6em;
			background: var(--black-color);
			border-radius: 2rem;
			float: initial;
			color:var(--white-color);
			font-weight: 600;
			font-size: 0.812rem;
		}
		&-line {
			border: 2px dashed #9D9D9D;
			width: 14.5em;
		}
	}

	&-content {
		display: flex;
		width: 23em;
		height: 23em;
		border: var(--yellow-color) solid 1px;
		flex-direction: column;
	}
}

</style>
