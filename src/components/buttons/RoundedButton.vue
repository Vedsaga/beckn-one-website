<template>
	<button class="class-button" type="submit">
		<slot></slot>
	</button>
</template>
<script>
export default {
	name: "RoundedButton",
	props: {
		color: {
			type: String,
			default: "#fff",
		},
		background: {
			type: String,
			default: "#000",
		},
		size: {
			type: String,
			default: "medium",
		},
	},
};
</script>

<style lang="scss" scoped>
.class-button {
	position: relative;
	display: inline-block;
	width: 20em;
	height: 3.3em;
	border-radius: 0.75em;
	background-color: var(--gray-complement);
	color: var(--info-text);
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	text-decoration: none;
	text-align: center;
	font-size: 1rem;
	font-family: "Montserrat", sans-serif;
	line-height: 1.5;
	font-weight: bold;
	outline: none;
	border: none;

	&:hover {
		color: var(--white-bg);
		background-color: var(--light-blue);
		box-shadow: var(--dark-shadow);
		transition: all 0.3s ease-in-out;
	}

	&:active {
		transform: scale(0.95);
		transition: all 0.3s ease-in-out;
	}

	&:focus {
		outline: none;
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
}
</style>
