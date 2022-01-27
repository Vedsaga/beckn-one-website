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
			default: "#fff"
		},
		background: {
			type: String,
			default: "#000"
		},
		size: {
			type: String,
			default: "medium"
		}
	}
};
</script>

<style lang="scss" scoped>
.class-button {
	position: relative;
	display: inline-block;
	width: 20em;
	height: 3.3em;
	border-radius: 0.75em;
	background-color: var(--info-text-color);
	color: var(--white-color);
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
		color: #fff;
		background-color: var(--blue-color);
		box-shadow: var(--box-shadow-hover);
	}

	&:active {
		transform: scale(0.95);
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