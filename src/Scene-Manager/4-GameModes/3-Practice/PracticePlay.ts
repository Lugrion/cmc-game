import { EventBus } from "../../../Config/EventBus";
import UserControlsFactory from "../../../Config/UserControlsFactory";
import Fighter from "../../../GameObjects/Fighters/Fighter";
import FighterFactory from "../../../GameObjects/Fighters/FighterFactory";

type fighterType = "core" | "mantle" | "crust";

export class PracticePlay extends Phaser.Scene {
    private width!: number;
    private height!: number;

    private map_container!: Phaser.Tilemaps.Tilemap;
    private map_packer!: Phaser.Tilemaps.Tileset | null;
    private map_layer!: Phaser.Tilemaps.TilemapLayer | null;

    private fighter_P1!: Fighter;

    constructor() {
        super('PracticePlay');
    }

    init() {

        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create(data: {p1Fighter: fighterType, p2Fighter: fighterType}) {
        // Ensure the background image exists
        this.add.image(this.cameras.main.width / 2, 320, 'background3').setScale(2);

        // Initialize map_container and related properties in create method
        this.setupMapTiles();

        this.cameras.main.setBounds(0, 0, this.map_container.widthInPixels, this.map_container.heightInPixels);
        // Set collision for the layer
        this.spawnFighters(data);

        this.setupPhysics();

        EventBus.emit('current-scene-ready', this);
    }

    setupMapTiles() {
        this.map_container = this.make.tilemap({ key: 'mapTest', tileWidth: 16, tileHeight: 16 });
        
        this.map_packer = this.map_container.addTilesetImage('TerrainTest');
        if(this.map_packer == null) {return}
        this.map_layer = this.map_container.createLayer('Platforms', this.map_packer);
    }

    spawnFighters(data: {p1Fighter: fighterType, p2Fighter: fighterType}) {
        this.fighter_P1 = FighterFactory.createFighter(data.p1Fighter, {
            current_scene: this,
            x: this.width / 2,
            y: this.height / 2,
            texture: 'fighterTest'
        }, UserControlsFactory.createUserControls("p1"));
    }

    setupPhysics() {
        if(this.map_layer == null) {return}
        this.map_layer.setCollisionByExclusion([-1]);
        this.physics.world.bounds.setTo(0, 0, this.map_container.widthInPixels, this.map_container.heightInPixels);
        this.physics.add.collider(this.fighter_P1, this.map_layer);
    }

    
    

    update() {
        this.fighter_P1.update();
    }
}
