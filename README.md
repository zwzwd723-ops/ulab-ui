# ULAB UI

基于 ULAB 官网现有视觉与业务规则整理的独立组件库。

- [组件库网站](https://zwzwd723-ops.github.io/ulab-ui/)
- [原站](https://zwzwd723-ops.github.io/ulabshop/)
- [原站仓库](https://github.com/zwzwd723-ops/ulabshop)

## 包含内容

31 个可交互组件与业务组合：按钮、图标按钮、字段、下拉、复选、开关、分段标签、配色、数量、单选卡、提示、空状态、弹窗、阶段导航，以及商城竖卡、SKU、购物袋、结算摘要、订单、待办、实验室和供应商表单。另有 15 个官网实验室 SVG 图标。

支持组件搜索、浅色/深色主题、真实独立视口的窄屏预览、HTML / CSS / SVG 复制及接入说明。

## 快速接入

复制 lib/ 到目标项目，使用商品图时也复制 assets/images/。通过 HTTP 服务打开，不建议直接双击 HTML。

~~~html
<link rel="stylesheet" href="./lib/tokens.css">
<link rel="stylesheet" href="./lib/components.css">
<link rel="stylesheet" href="./lib/patterns.css">

<div id="example" class="ui-demo">
  <button class="u-switch" role="switch" aria-checked="false">
    <span>显示网格</span>
    <span class="u-switch-track" aria-hidden="true"></span>
  </button>
</div>

<script type="module">
  import { mountULAB } from "./lib/ulab-ui.js";
  import { mountBusiness } from "./lib/business-runtime.js";

  const root = document.querySelector("#example");
  const cleanup = mountULAB(root);
  const cleanupBusiness = mountBusiness(root);

  root.addEventListener("ulab:change", event => {
    const { type, value } = event.detail;
    // 接入页面业务
  });
  // 页面卸载或替换前调用 cleanup(); cleanupBusiness();
</script>
~~~

基础交互发出 ulab:change 事件，type 包括 switch、tab、radio、quantity、toggle、step。传入 notify 回调可接入已有轻提示组件。原生输入、下拉、复选及单选保留原生事件。

复制多个示例时，请为字段、标签页和弹窗设置唯一 ID。业务样式使用 .ui-demo 作用域，请保留外层容器。基础样式按原 u-* 类名使用。

## 本地预览

安装 Node.js 后，在此目录运行：

~~~shell
node serve.cjs
~~~

打开 http://127.0.0.1:4198/ 。也可以使用任意静态 HTTP 服务。本站没有运行时 npm 依赖，不需要构建。

## 文件

| 文件 | 用途 |
| --- | --- |
| lib/tokens.css | 官网语义变量、明暗主题，原文件复制 |
| lib/components.css | 官网基础组件，原文件复制 |
| lib/patterns.css | 业务组合样式，限定于 .ui-demo |
| lib/ulab-ui.js | 基础交互、键盘支持、清理 |
| lib/business-runtime.js | 数量金额、阶段、进度与表单示例 |
| lib/primitives.js | 17 个基础示例及文档 |
| lib/business.js | 14 个业务示例及文档 |
| lib/icons.js | 官网实验室图标，原文件复制 |
| source-manifest.json | 原文件相对路径与 SHA-256 |
| index.html、docs.css、docs.js | 独立组件库文档站 |
| serve.cjs | 本地静态预览 |

## 规则与范围

- 以已确认的商城上图下文竖卡、统一 u-* 控件和原实验室 SVG 为基础。
- 成品品牌键盘按成品交付；实验室个性化包括配件、按键、线材，包装最后。
- 供应商声明兼容、ULABSHOP 验证兼容、已准入并上架必须区分；只有第三种进入消费者选配器。
- 示例不包含真实账号、订单、供应商资料或凭据；保存、购买、付款等示例不会提交到官网。
- 字体依次使用 Noto Sans SC、Microsoft YaHei、system-ui；不需要外部字体或 CDN。
- 此仓库独立发布。更新不会自动改变 ULAB 主站；需在主站明确接入和验收。
- 网站展示代码与品牌产品素材沿用原站；未额外授予素材商业使用许可。

## GitHub Pages

使用 main 分支根目录发布，.nojekyll 避免模板处理。所有本地资源均为相对路径，适配 /ulab-ui/ 子路径。无需外部接口即可打开示例。
