// ULAB UI primitives. The stylesheet is copied unchanged from the maintained ULAB site.
// Decorative SVG paths below are from assets/js/lab-icons.js; labels belong to controls.
const shapes={
  catalog:'<rect x="3.5" y="4" width="5.5" height="5.5" rx="1.25"/><rect x="3.5" y="14.5" width="5.5" height="5.5" rx="1.25"/><path d="M13 5.5h7.5M13 8h5M13 16h7.5M13 18.5h5"/>',
  explode:'<path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/>',
  xray:'<path d="M7 3H4a1 1 0 0 0-1 1v3m14-4h3a1 1 0 0 1 1 1v3M3 17v3a1 1 0 0 0 1 1h3m10 0h3a1 1 0 0 0 1-1v-3"/><path d="m12 6.5 5 2.75v5.5l-5 2.75-5-2.75v-5.5L12 6.5Zm-5 2.75 5 2.75 5-2.75M12 12v5.5"/>',
  camera:'<path d="M8 7 9.5 4.5h5L16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3Z"/><circle cx="12" cy="13.5" r="3.5"/><path d="M17.5 10h.5"/>',
  moon:'<path d="M20.5 13.1A8.75 8.75 0 0 1 10.9 3.5a8.75 8.75 0 1 0 9.6 9.6Z"/>',
  help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.75-2.5 2-2.5 3.75"/><circle cx="12" cy="16" r=".9" fill="currentColor" stroke="none"/>',
  close:'<path d="m6.5 6.5 11 11m0-11-11 11"/>',
  plus:'<path d="M5.5 12h13M12 5.5v13"/>',
  minus:'<path d="M5.5 12h13"/>'
};
const icon=name=>'<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+shapes[name]+'</svg>';
const check='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 10 4 4 8-8"/></svg>';
const row='display:flex;flex-wrap:wrap;gap:12px;align-items:center';
const stack='display:grid;gap:16px;width:100%;max-width:600px';
const source='assets/ui/components.css';
export const primitiveEntries=[
{
 id:'button',title:'按钮',category:'actions',description:'明确主次，承载购买、保存、返回与删除操作。',
 source,usage:'同一区域保留一个主操作；次要操作使用描边按钮，取消和辅助操作使用轻按钮。',
 notes:'包含主按钮、次按钮、轻按钮、危险操作、加载中和禁用状态；所有按钮保持可见键盘焦点。',
 html:'<div style="'+stack+'"><div style="'+row+'"><button type="button" class="u-button" data-action="toast" data-message="主操作反馈示例">保存配置</button><button type="button" class="u-button u-button--secondary" data-action="toast" data-message="次操作反馈示例">查看配置</button><button type="button" class="u-button u-button--quiet" data-action="toast" data-message="已取消本次示例操作">取消</button><button type="button" class="u-button u-button--danger" data-action="toast" data-message="此处仅演示删除按钮，不会删除记录">删除草稿</button></div><div style="'+row+'"><button type="button" class="u-button" aria-busy="true" disabled><span class="u-spinner" aria-hidden="true"></span>正在保存</button><button type="button" class="u-button" disabled>暂不可选</button><button type="button" class="u-button u-button--secondary u-button--sm" data-action="toast" data-message="小尺寸按钮反馈示例">小尺寸</button><button type="button" class="u-button u-button--lg" data-action="toast" data-message="大尺寸按钮反馈示例">继续配置</button></div></div>'
},
{
 id:'icon-button',title:'图标按钮',category:'actions',description:'用于关闭、查看帮助和切换工具状态。',
 source:'assets/ui/components.css · assets/js/lab-icons.js',usage:'每个纯图标按钮必须有清晰的 aria-label；可切换工具用 aria-pressed 表达选中状态。',
 notes:'44 × 44 点击区域；支持默认、按下、悬停、焦点和禁用状态。图标沿用实验室 24px 网格与 1.65px 线宽。',
 html:'<div style="'+row+'"><button type="button" class="u-icon-button" aria-label="查看帮助" data-action="toast" data-message="帮助入口交互示例">'+icon('help')+'</button><button type="button" class="u-icon-button" aria-label="拆解视图" aria-pressed="true" data-action="toggle">'+icon('explode')+'</button><button type="button" class="u-icon-button" aria-label="透视视图" aria-pressed="false" data-action="toggle">'+icon('xray')+'</button><button type="button" class="u-icon-button" aria-label="截图暂不可用" disabled>'+icon('camera')+'</button></div>'
},
{
 id:'input',title:'输入框',category:'forms',description:'标签、提示与错误说明组成完整的输入单元。',
 source,usage:'始终保留可见标签。提示用于解释填写格式，错误用于指出问题和下一步修正方法。',
 notes:'示例展示普通、错误、只读与禁用状态；aria-describedby 将输入与提示关联，错误输入使用 aria-invalid。',
 html:'<div style="'+stack+'"><label class="u-field"><span class="u-field-label">供应商名称</span><input class="u-input" name="demo-supplier" placeholder="填写公司或品牌名称" autocomplete="organization" aria-describedby="primitive-supplier-hint"><span class="u-field-hint" id="primitive-supplier-hint">用于选品沟通与资料归档。</span></label><label class="u-field"><span class="u-field-label">联系邮箱</span><input class="u-input" type="email" value="example@" aria-invalid="true" aria-describedby="primitive-email-error" autocomplete="off"><span class="u-field-hint u-field-error" id="primitive-email-error">请填写完整的邮箱地址，例如 name@example.com。</span></label><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px"><label class="u-field"><span class="u-field-label">规格编号 · 只读</span><input class="u-input" value="ULAB-PCBA-060" readonly></label><label class="u-field"><span class="u-field-label">平台 SKU · 禁用</span><input class="u-input" placeholder="审核后建立" disabled></label></div></div>'
},
{
 id:'select',title:'下拉选择',category:'forms',description:'在确定的品牌、配列或配件分类中选择一项。',
 source,usage:'选项应来自业务字典。存在未收录的情况时提供“其他”，再展示补充字段。',
 notes:'使用原生 select，支持键盘选择和移动端系统选择器。提示文案放在控件下方。',
 html:'<div style="'+stack+'"><label class="u-field"><span class="u-field-label">配件分类</span><select class="u-select" name="demo-category" aria-describedby="primitive-select-hint"><option value="pcba">PCBA</option><option value="keycaps">键帽</option><option value="switch">轴体</option><option value="case">外壳</option><option value="other">其他</option></select><span class="u-field-hint" id="primitive-select-hint">实际表单会随分类显示相应规格字段。</span></label><label class="u-field"><span class="u-field-label">暂不可选择</span><select class="u-select" disabled><option>请先选择配列</option></select></label></div>'
},
{
 id:'checkbox',title:'复选框',category:'forms',description:'确认多项条件或允许用户独立启用选项。',
 source,usage:'多个互不排斥的选项使用复选框；单选方案使用单选卡。标签和方框都可点击。',
 notes:'包含未选、已选与禁用状态；原生 checkbox 支持空格键切换。',
 html:'<div style="display:grid;gap:6px"><label class="u-check"><input type="checkbox" checked><span class="u-check-box">'+check+'</span><span>保存为默认收货地址</span></label><label class="u-check"><input type="checkbox"><span class="u-check-box">'+check+'</span><span>接收此商品的到货通知</span></label><label class="u-check"><input type="checkbox" disabled><span class="u-check-box">'+check+'</span><span>当前配置暂不支持此服务</span></label></div>'
},
{
 id:'switch',title:'开关',category:'forms',description:'即时开启或关闭夜间模式等独立设置。',
 source:'assets/ui/components.css · assets/js/lab-icons.js',usage:'开关用于切换后立即生效的设置，文案说明设置本身，不随开关状态反复改名。',
 notes:'使用 role="switch" 与 aria-checked；启用状态有颜色和滑块位置双重提示。本示例只切换控件状态。',
 html:'<div style="'+row+'"><button class="u-switch" type="button" role="switch" aria-checked="false" aria-label="夜间模式">'+icon('moon')+'<span>夜间模式</span><span class="u-switch-track" aria-hidden="true"></span></button><button class="u-switch" type="button" role="switch" aria-checked="true" aria-label="显示网格"><span>显示网格</span><span class="u-switch-track" aria-hidden="true"></span></button><button class="u-switch" type="button" role="switch" aria-checked="false" disabled><span>暂不可用</span><span class="u-switch-track" aria-hidden="true"></span></button></div>'
},
{
 id:'tabs',title:'分段标签页',category:'navigation',description:'在同一内容区域切换互斥的信息视图。',
 source,usage:'标签应简洁稳定，切换时保持控件位置不变。内容面板与 tab 通过 aria-controls 和 aria-labelledby 关联。',
 notes:'当前项具有独立表面和边框；方向键、Home、End 可切换标签，未激活面板设置 hidden。',
 html:'<div class="u-tabs" style="width:100%;max-width:600px"><div class="u-tablist" role="tablist" aria-label="订单状态示例"><button class="u-tab" type="button" id="primitive-tab-all" role="tab" aria-controls="primitive-panel-all" aria-selected="true" tabindex="0">全部</button><button class="u-tab" type="button" id="primitive-tab-active" role="tab" aria-controls="primitive-panel-active" aria-selected="false" tabindex="-1">进行中</button><button class="u-tab" type="button" id="primitive-tab-done" role="tab" aria-controls="primitive-panel-done" aria-selected="false" tabindex="-1">已完成</button></div><div class="u-tabpanel" role="tabpanel" id="primitive-panel-all" aria-labelledby="primitive-tab-all" tabindex="0">所有订单在这里汇总，按最近更新排列。</div><div class="u-tabpanel" role="tabpanel" id="primitive-panel-active" aria-labelledby="primitive-tab-active" tabindex="0" hidden>查看正在备货、制作或配送的订单。</div><div class="u-tabpanel" role="tabpanel" id="primitive-panel-done" aria-labelledby="primitive-tab-done" tabindex="0" hidden>查看已经完成的订单与售后入口。</div></div>'
},
{
 id:'swatches',title:'配色色板',category:'forms',description:'选择商品配色，同时提供可读的颜色名称。',
 source,usage:'色板不能只靠颜色传达含义。为每个选项提供名称，并在商品选配区域同步展示当前配色。',
 notes:'单选组使用 radiogroup/radio；选中圆环与 aria-checked 保持同步。方向键选择，Tab 离开色板组。',
 html:'<div style="display:grid;gap:12px"><span class="u-field-label">商品配色</span><div class="u-swatches" role="radiogroup" aria-label="商品配色"><button type="button" class="u-swatch" role="radio" aria-label="黑曜石" title="黑曜石" aria-checked="true" tabindex="0" style="--u-swatch-color:#60656c"><span aria-hidden="true"></span></button><button type="button" class="u-swatch" role="radio" aria-label="月光白" title="月光白" aria-checked="false" tabindex="-1" style="--u-swatch-color:#dedbd4"><span aria-hidden="true"></span></button><button type="button" class="u-swatch" role="radio" aria-label="绯红" title="绯红" aria-checked="false" tabindex="-1" style="--u-swatch-color:#b32848"><span aria-hidden="true"></span></button></div><p class="u-field-hint" data-swatch-label>当前配色：黑曜石</p></div>'
},
{
 id:'quantity',title:'数量选择',category:'forms',description:'在库存和购买上限内调整商品数量。',
 source:'assets/ui/components.css · assets/js/lab-icons.js',usage:'数量变化必须同步到金额。减至下限时禁用减少按钮，移除商品使用独立操作。',
 notes:'包含按钮加减和可直接编辑的数字输入；示例范围为 1–9，使用原生 min/max。',
 html:'<div style="'+stack+'"><label class="u-field-label" for="primitive-quantity">商品数量</label><div class="u-quantity" data-quantity style="width:fit-content"><button type="button" class="u-icon-button" data-quantity-minus aria-label="减少数量" disabled>'+icon('minus')+'</button><input id="primitive-quantity" type="number" min="1" max="9" step="1" value="1" inputmode="numeric" aria-label="商品数量"><button type="button" class="u-icon-button" data-quantity-plus aria-label="增加数量">'+icon('plus')+'</button></div><p class="u-field-hint">本例可选 1–9 件。</p></div>'
},
{
 id:'choice',title:'单选卡',category:'forms',description:'在包装、轴体或交付方式中选择一个完整选项。',
 source,usage:'每张卡片包含名称和必要说明，可补充是否加价。整张卡片可点击，沿用原生 radio 的选择逻辑。',
 notes:'选中通过边框和勾选标记同时表达；禁用选项提供不可选原因。每组 radio 使用独立 name。',
 html:'<fieldset style="border:0;margin:0;padding:0;'+stack+'"><legend class="u-field-label" style="margin-bottom:12px">选择包装</legend><label class="u-choice"><input type="radio" name="primitive-packaging" value="standard" checked><span class="u-choice-body"><span class="u-choice-copy"><span class="u-choice-label">标准包装</span><span class="u-choice-detail">已包含 · 日常收纳与运输保护</span></span><span class="u-choice-mark">'+check+'</span></span></label><label class="u-choice"><input type="radio" name="primitive-packaging" value="gift"><span class="u-choice-body"><span class="u-choice-copy"><span class="u-choice-label">礼盒包装</span><span class="u-choice-detail">+¥80 · 适合赠送</span></span><span class="u-choice-mark">'+check+'</span></span></label><label class="u-choice"><input type="radio" name="primitive-packaging" value="special" disabled><span class="u-choice-body"><span class="u-choice-copy"><span class="u-choice-label">限定包装</span><span class="u-choice-detail">暂时缺货</span></span><span class="u-choice-mark">'+check+'</span></span></label></fieldset>'
},
{
 id:'alert',title:'状态提示',category:'feedback',description:'在操作区域解释成功、注意事项或需要修正的问题。',
 source,usage:'说明发生了什么，以及用户可以做什么。错误提示靠近触发区域，不只用颜色表达状态。',
 notes:'提供普通、成功、提醒和错误样式。动态错误才使用 role="alert"，静态说明不应反复打断读屏。',
 html:'<div style="'+stack+'"><div class="u-alert u-alert--success">'+icon('help')+'<div><h4>规格资料已完整</h4><p>可继续检查适配信息。</p></div></div><div class="u-alert u-alert--warning">'+icon('help')+'<div><h4>兼容状态待验证</h4><p>供应商声明兼容后，仍需平台完成验证。</p></div></div><div class="u-alert u-alert--error">'+icon('help')+'<div><h4>文件格式不支持</h4><p>请改用 PNG、JPG 或 PDF 后重新选择。</p></div></div></div>'
},
{
 id:'badge',title:'状态标记',category:'feedback',description:'简短标记真实业务状态，不作为装饰标签。',
 source,usage:'只在状态有助于判断下一步操作时使用。供应商兼容声明、平台验证与上架必须分别表达。',
 notes:'默认、成功、提醒和错误颜色均来自语义令牌；文字始终保留，不能仅靠色彩区分。',
 html:'<div style="'+row+'"><span class="u-badge">供应商声明兼容</span><span class="u-badge u-badge--success">ULABSHOP 验证兼容</span><span class="u-badge u-badge--dark">已准入并上架</span><span class="u-badge u-badge--warning">需补充资料</span><span class="u-badge u-badge--danger">校验失败</span></div>'
},
{
 id:'empty',title:'空状态',category:'feedback',description:'没有记录时给出原因与明确的下一步。',
 source:'assets/ui/components.css · assets/js/lab-icons.js',usage:'空状态应占据适当高度，保留标题、简短解释和一个主要动作。不要用大面积留白代替内容。',
 notes:'此处使用现有 u-empty 与实验室目录图标；正常空状态无需 alert 角色。',
 html:'<div class="u-empty" style="width:100%;max-width:500px">'+icon('catalog')+'<h4>暂无选配草稿</h4><p>保存实验室配置后，可以从这里继续调整你的键盘。</p><button class="u-button u-button--secondary" type="button" data-action="toast" data-message="开始配置入口示例">开始配置</button></div>'
},
{
 id:'dialog',title:'确认弹窗',category:'feedback',description:'在需要明确确认的操作前，展示影响与操作按钮。',
 source:'assets/ui/components.css · assets/js/lab-icons.js',usage:'使用原生 dialog 管理焦点与遮罩。打开时进入弹窗，关闭或按 Esc 后将焦点返回触发按钮。',
 notes:'弹窗有独立标题与说明关联。示例仅展示交互，不删除任何真实配置。',
 html:'<div><button class="u-button u-button--secondary" type="button" data-action="dialog-open" data-dialog="primitive-confirm-dialog">查看确认弹窗</button><dialog class="u-dialog" id="primitive-confirm-dialog" aria-labelledby="primitive-dialog-title" aria-describedby="primitive-dialog-description"><header><h3 id="primitive-dialog-title">移除此份草稿？</h3><button type="button" class="u-icon-button" aria-label="关闭弹窗" data-action="dialog-close">'+icon('close')+'</button></header><p id="primitive-dialog-description">你可以先返回检查配置。这里演示确认流程，不会删除实际数据。</p><footer><button class="u-button u-button--secondary" type="button" data-action="dialog-close" autofocus>保留草稿</button><button class="u-button u-button--danger" type="button" data-action="dialog-close">确认移除</button></footer></dialog></div>'
},
{
 id:'toast',title:'轻提示',category:'feedback',description:'为完成的轻量操作提供短暂、不中断的反馈。',
 source,usage:'用于复制、保存等结果通知。重要错误应留在页面中，不能只显示一个自动消失的提示。',
 notes:'示例点击后使用组件库统一 u-live-notice。宿主提供 role="status" 与 aria-live="polite"，重复提示也应正确更新。',
 html:'<div style="'+row+'"><button class="u-button" type="button" data-action="toast" data-message="配置已保存（组件交互示例）">显示保存反馈</button><button class="u-button u-button--secondary" type="button" data-action="toast" data-message="已复制（组件交互示例）">显示复制反馈</button></div>'
},
{
 id:'stepper',title:'阶段导航',category:'navigation',description:'在较长配置流程中呈现当前位置与完成顺序。',
 source,usage:'遵循实验室的真实顺序：配列方案、声学结构、个性化、包装。包装始终是最后一步。',
 notes:'当前阶段使用 aria-current="step"，已完成使用 is-complete；可点击阶段由业务规则决定。',
 html:'<nav class="u-stepper" data-stepper aria-label="配置阶段" style="width:100%"><button class="u-step is-complete" type="button" data-step="0"><span class="u-step-number">01</span>配列方案</button><button class="u-step" type="button" data-step="1" aria-current="step"><span class="u-step-number">02</span>声学结构</button><button class="u-step" type="button" data-step="2"><span class="u-step-number">03</span>个性化</button><button class="u-step" type="button" data-step="3"><span class="u-step-number">04</span>包装</button></nav>'
},
{
 id:'tool-rail',title:'工具栏',category:'actions',description:'把同一视图中的相关工具集中排列。',
 source:'assets/ui/components.css · assets/js/lab-icons.js',usage:'每个工具有稳定图标、可读名称和明确的选中状态；图标悬停与键盘聚焦都显示说明。',
 notes:'这里展示工具选中与提示，未加载 3D 模型；实际实验室由查看器处理拆解、透视与截图。',
 html:'<div class="u-tool-rail" role="group" aria-label="实验室视图工具"><button class="u-icon-button" type="button" aria-label="配置目录" aria-pressed="true" data-action="toggle">'+icon('catalog')+'</button><button class="u-icon-button" type="button" aria-label="拆解视图" aria-pressed="false" data-action="toggle">'+icon('explode')+'</button><button class="u-icon-button" type="button" aria-label="透视视图" aria-pressed="false" data-action="toggle">'+icon('xray')+'</button><button class="u-icon-button" type="button" aria-label="截图" data-action="toast" data-message="截图按钮交互示例，不会访问你的屏幕">'+icon('camera')+'</button></div>'
}
];
export const primitiveSources=['assets/ui/tokens.css','assets/ui/components.css','assets/js/lab-icons.js'];
