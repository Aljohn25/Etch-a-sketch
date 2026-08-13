let normalSize = 16;
let currentMode = "click";
let currentColor = "black";


const sketchPad = document.querySelector("#sketchPad");

function createGrid(size) {
  
  sketchPad.innerHTML = ""; 

  const totalCells = size * size;
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener('mouseover', hoverMode);
    cell.addEventListener('click', clickMode);

    cell.style.width = `calc(100% / ${size})`;
    cell.style.height = `calc(100% / ${size})`;

    sketchPad.appendChild(cell);
  }
}

const erase = document.querySelector(".erase");

erase.onclick = function() {
  if (erase.textContent === "ERASE:ON"){
    erase.textContent = "ERASE:OFF";
    currentColor = "black";
  }
  else {
    erase.textContent = "ERASE:ON";
    currentColor = "white";
  }

}

function hoverMode() {
  if (currentMode === "hover"){
  this.className = `cell ${currentColor}`;
  }
}

function clickMode() {
  if (currentMode === "click"){
  this.className = `cell ${currentColor}`;
  }
}
const draw = document.querySelector(".draw");

draw.onclick = function(){
  if (draw.textContent === "TRACE") {
    currentMode = "click";
    draw.textContent = "CLICK";
  }
  else {
    currentMode = "hover";
    draw.textContent = "TRACE";
  }
}

createGrid(normalSize);

const resize = document.querySelector(".resize");
const resizeModal = document.querySelector("#resizeModal"); 
const resizeInput = document.querySelector(".resizeInput");
const enter = document.querySelector(".enter");
const color = document.querySelector(".color")
const colorModal = document.querySelector(".colorModal");

color.onclick = function () {
  colorModal.showModal();
}

resize.onclick = function() {
    resizeModal.showModal();
    resizeInput.focus();
};

const colorButtons = document.querySelectorAll('.colorSelect');


  colorButtons.forEach(function(button) {

    button.onclick = function() {
    
    colorButtons.forEach(btn => btn.classList.remove('clicked'));
    button.classList.add('clicked');
    }
  });

const resetModal = document.querySelector(".resetModal");
const closeBtn = document.querySelectorAll(".resizeClose, .noReset, .resetClose, .colorClose, .colorCancel");

closeBtn.forEach(function(btn) {
  btn.onclick = function(){
    if (btn.classList.contains("resizeClose")){
    resizeModal.close();
    resizeInput.value = "";
    error.textContent = "";
    }
    if (btn.classList.contains("noReset") || btn.classList.contains("resetClose")){
    resetModal.close();
    }
    if (btn.classList.contains("colorClose")) {
      colorModal.close();
    }
    if (btn.classList.contains("colorCancel")) {
      colorModal.close();
    }
  }
});

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
    resizeInput.focus();
  }
};

const resetBtn = document.querySelector(".resetBtn");


resetBtn.onclick = function() {
  resetModal.showModal();
}
const reset = document.querySelector(".reset");

reset.onclick = function() {
createGrid(normalSize);
draw.textContent = "CLICK";
currentMode = "click";
resetModal.close();
}







