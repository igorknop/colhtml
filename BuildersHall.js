import {D} from "./Config.js"
import {Sprite} from "./Sprite.js"
import {Builder} from "./Builder.js"
import {Farmer} from "./Farmer.js"
import {Warrior} from "./Warrior.js"
import {Guard} from "./Guard.js"

class BuildersHall extends Sprite{
  constructor(world,x,y){
    super(world,x,y,10,10,'grey')
  }
  behave(dt){
    if (this.cd > 0) {
      this.cd -= dt
    } else {
      switch (this.world.creating) {
        case D.A_WARRIORS:
          this.cd = D.PEOPLE_WARRIOR_SPAWN_CD
          var walker = new Warrior(this.world,this.x, this.y)
          break;
        case D.A_GUARDS:
          this.cd = D.PEOPLE_GUARD_SPAWN_CD
          var walker = new Guard(this.world,this.x, this.y)
          break;
        case D.A_FARMERS:
          this.cd = D.PEOPLE_FARMER_SPAWN_CD
          var walker = new Farmer(this.world,this.x, this.y)
          break;
        default:
          this.cd = D.PEOPLE_BUILDER_SPAWN_CD
          var walker = new Builder(this.world,this.x, this.y)
      }
      if (walker) this.world.people.push(walker)
    }
  }
}

export {BuildersHall}
