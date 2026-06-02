export const redisPost = {
  id: 5,
  title: 'Redis 学习笔记',
  excerpt: 'Redis 全面学习指南：数据结构、事务、持久化、主从复制、哨兵模式，以及生产环境实践。',
  date: '2025-09-18',
  category: '技术',
  image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
  content: `
    <h2>1. 字符串操作</h2>
    <h3>基本设置和获取</h3>
    <pre><code>SET name fairy          # 设置键 name 的值为 "fairy"
GET name               # 返回："fairy"
SET Name Fairy         # Redis 区分大小写，Name 与 name 是两个不同的键
GET Name               # 返回："Fairy"
SET age 25             # 设置键 age 的值为 "25"
GET age                # 返回："25"</code></pre>

    <h3>键管理</h3>
    <pre><code>DEL name               # 删除键 name
EXISTS name            # 检查键是否存在，返回：0（不存在）
EXISTS age             # 返回：1（存在）
KEYS *                 # 列出当前库中所有键（生产环境慎用，会阻塞）
KEYS *me               # 列出所有以 "me" 结尾的键
SCAN 0 MATCH * COUNT 100  # 生产环境推荐用 SCAN 代替 KEYS
FLUSHALL               # 清空当前 Redis 实例的所有数据库（慎用！）</code></pre>

    <h3>过期时间设置</h3>
    <pre><code>SET name 哈哈          # 重新设置键 name 的值为 "哈哈"
TTL name               # 查看键的剩余生存时间，返回：-1（永不过期）
EXPIRE name 10         # 给键 name 设置 10 秒过期时间
PERSIST name           # 移除过期时间，让键永不过期
SET token abc123 EX 3600  # 设置值的同时指定过期时间（秒）
SET token abc123 PX 60000 # 设置值的同时指定过期时间（毫秒）</code></pre>

    <h2>2. 列表操作</h2>
    <pre><code>LPUSH letter a         # 将元素 "a" 从左侧插入列表 letter
LRANGE letter 0 -1     # 查看列表全部元素，返回：["a"]
LPUSH letter b         # 将元素 "b" 从左侧插入列表 letter
LRANGE letter 0 -1     # 返回：["b", "a"]
LPUSH letter c d e     # 一次性插入多个元素，列表变为：["e", "d", "c", "b", "a"]
RPUSH letter f         # 将元素 "f" 从右侧插入列表
RPOP letter            # 从右侧弹出一个元素
LPOP letter 2          # 从左侧弹出2个元素（Redis 6.2+）
LLEN letter            # 获取列表长度
LTRIM letter 1 3       # 修剪列表，只保留索引1到3的元素
LINDEX letter 0        # 获取指定索引的元素
BLPOP letter 30        # 阻塞式弹出，列表为空时最多等待30秒（消息队列常用）</code></pre>

    <h2>3. 集合操作</h2>
    <h3>基本集合操作</h3>
    <pre><code>SADD course Redis      # 向集合 course 添加元素 "Redis"
SMEMBERS course        # 查看集合所有成员
SISMEMBER course Redis # 检查元素是否在集合中，返回：1（存在）
SISMEMBER course python # 返回：0（不存在）
SREM course Redis      # 从集合中移除元素 "Redis"
SCARD course           # 获取集合元素数量</code></pre>

    <h3>集合运算</h3>
    <pre><code>SUNION key1 key2       # 返回两个集合的并集
SINTER key1 key2       # 返回两个集合的交集
SDIFF key1 key2        # 返回第一个集合与其他集合的差集
SINTERSTORE result key1 key2  # 将交集结果存储到新集合</code></pre>

    <h2>4. 有序集合操作</h2>
    <pre><code>ZADD result 680 清华 660 北大 650 复旦 640 浙大  # 添加带分数的成员
ZRANGE result 0 -1            # 按分数升序返回所有成员
ZRANGE result 0 -1 WITHSCORES # 返回成员及其分数
ZSCORE result 清华            # 返回指定成员的分数
ZRANK result 清华             # 返回指定成员的排名（升序）
ZREVRANK result 清华          # 返回指定成员的排名（降序）
ZREM result 清华              # 移除指定成员
ZRANGEBYSCORE result 650 700  # 返回分数在 650-700 之间的成员</code></pre>

    <h2>5. 哈希操作</h2>
    <pre><code>HSET person name laoyang    # 设置哈希字段
HSET person age 100
HGET person name            # 获取哈希字段值，返回："laoyang"
HGETALL person              # 获取哈希所有字段和值
HDEL person age             # 删除哈希字段
HEXISTS person name         # 检查字段是否存在
HKEYS person                # 获取所有字段名
HLEN person                 # 获取字段数量
HINCRBY person age 1        # 将字段值增加指定整数</code></pre>

    <h2>6. 发布订阅</h2>
    <pre><code>SUBSCRIBE geekhour          # 订阅频道 geekhour
PUBLISH geekhour redis      # 向频道 geekhour 发布消息 "redis"
UNSUBSCRIBE geekhour        # 取消订阅
PSUBSCRIBE news.*           # 模式订阅：匹配所有 news. 开头的频道</code></pre>
    <blockquote>
      <p><strong>注意</strong>：发布订阅的消息不会持久化，如果客户端断开连接期间有消息发布，重新连接后会丢失。需要可靠消息传递请使用 Stream。</p>
    </blockquote>

    <h2>7. Stream 操作（消息队列）</h2>
    <p>Redis 5.0 引入的 Stream 是一个功能完善的消息队列，支持消费者组和消息确认。</p>
    <h3>基本流操作</h3>
    <pre><code>XADD mystream * course redis   # 向流添加消息，* 表示自动生成ID
XADD mystream * course docker
XADD mystream * course git
XLEN mystream                  # 获取流长度
XRANGE mystream - +            # 获取流中所有消息
XRANGE mystream - + COUNT 2   # 只取前2条
XDEL mystream &lt;ID&gt;             # 删除指定ID的消息
XTRIM mystream MAXLEN 0        # 清空流</code></pre>

    <h3>消费者组操作</h3>
    <pre><code># 创建消费者组（0 表示从头开始消费，$ 表示从最新消息开始）
XGROUP CREATE mystream group1 0

# 查看消费者组信息
XINFO GROUPS mystream

# 创建消费者
XGROUP CREATECONSUMER mystream group1 consumer1

# 消费消息（> 表示只消费未分配的新消息）
XREADGROUP GROUP group1 consumer1 COUNT 2 BLOCK 3000 STREAMS mystream &gt;

# 确认消息已被处理
XACK mystream group1 &lt;message-id&gt;

# 查看消费者组中待处理的消息
XPENDING mystream group1</code></pre>

    <h2>8. 地理空间操作</h2>
    <pre><code>GEOADD city 116.405285 39.904989 beijing  # 添加地理位置
GEOPOS city beijing                       # 获取位置坐标
GEODIST city beijing shanghai             # 计算两地距离
GEODIST city beijing shanghai km          # 计算距离（单位：公里）
GEOSEARCH city FROMMEMBER beijing BYRADIUS 300 km  # 搜索附近地点</code></pre>

    <h2>9. HyperLogLog 操作</h2>
    <p>HyperLogLog 是一种概率数据结构，用于做基数统计（比如 UV 统计），误差约 0.81%，但占用固定 12KB 内存。</p>
    <pre><code>PFADD course git docker redis      # 添加元素到 HyperLogLog
PFCOUNT course                     # 估算基数（去重后的元素数量）
PFADD course2 python git go
PFMERGE result course course2      # 合并多个 HyperLogLog
PFCOUNT result                     # 估算合并后的基数</code></pre>

    <h2>10. 位图操作</h2>
    <h3>基本位图操作</h3>
    <pre><code>SETBIT dianzan 0 1        # 设置位图指定位的值
SETBIT dianzan 1 0
GETBIT dianzan 0          # 获取位图指定位的值，返回：1
BITCOUNT dianzan          # 统计位图中值为1的位数
BITPOS dianzan 0          # 查找第一个值为0的位</code></pre>

    <h3>位域操作</h3>
    <pre><code>BITFIELD player:1 SET u8 #0 1      # 设置无符号8位整数
BITFIELD player:1 GET u8 #0        # 获取位域值
BITFIELD player:1 SET u32 #1 100   # 设置无符号32位整数
BITFIELD player:1 INCRBY u32 #1 100  # 增加指定值</code></pre>

    <h2>11. Pipeline 批量操作</h2>
    <p>Redis 客户端每发一个命令都要等待响应，频繁操作时网络延迟会累积。Pipeline 将多个命令打包一次发送，大幅减少 RTT（Round Trip Time）。</p>
    <pre><code># Pipeline 模式（伪代码，具体写法取决于客户端库）
# 普通模式：1000 次 SET 需要 1000 次 RTT
# Pipeline 模式：1000 次 SET 只需要 1 次 RTT

# redis-cli 中使用 Pipeline
cat commands.txt | redis-cli --pipe
# commands.txt 内容：
# SET key1 value1
# SET key2 value2
# SET key3 value3</code></pre>
    <blockquote>
      <p><strong>Pipeline vs 事务</strong>：Pipeline 只是减少网络往返，不保证原子性；事务（MULTI/EXEC）保证原子性但不减少 RTT。两者可以结合使用。</p>
    </blockquote>

    <h2>12. Lua 脚本</h2>
    <p>Redis 支持在服务端执行 Lua 脚本，脚本内的操作是原子性的，常用于实现分布式锁、限流器等。</p>
    <pre><code># 执行 Lua 脚本：检查 key 是否存在，不存在则设置
EVAL "if redis.call('exists', KEYS[1]) == 0 then redis.call('set', KEYS[1], ARGV[1]); return 1 else return 0 end" 1 mykey myvalue

# 脚本缓存：先加载得到 SHA1，后续用 SHA1 调用（节省带宽）
SCRIPT LOAD "return redis.call('get', KEYS[1])"
# 返回 SHA1：e0e1f9fabfc9d4800c877a703b823ac0578ff831
EVALSHA e0e1f9fabfc9d4800c877a703b823ac0578ff831 1 mykey</code></pre>

    <h3>实际应用：分布式锁</h3>
    <pre><code>-- 加锁：SET key uuid NX EX 30
-- NX 保证只有不存在时才能设置成功，EX 设置过期时间防止死锁
if redis.call('set', KEYS[1], ARGV[1], 'NX', 'EX', 30) then
    return 1
else
    return 0
end

-- 释放锁：必须验证 uuid 是自己的，防止误删别人的锁
if redis.call('get', KEYS[1]) == ARGV[1] then
    return redis.call('del', KEYS[1])
else
    return 0
end</code></pre>

    <h2>13. 事务操作</h2>
    <pre><code>MULTI                    # 开始事务
SET k1 v1
SET k2 v2
EXEC                     # 执行事务
GET k1                   # 返回："v1"

# 事务中的错误处理
SET k3 3
MULTI
INCR k3
INCR k4                  # k4 不是数字，会报错，但不影响其他命令
EXEC                     # 事务仍然执行，k3 会正常自增</code></pre>
    <blockquote>
      <p><strong>注意</strong>：Redis 的事务不支持回滚。如果某条命令执行失败，其他命令仍会执行。这与关系型数据库的事务不同。</p>
    </blockquote>

    <h2>14. 持久化</h2>
    <h3>RDB 持久化（快照）</h3>
    <p>RDB 在指定时间间隔内将内存数据快照写入磁盘，适合备份和灾难恢复。</p>
    <pre><code># redis.conf 配置
save 900 1              # 900秒内至少有1个key被更改则快照
save 300 10             # 300秒内至少有10个key被更改则快照
save 60 10000           # 60秒内至少有10000个key被更改则快照

# 手动执行
SAVE                    # 同步保存，会阻塞服务器（生产环境慎用）
BGSAVE                  # 异步保存，后台 fork 子进程执行</code></pre>
    <ul>
      <li><strong>优点</strong>：文件紧凑，恢复速度快</li>
      <li><strong>缺点</strong>：可能丢失最后一次快照后的数据</li>
    </ul>

    <h3>AOF 持久化（追加日志）</h3>
    <p>AOF 记录每一个写操作命令，重启时重新执行命令来恢复数据。</p>
    <pre><code># redis.conf 配置
appendonly yes          # 开启 AOF 持久化
appendfsync always      # 每次写入都同步（最安全，性能最差）
appendfsync everysec    # 每秒同步一次（推荐，兼顾安全和性能）
appendfsync no          # 由操作系统决定同步时机（性能最好，可能丢数据）</code></pre>
    <ul>
      <li><strong>优点</strong>：数据更安全，最多丢 1 秒数据（everysec 模式）</li>
      <li><strong>缺点</strong>：文件体积大，恢复速度比 RDB 慢</li>
    </ul>

    <h3>混合持久化（Redis 4.0+，推荐）</h3>
    <p>结合 RDB 和 AOF 的优势：AOF 重写时，前半部分用 RDB 格式，后半部分用 AOF 格式。</p>
    <pre><code># redis.conf 配置
aof-use-rdb-preamble yes  # 开启混合持久化（Redis 4.0+ 默认开启）</code></pre>
    <p>这样既有 RDB 的快速恢复能力，又有 AOF 的数据安全性，是目前生产环境的推荐方案。</p>

    <h2>15. 内存淘汰策略</h2>
    <p>当 Redis 内存达到 <code>maxmemory</code> 上限时，需要根据淘汰策略决定如何处理新写入的数据。</p>
    <pre><code># redis.conf 配置
maxmemory 1gb                    # 最大内存限制
maxmemory-policy allkeys-lru     # 淘汰策略</code></pre>

    <p><strong>8 种淘汰策略</strong>：</p>
    <table>
      <thead>
        <tr><th>策略</th><th>说明</th><th>适用场景</th></tr>
      </thead>
      <tbody>
        <tr><td><code>noeviction</code></td><td>不淘汰，内存满了直接报错</td><td>不允许丢数据的场景</td></tr>
        <tr><td><code>allkeys-lru</code></td><td>从所有 key 中淘汰最近最少使用的</td><td><strong>最常用</strong>，通用缓存</td></tr>
        <tr><td><code>allkeys-lfu</code></td><td>从所有 key 中淘汰最不经常使用的</td><td>热点数据明显的场景</td></tr>
        <tr><td><code>allkeys-random</code></td><td>从所有 key 中随机淘汰</td><td>各 key 访问概率相近</td></tr>
        <tr><td><code>volatile-lru</code></td><td>从设置了过期时间的 key 中淘汰 LRU</td><td>混合使用缓存和持久数据</td></tr>
        <tr><td><code>volatile-lfu</code></td><td>从设置了过期时间的 key 中淘汰 LFU</td><td>同上，但用频率而非时间</td></tr>
        <tr><td><code>volatile-random</code></td><td>从设置了过期时间的 key 中随机淘汰</td><td>同上</td></tr>
        <tr><td><code>volatile-ttl</code></td><td>从设置了过期时间的 key 中淘汰 TTL 最小的</td><td>希望快过期的数据先被淘汰</td></tr>
      </tbody>
    </table>
    <blockquote>
      <p><strong>建议</strong>：大多数场景用 <code>allkeys-lru</code> 就够了。如果你明确区分了缓存数据和持久数据（只有缓存数据设了过期时间），可以用 <code>volatile-lru</code>。</p>
    </blockquote>

    <h2>16. 主从复制</h2>
    <pre><code># 方式1：命令行方式（在从节点执行）
SLAVEOF &lt;masterip&gt; &lt;masterport&gt;

# 方式2：配置文件方式（在从节点的 redis.conf 中添加）
slaveof &lt;masterip&gt; &lt;masterport&gt;

# 查看复制信息
INFO replication</code></pre>
    <p><strong>复制原理</strong>：</p>
    <ol>
      <li>从节点连接主节点，发送 PSYNC 命令</li>
      <li>首次连接：主节点执行 BGSAVE，将 RDB 文件发送给从节点（全量同步）</li>
      <li>后续同步：主节点将写命令发送给从节点（增量同步）</li>
    </ol>

    <h2>17. 哨兵模式</h2>
    <p>哨兵（Sentinel）用于实现 Redis 的高可用：自动监控主节点，在主节点故障时自动进行故障转移。</p>
    <h3>配置步骤</h3>
    <p>创建哨兵配置文件 <code>sentinel.conf</code>：</p>
    <pre><code>port 26379
sentinel monitor mymaster 127.0.0.1 6379 2
# 2 表示至少需要 2 个哨兵同意才能判定主节点下线
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000
sentinel parallel-syncs mymaster 1</code></pre>
    <p>启动哨兵：</p>
    <pre><code>redis-sentinel sentinel.conf</code></pre>
    <p>哨兵会自动监控主节点，并在主节点故障时自动进行故障转移（选举新主节点，通知从节点切换）。</p>

    <h2>总结</h2>
    <p>Redis 是一个功能丰富的高性能键值数据库，支持多种数据结构、持久化、复制、高可用等特性。</p>
    <blockquote>
      <p><strong>注意事项</strong>：</p>
      <ul>
        <li>Redis 是单线程的，所有操作都是原子性的</li>
        <li>合理选择数据结构可以提高性能和减少内存使用</li>
        <li>生产环境中需要配置持久化和备份策略（推荐混合持久化）</li>
        <li>使用哨兵或集群模式实现高可用性</li>
        <li>避免使用 <code>KEYS *</code>，用 <code>SCAN</code> 替代</li>
        <li>合理设置 <code>maxmemory</code> 和淘汰策略，防止 OOM</li>
      </ul>
    </blockquote>
  `
};
