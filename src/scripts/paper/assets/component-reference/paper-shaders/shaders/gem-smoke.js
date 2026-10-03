/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                    Paper Shaders                    *
 *       https://github.com/paper-design/shaders       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { rotation2, declarePI } from "../shader-utils.js";
const gemSmokeMeta = {
  maxColorCount: 6
};
const gemSmokeFragmentShader = `#version 300 es
precision mediump float;

in mediump vec2 v_imageUV;
in mediump vec2 v_objectUV;
in mediump vec2 v_responsiveUV;
in mediump vec2 v_responsiveBoxGivenSize;
                                               
out vec4 fragColor;

uniform sampler2D u_image;
uniform float u_shape;
uniform bool u_isImage;

uniform float u_time;
uniform vec4 u_colors[${gemSmokeMeta.maxColorCount}];
uniform float u_colorsCount;
uniform vec4 u_colorBack;
uniform vec4 u_colorInner;
uniform float u_innerDistortion;
uniform float u_outerDistortion;
uniform float u_outerGlow;
uniform float u_innerGlow;
uniform float u_offset;
uniform float u_angle;
uniform float u_size;

${declarePI}
${rotation2}

// 9x9 Gaussian blur on R and G channels
vec2 gaussBlur9x9RG(sampler2D tex, vec2 uv, float radius) {
  vec2 texel = 1.0 / vec2(textureSize(tex, 0));
  vec2 r = max(radius, 0.0) * texel;
  // Pascal's row 8: sum = 256, 2D norm = 65536
  const float k[9] = float[9](1.0, 8.0, 28.0, 56.0, 70.0, 56.0, 28.0, 8.0, 1.0);
  vec2 sum = vec2(0.0);

  for (int j = -4; j <= 4; ++j) {
    float wy = k[j + 4];
    for (int i = -4; i <= 4; ++i) {
      float w = k[i + 4] * wy;
      vec2 off = vec2(float(i) * r.x, float(j) * r.y);
      sum += w * texture(tex, uv + off).rg;
    }
  }

  return sum / 65536.0;
}

float sst(float a, float b, float x) {
  return smoothstep(a, b, x);
}

void main() {
  float time = u_time;

  float roundness = 0.;
  float imgAlpha = 0.;

  if (u_isImage == true) {
    // Image sampling (UV scaled inward to account for padding)
    vec2 imageUV = v_imageUV;
    imageUV -= .5;
    imageUV *= .95;
    imageUV += .5;

    // Blurred image: x = roundness, y = alpha
    vec2 blurred = gaussBlur9x9RG(u_image, imageUV, 10.);
    roundness = 1. - blurred.x;
    vec2 texelA = 1.0 / vec2(textureSize(u_image, 0));
    const float k3[3] = float[3](1.0, 2.0, 1.0);
    for (int j = -1; j <= 1; ++j) {
      for (int i = -1; i <= 1; ++i) {
        imgAlpha += k3[i + 1] * k3[j + 1] * texture(u_image, imageUV + vec2(float(i) * texelA.x, float(j) * texelA.y)).g;
      }
    }
    imgAlpha /= 16.0;
  } else {
    vec2 uv = v_objectUV + .5;
    uv.y = 1. - uv.y;
    float edge = 0.;

    if (u_shape < 1.) {
      // full-fill on canvas
      vec2 borderUV = v_responsiveUV + .5;
      vec2 mask = min(borderUV, 1. - borderUV);
      vec2 pixel_thickness = min(250. / v_responsiveBoxGivenSize, vec2(.5));
      float maskX = smoothstep(0.0, pixel_thickness.x, mask.x);
      float maskY = smoothstep(0.0, pixel_thickness.y, mask.y);
      maskX = pow(maskX, .25);
      maskY = pow(maskY, .25);
      edge = clamp(1. - maskX * maskY, 0., 1.);
    } else if (u_shape < 2.) {
      // circle
      vec2 shapeUV = uv - .5;
      shapeUV *= .67;
      edge = pow(clamp(3. * length(shapeUV), 0., 1.), 18.);
    } else if (u_shape < 3.) {
      // daisy
      vec2 shapeUV = uv - .5;
      shapeUV *= 1.68;

      float r = length(shapeUV) * 2.;
      float a = atan(shapeUV.y, shapeUV.x) + .2;
      r *= (1. + .05 * sin(3. * a + 2. * time));
      float f = abs(cos(a * 3.));
      edge = smoothstep(f, f + .7, r);
      edge *= edge;
    } else if (u_shape < 4.) {
      // diamond
      vec2 shapeUV = uv - .5;
      shapeUV = rotate(shapeUV, .25 * PI);
      shapeUV *= 1.42;
      shapeUV += .5;
      vec2 mask = min(shapeUV, 1. - shapeUV);
      vec2 pixel_thickness = vec2(.15);
      float maskX = smoothstep(0.0, pixel_thickness.x, mask.x);
      float maskY = smoothstep(0.0, pixel_thickness.y, mask.y);
      maskX = pow(maskX, .25);
      maskY = pow(maskY, .25);
      edge = clamp(1. - maskX * maskY, 0., 1.);
    } else if (u_shape < 5.) {
      // metaballs
      vec2 shapeUV = uv - .5;
      shapeUV *= 1.3;
      edge = 0.;
      for (int i = 0; i < 5; i++) {
        float fi = float(i);
        float speed = 1.5 + 2./3. * sin(fi * 12.345);
        float angle = -fi * 1.5;
        vec2 dir1 = vec2(cos(angle), sin(angle));
        vec2 dir2 = vec2(cos(angle + 1.57), sin(angle + 1.));
        vec2 traj = .4 * (dir1 * sin(time * speed + fi * 1.23) + dir2 * cos(time * (speed * 0.7) + fi * 2.17));
        float d = length(shapeUV + traj);
        edge += pow(1.0 - clamp(d, 0.0, 1.0), 4.0);
      }
      edge = 1. - smoothstep(.65, .9, edge);
      edge = pow(edge, 4.);
    }

    imgAlpha = 1. - smoothstep(.9 - 2. * fwidth(edge), .9, edge);
    roundness = 1. - edge;
  }

// Smoke UV setup
  vec2 smokeUV = v_objectUV;
  smokeUV = rotate(smokeUV, u_angle * PI / 180.);
  smokeUV *= mix(4., 1., u_size);

  // Two swirl paths: inner (shape-masked) and outer (free), each with independent distortion
  vec2 innerUV = smokeUV;
  vec2 outerUV = smokeUV;

  // Vertical displacement \u2014 applied independently to inner and outer
  innerUV.y += u_innerDistortion * (1. - sst(0., 1., length(.4 * innerUV)));
  innerUV.y -= .4 * u_innerDistortion;
  innerUV.y += .7 * u_offset * roundness;

  outerUV.y += u_outerDistortion * (1. - sst(0., 1., length(.4 * outerUV)));
  outerUV.y -= .4 * u_outerDistortion;

  float innerSwirl = u_innerDistortion * roundness;
  float outerSwirl = u_outerDistortion;

  for (int i = 1; i < 5; i++) {
    float fi = float(i);

    float stretchIn = max(length(dFdx(innerUV)), length(dFdy(innerUV)));
    float dampenIn = 1. / (1. + stretchIn * 8.);
    float sIn = innerSwirl * dampenIn;
    innerUV.x += sIn / fi * cos(time + fi * 2.9 * innerUV.y);
    innerUV.y += sIn / fi * cos(time + fi * 1.5 * innerUV.x);

    float stretchOut = max(length(dFdx(outerUV)), length(dFdy(outerUV)));
    float dampenOut = 1. / (1. + stretchOut * 8.);
    float sOut = outerSwirl * dampenOut;
    outerUV.x += sOut / fi * cos(time + fi * 2.9 * outerUV.y);
    outerUV.y += sOut / fi * cos(time + fi * 1.5 * outerUV.x);
  }

  // Smoke shapes from swirl fields
  float innerShape = exp(-1.5 * dot(innerUV, innerUV));
  float outerShape = exp(-1.5 * dot(outerUV, outerUV));

  // Visibility masks
  float outerMask = pow(u_outerGlow, 2.) * (1. - imgAlpha);
  float innerMask = (.01 + .99 * u_innerGlow) * imgAlpha;

  innerShape *= innerMask;
  outerShape *= outerMask;

  // Color gradient
  float mixer = (innerShape + outerShape) * u_colorsCount;
  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;

  float smokeMask = 0.;
  for (int i = 1; i < ${gemSmokeMeta.maxColorCount + 1}; i++) {
    if (i > int(u_colorsCount)) break;

    float m = sst(0., 1., clamp(mixer - float(i - 1), 0., 1.));
    if (i == 1) smokeMask = m;

    vec4 c = u_colors[i - 1];
    c.rgb *= c.a;
    gradient = mix(gradient, c, m);
  }

  // Compositing (premultiplied alpha, front-to-back)
  vec3 color = gradient.rgb * smokeMask;
  float opacity = gradient.a * smokeMask;

  float innerOpacity = u_colorInner.a * imgAlpha;
  vec3 innerColor = u_colorInner.rgb * innerOpacity;
  color += innerColor * (1.0 - opacity);
  opacity += innerOpacity * (1.0 - opacity);

  vec3 backColor = u_colorBack.rgb * u_colorBack.a;
  color += backColor * (1.0 - opacity);
  opacity += u_colorBack.a * (1.0 - opacity);

  fragColor = vec4(color, opacity);
}
`;
const POISSON_CONFIG_OPTIMIZED = {
  measurePerformance: false,
  // Set to true to see performance metrics
  workingSize: 512,
  // Size to solve Poisson at (will upscale to original size)
  iterations: 32
  // SOR converges ~2-20x faster than standard Gauss-Seidel
};
function toProcessedGemSmoke(file) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const isBlob = typeof file === "string" && file.startsWith("blob:");
  return new Promise((resolve, reject) => {
    if (!file || !ctx) {
      reject(new Error("Invalid file or canvas context"));
      return;
    }
    const blobContentTypePromise = isBlob && fetch(file).then((res) => res.headers.get("Content-Type"));
    const img = new Image();
    img.crossOrigin = "anonymous";
    const totalStartTime = performance.now();
    img.onload = async () => {
      let isSVG;
      const blobContentType = await blobContentTypePromise;
      if (blobContentType) {
        isSVG = blobContentType === "image/svg+xml";
      } else if (typeof file === "string") {
        isSVG = file.endsWith(".svg") || file.startsWith("data:image/svg+xml");
      } else {
        isSVG = file.type === "image/svg+xml";
      }
      let originalWidth = img.width || img.naturalWidth;
      let originalHeight = img.height || img.naturalHeight;
      if (isSVG) {
        const svgMaxSize = 4096;
        const aspectRatio = originalWidth / originalHeight;
        if (originalWidth > originalHeight) {
          originalWidth = svgMaxSize;
          originalHeight = svgMaxSize / aspectRatio;
        } else {
          originalHeight = svgMaxSize;
          originalWidth = svgMaxSize * aspectRatio;
        }
        img.width = originalWidth;
        img.height = originalHeight;
      }
      const minDimension = Math.min(originalWidth, originalHeight);
      const targetSize = POISSON_CONFIG_OPTIMIZED.workingSize;
      const scaleFactor = targetSize / minDimension;
      const width = Math.round(originalWidth * scaleFactor);
      const height = Math.round(originalHeight * scaleFactor);
      if (POISSON_CONFIG_OPTIMIZED.measurePerformance) {
        console.log(`[Processing Mode]`);
        console.log(`  Original: ${originalWidth}\xD7${originalHeight}`);
        console.log(`  Working: ${width}\xD7${height} (${(scaleFactor * 100).toFixed(1)}% scale)`);
        if (scaleFactor < 1) {
          console.log(`  Speedup: ~${Math.round(1 / (scaleFactor * scaleFactor))}\xD7`);
        }
      }
      canvas.width = originalWidth;
      canvas.height = originalHeight;
      const paddingSize = 0.025;
      const padX = Math.ceil(width * paddingSize);
      const padY = Math.ceil(height * paddingSize);
      const imgW = width - 2 * padX;
      const imgH = height - 2 * padY;
      const shapeCanvas = document.createElement("canvas");
      shapeCanvas.width = width;
      shapeCanvas.height = height;
      const shapeCtx = shapeCanvas.getContext("2d");
      shapeCtx.drawImage(img, padX, padY, imgW, imgH);
      const startMask = performance.now();
      const shapeImageData = shapeCtx.getImageData(0, 0, width, height);
      const data = shapeImageData.data;
      const shapeMask = new Uint8Array(width * height);
      const boundaryMask = new Uint8Array(width * height);
      let shapePixelCount = 0;
      for (let i = 0, idx = 0; i < data.length; i += 4, idx++) {
        const a = data[i + 3];
        const isShape = a === 0 ? 0 : 1;
        shapeMask[idx] = isShape;
        shapePixelCount += isShape;
      }
      const boundaryIndices = [];
      const interiorIndices = [];
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = y * width + x;
          if (!shapeMask[idx]) continue;
          let isBoundary = false;
          if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
            isBoundary = true;
          } else {
            isBoundary = !shapeMask[idx - 1] || // left
            !shapeMask[idx + 1] || // right
            !shapeMask[idx - width] || // top
            !shapeMask[idx + width] || // bottom
            !shapeMask[idx - width - 1] || // top-left
            !shapeMask[idx - width + 1] || // top-right
            !shapeMask[idx + width - 1] || // bottom-left
            !shapeMask[idx + width + 1];
          }
          if (isBoundary) {
            boundaryMask[idx] = 1;
            boundaryIndices.push(idx);
          } else {
            interiorIndices.push(idx);
          }
        }
      }
      if (POISSON_CONFIG_OPTIMIZED.measurePerformance) {
        console.log(`[Mask Building] Time: ${(performance.now() - startMask).toFixed(2)}ms`);
        console.log(
          `  Shape pixels: ${shapePixelCount} / ${width * height} (${(shapePixelCount / (width * height) * 100).toFixed(1)}%)`
        );
        console.log(`  Interior pixels: ${interiorIndices.length}`);
        console.log(`  Boundary pixels: ${boundaryIndices.length}`);
      }
      const sparseData = buildSparseData(
        shapeMask,
        boundaryMask,
        new Uint32Array(interiorIndices),
        new Uint32Array(boundaryIndices),
        width,
        height
      );
      const startSolve = performance.now();
      const u = solvePoissonSparse(sparseData, shapeMask, boundaryMask, width, height);
      if (POISSON_CONFIG_OPTIMIZED.measurePerformance) {
        console.log(`[Poisson Solve] Time: ${(performance.now() - startSolve).toFixed(2)}ms`);
      }
      let maxVal = 0;
      let finalImageData;
      for (let i = 0; i < interiorIndices.length; i++) {
        const idx = interiorIndices[i];
        if (u[idx] > maxVal) maxVal = u[idx];
      }
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = width;
      tempCanvas.height = height;
      const tempCtx = tempCanvas.getContext("2d");
      const tempImg = tempCtx.createImageData(width, height);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = y * width + x;
          const px = idx * 4;
          if (!shapeMask[idx]) {
            tempImg.data[px] = 255;
            tempImg.data[px + 1] = 255;
            tempImg.data[px + 2] = 255;
            tempImg.data[px + 3] = 0;
          } else {
            const poissonRatio = u[idx] / maxVal;
            let gray = 255 * (1 - poissonRatio);
            tempImg.data[px] = gray;
            tempImg.data[px + 1] = gray;
            tempImg.data[px + 2] = gray;
            tempImg.data[px + 3] = 255;
          }
        }
      }
      tempCtx.putImageData(tempImg, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(tempCanvas, 0, 0, width, height, 0, 0, originalWidth, originalHeight);
      const outImg = ctx.getImageData(0, 0, originalWidth, originalHeight);
      const origPadX = Math.ceil(originalWidth * paddingSize);
      const origPadY = Math.ceil(originalHeight * paddingSize);
      const originalCanvas = document.createElement("canvas");
      originalCanvas.width = originalWidth;
      originalCanvas.height = originalHeight;
      const originalCtx = originalCanvas.getContext("2d");
      originalCtx.drawImage(img, origPadX, origPadY, originalWidth - 2 * origPadX, originalHeight - 2 * origPadY);
      const originalData = originalCtx.getImageData(0, 0, originalWidth, originalHeight);
      for (let i = 0; i < outImg.data.length; i += 4) {
        const a = originalData.data[i + 3];
        const upscaledAlpha = outImg.data[i + 3];
        if (a === 0) {
          outImg.data[i] = 255;
          outImg.data[i + 1] = 0;
        } else {
          outImg.data[i] = upscaledAlpha === 0 ? 0 : outImg.data[i];
          outImg.data[i + 1] = a;
        }
        outImg.data[i + 2] = 255;
        outImg.data[i + 3] = 255;
      }
      ctx.putImageData(outImg, 0, 0);
      finalImageData = outImg;
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Failed to create PNG blob"));
          return;
        }
        if (POISSON_CONFIG_OPTIMIZED.measurePerformance) {
          const totalTime = performance.now() - totalStartTime;
          console.log(`[Total Processing Time] ${totalTime.toFixed(2)}ms`);
          if (scaleFactor < 1) {
            const estimatedFullResTime = totalTime * Math.pow(originalWidth * originalHeight / (width * height), 1.5);
            console.log(`[Estimated time at full resolution] ~${estimatedFullResTime.toFixed(0)}ms`);
            console.log(
              `[Time saved] ~${(estimatedFullResTime - totalTime).toFixed(0)}ms (${Math.round(estimatedFullResTime / totalTime)}\xD7 faster)`
            );
          }
        }
        resolve({
          imageData: finalImageData,
          pngBlob: blob
        });
      }, "image/png");
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = typeof file === "string" ? file : URL.createObjectURL(file);
  });
}
function buildSparseData(shapeMask, boundaryMask, interiorPixels, boundaryPixels, width, height) {
  const pixelCount = interiorPixels.length;
  const neighborIndices = new Int32Array(pixelCount * 4);
  for (let i = 0; i < pixelCount; i++) {
    const idx = interiorPixels[i];
    const x = idx % width;
    const y = Math.floor(idx / width);
    neighborIndices[i * 4 + 0] = x < width - 1 && shapeMask[idx + 1] ? idx + 1 : -1;
    neighborIndices[i * 4 + 1] = x > 0 && shapeMask[idx - 1] ? idx - 1 : -1;
    neighborIndices[i * 4 + 2] = y > 0 && shapeMask[idx - width] ? idx - width : -1;
    neighborIndices[i * 4 + 3] = y < height - 1 && shapeMask[idx + width] ? idx + width : -1;
  }
  return {
    interiorPixels,
    boundaryPixels,
    pixelCount,
    neighborIndices
  };
}
function solvePoissonSparse(sparseData, shapeMask, boundaryMask, width, height) {
  const ITERATIONS = POISSON_CONFIG_OPTIMIZED.iterations;
  const C = 0.01;
  const u = new Float32Array(width * height);
  const { interiorPixels, neighborIndices, pixelCount } = sparseData;
  const startTime = performance.now();
  const omega = 1.9;
  const redPixels = [];
  const blackPixels = [];
  for (let i = 0; i < pixelCount; i++) {
    const idx = interiorPixels[i];
    const x = idx % width;
    const y = Math.floor(idx / width);
    if ((x + y) % 2 === 0) {
      redPixels.push(i);
    } else {
      blackPixels.push(i);
    }
  }
  for (let iter = 0; iter < ITERATIONS; iter++) {
    for (const i of redPixels) {
      const idx = interiorPixels[i];
      const eastIdx = neighborIndices[i * 4 + 0];
      const westIdx = neighborIndices[i * 4 + 1];
      const northIdx = neighborIndices[i * 4 + 2];
      const southIdx = neighborIndices[i * 4 + 3];
      let sumN = 0;
      if (eastIdx >= 0) sumN += u[eastIdx];
      if (westIdx >= 0) sumN += u[westIdx];
      if (northIdx >= 0) sumN += u[northIdx];
      if (southIdx >= 0) sumN += u[southIdx];
      const newValue = (C + sumN) / 4;
      u[idx] = omega * newValue + (1 - omega) * u[idx];
    }
    for (const i of blackPixels) {
      const idx = interiorPixels[i];
      const eastIdx = neighborIndices[i * 4 + 0];
      const westIdx = neighborIndices[i * 4 + 1];
      const northIdx = neighborIndices[i * 4 + 2];
      const southIdx = neighborIndices[i * 4 + 3];
      let sumN = 0;
      if (eastIdx >= 0) sumN += u[eastIdx];
      if (westIdx >= 0) sumN += u[westIdx];
      if (northIdx >= 0) sumN += u[northIdx];
      if (southIdx >= 0) sumN += u[southIdx];
      const newValue = (C + sumN) / 4;
      u[idx] = omega * newValue + (1 - omega) * u[idx];
    }
  }
  const tmp = new Float32Array(width * height);
  for (let smooth = 0; smooth < 3; smooth++) {
    tmp.set(u);
    for (let i = 0; i < pixelCount; i++) {
      const idx = interiorPixels[i];
      const eastIdx = neighborIndices[i * 4 + 0];
      const westIdx = neighborIndices[i * 4 + 1];
      const northIdx = neighborIndices[i * 4 + 2];
      const southIdx = neighborIndices[i * 4 + 3];
      let sum = 0;
      let count = 0;
      if (eastIdx >= 0) {
        sum += tmp[eastIdx];
        count++;
      }
      if (westIdx >= 0) {
        sum += tmp[westIdx];
        count++;
      }
      if (northIdx >= 0) {
        sum += tmp[northIdx];
        count++;
      }
      if (southIdx >= 0) {
        sum += tmp[southIdx];
        count++;
      }
      u[idx] = count > 0 ? (tmp[idx] + sum / count) * 0.5 : tmp[idx];
    }
  }
  if (POISSON_CONFIG_OPTIMIZED.measurePerformance) {
    const elapsed = performance.now() - startTime;
    console.log(`[Optimized Poisson Solver (SOR \u03C9=${omega})]`);
    console.log(`  Working size: ${width}\xD7${height}`);
    console.log(`  Iterations: ${ITERATIONS}`);
    console.log(`  Time: ${elapsed.toFixed(2)}ms`);
    console.log(`  Interior pixels processed: ${pixelCount}`);
    console.log(`  Speed: ${(ITERATIONS * pixelCount / (elapsed * 1e3)).toFixed(2)} Mpixels/sec`);
  }
  return u;
}
const GemSmokeShapes = {
  none: 0,
  circle: 1,
  daisy: 2,
  diamond: 3,
  metaballs: 4
};
export {
  GemSmokeShapes,
  POISSON_CONFIG_OPTIMIZED,
  gemSmokeFragmentShader,
  gemSmokeMeta,
  toProcessedGemSmoke
};
//# sourceMappingURL=gem-smoke.js.map
