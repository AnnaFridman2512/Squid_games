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
      if (frameCounter >= totalFrames ) clearInterval(interval);
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

  const style = {

    width: "80%",
    height: "20vh",
    display: "flex",
    justifyContent: "center",
    transform: "translateX(15%) rotateY(45deg) scale(1.2,1)",
    transformStyle: "preserve-3d",
    position: "absolute",
    top: "5%",
    zIndex: "1",
  };

  return (
    <div className="doll">
      <Canvas style={style}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Model scale={0.31} greenLight={greenLight} />
        </Suspense>
      </Canvas>
    </div>
  );
}
