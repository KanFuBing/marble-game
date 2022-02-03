const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    //States
    readonly DragOver: number = 2;

    readonly MoveStick: number = 3;

    readonly Launch: number = 4;

    State: number = this.DragOver;


    @property(cc.Prefab)
    marblePrefab: cc.Prefab = null;

    @property([cc.SpriteFrame])
    marbleSprites: cc.SpriteFrame[] = new Array(8);

    currentMarble: cc.Node = null;


    @property(cc.Prefab)
    obstacle3Prefab: cc.Prefab = null;


    @property(cc.Prefab)
    linePrefab: cc.Prefab = null;

    @property(cc.SpriteFrame)
    greenLineSprite: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    redLineSprite: cc.SpriteFrame = null;

    lines: cc.Node[] = [];

    greenLinesNum: number = 0;

    start(): void {
        cc.find("body1").zIndex = 1;
        cc.find("glass2").zIndex = 1;
        cc.find("rainbow").zIndex = 2;
        cc.find("body2").zIndex = 2;
        cc.find("Stick").zIndex = 3;
        cc.find("scenebg").zIndex = 4;
        cc.find("scene1").zIndex = 5;
        cc.find("scene2").zIndex = 5;
        cc.find("obstacle1").zIndex = 6;;
        cc.find("glass1").zIndex = 99;
        for (let index = 0; index < 7; index++) {
            this.initObstacle(448 - index * 50, 510);
        }
        for (let index = 0; index < 7; index++) {
            this.initObstacle(423 - index * 50, 550);
        }
        for (let index = 0; index < 7; index++) {
            this.initObstacle(448 - index * 50, 590);
        }
        for (let index = 0; index < 7; index++) {
            this.initObstacle(423 - index * 50, 630);
        }
        for (let index = 0; index < 8; index++) {
            this.lines[index] = this.initLine(448 - index * 50);
        }
        this.randomLines();
    }

    initObstacle(x: number, y: number): void {
        const obstacle3: cc.Node = cc.instantiate(this.obstacle3Prefab);
        obstacle3.setPosition(cc.v2(x, y));
        obstacle3.zIndex = 6;
        obstacle3.parent = cc.director.getScene();
    }

    initLine(x: number): cc.Node {
        const line: cc.Node = cc.instantiate(this.linePrefab);
        line.setPosition(cc.v2(x, 467));
        line.zIndex = 6;
        line.parent = cc.director.getScene();
        return line;
    }

    randomLines(): void {
        for (let index = 0; index < 8; index++) {
            const isGreen: boolean = Boolean(Math.floor(Math.random() * 1.7));
            if (isGreen === true) {
                this.lines[index].getComponent(cc.Sprite).spriteFrame = this.greenLineSprite;
                this.greenLinesNum += 1;
            }
        }
        if (this.greenLinesNum === 0 || this.greenLinesNum === 8) {
            this.randomLines();
        }
    }

    settle(marbleX: number): void {
        const marbleLineIndex: number = Math.floor((473 - marbleX) / 50);
        if (this.lines[marbleLineIndex].getComponent(cc.Sprite).spriteFrame.name === this.greenLineSprite.name) {
            for (let index = 0; index < 8 - this.greenLinesNum; index++) {
                this.initMarble(Math.floor(Math.random() * 8), 307, 386);
            }
        } //Win
    }

    initMarble(marbleSpriteIndex: number, x: number, y: number): void {
        const marble: cc.Node = cc.instantiate(this.marblePrefab);
        marble.setPosition(cc.v2(x, y));
        marble.getComponent(cc.Sprite).spriteFrame = this.marbleSprites[marbleSpriteIndex];
        marble.parent = cc.director.getScene();
    }
}
