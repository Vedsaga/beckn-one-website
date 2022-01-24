<template>
	<router-view />
</template>

<style lang="scss">
:root {
	--text-color: #130F26;;
	--info-text-color: #9d9d9d;
	--bg-color: #E5E5E5;
}

body {
	margin: 0;
	font-family: "Montserrat", sans-serif;
	background-color: var(--bg-color);
	color: var(--text-color);
	font-size: 13px;
}

a {
	text-decoration: none;
	color: inherit;
}
</style>
