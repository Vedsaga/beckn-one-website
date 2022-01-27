<template>
	<header class="header">
		You Are logged in as <strong>{{Name}}</strong>
	</header>

</template>

<script>
		export default {
				name: 'Dashboard',
			data() {
				return {
					Name: this.$store.getters.getToken,
				};
			},
		}

</script>

<style>

</style>