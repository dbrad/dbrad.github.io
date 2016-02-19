function randomInt(t,e){return Math.floor(Math.random()*(e-t+1))+t}function shuffle(t){for(var e,i,s=t.length;0!==s;)i=Math.floor(Math.random()*s),s-=1,e=t[s],t[s]=t[i],t[i]=e;return t}function onResize(){var t=document.getElementById("gameCanvas"),e=window.innerWidth/t.width,i=window.innerHeight/t.height,s=0|Math.min(e,i);s=0>=s?1:s;var h=[t.width*s,t.height*s],n=this.offset=[(window.innerWidth-h[0])/2,(window.innerHeight-h[1])/2],o=document.getElementById("stage"),r="translate("+n[0]+"px, "+n[1]+"px) scale("+s+")";o.style.transform=r,o.style.webkitTransform=r}var __extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s]);t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)},GAMEINFO;!function(t){t.GAMESCREEN_TILE_WIDTH=80,t.GAMESCREEN_TILE_HEIGHT=45}(GAMEINFO||(GAMEINFO={}));var TileSet=function(){function t(){}return t}(),Entity=function(){function t(){this.components={}}return t.prototype.addComponent=function(t){this.components[t.name]=t,this[t.name]=t},t}(),Component=function(){function t(t){this.name=t}return t}(),IsPlayerCom=function(t){function e(){t.call(this,"isPlayer"),this.value=!0}return __extends(e,t),e}(Component),Item=function(){function t(){}return t}(),Cell=function(){function t(t,e,i){void 0===t&&(t=0),void 0===e&&(e=[]),void 0===i&&(i=null),this.tileID=t,this.entityID=i,this.itemIDs=e,this.visable=!0,this.discovered=!0}return t}(),Camera=function(){function t(t,e,i,s){void 0===i&&(i=0),void 0===s&&(s=0),this.width=t,this.height=e,this.xOffset=i,this.yOffset=s}return t}(),Level=function(){function t(t,e,i){this.redraw=!0,this.cells=[],this.width=t,this.height=e,this.camera=i}return t.prototype.floodFill=function(t,e,i,s){var h=this.width-1,n=this.height-1,o=[],r=0;for(o[0]=[],o[0][0]=t,o[0][1]=e,this.cells[t][e].tileID=s;r>=0;)t=o[r][0],e=o[r][1],r--,t>0&&this.cells[t-1][e].tileID===i&&(this.cells[t-1][e].tileID=s,r++,o[r]||(o[r]=[]),o[r][0]=t-1,o[r][1]=e),h>t&&this.cells[t+1][e].tileID===i&&(this.cells[t+1][e].tileID=s,r++,o[r]||(o[r]=[]),o[r][0]=t+1,o[r][1]=e),e>0&&this.cells[t][e-1].tileID===i&&(this.cells[t][e-1].tileID=s,r++,o[r]||(o[r]=[]),o[r][0]=t,o[r][1]=e-1),n>e&&this.cells[t][e+1].tileID===i&&(this.cells[t][e+1].tileID=s,r++,o[r]||(o[r]=[]),o[r][0]=t,o[r][1]=e+1)},t.prototype.getWidth=function(){return this.width},t.prototype.getHeight=function(){return this.height},t.prototype.update=function(){Input.KB.isDown(Input.KB.KEY.LEFT)?(this.camera.xOffset+=1,this.redraw=!0):Input.KB.isDown(Input.KB.KEY.RIGHT)&&(this.camera.xOffset-=1,this.redraw=!0),Input.KB.isDown(Input.KB.KEY.UP)?(this.camera.yOffset+=1,this.redraw=!0):Input.KB.isDown(Input.KB.KEY.DOWN)&&(this.camera.yOffset-=1,this.redraw=!0)},t.prototype.draw=function(t){for(var e=this.camera.xOffset,i=0;e<this.camera.xOffset+this.camera.width;e++){for(var s=this.camera.yOffset,h=0;s<this.camera.yOffset+this.camera.height;s++)if(this.cells[e])if(this.cells[e][s]){var n=this.cells[e][s];if(n.discovered)if(n.visable){switch(n.tileID){case 0:t.fillStyle="#000";break;case 1:t.fillStyle="#AAA";break;case 2:t.fillStyle="#0FF";break;default:t.fillStyle="#FFF"}t.fillRect(8*i,8*h,8,8)}else t.fillStyle="#bbb",t.fillRect(8*i,8*h,8,8);else t.fillStyle="black",t.fillRect(8*i,8*h,8,8);h++}else t.fillStyle="#000",t.fillRect(8*i,8*h,8,8),h++;else t.fillStyle="#000",t.fillRect(8*i,8*h,8,8),h++;i++}},t}(),__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s]);t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)},Cave=function(t){function e(e,i,s){t.call(this,e,i,s);for(var h=0;h<this.width;h++)for(var n=0;n<this.height;n++)void 0===this.cells[h]&&(this.cells[h]=[]),100*Math.random()<50||0===h||h===this.width-1||0===n||n===this.height-1?this.cells[h][n]=new Cell(0):this.cells[h][n]=new Cell(1);for(var h=5;h<this.width-5;h++)this.cells[h][this.height/2-1].tileID=1,this.cells[h][this.height/2].tileID=1,this.cells[h][this.height/2+1].tileID=1;for(var n=5;n<this.width-5;n++)this.cells[this.height/2-1][n].tileID=1,this.cells[this.height/2][n].tileID=1,this.cells[this.height/2+1][n].tileID=1;this.cellularAutomata([5,6,7,8],[4,5,6,7,8]),this.cellularAutomata([5,6,7,8],[4,5,6,7,8]),this.cellularAutomata([5,6,7,8],[4,5,6,7,8]),this.cellularAutomata([5,6,7,8],[4,5,6,7,8]),this.cellularAutomata([5,6,7,8],[4,5,6,7,8]);for(var h=1;h<this.width-1;h++)for(var n=1;n<this.height-1;n++){var o=this.cells[h][n],r=this.getLiveNeighbors(h,n);0===o.tileID&&2>r?o.tileID=1:1===o.tileID&&8===r&&(o.tileID=0)}for(var l=this.width/2,a=this.height/2;1!==this.cells[l][a].tileID;)l++;this.floodFill(l,a,1,2);for(var h=1;h<this.width-1;h++)for(var n=1;n<this.height-1;n++)1===this.cells[h][n].tileID&&(this.cells[h][n].tileID=0)}return __extends(e,t),e.prototype.getLiveNeighbors=function(t,e){for(var i=0,s=t-1;t+1>=s;s++)if(!(0>s||s>this.width))for(var h=e-1;e+1>=h;h++)0>h||h>this.height||(s!==t||h!==e)&&(i+=this.cells[s][h].tileID);return 8-i},e.prototype.cellularAutomata=function(t,e){for(var i=1;i<this.width-1;i++)for(var s=1;s<this.height-1;s++){var h=this.cells[i][s],n=this.getLiveNeighbors(i,s);if(1===h.tileID){for(var o in t)if(n===t[o]){h.tileID=0;break}}else{h.tileID=1;for(var o in e)if(n===e[o]){h.tileID=0;break}}}},e}(Level),__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s]);t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)},WALL;!function(t){t[t.N=0]="N",t[t.E=1]="E",t[t.S=2]="S",t[t.W=3]="W"}(WALL||(WALL={}));var Room=function(){function t(){this.x=0,this.y=0,this.w=0,this.h=0,this.walls=[WALL.N,WALL.E,WALL.S,WALL.W],shuffle(this.walls)}return t.prototype.getRandomWall=function(){var t,e,i=this.walls.pop();return i===WALL.N?(t=this.x+Math.floor(this.w/2),e=this.y-1):i===WALL.S?(t=this.x+Math.floor(this.w/2),e=this.y+this.h):i===WALL.W?(t=this.x-1,e=this.y+Math.floor(this.h/2)):i===WALL.E&&(t=this.x+this.w,e=this.y+Math.floor(this.h/2)),{x:t,y:e,w:i}},t}(),Dungeon=function(t){function e(e,i,s){t.call(this,e,i,s);for(var h=0;h<this.width;h++)for(var n=0;n<this.height;n++)void 0===this.cells[h]&&(this.cells[h]=[]),this.cells[h][n]=new Cell(0);this.generate(25)}return __extends(e,t),e.prototype.scan=function(t,e,i){var s=!0,h=e===WALL.W?t.x-1:t.x,n=e===WALL.N?t.y-1:t.y,o=!i||e!==WALL.W&&e!==WALL.E?t.w:t.w+1,r=!i||e!==WALL.N&&e!==WALL.S?t.h:t.h+1;o=e===WALL.N||e===WALL.S?o+1:o,r=e===WALL.W||e===WALL.E?r+1:r,i&&(h=e===WALL.E?h-1:h,n=e===WALL.S?n-1:n),(e===WALL.N||e===WALL.S)&&(h-=1),(e===WALL.W||e===WALL.E)&&(n-=1);for(var l=h;!(l>h+o)&&s;l++)for(var a=n;!(a>n+r)&&s;a++)s=s&&void 0!==this.cells[l]&&void 0!==this.cells[l][a]&&0===this.cells[l][a].tileID;return s},e.prototype.addRoom=function(t){for(var e=t.x;e<t.x+t.w;e++)for(var i=t.y;i<t.y+t.h;i++)this.cells[e][i].tileID=2},e.prototype.addDoor=function(t){this.cells[t.x][t.y].tileID=3},e.prototype.makeRoom=function(t,e){void 0===t&&(t={x:-1,y:-1,w:-1}),void 0===e&&(e=!0);var i=new Room;do i.w=randomInt(5,this.width/5),i.w=i.w%2===0?i.w-1:i.w,i.h=randomInt(5,this.height/5),i.h=i.h%2===0?i.h-1:i.h;while(i.w*i.h>this.width*this.height/4);if(i.x=t.w===WALL.N||t.w===WALL.S?t.x-Math.floor(i.w/2):t.x,i.x=t.w===WALL.W?i.x-(i.w-1):i.x,i.y=t.w===WALL.W||t.w===WALL.E?t.y-Math.floor(i.h/2):t.y,i.y=t.w===WALL.N?i.y-(i.h-1):i.y,!e)switch(t.w){case WALL.N:i.y-=1;break;case WALL.S:i.y+=1;break;case WALL.W:i.x-=1;break;case WALL.E:i.x+=1}return i},e.prototype.makeCorridor=function(t,e){void 0===t&&(t={x:-1,y:-1,w:-1}),void 0===e&&(e=!0);var i=new Room;if(i.w=t.w===WALL.N||t.w===WALL.S?3:randomInt(5,9),i.w=i.w%2===0?i.w-1:i.w,i.h=t.w===WALL.W||t.w===WALL.E?3:randomInt(5,9),i.h=i.h%2===0?i.h-1:i.h,i.x=t.w===WALL.N||t.w===WALL.S?t.x-Math.floor(i.w/2):t.x,i.x=t.w===WALL.W?i.x-(i.w-1):i.x,i.y=t.w===WALL.W||t.w===WALL.E?t.y-Math.floor(i.h/2):t.y,i.y=t.w===WALL.N?i.y-(i.h-1):i.y,e)switch(t.w){case WALL.N:i.y-=1;break;case WALL.S:i.y+=1;break;case WALL.W:i.x-=1;break;case WALL.E:i.x+=1}return i},e.prototype.generate=function(t){var e=[],i=0,s=0,h=!0,n=0,o=randomInt(0,100),r=this.makeRoom();r.x=Math.floor(this.width/2-r.w/2),r.y=Math.floor(this.height/2-r.h/2),e[e.length]=r,this.addRoom(r),i++;for(var l;e.length>0&&t>i;){if(o>65+s){do{if(n>5||0===n){if(0===e[e.length-1].walls.length&&e.pop(),0===e.length)break;l=e[e.length-1].getRandomWall()}r=this.makeCorridor(l,h),n++}while(!this.scan(r,l.w,h));if(n=0,0===e.length)break;h&&this.addDoor(l),e[e.length]=r,this.addRoom(r),s+=10,h=!1}else{do{if(n>5||0===n){if(0===e[e.length-1].walls.length&&e.pop(),0===e.length)break;l=e[e.length-1].getRandomWall()}r=this.makeRoom(l,h),n++}while(!this.scan(r,l.w,!h));if(n=0,0===e.length)break;h||this.addDoor(l),e[e.length]=r,this.addRoom(r),i++,s-=10,h=!0}o=randomInt(0,100)}console.log(i)},e}(Level),Input;!function(t){var e;!function(t){function e(t){return n[t]}function i(t){var e=r[t];return r[t]=!1,e}function s(t){var e=t.which;n[e]=!0,o[e]&&(r[e]=!0),o[e]=!1}function h(t){var e=t.which;n[e]=!1,o[e]=!0}!function(t){t[t.A=65]="A",t[t.D=68]="D",t[t.W=87]="W",t[t.S=83]="S",t[t.LEFT=37]="LEFT",t[t.RIGHT=39]="RIGHT",t[t.UP=38]="UP",t[t.DOWN=40]="DOWN",t[t.ENTER=13]="ENTER",t[t.SPACE=32]="SPACE"}(t.KEY||(t.KEY={}));for(var n=(t.KEY,[]),o=[],r=[],l=0;256>l;l++)o[l]=!0;t.isDown=e,t.wasDown=i,t.keyDown=s,t.keyUp=h}(e=t.KB||(t.KB={}))}(Input||(Input={}));var Game=function(){function t(t){this.change=!0,this.redraw=!0,this.clearScreen=!0,this.then=performance.now(),this.timePaused=0,this.deltaPaused=0,console.log("Setting up screen"),this.screen=t,this.ctx=t.getContext("2d"),this.ctx.mozImageSmoothingEnabled=!1,this.ctx.imageSmoothingEnabled=!1}return t.prototype.init=function(){console.log("Initializing..."),this.level=new Dungeon(100,100,new Camera(GAMEINFO.GAMESCREEN_TILE_WIDTH,GAMEINFO.GAMESCREEN_TILE_HEIGHT)),this.state="MainMenu"},t.prototype.update=function(t){switch(this.state){case"MainMenu":this.state="Game";break;case"Game":this.deltaPaused>0&&(t-=this.deltaPaused,0>t&&(t=0),this.deltaPaused=0),this.level.update();break;case"GamePause":break;case"GameOver":this.state="MainMenu"}},t.prototype.draw=function(){switch(this.state){case"MainMenu":break;case"Game":this.clearScreen&&(this.ctx.clearRect(0,0,this.screen.width,this.screen.height),this.ctx.fillStyle="#bbb",this.ctx.fillRect(0,360,640,this.screen.height),this.ctx.fillStyle="#ddd",this.ctx.fillRect(640,0,this.screen.height,this.screen.width),this.clearScreen=!1),this.level.redraw&&(this.ctx.clearRect(0,0,8*GAMEINFO.GAMESCREEN_TILE_WIDTH,8*GAMEINFO.GAMESCREEN_TILE_HEIGHT),this.level.draw(this.ctx),this.level.redraw=!1);break;case"GamePause":this.change&&(this.ctx.globalAlpha=.7,this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.screen.width,this.screen.height),this.ctx.globalAlpha=1,this.ctx.font="18px Verdana",this.ctx.textAlign="center",this.ctx.fillStyle="white",this.ctx.fillText("PAUSED",this.screen.width/2|0,this.screen.height/2|0),this.change=!1);break;case"GameOver":}},t.prototype.render=function(){var t=performance.now(),e=t-this.then;this.then=t,this.update(e),this.draw(),this._loopHandle=window.requestAnimationFrame(this.render.bind(this))},t.prototype.run=function(){console.log("Game running"),this._loopHandle=window.requestAnimationFrame(this.render.bind(this))},t.prototype.stop=function(){console.log("Game stopped"),window.cancelAnimationFrame(this._loopHandle)},t.prototype.pause=function(){"Game"===this.state&&(this.state="GamePause",this.change=!0,this.timePaused=performance.now())},t.prototype.unpause=function(){"GamePause"===this.state&&(this.state="Game",this.change=this.clearScreen=!0,this.deltaPaused=performance.now()-this.timePaused,this.timePaused=0,this.level.redraw=!0)},t}();window.onload=function(){onResize(),window.addEventListener("resize",onResize,!1),window.onkeydown=Input.KB.keyDown,window.onkeyup=Input.KB.keyUp;var t=new Game(document.getElementById("gameCanvas"));t.init(),window.onblur=t.pause.bind(t),window.onfocus=t.unpause.bind(t),t.run()};