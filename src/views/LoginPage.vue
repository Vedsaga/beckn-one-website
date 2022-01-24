<template>
	<HeaderLogin/>
	<div class="login">
		<div class="login-grid">
			<div class="welcome-message">
				<p>
					Log in
				</p>
				<h1>
					Welcome Back!
				</h1>
			</div>
			<div class="credentials">
				<div class="input-field">
					<input type="text" v-model="username" placeholder="Username">
				</div>
				<div class="input-field">
					<input type="password" v-model="password" placeholder="Password">
				</div>
			</div>
			<div class="login-button" @submit.prevent="login">
				<button @click="login">
					Login
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
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
			//encode the username and password to json request
			let postData = {
				username: this.username,
				password: this.password,
			};
			// make the request to https://beckn-one.succinct.in/login
			let response = await axios.post("https://beckn-one.succinct.in/login", postData);
			// if the response is successful
			if (response.status === 200) {
				// store the response in the local storage
				localStorage.setItem("user", JSON.stringify(response.data));
				// redirect to the home page
				console.log(response.data);
			}
			else {
				// if the response is not successful
				// show the error message
				console.log(response.data);
			}
		},
	},
};
</script>
