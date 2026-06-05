// --- Main p5.js Sketch ---

const PRESETS_DATA = {
  1: {
    "showSpiral": true,
    "isRectangle": true,
    "useImageMask": true,
    "showBgImage": true,
    "base": {
      "skew": 90,
      "n": 2,
      "amount": 36,
      "offset": 0.53,
      "hScale": 1,
      "w1": 1,
      "w2": 1,
      "sWidth": 0,
      "hx": 0,
      "hy": 0,
      "hr": 123,
      "fullCircleDiam": 400,
      "filterX": 0,
      "filterY": 0
    },
    "spiral": {
      "blend": 1,
      "spread": 2,
      "peak": 0.5,
      "height": 1,
      "width": 1
    },
    "image": {
      "fgZoom": 1,
      "fgOffsetX": 0,
      "fgOffsetY": 0,
      "bgZoom": 1,
      "bgOffsetX": 72,
      "bgOffsetY": 0
    }
  },
  2: {
    "showSpiral": false,
    "isRectangle": false,
    "useImageMask": true,
    "showBgImage": true,
    "base": {
      "skew": 97,
      "n": 1,
      "amount": 40,
      "offset": 0,
      "hScale": 1,
      "w1": 0.4,
      "w2": 0.4,
      "sWidth": 0,
      "hx": 24,
      "hy": 71,
      "hr": 255,
      "fullCircleDiam": 400,
      "filterX": 0,
      "filterY": 0
    },
    "spiral": {
      "blend": 1,
      "spread": 2,
      "peak": 0.5,
      "height": 1,
      "width": 1
    },
    "image": {
      "fgZoom": 1,
      "fgOffsetX": 0,
      "fgOffsetY": 0,
      "bgZoom": 1,
      "bgOffsetX": 0,
      "bgOffsetY": 0
    }
  },
  3: {
    "showSpiral": false,
    "isRectangle": false,
    "useImageMask": true,
    "showBgImage": true,
    "base": {
      "skew": 90,
      "n": 8,
      "amount": 24,
      "offset": 0.49,
      "hScale": 1,
      "w1": 1,
      "w2": 1,
      "sWidth": 0,
      "hx": 0,
      "hy": 0,
      "hr": 76,
      "fullCircleDiam": 400,
      "filterX": 0,
      "filterY": 0
    },
    "spiral": {
      "blend": 1,
      "spread": 2,
      "peak": 0.5,
      "height": 1,
      "width": 1
    },
    "image": {
      "fgZoom": 1,
      "fgOffsetX": 0,
      "fgOffsetY": 0,
      "bgZoom": 1,
      "bgOffsetX": 0,
      "bgOffsetY": 0
    }
  },
  4: {
    "showSpiral": false,
    "isRectangle": false,
    "useImageMask": true,
    "showBgImage": true,
    "base": {
      "skew": 102,
      "n": 3,
      "amount": 24,
      "offset": 0.26,
      "hScale": 1,
      "w1": 1,
      "w2": 1,
      "sWidth": 0,
      "hx": 0,
      "hy": 0,
      "hr": 0,
      "fullCircleDiam": 400,
      "filterX": 0,
      "filterY": 0
    },
    "spiral": {
      "blend": 1,
      "spread": 2,
      "peak": 0.5,
      "height": 1,
      "width": 1
    },
    "image": {
      "fgZoom": 1,
      "fgOffsetX": 0,
      "fgOffsetY": 0,
      "bgZoom": 1,
      "bgOffsetX": 0,
      "bgOffsetY": 0
    }
  },
  5: {
    "showSpiral": true,
    "isRectangle": false,
    "useImageMask": true,
    "showBgImage": true,
    "base": {
      "skew": 90,
      "n": 1,
      "amount": 24,
      "offset": 0.36,
      "hScale": 0.9,
      "w1": 1.25,
      "w2": 0.15,
      "sWidth": 0,
      "hx": 0,
      "hy": 0,
      "hr": 70,
      "fullCircleDiam": 400,
      "filterX": 0,
      "filterY": 0
    },
    "spiral": {
      "blend": 1,
      "spread": 10,
      "peak": 0.38,
      "height": 0.85,
      "width": 2.55
    },
    "image": {
      "fgZoom": 1,
      "fgOffsetX": 0,
      "fgOffsetY": 0,
      "bgZoom": 1,
      "bgOffsetX": 0,
      "bgOffsetY": 0
    }
  }
};

let rings = [];
let spiralRings = [];
let full_circle_diam = 400;

// --- Animation Globals ---
let animTime = 0;
const animSpeed = 0.07;
const animDepth = 0.5;
const spatialFreq = 1.2;
let isAnimated = true;
let widthAnimationEnabled = true;
let animation2Enabled = false;

// --- UI & State Variables ---
let skewSlider, nSlider, amountSlider, offsetSlider;
let heightSlider, width1Slider, width2Slider, spiralWidthSlider;
let holeXSlider, holeYSlider, holeRadiusSlider;
let shapeToggleBtn, addSpiralBtn, savePresetBtn, maskToggleBtn, bgImageToggleBtn;
let fullCircleDiamSlider, filterLocationXSlider, filterLocationYSlider;
let sizeGradientSlider; // Declared sizeGradientSlider globally
let isRectangle = false;
let showSpiral = false;
let useImageMask = false;
let showBgImage = true;
let rotateImageWithShape = true;
// --- Image Controls Panel UI Variables ---
let imageControlsPanel;
let fgZoomSlider, fgOffsetXSlider, fgOffsetYSlider;
let bgZoomSlider, bgOffsetXSlider, bgOffsetYSlider;
let appContainer, canvasContainer, controlPanel;
let img1;
let img1DataUrl = null;
let img2DataUrl = null;
let defaultImg1, defaultImg2;
let maskGraphics;
let imgRenderBuffer;

