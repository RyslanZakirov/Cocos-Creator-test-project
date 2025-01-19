import { _decorator, Color, Component, Graphics, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CreateFormStar')
export class CreateFormStar extends Component {

    @property
    starSize: number = 50

    @property
    starColor: string = "#FFFF00";

    onLoad() {
        this.drawStar();
    }

    drawStar() {
        const graphics = this.getComponent(Graphics);

        graphics.clear();
        graphics.fillColor.fromHEX(this.starColor);

        const points = this.calculateStarPoints()
        graphics.moveTo(points[0].x, points[0].y)

        for (let i = 1; i < points.length; i++) {
            graphics.lineTo(points[i].x, points[i].y)
        }
        graphics.close()
        graphics.fill()
    }

    calculateStarPoints(): Vec2[] {
        const points: Vec2[] = []
        const center = new Vec2(0, 0)
        const outerRadius = this.starSize / 2
        const innerRadius = outerRadius * 0.4
        const numPoints = 5
        const angle = Math.PI / numPoints

        for (let i = 0; i < 2 * numPoints; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius
            const x = center.x + radius * Math.cos(i * angle + Math.PI/2)
            const y = center.y + radius * Math.sin(i * angle + Math.PI/2)
            points.push(new Vec2(x, y))
        }
        return points
   }
}