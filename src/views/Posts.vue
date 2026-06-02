<script setup lang="ts">
import PostCard from '../components/PostCard.vue';

defineProps<{
  posts: Array<{
    id: number;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    image: string;
    content?: string;
  }>
}>();

const emit = defineEmits(['selectPost']);
</script>

<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div class="mb-12">
      <h2 class="text-3xl font-light serif mb-4 dark:text-zinc-100">全部文章</h2>
      <div class="h-1 w-12 bg-black dark:bg-white transition-colors"></div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @click="emit('selectPost', post)"
      />
    </div>
  </div>
</template>
