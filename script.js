// Variable for grid container element.
const gridcontainer = document.getElementById('gridcontainer');

// Variable for individual box.
const box = document.createElement('div');
box.classList.add('box');
box.style.height = '32px';
box.style.width = '32px';
box.style.opacity = '0.1';
box.style.border = '1px solid black';

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
	for (let i = 0; i < 256; i++) {
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

// Functions for mouse reactions.
const e = (e) => {};

function mouseHoverDefault(e) {
	e.target.style.border = 'none';
	e.target.style.opacity = '1';
	e.target.style.background = '#141414';
}

function mouseDragDefault(e) {
	e.target.style.border = 'none';
	e.target.style.opacity = '1';
	e.target.style.background = '#141414';
	for (i = 0; i < boxes.length; i++) {
    	boxes[i].addEventListener('mouseover', mouseHoverDefault);
	}
	for (i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('mouseup', (e) => {
    		e.target.style.border = 'none';
    		e.target.style.opacity = '1';
        	e.target.style.background = '#141414';   
         	for (i = 0; i < boxes.length; i++) {
            	boxes[i].removeEventListener('mouseover', mouseHoverDefault);
			}           					
		});
	}
}

function mouseHoverTransparent(e) {
	e.target.style.border = 'none';
	e.target.style.background = '#141414'; 
	e.target.style.opacity = String(Number(e.target.style.opacity) + 0.1);
}

function mouseDragTransparent(e) {
	e.target.style.border = 'none';
	e.target.style.background = '#141414'; 
	e.target.style.opacity = String(Number(e.target.style.opacity) + 0.1);
	for (i = 0; i < boxes.length; i++) {
    	boxes[i].addEventListener('mouseover', mouseHoverTransparent)
	}
	for (i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('mouseup', (e) => {
			e.target.style.border = 'none';
			e.target.style.background = '#141414'; 
			e.target.style.opacity = String(Number(e.target.style.opacity) + 0.1);  
         	for (i = 0; i < boxes.length; i++) {
            	boxes[i].removeEventListener('mouseover', mouseHoverTransparent)
			}           					
		});
	}
}

function mouseHoverColorized(e) {
	const hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
	e.target.style.border = 'none';
	e.target.style.opacity = '1';
	e.target.style.background = hue;
}

function mouseDragColorized(e) {
	const hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
	e.target.style.border = 'none';
	e.target.style.opacity = '1';
	e.target.style.background = hue;
	for (i = 0; i < boxes.length; i++) {
    	boxes[i].addEventListener('mouseover', mouseHoverColorized);
	}
	for (i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('mouseup', (e) => {
			const hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
			e.target.style.border = 'none';
			e.target.style.opacity = '1';
			e.target.style.background = hue; 
         	for (i = 0; i < boxes.length; i++) {
            	boxes[i].removeEventListener('mouseover', mouseHoverColorized);
            }
        });
	}
}

// Functions for all mode combinations.
function defaultHover() {
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('mouseover', mouseHoverDefault);
	}
}

function defaultDrag() {
	for (let i = 0; i < boxes.length; i++) {	
   		boxes[i].addEventListener('mousedown', mouseDragDefault);
    }
}

function transparentHover() {
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('mouseover', mouseHoverTransparent);
	}
}

function transparentDrag() {
	for (let i = 0; i < boxes.length; i++) {	
   		boxes[i].addEventListener('mousedown', mouseDragTransparent);
   	}
}

function colorizedHover() {
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('mouseover', mouseHoverColorized);
	}
}

function colorizedDrag() {
	for (let i = 0; i < boxes.length; i++) {	
   		boxes[i].addEventListener('mousedown', mouseDragColorized);
   	}
}

// Functions for clearing grid and resizing grid.

// Functions for deselecting other modes.
function removeHoverDefault() {
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('mouseover', mouseHoverDefault);
	}
}

function removeDragDefault() {
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('mousedown', mouseDragDefault);
	}	
}

function removeHoverTransparent() {
	for (i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('mouseover', mouseHoverTransparent);
	}
}

function removeDragTransparent() {
	for (i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('mouseover', mouseDragTransparent);
	}
}

function removeHoverColorized() {
	for (i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('mouseover', mouseHoverColorized);
	}
}

function removeDragColorized() {
	for (i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('mouseover', mouseDragColorized);
	}
}

// Checks what buttons have been selected, then chooses the corresponding function.
function checkSelected() {
	const selectedButtons = Array.from(document.querySelectorAll('.focused'));
	console.log(selectedButtons);

	// Code to run for hover + default.
	if (selectedButtons.includes(document.querySelector('button#hover.focused')) && selectedButtons.includes(document.querySelector('button#default.focused'))) {
		defaultHover();

		removeHoverTransparent();
		removeHoverColorized();

		removeDragDefault();
		removeDragTransparent();
		removeDragColorized();
	}

	// Code to run for drag + default.
	if (selectedButtons.includes(document.querySelector('button#drag.focused')) && selectedButtons.includes(document.querySelector('button#default.focused'))) {
		defaultDrag();

		removeDragTransparent();
		removeDragColorized();

		removeHoverDefault();
		removeHoverTransparent();
		removeHoverColorized();
	}

		// Code to run for hover + transparent.
	if (selectedButtons.includes(document.querySelector('button#hover.focused')) && selectedButtons.includes(document.querySelector('button#transparent.focused'))) {
		transparentHover();

		removeHoverDefault();
		removeHoverColorized();

		removeDragDefault();
		removeDragTransparent();
		removeDragColorized();
	}

		// Code to run for drag + transparent.
	if (selectedButtons.includes(document.querySelector('button#drag.focused')) && selectedButtons.includes(document.querySelector('button#transparent.focused'))) {
		transparentDrag();

		removeDragDefault();
		removeDragColorized();

		removeHoverDefault();
		removeHoverTransparent();
		removeHoverColorized();
	}

		// Code to run for hover + colorized.
	if (selectedButtons.includes(document.querySelector('button#hover.focused')) && selectedButtons.includes(document.querySelector('button#colorized.focused'))) {
		colorizedHover();

		removeHoverDefault();
		removeHoverTransparent();

		removeDragDefault();
		removeDragTransparent();
		removeDragColorized();
	}

		// Code to run for drag + colorized.
	if (selectedButtons.includes(document.querySelector('button#drag.focused')) && selectedButtons.includes(document.querySelector('button#colorized.focused'))) {
		colorizedDrag();

		removeDragDefault();
		removeDragTransparent();

		removeHoverDefault();
		removeHoverTransparent();
		removeHoverColorized(); 
	}
}

// Event listeners for changing button style.
hoverButton.addEventListener('click', changeHoverButton);
dragButton.addEventListener('click', changeDragButton, checkSelected);
clearButton.addEventListener('click', changeClearButton, checkSelected);
defaultButton.addEventListener('click', changeDefaultButton, checkSelected);
transparentButton.addEventListener('click', changeTransparentButton, checkSelected);
colorizedButton.addEventListener('click', changeColorizedButton, checkSelected);
resizeButton.addEventListener('click', changeResizeButton, checkSelected);

// Event listeners for selecting button modes.
hoverButton.addEventListener('click', checkSelected);
dragButton.addEventListener('click', checkSelected);
clearButton.addEventListener('click', checkSelected);
defaultButton.addEventListener('click', checkSelected);
transparentButton.addEventListener('click', checkSelected);
colorizedButton.addEventListener('click', checkSelected);
resizeButton.addEventListener('click', checkSelected);