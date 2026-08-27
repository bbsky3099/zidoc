// ================= 返回首页按钮 =================
(function() {
    if (document.getElementById('home-nav-btn')) return;
    const btn = document.createElement('button');
    btn.id = 'home-nav-btn';
    btn.innerHTML = '🏠 返回首页';
    btn.style.cssText = `
        position: fixed; bottom: 50px; right: 20px;
        background: #2563eb; color: white; border: none;
        padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: bold;
        cursor: pointer; box-shadow: 0 4px 12px rgba(37,99,235,0.3);
        z-index: 9999; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        transition: all 0.3s ease; display: flex; align-items: center; gap: 6px;
        user-select: none; -webkit-user-select: none;
    `;
    btn.onmouseover = () => { btn.style.background='#1d4ed8'; btn.style.transform='translateY(-3px)'; btn.style.boxShadow='0 6px 16px rgba(37,99,235,0.4)'; };
    btn.onmouseout = () => { btn.style.background='#2563eb'; btn.style.transform='translateY(0)'; btn.style.boxShadow='0 4px 12px rgba(37,99,235,0.3)'; };
    btn.onclick = () => {
        const path = window.location.pathname;
        const lastSlashIndex = path.lastIndexOf('/');
        const basePath = lastSlashIndex > 0 ? path.substring(0, lastSlashIndex + 1) : '';
        window.location.replace(basePath + 'index.html');
    };
    document.body.appendChild(btn);
})();

// 禁用右键菜单
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    removeExistingTooltip();
    const msgs = [
        "👋 嘿，这里没有隐藏菜单哦！",
        "✨ 这个区域有点害羞，不喜欢被右键点击呢~",
        "🎯 哎呀，这个操作在这里不适用哦！",
        "💫 这里没有什么特别的，继续浏览吧！",
        "🌸 好奇的探索者，试试其他操作吧！",
        "🎨 创意保护模式已开启，无法使用右键~"
    ];
    showTooltip(msgs[Math.floor(Math.random()*msgs.length)], e.clientX, e.clientY);
    return false;
});

// 禁用查看源码快捷键
document.addEventListener('keydown', function(e) {
    let prevent = false, msg = "";
    if (e.key==='F12') { prevent=true; msg="🔍 这个按键在这里有其他用途哦！"; }
    if (e.ctrlKey && e.key==='u') { prevent=true; msg="🔮 源代码是魔法师的秘密，暂时不能公开哦！"; }
    if (e.ctrlKey&&e.shiftKey&&e.key==='I') { prevent=true; msg="🎪 这个组合键会召唤小精灵，但今天它们休息了~"; }
    if (e.ctrlKey&&e.shiftKey&&e.key==='J') { prevent=true; msg="📝 这个快捷键正在参加茶话会，稍点再来试试~"; }
    if (e.ctrlKey&&e.shiftKey&&e.key==='C') { prevent=true; msg="🎨 这个功能正在创作新作品，稍后再来查看~"; }
    if ((e.metaKey||e.ctrlKey)&&e.altKey&&e.key==='U') { prevent=true; msg="🔮 源代码是魔法师的秘密，暂时不能公开哦！"; }
    if ((e.metaKey||e.ctrlKey)&&e.altKey&&e.key==='I') { prevent=true; msg="🎪 这个组合键会召唤小精灵，但今天它们休息了~"; }
    if ((e.metaKey||e.ctrlKey)&&e.altKey&&e.key==='C') { prevent=true; msg="🎨 这个功能正在创作新作品，稍后再来查看~"; }
    if ((e.metaKey||e.ctrlKey)&&e.key==='u') { prevent=true; msg="🔮 源代码是魔法师的秘密，暂时不能公开哦！"; }
    if ((e.ctrlKey||e.metaKey)&&e.key==='p') { prevent=true; msg="🔎 搜索功能暂时无法使用，请稍后再试~"; }
    if (e.altKey && e.key==='F') { setTimeout(checkDevTools, 100); }
    if (prevent) { e.preventDefault(); e.stopPropagation(); removeExistingTooltip(); showTooltip(msg, innerWidth/2, innerHeight/3); return false; }
});

