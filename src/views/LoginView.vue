<template>
  <div class="min-h-[calc(100vh-10rem)] flex items-center justify-center py-8 px-4">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-primary-100 dark:border-gray-700">

      <!-- Brand header — same logo as sidebar -->
      <div class="flex flex-col items-center mb-7">
        <div class="w-16 h-16 rounded-2xl bg-primary-700 flex items-center justify-center mb-3 shadow-lg p-1">
          <BrandLogo :size="56" />
        </div>
        <h1 class="text-2xl font-bold text-primary-800 dark:text-primary-300">TimeOff Hub</h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">Sign in to your account</p>
      </div>

      <AlertMessage :message="authStore.error" type="error" class="mb-4" />

      <form @submit.prevent="handleLogin" novalidate>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            required
            class="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-400"
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="••••••"
            required
            class="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full bg-primary-700 hover:bg-primary-600 text-white py-2.5 rounded-xl text-sm font-semibold transition shadow-md hover:shadow-lg disabled:opacity-60"
        >
          {{ authStore.loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
        Don't have an account?
        <router-link to="/register" class="text-primary-600 dark:text-primary-400 hover:underline font-semibold ml-1">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AlertMessage from '../components/AlertMessage.vue'
import BrandLogo    from '../components/BrandLogo.vue'

const authStore = useAuthStore()
const router    = useRouter()
const form      = reactive({ email: '', password: '' })

const handleLogin = async () => {
  const result = await authStore.login({ email: form.email, password: form.password })
  if (result.success) {
    router.push(authStore.isEmployee ? '/employee/dashboard' : '/employer/dashboard')
  }
}
</script>
