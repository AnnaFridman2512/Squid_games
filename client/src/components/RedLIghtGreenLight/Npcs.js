export function Npcs(ctx, npcObj) {

    let npc = new Npc(npcObj.x, npcObj.y, npcObj.dx, npcObj.dy)
    npc.draw()


    function Npc(x, y, dx, dy) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.color = 'black'
        this.width = 100
        this.height = 100

        this.draw = function () {
            ctx.fillRect(this.x, this.y, 150, 100)
        }

        this.movement = () => {
            if (this.x + (this.width / 2) > window.innerWidth || this.x - this.width / 2 < 0) {
                this.dx = -this.dx
            }
            if (this.y + (this.width / 2) > window.innerHeight || this.y - this.width / 2 < 0) {
                this.dy = -this.dy
            }

            this.x += this.dx
            this.y += this.dy
            this.draw()

        }
    }
    return npc
}