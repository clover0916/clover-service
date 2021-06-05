import particlesJS from 'particles.js/particles.js'

const part = {
    "bgColor": "#00000",
    "width": 620,
    "height": 364,
    "emitFrequency": "100",
    "startX": 310,
    "startXVariance": "594",
    "startY": 182,
    "startYVariance": "222",
    "initialDirection": "0",
    "initialDirectionVariance": "360",
    "initialSpeed": "2",
    "initialSpeedVariance": "3.7",
    "friction": "0.038",
    "accelerationSpeed": "0.13",
    "accelerationDirection": "273.3",
    "startScale": "0.76",
    "startScaleVariance": "1",
    "finishScale": "0",
    "finishScaleVariance": "0",
    "lifeSpan": "50",
    "lifeSpanVariance": "196",
    "startAlpha": "1",
    "startAlphaVariance": "0",
    "finishAlpha": "0.35",
    "finishAlphaVariance": 0.5,
    "shapeIdList": [
        "blur_circle",
        "circle"
    ],
    "startColor": {
      "hue": 124,
      "hueVariance": 360,
      "saturation": 54,
      "saturationVariance": "78",
      "luminance": "83",
      "luminanceVariance": "16"
    },
    "blendMode": true,
    "alphaCurveType": "1",
    "VERSION": "1.0.0"
  
}
particlesJS('part', part)