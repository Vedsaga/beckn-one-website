<!-- CustomInput.vue -->
<template>
	<div class="custom-input">
		<input class="custom-input-design input-label" type="text" :value="modelValue" @input="updateModelValue" />
	</div>
</template>

<script>
export default {
	name: "CustomInput",
	props: {
		modelValue: {
			type: String,
			default: null,
		},
		placeholder: {
			type: String,
			required: true,
		},
	},

	methods: {
		updateModelValue() {
			this.$emit("update:modelValue", this.$el.value);
		},
	},
};
</script>
<style lang="scss" scoped>
.custom-input {
	display: grid;
	gap: 0.8em;

	label {
		font-size: 0.9em;
		font-weight: 500;
		color: var(--text-color);
		cursor: pointer;
	}

	&-design {
		border: none;
		border-radius: var(--box-radius--normal);
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		padding: 0 1.5em;
	}
}
</style>
