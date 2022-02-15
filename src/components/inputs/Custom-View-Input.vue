<template>
	<div class="custom-view">
		<label :for="id">{{ labelText }}</label>
		<input
			:id="id"
			:type="type"
			:placeholder="placeholder"
			:value="modelValue"
			:disabled="disabled"
			@input="updateValue($event.target.value)"
		/>
	</div>
</template>

<script>
export default {
	name: "Custom-View-Input",
	props: {
		placeholder: {
			type: String,
			required: true,
		},
		modelValue: {
			type: String,
		},
		labelText: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		id: {
			type: String,
			required: true,
		},
		disabled: {
			type: Boolean,
			required: false,
		},
	},
	methods: {
		updateValue(value) {
			this.$emit("update:modelValue", value);
		},
	},
};
</script>

<style lang="scss" scoped>
.custom-view {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: max-content;

	label {
		font-size: 0.812rem;
		font-weight: 600;
		color: var(--info-text);
		margin-right: 0.812rem;
	}

	input {
		font-family: inherit;
		font-weight: 600;
		display: flex;
		max-width: 17.125rem;
		min-width: 5.5rem;
		align-items: flex-start;
		padding: var(--medium-padding);
		border-radius: var(--medium-border-radius);
		text-overflow: ellipsis;
		white-space: nowrap;
		border: none;
		outline: none;
		flex: none;
		order: 1;
		flex-grow: 0;
		margin: var(--small-padding) 0;
		&:disabled {
			background-color: var(--white-bg-header);
			color: var(--text-color);
		}
		&:focus {
			font-weight: 500;
			transition: all 0.3s ease;
		}
	}
}
</style>
