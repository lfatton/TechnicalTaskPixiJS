import './style.less';
import { GameManager } from './core/GameManager';
import { MainMenuScene } from './scenes/MainMenuScene';

GameManager.init(window.innerWidth, window.innerHeight, '#BB7CD0');

const mainMenuScene: MainMenuScene = new MainMenuScene();
GameManager.goToScene(mainMenuScene);