# etch-a-sketch
This is a basic online version of the classic "Etch-A-Sketch" board, in which one can make pixelated sketches on the canvas.

The board supports three possible styles, and two possible modes of applying these styles. The styles can all be combined with the modes to provide six possible variations for sketching.

**Hover** is a mode-type that sketches the canvas by hovering the mouse over it.

**Drag** is a mode-type that sketches the canvas by dragging the mouse over it.

**Default** is a style-type that colors the canvas with solid black.

**Transparent** is a style-type that colors the canvas with low-opacity solid black, which gets progressively darker as each pixel area is passed over repeatedly.

**Colorized** is a style-type that colors the canvas with a random solid color for every pixel area.

The **Clear** button empties the canvas of any applied changes, but retains the selected mode- and style-types.

The **Resize** button creates a prompt that accepts a given value from 1 to 70, which will change the canvas to represent that value for every row and column (for example, passing a value of 20 will create a grid of 400 pixel areas).

Finally, the label **Etch-A-Sketch** also acts as a reset button. Pressing it will remove all applied changes, including on the canvas and the selected mode- and style-types.

That's it!
