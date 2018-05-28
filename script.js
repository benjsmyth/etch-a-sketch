// Variable for grid container element.
const gridcontainer = document.getElementById('gridcontainer');

// Variable for individual box.
const box = document.createElement('div');
box.classList.add('box');
box.style.height = '32px';
box.style.width = '32px';
box.style.border = '1px solid rgba(0, 0, 0, 0.4)'

// Variables for buttons.
const hoverButton = document.getElementById('hover');
const dragButton = document.getElementById('drag');
const clearButton = document.getElementById('clear');
const defaultButton = document.getElementById('default');
const transparentButton = document.getElementById('transparent');
const colorizedButton = document.getElementById('colorized');
const resizeButton = document.getElementById('resize');

// Nodelist for buttons.
const buttons = document.querySelectorAll('button');

// Nodelist for boxes.
const boxes = document.getElementsByClassName('box');

// Adds default grid of 16x16 boxes to window on load.
window.onload = function() {
	for (i = 0; i < 256; i++) {
		gridcontainer.appendChild(box.cloneNode());
	}
}

// Functions for button stylings.
function changeHoverButton() {
	hoverButton.classList.add('focused');
	dragButton.classList.remove('focused');
}

function changeDragButton() {
	dragButton.classList.add('focused');
	hoverButton.classList.remove('focused');
}

function changeDefaultButton() {
	defaultButton.classList.add('focused');
	transparentButton.classList.remove('focused')
	colorizedButton.classList.remove('focused');
}

function changeTransparentButton() {
	transparentButton.classList.add('focused');
	defaultButton.classList.remove('focused')
	colorizedButton.classList.remove('focused');
}

function changeColorizedButton() {
	colorizedButton.classList.add('focused');
	defaultButton.classList.remove('focused')
	transparentButton.classList.remove('focused');
}

function changeClearButton() {
	clearButton.classList.add('focused');
	setTimeout(() => {buttons.forEach(button => {button.classList.remove('focused')})}, 250);
}

function changeResizeButton() {

}

// Conditions and functions for button actions.
function hoverMode() {
	changeHoverButton();
}
	
function dragMode() {
	changeDragButton();
}

function clearGrid() {
	changeClearButton();
}

function defaultMode() {
	changeDefaultButton();
}

function transparentMode () {
	changeTransparentButton();
}

function colorizedMode() {
	changeColorizedButton();
}

function resizeGrid() {
	changeResizeButton();
}

// Functions for types of method.
function defaultHover() {
	for (i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('mouseover', (e) => {
			e.target.style.background = '#141414'; 
			e.target.style.boxShadow = '0 0 2px 1px black inset';
		});
	}
}

function defaultDrag() {
	for (i = 0; i < boxes.length; i++) {
   		boxes[i].addEventListener('mousedown', (e) => {
        	e.target.style.background = '#141414';
        	for (i = 0; i < boxes.length; i++) {
            	boxes[i].addEventListener('mouseenter', (e) => {
                	e.target.style.background = '#141414';
            })}
        });
   	} 
}

// Event listeners for buttons.
hoverButton.addEventListener('click', hoverMode);
dragButton.addEventListener('click', dragMode);
clearButton.addEventListener('click', clearGrid);
defaultButton.addEventListener('click', defaultMode);
transparentButton.addEventListener('click', transparentMode);
colorizedButton.addEventListener('click', colorizedMode);
resizeButton.addEventListener('click', resizeGrid);