import React from 'react';

export const BlobBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Cloud White Canvas Base */}
      <div className="absolute inset-0 bg-[#FFFDF9]" />

      {/* Blob 1: Bubblegum Pink (#FF3E9D) */}
      <div
        className="animate-blob-1 absolute top-[-10%] left-[-10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-[100px] opacity-35 bg-[#FF3E9D]"
      />

      {/* Blob 2: Zest Yellow (#FFD23F) */}
      <div
        className="animate-blob-2 absolute top-[20%] right-[-15%] w-[450px] h-[450px] md:w-[650px] md:h-[650px] rounded-full blur-[110px] opacity-40 bg-[#FFD23F]"
      />

      {/* Blob 3: Sky Blue (#3EC1FF) */}
      <div
        className="animate-blob-3 absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-[120px] opacity-35 bg-[#3EC1FF]"
      />

      {/* Blob 4: Grass Green (#3DDC84) */}
      <div
        className="animate-blob-4 absolute bottom-[15%] right-[20%] w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full blur-[100px] opacity-30 bg-[#3DDC84]"
      />

      {/* Subtle halftone/dot texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1B1B2F_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.03]" />
    </div>
  );
};
