import { _decorator, Component, Node, sys, director, Label, log } from 'cc';
import { PrintCurrentScore } from "../GameActions/PrintCurrentScore"
const { ccclass, property } = _decorator;

@ccclass('ScoreManager')
export class ScoreManager extends Component {
    
    private static instance: ScoreManager | null = null
    private currentScore: number = 0
    private highScore: number = 0
    private localStorageKey: string = 'highscore'
    private subs: PrintCurrentScore[] = []


    public static getInstance(): ScoreManager {
        if(!ScoreManager.instance){
            const newNode = new Node('ScoreManager')
            ScoreManager.instance = newNode.addComponent(ScoreManager)
            director.addPersistRootNode(newNode)
            this.instance.loadHighScore()
        }
        return ScoreManager.instance
    }

    start() {
        if(ScoreManager.instance !== this) {
            this.destroy()
            return;
        }
        ScoreManager.instance = this
    }

    subscribe(node: PrintCurrentScore){
        this.subs.push(node)
    }

    unsubscribe(delete_node: PrintCurrentScore){
        this.subs = this.subs.filter(node => node != delete_node)
    }

    sendMessageSubs(msg: number): void{
        this.subs.forEach(sub => {
            sub.updateScore(msg)
        })
    }

    addScore(points: number): void {
        this.currentScore += points
        this.sendMessageSubs(this.currentScore)
    }

    resetScore(): void {
        this.currentScore = 0
        this.sendMessageSubs(this.currentScore)
    }

    getCurrentScore(): number {
        return this.currentScore
    }

    getHighScore():number {
        return this.highScore
    }

    saveHighScore(): void {
        if (this.currentScore > this.highScore) {
            this.highScore = this.currentScore
            sys.localStorage.setItem(this.localStorageKey, this.highScore.toString())
        }
        this.resetScore()
    }


    loadHighScore(): void {
        const savedScore = sys.localStorage.getItem(this.localStorageKey)
        if (savedScore) {
            this.highScore = parseInt(savedScore, 10)
            console.log(`Loaded High Score: ${this.highScore}`)
        }else{
            this.highScore = 0
        }
    }

    update(deltaTime: number) {
        
    }
}


