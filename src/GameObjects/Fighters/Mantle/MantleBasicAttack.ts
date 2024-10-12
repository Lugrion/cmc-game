import Fighter from "../Fighter";


type spriteBasicConfig = {
    current_scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string
}

export default class MantleBasicAttack extends Phaser.Physics.Arcade.Sprite {

    private fighter: Fighter;

    constructor(spriteConfig: spriteBasicConfig, fighterRef: Fighter) {
        super(spriteConfig.current_scene, spriteConfig.x, spriteConfig.y, "");
        this.fighter = fighterRef;
        this.init();
    }

    init() {
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setVisible(false)
    }

    update() {
        this.body?.setSize(100, 150);
        if (this.flipX) {
            this.setPosition(this.fighter.x - 40, this.fighter.y);
        } else {
            this.setPosition(this.fighter.x + 40, this.fighter.y);

        }
        this.setVelocity(0, 0);
    }
}
