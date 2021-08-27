import React from 'react'
import { Canvas } from '@react-three/fiber'
import {FlyControls, Billboard, Stars, Plane} from '@react-three/drei'
import './App.css'
function Billboards({ count = 60 }) {
  return [...new Array(count)].map((_, i) => <Billboard lockZ={true} lockX={true} lockY={true} args={[1.5,2]} rotation={[0,Math.random()*3,Math.random()*3]} material-color={'blue'} key={i} position={[Math.random()*20-10, Math.random()*20-10, Math.random()*20-10]} />)
}

function StarsScene() {
    return (
        <>
            <Stars />
        </>
    )
}


export default function App() {
  return (
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <StarsScene/>
        <fog attach="fog" args={['white', 1, 20]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Billboards />
        <FlyControls dragToLook rollSpeed={0.5} movementSpeed={15} />
      </Canvas>
  )
}
