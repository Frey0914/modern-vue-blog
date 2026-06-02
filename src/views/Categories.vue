<script setup lang="ts">
const categories = [
  { name: '技术', count: 12, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600' },
  { name: '设计', count: 8, image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600' },
  { name: '生活', count: 15, image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=600' },
  { name: '工具', count: 6, image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600' },
];
</script>

<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div class="mb-12">
      <h2 class="text-3xl font-light serif mb-4">内容分类</h2>
      <div class="h-1 w-12 bg-black dark:bg-white transition-colors"></div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div 
        v-for="cat in categories" 
        :key="cat.name"
        class="group relative h-56 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl shadow-black/5 border border-white/20 dark:border-white/10"
      >
        <img :src="cat.image" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        <div class="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60 group-hover:from-black/10 group-hover:to-black/40 transition-all duration-500"></div>
        
        <!-- Glass Overlay Content -->
        <div class="absolute bottom-6 left-6 right-6 p-6 rounded-3xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 flex justify-between items-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div>
            <h3 class="text-2xl font-medium tracking-wider text-white">{{ cat.name }}</h3>
            <p class="text-xs uppercase tracking-widest text-white/70 mt-1">{{ cat.count }} 篇文章</p>
          </div>
          <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white group-hover:bg-white group-hover:text-black transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
