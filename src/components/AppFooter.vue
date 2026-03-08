<template>
  <footer
    :class="[
      'border-t mt-auto transition-colors duration-300 px-6 py-10 lg:px-12',
      isDark ? 'bg-gray-900 border-gray-800 text-gray-400' : 'bg-white border-gray-100 text-gray-500'
    ]"
  >
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      
      <!-- Brand & Description -->
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-primary-700 flex items-center justify-center shadow-lg p-1 overflow-hidden">
            <BrandLogo :size="36" />
          </div>
          <span class="text-xl font-bold tracking-tight" :class="isDark ? 'text-white' : 'text-primary-800'">
            TimeOff Hub
          </span>
        </div>
        <p class="text-sm leading-relaxed max-w-xs">
          Empowering teams with seamless leave management since {{ year }}. 
          Simplifying the process for both employees and employers.
        </p>
        <div class="flex items-center gap-4 pt-2">
          <a href="#" class="hover:text-primary-500 transition-colors" aria-label="LinkedIn">
            <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="#" class="hover:text-primary-500 transition-colors" aria-label="Twitter">
            <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
          </a>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="grid grid-cols-2 gap-8">
        <div>
          <h4 class="font-bold mb-4 uppercase text-xs tracking-widest" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
            Company
          </h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-primary-600 transition-colors">About Us</a></li>
            <li><a href="#" class="hover:text-primary-600 transition-colors">Careers</a></li>
            <li><a href="#" class="hover:text-primary-600 transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-primary-600 transition-colors">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4 uppercase text-xs tracking-widest" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
            Resources
          </h4>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/documentation" class="hover:text-primary-600 transition-colors">Documentation</router-link></li>
            <li><a href="#" class="hover:text-primary-600 transition-colors">Help Center</a></li>
            <li><a href="#" class="hover:text-primary-600 transition-colors">Contact Support</a></li>
            <li><a href="#" class="hover:text-primary-600 transition-colors">FAQs</a></li>
          </ul>
        </div>
      </div>

      <!-- Newsletter -->
      <div class="space-y-4">
        <h4 class="font-bold uppercase text-xs tracking-widest" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
          Stay Updated
        </h4>
        <p class="text-sm">Get the latest news on leave policies.</p>
        <form @submit.prevent class="flex gap-2">
          <input 
            type="email" 
            placeholder="Work email" 
            class="flex-1 bg-transparent border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            :class="isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200'"
          />
          <button class="bg-primary-700 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm">
            Send
          </button>
        </form>
      </div>

    </div>

    <!-- Bottom Bar -->
    <div class="max-w-7xl mx-auto pt-10 mt-10 border-t flex flex-col sm:flex-row justify-between items-center gap-4" :class="isDark ? 'border-gray-800' : 'border-gray-50'">
      <p class="text-xs">
        &copy; {{ year }} TimeOff Hub &middot; All rights reserved.
      </p>
      <div class="flex items-center gap-6 text-xs font-semibold">
        <span class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          System Status: Online
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '../stores/theme'
import BrandLogo from './BrandLogo.vue'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)
const year = new Date().getFullYear()
</script>
