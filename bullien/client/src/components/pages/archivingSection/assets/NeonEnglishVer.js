/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, {forwardRef, useEffect, useRef, useState} from 'react'
import {useGLTF} from '@react-three/drei'
import {useFrame} from "@react-three/fiber";
import HoverHtml from "./HoverHtml";
import {hover, unhover} from "./hoverFunction";

const Model = forwardRef((props,ref) => {
    const group = useRef()
    const {nodes, materials} = useGLTF('/NeonEnglishVer.glb')
    const time = useRef(0);
    const positionX = 8;
    const rotationY = Math.PI / 5;
    useFrame(() => {
        time.current += 0.03;
        group.current.rotation.y = rotationY + Math.sin(time.current) * 0.07
        group.current.position.x = positionX + Math.sin(time.current) * 0.1
    })
    const [hovered, setHover] = useState(false)
    useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered])
    return (
            <group ref={group} {...props} dispose={null} position={[8, 3, -1575]}
                   rotation={[0, Math.PI / 5, Math.PI / 11]}>
                <mesh
                    geometry={nodes.Text003.geometry}
                    material={materials['Material.009']}
                    position={[-0.26, 1.75, -2.1]}
                    rotation={[Math.PI, -1.57, Math.PI]}
                    scale={2.06}
                />
                <mesh
                    geometry={nodes.BezierCurve004.geometry}
                    material={materials.Material}
                    position={[-0.26, 3.11, 0.01]}
                    rotation={[Math.PI, -1.57, Math.PI]}
                    scale={2.14}
                />
                <mesh geometry={nodes.Cube.geometry} material={materials['Material.001']}
                      position={[0.76, 2.33, 0.82]}
                      onPointerOver={e => hover(e,setHover)}
                      onPointerOut={e => unhover(e,setHover)}
                />
                {hovered ? <HoverHtml position={[5,3,1]} paragraph={'About us'}/> : null}

            </group>


    )
})
export default Model
useGLTF.preload('/NeonEnglishVer.glb')