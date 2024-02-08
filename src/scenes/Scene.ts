import { BitmapFont, BitmapText, Container, DisplayObject, Ticker } from 'pixi.js';
import { UIButton } from '../ui/UIButton';
import { GameManager } from '../core/GameManager';
import { MainMenuScene } from './MainMenuScene';

export abstract class Scene extends Container {
    protected FPSCounterText: BitmapText;
    protected backToMainMenuButton: UIButton | undefined;
    protected constructor(isMainMenu:boolean = true) {
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

        if (!isMainMenu)
            this.addBackToMainMenuBtn();
    }

    public update(deltaTime: number): void {
        this.updateFPS();
    }

    public updateFPS(): void {
        this.FPSCounterText.text = 'FPS ' + Ticker.shared.FPS.toFixed(0);
    }

    public onResize(screenWidth:number, screenHeight:number): void { }

    private addBackToMainMenuBtn(): void {
        this.backToMainMenuButton = new UIButton('back',
            50,
            50,
            50,
            '#DA3C59',
            '#c9bcea',
            20
            );
        this.backToMainMenuButton.x = GameManager.width / 2;
        this.backToMainMenuButton.y = GameManager.height - 50;

        this.backToMainMenuButton.on('buttonClicked', () => GameManager.goToScene(new MainMenuScene()))
        this.addChild(this.backToMainMenuButton as DisplayObject);
    };
}