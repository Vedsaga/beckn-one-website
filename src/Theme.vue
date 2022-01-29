<template>
	<router-view />
</template>

<style lang="scss">
:root {
	--global-h1-size: clamp(2em, calc(9 / 80 * 21vw), 5em);
	--global-p-size: clamp(0.75em, calc(9 / 200 * 21vw), 1.5em);
	--global-a-size: clamp(0.75em, calc(9 / 80 * 21vw), 1em);
	--global-font-size: clamp(0.75em, calc(9 / 80 * 21vw), 1em);
	--global-font-weight: 400;
	--text-letter-spacing: 0.1rem;
	--text-letter-p: 0.06rem;
	--text-color: #16161b;
	--info-text-color: #9d9d9d;
	--bg-color: #e5e5e5;
	--bg-color-light: #f5f7fb;
	--black-color: #101010;
	--white-color: #f5f7fb;
	--red-color: #e63946;
	--green-color: #2ae2bd;
	--blue-color: #00a0ff;
	--orange-gardient: linear-gradient(90deg, #f15a24 0%, #f68f1f 98.29%, #f68f1f 98.29%);
	--box-shadow: -5px 5px 34px rgba(0, 0, 0, 0.13);
	--box-shadow-hover: 0px 0px 10px rgba(0, 0, 0, 0.21);
	--box-radius--normal: 8px;
	--box-radius--medium: 13px;
	--box-radius--large: 21px;
}

body {
	padding: 0 10em;
	margin: 0 auto;
	font-family: "Montserrat", sans-serif;
	background-color: var(--bg-color);
	color: var(--text-color);

	h1 {
		font-size: var(--global-h1-size);
		display: inline-flex;
	}
	p {
		font-size: var(--global-p-size);
		line-height: 1.5;
		font-weight: 600;
		letter-spacing: var(--text-letter-p);
		font-family: "Montserrat", sans-serif;
	}

	a {
		font-size: var(--global-a-size);
		text-decoration: none;
		color: var(--text-color);
		:hover {
			color: var(--blue-color);
		}
	}
}

button {
	outline: none;
}

input {
	border: none;
	outline: none;
	background-color: var(--bg-color-light);
	color: inherit;
	font-family: inherit;
	font-size: var(--global-font-size);
	font-weight: var(--global-font-weight);
	width: 20em;
	height: 3.3em;
	margin: 0;

	&:focus {
		background: transparent;
		outline: 3px var(--green-color) solid;
		font-family: var(global-font-size);
		font-weight: 600;
		color: var(--text-color);
		transition: all 0.3s ease-in-out;
	}
}
</style>