// 防止 view-source
const _hrefDesc = Object.getOwnPropertyDescriptor(Location.prototype,'href');
if (_hrefDesc && _hrefDesc.set) {
    const _orig = _hrefDesc.set;
    Object.defineProperty(Location.prototype,'href',{ set(v){ if(v&&v.toString().startsWith('view-source:')){removeExistingTooltip();showTooltip("🔮 源代码是魔法师的秘密，暂时不能公开哦！",innerWidth/2,innerHeight/3);return;} _orig.call(this,v); } });
}
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.protocol==='view-source:') window.location.href='/';
});
let _devOpen=false;
function checkDevTools(){ const w=outerWidth-innerWidth>200, h=outerHeight-innerHeight>200; if(w||h){ if(!_devOpen){_devOpen=true;removeExistingTooltip();showTooltip("🔄 页面需要刷新以保持最佳体验~",innerWidth/2,innerHeight/3);setTimeout(()=>location.reload(),1500);} }else{_devOpen=false;} }
setInterval(checkDevTools,1000);
(function(){ const ms=['log','warn','error','info','debug']; ms.forEach(m=>{const o=console[m];console[m]=function(){o.apply(console,arguments);};}); Object.defineProperty(window,'addEventListener',{value:window.addEventListener,writable:false,configurable:false}); Object.defineProperty(document,'addEventListener',{value:document.addEventListener,writable:false,configurable:false}); })();
function showTooltip(message,x,y){ const t=document.createElement('div'); t.id='friendly-tooltip'; t.style.cssText=`position:fixed;left:${x}px;top:${y}px;background:rgba(0,0,0,0.85);color:white;padding:12px 16px;border-radius:8px;font-size:14px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.3);z-index:10000;max-width:280px;text-align:center;animation:fadeInOut 3s ease-in-out forwards;transform:translate(-50%,-100%);margin-top:-10px;`; t.innerHTML=`${message}<div style="position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid rgba(0,0,0,0.85);"></div>`; const s=document.createElement('style'); if(!document.getElementById('tooltip-animation')){s.id='tooltip-animation';s.textContent=`@keyframes fadeInOut{0%{opacity:0;transform:translate(-50%,-100%) scale(0.8);}15%{opacity:1;transform:translate(-50%,-100%) scale(1);}85%{opacity:1;transform:translate(-50%,-100%) scale(1);}100%{opacity:0;transform:translate(-50%,-100%) scale(0.8);}}`;document.head.appendChild(s);} document.body.appendChild(t); setTimeout(()=>{if(t.parentNode)t.parentNode.removeChild(t);},3000); }
function removeExistingTooltip(){ const e=document.getElementById('friendly-tooltip'); if(e)e.parentNode.removeChild(e); }
window.addEventListener('load',function(){ console.log("🔒 创意保护模式已激活"); const fn=document.createElement('div'); fn.style.cssText='position:fixed;bottom:10px;right:10px;background:rgba(0,0,0,0.7);color:white;padding:5px 10px;border-radius:5px;font-size:12px;z-index:10000;'; fn.textContent='🔒 安全浏览模式'; document.body.appendChild(fn); document.addEventListener('keydown',e=>{ if(e.altKey)setTimeout(checkDevTools,100); }); });
const gaugeData = [
{ type: "非公制内螺纹牙规", fileName: "0-80 UNF 2B", instrumentNumber: "TSH_MZ_TG-【0-80 UNF 2B】-001", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/0-80 UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "0.210-36(5V1)", instrumentNumber: "TSH_MZ_TG-【0.210-36(5V1)】-002", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/0.210-36(5V1).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "0.535-40 UNS 2B", instrumentNumber: "TSH_MZ_TG-【0.535-40 UNS 2B】-003", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/0.535-40 UNS 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-11 G(BSPP) B", instrumentNumber: "TSH_MZ_TG-【1-11 G(BSPP) B】-004", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-11 G(BSPP)  B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-11.5 NPSM 2B", instrumentNumber: "TSH_MZ_TG-【1-11.5 NPSM 2B】-005", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-11.5 NPSM 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-11.5 NPT", instrumentNumber: "TSH_MZ_TG-【1-11.5 NPT】-006", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-11.5 NPT.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-1/2-11.5 NPSM 2B", instrumentNumber: "TSH_MZ_TG-【1-1/2-11.5 NPSM 2B】-007", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-1“2-11.5 NPSM 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-1/4-11 G(BSPP)", instrumentNumber: "TSH_MZ_TG-【1-1/4-11 G(BSPP)】-008", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-1“4-11 G(BSPP).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-1/4-11.5 NPSM 2B", instrumentNumber: "TSH_MZ_TG-【1-1/4-11.5 NPSM 2B】-009", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-1“4-11.5 NPSM 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-1/4-12 UNF 2B", instrumentNumber: "TSH_MZ_TG-【1-1/4-12 UNF 2B】-010", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-1“4-12 UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-1/2 - 11-1/2(1-1/2 - 11.5) NPT 2B", instrumentNumber: "TSH_MZ_TG-【1-1/2 - 11-1/2(1-1/2 - 11.5) NPT 2B】-011", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-1”2 - 11-1”2(1-1”2 - 11.5) NPT 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-1/2 G(BSPP)", instrumentNumber: "TSH_MZ_TG-【1-1/2 G(BSPP)】-012", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-1”2 G(BSPP).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-1/2-11 G(BSPP) B", instrumentNumber: "TSH_MZ_TG-【1-1/2-11 G(BSPP) B】-013", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-1”2-11 G(BSPP)  B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-1/4 - 11-1/2(1-1/4 - 11.5) NPT 2B.jpg", instrumentNumber: "TSH_MZ_TG-【1-1/4 - 11-1/2(1-1/4 - 11.5) NPT 2B.jpg】-014", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-1”4 - 11-1”2(1-1”4 - 11.5) NPT 2B.jpg.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-1/8-12 UNF 2B", instrumentNumber: "TSH_MZ_TG-【1-1/8-12 UNF 2B】-015", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-1”8-12 UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-1/8-20 UN 2B", instrumentNumber: "TSH_MZ_TG-【1-1/8-20 UN 2B】-016", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-1”8-20 UN 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-3/8-16 UN 2B", instrumentNumber: "TSH_MZ_TG-【1-3/8-16 UN 2B】-017", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-3”8-16 UN 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-5/16-12 UN 2B", instrumentNumber: "TSH_MZ_TG-【1-5/16-12 UN 2B】-018", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-5”16-12 UN 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-5/16-12 UNJ 3B", instrumentNumber: "TSH_MZ_TG-【1-5/16-12 UNJ 3B】-019", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-5”16-12 UNJ 3B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-64 UNC 2B", instrumentNumber: "TSH_MZ_TG-【1-64 UNC 2B】-020", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-64 UNC 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-72 UNF 2B", instrumentNumber: "TSH_MZ_TG-【1-72 UNF 2B】-021", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-72 UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-7/16-18(1.438-18) UNEF 2B", instrumentNumber: "TSH_MZ_TG-【1-7/16-18(1.438-18) UNEF 2B】-022", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-7”16-18(1.438-18)  UNEF 2B(1).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1-7/16-18(1.438-18) UNEF 2B", instrumentNumber: "TSH_MZ_TG-【1-7/16-18(1.438-18) UNEF 2B】-022", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-7”16-18(1.438-18) UNEF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1.035-40 UNS 2B", instrumentNumber: "TSH_MZ_TG-【1.035-40 UNS 2B】-023", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1.035-40 UNS 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "10-24 UNC 2B", instrumentNumber: "TSH_MZ_TG-【10-24 UNC 2B】-024", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/10-24 UNC 2B(1).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "10-24 UNC 2B", instrumentNumber: "TSH_MZ_TG-【10-24 UNC 2B】-024", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/10-24 UNC 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "10-32 UNF 2B", instrumentNumber: "TSH_MZ_TG-【10-32 UNF 2B】-025", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/10-32 UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "12-32 UNEF 2B", instrumentNumber: "TSH_MZ_TG-【12-32 UNEF 2B】-026", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/12-32 UNEF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "13.5 PG", instrumentNumber: "TSH_MZ_TG-【13.5 PG】-027", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/13.5 PG.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "15/16-16 UN 2B", instrumentNumber: "TSH_MZ_TG-【15/16-16 UN 2B】-028", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/15”16-16 UN 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/2-14 NPSM 2B", instrumentNumber: "TSH_MZ_TG-【1/2-14 NPSM 2B】-029", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1“2-14 NPSM 2B.png", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/16-27 NPT", instrumentNumber: "TSH_MZ_TG-【1/16-27 NPT】-030", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”16-27 NPT.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/2-13 UNC 2B", instrumentNumber: "TSH_MZ_TG-【1/2-13 UNC 2B】-031", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”2-13 UNC 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/2-14 G (BSPP)", instrumentNumber: "TSH_MZ_TG-【1/2-14 G (BSPP)】-032", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”2-14 G (BSPP).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/2-14 NPT", instrumentNumber: "TSH_MZ_TG-【1/2-14 NPT】-033", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”2-14 NPT.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/2-14 NPTF", instrumentNumber: "TSH_MZ_TG-【1/2-14 NPTF】-034", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”2-14 NPTF.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/2-20 UNF 2B", instrumentNumber: "TSH_MZ_TG-【1/2-20 UNF 2B】-035", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”2-20 UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/2-20 UNF 3B", instrumentNumber: "TSH_MZ_TG-【1/2-20 UNF 3B】-036", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”2-20 UNF 3B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/2-28 UNEF 3B", instrumentNumber: "TSH_MZ_TG-【1/2-28 UNEF 3B】-037", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”2-28 UNEF 3B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/4-18 NPT", instrumentNumber: "TSH_MZ_TG-【1/4-18 NPT】-038", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-18 NPT.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/4-19 G (BSPP)", instrumentNumber: "TSH_MZ_TG-【1/4-19 G (BSPP)】-039", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-19 G (BSPP).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/4-19 RC(PT)", instrumentNumber: "TSH_MZ_TG-【1/4-19 RC(PT)】-040", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-19 RC(PT).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/4-19 RC", instrumentNumber: "TSH_MZ_TG-【1/4-19 RC】-041", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-19 RC.png", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/4-20 UNC 2B", instrumentNumber: "TSH_MZ_TG-【1/4-20 UNC 2B】-042", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-20 UNC 2B(1).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/4-20 UNC 2B", instrumentNumber: "TSH_MZ_TG-【1/4-20 UNC 2B】-042", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-20 UNC 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/4-28 UNF 2B", instrumentNumber: "TSH_MZ_TG-【1/4-28 UNF 2B】-043", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-28 UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/4-28UNF 2B", instrumentNumber: "TSH_MZ_TG-【1/4-28UNF 2B】-044", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-28UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/4-32UNEF 2B", instrumentNumber: "TSH_MZ_TG-【1/4-32UNEF 2B】-045", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-32UNEF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/4-36 UNS 2B", instrumentNumber: "TSH_MZ_TG-【1/4-36 UNS 2B】-046", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-36 UNS 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/8 G (BSPP)", instrumentNumber: "TSH_MZ_TG-【1/8 G (BSPP)】-047", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”8 G (BSPP).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/8-27 NPT", instrumentNumber: "TSH_MZ_TG-【1/8-27 NPT】-048", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”8-27 NPT.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/8-27 NPTF", instrumentNumber: "TSH_MZ_TG-【1/8-27 NPTF】-049", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”8-27 NPTF.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/8-28 G (BSPP)", instrumentNumber: "TSH_MZ_TG-【1/8-28 G (BSPP)】-050", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”8-28 G (BSPP).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "1/8-28 RC(PT) 2B", instrumentNumber: "TSH_MZ_TG-【1/8-28 RC(PT) 2B】-051", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”8-28 RC(PT) 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "2 - 11-1/2(2-11 - 11.5) NPT 2B", instrumentNumber: "TSH_MZ_TG-【2 - 11-1/2(2-11 - 11.5) NPT 2B】-052", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/2 - 11-1”2(2-11 - 11.5) NPT 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "2-11 G(BSPP)", instrumentNumber: "TSH_MZ_TG-【2-11 G(BSPP)】-053", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/2-11 G(BSPP)(1).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "2-11 G(BSPP)", instrumentNumber: "TSH_MZ_TG-【2-11 G(BSPP)】-053", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/2-11 G(BSPP).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "2-11.5 NPSM 2B", instrumentNumber: "TSH_MZ_TG-【2-11.5 NPSM 2B】-054", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/2-11.5 NPSM 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "2-12 UN 2B", instrumentNumber: "TSH_MZ_TG-【2-12 UN 2B】-055", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/2-12 UN 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "2-3/4(2.75)-12 UN 2B", instrumentNumber: "TSH_MZ_TG-【2-3/4(2.75)-12 UN 2B】-056", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/2-3“4(2.75)-12 UN 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "2-3/8-16 UN 2B", instrumentNumber: "TSH_MZ_TG-【2-3/8-16 UN 2B】-057", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/2-3”8-16 UN 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "2-56 UNC 2B", instrumentNumber: "TSH_MZ_TG-【2-56 UNC 2B】-058", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/2-56 UNC 2B(1).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "2-56 UNC 2B", instrumentNumber: "TSH_MZ_TG-【2-56 UNC 2B】-058", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/2-56 UNC 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "2-64 UNF 2B", instrumentNumber: "TSH_MZ_TG-【2-64 UNF 2B】-059", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/2-64 UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/4 G (BSPP) LH (左旋)", instrumentNumber: "TSH_MZ_TG-【3/4 G (BSPP) LH (左旋)】-060", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3“4  G (BSPP)  LH (左旋).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/4-16 UNF LH", instrumentNumber: "TSH_MZ_TG-【3/4-16 UNF LH】-061", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3“4-16 UNF LH.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/8-24 UNJF 3B", instrumentNumber: "TSH_MZ_TG-【3/8-24 UNJF 3B】-062", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3“8-24 UNJF 3B.png", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/4-10 UNC 2B", instrumentNumber: "TSH_MZ_TG-【3/4-10 UNC 2B】-063", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”4-10 UNC 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/4-14 G(BSPP) B", instrumentNumber: "TSH_MZ_TG-【3/4-14 G(BSPP) B】-064", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”4-14 G(BSPP)  B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/4-14 NPT", instrumentNumber: "TSH_MZ_TG-【3/4-14 NPT】-065", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”4-14 NPT.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/4-14 PT(RC)", instrumentNumber: "TSH_MZ_TG-【3/4-14 PT(RC)】-066", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”4-14 PT（RC）.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/4-16 UNF 2B", instrumentNumber: "TSH_MZ_TG-【3/4-16 UNF 2B】-067", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”4-16 UNF 2B(1).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/4-16 UNF 2B", instrumentNumber: "TSH_MZ_TG-【3/4-16 UNF 2B】-067", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”4-16 UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/4-19 PT(RC)", instrumentNumber: "TSH_MZ_TG-【3/4-19 PT(RC)】-068", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”4-19 PT（RC）.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/4-32 UN 2B", instrumentNumber: "TSH_MZ_TG-【3/4-32 UN 2B】-069", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”4-32 UN 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/8 G (BSPP)", instrumentNumber: "TSH_MZ_TG-【3/8 G (BSPP)】-070", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”8 G (BSPP).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/8-16 UNC 2B", instrumentNumber: "TSH_MZ_TG-【3/8-16 UNC 2B】-071", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”8-16 UNC 2B(1).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/8-16 UNC 2B", instrumentNumber: "TSH_MZ_TG-【3/8-16 UNC 2B】-071", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”8-16 UNC 2B(2).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/8-16 UNC 2B", instrumentNumber: "TSH_MZ_TG-【3/8-16 UNC 2B】-071", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”8-16 UNC 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/8-18 NPT", instrumentNumber: "TSH_MZ_TG-【3/8-18 NPT】-072", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”8-18 NPT.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/8-18 NPTF", instrumentNumber: "TSH_MZ_TG-【3/8-18 NPTF】-073", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”8-18 NPTF.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/8-19 BSPT", instrumentNumber: "TSH_MZ_TG-【3/8-19 BSPT】-074", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”8-19 BSPT.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "3/8-24 UNF 2B", instrumentNumber: "TSH_MZ_TG-【3/8-24 UNF 2B】-075", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”8-24 UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "4-40 UNC 2B", instrumentNumber: "TSH_MZ_TG-【4-40 UNC 2B】-076", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/4-40 UNC 2B(1).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "4-40 UNC 2B", instrumentNumber: "TSH_MZ_TG-【4-40 UNC 2B】-076", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/4-40 UNC 2B(2).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "4-40 UNC 2B", instrumentNumber: "TSH_MZ_TG-【4-40 UNC 2B】-076", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/4-40 UNC 2B(3).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "4-40 UNC 2B", instrumentNumber: "TSH_MZ_TG-【4-40 UNC 2B】-076", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/4-40 UNC 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "4-40UNC 2B", instrumentNumber: "TSH_MZ_TG-【4-40UNC 2B】-077", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/4-40UNC 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "4-48 UNF 2B", instrumentNumber: "TSH_MZ_TG-【4-48 UNF 2B】-078", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/4-48 UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "5-40 UNC 2B", instrumentNumber: "TSH_MZ_TG-【5-40 UNC 2B】-079", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/5-40 UNC 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "5/8-18 UNF 2B", instrumentNumber: "TSH_MZ_TG-【5/8-18 UNF 2B】-080", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/5“8-18 UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "5/16-18 UNC 2B", instrumentNumber: "TSH_MZ_TG-【5/16-18 UNC 2B】-081", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/5”16-18 UNC 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "5/16-24 UNF 2B", instrumentNumber: "TSH_MZ_TG-【5/16-24 UNF 2B】-082", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/5”16-24 UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "5/16-32 UNEF 2B", instrumentNumber: "TSH_MZ_TG-【5/16-32 UNEF 2B】-083", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/5”16-32 UNEF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "6-32 UNC 2B", instrumentNumber: "TSH_MZ_TG-【6-32 UNC 2B】-084", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/6-32 UNC 2B(1).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "6-32 UNC 2B", instrumentNumber: "TSH_MZ_TG-【6-32 UNC 2B】-084", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/6-32 UNC 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "6-40 UNF 2B", instrumentNumber: "TSH_MZ_TG-【6-40 UNF 2B】-085", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/6-40 UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "6-40UNF 2B", instrumentNumber: "TSH_MZ_TG-【6-40UNF 2B】-086", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/6-40UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "6-48 UNS 3B", instrumentNumber: "TSH_MZ_TG-【6-48 UNS 3B】-087", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/6-48 UNS 3B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "7 PG", instrumentNumber: "TSH_MZ_TG-【7 PG】-088", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/7 PG.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "7/16-14 UNC 2B", instrumentNumber: "TSH_MZ_TG-【7/16-14 UNC 2B】-089", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/7”16-14 UNC 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "7/16-20 UNF 2B", instrumentNumber: "TSH_MZ_TG-【7/16-20 UNF 2B】-090", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/7”16-20 UNF 2B(1).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "7/16-20 UNF 2B", instrumentNumber: "TSH_MZ_TG-【7/16-20 UNF 2B】-090", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/7”16-20 UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "7/8-14 UNF 2B", instrumentNumber: "TSH_MZ_TG-【7/8-14 UNF 2B】-091", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/7”8-14 UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "7/8-20 UNEF 2B", instrumentNumber: "TSH_MZ_TG-【7/8-20 UNEF 2B】-092", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/7”8-20 UNEF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "8-32 UNC 2B", instrumentNumber: "TSH_MZ_TG-【8-32 UNC 2B】-093", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/8-32 UNC 2B(1).jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "8-32 UNC 2B", instrumentNumber: "TSH_MZ_TG-【8-32 UNC 2B】-093", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/8-32 UNC 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "8-36 UNF 2B", instrumentNumber: "TSH_MZ_TG-【8-36 UNF 2B】-094", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/8-36 UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "9/16-18 UNF 2B", instrumentNumber: "TSH_MZ_TG-【9/16-18 UNF 2B】-095", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/9”16-18 UNF 2B.jpg", status: "valid" },
{ type: "非公制内螺纹牙规", fileName: "9/16-18 UNJF 3B", instrumentNumber: "TSH_MZ_TG-【9/16-18 UNJF 3B】-096", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/9”16-18 UNJF 3B.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "0.305-32(8V1)", instrumentNumber: "TSH_MZ_TR-【0.305-32(8V1)】-001", imagePath: "螺纹规清单/非公制外螺纹环规清单表/0.305-32（8V1）.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1-14 UNS 2A", instrumentNumber: "TSH_MZ_TR-【1-14 UNS 2A】-002", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1-14 UNS 2A.png", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1-1/16 - 16(1.0625-16) UN(UNEF) 3A", instrumentNumber: "TSH_MZ_TR-【1-1/16 - 16(1.0625-16) UN(UNEF) 3A】-003", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1-1“16 - 16(1.0625-16) UN(UNEF) 3A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1-1/2 BSPP(G) 2A", instrumentNumber: "TSH_MZ_TR-【1-1/2 BSPP(G) 2A】-004", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1-1“2 BSPP(G) 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1-1/2-16(1.5-16) UNEF(UN) 2A", instrumentNumber: "TSH_MZ_TR-【1-1/2-16(1.5-16) UNEF(UN) 2A】-005", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1-1“2-16(1.5-16) UNEF(UN) 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1-1/4-11 G(BSPP)", instrumentNumber: "TSH_MZ_TR-【1-1/4-11 G(BSPP)】-006", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1-1“4-11 G(BSPP).jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1-1/4-12 UNF 2A", instrumentNumber: "TSH_MZ_TR-【1-1/4-12 UNF 2A】-007", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1-1“4-12 UNF 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1-1/4 - 11-1/2(1-1/4 - 11.5) NPT 2A", instrumentNumber: "TSH_MZ_TR-【1-1/4 - 11-1/2(1-1/4 - 11.5) NPT 2A】-008", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1-1”4 - 11-1”2(1-1”4 - 11.5) NPT 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1-20 UNEF 2A", instrumentNumber: "TSH_MZ_TR-【1-20 UNEF 2A】-009", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1-20 UNEF 2A.png", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1-3/4-12 UN 3A", instrumentNumber: "TSH_MZ_TR-【1-3/4-12 UN 3A】-010", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1-3”4-12 UN 3A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1-5/16-12 UN 2A", instrumentNumber: "TSH_MZ_TR-【1-5/16-12 UN 2A】-011", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1-5“16-12 UN 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "10-32 UNF 2A", instrumentNumber: "TSH_MZ_TR-【10-32 UNF 2A】-012", imagePath: "螺纹规清单/非公制外螺纹环规清单表/10-32 UNF 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "15/16-20 UNEF 2A", instrumentNumber: "TSH_MZ_TR-【15/16-20 UNEF 2A】-013", imagePath: "螺纹规清单/非公制外螺纹环规清单表/15”16-20 UNEF 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1/8-27 NPT", instrumentNumber: "TSH_MZ_TR-【1/8-27 NPT】-014", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1“8-27 NPT.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1/-11 R", instrumentNumber: "TSH_MZ_TR-【1/-11 R】-015", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”-11 R.PNG", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1/2 BSP(BSPP)(G)", instrumentNumber: "TSH_MZ_TR-【1/2 BSP(BSPP)(G)】-016", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”2 BSP(BSPP)(G).png", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1/2-13 UNC 3A", instrumentNumber: "TSH_MZ_TR-【1/2-13 UNC 3A】-017", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”2-13 UNC 3A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1/2-14 PT(RC)", instrumentNumber: "TSH_MZ_TR-【1/2-14 PT(RC)】-018", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”2-14 PT(RC).jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1/2-20 UNF", instrumentNumber: "TSH_MZ_TR-【1/2-20 UNF】-019", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”2-20 UNF.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1/4 G (BSPP) A", instrumentNumber: "TSH_MZ_TR-【1/4 G (BSPP) A】-020", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”4 G (BSPP) A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1/4 G (BSPP)", instrumentNumber: "TSH_MZ_TR-【1/4 G (BSPP)】-021", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”4 G (BSPP).jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1/4-18 NPT", instrumentNumber: "TSH_MZ_TR-【1/4-18 NPT】-022", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”4-18 NPT.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1/4-20 UNC 2A", instrumentNumber: "TSH_MZ_TR-【1/4-20 UNC 2A】-023", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”4-20 UNC 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1/4-20 UNC 2A", instrumentNumber: "TSH_MZ_TR-【1/4-20 UNC 2A】-023", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”4-20 UNC 2A（1）.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1/4-28 UNF 2A", instrumentNumber: "TSH_MZ_TR-【1/4-28 UNF 2A】-024", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”4-28 UNF 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1/4-32 UNEF 2A", instrumentNumber: "TSH_MZ_TR-【1/4-32 UNEF 2A】-025", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”4-32 UNEF 2A.png", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1/4-36 UNS 2A", instrumentNumber: "TSH_MZ_TR-【1/4-36 UNS 2A】-026", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”4-36 UNS 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "1/8 G (BSPP)", instrumentNumber: "TSH_MZ_TR-【1/8 G (BSPP)】-027", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”8 G (BSPP).jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "2/-11 R", instrumentNumber: "TSH_MZ_TR-【2/-11 R】-028", imagePath: "螺纹规清单/非公制外螺纹环规清单表/2”-11 R.png", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "3/4-14 NPS", instrumentNumber: "TSH_MZ_TR-【3/4-14 NPS】-029", imagePath: "螺纹规清单/非公制外螺纹环规清单表/3“4-14 NPS.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "3/4-14 NPT", instrumentNumber: "TSH_MZ_TR-【3/4-14 NPT】-030", imagePath: "螺纹规清单/非公制外螺纹环规清单表/3”4-14 NPT.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "3/4-16 UNF 2A", instrumentNumber: "TSH_MZ_TR-【3/4-16 UNF 2A】-031", imagePath: "螺纹规清单/非公制外螺纹环规清单表/3”4-16 UNF 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "3/4-16 UNF 2A", instrumentNumber: "TSH_MZ_TR-【3/4-16 UNF 2A】-031", imagePath: "螺纹规清单/非公制外螺纹环规清单表/3”4-16 UNF 2A.png", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "3/4-32 UN 2A", instrumentNumber: "TSH_MZ_TR-【3/4-32 UN 2A】-032", imagePath: "螺纹规清单/非公制外螺纹环规清单表/3”4-32 UN 2A.png", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "3/8 G (BSPP)", instrumentNumber: "TSH_MZ_TR-【3/8 G (BSPP)】-033", imagePath: "螺纹规清单/非公制外螺纹环规清单表/3”8 G (BSPP).jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "3/8-16 UNC 3A", instrumentNumber: "TSH_MZ_TR-【3/8-16 UNC 3A】-034", imagePath: "螺纹规清单/非公制外螺纹环规清单表/3”8-16 UNC 3A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "3/8-24 UNF 2A", instrumentNumber: "TSH_MZ_TR-【3/8-24 UNF 2A】-035", imagePath: "螺纹规清单/非公制外螺纹环规清单表/3”8-24 UNF 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "3/8-32 UNEF 2A", instrumentNumber: "TSH_MZ_TR-【3/8-32 UNEF 2A】-036", imagePath: "螺纹规清单/非公制外螺纹环规清单表/3”8-32 UNEF 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "4-40 UNC 2A", instrumentNumber: "TSH_MZ_TR-【4-40 UNC 2A】-037", imagePath: "螺纹规清单/非公制外螺纹环规清单表/4-40 UNC 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "5-11 G A", instrumentNumber: "TSH_MZ_TR-【5-11 G A】-038", imagePath: "螺纹规清单/非公制外螺纹环规清单表/5-11 G A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "50X8 Tr", instrumentNumber: "TSH_MZ_TR-【50X8 Tr】-039", imagePath: "螺纹规清单/非公制外螺纹环规清单表/50X8 Tr.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "5/16-18UNC 2A", instrumentNumber: "TSH_MZ_TR-【5/16-18UNC 2A】-040", imagePath: "螺纹规清单/非公制外螺纹环规清单表/5”16-18UNC 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "5/16-24 UNF 2A", instrumentNumber: "TSH_MZ_TR-【5/16-24 UNF 2A】-041", imagePath: "螺纹规清单/非公制外螺纹环规清单表/5”16-24 UNF 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "5/8 G (BSPP)", instrumentNumber: "TSH_MZ_TR-【5/8 G (BSPP)】-042", imagePath: "螺纹规清单/非公制外螺纹环规清单表/5”8 G (BSPP).jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "5/8-11 UNC 2A", instrumentNumber: "TSH_MZ_TR-【5/8-11 UNC 2A】-043", imagePath: "螺纹规清单/非公制外螺纹环规清单表/5”8-11 UNC 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "5/8-18 UNF 2A", instrumentNumber: "TSH_MZ_TR-【5/8-18 UNF 2A】-044", imagePath: "螺纹规清单/非公制外螺纹环规清单表/5”8-18 UNF 2A.png", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "6-40 UNF 2A", instrumentNumber: "TSH_MZ_TR-【6-40 UNF 2A】-045", imagePath: "螺纹规清单/非公制外螺纹环规清单表/6-40 UNF 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "7/8-14 (0.875-14)UNF 2A", instrumentNumber: "TSH_MZ_TR-【7/8-14 (0.875-14)UNF 2A】-046", imagePath: "螺纹规清单/非公制外螺纹环规清单表/7”8-14 (0.875-14)UNF 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "7/8-18 UNS 2A", instrumentNumber: "TSH_MZ_TR-【7/8-18 UNS 2A】-047", imagePath: "螺纹规清单/非公制外螺纹环规清单表/7”8-18 UNS 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "7/8-20 UNEF 2A", instrumentNumber: "TSH_MZ_TR-【7/8-20 UNEF 2A】-048", imagePath: "螺纹规清单/非公制外螺纹环规清单表/7”8-20 UNEF 2A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "8-32(0.1640-32) UNJC 3A", instrumentNumber: "TSH_MZ_TR-【8-32(0.1640-32) UNJC 3A】-049", imagePath: "螺纹规清单/非公制外螺纹环规清单表/8-32(0.1640-32) UNJC 3A.jpg", status: "valid" },
{ type: "非公制外螺纹环规", fileName: "9/16-18 UNF 2A", instrumentNumber: "TSH_MZ_TR-【9/16-18 UNF 2A】-050", imagePath: "螺纹规清单/非公制外螺纹环规清单表/9”16-18 UNF 2A.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M1.1X0.25 6H", instrumentNumber: "TSH_GZ_TG-【M1.1X0.25 6H】-001", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.1X0.25 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M1.2X0.2 6H", instrumentNumber: "TSH_GZ_TG-【M1.2X0.2 6H】-002", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.2X0.2 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M1.2X0.2 6H", instrumentNumber: "TSH_GZ_TG-【M1.2X0.2 6H】-002", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.2X0.2 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M1.2X0.25 6H", instrumentNumber: "TSH_GZ_TG-【M1.2X0.25 6H】-003", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.2X0.25 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M1.2X0.25 6H", instrumentNumber: "TSH_GZ_TG-【M1.2X0.25 6H】-003", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.2X0.25 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M1.4X0.3 6H", instrumentNumber: "TSH_GZ_TG-【M1.4X0.3 6H】-004", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.4X0.3 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M1.4X0.3 6H", instrumentNumber: "TSH_GZ_TG-【M1.4X0.3 6H】-004", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.4X0.3 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M1.6X0.2 6H", instrumentNumber: "TSH_GZ_TG-【M1.6X0.2 6H】-005", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.6X0.2 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M1.6X0.35 6H", instrumentNumber: "TSH_GZ_TG-【M1.6X0.35 6H】-006", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.6X0.35 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M1.6X0.35 6H", instrumentNumber: "TSH_GZ_TG-【M1.6X0.35 6H】-006", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.6X0.35 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M1X0.2 6H", instrumentNumber: "TSH_GZ_TG-【M1X0.2 6H】-007", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1X0.2 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M1X0.25 6H", instrumentNumber: "TSH_GZ_TG-【M1X0.25 6H】-008", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1X0.25 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M1X0.25 6H", instrumentNumber: "TSH_GZ_TG-【M1X0.25 6H】-008", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1X0.25 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M2.2X0.45 6H", instrumentNumber: "TSH_GZ_TG-【M2.2X0.45 6H】-009", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M2.2X0.45 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M2.5X0.45 6H", instrumentNumber: "TSH_GZ_TG-【M2.5X0.45 6H】-010", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M2.5X0.45 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M2.6X0.45 6H", instrumentNumber: "TSH_GZ_TG-【M2.6X0.45 6H】-011", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M2.6X0.45 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M2X0.35 6H", instrumentNumber: "TSH_GZ_TG-【M2X0.35 6H】-012", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M2X0.35 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M2X0.4 6G", instrumentNumber: "TSH_GZ_TG-【M2X0.4 6G】-013", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M2X0.4 6G(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M2X0.4 6G", instrumentNumber: "TSH_GZ_TG-【M2X0.4 6G】-013", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M2X0.4 6G.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M2X0.4 6H", instrumentNumber: "TSH_GZ_TG-【M2X0.4 6H】-014", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M2X0.4 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M2X0.4 6H", instrumentNumber: "TSH_GZ_TG-【M2X0.4 6H】-014", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M2X0.4 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M3.5X0.6 6H", instrumentNumber: "TSH_GZ_TG-【M3.5X0.6 6H】-015", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M3.5X0.6 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M3X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M3X0.5 6H】-016", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M3X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M4X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M4X0.5 6H】-017", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M4X0.5 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M4X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M4X0.5 6H】-017", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M4X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M4X0.7 6H", instrumentNumber: "TSH_GZ_TG-【M4X0.7 6H】-018", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M4X0.7 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M4X0.7 6H", instrumentNumber: "TSH_GZ_TG-【M4X0.7 6H】-018", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M4X0.7 6H(2).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M4X0.7 6H", instrumentNumber: "TSH_GZ_TG-【M4X0.7 6H】-018", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M4X0.7 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M5X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M5X0.5 6H】-019", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M5X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M5X0.8 6H", instrumentNumber: "TSH_GZ_TG-【M5X0.8 6H】-020", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M5X0.8 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M6X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M6X0.5 6H】-021", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M6X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M6X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M6X0.75 6H】-022", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M6X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M6X1 6H", instrumentNumber: "TSH_GZ_TG-【M6X1 6H】-023", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M6X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M7X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M7X0.5 6H】-024", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M7X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M7X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M7X0.75 6H】-025", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M7X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M7X1 6H", instrumentNumber: "TSH_GZ_TG-【M7X1 6H】-026", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M7X1 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M7X1 6H", instrumentNumber: "TSH_GZ_TG-【M7X1 6H】-026", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M7X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M8X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M8X0.5 6H】-027", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M8X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M8X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M8X0.75 6H】-028", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M8X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M8X1 6H", instrumentNumber: "TSH_GZ_TG-【M8X1 6H】-029", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M8X1 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M8X1 6H", instrumentNumber: "TSH_GZ_TG-【M8X1 6H】-029", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M8X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M8X1.25 6H", instrumentNumber: "TSH_GZ_TG-【M8X1.25 6H】-030", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M8X1.25 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M8X1.25 7H", instrumentNumber: "TSH_GZ_TG-【M8X1.25 7H】-031", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M8X1.25 7H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M8X1.25 LH 6H", instrumentNumber: "TSH_GZ_TG-【M8X1.25 LH 6H】-032", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M8X1.25 LH 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M9X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M9X0.5 6H】-033", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M9X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M9X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M9X0.75 6H】-034", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M9X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M9X1 6H", instrumentNumber: "TSH_GZ_TG-【M9X1 6H】-035", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M9X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M10X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M10X0.5 6H】-036", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M10X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M10X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M10X0.75 6H】-037", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M10X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M10X1 6H", instrumentNumber: "TSH_GZ_TG-【M10X1 6H】-038", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M10X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M10X1 LH 6H", instrumentNumber: "TSH_GZ_TG-【M10X1 LH 6H】-039", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M10X1 LH 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M10X1.25 6H", instrumentNumber: "TSH_GZ_TG-【M10X1.25 6H】-040", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M10X1.25 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M10X1.5 7H", instrumentNumber: "TSH_GZ_TG-【M10X1.5 7H】-041", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M10X1.5 7H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M11X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M11X0.5 6H】-042", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M11X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M11X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M11X0.75 6H】-043", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M11X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M11X1 6H", instrumentNumber: "TSH_GZ_TG-【M11X1 6H】-044", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M11X1 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M11X1 6H", instrumentNumber: "TSH_GZ_TG-【M11X1 6H】-044", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M11X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M12X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M12X0.5 6H】-045", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M12X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M12X0.75 6H】-046", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M12X1 6H", instrumentNumber: "TSH_GZ_TG-【M12X1 6H】-047", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M12X1.25 6H", instrumentNumber: "TSH_GZ_TG-【M12X1.25 6H】-048", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X1.25 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M12X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M12X1.5 6H】-049", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M12X1.75 6H", instrumentNumber: "TSH_GZ_TG-【M12X1.75 6H】-050", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X1.75 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M12X1.75 6H", instrumentNumber: "TSH_GZ_TG-【M12X1.75 6H】-050", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X1.75 6H(2).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M12X1.75 6H", instrumentNumber: "TSH_GZ_TG-【M12X1.75 6H】-050", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X1.75 6H(3).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M12X1.75 6H", instrumentNumber: "TSH_GZ_TG-【M12X1.75 6H】-050", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X1.75 6H(4).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M12X1.75 6H", instrumentNumber: "TSH_GZ_TG-【M12X1.75 6H】-050", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X1.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M13X1 6H", instrumentNumber: "TSH_GZ_TG-【M13X1 6H】-051", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M13X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M14X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M14X0.5 6H】-052", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M14X0.5 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M14X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M14X0.5 6H】-052", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M14X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M14X1 6H", instrumentNumber: "TSH_GZ_TG-【M14X1 6H】-053", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M14X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M14X1.25 6H", instrumentNumber: "TSH_GZ_TG-【M14X1.25 6H】-054", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M14X1.25 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M14X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M14X1.5 6H】-055", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M14X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M14X2 6H", instrumentNumber: "TSH_GZ_TG-【M14X2 6H】-056", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M14X2 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M15X0.35 6H", instrumentNumber: "TSH_GZ_TG-【M15X0.35 6H】-139", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M15X0.35 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M15X0.5 4H", instrumentNumber: "TSH_GZ_TG-【M15X0.5 4H】-057", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M15X0.5 4H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M15X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M15X0.5 6H】-058", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M15X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M15X1 6H", instrumentNumber: "TSH_GZ_TG-【M15X1 6H】-059", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M15X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M15X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M15X1.5 6H】-060", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M15X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M16X1 6H", instrumentNumber: "TSH_GZ_TG-【M16X1 6H】-061", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M16X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M16X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M16X1.5 6H】-062", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M16X1.5 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M16X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M16X1.5 6H】-062", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M16X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M16X2 6H", instrumentNumber: "TSH_GZ_TG-【M16X2 6H】-063", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M16X2 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M16X2 6H", instrumentNumber: "TSH_GZ_TG-【M16X2 6H】-063", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M16X2 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M17.5X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M17.5X0.5 6H】-064", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M17.5X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M17X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M17X0.5 6H】-065", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M17X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M17X1 6H", instrumentNumber: "TSH_GZ_TG-【M17X1 6H】-066", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M17X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M18X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M18X0.5 6H】-067", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M18X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M18X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M18X0.75 6H】-068", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M18X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M18X1 6H", instrumentNumber: "TSH_GZ_TG-【M18X1 6H】-069", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M18X1 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M18X1 6H", instrumentNumber: "TSH_GZ_TG-【M18X1 6H】-069", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M18X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M18X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M18X1.5 6H】-070", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M18X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M18X2.5 6H", instrumentNumber: "TSH_GZ_TG-【M18X2.5 6H】-071", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M18X2.5 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M18X2.5 6H", instrumentNumber: "TSH_GZ_TG-【M18X2.5 6H】-071", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M18X2.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M19X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M19X0.75 6H】-072", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M19X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M20X1 6H", instrumentNumber: "TSH_GZ_TG-【M20X1 6H】-073", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M20X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M20X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M20X1.5 6H】-074", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M20X1.5 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M20X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M20X1.5 6H】-074", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M20X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M20X2.5 6H", instrumentNumber: "TSH_GZ_TG-【M20X2.5 6H】-075", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M20X2.5 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M20X2.5 6H", instrumentNumber: "TSH_GZ_TG-【M20X2.5 6H】-075", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M20X2.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M21X1 6H", instrumentNumber: "TSH_GZ_TG-【M21X1 6H】-076", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M21X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M22X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M22X0.75 6H】-077", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M22X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M22X1 6H", instrumentNumber: "TSH_GZ_TG-【M22X1 6H】-078", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M22X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M22X1.5 LH 6H", instrumentNumber: "TSH_GZ_TG-【M22X1.5 LH 6H】-079", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M22X1.5  LH 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M22X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M22X1.5 6H】-080", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M22X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M22X2 6H", instrumentNumber: "TSH_GZ_TG-【M22X2 6H】-081", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M22X2 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M23X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M23X0.5 6H】-082", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M23X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M24X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M24X0.5 6H】-083", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M24X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M24X1 6H", instrumentNumber: "TSH_GZ_TG-【M24X1 6H】-084", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M24X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M24X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M24X1.5 6H】-085", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M24X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M24X1.5 LH 6H", instrumentNumber: "TSH_GZ_TG-【M24X1.5 LH 6H】-086", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M24X1.5 LH 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M24x2 6H", instrumentNumber: "TSH_GZ_TG-【M24x2 6H】-087", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M24x2 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M24X3 6H", instrumentNumber: "TSH_GZ_TG-【M24X3 6H】-088", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M24X3 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M25X1 6H", instrumentNumber: "TSH_GZ_TG-【M25X1 6H】-089", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M25X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M25X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M25X1.5 6H】-090", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M25X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M26X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M26X0.5 6H】-091", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M26X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M26X1 6H", instrumentNumber: "TSH_GZ_TG-【M26X1 6H】-092", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M26X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M26X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M26X1.5 6H】-093", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M26X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M26X1/36 6H", instrumentNumber: "TSH_GZ_TG-【M26X1/36 6H】-094", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M26X1”36 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M27X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M27X0.5 6H】-095", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M27X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M27X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M27X0.75 6H】-096", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M27X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M28X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M28X0.75 6H】-097", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M28X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M28X1 6H", instrumentNumber: "TSH_GZ_TG-【M28X1 6H】-098", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M28X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M30X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M30X0.75 6H】-099", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M30X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M30X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M30X1.5 6H】-100", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M30X1.5 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M30X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M30X1.5 6H】-100", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M30X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M30X3.5 6H", instrumentNumber: "TSH_GZ_TG-【M30X3.5 6H】-101", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M30X3.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M32X1 6H", instrumentNumber: "TSH_GZ_TG-【M32X1 6H】-102", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M32X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M32X1.25 6H", instrumentNumber: "TSH_GZ_TG-【M32X1.25 6H】-103", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M32X1.25 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M32X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M32X1.5 6H】-104", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M32X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M33X1 6H", instrumentNumber: "TSH_GZ_TG-【M33X1 6H】-105", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M33X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M33X1.5 6G", instrumentNumber: "TSH_GZ_TG-【M33X1.5 6G】-106", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M33X1.5 6G.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M35X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M35X0.5 6H】-107", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M35X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M35X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M35X0.75 6H】-108", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M35X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M36X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M36X0.5 6H】-109", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M36X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M36X1 6H", instrumentNumber: "TSH_GZ_TG-【M36X1 6H】-110", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M36X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M36X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M36X1.5 6H】-111", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M36X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M37X1 6H", instrumentNumber: "TSH_GZ_TG-【M37X1 6H】-112", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M37X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M38X2.5 6H", instrumentNumber: "TSH_GZ_TG-【M38X2.5 6H】-113", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M38X2.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M39X2 6H", instrumentNumber: "TSH_GZ_TG-【M39X2 6H】-114", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M39X2 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M40X1.5 4H", instrumentNumber: "TSH_GZ_TG-【M40X1.5 4H】-115", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M40X1.5 4H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M40X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M40X1.5 6H】-116", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M40X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M41X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M41X0.75 6H】-117", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M41X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M42X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M42X1.5 6H】-118", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M42X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M43X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M43X0.75 6H】-119", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M43X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M44X1 6H", instrumentNumber: "TSH_GZ_TG-【M44X1 6H】-120", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M44X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M44X2 6H", instrumentNumber: "TSH_GZ_TG-【M44X2 6H】-121", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M44X2 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M45X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M45X1.5 6H】-122", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M45X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M48X1 6H", instrumentNumber: "TSH_GZ_TG-【M48X1 6H】-123", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M48X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M48X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M48X1.5 6H】-124", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M48X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M48X2 6H", instrumentNumber: "TSH_GZ_TG-【M48X2 6H】-125", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M48X2 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M50X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M50X0.75 6H】-126", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M50X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M50X1 6H", instrumentNumber: "TSH_GZ_TG-【M50X1 6H】-127", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M50X1 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M50X1.25 6H", instrumentNumber: "TSH_GZ_TG-【M50X1.25 6H】-128", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M50X1.25 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M50X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M50X1.5 6H】-129", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M50X1.5 6H(1).jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M50X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M50X1.5 6H】-129", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M50X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M50X2 6H", instrumentNumber: "TSH_GZ_TG-【M50X2 6H】-130", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M50X2 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M57X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M57X0.5 6H】-131", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M57X0.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M60X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M60X0.75 6H】-132", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M60X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M60X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M60X1.5 6H】-133", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M60X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M62X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M62X0.75 6H】-134", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M62X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M65X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M65X1.5 6H】-135", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M65X1.5 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M68X2 6H", instrumentNumber: "TSH_GZ_TG-【M68X2 6H】-136", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M68X2 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M69X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M69X0.75 6H】-137", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M69X0.75 6H.jpg", status: "valid" },
{ type: "公制内螺纹牙规", fileName: "M95X2 6H", instrumentNumber: "TSH_GZ_TG-【M95X2 6H】-138", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M95X2 6H.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M1.4X0.3 6g", instrumentNumber: "TSH_GZ_TR-【M1.4X0.3 6g】-001", imagePath: "螺纹规清单/公制外螺纹环规清单表/M1.4X0.3 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M1.6X0.35 6g", instrumentNumber: "TSH_GZ_TR-【M1.6X0.35 6g】-002", imagePath: "螺纹规清单/公制外螺纹环规清单表/M1.6X0.35 6g(1).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M1.6X0.35 6g", instrumentNumber: "TSH_GZ_TR-【M1.6X0.35 6g】-002", imagePath: "螺纹规清单/公制外螺纹环规清单表/M1.6X0.35 6g(2).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M1.6X0.35 6g", instrumentNumber: "TSH_GZ_TR-【M1.6X0.35 6g】-002", imagePath: "螺纹规清单/公制外螺纹环规清单表/M1.6X0.35 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M2.5X0.45 6g", instrumentNumber: "TSH_GZ_TR-【M2.5X0.45 6g】-003", imagePath: "螺纹规清单/公制外螺纹环规清单表/M2.5X0.45 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M2X0.4 6g", instrumentNumber: "TSH_GZ_TR-【M2X0.4 6g】-004", imagePath: "螺纹规清单/公制外螺纹环规清单表/M2X0.4 6g(1).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M2X0.4 6g", instrumentNumber: "TSH_GZ_TR-【M2X0.4 6g】-004", imagePath: "螺纹规清单/公制外螺纹环规清单表/M2X0.4 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M3X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M3X0.5 6g】-005", imagePath: "螺纹规清单/公制外螺纹环规清单表/M3X0.5 6g(1).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M3X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M3X0.5 6g】-005", imagePath: "螺纹规清单/公制外螺纹环规清单表/M3X0.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M3X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M3X0.5 6g】-005", imagePath: "螺纹规清单/公制外螺纹环规清单表/M3X0.5 6g（2）.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M4.5X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M4.5X0.5 6g】-006", imagePath: "螺纹规清单/公制外螺纹环规清单表/M4.5X0.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M4X0.7 6g", instrumentNumber: "TSH_GZ_TR-【M4X0.7 6g】-007", imagePath: "螺纹规清单/公制外螺纹环规清单表/M4X0.7 6g(1).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M4X0.7 6g", instrumentNumber: "TSH_GZ_TR-【M4X0.7 6g】-007", imagePath: "螺纹规清单/公制外螺纹环规清单表/M4X0.7 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M5X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M5X0.5 6g】-008", imagePath: "螺纹规清单/公制外螺纹环规清单表/M5X0.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M5X0.8 6g", instrumentNumber: "TSH_GZ_TR-【M5X0.8 6g】-009", imagePath: "螺纹规清单/公制外螺纹环规清单表/M5X0.8 6g(1).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M5X0.8 6g", instrumentNumber: "TSH_GZ_TR-【M5X0.8 6g】-009", imagePath: "螺纹规清单/公制外螺纹环规清单表/M5X0.8 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M6X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M6X0.5 6g】-010", imagePath: "螺纹规清单/公制外螺纹环规清单表/M6X0.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M6X1 6g", instrumentNumber: "TSH_GZ_TR-【M6X1 6g】-011", imagePath: "螺纹规清单/公制外螺纹环规清单表/M6X1 6g(1).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M6X1 6g", instrumentNumber: "TSH_GZ_TR-【M6X1 6g】-011", imagePath: "螺纹规清单/公制外螺纹环规清单表/M6X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M6X1 LH 6g", instrumentNumber: "TSH_GZ_TR-【M6X1 LH 6g】-012", imagePath: "螺纹规清单/公制外螺纹环规清单表/M6X1 LH 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M7.5X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M7.5X0.5 6g】-013", imagePath: "螺纹规清单/公制外螺纹环规清单表/M7.5X0.5 6g.png", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M7X1 6g", instrumentNumber: "TSH_GZ_TR-【M7X1 6g】-014", imagePath: "螺纹规清单/公制外螺纹环规清单表/M7X1 6g(1).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M7X1 6g", instrumentNumber: "TSH_GZ_TR-【M7X1 6g】-014", imagePath: "螺纹规清单/公制外螺纹环规清单表/M7X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M8X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M8X0.5 6g】-015", imagePath: "螺纹规清单/公制外螺纹环规清单表/M8X0.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M8X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M8X0.75 6g】-016", imagePath: "螺纹规清单/公制外螺纹环规清单表/M8X0.75 6g(1).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M8X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M8X0.75 6g】-016", imagePath: "螺纹规清单/公制外螺纹环规清单表/M8X0.75 6g(2).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M8X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M8X0.75 6g】-016", imagePath: "螺纹规清单/公制外螺纹环规清单表/M8X0.75 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M8X1 6g", instrumentNumber: "TSH_GZ_TR-【M8X1 6g】-017", imagePath: "螺纹规清单/公制外螺纹环规清单表/M8X1 6g(1).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M8X1 6g", instrumentNumber: "TSH_GZ_TR-【M8X1 6g】-017", imagePath: "螺纹规清单/公制外螺纹环规清单表/M8X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M8X1.25 6g", instrumentNumber: "TSH_GZ_TR-【M8X1.25 6g】-018", imagePath: "螺纹规清单/公制外螺纹环规清单表/M8X1.25 6g(1).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M8X1.25 6g", instrumentNumber: "TSH_GZ_TR-【M8X1.25 6g】-018", imagePath: "螺纹规清单/公制外螺纹环规清单表/M8X1.25 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M8X1.25 LH 6g", instrumentNumber: "TSH_GZ_TR-【M8X1.25 LH 6g】-019", imagePath: "螺纹规清单/公制外螺纹环规清单表/M8X1.25 LH 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M9X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M9X0.5 6g】-020", imagePath: "螺纹规清单/公制外螺纹环规清单表/M9X0.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M10X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M10X0.5 6g】-021", imagePath: "螺纹规清单/公制外螺纹环规清单表/M10X0.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M10X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M10X0.75 6g】-022", imagePath: "螺纹规清单/公制外螺纹环规清单表/M10X0.75 6g.png", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M10X1 6g", instrumentNumber: "TSH_GZ_TR-【M10X1 6g】-023", imagePath: "螺纹规清单/公制外螺纹环规清单表/M10X1 6g(1).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M10X1 6g", instrumentNumber: "TSH_GZ_TR-【M10X1 6g】-023", imagePath: "螺纹规清单/公制外螺纹环规清单表/M10X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M10X1.25 6g", instrumentNumber: "TSH_GZ_TR-【M10X1.25 6g】-024", imagePath: "螺纹规清单/公制外螺纹环规清单表/M10X1.25 6g(1).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M10X1.25 6g", instrumentNumber: "TSH_GZ_TR-【M10X1.25 6g】-024", imagePath: "螺纹规清单/公制外螺纹环规清单表/M10X1.25 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M10X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M10X1.5 6g】-025", imagePath: "螺纹规清单/公制外螺纹环规清单表/M10X1.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M11X1 6g", instrumentNumber: "TSH_GZ_TR-【M11X1 6g】-026", imagePath: "螺纹规清单/公制外螺纹环规清单表/M11X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M12X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M12X0.5 6g】-027", imagePath: "螺纹规清单/公制外螺纹环规清单表/M12X0.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M12X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M12X0.75 6g】-028", imagePath: "螺纹规清单/公制外螺纹环规清单表/M12X0.75 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M12X1 6g", instrumentNumber: "TSH_GZ_TR-【M12X1 6g】-029", imagePath: "螺纹规清单/公制外螺纹环规清单表/M12X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M12X1.25 6g", instrumentNumber: "TSH_GZ_TR-【M12X1.25 6g】-030", imagePath: "螺纹规清单/公制外螺纹环规清单表/M12X1.25 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M12X1.5 LH 6g", instrumentNumber: "TSH_GZ_TR-【M12X1.5 LH 6g】-031", imagePath: "螺纹规清单/公制外螺纹环规清单表/M12X1.5 LH 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M12X1.75 6g", instrumentNumber: "TSH_GZ_TR-【M12X1.75 6g】-032", imagePath: "螺纹规清单/公制外螺纹环规清单表/M12X1.75 6g(1).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M12X1.75 6g", instrumentNumber: "TSH_GZ_TR-【M12X1.75 6g】-032", imagePath: "螺纹规清单/公制外螺纹环规清单表/M12X1.75 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M12X1.75 LH 6g", instrumentNumber: "TSH_GZ_TR-【M12X1.75 LH 6g】-033", imagePath: "螺纹规清单/公制外螺纹环规清单表/M12X1.75 LH 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M13X1 6g", instrumentNumber: "TSH_GZ_TR-【M13X1 6g】-034", imagePath: "螺纹规清单/公制外螺纹环规清单表/M13X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M14X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M14X0.5 6g】-035", imagePath: "螺纹规清单/公制外螺纹环规清单表/M14X0.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M14X1 6g", instrumentNumber: "TSH_GZ_TR-【M14X1 6g】-036", imagePath: "螺纹规清单/公制外螺纹环规清单表/M14X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M14X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M14X1.5 6g】-037", imagePath: "螺纹规清单/公制外螺纹环规清单表/M14X1.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M14X2 6g", instrumentNumber: "TSH_GZ_TR-【M14X2 6g】-038", imagePath: "螺纹规清单/公制外螺纹环规清单表/M14X2 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M15X0.5 4h", instrumentNumber: "TSH_GZ_TR-【M15X0.5 4h】-039", imagePath: "螺纹规清单/公制外螺纹环规清单表/M15X0.5 4h.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M15X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M15X0.5 6g】-040", imagePath: "螺纹规清单/公制外螺纹环规清单表/M15X0.5 6g.png", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M15X1 6g", instrumentNumber: "TSH_GZ_TR-【M15X1 6g】-041", imagePath: "螺纹规清单/公制外螺纹环规清单表/M15X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M16X1 6g", instrumentNumber: "TSH_GZ_TR-【M16X1 6g】-042", imagePath: "螺纹规清单/公制外螺纹环规清单表/M16X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M16X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M16X1.5 6g】-043", imagePath: "螺纹规清单/公制外螺纹环规清单表/M16X1.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M16X2 6g", instrumentNumber: "TSH_GZ_TR-【M16X2 6g】-044", imagePath: "螺纹规清单/公制外螺纹环规清单表/M16X2 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M17X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M17X0.5 6g】-045", imagePath: "螺纹规清单/公制外螺纹环规清单表/M17X0.5 6g(1).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M17X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M17X0.5 6g】-045", imagePath: "螺纹规清单/公制外螺纹环规清单表/M17X0.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M17X1 6g", instrumentNumber: "TSH_GZ_TR-【M17X1 6g】-046", imagePath: "螺纹规清单/公制外螺纹环规清单表/M17X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M18X1 6g", instrumentNumber: "TSH_GZ_TR-【M18X1 6g】-047", imagePath: "螺纹规清单/公制外螺纹环规清单表/M18X1 6g(1).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M18X1 6g", instrumentNumber: "TSH_GZ_TR-【M18X1 6g】-047", imagePath: "螺纹规清单/公制外螺纹环规清单表/M18X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M18X2.5 6g", instrumentNumber: "TSH_GZ_TR-【M18X2.5 6g】-048", imagePath: "螺纹规清单/公制外螺纹环规清单表/M18X2.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M20X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M20X0.5 6g】-049", imagePath: "螺纹规清单/公制外螺纹环规清单表/M20X0.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M20X1 6g", instrumentNumber: "TSH_GZ_TR-【M20X1 6g】-050", imagePath: "螺纹规清单/公制外螺纹环规清单表/M20X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M20X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M20X1.5 6g】-051", imagePath: "螺纹规清单/公制外螺纹环规清单表/M20X1.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M20X2.5 6g", instrumentNumber: "TSH_GZ_TR-【M20X2.5 6g】-052", imagePath: "螺纹规清单/公制外螺纹环规清单表/M20X2.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M21X1 6g", instrumentNumber: "TSH_GZ_TR-【M21X1 6g】-053", imagePath: "螺纹规清单/公制外螺纹环规清单表/M21X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M22X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M22X0.5 6g】-054", imagePath: "螺纹规清单/公制外螺纹环规清单表/M22X0.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M22X1 6g", instrumentNumber: "TSH_GZ_TR-【M22X1 6g】-055", imagePath: "螺纹规清单/公制外螺纹环规清单表/M22X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M22X1.25 6g", instrumentNumber: "TSH_GZ_TR-【M22X1.25 6g】-056", imagePath: "螺纹规清单/公制外螺纹环规清单表/M22X1.25 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M22X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M22X1.5 6g】-057", imagePath: "螺纹规清单/公制外螺纹环规清单表/M22X1.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M22X2 6g", instrumentNumber: "TSH_GZ_TR-【M22X2 6g】-058", imagePath: "螺纹规清单/公制外螺纹环规清单表/M22X2 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M22X2.5 6g", instrumentNumber: "TSH_GZ_TR-【M22X2.5 6g】-059", imagePath: "螺纹规清单/公制外螺纹环规清单表/M22X2.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M23X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M23X1.5 6g】-060", imagePath: "螺纹规清单/公制外螺纹环规清单表/M23X1.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M24X1 6g", instrumentNumber: "TSH_GZ_TR-【M24X1 6g】-061", imagePath: "螺纹规清单/公制外螺纹环规清单表/M24X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M24X2 6g", instrumentNumber: "TSH_GZ_TR-【M24X2 6g】-062", imagePath: "螺纹规清单/公制外螺纹环规清单表/M24X2 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M24X3 6g", instrumentNumber: "TSH_GZ_TR-【M24X3 6g】-063", imagePath: "螺纹规清单/公制外螺纹环规清单表/M24X3 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M25X1 6g", instrumentNumber: "TSH_GZ_TR-【M25X1 6g】-064", imagePath: "螺纹规清单/公制外螺纹环规清单表/M25X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M25X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M25X1.5 6g】-065", imagePath: "螺纹规清单/公制外螺纹环规清单表/M25X1.5 6g(1).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M25X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M25X1.5 6g】-065", imagePath: "螺纹规清单/公制外螺纹环规清单表/M25X1.5 6g(2).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M25X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M25X1.5 6g】-065", imagePath: "螺纹规清单/公制外螺纹环规清单表/M25X1.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M27X1 6g", instrumentNumber: "TSH_GZ_TR-【M27X1 6g】-066", imagePath: "螺纹规清单/公制外螺纹环规清单表/M27X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M28X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M28X0.75 6g】-067", imagePath: "螺纹规清单/公制外螺纹环规清单表/M28X0.75 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M28X1 6g", instrumentNumber: "TSH_GZ_TR-【M28X1 6g】-068", imagePath: "螺纹规清单/公制外螺纹环规清单表/M28X1 6g.png", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M28X1.5 LH 6g", instrumentNumber: "TSH_GZ_TR-【M28X1.5 LH 6g】-069", imagePath: "螺纹规清单/公制外螺纹环规清单表/M28X1.5 LH 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M30X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M30X1.5 6g】-070", imagePath: "螺纹规清单/公制外螺纹环规清单表/M30X1.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M30X2 6g", instrumentNumber: "TSH_GZ_TR-【M30X2 6g】-071", imagePath: "螺纹规清单/公制外螺纹环规清单表/M30X2 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M30X3 6g", instrumentNumber: "TSH_GZ_TR-【M30X3 6g】-072", imagePath: "螺纹规清单/公制外螺纹环规清单表/M30X3 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M30X3.5 6g", instrumentNumber: "TSH_GZ_TR-【M30X3.5 6g】-073", imagePath: "螺纹规清单/公制外螺纹环规清单表/M30X3.5 6g(1).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M30X3.5 6g", instrumentNumber: "TSH_GZ_TR-【M30X3.5 6g】-073", imagePath: "螺纹规清单/公制外螺纹环规清单表/M30X3.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M31X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M31X0.75 6g】-074", imagePath: "螺纹规清单/公制外螺纹环规清单表/M31X0.75 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M32X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M32X1.5 6g】-075", imagePath: "螺纹规清单/公制外螺纹环规清单表/M32X1.5 6g(1).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M32X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M32X1.5 6g】-075", imagePath: "螺纹规清单/公制外螺纹环规清单表/M32X1.5 6g(2).jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M32X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M32X1.5 6g】-075", imagePath: "螺纹规清单/公制外螺纹环规清单表/M32X1.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M33X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M33X1.5 6g】-076", imagePath: "螺纹规清单/公制外螺纹环规清单表/M33X1.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M33X3.5 6g", instrumentNumber: "TSH_GZ_TR-【M33X3.5 6g】-077", imagePath: "螺纹规清单/公制外螺纹环规清单表/M33X3.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M34X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M34X0.5 6g】-078", imagePath: "螺纹规清单/公制外螺纹环规清单表/M34X0.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M35X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M35X1.5 6g】-079", imagePath: "螺纹规清单/公制外螺纹环规清单表/M35X1.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M36X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M36X0.75 6g】-080", imagePath: "螺纹规清单/公制外螺纹环规清单表/M36X0.75 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M36X1 6g", instrumentNumber: "TSH_GZ_TR-【M36X1 6g】-081", imagePath: "螺纹规清单/公制外螺纹环规清单表/M36X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M36X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M36X1.5 6g】-082", imagePath: "螺纹规清单/公制外螺纹环规清单表/M36X1.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M36X3 6g", instrumentNumber: "TSH_GZ_TR-【M36X3 6g】-083", imagePath: "螺纹规清单/公制外螺纹环规清单表/M36X3 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M37X1 6g", instrumentNumber: "TSH_GZ_TR-【M37X1 6g】-084", imagePath: "螺纹规清单/公制外螺纹环规清单表/M37X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M37X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M37X1.5 6g】-085", imagePath: "螺纹规清单/公制外螺纹环规清单表/M37X1.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M38X2.5 6g", instrumentNumber: "TSH_GZ_TR-【M38X2.5 6g】-086", imagePath: "螺纹规清单/公制外螺纹环规清单表/M38X2.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M41X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M41X0.75 6g】-087", imagePath: "螺纹规清单/公制外螺纹环规清单表/M41X0.75 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M42X4.5 6g", instrumentNumber: "TSH_GZ_TR-【M42X4.5 6g】-088", imagePath: "螺纹规清单/公制外螺纹环规清单表/M42X4.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M44X1 6g", instrumentNumber: "TSH_GZ_TR-【M44X1 6g】-089", imagePath: "螺纹规清单/公制外螺纹环规清单表/M44X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M44X2 6g", instrumentNumber: "TSH_GZ_TR-【M44X2 6g】-090", imagePath: "螺纹规清单/公制外螺纹环规清单表/M44X2 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M45X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M45X1.5 6g】-091", imagePath: "螺纹规清单/公制外螺纹环规清单表/M45X1.5 6g.png", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M45X2 6g", instrumentNumber: "TSH_GZ_TR-【M45X2 6g】-092", imagePath: "螺纹规清单/公制外螺纹环规清单表/M45X2 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M46X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M46X0.5 6g】-093", imagePath: "螺纹规清单/公制外螺纹环规清单表/M46X0.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M46X1 6g", instrumentNumber: "TSH_GZ_TR-【M46X1 6g】-094", imagePath: "螺纹规清单/公制外螺纹环规清单表/M46X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M48X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M48X0.75 6g】-095", imagePath: "螺纹规清单/公制外螺纹环规清单表/M48X0.75 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M48X2 6g", instrumentNumber: "TSH_GZ_TR-【M48X2 6g】-096", imagePath: "螺纹规清单/公制外螺纹环规清单表/M48X2 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M52X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M52X0.75 6g】-097", imagePath: "螺纹规清单/公制外螺纹环规清单表/M52X0.75 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M52X1 6g", instrumentNumber: "TSH_GZ_TR-【M52X1 6g】-098", imagePath: "螺纹规清单/公制外螺纹环规清单表/M52X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M54X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M54X1.5 6g】-099", imagePath: "螺纹规清单/公制外螺纹环规清单表/M54X1.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M56X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M56X0.75 6g】-100", imagePath: "螺纹规清单/公制外螺纹环规清单表/M56X0.75 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M58X1 6g", instrumentNumber: "TSH_GZ_TR-【M58X1 6g】-101", imagePath: "螺纹规清单/公制外螺纹环规清单表/M58X1 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M58X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M58X1.5 6g】-102", imagePath: "螺纹规清单/公制外螺纹环规清单表/M58X1.5 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M60X2 6g", instrumentNumber: "TSH_GZ_TR-【M60X2 6g】-103", imagePath: "螺纹规清单/公制外螺纹环规清单表/M60X2 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M65X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M65X0.75 6g】-104", imagePath: "螺纹规清单/公制外螺纹环规清单表/M65X0.75 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M65X2 6g", instrumentNumber: "TSH_GZ_TR-【M65X2 6g】-105", imagePath: "螺纹规清单/公制外螺纹环规清单表/M65X2 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M66X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M66X0.75 6g】-106", imagePath: "螺纹规清单/公制外螺纹环规清单表/M66X0.75 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M68X2 6g", instrumentNumber: "TSH_GZ_TR-【M68X2 6g】-107", imagePath: "螺纹规清单/公制外螺纹环规清单表/M68X2 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M77X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M77X0.75 6g】-108", imagePath: "螺纹规清单/公制外螺纹环规清单表/M77X0.75 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M78X2 6g", instrumentNumber: "TSH_GZ_TR-【M78X2 6g】-109", imagePath: "螺纹规清单/公制外螺纹环规清单表/M78X2 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M80X2 6g", instrumentNumber: "TSH_GZ_TR-【M80X2 6g】-110", imagePath: "螺纹规清单/公制外螺纹环规清单表/M80X2 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M80X2 LH 6g", instrumentNumber: "TSH_GZ_TR-【M80X2 LH 6g】-111", imagePath: "螺纹规清单/公制外螺纹环规清单表/M80X2 LH 6g.jpg", status: "valid" },
{ type: "公制外螺纹环规", fileName: "M90X1 6g", instrumentNumber: "TSH_GZ_TR-【M90X1 6g】-112", imagePath: "螺纹规清单/公制外螺纹环规清单表/M90X1 6g.jpg", status: "valid" }
];

