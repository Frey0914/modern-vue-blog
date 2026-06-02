<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl">
    <div class="mb-12">
      <h2 class="text-3xl font-light serif mb-4">关于我</h2>
      <div class="h-1 w-12 bg-black dark:bg-white"></div>
    </div>

    <div class="space-y-8 text-lg leading-relaxed opacity-80 dark:opacity-100 dark:text-zinc-200">
      <p>
        你好，我是 Frey。一名对现代 Web 技术充满热情的学习者，喜欢折腾各种工具，记录学习过程中的点滴。
      </p>
      <div class="aspect-video rounded-3xl overflow-hidden my-12 shadow-2xl">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200" class="w-full h-full object-cover" />
      </div>
      <p>
        这个博客是我的个人笔记本，用来记录学习 Nginx、Redis、WSL 等技术时的笔记和踩坑经验。希望这些内容也能帮到你。
      </p>
      <div class="grid grid-cols-2 gap-12 mt-16 pt-12 border-t border-gray-100 dark:border-zinc-800">
        <div>
          <h4 class="text-xs uppercase tracking-widest font-bold mb-4 opacity-100 dark:text-zinc-300">常用工具</h4>
          <ul class="text-sm space-y-2 opacity-60 dark:opacity-100 dark:text-zinc-300">
            <li>Vue 3 / TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Redis</li>
            <li>Nginx</li>
          </ul>
        </div>
        <div>
          <h4 class="text-xs uppercase tracking-widest font-bold mb-4 opacity-100 dark:text-zinc-300">关注领域</h4>
          <ul class="text-sm space-y-2 opacity-60 dark:opacity-100 dark:text-zinc-300">
            <li>前端开发</li>
            <li>后端架构</li>
            <li>Linux 运维</li>
            <li>开发工具</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
