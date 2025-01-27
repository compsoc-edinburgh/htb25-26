//@ts-nocheck
"use client";
import React, { useEffect, useRef } from "react";
import { setWebGlBackground } from "./minigl";

const WebGLBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    setWebGlBackground();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="gradient-canvas"
      className="fixed left-0 top-0 -z-10 h-full w-full"
    />
  );
};

export default WebGLBackground;
