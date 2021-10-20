export default function Light(ctx) {
    function Light() {
        this.x = window.innerWidth / 2
        this.y = 20
        this.color = 'red'
        this.width = 50
        this.height = 50
        this.counter = 0


        this.draw = function () {

            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height);

        }

        this.colorChange = (rand) => {
            this.counter++
            if (this.counter > rand) {
                this.color = 'green'
            }
            if (this.counter > 2 * rand) {
                this.color = 'red'
                this.counter = 0
            }
            this.draw()

        }
    }
    return new Light()
}