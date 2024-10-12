import { EventBus } from "../../../Config/EventBus";

export class LocalOver extends Phaser.Scene {

    private width!: number;
    private height!: number;

    constructor() {
        super('LocalOver');
    }

    init() {

        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create(data: { winner: string }) {

        this.add.image(this.width / 2, 320, 'background3').setScale(2);

        this.flexibleEntriesBuilder(this.width / 2, 260, 25, '<Menu', 'MainMenu', 0);
        this.flexibleEntriesBuilder(this.width / 2, this.height / 2, 50, 'Rematch', 'LocalSelect', 1);


        if (data.winner == 'p1') {
            this.flexibleWinnerAnimation('Player 1 WINS!!!!!', 0)
        } else if (data.winner == 'p2') {
            this.flexibleWinnerAnimation('Player 2 WINS!!!!!', 0)
        } else {
            this.flexibleWinnerAnimation('DRAWWW!!!!!', 0)
        }


        EventBus.emit('current-scene-ready', this);
    }

    flexibleEntriesBuilder(x: number, y: number, size: number, text: string, scene: string, id: number) {

        const txt = this.make.text({
            add: true,
            x: x,
            y: y,
            text: text,
            style: {
                fontSize: size,
                fontFamily: 'Arial Black',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center',
            }
        }).setDepth(100).setOrigin(0.5).setInteractive();

        this.textures.addCanvas(`txt_localOver${id}`, txt.canvas);

        const particles = this.add.particles(x, y, `txt_localOver${id}`, {
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
            this.scene.stop('LocalOver')
            this.scene.start(scene);
            this.scene.bringToTop(scene);
        });
    }

    flexibleWinnerAnimation(text: string, id: number) {

        const txt = this.make.text({
            add: true,
            x: this.width / 2,
            y: 80,
            text: text,
            style: {
                fontSize: 60,
                fontFamily: 'Arial Black',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center',
            }
        }).setDepth(100).setOrigin(0.5);

        this.textures.addCanvas(`txt_winner${id}`, txt.canvas);

        this.add.particles(this.cameras.main.width / 2, 80, `txt_winner${id}`, {
            alpha: { start: 1, end: 0 },
            speed: { min: 60, max: 260 },
            lifespan: { min: 1, max: 200 }
        });
    }
}