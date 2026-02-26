// ================= 添加返回首页按钮 (强制当前窗口跳转) =================
(function() {
    // 防止重复添加
    if (document.getElementById('home-nav-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'home-nav-btn';
    btn.innerHTML = '🏠 返回首页';
    
    // 样式设置
    btn.style.cssText = `
        position: fixed;
        bottom: 50px;
        right: 20px;
        background: #2563eb;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 6px;
        user-select: none; /* 防止文字被选中 */
        -webkit-user-select: none;
    `;

    // 悬停效果
    btn.onmouseover = () => {
        btn.style.background = '#1d4ed8';
        btn.style.transform = 'translateY(-3px)';
        btn.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.4)';
    };
    btn.onmouseout = () => {
        btn.style.background = '#2563eb';
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
    };

    // 点击事件：强制在当前窗口跳转
    btn.onclick = () => {
        // 计算 index.html 的路径
        const path = window.location.pathname;
        const lastSlashIndex = path.lastIndexOf('/');
        // 如果在根目录，直接去 index.html；如果在子目录，去上一级的 index.html
        const basePath = lastSlashIndex > 0 ? path.substring(0, lastSlashIndex + 1) : '';
        
        // 使用 replace 方法：在当前窗口跳转，且不保留历史记录（体验更流畅）
        // 如果希望保留历史记录（允许用户点后退回来），可以改回 window.location.href
        const targetUrl = basePath + 'index.html';
        
        console.log("正在跳转至:", targetUrl);
        window.location.replace(targetUrl); 
    };

    document.body.appendChild(btn);
})();
// 禁用右键菜单
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    
    // 移除可能已存在的提示框
    removeExistingTooltip();
    
    // 随机选择一个友好的右键提示
    const rightClickMessages = [
        "👋 嘿，这里没有隐藏菜单哦！",
        "✨ 这个区域有点害羞，不喜欢被右键点击呢~",
        "🎯 哎呀，这个操作在这里不适用哦！",
        "💫 这里没有什么特别的，继续浏览吧！",
        "🌸 好奇的探索者，试试其他操作吧！",
        "🎨 创意保护模式已开启，无法使用右键~"
    ];
    
    const randomMsg = rightClickMessages[Math.floor(Math.random() * rightClickMessages.length)];
    showTooltip(randomMsg, e.clientX, e.clientY);
    return false;
});

// 禁用所有查看源码的快捷键和方式
document.addEventListener('keydown', function(e) {
    // 检测是否按下了功能键或组合键
    let shouldPrevent = false;
    let message = "";
    
    // Windows/Linux 系统快捷键
    if (e.key === 'F12') {
        shouldPrevent = true;
        message = "🔍 这个按键在这里有其他用途哦！";
    }
    
    // Ctrl+U (查看源代码)
    if (e.ctrlKey && e.key === 'u') {
        shouldPrevent = true;
        message = "🔮 源代码是魔法师的秘密，暂时不能公开哦！";
    }
    
    // Ctrl+Shift+I (开发者工具)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        shouldPrevent = true;
        message = "🎪 这个组合键会召唤小精灵，但今天它们休息了~";
    }
    
    // Ctrl+Shift+J (控制台)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        shouldPrevent = true;
        message = "📝 这个快捷键正在参加茶话会，晚点再来试试~";
    }
    
    // Ctrl+Shift+C (检查元素)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        shouldPrevent = true;
        message = "🎨 这个功能正在创作新作品，稍后再来查看~";
    }
    
    // macOS 系统快捷键
    // Command+Option+U (查看源代码)
    if ((e.metaKey || e.ctrlKey) && e.altKey && e.key === 'U') {
        shouldPrevent = true;
        message = "🔮 源代码是魔法师的秘密，暂时不能公开哦！";
    }
    
    // Command+Option+I (开发者工具)
    if ((e.metaKey || e.ctrlKey) && e.altKey && e.key === 'I') {
        shouldPrevent = true;
        message = "🎪 这个组合键会召唤小精灵，但今天它们休息了~";
    }
    
    // Command+Option+C (检查元素)
    if ((e.metaKey || e.ctrlKey) && e.altKey && e.key === 'C') {
        shouldPrevent = true;
        message = "🎨 这个功能正在创作新作品，稍后再来查看~";
    }
    
    // Firefox on macOS - Command+U
    if ((e.metaKey || e.ctrlKey) && e.key === 'u') {
        shouldPrevent = true;
        message = "🔮 源代码是魔法师的秘密，暂时不能公开哦！";
    }
    
    // 开发者工具中的搜索文件功能
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        shouldPrevent = true;
        message = "🔎 搜索功能暂时无法使用，请稍后再试~";
    }
    
    // 阻止通过菜单打开开发者工具的快捷键
    if (e.altKey && e.key === 'F') {
        // 这是文件菜单的快捷键，在某些浏览器中可能用于打开开发者工具
        setTimeout(() => {
            // 检查是否打开了开发者工具
            checkDevTools();
        }, 100);
    }
    
    if (shouldPrevent) {
        e.preventDefault();
        e.stopPropagation();
        removeExistingTooltip();
        showTooltip(message, window.innerWidth / 2, window.innerHeight / 3);
        return false;
    }
});

// 防止通过地址栏输入view-source:访问
const hrefDescriptor = Object.getOwnPropertyDescriptor(Location.prototype, 'href');
if (hrefDescriptor && hrefDescriptor.set) {
    const originalHrefSetter = hrefDescriptor.set;
    Object.defineProperty(Location.prototype, 'href', {
        set: function(value) {
            if (value && value.toString().startsWith('view-source:')) {
                removeExistingTooltip();
                showTooltip("🔮 源代码是魔法师的秘密，暂时不能公开哦！", window.innerWidth / 2, window.innerHeight / 3);
                return; // 阻止跳转
            }
            originalHrefSetter.call(this, value);
        }
    });
}

// 防止通过书签打开view-source
document.addEventListener('DOMContentLoaded', function() {
    // 检查当前URL是否是view-source
    if (window.location.protocol === 'view-source:') {
        window.location.href = '/'; // 重定向到首页
    }
});

