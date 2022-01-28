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
.class-button {
	position: relative;
	display: inline-block;
	padding: 0.5rem 1rem;
	border-radius: 0.25rem;
	background-color: #fff;
	color: #000;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	text-align: center;
	font-size: 1rem;
	line-height: 1.5;
	font-weight: 400;
	border: 1px solid #000;
	outline: none;
	&:hover {
		background-color: #000;
		color: #fff;
	}
	&:active {
		transform: scale(0.95);
	}
	&:focus {
		box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
	}
	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	&:disabled:hover {
		background-color: #fff;
		color: #000;
	}
	&:disabled:active {
		transform: scale(0.95);
	}
	&:disabled:focus {
		box-shadow: none;
	}
	&:focus:not(:focus-visible) {
		box-shadow: none;
	}
	&:focus-visible {
		box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
	}
	&:focus-visible:not(:focus) {
		box-shadow: none;
	}
	&:focus-visible:focus {
		box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
	}
}
</style>
