let vert = 16;
let horz = 16;

const sketchPad = document.querySelector("#sketchPad");

function createGrid() {
    for (let i = 0; i < (horz * vert); i++) {
        const gridCell = document.createElement("div");

        gridCell.style.flex = `0 0 ${100 / horz}%`;
        gridCell.style.height = `${100 / vert}%`;

        gridCell.classList.add("cell");
        sketchPad.appendChild(gridCell);
    } 

}
createGrid();