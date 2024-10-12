import { Scene } from 'phaser';
import { EventBus } from '../../Config/EventBus';

export class MainMenu extends Scene {

    private width!: number;
    private height!: number;

    constructor() {
        super('MainMenu');
    }

    init() {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create() {
        this.add.image(this.width / 2, 320, 'background');

        this.add.text(this.width / 2, 150, 'C. M. C.', {
            fontFamily: 'Arial Black', fontSize: 60, color: '#ffffff',
            stroke: '#000000', strokeThickness: 15,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);


        // Main Menu entries
        this.menuEntriesBuilder(this.width / 2, 260, 'Local Play', 'LocalSelect', 1);
        this.menuEntriesBuilder(this.width / 2, 340, 'Practice', 'PracticeSelect', 2);
        this.menuEntriesBuilder(this.width / 2, 420, 'Net Play', 'NetSelect', 0);
        EventBus.emit('current-scene-ready', this);
    }


    menuEntriesBuilder(x: number, y: number, text: string, scene: string, id: number) {

        const txt = this.make.text({
            add: true,
            x: x,
            y: y,
            text: text,
            style: {
                fontSize: 38,
                fontFamily: 'Arial Black',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center',
            }
        }).setDepth(100).setOrigin(0.5).setInteractive();

        this.textures.addCanvas(`txt_menu${id}`, txt.canvas);

        const particles = this.add.particles(x, y, `txt_menu${id}`, {
            alpha: { start: 1, end: 0 },
            speed: { min: 60, max: 260 },
            lifespan: { min: 1, max: 200 }
        }).setVisible(false);

        txt.on('pointerover', () => {
            particles.setVisible(true);
        });

        txt.on('pointerout', () => {
            particles.setVisible(false);
        });

        txt.on('pointerdown', () => {
            this.scene.stop('MainMenu')
            this.scene.start(scene);
        });
    }

}
