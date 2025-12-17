async function batchDelete() {
    // === 配置区域 ===
    const DELAY_MENU = 1000;          // 等待菜单弹出
    const DELAY_CONFIRM_DIALOG = 1500; // 等待确认弹窗
    const DELAY_NEXT = 3000;           // 列表刷新等待
    const MAX_ATTEMPTS = 500;          // 最大运行次数
    
    let loopCount = 0;
    let processIndex = 0; // 当前正在处理列表中的第几个 (默认从第0个也就是第一个开始)

    console.log("🚀 V3版 (智能跳过) 批量删除任务启动...");

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    const findMenuDeleteBtn = () => {
        const xpath = "//span[contains(@class, 'mat-mdc-menu-item-text') and contains(., 'Delete')]";
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    };

    const findDialogConfirmBtn = () => {
        const buttons = document.querySelectorAll('button.ms-button-primary');
        for (let btn of buttons) {
            if (btn.innerText.includes('Delete')) return btn;
        }
        return null;
    };

    while (loopCount < MAX_ATTEMPTS) {
        // 重新获取列表
        const menuButtons = document.querySelectorAll('button[aria-haspopup="menu"], button.mat-mdc-menu-trigger');
        
        // 如果要处理的索引已经超过了列表总长度，说明剩下的都删不掉或处理完了
        if (processIndex >= menuButtons.length) {
            console.log("✅ 所有能删的都删完了 (剩余的可能是无法删除的项目)。");
            break;
        }

        console.log(`正在检查列表第 ${processIndex + 1} 个对话...`);
        
        // 点击指定位置的按钮 (不一定是第一个了)
        menuButtons[processIndex].click();
        
        await sleep(DELAY_MENU);
        const menuDeleteBtn = findMenuDeleteBtn();

        if (menuDeleteBtn) {
            // === 找到了删除按钮，执行删除 ===
            menuDeleteBtn.click();
            console.log("  -> 菜单选项已点击");

            await sleep(DELAY_CONFIRM_DIALOG);
            const confirmBtn = findDialogConfirmBtn();
            
            if (confirmBtn) {
                 confirmBtn.click();
                 console.log("  -> ✅ 删除成功");
                 await sleep(DELAY_NEXT);
                 
                 // 关键逻辑：删除成功后，列表会刷新，原本的第2个会变成第1个。
                 // 所以我们要重置索引，继续从头(第0个)开始删
                 processIndex = 0; 
            } else {
                console.error("❌ 弹窗里没找到确认按钮，关闭菜单，跳过此项。");
                document.body.click(); // 关闭菜单
                await sleep(500);
                processIndex++; // 跳过，处理下一个
            }
        } else {
            // === 没找到删除按钮 ===
            console.warn(`⚠️ 第 ${processIndex + 1} 个对话没有“Delete”选项 (可能是置顶或示例)。`);
            console.warn("  -> 跳过此对话，尝试删除下一个...");
            
            // 点击背景关闭菜单
            document.body.click(); 
            await sleep(1000); // 稍微多等一下
            
            // 关键逻辑：既然这个删不掉，那我们就让它留在那，
            // 下一次循环我们去点列表里的 下一个 (index + 1)
            processIndex++; 
        }
        
        loopCount++;
    }
}

batchDelete();
