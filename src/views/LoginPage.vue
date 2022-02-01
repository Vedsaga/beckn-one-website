<template>
	<HeaderLogin />
	<div class="form">
		<div class="form-head">
			<p>LogIN</p>
			<h1>Welcome Back!</h1>
		</div>
		<div class="form-body">
			<div class="form-group">
				<label for="username">username</label>
				<CustomInput id="username" v-model="Name" placeholder="username" />
			</div>
			<div class="form-group">
				<label for="password">password</label>
				<CustomInput id="password" v-model="Password" placeholder="password" type="password" />
			</div>
		</div>
		<RoundedButton class="center" @submit.prevent="login" @click="login"> Log in</RoundedButton>
		<a href="/oid/login?SELECTED_OPEN_ID=GOOGLE&_redirect_to=ui/dist/dashboard"
			><img src="/images/google-icon.svg"
		/></a>
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
.form {
	display: grid;
	place-items: center;
	grid-gap: 1em;

	&-head {
		h1 {
			font-size: 2em;
			font-weight: bold;
			margin: 0 auto;
			color: var(--text-color);
		}

		p {
			margin: 0 auto;
			color: var(--text-color);
			font-size: 1.5em;
		}
	}

	&-body {
		display: grid;
		grid-gap: 1em;
	}

	&-group {
		display: grid;
		grid-gap: 0.5em;
	}
}
</style>
