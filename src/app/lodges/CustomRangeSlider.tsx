import React, { useState, useRef, useEffect, useCallback } from "react";

interface CustomRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const CustomRangeSlider: React.FC<CustomRangeSliderProps> = ({
  min,
  max,
  value,
  onChange,
}) => {
  const [minValue, setMinValue] = useState(value[0]);
  const [maxValue, setMaxValue] = useState(value[1]);
  const rangeRef = useRef<HTMLDivElement>(null);
  const minHandleRef = useRef<HTMLDivElement>(null);
  const maxHandleRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    setMinValue(value[0]);
    setMaxValue(value[1]);
  }, [value]);

  const calculatePosition = (val: number) => {
    const range = max - min;
    const position = ((val - min) / range) * 100;
    return position;
  };

  const handleMouseMoveMin = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isDragging.current) return;

      const rangeElement = rangeRef.current;
      if (!rangeElement) return;

      const rangeWidth = rangeElement.offsetWidth;
      const rect = rangeElement.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      let newValue = Math.round((offsetX / rangeWidth) * (max - min) + min);

      if (newValue < min) {
        newValue = min;
      } else if (newValue > maxValue) {
        newValue = maxValue;
      }

      setMinValue(newValue);
      onChange([newValue, maxValue]);
    },
    [min, max, maxValue, onChange]
  );

  const handleMouseMoveMax = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isDragging.current) return;

      const rangeElement = rangeRef.current;
      if (!rangeElement) return;

      const rangeWidth = rangeElement.offsetWidth;
      const rect = rangeElement.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      let newValue = Math.round((offsetX / rangeWidth) * (max - min) + min);

      if (newValue > max) {
        newValue = max;
      } else if (newValue < minValue) {
        newValue = minValue;
      }

      setMaxValue(newValue);
      onChange([minValue, newValue]);
    },
    [min, max, minValue, onChange]
  );

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    handleType: "min" | "max"
  ) => {
    e.preventDefault();
    isDragging.current = true;

    if (handleType === "min") {
      document.addEventListener("mousemove", handleMouseMoveMin as any);
    } else if (handleType === "max") {
      document.addEventListener("mousemove", handleMouseMoveMax as any);
    }

    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMoveMin as any);
    document.removeEventListener("mousemove", handleMouseMoveMax as any);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const minPosition = calculatePosition(minValue);
  const maxPosition = calculatePosition(maxValue);

  return (
    <div className="relative w-full h-10">
      <div
        ref={rangeRef}
        className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2"
        onMouseMove={handleMouseMoveMin} // Handle mouse move for min handle
        onMouseUp={handleMouseUp}
      >
        <div
          className="absolute h-1 bg-primary"
          style={{
            left: `${minPosition}%`,
            right: `${100 - maxPosition}%`,
          }}
        ></div>
        <div
          ref={minHandleRef}
          className="absolute w-4 h-4 bg-primary rounded-full cursor-pointer transform -translate-y-1/2"
          style={{ left: `${minPosition}%` }}
          onMouseDown={(e) => handleMouseDown(e, "min")}
        ></div>
        <div
          ref={maxHandleRef}
          className="absolute w-4 h-4 bg-primary rounded-full cursor-pointer transform -translate-y-1/2"
          style={{ left: `${maxPosition}%` }}
          onMouseDown={(e) => handleMouseDown(e, "max")}
        ></div>
      </div>
    </div>
  );
};

export default CustomRangeSlider;
