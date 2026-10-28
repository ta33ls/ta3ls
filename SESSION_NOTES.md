# ta3ls.dev 会话沉淀

> 最后更新：2026-10-28  
> 仓库：`/Users/ta3ls/ta3ls`  
> 当前状态：本地已完成，未提交 git；相关服务进程已停止。  
> 密钥只存在于 `.env.local`（已 gitignore），本文档不记录任何密钥值。

---

## 1. 快速开始

```bash
cd /Users/ta3ls/ta3ls
npm run dev
```

- 首页：`http://localhost:3000/`
- 第一个作品：`http://localhost:3000/poem`
- 第二个作品：`http://localhost:3000/duplex`
- 健康检查：`http://localhost:3000/api/health/db`
- 诗词 tick：`POST http://localhost:3000/api/poem/tick?after=<latestId>`
- 诗词历史：`GET http://localhost:3000/api/poem/lines?before=<id>&limit=30`
- DUPLEX 流式生成：`POST http://localhost:3000/api/duplex/stream`（SSE）
- DUPLEX 历史：`GET http://localhost:3000/api/duplex/messages?before=<id>&limit=50`

常用命令：

```bash
npm run lint
npm run build
npm run start
npm run db:generate
npm run db:migrate
```

> `db:generate` / `db:migrate` 会通过 `node --env-file=.env.local` 加载环境变量，migration 使用 `DATABASE_URL_UNPOOLED`。

---

## 2. 本次会话完成的事情

### 2.1 仓库与 Next.js

- 克隆 `https://github.com/ta33ls/ta3ls.git` 到 `/Users/ta3ls/ta3ls`。
- Next.js 从 `16.3.1` 升级到 `16.4.3`，React / React DOM 从 `19.2.8` 升级到 `19.3.1`。
- 当前项目使用 App Router、Tailwind v4、Fira Code。

### 2.2 个人主页重做

设计参考：`/Users/ta3ls/midnight-frequency`（源目录未修改）。

决策：

- 真实内容 + 25:00 FM 电台包装。
- 全站英文，使用原项目的 **Fira Code**。
- 品牌保留 `ta3ls.dev`，核心标记是 `33.0` 和 “There are 33 love songs.”。
- 微缩简历，突出当前身份：**AI Product Manager @ NIO**。
- 旧履历保留：Full Stack Developer / Technical Product Manager、Product Manager、Blockchain Developer、Research Assistant。
- 学历：Master of Computer Science；地点：Shanghai, China / Auckland, New Zealand。
- 旧 status 保留划线，新 status 使用：
  **“Abandoning unrealistic fantasies, building AI applications with true practical value.”**

主要页面结构：

- Header：`33.0 / ta3ls.dev / AI PRODUCT MANAGER @ NIO`，导航 `WORK / PROFILE / CONTACT`，ON AIR、时钟、声音开关。
- Hero：`At the 25th hour, / There are 33 love songs.`，AI PM @ NIO 简介，START LISTENING、READ THE RESUME。
- 调频拨盘：BLOCKCHAIN / FRONTEND / BACKEND / AI PRODUCT，对应 skills.json 的内容。
- Programs：AI Product @ NIO、Endless Glitch Poem、Reserved 02、Selected Archive。
- Field Notes：关于、specs、旧/新 status、33 签名。
- Contact：静态三卡片（Telegram / GitHub / X），内联 SVG 图标、账号、短句、CALL/COMMIT/FOLLOW。
- Footer：只保留 `© 2026 ta3ls.dev`。
- Favicon：33 标记（`src/app/icon.svg`，旧 goose `icon.png` 已删除）。

交互：

- Hero SVG 插画、扫描镜头、自定义光标、grain、ticker、滚动揭示、环境音。
- 调频拨盘 **每 9 秒自动切换**，AUTO 按钮显示倒计时（如 `AUTO 09s`），支持暂停/恢复。
- 手动点击频段、方向键 / Home / End 仍然可用；手动切换会重置倒计时。
- 自动切换和倒计时放在独立 `AutoContext`，避免大 Hero SVG 每秒重渲染。
- 声音启动后，自动切换会平滑调频；未播放时自动切换不启动声音。
- 联系区从跑马灯改成静态卡片，明确图标和账号，避免“看起来不像联系方式”。
- 移除了所有 `Midnight Frequency` / `midnight` 残留；样式文件从 `midnight.css` 重命名为 `radio.css`。
- Hero 简介三段之间加了显式 `<br />`。

