<template>
	<div class="error-wrapper">
		<div class="error-container">
			<h1>404 - Page not found</h1>
			<p>The page you are looking for does not exist.</p>

			<CurvedButton id="home">
				<router-link to="/">Go to home page</router-link>
			</CurvedButton>
		</div>
	</div>
</template>

<script>
import CurvedButton from "@/components/buttons/CurvedButton";

export default {
	name: "404",
	components: {
		CurvedButton,
	},
};
</script>

<style lang="scss" scoped>
#home {
	margin: 2em auto 0;

	a {
		color: rgba(255, 255, 255, 1);
	}
}

.error {
	&-container {
		h1 {
			margin: 0;
		}
	}

	&-wrapper {
		display: grid;
		place-items: center;
		height: 100vh;
	}
}
</style>
