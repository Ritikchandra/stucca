import "./App.css";
import bgImage from "./bgImage.png"
import logo from "./logo.png"
import leftPumpkin from "./leftPumpkin.png"
import rightPumpkin from "./rightPumpkin.png"
import shaurya from "./shaurya.png"
import supreeth from "./supreeth.png"
import ayush from "./ayush.png"
import sarthak from "./sarthak.png"
import vaibhav from "./vaibhav.png"
import abhinav from "./abhinav.png"
import prez from "./prez.png"
import adarsh from "./adarsh.png"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
function App() {
  const data = [
    {
      id: 1,
      dept: "Sarthak Arora",
      name: "Department of Visual Media",
      photo: sarthak,
    },
    {
      id: 5,
      dept: "Supreeth MK",
      name: "Department of Reception and Accommodation",
      photo: supreeth,
    },
    {
      id: 6,
      dept: "Shaurya Parikh",
      name: "Department of Sponsorship and Marketing",
      photo: shaurya,
    },
    {
      id: 4,
      dept: "Aayush Paurana",
      name: "Department of Controls",
      photo: ayush,
    },
    {
      id: 3,
      dept: "Vaibhav Jain",
      name: "Department of Publications and Correspondence",
      photo: vaibhav,
    },
    {
      id: 2,
      dept: "Adarsh Goel",
      name: "Department of Art, Design and Publicity",
      photo: adarsh,
    },
    {
      id: 7,
      dept: "Abhinav Lamba",
      name: "General Secretary, Students' Union",
      photo: abhinav,
    },
    {
      id: 8,
      dept: "Sarthak Agarwal",
      name: "President, Students' Union",
      photo: prez,
    },
  ];
  const [activeStuccan, setActiveStuccan] = useState(1);
  useEffect(() => {
    // Add event listener for keydown event
    function handleKeyPress(event) {
      const pressedKey = parseInt(event.key, 10);
      // Check if the pressed key is between 1 and 9 and update activeStuccan
      if (pressedKey >= 1 && pressedKey <= 8) {
        setActiveStuccan(pressedKey);
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    
    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty dependency array ensures the effect runs only once
  const selectedStuccan = data.find((stuccan) => stuccan.id === activeStuccan);
  const [pumpkinAnimation, setPumpkinAnimation] = useState(false);

  // ... (rest of your code)

  // Add a useEffect to trigger the pumpkin animation when activeStuccan changes
  useEffect(() => {
    // Set the pumpkin animation to true to trigger the animation
    setPumpkinAnimation(true);

    // Wait for the animation duration (1 second) and then reset the pumpkin animation
    const timeout = setTimeout(() => {
      setPumpkinAnimation(false);
    }, 1000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [activeStuccan]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const assets = [
      bgImage,
      logo,
      leftPumpkin,
      rightPumpkin,
      shaurya,
      supreeth,
      ayush,
      sarthak,
      vaibhav,
      abhinav,
      prez,
      adarsh
    ];

    const loadAssets = async () => {
      try {
        await Promise.all(assets.map((asset) => new Promise((resolve) => {
          const img = new Image();
          img.src = asset;
          img.onload = resolve;
          img.onerror = resolve; // Handling error case if the image fails to load
        })));
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading assets:", error);
        setIsLoading(false); // Set isLoading to false to prevent indefinite loading in case of an error
      }
    };

    loadAssets();
  }, []); 
  return <>
  {isLoading && (
    <div className="loaderWrapper">
      Loading...
    </div>
  )}
        <div className="pageWrapper">
          <img src={bgImage} alt="" className="bgImage"/>
          <div>
          <img src={logo} alt="Logo" className="logo"/>
          </div>
          <motion.img src={leftPumpkin} alt="Image Not Found"
          className={`leftPumpkin ${pumpkinAnimation ? 'animatePumpkin' : ''}`}
          initial={false}
          animate={pumpkinAnimation ? { rotate: -30, x: -200 } : {}}
          transition={{ duration: 1 }}/>
          <motion.img src={rightPumpkin} alt="Image Not Found" className={`rightPumpkin ${pumpkinAnimation ? 'animatePumpkin' : ''}`}
        initial={false}
        animate={pumpkinAnimation ? { rotate: 30, x: 200 } : {}}
        transition={{ duration: 1 }}/>

          <div className="mainContent">
            {/* {data.map(item => (
          <div
          key={item.id}
            className={`stuccan ${activeStuccan === item.id ? 'active' : ''}`}
            onClick={() => setActiveStuccan(item.id)}>
            <div className="photo">
              <img src={item.photo} alt={item.name} />
            </div>
            <div className="text">
              <span className="deptName">{item.dept}</span>
              <span className="stuccanName">{item.name}</span>
            </div>
          </div>
        ))} */}
        <AnimatePresence initial={false} mode="wait">
          {selectedStuccan && (
            <motion.div
              key={selectedStuccan.id}
              className="stuccan"
              initial={{ opacity: 0}}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0}}
              transition={{duration:1}}
            >
              <div className="photo">
                <img src={selectedStuccan.photo} alt={selectedStuccan.name} />
              </div>
              <div className="text">
                <span className="deptName">{selectedStuccan.dept}</span>
                <span className="stuccanName">{selectedStuccan.name}</span>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
          </div>
        </div>

    </>;
}

export default App;
