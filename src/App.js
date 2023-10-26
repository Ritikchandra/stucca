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
      name: "Sarthak Arora",
      dept: "Department of Visual Media",
      photo: sarthak,
    },
    {
      id: 2,
      name: "Supreeth MK",
      dept: "Department of Reception and Accommodation",
      photo: supreeth,
    },
    {
      id: 3,
      name: "Shaurya Parikh",
      dept: "Department of Sponsorship and Marketing",
      photo: shaurya,
    },
    {
      id: 4,
      name: "Aayush Paurana",
      dept: "Department of Controls",
      photo: ayush,
    },
    {
      id: 5,
      name: "Vaibhav Jain",
      dept: "Department of Publications and Correspondence",
      photo: vaibhav,
    },
    {
      id: 6,
      name: "Adarsh Goel",
      dept: "Art, Design and Publicity",
      photo: adarsh,
    },
    {
      id: 7,
      name: "Abhinav Lamba",
      dept: "General Secretary, Students' Union",
      photo: abhinav,
    },
    {
      id: 8,
      name: "Sarthak Agarwal",
      dept: "President, Students' Union",
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
  return <>
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
