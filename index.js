        // ================= 功能初始化：自动更新日期 =================
        document.addEventListener('DOMContentLoaded', function() {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            
            const dateElement = document.getElementById('update-date');
            if (dateElement) {
                dateElement.textContent = `${year}-${month}-${day}`;
            }
        });

        // ================= 安全保护逻辑 =================
        
        // 禁用右键菜单
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            removeExistingTooltip();
            
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

        // 禁用所有查看源码的快捷键
        document.addEventListener('keydown', function(e) {
            let shouldPrevent = false;
            let message = "";
            
            if (e.key === 'F12') {
                shouldPrevent = true;
                message = "🔍 这个按键在这里有其他用途哦！";
            }
            if (e.ctrlKey && e.key === 'u') {
                shouldPrevent = true;
                message = "🔮 源代码是魔法师的秘密，暂时不能公开哦！";
            }
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                shouldPrevent = true;
                message = "🎪 这个组合键会召唤小精灵，但今天它们休息了~";
            }
            if (e.ctrlKey && e.shiftKey && e.key === 'J') {
                shouldPrevent = true;
                message = "📝 这个快捷键正在参加茶话会，晚点再来试试~";
            }
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                shouldPrevent = true;
                message = "🎨 这个功能正在创作新作品，稍后再来查看~";
            }
            if ((e.metaKey || e.ctrlKey) && e.altKey && e.key === 'U') {
                shouldPrevent = true;
                message = "🔮 源代码是魔法师的秘密，暂时不能公开哦！";
            }
            if ((e.metaKey || e.ctrlKey) && e.altKey && e.key === 'I') {
                shouldPrevent = true;
                message = "🎪 这个组合键会召唤小精灵，但今天它们休息了~";
            }
            if ((e.metaKey || e.ctrlKey) && e.altKey && e.key === 'C') {
                shouldPrevent = true;
                message = "🎨 这个功能正在创作新作品，稍后再来查看~";
            }
            if ((e.metaKey || e.ctrlKey) && e.key === 'u') {
                shouldPrevent = true;
                message = "🔮 源代码是魔法师的秘密，暂时不能公开哦！";
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                shouldPrevent = true;
                message = "🔎 搜索功能暂时无法使用，请稍后再试~";
            }
            
            if (shouldPrevent) {
                e.preventDefault();
                e.stopPropagation();
                removeExistingTooltip();
                showTooltip(message, window.innerWidth / 2, window.innerHeight / 3);
                return false;
            }
        });

        // 防止通过地址栏输入 view-source:
        try {
            const hrefDescriptor = Object.getOwnPropertyDescriptor(Location.prototype, 'href');
            if (hrefDescriptor && hrefDescriptor.set) {
                const originalHrefSetter = hrefDescriptor.set;
                Object.defineProperty(Location.prototype, 'href', {
                    set: function(value) {
                        if (value && value.toString().startsWith('view-source:')) {
                            removeExistingTooltip();
                            showTooltip("🔮 源代码是魔法师的秘密，暂时不能公开哦！", window.innerWidth / 2, window.innerHeight / 3);
                            return;
                        }
                        originalHrefSetter.call(this, value);
                    }
                });
            }
        } catch (e) { /* 忽略错误 */ }

        // 简单的开发者工具检测
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
        setInterval(checkDevTools, 1000);

        // 显示提示框函数
        function showTooltip(message, x, y) {
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
                pointer-events: none;
            `;
            
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
            
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 3000);
        }

        function removeExistingTooltip() {
            const existingTooltip = document.getElementById('friendly-tooltip');
            if (existingTooltip) {
                existingTooltip.parentNode.removeChild(existingTooltip);
            }
        }

        // 页面加载完成后的初始化
        window.addEventListener('load', function() {
            console.log("🔒 创意保护模式已激活 - 享受安全浏览体验！");
            
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
                pointer-events: none;
            `;
            footerNote.textContent = "🔒 安全浏览模式";
            document.body.appendChild(footerNote);
        });