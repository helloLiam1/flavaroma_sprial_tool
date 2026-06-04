// --- Main p5.js Sketch ---

let rings = []; // Array to hold all our ring objects
let spiralRings = []; // NEW: Array to hold all our spiral ring objects
let full_circle_diam = 400; // The locked outer boundary radius

// --- UI & State Variables ---
let skewSlider, nSlider, amountSlider, offsetSlider;
let heightSlider, width1Slider, width2Slider, spiralWidthSlider;
let holeXSlider, holeYSlider, holeRadiusSlider;
let skewValueLabel, nValueLabel, amountValueLabel, offsetValueLabel;
let heightValueLabel, width1ValueLabel, width2ValueLabel, spiralWidthValueLabel;
let holeXValueLabel, holeYValueLabel, holeRadiusValueLabel;
let shapeToggleBtn; // Added toggle button variable
let isRectangle = false; // Global state for the shape toggle
let appContainer, canvasContainer, controlPanel;

// --- NEW: Spiral UI Variables ---
let addSpiralBtn, spiralControlPanel;
let showSpiral = false;
let spiralBlendSlider, spiralCurveSpreadSlider, spiralPeakSlider, spiralHeightSlider, spiralWidthSlider;
let spiralBlendLabel, spiralCurveSpreadLabel, spiralPeakLabel, spiralHeightLabel, spiralWidthLabel;

let lastN = -1,
  lastAmount = -1,
  lastSkew = -1,
  lastOffset = -1,
  lastHeight = -1,
  lastWidth1 = -1,
  lastWidth2 = -1,
  lastSpiralWidthRatio = -1, // renamed variable slightly to avoid conflict
  lastHoleX = -999,
  lastHoleY = -999,
  lastHoleRadius = -999,
  lastSBlend = -1,
  lastSSpread = -1,
  lastSPeak = -1,
  lastSHeight = -1,
  lastSWidth = -1;

let masterRotation = 0; // Controls continuous spinning globally

