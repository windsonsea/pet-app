# Vercel 部署指南

## 1. 创建 Neon 数据库（已做好）
DATABASE_URL 已获取

## 2. Vercel 部署

### 方法 A：网页部署（推荐）
1. 打开 https://vercel.com/new
2. Import GitHub: windsonsea/pet-app
3. 点击 Environment Variables
4. 添加：
   - Key: DATABASE_URL
   - Value: postgresql://neondb_owner:npg_hZeSO6HkMQy7@ep-delicate-surf-ao7uj05m-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require
5. Deploy！

### 方法 B：Vercel CLI
```bash
npm i -g vercel
vercel login
vercel link
vercel env add DATABASE_URL
# 粘贴上面的 DATABASE_URL 值
vercel --prod
```

## 3. 部署后
访问 Vercel 给你的域名，论坛就能用了！