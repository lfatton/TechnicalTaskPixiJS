import { Assets, Container, DisplayObject, FederatedPointerEvent, Ticker } from 'pixi.js';
import { Scene } from './Scene';
import { GameManager } from '../core/GameManager';
import { Emitter, EmitterConfigV3 } from '@pixi/particle-emitter';

export class FireScene extends Scene {
    private emitter: Emitter;
    private emitterConfig: EmitterConfigV3 =
        {
            "lifetime": {
                "min": 0.1,
                "max": 0.4
            },
            "frequency": 0.001,
            "emitterLifetime": -1,
            "maxParticles": 10,
            "addAtBack": false,
            "pos": {
                "x": 0,
                "y": 0
            },
            "behaviors": [
                {
                    "type": "alpha",
                    "config": {
                        "alpha": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 0.62
                                },
                                {
                                    "time": 1,
                                    "value": 0
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "moveSpeedStatic",
                    "config": {
                        "min": 400,
                        "max": 400
                    }
                },
                {
                    "type": "scale",
                    "config": {
                        "scale": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 0.25
                                },
                                {
                                    "time": 1,
                                    "value": 0.75
                                }
                            ]
                        },
                        "minMult": 1
                    }
                },
                {
                    "type": "color",
                    "config": {
                        "color": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": "fff191"
                                },
                                {
                                    "time": 1,
                                    "value": "ff622c"
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "rotation",
                    "config": {
                        "accel": 0,
                        "minSpeed": 50,
                        "maxSpeed": 50,
                        "minStart": 265,
                        "maxStart": 275
                    }
                },
                {
                    "type": "textureRandom",
                    "config": {
                        "textures": [
                            Assets.get("particle"),
                            Assets.get("fire")
                        ]
                    }
                },
                {
                    "type": "spawnShape",
                    "config": {
                        "type": "torus",
                        "data": {
                            "x": 0,
                            "y": 0,
                            "radius": 20,
                            "innerRadius": 0,
                            "affectRotation": false
                        }
                    }
                }
            ]
        };
    private particlesContainer: Container;
    constructor() {
        super(false);

        this.particlesContainer = new Container();
        this.addChild(this.particlesContainer as DisplayObject);
        this.particlesContainer.position.x = GameManager.width / 2;
        this.particlesContainer.position.y = GameManager.height / 2;

        this.emitter = new Emitter(this.particlesContainer, this.emitterConfig);

        Ticker.shared.add(() => {
            this.emitter.update(Ticker.shared.deltaMS * 0.001);
            }, this);
    }
}