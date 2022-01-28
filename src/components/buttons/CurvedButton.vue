<template>
	<div class="curved-button">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "CurvedButton",
};
</script>

<style lang="scss" scoped>
.curved-button {
	position: relative;
	display: flex;
	width: max-content;
	padding: 0.9em 2em;
	border-radius: 1.25rem;
	background: var(--orange-gardient);
	box-shadow: var(--box-shadow-hover);
	color: var(--white-color);
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	text-align: center;
	font-size: 0.8125rem;
	letter-spacing: 0.02em;
	line-height: 1rem;
	font-weight: 600;
	outline: none;

	&:hover {
		transition: all 0.3s ease-in-out;
		transform: scale(1.1);
	}
	&:active {
		transform: scale(0.95);
	}
	&:disabled {
		cursor: not-allowed;
		background: #9D9D9D;
		opacity: 0.55;
	}
}
</style>
