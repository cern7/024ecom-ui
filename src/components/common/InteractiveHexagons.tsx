import React, { useEffect, useRef, useState } from "react";

const InteractiveHexagons = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const hexagonsRef = useRef([]);

  // Initialize canvas and hexagons
  useEffect(()=>{
    const handleResize = () =>{
        if(canvasRef.current){
            const canvas = canvasRef.current;
            const container = canvas.parentElement;
            const width = container.clientWidth;
            const height = container.clientHeight;

            canvas.width = width;
            canvas.height = height;

            setDimensions({width,height});

            // create Hexagons grid
            createHexagondGrid(width, height);
        }
    }
  }, []);
};
