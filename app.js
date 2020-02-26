const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#202020";

canvas.width = 500;
canvas.height = 450;


ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){ // it happens everytime i move the mouse
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){   // painting = true / just move the mouse without click
        ctx.beginPath();  // creating path whenever moving the mouse
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y); // make a line from previous position of path
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "FILL";
    } else {    // filling = false 
        filling = true;
        mode.innerText = "PAINT"
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.Width,canvas.Height);
    }
}

function handleCM(event){
    event.preventDefault(); //stop opening the context menu, cliking the right mouse
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); // when clicking, start painting
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

console.log(Array.from(colors));
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

if(range){
    range.addEventListener("input",handleRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}