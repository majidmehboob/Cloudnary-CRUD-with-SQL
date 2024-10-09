"use client"
import { CldUploadWidget } from 'next-cloudinary';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const navitems = ['All', 'Images', 'Videos'];
  const [url, setUrl] = useState<{ url: string; format: string } | null>(null);
  const [file, setFile] = useState<number>(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]); // Use useRef instead of useState
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  const hoveredTab = hoveredIdx !== null ? tabsRef.current[hoveredIdx]?.getBoundingClientRect() : null;

  return (
    <div className="">
      <motion.div
        className="shadow-md min-h-xl md:pb-10 pb-2 bg-white text-left p-5 flex justify-between gap-2 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CldUploadWidget
          uploadPreset="todo_app"
          onSuccess={(info: any) => {
            setUrl({ url: info?.secure_url, format: info?.resource_type });
          }}
        >
          {({ open }) => (
            <button
              className="text-md p-2 bg-green-400 text-white lowercase rounded-md w-full md:w-auto"
              onClick={()=>open} // Corrected function call to open the widget
            >
              {!url ? 'Upload File' : 'Loading'}
            </button>
          )}
        </CldUploadWidget>
      </motion.div>

      <motion.div
        onPointerLeave={() => setHoveredIdx(null)}
        className="z-10 relative flex justify-center md:gap-10 gap-5" // Added padding for better spacing
  
      >
        {navitems.map((item, index) => (
          <button
            key={index}
            ref={(el) => { tabsRef.current[index] = el }} // Use useRef to avoid unnecessary re-renders
            onClick={() => setFile(index)}
            onPointerEnter={() => setHoveredIdx(index)}
            className={`text-black p-2 uppercase text-lg font-thin font-mono relative`} // Adjust padding
          >
            {item}
          </button>
        ))}

        <AnimatePresence>
          {hoveredTab && (
            <motion.div
              className="absolute top-0 cursor-pointer -z-10 left-0 bg-white border-black border-2 rounded-md" // Ensure it's placed behind other elements
              initial={{
                left:hoveredTab.left,
                width: hoveredTab.width,
                height: hoveredTab.height, // Adjust the height to be like a hover underline
                opacity: 0,
              }}
              animate={{
                left: hoveredTab.left,
                
                width: hoveredTab.width,
                height:hoveredTab.height,
                opacity: 1,
              }}
              exit={{ left: hoveredTab.left,
                width: hoveredTab.width,
                height:hoveredTab.height,
                opacity: 0,}}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default NavBar;
