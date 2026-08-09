let normalSize = 16;

const sketchPad = document.querySelector("#sketchPad");

function createGrid(size) {
  const sketchPad = document.querySelector("#sketchPad");
  
  sketchPad.innerHTML = ""; 

  const totalCells = size * size;
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
   cell.classList.add("cell");

    cell.style.width = `calc(100% / ${size})`;
    cell.style.height = `calc(100% / ${size})`;

    sketchPad.appendChild(cell);
  }
}
createGrid(normalSize);

const resize = document.querySelector(".resize");
const resizeModal = document.querySelector("#resizeModal"); 
const resizeInput = document.querySelector(".resizeInput");
const enter = document.querySelector(".enter");

resize.onclick = function() {
    resizeModal.showModal();
    resizeInput.focus();
};

const closeResize = document.querySelector(".closeResize");
closeResize.onclick = function() {
  resizeModal.close();
  resizeInput.value = "";
  error.textContent = "";
};

const error = document.querySelector(".error");

enter.onclick = function() {

    const newSize = Number(resizeInput.value);
    if (newSize > 0 && newSize <= 100) {
    createGrid(newSize); 
    resizeModal.close();  
    resizeInput.value = ""; 
    error.textContent = "";
  } else {
    error.textContent = "Invalid size! Enter 1-100."
    error.style.color = "red";
  }
};

const reset = document.querySelector(".reset");

reset.onclick = function() {
createGrid(normalSize);
}

const color = document.querySelector(".color");
const colorPicker = document.querySelector("#colorPicker");

let selectedColor = colorPicker.value; 


color.onclick = function () {
  colorPicker.click();
};


colorPicker.addEventListener("input", (e) => {
  selectedColor = e.target.value;
  
  
  colorBtn.style.borderColor = selectedColor;
});

