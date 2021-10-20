export function Npcs(ctx, npcObj) {

    let npc = new Npc(npcObj.x, npcObj.y, npcObj.dx, npcObj.dy)
    npc.draw()


    function Npc(x, y, dx, dy) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.color = 'black'

        this.draw = function () {
            ctx.fillRect(this.x, this.y, 150, 100)
        }

        this.movement = () => {
            this.x++
            this.y++

        }
    }
    return npc
}