import { Application, DisplayObject } from 'pixi.js';
import { Scene } from '../scenes/Scene';

export class GameManager {
    private constructor() { }
    private static app: Application;
    private static currentScene: Scene;
    private static _width: number;
    private static _height: number;

    public static get width(): number {
        return GameManager._width;
    }
    public static get height(): number {
        return GameManager._height;
    }

    public static init(width: number, height: number, background: number | string): void {
        GameManager._width = width;
        GameManager._height = height;

        GameManager.app = new Application({
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            resizeTo: window,
            backgroundColor: background,
            width: width,
            height: height
        });

        document.body.appendChild(GameManager.app.view as HTMLCanvasElement);
        GameManager.app.ticker.add(GameManager.update);
        window.addEventListener('resize', GameManager.onResize);
    }

    public static goToScene(newScene: Scene): void {
        if (GameManager.currentScene) {
            GameManager.app.stage.removeChild(GameManager.currentScene as DisplayObject);
            GameManager.currentScene.destroy();
        }

        GameManager.currentScene = newScene;
        GameManager.app.stage.addChild(GameManager.currentScene as DisplayObject);
    }

    private static update(deltaTime: number): void {
        if (GameManager.currentScene) {
            GameManager.currentScene.update(deltaTime, GameManager.app.ticker.FPS.toFixed(0));
        }
    }

    private static onResize(): void {
        if (GameManager.currentScene) {
            GameManager.currentScene.onResize(GameManager.width, GameManager.height);
        }
    }
}