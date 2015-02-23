define(function (require) {
    var activity = require("sugar-web/activity/activity");
    var radioButtonsGroup = require("sugar-web/graphics/radiobuttonsgroup");
    var mustache = require("mustache");
    var moment = require("moment");

    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {

        // Initialize the activity.
        activity.setup();
        function Spirolaterals_JS() {

        }

        Spirolaterals_JS.prototype.start = function () {
            this.draw_problem("left-canvas");
            this.draw_solution("right-canvas");
        }

        Spirolaterals_JS.prototype.draw_problem = function (element_id) {
            
            var c = document.getElementById(element_id);
            var cxt = c.getContext("2d");
            var unit = c.height*0.12;
            var dir = [90, 0, 270, 180];
            var size = [1, 2, 1, 5, 2]; // Will be random
            var iterations = 4;
            var where = 0;

            Xcenter = c.width/2;
            Ycenter = c.height * 0.8;
            this.draw_turtle(cxt, Xcenter, Ycenter);
            
            while (iterations > 0){
                iterations = iterations - 1;
                for(var turn = 0; turn < 5; turn++){
                    cxt.beginPath();
                    cxt.moveTo (Xcenter , Ycenter);
                    Xcenter = Xcenter + size[turn]* unit* Math.cos(this.toRadians(dir[where]));
                    Ycenter = Ycenter - size[turn]* unit* Math.sin(this.toRadians(dir[where]));
                    cxt.lineTo (Xcenter , Ycenter);
                    cxt.strokeStyle = "#00ff00";
                    cxt.lineWidth = 3;
                    cxt.stroke();
                    where = (where + 1)%4;
                }
            }
        }
        
        Spirolaterals_JS.prototype.draw_solution = function (element_id) {
            var c = document.getElementById(element_id);
            var cxt = c.getContext("2d");
            var unit = c.height*0.12;
            Xcenter = c.width/2;
            Ycenter = c.height * 0.8;
            this.draw_turtle(cxt, Xcenter, Ycenter);
        }

        Spirolaterals_JS.prototype.draw_turtle = function (context,x,y) {
            img = new Image();
            img.onload = function() {
                context.drawImage(img, x - img.width/2, y);
            }
            img.src = "./turtle.svg";
        }
        Spirolaterals_JS.prototype.toRadians = function (angle) {
            return angle * (Math.PI / 180);
        }

        // Create the Spirolaterals_JS.
       
        var Spirolaterals_JS = new Spirolaterals_JS();
        Spirolaterals_JS.start();

    });
});
