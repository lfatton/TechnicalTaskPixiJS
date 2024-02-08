import { DisplayObject } from 'pixi.js';
import { Scene } from './Scene';
import { GameManager } from '../core/GameManager';
import { CardScene } from './CardScene';
import { TextScene } from './TextScene';
import { FireScene } from './FireScene';
import { UIButton } from '../ui/UIButton';

export class MainMenuScene extends Scene {
    private halfWidth: number = GameManager.width / 2;
    private thirdHeight: number = GameManager.height / 3;
    constructor() {
        super();

        const cardButton = new UIButton('CARDS SHUFFLE',
        );
        cardButton.x = this.halfWidth;
        cardButton.y = this.thirdHeight - 50;
        cardButton.on('buttonClicked', () => GameManager.goToScene(new CardScene()));

        const textButton = new UIButton('TEXT GENERATOR',
        );
        textButton.x = this.halfWidth;
        textButton.y = 1.5 * this.thirdHeight;
        textButton.on('buttonClicked', () => GameManager.goToScene(new TextScene()))

        const fireButton = new UIButton('FIRE EFFECT',
        );
        fireButton.x = this.halfWidth;
        fireButton.y = 2 * this.thirdHeight + 50;
        fireButton.on('buttonClicked', () => GameManager.goToScene(new FireScene()))

        this.addChild(cardButton as DisplayObject);
        this.addChild(textButton as DisplayObject);
        this.addChild(fireButton as DisplayObject);
    }
}