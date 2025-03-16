// Get references to the HTML elements
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const numPointsSlider = document.getElementById('numPoints');
const numPointsValue = document.getElementById('numPointsValue');
const updateBtn = document.getElementById('updateBtn');

// Global variables
let totalPoints = parseInt(numPointsSlider.value, 10);
let pointsDrawn = 0;
let animationId = null;
const pointsPerFrame = 100; // Adjust for performance and smoothness

// Define the triangle vertices (with some margin)
const margin = 50;
const A = [canvas.width / 2, margin];
const B = [margin, canvas.height - margin];
const C = [canvas.width - margin, canvas.height - margin];

// Current point for fractal generation
let currentPoint = [canvas.width / 2, canvas.height / 2];

// Draw the triangle outline and vertices
function drawTriangle() {
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(A[0], A[1]);
  ctx.lineTo(B[0], B[1]);
  ctx.lineTo(C[0], C[1]);
  ctx.closePath();
  ctx.stroke();

  // Label vertices
  ctx.fillStyle = 'red';
  ctx.font = '16px Arial';
  ctx.fillText('A', A[0] - 10, A[1] - 10);
  ctx.fillText('B', B[0] - 10, B[1] + 20);
  ctx.fillText('C', C[0] + 10, C[1] + 20);
}

// Function to clear canvas and draw initial triangle
function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTriangle();
  pointsDrawn = 0;
  currentPoint = [canvas.width / 2, canvas.height / 2];
}

// Update slider display and reset canvas on slider input
numPointsSlider.addEventListener('input', function () {
  totalPoints = parseInt(this.value, 10);
  numPointsValue.textContent = this.value;
  resetCanvas();
});

// Function to update the canvas with new fractal points
function animate() {
  // Draw a batch of points each frame
  for (let i = 0; i < pointsPerFrame && pointsDrawn < totalPoints; i++) {
    // Randomly select one of the vertices
    const r = Math.floor(Math.random() * 3);
    let vertex = (r === 0) ? A : (r === 1) ? B : C;
    
    // Compute the midpoint between the current point and the selected vertex
    currentPoint = [
      (currentPoint[0] + vertex[0]) / 2,
      (currentPoint[1] + vertex[1]) / 2
    ];
    
    // Draw a small dot at the current point
    ctx.fillStyle = 'blue';
    ctx.fillRect(currentPoint[0], currentPoint[1], 1, 1);
    pointsDrawn++;
  }
  
  // Optionally, display current point count (draw on canvas)
  ctx.fillStyle = 'red';
  ctx.font = '16px Arial';
  // Clear a small area at the top left for the text:
  ctx.clearRect(0, 0, 150, 30);
  ctx.fillText("Points: " + pointsDrawn, 10, 20);
  
  if (pointsDrawn < totalPoints) {
    animationId = requestAnimationFrame(animate);
  }
}

// Button click: reset canvas and start animation
updateBtn.addEventListener('click', function () {
  resetCanvas();
  if (animationId) cancelAnimationFrame(animationId);
  animate();
});

// Start the initial drawing
drawTriangle();
animate();
