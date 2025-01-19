import { _decorator, Component, director, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
import { ScoreManager } from '../Mangers/ScoreManager';

@ccclass('PrintCurrentScore')
export class PrintCurrentScore extends Component {
    
    start() {       
        this.node.getComponent(Label).string = `Текущий счет: ${ScoreManager.getInstance().getCurrentScore()}`
        ScoreManager.getInstance().subscribe(this)
    }

    updateScore(newScore: number): void {
        this.node.getComponent(Label).string = `Текущий счет: ${newScore}`
    }

    onDestroy(){
        ScoreManager.getInstance().unsubscribe(this)
    }

    update(deltaTime: number) {
        
    }
}


