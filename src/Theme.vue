<template>
	<router-view />
</template>

<style lang="scss">
:root {
	--global-h1-size: clamp(2em, calc(9 / 80 * 21vw), 5em);
	--global-h2-size: clamp(1.5em, calc(9 / 80 * 21vw), 4em);
	--global-h3-size: clamp(1.25em, calc(9 / 80 * 21vw), 3em);
	--global-h4-size: clamp(1em, calc(9 / 80 * 21vw), 3.5em);
	--global-h5-size: clamp(0.75em, calc(9 / 80 * 21vw), 3em);
	--global-h6-size: clamp(0.5em, calc(9 / 80 * 21vw), 2.5em);
	--global-p-size: clamp(0.75em, calc(9 / 80 * 21vw), 1.5em);
	--global-a-size: clamp(0.75em, calc(9 / 80 * 21vw), 1em);
	--global-font-size: clamp(0.75em, calc(9 / 80 * 21vw), 1em);
	--global-font-weight: 400;
	--text-letter-spacing: 0.1rem;
	--text-color: #130F26;
	--info-text-color: #9D9D9D;
	--bg-color: #E5E5E5;
	--bg-color-light: #F5F7FB;
	--black-color: #000;
	--white-color: #FFF;
	--red-color: #E63946;
	--green-color: #2AE2BD;;
	--blue-color: #00a0ff;
	--yellow-color: #FCA311;
	--box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
	--box-shadow-hover: 0px 0px 10px rgba(0, 0, 0, 0.21);
	--box-radius--normal: 8px;
	--box-radius--medium: 13px;
}

body {
	padding: 0 162px;
	margin: 0 auto;
	font-family: "Montserrat", sans-serif;
	background-color: var(--bg-color-light);
	color: var(--text-color);

	h1 {
		font-size: var(--global-h1-size);
		display: inline-flex;
	}

	h2 {
		font-size: var(--global-h2-size);
		display: inline-flex;
	}

	h3 {
		font-size: var(--global-h3-size);
		display: inline-flex;
	}

	h4 {
		font-size: var(--global-h4-size);

	}

	h5 {
		font-size: var(--global-h5-size);
	}

	h6 {
		font-size: var(--global-h6-size);
	}

	p {
		font-size: var(--global-p-size);
		line-height: 1.5;
		font-weight: 600;
		letter-spacing: var(--text-letter-spacing);

	}

	a {
		font-size: var(--global-a-size);
		color: var(--blue-color);
	}
}

a {
	text-decoration: none;
	color: inherit;
}

input {
	border: none;
	outline: none;
	background-color: var(--bg-color);
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
	}
}
</style>
