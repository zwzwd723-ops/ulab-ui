import { primitiveEntries } from './lib/primitives.js';
import { businessEntries } from './lib/business.js';
import { mountULAB } from './lib/ulab-ui.js';
import { mountBusiness } from './lib/business-runtime.js';
import { labIcon } from './lib/icons.js';

export const entries = [...primitiveEntries, ...businessEntries];
const categories = { actions:'操作控件', forms:'表单与选择', feedback:'状态与反馈', navigation:'导航与流程', commerce:'商城与交易', account:'账户与记录', lab:'实验室', supplier:'供应商合作' };
const sourceRepository = 'https://github.com/zwzwd723-ops/ulabshop';
const repo = 'https://github.com/zwzwd723-ops/ulab-ui';
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const main = document.querySelector('#main'), sidebar = document.querySelector('#sidebar'), search = document.querySelector('#search');
let dispose = () => {}, disposeBusiness = () => {}, noticeTimer, previewMode = 'preview', previewWidth = 'desktop';
const footer = () => '<footer class="page-footer"><span>ULAB UI · 基于 ULAB 网站实际组件整理</span><a href="'+sourceRepository+'" target="_blank" rel="noopener">查看主站仓库 ↗</a></footer>';
const header = (title, description, crumb='组件库') => '<header class="page-header"><div class="crumb">'+esc(crumb)+'</div><h1>'+esc(title)+'</h1><p>'+esc(description)+'</p></header>';
const codeBlock = (code,label='HTML') => '<div class="code-surface"><div class="code-head"><span>'+label+'</span><button class="copy-button" data-copy-code>复制代码</button></div><pre><code>'+esc(code)+'</code></pre></div>';
const renderedHTML = entry => '<div class="ui-demo">\n'+entry.html+'\n</div>';
const formatHTML = html => html.replace(/>\s*</g,'>\n<');
function notify(message) { clearTimeout(noticeTimer); const el=document.querySelector('#notice'); el.textContent=message; noticeTimer=setTimeout(()=>{el.textContent=''},3200); }
async function copy(text) {
  try { await navigator.clipboard.writeText(text); notify('已复制，可粘贴到你的项目'); }
  catch {
    const box=document.createElement('textarea');box.value=text;box.setAttribute('aria-label','待复制代码');box.style.cssText='position:fixed;left:8px;bottom:8px;width:1px;height:1px;opacity:0';
    document.body.append(box);box.select();let success=false;try{success=document.execCommand('copy')}catch{}box.remove();notify(success?'已复制代码':'浏览器未允许复制，请在代码面板中选择并复制');
  }
}
function setMenu(open) {
  sidebar.classList.toggle('is-open',open);document.querySelector('.sidebar-backdrop').hidden=!open;
  document.querySelector('#menu-toggle').setAttribute('aria-expanded',String(open));
  if(open) sidebar.querySelector('a')?.focus();
}
function renderSidebar(route) {
  const link=(title,target)=>'<a class="nav-item" href="#/'+target+'"'+(route===target?' aria-current="page"':'')+'>'+title+'</a>';
  sidebar.innerHTML='<nav>'+link('概览','')+link('基础规范','foundations')+link('工具图标','icons')+link('接入指南','guide')+'<div class="nav-divider"></div>'+
    Object.entries(categories).map(([key,name])=>'<div class="nav-group"><h2>'+name+'</h2>'+entries.filter(e=>e.category===key).map(e=>link(e.title,'components/'+e.id)).join('')+'</div>').join('')+
    '</nav><div class="sidebar-foot">v1.0 · 2026.10.24<a href="'+repo+'" target="_blank" rel="noopener">源码与版本记录 ↗</a></div>';
}
function overview() {
  const groups=[
    ['操作与表单','按钮、字段、开关与规格选择。','button','catalog'],
    ['商城与交易','商品卡、SKU、购物袋与金额汇总。',entries.find(e=>e.category==='commerce')?.id,'lighting'],
    ['账户与记录','订单、待办与有行动入口的空状态。',entries.find(e=>e.category==='account')?.id,'panel'],
    ['实验室控件','工具栏、阶段选配与加载状态。',entries.find(e=>e.category==='lab')?.id,'compass'],
    ['供应商合作','品类字段和兼容审核状态。',entries.find(e=>e.category==='supplier')?.id,'explode'],
    ['导航与反馈','分段导航、确认弹窗和操作反馈。','tabs','help']
  ];
  return '<div class="page"><section class="hero"><div><div class="hero-kicker">ULAB 网站组件库</div><h1>熟悉的界面。<br>一致的体验。</h1><p>将商城、定制实验室与合作表单中的组件集中在这里。查看状态、试用交互，再把代码带回产品。</p><div class="hero-actions"><a class="u-button" href="#/components/button">浏览组件 '+labIcon('arrowUpRight',16)+'</a><a class="u-button u-button--secondary" href="#/guide">开始使用</a></div></div><div class="hero-board"><div class="hero-board-top"><span>来自 ULAB 商城</span><span>可交互预览</span></div><div class="hero-preview ui-demo"><div class="hero-product"><img src="assets/images/468_83.png" width="240" height="180" alt="UQ71 磁轴键盘"><div><h2>UQ71</h2><p>黑曜石 · 磁轴 · 71%</p><div class="hero-price">¥1,499</div></div></div><div class="hero-options"><div class="u-swatches" role="radiogroup" aria-label="预览商品配色"><button class="u-swatch" role="radio" aria-checked="true" aria-label="黑曜石" style="--u-swatch-color:#60656c"><span></span></button><button class="u-swatch" role="radio" aria-checked="false" aria-label="月光白" tabindex="-1" style="--u-swatch-color:#dedbd4"><span></span></button><button class="u-swatch" role="radio" aria-checked="false" aria-label="绯红" tabindex="-1" style="--u-swatch-color:#b32848"><span></span></button></div><button class="u-button" data-action="toast" data-message="这是组件交互预览，不会加入实际购物袋">加入购物袋</button></div></div><div class="hero-footnote">原站样式 · 独立预览 · 可复制使用</div></div></section>'+
    '<section class="page-section"><div class="section-heading"><h2>从使用场景开始</h2><p>'+entries.length+' 个组件与组合示例</p></div><div class="collection-grid">'+groups.map(([title,desc,id,icon])=>'<a class="collection-card" href="#/components/'+id+'">'+labIcon(icon,25)+'<div><div class="collection-card-title"><h3>'+title+'</h3><span>↗</span></div><p>'+desc+'</p></div></a>').join('')+'</div></section><div class="library-note"><div><h3>和网站保持同一套语言</h3><p>基础样式直接取自 ULAB 现有组件；业务组合保留原页面结构与交互规则，并标明来源。</p></div><div><h3>组件可以直接试用</h3><p>切换选项、调整数量、打开弹窗。示例使用独立数据，不会修改官网的账号或订单。</p></div></div>'+footer()+'</div>';
}
function component(entry) {
  const index=entries.indexOf(entry), previous=entries[index-1],next=entries[index+1];
  return '<article class="page">'+header(entry.title,entry.description,categories[entry.category])+
    '<section class="preview-shell" aria-label="组件示例"><div class="preview-toolbar"><div class="preview-modes" aria-label="展示内容"><button class="small-control" data-preview="preview" aria-pressed="true">预览</button><button class="small-control" data-preview="code" aria-pressed="false">代码</button></div><div class="viewport-modes" aria-label="预览宽度"><button class="small-control" data-width="desktop" aria-pressed="true">自适应</button><button class="small-control" data-width="mobile" aria-pressed="false">窄屏</button><button class="copy-button" data-copy-entry>复制组件</button></div></div><div id="component-preview"><div class="preview-stage"><iframe class="preview-canvas" id="entry-frame" title="'+esc(entry.title)+'交互预览" data-width="desktop"></iframe></div><div class="preview-caption"><span>可操作示例</span><span>跟随右上角切换明暗主题</span></div></div><div id="component-code" hidden>'+codeBlock(formatHTML(renderedHTML(entry)))+(entry.css?codeBlock(entry.css,'CSS · 已收录在 patterns.css'):'')+'</div></section>'+
    '<div class="detail-grid"><section><h2>什么时候使用</h2><p>'+esc(entry.usage)+'</p></section><section><h2>状态与交互</h2><p>'+esc(Array.isArray(entry.notes)?entry.notes.join('；'):entry.notes||'保持键盘焦点可见，禁用状态不可操作。')+'</p></section></div>'+
    '<div class="source-row">原网站组件来源<code>'+esc(Array.isArray(entry.source)?entry.source.join(' · '):entry.source)+'</code></div><div class="entry-footer">'+(previous?'<a href="#/components/'+previous.id+'">← '+previous.title+'</a>':'<span></span>')+(next?'<a href="#/components/'+next.id+'">'+next.title+' →</a>':'')+'</div>'+footer()+'</article>';
}
function loadPreview(entry) {
 const frame=main.querySelector('#entry-frame');if(!frame)return;
 const theme=document.documentElement.dataset.theme||'light';
 const minHeight=entry.id==='dialog'?390:200;
 frame.srcdoc='<!doctype html><html lang="zh-CN" data-theme="'+theme+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base href="'+esc(new URL('.',location.href).href)+'"><link rel="stylesheet" href="lib/tokens.css"><link rel="stylesheet" href="lib/components.css"><link rel="stylesheet" href="lib/patterns.css"><style>html,body{margin:0;background:var(--u-surface);color:var(--u-ink);font:14px/1.65 var(--u-font)}*{box-sizing:border-box}body{padding:24px}.ui-demo{width:100%;min-width:0}.ui-demo img{max-width:100%}.ui-demo .u-button svg{width:18px;height:18px}.ui-demo svg{vertical-align:middle}.ui-demo .u-tool-rail{padding-top:16px}.ui-demo .u-dialog{position:fixed}[hidden]{display:none!important}@media(max-width:450px){body{padding:16px}}@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}</style></head><body><div class="ui-demo" id="demo-root">'+entry.html+'</div><script type="module">import {mountULAB} from "./lib/ulab-ui.js";import {mountBusiness} from "./lib/business-runtime.js";const root=document.querySelector("#demo-root");const send=data=>parent.postMessage(data,"*");const notify=message=>send({type:"ulab-ui:notice",message});mountULAB(root,{notify});mountBusiness(root,{notify});const resize=()=>send({type:"ulab-ui:height",height:Math.max('+minHeight+',Math.ceil(root.getBoundingClientRect().height+parseFloat(getComputedStyle(document.body).paddingTop)*2))});new ResizeObserver(resize).observe(root);window.addEventListener("load",resize);document.fonts.ready.then(resize);resize();</script></body></html>';
 frame.style.height=minHeight+'px';
}
function foundations() {
  const colors=[['画布','--u-bg'],['表面','--u-surface'],['弱背景','--u-surface-soft'],['正文','--u-ink'],['次要文本','--u-muted'],['边框','--u-line'],['主操作','--u-action'],['焦点','--u-focus'],['成功','--u-success'],['提醒','--u-warning'],['错误','--u-danger'],['启用开关','--u-switch-on']];
  const style=getComputedStyle(document.documentElement);
  return '<div class="page">'+header('基础规范','颜色、尺寸和节奏沿用官网。语义变量支持明暗两套主题，业务组件无需单独改色。')+
    '<section class="page-section"><div class="section-heading"><h2>语义颜色</h2><p>点击颜色复制变量</p></div><div class="token-grid">'+colors.map(([name,key])=>'<div class="token-cell"><button class="token-swatch" style="display:block;width:100%;background:var('+key+')" data-copy-token="'+key+'" aria-label="复制'+name+'变量"></button><strong>'+name+'</strong><code>'+key+' · '+esc(style.getPropertyValue(key).trim())+'</code></div>').join('')+'</div></section>'+
    '<section class="page-section"><div class="section-heading"><h2>字体与层级</h2></div><p style="color:var(--u-muted);font-size:13px">Noto Sans SC → Microsoft YaHei → system-ui。界面文字优先清晰，数字使用等宽数字特性。</p>'+
    [[32,'页面标题','搭建你的下一把键盘'],[24,'分区标题','选择你的 UQ71'],[18,'卡片标题','UQ71 磁轴键盘'],[14,'正文','配色、材质与触感'],[12,'辅助说明','所选配置会保存在当前浏览器']].map(([size,name,text])=>'<div class="scale-row"><code>'+name+' / '+size+'</code><p style="font-size:'+size+'px">'+text+'</p></div>').join('')+'</section>'+
    '<section class="page-section"><div class="section-heading"><h2>间距</h2><p>4 px 基础步长</p></div><div class="spacing-grid">'+[4,8,12,16,24,32,48].map((n,i)=>'<div><i style="height:'+n+'px"></i><span>'+n+' px</span><code>space-'+(i+1)+'</code></div>').join('')+'</div></section>'+
    '<div class="detail-grid"><section><h2>圆角与尺寸</h2><p>字段 8 px、卡片 12 px、弹窗 18 px；按钮为胶囊形。控件高度 36 / 44 / 52 px，图标点击区域 44 px。</p></section><section><h2>动态反馈</h2><p>基础过渡为 180 ms，使用 cubic-bezier(.2,.7,.2,1)。系统启用“减少动态效果”时关闭非必要动画。</p></section></div>'+codeBlock('<link rel="stylesheet" href="./lib/tokens.css">\\n<link rel="stylesheet" href="./lib/components.css">\\n\\n<!-- 仅需在根元素切换主题 -->\\n<html lang="zh-CN" data-theme="dark">'.replaceAll('\\n','\n'))+footer()+'</div>';
}
const iconNames=['catalog','explode','xray','motion','camera','lighting','moon','compass','panel','help','close','chevronDown','arrowUpRight','plus','minus'];
const iconLabels=['目录','拆解','透视','按键动作','相机','灯光','夜间','罗盘','面板','帮助','关闭','向下','跳转','增加','减少'];
function icons() {
  return '<div class="page">'+header('工具图标','沿用实验室的 24 px 网格、1.65 px 线宽与圆角端点。点击图标即可复制 SVG。')+
    '<div class="icon-grid">'+iconNames.map((name,i)=>'<button class="icon-tile" data-copy-icon="'+name+'" aria-label="复制'+iconLabels[i]+'图标">'+labIcon(name,28)+'<span>'+iconLabels[i]+' · '+name+'</span></button>').join('')+'</div>'+
    '<div class="detail-grid"><section><h2>点击区域与图形分开</h2><p>常规图形 22 px，放在 44 px 图标按钮中；不要通过加粗线条补偿点击区域。</p></section><section><h2>文字名称不能省</h2><p>SVG 本身仅作装饰，按钮用 aria-label 提供名称。可切换工具使用 aria-pressed 描述状态。</p></section></div>'+
    codeBlock('<button class="u-icon-button" aria-label="拆解视图" aria-pressed="false" data-action="toggle">\n  '+labIcon('explode',22)+'\n</button>')+footer()+'</div>';
}
function guide() {
  const install='<link rel="stylesheet" href="./lib/tokens.css">\n<link rel="stylesheet" href="./lib/components.css">\n<link rel="stylesheet" href="./lib/patterns.css">\n\n<div id="example" class="ui-demo">\n  <button class="u-switch" role="switch" aria-checked="false">\n    <span>显示网格</span><span class="u-switch-track" aria-hidden="true"></span>\n  </button>\n</div>\n\n<script type="module">\n  import { mountULAB } from "./lib/ulab-ui.js";\n  import { mountBusiness } from "./lib/business-runtime.js";\n  const root = document.querySelector("#example");\n  const dispose = mountULAB(root);\n  const disposeBusiness = mountBusiness(root);\n  // 页面卸载或替换内容前：dispose(); disposeBusiness();\n</script>';
  return '<div class="page guide">'+header('开始使用','普通 HTML、CSS 和 JavaScript 即可接入。基础组件不依赖框架，不需要引入整个 ULAB 网站。')+
    '<h2>获取文件</h2><p>从 GitHub 下载仓库，把 <code>lib/</code> 复制到你的项目。使用商品图片的示例还需要 <code>assets/images/</code>。</p><a class="u-button u-button--secondary" href="'+repo+'/archive/refs/heads/main.zip">下载组件库源码 '+labIcon('arrowUpRight',16)+'</a>'+
    '<h2>加载样式与交互</h2><p>从左侧选择组件，复制示例代码。业务样式以 <code>.ui-demo</code> 为作用域，请保留这层容器；重复使用时要为标签页、弹窗和字段生成唯一 ID。</p>'+codeBlock(install)+
    '<h2>订阅组件状态</h2><p>基础交互通过 <code>ulab:change</code> 向外通知变化。真实保存、购买、校验与后台接口由业务页面接入。</p>'+codeBlock('root.addEventListener("ulab:change", (event) => {\n  const { type, value } = event.detail;\n  // type: switch / tab / radio / quantity / toggle / step\n  console.log(type, value);\n});\n\n// 替换示例轻提示，接入你的通知组件\nconst cleanup = mountULAB(root, { notify: message => showNotice(message) });','JavaScript')+
    '<h2>文件对应关系</h2><table class="guide-table"><thead><tr><th>文件</th><th>用途</th></tr></thead><tbody><tr><td>lib/tokens.css</td><td>官网语义变量与明暗主题</td></tr><tr><td>lib/components.css</td><td>官网基础组件原样式</td></tr><tr><td>lib/patterns.css</td><td>从业务页面抽取的组合样式</td></tr><tr><td>lib/ulab-ui.js</td><td>基础交互、键盘操作与清理函数</td></tr><tr><td>lib/business-runtime.js</td><td>金额、阶段、进度与表单示例交互</td></tr><tr><td>lib/primitives.js / business.js</td><td>示例代码、用途及状态说明</td></tr><tr><td>lib/icons.js</td><td>原实验室 SVG 图标函数</td></tr><tr><td>source-manifest.json</td><td>来源版本与文件校验信息</td></tr></tbody></table>'+
    '<h2>使用边界</h2><ul><li>这是组件展示与复用仓库。购买、登录、付款、供应商收件等操作均为示例，不会调用官网业务数据。</li><li>品牌键盘按成品交付；个性化阶段包含配件、按键和线材，包装保持最后。</li><li>供应商声明兼容、平台验证兼容与准入上架分开表达，只有准入上架才能进入消费者选配器。</li><li>本库独立发布，修改后不会自动改动 ULAB 主站。更新基础样式时，先核对来源清单并验收引用页面。</li></ul>'+footer()+'</div>';
}
function searchView(value) {
  const term=value.trim().toLowerCase(),results=entries.filter(e=>[e.title,e.id,e.description,e.usage,categories[e.category]].join(' ').toLowerCase().includes(term));
  return '<div class="page">'+header('搜索组件','“'+value+'” · '+results.length+' 个结果')+'<div class="search-results">'+(results.length?results.map(e=>'<a class="search-result" href="#/components/'+e.id+'"><small>'+categories[e.category]+'</small><h2>'+esc(e.title)+'</h2><p>'+esc(e.description)+'</p></a>').join(''):'<div class="u-empty"><h4>没有找到匹配组件</h4><p>试试“按钮”“购物袋”“订单”或“实验室”。</p><button class="u-button u-button--secondary" data-clear-search>清空搜索</button></div>')+'</div>'+footer()+'</div>';
}
function render() {
  dispose();disposeBusiness();previewMode='preview';previewWidth='desktop';
  const route=location.hash.replace(/^#\/?/,'').replace(/\/$/,'');
  renderSidebar(route);
  const entry=route.startsWith('components/')?entries.find(e=>e.id===route.slice(11)):null;
  if(search.value.trim()){main.innerHTML=searchView(search.value);document.title='搜索组件 · ULAB UI';}
  else if(entry){main.innerHTML=component(entry);document.title=entry.title+' · ULAB UI';}
  else if(route==='foundations'){main.innerHTML=foundations();document.title='基础规范 · ULAB UI';}
  else if(route==='icons'){main.innerHTML=icons();document.title='工具图标 · ULAB UI';}
  else if(route==='guide'){main.innerHTML=guide();document.title='接入指南 · ULAB UI';}
  else if(!route){main.innerHTML=overview();document.title='ULAB UI · 网站组件库';}
  else {main.innerHTML='<div class="page">'+header('未找到这个组件','可以从左侧目录选择组件，或搜索你需要的场景。')+'<a class="u-button" href="#/">返回概览</a></div>';document.title='未找到组件 · ULAB UI';}
  dispose=mountULAB(main,{notify});disposeBusiness=mountBusiness(main,{notify});
  if(entry&&!search.value.trim())loadPreview(entry);
  main.querySelectorAll('img').forEach(img=>{img.decoding='async'});
}
document.querySelector('#theme').addEventListener('click',()=>{
 const dark=document.documentElement.dataset.theme!=='dark';document.documentElement.dataset.theme=dark?'dark':'light';document.querySelector('#theme').setAttribute('aria-pressed',String(dark));document.querySelector('#theme').setAttribute('aria-label',dark?'切换浅色模式':'切换深色模式');const frame=main.querySelector('#entry-frame');if(frame?.contentDocument)frame.contentDocument.documentElement.dataset.theme=dark?'dark':'light';try{localStorage.setItem('ulab-ui-theme',dark?'dark':'light')}catch{}if(location.hash.includes('foundations'))render();
});
try { const theme=localStorage.getItem('ulab-ui-theme');if(theme==='dark'){document.documentElement.dataset.theme=theme;document.querySelector('#theme').setAttribute('aria-pressed','true');document.querySelector('#theme').setAttribute('aria-label','切换浅色模式')} }catch{}
document.querySelector('#menu-toggle').addEventListener('click',()=>setMenu(!sidebar.classList.contains('is-open')));
document.querySelector('.sidebar-backdrop').addEventListener('click',()=>setMenu(false));
search.addEventListener('input',render);
document.addEventListener('keydown',event=>{
 if(event.key==='/'&&!event.target.closest('input,textarea,select,[contenteditable]')){event.preventDefault();search.focus()}
 if(event.key==='Escape'){if(sidebar.classList.contains('is-open')){setMenu(false);document.querySelector('#menu-toggle').focus()}else if(document.activeElement===search){search.value='';render();search.blur()}}
 if(event.key==='Tab'&&sidebar.classList.contains('is-open')){
  const focusable=[...sidebar.querySelectorAll('a')],first=focusable[0],last=focusable.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
 }
});
document.addEventListener('click',event=>{
 const target=event.target.closest('button,a');if(!target)return;
 if(target.matches('.skip-link')){event.preventDefault();main.focus({preventScroll:true});return;}
 if(target.matches('a[href^="#/"]')){search.value='';setMenu(false);if(target.hash===location.hash)render()}
 if(target.hasAttribute('data-clear-search')){search.value='';render();search.focus()}
 if(target.hasAttribute('data-copy-token'))copy('var('+target.dataset.copyToken+')');
 if(target.hasAttribute('data-copy-icon'))copy(labIcon(target.dataset.copyIcon,22));
 if(target.hasAttribute('data-copy-code'))copy(target.closest('.code-surface').querySelector('code').textContent);
 if(target.hasAttribute('data-copy-entry')){const route=location.hash.replace(/^#\/?/,'').replace(/\/$/,'');const entry=entries.find(e=>route==='components/'+e.id);if(entry)copy(formatHTML(renderedHTML(entry)))}
 if(target.hasAttribute('data-preview')){
  previewMode=target.dataset.preview;document.querySelectorAll('[data-preview]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.preview===previewMode)));
  document.querySelector('#component-preview').hidden=previewMode!=='preview';document.querySelector('#component-code').hidden=previewMode!=='code';
 }
 if(target.matches('button[data-width]')){previewWidth=target.dataset.width;document.querySelectorAll('button[data-width]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.width===previewWidth)));document.querySelector('.preview-canvas').dataset.width=previewWidth}
});
window.addEventListener('hashchange',()=>{search.value='';render();window.scrollTo({top:0,behavior:'instant'});main.focus({preventScroll:true})});
window.addEventListener('message',event=>{const frame=main.querySelector('#entry-frame');if(!frame||event.source!==frame.contentWindow)return;const data=event.data;if(data?.type==='ulab-ui:height'&&Number.isFinite(data.height))frame.style.height=Math.min(2200,Math.max(200,data.height))+'px';if(data?.type==='ulab-ui:notice'&&typeof data.message==='string')notify(data.message)});
render();
