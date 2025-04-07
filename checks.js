export function checkChartDescription({ iframe, config }) {
    const result = {
        type: "",
        message: "",
    };

    if (!iframe?.contentDocument) {
        result.type = "fail";
        result.message = "Could not access iframe document.";
        return result;
    }

    const doc = iframe.contentDocument;
    const descriptionEl = doc.querySelector(
        ".highcharts-description, .highcharts-linked-description"
    );
    const isVisible = descriptionEl && descriptionEl.offsetParent !== null;

    const hasA11yDescription =
        config?.accessibility?.description?.trim?.().length > 0;

    if (descriptionEl && isVisible) {
        result.type = "pass";
        result.message = "Chart has a visible description linked to the chart.";
    } else if (hasA11yDescription) {
        result.type = "warning";
        result.message =
            "Chart has accessibility.description, but no visible description element.";
    } else {
        result.type = "fail";
        result.message =
            "Chart is missing both a visible description and accessibility.description.";
    }

    return result;
}
