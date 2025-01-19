import { _decorator, Component, Node, Prefab, instantiate, Vec3, UITransform } from 'cc';
import { FallingObject } from './FallingObject';
import { CreateFormStar } from './CreateFormStar';
const { ccclass, property } = _decorator;

@ccclass('SpawnerLogic')
export class SpawnerLogic extends Component {
    @property({ type: Prefab })
    objectPrefab: Prefab | null = null;

    @property
    minSpeed: number = 50; 

    @property
    maxSpeed: number = 150; // Максимальная скорость падения

    @property
    minRotationSpeed: number = 20; // Минимальная скорость вращения

    @property
    maxRotationSpeed: number = 80; // Максимальная скорость вращения

    @property
    minSpawnInterval: number = 0.5; // Минимальный интервал между созданиями

    @property
    maxSpawnInterval: number = 2; // Максимальный интервал между созданиями

    private nextSpawnTime: number = 0;
    private parentSize: {width:number, height: number} = { width: 0, height: 0 };
    
    start() {
        this.nextSpawnTime = this.getSpawnTime();
        let parent = this.node.getComponent(UITransform);
        if(parent) {
            this.parentSize = parent.contentSize;
        }
    }

    update(deltaTime: number) {
        this.nextSpawnTime -= deltaTime;
        if (this.nextSpawnTime <= 0) {
            this.spawnObject();
            this.nextSpawnTime = this.getSpawnTime();
        }
    }

    private spawnObject() {
        if (this.objectPrefab) {
            const newObject = instantiate(this.objectPrefab);
            newObject.setParent(this.node);
            const geometryParams = newObject.getComponent(CreateFormStar)

            let randomX = Math.random() * this.parentSize.width - (geometryParams.starSize + this.parentSize.width) / 2;
            newObject.setPosition(new Vec3(randomX, this.parentSize.height / 2, 0));

            const fallingObject = newObject.getComponent(FallingObject);
            if (fallingObject) {
                fallingObject.setSpeed(this.minSpeed + (this.maxSpeed - this.minSpeed) * Math.random());
                fallingObject.setRotationSpeed(this.minRotationSpeed + (this.maxRotationSpeed - this.minRotationSpeed) * Math.random());
            }
        }
    }

    getSpawnTime(): number {
        return this.minSpawnInterval + (this.maxSpawnInterval - this.minSpawnInterval) * Math.random();
    }
}
