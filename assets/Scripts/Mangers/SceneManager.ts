import { _decorator, Component, Node, director, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends Component {
    
    private static instance: SceneManager | null = null
    private currentScene: string = ""

    public static getInstance(): SceneManager {
        if (!SceneManager.instance) {
            const newNode = new Node('SceneManager')
            SceneManager.instance = newNode.addComponent(SceneManager)
            director.addPersistRootNode(newNode)
            const scene = director.getScene()?.name
            if(scene) {
                this.instance.currentScene = scene
            }
        }
        return SceneManager.instance
    }

    start() {
        if (SceneManager.instance !== this) {
            this.destroy()
            return
        }
        SceneManager.instance = this
    }

    onDestroy() {
        if(SceneManager.instance === this) {
            SceneManager.instance = null
        }
    }

    loadMenuScene() {
        director.loadScene("menu", () => {
            this.currentScene = "menu"
            console.log("Menu scene loaded")
        })
    }
 
    loadGameScene() {
        director.loadScene("game", () => {
            this.currentScene = "game"
        })
    }

    restartGame() {
        director.loadScene("game", () => {
            this.currentScene = "game"
        })
    }

    getCurrentScene() {
        return this.currentScene
    }

    update(deltaTime: number) {
        
    }
}


