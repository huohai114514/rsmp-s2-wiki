document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("show");
        });
    }

    const normalizePath = (path) => {
        if (!path) return "/";
        try { path = new URL(path, window.location.origin).pathname; } catch (_) {}
        return path.replace(/index\.html$/i, "").replace(/\/+$/, "/");
    };

    const currentPath = normalizePath(window.location.pathname);
    document.querySelectorAll(".nav-item").forEach(item => {
        const hrefPath = normalizePath(item.getAttribute("href"));
        const isHome = hrefPath === normalizePath("<%- url_for('/') %>");
        if ((isHome && currentPath === hrefPath) || (!isHome && currentPath.startsWith(hrefPath))) {
            item.classList.add("active");
        }
    });

    const contentArea = document.querySelector(".entry-content");
    if (!contentArea) return;

    let htmlBuffer = contentArea.innerHTML;
    const itemRegex = /\[物品格:\s*([^\]]+)\]|\[物品:\s*([^\]]+)\]|\[图标:\s*([^\]]+)\]/g;
    htmlBuffer = htmlBuffer.replace(itemRegex, function(match, p1, p2, p3) {
        const name = p1 || p2 || p3;
        return `<span class="mc-item-highlight">${name}</span>`;
    });
    contentArea.innerHTML = htmlBuffer;

    contentArea.querySelectorAll("table").forEach(table => {
        const rows = Array.from(table.querySelectorAll("tr"));
        const dataRows = rows.map(row => Array.from(row.querySelectorAll("td")).map(cell => cell.textContent.trim())).filter(cells => cells.length === 3);
        const isThreeByThree = dataRows.length === 3 && dataRows.every(cells => cells.length === 3);
        const flat = dataRows.flat();
        const emptyLike = flat.some(text => text === "空" || text === "");
        const recipeLike = flat.some(text => /钻石块|木棍|下界合金|金锭|金块|苹果|胡萝卜|头颅|龙蛋|潮涌核心|回响碎片|紫水晶|下界之星|苦力怕|水瓶|生肉|生鱼|恶魂之泪|黑曜石|书|原模板|下界岩/.test(text));

        if (isThreeByThree && (recipeLike || emptyLike)) {
            table.classList.add("crafting-table-raw");
            table.style.display = "none";

            const gridContainer = document.createElement("div");
            gridContainer.className = "crafting-container";
            gridContainer.innerHTML = `<div class="crafting-title">📦 合成台结构 (3x3)</div>`;

            const grid = document.createElement("div");
            grid.className = "crafting-grid-3x3";

            flat.forEach(cellText => {
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
    });

    contentArea.querySelectorAll("blockquote").forEach(bq => {
        const text = bq.innerHTML;
        if (text.includes("[告示牌]") || text.includes("告示牌")) {
            bq.className = "mc-signpost-blockquote";
            bq.innerHTML = text.replace(/\[告示牌\]/g, "").replace(/&gt;/g, "");
        }
    });

    contentArea.querySelectorAll("table tr").forEach(row => {
        const cell = row.querySelector("td");
        if (!cell) return;
        const txt = cell.textContent;
        if (txt.includes("星期一")) row.classList.add("danger-row-1");
        else if (txt.includes("星期二")) row.classList.add("danger-row-2");
        else if (txt.includes("星期三")) row.classList.add("danger-row-3");
        else if (txt.includes("星期四")) row.classList.add("danger-row-4");
        else if (txt.includes("星期五")) row.classList.add("danger-row-5");
        else if (txt.includes("星期六")) row.classList.add("danger-row-6");
        else if (txt.includes("星期日")) row.classList.add("danger-row-7");
    });

    contentArea.querySelectorAll("p, blockquote").forEach(p => {
        const text = p.textContent;
        if (text.includes("火候条") || text.includes("48% - 70%")) {
            const barPanel = document.createElement("div");
            barPanel.className = "mc-live-bar-panel";
            barPanel.innerHTML = `
                <div class="live-bar-title">🔥 炒菜火候模拟监控条</div>
                <div class="live-bar-track">
                    <div class="live-bar-fill fill-fire" style="width: 65%"></div>
                    <div class="live-bar-text">当前理想区间: 48% - 70% / 模拟火候: 62%</div>
                </div>
            `;
            p.parentNode.insertBefore(barPanel, p);
        }
        if (text.includes("历法 |") || text.includes("769年1月1日")) {
            const barPanel = document.createElement("div");
            barPanel.className = "mc-live-bar-panel";
            barPanel.innerHTML = `
                <div class="live-bar-title">⏰ 手持时钟 ActionBar 预览</div>
                <div class="live-bar-track" style="background: rgba(0,0,0,0.85); border-color:#d946ef;">
                    <div class="live-bar-text" style="color:#37d5d6">历法 | 769年1月1日 星期一 | 第1天 | 06:00</div>
                </div>
            `;
            p.parentNode.insertBefore(barPanel, p);
        }
    });
});
