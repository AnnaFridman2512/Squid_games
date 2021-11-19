import "./Doll.css";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function Model({ ...props }) {
  const group = useRef();
  const { nodes } = useGLTF("doll.glb");

  const [rotationArray, setRotationArray] = useState([
    Math.PI / 3,
    0,
    -Math.PI,
  ]);

  useEffect(() => {
    let frameCounter = 0;
    const totalFrames = 20;

    const interval = setInterval(() => {
      if (frameCounter >= totalFrames) clearInterval(interval);
      setRotationArray([
        Math.PI / 3,
        !props.greenLight
          ? -(frameCounter * Math.PI) / totalFrames
          : -Math.PI + (frameCounter * Math.PI) / totalFrames,
        -Math.PI,
      ]);
      frameCounter++;
    }, 16);
  }, [props.greenLight]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI, 0, 0]}>
        <group rotation={rotationArray} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={
                nodes.squidGameDoll_01_leher_squidGameDoll_01_MAT_0.geometry
              }
              material={
                nodes.squidGameDoll_01_leher_squidGameDoll_01_MAT_0.material
              }
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={
                nodes.squidGameDoll_02_mata_squidGameDoll_02_MAT_0.geometry
              }
              material={
                nodes.squidGameDoll_02_mata_squidGameDoll_02_MAT_0.material
              }
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={
                nodes.squidGameDoll_01_rambut_squidGameDoll_01_MAT_0.geometry
              }
              material={
                nodes.squidGameDoll_01_rambut_squidGameDoll_01_MAT_0.material
              }
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={
                nodes.squidGameDoll_01_bajuDanKaki_squidGameDoll_01_MAT_0
                  .geometry
              }
              material={
                nodes.squidGameDoll_01_bajuDanKaki_squidGameDoll_01_MAT_0
                  .material
              }
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={
                nodes.squidGameDoll_02_kepala_squidGameDoll_02_MAT_0.geometry
              }
              material={
                nodes.squidGameDoll_02_kepala_squidGameDoll_02_MAT_0.material
              }
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={
                nodes.squidGameDoll_01_tangan_squidGameDoll_01_MAT_0.geometry
              }
              material={
                nodes.squidGameDoll_01_tangan_squidGameDoll_01_MAT_0.material
              }
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={
                nodes.squidGameDoll_02_jepit_squidGameDoll_02_MAT_0.geometry
              }
              material={
                nodes.squidGameDoll_02_jepit_squidGameDoll_02_MAT_0.material
              }
            />
          </group>
        </group>
      </group>
    </group>
  );
}

export default function Doll({ greenLight }) {
  const [redLight, setRedLight] = useState(false);

  const style = {
    height: "40vh",
    transform: "translateX(7%) rotateY(45deg) scale(1.2,1)",
    transformStyle: "preserve-3d",
    position: "absolute",
    top: "7%",
    left: "0",
    zIndex: "1",
  };

  return (
    <div class="doll">
      <Canvas style={{height: "20vh"}}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Model scale={0.25} greenLight={greenLight} />
        </Suspense>
      </Canvas>
    </div>
  );
}
