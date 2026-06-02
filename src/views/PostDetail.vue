<script setup lang="ts">
import { computed, watch, nextTick, ref, onMounted } from 'vue';
import { ArrowLeft } from 'lucide-vue-next';

const props = defineProps<{
  post: {
    id: number;
    title: string;
    date: string;
    category: string;
    image: string;
    content: string;
  }
}>();

const base = import.meta.env.BASE_URL;
const articleRef = ref<HTMLElement>();

const fixedContent = computed(() =>
  props.post.content?.replace(/src="\/images\//g, `src="${base}images/`)
);

const addCopyButtons = () => {
  if (!articleRef.value) return;
  const blocks = articleRef.value.querySelectorAll('pre');

  blocks.forEach((pre) => {
    // 避免重复添加
    if (pre.querySelector('.copy-btn')) return;

    // 让 pre 相对定位，按钮绝对定位
    pre.style.position = 'relative';

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> 复制`;

    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      if (!code) return;

      try {
        await navigator.clipboard.writeText(code.textContent || '');
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> 已复制`;
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> 复制`;
          btn.classList.remove('copied');
        }, 2000);
      } catch {
        // 降级方案
        const textarea = document.createElement('textarea');
        textarea.value = code.textContent || '';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> 已复制`;
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> 复制`;
          btn.classList.remove('copied');
        }, 2000);
      }
    });

    pre.appendChild(btn);
  });
};

onMounted(addCopyButtons);
watch(() => props.post.id, () => nextTick(addCopyButtons));

defineEmits(['back']);
</script>

<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl">
    <!-- Back button -->
    <button
      @click="$emit('back')"
      class="flex items-center gap-2 text-sm opacity-60 dark:opacity-100 dark:text-zinc-400 hover:opacity-100 transition-opacity mb-8 group"
    >
      <ArrowLeft :size="16" class="group-hover:-translate-x-1 transition-transform" />
      返回文章列表
    </button>

    <!-- Hero image -->
    <div class="relative overflow-hidden rounded-3xl aspect-[21/9] mb-10 shadow-2xl">
      <img :src="post.image" :alt="post.title" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent"></div>
      <div class="absolute bottom-8 left-8 right-8 text-white">
        <span class="text-xs uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full mb-4 inline-block">
          {{ post.category }}
        </span>
        <h1 class="text-3xl md:text-4xl font-medium leading-tight serif">{{ post.title }}</h1>
        <p class="text-sm text-white/70 mt-3">{{ post.date }}</p>
      </div>
    </div>

    <!-- Article content -->
    <article
      ref="articleRef"
      class="post-content dark:text-zinc-200 leading-relaxed"
      v-html="fixedContent"
    ></article>

    <!-- Back button bottom -->
    <div class="mt-16 pt-8 border-t border-gray-200 dark:border-zinc-800">
      <button
        @click="$emit('back')"
        class="flex items-center gap-2 text-sm opacity-60 dark:opacity-100 dark:text-zinc-400 hover:opacity-100 transition-opacity group"
      >
        <ArrowLeft :size="16" class="group-hover:-translate-x-1 transition-transform" />
        返回文章列表
      </button>
    </div>
  </div>
</template>

<style>
.post-content h2 {
  font-size: 1.5rem;
  font-weight: 300;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}
.dark .post-content h2 {
  border-bottom-color: #27272a;
}

.post-content h3 {
  font-size: 1.15rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.post-content p {
  margin-bottom: 1rem;
  line-height: 1.8;
}

.post-content ul, .post-content ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.post-content ul {
  list-style-type: disc;
}

.post-content ol {
  list-style-type: decimal;
}

.post-content li {
  margin-bottom: 0.4rem;
  line-height: 1.7;
}

.post-content code {
  background: #f3f4f6;
  padding: 0.15rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.85em;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
.dark .post-content code {
  background: #27272a;
}

.post-content pre {
  background: #1e1e2e;
  color: #cdd6f4;
  padding: 1.25rem;
  border-radius: 1rem;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  line-height: 1.6;
  border: 1px solid rgba(255,255,255,0.05);
}

.post-content pre code {
  background: none;
  padding: 0;
  color: inherit;
  font-size: inherit;
}

/* 复制按钮 */
.post-content pre .copy-btn {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.72rem;
  font-family: inherit;
  color: #a6adc8;
  background: #313244;
  border: 1px solid #45475a;
  border-radius: 0.4rem;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s;
  z-index: 10;
}

.post-content pre:hover .copy-btn {
  opacity: 1;
}

.post-content pre .copy-btn:hover {
  background: #45475a;
  color: #cdd6f4;
}

.post-content pre .copy-btn.copied {
  color: #a6e3a1;
  border-color: #a6e3a1;
  background: rgba(166, 227, 161, 0.1);
}

.post-content table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.post-content th {
  background: #f9fafb;
  font-weight: 600;
  text-align: left;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
}
.dark .post-content th {
  background: #18181b;
  border-color: #27272a;
  color: #e4e4e7;
}

.post-content td {
  padding: 0.65rem 1rem;
  border: 1px solid #e5e7eb;
}
.dark .post-content td {
  border-color: #27272a;
}

.post-content tr:hover td {
  background: #f9fafb;
}
.dark .post-content tr:hover td {
  background: #18181b;
}

.post-content img {
  border-radius: 1rem;
  margin: 1.5rem 0;
  max-width: 100%;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.post-content blockquote {
  border-left: 3px solid #d1d5db;
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: #6b7280;
  font-style: italic;
}
.dark .post-content blockquote {
  border-left-color: #52525b;
  color: #d4d4d8;
}

.post-content strong {
  font-weight: 600;
}

.post-content hr {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 2rem 0;
}
.dark .post-content hr {
  border-top-color: #27272a;
}
</style>
