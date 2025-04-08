// 1. Is module included?
export function checkModuleIncluded({ iframe }) {
    const doc = iframe.contentDocument;
    const hasModule = doc.querySelector('script[src*="accessibility.js"]');

    if (hasModule) {
        return {
            type: "pass",
            message:
                "Accessibility module is included. This will enable screen reader and keyboard navigation support.",
        };
    } else {
        return {
            type: "fail",
            message:
                "Accessibility module is not included. This will result in that a chart is interpreted as an image instead of a interactive chart.",
        };
    }
}

// 2. Does the chart have a description?
export function checkChartDescription({ iframe, config }) {
    const doc = iframe.contentDocument;

    const el = doc.querySelector(
        ".highcharts-description, .highcharts-linked-description"
    );

    const hasVisibleText = el && el.textContent.trim() !== "";

    const desc =
        config?.accessibility?.description ??
        iframe.contentWindow?.renderedChart?.options?.accessibility
            ?.description;

    const hasInvisibleDesc = typeof desc === "string" && desc.trim().length > 0;

    if (hasVisibleText) {
        return {
            type: "pass",
            message: "Chart has a visible description linked to the chart.",
        };
    }

    if (hasInvisibleDesc) {
        return {
            type: "warning",
            message:
                "Chart has an accessibility.description, but no visible description element.",
        };
    }

    return {
        type: "fail",
        message:
            "Chart is missing both a visible description and accessibility.description.",
    };
}

// 3. Does the chart have a title or a screen reader title?
export function checkChartTitle({ iframe }) {
    const doc = iframe.contentDocument;

    // Getting the title elements
    const visibleTitleEl = doc.querySelector(".highcharts-title");
    const screenReaderRegion = doc.getElementById(
        "highcharts-screen-reader-region-before-0"
    ).children[0];
    const screenReaderHeading = screenReaderRegion?.querySelector(
        "h1, h2, h3, h4, h5, h6"
    );

    // Getting the title text
    const screenReaderText = screenReaderHeading?.textContent?.trim() ?? "";
    const visibleTitleText = visibleTitleEl?.textContent?.trim();

    // Assertions
    const isVisible = visibleTitleEl && visibleTitleEl.offsetParent !== null;
    const hasEmptyVisibleTitle =
        visibleTitleEl && visibleTitleEl.textContent.trim() === "";
    const hasDefaultVisibleTitle =
        visibleTitleEl && visibleTitleEl.textContent.trim() === "Chart title";
    const hasDefaultScreenReaderTitle = ["Chart", "Chart title"].includes(
        screenReaderTitle
    );
    const areTitlesAligned = screenReaderText === visibleTitleText;

    // 3.1 Empty visible title and default screen reader title
    if (hasEmptyVisibleTitle && hasDefaultScreenReaderTitle) {
        return {
            type: "fail",
            message:
                "Chart has a visible title set to an empty string. Screen reader heading has default heading 'Chart'. Please provide a title.",
        };
    }
    // 3.2 Default visible title && default screen reader title
    if (hasDefaultVisibleTitle && hasDefaultScreenReaderTitle) {
        return {
            type: "warning",
            message:
                "Chart has a visible title, but it is the default 'Chart title'. Consider giving the chart a better title.",
        };
    }

    // 3.3 Valid visible title && default screen reader title
    if (
        visibleTitleEl &&
        isVisible &&
        !hasDefaultVisibleTitle &&
        hasDefaultScreenReaderTitle
    ) {
        return {
            type: "warning",
            message:
                "Chart has a visible title, but the screen reader title is the default 'Chart'. Consider check why the titles misalign.",
        };
    }

    // 3.4 Visible title matching screen reader title
    if (visibleTitleEl && isVisible && areTitlesAligned) {
        // 3.3 Valid visible title
        return {
            type: "pass",
            message:
                "Chart has a visible title that is also matching the screen reader title.",
        };
    }

    // 3.6 No title at all
    return {
        type: "fail",
        message:
            "Chart is missing both a visible title and a screen reader title.",
    };
}

// 4. Does the chart have a subtitle or a screen reader subtitle?

// 5. Does the chart have a xAxis title or a screen reader xAxis title?

// 6. Does the chart have a yAxis title or a screen reader yAxis title?

// 7. Does the chart have dataLabels or series-module included?

// 7. Does all of the chart series have a name or a screen reader name?

// 8. Does tooltip have a valueSuffix set?

// 9. Is tooltip StickOnContact set?

// 10. How is the series contrast compared to the background contrast?

// 11. Are the series touching or overlapping and need color contrast between each other?
