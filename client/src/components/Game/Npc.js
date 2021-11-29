import "./Game.css";
import {  motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Npc({
  index,
  number,
  gameIsOn,
  greenLight,
  reportNpcBoundries,
  checkHide,
  killNpc,
  checkForCoveringNpcs,
  //resetPosition,
  //image,
}) {
  const controls = useAnimation();
  const npcRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  let npcWidth = 40;
  let npcHeigth = 35;
  let maxWidth = window.innerWidth - npcWidth;
  let maxHeight = window.innerHeight - npcHeigth; 
  let newRight = Math.floor(Math.random() * maxWidth);
  let newLeft = Math.floor(Math.random() *-maxWidth);
  let newTop = Math.floor(Math.random() * -maxHeight*2);


  useEffect(() => {
    checkHide(npcRef?.current?.getBoundingClientRect());
  }, [checkForCoveringNpcs, checkHide]);

  useEffect(() => {
    if (!playing || !gameIsOn){
      return;
    } else if(greenLight){
        let npcX = setInterval(() => {
          reportNpcBoundries(npcRef?.current?.getBoundingClientRect(), index);
        }, 100);

        if(npcX * 60 < maxWidth){
          controls.start(() => ({
            x: newRight,
            y: newTop,
            transition: {duration: 20}
          }));  
        }else{
          controls.start(() => ({
           x: newLeft,
           y: newTop,
           transition: {duration: 20}
        }));  
       }

    }else{//If !greenLight stop random npcs
      if (Math.random() > 0.25) {
        controls.stop();
      } else {
        controls.start(() => ({
          x: newRight,
          y: newTop,
          transition: {
            duration: 15,
          },
        }));
        killNpc(number);
        setPlaying(false);
        setTimeout(() => {
          controls.stop();
        }, 1000);
      }
    }

  }, [checkForCoveringNpcs, gameIsOn, greenLight, playing]);

  return (
    <motion.div
      ref={npcRef}
      className="npc"
      animate={controls}
      style={{
        left: `${index * 14}%`,
      }}
    >
      {number}
    </motion.div>
  );
}