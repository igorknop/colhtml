import {D} from "./Config.js"
import {Sprite} from "./Sprite.js"
import {Farm} from "./Farm.js"

class Farmer extends Sprite {
  constructor(world, x, y) {
    super(world, x, y, 13, 16, 'yellow')
  }
  behave(dt) {
    if (this.cd > 0) {
      this.cd -= dt
    } else {
      this.cd = D.PEOPLE_MOVE_CD
      let dirm = Math.floor(Math.random() * 5)
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
          this.cd = 2 * D.B_CD
          if (this.world.buildings.length >= D.MAX_BUILDINGS)
            return
          let spawner = new Farm(this.world, Math.floor(this.x/32)*32+10, Math.floor(this.y/32)*32+20)
          let ok = true
          for (let i = this.world.buildings.length - 1; i >= 0; i--) {
            if (this.world.buildings[i].isHit(spawner)) {
              ok = false
            }
          }
          if (ok) {
            this.world.buildings.push(spawner)
          }
          break
      }
    }
  }
  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    //ctx.fillStyle = this.color
    //ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h)
    ctx.drawImage(this.world.image, 99, 240, 13, 16, -this.w / 2, -this.h / 2, this.w, this.h)
    ctx.restore()
  }
}

export {
  Farmer
}
