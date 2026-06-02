export const nginxPost = {
  id: 4,
  title: 'Nginx 学习笔记',
  excerpt: 'Nginx 的架构认识、C10k 问题的解决方案，以及在 Ubuntu 上的安装与配置全流程。',
  date: '2025-09-12',
  category: '技术',
  image: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?auto=format&fit=crop&q=80&w=800',
  content: `
    <h2>1. 对 Nginx 的认识</h2>
    <h3>使用 Nginx 相比于直接使用 Tomcat 有什么优势</h3>
    <ul>
      <li><strong>性能优势</strong>：Nginx 处理静态资源的速度远高于 Tomcat，可以减少服务器的资源占用</li>
      <li><strong>安全性</strong>：Nginx 可以隐藏 Tomcat 后端信息，提供额外的安全层</li>
      <li><strong>扩展性</strong>：当访问量增长时，可以通过 Nginx 轻松实现负载均衡，将请求分发到多个 Tomcat 实例</li>
      <li><strong>缓存能力</strong>：Nginx 可以设置合适的缓存策略，减少重复的文件读取</li>
      <li><strong>资源优化</strong>：静态文件直接由 Nginx 处理，释放了 Tomcat 的资源专门处理动态 API 请求，实现更好的资源分工</li>
    </ul>

    <h3>C10k 问题与 Nginx 的架构设计</h3>
    <p>C10k 指的是服务器同时并发处理 10000 个连接的技术挑战，通常面临以下问题：</p>
    <ul>
      <li><strong>内存消耗</strong>：每个连接需要独立的进程或线程，消耗大量内存</li>
      <li><strong>上下文切换</strong>：大量进程/线程的切换导致 CPU 效率下降</li>
      <li><strong>系统调用开销</strong>：频繁的系统调用影响性能</li>
    </ul>
    <p>Nginx 通过以下架构设计解决了这些问题：</p>
    <ul>
      <li><strong>事件驱动模型</strong>：使用单线程事件循环处理所有连接，避免了大量线程创建</li>
      <li><strong>异步非阻塞 I/O</strong>：通过 epoll 等机制实现高效的 I/O 多路复用</li>
      <li><strong>内存池管理</strong>：预分配内存池减少内存分配开销</li>
      <li><strong>轻量级连接处理</strong>：每个连接只需要很少的内存，同时维持数万个连接</li>
    </ul>

    <h2>2. 如何安装 Nginx</h2>
    <p>一般使用 Linux 来运行 Nginx，以 Ubuntu 系统为例：</p>
    <pre><code># 更新软件包索引
sudo apt update

# 安装 nginx
sudo apt install nginx

# 启动 nginx 服务
sudo systemctl start nginx

# 设置开机自启动
sudo systemctl enable nginx</code></pre>

    <h3>添加官方软件源安装</h3>
    <p>可以使用到最新版及其额外的模块：</p>
    <pre><code># 安装必要的软件包
sudo apt install curl gnupg2 ca-certificates lsb-release

# 添加 nginx 签名密钥
curl -fsSL https://nginx.org/keys/nginx_signing.key | sudo apt-key add -

# 添加 nginx 官方软件源
echo "deb http://nginx.org/packages/ubuntu \`lsb_release -cs\` nginx" \\
    | sudo tee /etc/apt/sources.list.d/nginx.list

# 更新软件包索引并安装
sudo apt update
sudo apt install nginx</code></pre>

    <h3>源码编译安装</h3>
    <pre><code># 下载最新稳定版源码
wget http://nginx.org/download/nginx-1.24.0.tar.gz

# 解压源码包
tar -zxvf nginx-1.24.0.tar.gz
cd nginx-1.24.0

# 安装编译依赖
sudo apt install build-essential libpcre3-dev libssl-dev zlib1g-dev

# 配置编译参数
./configure \\
    --prefix=/etc/nginx \\
    --sbin-path=/usr/sbin/nginx \\
    --conf-path=/etc/nginx/nginx.conf \\
    --error-log-path=/var/log/nginx/error.log \\
    --http-log-path=/var/log/nginx/access.log \\
    --pid-path=/var/run/nginx.pid \\
    --lock-path=/var/run/nginx.lock \\
    --with-http_ssl_module \\
    --with-http_realip_module \\
    --with-http_gzip_static_module

# 编译并安装
make && sudo make install</code></pre>

    <h3>验证安装</h3>
    <pre><code># 查看 nginx 版本
nginx -v

# 查看详细的版本和编译信息
nginx -V

# 检查配置文件语法
nginx -t</code></pre>

    <h3>启动和停止 Nginx 服务</h3>
    <pre><code># 使用 systemd 管理
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
sudo systemctl reload nginx

# 直接使用 nginx 命令
sudo nginx                    # 启动
sudo nginx -s quit           # 优雅停止
sudo nginx -s stop           # 立即停止
sudo nginx -s reload         # 重新加载配置</code></pre>

    <img src="/images/Nginx/image-20250912002851672.png" alt="Nginx 欢迎页面" />
    <p>出现以上界面就是 Nginx 配置完成。</p>

    <h2>3. 核心配置详解</h2>
    <p>Nginx 的配置文件 <code>nginx.conf</code> 由多个块组成，理解它们的关系是掌握 Nginx 的关键。</p>

    <h3>配置文件结构</h3>
    <pre><code># 全局块：工作进程数、日志路径等
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    # 每个进程的最大连接数
    worker_connections 1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    # 日志格式
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer"';

    access_log /var/log/nginx/access.log main;

    # 开启高效文件传输
    sendfile on;
    tcp_nopush on;
    keepalive_timeout 65;
    gzip on;

    # 引入其他配置文件
    include /etc/nginx/conf.d/*.conf;
}</code></pre>

    <h3>server 块与 location 匹配规则</h3>
    <p>每个 <code>server</code> 块代表一个虚拟主机，<code>location</code> 用来匹配请求路径：</p>
    <pre><code>server {
    listen 80;
    server_name example.com;

    # 精确匹配：只匹配 /
    location = / {
        return 200 "homepage";
    }

    # 前缀匹配：匹配 /static/ 开头的路径
    location /static/ {
        root /var/www/html;
        expires 30d;    # 缓存30天
    }

    # 正则匹配：不区分大小写匹配图片
    location ~* \\.(jpg|jpeg|png|gif|ico)$ {
        root /var/www/images;
        expires 7d;
    }

    # 优先前缀匹配：用 ^~ 优先于正则
    location ^~ /api/ {
        proxy_pass http://127.0.0.1:3000;
    }

    # 默认匹配
    location / {
        try_files $uri $uri/ /index.html;
    }
}</code></pre>

    <p><strong>匹配优先级</strong>（从高到低）：</p>
    <ol>
      <li><code>=</code> 精确匹配 —— 完全一致才命中</li>
      <li><code>^~</code> 前缀匹配 —— 命中后不再检查正则</li>
      <li><code>~</code> / <code>~*</code> 正则匹配 —— 按配置文件中的顺序，第一个命中即返回</li>
      <li>普通前缀匹配 —— 最长前缀优先</li>
      <li><code>/</code> 默认匹配 —— 兜底</li>
    </ol>

    <h3>反向代理配置</h3>
    <p>这是 Nginx 最常用的场景之一，将请求转发到后端服务：</p>
    <pre><code>server {
    listen 80;
    server_name api.example.com;

    location / {
        # 转发到后端 Node.js 服务
        proxy_pass http://127.0.0.1:3000;

        # 传递客户端真实 IP
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # 超时设置
        proxy_connect_timeout 60s;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }
}</code></pre>

    <h3>负载均衡配置</h3>
    <pre><code># 定义上游服务器组
upstream backend {
    # 默认轮询策略
    server 192.168.1.101:8080 weight=3;   # 权重越高，分配请求越多
    server 192.168.1.102:8080;
    server 192.168.1.103:8080 backup;     # 备用服务器

    # ip_hash;       # 按客户端 IP 分配，解决 session 问题
    # least_conn;    # 最少连接数策略
}

server {
    listen 80;
    server_name www.example.com;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}</code></pre>

    <h3>HTTPS 配置</h3>
    <pre><code>server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate     /etc/nginx/ssl/example.com.crt;
    ssl_certificate_key /etc/nginx/ssl/example.com.key;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    # 强制跳转 HTTPS
    add_header Strict-Transport-Security "max-age=31536000" always;

    location / {
        root /var/www/html;
        index index.html;
    }
}

# HTTP 自动跳转 HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}</code></pre>

    <h2>4. 踩坑经验</h2>
    <ul>
      <li><strong>修改配置后忘记 reload</strong>：改完 <code>nginx.conf</code> 后必须 <code>nginx -s reload</code>，直接重启会断开现有连接</li>
      <li><strong>root 与 alias 的区别</strong>：<code>root</code> 会把 location 路径拼接到 root 路径后面，<code>alias</code> 则是直接替换。例如 <code>location /img/ { root /var/www; }</code> 实际访问的是 <code>/var/www/img/</code>，而用 alias 则是 <code>/var/www/</code></li>
      <li><strong>配置文件中文乱码</strong>：确保 <code>nginx.conf</code> 文件编码为 UTF-8，并在 http 块中添加 <code>charset utf-8;</code></li>
      <li><strong>502 Bad Gateway</strong>：通常是后端服务没启动，或者 <code>proxy_pass</code> 地址写错了</li>
    </ul>
  `
};
