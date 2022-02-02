import React from "react";
import { map } from "lodash";

export const Light = ()=> {
    return (<>
            <group>
                {
                    map(new Array(5), (el,index) =>{
                        return <pointLight key={index} position={[0, 0, -index * 10 -1568]} intensity={0.5} distance={15}  />

                    })
                }
            </group>
        </>
    );
}
