async function batchDelete() {

    // === 配置区域 ===

    const DELAY_MENU = 1000;     // 等待菜单弹出的时间

    const DELAY_CONFIRM_DIALOG = 1500; // 等待确认弹窗出现的缓冲时间 (稍微调大一点点以防动画延迟)

    const DELAY_NEXT = 3000;    // 删除完一个后等待列表刷新的时间 (Google最近可能变慢了，建议设为1.5秒)

    

    const MAX_ATTEMPTS = 500; 

    let count = 0;



    console.log("🚀 V2版 批量删除任务启动...");



    const sleep = (ms) => new Promise(r => setTimeout(r, ms));



    // 1. 查找菜单里的 Delete 选项 (你之前验证过这个是好用的)

    const findMenuDeleteBtn = () => {

        const xpath = "//span[contains(@class, 'mat-mdc-menu-item-text') and contains(., 'Delete')]";

        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    };



    // 2. [修改] 查找弹窗里的确认 Delete 按钮

    // 根据你提供的: <button class="ms-button-primary">Delete</button>

    const findDialogConfirmBtn = () => {

        // 使用 querySelector 查找所有类名为 ms-button-primary 的按钮

        const buttons = document.querySelectorAll('button.ms-button-primary');

        // 遍历找到文字内容包含 "Delete" 的那个

        for (let btn of buttons) {

            if (btn.innerText.includes('Delete')) {

                return btn;

            }

        }

        return null;

    };



    while (count < MAX_ATTEMPTS) {

        // --- 第一步：点击列表上的三个点 ---

        const menuButtons = document.querySelectorAll('button[aria-haspopup="menu"], button.mat-mdc-menu-trigger');

        

        if (menuButtons.length === 0) {

            console.log("✅ 列表为空，任务结束。");

            break;

        }



        console.log(`正在处理第 ${count + 1} 个对话...`);

        // 点击第一个菜单按钮

        menuButtons[0].click();

        

        // --- 第二步：点击菜单里的 Delete ---

        await sleep(DELAY_MENU);

        const menuDeleteBtn = findMenuDeleteBtn();



        if (menuDeleteBtn) {

            menuDeleteBtn.click(); // 这一步通常点击的是 span 的父级或 span 本身

            console.log("  -> 菜单选项已点击");



            // --- 第三步：点击弹窗里的确认按钮 ---

            await sleep(DELAY_CONFIRM_DIALOG); // 等待弹窗动画

            

            const confirmBtn = findDialogConfirmBtn();

            

            if (confirmBtn) {

                 confirmBtn.click();

                 console.log("  -> ✅ 二次确认已点击 (删除成功)");

                 // 等待列表刷新，必须给足时间

                 await sleep(DELAY_NEXT);

                 count++;

            } else {

                console.error("❌ 错误：弹窗出来了，但没找到确认按钮！脚本停止，防止乱点。");

                console.log("调试建议：请检查弹窗是否完全加载，或手动点击一次。");

                break; // 找不到确认按钮就停止，避免死循环

            }

        } else {

            console.warn("⚠️ 菜单打开了，但没找到 Delete 选项。可能是置顶对话或其他？");

            // 点击背景关闭菜单

            document.body.click(); 

            await sleep(500);

            // 这里选择跳出循环，避免一直点同一个

            break; 

        }

    }

}



batchDelete();
