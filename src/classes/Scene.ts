import { BitmapFont, BitmapText, Container, DisplayObject, Ticker } from 'pixi.js';

export abstract class Scene extends Container {
    protected FPSCounterText: BitmapText;
    protected constructor() {
        super();

        BitmapFont.from('bitmapArialFont', {
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontSize: 26
        });

        this.FPSCounterText = new BitmapText('FPS ' + Ticker.shared.FPS.toFixed(0), {
            fontName: 'bitmapArialFont',
            fontSize: 26,
            tint: '#23092C'
        });

        this.addChild(this.FPSCounterText as DisplayObject);
    }
    public update(deltaTime: number): void {
        this.updateFPS();
    }

    public updateFPS(): void {
        this.FPSCounterText.text = 'FPS ' + Ticker.shared.FPS.toFixed(0);
    }

    public onResize(screenWidth:number, screenHeight:number): void { }
}