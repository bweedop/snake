var s;
var scl = 15;
var food;
var score = 0;
var col = color(25, 23, 200, 50);
var playing = false;
var direction = 'right';
var fr;
var canvas;

function setup() {
    canvas = createCanvas(windowWidth * 0.3, windowHeight * 0.4);
    
    canvas.parent('container-game');
    
    background(0, 0, 0);
    
    s = new Snake ();
    newFood();
    noLoop();
    
    frameRate(12);
}

function playGame () {
    if (playing) {
        console.log('You are already playing!');
    } else {
        playing = true;
        loop();
    }
}

function resetGame () {
    location.reload();
}

function newFood () {
    var cols = floor(width / scl);
    var rows = floor(height / scl);
    food = createVector(floor(random(cols-scl)), floor(random(rows-scl)));
    food.mult(scl);
}

function windowResized () {
    resizeCanvas(windowWidth * 0.5, windowHeight * 0.5);
    
    background(0, 0, 0);
}

function draw () {
    background(0,0,0);
    
    if (s.eat(food)) {
        newFood();
        score = score + 1;
        document.getElementById('score').innerHTML = score;
    }
    
    s.death()
    s.update();
    s.show();
    
    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);

}


function keyPressed () {
    if (keyCode  === UP_ARROW && direction != 'down') {
        direction = 'up'
        s.slither(0, -1);
    } else if (keyCode === DOWN_ARROW && direction != 'up') {
        direction = 'down';
        s.slither(0, 1);
    } else if (keyCode === LEFT_ARROW && direction != 'right') {
        direction = 'left';
        s.slither(-1, 0);
    } else if (keyCode === RIGHT_ARROW && direction != 'left') {
        direction = 'right';
        s.slither(1, 0);
    }
}

function Snake () {
    this.x = scl;
    this.y = scl;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
    
    this.slither = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }
    
    this.update = function () {
        for (var i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i+1];
        }
        
        if (this.total >= 1) {
            this.tail[this.total - 1] = createVector(this.x, this.y);
        }
        
        this.x = this.x + this.xspeed*scl;
        this.y = this.y + this.yspeed*scl;
        
        this.x = constrain(this.x, 0, width-scl);
        this.y = constrain(this.y, 0, height-scl);
    }
    
    this.show = function () {
        fill(255)
        for (var i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        fill(255)
        rect(this.x, this.y, scl, scl);
    }
    
    this.eat = function (obj) {
        var d = dist(this.x, this.y, obj.x, obj.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }
    
    this.death = function () {
        if(this.x >= width || this.y >= height || this.x < 0 || this.y < 0){
            document.getElementById('score').style.color = "red";
            document.getElementById('gameOver').style.color = "red";
            noLoop();        
        }
        for(var i=0;i<this.tail.length;i++){
            if(this.tail[i].x == this.x && this.tail[i].y == this.y){
                document.getElementById('score').style.color = "red";
                document.getElementById('gameOver').style.color = "red";
                noLoop();
            }
        }
    }
}
