<template>
	<button class="curved-button" type="submit">
		<slot></slot>
	</button>
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
	align-items: center;
	width: max-content;
	height: max-content;
	padding: 1em 2em;
	gap: 1em;

	border-radius: 2.5em; /* how to set up border-radius equal to height of the button? */
	background: var(--orange-gardient);
	box-shadow: var(--dark-shadow);
	color: var(--white-bg);
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	text-align: center;
	font-size: 0.812rem;
	letter-spacing: 0.02em;
	line-height: 1rem;
	font-weight: 600;
	outline: none;
	text-decoration: none;
	font-family: "Montserrat", sans-serif;
	border: none;

	&:hover {
		transform: scale(1.1);
	}

	&:active {
		transform: scale(0.95);
	}

	&:disabled {
		cursor: not-allowed;
		background: var(--gray-complement);
		color: var(--dark-bg-header);
		opacity: 0.55;
		box-shadow: none;
		&:hover {
			transform: none;
		}
	}
}
</style>
