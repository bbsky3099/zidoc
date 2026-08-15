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
            // 3. 创建“安全浏览模式”提示文字       
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
