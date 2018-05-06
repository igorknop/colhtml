import {D} from "./Config.js"
class Sprite {
  constructor(world, x = 0, y = 0, w = 5, h = 5, c = 'blue') {
    this._world = world
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.cd = 0;
    this.color = c
    this.status = D.STOPPED
    this.vel = D.PEOPLE_VEL
  }
  set world(world){
    if(typeof world !== 'object'){
      throw new Error("World shold be an object. Not "+world)
    }
    this._world = world
  }
  get world(){
    return this._world
  }
  setStatus(status) {
    this.status = status
    switch (status) {
      case D.W_RIGHT:
        this.vx = this.vel;
        this.vy = 0;
        break;
      case D.W_LEFT:
        this.vx = -this.vel;
        this.vy = 0;
        break;
      case D.W_DOWN:
        this.vx = 0;
        this.vy = this.vel;
        break;
      case D.W_UP:
        this.vx = 0;
        this.vy = -this.vel;
        this.status = D.W_UP
        break;
      case D.STOPPED:
        this.status = D.STOPPED
      default:
        this.status = D.STOPPED
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
    }
  }
  move(dt) {
    this.vx += this.ax * dt
    this.x += this.vx * dt
    this.vy += this.ay * dt
    this.y += this.vy * dt

    if (this.x - this.w / 2 < 10) {
      this.x = this.w / 2 + 10
      this.setStatus(D.W_RIGHT)
    }
    if (this.x + this.w / 2 > canvas.width - 10) {
      this.x = canvas.width - this.w / 2 - 10
      this.setStatus(D.W_LEFT)
    }
    if (this.y - this.h / 2 < 40) {
      this.y = this.h / 2 + 40
      this.setStatus(D.W_DOWN)
    }
    if (this.y + this.h / 2 > canvas.height - 10) {
      this.y = canvas.height - this.h / 2 - 10
      this.setStatus(D.W_UP)
    }
  }
  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.fillStyle = this.color
    ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h)
    ctx.restore()
  }
  behave(dt) {}
  isHit(a) {
    if (this.x + this.w / 2 < a.x - a.w / 2)
      return false
    if (this.x - this.w / 2 > a.x + a.w / 2)
      return false
    if (this.y + this.h / 2 < a.y - a.h / 2)
      return false
    if (this.y - this.h / 2 > a.y + a.h / 2)
      return false
    return true
  };

}

export {Sprite}
