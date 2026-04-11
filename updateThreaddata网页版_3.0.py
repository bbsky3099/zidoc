import os
import datetime
import re
import time
import tkinter as tk
from tkinter import ttk, filedialog, messagebox, scrolledtext
import platform
import subprocess

# 指定目标文件夹路径
root_dir = r"E:\github\zidoc\螺纹规清单"

# 指定存放文件夹路径
output_dir = r"E:\github\zidoc"

print(f"目标文件夹路径: {root_dir}")
print(f"输出文件夹路径: {output_dir}")

# 指定要遍历的文件夹名称
folders_to_scan = [
    '非公制内螺纹牙规清单表',
    '非公制外螺纹环规清单表',
    '公制内螺纹牙规清单表',
    '公制外螺纹环规清单表'
]

# 初始化数据列表
data = []

# 维护每个类型的计数器，初始值为1
counters = {
    '非公制内螺纹牙规清单表': 1,
    '非公制外螺纹环规清单表': 1,
    '公制内螺纹牙规清单表': 1,
    '公制外螺纹环规清单表': 1
}

def open_file_in_explorer(file_path):
    """
    在文件资源管理器中打开指定文件所在的目录并选中该文件
    
    Args:
        file_path (str): 文件的完整路径
    """
    try:
        # 检查文件是否存在
        if not os.path.exists(file_path):
            print(f"文件不存在: {file_path}")
            return
            
        # 获取文件所在目录
        directory = os.path.dirname(file_path)
        
        # 根据操作系统使用不同的命令
        system = platform.system()
        
        if system == "Windows":
            # Windows系统：使用explorer命令
            # /select, 参数会选中指定文件
            subprocess.run(f'explorer /select,"{os.path.normpath(file_path)}"', shell=True)
            
        elif system == "Darwin":  # macOS
            # macOS系统：使用open命令
            subprocess.run(["open", "-R", file_path])
            
        elif system == "Linux":
            # Linux系统：尝试使用不同的文件管理器
            try:
                # 尝试使用nautilus (GNOME)
                subprocess.run(["nautilus", "--select", file_path])
            except FileNotFoundError:
                try:
                    # 尝试使用dolphin (KDE)
                    subprocess.run(["dolphin", "--select", file_path])
                except FileNotFoundError:
                    try:
                        # 尝试使用thunar (XFCE)
                        subprocess.run(["thunar", directory])
                    except FileNotFoundError:
                        # 最后尝试只打开目录
                        subprocess.run(["xdg-open", directory])
        else:
            print(f"不支持的操作系统: {system}")
            
        print(f"已在文件资源管理器中打开: {file_path}")
        
    except Exception as e:
        print(f"打开文件资源管理器时出错: {str(e)}")
        # 如果所有方法都失败，尝试只打开目录
        try:
            directory = os.path.dirname(file_path)
            if platform.system() == "Windows":
                os.startfile(directory)
            else:
                subprocess.run(["xdg-open", directory])
        except Exception as e2:
            print(f"打开目录也失败: {str(e2)}")


# 定义一个函数来提取 M 后面的数字
def extract_m_number(file_name):
    match = re.search(r'M(\d+)', file_name)
    return int(match.group(1)) if match else float('inf')