function setup() {
  appContainer = createDiv().id("app");
  canvasContainer = createDiv().id("canvasContainer").parent(appContainer);
  controlPanel = createDiv().id("controlPanel").parent(appContainer);

  const canvas = createCanvas(800, 800);
  canvas.parent(canvasContainer);

  function formatSliderValue(value, step) {
    const decimals = step < 1 ? 2 : 0;
    const num = Number(value);
    return step < 1 ? num.toFixed(decimals) : num.toString();
  }

  function createSliderControl(labelText, min, max, defaultValue, step, parentElement = controlPanel) {
    const row = createDiv()
      .parent(parentElement)
      .style("display", "flex")
      .style("align-items", "center")
      .style("gap", "10px")
      .style("margin", "12px 0");
    createSpan(labelText)
      .parent(row)
      .style("flex", "1")
      .style("font-size", "14px");
    const valueLabel = createSpan(formatSliderValue(defaultValue, step))
      .parent(row)
      .style("min-width", "50px")
      .style("text-align", "right")
      .style("font-weight", "700");
    const slider = createSlider(min, max, defaultValue, step)
      .parent(row)
      .class("slider")
      .style("flex", "1");
    slider.input(() =>
      valueLabel.html(formatSliderValue(slider.value(), step)),
    );
    return { slider, valueLabel };
  }

  createElement("h2", "Controls")
    .parent(controlPanel)
    .style("margin-bottom", "0");

  // Create sliders: createSlider(min, max, default, step)
  ({ slider: skewSlider, valueLabel: skewValueLabel } = createSliderControl(
    "Skew Angle",
    0,
    180,
    90,
    1,
  ));
  ({ slider: nSlider, valueLabel: nValueLabel } = createSliderControl(
    "Rings (n)",
    1,
    20,
    6,
    1,
  ));
  ({ slider: amountSlider, valueLabel: amountValueLabel } = createSliderControl(
    "Amount",
    4,
    100,
    24,
    2,
  ));
  ({ slider: offsetSlider, valueLabel: offsetValueLabel } = createSliderControl(
    "Offset Ratio",
    0,
    1,
    0.36,
    0.01,
  ));

  // Scale Multiplier Sliders (0.1 to 3.0, default 1.0)
  ({ slider: heightSlider, valueLabel: heightValueLabel } = createSliderControl(
    "Height Scale",
    0.1,
    3.0,
    1.0,
    0.05,
  ));
  ({ slider: width1Slider, valueLabel: width1ValueLabel } = createSliderControl(
    "Width 1 Scale",
    0.1,
    3.0,
    1.0,
    0.05,
  ));
  ({ slider: width2Slider, valueLabel: width2ValueLabel } = createSliderControl(
    "Width 2 Scale",
    0.1,
    3.0,
    1.0,
    0.05,
  ));

  // Spiral Width Ratio Slider (0 to 1, default 1, step 0.01)
  ({ slider: spiralWidthSlider, valueLabel: spiralWidthValueLabel } =
    createSliderControl("Spiral Width", 0, 1, 0, 0.01));

  // Center Hole Offset Sliders
  ({ slider: holeXSlider, valueLabel: holeXValueLabel } = createSliderControl(
    "Hole Offset X",
    -200,
    200,
    0,
    1,
  ));
  ({ slider: holeYSlider, valueLabel: holeYValueLabel } = createSliderControl(
    "Hole Offset Y",
    -200,
    200,
    0,
    1,
  ));

  // Hole Radius Slider
  ({ slider: holeRadiusSlider, valueLabel: holeRadiusValueLabel } =
    createSliderControl("Hole Radius", 0, 350, 20, 1));

  // --- Toggle Button ---
  shapeToggleBtn = createButton("Turn into Rectangles")
    .parent(controlPanel)
    .style("padding", "10px 14px")
    .style("cursor", "pointer")
    .style("margin-top", "14px");

  // Add the click listener to toggle the boolean state
  shapeToggleBtn.mousePressed(() => {
    isRectangle = !isRectangle;
    shapeToggleBtn.html(
      isRectangle ? "Turn into Trapeziums" : "Turn into Rectangles",
    );
  });

  // --- NEW: Add Spiral Button ---
  addSpiralBtn = createButton("Add Spiral")
    .parent(controlPanel)
    .style("padding", "10px 14px")
    .style("cursor", "pointer")
    .style("margin-top", "14px")
    .style("margin-left", "10px");

  // --- NEW: Spiral Control Panel ---
  spiralControlPanel = createDiv()
    .parent(controlPanel)
    .style("display", "none")
    .style("margin-top", "20px")
    .style("border-top", "1px solid #ccc")
    .style("padding-top", "10px");

  createElement("h3", "Spiral Controls")
    .parent(spiralControlPanel)
    .style("margin-top", "0");

  ({ slider: spiralBlendSlider, valueLabel: spiralBlendLabel } = createSliderControl("Spiral Blend", 0, 1, 1, 0.01, spiralControlPanel));
  ({ slider: spiralCurveSpreadSlider, valueLabel: spiralCurveSpreadLabel } = createSliderControl("Curve Spread", 0.1, 10.0, 2.0, 0.1, spiralControlPanel));
  ({ slider: spiralPeakSlider, valueLabel: spiralPeakLabel } = createSliderControl("Peak (Mid Ratio)", 0, 1, 0.5, 0.01, spiralControlPanel));
  ({ slider: spiralHeightSlider, valueLabel: spiralHeightLabel } = createSliderControl("Spiral Height", 0.1, 3.0, 1.0, 0.05, spiralControlPanel));
  ({ slider: spiralWidthSlider, valueLabel: spiralWidthLabel } = createSliderControl("Spiral Width 1", 0.1, 3.0, 1.0, 0.05, spiralControlPanel));

  addSpiralBtn.mousePressed(() => {
    showSpiral = !showSpiral;
    addSpiralBtn.html(showSpiral ? "Remove Spiral" : "Add Spiral");
    spiralControlPanel.style("display", showSpiral ? "block" : "none");
  });
}

// Function to recreate the rings when a slider moves
function generateRings(
  n,
  globalAmount,
  skewAngle_deg,
  offsetRatio,
  hScale,
  w1Scale,
  w2Scale,
  spiralWidthRatio,
  holeOffsetX,
  holeOffsetY,
  holeRadius,
) {
  rings = []; // Clear the array
  for (let i = 0; i < n; i++) {
    let ringTwist = 360 / n;
    let currentOffset = i * ringTwist * offsetRatio;

    let skewAngle = i % 2 === 0 ? skewAngle_deg : skewAngle_deg;

    rings.push(
      new TrapeziumRing(
        i,
        n,
        globalAmount,
        skewAngle,
        currentOffset,
        hScale,
        w1Scale,
        w2Scale,
        spiralWidthRatio,
        holeOffsetX,
        holeOffsetY,
        holeRadius,
      ),
    );
  }
}

