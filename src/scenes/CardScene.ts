import { Scene } from './Scene';
import { Assets, Container, DisplayObject, Sprite } from 'pixi.js';
import { GameManager } from '../core/GameManager';
import * as TWEEN from '@tweenjs/tween.js';

export class CardScene extends Scene {
    private stackLength: number = 0;
    private cards: Sprite[] = [];
    constructor() {
        super(false);

        this.stackLength = 288 + Sprite.from(Assets.get('card')).height;
        const leftStackPos: {x: number, y: number} = {
            x : GameManager.width / 3,
            y : GameManager.height / 2 + this.stackLength / 2
        };

        for (let i = 0; i < 144; i++) {
            const card = Sprite.from(Assets.get('card'));
            card.anchor.set(0.5);
            card.x = leftStackPos.x;
            card.y = leftStackPos.y - (i * 2);
            this.stackLength += card.y;
            this.cards.push(card);

            this.addChild(card as DisplayObject);
        }

        const rightStackPos: {x: number, y: number} = {
            x : GameManager.width / 3 * 2,
            y : leftStackPos.y
        };

        this.moveCards(rightStackPos);
    }

    public update(deltaMS: number, fps: string) {
        super.update(deltaMS, fps);
        TWEEN.update();
    }

    private moveCards(rightStackPos: {x: number, y: number}): void {

        for (let i = 0; i < 144; i++) {
            if ((144 - i - 1) >= this.cards.length)
                return;

            new TWEEN.Tween(this.cards[144 - i - 1])
                .to({x: rightStackPos.x, y: rightStackPos.y - (i * 2) }, 2000)
                .easing(TWEEN.Easing.Quartic.Out)
                .delay(i * 1000)
                .start();
        }
    }
}