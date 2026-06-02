<script setup lang="ts">
import { ref } from 'vue';
import { Home, BookOpen, User, MessageCircle, Github, LayoutGrid, Archive } from 'lucide-vue-next';

const isCollapsed = ref(true);
const navItems = [
  { icon: Home, label: '首页', id: 'home' },
  { icon: BookOpen, label: '文章', id: 'posts' },
  { icon: Archive, label: '归档', id: 'archives' },
  { icon: LayoutGrid, label: '分类', id: 'categories' },
  { icon: User, label: '关于', id: 'about' },
  { icon: MessageCircle, label: '留言', id: 'contact' },
];

defineProps<{
  currentTab: string
}>();

defineEmits(['update:currentTab']);
</script>

<template>
  <aside 
    :class="[
      'h-screen sticky top-0 bg-white/40 dark:bg-black/20 backdrop-blur-2xl border-r border-white/20 dark:border-white/10 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] z-50 flex flex-col overflow-y-auto overflow-x-hidden',
      isCollapsed ? 'w-20' : 'w-64'
    ]"
    @mouseenter="isCollapsed = false"
    @mouseleave="isCollapsed = true"
    id="sidebar"
  >
    <!-- Logo -->
    <div class="h-20 flex items-center justify-center border-b border-black/5 dark:border-white/5 overflow-hidden">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-black dark:bg-white flex items-center justify-center shrink-0 shadow-lg shadow-black/10 dark:shadow-white/10">
          <span class="text-white dark:text-black font-bold text-xl">S</span>
        </div>
        <span v-if="!isCollapsed" class="font-bold text-xl tracking-tight whitespace-nowrap transition-opacity duration-300 dark:text-white">
          STUDIO
        </span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 py-8 px-4 space-y-2">
      <div 
        v-for="item in navItems" 
        :key="item.id"
        @click="$emit('update:currentTab', item.id)"
        :class="[
          'group flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 cursor-pointer relative',
          currentTab === item.id 
            ? 'bg-black/5 dark:bg-white/10 text-black dark:text-white ring-1 ring-black/5 dark:ring-white/20 shadow-sm font-semibold' 
            : 'text-gray-500 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5'
        ]"
      >
        <component 
          :is="item.icon" 
          :size="22" 
          :class="[
            'shrink-0 transition-transform duration-500 group-hover:scale-110',
            currentTab === item.id ? 'scale-110' : ''
          ]" 
        />
        <span 
          v-if="!isCollapsed" 
          class="text-sm font-medium whitespace-nowrap transition-all duration-500 transform translate-x-0 opacity-100"
        >
          {{ item.label }}
        </span>
        
        <!-- Tooltip for collapsed state -->
        <div 
          v-if="isCollapsed"
          class="absolute left-full ml-4 px-2 py-1 bg-black dark:bg-zinc-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none whitespace-nowrap z-50 text-center min-w-[60px]"
        >
          {{ item.label }}
        </div>
      </div>
    </nav>


    <!-- Socials / Bottom -->
    <div class="p-4 border-t border-black/5 dark:border-white/5">
      <div :class="['flex items-center gap-3 overflow-hidden', isCollapsed ? 'flex-col' : 'flex-row justify-center']">
        <a href="https://github.com/Frey0914" target="_blank" class="p-2 text-gray-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-200 transition-colors" title="GitHub">
          <Github :size="18" />
        </a>
        <a href="https://space.bilibili.com" target="_blank" class="p-2 text-gray-500 dark:text-zinc-400 hover:text-[#00A1D6] dark:hover:text-[#00A1D6] transition-colors" title="Bilibili">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 10h2l1-3h12l1 3h2"/>
            <path d="M5 10v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8"/>
            <path d="M9 17v-2"/>
            <path d="M15 17v-2"/>
            <path d="M8 7V4h8v3"/>
          </svg>
        </a>
        <a href="https://www.douyin.com" target="_blank" class="p-2 text-gray-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-200 transition-colors" title="抖音">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
          </svg>
        </a>
      </div>
    </div>
    
  </aside>
</template>

<style scoped>
#sidebar:hover {
  box-shadow: 20px 0 50px rgba(0,0,0,0.05);
}
.dark #sidebar:hover {
  box-shadow: 20px 0 50px rgba(0,0,0,0.3);
}

/* 隐藏滚动条但保留滚动功能 */
#sidebar::-webkit-scrollbar {
  width: 0;
  display: none;
}
#sidebar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
