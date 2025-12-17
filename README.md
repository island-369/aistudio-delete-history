# Google AI Studio Bulk Delete / 批量删除工具

[English](#english) | [中文](#chinese)

<a name="english"></a>
## 🇬🇧 English

A simple JavaScript snippet to automate the deletion of chat history on the [Google AI Studio](https://aistudio.google.com/) library page. 

Since Google AI Studio currently does not support bulk deletion, this script automates the process of clicking the "More options" menu and selecting "Delete" for each conversation.

### ⚠️ Warning
* **Irreversible**: Deleted chats cannot be recovered.
* **Use at your own risk**: This is a client-side script. Please review the code before running it.

### How to use

#### Method 1: Browser Console (DevTools)
1.  Open [Google AI Studio Library](https://aistudio.google.com/library).
2.  Press `F12` or right-click and select **Inspect** to open DevTools.
3.  Go to the **Console** tab.
4.  *(First time only)* You might need to type `allow pasting` and hit Enter if Chrome warns you against pasting code.
5.  Copy the code from [`script.js`](./script.js) and paste it into the console.
6.  Press **Enter** to run.
7.  To stop the script manually, refresh the page (`F5`).

#### Method 2: Bookmarklet (One-click)
Create a new bookmark in your browser with the following URL (Source code in `bookmarklet.js`):

```javascript
javascript:(async()=>{const e=300,t=300,n=1000,o=500,l=ms=>new Promise(e=>setTimeout(e,ms)),c=()=>{const e="//span[contains(@class, 'mat-mdc-menu-item-text') and contains(., 'Delete')]",t=document.evaluate(e,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);return t.singleNodeValue};let a=0;console.log("🚀 Starting Batch Delete...");for(;a<o;){const s=document.querySelectorAll('button[aria-haspopup="menu"], button.mat-mdc-menu-trigger');if(0===s.length){console.log("✅ Done");break}s[0].click(),await l(e);const r=c();if(r){r.click(),await l(t);const i=document.evaluate("//button//span[contains(text(), 'Delete') or contains(text(), 'Confirm')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;i&&i.click(),await l(n),a++}else document.body.click(),await l(500)}})();

<a name="chinese"></a>

🇨🇳 中文说明
这是一个简单的 JavaScript 脚本，用于在 Google AI Studio 列表页面自动化批量删除历史对话。

由于 Google AI Studio 目前（截至 2024/2025）不支持批量删除功能，该脚本通过模拟用户点击“更多选项 -> 删除”来通过前端自动化完成清理。

⚠️ 警告
操作不可逆：删除后的对话无法恢复，请谨慎操作。

风险自负：这是一个前端脚本，建议在使用前简单阅读代码逻辑。

使用方法
方法一：浏览器控制台 (Console)
打开 Google AI Studio Library 页面。

按 F12 键或右键点击页面选择“检查 (Inspect)”打开开发者工具。

切换到 Console (控制台) 标签页。

(仅首次需要) 如果浏览器提示安全警告，请在控制台输入 allow pasting 并回车以允许粘贴代码。

复制仓库中 script.js 的完整代码，粘贴到控制台中。

按 Enter 键运行。

如果需要中途停止，直接刷新网页 (F5) 即可。

方法二：小书签 (Bookmarklet) - 推荐
在浏览器书签栏新建一个书签，将“网址”设置为以下代码，以后点击该书签即可自动开始删除：

JavaScript

javascript:(async()=>{const e=300,t=300,n=1000,o=500,l=ms=>new Promise(e=>setTimeout(e,ms)),c=()=>{const e="//span[contains(@class, 'mat-mdc-menu-item-text') and contains(., 'Delete')]",t=document.evaluate(e,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);return t.singleNodeValue};let a=0;console.log("🚀 开始批量删除...");for(;a<o;){const s=document.querySelectorAll('button[aria-haspopup="menu"], button.mat-mdc-menu-trigger');if(0===s.length){console.log("✅ 结束");break}s[0].click(),await l(e);const r=c();if(r){r.click(),await l(t);const i=document.evaluate("//button//span[contains(text(), 'Delete') or contains(text(), 'Confirm')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;i&&i.click(),await l(n),a++}else document.body.click(),await l(500)}})();
常见问题
脚本没反应？: Google 可能会更新前端代码。如果脚本失效，请检查页面上的“删除”按钮 Class 是否发生了变化。

速度太慢？: 为了防止触发 Google 的请求限制（429 Too Many Requests），脚本默认设置了 1 秒的间隔。你可以在代码中修改 DELAY_NEXT 变量。
