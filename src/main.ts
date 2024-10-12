import { Boot } from './Scene-Manager/1-Boot/Boot';
import { Preloader } from './Scene-Manager/2-Preloader/Preloader';

import { MainMenu } from './Scene-Manager/3-MainMenu/MainMenu';

import { NetPlay } from './Scene-Manager/4-GameModes/1-NetPlay/NetPlay';
import { NetSelect } from './Scene-Manager/4-GameModes/1-NetPlay/NetSelect';
import { NetHUD } from './Scene-Manager/4-GameModes/1-NetPlay/NetHUD';

import { LocalPlay } from './Scene-Manager/4-GameModes/2-LocalPlay/LocalPlay';
import LocalHUD from './Scene-Manager/4-GameModes/2-LocalPlay/LocalHUD';
import { LocalSelect } from './Scene-Manager/4-GameModes/2-LocalPlay/LocalSelect';

import { PracticePlay } from './Scene-Manager/4-GameModes/3-Practice/PracticePlay';
import { NetOver } from './Scene-Manager/4-GameModes/1-NetPlay/NetOver';
import { LocalOver } from './Scene-Manager/4-GameModes/2-LocalPlay/LocalOver';
import { PracticeSelect } from './Scene-Manager/4-GameModes/3-Practice/PracticeSelect';
import PracticeHUD from './Scene-Manager/4-GameModes/3-Practice/PracticeHUD';

import { Game } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    parent: 'game-container',
    backgroundColor: '#125555',
    pixelArt: true, 
    scene: [
        // Setup (assets loader etc)
        Preloader,
        Boot,

        // MainMenu
        MainMenu,

        // GameModes
        // --Online-- 
        NetPlay,
        NetHUD,
        NetSelect,
        NetOver,

        // --Local--
        LocalPlay,
        LocalHUD,
        LocalSelect,
        LocalOver,

        // --Practice--
        PracticePlay,
        PracticeHUD,
        PracticeSelect
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { 
                y: 600,
                x: 0
            },
            debug: false
        }
    }
};

export default new Game(config);
