export const wslPost = {
  id: 6,
  title: 'WSL 安装与迁移指南',
  excerpt: 'Windows Subsystem for Linux 的安装、配置，以及将系统从 C 盘迁移到其他盘符的完整流程。',
  date: '2025-09-14',
  category: '工具',
  image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800',
  content: `
    <h2>启用 WSL 功能</h2>
    <p>点击「启用或关闭 Windows 功能」，打开 WSL 相关选项。</p>
    <img src="/images/WSL/image-20250914220306987.png" alt="启用 Windows 功能" />

    <h2>安装 WSL</h2>
    <p>打开 CMD（不要用 PowerShell，下载很慢），执行以下命令：</p>
    <pre><code># 更新到最新内核版本
wsl --update

# 安装（默认是 WSL2，安装的 Linux 系统为 Ubuntu，默认在 C 盘）
wsl --install

# 如果下载卡住不动可运行此命令
wsl --install --web-download

# 安装其他 Linux 发行版本可加参数
wsl --install -d Debian
wsl --install -d Ubuntu-24.04

# 查看已安装的发行版名称
wsl --list --verbose</code></pre>

    <h2>将 WSL 系统迁移到其他盘</h2>
    <p>默认安装的 WSL 系统在 C 盘，可以通过导出/导入的方式迁移到其他盘符：</p>

    <h3>步骤 1：导出系统到 tar 文件</h3>
    <pre><code># 导出系统到 tar 文件（假设发行版叫 Ubuntu），后面是镜像文件盘符
wsl --export Ubuntu E:\\WSL_linuxs\\ubuntu.tar</code></pre>

    <h3>步骤 2：注销原系统（从 C 盘删除镜像）</h3>
    <pre><code>wsl --unregister Ubuntu</code></pre>

    <h3>步骤 3：导入系统到指定位置</h3>
    <pre><code># 安装位置是 E:\\WSL_linuxs\\unbuntu24，导出文件在 E:\\WSL_linuxs\\ubuntu.tar
wsl --import Ubuntu E:\\WSL_linuxs\\unbuntu24 E:\\WSL_linuxs\\ubuntu.tar</code></pre>

    <h3>步骤 4：验证迁移</h3>
    <pre><code># 运行新实例，确保迁移完全
wsl -d Ubuntu

# 确认无误后删除备份镜像 tar 文件
del E:\\WSL_linuxs\\ubuntu.tar</code></pre>

    <img src="/images/WSL/image-20250914222106657.png" alt="WSL 迁移完成" />

    <h2>WSL2 内存管理</h2>
    <p>WSL2 默认会占用最多一半物理内存，且用完不自动释放。如果你的机器内存紧张，可以通过 <code>.wslconfig</code> 文件限制。</p>

    <h3>创建 .wslconfig 文件</h3>
    <p>在 Windows 用户目录下创建 <code>C:\\Users\\&lt;你的用户名&gt;\\.wslconfig</code>：</p>
    <pre><code>[wsl2]
# 限制 WSL2 最大内存为 4GB
memory=4GB

# 限制 CPU 核心数为 4
processors=4

# 限制 swap 大小
swap=2GB

# 限制 VHD 最大占用空间（Windows 11 22H2+）
# diskMaxSize=50GB</code></pre>

    <h3>立即释放内存</h3>
    <pre><code># 在 PowerShell 中执行，关闭所有 WSL 实例并释放内存
wsl --shutdown

# 然后重新启动
wsl -d Ubuntu</code></pre>

    <blockquote>
      <p><strong>提示</strong>：修改 <code>.wslconfig</code> 后需要执行 <code>wsl --shutdown</code> 再重新启动才能生效。</p>
    </blockquote>

    <h2>常用 WSL 命令速查</h2>
    <pre><code># 查看已安装的发行版
wsl --list --verbose

# 启动默认发行版
wsl

# 启动指定发行版
wsl -d Ubuntu

# 以 root 身份进入
wsl -u root

# 关闭所有实例（释放内存）
wsl --shutdown

# 关闭指定实例
wsl --terminate Ubuntu

# 在 WSL 中访问 Windows 文件
# Windows 的 C 盘挂载在 /mnt/c/
cd /mnt/c/Users/

# 在 Windows 中访问 WSL 文件
# 在文件管理器地址栏输入：\\\\wsl$\\Ubuntu</code></pre>

    <h2>踩坑经验</h2>
    <ul>
      <li><strong>WSL2 网络问题</strong>：WSL2 使用虚拟网卡，IP 地址每次启动都变。如果需要固定访问，可以用 <code>localhost</code>（Windows 11 默认支持），或者在 <code>.wslconfig</code> 中配置 <code>networkingMode=mirrored</code></li>
      <li><strong>systemd 支持</strong>：Ubuntu 22.04+ 的 WSL2 支持 systemd，需要在 <code>/etc/wsl.conf</code> 中添加：</li>
    </ul>
    <pre><code>[boot]
systemd=true</code></pre>
    <ul>
      <li><strong>DNS 解析失败</strong>：WSL2 的 DNS 有时会出问题，可以在 <code>/etc/wsl.conf</code> 中手动指定：</li>
    </ul>
    <pre><code>[network]
generateResolvConf=false</code></pre>
    <p>然后在 <code>/etc/resolv.conf</code> 中写入：</p>
    <pre><code>nameserver 8.8.8.8
nameserver 114.114.114.114</code></pre>
  `
};
