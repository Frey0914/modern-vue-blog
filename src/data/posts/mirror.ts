export const mirrorPost = {
  id: 8,
  title: '常用工具镜像配置笔记',
  excerpt: 'Maven、pip、npm、winget、Docker、PowerShell 7、Android Studio 的国内镜像配置方法汇总。',
  date: '2025-10-06',
  category: '工具',
  image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80&w=800',
  content: `
    <h2>1. Maven</h2>
    <p><strong>配置文件位置</strong>：<code>MAVEN_HOME/conf/settings.xml</code>（全局）或 <code>~/.m2/settings.xml</code>（用户级）</p>
    <pre><code>&lt;mirrors&gt;
    &lt;!-- 阿里云，常用，优先使用 --&gt;
    &lt;mirror&gt;
        &lt;id&gt;aliyun&lt;/id&gt;
        &lt;mirrorOf&gt;central&lt;/mirrorOf&gt;
        &lt;name&gt;阿里云&lt;/name&gt;
        &lt;url&gt;https://maven.aliyun.com/repository/public&lt;/url&gt;
    &lt;/mirror&gt;

    &lt;!-- 中央仓库直连，兜底用 --&gt;
    &lt;mirror&gt;
        &lt;id&gt;central-direct&lt;/id&gt;
        &lt;mirrorOf&gt;central&lt;/mirrorOf&gt;
        &lt;name&gt;Maven Central&lt;/name&gt;
        &lt;url&gt;https://repo1.maven.org/maven2/&lt;/url&gt;
    &lt;/mirror&gt;

    &lt;!-- 禁止 HTTP 仓库，增强安全性 --&gt;
    &lt;mirror&gt;
        &lt;id&gt;maven-default-http-blocker&lt;/id&gt;
        &lt;mirrorOf&gt;external:http:*&lt;/mirrorOf&gt;
        &lt;name&gt;HTTP Blocker&lt;/name&gt;
        &lt;url&gt;http://0.0.0.0/&lt;/url&gt;
        &lt;blocked&gt;true&lt;/blocked&gt;
    &lt;/mirror&gt;
&lt;/mirrors&gt;</code></pre>

    <h2>2. pip</h2>
    <p><strong>配置文件位置</strong>：</p>
    <ul>
      <li>Windows 用户级别：<code>%APPDATA%\\pip\\pip.ini</code></li>
      <li>Windows 全局：<code>C:\\ProgramData\\pip\\pip.ini</code></li>
      <li>Linux/macOS：<code>~/.config/pip/pip.conf</code></li>
    </ul>
    <p><strong>全局配置命令</strong>：</p>
    <pre><code># 设置主源为阿里云
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/

# 设置备用源（多个写在同一行）
pip config set global.extra-index-url "https://pypi.mirrors.ustc.edu.cn/simple/ https://mirrors.cloud.tencent.com/pypi/simple/"

# 查看当前配置
pip config list -v</code></pre>

    <h2>3. npm</h2>
    <pre><code># 设置淘宝镜像（npmmirror）
npm config set registry https://registry.npmmirror.com

# 查看当前配置
npm config get registry

# 恢复官方源
npm config set registry https://registry.npmjs.org/</code></pre>

    <h2>4. pnpm</h2>
    <pre><code># 设置淘宝镜像
pnpm config set registry https://registry.npmmirror.com

# 查看当前配置
pnpm config get registry

# 恢复官方源
pnpm config set registry https://registry.npmjs.org/</code></pre>

    <h2>5. yarn</h2>
    <pre><code># 设置淘宝镜像
yarn config set registry https://registry.npmmirror.com

# 查看当前配置
yarn config get registry</code></pre>

    <h2>6. winget</h2>
    <pre><code># 添加 USTC 镜像源
winget source add ustc https://mirrors.ustc.edu.cn/winget-source --trust-level trusted

# 移除官方源（不建议，可保留并存）
winget source remove winget

# 更新源
winget source update

# 查看源列表
winget source list

# 重置为官方地址
winget source reset winget</code></pre>
    <blockquote>
      <p><strong>说明</strong>：不建议移除官方源 <code>winget</code>，可保留并并存多个源。添加源时加上 <code>--trust-level trusted</code>，避免安全警告。</p>
    </blockquote>

    <h2>7. Docker</h2>
    <p>Docker 官方镜像在国内访问困难，配置镜像加速器是必须的。</p>

    <h3>Windows / macOS</h3>
    <p>打开 Docker Desktop → Settings → Docker Engine，在 JSON 中添加：</p>
    <pre><code>{
  "registry-mirrors": [
    "https://docker.1ms.run",
    "https://docker.xuanyuan.me"
  ]
}</code></pre>

    <h3>Linux</h3>
    <pre><code># 创建或修改 daemon.json
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json &lt;&lt;'EOF'
{
    "registry-mirrors": [
        "https://docker.1ms.run",
        "https://docker.xuanyuan.me"
    ]
}
EOF

# 重启 Docker 服务
sudo systemctl daemon-reload
sudo systemctl restart docker

# 验证配置
docker info | grep -A 5 "Registry Mirrors"</code></pre>

    <h2>8. PowerShell 7</h2>
    <pre><code># 安装
winget search Microsoft.PowerShell
winget install --id Microsoft.PowerShell --source winget

# 更新
winget list --id Microsoft.PowerShell --upgrade-available
winget upgrade --id Microsoft.PowerShell</code></pre>

    <h2>9. Homebrew（macOS）</h2>
    <pre><code># 设置国内镜像（清华源）
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"

# 写入 shell 配置文件（永久生效）
echo 'export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"' >> ~/.zshrc
echo 'export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"' >> ~/.zshrc
echo 'export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"' >> ~/.zshrc
source ~/.zshrc</code></pre>

    <h2>10. Android Studio</h2>
    <h3>配置 Gradle 环境变量</h3>
    <p>配置环境变量可以避免 Gradle 下载到 C 盘。</p>

    <h3>配置国内镜像</h3>
    <pre><code>https://mirrors.cloud.tencent.com/gradle/gradle-8.13-bin.zip
# 这个不能一劳永逸，最好将 zip 包放入官方地址的 \\wrapper\\dists 目录下</code></pre>

    <h3>修改 settings.gradle.kts 文件</h3>
    <pre><code>pluginManagement {
    repositories {
        // 国内镜像：仅用于非 Google 插件
        maven("https://maven.aliyun.com/repository/public")
        maven("https://mirrors.cloud.tencent.com/nexus/repository/maven-public/")

        // Google 仓库：必须保留
        google {
            content {
                includeGroupByRegex("com\\\\.android.*")
                includeGroupByRegex("com\\\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }

        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        // 国内镜像优先
        maven("https://maven.aliyun.com/repository/public")
        maven("https://mirrors.cloud.tencent.com/nexus/repository/maven-public/")

        // Google 必须保留
        google()

        // Maven Central 作为兜底
        mavenCentral()
    }
}

rootProject.name = "My Application"
include(":app")</code></pre>

    <h3>配置安卓模拟器环境变量</h3>
    <p>配置安卓模拟器的环境变量可以节省 C 盘空间。</p>

    <h2>镜像源速查表</h2>
    <table>
      <thead>
        <tr><th>工具</th><th>推荐镜像源</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>Maven</td><td><code>maven.aliyun.com</code></td><td>阿里云，最常用</td></tr>
        <tr><td>pip</td><td><code>mirrors.aliyun.com/pypi</code></td><td>阿里云</td></tr>
        <tr><td>npm/pnpm/yarn</td><td><code>registry.npmmirror.com</code></td><td>淘宝 npm 镜像</td></tr>
        <tr><td>Docker</td><td><code>docker.1ms.run</code></td><td>多个可用，建议配多个</td></tr>
        <tr><td>Homebrew</td><td><code>mirrors.tuna.tsinghua.edu.cn</code></td><td>清华源</td></tr>
        <tr><td>Gradle</td><td><code>mirrors.cloud.tencent.com</code></td><td>腾讯云</td></tr>
      </tbody>
    </table>
  `
};
