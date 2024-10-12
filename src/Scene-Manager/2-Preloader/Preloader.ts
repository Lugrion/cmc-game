export class Preloader extends Phaser.Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        // this.add.image(960 / 2, 320, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress : number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        this.load.path = '/assets/';
        //  Load the assets for the game - Replace with your own assets
        
        this.load.image('background', 'bg.png');
        this.load.image('background2', 'bg2.png');
        this.load.image('background3', 'bg3.png');


        // MAPS
        // Test
        this.load.tilemapTiledJSON('mapTest', 'Arenas/Test/Test.json');
        this.load.image('TerrainTest', 'Arenas/Test/TerrainTest.png');

        // FIGHTERS
        // Core
        this.loadCoreAssets();
        
        

        // Crust
        this.load.atlas('fighterCrust', 'Fighters/Crust/crust.png', 'Fighters/Crust/crust.json');

        // Mantle
        this.load.atlas('fighterMantle', 'Fighters/Mantle/mantle.png', 'Fighters/Mantle/mantle.json');


        
        
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }

    loadCoreAssets(){
        this.load.atlas('fighterCore', 'Fighters/Core/core.png', 'Fighters/Core/core.json');
        const core_attack = this.make.text({
            add: true,
            x: 0,
            y: 0,
            text: "XDDD",
            style: {
                fontSize: 18,
                fontFamily: 'Arial Black',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center',
            }
        }).setVisible(false);

        this.textures.addCanvas('core_attack', core_attack.canvas);
    }
}
