import { Scene } from './Scene';
import { Assets, Container, DisplayObject, Sprite } from 'pixi.js';
import { GameManager } from '../core/GameManager';
import * as TWEEN from '@tweenjs/tween.js';

export class CardScene extends Scene {
    private static readonly CARDS_NUMBER: number = 144;
    private static readonly INTERVAL_BETWEEN_MOVES: number = 1000;
    private static readonly ANIMATION_TIME: number = 2000;
    private stackLength: number = 0;
    private cards: Sprite[] = [];
    private leftStackPos: {x: number, y: number};
    private rightStackPos: {x: number, y: number};

    constructor() {
        super(false);

        this.stackLength = CardScene.CARDS_NUMBER * 2 + Sprite.from(Assets.get('card')).height;
        this.leftStackPos = {
            x : GameManager.width / 4,
            y : GameManager.height / 2 + this.stackLength / 4
        };

        for (let i = 0; i < CardScene.CARDS_NUMBER; i++) {
            const card = Sprite.from(Assets.get('card'));
            card.anchor.set(0.5);
            card.x = this.leftStackPos.x;
            card.y = this.leftStackPos.y - (i * 2);
            this.stackLength += card.y;
            this.cards.push(card);

            this.addChild(card as DisplayObject);
        }

        this.rightStackPos = {
            x : GameManager.width / 4 * 3,
            y : this.leftStackPos.y
        };

        this.moveCards();
    }

    public update(deltaMS: number, fps: string) {
        super.update(deltaMS, fps);
        TWEEN.update();
    }

    private moveCards(): void {

        for (let i = 0; i < CardScene.CARDS_NUMBER; i++) {
            if ((CardScene.CARDS_NUMBER - i - 1) >= this.cards.length)
                return;

            new TWEEN.Tween(this.cards[CardScene.CARDS_NUMBER - i - 1])
                .to({x: this.rightStackPos.x, y: this.rightStackPos.y - (i * 2) }, CardScene.ANIMATION_TIME)
                .easing(TWEEN.Easing.Quartic.Out)
                .delay(i * CardScene.INTERVAL_BETWEEN_MOVES)
                .start();
        }
    }
}