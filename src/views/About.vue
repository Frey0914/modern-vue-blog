<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl">
    <div class="mb-12">
      <h2 class="text-3xl font-light serif mb-4">关于我</h2>
      <div class="h-1 w-12 bg-black dark:bg-white"></div>
    </div>
    
    <div class="space-y-8 text-lg leading-relaxed opacity-80 dark:opacity-100 dark:text-zinc-300">
      <p>
        你好，我是 Felix。一名对现代 Web 技术和数字极简主义充满热情的创作者。
      </p>
      <div class="aspect-video rounded-3xl overflow-hidden my-12 shadow-2xl">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200" class="w-full h-full object-cover" />
      </div>
      <p>
        在这个快节奏的时代，我希望通过这个博客，记录那些值得思考的瞬间，分享关于技术、设计以及生活的感悟。
      </p>
      <div class="grid grid-cols-2 gap-12 mt-16 pt-12 border-t border-gray-100 dark:border-zinc-800">
        <div>
          <h4 class="text-xs uppercase tracking-widest font-bold mb-4 opacity-100 dark:text-zinc-400">常用工具</h4>
          <ul class="text-sm space-y-2 opacity-60 dark:opacity-100 dark:text-zinc-400">
            <li>Vue 3 / TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Figma</li>
            <li>Neovim</li>
          </ul>
        </div>
        <div>
          <h4 class="text-xs uppercase tracking-widest font-bold mb-4 opacity-100 dark:text-zinc-400">关注领域</h4>
          <ul class="text-sm space-y-2 opacity-60 dark:opacity-80">
            <li>交互设计</li>
            <li>前端架构</li>
            <li>生成式 AI</li>
            <li>胶片摄影</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
