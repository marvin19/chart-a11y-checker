import { runCheck } from "./utils/checkUtils.js";
import {
    checkChartDescription,
    checkChartTitle,
    checkModuleIncluded,
    checkChartColors,
    checkChartSeriesColors,
} from "./checks.js";
import { solarEmploymentConfig } from "./configs/lineChart.js";
import { twoLineSeries } from "./configs/lineChartWithTwoSeries.js";

const testChart = twoLineSeries;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cssInput").value = testChart.css || "";
    document.getElementById("jsInput").value = testChart.html || "";
    document.getElementById("configInput").value = testChart.config || "";
});

const allChecks = [
    {
        name: "Module Included",
        run: checkModuleIncluded,
    },
    {
        name: "Chart Description",
        run: checkChartDescription,
    },
    {
        name: "Chart Title",
        run: checkChartTitle,
    },
    {
        name: "Chart Colors",
        run: checkChartColors,
    },
    {
        name: "Series Colors",
        run: checkChartSeriesColors,
    },
];

document.getElementById("renderBtn").addEventListener("click", function () {
    const css = document.getElementById("cssInput").value;
    const userHtml = document.getElementById("jsInput").value;
    const configCode = document.getElementById("configInput").value;

    let userConfig;
    try {
        userConfig = new Function("return " + configCode)();
    } catch (err) {
        alert("Invalid chart config: " + err.message);
        return;
    }

    const serializedConfig = JSON.stringify(userConfig, null, 2);

    const previewRoot = document.getElementById("preview-root");
    previewRoot.innerHTML = "";

    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "500px";
    iframe.style.border = "1px solid #ccc";
    iframe.style.borderRadius = "8px";
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
    previewRoot.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow.document;

    // Store config for compliance checks
    window._lastRendered = {
        iframe,
        config: userConfig,
    };

    // Full HTML the user will see
    const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>User Chart</title>
            <style>${css}</style>
        </head>
        <body>
            ${userHtml}
        </body>
        </html>
    `;

    doc.open();
    doc.write(fullHtml);
    doc.close();

    // Inject Highcharts call AFTER all user scripts are loaded
    iframe.onload = function () {
        const renderScript = doc.createElement("script");
        renderScript.textContent = `
            (function waitForHighcharts() {
                if (typeof Highcharts === 'undefined' || !document.getElementById('container')) {
                    return setTimeout(waitForHighcharts, 50);
                }
    
                try {
                    console.log('[iframe] Highcharts and container found, rendering...');
                    window.renderedChartConfig = ${serializedConfig};
                    window.renderedChart = Highcharts.chart('container', window.renderedChartConfig);
                    console.log('[iframe] Chart rendered:', window.renderedChart);
                } catch (e) {
                    console.error('[iframe] Chart render failed:', e.message);
                }
            })();
        `;
        doc.body.appendChild(renderScript);
    };
});

document.getElementById("checkBtn").addEventListener("click", function () {
    const resultsList = document.getElementById("resultsList");
    resultsList.innerHTML = "";

    if (!window._lastRendered) {
        const li = document.createElement("li");
        li.className = "fail";
        li.textContent = "❌ No chart has been rendered yet.";
        resultsList.appendChild(li);
        return;
    }

    const { iframe, config } = window._lastRendered;
    const chart = iframe.contentWindow?.renderedChart;

    const results = allChecks.map((check) =>
        runCheck({ name: check.name, run: check.run, iframe, config, chart })
    );

    results.forEach((result) => {
        const item = renderResultItem({
            label: result.label,
            description: "",
            status: result.type,
            message: result.message,
        });
        resultsList.appendChild(item);
    });
});

function renderResultItem({ label, description, status, message }) {
    const container = document.createElement("li");
    container.className = `result-item ${status}`;

    const title = document.createElement("strong");
    title.textContent = label;

    const desc = document.createElement("p");
    desc.textContent = description;

    const statusTag = document.createElement("span");
    statusTag.className = `status-label ${status}`;
    statusTag.textContent =
        status === "pass"
            ? "✅ Pass"
            : status === "warning"
            ? "⚠️ Warning"
            : "❌ Fail";

    const note = document.createElement("small");
    note.textContent = message;

    container.appendChild(title);
    container.appendChild(statusTag);
    container.appendChild(desc);
    container.appendChild(note);

    return container;
}
