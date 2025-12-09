# Pinata.cloud 集成指南

本文档介绍了如何在项目中集成和使用 Pinata.cloud 服务来实现 IPFS 文件存储功能。

## 1. 环境配置

### 1.1 获取 Pinata 凭据

1. 访问 [Pinata.cloud](https://www.pinata.cloud) 并注册账户
2. 登录后，转到 "API Keys" 页面
3. 点击 "New API Key" 创建一个新的 API 密钥
4. 保存以下信息：
   - JWT (用于认证)
   - Gateway URL (用于访问文件)

### 1.2 配置环境变量

在项目根目录创建 `.env` 文件并添加以下内容：

```env
VITE_PINATA_JWT=your_pinata_jwt_here
VITE_PINATA_GATEWAY=your_gateway_url.mypinata.cloud
```

注意：请勿将真实的 JWT 提交到版本控制系统中。在生产环境中，应使用更安全的方式来管理密钥。

## 2. 核心功能

### 2.1 显示图片

使用 `LazyImage` 组件显示存储在 IPFS 上的图片：

```tsx
import LazyImage from '../components/LazyImage';

const MyComponent = () => {
  return (
    <LazyImage 
      cid="your_image_cid_here" 
      alt="Description of image"
      className="w-full h-64 rounded-lg"
    />
  );
};
```

### 2.2 显示数据

使用 `PinataDataDisplay` 组件显示存储在 IPFS 上的 JSON 数据或其他文本内容：

```tsx
import PinataDataDisplay from '../components/PinataDataDisplay';

const MyComponent = () => {
  return (
    <PinataDataDisplay 
      cid="your_data_cid_here" 
      className="mt-4"
    />
  );
};
```

## 3. 组件使用

### 3.1 LazyImage 组件

用于显示 IPFS 上的图片，具有懒加载和错误处理功能。

属性：
- `cid` (必需): IPFS 内容标识符
- `alt` (可选): 图片描述文字
- `className` (可选): 自定义样式类
- `gateway` (可选): 自定义网关 URL

### 3.2 PinataDataDisplay 组件

用于显示 IPFS 上的 JSON 数据或其他文本内容。

属性：
- `cid` (必需): IPFS 内容标识符
- `className` (可选): 自定义样式类
- `gateway` (可选): 自定义网关 URL

## 4. 安全注意事项

1. **JWT 保护**：JWT 应该保密，不应暴露在客户端代码中
2. **服务端代理**：在生产环境中，建议通过服务端 API 路由处理 Pinata 请求
3. **API 限制**：注意 Pinata 的 API 使用限制

## 5. 故障排除

### 5.1 图片加载失败

- 确认 CID 是否正确
- 检查网关 URL 配置
- 验证文件是否仍存在于 IPFS 网络中

### 5.2 数据获取失败

- 确认 CID 是否正确
- 检查网关 URL 配置
- 验证文件是否仍存在于 IPFS 网络中

## 6. 扩展功能

开发者可以根据需要扩展以下功能：

1. 文件固定（Pinning）
2. 目录结构展示
3. 与智能合约集成