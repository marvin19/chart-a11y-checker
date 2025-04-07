// 1. Is module included?
export function checkModuleIncluded({ iframe, config }) {
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
    const isVisible = el && el.offsetParent !== null;
    const hasA11yDescription =
        config?.accessibility?.description?.trim?.().length > 0;

    if (el && isVisible) {
        return {
            type: "pass",
            message: "Chart has a visible description linked to the chart.",
        };
    }

    if (hasA11yDescription) {
        return {
            type: "warning",
            message:
                "Chart has accessibility.description, but no visible description element.",
        };
    }

    return {
        type: "fail",
        message:
            "Chart is missing both a visible description and accessibility.description.",
    };
}

// 3. Does the chart have a title or a screen reader title?
export function checkChartTitle({ iframe, config }) {
    const doc = iframe.contentDocument;
    const el = doc.querySelector(".highcharts-title");

    const isVisible = el && el.offsetParent !== null;

    if (el && isVisible) {
        return {
            type: "pass",
            message: "Chart has a visible title linked to the chart.",
        };
    }
}

// 4. Does the shcart have a subtitle or a screen reader subtitle?

// 5. Does the chart have a xAxis title or a screen reader xAxis title?

// 6. Does the chart have a yAxis title or a screen reader yAxis title?

// 7. Does the chart have dataLabels or series-module included?

// 7. Does all of the chart series have a name or a screen reader name?

// 8. Does tooltip have a valueSuffix set?

// 9. Is tooltip StickOnContact set?

// 10. How is the series contrast compared to the background contrast?

// 11. Are the series touching or overlapping and need color contrast between each other?
