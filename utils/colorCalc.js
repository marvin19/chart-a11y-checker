// These functions are copied from my other repository: Paletta
// Source: https://github.com/marvin19/Paletta
// Note: Ensure any updates to the original repository are reflected here if needed.

export const calculateContrastRatio = (color1, color2) => {
    const luminance1 = getLuminance(color1);
    const luminance2 = getLuminance(color2);

    // Formula for calculating luminance (L1 + 0.05) / (L2 + 0.05)
    // +0.05 is added to prevent division by zero
    // Math.max and Math.min are to ensure that L1 is the luminance of the lighter color and LS is the luminance of the darker color
    const contrast =
        (Math.max(luminance1, luminance2) + 0.05) /
        (Math.min(luminance1, luminance2) + 0.05);

    return parseFloat(contrast.toFixed(2));
};

export const getLuminance = (color) => {
    // Transforming hex to Rgb
    const rgb = hexToRgb(color);

    // calculating relative luminance from rgb values
    const a = [rgb.r, rgb.g, rgb.b].map((v) => {
        // Dividing the value by 255 to normalize it to a range of 0 to 1
        v /= 255;
        // Applying a piecewise gamma correction.
        // If value is less than or equal to 0.03928, divide by 12.92.
        // Otherwise, add 0.055 and raise to the power of 2.4
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    // calculating relative luminance as a number. The relative luminance can range from 0 (black) to 1 (white)
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result !== null
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
};

/******* END OF COPIED FUNCTIONS ***********/

export const rgbToHex = (r, g, b) => {
    // If only one argument and it's a string like "rgb(255, 255, 255)"
    if (typeof r === "string" && r.startsWith("rgb")) {
        const matches = r.match(/\d+/g)?.map(Number);
        if (matches?.length === 3) {
            [r, g, b] = matches;
        } else {
            return r; // Return original if parsing fails
        }
    }

    const toHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// TODO : Create case for when the color is a string name to convert it to hex
