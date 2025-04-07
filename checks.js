// 1. Is module included?

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

export function checkChartTitle({ iframe, config }) {
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

// 3. Does the chart have a title?
// export function checkChartTitle({ iframe, config }) {
//     console.log("check chart title");
//     // const result = {
//     //     type: "",
//     //     message: "",
//     // };

//     // if (!iframe?.contentDocument) {
//     //     result.type = "fail";
//     //     result.message = "Could not access iframe document.";
//     //     return result;
//     // }

//     // const doc = iframe.contentDocument;
//     // const titleEl = doc.querySelector(".highcharts-title");
//     // const isVisible = titleEl && titleEl.offsetParent !== null;
//     // const hasA11yTitle = doc
//     //     .querySelector("highcharts-screen-reader-region-before-0")
//     //     .contains("h6");
//     // console.log(hasA11yTitle);

//     // return {
//     //     type: result.type,
//     //     message: result.message,
//     // };
// }
