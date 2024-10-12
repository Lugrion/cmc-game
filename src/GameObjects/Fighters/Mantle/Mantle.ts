import Fighter from "../Fighter";
import MantleBasicAttack from "./MantleBasicAttack";

type fighterKeyControls = {
    goJump: number | string,
    goLeft: number | string,
    goRight: number | string,
    basicAttackKey: number | string
}

type spriteBasicConfig = {
    current_scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string
}

export default class Mantle extends Fighter {
    protected _multiplier = {
        hp: 2,
        speed: 0.75,
        jump: 1,
        height: 0.75,
        width: 1.25,
        time: 1,
        dmg: 2.5
    }

    constructor(
        spriteConfig: spriteBasicConfig,
        keyTemplate: fighterKeyControls,
    ) {
        super(spriteConfig, keyTemplate)

        // Setup Basic Attack
        this.basicAttack = new MantleBasicAttack(spriteConfig, this);
        this.setScale(2)
        this.gameHP = this.getHpStat()
        this.setupAnimation();

    }

    goLeft() {
        this.setVelocityX(-this.getSpeedStat());
        if (this.isAttackReady && !this.isFighterHit) this.anims.play('m-run', true);
        this.flipX = true;
        this.basicAttack.flipX = true;
    }

    goRight() {
        this.setVelocityX(this.getSpeedStat());
        if (this.isAttackReady && !this.isFighterHit) this.anims.play('m-run', true);
        this.flipX = false;
        this.basicAttack.flipX = false;
    }

    goJump() {
        this.setVelocityY(-this.getJumpStat());
    }

    goIdle() {
        this.setVelocityX(0);
        if (this.isAttackReady && !this.isFighterHit) this.anims.play('m-idle', true);
    }

    goAttack() {
        this.isAttackReady = false;
        this.play('m-attack', true);

        this.scene.time.addEvent({
            // Slow attack, time until the attack slashes
            delay: 400,
            callback: () => {
                this.isAttacking = true;
                // this.basicAttack.setVisible(true)

                this.scene.time.addEvent({
                    // Duration the attack hitbox is active and visible in milliseconds
                    delay: 100,
                    callback: () => {
                        this.isAttacking = false;
                        // this.basicAttack.setVisible(false)

                        this.scene.time.addEvent({
                            // Cooldown of the attack
                            delay: 200,
                            callback: () => {
                                // Fetch the cooldown
                                this.isAttackReady = true;
                            }
                        })
                    }
                })
            }
        })
    }

    finalWill(){
        this.anims.play('m-death', true);
    }

    newEnemyRules(enemy: Fighter) {
        this.scene.physics.add.overlap(enemy.basicAttack, this, () => {
            if (!this.isFighterHit && enemy.isAttacking && !this.isDead) {
                this.isFighterHit = true
                this.anims.stop()
                this.anims.play('m-hit', true);
                this.gameHP -= enemy.getDmgStat();
                this.scene.time.addEvent({
                    delay: 300,
                    callback: () => {
                        this.isFighterHit = false;
                    }
                });
            }
        })
    }

    setupAnimation() {
        this.anims.create({
            key: 'm-idle',
            frames: this.anims.generateFrameNames('fighterMantle', {
                prefix: 'idle' + '-',
                end: 8
            }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'm-run',
            frames: this.anims.generateFrameNames('fighterMantle', {
                prefix: 'run' + '-',
                end: 5
            }),
            frameRate: 15,
            repeat: 0
        });

        this.anims.create({
            key: 'm-death',
            frames: this.anims.generateFrameNames('fighterMantle', {
                prefix: 'death' + '-',
                end: 22
            }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'm-attack',
            frames: this.anims.generateFrameNames('fighterMantle', {
                prefix: 'attack' + '-',
                end: 11
            }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'm-hit',
            frames: this.anims.generateFrameNames('fighterMantle', {
                prefix: 'hit' + '-',
                end: 4
            }),
            frameRate: 20,
            repeat: 0
        });
    }
}