// 提取M编号
function extractMNumber(fileName) {
    const m = fileName.match(/M(\d+)/);
    return m ? parseInt(m[1]) : 0;
}

// 状态样式映射
function statusHTML(status) {
    if (status === 'valid') {
        return '<span class="status-valid"><i class="fas fa-check-circle"></i> 有效</span>';
    } else {
        return '<span class="status-invalid"><i class="fas fa-times-circle"></i> 无效</span>';
    }
}

// ✅ 全局：当前正在显示的数据集
let currentData = [];

// 渲染表格 + 更新计数器
function renderTable(data) {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    // 排序：公制按M编号，其他按类型
    const sorted = [...data].sort((a, b) => {
        if (a.type.includes("公制") && b.type.includes("公制")) {
            return extractMNumber(a.fileName) - extractMNumber(b.fileName);
        }
        return a.type.localeCompare(b.type);
    });

    sorted.forEach((item, idx) => {
        const tr = document.createElement('tr');
        if (item.status === 'invalid') tr.classList.add('row-invalid');

        const isMetric = item.type.includes("公制");
        const nameDisplay = isMetric
            ? `<span style="color:#b21f1f;font-weight:bold;">${item.fileName}</span>`
            : item.fileName;

        let actionCell;
        if (item.status === 'valid') {
            actionCell = `<button class="view-btn" data-idx="${idx}"><i class="fas fa-eye"></i> <span>查看图片</span></button>`;
        } else {
            actionCell = `<span class="text-muted"><i class="fas fa-image-slash"></i> 图片已删除</span>`;
        }

        tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>${item.type}</td>
            <td>${nameDisplay}</td>
            <td>${item.instrumentNumber}</td>
            <td>${statusHTML(item.status)}</td>
            <td>${actionCell}</td>
        `;
        tbody.appendChild(tr);
    });

    // ✅ 计数器基于当前传入的数据计算
    const validCount   = data.filter(d => d.status === 'valid').length;
    const invalidCount = data.filter(d => d.status === 'invalid').length;
    const totalCount   = data.length;

    document.getElementById('total-counter').textContent  = validCount;
    document.getElementById('invalid-counter').textContent = invalidCount;
    document.getElementById('all-counter').textContent    = totalCount;

    // 绑定查看按钮
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-idx'));
            showImageModal(sorted[idx]);
        });
    });
}

// 显示图片模态框
function showImageModal(item) {
    const modal = document.getElementById('image-modal');
    const img = document.getElementById('modal-image');
    const title = document.getElementById('image-title');
    img.src = item.imagePath;
    title.textContent = `${item.type} - ${item.fileName}`;
    modal.style.display = 'flex';
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')}`;
    const ud = document.getElementById('update-date');
    if (ud) ud.textContent = dateStr;

    // ✅ 初始化当前数据集
    currentData = [...gaugeData];
    renderTable(currentData);

    // ✅ 类型筛选
    const typeFilter = document.getElementById('type-filter');
    if (typeFilter) {
        typeFilter.addEventListener('change', function() {
            const v = this.value;
            if (v === 'all') {
                currentData = [...gaugeData];
            } else {
                currentData = gaugeData.filter(d => d.type === v);
            }
            renderTable(currentData);
        });
    }

    // ✅ 状态筛选
    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            const v = this.value;
            if (v === 'all') {
                currentData = [...gaugeData];
            } else if (v === 'valid') {
                currentData = gaugeData.filter(d => d.status === 'valid');
            } else {
                currentData = gaugeData.filter(d => d.status === 'invalid');
            }
            renderTable(currentData);
        });
    }

    // ✅ 搜索（基于当前筛选结果再过滤）
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const term = this.value.toLowerCase().trim();
            if (!term) {
                renderTable(currentData);
                return;
            }
            const filtered = currentData.filter(d =>
                d.fileName.toLowerCase().includes(term) ||
                d.instrumentNumber.toLowerCase().includes(term)
            );
            renderTable(filtered);
        });
    }

    // 关闭模态框
    const cb = document.querySelector('.close-btn');
    if (cb) cb.addEventListener('click', () => { document.getElementById('image-modal').style.display='none'; });
    const modal = document.getElementById('image-modal');
    if (modal) modal.addEventListener('click', function(e) { if(e.target===this) this.style.display='none'; });
});