// 防止通过浏览器菜单打开开发者工具
let devToolsOpen = false;
function checkDevTools() {
    const widthThreshold = window.outerWidth - window.innerWidth > 200;
    const heightThreshold = window.outerHeight - window.innerHeight > 200;
    
    if (widthThreshold || heightThreshold) {
        if (!devToolsOpen) {
            devToolsOpen = true;
            removeExistingTooltip();
            showTooltip("🔄 页面需要刷新以保持最佳体验~", window.innerWidth / 2, window.innerHeight / 3);
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    } else {
        devToolsOpen = false;
    }
}

// 定期检查开发者工具状态
setInterval(checkDevTools, 1000);

// 阻止通过JavaScript控制台执行代码
(function() {
    // 重写console方法
    const consoleMethods = ['log', 'warn', 'error', 'info', 'debug'];
    consoleMethods.forEach(method => {
        const original = console[method];
        console[method] = function() {
            // 可以记录日志或执行其他操作
            // 但不阻止实际输出，以免引起怀疑
            original.apply(console, arguments);
        };
    });
    
    // 防止通过控制台重写这些保护措施
    Object.defineProperty(window, 'addEventListener', {
        value: window.addEventListener,
        writable: false,
        configurable: false
    });
    
    Object.defineProperty(document, 'addEventListener', {
        value: document.addEventListener,
        writable: false,
        configurable: false
    });
})();

// 显示提示框的函数
function showTooltip(message, x, y) {
    // 创建提示框元素
    const tooltip = document.createElement('div');
    tooltip.id = 'friendly-tooltip';
    tooltip.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        background: rgba(0, 0, 0, 0.85);
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 280px;
        text-align: center;
        animation: fadeInOut 3s ease-in-out forwards;
        transform: translate(-50%, -100%);
        margin-top: -10px;
    `;
    
    // 添加小三角形指示器
    tooltip.innerHTML = `
        ${message}
        <div style="
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid rgba(0, 0, 0, 0.85);
        "></div>
    `;
    
    // 添加动画样式
    const style = document.createElement('style');
    if (!document.getElementById('tooltip-animation')) {
        style.id = 'tooltip-animation';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -100%) scale(0.8); }
                15% { opacity: 1; transform: translate(-50%, -100%) scale(1); }
                85% { opacity: 1; transform: translate(-50%, -100%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -100%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(tooltip);
    
    // 3秒后自动移除提示框
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
        }
    }, 3000);
}

// 移除已存在的提示框
function removeExistingTooltip() {
    const existingTooltip = document.getElementById('friendly-tooltip');
    if (existingTooltip) {
        existingTooltip.parentNode.removeChild(existingTooltip);
    }
}

// 可选：添加一个友好的提示，说明页面有保护
window.addEventListener('load', function() {
    console.log("🔒 创意保护模式已激活 - 享受安全浏览体验！");
            // 1. 创建“返回首页”按钮容器
            const homeBtnContainer = document.createElement('div');
            homeBtnContainer.style.cssText = `
                position: fixed;
                bottom: 50px;
                right: 10px;
                z-index: 10001;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                gap: 8px;
            `;

            // 2. 创建“返回首页”按钮
            const homeBtn = document.createElement('button');
            homeBtn.textContent = "🏠 返回首页";
            homeBtn.style.cssText = `
                background: var(--primary-color, #2563eb);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 4px 6px rgba(0,0,0,0.2);
                transition: all 0.2s ease;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                outline: none;
                user-select: none;
            `;
            
            // 按钮悬停效果
            homeBtn.onmouseover = function() {
                this.style.background = 'var(--primary-hover, #1d4ed8)';
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 6px 8px rgba(0,0,0,0.25)';
            };
            homeBtn.onmouseout = function() {
                this.style.background = 'var(--primary-color, #2563eb)';
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';
            };

            // 按钮点击事件：刷新页面（即回到首页状态）
            homeBtn.onclick = function() {
                window.location.reload();
            }; 
    // 在页面底部添加一个友好的提示
    const footerNote = document.createElement('div');
    footerNote.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 10000;
    `;
    footerNote.textContent = "🔒 安全浏览模式";
    document.body.appendChild(footerNote);
    
    // 防止通过浏览器菜单打开查看源代码
    document.addEventListener('keydown', function(e) {
        // 检测Alt键，因为Alt+F可能会打开文件菜单
        if (e.altKey) {
            // 设置一个标记，稍后检查是否打开了开发者工具
            setTimeout(checkDevTools, 100);
        }
    });
});

const gaugeData = [
{ type: "非公制内螺纹牙规", fileName: "0-80 UNF 2B", instrumentNumber: "TSH_GZ_TG-【0-80 UNF 2B】-001", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/0-80 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "0.210-36(5V1)", instrumentNumber: "TSH_GZ_TG-【0.210-36(5V1)】-002", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/0.210-36(5V1).jpg" },
{ type: "非公制内螺纹牙规", fileName: "0.535-40 UNS 2B", instrumentNumber: "TSH_GZ_TG-【0.535-40 UNS 2B】-003", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/0.535-40 UNS 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1-11 G(BSPP) B", instrumentNumber: "TSH_GZ_TG-【1-11 G(BSPP) B】-004", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-11 G(BSPP)  B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1-11.5 NPT", instrumentNumber: "TSH_GZ_TG-【1-11.5 NPT】-005", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-11.5 NPT.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1-1/4-11 G(BSPP)", instrumentNumber: "TSH_GZ_TG-【1-1/4-11 G(BSPP)】-006", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-1“4-11 G(BSPP).jpg" },
{ type: "非公制内螺纹牙规", fileName: "1-1/4-12 UNF 2B", instrumentNumber: "TSH_GZ_TG-【1-1/4-12 UNF 2B】-007", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-1“4-12 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1-1/2 G(BSPP)", instrumentNumber: "TSH_GZ_TG-【1-1/2 G(BSPP)】-008", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-1”2 G(BSPP).jpg" },
{ type: "非公制内螺纹牙规", fileName: "1-1/2-11 G(BSPP) B", instrumentNumber: "TSH_GZ_TG-【1-1/2-11 G(BSPP) B】-009", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-1”2-11 G(BSPP)  B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1-1/8-12 UNF 2B", instrumentNumber: "TSH_GZ_TG-【1-1/8-12 UNF 2B】-010", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-1”8-12 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1-1/8-20 UN 2B", instrumentNumber: "TSH_GZ_TG-【1-1/8-20 UN 2B】-011", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-1”8-20 UN 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1-32 UNF 2B", instrumentNumber: "TSH_GZ_TG-【1-32 UNF 2B】-012", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-32 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1-3/8-16 UN 2B", instrumentNumber: "TSH_GZ_TG-【1-3/8-16 UN 2B】-013", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-3”8-16 UN 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1-5/16-12 UN 2B", instrumentNumber: "TSH_GZ_TG-【1-5/16-12 UN 2B】-014", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-5”16-12 UN 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1-5/16-12 UNJ 3B", instrumentNumber: "TSH_GZ_TG-【1-5/16-12 UNJ 3B】-015", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-5”16-12 UNJ 3B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1-64 UNC 2B", instrumentNumber: "TSH_GZ_TG-【1-64 UNC 2B】-016", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-64 UNC 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1-72 UNF 2B", instrumentNumber: "TSH_GZ_TG-【1-72 UNF 2B】-017", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-72 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1-7/16-18 UNEF 2B", instrumentNumber: "TSH_GZ_TG-【1-7/16-18 UNEF 2B】-018", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-7”16-18 UNEF 2B(1).jpg" },
{ type: "非公制内螺纹牙规", fileName: "1-7/16-18 UNEF 2B", instrumentNumber: "TSH_GZ_TG-【1-7/16-18 UNEF 2B】-019", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1-7”16-18 UNEF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1.035-40 UNS 2B", instrumentNumber: "TSH_GZ_TG-【1.035-40 UNS 2B】-020", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1.035-40 UNS 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "10-24 UNC 2B", instrumentNumber: "TSH_GZ_TG-【10-24 UNC 2B】-021", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/10-24 UNC 2B(1).jpg" },
{ type: "非公制内螺纹牙规", fileName: "10-24 UNC 2B", instrumentNumber: "TSH_GZ_TG-【10-24 UNC 2B】-022", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/10-24 UNC 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "10-32 UNF 2B", instrumentNumber: "TSH_GZ_TG-【10-32 UNF 2B】-023", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/10-32 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "12-32 UNEF 2B", instrumentNumber: "TSH_GZ_TG-【12-32 UNEF 2B】-024", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/12-32 UNEF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "13.5 PG", instrumentNumber: "TSH_GZ_TG-【13.5 PG】-025", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/13.5 PG.jpg" },
{ type: "非公制内螺纹牙规", fileName: "15/16-16 UN 2B", instrumentNumber: "TSH_GZ_TG-【15/16-16 UN 2B】-026", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/15”16-16 UN 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/16-27 NPT", instrumentNumber: "TSH_GZ_TG-【1/16-27 NPT】-027", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”16-27 NPT.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/2-13 UNC 2B", instrumentNumber: "TSH_GZ_TG-【1/2-13 UNC 2B】-028", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”2-13 UNC 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/2-14 G (BSPP)", instrumentNumber: "TSH_GZ_TG-【1/2-14 G (BSPP)】-029", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”2-14 G (BSPP).jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/2-14 NPT", instrumentNumber: "TSH_GZ_TG-【1/2-14 NPT】-030", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”2-14 NPT.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/2-14 NPTF", instrumentNumber: "TSH_GZ_TG-【1/2-14 NPTF】-031", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”2-14 NPTF.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/2-20 UNF 2B", instrumentNumber: "TSH_GZ_TG-【1/2-20 UNF 2B】-032", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”2-20 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/2-20 UNF 3B", instrumentNumber: "TSH_GZ_TG-【1/2-20 UNF 3B】-033", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”2-20 UNF 3B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/2-28 UNEF 3B", instrumentNumber: "TSH_GZ_TG-【1/2-28 UNEF 3B】-034", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”2-28 UNEF 3B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/4-18 NPT", instrumentNumber: "TSH_GZ_TG-【1/4-18 NPT】-035", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-18 NPT.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/4-19 G (BSPP)", instrumentNumber: "TSH_GZ_TG-【1/4-19 G (BSPP)】-036", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-19 G (BSPP).jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/4-19 RC(PT)", instrumentNumber: "TSH_GZ_TG-【1/4-19 RC(PT)】-037", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-19 RC(PT).jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/4-20 UNC 2B", instrumentNumber: "TSH_GZ_TG-【1/4-20 UNC 2B】-038", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-20 UNC 2B(1).jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/4-20 UNC 2B", instrumentNumber: "TSH_GZ_TG-【1/4-20 UNC 2B】-039", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-20 UNC 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/4-28 UNF 2B", instrumentNumber: "TSH_GZ_TG-【1/4-28 UNF 2B】-040", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-28 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/4-28UNF 2B", instrumentNumber: "TSH_GZ_TG-【1/4-28UNF 2B】-041", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-28UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/4-32UNEF 2B", instrumentNumber: "TSH_GZ_TG-【1/4-32UNEF 2B】-042", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-32UNEF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/4-36 UNS 2B", instrumentNumber: "TSH_GZ_TG-【1/4-36 UNS 2B】-043", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”4-36 UNS 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/8 G (BSPP)", instrumentNumber: "TSH_GZ_TG-【1/8 G (BSPP)】-044", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”8 G (BSPP).jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/8-27 NPT", instrumentNumber: "TSH_GZ_TG-【1/8-27 NPT】-045", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”8-27 NPT.jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/8-28 G (BSPP)", instrumentNumber: "TSH_GZ_TG-【1/8-28 G (BSPP)】-046", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”8-28 G (BSPP).jpg" },
{ type: "非公制内螺纹牙规", fileName: "1/8-28 RC(PT) 2B", instrumentNumber: "TSH_GZ_TG-【1/8-28 RC(PT) 2B】-047", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/1”8-28 RC(PT) 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "2-11 G(BSPP)", instrumentNumber: "TSH_GZ_TG-【2-11 G(BSPP)】-048", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/2-11 G(BSPP)(1).jpg" },
{ type: "非公制内螺纹牙规", fileName: "2-11 G(BSPP)", instrumentNumber: "TSH_GZ_TG-【2-11 G(BSPP)】-049", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/2-11 G(BSPP).jpg" },
{ type: "非公制内螺纹牙规", fileName: "2-12 UN 2B", instrumentNumber: "TSH_GZ_TG-【2-12 UN 2B】-050", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/2-12 UN 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "2-3/4(2.75)-12 UN 2B", instrumentNumber: "TSH_GZ_TG-【2-3/4(2.75)-12 UN 2B】-051", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/2-3“4(2.75)-12 UN 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "2-3/8-16 UN 2B", instrumentNumber: "TSH_GZ_TG-【2-3/8-16 UN 2B】-052", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/2-3”8-16 UN 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "2-56 UNC 2B", instrumentNumber: "TSH_GZ_TG-【2-56 UNC 2B】-053", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/2-56 UNC 2B(1).jpg" },
{ type: "非公制内螺纹牙规", fileName: "2-56 UNC 2B", instrumentNumber: "TSH_GZ_TG-【2-56 UNC 2B】-054", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/2-56 UNC 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "2-64 UNF 2B", instrumentNumber: "TSH_GZ_TG-【2-64 UNF 2B】-055", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/2-64 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "3/4-16 UNF LH", instrumentNumber: "TSH_GZ_TG-【3/4-16 UNF LH】-056", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3“4-16 UNF LH.jpg" },
{ type: "非公制内螺纹牙规", fileName: "3/4-10 UNC 2B", instrumentNumber: "TSH_GZ_TG-【3/4-10 UNC 2B】-057", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”4-10 UNC 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "3/4-14 G(BSPP) B", instrumentNumber: "TSH_GZ_TG-【3/4-14 G(BSPP) B】-058", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”4-14 G(BSPP)  B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "3/4-14 NPT", instrumentNumber: "TSH_GZ_TG-【3/4-14 NPT】-059", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”4-14 NPT.jpg" },
{ type: "非公制内螺纹牙规", fileName: "3/4-14 PT(RC)", instrumentNumber: "TSH_GZ_TG-【3/4-14 PT(RC)】-060", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”4-14 PT（RC）.jpg" },
{ type: "非公制内螺纹牙规", fileName: "3/4-16 UNF 2B", instrumentNumber: "TSH_GZ_TG-【3/4-16 UNF 2B】-061", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”4-16 UNF 2B(1).jpg" },
{ type: "非公制内螺纹牙规", fileName: "3/4-16 UNF 2B", instrumentNumber: "TSH_GZ_TG-【3/4-16 UNF 2B】-062", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”4-16 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "3/4-19 PT(RC)", instrumentNumber: "TSH_GZ_TG-【3/4-19 PT(RC)】-063", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”4-19 PT（RC）.jpg" },
{ type: "非公制内螺纹牙规", fileName: "3/4-32 UN 2B", instrumentNumber: "TSH_GZ_TG-【3/4-32 UN 2B】-064", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”4-32 UN 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "3/8 G (BSPP)", instrumentNumber: "TSH_GZ_TG-【3/8 G (BSPP)】-065", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”8 G (BSPP).jpg" },
{ type: "非公制内螺纹牙规", fileName: "3/8-16 UNC 2B", instrumentNumber: "TSH_GZ_TG-【3/8-16 UNC 2B】-066", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”8-16 UNC 2B(1).jpg" },
{ type: "非公制内螺纹牙规", fileName: "3/8-16 UNC 2B", instrumentNumber: "TSH_GZ_TG-【3/8-16 UNC 2B】-067", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”8-16 UNC 2B(2).jpg" },
{ type: "非公制内螺纹牙规", fileName: "3/8-16 UNC 2B", instrumentNumber: "TSH_GZ_TG-【3/8-16 UNC 2B】-068", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”8-16 UNC 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "3/8-18 NPT", instrumentNumber: "TSH_GZ_TG-【3/8-18 NPT】-069", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”8-18 NPT.jpg" },
{ type: "非公制内螺纹牙规", fileName: "3/8-19 BSPT", instrumentNumber: "TSH_GZ_TG-【3/8-19 BSPT】-070", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”8-19 BSPT.jpg" },
{ type: "非公制内螺纹牙规", fileName: "3/8-24 UNF 2B", instrumentNumber: "TSH_GZ_TG-【3/8-24 UNF 2B】-071", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/3”8-24 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "4-40 UNC 2B", instrumentNumber: "TSH_GZ_TG-【4-40 UNC 2B】-072", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/4-40 UNC 2B(1).jpg" },
{ type: "非公制内螺纹牙规", fileName: "4-40 UNC 2B", instrumentNumber: "TSH_GZ_TG-【4-40 UNC 2B】-073", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/4-40 UNC 2B(2).jpg" },
{ type: "非公制内螺纹牙规", fileName: "4-40 UNC 2B", instrumentNumber: "TSH_GZ_TG-【4-40 UNC 2B】-074", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/4-40 UNC 2B(3).jpg" },
{ type: "非公制内螺纹牙规", fileName: "4-40 UNC 2B", instrumentNumber: "TSH_GZ_TG-【4-40 UNC 2B】-075", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/4-40 UNC 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "4-40UNC 2B", instrumentNumber: "TSH_GZ_TG-【4-40UNC 2B】-076", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/4-40UNC 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "4-48 UNF 2B", instrumentNumber: "TSH_GZ_TG-【4-48 UNF 2B】-077", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/4-48 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "5-40 UNC 2B", instrumentNumber: "TSH_GZ_TG-【5-40 UNC 2B】-078", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/5-40 UNC 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "5/8-18 UNF 2B", instrumentNumber: "TSH_GZ_TG-【5/8-18 UNF 2B】-079", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/5“8-18 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "5/16-18 UNC 2B", instrumentNumber: "TSH_GZ_TG-【5/16-18 UNC 2B】-080", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/5”16-18 UNC 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "5/16-24 UNF 2B", instrumentNumber: "TSH_GZ_TG-【5/16-24 UNF 2B】-081", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/5”16-24 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "5/16-32 UNEF 2B", instrumentNumber: "TSH_GZ_TG-【5/16-32 UNEF 2B】-082", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/5”16-32 UNEF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "6-32 UNC 2B", instrumentNumber: "TSH_GZ_TG-【6-32 UNC 2B】-083", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/6-32 UNC 2B(1).jpg" },
{ type: "非公制内螺纹牙规", fileName: "6-32 UNC 2B", instrumentNumber: "TSH_GZ_TG-【6-32 UNC 2B】-084", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/6-32 UNC 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "6-40 UNF 2B", instrumentNumber: "TSH_GZ_TG-【6-40 UNF 2B】-085", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/6-40 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "6-40UNF 2B", instrumentNumber: "TSH_GZ_TG-【6-40UNF 2B】-086", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/6-40UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "6-48 UNS 3B", instrumentNumber: "TSH_GZ_TG-【6-48 UNS 3B】-087", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/6-48 UNS 3B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "7 PG", instrumentNumber: "TSH_GZ_TG-【7 PG】-088", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/7 PG.jpg" },
{ type: "非公制内螺纹牙规", fileName: "7/16-14 UNC 2B", instrumentNumber: "TSH_GZ_TG-【7/16-14 UNC 2B】-089", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/7”16-14 UNC 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "7/16-20 UNF 2B", instrumentNumber: "TSH_GZ_TG-【7/16-20 UNF 2B】-090", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/7”16-20 UNF 2B(1).jpg" },
{ type: "非公制内螺纹牙规", fileName: "7/16-20 UNF 2B", instrumentNumber: "TSH_GZ_TG-【7/16-20 UNF 2B】-091", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/7”16-20 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "7/8-14 UNF 2B", instrumentNumber: "TSH_GZ_TG-【7/8-14 UNF 2B】-092", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/7”8-14 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "7/8-20 UNEF 2B", instrumentNumber: "TSH_GZ_TG-【7/8-20 UNEF 2B】-093", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/7”8-20 UNEF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "8-32 UNC 2B", instrumentNumber: "TSH_GZ_TG-【8-32 UNC 2B】-094", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/8-32 UNC 2B(1).jpg" },
{ type: "非公制内螺纹牙规", fileName: "8-32 UNC 2B", instrumentNumber: "TSH_GZ_TG-【8-32 UNC 2B】-095", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/8-32 UNC 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "8-36 UNF 2B", instrumentNumber: "TSH_GZ_TG-【8-36 UNF 2B】-096", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/8-36 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "9/16-18 UNF 2B", instrumentNumber: "TSH_GZ_TG-【9/16-18 UNF 2B】-097", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/9”16-18 UNF 2B.jpg" },
{ type: "非公制内螺纹牙规", fileName: "9/16-18 UNJF 3B", instrumentNumber: "TSH_GZ_TG-【9/16-18 UNJF 3B】-098", imagePath: "螺纹规清单/非公制内螺纹牙规清单表/9”16-18 UNJF 3B.jpg" },
{ type: "非公制外螺纹环规", fileName: "0.305-32(8V1)", instrumentNumber: "TSH_GZ_TR-【0.305-32(8V1)】-001", imagePath: "螺纹规清单/非公制外螺纹环规清单表/0.305-32（8V1）.jpg" },
{ type: "非公制外螺纹环规", fileName: "1-1/16 - 16(1.0625-16) UN(UNEF) 3A", instrumentNumber: "TSH_GZ_TR-【1-1/16 - 16(1.0625-16) UN(UNEF) 3A】-002", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1-1“16 - 16(1.0625-16) UN(UNEF) 3A.jpg" },
{ type: "非公制外螺纹环规", fileName: "1-1/2-16(1.5-16) UNEF(UN) 2A", instrumentNumber: "TSH_GZ_TR-【1-1/2-16(1.5-16) UNEF(UN) 2A】-003", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1-1“2-16(1.5-16) UNEF(UN) 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "1-1/4-11 G(BSPP)", instrumentNumber: "TSH_GZ_TR-【1-1/4-11 G(BSPP)】-004", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1-1“4-11 G(BSPP).jpg" },
{ type: "非公制外螺纹环规", fileName: "1-1/4-12 UNF 2A", instrumentNumber: "TSH_GZ_TR-【1-1/4-12 UNF 2A】-005", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1-1“4-12 UNF 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "1-5/16-12 UN 2A", instrumentNumber: "TSH_GZ_TR-【1-5/16-12 UN 2A】-006", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1-5“16-12 UN 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "10-32 UNF 2A", instrumentNumber: "TSH_GZ_TR-【10-32 UNF 2A】-007", imagePath: "螺纹规清单/非公制外螺纹环规清单表/10-32 UNF 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "15/16-20 UNEF 2A", instrumentNumber: "TSH_GZ_TR-【15/16-20 UNEF 2A】-008", imagePath: "螺纹规清单/非公制外螺纹环规清单表/15”16-20 UNEF 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "1/8-27 NPT", instrumentNumber: "TSH_GZ_TR-【1/8-27 NPT】-009", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1“8-27 NPT.jpg" },
{ type: "非公制外螺纹环规", fileName: "1/2-13 UNC 3A", instrumentNumber: "TSH_GZ_TR-【1/2-13 UNC 3A】-010", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”2-13 UNC 3A.jpg" },
{ type: "非公制外螺纹环规", fileName: "1/2-14 PT(RC)", instrumentNumber: "TSH_GZ_TR-【1/2-14 PT(RC)】-011", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”2-14 PT(RC).jpg" },
{ type: "非公制外螺纹环规", fileName: "1/2-20 UNF", instrumentNumber: "TSH_GZ_TR-【1/2-20 UNF】-012", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”2-20 UNF.jpg" },
{ type: "非公制外螺纹环规", fileName: "1/4 G (BSPP) A", instrumentNumber: "TSH_GZ_TR-【1/4 G (BSPP) A】-013", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”4 G (BSPP) A.jpg" },
{ type: "非公制外螺纹环规", fileName: "1/4 G (BSPP)", instrumentNumber: "TSH_GZ_TR-【1/4 G (BSPP)】-014", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”4 G (BSPP).jpg" },
{ type: "非公制外螺纹环规", fileName: "1/4-18 NPT", instrumentNumber: "TSH_GZ_TR-【1/4-18 NPT】-015", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”4-18 NPT.jpg" },
{ type: "非公制外螺纹环规", fileName: "1/4-20 UNC 2A", instrumentNumber: "TSH_GZ_TR-【1/4-20 UNC 2A】-016", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”4-20 UNC 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "1/4-20 UNC 2A", instrumentNumber: "TSH_GZ_TR-【1/4-20 UNC 2A】-017", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”4-20 UNC 2A（1）.jpg" },
{ type: "非公制外螺纹环规", fileName: "1/4-28 UNF 2A", instrumentNumber: "TSH_GZ_TR-【1/4-28 UNF 2A】-018", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”4-28 UNF 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "1/4-36 UNS 2A", instrumentNumber: "TSH_GZ_TR-【1/4-36 UNS 2A】-019", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”4-36 UNS 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "1/8 G (BSPP)", instrumentNumber: "TSH_GZ_TR-【1/8 G (BSPP)】-020", imagePath: "螺纹规清单/非公制外螺纹环规清单表/1”8 G (BSPP).jpg" },
{ type: "非公制外螺纹环规", fileName: "3/4-14 NPS", instrumentNumber: "TSH_GZ_TR-【3/4-14 NPS】-021", imagePath: "螺纹规清单/非公制外螺纹环规清单表/3“4-14 NPS.jpg" },
{ type: "非公制外螺纹环规", fileName: "3/4-14 NPT", instrumentNumber: "TSH_GZ_TR-【3/4-14 NPT】-022", imagePath: "螺纹规清单/非公制外螺纹环规清单表/3”4-14 NPT.jpg" },
{ type: "非公制外螺纹环规", fileName: "3/4-16 UNF 2A", instrumentNumber: "TSH_GZ_TR-【3/4-16 UNF 2A】-023", imagePath: "螺纹规清单/非公制外螺纹环规清单表/3”4-16 UNF 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "3/8 G (BSPP)", instrumentNumber: "TSH_GZ_TR-【3/8 G (BSPP)】-024", imagePath: "螺纹规清单/非公制外螺纹环规清单表/3”8 G (BSPP).jpg" },
{ type: "非公制外螺纹环规", fileName: "3/8-24 UNF 2A", instrumentNumber: "TSH_GZ_TR-【3/8-24 UNF 2A】-025", imagePath: "螺纹规清单/非公制外螺纹环规清单表/3”8-24 UNF 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "3/8-32 UNEF 2A", instrumentNumber: "TSH_GZ_TR-【3/8-32 UNEF 2A】-026", imagePath: "螺纹规清单/非公制外螺纹环规清单表/3”8-32 UNEF 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "4-40 UNC 2A", instrumentNumber: "TSH_GZ_TR-【4-40 UNC 2A】-027", imagePath: "螺纹规清单/非公制外螺纹环规清单表/4-40 UNC 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "5-11 G A", instrumentNumber: "TSH_GZ_TR-【5-11 G A】-028", imagePath: "螺纹规清单/非公制外螺纹环规清单表/5-11 G A.jpg" },
{ type: "非公制外螺纹环规", fileName: "50X8 Tr", instrumentNumber: "TSH_GZ_TR-【50X8 Tr】-029", imagePath: "螺纹规清单/非公制外螺纹环规清单表/50X8 Tr.jpg" },
{ type: "非公制外螺纹环规", fileName: "5/16-18UNC 2A", instrumentNumber: "TSH_GZ_TR-【5/16-18UNC 2A】-030", imagePath: "螺纹规清单/非公制外螺纹环规清单表/5”16-18UNC 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "5/16-24 UNF 2A", instrumentNumber: "TSH_GZ_TR-【5/16-24 UNF 2A】-031", imagePath: "螺纹规清单/非公制外螺纹环规清单表/5”16-24 UNF 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "5/8 G (BSPP)", instrumentNumber: "TSH_GZ_TR-【5/8 G (BSPP)】-032", imagePath: "螺纹规清单/非公制外螺纹环规清单表/5”8 G (BSPP).jpg" },
{ type: "非公制外螺纹环规", fileName: "5/8-11 UNC 2A", instrumentNumber: "TSH_GZ_TR-【5/8-11 UNC 2A】-033", imagePath: "螺纹规清单/非公制外螺纹环规清单表/5”8-11 UNC 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "6-40 UNF 2A", instrumentNumber: "TSH_GZ_TR-【6-40 UNF 2A】-034", imagePath: "螺纹规清单/非公制外螺纹环规清单表/6-40 UNF 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "7/8-14 (0.875-14)UNF 2A", instrumentNumber: "TSH_GZ_TR-【7/8-14 (0.875-14)UNF 2A】-035", imagePath: "螺纹规清单/非公制外螺纹环规清单表/7”8-14 (0.875-14)UNF 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "7/8-18 UNS 2A", instrumentNumber: "TSH_GZ_TR-【7/8-18 UNS 2A】-036", imagePath: "螺纹规清单/非公制外螺纹环规清单表/7”8-18 UNS 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "7/8-20 UNEF 2A", instrumentNumber: "TSH_GZ_TR-【7/8-20 UNEF 2A】-037", imagePath: "螺纹规清单/非公制外螺纹环规清单表/7”8-20 UNEF 2A.jpg" },
{ type: "非公制外螺纹环规", fileName: "8-32(0.1640-32) UNJC 3A", instrumentNumber: "TSH_GZ_TR-【8-32(0.1640-32) UNJC 3A】-038", imagePath: "螺纹规清单/非公制外螺纹环规清单表/8-32(0.1640-32) UNJC 3A.jpg" },
{ type: "非公制外螺纹环规", fileName: "9/16-18 UNF 2A", instrumentNumber: "TSH_GZ_TR-【9/16-18 UNF 2A】-039", imagePath: "螺纹规清单/非公制外螺纹环规清单表/9”16-18 UNF 2A.jpg" },
{ type: "公制内螺纹牙规", fileName: "M1.1X0.25 6H", instrumentNumber: "TSH_GZ_TG-【M1.1X0.25 6H】-001", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.1X0.25 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M1.2X0.2 6H", instrumentNumber: "TSH_GZ_TG-【M1.2X0.2 6H】-002", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.2X0.2 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M1.2X0.2 6H", instrumentNumber: "TSH_GZ_TG-【M1.2X0.2 6H】-003", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.2X0.2 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M1.2X0.25 6H", instrumentNumber: "TSH_GZ_TG-【M1.2X0.25 6H】-004", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.2X0.25 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M1.2X0.25 6H", instrumentNumber: "TSH_GZ_TG-【M1.2X0.25 6H】-005", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.2X0.25 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M1.4X0.3 6H", instrumentNumber: "TSH_GZ_TG-【M1.4X0.3 6H】-006", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.4X0.3 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M1.4X0.3 6H", instrumentNumber: "TSH_GZ_TG-【M1.4X0.3 6H】-007", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.4X0.3 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M1.6X0.2 6H", instrumentNumber: "TSH_GZ_TG-【M1.6X0.2 6H】-008", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.6X0.2 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M1.6X0.35 6H", instrumentNumber: "TSH_GZ_TG-【M1.6X0.35 6H】-009", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.6X0.35 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M1.6X0.35 6H", instrumentNumber: "TSH_GZ_TG-【M1.6X0.35 6H】-010", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1.6X0.35 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M1X0.2 6H", instrumentNumber: "TSH_GZ_TG-【M1X0.2 6H】-011", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1X0.2 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M1X0.25 6H", instrumentNumber: "TSH_GZ_TG-【M1X0.25 6H】-012", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1X0.25 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M1X0.25 6H", instrumentNumber: "TSH_GZ_TG-【M1X0.25 6H】-013", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M1X0.25 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M2.2X0.45 6H", instrumentNumber: "TSH_GZ_TG-【M2.2X0.45 6H】-014", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M2.2X0.45 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M2.5X0.45 6H", instrumentNumber: "TSH_GZ_TG-【M2.5X0.45 6H】-015", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M2.5X0.45 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M2.6X0.45 6H", instrumentNumber: "TSH_GZ_TG-【M2.6X0.45 6H】-016", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M2.6X0.45 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M2X0.35 6H", instrumentNumber: "TSH_GZ_TG-【M2X0.35 6H】-017", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M2X0.35 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M2X0.4 6G", instrumentNumber: "TSH_GZ_TG-【M2X0.4 6G】-018", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M2X0.4 6G(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M2X0.4 6G", instrumentNumber: "TSH_GZ_TG-【M2X0.4 6G】-019", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M2X0.4 6G.jpg" },
{ type: "公制内螺纹牙规", fileName: "M2X0.4 6H", instrumentNumber: "TSH_GZ_TG-【M2X0.4 6H】-020", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M2X0.4 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M2X0.4 6H", instrumentNumber: "TSH_GZ_TG-【M2X0.4 6H】-021", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M2X0.4 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M3.5X0.6 6H", instrumentNumber: "TSH_GZ_TG-【M3.5X0.6 6H】-022", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M3.5X0.6 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M3X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M3X0.5 6H】-023", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M3X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M4X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M4X0.5 6H】-024", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M4X0.5 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M4X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M4X0.5 6H】-025", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M4X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M4X0.7 6H", instrumentNumber: "TSH_GZ_TG-【M4X0.7 6H】-026", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M4X0.7 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M4X0.7 6H", instrumentNumber: "TSH_GZ_TG-【M4X0.7 6H】-027", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M4X0.7 6H(2).jpg" },
{ type: "公制内螺纹牙规", fileName: "M4X0.7 6H", instrumentNumber: "TSH_GZ_TG-【M4X0.7 6H】-028", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M4X0.7 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M5X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M5X0.5 6H】-029", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M5X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M5X0.8 6H", instrumentNumber: "TSH_GZ_TG-【M5X0.8 6H】-030", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M5X0.8 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M6X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M6X0.5 6H】-031", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M6X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M6X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M6X0.75 6H】-032", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M6X0.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M6X1 6H", instrumentNumber: "TSH_GZ_TG-【M6X1 6H】-033", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M6X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M7X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M7X0.5 6H】-034", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M7X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M7X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M7X0.75 6H】-035", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M7X0.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M7X1 6H", instrumentNumber: "TSH_GZ_TG-【M7X1 6H】-036", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M7X1 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M7X1 6H", instrumentNumber: "TSH_GZ_TG-【M7X1 6H】-037", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M7X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M8X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M8X0.75 6H】-038", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M8X0.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M8X1 6H", instrumentNumber: "TSH_GZ_TG-【M8X1 6H】-039", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M8X1 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M8X1 6H", instrumentNumber: "TSH_GZ_TG-【M8X1 6H】-040", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M8X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M8X1.25 6H", instrumentNumber: "TSH_GZ_TG-【M8X1.25 6H】-041", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M8X1.25 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M8X1.25 7H", instrumentNumber: "TSH_GZ_TG-【M8X1.25 7H】-042", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M8X1.25 7H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M8X1.25 LH 6H", instrumentNumber: "TSH_GZ_TG-【M8X1.25 LH 6H】-043", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M8X1.25 LH 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M9X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M9X0.75 6H】-044", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M9X0.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M9X1 6H", instrumentNumber: "TSH_GZ_TG-【M9X1 6H】-045", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M9X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M10X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M10X0.5 6H】-046", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M10X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M10X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M10X0.75 6H】-047", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M10X0.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M10X1 6H", instrumentNumber: "TSH_GZ_TG-【M10X1 6H】-048", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M10X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M10X1 LH 6H", instrumentNumber: "TSH_GZ_TG-【M10X1 LH 6H】-049", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M10X1 LH 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M10X1.25 6H", instrumentNumber: "TSH_GZ_TG-【M10X1.25 6H】-050", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M10X1.25 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M10X1.5 7H", instrumentNumber: "TSH_GZ_TG-【M10X1.5 7H】-051", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M10X1.5 7H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M11X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M11X0.5 6H】-052", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M11X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M11X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M11X0.75 6H】-053", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M11X0.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M11X1 6H", instrumentNumber: "TSH_GZ_TG-【M11X1 6H】-054", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M11X1 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M11X1 6H", instrumentNumber: "TSH_GZ_TG-【M11X1 6H】-055", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M11X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M12X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M12X0.5 6H】-056", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M12X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M12X0.75 6H】-057", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X0.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M12X1 6H", instrumentNumber: "TSH_GZ_TG-【M12X1 6H】-058", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M12X1.25 6H", instrumentNumber: "TSH_GZ_TG-【M12X1.25 6H】-059", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X1.25 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M12X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M12X1.5 6H】-060", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M12X1.75 6H", instrumentNumber: "TSH_GZ_TG-【M12X1.75 6H】-061", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X1.75 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M12X1.75 6H", instrumentNumber: "TSH_GZ_TG-【M12X1.75 6H】-062", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X1.75 6H(2).jpg" },
{ type: "公制内螺纹牙规", fileName: "M12X1.75 6H", instrumentNumber: "TSH_GZ_TG-【M12X1.75 6H】-063", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X1.75 6H(3).jpg" },
{ type: "公制内螺纹牙规", fileName: "M12X1.75 6H", instrumentNumber: "TSH_GZ_TG-【M12X1.75 6H】-064", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X1.75 6H(4).jpg" },
{ type: "公制内螺纹牙规", fileName: "M12X1.75 6H", instrumentNumber: "TSH_GZ_TG-【M12X1.75 6H】-065", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M12X1.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M13X1 6H", instrumentNumber: "TSH_GZ_TG-【M13X1 6H】-066", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M13X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M14X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M14X0.5 6H】-067", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M14X0.5 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M14X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M14X0.5 6H】-068", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M14X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M14X1 6H", instrumentNumber: "TSH_GZ_TG-【M14X1 6H】-069", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M14X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M14X1.25 6H", instrumentNumber: "TSH_GZ_TG-【M14X1.25 6H】-070", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M14X1.25 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M14X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M14X1.5 6H】-071", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M14X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M14X2 6H", instrumentNumber: "TSH_GZ_TG-【M14X2 6H】-072", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M14X2 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M15X0.5 4H", instrumentNumber: "TSH_GZ_TG-【M15X0.5 4H】-073", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M15X0.5 4H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M15X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M15X0.5 6H】-074", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M15X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M15X1 6H", instrumentNumber: "TSH_GZ_TG-【M15X1 6H】-075", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M15X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M15X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M15X1.5 6H】-076", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M15X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M16X1 6H", instrumentNumber: "TSH_GZ_TG-【M16X1 6H】-077", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M16X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M16X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M16X1.5 6H】-078", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M16X1.5 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M16X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M16X1.5 6H】-079", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M16X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M16X2 6H", instrumentNumber: "TSH_GZ_TG-【M16X2 6H】-080", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M16X2 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M16X2 6H", instrumentNumber: "TSH_GZ_TG-【M16X2 6H】-081", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M16X2 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M17.5X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M17.5X0.5 6H】-082", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M17.5X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M17X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M17X0.5 6H】-083", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M17X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M17X1 6H", instrumentNumber: "TSH_GZ_TG-【M17X1 6H】-084", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M17X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M18X1 6H", instrumentNumber: "TSH_GZ_TG-【M18X1 6H】-085", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M18X1 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M18X1 6H", instrumentNumber: "TSH_GZ_TG-【M18X1 6H】-086", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M18X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M18X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M18X1.5 6H】-087", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M18X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M18X2.5 6H", instrumentNumber: "TSH_GZ_TG-【M18X2.5 6H】-088", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M18X2.5 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M18X2.5 6H", instrumentNumber: "TSH_GZ_TG-【M18X2.5 6H】-089", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M18X2.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M19X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M19X0.75 6H】-090", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M19X0.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M20X1 6H", instrumentNumber: "TSH_GZ_TG-【M20X1 6H】-091", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M20X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M20X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M20X1.5 6H】-092", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M20X1.5 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M20X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M20X1.5 6H】-093", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M20X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M20X2.5 6H", instrumentNumber: "TSH_GZ_TG-【M20X2.5 6H】-094", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M20X2.5 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M20X2.5 6H", instrumentNumber: "TSH_GZ_TG-【M20X2.5 6H】-095", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M20X2.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M21X1 6H", instrumentNumber: "TSH_GZ_TG-【M21X1 6H】-096", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M21X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M22X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M22X0.75 6H】-097", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M22X0.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M22X1 6H", instrumentNumber: "TSH_GZ_TG-【M22X1 6H】-098", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M22X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M22X1.5 LH 6H", instrumentNumber: "TSH_GZ_TG-【M22X1.5 LH 6H】-099", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M22X1.5  LH 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M22X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M22X1.5 6H】-100", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M22X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M22X2 6H", instrumentNumber: "TSH_GZ_TG-【M22X2 6H】-101", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M22X2 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M23X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M23X0.5 6H】-102", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M23X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M24X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M24X0.5 6H】-103", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M24X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M24X1 6H", instrumentNumber: "TSH_GZ_TG-【M24X1 6H】-104", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M24X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M24X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M24X1.5 6H】-105", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M24X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M24X1.5 LH 6H", instrumentNumber: "TSH_GZ_TG-【M24X1.5 LH 6H】-106", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M24X1.5 LH 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M24x2 6H", instrumentNumber: "TSH_GZ_TG-【M24x2 6H】-107", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M24x2 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M24X3 6H", instrumentNumber: "TSH_GZ_TG-【M24X3 6H】-108", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M24X3 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M25X1 6H", instrumentNumber: "TSH_GZ_TG-【M25X1 6H】-109", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M25X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M25X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M25X1.5 6H】-110", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M25X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M26X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M26X0.5 6H】-111", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M26X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M26X1 6H", instrumentNumber: "TSH_GZ_TG-【M26X1 6H】-112", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M26X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M26X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M26X1.5 6H】-113", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M26X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M26X1/36 6H", instrumentNumber: "TSH_GZ_TG-【M26X1/36 6H】-114", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M26X1”36 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M27X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M27X0.5 6H】-115", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M27X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M27X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M27X0.75 6H】-116", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M27X0.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M28X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M28X0.75 6H】-117", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M28X0.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M28X1 6H", instrumentNumber: "TSH_GZ_TG-【M28X1 6H】-118", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M28X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M30X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M30X0.75 6H】-119", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M30X0.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M30X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M30X1.5 6H】-120", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M30X1.5 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M30X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M30X1.5 6H】-121", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M30X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M30X3.5 6H", instrumentNumber: "TSH_GZ_TG-【M30X3.5 6H】-122", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M30X3.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M32X1 6H", instrumentNumber: "TSH_GZ_TG-【M32X1 6H】-123", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M32X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M32X1.25 6H", instrumentNumber: "TSH_GZ_TG-【M32X1.25 6H】-124", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M32X1.25 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M32X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M32X1.5 6H】-125", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M32X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M33X1 6H", instrumentNumber: "TSH_GZ_TG-【M33X1 6H】-126", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M33X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M33X1.5 6G", instrumentNumber: "TSH_GZ_TG-【M33X1.5 6G】-127", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M33X1.5 6G.jpg" },
{ type: "公制内螺纹牙规", fileName: "M35X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M35X0.5 6H】-128", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M35X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M35X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M35X0.75 6H】-129", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M35X0.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M36X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M36X0.5 6H】-130", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M36X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M36X1 6H", instrumentNumber: "TSH_GZ_TG-【M36X1 6H】-131", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M36X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M36X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M36X1.5 6H】-132", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M36X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M37X1 6H", instrumentNumber: "TSH_GZ_TG-【M37X1 6H】-133", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M37X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M38X2.5 6H", instrumentNumber: "TSH_GZ_TG-【M38X2.5 6H】-134", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M38X2.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M39X2 6H", instrumentNumber: "TSH_GZ_TG-【M39X2 6H】-135", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M39X2 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M40X1.5 4H", instrumentNumber: "TSH_GZ_TG-【M40X1.5 4H】-136", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M40X1.5 4H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M40X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M40X1.5 6H】-137", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M40X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M41X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M41X0.75 6H】-138", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M41X0.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M42X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M42X1.5 6H】-139", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M42X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M43X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M43X0.75 6H】-140", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M43X0.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M44X1 6H", instrumentNumber: "TSH_GZ_TG-【M44X1 6H】-141", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M44X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M44X2 6H", instrumentNumber: "TSH_GZ_TG-【M44X2 6H】-142", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M44X2 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M45X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M45X1.5 6H】-143", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M45X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M48X1 6H", instrumentNumber: "TSH_GZ_TG-【M48X1 6H】-144", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M48X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M48X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M48X1.5 6H】-145", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M48X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M48X2 6H", instrumentNumber: "TSH_GZ_TG-【M48X2 6H】-146", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M48X2 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M50X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M50X0.75 6H】-147", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M50X0.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M50X1 6H", instrumentNumber: "TSH_GZ_TG-【M50X1 6H】-148", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M50X1 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M50X1.25 6H", instrumentNumber: "TSH_GZ_TG-【M50X1.25 6H】-149", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M50X1.25 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M50X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M50X1.5 6H】-150", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M50X1.5 6H(1).jpg" },
{ type: "公制内螺纹牙规", fileName: "M50X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M50X1.5 6H】-151", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M50X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M50X2 6H", instrumentNumber: "TSH_GZ_TG-【M50X2 6H】-152", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M50X2 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M57X0.5 6H", instrumentNumber: "TSH_GZ_TG-【M57X0.5 6H】-153", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M57X0.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M60X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M60X0.75 6H】-154", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M60X0.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M60X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M60X1.5 6H】-155", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M60X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M62X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M62X0.75 6H】-156", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M62X0.75 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M65X1.5 6H", instrumentNumber: "TSH_GZ_TG-【M65X1.5 6H】-157", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M65X1.5 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M68X2 6H", instrumentNumber: "TSH_GZ_TG-【M68X2 6H】-158", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M68X2 6H.jpg" },
{ type: "公制内螺纹牙规", fileName: "M69X0.75 6H", instrumentNumber: "TSH_GZ_TG-【M69X0.75 6H】-159", imagePath: "螺纹规清单/公制内螺纹牙规清单表/M69X0.75 6H.jpg" },
{ type: "公制外螺纹环规", fileName: "M1.4X0.3 6g", instrumentNumber: "TSH_GZ_TR-【M1.4X0.3 6g】-001", imagePath: "螺纹规清单/公制外螺纹环规清单表/M1.4X0.3 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M1.6X0.35 6g", instrumentNumber: "TSH_GZ_TR-【M1.6X0.35 6g】-002", imagePath: "螺纹规清单/公制外螺纹环规清单表/M1.6X0.35 6g(1).jpg" },
{ type: "公制外螺纹环规", fileName: "M1.6X0.35 6g", instrumentNumber: "TSH_GZ_TR-【M1.6X0.35 6g】-003", imagePath: "螺纹规清单/公制外螺纹环规清单表/M1.6X0.35 6g(2).jpg" },
{ type: "公制外螺纹环规", fileName: "M1.6X0.35 6g", instrumentNumber: "TSH_GZ_TR-【M1.6X0.35 6g】-004", imagePath: "螺纹规清单/公制外螺纹环规清单表/M1.6X0.35 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M2.5X0.45 6g", instrumentNumber: "TSH_GZ_TR-【M2.5X0.45 6g】-005", imagePath: "螺纹规清单/公制外螺纹环规清单表/M2.5X0.45 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M2X0.4 6g", instrumentNumber: "TSH_GZ_TR-【M2X0.4 6g】-006", imagePath: "螺纹规清单/公制外螺纹环规清单表/M2X0.4 6g(1).jpg" },
{ type: "公制外螺纹环规", fileName: "M2X0.4 6g", instrumentNumber: "TSH_GZ_TR-【M2X0.4 6g】-007", imagePath: "螺纹规清单/公制外螺纹环规清单表/M2X0.4 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M3X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M3X0.5 6g】-008", imagePath: "螺纹规清单/公制外螺纹环规清单表/M3X0.5 6g(1).jpg" },
{ type: "公制外螺纹环规", fileName: "M3X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M3X0.5 6g】-009", imagePath: "螺纹规清单/公制外螺纹环规清单表/M3X0.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M3X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M3X0.5 6g】-010", imagePath: "螺纹规清单/公制外螺纹环规清单表/M3X0.5 6g（2）.jpg" },
{ type: "公制外螺纹环规", fileName: "M4.5X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M4.5X0.5 6g】-011", imagePath: "螺纹规清单/公制外螺纹环规清单表/M4.5X0.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M4X0.7 6g", instrumentNumber: "TSH_GZ_TR-【M4X0.7 6g】-012", imagePath: "螺纹规清单/公制外螺纹环规清单表/M4X0.7 6g(1).jpg" },
{ type: "公制外螺纹环规", fileName: "M4X0.7 6g", instrumentNumber: "TSH_GZ_TR-【M4X0.7 6g】-013", imagePath: "螺纹规清单/公制外螺纹环规清单表/M4X0.7 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M5X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M5X0.5 6g】-014", imagePath: "螺纹规清单/公制外螺纹环规清单表/M5X0.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M5X0.8 6g", instrumentNumber: "TSH_GZ_TR-【M5X0.8 6g】-015", imagePath: "螺纹规清单/公制外螺纹环规清单表/M5X0.8 6g(1).jpg" },
{ type: "公制外螺纹环规", fileName: "M5X0.8 6g", instrumentNumber: "TSH_GZ_TR-【M5X0.8 6g】-016", imagePath: "螺纹规清单/公制外螺纹环规清单表/M5X0.8 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M6X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M6X0.5 6g】-017", imagePath: "螺纹规清单/公制外螺纹环规清单表/M6X0.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M6X1 6g", instrumentNumber: "TSH_GZ_TR-【M6X1 6g】-018", imagePath: "螺纹规清单/公制外螺纹环规清单表/M6X1 6g(1).jpg" },
{ type: "公制外螺纹环规", fileName: "M6X1 6g", instrumentNumber: "TSH_GZ_TR-【M6X1 6g】-019", imagePath: "螺纹规清单/公制外螺纹环规清单表/M6X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M6X1 LH 6g", instrumentNumber: "TSH_GZ_TR-【M6X1 LH 6g】-020", imagePath: "螺纹规清单/公制外螺纹环规清单表/M6X1 LH 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M7X1 6g", instrumentNumber: "TSH_GZ_TR-【M7X1 6g】-021", imagePath: "螺纹规清单/公制外螺纹环规清单表/M7X1 6g(1).jpg" },
{ type: "公制外螺纹环规", fileName: "M7X1 6g", instrumentNumber: "TSH_GZ_TR-【M7X1 6g】-022", imagePath: "螺纹规清单/公制外螺纹环规清单表/M7X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M8X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M8X0.5 6g】-023", imagePath: "螺纹规清单/公制外螺纹环规清单表/M8X0.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M8X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M8X0.75 6g】-024", imagePath: "螺纹规清单/公制外螺纹环规清单表/M8X0.75 6g(1).jpg" },
{ type: "公制外螺纹环规", fileName: "M8X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M8X0.75 6g】-025", imagePath: "螺纹规清单/公制外螺纹环规清单表/M8X0.75 6g(2).jpg" },
{ type: "公制外螺纹环规", fileName: "M8X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M8X0.75 6g】-026", imagePath: "螺纹规清单/公制外螺纹环规清单表/M8X0.75 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M8X1 6g", instrumentNumber: "TSH_GZ_TR-【M8X1 6g】-027", imagePath: "螺纹规清单/公制外螺纹环规清单表/M8X1 6g(1).jpg" },
{ type: "公制外螺纹环规", fileName: "M8X1 6g", instrumentNumber: "TSH_GZ_TR-【M8X1 6g】-028", imagePath: "螺纹规清单/公制外螺纹环规清单表/M8X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M8X1.25 6g", instrumentNumber: "TSH_GZ_TR-【M8X1.25 6g】-029", imagePath: "螺纹规清单/公制外螺纹环规清单表/M8X1.25 6g(1).jpg" },
{ type: "公制外螺纹环规", fileName: "M8X1.25 6g", instrumentNumber: "TSH_GZ_TR-【M8X1.25 6g】-030", imagePath: "螺纹规清单/公制外螺纹环规清单表/M8X1.25 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M8X1.25 LH 6g", instrumentNumber: "TSH_GZ_TR-【M8X1.25 LH 6g】-031", imagePath: "螺纹规清单/公制外螺纹环规清单表/M8X1.25 LH 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M9X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M9X0.5 6g】-032", imagePath: "螺纹规清单/公制外螺纹环规清单表/M9X0.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M10X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M10X0.5 6g】-033", imagePath: "螺纹规清单/公制外螺纹环规清单表/M10X0.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M10X1 6g", instrumentNumber: "TSH_GZ_TR-【M10X1 6g】-034", imagePath: "螺纹规清单/公制外螺纹环规清单表/M10X1 6g(1).jpg" },
{ type: "公制外螺纹环规", fileName: "M10X1 6g", instrumentNumber: "TSH_GZ_TR-【M10X1 6g】-035", imagePath: "螺纹规清单/公制外螺纹环规清单表/M10X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M10X1.25 6g", instrumentNumber: "TSH_GZ_TR-【M10X1.25 6g】-036", imagePath: "螺纹规清单/公制外螺纹环规清单表/M10X1.25 6g(1).jpg" },
{ type: "公制外螺纹环规", fileName: "M10X1.25 6g", instrumentNumber: "TSH_GZ_TR-【M10X1.25 6g】-037", imagePath: "螺纹规清单/公制外螺纹环规清单表/M10X1.25 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M10X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M10X1.5 6g】-038", imagePath: "螺纹规清单/公制外螺纹环规清单表/M10X1.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M11X1 6g", instrumentNumber: "TSH_GZ_TR-【M11X1 6g】-039", imagePath: "螺纹规清单/公制外螺纹环规清单表/M11X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M12X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M12X0.5 6g】-040", imagePath: "螺纹规清单/公制外螺纹环规清单表/M12X0.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M12X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M12X0.75 6g】-041", imagePath: "螺纹规清单/公制外螺纹环规清单表/M12X0.75 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M12X1 6g", instrumentNumber: "TSH_GZ_TR-【M12X1 6g】-042", imagePath: "螺纹规清单/公制外螺纹环规清单表/M12X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M12X1.25 6g", instrumentNumber: "TSH_GZ_TR-【M12X1.25 6g】-043", imagePath: "螺纹规清单/公制外螺纹环规清单表/M12X1.25 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M12X1.5 LH 6g", instrumentNumber: "TSH_GZ_TR-【M12X1.5 LH 6g】-044", imagePath: "螺纹规清单/公制外螺纹环规清单表/M12X1.5 LH 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M12X1.75 6g", instrumentNumber: "TSH_GZ_TR-【M12X1.75 6g】-045", imagePath: "螺纹规清单/公制外螺纹环规清单表/M12X1.75 6g(1).jpg" },
{ type: "公制外螺纹环规", fileName: "M12X1.75 6g", instrumentNumber: "TSH_GZ_TR-【M12X1.75 6g】-046", imagePath: "螺纹规清单/公制外螺纹环规清单表/M12X1.75 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M12X1.75 LH 6g", instrumentNumber: "TSH_GZ_TR-【M12X1.75 LH 6g】-047", imagePath: "螺纹规清单/公制外螺纹环规清单表/M12X1.75 LH 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M13X1 6g", instrumentNumber: "TSH_GZ_TR-【M13X1 6g】-048", imagePath: "螺纹规清单/公制外螺纹环规清单表/M13X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M14X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M14X0.5 6g】-049", imagePath: "螺纹规清单/公制外螺纹环规清单表/M14X0.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M14X1 6g", instrumentNumber: "TSH_GZ_TR-【M14X1 6g】-050", imagePath: "螺纹规清单/公制外螺纹环规清单表/M14X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M14X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M14X1.5 6g】-051", imagePath: "螺纹规清单/公制外螺纹环规清单表/M14X1.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M14X2 6g", instrumentNumber: "TSH_GZ_TR-【M14X2 6g】-052", imagePath: "螺纹规清单/公制外螺纹环规清单表/M14X2 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M15X0.5 4h", instrumentNumber: "TSH_GZ_TR-【M15X0.5 4h】-053", imagePath: "螺纹规清单/公制外螺纹环规清单表/M15X0.5 4h.jpg" },
{ type: "公制外螺纹环规", fileName: "M15X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M15X0.5 6g】-054", imagePath: "螺纹规清单/公制外螺纹环规清单表/M15X0.5 6g.png" },
{ type: "公制外螺纹环规", fileName: "M15X1 6g", instrumentNumber: "TSH_GZ_TR-【M15X1 6g】-055", imagePath: "螺纹规清单/公制外螺纹环规清单表/M15X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M16X1 6g", instrumentNumber: "TSH_GZ_TR-【M16X1 6g】-056", imagePath: "螺纹规清单/公制外螺纹环规清单表/M16X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M16X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M16X1.5 6g】-057", imagePath: "螺纹规清单/公制外螺纹环规清单表/M16X1.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M16X2 6g", instrumentNumber: "TSH_GZ_TR-【M16X2 6g】-058", imagePath: "螺纹规清单/公制外螺纹环规清单表/M16X2 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M17X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M17X0.5 6g】-059", imagePath: "螺纹规清单/公制外螺纹环规清单表/M17X0.5 6g(1).jpg" },
{ type: "公制外螺纹环规", fileName: "M17X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M17X0.5 6g】-060", imagePath: "螺纹规清单/公制外螺纹环规清单表/M17X0.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M17X1 6g", instrumentNumber: "TSH_GZ_TR-【M17X1 6g】-061", imagePath: "螺纹规清单/公制外螺纹环规清单表/M17X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M18X1 6g", instrumentNumber: "TSH_GZ_TR-【M18X1 6g】-062", imagePath: "螺纹规清单/公制外螺纹环规清单表/M18X1 6g(1).jpg" },
{ type: "公制外螺纹环规", fileName: "M18X1 6g", instrumentNumber: "TSH_GZ_TR-【M18X1 6g】-063", imagePath: "螺纹规清单/公制外螺纹环规清单表/M18X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M18X2.5 6g", instrumentNumber: "TSH_GZ_TR-【M18X2.5 6g】-064", imagePath: "螺纹规清单/公制外螺纹环规清单表/M18X2.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M20X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M20X0.5 6g】-065", imagePath: "螺纹规清单/公制外螺纹环规清单表/M20X0.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M20X1 6g", instrumentNumber: "TSH_GZ_TR-【M20X1 6g】-066", imagePath: "螺纹规清单/公制外螺纹环规清单表/M20X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M20X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M20X1.5 6g】-067", imagePath: "螺纹规清单/公制外螺纹环规清单表/M20X1.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M20X2.5 6g", instrumentNumber: "TSH_GZ_TR-【M20X2.5 6g】-068", imagePath: "螺纹规清单/公制外螺纹环规清单表/M20X2.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M21X1 6g", instrumentNumber: "TSH_GZ_TR-【M21X1 6g】-069", imagePath: "螺纹规清单/公制外螺纹环规清单表/M21X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M22X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M22X0.5 6g】-070", imagePath: "螺纹规清单/公制外螺纹环规清单表/M22X0.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M22X1 6g", instrumentNumber: "TSH_GZ_TR-【M22X1 6g】-071", imagePath: "螺纹规清单/公制外螺纹环规清单表/M22X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M22X1.25 6g", instrumentNumber: "TSH_GZ_TR-【M22X1.25 6g】-072", imagePath: "螺纹规清单/公制外螺纹环规清单表/M22X1.25 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M22X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M22X1.5 6g】-073", imagePath: "螺纹规清单/公制外螺纹环规清单表/M22X1.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M22X2 6g", instrumentNumber: "TSH_GZ_TR-【M22X2 6g】-074", imagePath: "螺纹规清单/公制外螺纹环规清单表/M22X2 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M22X2.5 6g", instrumentNumber: "TSH_GZ_TR-【M22X2.5 6g】-075", imagePath: "螺纹规清单/公制外螺纹环规清单表/M22X2.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M23X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M23X1.5 6g】-076", imagePath: "螺纹规清单/公制外螺纹环规清单表/M23X1.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M24X1 6g", instrumentNumber: "TSH_GZ_TR-【M24X1 6g】-077", imagePath: "螺纹规清单/公制外螺纹环规清单表/M24X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M24X2 6g", instrumentNumber: "TSH_GZ_TR-【M24X2 6g】-078", imagePath: "螺纹规清单/公制外螺纹环规清单表/M24X2 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M24X3 6g", instrumentNumber: "TSH_GZ_TR-【M24X3 6g】-079", imagePath: "螺纹规清单/公制外螺纹环规清单表/M24X3 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M25X1 6g", instrumentNumber: "TSH_GZ_TR-【M25X1 6g】-080", imagePath: "螺纹规清单/公制外螺纹环规清单表/M25X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M25X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M25X1.5 6g】-081", imagePath: "螺纹规清单/公制外螺纹环规清单表/M25X1.5 6g(1).jpg" },
{ type: "公制外螺纹环规", fileName: "M25X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M25X1.5 6g】-082", imagePath: "螺纹规清单/公制外螺纹环规清单表/M25X1.5 6g(2).jpg" },
{ type: "公制外螺纹环规", fileName: "M25X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M25X1.5 6g】-083", imagePath: "螺纹规清单/公制外螺纹环规清单表/M25X1.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M27X1 6g", instrumentNumber: "TSH_GZ_TR-【M27X1 6g】-084", imagePath: "螺纹规清单/公制外螺纹环规清单表/M27X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M28X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M28X0.75 6g】-085", imagePath: "螺纹规清单/公制外螺纹环规清单表/M28X0.75 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M28X1.5 LH 6g", instrumentNumber: "TSH_GZ_TR-【M28X1.5 LH 6g】-086", imagePath: "螺纹规清单/公制外螺纹环规清单表/M28X1.5 LH 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M30X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M30X1.5 6g】-087", imagePath: "螺纹规清单/公制外螺纹环规清单表/M30X1.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M30X2 6g", instrumentNumber: "TSH_GZ_TR-【M30X2 6g】-088", imagePath: "螺纹规清单/公制外螺纹环规清单表/M30X2 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M30X3 6g", instrumentNumber: "TSH_GZ_TR-【M30X3 6g】-089", imagePath: "螺纹规清单/公制外螺纹环规清单表/M30X3 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M30X3.5 6g", instrumentNumber: "TSH_GZ_TR-【M30X3.5 6g】-090", imagePath: "螺纹规清单/公制外螺纹环规清单表/M30X3.5 6g(1).jpg" },
{ type: "公制外螺纹环规", fileName: "M30X3.5 6g", instrumentNumber: "TSH_GZ_TR-【M30X3.5 6g】-091", imagePath: "螺纹规清单/公制外螺纹环规清单表/M30X3.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M31X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M31X0.75 6g】-092", imagePath: "螺纹规清单/公制外螺纹环规清单表/M31X0.75 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M32X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M32X1.5 6g】-093", imagePath: "螺纹规清单/公制外螺纹环规清单表/M32X1.5 6g(1).jpg" },
{ type: "公制外螺纹环规", fileName: "M32X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M32X1.5 6g】-094", imagePath: "螺纹规清单/公制外螺纹环规清单表/M32X1.5 6g(2).jpg" },
{ type: "公制外螺纹环规", fileName: "M32X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M32X1.5 6g】-095", imagePath: "螺纹规清单/公制外螺纹环规清单表/M32X1.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M33X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M33X1.5 6g】-096", imagePath: "螺纹规清单/公制外螺纹环规清单表/M33X1.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M33X3.5 6g", instrumentNumber: "TSH_GZ_TR-【M33X3.5 6g】-097", imagePath: "螺纹规清单/公制外螺纹环规清单表/M33X3.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M34X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M34X0.5 6g】-098", imagePath: "螺纹规清单/公制外螺纹环规清单表/M34X0.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M35X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M35X1.5 6g】-099", imagePath: "螺纹规清单/公制外螺纹环规清单表/M35X1.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M36X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M36X0.75 6g】-100", imagePath: "螺纹规清单/公制外螺纹环规清单表/M36X0.75 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M36X1 6g", instrumentNumber: "TSH_GZ_TR-【M36X1 6g】-101", imagePath: "螺纹规清单/公制外螺纹环规清单表/M36X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M36X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M36X1.5 6g】-102", imagePath: "螺纹规清单/公制外螺纹环规清单表/M36X1.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M36X3 6g", instrumentNumber: "TSH_GZ_TR-【M36X3 6g】-103", imagePath: "螺纹规清单/公制外螺纹环规清单表/M36X3 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M37X1 6g", instrumentNumber: "TSH_GZ_TR-【M37X1 6g】-104", imagePath: "螺纹规清单/公制外螺纹环规清单表/M37X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M37X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M37X1.5 6g】-105", imagePath: "螺纹规清单/公制外螺纹环规清单表/M37X1.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M38X2.5 6g", instrumentNumber: "TSH_GZ_TR-【M38X2.5 6g】-106", imagePath: "螺纹规清单/公制外螺纹环规清单表/M38X2.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M41X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M41X0.75 6g】-107", imagePath: "螺纹规清单/公制外螺纹环规清单表/M41X0.75 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M42X4.5 6g", instrumentNumber: "TSH_GZ_TR-【M42X4.5 6g】-108", imagePath: "螺纹规清单/公制外螺纹环规清单表/M42X4.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M44X1 6g", instrumentNumber: "TSH_GZ_TR-【M44X1 6g】-109", imagePath: "螺纹规清单/公制外螺纹环规清单表/M44X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M44X2 6g", instrumentNumber: "TSH_GZ_TR-【M44X2 6g】-110", imagePath: "螺纹规清单/公制外螺纹环规清单表/M44X2 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M45X2 6g", instrumentNumber: "TSH_GZ_TR-【M45X2 6g】-111", imagePath: "螺纹规清单/公制外螺纹环规清单表/M45X2 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M46X0.5 6g", instrumentNumber: "TSH_GZ_TR-【M46X0.5 6g】-112", imagePath: "螺纹规清单/公制外螺纹环规清单表/M46X0.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M46X1 6g", instrumentNumber: "TSH_GZ_TR-【M46X1 6g】-113", imagePath: "螺纹规清单/公制外螺纹环规清单表/M46X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M48X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M48X0.75 6g】-114", imagePath: "螺纹规清单/公制外螺纹环规清单表/M48X0.75 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M48X2 6g", instrumentNumber: "TSH_GZ_TR-【M48X2 6g】-115", imagePath: "螺纹规清单/公制外螺纹环规清单表/M48X2 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M52X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M52X0.75 6g】-116", imagePath: "螺纹规清单/公制外螺纹环规清单表/M52X0.75 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M52X1 6g", instrumentNumber: "TSH_GZ_TR-【M52X1 6g】-117", imagePath: "螺纹规清单/公制外螺纹环规清单表/M52X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M56X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M56X0.75 6g】-118", imagePath: "螺纹规清单/公制外螺纹环规清单表/M56X0.75 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M58X1 6g", instrumentNumber: "TSH_GZ_TR-【M58X1 6g】-119", imagePath: "螺纹规清单/公制外螺纹环规清单表/M58X1 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M58X1.5 6g", instrumentNumber: "TSH_GZ_TR-【M58X1.5 6g】-120", imagePath: "螺纹规清单/公制外螺纹环规清单表/M58X1.5 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M60X2 6g", instrumentNumber: "TSH_GZ_TR-【M60X2 6g】-121", imagePath: "螺纹规清单/公制外螺纹环规清单表/M60X2 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M65X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M65X0.75 6g】-122", imagePath: "螺纹规清单/公制外螺纹环规清单表/M65X0.75 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M65X2 6g", instrumentNumber: "TSH_GZ_TR-【M65X2 6g】-123", imagePath: "螺纹规清单/公制外螺纹环规清单表/M65X2 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M66X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M66X0.75 6g】-124", imagePath: "螺纹规清单/公制外螺纹环规清单表/M66X0.75 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M68X2 6g", instrumentNumber: "TSH_GZ_TR-【M68X2 6g】-125", imagePath: "螺纹规清单/公制外螺纹环规清单表/M68X2 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M77X0.75 6g", instrumentNumber: "TSH_GZ_TR-【M77X0.75 6g】-126", imagePath: "螺纹规清单/公制外螺纹环规清单表/M77X0.75 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M78X2 6g", instrumentNumber: "TSH_GZ_TR-【M78X2 6g】-127", imagePath: "螺纹规清单/公制外螺纹环规清单表/M78X2 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M80X2 6g", instrumentNumber: "TSH_GZ_TR-【M80X2 6g】-128", imagePath: "螺纹规清单/公制外螺纹环规清单表/M80X2 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M80X2 LH 6g", instrumentNumber: "TSH_GZ_TR-【M80X2 LH 6g】-129", imagePath: "螺纹规清单/公制外螺纹环规清单表/M80X2 LH 6g.jpg" },
{ type: "公制外螺纹环规", fileName: "M90X1 6g", instrumentNumber: "TSH_GZ_TR-【M90X1 6g】-130", imagePath: "螺纹规清单/公制外螺纹环规清单表/M90X1 6g.jpg" }
];

// 获取当前根目录（模拟）
function getCurrentRoot() {
    return "/检具管理系统/";
}

// 提取M编号的函数
function extractMNumber(fileName) {
    const match = fileName.match(/M(\d+)/);
    return match ? parseInt(match[1]) : 0;
}

// 渲染表格数据
function renderTable(data) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    
    // 对公制螺纹数据按M编号排序
    const sortedData = [...data].sort((a, b) => {
        if (a.type.includes("公制") && b.type.includes("公制")) {
            return extractMNumber(a.fileName) - extractMNumber(b.fileName);
        }
        return a.type.localeCompare(b.type);
    });
    
    sortedData.forEach((item, index) => {
        const row = document.createElement('tr');
        
        // 为公制螺纹添加特殊标识
        const isMetric = item.type.includes("公制");
        const fileNameDisplay = isMetric ? 
            `<span style="color: #b21f1f; font-weight: bold;">${item.fileName}</span>` : 
            item.fileName;
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.type}</td>
            <td>${fileNameDisplay}</td>
            <td>${item.instrumentNumber}</td>
            <td>
                <button class="view-btn" data-index="${index}">
                    <i class="fas fa-eye"></i> <span>查看图片</span>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // 更新计数器
    document.getElementById('total-counter').textContent = data.length;
    
    // 添加查看按钮事件
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            showImageModal(sortedData[index]);
        });
    });
}

// 显示图片模态框
function showImageModal(item) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const imageTitle = document.getElementById('image-title');
    
    // 确保路径使用正确的转义字符
    modalImage.src = item.imagePath;   // 直接使用相对路径
    imageTitle.textContent = `${item.type} - ${item.fileName}`;
    modal.style.display = 'flex';
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 设置更新日期
    const now = new Date();
    document.getElementById('update-date').textContent = 
        `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    
    // 渲染表格
    renderTable(gaugeData);
    
    // 筛选功能
    document.getElementById('type-filter').addEventListener('change', function() {
        const type = this.value;
        const filteredData = type === 'all' ? 
            gaugeData : 
            gaugeData.filter(item => item.type === type);
        renderTable(filteredData);
    });
    
    // 搜索
    document.getElementById('search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (!searchTerm) {
            renderTable(gaugeData);
            return;
        }
        
        const filteredData = gaugeData.filter(item => 
            item.fileName.toLowerCase().includes(searchTerm) || 
            item.instrumentNumber.toLowerCase().includes(searchTerm)
        );
        renderTable(filteredData);
    });
    
    // 关闭模态框
    document.querySelector('.close-btn').addEventListener('click', function() {
        document.getElementById('image-modal').style.display = 'none';
    });
    
    // 点击模态框背景关闭
    document.getElementById('image-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
});
