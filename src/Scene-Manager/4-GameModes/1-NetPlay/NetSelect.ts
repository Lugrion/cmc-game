import { EventBus } from "../../../Config/EventBus";

export class NetSelect extends Phaser.Scene {

    constructor() {
        super('NetSelect');
    }

    create() {
        this.add.image(this.cameras.main.width / 2, 320, 'background2').setScale(2);

        const go_back: Phaser.GameObjects.Text = this.add.text(this.cameras.main.width / 12, 40, '<Menu', {
            fontFamily: 'Arial Black', fontSize: 25, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'left'
        }).setDepth(100).setOrigin(0.5).setInteractive();

        go_back.on('pointerdown', () => {
            this.scene.start('MainMenu');
        })
        
        this.add.text(960 / 2, 320, 'On construction!', {
            fontFamily: 'Arial Black', fontSize: 60, color: '#ffffff',
            stroke: '#000000', strokeThickness: 15,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);
        EventBus.emit('current-scene-ready', this);
    }
}