# 遍历指定的文件夹
for folder_name in folders_to_scan:
    folder_path = os.path.join(root_dir, folder_name)
    files = []
    for subdir, dirs, _files in os.walk(folder_path):
        for file in _files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                files.append(os.path.join(subdir, file))
    
    # 对公制内螺纹牙规清单表和公制外螺纹环规清单表中的文件进行排序
    if folder_name in ['公制内螺纹牙规清单表', '公制外螺纹环规清单表']:
        files.sort(key=lambda x: extract_m_number(os.path.basename(x)))
    
    for file_path in files:
        # 获取文件名（不包括扩展名）
        file_name = os.path.splitext(os.path.basename(file_path))[0].replace('（', '(').replace('）', ')').replace('“', '/').replace('”', '/').replace('"', '/').replace("  ",  " ").replace("（1）",  "").replace("(1)",  "").replace("（2）",  "").replace("(2)",  "").replace("(3)",  "").replace("(4)",  "").replace("（3）",  "").replace("（4）",  "").replace("（5）",  "").replace("(2)",  "").replace("(3)",  "").replace("(4)",  "").replace("(5)",  "")
        # 生成检具编号
        if '非公制内螺纹牙规清单表' in folder_name:
            tool_id = f"TSH_GZ_TG-【{file_name}】-{counters[folder_name]:03d}"
            item_type = "非公制内螺纹牙规"
        elif '非公制外螺纹环规清单表' in folder_name:
            tool_id = f"TSH_GZ_TR-【{file_name}】-{counters[folder_name]:03d}"
            item_type = "非公制外螺纹环规"
        elif '公制内螺纹牙规清单表' in folder_name:
            tool_id = f"TSH_GZ_TG-【{file_name}】-{counters[folder_name]:03d}"
            item_type = "公制内螺纹牙规"
        elif '公制外螺纹环规清单表' in folder_name:
            tool_id = f"TSH_GZ_TR-【{file_name}】-{counters[folder_name]:03d}"
            item_type = "公制外螺纹环规"
        
        # 更新计数器
        counters[folder_name] += 1
        
        # 构建网络路径
        relative_path = os.path.relpath(file_path, output_dir).replace(os.sep, '/')
        
        # 将数据添加到列表中
        data.append({
            'type': item_type,
            'fileName': file_name,
            'instrumentNumber': tool_id,
            'imagePath': relative_path   # 使用相对路径
        })

# 确保输出目录存在
if not os.path.exists(output_dir):
    try:
        os.makedirs(output_dir)
        print(f"创建输出目录: {output_dir}")
    except Exception as e:
        print(f"创建输出目录失败: {str(e)}")
        messagebox.showerror("错误", f"创建输出目录失败: {str(e)}")
        
timestamp = time.strftime("%Y%m%d_%H%M%S")
# 修改为保存为JS文件，文件名格式为gaugeData_当前时间戳.js
output_file = os.path.join(output_dir,  f"gaugeData_{timestamp}.js")

try:
    with open(output_file, 'w', encoding='utf-8') as f:
        # 写入禁用右键和F12的JavaScript代码
        f.write("""// ================= 添加返回首页按钮 (强制当前窗口跳转) =================
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

""")

        # 写入首行
        f.write("const gaugeData = [\n")

        for i, item in enumerate(data):
            line = f'{{ type: "{item["type"]}", fileName: "{item["fileName"]}", instrumentNumber: "{item["instrumentNumber"]}", imagePath: "{item["imagePath"]}" }}'
            if i < len(data) - 1:
                line += ','
            f.write(line + '\n')

        # 写入末行
        f.write("];\n")

        # 写入后续的JavaScript函数和初始化代码
        f.write("""
// 获取当前根目录（模拟）
function getCurrentRoot() {
    return "/检具管理系统/";
}

// 提取M编号的函数
function extractMNumber(fileName) {
    const match = fileName.match(/M(\\d+)/);
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
""")
    
    # 成功提示
    success_msg = f"螺纹检具数据保存成功！\n文件位置: {output_file}\n记录条数: {len(data)}"
    messagebox.showinfo("保存成功", success_msg)
    
    # 尝试打开文件所在目录并选中文件
    try:
        open_file_in_explorer(output_file)
    except Exception as e:
        print(f"打开文件资源管理器失败: {str(e)}")
        # 不显示错误消息给用户，因为这只是一个便利功能
        
except PermissionError:
    # 权限错误处理
    error_msg = f"无法保存文件 '{output_file}'\n请确保文件未被其他程序打开且您有写入权限"
    messagebox.showerror("保存失败", error_msg)
    
except Exception as e:
    # 其他错误处理
    error_msg = f"保存文件时出错: {str(e)}"
    messagebox.showerror("错误", error_msg)


