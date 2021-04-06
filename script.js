var coloringOpacity = '1';
var paintingDefaultColor = '#2c2d2d'; //@STCGoal Color of the default hover painting
var transparentColor = '#2c2d2d'; //TRANSPARENT COLOR
var cursorOnDrawing = 'crosshair';//'pointer'
var boxStyleBorder = '1px solid gray';
var boxStyleBorder = 'none';


var hueColor = getColoring();
function setColoring()
{
	changeColorizedButton();
	refreshColoring();
}
function refreshColoring()
{
	hueColor = getColoring();
	console.log("hue changed:" + hueColor);
}
function getColoring()
{
	var coloring = document.getElementById("coloring");
	//console.log(coloring.value);
	//hueColor = coloring.value;
	return coloring.value;
}




// Variable for grid container element.
const gridcontainer = document.getElementById('gridcontainer');




// Variable for individual box.
const box = document.createElement('div');
box.classList.add('box');
box.style.height = '32px';
box.style.width = '32px';
box.style.opacity = '0.1';
box.style.border = '1px solid gray';
//box.style.border = 'none';

// Variables for buttons.
const headerButton = document.getElementById('header');
const hoverButton = document.getElementById('hover');
const dragButton = document.getElementById('drag');
const clearButton = document.getElementById('clear');
const defaultButton = document.getElementById('default');
const transparentButton = document.getElementById('transparent');
const colorizedButton = document.getElementById('colorized');
const resizeButton = document.getElementById('resize');

// Nodelist for buttons.
const buttons = document.querySelectorAll('button');

// Adds default grid of 16x16 boxes to window on load.
window.onload = function() {
	for (let i = 0; i < 256; i++) {
		try {
			gridcontainer.appendChild(box.cloneNode());
			
		} catch (error) {
			setTimeout(function()
			{
				
				try {
					gridcontainer.appendChild(box.cloneNode());
				} catch (error2) {
					console.log(error);
					console.log(error2);
					
				}
			
			},400);
		}
	}
}

// Nodelist for boxes.
var boxes = document.getElementsByClassName('box');

// Functions for button stylings.
function changeHeaderButton() {
	headerButton.classList.add('focused');
	setTimeout(() => {buttons.forEach(button => {button.classList.remove('focused')})}, 250);
}

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
	transparentButton.classList.remove('focused');
	colorizedButton.classList.remove('focused');
}

function changeTransparentButton() {
	transparentButton.classList.add('focused');
	defaultButton.classList.remove('focused');
	colorizedButton.classList.remove('focused');
}

function changeColorizedButton() {
	colorizedButton.classList.add('focused');
	defaultButton.classList.remove('focused');
	transparentButton.classList.remove('focused');
}

function changeClearButton() {
	clearButton.classList.add('focused');
	setTimeout(() => {clearButton.classList.remove('focused')}, 250);
}

// Variable for event handler.
const e = (e) => {};


// Function for default + hover.
function mouseHoverDefault(e) {
	e.target.style.border = 'none';
	e.target.style.opacity = '1';
	e.target.style.background = paintingDefaultColor;
}

// Functions for default + drag.
function mouseDragDefaultUp(e) {
 	for (i = 0; i < boxes.length; i++) {
    	boxes[i].removeEventListener('mouseover', mouseHoverDefault);
	} 	
}

function mouseDragDefault(e) {
	e.target.style.border = 'none';
	e.target.style.opacity = '1';
	e.target.style.background = paintingDefaultColor;//
	for (i = 0; i < boxes.length; i++) {
    	boxes[i].addEventListener('mouseover', mouseHoverDefault);
	}
	for (i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('mouseup', mouseDragDefaultUp);         					
	}
}

// Function for transparent + hover.
function mouseHoverTransparent(e) {
	e.target.style.border = 'none';
	e.target.style.background = transparentColor; 
	e.target.style.opacity = String(Number(e.target.style.opacity) + 0.1);
}

