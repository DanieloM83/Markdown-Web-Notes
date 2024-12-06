import { useState, useCallback, useEffect, RefObject, useMemo } from "react";

interface UseDraggableReturn {
  handleDragStart: (event: React.DragEvent<HTMLElement>) => void;
  handleDragEnd: (event: React.DragEvent<HTMLElement>) => void;
  handleDrag: (event: React.DragEvent<HTMLElement>) => void;
}

type Position = { x: number; y: number };

const useDraggable = (ref: RefObject<HTMLDivElement>, initialX = 0, initialY = 0): UseDraggableReturn => {
  const [position, setPosition] = useState<Position>({ x: initialX, y: initialY });
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  const EMPTYIMG = useMemo(() => new Image(), []);

  // Set the dragOffset (how much the click point is shifted from the left-top of the element)
  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setDragOffset({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });

        event.dataTransfer.setDragImage(EMPTYIMG, 0, 0);
      }
    },
    [ref]
  );

  // Calculate the new position of the element (relative to the parent) according to mouse position and dragOffset
  const handleDrag = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      if (event.clientX <= 0 && event.clientY <= 0) return;
      event.preventDefault();

      const parentRect = ref.current?.parentElement?.getBoundingClientRect();
      if (ref.current && parentRect) {
        const newX = Math.max(0, (event.clientX - dragOffset.x - parentRect.left) / parentRect.width);
        const newY = Math.max(0, (event.clientY - dragOffset.y - parentRect.top) / parentRect.height);

        setPosition({ x: newX, y: newY });
        event.dataTransfer.setDragImage(EMPTYIMG, 0, 0);
      }
    },
    [dragOffset, ref, EMPTYIMG]
  );

  const handleDragEnd = useCallback((event: React.DragEvent<HTMLElement>) => {}, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.draggable = true;
    element.addEventListener("drag", handleDrag as unknown as EventListener);
    element.addEventListener("dragend", handleDragEnd as unknown as EventListener);

    return () => {
      element.removeEventListener("drag", handleDrag as unknown as EventListener);
      element.removeEventListener("dragend", handleDragEnd as unknown as EventListener);
    };
  }, [handleDrag, handleDragEnd, ref]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.left = `${position.x * 100}%`;
      ref.current.style.top = `${position.y * 100}%`;
      ref.current.style.position = "absolute";
    }
  }, [position, ref]);

  return { handleDragStart, handleDragEnd, handleDrag };
};

export default useDraggable;
