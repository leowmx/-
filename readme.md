# **源码破解器**


## *使用方法*
    1. 打开学而思编程社区的作品
    2. 点击右上角的“源码破解器”按钮，并点击“破解源码”按钮
    3. 查看弹出的警告弹窗，并点击“我已知晓”按钮
    4.
        · 点击“查看源码”按钮，即可打开学而思代码编辑器，并查看源码
        · 点击“生成二维码”按钮，即可生成二维码在扩展页面下方
        · 点击“下载源码”按钮，即可下载源码到本地(仅支持main.py和c++源文件)

## *更新日志*
    v1.0.0 —— 2023.4.22 创建源码破解器项目，完成基于*URL*的破源算法
    v1.1.0 —— 2023.4.24 完善扩展页面UI
    v2.0.0 —— 2024.3.27 重构界面UI
    v2.1.0 —— 2024.4.01 增加警告弹窗，并增加弹窗的“不再显示”选项(未完善)
    v2.1.1 —— 2024.4.02 修复警告弹窗的"不再显示"选项
    v2.2.0 —— 2024.4.03 增加生成二维码功能
    v2.3.0 —— 2024.4.04 增加“下载源码”功能(仅支持main.py和c++源文件)(未完善)
    v2.3.1 —— 2024.4.05 修复“下载源码”功能，解决下载文件后缀名错误问题


## *声明*
本项目核心算法 *(JS)*
```javascript
var pid = project_url.split("&")[1].split("&")[0].slice(4);
if (project_url.includes("python") || project_url.includes("cpp") || project_url.includes("webpy")) {
        code_url = "https://code.xueersi.com/ide/code/" + pid;
    }
    if (project_url.includes("scratch")) {
        code_url = "https://code.xueersi.com/scratch3/index.html?pid=" + pid + "&version=3.0&env=community";
    }
```
为[*源码破解器(python)*](https://code.xueersi.com/ide/code/34749689)的
```python
pid = project_url.split("&")[1].split("=")[1]
if "python" in project_url or "cpp" in project_url:
    code_url = "https://code.xueersi.com/ide/code/" + pid
if "scratch" in project_url:
    code_url = "https://code.xueersi.com/scratch3/index.html?pid=" + pid + "&version=3.0&env=community"
```
**转换而来**
