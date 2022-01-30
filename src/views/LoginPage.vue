<template>
	<HeaderLogin />
	<div class="grid">
		<div class="login-message">
			<p>LogIN</p>
			<h1>Welcome Back!</h1>
		</div>
		<div class="center">
			<label for="username">username</label>
			<CustomInput id="username" v-model="Name" placeholder="username" />
			<label for="password">password</label>
			<CustomInput id="password" v-model="Password" placeholder="password" />
		</div>
		<RoundedButton class="center" @submit.prevent="login" @click="login"> Log in</RoundedButton>
	</div>
</template>

<script>
import api_map from "@/axios/api_map";
import HeaderLogin from "@/components/headers/PreLoginHeader.vue";
import { mapActions } from "vuex";
import axios from "axios";

import RoundedButton from "@/components/buttons/RoundedButton";
import CustomInput from "@/components/inputs/CustomInput";

export default {
	name: "LoginPage",
	components: {
		CustomInput,
		RoundedButton,
		HeaderLogin,
	},
	data() {
		return {
			Name: null,
			Password: null,
		};
	},
	methods: {
		...mapActions(["setToken", "setName", "setId", "setError", "setState"]),
		async login() {
			await axios
				.post("https://beckn-one.succinct.in/" + api_map.login, {
					User: {
						Name: this.Name,
						Password: this.Password,
					},
				})
				.then((response) => {
					if (response.status !== 200) return;

					this.setToken(response.data["api_key"]);
					this.setName(response.data["name"]);
					this.setId(response.data["id"]);
					this.setState("logged");
				})
				.catch((err) => {
					console.log(err);
					alert("Invalid username or password");
				});
			if (this.$store.getters.getState === "logged" && this.$store.getters.getToken != null) {
				await this.$router.push("/dashboard");
			} else {
				await this.$router.push("/login");
			}
		},
	},
};
</script>

<style lang="scss">
.grid {
	display: flex;
	margin: 5% auto;
	align-items: flex-start;
	flex-direction: column;
	justify-content: start;
	gap: 3rem;

	& > .login-message {
		display: grid;
		align-items: center;
		margin: 0 auto;

		& > p {
			font-size: 1.5em;
			font-weight: bold;
			color: var(--text-color);
			margin: 0;
		}

		& > h1 {
			font-size: 2em;
			font-weight: bold;
			color: var(--text-color);
			margin: 0 auto;
		}
	}
}

.center {
	margin: 0 auto;
	gap: 0;
}
</style>
