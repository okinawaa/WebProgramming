import React, {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";

export const Rig = ({children, pressEnter}) => {
    const outer = useRef(null)
    const inner = useRef(null)
    useFrame(() => {
        if (pressEnter) {
            outer.current.position.z = THREE.MathUtils.lerp(outer.current.position.z, 1570, 0.05)
        }
    })
    return (
        <group position={[0, 0, 1236.5]} ref={outer}>
            <group ref={inner}>{children}</group>
        </group>
    )
}
