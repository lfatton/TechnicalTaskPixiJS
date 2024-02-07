import { Application } from 'pixi.js';
import './style.less';

const app = new Application({
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: '#BB7CD0',
    width: window.innerWidth,
    height: window.innerHeight
});

document.body.appendChild(app.view as HTMLCanvasElement);