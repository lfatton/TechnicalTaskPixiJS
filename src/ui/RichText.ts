import { Container, DisplayObject, Sprite, Text } from 'pixi.js';
import { getRandomNumber, headsOrTails } from '../core/utils';

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
        this.removeChildren();
        this.currentXPos = 0;

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
            for (let i = 0; i < 6; i++) {
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
        const image = smiley;

        if (image.width >= 64) {
            const size = getRandomNumber(32, 64);
            image.width = size;
            image.height = size;
        }


        image.x = this.currentXPos;
        image.anchor.set(0.5);
        this.currentXPos += image.width;

        this.addChild(image as DisplayObject);
    }

    public modifyRichText(isOrderRandom: boolean) {
        this.CreateRichText(isOrderRandom);
    }
}