<script setup lang="ts">
const archives = [
  {
    year: '2025',
    months: [
      {
        month: '十月',
        posts: [
          { title: '各语言位运算符对比', date: '10-02' },
          { title: '常用工具镜像配置笔记', date: '10-06' },
        ]
      },
      {
        month: '九月',
        posts: [
          { title: 'Redis 学习笔记', date: '09-18' },
          { title: 'WSL 安装与迁移指南', date: '09-14' },
          { title: 'Nginx 学习笔记', date: '09-12' },
        ]
      }
    ]
  },
];
</script>

<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl">
    <div class="mb-12">
      <h2 class="text-3xl font-light serif mb-4">文章归档</h2>
      <div class="h-1 w-12 bg-black dark:bg-white"></div>
    </div>

    <div class="space-y-16">
      <div v-for="yearGroup in archives" :key="yearGroup.year">
        <h3 class="text-6xl font-bold opacity-[0.03] dark:opacity-20 mb-8 serif transition-opacity dark:text-white">{{ yearGroup.year }}</h3>

        <div class="space-y-12">
          <div v-for="monthGroup in yearGroup.months" :key="monthGroup.month" class="relative pl-8 border-l border-gray-100 dark:border-zinc-800">
            <div class="absolute left-[-4.5px] top-0 w-2 h-2 rounded-full bg-black dark:bg-zinc-200"></div>
            <h4 class="text-sm uppercase tracking-[0.3em] font-bold mb-6 opacity-40 dark:opacity-100 dark:text-zinc-400">{{ monthGroup.month }}</h4>

            <ul class="space-y-6">
              <li v-for="post in monthGroup.posts" :key="post.title" class="group flex items-baseline gap-4 cursor-pointer">
                <span class="text-xs tabular-nums opacity-40 font-mono dark:opacity-100 dark:text-zinc-500 shrink-0">{{ post.date }}</span>
                <span class="text-lg group-hover:translate-x-2 transition-transform duration-300 group-hover:text-gray-500 dark:group-hover:text-white dark:text-zinc-200 leading-tight">
                  {{ post.title }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
