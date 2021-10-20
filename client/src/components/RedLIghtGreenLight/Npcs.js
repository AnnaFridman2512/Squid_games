
export function Npcs(ctx, npcObj) {

    function Npc(x, y, dx, dy) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.color = 'black'
        this.width = 25
        this.height = 25
        this.dirChangeInt = Math.random() * 1500 + 500
        this.timeSinceDirChange = 0

        this.draw = function () {
            // ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }

        this.movement = () => {
            if (this.x + this.width > window.innerWidth || this.x < 0) {
                this.dx = -this.dx
            }
            if (this.y + this.height > window.innerHeight - 160 || this.y < 0) {
                this.dy = -this.dy
            }
            

            this.x += this.dx
            this.y += this.dy
            this.draw()

        }
    }
    return new Npc(npcObj.x, npcObj.y, npcObj.dx, npcObj.dy)
}