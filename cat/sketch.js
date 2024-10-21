let myCat;
let eyebrowTimer;
let feedX = -45, feedY = -250;
let playX = 45, playY = -250;
let textSizeValue = 32;
let message = "";

function setup() {
  createCanvas(540, 540);
  cursor(HAND);

  myCat = new Cat("Momo");
  resetEyebrowTimer();
}

function draw() {
  background("#FF5722");
  rectMode(CENTER);

  translate(width / 2, height / 2 + 30);
  scale(1);

  let m = createVector(mouseX, mouseY);
  let c = createVector(width / 2, height / 2);

  m.sub(c);
  m.mult(0.1);
  m.limit(17);

  noStroke();

  myCat.display(m);

  // FEED text
  fill(0);
  stroke(0);
  strokeWeight(3);
  textSize(textSizeValue);
  text("FEED", feedX, feedY);
  text("PLAY", playX, playY);

  // Status
  textSize(24);
  fill(255);
  textAlign(CENTER);  
  text(message, 0, 220); 

}

//class
class Cat {
  constructor(name) {
    this.name = name; 
    this.hungry = true; 
    this.happy = false; 
    this.hasEyebrows = false; 
  }

  // FEED
  feed() {
    this.hungry = false;
    this.happy = true;
    this.hasEyebrows = false; //Feeding the cat removes its eyebrows.
    message = this.name + " has been fed! It's happy now✨"; 
  }

  // PLAY
  play() {
    this.happy = true;
    this.hasEyebrows = false; // Playing with the cat removes its eyebrows.
    message = this.name + " is playing! It's excited now🎉"; 
  }

  // Cat
  display(m) {
    // face
    fill(0);
    ellipse(0, 0, 300, 300);

    // left eye
    if (frameCount % 120 >= 20) {
      fill(255);
      ellipse(-60, 0, 80, 80);

      push();
      translate(m.x, m.y);
      fill(0);
      ellipse(-60, 0, 50, 50);
      pop();
    } else {
      stroke(255);
      strokeWeight(3);
      line(-60 - 50, 0, -60 + 50, 0);
    }

    // right eye
    if (frameCount % 120 >= 20) {
      fill(255);
      ellipse(60, 0, 80, 80);

      push();
      translate(m.x, m.y);
      fill(0);
      ellipse(60, 0, 50, 50);
      pop();
    } else {
      stroke(255);
      strokeWeight(3);
      line(60 - 50, 0, 60 + 50, 0);
    }

    noStroke();

    // eyebrows
    if (this.hasEyebrows) {
      fill(255);
      rect(-55, -40, 60, 10, 3);
      rect(55, -40, 60, 10, 3);
    }

    // ears
    fill(0);
    triangle(-90, -120, -50, -200, -10, -120);
    triangle(90, -120, 50, -200, 10, -120);

    stroke(255);
    strokeWeight(5);

    // nose
    line(-10, 45, 0, 50);
    line(10, 45, 0, 50);

    // mouth
    fill(255);
    ellipse(0, 80, 50, 20);
  }
}

// Eyebrows Timer
function resetEyebrowTimer() {
  clearTimeout(eyebrowTimer); 
  eyebrowTimer = setTimeout(() => {
    myCat.hasEyebrows = true; 
    message = myCat.name + " seems grumpy!";
  }, 10000); // Eyebrows appear after 10 seconds
}

// Text click
function mousePressed() {
  let feedTextWidth = textWidth("FEED");
  let playTextWidth = textWidth("PLAY");

  let adjustedMouseX = mouseX - width / 2;
  let adjustedMouseY = mouseY - (height / 2 + 30);

  // FEED
  if (adjustedMouseX > feedX - feedTextWidth / 2 && adjustedMouseX < feedX + feedTextWidth / 2 &&
      adjustedMouseY > feedY - textSizeValue && adjustedMouseY < feedY) {
    myCat.feed(); 
    resetEyebrowTimer(); 
  }

  // PLAY 
  if (adjustedMouseX > playX - playTextWidth / 2 && adjustedMouseX < playX + playTextWidth / 2 &&
      adjustedMouseY > playY - textSizeValue && adjustedMouseY < playY) {
    myCat.play();
    resetEyebrowTimer();
  }
}
