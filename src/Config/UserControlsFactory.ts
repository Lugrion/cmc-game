import UserControls from "./UserControls"

type fighterControls = {
    goJump: number | string,
    goLeft: number | string,
    goRight: number | string,
    basicAttackKey: number | string
}


type playerNum = "p1" | "p2";

export default class UserControlsFactory {

    private constructor() { }

    static createUserControls(player: playerNum): fighterControls {
        switch (player) {
            case "p1": {
                return new UserControls().getControlsP1();
            }
            case "p2": {
                return new UserControls().getControlsP2();
            }
        }
    }

}
