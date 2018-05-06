import {D} from "./Config.js"
import {Sprite} from "./Sprite.js"
import {Builder} from "./Builder.js"
import {Farmer} from "./Farmer.js"
import {Warrior} from "./Warrior.js"
import {Guard} from "./Guard.js"

class Farm extends Sprite{
  constructor(world,x,y){
    super(world,x,y,32,32,'yellow')
    this.cd = D.BUILDING_FARM_PROD_CD
  }
  behave(dt){
    if (this.cd > 0) {
      this.cd -= dt
    } else {
      this.cd = D.BUILDING_FARM_PROD_CD
      this.world.food += 5
    }
  }
  move(dt){}
  draw(ctx){
    ctx.save()
    ctx.translate(this.x, this.y)
    //ctx.fillStyle = this.color
    //ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h)
    ctx.drawImage(this.world.image2, 290, 2036, 62, 61,-this.w / 2, -this.h / 2, this.w, this.h)
    ctx.restore()
  }
}

export {Farm}
