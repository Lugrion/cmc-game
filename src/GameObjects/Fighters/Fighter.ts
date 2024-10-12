type fighterKeyControls = {
    goJump: number | string,
    goLeft: number | string,
    goRight: number | string,
    basicAttackKey: number | string
}

type fighterControls = {
    goJump: Phaser.Input.Keyboard.Key,
    goLeft: Phaser.Input.Keyboard.Key,
    goRight: Phaser.Input.Keyboard.Key,
    basicAttackKey: Phaser.Input.Keyboard.Key
}

type spriteBasicConfig = {
    current_scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string
}

export default class Fighter extends Phaser.Physics.Arcade.Sprite {

    public readonly _defaultStats = Object.freeze({
        hp: 100,
        speed: 300,
        jump: 400,
        height: 43,
        width: 30,
        time: 1,
        dmg: 10,
    });

    // We don't want to protect the values inside as they will be changed by Fighter's children
    protected readonly _multiplier = {
        hp: 1,
        speed: 1,
        jump: 1,
        height: 1,
        width: 1,
        time: 1,
        dmg: 1
    }

    getHpStat(): number {
        return this._defaultStats.hp * this._multiplier.hp;
    }

    getDmgStat(): number {
        return this._defaultStats.dmg * this._multiplier.dmg;
    }

    getSpeedStat(): number {
        return this._defaultStats.speed * this._multiplier.speed;
    }

    getJumpStat(): number {
        return this._defaultStats.jump * this._multiplier.jump;
    }

    getHeightStat(): number {
        return this._defaultStats.height * this._multiplier.height;
    }

    getWidthStat(): number {
        return this._defaultStats.width * this._multiplier.width;
    }

    getTimeStat(): number {
        return this._defaultStats.time * this._multiplier.time;
    }

    protected controls: object | undefined | fighterControls;

    public basicAttack!: Phaser.Physics.Arcade.Sprite;

    public isFighterHit: boolean = false;

    public isAttackReady: boolean = true;

    public isAttacking: boolean = false;

    public isDead: boolean = false;

    public gameHP: number;

    constructor(
        spriteConfig: spriteBasicConfig,
        keyTemplate: fighterKeyControls
    ) {
        super(spriteConfig.current_scene, spriteConfig.x, spriteConfig.y, spriteConfig.texture);

        this.scene = spriteConfig.current_scene;

        // Build Controls
        this.updateControls(keyTemplate);
        this.gameHP = this.getHpStat()
        this.init();
    }

    init() {
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);
    }


    updateControls(keyTemplate: fighterKeyControls) {
        this.controls = this.scene.input.keyboard?.addKeys(keyTemplate);
    }

    goLeft() {
        console.log("LEFT")
    }

    goRight() {
        console.log("RIGHT")
    }

    goJump() {
        console.log("JUMP")
    }

    goAttack() {
        console.log("ATTACK")
    }

    goIdle() {
        console.log("IDLE")
    }

    basicMovement() {
        if (this.controls == undefined) { return }

        if (this.controls.goLeft.isDown) {
            this.goLeft()
        } else if (this.controls.goRight.isDown) {
            this.goRight()
        } else {
            this.goIdle()
        }


        if (this.controls.goJump.isDown && this.body?.blocked.down) {
            this.goJump()
        }

        if (this.controls.basicAttackKey.isDown && this.isAttackReady && !this.isAttacking) {
            this.goAttack()
        }
    }

    newEnemyRules(enemy: Fighter) {
        console.log("New Rules! " + enemy)
    }


    addEnemy(enemy: Fighter) {
        this.newEnemyRules(enemy)
    }

    finalWill() {
        console.log("Y-you win...");
    }

    update(): void {
        if (this.gameHP > 0) {
            // Update the weapon
            this.basicAttack.update()

            // Update the movement
            this.basicMovement();

            // Check size stats
            this.body?.setSize(this.getWidthStat(), this.getHeightStat());
        } else if (this.isDead == false) {
            this.finalWill()
            this.isDead = true
        } else {
            this.setVelocity(0, 0);
        }
    }
}