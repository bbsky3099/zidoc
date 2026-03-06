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

const reportData = [
{ fileName: "1.2379（2016）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/1.2379（2016）.pdf" },
{ fileName: "1.2510（2022）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/1.2510（2022）.pdf" },
{ fileName: "1010（2023）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/1010（2023）.pdf" },
{ fileName: "1050（2023）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/1050（2023）.pdf" },
{ fileName: "2017（2023）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/2017（2023）.pdf" },
{ fileName: "2024-T351（2023）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/2024-T351（2023）.pdf" },
{ fileName: "20Mncr5(2021).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/20Mncr5(2021).pdf" },
{ fileName: "25CRMO4（2023）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/25CRMO4（2023）.pdf" },
{ fileName: "304L（2023）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/304L（2023）.pdf" },
{ fileName: "304医疗级（2023）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/304医疗级（2023）.pdf" },
{ fileName: "310(2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/310(2023).pdf" },
{ fileName: "316ti（2023）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/316ti（2023）.pdf" },
{ fileName: "4140.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/4140.pdf" },
{ fileName: "42CrMo_1.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/42CrMo(2023)/42CrMo_1.pdf" },
{ fileName: "42CrMo_2.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/42CrMo(2023)/42CrMo_2.pdf" },
{ fileName: "42Cr（2021）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/42Cr（2021）.pdf" },
{ fileName: "42Cr（2021）.png", year: "2023", type: "图片", filePath: "材质报告/2023/42Cr（2021）.png" },
{ fileName: "45# -20230712.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/45# -20230712.pdf" },
{ fileName: "5052-H112（2023）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/5052-H112（2023）.pdf" },
{ fileName: "5052-H32（2022）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/5052-H32（2022）.pdf" },
{ fileName: "6061-T6 (3)_1.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/6061-T6 (2023)/6061-T6 (3)_1.pdf" },
{ fileName: "6061-T6 (3)_10.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/6061-T6 (2023)/6061-T6 (3)_10.pdf" },
{ fileName: "6061-T6 (3)_11.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/6061-T6 (2023)/6061-T6 (3)_11.pdf" },
{ fileName: "6061-T6 (3)_12.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/6061-T6 (2023)/6061-T6 (3)_12.pdf" },
{ fileName: "6061-T6 (3)_13.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/6061-T6 (2023)/6061-T6 (3)_13.pdf" },
{ fileName: "6061-T6 (3)_14.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/6061-T6 (2023)/6061-T6 (3)_14.pdf" },
{ fileName: "6061-T6 (3)_15.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/6061-T6 (2023)/6061-T6 (3)_15.pdf" },
{ fileName: "6061-T6 (3)_16.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/6061-T6 (2023)/6061-T6 (3)_16.pdf" },
{ fileName: "6061-T6 (3)_2.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/6061-T6 (2023)/6061-T6 (3)_2.pdf" },
{ fileName: "6061-T6 (3)_3.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/6061-T6 (2023)/6061-T6 (3)_3.pdf" },
{ fileName: "6061-T6 (3)_4.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/6061-T6 (2023)/6061-T6 (3)_4.pdf" },
{ fileName: "6061-T6 (3)_5.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/6061-T6 (2023)/6061-T6 (3)_5.pdf" },
{ fileName: "6061-T6 (3)_6.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/6061-T6 (2023)/6061-T6 (3)_6.pdf" },
{ fileName: "6061-T6 (3)_7.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/6061-T6 (2023)/6061-T6 (3)_7.pdf" },
{ fileName: "6061-T6 (3)_8.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/6061-T6 (2023)/6061-T6 (3)_8.pdf" },
{ fileName: "6061-T6 (3)_9.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/6061-T6 (2023)/6061-T6 (3)_9.pdf" },
{ fileName: "6061铝板SGS-（2023中文版）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/6061铝板SGS-（2023中文版）.pdf" },
{ fileName: "6061铝板SGS-（2023英文版）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/6061铝板SGS-（2023英文版）.pdf" },
{ fileName: "7050(2023).jpg", year: "2023", type: "图片", filePath: "材质报告/2023/7050(2023).jpg" },
{ fileName: "7050(2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/7050(2023).pdf" },
{ fileName: "A753（2023）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/A753（2023）.pdf" },
{ fileName: "ABS中文 (2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/ABS中文 (2023).pdf" },
{ fileName: "ABS中文(2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/ABS中文(2023).pdf" },
{ fileName: "ABS黑色中文（2023）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/ABS黑色中文（2023）.pdf" },
{ fileName: "ASP2060..D6(高速钢HSS)(2021).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/ASP2060..D6(高速钢HSS)(2021).pdf" },
{ fileName: "C10100材质报告（2023）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/C10100材质报告（2023）.pdf" },
{ fileName: "C101红铜（2023）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/C101红铜（2023）.pdf" },
{ fileName: "C22000（2023）.jpg", year: "2023", type: "图片", filePath: "材质报告/2023/C22000（2023）.jpg" },
{ fileName: "C22000（2023）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/C22000（2023）.pdf" },
{ fileName: "CR12MO1V1.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/CR12MO1V1.pdf" },
{ fileName: "EK-1909S-626L_ROHS2.0_(2020).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/EK-1909S-626L_ROHS2.0_(2020).pdf" },
{ fileName: "EN10204  D6.5(2021).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/EN10204  D6.5(2021).pdf" },
{ fileName: "FR4-玻纤板检测报告(2016).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/FR4-玻纤板检测报告(2016).pdf" },
{ fileName: "H13(2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/H13(2023).pdf" },
{ fileName: "HPM75无磁钢(2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/HPM75无磁钢(2023).pdf" },
{ fileName: "NITRONIC 60(2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/NITRONIC 60(2023).pdf" },
{ fileName: "PET白色+NGM-T12耐格美塑胶RoHS10非金属英文(数据引用EGZ2304260172C00136R)(2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/PET白色+NGM-T12耐格美塑胶RoHS10非金属英文(数据引用EGZ2304260172C00136R)(2023).pdf" },
{ fileName: "PE板 SGS检测报告(2023).PDF", year: "2023", type: "PDF", filePath: "材质报告/2023/PE板 SGS检测报告(2023).PDF" },
{ fileName: "PPS物性报告(2021).PDF", year: "2023", type: "PDF", filePath: "材质报告/2023/PPS物性报告(2021).PDF" },
{ fileName: "PTFE(2022).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/PTFE(2022).pdf" },
{ fileName: "Q235B(2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/Q235B(2023).pdf" },
{ fileName: "SKD11(2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/SKD11(2023).pdf" },
{ fileName: "TSN23-020912-02_EC_TJP23-000501_F-铝板-中文(2023).PDF", year: "2023", type: "PDF", filePath: "材质报告/2023/TSN23-020912-02_EC_TJP23-000501_F-铝板-中文(2023).PDF" },
{ fileName: "_PA66-英文版（2006）.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/_PA66-英文版（2006）.pdf" },
{ fileName: "明泰1060  H12-25 (2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/明泰1060  H12-25 (2023).pdf" },
{ fileName: "本色PEEK(2021).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/本色PEEK(2021).pdf" },
{ fileName: "油缸(2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/油缸(2023).pdf" },
{ fileName: "白色HDPE FDA报告(2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/白色HDPE FDA报告(2023).pdf" },
{ fileName: "白色POM-C1 RoHS报告(2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/白色POM-C1 RoHS报告(2023).pdf" },
{ fileName: "白色POM板-REACH报告(2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/白色POM板-REACH报告(2023).pdf" },
{ fileName: "超高分子量聚乙烯SGS报告（黑色HDPE ）(2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/超高分子量聚乙烯SGS报告（黑色HDPE ）(2023).pdf" },
{ fileName: "透明PC FDA报告(2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/透明PC FDA报告(2023).pdf" },
{ fileName: "铝青铜(AluminiumBronz )(2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/铝青铜(AluminiumBronz )(2023).pdf" },
{ fileName: "锡青铜-20230613.jpg", year: "2023", type: "图片", filePath: "材质报告/2023/锡青铜-20230613.jpg" },
{ fileName: "锡青铜-20230613.pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/锡青铜-20230613.pdf" },
{ fileName: "黑色POM-C1 RoHS报告(2023).pdf", year: "2023", type: "PDF", filePath: "材质报告/2023/黑色POM-C1 RoHS报告(2023).pdf" },
{ fileName: "1.2085德国进口.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/1.2085德国进口.pdf" },
{ fileName: "1.2436SKD2.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/1.2436SKD2.pdf" },
{ fileName: "1.4057.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/1.4057.pdf" },
{ fileName: "1.4418.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/1.4418.pdf" },
{ fileName: "1018(1).pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/1018(1).pdf" },
{ fileName: "1018.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/1018.pdf" },
{ fileName: "1020.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/1020.pdf" },
{ fileName: "1035.jpg", year: "2024", type: "图片", filePath: "材质报告/2024/1035.jpg" },
{ fileName: "1035.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/1035.pdf" },
{ fileName: "1045.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/1045.pdf" },
{ fileName: "115CRV3(1).pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/115CRV3(1).pdf" },
{ fileName: "15-5PH.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/15-5PH.pdf" },
{ fileName: "17-4PH.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/17-4PH.pdf" },
{ fileName: "17-7PH.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/17-7PH.pdf" },
{ fileName: "2.4360.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/2.4360.pdf" },
{ fileName: "2007-T4铝板.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/2007-T4铝板.pdf" },
{ fileName: "2024-T6.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/2024-T6.pdf" },
{ fileName: "2024-T6.png", year: "2024", type: "图片", filePath: "材质报告/2024/2024-T6.png" },
{ fileName: "2083.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/2083.pdf" },
{ fileName: "2205.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/2205.pdf" },
{ fileName: "316.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/316.pdf" },
{ fileName: "316L  φ55.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/316L  φ55.pdf" },
{ fileName: "316L.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/316L.pdf" },
{ fileName: "34CrNiMo6(1).pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/34CrNiMo6(1).pdf" },
{ fileName: "4130.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/4130.pdf" },
{ fileName: "416.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/416.pdf" },
{ fileName: "420.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/420.pdf" },
{ fileName: "4340.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/4340.pdf" },
{ fileName: "5083 材质报告.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/5083 材质报告.pdf" },
{ fileName: "6060南铝20板.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/6060南铝20板.pdf" },
{ fileName: "6063-T5.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/6063-T5.pdf" },
{ fileName: "6063-T6.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/6063-T6.pdf" },
{ fileName: "7022-T6.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/7022-T6.pdf" },
{ fileName: "920万UPE物性检测报告SGS中文(1) (1).pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/920万UPE物性检测报告SGS中文(1) (1).pdf" },
{ fileName: "A36.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/A36.pdf" },
{ fileName: "AL C250-T6.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/AL C250-T6.pdf" },
{ fileName: "AL2030 材质证明.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/AL2030 材质证明.pdf" },
{ fileName: "C11000.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/C11000.pdf" },
{ fileName: "C1100红铜.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/C1100红铜.pdf" },
{ fileName: "C14200.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/C14200.pdf" },
{ fileName: "C14200.png", year: "2024", type: "图片", filePath: "材质报告/2024/C14200.png" },
{ fileName: "C17200铍铜棒 板 带.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/C17200铍铜棒 板 带.pdf" },
{ fileName: "C250(1).pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/C250(1).pdf" },
{ fileName: "C36000-Y2圆20.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/C36000-Y2圆20.pdf" },
{ fileName: "C36000圆棒-SGS.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/C36000圆棒-SGS.pdf" },
{ fileName: "C3604.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/C3604.pdf" },
{ fileName: "C93200 (2).pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/C93200 (2).pdf" },
{ fileName: "C93200.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/C93200.pdf" },
{ fileName: "CuZn28.jpg", year: "2024", type: "图片", filePath: "材质报告/2024/CuZn28.jpg" },
{ fileName: "CuZn28.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/CuZn28.pdf" },
{ fileName: "CuZn39PB3黄铜板10(1).pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/CuZn39PB3黄铜板10(1).pdf" },
{ fileName: "CuZn39PB3黄铜板10.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/CuZn39PB3黄铜板10.pdf" },
{ fileName: "CuZn40PB2(65)(1).pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/CuZn40PB2(65)(1).pdf" },
{ fileName: "CuZn40PB2(65).pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/CuZn40PB2(65).pdf" },
{ fileName: "D6.jpg", year: "2024", type: "图片", filePath: "材质报告/2024/D6.jpg" },
{ fileName: "D6.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/D6.pdf" },
{ fileName: "EGZ2404010117C00135RPEEK黑色防静电+NGM-K6东莞市耐格美塑胶制品有限公司RoHS10--非金属英文.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/EGZ2404010117C00135RPEEK黑色防静电+NGM-K6东莞市耐格美塑胶制品有限公司RoHS10--非金属英文.pdf" },
{ fileName: "EN24T.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/EN24T.pdf" },
{ fileName: "HT250.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/HT250.pdf" },
{ fileName: "K500合金.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/K500合金.pdf" },
{ fileName: "PEEK性能检测报告-中文).pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/PEEK性能检测报告-中文).pdf" },
{ fileName: "PEEK板棒性能报告英文版.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/PEEK板棒性能报告英文版.pdf" },
{ fileName: "PTFE（SGS） 2024XMIN2405000913CM04_EN.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/PTFE（SGS） 2024XMIN2405000913CM04_EN.pdf" },
{ fileName: "PVDF SGS报告YXS(1) -(1)(1).pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/PVDF SGS报告YXS(1) -(1)(1).pdf" },
{ fileName: "Q235B.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/Q235B.pdf" },
{ fileName: "Q345-20240115.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/Q345-20240115.pdf" },
{ fileName: "Q345.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/Q345.pdf" },
{ fileName: "QAL9-4.jpg", year: "2024", type: "图片", filePath: "材质报告/2024/QAL9-4.jpg" },
{ fileName: "QAL9-4.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/QAL9-4.pdf" },
{ fileName: "Rohs-中文铁氟龙(1).pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/Rohs-中文铁氟龙(1).pdf" },
{ fileName: "S136.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/S136.pdf" },
{ fileName: "SAE4130.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/SAE4130.pdf" },
{ fileName: "SAE4130_20240115.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/SAE4130_20240115.pdf" },
{ fileName: "SAE4340_20240115.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/SAE4340_20240115.pdf" },
{ fileName: "SKD2.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/SKD2.pdf" },
{ fileName: "SS416.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/SS416.pdf" },
{ fileName: "SUS 304.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/SUS 304.pdf" },
{ fileName: "TA2-241104.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/TA2-241104.pdf" },
{ fileName: "TA2-241104.png", year: "2024", type: "图片", filePath: "材质报告/2024/TA2-241104.png" },
{ fileName: "TC4-241104.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/TC4-241104.pdf" },
{ fileName: "TC4-241104.png", year: "2024", type: "图片", filePath: "材质报告/2024/TC4-241104.png" },
{ fileName: "TC4.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/TC4.pdf" },
{ fileName: "Ti-6Al-4v(1).pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/Ti-6Al-4v(1).pdf" },
{ fileName: "Ti-6Al-4v.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/Ti-6Al-4v.pdf" },
{ fileName: "U-460ROSH报告.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/U-460ROSH报告.pdf" },
{ fileName: "X30CR13.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/X30CR13.pdf" },
{ fileName: "inconel718.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/inconel718.pdf" },
{ fileName: "item6063型材 (2).PNG", year: "2024", type: "图片", filePath: "材质报告/2024/item6063型材 (2).PNG" },
{ fileName: "item6063型材 (2).pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/item6063型材 (2).pdf" },
{ fileName: "光面铝板6061T6 20 .pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/光面铝板6061T6 20 .pdf" },
{ fileName: "光面铝板6082 T6 20 202407277046.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/光面铝板6082 T6 20 202407277046.pdf" },
{ fileName: "尼龙棒SGS报告.PDF", year: "2024", type: "PDF", filePath: "材质报告/2024/尼龙棒SGS报告.PDF" },
{ fileName: "材质证明- 6061铝板.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/材质证明- 6061铝板.pdf" },
{ fileName: "白色聚四氟乙烯中文报告.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/白色聚四氟乙烯中文报告.pdf" },
{ fileName: "铝板5083 H112 20 202407279802.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/铝板5083 H112 20 202407279802.pdf" },
{ fileName: "铝板6061-T651 20.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/铝板6061-T651 20.pdf" },
{ fileName: "铝板7075-T6 20 202407271272.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/铝板7075-T6 20 202407271272.pdf" },
{ fileName: "铝板（6082~）.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/铝板（6082~）.pdf" },
{ fileName: "鸿贸GR2钛棒材质报告_20241125145245(1).pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/鸿贸GR2钛棒材质报告_20241125145245(1).pdf" },
{ fileName: "黄铜.jpg", year: "2024", type: "图片", filePath: "材质报告/2024/黄铜.jpg" },
{ fileName: "黄铜.pdf", year: "2024", type: "PDF", filePath: "材质报告/2024/黄铜.pdf" },
{ fileName: "1.0718.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/1.0718.pdf" },
{ fileName: "1.2083..pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/1.2083..pdf" },
{ fileName: "1.2083.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/1.2083.pdf" },
{ fileName: "1.2363.jpg", year: "2025", type: "图片", filePath: "材质报告/2025/1.2363.jpg" },
{ fileName: "1.2363.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/1.2363.pdf" },
{ fileName: "1.2379.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/1.2379.pdf" },
{ fileName: "1.4305.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/1.4305.pdf" },
{ fileName: "1.4462.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/1.4462.pdf" },
{ fileName: "1.5715(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/1.5715(1).pdf" },
{ fileName: "100MnCrW4.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/100MnCrW4.pdf" },
{ fileName: "1040.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/1040.pdf" },
{ fileName: "15-5.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/15-5.pdf" },
{ fileName: "16MNCR5-250821.jpg", year: "2025", type: "图片", filePath: "材质报告/2025/16MNCR5-250821.jpg" },
{ fileName: "16MNCR5-250821.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/16MNCR5-250821.pdf" },
{ fileName: "17-4PH.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/17-4PH.pdf" },
{ fileName: "17-4PH盖章(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/17-4PH盖章(1).pdf" },
{ fileName: "1_CW614N棒12(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/1_CW614N棒12(1).pdf" },
{ fileName: "1_CW614N棒12.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/1_CW614N棒12.pdf" },
{ fileName: "1_Ecu57圆棒35(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/1_Ecu57圆棒35(1).pdf" },
{ fileName: "1_Ecu57圆棒35.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/1_Ecu57圆棒35.pdf" },
{ fileName: "2024T351材质证明.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/2024T351材质证明.pdf" },
{ fileName: "2024T3圆棒.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/2024T3圆棒.pdf" },
{ fileName: "20MNCR5-02.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/20MNCR5-02.pdf" },
{ fileName: "20MNCR5-25-11-10.jpg", year: "2025", type: "图片", filePath: "材质报告/2025/20MNCR5-25-11-10.jpg" },
{ fileName: "20MNCR5-25-11-10.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/20MNCR5-25-11-10.pdf" },
{ fileName: "20MnCR5-01.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/20MnCR5-01.pdf" },
{ fileName: "3#锌合金.jpg", year: "2025", type: "图片", filePath: "材质报告/2025/3#锌合金.jpg" },
{ fileName: "3#锌合金.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/3#锌合金.pdf" },
{ fileName: "303.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/303.pdf" },
{ fileName: "304.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/304.pdf" },
{ fileName: "304L.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/304L.pdf" },
{ fileName: "304（1）.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/304（1）.pdf" },
{ fileName: "30crmnsia(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/30crmnsia(1).pdf" },
{ fileName: "30crmnsia.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/30crmnsia.pdf" },
{ fileName: "30mn2.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/30mn2.pdf" },
{ fileName: "310(2).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/310(2).pdf" },
{ fileName: "310S.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/310S.pdf" },
{ fileName: "316(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/316(1).pdf" },
{ fileName: "316L   R50.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/316L   R50.pdf" },
{ fileName: "316L.jpg", year: "2025", type: "图片", filePath: "材质报告/2025/316L.jpg" },
{ fileName: "316L.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/316L.pdf" },
{ fileName: "316毛细管6.35x5.35.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/316毛细管6.35x5.35.pdf" },
{ fileName: "321.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/321.pdf" },
{ fileName: "35CrMo -12.9级螺丝材质.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/35CrMo -12.9级螺丝材质.pdf" },
{ fileName: "40CRNIMO.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/40CRNIMO.pdf" },
{ fileName: "40Cr.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/40Cr.pdf" },
{ fileName: "42CRMO4.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/42CRMO4.pdf" },
{ fileName: "42CrMo4.jpg", year: "2025", type: "图片", filePath: "材质报告/2025/42CrMo4.jpg" },
{ fileName: "4340-25-11-25.jpg", year: "2025", type: "图片", filePath: "材质报告/2025/4340-25-11-25.jpg" },
{ fileName: "4340-25-11-25.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/4340-25-11-25.pdf" },
{ fileName: "4340.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/4340.pdf" },
{ fileName: "4340材料.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/4340材料.pdf" },
{ fileName: "4J36(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/4J36(1).pdf" },
{ fileName: "5052-H112(2).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/5052-H112(2).pdf" },
{ fileName: "5083-H112.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/5083-H112.pdf" },
{ fileName: "5086铝棒30.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/5086铝棒30.pdf" },
{ fileName: "5086铝棒85.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/5086铝棒85.pdf" },
{ fileName: "5754.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/5754.pdf" },
{ fileName: "5754.png", year: "2025", type: "图片", filePath: "材质报告/2025/5754.png" },
{ fileName: "5CrNiMo.jpg", year: "2025", type: "图片", filePath: "材质报告/2025/5CrNiMo.jpg" },
{ fileName: "5CrNiMo.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/5CrNiMo.pdf" },
{ fileName: "6060-1.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/6060-1.pdf" },
{ fileName: "6060.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/6060.pdf" },
{ fileName: "6060.png", year: "2025", type: "图片", filePath: "材质报告/2025/6060.png" },
{ fileName: "6061---290M.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/6061---290M.pdf" },
{ fileName: "6061--350.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/6061--350.pdf" },
{ fileName: "6061-260--.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/6061-260--.pdf" },
{ fileName: "6061-T6 (2).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/6061-T6 (2).pdf" },
{ fileName: "6061-T6.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/6061-T6.pdf" },
{ fileName: "6061-t651材质报告.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/6061-t651材质报告.pdf" },
{ fileName: "6062.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/6062.pdf" },
{ fileName: "6062.png", year: "2025", type: "图片", filePath: "材质报告/2025/6062.png" },
{ fileName: "6063-T651.jpg", year: "2025", type: "图片", filePath: "材质报告/2025/6063-T651.jpg" },
{ fileName: "6063-T651.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/6063-T651.pdf" },
{ fileName: "6063材质报告.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/6063材质报告.pdf" },
{ fileName: "6082-T6.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/6082-T6.pdf" },
{ fileName: "6082铝材20250515中文版.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/6082铝材20250515中文版.pdf" },
{ fileName: "7075---85N.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/7075---85N.pdf" },
{ fileName: "7075-T6板.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/7075-T6板.pdf" },
{ fileName: "7075-T6管料.jpg", year: "2025", type: "图片", filePath: "材质报告/2025/7075-T6管料.jpg" },
{ fileName: "7075-T6管料.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/7075-T6管料.pdf" },
{ fileName: "7075板材质报告.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/7075板材质报告.pdf" },
{ fileName: "A286.jpg", year: "2025", type: "图片", filePath: "材质报告/2025/A286.jpg" },
{ fileName: "A286.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/A286.pdf" },
{ fileName: "ABS（中）abs材料性能参数表(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/ABS（中）abs材料性能参数表(1).pdf" },
{ fileName: "ABS（中）abs材料性能参数表.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/ABS（中）abs材料性能参数表.pdf" },
{ fileName: "AISI 321.jpg", year: "2025", type: "图片", filePath: "材质报告/2025/AISI 321.jpg" },
{ fileName: "AISI 321.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/AISI 321.pdf" },
{ fileName: "AISI4340.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/AISI4340.pdf" },
{ fileName: "AiSi420盖章.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/AiSi420盖章.pdf" },
{ fileName: "Aluminium Tooling Plate C250.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/Aluminium Tooling Plate C250.pdf" },
{ fileName: "C1100-T2力学检测(中文).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/C1100-T2力学检测(中文).pdf" },
{ fileName: "C1100-T2力学检测(英文).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/C1100-T2力学检测(英文).pdf" },
{ fileName: "C1100-T2成分检测(中文).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/C1100-T2成分检测(中文).pdf" },
{ fileName: "C1100-T2成分检测(英文).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/C1100-T2成分检测(英文).pdf" },
{ fileName: "C1100-T2环保检测(中文).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/C1100-T2环保检测(中文).pdf" },
{ fileName: "C1100-T2环保检测(英文).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/C1100-T2环保检测(英文).pdf" },
{ fileName: "C276(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/C276(1).pdf" },
{ fileName: "C46400.jpg", year: "2025", type: "图片", filePath: "材质报告/2025/C46400.jpg" },
{ fileName: "C46400.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/C46400.pdf" },
{ fileName: "C932-1.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/C932-1.pdf" },
{ fileName: "C932.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/C932.pdf" },
{ fileName: "C932.png", year: "2025", type: "图片", filePath: "材质报告/2025/C932.png" },
{ fileName: "CUZN37圆棒10.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/CUZN37圆棒10.pdf" },
{ fileName: "D2.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/D2.pdf" },
{ fileName: "EN24T(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/EN24T(1).pdf" },
{ fileName: "EN24T.jpg", year: "2025", type: "图片", filePath: "材质报告/2025/EN24T.jpg" },
{ fileName: "FR4-G10.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/FR4-G10.pdf" },
{ fileName: "FR4-G10板材TDS报告.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/FR4-G10板材TDS报告.pdf" },
{ fileName: "FR4.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/FR4.pdf" },
{ fileName: "G-10性能参数表(3).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/G-10性能参数表(3).pdf" },
{ fileName: "G-10性能参数表.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/G-10性能参数表.pdf" },
{ fileName: "GCR15.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/GCR15.pdf" },
{ fileName: "GEHR_TD_PA_6_6_30GF_en(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/GEHR_TD_PA_6_6_30GF_en(1).pdf" },
{ fileName: "GEHR_TD_PA_6_6_30GF_en.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/GEHR_TD_PA_6_6_30GF_en.pdf" },
{ fileName: "GEHR_TD_PEEK_en(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/GEHR_TD_PEEK_en(1).pdf" },
{ fileName: "GEHR_TD_PVC-C.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/GEHR_TD_PVC-C.pdf" },
{ fileName: "H13(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/H13(1).pdf" },
{ fileName: "HDPE物性表(6094).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/HDPE物性表(6094).pdf" },
{ fileName: "HPb62-3铜棒质证明.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/HPb62-3铜棒质证明.pdf" },
{ fileName: "HSS(2025).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/HSS(2025).pdf" },
{ fileName: "KETRON 1000 PEEK(450G)_DATE(TDS)[英文版].pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/KETRON 1000 PEEK(450G)_DATE(TDS)[英文版].pdf" },
{ fileName: "O1钢.jpg", year: "2025", type: "图片", filePath: "材质报告/2025/O1钢.jpg" },
{ fileName: "O1钢.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/O1钢.pdf" },
{ fileName: "PA(中）.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PA(中）.pdf" },
{ fileName: "PA+GF-V0 物性表(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PA+GF-V0 物性表(1).pdf" },
{ fileName: "PA+GF-V0 物性表.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PA+GF-V0 物性表.pdf" },
{ fileName: "PAI报告.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PAI报告.pdf" },
{ fileName: "PC(中）.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PC(中）.pdf" },
{ fileName: "PC(恩欣龙).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PC(恩欣龙).pdf" },
{ fileName: "PEEK TDS（英文版）.PDF", year: "2025", type: "PDF", filePath: "材质报告/2025/PEEK TDS（英文版）.PDF" },
{ fileName: "PEEK_物性报告.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PEEK_物性报告.pdf" },
{ fileName: "PEEK医疗级-英文版.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PEEK医疗级-英文版.pdf" },
{ fileName: "PEEK医疗级（中文版）.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PEEK医疗级（中文版）.pdf" },
{ fileName: "PEI0.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PEI0.pdf" },
{ fileName: "PEI_性能参数表 QUADRANT_U1000_.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PEI_性能参数表 QUADRANT_U1000_.pdf" },
{ fileName: "PET板物性表 (1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PET板物性表 (1).pdf" },
{ fileName: "PET板物性表 .pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PET板物性表 .pdf" },
{ fileName: "PE食品级英文.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PE食品级英文.pdf" },
{ fileName: "POM 物性表(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/POM 物性表(1).pdf" },
{ fileName: "POM 物性表.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/POM 物性表.pdf" },
{ fileName: "PP(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PP(1).pdf" },
{ fileName: "PP.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PP.pdf" },
{ fileName: "PPS物性表(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PPS物性表(1).pdf" },
{ fileName: "PPS物性表.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PPS物性表.pdf" },
{ fileName: "PTFE  材质报告(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PTFE  材质报告(1).pdf" },
{ fileName: "PVDF(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/PVDF(1).pdf" },
{ fileName: "Polystone M Green(2).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/Polystone M Green(2).pdf" },
{ fileName: "Q275.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/Q275.pdf" },
{ fileName: "S275JR(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/S275JR(1).pdf" },
{ fileName: "S275JR.jpg", year: "2025", type: "图片", filePath: "材质报告/2025/S275JR.jpg" },
{ fileName: "S355(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/S355(1).pdf" },
{ fileName: "S355J2.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/S355J2.pdf" },
{ fileName: "S700MC.jpg", year: "2025", type: "图片", filePath: "材质报告/2025/S700MC.jpg" },
{ fileName: "S700MC.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/S700MC.pdf" },
{ fileName: "SKH 55.jpg", year: "2025", type: "图片", filePath: "材质报告/2025/SKH 55.jpg" },
{ fileName: "SKH 55.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/SKH 55.pdf" },
{ fileName: "ST37(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/ST37(1).pdf" },
{ fileName: "SUS420J2(2).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/SUS420J2(2).pdf" },
{ fileName: "T2(C1100)-Y2.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/T2(C1100)-Y2.pdf" },
{ fileName: "T2(C1100).jpg", year: "2025", type: "图片", filePath: "材质报告/2025/T2(C1100).jpg" },
{ fileName: "T2（C1100）RoHs中文(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/T2（C1100）RoHs中文(1).pdf" },
{ fileName: "TC4 (2).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/TC4 (2).pdf" },
{ fileName: "UHMW-超高分子聚乙烯报告.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/UHMW-超高分子聚乙烯报告.pdf" },
{ fileName: "ULTEM 1000中文 ROSH.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/ULTEM 1000中文 ROSH.pdf" },
{ fileName: "UPE.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/UPE.pdf" },
{ fileName: "X5CrNi18-10.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/X5CrNi18-10.pdf" },
{ fileName: "YG8.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/YG8.pdf" },
{ fileName: "YG8.png", year: "2025", type: "图片", filePath: "材质报告/2025/YG8.png" },
{ fileName: "c52400.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/c52400.pdf" },
{ fileName: "c52400.png", year: "2025", type: "图片", filePath: "材质报告/2025/c52400.png" },
{ fileName: "item6063型材.PNG", year: "2025", type: "图片", filePath: "材质报告/2025/item6063型材.PNG" },
{ fileName: "item6063型材.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/item6063型材.pdf" },
{ fileName: "医用级PEEK物性表-中文版.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/医用级PEEK物性表-中文版.pdf" },
{ fileName: "医用级PEEK物性表-英文版.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/医用级PEEK物性表-英文版.pdf" },
{ fileName: "江铜宏源H70圆Ø10.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/江铜宏源H70圆Ø10.pdf" },
{ fileName: "环氧玻璃布层压板（FR-4 G10 FR-5 G11）产品质量标准(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/环氧玻璃布层压板（FR-4 G10 FR-5 G11）产品质量标准(1).pdf" },
{ fileName: "环氧玻璃布层压板（FR-4 G10 FR-5 G11）英文版.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/环氧玻璃布层压板（FR-4 G10 FR-5 G11）英文版.pdf" },
{ fileName: "白色阻燃PC-ROHS报告.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/白色阻燃PC-ROHS报告.pdf" },
{ fileName: "进口 PTFE（食品医疗级） .pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/进口 PTFE（食品医疗级） .pdf" },
{ fileName: "透明pc（医疗级）.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/透明pc（医疗级）.pdf" },
{ fileName: "鑫长宏进口 PTFE  材质报告(1)(1).pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/鑫长宏进口 PTFE  材质报告(1)(1).pdf" },
{ fileName: "铝板6061.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/铝板6061.pdf" },
{ fileName: "铝青铜.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/铝青铜.pdf" },
{ fileName: "锡青铜-20250613.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/锡青铜-20250613.pdf" },
{ fileName: "锡青铜.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/锡青铜.pdf" },
{ fileName: "黄铜CUZN37.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/黄铜CUZN37.pdf" },
{ fileName: "黑色ULITM1000.pdf", year: "2025", type: "PDF", filePath: "材质报告/2025/黑色ULITM1000.pdf" },
{ fileName: "01钢.jpg", year: "2026", type: "图片", filePath: "材质报告/2026/01钢.jpg" },
{ fileName: "1.2344盖章.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/1.2344盖章.pdf" },
{ fileName: "17-4PH盖章(1).pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/17-4PH盖章(1).pdf" },
{ fileName: "17-4PH盖章.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/17-4PH盖章.pdf" },
{ fileName: "20MNCR5-02.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/20MNCR5-02.pdf" },
{ fileName: "20MnCR5-01.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/20MnCR5-01.pdf" },
{ fileName: "303盖章.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/303盖章.pdf" },
{ fileName: "304盖章.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/304盖章.pdf" },
{ fileName: "316L盖章.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/316L盖章.pdf" },
{ fileName: "316盖章.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/316盖章.pdf" },
{ fileName: "420光谱.jpg", year: "2026", type: "图片", filePath: "材质报告/2026/420光谱.jpg" },
{ fileName: "42CRMO4盖章01.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/42CRMO4盖章01.pdf" },
{ fileName: "42CrMo4.jpg", year: "2026", type: "图片", filePath: "材质报告/2026/42CrMo4.jpg" },
{ fileName: "42CrMo4.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/42CrMo4.pdf" },
{ fileName: "42CrMo4光谱.jpg", year: "2026", type: "图片", filePath: "材质报告/2026/42CrMo4光谱.jpg" },
{ fileName: "4340.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/4340.pdf" },
{ fileName: "6061T6  材质证明 (3)(1).pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/6061T6  材质证明 (3)(1).pdf" },
{ fileName: "6063-T5.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/6063-T5.pdf" },
{ fileName: "6063.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/6063.pdf" },
{ fileName: "65MN光谱.jpg", year: "2026", type: "图片", filePath: "材质报告/2026/65MN光谱.jpg" },
{ fileName: "65MN盖章.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/65MN盖章.pdf" },
{ fileName: "AiSi420盖章.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/AiSi420盖章.pdf" },
{ fileName: "C1100-T2_力学检测(中文).pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/C1100-T2_力学检测(中文).pdf" },
{ fileName: "C1100-T2_力学检测(英文).pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/C1100-T2_力学检测(英文).pdf" },
{ fileName: "C1100-T2_成分检测(中文).pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/C1100-T2_成分检测(中文).pdf" },
{ fileName: "C1100-T2_成分检测(英文).pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/C1100-T2_成分检测(英文).pdf" },
{ fileName: "C1100-T2_环保检测(中文).pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/C1100-T2_环保检测(中文).pdf" },
{ fileName: "C1100-T2_环保检测(英文).pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/C1100-T2_环保检测(英文).pdf" },
{ fileName: "FR-4技术参数表(3)(2).pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/FR-4技术参数表(3)(2).pdf" },
{ fileName: "G-11 中文(1).pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/G-11 中文(1).pdf" },
{ fileName: "H13电子章.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/H13电子章.pdf" },
{ fileName: "Product_handling_PVDF.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/Product_handling_PVDF.pdf" },
{ fileName: "SUS420盖章(1).pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/SUS420盖章(1).pdf" },
{ fileName: "Ti-6Al-4v盖章.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/Ti-6Al-4v盖章.pdf" },
{ fileName: "Ti6A-4V盖章(2).pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/Ti6A-4V盖章(2).pdf" },
{ fileName: "ZL104.jpg", year: "2026", type: "图片", filePath: "材质报告/2026/ZL104.jpg" },
{ fileName: "ZL104.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/ZL104.pdf" },
{ fileName: "ZL111.png", year: "2026", type: "图片", filePath: "材质报告/2026/ZL111.png" },
{ fileName: "pvc（中）.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/pvc（中）.pdf" },
{ fileName: "美国杜邦Delrin 物性数据表.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/美国杜邦Delrin 物性数据表.pdf" },
{ fileName: "铝板6061(1).pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/铝板6061(1).pdf" },
{ fileName: "防静电玻纤板.pdf", year: "2026", type: "PDF", filePath: "材质报告/2026/防静电玻纤板.pdf" }
];

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 设置更新日期
    const now = new Date();
    document.getElementById('update-date').textContent = 
        `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

    // 初始化年份筛选器和年份按钮
    initYearFilters();
    
    // 渲染文件表格
    renderFileTable(reportData);
    
    // 设置事件监听器
    setupEventListeners();
});

// 初始化年份筛选器
function initYearFilters() {
    const yearFilter = document.getElementById('year-filter');
    const yearList = document.getElementById('year-list');
    
    // 获取所有不重复的年份
    const years = [...new Set(reportData.map(item => item.year))].sort((a, b) => b - a);
    
    // 清空现有选项
    yearFilter.innerHTML = '<option value="all">全部年份</option>';
    yearList.innerHTML = '';
    
    // 添加"全部"按钮
    const allButton = document.createElement('button');
    allButton.className = 'year-btn active';
    allButton.textContent = '全部';
    allButton.setAttribute('data-year', 'all');
    yearList.appendChild(allButton);
    
    // 添加年份选项和按钮
    years.forEach(year => {
        // 添加到下拉筛选器
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
        
        // 添加到年份按钮列表
        const yearButton = document.createElement('button');
        yearButton.className = 'year-btn';
        yearButton.textContent = year;
        yearButton.setAttribute('data-year', year);
        yearList.appendChild(yearButton);
    });
}

// 渲染文件表格
function renderFileTable(data) {
    const tableBody = document.getElementById('file-table-body');
    const noFilesMessage = document.getElementById('no-files-message');
    
    // 清空表格
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
        noFilesMessage.style.display = 'block';
        document.getElementById('total-files').textContent = '总文件数: 0';
        return;
    }
    
    noFilesMessage.style.display = 'none';
    
    // 填充表格
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        
        // 根据文件类型设置图标
        const fileIcon = item.type === 'PDF' ? 
            '<i class="fas fa-file-pdf"></i>' : 
            '<i class="fas fa-file-image"></i>';
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><span class="file-icon">${fileIcon}</span> ${item.type}</td>
            <td class="file-name">${item.fileName}</td>
            <td>${item.year}</td>
            <td class="file-actions">
                <button class="action-btn view-btn" data-filepath="${item.filePath}" data-filename="${item.fileName}" data-type="${item.type}">
                    <i class="fas fa-eye"></i> 查看
                </button>
                <button class="action-btn download-btn" data-filepath="${item.filePath}" data-filename="${item.fileName}">
                    <i class="fas fa-download"></i> 下载
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // 更新文件计数
    document.getElementById('total-files').textContent = `总文件数: ${data.length}`;
}

// 设置事件监听器
function setupEventListeners() {
    // 搜索功能
    document.getElementById('search').addEventListener('input', function() {
        filterFiles();
    });
    
    // 年份筛选器
    document.getElementById('year-filter').addEventListener('change', function() {
        filterFiles();
        updateYearButtons(this.value);
    });
    
    // 年份按钮
    document.getElementById('year-list').addEventListener('click', function(e) {
        if (e.target.classList.contains('year-btn')) {
            const year = e.target.getAttribute('data-year');
            document.getElementById('year-filter').value = year;
            filterFiles();
            updateYearButtons(year);
        }
    });
    
    // 查看按钮
    document.addEventListener('click', function(e) {
        if (e.target.closest('.view-btn')) {
            const button = e.target.closest('.view-btn');
            const filePath = button.getAttribute('data-filepath');
            const fileName = button.getAttribute('data-filename');
            const fileType = button.getAttribute('data-type');
            showFileModal(filePath, fileName, fileType);
        }
        
        // 下载按钮
        if (e.target.closest('.download-btn')) {
            const button = e.target.closest('.download-btn');
            const filePath = button.getAttribute('data-filepath');
            const fileName = button.getAttribute('data-filename');
            downloadFile(filePath, fileName);
        }
    });
    
    // 关闭模态框
    document.querySelector('.close-btn').addEventListener('click', function() {
        document.getElementById('file-modal').style.display = 'none';
    });
    
    // 点击模态框背景关闭
    document.getElementById('file-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
}

// 筛选文件
function filterFiles() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const selectedYear = document.getElementById('year-filter').value;
    
    let filteredData = reportData;
    
    // 按年份筛选
    if (selectedYear !== 'all') {
        filteredData = filteredData.filter(item => item.year === selectedYear);
    }
    
    // 按搜索词筛选
    if (searchTerm) {
        filteredData = filteredData.filter(item => 
            item.fileName.toLowerCase().includes(searchTerm)
        );
    }
    
    // 更新当前年份显示
    document.getElementById('current-year').textContent = 
        selectedYear === 'all' ? '当前年份: 全部' : `当前年份: ${selectedYear}`;
    
    // 重新渲染表格
    renderFileTable(filteredData);
}

// 更新年份按钮状态
function updateYearButtons(selectedYear) {
    const yearButtons = document.querySelectorAll('.year-btn');
    yearButtons.forEach(button => {
        if (button.getAttribute('data-year') === selectedYear) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// 显示文件模态框
function showFileModal(filePath, fileName, fileType) {
    const modal = document.getElementById('file-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = fileName;
    modalBody.innerHTML = '';
    
    if (fileType === 'PDF') {
        // 使用iframe显示PDF
        const pdfViewer = document.createElement('iframe');
        pdfViewer.className = 'pdf-viewer';
        pdfViewer.src = filePath;
        modalBody.appendChild(pdfViewer);
    } else {
        // 使用img标签显示图片
        const imageViewer = document.createElement('img');
        imageViewer.className = 'image-viewer';
        imageViewer.src = filePath;
        imageViewer.alt = fileName;
        modalBody.appendChild(imageViewer);
    }
    
    modal.style.display = 'flex';
}

// 下载文件
function downloadFile(filePath, fileName) {
    // 创建临时下载链接
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.download = fileName;
    downloadLink.style.display = 'none';
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // 在实际环境中，这里可能需要使用服务器端脚本来处理文件下载
    // 因为直接链接到网络路径可能无法触发下载
    console.log(`下载文件: ${fileName} (${filePath})`);
}
