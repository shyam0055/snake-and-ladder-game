// ==========================================
// 1. SELECT DOM ELEMENTS
// ==========================================
//buttons

// Main game board
const board = document.querySelector(".board");

// Score display element
let score = document.getElementById("score");

// Timer display element
let time = document.getElementById("time");

// ==========================================
// 2. GAME CONFIGURATION
// ==========================================

// Size of each snake block
const blockheight = 30;
const blockwidth = 30;

// Initial score
let val = 0;

// ==========================================
// 3. BOARD DIMENSIONS CALCULATION
// ==========================================

// Get board styles
const style = getComputedStyle(board);

// Remove padding to get actual playable area
const innerWidth =
  board.clientWidth -
  parseFloat(style.paddingLeft) -
  parseFloat(style.paddingRight);

const innerHeight =
  board.clientHeight -
  parseFloat(style.paddingTop) -
  parseFloat(style.paddingBottom);

// Calculate rows and columns
const cols = Math.floor(innerWidth / blockwidth);
const rows = Math.floor(innerHeight / blockheight);

// ==========================================
// 4. TIMER LOGIC
// ==========================================

//score board
let highscore = document.getElementById("high-score");
let bestScore = localStorage.getItem("snakeHighScore") || 0;
highscore.innerText = bestScore;
//
let totalSeconds = 0;

let timer = setInterval(() => {
  totalSeconds++;

  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  time.innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}, 1000);

// ==========================================
// 5. GAME DATA
// ==========================================

// Stores all board blocks
const blocks = [];

// Initial movement direction
let direction = "right";

// Prevent instant reverse movement
let prev = null;

// Random food position
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

// Initial snake body
const snake = [
  { x: 1, y: 3 },
  { x: 1, y: 4 },
];

// ==========================================
// 6. CREATE GAME BOARD
// ==========================================

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");

    block.classList.add("block");

    board.appendChild(block);

    // Store each block with row-col key
    blocks[`${row}-${col}`] = block;
  }
}

// ==========================================
// 7. RENDER SNAKE
// ==========================================

function render() {
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  });
}

// ==========================================
// 8. KEYBOARD CONTROLS
// ==========================================

addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && prev !== "down") {
    direction = "up";
  } else if (event.key === "ArrowDown" && prev !== "up") {
    direction = "down";
  } else if (event.key === "ArrowLeft" && prev !== "right") {
    direction = "left";
  } else if (event.key === "ArrowRight" && prev !== "left") {
    direction = "right";
  }
});
const up = document.querySelector(".up");
const down = document.querySelector(".down");
const left = document.querySelector(".left");
const right = document.querySelector(".right");

up.addEventListener("click", () => {
  if (prev !== "down") direction = "up";
});

down.addEventListener("click", () => {
  if (prev !== "up") direction = "down";
});

left.addEventListener("click", () => {
  if (prev !== "right") direction = "left";
});

right.addEventListener("click", () => {
  if (prev !== "left") direction = "right";
});
// ==========================================
// 9. MAIN GAME LOOP
// ==========================================

let gameloop = setInterval(() => {
  // Save previous direction
  prev = direction;

  // Show food
  blocks[`${food.x}-${food.y}`].classList.add("food");

  // Remove old snake drawing
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });

  let head = null;

  // ==========================================
  // 10. CALCULATE NEW HEAD POSITION
  // ==========================================

  
  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  }

  // ==========================================
  // 11. WALL COLLISION CHECK
  // ==========================================

  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
     document.querySelector(".pop").style.display="flex";

document.querySelector(".h-score").innerText = `${highscore.innerText}`;

document.querySelector(".p-score").innerText = `${score.innerText}`;

   

    clearInterval(gameloop);
    clearInterval(timer);
    
    


    return;
  }

  // ==========================================
  // 12. MOVE SNAKE
  // ==========================================

  // Add new head
  snake.unshift(head);

  // ==========================================
  // 13. FOOD COLLISION
  // ==========================================

  if (food.x === head.x && food.y === head.y) {
    // Remove eaten food
    blocks[`${food.x}-${food.y}`].classList.remove("food");

    // Generate new food
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };

    // Update score
    val += 5;
    if (val > bestScore) {
    bestScore = val;
    highscore.innerText = bestScore;

    localStorage.setItem("snakeHighScore", bestScore);
}
    score.innerText = val;
  } else {
    // Normal movement (remove tail)
    snake.pop();
  }

  // ==========================================
  // 14. DRAW UPDATED SNAKE
  // ==========================================

  render();
}, 300);
function restart() {
    location.reload();
}
