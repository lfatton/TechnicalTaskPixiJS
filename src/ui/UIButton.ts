import { DisplayObject, FederatedPointerEvent, Graphics, Text, TextStyle } from 'pixi.js';
import { GameManager } from '../core/GameManager';

export class UIButton extends Graphics {
    private buttonText: Text;
    constructor(buttonText: string,
                buttonWidth: number = GameManager.width / 3,
                buttonHeight: number = (GameManager.width / 3) / 5,
                radius: number = 10,
                fillColor: string | number = '#EE9438',
                textColor: string | number = '#FFC871',
                textSize: number = 36) {
        super();

        this.on('pointertap', this.onClick, this);
        this.eventMode = 'dynamic';

        this.buttonText = new Text(buttonText, new TextStyle({
            fontFamily	: 'Arial',
            fontSize	: textSize,
            fill		: textColor,
            fontWeight	: 'bold',
            padding		: 20
        }));
        this.buttonText.anchor.set(0.5, 0.5);
        this.buttonText.position.set(buttonWidth / 2, buttonHeight / 2)

        this.addChild(this.buttonText as DisplayObject);
        this.beginFill(fillColor);
        this.drawRoundedRect(0, 0, buttonWidth, buttonHeight, radius);
        this.endFill();

        this.pivot.x = buttonWidth / 2;
        this.pivot.y = buttonHeight / 2;
    }
    public onClick(e: FederatedPointerEvent): void {
       this.emit('buttonClicked');
    }
}