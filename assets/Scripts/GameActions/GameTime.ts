import { _decorator, Component, director, Label, Node } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('GameTime')
export class GameTime extends Component {
    
    @property(Label)
    private currentTimeLabel : Label | null = null

    @property(Node)
    private gameOverWindow: Node | null = null

    @property
    private gameDuration : number = 60
    
    private currentTime: number = 0

    start() {
        this.currentTime = this.gameDuration
        
        if(this.gameOverWindow.active){
            this.gameOverWindow.active = false
        }
    }

    update(deltaTime: number) {
        if (this.currentTime > 0) {
            this.currentTime -= deltaTime;
            this.updateTimerLabel();
         } else {
            this.endGame();
        }
    }

    updateTimerLabel(){
        if (this.currentTimeLabel) {
            this.currentTimeLabel.string = `Time: ${Math.ceil(this.currentTime)}`;
        }
    }

    endGame() {
        console.log("Time is up, game over!");
        // director.pause()
        this.gameOverWindow.active = true       
    }
}


