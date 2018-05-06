import {D} from "./Config.js"
import {Sprite} from "./Sprite.js"
import {Builder} from "./Builder.js"
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
    this.setup()
  }

  setup() {
    this.dt = 0
    this.prev = 0
    this.raf
    this.dists = []
    this.buildings = []
    this.monsters = []
    this.people = []
    this.food = 50
    this.foodcd = 0
  }
}
export {
  World
}
