import Fighter from "../Fighter";
import CrustBasicAttack from "./CrustBasicAttack";

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

export default class Crust extends Fighter {
    protected _multiplier = {
        hp: 1,
        speed: 1,
        jump: 1,
        height: 1,
        width: 1,
        time: 1,
        dmg: 1
    }

    constructor(
        spriteConfig: spriteBasicConfig,
        keyTemplate: fighterKeyControls,
    ) {
        super(spriteConfig, keyTemplate)
        this.basicAttack = new CrustBasicAttack(spriteConfig, this);
        this.setScale(2);
        this.gameHP = this.getHpStat()
        this.setupAnimation();
        this.play("c-idle")
    }

    goLeft() {
        this.setVelocityX(-this.getSpeedStat());
        if (this.body?.blocked.down && this.isAttackReady && !this.isFighterHit) {
            this.anims.play('c-run', true);
        } else if (this.isAttackReady && !this.isFighterHit) {
            this.anims.play('c-fall', true);
        }
        this.flipX = true;
        this.basicAttack.flipX = true;
    }

    goRight() {
        this.setVelocityX(this.getSpeedStat());
        if (this.body?.blocked.down && this.isAttackReady && !this.isFighterHit) {
            this.anims.play('c-run', true);
        } else if (this.isAttackReady && !this.isFighterHit) {
            this.anims.play('c-fall', true);
        }
        this.flipX = false;
        this.basicAttack.flipX = false;
    }

    goJump() {
        this.setVelocityY(-this.getJumpStat());
        
        if (this.isAttackReady) this.anims.play('c-jump', true);
    }

    goIdle() {
        this.setVelocityX(0);
        if (this.body?.blocked.down && this.isAttackReady && !this.isFighterHit && !this.isDead) this.anims.play('c-idle', true);
    }

    goAttack() {
        this.isAttackReady = false;
        this.anims.stop()
        this.play('c-attack', true);

        this.scene.time.addEvent({
            // Slow attack, time until the attack slashes
            delay: 230,
            callback: () => {
                this.isAttacking = true;

                this.scene.time.addEvent({
                    // Duration the attack hitbox is active and visible in milliseconds
                    delay: 20,
                    callback: () => {
                        this.isAttacking = false;

                        this.scene.time.addEvent({
                            // Cooldown of the attack
                            delay: 100,
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
        this.anims.play('c-death', true);
    }

    newEnemyRules(enemy: Fighter) {
        this.scene.physics.add.overlap(enemy.basicAttack, this, () => {
            if (!this.isFighterHit && enemy.isAttacking && !this.isDead) {
                this.isFighterHit = true
                this.gameHP -= enemy.getDmgStat();
                this.tint = 0xff0000;
                this.anims.stop()
                this.anims.play('c-hit', true);
                this.scene.time.addEvent({
                    delay: 300,
                    callback: () => {
                        this.isFighterHit = false;
                        this.tint = 0xffffff;
                    }
                });
            }
        })
    }

    setupAnimation() {

        // Attack
        this.anims.create({
            key: 'c-attack',
            frames: this.anims.generateFrameNames('fighterCrust', {
                prefix: 'attack' + '-',
                end: 5
            }),
            frameRate: 16,
            repeat: 0
        });


        // Death
        this.anims.create({
            key: 'c-death',
            frames: this.anims.generateFrameNames('fighterCrust', {
                prefix: 'death' + '-',
                end: 5
            }),
            frameRate: 16,
            repeat: 0
        });


        // Fall
        this.anims.create({
            key: 'c-fall',
            frames: this.anims.generateFrameNames('fighterCrust', {
                prefix: 'fall' + '-',
                end: 1
            }),
            frameRate: 16,
            repeat: 0
        });


        // Hit damage
        this.anims.create({
            key: 'c-hit',
            frames: this.anims.generateFrameNames('fighterCrust', {
                prefix: 'hit' + '-',
                end: 3
            }),
            frameRate: 12,
            repeat: 0
        });


        // Standing animation
        this.anims.create({
            key: 'c-idle',
            frames: this.anims.generateFrameNames('fighterCrust', {
                prefix: 'idle' + '-',
                end: 7
            }),
            frameRate: 16,
            repeat: 0
        });

        // Running animation
        this.anims.create({
            key: 'c-jump',
            frames: this.anims.generateFrameNames('fighterCrust', {
                prefix: 'jump' + '-',
                end: 1
            }),
            frameRate: 16,
            repeat: 0
        });

        // Running animation
        this.anims.create({
            key: 'c-run',
            frames: this.anims.generateFrameNames('fighterCrust', {
                prefix: 'run' + '-',
                end: 7
            }),
            frameRate: 16,
            repeat: 0
        });





    }
}

