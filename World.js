import {D} from "./Config.js"
import {Sprite} from "./Sprite.js"
import {Builder} from "./Builder.js"
import {Monster} from "./Monster.js"
import {BuildersHall} from "./BuildersHall.js"

class World {
  constructor() {
    this.dt = 0
    this.prev = 0
    this.raf
    this.dists = []
    this.buildings = []
    this.monsters = []
    this.people = []
    this.food = 50
    this.foodcd = 0
    this.creating = D.A_BUILDERS
    this.setup()
    this.image = new Image()
    this.image.src = "0x72_16x16DungeonTileset.v4.png"
    this.image2 = new Image()
    this.image2.src = "tileset-pokemon_dawn.png"
  }

  setup() {
    this.dt = 0
    this.prev = 0
    this.raf
    this.creating = D.A_BUILDERS
    this.dists = []
    this.buildings = []
    this.monsters = []
    this.people = []
    this.food = 50
    this.foodcd = 0

    this.people.push(new Builder(this, 150, 150))
    this.monsters.push(new Monster(this, 20, 20))
  }

  step(dt, ctx) {
    for (var i = 0; i < 300; i += 32) {
      for (var j = 0; j < 300; j += 32) {
        //ctx.drawImage(this.image2, 368,192,32,32,i,j,32,32)
        ctx.drawImage(this.image2, 368,241,32,32,i,j,32,32)
      }
    }
    for (var i = this.people.length - 1; i >= 0; i--) {
      if (this.food <= 0 && this.foodcd <= 0) {
        this.people.splice(i, 1)
        this.foodcd = 0.5
        continue;
      } else {
        this.foodcd -= dt
      }
      this.people[i].behave(dt)
      this.people[i].move(dt)
      this.people[i].draw(ctx)
    }
    for (var i = this.buildings.length - 1; i >= 0; i--) {
      this.buildings[i].behave(dt)
      this.buildings[i].move(dt)
      this.buildings[i].draw(ctx)
    }
    for (var i = this.monsters.length - 1; i >= 0; i--) {
      this.monsters[i].behave(dt)
      this.monsters[i].move(dt)
      this.monsters[i].draw(ctx)
    }

    for (var j = this.monsters.length - 1; j >= 0; j--) {
      if (this.monsters[j].w < D.MIN_MONSTER_SIZE) {
        this.monsters.splice(j, 1)
        continue
      }
      for (var i = this.people.length - 1; i >= 0; i--) {
        if (this.people[i].isHit(this.monsters[j])) {
          if (this.people[i].color === 'yellow') {
            this.monsters[j].w -= D.P_FD
            this.monsters[j].h -= D.P_FD
          } else if (this.people[i].color === 'green') {
            this.monsters[j].w -= D.P_WD
            this.monsters[j].h -= D.P_WD
          } else if (this.people[i].color === 'blue') {
            this.monsters[j].w -= D.P_GD
            this.monsters[j].h -= D.P_GD
          } else {
            this.monsters[j].w -= D.P_BD
            this.monsters[j].h -= D.P_BD
            this.monsters[j].kills++
          }
          this.people.splice(i, 1)
        }
      }
      for (var i = this.buildings.length - 1; i >= 0; i--) {
        if (this.buildings[i].isHit(this.monsters[j]) && this.monsters[j].w >= 2 * this.buildings[i].w) {
          //this.monsters[j].w -= this.buildings[i].w
          //this.monsters[j].h -= this.buildings[i].w
          this.buildings.splice(i, 1)
        }
      }
    }
  }
}
export {
  World
}
