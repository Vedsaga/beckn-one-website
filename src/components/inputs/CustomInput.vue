<!-- CustomInput.vue -->
<template>
	<input class="field-design input-label" type="text" :value="modelValue" @input="updateModelValue" />
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
.field-design {
	border: none;
	border-radius: var(--box-radius--normal);
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 0 1.5em;
}
.input-label {
	display: flex;
	align-items: flex-start;
	margin-bottom: 2.2em;
}
</style>
