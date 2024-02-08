import { BitmapFont, BitmapText, Container, DisplayObject, Ticker } from 'pixi.js';
import { UIButton } from '../ui/UIButton';
import { GameManager } from '../core/GameManager';
import { MainMenuScene } from './MainMenuScene';

export abstract class Scene extends Container {
    protected FPSCounterText: BitmapText;
    protected backToMainMenuButton: UIButton | undefined;
    private timeSinceLastUpdate: number = 0;
    private static readonly INTERVAL_BETWEEN_FPS_UPDATE: number = 500;
    protected constructor(isMainMenu:boolean = true) {
        super();

        BitmapFont.from('bitmapArialFont', {
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontSize: 26
        });

        this.FPSCounterText = new BitmapText('FPS: ', {
            fontName: 'bitmapArialFont',
            fontSize: 26,
            tint: '#23092C'
        });

        this.addChild(this.FPSCounterText as DisplayObject);

        if (!isMainMenu)
            this.addBackToMainMenuBtn();
    }

    public update(deltaMS: number, fps: string): void {
        if (!this.timeSinceLastUpdate)
            this.updateFPS(fps);

        this.timeSinceLastUpdate += deltaMS;

        if (this.timeSinceLastUpdate > Scene.INTERVAL_BETWEEN_FPS_UPDATE) {
            this.updateFPS(fps);
            this.timeSinceLastUpdate -= Scene.INTERVAL_BETWEEN_FPS_UPDATE;
        }
    }

    public updateFPS(fps: string): void {
        this.FPSCounterText.text = 'FPS: ' + fps;
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