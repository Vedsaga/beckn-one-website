<template>
	<div class="custom-tab">
		{{ tabName }}
	</div>
</template>

<script>
export default {
	name: "CustomTab",
	props: {
		tabName: {
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.custom-tab {
	display: flex;
	padding: var(--medium-padding) var(--large-padding);
	background: transparent;
	border-radius: var(--medium-border-radius);
	font-size: 0.94rem;
	font-weight: 600;
	&:hover {
		transition: all 0.3s ease-in-out;
	}

	&.active {
		transition: all 0.3s ease-in-out;
	}
}
</style>
