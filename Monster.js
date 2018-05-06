import {D} from "./Config.js"
import {Sprite} from "./Sprite.js"

class Monster extends Sprite {
  constructor(world, x, y) {
    super(world, x, y, 5, 5, 'purple')
  }
  behave(dt) {
    if (this.world.monsters.length < D.MAX_MONSTERS && this.kills >= D.M_S) {
      this.kills = 0
      //this.w = this.h = D.M_W
      var hunter = new Monster(this.world, this.x, this.y)
      if (hunter)
        this.world.monsters.push(hunter)
    }
    if (this.cd > 0) {
      this.cd -= dt
    } else {
      this.cd = D.M_CD
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
      }
    }
  }
}

export {
  Monster
}
