import { Scene } from './Scene';
import { DisplayObject, Sprite } from 'pixi.js';
import { getRandomNumber } from '../core/utils';
import { RichText } from '../ui/RichText';
import { GameManager } from '../core/GameManager';
enum Type {
    Text = 1,
    Smiley
}

export class TextScene extends Scene {
    private timeBetweenTextChange: number = 0;
    private static readonly INTERVAL_BETWEEN_TEXT_CHANGE: number = 2000;
    private richText: RichText;
    private readonly sampleArray: string[] = ['Hi', 'I love cats',
        'for real', 'bisou', 'oopsi', 'intense',
        'Lorem ipsum', 'CAAAAAATS', 'BG3 GOTY <3', 'blop', 'idk', 'there is a bug', 'rip Bunny :('];
    constructor() {
        super(false);

        this.richText = new RichText();
        this.addChild(this.richText as DisplayObject);
        this.richText.x = GameManager.width / 2;
        this.richText.y = GameManager.height / 2;
    }

    public update(deltaMS: number, fps: string) {
        super.update(deltaMS, fps);

        this.timeBetweenTextChange += deltaMS;
        if (this.timeBetweenTextChange > TextScene.INTERVAL_BETWEEN_TEXT_CHANGE) {
            this.changeRichText();
            this.timeBetweenTextChange -= TextScene.INTERVAL_BETWEEN_TEXT_CHANGE;
        }
    }

    private getRandomAsset(type: Type, lowerBound: number, upperBound: number): string | Sprite {
        let randomNum: number = getRandomNumber(lowerBound, upperBound);
        if (randomNum > upperBound)
            randomNum = upperBound;

        if (type == Type.Smiley)
            return Sprite.from('smiley' + randomNum + '.png');

        return this.sampleArray[randomNum];
    }

    private changeRichText(): void {
        const sizeTextArray: number = getRandomNumber(1, 7);
        const sizeImageArray: number = getRandomNumber(1, 10);
        const textArray: string[] = [];
        const spriteArray: Sprite[] = [];

        for (let i = 0; i <= sizeTextArray; i++) {
            textArray.push(<string>this.getRandomAsset(Type.Text, 0, 13));
        }

        for (let i = 0; i <= sizeImageArray; i++) {
            spriteArray.push(<Sprite>this.getRandomAsset(Type.Smiley, 1, 30));
        }

        this.richText.textArrays = textArray;
        this.richText.smileys = spriteArray;
        this.richText.textSize = getRandomNumber(12, 45);

        this.richText.modifyRichText(true);
    };
}