import { _decorator, Component, EventTouch, Graphics, Input, Node, UITransform, Animation, Vec3, AudioSource, director } from 'cc';
const { ccclass, property } = _decorator;
import { ScoreManager } from '../Mangers/ScoreManager';
import { CreateFormStar } from './CreateFormStar';

@ccclass('FallingObject')
export class FallingObject extends Component {
   
    private speed: number = 100
    private rotationSpeed: number = 50;

    private parentSize: {width:number, height: number} = { width: 0, height: 0 };
    private geometryNode: CreateFormStar | null = null
    private animation : Animation | null = null
    private audioSource : AudioSource | null = null

    start(){
        let parent = this.node.parent?.getComponent(UITransform);
        if(parent) {
            this.parentSize = parent.contentSize;
        }
        this.geometryNode = this.node.getComponent(CreateFormStar)
        this.animation = this.node.getComponent(Animation)
        this.audioSource = this.getComponent(AudioSource)

        this.node.on(Input.EventType.MOUSE_DOWN, this.onObjectClick, this)
    }
    
    onDestroy(){
        this.node.off(Input.EventType.MOUSE_DOWN, this.onObjectClick, this)
    }

    public setSpeed(speed: number): void {
        this.speed = speed
    }

    public setRotationSpeed(rotationSpeed: number): void {
        this.rotationSpeed = rotationSpeed
    }

    update(deltaTime: number) {
        let pos = new Vec3(this.node.position);
        pos.y -= this.speed * deltaTime;
        this.node.setPosition(pos)
        this.node.angle += this.rotationSpeed * deltaTime;

        if (pos.y < (-this.parentSize.height - this.geometryNode.starSize) / 2 ) {
            this.node.destroy();
        }
    }
    
    onObjectClick(event: EventTouch) {
        
        if(!director.isPaused) return 

        ScoreManager.getInstance().addScore(10)

        this.node.off(Input.EventType.MOUSE_DOWN, this.onObjectClick, this)

        if(this.audioSource){
            this.audioSource.playOneShot(this.audioSource.clip)
        }

        if(this.animation){
            this.animation.once(Animation.EventType.FINISHED, () => {
                this.node.destroy()
            }, this)
        }else{
            this.node.destroy()
        }

        if(this.animation) {
            this.animation.play("DestroyStar")
        }

    }
}


