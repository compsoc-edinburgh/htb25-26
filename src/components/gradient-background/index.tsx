//@ts-nocheck
"use client";
import React, { useEffect, useRef } from "react";

const WebGLBackground = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Vertex shader program
    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;

    // Fragment shader program
    const fsSource = `
    precision mediump float;
    uniform float uTime;
    
    void main() {
      vec2 uv = gl_FragCoord.xy / vec2(800.0, 600.0);
      float time = uTime * 0.0002;
      
      // Define colors (RGB 0-1)
      vec3 blue = vec3(0.165, 0.310, 0.933);    // #2A4FEE
      vec3 purple = vec3(0.611764705882353, 0.12156862745098039, 0.5333333333333333);  // #DFA8F6
      vec3 black = vec3(0.0, 0.0, 0.0);         // #000000
      
      // Create animated values with different frequencies
      float wave1 = sin(uv.x * 3.14 + time * 2.0) * 0.5 + 0.5;
      float wave2 = sin(uv.y * 3.14 + time * 3.0) * 0.5 + 0.5;
      float wave3 = sin((uv.x + uv.y) * 2.0 + time * 4.0) * 0.5 + 0.5;
      
      // Mix colors based on the waves
      vec3 color = mix(
        mix(black, blue, wave1),
        purple,
        wave2 * wave3
      );
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

    // Create shader program
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fsSource);
    gl.compileShader(fragmentShader);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // Set up vertex buffer
    const positions = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0];
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Get attribute and uniform locations
    const positionAttributeLocation = gl.getAttribLocation(
      shaderProgram,
      "aVertexPosition",
    );
    const timeUniformLocation = gl.getUniformLocation(shaderProgram, "uTime");

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Animation loop
    let startTime = performance.now();
    const render = (currentTime) => {
      const elapsed = currentTime - startTime;

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(shaderProgram);
      gl.uniform1f(timeUniformLocation, elapsed);

      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(
        positionAttributeLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0,
      );

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
      gl.deleteProgram(shaderProgram);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed left-0 top-0 -z-10 h-full w-full"
    />
  );
};

export default WebGLBackground;
