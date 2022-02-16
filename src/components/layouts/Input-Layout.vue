<template>
	<div class="input-layout">
		<div class="input-layout-field">
			<slot name="field"></slot>
		</div>
		<div class="input-layout-button">
			<CurvedButton @click="onDone" id="done">DONE</CurvedButton>
			<CurvedButton @click="onCancel" id="cancel"> Cancel</CurvedButton>
		</div>
	</div>
</template>

<script>
import CurvedButton from "@/components/buttons/CurvedButton";
export default {
	name: "Input-Layout",
	components: {
		CurvedButton,
	},
	props: {
		onCancel: {
			type: Function,
			default: () => {},
			required: true,
		},
		onDone: {
			type: Function,
			default: () => {},
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.input-layout {
	display: grid;
	gap: 5em;
	&-field {
		width: max-content;
		display: grid;
		gap: 5em;
		grid-template-columns: auto repeat(3, 1fr);
	}

	&-button {
		display: flex;
		gap: 3.5em;
	}
}

#done {
	background: var(--dark-bg);
	color: var(--white-bg);
}

#cancel {
	background: var(--dark-red);
}
</style>
