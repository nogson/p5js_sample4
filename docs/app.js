var particles = [];
var particles2 = [];
var ctx;

//パーティクルの総数
var maxLength = null;

//パーティクルのベースサイズ
var baseSize = 3;

//パーティクルの間隔
var dis = 5;

function setup() {

    maxLength = Math.floor(windowWidth / baseSize);

    ctx = createCanvas(windowWidth, windowHeight);

    colorMode(HSB, 100);
    blendMode(LIGHTEST);
    noStroke();
    background(0, 0, 0);

    _.each(_.range(maxLength), function(v, i) {
        var pos = 0 - i * dis;
        var p = makeParticles(i, pos);
        particles.push(p);
    });

    _.each(_.range(maxLength), function(v, i) {
        var pos = windowWidth + i * dis;
        var p = makeParticles(i, pos);
        particles2.push(p);
    });
}


function draw() {
    clear();
    background(0, 0, 0);
    orbitControl();

    _.each(particles, function(particle) {
        particle.update1();
        particle.render();
    });

    _.each(particles2, function(particle) {
        particle.update2();
        particle.render();
    });
}


function makeParticles(i, pos) {

    var p = new Particle(i, pos);

    return p;
}

function Particle(i, pos) {
    var rad = 0;
    var speed = 3;
    var randomBase = 150;
    var maxY = 450;
    this.posX = pos;
    this.size = baseSize;
    this.baseY = (windowHeight - this.size) / 2;
    this.color = i % 100;
    this.degree = 0 - i * 10;
    var random = Math.floor(Math.random() * maxY - randomBase);
    //this.color = 10;

    var nextParticle = null;

    this.update1 = function() {

        if (i === 0) {
            nextParticle = particles[maxLength - 1];
        } else {
            nextParticle = particles[i - 1];
        }

        this.posX += speed;
        this.degree += speed;

        rad = this.degree * Math.PI / 180;


        this.posY = Math.sin(rad) * random + this.baseY;

        if (this.posX > windowWidth) {
            this.posX = nextParticle.posX - 10;
            this.degree = nextParticle.degree - 10;
        }

        setRandom();

    };

    this.update2 = function() {

        if (i === 0) {
            nextParticle = particles2[maxLength - 1];
        } else {
            nextParticle = particles2[i - 1];
        }

        this.posX -= speed;
        this.degree += speed;

        rad = this.degree * Math.PI / 180;

        this.posY = Math.sin(rad) * random + this.baseY;

        if (this.posX < 0) {
            this.posX = nextParticle.posX + 10;
            this.degree = nextParticle.degree - 10;
        }

        setRandom();
    };

    this.render = function() {
        fill(this.color, 100, 100);
        ellipse(this.posX, this.posY, this.size);
    };

    function setRandom() {
        if (random > randomBase) {
            random -= 1;
        } else if (random < randomBase) {
            random += 1;
        } else if (random === randomBase) {
            random = Math.floor(Math.random() * maxY - randomBase);
        }
    }


}
