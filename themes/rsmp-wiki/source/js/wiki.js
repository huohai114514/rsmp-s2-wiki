document.addEventListener("DOMContentLoaded", function () {
    // --- 1. 移动端导航响应式折叠逻辑 ---
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("show");
        });
    }

    // 高亮当前激活的导航项：只处理有 href 的链接，避免首页永远高亮
    const currentPath = window.location.pathname.replace(/\/$/, "");
    const navLinks = document.querySelectorAll("a.nav-item, a.nav-subitem");
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;
        let linkPath;
        try {
            linkPath = new URL(href, window.location.origin).pathname.replace(/\/$/, "");
        } catch (e) {
            linkPath = href.replace(/\/$/, "");
        }

        const isHome = linkPath.endsWith("/rsmp-s2-wiki") || linkPath === "" || linkPath === "/";
        const isActive = isHome ? currentPath === linkPath : currentPath === linkPath || currentPath.startsWith(linkPath + "/");
        if (isActive) {
            link.classList.add("active");
            const parent = link.closest(".nav-group");
            if (parent) {
                const parentButton = parent.querySelector(".nav-parent");
                if (parentButton) parentButton.classList.add("active");
            }
        }
    });

    // --- 2. 深度扫描并动态美化 Markdown 专属占位语法 ---
    const contentArea = document.querySelector(".entry-content");
    if (contentArea) {
        // A. 高亮替换物品/方块名称方括号语法
        let htmlBuffer = contentArea.innerHTML;
        const itemRegex = /\[物品格:\s*([^\]]+)\]|\[物品:\s*([^\]]+)\]|\[图标:\s*([^\]]+)\]/g;
        htmlBuffer = htmlBuffer.replace(itemRegex, function(match, p1, p2, p3) {
            const name = p1 || p2 || p3;
            return `<span class="mc-item-highlight">${name}</span>`;
        });
        contentArea.innerHTML = htmlBuffer;

        // B. 动态将 3x3 表格重构为 Minecraft 合成台样式组件
        const tables = contentArea.querySelectorAll("table");
        tables.forEach(table => {
            const rows = table.querySelectorAll("tr");
            if (rows.length >= 3 && rows.length <= 4) {
                const firstRowCells = rows[0].querySelectorAll("td, th");
                if (firstRowCells.length === 3) {
                    let cellData = [];
                    let isCraftingTable = false;

                    rows.forEach(row => {
                        const cells = row.querySelectorAll("td");
                        if (cells.length === 3) {
                            cells.forEach(cell => {
                                const text = cell.textContent.trim();
                                if (
                                    text === "空" || text === "钻石块" || text === "木棍" || text === "下界合金块" ||
                                    text === "下界合金锭" || text === "金块" || text === "金锭" || text === "苹果" ||
                                    text === "胡萝卜" || text === "书" || text === "黑曜石" || text.includes("头颅") ||
                                    text.includes("碎片") || text.includes("模板") || text.includes("龙蛋")
                                ) {
                                    isCraftingTable = true;
                                }
                                cellData.push(text);
                            });
                        }
                    });

                    if (isCraftingTable && cellData.length === 9) {
                        table.classList.add("crafting-table-raw");
                        table.style.display = "none";

                        const gridContainer = document.createElement("div");
                        gridContainer.className = "crafting-container";
                        gridContainer.innerHTML = `<div class="crafting-title">📦 合成台结构 (3x3)</div>`;

                        const grid = document.createElement("div");
                        grid.className = "crafting-grid-3x3";

                        cellData.forEach(cellText => {
                            const cellDiv = document.createElement("div");
                            if (cellText === "空" || cellText === "") {
                                cellDiv.className = "crafting-cell empty-cell";
                                cellDiv.textContent = "";
                            } else {
                                cellDiv.className = "crafting-cell";
                                cellDiv.textContent = cellText;
                                cellDiv.title = `输入材料: ${cellText}`;
                            }
                            grid.appendChild(cellDiv);
                        });

                        gridContainer.appendChild(grid);
                        table.parentNode.insertBefore(gridContainer, table);
                    }
                }
            }
        });

        // C. 将引用标记块转化为木质告示牌
        const blockquotes = contentArea.querySelectorAll("blockquote");
        blockquotes.forEach(bq => {
            const text = bq.innerHTML;
            if (text.includes("[告示牌]") || text.includes("告示牌")) {
                bq.className = "mc-signpost-blockquote";
                bq.innerHTML = text.replace(/\[告示牌\]/g, "").replace(/&gt;/g, "");
            }
        });

        // D. 为“星期怪物难度表”注入差异化危险色系渐变
        const tableRows = contentArea.querySelectorAll("table tr");
        tableRows.forEach(row => {
            const cell = row.querySelector("td");
            if (cell) {
                const txt = cell.textContent;
                if (txt.includes("星期一")) row.classList.add("danger-row-1");
                else if (txt.includes("星期二")) row.classList.add("danger-row-2");
                else if (txt.includes("星期三")) row.classList.add("danger-row-3");
                else if (txt.includes("星期四")) row.classList.add("danger-row-4");
                else if (txt.includes("星期五")) row.classList.add("danger-row-5");
                else if (txt.includes("星期六")) row.classList.add("danger-row-6");
                else if (txt.includes("星期日")) row.classList.add("danger-row-7");
            }
        });

        // E. 全自动化解析模拟 ActionBar 火候条与历法条
        const paragraphs = contentArea.querySelectorAll("p, blockquote");
        paragraphs.forEach(p => {
            const text = p.textContent;
            if (text.includes("火候条") || (text.includes("%") && text.includes("翻锅"))) {
                const barPanel = document.createElement("div");
                barPanel.className = "mc-live-bar-panel";
                barPanel.innerHTML = `
                    <div class="live-bar-title">🔥 炒菜火候模拟监控条</div>
                    <div class="live-bar-track">
                        <div class="live-bar-fill fill-fire" style="width: 65%"></div>
                        <div class="live-bar-text">当前理想区间: 48% - 70% (当前模拟: 62% 完美)</div>
                    </div>
                `;
                p.parentNode.insertBefore(barPanel, p);
            }

            if (text.includes("历法 |") || text.includes("769年1月1日")) {
                const barPanel = document.createElement("div");
                barPanel.className = "mc-live-bar-panel";
                barPanel.innerHTML = `
                    <div class="live-bar-title">⏰ 玩家手持时钟首屏 ActionBar 预览</div>
                    <div class="live-bar-track" style="background: rgba(0,0,0,0.85); border-color:#d946ef;">
                        <div class="live-bar-text" style="color:#37d5d6">历法 | 769年1月1日 星期一 | 第1天 | 06:00</div>
                    </div>
                `;
                p.parentNode.insertBefore(barPanel, p);
            }
        });
    }
});
