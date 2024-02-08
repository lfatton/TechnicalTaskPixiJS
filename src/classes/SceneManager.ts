import { Application, DisplayObject } from 'pixi.js';
import { Scene } from './Scene';

export class SceneManager {
    private constructor() { }
    private static app: Application;
    private static currentScene: Scene;
    private static _width: number;
    private static _height: number;

    public static get width(): number {
        return SceneManager._width;
    }
    public static get height(): number {
        return SceneManager._height;
    }
    public static init(width: number, height: number, background: number | string): void {
        SceneManager._width = width;
        SceneManager._height = height;

        SceneManager.app = new Application({
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            resizeTo: window,
            backgroundColor: background,
            width: width,
            height: height
        });

        document.body.appendChild(SceneManager.app.view as HTMLCanvasElement);
        SceneManager.app.ticker.add(SceneManager.update);
        window.addEventListener('resize', SceneManager.onResize);
    }

    public static goToScene(newScene: Scene): void {
        if (SceneManager.currentScene) {
            SceneManager.app.stage.removeChild(SceneManager.currentScene as DisplayObject);
            SceneManager.currentScene.destroy();
        }

        SceneManager.currentScene = newScene;
        SceneManager.app.stage.addChild(SceneManager.currentScene as DisplayObject);
    }

    private static update(timeDelta: number): void {
        if (SceneManager.currentScene) {
            SceneManager.currentScene.update(timeDelta);
        }
    }

    private static onResize(): void {
        if (SceneManager.currentScene) {
            SceneManager.currentScene.onResize(SceneManager.width, SceneManager.height);
        }
    }
}