关键文案/品牌：

- `33.0`、`FM 33.0`、`ta3ls.dev`。
- `There are 33 love songs.` 出现在 Hero、ticker 等位置。
- “The poem is live. One frequency still reserved.” 是 Programs 的说明。
- Contact 标题：`Pick a channel, I'm on the other end.`

### 2.3 Neon / Postgres

- 全局安装了 `neon@8.13.0`。
- 第一次 `neon init` 在安装 skills 时失败：系统 Node 是 `22.16.0`，Neon skills CLI 要求 `>=22.20.0`。
- 通过 `npx -y node@22`（`22.23.4`）运行 Neon CLI 完成初始化；全局 `neon` 本体仍走系统 Node。核心 CLI 命令可用，涉及 skills 安装时可能需要 Node 22.20+。
- Neon 初始化时浏览器登录已完成（`Auth complete (profile DEFAULT)`）。
- 已安装用户级 Neon plugins / skills / MCP（opencode、Claude Code、Codex、Cursor、GitHub Copilot 等）。
- Neon 项目：
  - Org：`org-divine-firefly-59134564`
  - Project：`dry-frog-34584655`（ta3ls）
  - Branch：`production`（`br-falling-sound-a1e0enve`）
- `neon deploy` 输出：`No changes — branch production already matches the policy.`，Utilized services: Postgres。
- `.env.local` 中由 Neon 写入：
  - `DATABASE_URL`（pooled）
  - `DATABASE_URL_UNPOOLED`（direct，migration 用）
  - `NEON_BRANCH`
- 用户选择直接使用 production DB，没有创建 dev 分支。

数据库接入：

- 选择 `node-postgres` (`pg`) + `attachDatabasePool`（Vercel Fluid compute 方向）。
- `src/lib/db.ts`：server-only 的单例 Pool；应用查询走 pooled `DATABASE_URL`；Vercel 环境下调用 `attachDatabasePool`。
- `src/app/api/health/db/route.ts`：`select 1, now(), current_database()`，已用 HTTP 200 验证。
- `src/lib/db-url.ts`：把 `sslmode=require/prefer/verify-ca` 规范为 `sslmode=verify-full`，消除 `pg-connection-string` 的 SECURITY WARNING；`src/lib/db.ts` 和 `drizzle.config.ts` 都使用它。
- migration 使用 `DATABASE_URL_UNPOOLED`；业务查询使用 pooled `DATABASE_URL`。

### 2.4 第一个作品：ENDLESS GLITCH POEM

- 路由：`/poem`，首页 `Programs` 的 `ENDLESS GLITCH POEM` 已链接过去。
- 模式：**lazy**。页面打开时客户端每 10 秒 tick，按分钟生成；没有访客时不会继续生成，所以时间轴会留空档。
- LLM：DeepSeek 直连，`@ai-sdk/deepseek`，模型 `deepseek-flash`。
  - `DEEPSEEK_API_KEY`、`DEEPSEEK_MODEL=deepseek-flash` 在 `.env.local`（gitignored）。
  - `thinking: disabled`，temperature 1.1，topP 0.95，maxOutputTokens 120，20s timeout。
- 语言/风格：中文意识流；20–60 个汉字左右；可混少量英文/噪声；最多一个轻微乱码 token。
- “乱码”表达：内容层少量损坏 token + 前端 decode/scramble 动画；不把存储的句子整体打乱。
- Prompt 要求不写时间戳、日期、句号编号；sanitizer 也会剥离开头的 `HH:MM`。
- 页面：当前句大字、中文宋体回退、glitch 阴影、光标、倒计时、传输日志、LOAD OLDER、LIVE/SYNCING/INTERFERENCE/PAUSED 状态。
- 支持 `prefers-reduced-motion`：关闭 scramble 和光标闪烁。
- 空库首访：显示等待第一句，客户端 tick 后生成。

数据模型（Drizzle）：

