import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Lazy-load views
const LoginView = () => import('../views/LoginView.vue')
const RegisterView = () => import('../views/RegisterView.vue')
const EmployeeDashboard = () => import('../views/EmployeeDashboard.vue')
const EmployerDashboard = () => import('../views/EmployerDashboard.vue')
const ApplyLeave = () => import('../views/ApplyLeave.vue')
const Documentation = () => import('../views/DocumentationView.vue')
const NotFound = () => import('../views/NotFound.vue')

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: LoginView, meta: { guestOnly: true } },
    { path: '/register', name: 'Register', component: RegisterView, meta: { guestOnly: true } },
    { path: '/documentation', name: 'Documentation', component: Documentation },
    {
        path: '/employee/dashboard',
        name: 'EmployeeDashboard',
        component: EmployeeDashboard,
        meta: { requiresAuth: true, role: 'employee' },
    },
    {
        path: '/employee/apply',
        name: 'ApplyLeave',
        component: ApplyLeave,
        meta: { requiresAuth: true, role: 'employee' },
    },
    {
        path: '/employer/dashboard',
        name: 'EmployerDashboard',
        component: EmployerDashboard,
        meta: { requiresAuth: true, role: 'employer' },
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Navigation guard
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.guestOnly && authStore.isAuthenticated) {
        // Redirect logged in users away from login/register
        return next(authStore.isEmployee ? '/employee/dashboard' : '/employer/dashboard')
    }

    if (to.meta.requiresAuth) {
        if (!authStore.isAuthenticated) {
            return next('/login')
        }
        if (to.meta.role && authStore.user.role !== to.meta.role) {
            // Redirect to correct dashboard if wrong role
            return next(authStore.isEmployee ? '/employee/dashboard' : '/employer/dashboard')
        }
    }

    next()
})

export default router
