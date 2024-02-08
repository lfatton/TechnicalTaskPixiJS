import './style.less';
import { SceneManager } from './classes/SceneManager';
import { MenuScene } from './classes/MenuScene';

SceneManager.init(window.innerWidth, window.innerHeight, '#BB7CD0');

const menuScene: MenuScene = new MenuScene();
SceneManager.goToScene(menuScene);