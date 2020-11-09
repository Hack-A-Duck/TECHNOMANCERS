import homePage from "./components/Homepage"
import login from "./components/Login"
import signup from "./components/Signup"
import items from "./components/Items";
import itemdesc from "./components/ItemDesc"
import checkout from "./components/checkout"
import address from "./components/Address"
import orders from "./components/Orders"

export const routes = [
    {path: "/", component: homePage, name: "home"},
    {path: "/login", component: login, name: "login"},
    {path: "/signup", component: signup, name: "signup"},
    {path: "/items", component: items, name: "items"},
    {path: "/itemdesc", component: itemdesc, name: "itemdesc"},
    {path: "/checkout", component: checkout, name: "checkout"},
    {path: "/add_address", component: address, name: "address"},
    {path: '/orders', component: orders, name: "orders"}
]