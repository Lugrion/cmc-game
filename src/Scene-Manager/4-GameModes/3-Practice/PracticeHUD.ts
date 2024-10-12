import { PracticePlay } from "./PracticePlay";

export default class PracticeHUD extends Phaser.Scene {

    private game_scene!: PracticePlay;
    private width!: number;
    private height!: number;

    constructor() {
        super('PracticeHUD');
    }

    init() {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.game_scene = this.scene.get('PracticePlay');

    }

    create() {

        const go_back: Phaser.GameObjects.Text = this.add.text(this.width / 12, 40, '<Menu', {
            fontFamily: 'Arial Black', fontSize: 25, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'left'
        }).setDepth(100).setOrigin(0.5).setInteractive();

        go_back.on('pointerdown', () => {
            this.scene.stop('PracticePlay');
            this.scene.stop('PracticeHUD');
            this.scene.start('MainMenu');
            this.scene.bringToTop('MainMenu');
        })
    }


}
