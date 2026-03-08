<template>
  <div class="max-w-5xl mx-auto py-10 px-6 space-y-16 animate-fade-in">
    
    <!-- ── Header ────────────────────────────────────────── -->
    <header class="text-center space-y-4">
      <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-bold uppercase tracking-wider">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        Technical Documentation
      </div>
      <h1 class="text-4xl lg:text-5xl font-extrabold tracking-tight" :class="isDark ? 'text-white' : 'text-gray-900'">
        Inside <span class="text-primary-600">TimeOff Hub</span>
      </h1>
      <p class="text-lg max-w-2xl mx-auto" :class="isDark ? 'text-gray-400' : 'text-gray-600'">
        A comprehensive guide to the architecture, workflows, and technical inner workings of our leave management system.
      </p>
    </header>

    <!-- ── High-Level Architecture ─────────────────────── -->
    <section class="space-y-6">
      <div class="flex items-center gap-4">
        <h2 class="text-2xl font-bold" :class="isDark ? 'text-gray-100' : 'text-gray-800'">1. System Architecture</h2>
        <div class="flex-1 h-px bg-gradient-to-r from-primary-500/50 to-transparent"></div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 lg:p-8 border dark:border-gray-700 shadow-xl overflow-hidden relative">
        <!-- Visual Diagram: Architecture (Scrollable on small screens) -->
        <div class="overflow-x-auto pb-4 scrollbar-thin">
          <div class="flex flex-row items-center justify-around gap-8 md:gap-12 relative z-10 min-w-[600px] lg:min-w-0">
          
          <!-- Frontend -->
          <div class="text-center group">
            <div class="w-16 h-16 mx-auto mb-3 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 border border-emerald-200 dark:border-emerald-800 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h4 class="font-bold">Frontend</h4>
            <p class="text-xs text-gray-500">Vue.js 3 & Vite</p>
          </div>

          <div class="hidden md:block">
             <svg class="w-24 h-8 animate-pulse text-primary-400" viewBox="0 0 100 20"><path d="M0 10 H90 L85 5 M90 10 L85 15" fill="none" stroke="currentColor" stroke-width="2"/></svg>
          </div>

          <!-- Backend -->
          <div class="text-center group">
            <div class="w-16 h-16 mx-auto mb-3 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 border border-blue-200 dark:border-blue-800 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
            </div>
            <h4 class="font-bold">Backend API</h4>
            <p class="text-xs text-gray-500">Node.js Express</p>
          </div>

          <div class="hidden md:block">
             <svg class="w-24 h-8 animate-pulse text-primary-400" viewBox="0 0 100 20"><path d="M0 10 H90 L85 5 M90 10 L85 15" fill="none" stroke="currentColor" stroke-width="2"/></svg>
          </div>

          <!-- Database -->
          <div class="text-center group">
            <div class="w-16 h-16 mx-auto mb-3 rounded-2xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 border border-amber-200 dark:border-amber-800 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            </div>
            <h4 class="font-bold">Database</h4>
            <p class="text-xs text-gray-500">MongoDB Atlas</p>
          </div>

        </div>
        </div>
        
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm relative z-10">
          <div class="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
            <h5 class="font-bold text-primary-600 mb-1">Modern UI/UX</h5>
            <p :class="isDark ? 'text-gray-400' : 'text-gray-500'">Built with Vue 3 composition API and Tailwind CSS for the best performance and responsiveness.</p>
          </div>
          <div class="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
            <h5 class="font-bold text-primary-600 mb-1">Secure & Fast</h5>
            <p :class="isDark ? 'text-gray-400' : 'text-gray-500'">JWT-based authentication and MongoDB indexing ensure data integrity and sub-second query responses.</p>
          </div>
        </div>

        <!-- Decorative background elements -->
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>
    </section>

    <!-- ── Leave Workflow ──────────────────────────────── -->
    <section class="space-y-6">
      <div class="flex items-center gap-4">
        <h2 class="text-2xl font-bold" :class="isDark ? 'text-gray-100' : 'text-gray-800'">2. Process Workflow</h2>
        <div class="flex-1 h-px bg-gradient-to-r from-primary-500/50 to-transparent"></div>
      </div>

      <div class="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary-500/50 before:to-transparent">
        
        <!-- Workflow Step 1 -->
        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div class="flex items-center justify-center w-10 h-10 rounded-full border border-primary-300 dark:border-primary-700 bg-white dark:bg-gray-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            <span class="text-sm font-bold text-primary-600">1</span>
          </div>
          <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl border dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg hover:border-primary-500 transition-colors">
            <h4 class="font-extrabold mb-1">Submission</h4>
            <p class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Employee selects leave type, dates, and reason. The system calculates duration and flags any conflicts.</p>
          </div>
        </div>

        <!-- Workflow Step 2 -->
        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div class="flex items-center justify-center w-10 h-10 rounded-full border border-primary-300 dark:border-primary-700 bg-white dark:bg-gray-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            <span class="text-sm font-bold text-primary-600">2</span>
          </div>
          <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl border dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg hover:border-primary-500 transition-colors">
            <h4 class="font-extrabold mb-1">Employer Notified</h4>
            <p class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Request appears on the employer dashboard in the 'Pending' queue for immediate attention.</p>
          </div>
        </div>

        <!-- Workflow Step 3 -->
        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div class="flex items-center justify-center w-10 h-10 rounded-full border border-primary-300 dark:border-primary-700 bg-white dark:bg-gray-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            <span class="text-sm font-bold text-primary-600">3</span>
          </div>
          <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl border dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg hover:border-primary-500 transition-colors">
            <h4 class="font-extrabold mb-1">Decision Engine</h4>
            <p class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Employer reviews historical data and clicks Approve/Reject. An optional note can explain the decision.</p>
          </div>
        </div>

        <!-- Workflow Step 4 -->
        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div class="flex items-center justify-center w-10 h-10 rounded-full border border-primary-300 dark:border-primary-700 bg-white dark:bg-gray-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            <span class="text-sm font-bold text-primary-600">4</span>
          </div>
          <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl border dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg hover:border-primary-500 transition-colors">
            <h4 class="font-extrabold mb-1">Persistence</h4>
            <p class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Status is updated instantly for the employee. Metadata is archived for historical audits and reporting.</p>
          </div>
        </div>

      </div>
    </section>

    <!-- ── Data Flow & API ─────────────────────────────── -->
    <section class="space-y-6">
      <div class="flex items-center gap-4">
        <h2 class="text-2xl font-bold" :class="isDark ? 'text-gray-100' : 'text-gray-800'">3. Data Distribution</h2>
        <div class="flex-1 h-px bg-gradient-to-r from-primary-500/50 to-transparent"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Chart: Leave Type Distribution -->
        <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 border dark:border-gray-700 shadow-lg">
          <h4 class="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Leave Allocation (Typical)</h4>
          <div class="space-y-4">
            <ChartBar label="Annual Leave" percentage="45" color="bg-emerald-500" />
            <ChartBar label="Sick Leave" percentage="20" color="bg-red-500" />
            <ChartBar label="Casual Leave" percentage="15" color="bg-amber-500" />
            <ChartBar label="Other Categories" percentage="10" color="bg-blue-500" />
          </div>
        </div>

        <!-- API Map -->
        <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 border dark:border-gray-700 shadow-lg flex flex-col justify-center">
            <h4 class="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">REST API Endpoints</h4>
            <div class="space-y-2">
                <ApiEndpoint method="GET" path="/api/leaves" desc="Fetch all requests" />
                <ApiEndpoint method="POST" path="/api/leaves" desc="Submit new request" />
                <ApiEndpoint method="PATCH" path="/api/leaves/:id" desc="Update status" />
                <ApiEndpoint method="GET" path="/api/auth/me" desc="Validate session" />
            </div>
        </div>
      </div>
    </section>

    <!-- ── Tech Stack Footer ───────────────────────────── -->
    <section class="pt-10 border-t dark:border-gray-700 flex flex-wrap justify-around gap-8 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">
        <div class="flex items-center gap-2"><span>🟢</span> Node.js Ecosystem</div>
        <div class="flex items-center gap-2"><span>🟢</span> MongoDB Driver</div>
        <div class="flex items-center gap-2"><span>🟢</span> Vue Composition API</div>
        <div class="flex items-center gap-2"><span>🟢</span> Tailwind CSS 3.0</div>
    </section>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '../stores/theme'