// --- NEW: Function to generate the overlayed Spiral layer ---
function generateSpiralRings(
  n,
  globalAmount,
  skewAngle_deg,
  offsetRatio,
  holeOffsetX,
  holeOffsetY,
  holeRadius,
  sBlend,
  sSpread,
  sPeak,
  sHeight,
  sWidth
) {
  spiralRings = []; 
  for (let i = 0; i < n; i++) {
    let ringTwist = 360 / n;
    let currentOffset = i * ringTwist * offsetRatio;

    let skewAngle = i % 2 === 0 ? skewAngle_deg : skewAngle_deg;

    spiralRings.push(
      new SpiralRing(
        i,
        n,
        globalAmount,
        skewAngle,
        currentOffset,
        sHeight,
        sWidth,
        holeOffsetX,
        holeOffsetY,
        holeRadius,
        sBlend,
        sSpread,
        sPeak
      )
    );
  }
}

function draw() {
  background(235); // Pure white background

  // Read current slider values
  let currentN = nSlider.value();
  let currentAmount = amountSlider.value();
  let currentSkew = skewSlider.value();
  let currentOffset = offsetSlider.value();
  let currentHeight = heightSlider.value();
  let currentWidth1 = width1Slider.value();
  let currentWidth2 = width2Slider.value();
  let currentSpiralWidthRatio = spiralWidthSlider.value();
  let currentHoleX = holeXSlider.value();
  let currentHoleY = holeYSlider.value();
  let currentHoleRadius = holeRadiusSlider.value();

  // Spiral Sliders
  let currentSBlend = spiralBlendSlider.value();
  let currentSSpread = spiralCurveSpreadSlider.value();
  let currentSPeak = spiralPeakSlider.value();
  let currentSHeight = spiralHeightSlider.value();
  let currentSWidth = spiralWidthSlider.value();

  // If any slider changed, recalculate the rings arrays!
  if (
    currentN !== lastN ||
    currentAmount !== lastAmount ||
    currentSkew !== lastSkew ||
    currentOffset !== lastOffset ||
    currentHeight !== lastHeight ||
    currentWidth1 !== lastWidth1 ||
    currentWidth2 !== lastWidth2 ||
    currentSpiralWidthRatio !== lastSpiralWidthRatio ||
    currentHoleX !== lastHoleX ||
    currentHoleY !== lastHoleY ||
    currentHoleRadius !== lastHoleRadius ||
    currentSBlend !== lastSBlend ||
    currentSSpread !== lastSSpread ||
    currentSPeak !== lastSPeak ||
    currentSHeight !== lastSHeight ||
    currentSWidth !== lastSWidth
  ) {
    generateRings(
      currentN,
      currentAmount,
      currentSkew,
      currentOffset,
      currentHeight,
      currentWidth1,
      currentWidth2,
      currentSpiralWidthRatio,
      currentHoleX,
      currentHoleY,
      currentHoleRadius,
    );
    
    generateSpiralRings(
      currentN,
      currentAmount,
      currentSkew,
      currentOffset,
      currentHoleX,
      currentHoleY,
      currentHoleRadius,
      currentSBlend,
      currentSSpread,
      currentSPeak,
      currentSHeight,
      currentSWidth
    );

    lastN = currentN;
    lastAmount = currentAmount;
    lastSkew = currentSkew;
    lastOffset = currentOffset;
    lastHeight = currentHeight;
    lastWidth1 = currentWidth1;
    lastWidth2 = currentWidth2;
    lastSpiralWidthRatio = currentSpiralWidthRatio;
    lastHoleX = currentHoleX;
    lastHoleY = currentHoleY;
    lastHoleRadius = currentHoleRadius;
    lastSBlend = currentSBlend;
    lastSSpread = currentSSpread;
    lastSPeak = currentSPeak;
    lastSHeight = currentSHeight;
    lastSWidth = currentSWidth;
  }

  // Progress the unified global spinning animation
  masterRotation += 0.5;

  push();
  translate(width / 2, height / 2); // Move origin to the center of the canvas

  // 1. Draw base rings first
  for (let ring of rings) {
    ring.display(masterRotation);
  }

  // 2. Draw spiral rings on top if toggled
  if (showSpiral) {
    for (let sRing of spiralRings) {
      sRing.display(masterRotation);
    }
  }

  pop();
}

