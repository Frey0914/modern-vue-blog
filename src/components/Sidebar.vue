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
        <a href=" https://b23.tv/4aouTmY" target="_blank" class="p-2 text-gray-500 dark:text-zinc-400 hover:text-[#00A1D6] dark:hover:text-[#00A1D6] transition-colors" title="Bilibili">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.659.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.124.929.373.258.258.382.561.382.907 0 .345-.124.649-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.764-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
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
