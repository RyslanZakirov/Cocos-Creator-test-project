import { _decorator, Button, Component, Node, director } from 'cc';
import { SceneManager } from '../Mangers/SceneManager';
const { ccclass, property } = _decorator;

@ccclass('BackToMainMenu')
export class BackToMainMenu extends Component {
    
    @property(Node)
    private gameOverMenu: Node | null = null

    private btn : Button | null = null
    
    start() {
        this.btn = this.node.getComponent(Button)
        if(this.btn){
            this.btn.node.once(Node.EventType.MOUSE_DOWN, this.handleClick, this)
        }
    }

    handleClick(){
        director.resume()
        this.gameOverMenu.active = false
        SceneManager.getInstance().loadMenuScene()
    }

    update(deltaTime: number) {
        
    }
}


