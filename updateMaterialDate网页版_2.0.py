import os
import datetime
import re
import time
import tkinter as tk
from tkinter import ttk, filedialog, messagebox, scrolledtext
import platform
import subprocess

# 指定目标文件夹路径
root_dir = r"E:\github\zidoc\材质报告"

# 指定存放文件夹路径
output_dir = r"E:\github\zidoc"

print(f"目标文件夹路径: {root_dir}")
print(f"输出文件夹路径: {output_dir}")

# 初始化数据列表
data = []

# 定义文件类型映射
file_type_map = {
    '.pdf': 'PDF',
    '.jpg': '图片',
    '.jpeg': '图片',
    '.png': '图片',
    '.gif': '图片',
    '.bmp': '图片'
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

# 定义一个函数来提取年份
def extract_year(folder_name):
    # 匹配4位数字的年份
    match = re.search(r'(\d{4})', folder_name)
    return match.group(1) if match else folder_name

# 遍历材质报告文件夹
if os.path.exists(root_dir):
    # 获取所有年份文件夹
    year_folders = []
    for item in os.listdir(root_dir):
        item_path = os.path.join(root_dir, item)
        if os.path.isdir(item_path):
            year_folders.append(item)
    
    print(f"找到年份文件夹: {year_folders}")
    
    # 对年份文件夹进行排序（将纯数字年份排在前面）
    def sort_year_folders(folder):
        year_match = re.search(r'^\d{4}$', folder)
        if year_match:
            return (0, folder)  # 纯数字年份
        else:
            return (1, folder)  # 其他文件夹
    
    year_folders.sort(key=sort_year_folders)
    
    for year_folder in year_folders:
        year_path = os.path.join(root_dir, year_folder)
        files = []
        
        # 遍历年份文件夹中的文件
        for subdir, dirs, _files in os.walk(year_path):
            for file in _files:
                file_ext = os.path.splitext(file)[1].lower()
                if file_ext in file_type_map:
                    files.append(os.path.join(subdir, file))
        
        # 对文件按名称排序
        files.sort()
        
        for file_path in files:
            # 获取文件名（包括扩展名）
            file_name = os.path.basename(file_path)
            file_name_without_ext = os.path.splitext(file_name)[0]
            
            # 获取文件扩展名并确定类型
            file_ext = os.path.splitext(file_name)[1].lower()
            file_type = file_type_map.get(file_ext, '其他')
            
            # 提取年份（从文件夹名）
            year = extract_year(year_folder)
            
            # 构建网络路径
            relative_path = os.path.relpath(file_path, output_dir).replace(os.sep, '/')
            network_file_path = relative_path
            
            # 将数据添加到列表中
            data.append({
                'fileName': file_name,
                'year': year,
                'type': file_type,
                'filePath': network_file_path
            })

else:
    print(f"材质报告文件夹不存在: {root_dir}")
    messagebox.showerror("错误", f"材质报告文件夹不存在: {root_dir}")

# 确保输出目录存在
if not os.path.exists(output_dir):
    try:
        os.makedirs(output_dir)
        print(f"创建输出目录: {output_dir}")
    except Exception as e:
        print(f"创建输出目录失败: {str(e)}")
        messagebox.showerror("错误", f"创建输出目录失败: {str(e)}")

timestamp = time.strftime("%Y%m%d_%H%M%S")
# 保存为JS文件，文件名格式为materialDate_当前时间戳.js
output_file = os.path.join(output_dir, f"materialDate_{timestamp}.js")

try:
    with open(output_file, 'w', encoding='utf-8') as f:
        # 写入保护代码（与螺纹规系统相同）
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

""")

        # 写入材质报告数据数组
        f.write("const reportData = [\n")

        for i, item in enumerate(data):
            line = f'{{ fileName: "{item["fileName"]}", year: "{item["year"]}", type: "{item["type"]}", filePath: "{item["filePath"]}" }}'
            if i < len(data) - 1:
                line += ','
            f.write(line + '\n')

        # 写入数组结束和后续的JavaScript函数
        f.write("];\n")

        # 写入材质报告管理系统的JavaScript代码
        f.write("""
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
""")
    
    # 成功提示
    success_msg = f"材质报告数据保存成功！\n文件位置: {output_file}\n记录条数: {len(data)}"
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
