<script setup lang="ts">
import { Mail, MapPin } from 'lucide-vue-next';
</script>

<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div class="mb-12">
      <h2 class="text-3xl font-light serif mb-4">建立联系</h2>
      <div class="h-1 w-12 bg-black dark:bg-white"></div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-20">
      <div class="space-y-12">
        <p class="text-xl font-light opacity-70 dark:opacity-100 dark:text-zinc-300">
          无论是项目合作、技术探讨，还是仅仅想打个招呼，都欢迎给我留言。
        </p>
        <div class="space-y-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center">
              <Mail :size="20" />
            </div>
            <div>
              <p class="text-xs uppercase tracking-widest opacity-50 dark:opacity-100 dark:text-zinc-500">Email</p>
              <p>hello@studio.me</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center">
              <MapPin :size="20" />
            </div>
            <div>
              <p class="text-xs uppercase tracking-widest opacity-50 dark:opacity-100 dark:text-zinc-500">Base</p>
              <p>Shanghai, China</p>
            </div>
          </div>
        </div>
      </div>
      
      <form class="space-y-6" @submit.prevent>
        <div class="space-y-2">
          <label class="text-xs uppercase tracking-widest font-bold opacity-60 dark:opacity-90 dark:text-zinc-300">您的称呼</label>
          <input type="text" class="w-full bg-transparent border-b border-gray-200 dark:border-zinc-800 py-3 focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder:opacity-30 dark:text-white" placeholder="Name" />
        </div>
        <div class="space-y-2">
          <label class="text-xs uppercase tracking-widest font-bold opacity-60 dark:opacity-90 dark:text-zinc-300">电子邮件</label>
          <input type="email" class="w-full bg-transparent border-b border-gray-200 dark:border-zinc-800 py-3 focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder:opacity-30 dark:text-white" placeholder="Email" />
        </div>
        <div class="space-y-2">
          <label class="text-xs uppercase tracking-widest font-bold opacity-60 dark:opacity-90 dark:text-zinc-300">具体内容</label>
          <textarea rows="4" class="w-full bg-transparent border border-gray-200 dark:border-zinc-800 p-4 rounded-xl focus:outline-none focus:border-black dark:focus:border-white transition-colors mt-2 placeholder:opacity-30 dark:text-white" placeholder="Tell me everything..."></textarea>
        </div>
        <button class="w-full py-4 bg-black text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-xl font-bold hover:scale-[1.02] transition-transform active:scale-[0.98]">
          发送消息
        </button>
      </form>
    </div>
  </div>
</template>
