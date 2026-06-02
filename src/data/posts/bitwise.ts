export const bitwisePost = {
  id: 7,
  title: '各语言位运算符对比',
  excerpt: 'C/C++、Java、Kotlin、Python 中位运算符和移位运算符的用法对比，以及位运算的实际应用场景。',
  date: '2025-10-02',
  category: '技术',
  image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=800',
  content: `
    <h2>1. 基本位运算符（所有语言通用）</h2>
    <table>
      <thead>
        <tr><th>运算</th><th>含义</th><th>C/C++</th><th>Java</th><th>Kotlin</th><th>Python</th></tr>
      </thead>
      <tbody>
        <tr><td>与</td><td>同1为1</td><td><code>&amp;</code></td><td><code>&amp;</code></td><td><code>and</code></td><td><code>&amp;</code></td></tr>
        <tr><td>或</td><td>有1为1</td><td><code>|</code></td><td><code>|</code></td><td><code>or</code></td><td><code>|</code></td></tr>
        <tr><td>异或</td><td>不同为1</td><td><code>^</code></td><td><code>^</code></td><td><code>xor</code></td><td><code>^</code></td></tr>
        <tr><td>取反</td><td>0变1，1变0</td><td><code>~</code></td><td><code>~</code></td><td><code>inv()</code></td><td><code>~</code></td></tr>
      </tbody>
    </table>

    <h2>2. 移位运算符</h2>
    <table>
      <thead>
        <tr><th>操作</th><th>C/C++</th><th>Java</th><th>Kotlin</th><th>Python</th></tr>
      </thead>
      <tbody>
        <tr><td>左移</td><td><code>&lt;&lt;</code></td><td><code>&lt;&lt;</code></td><td><code>shl</code></td><td><code>&lt;&lt;</code></td></tr>
        <tr><td>算术右移（保留符号）</td><td><code>&gt;&gt;</code>（对 signed）</td><td><code>&gt;&gt;</code></td><td><code>shr</code></td><td><code>&gt;&gt;</code></td></tr>
        <tr><td>无符号右移（高位补0）</td><td><code>&gt;&gt;</code>（对 unsigned）</td><td><code>&gt;&gt;&gt;</code></td><td><code>ushr</code></td><td>无原生支持</td></tr>
      </tbody>
    </table>

    <h2>3. 关键说明</h2>
    <h3>C/C++</h3>
    <ul>
      <li>有 <code>signed</code> 和 <code>unsigned</code> 类型</li>
      <li><code>&gt;&gt;</code> 对 <code>unsigned</code> 是逻辑右移，对 <code>signed</code> 是算术右移</li>
      <li>无独立无符号右移运算符</li>
    </ul>

    <h3>Java</h3>
    <ul>
      <li>所有整数为有符号</li>
      <li><code>&gt;&gt;</code>：算术右移；<code>&gt;&gt;&gt;</code>：无符号右移</li>
    </ul>

    <h3>Kotlin</h3>
    <ul>
      <li>与 Java 行为一致</li>
      <li>使用函数式写法：<code>shl</code>、<code>shr</code>、<code>ushr</code></li>
      <li>支持无符号整数类型（如 <code>UInt</code>），但移位行为仍由操作符决定</li>
    </ul>

    <h3>Python</h3>
    <ul>
      <li>整数为任意精度（理论上无限位），<code>&gt;&gt;</code> 始终为算术右移</li>
      <li>无无符号右移运算符，需手动模拟</li>
      <li>因为任意精度特性，<code>~x</code> 的结果等于 <code>-x-1</code>，而不是固定位数的按位取反</li>
    </ul>

    <h2>4. 示例（对 -1 右移1位）</h2>
    <table>
      <thead>
        <tr><th>语言</th><th>代码</th><th>结果</th></tr>
      </thead>
      <tbody>
        <tr><td>C/C++</td><td><code>(unsigned int)(-1) &gt;&gt; 1</code></td><td>2147483647</td></tr>
        <tr><td>Java</td><td><code>-1 &gt;&gt;&gt; 1</code></td><td>2147483647</td></tr>
        <tr><td>Kotlin</td><td><code>(-1).ushr(1)</code></td><td>2147483647</td></tr>
        <tr><td>Python</td><td><code>(-1 % (1&lt;&lt;32)) &gt;&gt; 1</code></td><td>2147483647</td></tr>
      </tbody>
    </table>
    <blockquote><p>注：结果基于32位整数。Python 没有固定位数，所以需要先用 <code>% (1&lt;&lt;32)</code> 模拟 32 位无符号数。</p></blockquote>

    <h2>5. 实际应用：位运算做权限管理</h2>
    <p>位运算最常见的实际应用之一就是权限系统。用一个整数的不同位来表示不同权限，非常高效：</p>

    <h3>定义权限</h3>
    <pre><code>// 每个权限占一位
const PERM_READ    = 0b0001;  // 1 = 读
const PERM_WRITE   = 0b0010;  // 2 = 写
const PERM_EXECUTE = 0b0100;  // 4 = 执行
const PERM_DELETE  = 0b1000;  // 8 = 删除</code></pre>

    <h3>添加权限（OR）</h3>
    <pre><code>// 给用户添加读和写权限
let userPerm = 0;
userPerm = userPerm | PERM_READ;     // 0b0001
userPerm = userPerm | PERM_WRITE;    // 0b0011（即 3）
// 简写
userPerm |= PERM_READ | PERM_WRITE;  // 一次添加多个</code></pre>

    <h3>检查权限（AND）</h3>
    <pre><code>// 检查用户是否有某个权限
if (userPerm & PERM_READ) {
    console.log("有读权限");
}
// 结果非0 → 有权限，结果为0 → 无权限</code></pre>

    <h3>移除权限（AND NOT）</h3>
    <pre><code>// 移除写权限
userPerm &= ~PERM_WRITE;
// ~PERM_WRITE = ~0b0010 = 0b...1101
// 0b0011 & 0b1101 = 0b0001 → 只剩读权限</code></pre>

    <h3>切换权限（XOR）</h3>
    <pre><code>// 切换执行权限（有则移除，无则添加）
userPerm ^= PERM_EXECUTE;</code></pre>

    <h3>各语言实现对比</h3>
    <pre><code># Python 实现
PERM_READ    = 0b0001
PERM_WRITE   = 0b0010
PERM_EXECUTE = 0b0100

user_perm = 0
user_perm |= PERM_READ | PERM_WRITE    # 添加权限
has_read = bool(user_perm & PERM_READ)  # 检查权限
user_perm &= ~PERM_WRITE               # 移除权限

# Java / Kotlin 实现
val PERM_READ = 0b0001
val userPerm = PERM_READ or 0b0010     // 添加
val hasRead = (userPerm and PERM_READ) != 0  // 检查</code></pre>

    <blockquote>
      <p><strong>为什么用位运算而不是 Set 或数组？</strong></p>
      <ul>
        <li><strong>存储效率</strong>：一个 int（4字节）就能表示 32 种权限</li>
        <li><strong>运算速度</strong>：位运算是 CPU 最基本的操作，比集合操作快几个数量级</li>
        <li><strong>传输效率</strong>：权限只需传一个数字，适合网络传输和数据库存储</li>
      </ul>
      <p>Linux 的文件权限（rwx）、数据库的字段标志、游戏中的 Buff 系统都是这个思路。</p>
    </blockquote>
  `
};
