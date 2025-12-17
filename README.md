# Google AI Studio Bulk Delete / 批量删除工具

[English](#english) | [中文](#chinese)

<a name="english"></a>
## 🇬🇧 English

A simple JavaScript snippet to automate the deletion of chat history on the [Google AI Studio](https://aistudio.google.com/library) library page.

Since Google AI Studio currently does not support bulk deletion, this script automates the process of clicking the "More options" menu, selecting "Delete", and confirming the dialog for each conversation.

### ⚠️ Warning
> * **Irreversible**: Deleted chats cannot be recovered.
> * **Use at your own risk**: This is a client-side script. Please review the code logic before running it in your console.

### How to use

1.  Open [Google AI Studio Library](https://aistudio.google.com/library).
2.  Press `F12` (or right-click and select **Inspect**) to open DevTools.
3.  Go to the **Console** tab.
4.  *(First time only)* If Chrome shows a warning, type `allow pasting` and hit Enter.
5.  Copy the code from [`script.js`](./script.js) in this repository.
6.  Paste it into the console and press **Enter**.
7.  To stop the script manually, simply refresh the page (`F5`).

---

<a name="chinese"></a>
## 🇨🇳 中文说明

一个简单的 JavaScript 脚本，用于在 [Google AI Studio](https://aistudio.google.com/library) 列表页面自动化批量删除历史对话。

由于 Google AI Studio 目前不支持批量删除功能，该脚本通过前端自动化模拟用户操作：点击“更多选项” -> 点击“删除” -> 点击弹窗中的“确认删除”。

### ⚠️ 警告
> * **操作不可逆**：删除后的对话无法恢复，请谨慎操作。
> * **风险自负**：这是一个前端脚本，建议在运行前简单阅读代码逻辑以确保安全。

### 使用方法

1.  打开 [Google AI Studio Library](https://aistudio.google.com/library) 页面。
2.  按 `F12` 键（或右键点击页面选择“检查/Inspect”）打开开发者工具。
3.  切换到 **Console (控制台)** 标签页。
4.  *(仅首次需要)* 如果浏览器提示安全警告，请在控制台输入 `allow pasting` 并回车以允许粘贴代码。
5.  复制本仓库中 [`script.js`](./script.js) 文件的完整代码。
6.  粘贴到控制台中，按 **Enter** 键运行。
7.  **提示**：运行期间请保持当前标签页在前台（不要最小化），否则浏览器会限制脚本运行速度。如果需要中途停止，直接刷新网页 (`F5`) 即可。

### 常见问题
* **脚本没反应？**: Google 可能会更新前端代码。如果脚本失效，通常是按钮的 Class 名发生了变化。
* **速度太慢？**: 为了防止触发 Google 的请求限制（429 Too Many Requests）以及等待列表刷新，脚本设置了 1.5 秒的安全间隔。

## License
MIT
