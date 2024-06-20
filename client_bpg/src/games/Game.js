import * as PIXI from 'pixi.js'
import { Config } from '../helper/Config';
import crownImage from "./assets/crown.png"

export default class Game {



    constructor(view) {

        this.createApp(view)

        this.viewWidth = Config.GAME_WINDOW_SIZE.width;
        this.viewHeight = Config.GAME_WINDOW_SIZE.height;
        this.mouseX = 0;
        this.mouseY = 0;

        this.background = PIXI.Sprite.from(PIXI.Texture.WHITE);
        this.background.width = this.viewWidth / 2
        this.background.height = this.viewHeight / 2
        this.background.alpha = 0;
        this.background.anchor.set(0.5);
        this.background.x = this.viewWidth / 2
        this.background.y = this.viewHeight / 2
        this.background.eventMode = 'static'

        this.app.stage.addChild(this.background);
        this.addSprite()
        this.ticker = new PIXI.Ticker();
        this.ticker.start();

        this.ticker.add((delta) => {
            if(this.testSprite){
                this.testSprite.x = this.mouseX
                this.testSprite.y = this.mouseY
            }
        }, this);
    }

    PIXIMOUSEMOVE(e){
        this.mouseX = e.offsetX / this.app.canvas.offsetWidth * Config.GAME_WINDOW_SIZE.width
        this.mouseY = e.offsetY / this.app.canvas.offsetHeight * Config.GAME_WINDOW_SIZE.height
    }

    async createApp(view) {
        this.app = new PIXI.Application()
        await this.app.init({
            canvas: view,
            width: Config.GAME_WINDOW_SIZE.width,
            height: Config.GAME_WINDOW_SIZE.height,
            backgroundColor: 0xFFFFFF,
            antialias: true,
        })
    }

    async addSprite() {
        const texture = await PIXI.Assets.load(crownImage)
        this.testSprite = new PIXI.Sprite(texture);
        this.app.stage.addChild(this.testSprite)
        this.testSprite.x = 400
        this.app.canvas.addEventListener('mousemove', (e)=>{this.PIXIMOUSEMOVE(e)})
  
    }

    destroy() {
        this.app.destroy(true, { children: true, texture: true, baseTexture: true, textureSource: true, context:true, })
    }
}