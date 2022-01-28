<template>
	<button>
		<slot></slot>
	</button>

</template>

<script>
export default {
	name: "SquareButton"
};
</script>

<style lang="scss" scoped>

button {
	background: var(--bg-color-light);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: "Montserrat", sans-serif;
	font-weight: 600;
	color: var(--text-color);
	font-size: 13px;
	box-shadow: var(--box-shadow);
	width: 6rem;
	height: 6rem;
	border: none;
	border-radius: var(--box-radius--large);
	gap: 0.6rem;
}
:hover{
	transform: scale(1.1);
	background: var(--bg-color-light);
	transition: all 0.3s ease-in-out;
}
:active{
	transform: scale(0.9);
	background: var(--bg-color-light);
	transition: all 0.3s ease-in-out;
}

</style>