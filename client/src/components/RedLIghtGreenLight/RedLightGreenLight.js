import React, { useEffect, useRef } from 'react'
import data from './data';
import { Npcs } from './Npcs';
import Light from './Light';


export default function RedLIghtGreenLight() {
    const canvasRef = useRef(null);
    useEffect(() => {

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        // canvas styling
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight - 160
        canvas.style.backgroundColor = 'beige'
        // creating and drawing npcs
        const npcArr = []
        for (let i = 0; i < 20; i++) {
            npcArr[i] = Npcs(ctx, data.npcObj)
            data.npcObj.x += window.innerWidth / 22
        }
        let light = Light(ctx)



        let lastTime = 0

        const render = (timestamp) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            let deltaTime = timestamp - lastTime;
            lastTime = timestamp

            npcArr.forEach((npc => {
                npc.timeSinceDirChange += deltaTime
                if (npc.timeSinceDirChange > npc.dirChangeInt) {
                    npc.dx *= -1
                    npc.timeSinceDirChange = 0

                }
            }

            ))



            npcArr.forEach((npc => npc.movement()))
            light.colorChange(Math.random() * 100 + 100)



            requestAnimationFrame(render)
        }
        render(0)


    }, [])
    return <div>
        <h1>Welcome to the Red Light Green Light</h1>
        <canvas ref={canvasRef}></canvas>
    </div>
}