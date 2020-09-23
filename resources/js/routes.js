import VueRouter from "vue-router";
import Bookables from "./bookables/Bookables.vue";
import Bookable from "./bookable/Bookable.vue";

const routes = [
    {
        path: "/",
        component: Bookables,
        name: "home",
    }, {
        path: "/bookable/:id",
        component: Bookable,
        name: "bookable",
    }
]

const router = new VueRouter({
    routes, //short for routes: routes
    mode: "history", // # 이 없어짐
});

export default router;