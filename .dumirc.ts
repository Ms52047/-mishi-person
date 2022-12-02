import { defineConfig } from 'dumi';

export default defineConfig({
  // dumi 1.x 用 title 作为组件库名称，如果你希望设置的是组件库名称而非页面标题，请改用 name
  themeConfig: {
    name: 'person',
    logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
    // menus 升级为 themeConfig.sidebar
    // sidebar: {
    //   '/guide': {
    //     title: '分组名称（可选）',
    //     children: [{ title: '标题', link: '链接' }],
    //   },
    // },
    // navs 升级为 themeConfig.nav
    // nav: [{ title: '标题', link: '链接' }],
  },
  // title: 'person',
  favicons: [
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  ],
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
  // 以下为文档配置升级
  // 已内置全文搜索，默认不再集成 algolia，有需要可以手动覆盖 SearchBar 组件
  // algolia: { ... },
  // locales 配置格式升级
  locales: [{ id: 'zh-CN', name: '中文' }], // 2.0 默认值
  // resolve 配置项升级
  resolve: {
    // 拆分普通文档解析（多层）和资产文档（单层 + 按分类添加路由前缀）解析，可访问约定式路由了解更多
    docDirs: ['docs'], // 2.0 默认值
    atomDirs: [{ type: 'component', dir: 'src' }], // 2.0 默认值
    // passive 配置项升级，用 codeBlockMode 替代
    codeBlockMode: 'passive',
  },
  // sitemap: {
  //   // sitemap.excludes 配置项升级
  //   exclude: [...],
  // },
});
