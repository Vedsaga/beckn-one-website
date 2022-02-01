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
