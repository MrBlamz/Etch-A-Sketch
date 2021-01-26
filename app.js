const etchASketch = () => {
  // Array that holds all squares of the grid //
  let gridSquares = [];
  // Variable that holds the current selected color (default is black) //
  let color = "black";
  const colorPicker = document.getElementById("color-picker");
  const rainbowBtn = document.querySelector(".rainbow-button");
  const clearBtn = document.querySelector(".clear-grid-button");
  const gridSizeSlider = document.getElementById("grid-size-slider");

  // When user changes the slider value //
  gridSizeSlider.addEventListener("change", function newGrid() {
    // Variable that holds new grid size //
    let newSize = parseInt(gridSizeSlider.value);

    // Empty array to hold new squares when createGrid is called //
    gridSquares = [];
    // Delete grid from the DOM //
    deleteGrid();
    createGrid(newSize);
    paintSquares();
    updateDisplay();

    // Update element thats displays grid size //
    function updateDisplay() {
      // Variable that holds element that displays current grid size //
      const display = document.getElementById("grid-size-display");

      display.textContent = `Grid size: ${newSize}x${newSize}`;
    }

    // Delete grid from the DOM //
    function deleteGrid() {
      const container = document.querySelector(".grid-container");

      while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
      }
    }
  });

  // Change selectedColor when user changes colorPicker color //
  colorPicker.addEventListener("change", () => {
    color = colorPicker.value;
    paintSquares();
  });

  // Change selectedColor to rainbow when user clicks rainbow button //
  rainbowBtn.addEventListener("click", () => {
    color = "rainbow";
    paintSquares();
  });

  // Set all grid squares background color to white when user clicks clear button //
  clearBtn.addEventListener("click", function clear() {
    gridSquares.forEach((square) => {
      square.style.background = "white";
    });
  });

  // Change square background color when user hovers it //
  function paintSquares() {
    // Iterate over all squares of the grid //
    gridSquares.forEach((square) => {
      if (color === "rainbow") {
        square.addEventListener("mouseover", function rainbow() {
          // Generate a random color //
          let R = rndColor();
          let G = rndColor();
          let B = rndColor();
          square.style.background = `rgb(${R},${G},${B})`;
        });
      } else {
        square.addEventListener("mouseover", function changeColor() {
          square.style.background = color;
        });
      }
    });

    // Generate a random value between 0 and 255 //
    function rndColor() {
      return Math.floor(Math.random() * 256);
    }
  }

  // Create a new grid and append it DOM //
  function createGrid(size) {
    // Get container that will store the grid //
    const container = document.querySelector(".grid-container");

    // Create the columns of the grid //
    for (let col = 0; col < size; col++) {
      let col = document.createElement("div");
      // Add class col to div //
      col.className = "col";
      // Create the squares and add them to the column //
      for (let square = 0; square < size; square++) {
        let square = document.createElement("div");
        // Add class square to div //
        square.className = "square";
        // Add square to column //
        col.appendChild(square);
        // Add square to gridSquares array //
        gridSquares.push(square);
      }
      // Add column to container //
      container.appendChild(col);
    }
  }

  // Creates a grid of 16x16 by default //
  createGrid(16);
  paintSquares();
};

etchASketch();
