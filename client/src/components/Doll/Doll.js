import './Doll.css';
import React, {Suspense, useRef, useState} from 'react';
import { Canvas  } from '@react-three/fiber';
import {useGLTF, OrbitControls} from '@react-three/drei';




function Model({ ...props }) {
  const group = useRef()
  const { nodes } = useGLTF('doll.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
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
  
  const style= {
    height: "20vh",
    position: "relative",
    top: "20px"
}


  return (

    <div class="doll">
      <Canvas style={style}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
            <OrbitControls />
            <Model scale={0.4}/>
        </Suspense>
      </Canvas>
    </div>
    
  )
}