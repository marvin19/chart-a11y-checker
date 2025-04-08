export function createColorBox(color) {
    const box = document.createElement("div");
    box.style.width = "16px";
    box.style.height = "16px";
    box.style.backgroundColor = color;
    box.style.borderRadius = "3px";
    box.style.display = "inline-block";
    box.style.marginRight = "5px";
    return box;
}