// --- The Base Ring Class ---
class TrapeziumRing {
  constructor(
    i,
    n,
    amount,
    skewAngle,
    rotationOffset,
    hScale,
    w1Scale,
    w2Scale,
    spiralWidthRatio,
    holeOffsetX,
    holeOffsetY,
    holeRadius,
  ) {
    this.i = i;
    this.n = n;
    this.amount = amount;
    this.skewAngle = skewAngle;
    this.rotationOffset = rotationOffset;
    this.hScale = hScale;
    this.w1Scale = w1Scale;
    this.w2Scale = w2Scale;
    this.spiralWidthRatio = spiralWidthRatio;
    this.holeOffsetX = holeOffsetX;
    this.holeOffsetY = holeOffsetY;
    this.holeRadius = holeRadius;
  }

  display(currentMasterRotation) {
    if (this.amount <= 0) return;

    let step = 360 / this.amount;
    let solidAngle = TWO_PI / this.amount / 2;

    fill(0); // Pure black color
    noStroke();

    for (let j = 0; j < this.amount; j++) {
      push();

      let ringRotation = currentMasterRotation;
      let globalTheta = radians(ringRotation + this.rotationOffset + j * step);

      let inX = this.holeOffsetX + this.holeRadius * cos(globalTheta);
      let inY = this.holeOffsetY + this.holeRadius * sin(globalTheta);

      let outX = full_circle_diam * cos(globalTheta);
      let outY = full_circle_diam * sin(globalTheta);

      let startX = lerp(inX, outX, this.i / this.n);
      let startY = lerp(inY, outY, this.i / this.n);

      let endX = lerp(inX, outX, (this.i + 1) / this.n);
      let endY = lerp(inY, outY, (this.i + 1) / this.n);

      let d1 = dist(0, 0, startX, startY);
      let d2 = dist(0, 0, endX, endY);

      let currentScale = (j + 1) / this.amount;
      let spiral_width = map(this.spiralWidthRatio, 0, 1, 1, currentScale);

      let w1 = 2 * d1 * Math.tan(solidAngle / 2) * this.w1Scale * spiral_width;
      let w2 = 2 * d2 * Math.tan(solidAngle / 2) * this.w2Scale * spiral_width;

      let dx = endX - startX;
      let dy = endY - startY;

      let outwardX = dx * cos(-globalTheta) - dy * sin(-globalTheta);
      let outwardY = dx * sin(-globalTheta) + dy * cos(-globalTheta);

      let localEndX = -outwardY;
      let localEndY = outwardX;

      localEndX *= this.hScale;
      localEndY *= this.hScale;

      let skewRad = radians(this.skewAngle);
      if (this.skewAngle === 0) skewRad = radians(0.1);
      if (this.skewAngle === 180) skewRad = radians(179.9);
      localEndX += localEndY / tan(skewRad);

      translate(startX, startY);
      rotate(globalTheta);
      rotate(radians(-90));

      if (isRectangle) {
        let tiltAngle = atan2(localEndY, localEndX) - HALF_PI;
        let rectHeight = dist(0, 0, localEndX, localEndY);

        rotate(tiltAngle);

        let topLeftX = -w1 / 2;
        let topY = 0;
        let topRightX = w1 / 2;

        let bottomLeftX = -w1 / 2;
        let bottomY = rectHeight;
        let bottomRightX = w1 / 2;

        quad(
          topLeftX,
          topY,
          topRightX,
          topY,
          bottomRightX,
          bottomY,
          bottomLeftX,
          bottomY,
        );
      } else {
        let topLeftX = -w1 / 2;
        let topY = 0;
        let topRightX = w1 / 2;

        let bottomLeftX = localEndX - w2 / 2;
        let bottomY = localEndY;
        let bottomRightX = localEndX + w2 / 2;

        quad(
          topLeftX,
          topY,
          topRightX,
          topY,
          bottomRightX,
          bottomY,
          bottomLeftX,
          bottomY,
        );
      }

      pop(); 
    }
  }
}

