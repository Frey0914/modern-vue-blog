<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next';

const props = defineProps<{
  post: {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    image: string;
    content?: string;
  }
}>();

const emit = defineEmits(['click']);

const handleClick = () => {
  if (props.post.content) {
    emit('click', props.post);
  }
};
</script>

<template>
  <article class="group cursor-pointer" @click="handleClick">
    <div class="relative overflow-hidden rounded-3xl aspect-[4/3] mb-6 shadow-xl shadow-black/5 dark:shadow-white/5 border border-black/5 dark:border-white/5">
      <img
        :src="post.image"
        :alt="post.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div class="absolute top-4 left-4">
        <span class="text-[10px] uppercase tracking-widest font-bold bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 px-3 py-1.5 rounded-full shadow-sm">
          {{ post.category }}
        </span>
      </div>

      <!-- Overlay Link -->
      <div
        v-if="post.content"
        class="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
      >
        <div class="w-14 h-14 rounded-full bg-white/90 dark:bg-white backdrop-blur-md flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
          <ArrowUpRight class="text-black" :size="24" />
        </div>
      </div>
    </div>

    <div>
      <div class="flex items-center gap-2 mb-3">
        <span class="w-8 h-[1px] bg-gray-400 dark:bg-zinc-700"></span>
        <time class="text-[10px] uppercase tracking-widest font-medium opacity-60 dark:opacity-100 dark:text-zinc-500">{{ post.date }}</time>
      </div>
      <h3 class="text-xl font-medium mb-3 group-hover:text-gray-600 dark:group-hover:text-white dark:text-zinc-100 transition-colors leading-snug">
        {{ post.title }}
      </h3>
      <p class="text-sm opacity-60 dark:opacity-100 dark:text-zinc-300 line-clamp-2 leading-relaxed">
        {{ post.excerpt }}
      </p>
    </div>
  </article>
</template>
