# 可编辑层（Editable Layer）

让生成出来的简历，打开就能在浏览器里直接改文字，不用碰代码。改完导出 PDF 或下载一份带改动的独立 HTML。

## 用户怎么用

打开简历，左下角有一条工具栏：

- **编辑**：点一下进入编辑模式，每一块文字都能直接点进去改（姓名、定位句、每条经历、技能、数字）。再点一下「完成」退出。
- **导出 PDF**：走浏览器原生打印（Cmd / Ctrl + P 也行），导出的 PDF 是干净的真文字，工具栏不会进去。
- **下载 HTML**：把当前改好的简历存成一个独立的 .html 文件，发给别人或留底，打开还能接着改。
- **复位**：清掉自己的所有改动，回到出厂内容。

改动会自动存在浏览器本地（localStorage），刷新不丢。

## 几条关键铁律

- **导出 PDF 只走浏览器原生打印**，绝不用 html2pdf.js / html2canvas / jsPDF 这类把页面拍成图的库。截图方案的文字不可选、高分屏发虚、ATS 读出来是空的，对简历是致命伤。原生打印输出的是矢量真文字，ATS 正常解析。
- **所有编辑痕迹都包在 `@media screen` 里**，工具栏、字段虚线框、选中高亮，`@media print` 一律隐藏。导出的 PDF 永远干净。
- **字段级可编辑，不是整页可编辑**。只有有文字的叶子块单独开成可编辑，外层结构锁死。这样用户跨字段全选删除也删不掉简历结构。
- **粘贴只保留纯文本**。从 Word 或网页粘过来的脏格式会被拦掉，保证还是结构化真文字。
- **导出独立 HTML 前剥掉编辑属性**（contenteditable、字段标记、工具栏），别人打开是干净简历，但仍带可编辑层，能接着改。

## 怎么给新做的简历加上

把下面这一整段贴在简历 HTML 的 `</body>` 之前就行，零依赖、不用配置。它会自动找页面里的 `.page`（简历）或 `.slide`（幻灯片）容器，把里面的文字块开成可编辑。

