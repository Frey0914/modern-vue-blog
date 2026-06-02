<script setup lang="ts">
import { ref, watch } from 'vue';
import Sidebar from './components/Sidebar.vue';
import PostCard from './components/PostCard.vue';
import Posts from './views/Posts.vue';
import Categories from './views/Categories.vue';
import Archives from './views/Archives.vue';
import About from './views/About.vue';
import Contact from './views/Contact.vue';
import PostDetail from './views/PostDetail.vue';
import { myPosts } from './data/posts';
import { Sun, Moon } from 'lucide-vue-next';

const isDark = ref(false);
const currentTab = ref('home');
const selectedPost = ref<any>(null);

const toggleDark = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const navigateToPost = (post: any) => {
  selectedPost.value = post;
};

const backToHome = () => {
  selectedPost.value = null;
};

// 切换 tab 时自动退出文章详情
watch(currentTab, () => {
  selectedPost.value = null;
});

const posts = ref(myPosts);
</script>

<template>
  <div :class="['min-h-screen transition-all duration-700 relative overflow-hidden', isDark ? 'dark bg-[#050505] text-white' : 'bg-[#fafafa] text-[#1a1a1a]']">
    <!-- Liquid Background Blobs -->
    <div class="fixed inset-0 pointer-events-none opacity-40 dark:opacity-20 transition-opacity duration-1000">
      <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-300 dark:bg-purple-900 rounded-full blur-[120px] animate-blob"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200 dark:bg-blue-900 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
      <div class="absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-pink-100 dark:bg-rose-900 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
    </div>

    <!-- Main Layout -->
    <div class="flex relative z-10">
      <Sidebar v-model:currentTab="currentTab" />

      <main class="flex-1 px-8 py-12 md:px-16 md:py-20 lg:px-24">
        <!-- Header -->
        <header class="flex justify-between items-center mb-16">
          <div @click="currentTab = 'home'; selectedPost = null" class="cursor-pointer group">
            <h1 class="text-4xl md:text-5xl font-light tracking-tight mb-2 serif group-hover:opacity-70 transition-opacity">
              时光 <span class="italic text-gray-500 dark:text-zinc-400">笔谈</span>
            </h1>
            <p class="text-sm uppercase tracking-[0.2em] opacity-60 dark:opacity-100 dark:text-zinc-400">Personal Thoughts & Journal</p>
          </div>

          <button
            @click="toggleDark"
            class="p-3 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300"
            id="theme-toggle"
          >
            <Sun v-if="isDark" :size="20" class="text-yellow-400" />
            <Moon v-else :size="20" class="text-gray-800" />
          </button>
        </header>

        <!-- Dynamic Content Area -->
        <div class="relative min-h-[60vh]">
          <!-- Post Detail View -->
          <PostDetail
            v-if="selectedPost"
            :post="selectedPost"
            @back="backToHome"
          />

          <!-- Home View -->
          <div v-else-if="currentTab === 'home'" class="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <!-- Featured Story -->
            <section class="mb-20">
              <div
                class="relative group cursor-pointer overflow-hidden rounded-2xl"
                @click="navigateToPost(posts[0])"
              >
                <img
                  :src="posts[0].image"
                  :alt="posts[0].title"
                  class="w-full h-[50vh] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 text-white"></div>
                <div class="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                  <span class="text-xs uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full mb-4 inline-block">
                    最新发布
                  </span>
                  <h2 class="text-3xl md:text-5xl font-medium mb-4 max-w-2xl leading-tight">
                    {{ posts[0].title }}
                  </h2>
                  <p class="text-gray-300 max-w-xl mb-6 line-clamp-2">
                    {{ posts[0].excerpt }}
                  </p>
                  <div class="flex items-center gap-4">
                    <p class="text-xs text-gray-400">{{ posts[0].date }} · {{ posts[0].category }}</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Recent Posts -->
            <section>
              <div class="flex justify-between items-end mb-10 border-b border-gray-200 dark:border-zinc-800 pb-4">
                <h3 class="text-2xl font-light serif dark:text-white">最新发布</h3>
                <div class="flex gap-4 text-xs font-medium uppercase tracking-widest">
                  <a href="#" @click.prevent="currentTab = 'posts'" class="opacity-60 dark:opacity-100 dark:text-zinc-300 dark:hover:text-white hover:opacity-100 transition-opacity">查看全部</a>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                <PostCard v-for="post in posts" :key="post.id" :post="post" @click="navigateToPost(post)" />
              </div>
            </section>
          </div>

          <!-- Other Views -->
          <Posts v-else-if="currentTab === 'posts'" :posts="posts" @select-post="navigateToPost" />
          <Categories v-else-if="currentTab === 'categories'" />
          <Archives v-else-if="currentTab === 'archives'" />
          <About v-else-if="currentTab === 'about'" />
          <Contact v-else-if="currentTab === 'contact'" />
        </div>

        <!-- Footer -->
        <footer class="mt-32 pt-12 border-t border-gray-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-8 text-sm opacity-50 dark:opacity-100 dark:text-zinc-500">
          <p>&copy; 2024 Modern Vue Blog. All rights reserved.</p>
          <div class="flex gap-8">
            <a href="https://github.com/Frey0914" target="_blank" class="hover:underline">GitHub</a>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

.serif {
  font-family: 'Cormorant Garamond', serif;
}

body {
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 15s infinite alternate ease-in-out;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #d1d1d1;
  border-radius: 10px;
}
.dark ::-webkit-scrollbar-thumb {
  background: #333;
}
</style>
