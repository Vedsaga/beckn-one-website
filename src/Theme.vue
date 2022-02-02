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
	--white-bg: #fff;
	--white-bg-header: #edf3fe;
	--dark-bg: #16161b;
	--dark-bg-header: #101010;
	--info-text: #9d9d9d;
	--gray-complement: #e5e5e5;
	--dark-green: #4caf50;
	--light-green:#2ae2bd;
	--dark-red: #e50000;
	--light-red: #e63946;
	--dark-blue: #00a0ff;
	--light-blue: #32c3ff;
	--orange-gardient: linear-gradient(90deg, #f15a24 0%, #f68f1f 98.29%, #f68f1f 98.29%);
	--dark-shadow: -5px 5px 34px rgba(0, 0, 0, 0.13);
	--light-shadow: -5px 5px 34px rgba(0, 0, 0, 0.08);
	--small-border-radius: 0.5rem; // ~8px
	--medium-border-radius: 0.812rem; // ~13px
	--border-radius: 1.312rem; // ~21px
	--large-border-radius: 2.125rem; // ~34px
	--small-padding:0.812rem; // ~13px
	--medium-padding:1.312rem; // ~21px
	--large-padding:2.125rem; // ~34px
	--small-gap:0.5rem; // ~8px
	--gap:0.812rem; // ~13px
	--medium-gap:1.312rem; // ~21px
	--large-gap:2.125rem; // ~34px
	--left-right-center: 0 auto;
	--top-bottom-center: auto 0;
	--input-width: min(100%, calc(100% - 2.5rem));
	--input-height: 3.3em;
}

body {
	font-family: "Montserrat", sans-serif;
	background-color: var(--white-bg);
	color: var(--text-color);
	padding: 0 10em;

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

</style>