// --- NEW: The Spiral Ring Class ---
class SpiralRing {
  constructor(
    i,
    n,
    amount,
    skewAngle,
    rotationOffset,
    hScale,
    wScale,
    holeOffsetX,
    holeOffsetY,
    holeRadius,
    blendRatio,
    curveSpread,
    midIndexRatio
  ) {
    this.i = i;
    this.n = n;
    this.amount = amount;
    this.skewAngle = skewAngle;
    this.rotationOffset = rotationOffset;
    this.hScale = hScale;
    this.wScale = wScale;
    this.holeOffsetX = holeOffsetX;
    this.holeOffsetY = holeOffsetY;
    this.holeRadius = holeRadius;
    this.blendRatio = blendRatio;
    this.curveSpread = curveSpread;
    this.midIndexRatio = midIndexRatio;
  }

  display(currentMasterRotation) {
    if (this.amount <= 0) return;

    let step = 360 / this.amount;
    let solidAngle = TWO_PI / this.amount / 2;

    fill(0); // Using standard black as requested overlay
    noStroke();

    let dynamicMidIndex = (this.amount - 1) * this.midIndexRatio;

    for (let j = 0; j < this.amount; j++) {
      push();

      let ringRotation = currentMasterRotation;
      let globalTheta = radians(ringRotation + this.rotationOffset + j * step);

      // 1. Hole Logic to align seamlessly with the base code
      let inX = this.holeOffsetX + this.holeRadius * cos(globalTheta);
      let inY = this.holeOffsetY + this.holeRadius * sin(globalTheta);

      let outX = full_circle_diam * cos(globalTheta);
      let outY = full_circle_diam * sin(globalTheta);

      let startX = lerp(inX, outX, this.i / this.n);
      let startY = lerp(inY, outY, this.i / this.n);

      let endX = lerp(inX, outX, (this.i + 1) / this.n);
      let endY = lerp(inY, outY, (this.i + 1) / this.n);

      // Calculates basic width exactly like the base code
      let d1 = dist(0, 0, startX, startY);
      let w1 = 2 * d1 * Math.tan(solidAngle / 2) * this.wScale;

      // Calculate tangent target logic
      let dx = endX - startX;
      let dy = endY - startY;

      let outwardX = dx * cos(-globalTheta) - dy * sin(-globalTheta);
      let outwardY = dx * sin(-globalTheta) + dy * cos(-globalTheta);

      let localEndX = -outwardY;
      let localEndY = outwardX;

      // Because this is a strict rectangle, we pivot directly to the target end point. 
      // This dist() acts as the exact base height gap to the next ring lane!
      let tiltAngle = atan2(localEndY, localEndX) - HALF_PI;
      let baseHeight = dist(0, 0, localEndX, localEndY);

      // 2. Bell Curve Logic
      let x = 0;
      if (j === dynamicMidIndex) {
        x = 0;
      } else if (j < dynamicMidIndex) {
        if (dynamicMidIndex === 0) x = 0; // protection division 0
        else x = map(j, 0, dynamicMidIndex, -2.5, 0);
      } else {
        if (this.amount - 1 === dynamicMidIndex) x = 0; // protection division 0
        else x = map(j, dynamicMidIndex, this.amount - 1, 0, 2.5);
      }

      let curveMultiplier = exp(-(x * x) / this.curveSpread);
      let spiralHeightTarget = (baseHeight / 2) * curveMultiplier;

      // Morph between the rigid flat height and the curved spiral height
      let currentHeight = lerp(baseHeight, spiralHeightTarget, this.blendRatio) * this.hScale;

      // 3. Dynamic Spiral Bridging Math
      let targetAddedDistance = 0;
      if (j <= dynamicMidIndex) {
        if (dynamicMidIndex === 0) targetAddedDistance = baseHeight / 2;
        else targetAddedDistance = map(j, 0, dynamicMidIndex, 0, baseHeight / 2);
      } else {
        targetAddedDistance = baseHeight - spiralHeightTarget;
      }

      // Morph the shifting distance based on the Blend slider
      let addedDistance = lerp(0, targetAddedDistance, this.blendRatio);

      // 4. Matrix Transforms
      translate(startX, startY);
      rotate(globalTheta);
      rotate(radians(-90));
      rotate(tiltAngle);

      // 5. Drawing the rigid rectangle with shifted distance along the tilted angle
      let topLeftX = -w1 / 2;
      let topY = addedDistance;
      
      let topRightX = w1 / 2;
      
      let bottomLeftX = -w1 / 2;
      let bottomY = addedDistance + currentHeight;
      
      let bottomRightX = w1 / 2;

      quad(
        topLeftX, topY,
        topRightX, topY,
        bottomRightX, bottomY,
        bottomLeftX, bottomY
      );

      pop(); 
    }
  }
}