// Functions for transparent + drag.
function mouseDragTransparentUp(e) {
	e.target.style.border = 'none';
	e.target.style.background = transparentColor;		
 	for (i = 0; i < boxes.length; i++) {
    	boxes[i].removeEventListener('mouseover', mouseHoverTransparent);
	} 
}

function mouseDragTransparent(e) {
	e.target.style.border = 'none';
	e.target.style.background = transparentColor; 
	e.target.style.opacity = String(Number(e.target.style.opacity) + 0.1);
	for (i = 0; i < boxes.length; i++) {
    	boxes[i].addEventListener('mouseover', mouseHoverTransparent);
	}
	for (i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('mouseup', mouseDragTransparentUp);        					
	}
}

// Function for colorized + hover.
function mouseHoverColorized(e) {
	refreshColoring();
	const hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
	e.target.style.border = 'none';
	e.target.style.background = hueColor;
	e.target.style.opacity = coloringOpacity;
}

// Functions for colorized + drag.
function mouseDragColorizedUp(e) {
	refreshColoring();
	const hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
	e.target.style.border = 'none';

	e.target.style.background = hueColor; 
	e.target.style.opacity = coloringOpacity;
 	for (i = 0; i < boxes.length; i++) {
    	boxes[i].removeEventListener('mouseover', mouseHoverColorized);
    }
}
function mouseDragColorized(e) {
	refreshColoring();
	const hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
	e.target.style.border = 'none';
	e.target.style.background = hueColor;
	e.target.style.opacity = coloringOpacity;
	for (i = 0; i < boxes.length; i++) {
    	boxes[i].addEventListener('mouseover', mouseHoverColorized);
	}
	for (i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('mouseup', mouseDragColorizedUp);
    }
}

// Functions for all mode combinations.
function defaultHover() {
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('mouseenter', mouseHoverDefault);
	}
}

function defaultDrag() {
	for (let i = 0; i < boxes.length; i++) {	
   		boxes[i].addEventListener('mousedown', mouseDragDefault);
    }
}

function transparentHover() {
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('mouseenter', mouseHoverTransparent);
	}
}

function transparentDrag() {
	for (let i = 0; i < boxes.length; i++) {	
   		boxes[i].addEventListener('mousedown', mouseDragTransparent);
   	}
}

function colorizedHover() {
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('mouseenter', mouseHoverColorized);
	}
}

function colorizedDrag() {
	for (let i = 0; i < boxes.length; i++) {	
   		boxes[i].addEventListener('mousedown', mouseDragColorized);
   	}
}

// Functions for deselecting other modes.
function removeHoverDefault() {
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('mouseenter', mouseHoverDefault);
	}
}

function removeDragDefaultUp() {
	for (i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('mouseup', mouseDragDefaultUp);         					
	}
}

function removeDragDefault() {
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('mousedown', mouseDragDefault);
	}	
}

function removeHoverTransparent() {
	for (i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('mouseenter', mouseHoverTransparent);
	}
}

function removeDragTransparentUp() {
	for (i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('mouseup', mouseDragTransparentUp);
	}
}

function removeDragTransparent() {
	for (i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('mousedown', mouseDragTransparent);
	}
}

function removeHoverColorized() {
	for (i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('mouseenter', mouseHoverColorized);
	}
}

function removeDragColorizedUp() {
	for (i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('mouseup', mouseDragColorizedUp);
	}
}

function removeDragColorized() {
	for (i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('mousedown', mouseDragColorized);
	}
}

