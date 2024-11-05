let handpose;
let video;
let hands = [];
let index1, index2;
let thumb1, thumb2;
let rainbowColors;
let emojis = [];
let lineDrawn = false;
let emojiOptions = ["🎄", "🎁", "🎅🏻", "⛄️", "🌟"]; 

function preload() {
  handpose = ml5.handpose();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  handpose.detectStart(video, gotHands);

  rainbowColors = [
    color(255, 0, 0, 50),
    color(148, 0, 211, 50),
    color(75, 0, 130, 50),
    color(0, 0, 255, 50),
    color(0, 255, 0, 50),
    color(255, 255, 0, 50),
    color(255, 127, 0, 50),
  ];

  colorIndex = random(rainbowColors.length);
}

function draw() {
  image(video, 0, 0, width, height);

  if (hands.length == 2) {
    let currentColor = rainbowColors[floor(colorIndex)];
    let dist1 = dist(index1.x, index1.y, thumb1.x, thumb1.y);
    let dist2 = dist(index2.x, index2.y, thumb2.x, thumb2.y);

    stroke(100, 100, 50);
    point(index1.x, index1.y);
    point(index2.x, index2.y);
    point(thumb1.x, thumb1.y);
    point(thumb2.x, thumb2.y);

    if (dist1 >= 20 || dist2 >= 20) {
      lineDrawn = true;
      stroke(currentColor);
      strokeWeight(10);
      line(index1.x, index1.y, index2.x, index2.y);
      line(index1.x, index1.y, thumb1.x, thumb1.y);
      line(index2.x, index2.y, thumb2.x, thumb2.y);
      line(thumb1.x, thumb1.y, thumb2.x, thumb2.y);

      if (lineDrawn) {
        for (let i = 0; i < 3; i++) {
          let emojiX = random(min(index1.x, index2.x), max(index1.x, index2.x));
          let emojiY = random(min(index1.y, index2.y), max(index1.y, index2.y));
          let randomEmoji = random(emojiOptions); 
          emojis.push({ x: emojiX, y: emojiY, speed: random(1, 3), emoji: randomEmoji });
        }
        lineDrawn = false;
      }
    }

    if (dist1 < 20 && dist2 < 20) {
      applyChristmasColorEffect(
        min(index1.x, index2.x),
        min(index1.y, index2.y),
        abs(index2.x - index1.x),
        abs(index2.y - index1.y)
      );
    }
  } else {
    clear();
    image(video, 0, 0, width, height);
  }

  for (let i = emojis.length - 1; i >= 0; i--) {
    let emoji = emojis[i];
    textSize(32);
    text(emoji.emoji, emoji.x, emoji.y);
    emoji.y += emoji.speed;

    if (emoji.y > height) {
      emojis.splice(i, 1);
    }
  }
}

function applyChristmasColorEffect(x, y, w, h) {
  if (w <= 0 || h <= 0) {
    return;
  }

  let christmasColors = video.get(x, y, w, h);
  christmasColors.loadPixels();

  for (let i = 0; i < christmasColors.pixels.length; i += 4) {
    let r = christmasColors.pixels[i];
    let g = christmasColors.pixels[i + 1];
    let b = christmasColors.pixels[i + 2];
    
    let brightness = (r + g + b) / 3;
    if (brightness > 128) {
      christmasColors.pixels[i] = 255;    
      christmasColors.pixels[i + 1] = 0;  
      christmasColors.pixels[i + 2] = 0;  
    } else {
      christmasColors.pixels[i] = 0;      
      christmasColors.pixels[i + 1] = 179; 
      christmasColors.pixels[i + 2] = 44;  
    }
  }

  christmasColors.updatePixels();
  image(christmasColors, x, y, w, h);
}

function gotHands(results) {
  hands = results;
  colorIndex = random(rainbowColors.length);

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    if (i == 0) {
      index1 = hand.index_finger_tip;
      thumb1 = hand.thumb_tip;
    }
    if (i == 1) {
      index2 = hand.index_finger_tip;
      thumb2 = hand.thumb_tip;
    }
  }
}