// --- NEW: Spiral UI Variables ---
let spiralControlPanel;
let spiralBlendSlider,
  spiralCurveSpreadSlider,
  spiralPeakSlider,
  spiralHeightSlider,
  sWidthSlider;

function preload() {
  defaultImg1 = loadImage(IMAGE_1_BASE64);
  defaultImg2 = loadImage(IMAGE_2_BASE64);
  img1 = defaultImg1;
  img2 = defaultImg2;
}

let lastN = -1,
  lastAmount = -1,
  lastSkew = -1,
  lastOffset = -1,
  lastHeight = -1,
  lastWidth1 = -1,
  lastWidth2 = -1,
  lastSpiralWidthRatio = -1,
  lastHoleX = -999,
  lastHoleY = -999,
  lastHoleRadius = -999,
  lastSBlend = -1,
  lastSSpread = -1,
  lastSPeak = -1,
  lastSHeight = -1,
  lastSWidth = -1,
  lastSizeGradient = -1;

let masterRotation = 0;

// --- Global UI Hook Definitions ---
let setRectangleMode;
let setSpiralVisibility;
let setImageMaskEnabled;
let setBgImageVisible;
let setRotateImageWithShape;
let setIsAnimated;
let setAnimation2Enabled;
let loadPreset;
let isSidebarHidden = false;
let currentRatio = '1:1';

function updateCanvasSize() {
  let w = 800;
  let h = 800;
  if (currentRatio === '9:16') {
    w = 450;
    h = 800;
  } else if (currentRatio === '16:9') {
    w = 800;
    h = 450;
  }

  if (isSidebarHidden) {
    w = Math.round(w * 1.3);
    h = Math.round(h * 1.3);
  }

  resizeCanvas(w, h);
}

window.toggleSidebar = function () {
  isSidebarHidden = !isSidebarHidden;
  const sidebar = document.getElementById('controlPanel');
  const toggleBtn = document.getElementById('toggle-ui-btn');

  if (sidebar && toggleBtn) {
    if (isSidebarHidden) {
      sidebar.classList.add('hidden');
      toggleBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3 3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm9.11-3.6C21.39 12.83 20 16 12 16s-9.39-3.17-9.11-4.4C3.17 10.39 4.5 7.2 12.5 7.2s8.83 3.19 8.61 4.2zM12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/>
        </svg>
      `;
    } else {
      sidebar.classList.remove('hidden');
      toggleBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
      `;
    }
    updateCanvasSize();
  }
};

window.toggleAnimationState = function () {
  isAnimated = !isAnimated;
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  if (playIcon && pauseIcon) {
    if (isAnimated) {
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
    } else {
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
    }
  }
};

window.toggleWidthAnimation = function () {
  widthAnimationEnabled = !widthAnimationEnabled;
  const btn = document.getElementById('toggle-width-anim-btn');
  if (btn) {
    btn.innerHTML = widthAnimationEnabled ? "Animation 1: ON" : "Animation 1: OFF";
    if (widthAnimationEnabled) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  }
};

window.toggleAnimation2 = function () {
  animation2Enabled = !animation2Enabled;
  const btn = document.getElementById('toggle-anim2-btn');
  if (btn) {
    btn.innerHTML = animation2Enabled ? "Animation 2: ON" : "Animation 2: OFF";
    if (animation2Enabled) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  }
};

window.loadPresetFile = function (num) {
  loadPreset(num);
};

window.uploadImageFile = function (input, isBackground) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const labelId = isBackground ? 'bg-image-name' : 'mask-image-name';
    const labelEl = document.getElementById(labelId);
    if (labelEl) {
      labelEl.textContent = file.name;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const dataUrl = e.target.result;
      if (isBackground) {
        img2DataUrl = dataUrl;
      } else {
        img1DataUrl = dataUrl;
      }
      loadImage(dataUrl, (loaded) => {
        if (isBackground) {
          img2 = loaded;
          setBgImageVisible(true);
        } else {
          img1 = loaded;
          setImageMaskEnabled(true);
        }
      });
    };
    reader.readAsDataURL(file);
  }
};

window.uploadPresetFile = function (input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = JSON.parse(e.target.result);
        applyPresetData(data);
      } catch (err) {
        console.error("Error parsing preset JSON:", err);
        alert("Invalid preset file!");
      }
    };
    reader.readAsText(file);
  }
};

