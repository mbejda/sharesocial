/**
 * Canavs Market Scene
 * homepage animation javascript
 *
 * @requires  canvasengine-1.3.1.all.min.js
 */
/*
var canvas = CE.defines("canvas-market-scene")
    .extend(Scrolling)
    .extend(Animation)
    .ready(function() {
        canvas.Scene.call("marketScene");
    }
);

canvas.Scene.new({
    name: "marketScene", // Obligatory
    materials: {
        images: {
            market_scene: "../img/layout/canvas/market-scene-bg.png",
            cloud_large: "../img/layout/canvas/cloud-lrg.png",
            cloud_small: "../img/layout/canvas/cloud-sm.png",
        }
    },
    preload: function(stage, pourcent) {



    },
    ready: function(stage) {


        //this.market_scene = this.createElement();
        //this.market_scene.drawImage("market_scene");

        this.scrolling = canvas.Scrolling.new(this, 32, 32);
        var market_scene = this.createElement();
        market_scene.drawImage("market_scene");
       // this.market_scene.drawImage("market_scene");
        this.scrolling.addScroll({
            element: market_scene,
            speed: 3,
            block: true,
            width: 1326,
            height: 240
        });
       // var timeline = canvas.Timeline.new(self.market_scene);
        //timeline.add({x: 2}, 60).loop();

        stage.append(market_scene);
    },
    render: function(stage) {
       // this.market_scene.x += 1;
        this.scrolling.update();
        stage.refresh();
    },
    exit: function(stage) {

    }
});
    */

var canvas = CE.defines("canvas-market-scene")
    .extend(Scrolling)
    .extend(Animation)
    .ready(function() {
        canvas.Scene.call("marketScene");
    }
);

canvas.Scene.new({
    name: "marketScene",
    materials: {
        images: {
            'market_scene': "../img/layout/canvas/market-scene-bg.png",
            'cloud_large': "../img/layout/canvas/cloud-lrg.png",
            'cloud_small': "../img/layout/canvas/cloud-sm.png"
        }
    },
    ready: function(stage) {
        var animation;

       // this.scrolling = canvas.Scrolling.new(this, 64, 64);

        this.market_scene = this.createElement();
        this.cloud_large = this.createElement();
        this.cloud_small = this.createElement();

        this.cloud_large.drawImage("cloud_large");
        this.cloud_small.drawImage("cloud_small");
        this.market_scene.drawImage("market_scene");

        stage.append(this.market_scene,this.cloud_large,this.cloud_small);

    },
    render: function(stage) {
        this.cloud_small.x += 0.7;
        this.cloud_large.x += 0.2;

        //this.scrolling.update();

        //this.market_scene.x -= 0.1;
        stage.refresh();
    }
});