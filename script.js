import { runCheck } from "./checkUtils.js";
import { checkChartDescription, checkChartTitle } from "./checks.js";
import { solarEmploymentConfig } from "./configs/lineChart.js";

const allChecks = [
    {
        name: "Chart Description",
        run: checkChartDescription,
    },
    {
        name: "Chart Title",
        run: checkChartTitle,
    },
];

document.getElementById("renderBtn").addEventListener("click", function () {
    const css = solarEmploymentConfig.css;
    const userHtml = solarEmploymentConfig.html;

    const previewRoot = document.getElementById("preview-root");
    previewRoot.innerHTML = ""; // Clear previous iframe

    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "500px";
    iframe.style.border = "1px solid #ccc";
    iframe.style.borderRadius = "8px";
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
    previewRoot.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow.document;

    window._lastRendered = {
        iframe: iframe,
        config: new Function("return " + solarEmploymentConfig.config)(),
    };

    const fullDoc = `
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
    doc.write(fullDoc);
    doc.close();
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

    const results = allChecks.map((check) =>
        runCheck({ name: check.name, run: check.run, iframe, config })
    );

    results.forEach((result) => {
        const li = document.createElement("li");
        li.className = result.type;
        li.textContent = `${
            result.type === "pass"
                ? "✅"
                : result.type === "warning"
                ? "⚠️"
                : "❌"
        } ${result.label}: ${result.message}`;
        resultsList.appendChild(li);
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