window.changeCanvasDimensions = function (ratio) {
  document.querySelectorAll('.dim-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById('dim-' + ratio.replace(':', '-'));
  if (activeBtn) activeBtn.classList.add('active');

  currentRatio = ratio;
  updateCanvasSize();
};

// --- Video Recording Code & Image Saving ---
let mediaRecorder;
let recordedChunks = [];
let isRecording = false;
let recordingStartTime = 0;
let recordingInterval;

function toggleRecording() {
  if (!isRecording) {
    startRecording();
  } else {
    stopRecording();
  }
}

function startRecording() {
  recordedChunks = [];
  const canvasElement = document.querySelector('canvas');
  if (!canvasElement) {
    console.error("Canvas element not found!");
    return;
  }

  const stream = canvasElement.captureStream(30); // Capture 30 FPS

  const candidateTypes = [
    'video/mp4; codecs=avc1',
    'video/mp4',
    'video/webm; codecs=vp9',
    'video/webm; codecs=vp8',
    'video/webm'
  ];

  let selectedMimeType = '';
  let options = {};
  for (const type of candidateTypes) {
    if (MediaRecorder.isTypeSupported(type)) {
      selectedMimeType = type;
      options = { mimeType: type, videoBitsPerSecond: 8000000 }; // 8 Mbps high quality
      break;
    }
  }

  if (!selectedMimeType) {
    options = { videoBitsPerSecond: 8000000 };
  }

  try {
    mediaRecorder = new MediaRecorder(stream, options);
  } catch (e) {
    console.error("Exception while creating MediaRecorder:", e);
    alert("MediaRecorder is not supported in this browser.");
    return;
  }

  mediaRecorder.ondataavailable = (event) => {
    if (event.data && event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const mimeType = mediaRecorder.mimeType || selectedMimeType || 'video/webm';
    let extension = 'webm';
    if (mimeType.includes('mp4')) {
      extension = 'mp4';
    } else if (mimeType.includes('ogg')) {
      extension = 'ogv';
    } else if (mimeType.includes('quicktime')) {
      extension = 'mov';
    }

    const blob = new Blob(recordedChunks, { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `symmetric_spiral_pattern.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const statusEl = document.getElementById('recording-status');
    if (statusEl) statusEl.textContent = "Ready to record";

    const btn = document.getElementById('record-video-btn');
    if (btn) {
      btn.classList.remove('danger-active');
      btn.innerHTML = `<span class="recording-dot"></span>Record Video`;
    }
  };

  mediaRecorder.start();
  isRecording = true;
  recordingStartTime = Date.now();

  const btn = document.getElementById('record-video-btn');
  if (btn) {
    btn.classList.add('danger-active');
    btn.innerHTML = `<span class="recording-dot recording"></span>Stop Recording`;
  }

  recordingInterval = setInterval(() => {
    const elapsed = Math.round((Date.now() - recordingStartTime) / 1000);
    const m = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const s = (elapsed % 60).toString().padStart(2, '0');
    const statusEl = document.getElementById('recording-status');
    if (statusEl) statusEl.textContent = `Recording (${m}:${s})...`;
  }, 1000);

  const statusEl = document.getElementById('recording-status');
  if (statusEl) statusEl.textContent = "Recording (00:00)...";
}

function stopRecording() {
  if (mediaRecorder && isRecording) {
    mediaRecorder.stop();
    isRecording = false;
    clearInterval(recordingInterval);
  }
}

window.savePatternImage = function () {
  saveCanvas('symmetric_spiral_pattern', 'png');
};

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent('canvasContainer');

  maskGraphics = createGraphics(800, 800);
  imgRenderBuffer = createGraphics(800, 800);

  // Helper to wrap custom HTML inputs into p5-slider compatible interface
  function wrapSlider(elementId) {
    const el = document.getElementById(elementId);
    const valBadge = document.getElementById(elementId + '-val');
    let currentValue = el ? parseFloat(el.value) : 0;

    if (el) {
      el.addEventListener('input', () => {
        currentValue = parseFloat(el.value);
        if (valBadge) valBadge.value = el.value;
      });
      if (valBadge) valBadge.value = el.value;
    }

    if (valBadge) {
      valBadge.addEventListener('input', () => {
        let typedVal = parseFloat(valBadge.value);
        if (!isNaN(typedVal)) {
          currentValue = typedVal;
          if (el) {
            el.value = typedVal;
          }
        }
      });
    }

    return {
      value: () => currentValue,
      updateValue: (val) => {
        currentValue = val;
        if (el) {
          el.value = val;
        }
        if (valBadge) {
          valBadge.value = val;
        }
      }
    };
  }

  // Bind sliders
  skewSlider = wrapSlider('trapezium-skew');
  nSlider = wrapSlider('ring-n');
  amountSlider = wrapSlider('trapezium-amount');
  offsetSlider = wrapSlider('ring-offset');
  heightSlider = wrapSlider('trapezium-height');
  width1Slider = wrapSlider('trapezium-width1');
  width2Slider = wrapSlider('trapezium-width2');
  spiralWidthSlider = wrapSlider('ring-spiral-width');
  sizeGradientSlider = wrapSlider('ring-size-gradient');
  holeXSlider = wrapSlider('hole-x');
  holeYSlider = wrapSlider('hole-y');
  holeRadiusSlider = wrapSlider('hole-radius');
  fullCircleDiamSlider = wrapSlider('full-circle-diam');
  filterLocationXSlider = wrapSlider('filter-x');
  filterLocationYSlider = wrapSlider('filter-y');

  spiralBlendSlider = wrapSlider('spiral-blend');
  spiralCurveSpreadSlider = wrapSlider('spiral-spread');
  spiralPeakSlider = wrapSlider('spiral-peak');
  spiralHeightSlider = wrapSlider('spiral-height');
  sWidthSlider = wrapSlider('spiral-width');

  fgZoomSlider = wrapSlider('fg-zoom');
  fgOffsetXSlider = wrapSlider('fg-offset-x');
  fgOffsetYSlider = wrapSlider('fg-offset-y');
  bgZoomSlider = wrapSlider('bg-zoom');
  bgOffsetXSlider = wrapSlider('bg-offset-x');
  bgOffsetYSlider = wrapSlider('bg-offset-y');

  // Define global helper methods in setup scope
  setRectangleMode = function (rectMode) {
    isRectangle = rectMode;
    const btn = document.getElementById('shape-toggle-btn');
    if (btn) {
      btn.innerHTML = isRectangle ? "Turn into Trapeziums" : "Turn into Rectangles";
      if (isRectangle) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  };

  setSpiralVisibility = function (visible) {
    showSpiral = visible;
    const btn = document.getElementById('add-spiral-btn');
    if (btn) {
      btn.innerHTML = showSpiral ? "Remove Spiral" : "Add Spiral";
      if (showSpiral) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  };

  setImageMaskEnabled = function (enabled) {
    useImageMask = enabled;
    const btn = document.getElementById('mask-image-enable');
    if (btn) {
      btn.innerHTML = useImageMask ? "Disable Image Mask" : "Use Image Mask";
      if (useImageMask) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  };

  setBgImageVisible = function (visible) {
    showBgImage = visible;
    const btn = document.getElementById('bg-image-enable');
    if (btn) {
      btn.innerHTML = showBgImage ? "Disable Background Image" : "Enable Background Image";
      if (showBgImage) {
        btn.classList.remove('danger-active');
        btn.classList.add('active');
      } else {
        btn.classList.add('danger-active');
        btn.classList.remove('active');
      }
    }
  };

  setRotateImageWithShape = function (rotate) {
    rotateImageWithShape = rotate;
    const btn = document.getElementById('mask-image-rotate');
    if (btn) {
      btn.innerHTML = rotateImageWithShape ? "Rotate Image: ON" : "Rotate Image: OFF";
      if (rotateImageWithShape) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  };

  setIsAnimated = function (animated) {
    isAnimated = animated;
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    if (playIcon && pauseIcon) {
      if (isAnimated) {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
      } else {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
      }
    }
  };

  setAnimation2Enabled = function (enabled) {
    animation2Enabled = enabled;
    const btn = document.getElementById('toggle-anim2-btn');
    if (btn) {
      btn.innerHTML = animation2Enabled ? "Animation 2: ON" : "Animation 2: OFF";
      if (animation2Enabled) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  };

  // Bind element event listeners
  const shapeToggleEl = document.getElementById('shape-toggle-btn');
  if (shapeToggleEl) {
    shapeToggleEl.addEventListener('click', () => {
      setRectangleMode(!isRectangle);
    });
  }

  const addSpiralEl = document.getElementById('add-spiral-btn');
  if (addSpiralEl) {
    addSpiralEl.addEventListener('click', () => {
      setSpiralVisibility(!showSpiral);
    });
  }

  const maskImageEnableEl = document.getElementById('mask-image-enable');
  if (maskImageEnableEl) {
    maskImageEnableEl.addEventListener('click', () => {
      setImageMaskEnabled(!useImageMask);
    });
  }

  const maskImageRotateEl = document.getElementById('mask-image-rotate');
  if (maskImageRotateEl) {
    maskImageRotateEl.addEventListener('click', () => {
      setRotateImageWithShape(!rotateImageWithShape);
    });
  }

  const bgImageEnableEl = document.getElementById('bg-image-enable');
  if (bgImageEnableEl) {
    bgImageEnableEl.addEventListener('click', () => {
      setBgImageVisible(!showBgImage);
    });
  }

  const savePresetBtnEl = document.getElementById('save-preset-btn');
  if (savePresetBtnEl) {
    savePresetBtnEl.addEventListener('click', () => {
      const preset = {
        showSpiral: showSpiral,
        isRectangle: isRectangle,
        useImageMask: useImageMask,
        showBgImage: showBgImage,
        rotateImageWithShape: rotateImageWithShape,
        isAnimated: isAnimated,
        animation2Enabled: animation2Enabled,
        aspectRatio: currentRatio,
        base: {
          skew: skewSlider.value(),
          n: nSlider.value(),
          amount: amountSlider.value(),
          offset: offsetSlider.value(),
          hScale: heightSlider.value(),
          w1: width1Slider.value(),
          w2: width2Slider.value(),
          sWidth: spiralWidthSlider.value(),
          sizeGradient: sizeGradientSlider.value(),
          hx: holeXSlider.value(),
          hy: holeYSlider.value(),
          hr: holeRadiusSlider.value(),
          fullCircleDiam: fullCircleDiamSlider.value(),
          filterX: filterLocationXSlider.value(),
          filterY: filterLocationYSlider.value(),
        },
        spiral: {
          blend: spiralBlendSlider.value(),
          spread: spiralCurveSpreadSlider.value(),
          peak: spiralPeakSlider.value(),
          height: spiralHeightSlider.value(),
          width: sWidthSlider.value(),
        },
        image: {
          fgZoom: fgZoomSlider.value(),
          fgOffsetX: fgOffsetXSlider.value(),
          fgOffsetY: fgOffsetYSlider.value(),
          bgZoom: bgZoomSlider.value(),
          bgOffsetX: bgOffsetXSlider.value(),
          bgOffsetY: bgOffsetYSlider.value(),
          fgDataUrl: img1DataUrl,
          bgDataUrl: img2DataUrl,
        },
      };
      saveJSON(preset, "preset.json");
    });
  }

  const saveImageBtn = document.getElementById('save-image-btn');
  if (saveImageBtn) {
    saveImageBtn.addEventListener('click', () => {
      window.savePatternImage();
    });
  }

  const recordVideoBtn = document.getElementById('record-video-btn');
  if (recordVideoBtn) {
    recordVideoBtn.addEventListener('click', () => {
      toggleRecording();
    });
  }

  // --- Load Preset Function ---
  loadPreset = function (presetNum) {
    const data = PRESETS_DATA[presetNum];
    if (data) {
      applyPresetData(data, true);
    } else {
      console.error("Preset not found:", presetNum);
    }
  };

  // --- Apply Preset Data Helper ---
  window.applyPresetData = function (data, keepCurrentImages = false) {
    if (data.base) {
      if (data.base.skew !== undefined) skewSlider.updateValue(data.base.skew);
      if (data.base.n !== undefined) nSlider.updateValue(data.base.n);
      if (data.base.amount !== undefined) amountSlider.updateValue(data.base.amount);
      if (data.base.offset !== undefined) offsetSlider.updateValue(data.base.offset);
      if (data.base.hScale !== undefined) heightSlider.updateValue(data.base.hScale);
      if (data.base.w1 !== undefined) width1Slider.updateValue(data.base.w1);
      if (data.base.w2 !== undefined) width2Slider.updateValue(data.base.w2);
      if (data.base.sWidth !== undefined) spiralWidthSlider.updateValue(data.base.sWidth);
      if (data.base.sizeGradient !== undefined) sizeGradientSlider.updateValue(data.base.sizeGradient);
      if (data.base.hx !== undefined) holeXSlider.updateValue(data.base.hx);
      if (data.base.hy !== undefined) holeYSlider.updateValue(data.base.hy);
      if (data.base.hr !== undefined) holeRadiusSlider.updateValue(data.base.hr);
      if (data.base.fullCircleDiam !== undefined) fullCircleDiamSlider.updateValue(data.base.fullCircleDiam);
      if (data.base.filterX !== undefined) filterLocationXSlider.updateValue(data.base.filterX);
      if (data.base.filterY !== undefined) filterLocationYSlider.updateValue(data.base.filterY);
    }
    if (data.spiral) {
      if (data.spiral.blend !== undefined) spiralBlendSlider.updateValue(data.spiral.blend);
      if (data.spiral.spread !== undefined) spiralCurveSpreadSlider.updateValue(data.spiral.spread);
      if (data.spiral.peak !== undefined) spiralPeakSlider.updateValue(data.spiral.peak);
      if (data.spiral.height !== undefined) spiralHeightSlider.updateValue(data.spiral.height);
      if (data.spiral.width !== undefined) sWidthSlider.updateValue(data.spiral.width);
    }
    if (data.image) {
      if (data.image.fgZoom !== undefined) fgZoomSlider.updateValue(data.image.fgZoom);
      if (data.image.fgOffsetX !== undefined) fgOffsetXSlider.updateValue(data.image.fgOffsetX);
      if (data.image.fgOffsetY !== undefined) fgOffsetYSlider.updateValue(data.image.fgOffsetY);
      if (data.image.bgZoom !== undefined) bgZoomSlider.updateValue(data.image.bgZoom);
      if (data.image.bgOffsetX !== undefined) bgOffsetXSlider.updateValue(data.image.bgOffsetX);
      if (data.image.bgOffsetY !== undefined) bgOffsetYSlider.updateValue(data.image.bgOffsetY);

      if (!keepCurrentImages) {
        // Restore base64 custom uploaded images if present
        if (data.image.fgDataUrl) {
          img1DataUrl = data.image.fgDataUrl;
          loadImage(img1DataUrl, (loaded) => {
            img1 = loaded;
            setImageMaskEnabled(true);
          });
          const labelEl = document.getElementById('mask-image-name');
          if (labelEl) labelEl.textContent = "Uploaded Masked Image";
        } else {
          img1DataUrl = null;
          img1 = defaultImg1;
          const labelEl = document.getElementById('mask-image-name');
          if (labelEl) labelEl.textContent = "image_1.jpg";
        }
        if (data.image.bgDataUrl) {
          img2DataUrl = data.image.bgDataUrl;
          loadImage(img2DataUrl, (loaded) => {
            img2 = loaded;
            setBgImageVisible(true);
          });
          const labelEl = document.getElementById('bg-image-name');
          if (labelEl) labelEl.textContent = "Uploaded Background";
        } else {
          img2DataUrl = null;
          img2 = defaultImg2;
          const labelEl = document.getElementById('bg-image-name');
          if (labelEl) labelEl.textContent = "image_2.jpg";
        }
      }
    }

    if (data.isRectangle !== undefined) {
      setRectangleMode(data.isRectangle);
    } else {
      setRectangleMode(false);
    }

    if (data.useImageMask !== undefined) {
      setImageMaskEnabled(data.useImageMask);
    } else {
      setImageMaskEnabled(false);
    }

    if (data.showBgImage !== undefined) {
      setBgImageVisible(data.showBgImage);
    } else {
      setBgImageVisible(true);
    }

    if (data.rotateImageWithShape !== undefined) {
      setRotateImageWithShape(data.rotateImageWithShape);
    } else {
      setRotateImageWithShape(true);
    }

    if (data.showSpiral !== undefined) {
      setSpiralVisibility(data.showSpiral);
    } else {
      setSpiralVisibility(false);
    }

    if (data.isAnimated !== undefined) {
      setIsAnimated(data.isAnimated);
    }

    if (data.animation2Enabled !== undefined) {
      setAnimation2Enabled(data.animation2Enabled);
    } else {
      setAnimation2Enabled(false);
    }

    if (data.aspectRatio !== undefined) {
      changeCanvasDimensions(data.aspectRatio);
    }
  };
}

function getNormalizedRadii(n, sizeGradient) {
  let rawScales = [];
  let sumScales = 0;
  for (let i = 0; i < n; i++) {
    let t = n > 1 ? i / (n - 1) : 0.5;
    let easeT;
    if (sizeGradient > 0) {
      let concaveT = Math.pow(t, 4);
      easeT = lerp(t, concaveT, sizeGradient);
    } else {
      let convexT = 1.0 - Math.pow(1.0 - t, 4);
      easeT = lerp(t, convexT, Math.abs(sizeGradient));
    }
    let ringScale = Math.pow(6.0, sizeGradient * (easeT - 0.5) * 2.0);
    rawScales.push(ringScale);
    sumScales += ringScale;
  }
  let normalizedRadii = [0];
  let current = 0;
  for (let i = 0; i < n; i++) {
    current += rawScales[i] / sumScales;
    normalizedRadii.push(current);
  }
  return normalizedRadii;
}

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
  sizeGradient = 0,
) {
  rings = [];
  let rads = getNormalizedRadii(n, sizeGradient);
  for (let i = 0; i < n; i++) {
    let ringTwist = 360 / n;
    let currentOffset = i * ringTwist * offsetRatio;
    rings.push(
      new TrapeziumRing(
        i,
        n,
        globalAmount,
        skewAngle_deg,
        currentOffset,
        hScale,
        w1Scale,
        w2Scale,
        spiralWidthRatio,
        holeOffsetX,
        holeOffsetY,
        holeRadius,
        rads[i],
        rads[i + 1]
      ),
    );
  }
}

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
  sWidth,
  sizeGradient = 0,
) {
  spiralRings = [];
  let rads = getNormalizedRadii(n, sizeGradient);
  for (let i = 0; i < n; i++) {
    let ringTwist = 360 / n;
    let currentOffset = i * ringTwist * offsetRatio;
    spiralRings.push(
      new SpiralRing(
        i,
        n,
        globalAmount,
        skewAngle_deg,
        currentOffset,
        sHeight,
        sWidth,
        holeOffsetX,
        holeOffsetY,
        holeRadius,
        sBlend,
        sSpread,
        sPeak,
        rads[i],
        rads[i + 1]
      ),
    );
  }
}

function draw() {
  background(235);


  if (showBgImage && img2) {
    push();
    translate(width / 2, height / 2);
    translate(bgOffsetXSlider.value(), bgOffsetYSlider.value());
    scale(bgZoomSlider.value());

    // Draw background image covering the screen (800x800) preserving aspect ratio
    let imgRatio = img2.width / img2.height;
    let dw, dh;
    if (imgRatio > 1.0) {
      dh = height;
      dw = height * imgRatio;
    } else {
      dw = width;
      dh = width / imgRatio;
    }
    image(img2, -dw / 2, -dh / 2, dw, dh);
    pop();
  }

  let currentDiam = fullCircleDiamSlider.value();
  full_circle_diam = currentDiam;

  // Recreate offscreen buffers dynamically. The diameter of the circle is 2 * full_circle_diam.
  // So the buffer size must be at least 2 * full_circle_diam to prevent clipping.
  let bufferSize = Math.max(800, 2 * currentDiam);
  if (maskGraphics.width !== bufferSize) {
    maskGraphics = createGraphics(bufferSize, bufferSize);
    imgRenderBuffer = createGraphics(bufferSize, bufferSize);
  }

  let filterX = filterLocationXSlider.value();
  let filterY = filterLocationYSlider.value();

  let currentN = nSlider.value();
  let currentAmount = amountSlider.value();
  let currentSkew = skewSlider.value();
  let currentOffset = offsetSlider.value();
  let currentHeight = heightSlider.value();
  let currentWidth1 = width1Slider.value();
  let currentWidth2 = width2Slider.value();
  let currentSpiralWidthRatio = spiralWidthSlider.value();
  let currentSizeGradient = sizeGradientSlider.value();
  let currentHoleX = holeXSlider.value();
  let currentHoleY = holeYSlider.value();
  let currentHoleRadius = holeRadiusSlider.value();
  let currentSBlend = spiralBlendSlider.value();
  let currentSSpread = spiralCurveSpreadSlider.value();
  let currentSPeak = spiralPeakSlider.value();
  let currentSHeight = spiralHeightSlider.value();
  let currentSWidth = sWidthSlider.value();

  if (
    currentN !== lastN ||
    currentAmount !== lastAmount ||
    currentSkew !== lastSkew ||
    currentOffset !== lastOffset ||
    currentHeight !== lastHeight ||
    currentWidth1 !== lastWidth1 ||
    currentWidth2 !== lastWidth2 ||
    currentSpiralWidthRatio !== lastSpiralWidthRatio ||
    currentSizeGradient !== lastSizeGradient ||
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
      currentSizeGradient,
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
      currentSWidth,
      currentSizeGradient,
    );
    lastN = currentN;
    lastAmount = currentAmount;
    lastSkew = currentSkew;
    lastOffset = currentOffset;
    lastHeight = currentHeight;
    lastWidth1 = currentWidth1;
    lastWidth2 = currentWidth2;
    lastSpiralWidthRatio = currentSpiralWidthRatio;
    lastSizeGradient = currentSizeGradient;
    lastHoleX = currentHoleX;
    lastHoleY = currentHoleY;
    lastHoleRadius = currentHoleRadius;
    lastSBlend = currentSBlend;
    lastSSpread = currentSSpread;
    lastSPeak = currentSPeak;
    lastSHeight = currentSHeight;
    lastSWidth = currentSWidth;
  }

  if (isAnimated) {
    masterRotation += 0.5;
    animTime += animSpeed;
  }

  if (useImageMask && img1) {
    // Draw mask centered relative to the buffer size
    maskGraphics.clear();
    maskGraphics.push();
    maskGraphics.translate(maskGraphics.width / 2, maskGraphics.height / 2);
    for (let ring of rings) ring.display(masterRotation, maskGraphics);
    if (showSpiral) {
      for (let sRing of spiralRings) sRing.display(masterRotation, maskGraphics);
    }
    maskGraphics.pop();

    // Draw image centered inside the buffer, preserving original aspect ratio
    imgRenderBuffer.clear();
    imgRenderBuffer.push();
    imgRenderBuffer.translate(imgRenderBuffer.width / 2, imgRenderBuffer.height / 2);
    imgRenderBuffer.translate(fgOffsetXSlider.value(), fgOffsetYSlider.value());
    if (rotateImageWithShape) {
      imgRenderBuffer.rotate(radians(masterRotation));
    }
    imgRenderBuffer.scale(fgZoomSlider.value());

    // Scale image to cover the circle diameter (2 * full_circle_diam) preserving aspect ratio
    let targetD = 2 * full_circle_diam;
    let imgRatio = img1.width / img1.height;
    let dw, dh;
    if (imgRatio > 1.0) {
      dh = targetD;
      dw = targetD * imgRatio;
    } else {
      dw = targetD;
      dh = targetD / imgRatio;
    }
    imgRenderBuffer.image(img1, -dw / 2, -dh / 2, dw, dh);
    imgRenderBuffer.pop();

    // Mask image in imgRenderBuffer using maskGraphics
    imgRenderBuffer.drawingContext.globalCompositeOperation = 'destination-in';
    imgRenderBuffer.image(maskGraphics, 0, 0);
    imgRenderBuffer.drawingContext.globalCompositeOperation = 'source-over';

    // Draw the final masked buffer centered at the filter location on screen
    let drawX = width / 2 + filterX - imgRenderBuffer.width / 2;
    let drawY = height / 2 + filterY - imgRenderBuffer.height / 2;
    image(imgRenderBuffer, drawX, drawY);
  } else {
    push();
    translate(width / 2 + filterX, height / 2 + filterY);
    for (let ring of rings) ring.display(masterRotation);
    if (showSpiral) for (let sRing of spiralRings) sRing.display(masterRotation);
    pop();
  }
}

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
    rStart = null,
    rEnd = null,
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
    this.rStart = rStart !== null ? rStart : i / n;
    this.rEnd = rEnd !== null ? rEnd : (i + 1) / n;
  }

  display(currentMasterRotation, pg) {
    if (this.amount <= 0) return;
    let step = 360 / this.amount;
    let solidAngle = TWO_PI / this.amount / 2;
    let target = pg || window;
    target.fill(0);
    target.noStroke();

    let rStart_active = this.rStart;
    let rEnd_active = this.rEnd;
    let rotationOffset_active = this.rotationOffset;
    let active_i = this.i;
    let width_mult_active = 1.0;

    let drawFading = false;
    let rStart_fade, rEnd_fade, rotationOffset_fade, active_i_fade, width_mult_fade;

    if (animation2Enabled) {
      let p = (animTime * 0.15) % 1.0;
      let rads = getNormalizedRadii(this.n, sizeGradientSlider.value());

      let ringTwist = 360 / this.n;
      let offsetRatio = offsetSlider.value();

      if (this.i === 0) {
        rStart_active = rads[0];
        rEnd_active = lerp(rads[0], rads[1], p);
        rotationOffset_active = 0;
        active_i = 0;
      } else {
        rStart_active = rads[this.i];
        rEnd_active = lerp(rads[this.i], rads[this.i + 1], p);

        rotationOffset_active = lerp((this.i - 1) * ringTwist * offsetRatio, this.i * ringTwist * offsetRatio, p);
        active_i = lerp(this.i - 1, this.i, p);
      }

      drawFading = true;
      rStart_fade = lerp(rads[this.i], rads[this.i + 1], p);
      rEnd_fade = rads[this.i + 1];
      
      if (this.i === this.n - 1) {
        rotationOffset_fade = this.rotationOffset;
        active_i_fade = this.i;
      } else {
        rotationOffset_fade = lerp(this.i * ringTwist * offsetRatio, (this.i + 1) * ringTwist * offsetRatio, p);
        active_i_fade = lerp(this.i, this.i + 1, p);
      }
      width_mult_fade = 1.0;
    }

    let passes = drawFading ? 2 : 1;
    for (let pass = 0; pass < passes; pass++) {
      let rS = (pass === 0) ? rStart_active : rStart_fade;
      let rE = (pass === 0) ? rEnd_active : rEnd_fade;
      let rotOffset = (pass === 0) ? rotationOffset_active : rotationOffset_fade;
      let act_i = (pass === 0) ? active_i : active_i_fade;
      let wMult = (pass === 0) ? width_mult_active : width_mult_fade;

      for (let j = 0; j < this.amount; j++) {
        target.push();
        let globalTheta = radians(
          currentMasterRotation + rotOffset + j * step,
        );
        let inX = this.holeOffsetX + this.holeRadius * cos(globalTheta);
        let inY = this.holeOffsetY + this.holeRadius * sin(globalTheta);
        let outX = full_circle_diam * cos(globalTheta);
        let outY = full_circle_diam * sin(globalTheta);
        let startX = lerp(inX, outX, rS);
        let startY = lerp(inY, outY, rS);
        let endX = lerp(inX, outX, rE);
        let endY = lerp(inY, outY, rE);
        let d1 = dist(0, 0, startX, startY);
        let d2 = dist(0, 0, endX, endY);
        let spiral_width = map(
          this.spiralWidthRatio,
          0,
          1,
          1,
          (j + 1) / this.amount,
        );

        // --- Symmetrical Wave Pulse ---
        let symIndex = min(j, this.amount - 1 - j);
        let maxSymIndex = (this.amount - 1) / 2;
        let normalizedSym = maxSymIndex > 0 ? symIndex / maxSymIndex : 0;
        let phaseOffset = -act_i * 0.9 - normalizedSym * TWO_PI;
        let widthPulse = widthAnimationEnabled ? (1.0 + animDepth * sin(animTime + phaseOffset)) : 1.0;

        let w1 = 2 * d1 * Math.tan(solidAngle / 2) * this.w1Scale * spiral_width * widthPulse * wMult;
        let w2 = 2 * d2 * Math.tan(solidAngle / 2) * this.w2Scale * spiral_width * widthPulse * wMult;
        let dx = endX - startX;
        let dy = endY - startY;
        let outwardX = dx * cos(-globalTheta) - dy * sin(-globalTheta);
        let outwardY = dx * sin(-globalTheta) + dy * cos(-globalTheta);
        let localEndX = -outwardY * this.hScale;
        let localEndY = outwardX * this.hScale;
        let skewRad = radians(constrain(this.skewAngle, 0.1, 179.9));
        localEndX += localEndY / tan(skewRad);
        target.translate(startX, startY);
        target.rotate(globalTheta);
        target.rotate(radians(-90));
        if (isRectangle) {
          let tiltAngle = atan2(localEndY, localEndX) - HALF_PI;
          target.rotate(tiltAngle);
          target.quad(
            -w1 / 2,
            0,
            w1 / 2,
            0,
            w1 / 2,
            dist(0, 0, localEndX, localEndY),
            -w1 / 2,
            dist(0, 0, localEndX, localEndY),
          );
        } else {
          target.quad(
            -w1 / 2,
            0,
            w1 / 2,
            0,
            localEndX + w2 / 2,
            localEndY,
            localEndX - w2 / 2,
            localEndY,
          );
        }
        target.pop();
      }
    }
  }
}

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
    midIndexRatio,
    rStart = null,
    rEnd = null,
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
    this.rStart = rStart !== null ? rStart : i / n;
    this.rEnd = rEnd !== null ? rEnd : (i + 1) / n;
  }

  display(currentMasterRotation, pg) {
    if (this.amount <= 0) return;
    let step = 360 / this.amount;
    let solidAngle = TWO_PI / this.amount / 2;
    let target = pg || window;
    target.fill(0);
    target.noStroke();
    let dynamicMidIndex = (this.amount - 1) * this.midIndexRatio;

    let rStart_active = this.rStart;
    let rEnd_active = this.rEnd;
    let rotationOffset_active = this.rotationOffset;
    let active_i = this.i;
    let width_mult_active = 1.0;

    let drawFading = false;
    let rStart_fade, rEnd_fade, rotationOffset_fade, active_i_fade, width_mult_fade;

    if (animation2Enabled) {
      let p = (animTime * 0.15) % 1.0;
      let rads = getNormalizedRadii(this.n, sizeGradientSlider.value());

      let ringTwist = 360 / this.n;
      let offsetRatio = offsetSlider.value();

      if (this.i === 0) {
        rStart_active = rads[0];
        rEnd_active = lerp(rads[0], rads[1], p);
        rotationOffset_active = 0;
        active_i = 0;
      } else {
        rStart_active = rads[this.i];
        rEnd_active = lerp(rads[this.i], rads[this.i + 1], p);

        rotationOffset_active = lerp((this.i - 1) * ringTwist * offsetRatio, this.i * ringTwist * offsetRatio, p);
        active_i = lerp(this.i - 1, this.i, p);
      }

      drawFading = true;
      rStart_fade = lerp(rads[this.i], rads[this.i + 1], p);
      rEnd_fade = rads[this.i + 1];
      
      if (this.i === this.n - 1) {
        rotationOffset_fade = this.rotationOffset;
        active_i_fade = this.i;
      } else {
        rotationOffset_fade = lerp(this.i * ringTwist * offsetRatio, (this.i + 1) * ringTwist * offsetRatio, p);
        active_i_fade = lerp(this.i, this.i + 1, p);
      }
      width_mult_fade = 1.0;
    }

    let passes = drawFading ? 2 : 1;
    for (let pass = 0; pass < passes; pass++) {
      let rS = (pass === 0) ? rStart_active : rStart_fade;
      let rE = (pass === 0) ? rEnd_active : rEnd_fade;
      let rotOffset = (pass === 0) ? rotationOffset_active : rotationOffset_fade;
      let act_i = (pass === 0) ? active_i : active_i_fade;
      let wMult = (pass === 0) ? width_mult_active : width_mult_fade;

      for (let j = 0; j < this.amount; j++) {
        target.push();
        let globalTheta = radians(
          currentMasterRotation + rotOffset + j * step,
        );
        let inX = this.holeOffsetX + this.holeRadius * cos(globalTheta);
        let inY = this.holeOffsetY + this.holeRadius * sin(globalTheta);
        let outX = full_circle_diam * cos(globalTheta);
        let outY = full_circle_diam * sin(globalTheta);
        let startX = lerp(inX, outX, rS);
        let startY = lerp(inY, outY, rS);

        let d1 = dist(0, 0, startX, startY);

        // --- Symmetrical Wave Pulse ---
        let symIndex = min(j, this.amount - 1 - j);
        let maxSymIndex = (this.amount - 1) / 2;
        let normalizedSym = maxSymIndex > 0 ? symIndex / maxSymIndex : 0;
        let phaseOffset = -act_i * 0.9 - normalizedSym * TWO_PI;
        let widthPulse = widthAnimationEnabled ? (1.0 + animDepth * sin(animTime + phaseOffset)) : 1.0;

        let w1 = 2 * d1 * Math.tan(solidAngle / 2) * this.wScale * widthPulse * wMult;

        let endX = lerp(inX, outX, rE);
        let endY = lerp(inY, outY, rE);
        let dx = endX - startX;
        let dy = endY - startY;
        let outwardX = dx * cos(-globalTheta) - dy * sin(-globalTheta);
        let outwardY = dx * sin(-globalTheta) + dy * cos(-globalTheta);
        let localEndX = -outwardY;
        let localEndY = outwardX;
        let baseHeight = dist(0, 0, localEndX, localEndY);

        // Restored proper math to prevent zero division and mathematical tearing 
        let x = 0;
        if (j === dynamicMidIndex) {
          x = 0;
        } else if (j < dynamicMidIndex) {
          x = dynamicMidIndex === 0 ? 0 : map(j, 0, dynamicMidIndex, -2.5, 0);
        } else {
          x = dynamicMidIndex === this.amount - 1 ? 0 : map(j, dynamicMidIndex, this.amount - 1, 0, 2.5);
        }

        let spiralHeightTarget = (baseHeight / 2) * exp(-(x * x) / this.curveSpread);
        let currentHeight = lerp(baseHeight, spiralHeightTarget, this.blendRatio) * this.hScale;

        let targetAddedDistance = 0;
        if (j <= dynamicMidIndex) {
          targetAddedDistance = dynamicMidIndex === 0 ? baseHeight / 2 : map(j, 0, dynamicMidIndex, 0, baseHeight / 2);
        } else {
          targetAddedDistance = baseHeight - spiralHeightTarget;
        }

        let addedDistance = lerp(0, targetAddedDistance, this.blendRatio);

        let skewRad = radians(constrain(this.skewAngle, 0.1, 179.9));
        let skewShift = currentHeight / tan(skewRad);

        target.translate(startX, startY);
        target.rotate(globalTheta);
        target.rotate(radians(-90));
        target.rotate(atan2(localEndY, localEndX) - HALF_PI);

        target.quad(
          -w1 / 2,
          addedDistance,
          w1 / 2,
          addedDistance,
          w1 / 2 + skewShift,
          addedDistance + currentHeight,
          -w1 / 2 + skewShift,
          addedDistance + currentHeight,
        );
        target.pop();
      }
    }
  }
}