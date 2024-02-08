import { Container, DisplayObject, Sprite, Text } from 'pixi.js';
import { getRandomNumber, headsOrTails } from '../core/utils';
import { GameManager } from '../core/GameManager';

export class RichText extends Container {
    public textArrays: string[];
    public smileys: Sprite[];
    public textSize: number;

    private currentXPos: number = 0;
    constructor(textArrays: string[] = ['Default text', 'sorry :('],
                smileys: Sprite[] = [Sprite.from('smiley1.png')],
                textSize: number = 24,
                isOrderRandom: boolean = false
                ) {
        super();

        this.textArrays = textArrays;
        this.smileys = smileys;
        this.textSize = textSize;

        this.CreateRichText(isOrderRandom);
    }

    private CreateRichText(isOrderRandom: boolean) {
        let text: string = '';

        if (!isOrderRandom) {
            this.textArrays.forEach((value) => {
                text += value + ' ';
            });

            this.putTextToScreen(text);

            this.smileys.forEach((value) => {
                this.putSmileyToScreen(value);
            });
        } else {
            let index = getRandomNumber(2, 13);
            if (index >= (this.textArrays.length + this.smileys.length))
                index = this.textArrays.length + this.smileys.length - 2;

            for (let i = 0; i < index; i++) {
                if (i >= this.textArrays.length && i < this.smileys.length) {
                   this.putSmileyToScreen(this.smileys[i]);
                }

                if (i >= this.smileys.length && i < this.textArrays.length) {
                    this.putTextToScreen(this.textArrays[i] + ' ');
                }

                if (headsOrTails()) {
                    if (i < this.textArrays.length)
                        this.putTextToScreen(this.textArrays[i] + ' ');
                } else {
                    if (i < this.smileys.length)
                        this.putSmileyToScreen(this.smileys[i]);
                }
            }
        }

        this.pivot.x = this.currentXPos / 2;
        this.pivot.y = this.textSize / 2;
    }

    private putTextToScreen(text: string): void {
        if (this.currentXPos > GameManager.width - 100)
            return;

        const textToPrint = new Text(text, {
            fontFamily: 'Arial',
            fontSize: this.textSize,
            fill: '#000000'
        });

        textToPrint.x = this.currentXPos;
        textToPrint.anchor.set(0, 0.5);
        this.currentXPos += textToPrint.width;

        this.addChild(textToPrint as DisplayObject);
    }

    private putSmileyToScreen(smiley: Sprite): void {
        if (this.currentXPos > GameManager.width - 100)
            return;

        const image = smiley;

        image.scale.set(this.textSize / image.height);

        if (image.width >= 50) {
            const ratio = smiley.width / smiley.height;

            image.width = 50;
            image.height = 50 / ratio;
        }

        image.x = this.currentXPos;
        image.anchor.set(0, 0.5);
        this.currentXPos += image.width;

        this.addChild(image as DisplayObject);
    }

    private CleanRichText(): void {
        this.removeChildren();
        this.currentXPos = 0;
    }

    public modifyRichText(isOrderRandom: boolean) {
        this.CleanRichText();
        this.CreateRichText(isOrderRandom);
    }
}