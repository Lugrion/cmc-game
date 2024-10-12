import Fighter from "./Fighter";
import Core from "./Core/Core";
import Crust from "./Crust/Crust";
import Mantle from "./Mantle/Mantle";

type fighterType = "core" | "mantle" | "crust";

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

export default class FighterFactory {

    private constructor() { }

    static createFighter(fighterType: fighterType, spriteConfig: spriteBasicConfig, keyTemplate : fighterKeyControls): Fighter {
        switch (fighterType) {
            case "core": {
                spriteConfig.texture = "fighterCore";
                return new Core(spriteConfig, keyTemplate);
            }
            case "mantle": {
                spriteConfig.texture = "fighterMantle";
                return new Mantle(spriteConfig, keyTemplate);
            }
            case "crust": {
                spriteConfig.texture = "fighterCrust";
                return new Crust(spriteConfig, keyTemplate);
            }
        }
    }
}
