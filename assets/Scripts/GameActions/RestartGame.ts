import { _decorator, Component, Node, Button, director } from 'cc';
import { SceneManager } from '../Mangers/SceneManager';
const { ccclass, property } = _decorator;

@ccclass('RestartGame')
export class RestartGame extends Component {
    
    @property(Node)
    private gameOverMenu: Node | null = null

    private restartBtn: Button | null = null
    
    start() {
        this.restartBtn = this.node.getComponent(Button)
        if(this.restartBtn){
            this.restartBtn.node.once(Node.EventType.MOUSE_DOWN, this.handleClick, this)
        }
    }

    handleClick(){
        director.resume()
        this.gameOverMenu.active = false
        SceneManager.getInstance().restartGame()
    }


    update(deltaTime: number) {
        
    }
}


