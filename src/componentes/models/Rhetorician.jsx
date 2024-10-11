/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 .\public\models\rhetorician.glb 
Author: engine9 (https://sketchfab.com/engine9)
License: CC-BY-SA-4.0 (http://creativecommons.org/licenses/by-sa/4.0/)
Source: https://sketchfab.com/3d-models/rhetorician-a89f035291d843069d73988cc0e25399
Title: Rhetorician
*/

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { motion } from "framer-motion";
import { useFrame } from "@react-three/fiber";
import { pingpong } from "three/src/math/MathUtils";
import * as THREE from "three";

export function Rheto(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./models/rhetorician.glb");
  const { actions, names } = useAnimations(animations, group);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  console.log("🧑", names);

  useEffect(() => {
    actions[names[0]]
      .fadeIn(0)
      .setDuration(5)
      .setLoop(THREE.LoopPingPong, Infinity)
      .play();
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normaliza a posição do mouse para valores entre -1 e 1
      const x = (clientX / innerWidth) * 2 - 1;
      const y = -(clientY / innerHeight) * 2 + 1;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Usamos o useFrame para atualizar a rotação a cada frame renderizado
  useFrame(() => {
    if (group.current) {
      // Aplica a rotação suavemente com base na posição do mouse
      group.current.rotation.y = mousePosition.x * 0.1; // Sensibilidade para o eixo Y
    }
  });

  return (
    <group
      ref={group}
      position={[0, -2.2, 4]}
      rotation={[0, 0, 0]}
      scale={0.8}
      {...props}
      dispose={null}
    >
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, Math.PI / 2.8]}
        >
          <group name="Root">
            <group name="mentor_roman_retopo" position={[-0.266, 0.12, 1.326]}>
              <mesh
                castShadow
                name="mentor_roman_retopo_0"
                geometry={nodes.mentor_roman_retopo_0.geometry}
                material={materials.Stone}
              />
            </group>
            <group
              name="Empty"
              position={[0.161, -0.17, 4.808]}
              rotation={[-0.104, 0.099, 0.002]}
              scale={0.892}
            >
              <group name="nimbus002">
                <mesh
                  castShadow
                  name="nimbus002_0"
                  geometry={nodes.nimbus002_0.geometry}
                  material={materials.Crown}
                />
              </group>
              <group name="nimbus001">
                <mesh
                  castShadow
                  name="nimbus001_0"
                  geometry={nodes.nimbus001_0.geometry}
                  material={materials.Crown}
                />
              </group>
              <group name="nimbus003">
                <mesh
                  castShadow
                  name="nimbus003_0"
                  geometry={nodes.nimbus003_0.geometry}
                  material={materials.Crown}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./models/rhetorician.glb");