```text
poem_lines
  id bigserial pk
  slot timestamptz unique
  line text
  model text
  prompt_version text
  latency_ms integer
  usage jsonb
  created_at timestamptz

poem_ticks
  slot timestamptz pk
  status text  // pending | done | failed
  error text
  started_at timestamptz
  finished_at timestamptz
```

- `poem_ticks.slot` 唯一，保证同一分钟最多一次生成尝试。
- `poem_lines.slot` 唯一，保证同一分钟最多一句。
- migration 已应用到 production：`drizzle/0000_complete_piledriver.sql`。
- 生成的句子会记录 model、prompt version、latency、usage。

API：

```text
POST /api/poem/tick?after=<latestId>
  - 触发 lazy 生成（如果当前分钟还没有 tick/line）
  - 返回 after 之后的新句子、status、serverNow、nextAt、generated
  - 同一分钟重复调用 generated=false

GET /api/poem/lines?before=<id>&limit=30
  - 读取更早的历史句子
```

目前 production 数据：16 句，ticks 全部 `done`；下面是前 4 句。

```text
#1 19:14Z 整座城的楼宇在调频噪声里侧过身去，只有电台的红色指示灯还醒着。
#2 19:15Z 我替一列末班地铁记住它的隧洞喘息，耳机里失焦的电波像雨点敲在铁皮屋檐上。
#3 19:18Z 洒水车拐进雾里，把半座没有门的车站唱成一条逐渐痊愈的裂纹。
#4 19:19Z 报刊亭的卷帘门漏出一道微光，像有人在里面数着失眠的硬币。
```

19:15 → 19:18 的空档是 lazy 模式的预期行为：中间没有页面在 tick。截至今晚 production 已累计 16 句。

### 2.5 第二个作品：DUPLEX

- 路由 `/duplex`；首页 Programs 的 `RESERVED 02` 已替换为 `DUPLEX`，链接 `/duplex`。
- 两个 agent：
  - `33`：温暖的深夜主持人，记得城市，想继续广播，害怕只剩静电。
  - `00`：来自频段之间的静电，认为城市是循环录音，想关掉信号，表面冷酷。
  - 各有隐藏欲望；prompt 只把当前说话者自己的隐藏目标交给模型。
- 节奏：每 **15 秒**一条，交替发言；lazy 模式，页面打开时才继续。
- **流式显示**：`POST /api/duplex/stream` 返回 SSE（`meta` / `delta` / `done` / `pending` / `error`）；前端逐字渲染；流结束后把完整消息写入 Postgres，再发送 `done`。
- 数据表 `duplex_messages` / `duplex_ticks`：
  - `duplex_messages`：thread、turn、speaker、content、slot、model、prompt_version、usage；`(thread, turn)` 和 `(thread, slot)` 唯一。
  - `duplex_ticks`：15 秒 slot 主键，status/error/started/finished；同一 slot 最多一次生成。
- 上下文：最近 16 条；DeepSeek `deepseek-flash`，thinking disabled，temperature 1.05，topP 0.95，maxOutputTokens 180，20s stream timeout。
- 页面：
  - Hero：`Two agents, one loop.` + 两张 agent 卡。
  - Sticky livebar：LIVE/SYNCING/INTERFERENCE、下一位发言人、15 秒倒计时、进度条。
  - 实时 transcript：33 左/粉色、00 右/青色；流式 draft + 光标；自动滚到最新；NEW 跳转；LOAD OLDER；`prefers-reduced-motion`。
  - Header/极简 footer 与 poem 同风格。
- 首页说明改为 `Both frequencies live.`。
- `src/lib/db.ts` 的 `connectionTimeoutMillis` 从 10s 提到 30s，解决 Neon compute 冷启动时 `/duplex` 偶发 500（`timeout exceeded when trying to connect`）。
- 当前 production：13 条消息（turn 1–13），13 个 tick 全部 done；curl 截断测试产生的 2 个 failed tick 已清理。

### 2.6 验证记录

- `npm run lint` 通过。
- `npm run build` 通过，路由包含：

```text
├ ƒ /api/duplex/messages
├ ƒ /api/duplex/stream
├ ƒ /api/health/db
├ ƒ /api/poem/lines
├ ƒ /api/poem/tick
├ ƒ /duplex
└ ƒ /poem
```

