<template>
	<div class="custom-area-text">
		<label :for="labelId">{{ label }}</label>
		<textarea
			cols="30"
			rows="10"
			:id="labelId"
			class="custom-input-design input-label"
			:placeholder="placeholder"
			:value="modelValue"
			@input="updateValue($event.target.value)"
		>
		</textarea>
	</div>
</template>

<script>
export default {
	name: "CustomTextArea",
	props: {
		placeholder: {
			type: String,
			required: true,
		},
		modelValue: {
			type: String,
		},
		labelId: {
			type: String,
			required: true,
		},
		label: {
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

<style lang="scss" scoped></style>
