import { _decorator, Component, Node, Button } from 'cc';
const { ccclass, property } = _decorator;
import { SceneManager } from '../Mangers/SceneManager';

@ccclass('BeginGameBtn')
export class BeginGameBtn extends Component {
    start() {
        this.node.on(Button.EventType.CLICK, this.handleClick, this)
    }

    handleClick(){
        SceneManager.getInstance().loadGameScene()
    }

    onDestroy(){
        this.node.off(Button.EventType.CLICK, this.handleClick, this)
    }

    update(deltaTime: number) {
        
    }
}


