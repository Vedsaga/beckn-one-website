import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import LoginPage from "../views/LoginPage.vue";
import Dashboard from "@/views/Dashboard";


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            title: "Home",
            requiresAuth: true,

        }
    },
    {
        path: "/login",
        name: "LoginPage",
        component: LoginPage,
        meta: {
            title: "Login",
            requiresAuth: false
        }
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
            title: "Dashboard",
            requiresAuth: true
        }
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
