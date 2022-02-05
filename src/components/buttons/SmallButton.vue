<template>
	<button>
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: "SmallButton",
};
</script>

<style scoped>
button {
	margin: 0 auto;
	display: flex;
	width: max-content;
	padding: var(--small-padding);
	border-radius: var(--medium-border-radius);
	border: none;
	font: inherit;
	font-weight: 500;
	font-size: 0.8125rem;
	transition: all 0.3s ease-in-out;
	box-shadow: var(--dark-shadow);
	background: var(--dark-bg);
	color: var(--white-bg);
}
</style>