// Checks what buttons have been selected, then chooses the corresponding function.
function checkSelected() {
	const selectedButtons = Array.from(document.querySelectorAll('.focused'));
	// Code to run for hover + default.
	if (selectedButtons.includes(document.querySelector('button#hover.focused')) && selectedButtons.includes(document.querySelector('button#default.focused'))) {
		gridcontainer.style.cursor = cursorOnDrawing;

		removeHoverTransparent();
		removeHoverColorized();
		removeDragDefault();
		removeDragDefaultUp();
		removeDragTransparent();
		removeDragTransparentUp();
		removeDragColorized();
		removeDragColorizedUp();

		defaultHover();
	}

	// Code to run for drag + default.
	else if (selectedButtons.includes(document.querySelector('button#drag.focused')) && selectedButtons.includes(document.querySelector('button#default.focused'))) {
		gridcontainer.style.cursor = cursorOnDrawing;

		removeDragTransparent();
		removeDragTransparentUp();
		removeDragColorized();
		removeDragColorizedUp();
		removeHoverDefault();
		removeHoverTransparent();
		removeHoverColorized();

		defaultDrag();
	}

		// Code to run for hover + transparent.
	else if (selectedButtons.includes(document.querySelector('button#hover.focused')) && selectedButtons.includes(document.querySelector('button#transparent.focused'))) {
		gridcontainer.style.cursor = cursorOnDrawing;

		removeHoverDefault();
		removeHoverColorized();
		removeDragDefault();
		removeDragDefaultUp();
		removeDragTransparent();
		removeDragTransparentUp();
		removeDragColorized();
		removeDragColorizedUp();

		transparentHover();
	}

		// Code to run for drag + transparent.
	else if (selectedButtons.includes(document.querySelector('button#drag.focused')) && selectedButtons.includes(document.querySelector('button#transparent.focused'))) {
		gridcontainer.style.cursor = cursorOnDrawing;

		removeDragDefault();
		removeDragDefaultUp();
		removeDragColorized();
		removeDragColorizedUp();
		removeHoverDefault();
		removeHoverTransparent();
		removeHoverColorized();

		transparentDrag();
	}

		// Code to run for hover + colorized.
	else if (selectedButtons.includes(document.querySelector('button#hover.focused')) && selectedButtons.includes(document.querySelector('button#colorized.focused'))) {
		gridcontainer.style.cursor = cursorOnDrawing;

		removeHoverDefault();
		removeHoverTransparent();
		removeDragDefault();
		removeDragDefaultUp();
		removeDragTransparent();
		removeDragTransparentUp();
		removeDragColorized();
		removeDragColorizedUp();

		colorizedHover();
	}

		// Code to run for drag + colorized.
	else if (selectedButtons.includes(document.querySelector('button#drag.focused')) && selectedButtons.includes(document.querySelector('button#colorized.focused'))) {
		gridcontainer.style.cursor = cursorOnDrawing;

		removeDragDefault();
		removeDragDefaultUp();
		removeDragTransparent()
		removeDragTransparentUp();
		removeHoverDefault();
		removeHoverTransparent();
		removeHoverColorized(); 

		colorizedDrag();
	}

	else {
		return;
	}
}

// Function for clearing grid.
function clearGrid() {
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].style.opacity = '0.1';
		boxes[i].style.border = '1px solid black';
		boxes[i].style.background = '#f9f9f9';
	}
}

//Function for resizing grid.
var resizeNumber;

function resizeGrid() {
	resizeButton.classList.add('focused');

	setTimeout(() => {
		resizeNumber = String(parseInt(prompt('Please enter how many grids and columns you would like. The maximum number allowed is 60.')));
		var boxesArray = Array.from(boxes);
		try {			
			etchResized();
		} catch (error) {
			console.log("Tried to ran : etchResized();" + error);
		}

		if (resizeNumber <= 60 && resizeNumber > 0) {
			for (let i = 0; i < boxesArray.length; i++) {
				gridcontainer.removeChild(document.querySelector('.box'));
			}

			var newBox = document.createElement('div');
			newBox.classList.add('box');
			newBox.style.height = String(512 / Number(resizeNumber)) + 'px';
			newBox.style.width = String(512 / Number(resizeNumber)) + 'px';
			newBox.style.opacity = '0.1';
			newBox.style.border = '1px solid black';

			for (let i = 0; i < (resizeNumber * resizeNumber); i++) {
				gridcontainer.appendChild(newBox.cloneNode());
			}

			checkSelected();		
		}

		else if (resizeNumber <= 0 || resizeNumber > 60) {
			return;
		}

		else if (resizeNumber === null || resizeNumber === undefined) {
			return;
		}
	}, 250);

	setTimeout(() => {resizeButton.classList.remove('focused')}, 250);
}


