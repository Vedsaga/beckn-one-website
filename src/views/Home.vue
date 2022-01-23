<template>
	<HeaderLogin />
	<div class="hero">
		<div class="hero-left">
			<h1>
				create open digital commerce
				<span>networks with beckn</span>
			</h1>
		</div>
		<img src="@/assets/svgs/girl_spinning_the_globe.svg" alt="">
	</div>
</template>
<script>
import HeaderLogin from '@/components/headers/HeaderLogin.vue';

export default {
	name: "Home",
	components: {
		HeaderLogin
	}
};
</script>
<style lang="scss">
body {
	padding: 0 89px;
}
</style>
