<template>
	<HeaderLogin />
	<div class="hero">
		<div class="hero-left">
			<h1>
				create open digital commerce
				<span> network with beckn</span>
			</h1>
			<p>
				BecknONE is an open network based on the beckn protocol. Beckn application programmers can use BecknONE portal
				to validate their beckn implementations.
			</p>
		</div>
		<div class="hero-right">
			<img src="@/assets/svgs/girl_spinning_the_globe.svg" alt="" />
		</div>
	</div>
</template>
<script>
import HeaderLogin from "@/components/headers/PreLoginHeader.vue";
export default {
	name: "Home",
	components: {
		HeaderLogin,
	},
};
</script>
<style lang="scss">
.hero {
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin: 0 auto;
	&-left {
		display: inline-flex;
		max-width: 50%;
		flex-direction: column;
		& > h1 {
			font-size: var(--global-h1-size);
			display: inline-block;
			& > span {
				font-weight: 300;
			}
		}
	}
	&-right {
		align-self: center;
		& > img {
			max-width: 100%;
		}
	}
}
</style>
