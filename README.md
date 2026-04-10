# 硅谷后台管理系统

基于 Vue 3 + TypeScript 的后台管理前端，配套 Golang 后端 API 与 MySQL 数据库。

本仓库包含两部分：

- `zz_project`：前端项目（Vite + Vue 3 + Pinia + Element Plus）
- `接口/vue3_admin_backend`：后端项目（Gin + MySQL + Swagger）

## 技术栈

### 前端

- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router
- Element Plus
- Axios
- Vitest / Playwright

### 后端

- Golang 1.20+
- Gin
- MySQL 8
- Swagger
- Docker / Docker Compose

## 目录结构

```text
.
├─ README.md
├─ 接口/
│  └─ vue3_admin_backend/   # 后端 API
└─ zz_project/              # 前端项目
```

## 环境要求

- Node.js：`^20.19.0 || >=22.12.0`
- pnpm（推荐）或 npm
- Docker Desktop（推荐一键启动后端）

可选：

- Go 1.20+
- MySQL 8.0+

## 快速开始（推荐）

推荐顺序：先启动后端，再启动前端。

### 1. 启动后端（Docker 一键）

进入后端目录并启动：

```bash
cd 接口/vue3_admin_backend
docker-compose up --build -d
```

启动后：

- 后端 API 地址：`http://127.0.0.1:10086`
- Swagger 文档：`http://127.0.0.1:10086/swagger/index.html#/`
- MySQL 映射端口：`3307`

默认会自动执行 `init-sql` 下的初始化 SQL。

### 2. 启动前端

进入前端目录安装依赖并启动开发环境：

```bash
cd zz_project
pnpm install
pnpm dev
```

若你使用 npm：

```bash
npm install
npm run dev
```

前端开发环境会通过 `VITE_SERVE` 请求后端，默认已配置为：

`http://127.0.0.1:10086`

## 前端常用命令

在 `zz_project` 目录下执行：

```bash
pnpm dev          # 本地开发
pnpm build        # 类型检查 + 打包
pnpm preview      # 预览构建产物
pnpm lint         # ESLint
pnpm test:unit    # 单元测试（Vitest）
pnpm test:e2e     # E2E 测试（Playwright）
```

## 后端常用命令

在 `接口/vue3_admin_backend` 目录下执行：

```bash
docker-compose up --build -d   # 启动后端 + MySQL
docker-compose down            # 停止并移除容器
```

如需本地直接运行（非 Docker）：

1. 准备 MySQL 并导入 `init-sql/init.sql`
2. 修改 `conf/config.yaml` 的 MySQL 连接信息
3. 运行：

```bash
go mod tidy
go run main.go -f conf/config.yaml
```

## 联调配置说明

前端请求地址位于：

- `zz_project/.env.development` 中的 `VITE_SERVE`

当前默认值：

```env
VITE_SERVE = 'http://127.0.0.1:10086'
```

如果你改了后端端口或域名，请同步修改此值。

## 默认测试账号

- 用户名：`admin`
- 密码：`111111`

## 常见问题

### 1. 前端启动后无法请求后端

- 确认后端容器是否启动成功：`docker ps`
- 确认 `http://127.0.0.1:10086/swagger/index.html#/` 可访问
- 确认前端 `.env.development` 的 `VITE_SERVE` 配置正确

### 2. 后端连接数据库失败

- Docker 模式下，确认 MySQL 容器健康并已完成初始化
- 本地模式下，确认 `conf/config.yaml` 的 host/port/user/password/dbname 正确

### 3. E2E 测试首次执行失败

请先安装 Playwright 浏览器：

```bash
npx playwright install
```

## 参考文档

- 后端说明：`接口/vue3_admin_backend/README.md`
- 前端说明：`zz_project/README.md`

## License

仅供学习与交流使用。
