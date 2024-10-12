import { EventBus } from "../../../Config/EventBus";

export class LocalSelect extends Phaser.Scene {

    private p1_fighter: string = "";
    private p2_fighter: string = "";
    private isP1Selecting!: boolean;

    private start_game_txt!: Phaser.GameObjects.Text;
    private txt_p1_fighter!: Phaser.GameObjects.Text;
    private txt_p2_fighter!: Phaser.GameObjects.Text;

    constructor() {
        super('LocalSelect');

    }

    create() {

        this.add.image(this.cameras.main.width / 2, 320, 'background2').setScale(2);

        this.add.text(this.cameras.main.width / 2, 70, 'Select FIGHTER', {
            fontFamily: 'Arial Black', fontSize: 60, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);

        const go_back: Phaser.GameObjects.Text = this.add.text(this.cameras.main.width / 12, 40, '<Menu', {
            fontFamily: 'Arial Black', fontSize: 25, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'left'
        }).setDepth(100).setOrigin(0.5).setInteractive();

        go_back.on('pointerdown', () => {
            this.scene.stop('LocalSelect');
            this.scene.start('MainMenu');
        })

        this.playerFighterSelector()

        this.createMenuFighterAnimations()

        this.characterEntriesBuilder(this.cameras.main.width / 4, 200, 'Core', "core", 0)
        
        this.add.sprite(this.cameras.main.width / 4, 350, 'fighterCore').setOrigin(0.5).setScale(4).play('idle')

        this.characterEntriesBuilder(this.cameras.main.width / 2, 200, 'Mantle', "mantle", 1)

        this.add.sprite(this.cameras.main.width / 2, 350, 'fighterMantle').setOrigin(0.5).setScale(4).play('m-idle')

        this.characterEntriesBuilder(this.cameras.main.width / 4 * 3, 200, 'Crust', "crust", 2)

        this.add.sprite(this.cameras.main.width / 4 * 3, 350, 'fighterCrust').setOrigin(0.5).setScale(4).play('c-idle')
        


        this.add.text(this.cameras.main.width / 8, 550, 'Game Mode: \n ' + 'Local Play', {
            fontFamily: 'Arial Black', fontSize: 30, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5)


        this.start_game_txt = this.add.text(this.cameras.main.width - this.cameras.main.width / 8, 600, 'Start game', {
            fontFamily: 'Arial Black', fontSize: 30, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5).setInteractive().setVisible(false);


        this.start_game_txt.on('pointerdown', () => {
            this.scene.start('LocalPlay', { p1Fighter: this.p1_fighter, p2Fighter: this.p2_fighter });
            this.scene.start('LocalHUD')
            this.scene.bringToTop('LocalHUD')
        })

        EventBus.emit('current-scene-ready', this);
    }

    playerFighterSelector() {
        const changeP1: Phaser.GameObjects.Text = this.add.text(this.cameras.main.width / 2.5, 540,
            'P1 Fighter',
            {
                fontFamily: 'Arial Black', fontSize: 25, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8,
                align: 'left'
            }).setDepth(100).setOrigin(0.5).setInteractive();

        changeP1.on('pointerdown', () => {
            this.isP1Selecting = true;
            changeP1.setFontSize(35);
            changeP2.setFontSize(25);
        })

        const changeP2: Phaser.GameObjects.Text = this.add.text(this.cameras.main.width - this.cameras.main.width / 2.5, 540,
            'P2 Fighter',
            {
                fontFamily: 'Arial Black', fontSize: 25, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8,
                align: 'left'
            }).setDepth(100).setOrigin(0.5).setInteractive();

        changeP2.on('pointerdown', () => {
            this.isP1Selecting = false;
            changeP1.setFontSize(25);
            changeP2.setFontSize(35);
        })


        this.txt_p1_fighter = this.add.text(this.cameras.main.width / 2.5, 580,
            "",
            {
                fontFamily: 'Arial Black', fontSize: 25, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8,
                align: 'left'
            }).setDepth(100).setOrigin(0.5).setInteractive();

        this.txt_p2_fighter = this.add.text(this.cameras.main.width - this.cameras.main.width / 2.5, 580,
            "",
            {
                fontFamily: 'Arial Black', fontSize: 25, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8,
                align: 'left'
            }).setDepth(100).setOrigin(0.5).setInteractive();
    }

    characterEntriesBuilder(x: number, y: number, text: string, fighter: string, id: number) {

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

        this.textures.addCanvas(`txt_select${id}`, txt.canvas);

        const particles = this.add.particles(x, y, `txt_select${id}`, {
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

            if (this.isP1Selecting === true) {
                this.p1_fighter = fighter;
            }

            if (this.isP1Selecting === false) {
                this.p2_fighter = fighter;
            }

        });
    }

    createMenuFighterAnimations(){
        // Core
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('fighterCore', {
                prefix: 'idle' + '-',
                end: 10
            }),
            frameRate: 20,
            repeat: -1
        });

        // Mantle
        this.anims.create({
            key: 'm-idle',
            frames: this.anims.generateFrameNames('fighterMantle', {
                prefix: 'idle' + '-',
                end: 8
            }),
            frameRate: 20,
            repeat: -1
        });

        // Crust
        this.anims.create({
            key: 'c-idle',
            frames: this.anims.generateFrameNames('fighterCrust', {
                prefix: 'idle' + '-',
                end: 7
            }),
            frameRate: 16,
            repeat: -1
        });

    }

    update(): void {
        if ((this.p1_fighter != "") && (this.p2_fighter != "")) {
            this.start_game_txt.setVisible(true);
        }
        this.txt_p1_fighter.setText(this.p1_fighter)
        this.txt_p2_fighter.setText(this.p2_fighter)
    }
}