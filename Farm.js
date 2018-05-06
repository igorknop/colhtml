import {D} from "./Config.js"
import {Sprite} from "./Sprite.js"
import {Builder} from "./Builder.js"
import {Farmer} from "./Farmer.js"
import {Warrior} from "./Warrior.js"
import {Guard} from "./Guard.js"

class Farm extends Sprite{
  constructor(world,x,y){
    super(world,x,y,10,10,'yellow')
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
}

export {Farm}