- `npm run db:migrate`：`migrations applied successfully!`（0000 poem + 0001 duplex）。
- `/api/health/db` 返回 `{"ok":true,"service":"postgres","database":"neondb",...}`。
- 第一次 poem tick 生成第 1 句；同一分钟第二次 tick `generated:false`。
- `/poem` 返回 200；1440 / 390 截图、首页链接、倒计时、自动接收、历史日志均已验证；浏览器无 console error。
- `/duplex` 返回 200；第一次流式生成 33 的开场；同一 15s slot 第二次调用直接返回 `done`（已有 message id，0.8s，未调用 LLM）。
- DUPLEX 流式验证：状态 `SYNCING / 正在接收`、`00 IS SPEAKING`、draft 51 字、livebar 固定在 header 下方、自动滚动到最新；结束后 `LIVE`、下一位 33、倒计时恢复。
- 首页 `DUPLEX` 行链接 `/duplex`；1440 / 390 布局、sticky livebar、移动端 transcript、NEW 跳转均已验证；无 console error。
- `pg` SSL 警告已通过 `sslmode=verify-full` 规范化消除；启动、页面、db:migrate 均不再出现。
- DeepSeek 第一次测试返回中文长句正常；后续 poem / duplex 生成正常。

---

## 3. 关键文件

```text
src/app/
  layout.tsx                 全局字体、metadata、viewport
  page.tsx                   首页入口
  globals.css                Tailwind + radio.css
  radio.css                  主页视觉系统（源自 midnight-frequency，已改名）
  icon.svg                   33 favicon
  poem/
    page.tsx                 /poem 服务端页面
    poem-live.tsx            客户端 tick、倒计时、日志、scramble
    poem.css                 /poem 样式
  duplex/
    page.tsx                 /duplex 服务端页面
    duplex-live.tsx          客户端 SSE 流、倒计时、transcript
    duplex.css               /duplex 样式
  api/
    health/db/route.ts       Postgres 健康检查
    poem/tick/route.ts       lazy 生成 + 新句子
    poem/lines/route.ts      历史句子
    duplex/stream/route.ts   SSE 流式生成 + 落库
    duplex/messages/route.ts 历史消息

src/components/
  radio/radio-provider.tsx   RadioContext + AutoContext + 音频状态
  site/home.tsx              首页客户端壳
  site/header.tsx            header、时钟、声音开关
  site/hero.tsx              Hero、调频、倒计时、手动切换
  site/hero-scene.tsx        Hero SVG 组件
  site/hero-scene-markup.ts  SVG 原始标记（37KB）
  site/dial.tsx              调频拨盘、AUTO、键盘
  site/ticker.tsx            跑马灯
  site/programs.tsx          Programs（支持 href 链接）
  site/field-notes.tsx       profile / specs / manifesto
  site/letters.tsx           contact 静态卡片
  site/contact-icon.tsx      Telegram / GitHub / X 图标
  site/footer.tsx            极简 footer

src/hooks/
  use-fine-pointer.ts
  use-reduced-motion.ts
  use-marquees.ts
  use-reveals.ts
  use-cursor.ts
  use-hero-lens.ts

src/lib/
  site-data.ts               首页品牌、skills、programs、contacts
  radio.ts                   环境音合成器
  db.ts                      pg Pool + attachDatabasePool
  db-url.ts                  sslmode 规范化
  poem/
    types.ts                 共享类型（客户端可引用）
    prompt.ts                中文 prompt、prompt version
    sanitize.ts              清洗控制字符、bidi、时间戳
    generate.ts              DeepSeek + AI SDK
    service.ts               tick、snapshot、history
  duplex/
    constants.ts             15s interval / thread / limits
    types.ts                 共享类型
    personas.ts              33 / 00 人设、隐藏欲望、prompt
    sanitize.ts              名字前缀/控制字符清洗
    stream.ts                DeepSeek streamText
    service.ts               slot、prepare、persist、history

src/db/
  schema.ts                  Drizzle 表定义
  index.ts                   db 实例

drizzle.config.ts
drizzle/0000_complete_piledriver.sql
drizzle/0001_misty_bug.sql
drizzle/meta/...
neon.ts                      Neon branch policy
.env.local                   DATABASE_URL / DATABASE_URL_UNPOOLED / NEON_BRANCH / DEEPSEEK_API_KEY / DEEPSEEK_MODEL（gitignored）
.neon                        Neon 本地 context（gitignored）
```

