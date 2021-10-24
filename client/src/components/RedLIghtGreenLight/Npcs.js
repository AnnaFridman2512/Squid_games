
export function Npcs(ctx, npcObj) {

    function Npc(x, y, dx, dy) {
        this.x = x
        this.y = y
        this.dx = Math.random() * 0.5 + 1 || dx
        this.dy = Math.random() * -0.5 - 3 || dy
        this.color = 'black'
        this.width = 25
        this.height = 25
        this.dirChangeInt = Math.random() * 1500 + 500
        this.timeSinceDirChange = 0

        this.draw = function () {

            ctx.fillStyle = 'blue'
            ctx.strokeStyle = 'red'
            ctx.lineWidth = 10
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
            ctx.fill()
        }

        this.movement = () => {
            if (this.x + this.width > window.innerWidth || this.x < 0) {
                this.dx = -this.dx
            }
            if (this.y + this.height > window.innerHeight - 130 || this.y < 0) {
                this.dy = -this.dy
            }


            this.x += this.dx
            this.y += this.dy
            this.draw()

        }
    }
    return new Npc(npcObj.x, npcObj.y)
}