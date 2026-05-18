# 🐾 宠物管家 (Pet Manager)

一个温馨的宠物健康与日常管理应用，帮你记录毛孩子们的每一个重要时刻。

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite)

## ✨ 功能

- 🐶 **宠物档案** — 记录名字、品种、生日、性别、体重等基本信息
- 💊 **健康追踪** — 疫苗接种、体检记录、用药提醒、体重变化
- 📝 **日常日记** — 随手记录毛孩子的日常趣事，支持心情标签 😊 😐 😢
- 📊 **数据可视化** — 体重趋势图，健康数据一目了然
- 📱 **响应式设计** — 手机、平板、桌面端完美适配
- 🎨 **毛孩子专属头像** — 狗🐕 猫🐱 兔🐰 鼠🐹 鸟🐦 鱼🐟 龟🐢

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 14 (App Router) |
| 语言 | TypeScript |
| ORM | Prisma |
| 数据库 | SQLite |
| 样式 | Tailwind CSS |
| 图表 | Recharts |
| 图标 | Lucide React |

## 🚀 快速开始

```bash
# 1. 克隆项目
git clone https://github.com/windsonsea/pet-app.git
cd pet-app

# 2. 安装依赖（postinstall 会自动初始化数据库）
npm install

# 3. 填充示例数据（可选）
npm run db:seed

# 4. 启动开发服务器
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📂 项目结构

```
pet-app/
├── prisma/
│   ├── schema.prisma      # 数据模型
│   ├── seed.ts            # 种子数据（豆豆 & 咪咪）
│   └── dev.db             # SQLite 数据库文件
├── src/
│   ├── app/
│   │   ├── api/           # RESTful API
│   │   │   ├── pets/      # 宠物 CRUD
│   │   │   └── download/  # 数据导出
│   │   ├── pets/
│   │   │   ├── [id]/      # 宠物详情页
│   │   │   └── new/       # 添加新宠物
│   │   ├── layout.tsx     # 全局布局
│   │   └── page.tsx       # 首页（宠物列表）
│   └── lib/
│       └── prisma.ts      # Prisma 客户端单例
├── public/                # 静态资源
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 🗃️ 数据模型

```
Pet              宠物档案
├── name         名字
├── species      种类（狗/猫/兔子/仓鼠/鸟/鱼/乌龟/其他）
├── breed        品种
├── birthDate    出生日期
├── gender       性别（公/母）
├── weight       体重 (kg)
└── avatarUrl    头像

HealthRecord     健康记录
├── type         类型（疫苗/体检/用药/体重/其他）
├── title        标题
├── value        数值
├── unit         单位
├── note         备注
└── date         日期

DailyNote        日常笔记
├── content      内容
├── mood         心情（开心/一般/难过）
└── images       照片
```

## 📦 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（热更新） |
| `npm run build` | 构建生产版本 |
| `npm run start` | 启动生产服务器 |
| `npm run db:seed` | 填充示例数据 |

## 🚀 部署

### Vercel（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/windsonsea/pet-app)

一键部署，自动配置 Next.js + SQLite。

### 其他平台

```bash
npm run build
npm run start
```

## 📸 预览

| 首页 | 详情页 |
|------|--------|
| 宠物卡片列表 | 健康记录 + 日常笔记 |

## 📄 License

MIT © Michael Yao
