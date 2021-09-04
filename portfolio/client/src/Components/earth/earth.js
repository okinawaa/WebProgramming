import {useFrame, useLoader} from "@react-three/fiber";
import {TextureLoader} from "three";
import EarthDayMap from '../../img/earthTextures/8k_earth_daymap.jpg'
import EarthNormalMap from '../../img/earthTextures/8k_earth_normal_map.jpg'
import EarthSpecularMap from '../../img/earthTextures/8k_earth_specular_map.jpg'
import EarthCloudsMap from '../../img/earthTextures/8k_earth_clouds.jpg'
import { useRef} from "react";
import {Stars} from "@react-three/drei";
import * as THREE from 'three';

function Earth(props) {
    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
        TextureLoader,
        [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
    )

    const earthRef = useRef();
    const cloudsRef = useRef();
    useFrame(({clock}) => {
        const elapseTime = clock.getElapsedTime();
        earthRef.current.rotation.y = elapseTime / 6;
        cloudsRef.current.rotation.y = elapseTime / 6;
    });


    return (
        <>
            {
                props.theme === 'light-theme' ? <ambientLight color="#FFF" intensity={5}/>
                    : <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2}/>
            }
            <Stars
                radius={300}
                depth={60}
                count={20000}
                factor={7}
                saturation={1}
                fade={true}
            />
            <mesh ref={cloudsRef} position={[0, 0, 3]}>
                <sphereGeometry args={[1.005, 32, 32]}/>
                <meshPhongMaterial
                    map={cloudsMap}
                    opacity={0.4}
                    depthWrite={true}
                    transparent={true}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <mesh ref={earthRef} position={[0, 0, 3]}>
                <sphereGeometry args={[1, 32, 32]}/>
                <meshPhongMaterial
                    specularMap={specularMap}/>
                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    metalness={0.4}
                    roughness={0.2}
                />
            </mesh>
        </>


    )
}

export default Earth;