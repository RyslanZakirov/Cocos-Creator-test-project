import { _decorator, Component, Node, Label, Button, director } from 'cc';
import { ScoreManager } from '../Mangers/ScoreManager';
import { SceneManager } from '../Mangers/SceneManager';

const { ccclass, property } = _decorator;

@ccclass('GameOverMenuController')
export class GameOverMenuController extends Component {
    
    @property(Label)
    private endScoreLabel : Label | null = null

    start() {
        director.pause()
        this.endScoreLabel.string = `Итоговый счет: ${ScoreManager.getInstance().getCurrentScore()}`
        ScoreManager.getInstance().saveHighScore()
    }

    update(deltaTime: number) {
        
    }
}


