import { _decorator, Component, Node, input, Input, EventKeyboard, KeyCode, director, Label, Button } from 'cc';
import { SceneManager } from './SceneManager';
import { ScoreManager } from './ScoreManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Node)
    private pauseNode : Node | null = null

    @property({type: Button})
    private pauseBtn: Button | null = null

    private isPause : boolean = false

    start() {
        input.on(Input.EventType.KEY_DOWN, this.handleKeyDown, this)
        
        if(this.isPause){
            this.pauseNode.active = true
        }else{
            this.pauseNode.active = false
        }

        if(this.pauseBtn){
            this.pauseBtn.node.on(Node.EventType.MOUSE_DOWN, () => {
                director.resume()
                ScoreManager.getInstance().saveHighScore()
                SceneManager.getInstance().loadMenuScene()
            }, this)
        }

    }

    handleKeyDown(e: EventKeyboard){
        if (e.keyCode == KeyCode.ESCAPE){
            if(this.pauseNode){
                if(this.isPause){
                    console.log("Active")
                    this.pauseNode.active = false
                    this.pauseBtn.node.active = false
                    director.resume()
                }else{
                    this.pauseNode.active = true
                    this.pauseBtn.node.active = true
                    director.pause()
                }
                this.isPause = !this.isPause
            }
        }
    }
    
    onDestroy(){
        input.off(Input.EventType.KEY_DOWN, this.handleKeyDown, this)
    }

    update(deltaTime: number) {
        
    }
}