//initial resize
resizeGridInit();
function resizeGridInit() {
	//resizeButton.classList.add('focused');

	setTimeout(() => {
		resizeNumber = 33; //initial size
		
		var boxesArray = Array.from(boxes);
		try {			
			etchResized();
		} catch (error) {
			console.log("Tried to ran : etchResized();" + error);
		}

		if (resizeNumber <= 60 && resizeNumber > 0) {
			for (let i = 0; i < boxesArray.length; i++) {
				gridcontainer.removeChild(document.querySelector('.box'));
			}

			var newBox = document.createElement('div');
			newBox.classList.add('box');
			newBox.style.height = String(512 / Number(resizeNumber)) + 'px';
			newBox.style.width = String(512 / Number(resizeNumber)) + 'px';
			newBox.style.opacity = '0.1';
			newBox.style.border = '1px solid black';

			for (let i = 0; i < (resizeNumber * resizeNumber); i++) {
				gridcontainer.appendChild(newBox.cloneNode());
			}

			checkSelected();		
		}

		else if (resizeNumber <= 0 || resizeNumber > 60) {
			return;
		}

		else if (resizeNumber === null || resizeNumber === undefined) {
			return;
		}
	}, 250);

	setTimeout(() => {resizeButton.classList.remove('focused')}, 250);
}








// Function for resetting entire grid.
function resetAll() {
	clearGrid();
	checkSelected();

	removeDragDefault();
	removeDragDefaultUp();

	removeDragTransparent()
	removeDragTransparentUp();

	removeDragColorized();
	removeDragColorizedUp();

	removeHoverDefault();
	removeHoverTransparent();
	removeHoverColorized(); 

	var boxesArray = Array.from(boxes);

	for (let i = 0; i < boxesArray.length; i++) {
		gridcontainer.removeChild(document.querySelector('.box'));
	}

	for (let i = 0; i < 256; i++) {
		gridcontainer.appendChild(box.cloneNode());
	}

	gridcontainer.style.cursor = cursorOnDrawing;
}

// Event listeners for changing button style.
try {
	
	headerButton.addEventListener('click', changeHeaderButton);
	hoverButton.addEventListener('click', changeHoverButton);
	dragButton.addEventListener('click', changeDragButton);
	clearButton.addEventListener('click', changeClearButton);
	defaultButton.addEventListener('click', changeDefaultButton);
	transparentButton.addEventListener('click', changeTransparentButton);
	colorizedButton.addEventListener('click', changeColorizedButton);

	// Event listeners for selecting button modes.
	headerButton.addEventListener('click', resetAll);
	hoverButton.addEventListener('click', checkSelected);
	dragButton.addEventListener('click', checkSelected);
	clearButton.addEventListener('click', clearGrid);
	defaultButton.addEventListener('click', checkSelected);
	transparentButton.addEventListener('click', checkSelected);
	colorizedButton.addEventListener('click', checkSelected);
	resizeButton.addEventListener('click', resizeGrid);


} catch (error) {
	

	setTimeout(function() {
			
		try {
			
	
		headerButton.addEventListener('click', changeHeaderButton);
		hoverButton.addEventListener('click', changeHoverButton);
		dragButton.addEventListener('click', changeDragButton);
		clearButton.addEventListener('click', changeClearButton);
		defaultButton.addEventListener('click', changeDefaultButton);
		transparentButton.addEventListener('click', changeTransparentButton);
		colorizedButton.addEventListener('click', changeColorizedButton);
		
		// Event listeners for selecting button modes.
		headerButton.addEventListener('click', resetAll);
		hoverButton.addEventListener('click', checkSelected);
		dragButton.addEventListener('click', checkSelected);
		clearButton.addEventListener('click', clearGrid);
		defaultButton.addEventListener('click', checkSelected);
		transparentButton.addEventListener('click', checkSelected);
		colorizedButton.addEventListener('click', checkSelected);
		resizeButton.addEventListener('click', resizeGrid);
	} catch (error) {
			
	}
	
	},111);
}	