import { defineComponent, h } from 'vue'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)

// ── Inline Helper: Chart Bar ───────────────────────────
const ChartBar = defineComponent({
  props: { label: String, percentage: String, color: String },
  setup(props) {
    return () => h('div', { class: 'space-y-1' }, [
      h('div', { class: 'flex justify-between text-xs font-semibold' }, [
        h('span', null, props.label),
        h('span', { class: 'opacity-60' }, `${props.percentage}%`)
      ]),
      h('div', { class: 'w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden' }, [
        h('div', { 
            class: `h-full rounded-full ${props.color} transition-all duration-1000`, 
            style: `width: ${props.percentage}%` 
        })
      ])
    ])
  }
})

// ── Inline Helper: API Endpoint ───────────────────────
const ApiEndpoint = defineComponent({
    props: { method: String, path: String, desc: String },
    setup(props) {
        const methodColor = {
            GET: 'text-blue-500 bg-blue-500/10',
            POST: 'text-emerald-500 bg-emerald-500/10',
            PATCH: 'text-amber-500 bg-amber-500/10',
            DELETE: 'text-red-500 bg-red-500/10'
        }[props.method] || 'bg-gray-500/10'

        return () => h('div', { class: 'flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-colors' }, [
            h('div', { class: 'flex items-center gap-3 overflow-hidden mr-2' }, [
                h('span', { class: `px-1.5 py-0.5 rounded text-[10px] font-black ${methodColor}` }, props.method),
                h('span', { class: 'text-xs font-mono truncate' }, props.path)
            ]),
            h('span', { class: 'text-[10px] text-gray-400 whitespace-nowrap' }, props.desc)
        ])
    }
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
