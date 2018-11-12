# 使用这个模板

1. 安装依赖

```
npm install
```

2. dev 运行

```
npm run dev
```

在浏览器中默认打开是无法访问的, 本项目是多入口模板, 在浏览器默认打开的后缀加上 inside 或 outside 分别访问两个不同的入口

> 在 `build/webpack.base.config.js` 中修改 `HtmlWebpackPlugin` 部分内容来修改访问地址

3. build

```
npm run build
```

> 这个模板还有许多待优化的地方