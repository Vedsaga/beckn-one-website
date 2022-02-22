<!-- CustomInput.vue -->
<template>
	<div :class="[error ? 'error' : 'custom-input']">
		<label :for="labelId">{{ labelText }}</label>
		<input
			:id="labelId"
			class="custom-input-design input-label"
			:placeholder="placeholder"
			:value="modelValue"
			@input="updateValue($event.target.value)"
			:type="type"
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
		error: {
			type: Boolean,
		},
		modelValue: {
			type: String,
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
	methods: {
		updateValue: function (value) {
			this.$emit("update:modelValue", value);
		},
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

.error {
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
		outline: 3px var(--light-red) solid;
		background-color: transparent;
		color: var(--light-red);
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
			color: var(--light-red);
			outline: 3px var(--light-red) solid;
			font-weight: 600;
			transition: all 0.3s ease-in-out;
		}
	}
}
</style>
