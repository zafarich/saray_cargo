import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const router = createRouter({
    history: createWebHistory("#"),
    routes: [
        {
            path: "/",
            name: "index",
            component: () => import("@/pages/index.vue"),
        },
        {
            path: "/orders",
            name: "orders",
            component: () => import("@/pages/orders/index.vue"),
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/pages/auth/login.vue"),
            meta: {
                layout: "empty",
                guest: true,
            },
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    console.log("user", authStore.user);
    if (to.matched.some(record => record.meta.guest) || authStore.isAuth) {
        if (to.name == "login" && authStore.isAuth) {
            next("/");
        } else {
            next();
        }
        return;
    } else {
        if (!authStore.isAuth) {
            next("/login");
            return;
        }
    }
});

export default router;
