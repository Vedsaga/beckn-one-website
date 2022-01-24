<template>
	<HeaderLogin />
	<div class="login">
		<div class="login-grid">
			<div class="welcome-message">
				<p>Log in</p>
				<h1>Welcome Back!</h1>
			</div>
			<div class="credentials">
				<div class="input-field">
					<input type="text" v-model="username" placeholder="Username" />
				</div>
				<div class="input-field">
					<input type="password" v-model="password" placeholder="Password" />
				</div>
			</div>
			<div class="login-button" @submit.prevent="login">
				<button @click="login">Login</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import HeaderLogin from "@/components/headers/HeaderLogin.vue";

export default {
	name: "LoginPage",
	components: {
		HeaderLogin,
	},
	data() {
		return {
			username: "",
			password: "",
		};
	},
	methods: {
		async login() {
			await axios
				.post("https://beckn-one.succinct.in/login", {
					User: {
						Name: this.username,
						Password: this.password,
					},
				})
				.then((res) => {
					if (res.status === 200) {
						this.$store.commit("setToken", res.data["api_key"]);
					}
				})
				.catch((err) => {
					console.log(err);
					alert("Invalid username or password");
				});
		},
	},
};
</script>
