import { useState } from "react";

// Hook to use the image viewer
export const useImageViewer = () => {
  const [viewerState, setViewerState] = useState<{
    
    isOpen: boolean;
    images: string[];
    initialIndex: number;
  }>({
    isOpen: false,
    images: [],
    initialIndex: 0,
  });

  const openViewer = (images: string[], initialIndex = 0) => {
    setViewerState({
      isOpen: true,
      images,
      initialIndex,
    });
  };

  const closeViewer = () => {
    setViewerState({
      isOpen: false,
      images: [],
      initialIndex: 0,
    });
  };

  return {
    viewerState,
    openViewer,
    closeViewer,
  };
};