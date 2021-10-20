import React, { useEffect, useRef } from 'react'
import data from './data';
import { Npcs } from './Npcs';

export default function Game() {
    const canvasRef = useRef(null);
    useEffect(() => {

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        // canvas styling
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight - 160
        canvas.style.backgroundColor = 'beige'
        // starting to draw
        let npc = Npcs(ctx, data.npcObj)
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            npc.draw()
            npc.movement()


            requestAnimationFrame(render)
        }
        render()


    }, [])
    return <div>
        <h1>Welcome to the squidGame</h1>
        <canvas ref={canvasRef}></canvas>
    </div>
}