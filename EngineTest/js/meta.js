/**
 * Working File for making a testing various game related classes.
 * These use or inherit the low-engine level classes, these can reference the game and other game related classes.
 */
/// <reference path="game.ts" />
/// <reference path="graphics.ts" />
/// <reference path="input.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Human = (function () {
    function Human(body, position, game) {
        this.redraw = true;
        this.position = position;
        this.body = body;
        this.gear = [];
        this.game = game;
    }
    Human.prototype.addGear = function (sprite) {
        this.gear.push(sprite);
    };
    Human.prototype.update = function () {
        var newPos = new Point(this.position.x * 16, this.position.y * 16);
        this.body.move(newPos);
        for (var _i = 0, _a = this.gear; _i < _a.length; _i++) {
            var gear = _a[_i];
            gear.move(newPos);
        }
    };
    Human.prototype.draw = function (ctx) {
        this.body.draw(ctx);
        for (var _i = 0, _a = this.gear; _i < _a.length; _i++) {
            var gear = _a[_i];
            gear.draw(ctx);
        }
    };
    return Human;
})();
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(body, position, game) {
        _super.call(this, body, position, game);
    }
    Player.prototype.update = function () {
        var dir = new Point(0, 0);
        if (Input.Keyboard.wasDown(Input.Keyboard.KEY.RIGHT)) {
            dir.x = 1;
            this.redraw = true;
        }
        if (Input.Keyboard.wasDown(Input.Keyboard.KEY.LEFT)) {
            dir.x = -1;
            this.redraw = true;
        }
        if (Input.Keyboard.wasDown(Input.Keyboard.KEY.UP)) {
            dir.y = -1;
            this.redraw = true;
        }
        if (Input.Keyboard.wasDown(Input.Keyboard.KEY.DOWN)) {
            dir.y = 1;
            this.redraw = true;
        }
        if (this.redraw) {
            var tile = this.game.World.getTile(this.position.x + dir.x, this.position.y + dir.y);
            if (tile && tile.walkable) {
                this.position.x += dir.x;
                this.position.y += dir.y;
            }
            this.redraw = false;
            this.game.change = true;
            _super.prototype.update.call(this);
        }
    };
    return Player;
})(Human);
var VTile = (function (_super) {
    __extends(VTile, _super);
    function VTile(texture, walkable) {
        if (walkable === void 0) { walkable = true; }
        _super.call(this, texture);
        this.walkable = walkable;
    }
    return VTile;
})(Tile);
var TileSet = (function () {
    function TileSet(sheet) {
        this.tiles = [];
        for (var i = 0; i < sheet.sprites.length; i++) {
            this.tiles.push(new VTile(sheet.sprites[i]));
        }
        if (sheet.name == "terrain") {
            this.tiles[2].walkable = false;
            this.tiles[3].walkable = false;
            this.tiles[4].walkable = false;
            this.tiles[12].walkable = false;
            this.tiles[13].walkable = false;
            this.tiles[14].walkable = false;
            this.tiles[22].walkable = false;
            this.tiles[23].walkable = false;
            this.tiles[24].walkable = false;
        }
    }
    return TileSet;
})();
var TileMap = (function () {
    function TileMap(size) {
        if (size === void 0) { size = new Dimension(1, 1); }
        this.size = size;
        this.tiles = [];
    }
    TileMap.prototype.setTile = function (x, y, value) {
        this.tiles[x + (y * this.size.width)] = value;
    };
    TileMap.prototype.getTile = function (x, y) {
        if (x == this.size.width || x < 0 || y == this.size.height || y < 0)
            return undefined;
        var tileVal = this.tiles[x + (y * this.size.width)];
        return this.tileSet.tiles[tileVal];
    };
    TileMap.prototype.setTileSet = function (set) {
        this.tileSet = set;
    };
    TileMap.prototype.generateTest = function () {
        this.tiles =
            [
                5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 12, 13, 14, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 22, 23, 24, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
            ];
    };
    TileMap.prototype.generateGrass = function () {
        for (var i = 0; i < (this.size.width * this.size.height); i++) {
            this.tiles[i] = 5;
        }
    };
    TileMap.prototype.generateBackdrop = function () {
        for (var i = 0; i < (this.size.width * this.size.height); i++) {
            this.tiles[i] = 0;
        }
    };
    TileMap.prototype.draw = function (ctx) {
        for (var y = 0; y < this.size.height; y++) {
            for (var x = 0; x < this.size.width; x++) {
                ctx.save();
                ctx.translate(x * 16, y * 16);
                this.getTile(x, y).draw(ctx);
                ctx.restore();
            }
        }
    };
    return TileMap;
})();
