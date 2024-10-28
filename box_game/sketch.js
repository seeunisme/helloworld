let instructions = 'Tap to create a new box,\ndrag to hit the target!';
let box;
let targets = [];
let score = 0;
let highScore = 0;
let targetHit = false; // whether a collision has occurred

function setup() {
  new Canvas();
  textFont("Poppins");
  
  createTarget();
}

function draw() {
  clear();
  drawBackgroundCircle();

  // Instructions
  textSize(17);
  textAlign(CENTER);
  fill(200);
  text(instructions, canvas.w / 2, canvas.h / 2);
  
  // Score system
  textSize(19);
  fill(150);
  textAlign(CENTER);
  text('High Score: ' + highScore, canvas.w / 2, canvas.h / 25);
  text('Score: ' + score, canvas.w / 2, canvas.h / 25 + 25);

  // Drag the box
  if (mouse.presses()) {
    // Collide with other sprites
    box = new Sprite(mouse.x, mouse.y, 30, 30);
    targetHit = false; // Reset the collision state when a new box is created
   }
  
  if (mouse.dragging()) {
    box.moveTowards(mouse); // Throw the box in the direction of the drag
  }
  
  // When the box is released without dragging
  if (mouse.released() && !mouse.dragged()) {
    box.speed = random(0, 5);
    box.direction = random(0, 360);
  }

  // Check if the box is out of the screen
  if (box && (box.x < 0 || box.x > width || box.y < 0 || box.y > height)) {
    // Reset the score if the target is not hit
    if (!targetHit) {
      highScore = max(highScore, score); // Update the high score
      score = 0; // Reset the score
    }
    box.remove(); // Remove the box
    box = null;
  }

  // Collision detection
  if (!targetHit) { // Only handle the first collision
    for (let i = targets.length - 1; i >= 0; i--) {
      if (box && box.collides(targets[i])) {
        // Set the target to move along with the box
        targets[i].vel = box.vel.copy();
        targets[i].direction = box.direction;
        
        score++;
        createTarget(); // Create a new target
        targetHit = true; 
        break; // Once a collision is detected
      }
    }
  }
}

// Background circle
function drawBackgroundCircle() {
  stroke(224, 224, 224);
  noFill();
  ellipse(width / 2, height / 2, 400, 400); 
}

// Target box
function createTarget() {
  let target = new Sprite(random(width / 2, width - 30), random(50, height - 50), 30, 30);
  target.color = color(32, 32, 32);
  targets.push(target);
}
