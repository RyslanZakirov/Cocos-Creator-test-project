import { _decorator, Component, Node, Label } from 'cc';
import { ScoreManager } from '../Mangers/ScoreManager';
const { ccclass, property } = _decorator;

@ccclass('PrintBestScore')
export class PrintBestScore extends Component {
    start() {
        this.node.getComponent(Label).string = `Лучший счет: ${ScoreManager.getInstance().getHighScore()}`
    }

    update(deltaTime: number) {
        
    }
}


