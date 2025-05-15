"use client";

import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  // Add a subtle offset based on the mouse position
  uv += (uMouse - vec2(0.5)) * uAmplitude;

  // Original animation logic for fluid movement
  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 7.5; ++i) { // Iterations kept similar to original for movement style
    a += cos(i - d - a * uv.x * 0.9); // Slightly soften influence for color
    d += sin(uv.y * i + a * 0.9);    // Slightly soften influence for color
  }
  d += uTime * 0.5 * uSpeed;

  // Adjusted base_intensity to prevent overly dark areas
  // Ensure it stays in a higher range, e.g., 0.6 to 1.0
  float base_intensity = cos(d + uv.x * a * 0.5) * 0.2 + 0.8; // Was 0.7, now 0.8 to lift minimum
  vec3 modulated_color = uColor * base_intensity;

  // Softer color variations, less likely to darken channels significantly
  modulated_color.r *= (0.9 + 0.1 * sin(a * 0.5)); // Reduced modulation range
  modulated_color.g *= (0.9 + 0.1 * cos(d * 0.3)); // Reduced modulation range
  modulated_color.b *= (0.9 + 0.1 * sin(a + d * 0.2)); // Reduced modulation range

  // Clamp individual channels to prevent them from going too dark before pow function
  modulated_color.r = max(modulated_color.r, 0.15);
  modulated_color.g = max(modulated_color.g, 0.15);
  modulated_color.b = max(modulated_color.b, 0.15);

  vec3 final_col = pow(modulated_color, vec3(1.05)); // Slightly reduced power exponent

  gl_FragColor = vec4(final_col * 0.85, 0.85); // Slightly increased brightness factor
}
`;

interface IridescenceProps {
  color?: [number, number, number];
  speed?: number;
  amplitude?: number;
  mouseReact?: boolean;
  [key: string]: any;
}

export default function Iridescence({
  color = [0.702, 0.439, 0.475], // Pink from brand palette #b37079
  speed = 0.6,                   // Slightly reduced speed
  amplitude = 0.05,              // Slightly reduced mouse reaction
  mouseReact = true,
  ...rest
}: IridescenceProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;
    const renderer = new Renderer();
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    let program: Program | null = null;

    function resize() {
      const scale = 1;
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
      if (program) {
        program.uniforms.uResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        );
      }
    }
    window.addEventListener("resize", resize, false);
    resize();

    // Ensure canvas is contained
    if (gl.canvas instanceof HTMLCanvasElement) {
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';
      gl.canvas.style.display = 'block';
      gl.canvas.style.position = 'absolute';
      gl.canvas.style.left = '0';
      gl.canvas.style.top = '0';
      gl.canvas.style.overflow = 'hidden';
      gl.canvas.style.maxWidth = '100vw';
    }

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(...color) },
        uResolution: {
          value: new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          ),
        },
        uMouse: { value: new Float32Array([mousePos.current.x, mousePos.current.y]) },
        uAmplitude: { value: amplitude },
        uSpeed: { value: speed },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    let animateId: number;

    function update(t: number) {
      animateId = requestAnimationFrame(update);
      if (program) {
        program.uniforms.uTime.value = t * 0.001;
      }
      renderer.render({ scene: mesh });
    }
    animateId = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    function handleMouseMove(e: MouseEvent) {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mousePos.current = { x, y };
      if (program) {
        program.uniforms.uMouse.value[0] = x;
        program.uniforms.uMouse.value[1] = y;
      }
    }
    if (mouseReact) {
      ctn.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      if (mouseReact) {
        ctn.removeEventListener("mousemove", handleMouseMove);
      }
      ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, speed, amplitude, mouseReact]);

  return (
    <div
      ref={ctnDom}
      className="w-full h-full overflow-hidden filter"
      style={{ maxWidth: '100vw', position: 'relative' }}
      {...rest}
    />
  );
}
