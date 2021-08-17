import Vue from "vue"
import VueRouter from "vue-router"

const home = () => import('views/home/home')
const cart = () => import('views/cart/cart')
const category = () => import('views/category/category')
const profile = () => import('views/profile/profile')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter)
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: home
  },
  {
    path: "/cart",
    component: cart
  },
  {
    path: "/category",
    component: category
  },
  {
    path: "/profile",
    component: profile
  },
  {
    path: "/detail/:id",
    component: Detail
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router