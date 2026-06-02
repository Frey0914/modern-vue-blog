<script setup lang="ts">
import { ref } from 'vue';
import PostCard from '../components/PostCard.vue';

const posts = ref([
  { id: 1, title: '探索现代前端之美', excerpt: '探讨如何利用 Vue 3 构建高性能且美观的用户界面。', date: '2024-05-18', category: '技术', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: '设计系统中的极简主义', excerpt: '少即是多。极简主义不仅仅是一种审美选择。', date: '2024-05-15', category: '设计', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Vue 3 + Tailwind CSS 的完美搭配', excerpt: 'Tailwind CSS 的原子化思维与 Vue 3 的组合式 API 相得益彰。', date: '2024-05-10', category: '工具', image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: '摄影的艺术：捕捉光影', excerpt: '光影是摄影的灵魂。', date: '2024-05-05', category: '生活', image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=800' },
]);
</script>

<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div class="mb-12">
      <h2 class="text-3xl font-light serif mb-4 dark:text-zinc-100">全部文章</h2>
      <div class="h-1 w-12 bg-black dark:bg-white transition-colors"></div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>
