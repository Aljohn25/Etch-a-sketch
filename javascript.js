let normalSize = 16;
let currentMode = "click";
let selectedColor = "black";
let currentColor = selectedColor;
let tempSelectedColor = selectedColor;
let isMouseDown = false;

window.addEventListener("mousedown", () => isMouseDown = true);
window.addEventListener("mouseup", () => isMouseDown = false);


const sketchPad = document.querySelector("#sketchPad");

function createGrid(size) {
  
  sketchPad.innerHTML = ""; 

  const totalCells = size * size;
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    
    cell.addEventListener("mouseover", hoverMode);
    cell.addEventListener("mouseover", clickMode);
    cell.addEventListener('mousedown', clickMode);

    cell.style.width = `calc(100% / ${size})`;
    cell.style.height = `calc(100% / ${size})`;

    sketchPad.appendChild(cell);
  }
}

const erase = document.querySelector(".erase");

erase.onclick = function() {
  if (erase.textContent === "ERASE:ON"){
    erase.textContent = "ERASE:OFF";
    currentColor = selectedColor;
  }
  else {
    erase.textContent = "ERASE:ON";
    currentColor = "#f8f9fa";
  }

}

function hoverMode() {
  if  (currentMode === "hover") {
  this.className = `cell ${currentColor}`;
  }
}

function clickMode(e) {
  if (e.type === "mousedown") {
    e.preventDefault();
  }
  if (currentMode === "click" && e.type === "mouseover" && !isMouseDown) {
    return;
  }
    
  this.className = "cell " + currentColor ;
  }

const draw = document.querySelector(".draw");

draw.onclick = function(){
  if (draw.textContent === "MODE:TRACE") {
    currentMode = "click";
    draw.textContent = "MODE:CLICK";
  }
  else {
    currentMode = "hover";
    draw.textContent = "MODE:TRACE";
  }
}

createGrid(normalSize);

const resize = document.querySelector(".resize");
const resizeModal = document.querySelector("#resizeModal"); 
const resizeInput = document.querySelector(".resizeInput");
const enter = document.querySelector(".enter");
const color = document.querySelector(".color")
const colorModal = document.querySelector(".colorModal");
const colorConfirm = document.querySelector(".colorConfirm");

color.onclick = function () {
  colorModal.showModal();
  erase.textContent = "ERASE:OFF";
  currentColor = selectedColor;
  tempSelectedColor = selectedColor;

  colorButtons.forEach(button => {
    if (button.dataset.color === selectedColor) {
      button.classList.add("clicked");
    } else {
      button.classList.remove("clicked");
    }
  });
};
  
resize.onclick = function() {
    resizeModal.showModal();
    resizeInput.focus();
};

const colorButtons = document.querySelectorAll('.colorSelect');


colorButtons.forEach(function(button) {

  button.onclick = function() {
    
  colorButtons.forEach(btn => btn.classList.remove('clicked'));
  button.classList.add('clicked');
  tempSelectedColor = button.dataset.color;
  }
});

colorConfirm.onclick = function() {
  selectedColor = tempSelectedColor;
  currentColor = selectedColor;
  colorModal.close();
}

  

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
  tempSelectedColor = selectedColor;
  colorButtons.forEach(button => {
    if (button.dataset.color === selectedColor) {
      button.classList.add('clicked');
    } else {
      button.classList.remove('clicked');
    }
  });
      
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
    resizeInput.value = "";
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
erase.textContent = "ERASE:OFF";
currentColor = selectedColor;
tempSelectedColor = selectedColor;
draw.textContent = "MODE:CLICK";
currentMode = "click";
resetModal.close();
}

const save = document.querySelector(".save");

save.onclick = function() {
  html2canvas(sketchPad, { useCORS: true }).then(canvas => {
                
  const imageURL = canvas.toDataURL("image/png");

  const downloadLink = document.createElement('a');
  downloadLink.href = imageURL;
  downloadLink.download = 'my-sketch.png'; 

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  });

}








