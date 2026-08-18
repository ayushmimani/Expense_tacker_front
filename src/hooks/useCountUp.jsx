import {  useEffect, useState } from "react"

export const useCountUp = (target,duration=800)=>{
   
    const [value,setvalue] =useState(0);

   

    useEffect(()=>{

         let start =0;

        //  duration = kitni der me animation complete karna hai (e.g. 800ms)
        // 16ms ≈ 1 frame (60 FPS screen refresh)
         let increment = target/ (duration/16);

         const animate = ()=>{
            start+=increment;
            if(start<target){
               setvalue(Math.floor(start));
               requestAnimationFrame(animate)
            }else{
                setvalue(target);
            }
         }

         animate();

    },[target,duration])

return value;
}