import './Doll.css';
import React, {Suspense, useRef, useState, useEffect} from 'react';
import { Canvas  } from '@react-three/fiber';
import {useGLTF, OrbitControls} from '@react-three/drei';
import { gsap, Power3} from 'gsap';



function Model({ ...props }) {
  const group = useRef(null)
  const [turn, setTurn] = useState([-Math.PI / 2, 0, -3.15]);
  const [scaleDoll, setScaleDoll] = useState(0.3);
  const { nodes } = useGLTF('doll.glb')
  // const lookBack = () => setTurn([-Math.PI / 2, 0, -3.15]);
 const lookFront= () => setTurn([-Math.PI / 2.2, 0, 0]);





  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={turn} scale={scaleDoll}  onClick={lookFront}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.squidGameDoll_01_leher_squidGameDoll_01_MAT_0.geometry}
              material={nodes.squidGameDoll_01_leher_squidGameDoll_01_MAT_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.squidGameDoll_02_mata_squidGameDoll_02_MAT_0.geometry}
              material={nodes.squidGameDoll_02_mata_squidGameDoll_02_MAT_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.squidGameDoll_01_rambut_squidGameDoll_01_MAT_0.geometry}
              material={nodes.squidGameDoll_01_rambut_squidGameDoll_01_MAT_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.squidGameDoll_01_bajuDanKaki_squidGameDoll_01_MAT_0.geometry}
              material={nodes.squidGameDoll_01_bajuDanKaki_squidGameDoll_01_MAT_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.squidGameDoll_02_kepala_squidGameDoll_02_MAT_0.geometry}
              material={nodes.squidGameDoll_02_kepala_squidGameDoll_02_MAT_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.squidGameDoll_01_tangan_squidGameDoll_01_MAT_0.geometry}
              material={nodes.squidGameDoll_01_tangan_squidGameDoll_01_MAT_0.material}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.squidGameDoll_02_jepit_squidGameDoll_02_MAT_0.geometry}
              material={nodes.squidGameDoll_02_jepit_squidGameDoll_02_MAT_0.material}
            />
          </group>
        </group>
      </group>
    </group>
  )
}


export default function Doll() {
  const [redLight, setRedLight] = useState(false);
  



  return (

    <div class="doll">
      <Canvas style={{height: "20vh"}}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
            <OrbitControls />
            <Model />
        </Suspense>
      </Canvas>
    </div>
    
  )
}