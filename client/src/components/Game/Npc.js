import "./Game.css";
import { animate, motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Npc({
  index,
  number,
  key,
  gameIsOn,
  greenLight,
  reportNpcBoundries,
  checkHide,
  killNpc,
  npcsAmount,
  checkForCoveringNpcs,
  resetPosition,
  image,
}) {
  const controls = useAnimation();
  const npcRef = useRef(null);
  let xRand = Math.floor(
    window.innerWidth * ((npcsAmount - index) / npcsAmount)
  );
  let yTand = Math.ceil(-window.screen.height);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    setInterval(() => {
      reportNpcBoundries(npcRef?.current?.getBoundingClientRect(), index);
    }, 100);
  }, []);

  useEffect(() => {}, [resetPosition]); //HELP

  useEffect(() => {
    checkHide(npcRef?.current?.getBoundingClientRect());
  }, [checkForCoveringNpcs]);

  useEffect(() => {
    if (!gameIsOn || !playing) return;
    if (greenLight) {
      controls.start((i) => ({
        x: xRand,
        y: yTand,
        transition: {
          duration: 20,
        },
      }));
    }
  }, [gameIsOn, greenLight]);

  useEffect(() => {
    if (!gameIsOn) {
      controls.stop();
    }
  }, [gameIsOn]);

  useEffect(() => {
    if (!gameIsOn || !playing) return;

    if (!greenLight) {
      if (Math.random() > 0.25) {
        controls.stop();
      } else {
        controls.start((i) => ({
          x: xRand,
          y: yTand,
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
  }, [greenLight, gameIsOn]);

  const calcaluteLeft = () => {};

  return (
    <motion.div
      ref={npcRef}
      className="playerInGame"
      animate={controls}
      style={{
        left: `${index * 14}%`,
      }}
    >
      {number}
    </motion.div>
  );
}
