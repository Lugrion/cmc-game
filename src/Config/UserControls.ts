type mainControls = {
    goJump: number | string,
    goLeft: number | string,
    goRight: number | string,
    basicAttackKey: number | string
}

export default class UserControls {
    private readonly _defaultControlP1: mainControls = Object.freeze(
        {
            goJump: Phaser.Input.Keyboard.KeyCodes.W,
            goLeft: Phaser.Input.Keyboard.KeyCodes.A,
            goRight: Phaser.Input.Keyboard.KeyCodes.D,
            basicAttackKey: Phaser.Input.Keyboard.KeyCodes.SPACE
        }
    )

    private readonly _defaultControlP2: mainControls = Object.freeze(
        {
            goJump: Phaser.Input.Keyboard.KeyCodes.UP,
            goLeft: Phaser.Input.Keyboard.KeyCodes.LEFT,
            goRight: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            basicAttackKey: Phaser.Input.Keyboard.KeyCodes.ENTER
        }
    )

    private userControlerP1: mainControls;
    private userControlerP2: mainControls;

    constructor(userTemplateP1?: mainControls, userTemplateP2?: mainControls) {

        this.userControlerP1 = this._defaultControlP1;
        this.userControlerP2 = this._defaultControlP2;
        
        if (userTemplateP1 !== undefined) {
            this.userControlerP1 = userTemplateP1;
        }
        if (userTemplateP2 !== undefined) {
            this.userControlerP2 = userTemplateP2;
        }
    }

    getControlsP1() {
        return this.userControlerP1;
    }

    getControlsP2() {
        return this.userControlerP2;
    }
}