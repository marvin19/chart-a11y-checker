export function elementsOverlap(el1, el2) {
    // Check if el1 and el2 are SVG elements or SVGRect objects
    const box1 = typeof el1.getBBox === "function" ? el1.getBBox() : el1;
    const box2 = typeof el2.getBBox === "function" ? el2.getBBox() : el2;

    return (
        box1.x < box2.x + box2.width &&
        box1.x + box1.width > box2.x &&
        box1.y < box2.y + box2.height &&
        box1.y + box1.height > box2.y
    );
}
