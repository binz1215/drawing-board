const shapeBtn = document.getElementById('shape-botten');
const eraseBtn = document.getElementById('eraser-botten');
const destroyBtn = document.getElementById('destroy-botten');
const modeBtn = document.getElementById('mode-botten');
const colorOptions = Array.from(document.getElementsByClassName('color-option'));
const color = document.getElementById('color');
const lineWidth = document.getElementById('line-width');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); // ctx = context

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;

let isPainting = false;
let isFilling = false;
let isShape = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onShape(event) {
  if (isShape && isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.fill();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onShapeClike() {
  if (isShape) {
    isShape = false;
    shapeBtn.innerText = 'ShapeOn';
  } else {
    isShape = true;
    isFilling = false;
    modeBtn.innerText = 'Fill';
    shapeBtn.innerText = 'Shapeoff';
  }
}

function onMouseDown() {
  isPainting = true;
}

function onMouseUp() {
  isPainting = false;
}

function onLineWIdthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = 'Fill';
  } else {
    isFilling = true;
    modeBtn.innerText = 'Draw';
  }
}

function onCanversClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraseClick(event) {
  ctx.strokeStyle = 'white';
  const colorValue = event.target.dataset.color;
  ctx.fillStyle = colorValue;
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousemove', onShape);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mouseleave', onMouseUp);
canvas.addEventListener('click', onCanversClick);

lineWidth.addEventListener('change', onLineWIdthChange);
color.addEventListener('change', onColorChange);

colorOptions.forEach((color) => color.addEventListener('click', onColorClick));

modeBtn.addEventListener('click', onModeClick);
destroyBtn.addEventListener('click', onDestroyClick);
eraseBtn.addEventListener('click', onEraseClick);
shapeBtn.addEventListener('click', onShapeClike);
