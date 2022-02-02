<!-- CustomInput.vue -->
<template>
	<div class="custom-input">
		<label for="{{labelId}}">{{labelText}}</label>
		<input
				id="{{labelId}}"
				class="custom-input-design input-label"
				:placeholder="placeholder"
				:value="value"
				@input ="setValue($event.target.value)"
				@change="getValue(value)"
				type="{{type}}"
		/>
	</div>
</template>
<script>

export default {
	name: "CustomInput",
	props: {
		placeholder: {
			type: String,
			required: true,
		},

		getValue: {
			type: Function,
			required: true,
		},

		labelId: {
			type: String,
			required: true,
		},
		labelText: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},

	},

	data() {
		return {
			value: null,
		};
	},

	methods: {
		setValue(value) {
			this.value = value;
		}
	},
};
</script>
<style lang="scss" scoped>
.custom-input {
	display: flex;
	gap: 0.8em;
	flex-direction: column;

	label {
		font-size: 0.9em;
		font-weight: 500;
		color: var(--text-color);
		cursor: pointer;
	}

	input {
		border: none;
		outline: none;
		background-color: var(--white-bg-header);
		font-family: inherit;
		font-size: var(--global-font-size);
		font-weight: var(--global-font-weight);
		width: var(--input-width);
		height: var(--input-height);
		border-radius: var(--medium-border-radius);
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		padding: 0 1.5em;

		&:focus {
			background: transparent;
			outline: 3px var(--light-green) solid;
			font-weight: 600;
			transition: all 0.3s ease-in-out;
		}
	}
}
</style>
