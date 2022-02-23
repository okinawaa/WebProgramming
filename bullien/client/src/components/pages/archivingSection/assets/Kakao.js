/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, {useEffect, useRef, useState} from 'react'
import {useGLTF} from '@react-three/drei'
import {useFrame} from "@react-three/fiber";
import HoverHtml from "./HoverHtml";
import {hover, unhover} from "./hoverFunction";
import {kakaoClick} from "../signButtonEventHandler";

const Model = (props) => {
    const group = useRef()
    const {nodes, materials} = useGLTF(`/kakao1.glb`)
    const time = useRef(0);
    const positionY = 9;
    const rotationZ = -Math.PI / 10;
    useFrame(() => {
        time.current += 0.03;
        group.current.rotation.z = rotationZ + Math.sin(time.current) * 0.07
        group.current.position.y = positionY + Math.sin(time.current) * 0.07
    })
    const [hovered, setHover] = useState(false)
    useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered])

    return (
        <>
            <group ref={group} {...props} dispose={null} position={[-8, 9, -1589]}
                   rotation={[0, -Math.PI / 3, -Math.PI / 10]}
                   onClick={(e) => kakaoClick(e)}
            >
                <mesh geometry={nodes._Background.geometry} material={materials.Background} scale={[1.06, 2.51, 2.51]}
                      onPointerOver={e => hover(e,setHover)}
                      onPointerOut={e => unhover(e,setHover)}/>
                <mesh
                    geometry={nodes.Cloud.geometry}
                    material={materials.brownCloud}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={1.54}
                />
                <mesh
                    geometry={nodes.T.geometry}
                    material={nodes.T.material}
                    position={[0.68, 0.01, 0.95]}
                    rotation={[0, 0, -Math.PI / 2]}
                />
                <mesh
                    geometry={nodes.L.geometry}
                    material={nodes.L.material}
                    position={[0.67, 0, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                />
                <mesh
                    geometry={nodes.K.geometry}
                    material={nodes.K.material}
                    position={[0.68, 0, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                />
                <mesh
                    geometry={nodes.A.geometry}
                    material={nodes.A.material}
                    position={[0.67, 0, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                />
                {hovered ? <HoverHtml paragraph={'kakao channel 로 이동하기'}/> : null}
            </group>

        </>
    )
}
export default Model
useGLTF.preload('/kakao1.glb')