```html
<!-- ===== HeiGe 可编辑层 (drop-in, 单文件零依赖) ===== -->
<script>
(function(){
  if (window.__heEditable) return; window.__heEditable = true;
  var slides = [].slice.call(document.querySelectorAll('.slide'));
  var isDeck = slides.length > 0;
  var roots = isDeck ? slides : [].slice.call(document.querySelectorAll('.page'));
  if (!roots.length) return;
  var KEY = 'heige-edit::' + location.pathname;
  var editing = false, saveTimer = null;

  var css = document.createElement('style'); css.className = 'he-style';
  css.textContent =
    '.he-toolbar{position:fixed;left:16px;bottom:16px;z-index:99999;display:flex;gap:6px;align-items:center;'+
    'font-family:"Space Mono",ui-monospace,monospace;font-size:12px}'+
    '.he-toolbar button{font:inherit;cursor:pointer;border:1px solid #2a2a31;background:#111114;color:#f3f1ec;'+
    'padding:7px 11px;border-radius:4px;letter-spacing:.02em;line-height:1;transition:background .15s}'+
    '.he-toolbar button:hover{background:#26262e}'+
    '.he-toolbar button.he-on{background:#ff4d12;color:#150700;border-color:#ff4d12;font-weight:700}'+
    '.he-toolbar .he-status{color:#9a9aa2;font-size:11px;margin-left:4px;min-width:54px}'+
    '.he-editing [data-he-field]{outline:1px dashed rgba(255,77,18,.55);outline-offset:2px;border-radius:2px}'+
    '.he-editing [data-he-field]:hover{background:rgba(255,77,18,.07)}'+
    '.he-editing [data-he-field]:focus{outline:2px solid #ff4d12;background:rgba(255,77,18,.05)}'+
    '@media print{.he-toolbar{display:none!important}[data-he-field]{outline:none!important;background:none!important}}';
  document.head.appendChild(css);

  var SEL = 'h1,h2,h3,h4,h5,h6,p,li,td,th,div,span,a,blockquote,figcaption,cite';
  function hasDirectText(el){
    for (var i=0;i<el.childNodes.length;i++){ var n=el.childNodes[i];
      if (n.nodeType===3 && n.textContent.replace(/\s/g,'')!=='') return true; }
    return false;
  }
  function markFields(){
    roots.forEach(function(root){
      [].slice.call(root.querySelectorAll(SEL)).forEach(function(el){
        if (el.hasAttribute('data-he-field')) return;
        if (!hasDirectText(el)) return;
        if (el.closest('[data-he-field]')) return;
        el.setAttribute('data-he-field','');
      });
    });
  }

  function save(){
    try { localStorage.setItem(KEY, JSON.stringify(roots.map(function(r){return r.innerHTML;}))); } catch(e){}
    status('已保存');
  }
  function restore(){
    try {
      var data = JSON.parse(localStorage.getItem(KEY));
      if (data && data.length === roots.length){ data.forEach(function(h,i){ roots[i].innerHTML = h; }); return true; }
    } catch(e){}
    return false;
  }
  function status(t){ var s=document.querySelector('.he-status'); if(s){ s.textContent=t; clearTimeout(s.__t); s.__t=setTimeout(function(){s.textContent='';},1600);} }

  function setEdit(on){
    editing = on;
    document.body.classList.toggle('he-editing', on);
    [].slice.call(document.querySelectorAll('[data-he-field]')).forEach(function(f){
      if (on){ f.setAttribute('contenteditable','true'); f.setAttribute('spellcheck','false'); }
      else { f.removeAttribute('contenteditable'); }
    });
    var b=document.querySelector('[data-act=edit]');
    if(b){ b.textContent = on ? '完成' : '编辑'; b.classList.toggle('he-on', on); }
    if(!on){ if(document.activeElement && document.activeElement.blur) document.activeElement.blur(); }
  }

  function exportPDF(){ setEdit(false); setTimeout(function(){ window.print(); }, 60); }

  function downloadHTML(){
    setEdit(false);
    var clone = document.documentElement.cloneNode(true);
    [].slice.call(clone.querySelectorAll('.he-toolbar,.he-style')).forEach(function(n){ n.remove(); });
    [].slice.call(clone.querySelectorAll('[data-he-field]')).forEach(function(n){
      n.removeAttribute('data-he-field'); n.removeAttribute('contenteditable'); n.removeAttribute('spellcheck');
    });
    var cb = clone.querySelector('body'); if(cb) cb.classList.remove('he-editing');
    var html = '<!doctype html>\n' + clone.outerHTML;
    var blob = new Blob([html], {type:'text/html;charset=utf-8'});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = ((document.title||'heige').replace(/[^\w一-龥\-]+/g,'_').replace(/^_+|_+$/g,'')||'heige') + '.html';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){ URL.revokeObjectURL(a.href); }, 1500);
    status('已下载');
  }

  function reset(){
    if (!confirm('复位会清掉你在这份上做的所有修改，确定吗？')) return;
    try { localStorage.removeItem(KEY); } catch(e){}
    location.reload();
  }

  function buildToolbar(){
    var bar = document.createElement('div'); bar.className='he-toolbar';
    bar.innerHTML =
      '<button data-act="edit">编辑</button>'+
      '<button data-act="pdf">导出 PDF</button>'+
      '<button data-act="html">下载 HTML</button>'+
      '<button data-act="reset">复位</button>'+
      '<span class="he-status"></span>';
    document.body.appendChild(bar);
    bar.addEventListener('click', function(e){
      e.stopPropagation();
      var b = e.target.closest('button'); if(!b) return;
      var act = b.getAttribute('data-act');
      if (act==='edit') setEdit(!editing);
      else if (act==='pdf') exportPDF();
      else if (act==='html') downloadHTML();
      else if (act==='reset') reset();
    });
  }

  function insertText(t){
    if (document.execCommand) { document.execCommand('insertText', false, t); return; }
    var sel = window.getSelection(); if(!sel.rangeCount) return;
    var r = sel.getRangeAt(0); r.deleteContents(); r.insertNode(document.createTextNode(t)); r.collapse(false);
  }
  document.addEventListener('paste', function(e){
    var ae = document.activeElement; if(!(ae && ae.isContentEditable)) return;
    e.preventDefault();
    var t = (e.clipboardData || window.clipboardData).getData('text/plain');
    insertText(t.replace(/\r/g,''));
  }, true);
  document.addEventListener('keydown', function(e){
    var ae = document.activeElement;
    if (!(ae && ae.isContentEditable)) return;
    if (e.key && (e.key.indexOf('Arrow')===0 || e.key.indexOf('Page')===0 || e.key==='Home' || e.key==='End' || e.key===' ' || e.key==='Spacebar'))
      e.stopPropagation();
    if (e.key==='Enter'){ e.preventDefault(); if(document.execCommand) document.execCommand('insertLineBreak'); }
    if (e.key==='Backspace' && ae.textContent.replace(/​/g,'').trim()==='') e.preventDefault();
  }, true);
  document.addEventListener('click', function(e){
    if (editing && e.target.closest && e.target.closest('[data-he-field]')) e.stopPropagation();
  }, true);

  restore();
  markFields();
  buildToolbar();
  roots.forEach(function(r){
    r.addEventListener('input', function(){ clearTimeout(saveTimer); saveTimer=setTimeout(save, 400); });
  });
})();
</script>
```

## 同一套代码也能用在 HeiGe-PPT

这段代码识别 `.slide` 容器就当幻灯片处理：在放映模式下点进某一页的字段就能改，方向键这时交给光标移动、不翻页（照搬 reveal.js 的焦点判断），点回空白处方向键恢复翻页。简历和幻灯片共用这一套编辑层。
