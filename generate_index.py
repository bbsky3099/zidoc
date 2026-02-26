import os
from datetime import datetime

# ================= 配置区域 =================
# 需要排除的文件（不会出现在导航页中）
EXCLUDE_FILES = ['index.html', 'generate_index.py', 'README.md']
OUTPUT_FILE = 'index.html'

# 页面标题
PAGE_TITLE = "🚀 内部资源一键访问"
PAGE_SUBTITLE = "Internal Resources One Click Access"

# 图标映射规则 (关键词: 图标)
ICON_MAP = {
    "螺纹": "📏", "检具": "🔧", "gauge": "📏", "thread": "🧵",
    "材质": "🧱", "报告": "📑", "material": "🏗️", "report": "📊",
    "管理": "⚙️", "系统": "💻", "system": "🖥️", "admin": "🛡️",
    "数据": "📈", "data": "💾", "分析": "🔍", "analysis": "📉",
    "文档": "📚", "doc": "📝", "help": "❓",
    "首页": "🏠", "home": "", "nav": "🧭"
}
# ===========================================

def get_icon(filename):
    """根据文件名关键词智能匹配图标"""
    name_lower = filename.lower()
    
    # 优先匹配中文关键词
    for key, icon in ICON_MAP.items():
        if key in filename:
            return icon
    
    # 如果没有匹配到中文，尝试匹配英文（上面字典里已经混排了，这里做兜底）
    # 如果还是没匹配到，返回默认图标
    return "📄"

def get_friendly_name(filename):
    """美化文件名作为标题"""
    # 去除扩展名
    name = os.path.splitext(filename)[0]
    # 替换下划线和连字符为空格
    name = name.replace('_', ' ').replace('-', ' ')
    # 简单的首字母大写逻辑（针对英文），中文不受影响
    # 如果主要是中文，直接返回即可
    return name

def generate_html(files):
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # 定义 CSS 样式 (内嵌以保证单文件便携)
    css_styles = """
    :root {
        --bg-color: #f0f2f5;
        --card-bg: #ffffff;
        --primary-color: #2563eb;
        --primary-hover: #1d4ed8;
        --text-main: #1f2937;
        --text-sub: #6b7280;
        --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        --radius: 16px;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        background-color: var(--bg-color);
        color: var(--text-main);
        line-height: 1.6;
        padding: 40px 20px;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .container {
        max-width: 1000px;
        width: 100%;
    }

    header {
        text-align: center;
        margin-bottom: 50px;
        animation: fadeInDown 0.8s ease-out;
    }

    h1 {
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--text-main);
        margin-bottom: 10px;
        letter-spacing: -0.025em;
    }

    p.subtitle {
        font-size: 1.125rem;
        color: var(--text-sub);
        font-weight: 400;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 24px;
    }

    .card {
        background: var(--card-bg);
        border-radius: var(--radius);
        padding: 24px;
        text-decoration: none;
        color: inherit;
        box-shadow: var(--shadow-sm);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid rgba(0,0,0,0.04);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        overflow: hidden;
        animation: fadeInUp 0.6s ease-out backwards;
    }

    /*  staggered animation delay handled in loop */
    
    .card:hover {
        transform: translateY(-6px);
        box-shadow: var(--shadow-lg);
        border-color: rgba(37, 99, 235, 0.2);
    }

    .card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: var(--primary-color);
        opacity: 0;
        transition: opacity 0.3s;
    }

    .card:hover::before {
        opacity: 1;
    }

    .icon-wrapper {
        font-size: 2.5rem;
        margin-bottom: 16px;
        background: #eff6ff;
        width: 64px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        transition: transform 0.3s;
    }

    .card:hover .icon-wrapper {
        transform: scale(1.1) rotate(5deg);
        background: #dbeafe;
    }

    .card-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text-main);
        margin-bottom: 8px;
        line-height: 1.4;
    }

    .card-file {
        font-size: 0.85rem;
        color: var(--text-sub);
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
        background: #f3f4f6;
        padding: 4px 8px;
        border-radius: 6px;
        margin-top: auto; /* Push to bottom */
        word-break: break-all;
    }

    footer {
        margin-top: 60px;
        text-align: center;
        color: var(--text-sub);
        font-size: 0.9rem;
        border-top: 1px solid #e5e7eb;
        padding-top: 20px;
        width: 100%;
    }

    @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    """

    # 构建卡片 HTML
    cards_html = ""
    for index, f in enumerate(files):
        title = get_friendly_name(f)
        icon = get_icon(f)
        # 计算动画延迟，让卡片依次出现
        delay = index * 0.1
        
        cards_html += f"""
        <a href="{f}" class="card" target="_blank" style="animation-delay: {delay}s">
            <div class="icon-wrapper">{icon}</div>
            <div class="card-title">{title}</div>
            <div class="card-file">{f}</div>
        </a>
        """

    html_content = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{PAGE_TITLE}</title>
    <style>{css_styles}</style>
</head>
<body>
    <div class="container">
        <header>
            <h1>{PAGE_TITLE}</h1>
            <p class="subtitle">{PAGE_SUBTITLE}</p>
        </header>

        <div class="grid">
            {cards_html}
        </div>

        <footer>
            <p>✨ 自动导航页 · 最后更新：{current_time}</p>
            <p style="margin-top:8px; font-size: 0.8em; opacity: 0.7;">Powered by GitHub Actions & Python</p>
        </footer>
    </div>
</body>
</html>
"""
    return html_content

# ================= 主执行逻辑 =================
if __name__ == "__main__":
    # 获取当前目录下所有 .html 文件
    try:
        all_files = os.listdir('.')
        html_files = [
            f for f in all_files 
            if f.endswith('.html') and f not in EXCLUDE_FILES
        ]
        
        # 排序：按文件名自然排序
        html_files.sort()

        if not html_files:
            print("⚠️ 未找到任何 HTML 文件可生成导航。")
        else:
            print(f"🔍 发现 {len(html_files)} 个 HTML 文件...")
            content = generate_html(html_files)
            
            with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"✅ 成功生成 {OUTPUT_FILE}！")
            print("📄 包含链接:")
            for f in html_files:
                print(f"   - {f}")
                
    except Exception as e:
        print(f"❌ 发生错误: {e}")
