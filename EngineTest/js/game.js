/**
 * Working file for the main game object and loop.
 */
/// <reference path="../lib/underscore.browser.d.ts" />
/// <reference path="graphics.ts" />
/// <reference path="patterns.ts" />
/// <reference path="meta.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Profiler = (function (_super) {
    __extends(Profiler, _super);
    function Profiler() {
        _super.apply(this, arguments);
        this.FPS = 0;
        this.timer = 0.0;
    }
    Profiler.prototype.profile = function (delta) {
        this.timer += delta;
        if (this.timer >= 1000.0) {
            this.timer -= 1000.0;
            this.emit(this.FPS);
            this.FPS = 0;
        }
        ;
        this.FPS++;
    };
    return Profiler;
})(Subject);
var Context2D = (function (_super) {
    __extends(Context2D, _super);
    function Context2D() {
        _super.apply(this, arguments);
    }
    return Context2D;
})(CanvasRenderingContext2D);
var Layer = (function () {
    function Layer(screen) {
        this.screen = screen;
        this.ctx = this.screen.getContext('2d');
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
    }
    return Layer;
})();
var Game = (function () {
    function Game() {
        var screens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            screens[_i - 0] = arguments[_i];
        }
        this.Layers = [];
        this.camera = new Point(1 * 16, 1 * 16);
        this.change = true;
        this.clearScreen = true;
        this.then = performance.now();
        this.lag = 0.0;
        this.skippedFrames = 0;
        console.log("Setting up screen and Profiler...");
        for (var _a = 0; _a < screens.length; _a++) {
            var screen = screens[_a];
            this.Layers.push(new Layer(screen));
        }
        this.screen = this.Layers[0];
        this.profiler = new Profiler();
        var FPSHeader = document.getElementById("UPS");
        this.profiler.addObserver(function (FPS) {
            FPSHeader.innerHTML = FPS;
        });
    }
    Game.prototype.init = function () {
        console.log("Initializing...");
        SpriteSheetCache.storeSheet(new SpriteSheet("sheet", "hero", 16, 1, new Dimension(2, 4), new Point(0, 0)));
        SpriteSheetCache.storeSheet(new SpriteSheet("sheet", "lower", 16, 1, new Dimension(2, 10), new Point(52, 0)));
        SpriteSheetCache.storeSheet(new SpriteSheet("sheet", "upper", 16, 1, new Dimension(12, 10), new Point(103, 0)));
        SpriteSheetCache.storeSheet(new SpriteSheet("terrain", "terrain", 16, 1, new Dimension(10, 25), new Point(0, 0)));
        SpriteSheetCache.storeSheet(new SpriteSheet("terrain", "tree", 16, 1, new Dimension(1, 1), new Point(221, 153)));
        this.Player = new Player(new Sprite(SpriteSheetCache.spriteSheet("hero").sprites[0]), new Point(0, 0), this);
        this.Player.addGear(new Sprite(SpriteSheetCache.spriteSheet("lower").sprites[10]));
        this.Player.addGear(new Sprite(SpriteSheetCache.spriteSheet("lower").sprites[11]));
        this.Player.addGear(new Sprite(SpriteSheetCache.spriteSheet("upper").sprites[3]));
        this.World = new TileMap(new Dimension(48, 23));
        this.BackdropL1 = new TileMap(new Dimension(50, 25));
        this.BackdropL2 = new TileMap(new Dimension(50, 25));
        var tileSet = new TileSet(SpriteSheetCache.spriteSheet("terrain"));
        this.World.setTileSet(tileSet);
        this.World.generateTest();
        this.BackdropL1.setTileSet(tileSet);
        this.BackdropL1.generateGrass();
        tileSet = new TileSet(SpriteSheetCache.spriteSheet("tree"));
        this.BackdropL2.setTileSet(tileSet);
        this.BackdropL2.generateBackdrop();
    };
    Game.prototype.update = function (delta) {
        this.Player.update();
    };
    Game.prototype.draw = function () {
        if (this.clearScreen) {
            this.BackdropL1.draw(this.Layers[0].ctx);
            this.BackdropL2.draw(this.Layers[0].ctx);
            this.clearScreen = false;
        }
        if (this.change) {
            this.Layers[0].ctx.save();
            this.Layers[0].ctx.translate(this.camera.x, this.camera.y);
            this.World.draw(this.Layers[0].ctx);
            this.Player.draw(this.Layers[0].ctx);
            this.Layers[0].ctx.restore();
            this.change = false;
        }
    };
    Game.prototype.render = function () {
        var now = performance.now();
        var delta = (now - this.then);
        this.then = now;
        this.lag += delta;
        this.skippedFrames = 0;
        while (this.lag >= Game.DELTA_CONST && this.skippedFrames < 10) {
            this.update(delta);
            this.lag -= Game.DELTA_CONST;
            this.skippedFrames++;
        }
        if (this.clearScreen) {
            this.Layers[0].ctx.clearRect(0, 0, this.Layers[0].screen.width, this.Layers[0].screen.height);
        }
        this.draw();
        this.profiler.profile(delta);
        window.requestAnimationFrame(this.render.bind(this));
    };
    Game.prototype.run = function () {
        console.log("Game running");
        window.requestAnimationFrame(this.render.bind(this));
    };
    Game.prototype.stop = function () {
        console.log("Game stopped");
        clearInterval(this._loopHandle);
    };
    Game.frameRate = 60.0;
    Game.DELTA_CONST = Math2.round(1000.0 / Game.frameRate, 3);
    return Game;
})();
window.onload = function () {
    window.onkeydown = Input.Keyboard.keyDown;
    window.onkeyup = Input.Keyboard.keyUp;
    var c = document.getElementById("layer_1");
    var game = new Game(c);
    ImageCache.Loader.add("sheet", "assets/roguelikeChar_transparent.png");
    ImageCache.Loader.add("terrain", "assets/roguelikeSheet_transparent.png");
    ImageCache.Loader.load(function () {
        game.init();
        game.run();
    });
};
