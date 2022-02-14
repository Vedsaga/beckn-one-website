import Home from "@/views/Home";
import LoginPage from "@/views/LoginPage";
import Dashboard from "@/views/Dashboard";
import CreateParticipant from "@/views/CreateParticipant";
import _404 from "@/views/404";
import ViewTestRoles from "@/views/View-Test-Roles";

export default [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            title: "Home",
            requiresAuth: false,
        },
    },
    {
        path: "/login",
        name: "LoginPage",
        component: LoginPage,
        meta: {
            title: "Login",
            requiresAuth: false,
        },
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
            title: "Dashboard",
            requiresAuth: true,
        },
    },
    {
        path: "/create-participant",
        name: "CreateParticipant",
        component: CreateParticipant,
        meta: {
            title: "Create Participant",
            requiresAuth: true,
        },
    },
    {
        path: "/view-test-roles/:id",
        name: "ViewTestRoles",
        component: ViewTestRoles,
        meta: {
            title: "View Test Roles",
            requiresAuth: true,
        },
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: _404,
        meta: {
            title: "404",
            requiresAuth: false,
        },
    },

];
