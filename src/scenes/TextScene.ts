import { Scene } from './Scene';
import { DisplayObject, Sprite } from 'pixi.js';
import { getRandomNumber } from '../core/utils';
import { RichText } from '../ui/RichText';
import { GameManager } from '../core/GameManager';

export class TextScene extends Scene {
    private timeBetweenTextChange: number = 0;
    private static readonly INTERVAL_BETWEEN_TEXT_CHANGE: number = 2000;
    private richText: RichText;
    private readonly sampleArray: string[] = ['Hi', 'I love cats',
        'For real', 'bisou', 'oopsi', 'intense',
        'Lorem ipsum', 'CAAAAAATS', 'BG3 GOTY <3', 'Gideon', 'idk', 'there is a bug', 'mega rip'];
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

    private getRandomArray(): string {
        let randomNum: number = getRandomNumber(0, 13);

        if (randomNum > 12)
            randomNum = 12;

        return this.sampleArray[randomNum];
    }

    private getRandomSmiley(): Sprite {
        let randomNum: number = getRandomNumber(1, 30);
        if (randomNum > 30)
            randomNum = 30;

        const resizedSprite = Sprite.from('smiley' + randomNum + '.png');

        if (resizedSprite.width >= 64) {
            const size = getRandomNumber(32, 64);
            resizedSprite.width = size;
            resizedSprite.height = size;
        }

        return resizedSprite;
    }

    private changeRichText(): void {
        const sizeTextArray: number = getRandomNumber(2, 7);
        const sizeImageArray: number = getRandomNumber(3, 10);

        for (let i = 0; i <= sizeTextArray; i++) {
            this.richText.textArrays.push(this.getRandomArray());
        }

        for (let i = 0; i <= sizeImageArray; i++) {
            this.richText.smileys.push(this.getRandomSmiley());
        }

        this.richText.textSize = getRandomNumber(12, 32);

        this.richText.modifyRichText(true);
    };
}