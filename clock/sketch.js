let HourHeight = 0;
let MinuteHeight = 0;
let SecondHeight = 0;

function setup() {
  createCanvas(1500, 500); 
  noStroke();
}

function draw() {
  background(20); 
  

  // 현재 시간 가져오기
  let hr = hour();
  let mn = minute();
  let sc = second();
  let isAM = hr < 12; // AM인지 PM인지 확인

  // 직사각형을 가로로 3등분
  let rectWidth = width / 3; // 각각의 직사각형 너비
  let hourRectX = 0; // 시 부분 시작 위치
  let minuteRectX = rectWidth ; // 분 부분 시작 위치
  let secondRectX = rectWidth * 2 ; // 초 부분 시작 위치


  // AM/PM에 따른 색상 설정 (AM: 파란색 계열, PM: 노란색 계열)
  let ampmColor = isAM ? color("rgb(255,248,234)") : color("rgb(232,232,255)");

  // 목표 물 높이 계산
  let targetHourHeight = map(hr % 12, 0, 12, 0, height); // 시 부분 목표 물 높이
  let targetMinuteHeight = map(mn, 0, 60, 0, height); // 분 부분 목표 물 높이
  let targetSecondHeight = map(sc, 0, 60, 0, height); // 초 부분 목표 물 높이

  // 부드럽게 물이 차오르도록 높이를 점진적으로 변경rrgb(246,246,255)
  HourHeight = lerp(HourHeight, targetHourHeight, 0.1); 
  MinuteHeight = lerp(MinuteHeight, targetMinuteHeight, 0.1); 
  SecondHeight = lerp(SecondHeight, targetSecondHeight, 0.1);

  // 물결 흔들림 설정 (사인파를 이용하여 잔잔한 물결, 느리게)
  let waveSpeed = millis() / 2000; // 시간에 따른 물결의 변화 속도 (느리게 설정)


  // 시 부분 물결 그리기
  drawWave(hourRectX, height - HourHeight, rectWidth, HourHeight, ampmColor, 5);

  // 분 부분 물결 그리기
  drawWave(minuteRectX, height - MinuteHeight, rectWidth, MinuteHeight, ampmColor, 7);

  // 초 부분 물결 그리기
  drawWave(secondRectX, height - SecondHeight, rectWidth, SecondHeight, ampmColor, 9);
}

// 물결 그리는 함수 (waveHeight는 물결 높이, 더 자연스럽고 잔잔하게)
function drawWave(x, y, w, h, fillColor, waveHeight) {
  fill(fillColor);
  beginShape();
  for (let i = 0; i <= w; i++) {
    let wave = sin((i / w) * TWO_PI + millis() / 2000) * waveHeight; // 잔잔한 물결 (속도 느리게)
    vertex(x + i, y + wave); // 사인파로 물결 생성
  }
  vertex(x + w, y + h); // 아래쪽
  vertex(x, y + h); // 아래쪽
  endShape(CLOSE);
}