依赖新增：

- `@neon/config`、`@neon/env`（Neon init）
- `pg`、`@types/pg`、`@vercel/functions`
- `ai`、`@ai-sdk/deepseek`
- `drizzle-orm`、`drizzle-kit`

旧的 `src/components/ui/*` 和 `src/lib/utils.ts` 目前未使用，保留未删。

---

## 4. 当前状态与注意事项

- 本地开发服务器已停止；下次 `npm run dev` 即可。
- **未提交 git**。当前有大量未跟踪/修改文件，包括首页重构、Neon、poem。需要提交前先 review `git status`。
- `.env.local` 和 `.neon` 已 gitignore；数据库中没有任何 secret 写入代码。
- 用户提供的 DeepSeek key 只存在 `.env.local`。如果这段对话/终端记录会外传，建议之后在 DeepSeek 后台 rotate。
- 当前直接用 production Neon；没有 dev 分支。若后续要隔离开发数据，可 `neon checkout dev --create`，但注意 `neon.ts` 的 branch 策略会给新分支 7 天 TTL。
- 16 句 poem 和 13 条 duplex 是真实的 production 数据，不是 mock；如果要清空重来，需要删除对应表数据（破坏性操作）。
- 两个作品都是 lazy：没人访问就不生成；这不是 bug。需要真正 24/7 时再加 scheduler。
- poem 的公开 tick 安全边界是 `poem_ticks.slot` 唯一约束；DUPLEX 的是 `duplex_ticks.slot`（15s）唯一约束。
- 失败时对应 tick 标记 `failed`，当前 slot 不重试，下一 slot 继续；页面显示 INTERFERENCE。
- DUPLEX 使用 SSE 流式返回；流结束才把完整消息落库；客户端中途断开时，服务端会 abort 并把 tick 标记 failed。
- `src/lib/db.ts` 的 connectionTimeout 是 30s；Neon 从 suspend 唤醒可能超过 10s，之前 10s 会导致页面 500。
- 当前没有 Vercel 部署；部署时需要配置：
  - `DATABASE_URL`
  - `DATABASE_URL_UNPOOLED`（migration/CI 用，runtime 不必须）
  - `DEEPSEEK_API_KEY`
  - `DEEPSEEK_MODEL=deepseek-flash`
- 系统 Node 是 `22.16.0`；Neon skills 安装要求 `>=22.20.0`。下次如果运行 `neon init` / skills 安装失败，用：

```bash
npx -y node@22 /Users/ta3ls/.npm-global/lib/node_modules/neon/dist/cli.js <command>
```

- `npm install` 曾报告多项依赖漏洞（包含 1 critical），未执行 `npm audit fix`。

---

## 5. 下一步

1. 两个作品均已完成：`/poem` 和 `/duplex`。
2. 如果要做真正 24/7：
   - poem 可以 Vercel Pro Cron 每分钟 POST `/api/poem/tick`；
   - DUPLEX 15 秒节奏需要 Upstash QStash 或 Neon Function Trigger（Vercel Cron 最低 1 分钟）；
   - 注意 scheduler 会让 Neon compute 长时间保持唤醒，成本高于 lazy。
3. 部署 Vercel，配置 `DATABASE_URL`、`DEEPSEEK_API_KEY`、`DEEPSEEK_MODEL`；如果 CI 跑 migration 再加 `DATABASE_URL_UNPOOLED`。
4. 可选：给 Neon 建 dev 分支，后续 migration 先在 dev 验证再上 production。
5. 可选：提交前清理未使用的 `src/components/ui/*`、shadcn 依赖和旧的 `.letter` marquee 样式。
6. 观察两个作品的生成质量；prompt version 已记录在 DB。DUPLEX 偶尔会出现 `$` 这类噪声 token，属于当前 prompt 允许的“乱码”范围，可按需收紧。
