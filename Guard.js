import {D} from "./Config.js"
import {Sprite} from "./Sprite.js"
import {BuildersHall} from "./BuildersHall.js"

class Guard extends Sprite {
  constructor(world, x, y) {
    super(world, x, y, 15,20,'blue')
    this.vel = this.vel/2
  }
  behave(dt){
    if (this.cd > 0) {
      this.cd -= dt
    } else {
      this.cd = D.PEOPLE_MOVE_CD
      var dirm = Math.floor(Math.random() * 5)
      switch (dirm) {
        case 0:
          this.setStatus(D.W_RIGHT)
          break;
        case 1:
          this.setStatus(D.W_DOWN)
          break;
        case 2:
          this.setStatus(D.W_LEFT)
          break;
        case 3:
          this.setStatus(D.W_UP)
          break;
        case 4:
          this.setStatus(D.STOPPED)
          this.cd = 2 * D.B_CD/*
          var spawner = new Farm(this.world, this.x, this.y)
          if (spawner) {
            this.world.buildings.push(spawner)
            for (var i = this.world.buildings.length - 2; i >= 0; i--) {
              if (this.world.buildings[i].isHit(spawner)) {
                this.world.buildings.pop()
              }
            }
          }*/
          break
      }
    }
  }
  draw(ctx){
    ctx.save()
    ctx.translate(this.x, this.y)
    //ctx.fillStyle = this.color
    //ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h)
    ctx.drawImage(this.world.image, 193, 236, 15, 20,-this.w / 2, -this.h / 2, this.w, this.h)
    ctx.restore()
  }
}

export {Guard}
