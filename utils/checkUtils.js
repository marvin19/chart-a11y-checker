export function runCheck({ name, run, iframe, config, chart }) {
    const defaultResult = {
        type: "fail",
        message: `Check "${name}" could not run.`,
        label: name,
    };

    if (!iframe?.contentDocument) {
        return {
            ...defaultResult,
            message: `Check "${name}" failed: iframe not available.`,
        };
    }

    try {
        const result = run({ iframe, config, chart }) || {};
        return {
            label: name,
            type: result.type || "fail",
            message: result.message || `Check "${name}" returned no message.`,
        };
    } catch (e) {
        return {
            ...defaultResult,
            message: `Check "${name}" crashed: ${e.message}`,
        };
    }
}
