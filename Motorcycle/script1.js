var c = document.createElement('canvas');
var ctx = c.getContext('2d');
c.style.border = '5px solid black';
c.width = 1340;
c.height = 738;
var bg1 = new Image();
bg1.src = 'img/snowy.png';
var bg = new Image();
bg.src = 'img/forest1.jpg';
var bg2 = new Image();
bg2.src = 'img/forest2.jpg';
var bg3 = new Image();
bg3.src = 'img/forest3.jpg';
var bg4 = new Image();
bg4.src = 'img/forest4.jpg';
document.body.appendChild(c);
var score = 0;
document.addEventListener('keydown', function (e) {
    if (e.keyCode = 38 && playing) {
        score++;
    }
});
var perm = [];
while (perm.length < 255) {
    while (perm.includes(val = Math.floor(Math.random() * 255)));
    perm.push(val);
}

var lerp = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI)) / 2;
var noise = x => {
    x = x * 0.01 % 255;
    return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
}
var player = new function () {
    this.x = c.width / 2;
    this.y = 0;
    this.rot = 0;
    this.rSpeed = 0;
    this.ySpeed = 0;
    this.img = new Image();
    this.img.src = 'img/moto.png';
    this.draw = function () {
        var p1 = c.height - noise(t + this.x) * 0.25;
        var p2 = c.height - noise(t + 5 + this.x) * 0.25;
        var grounded = 0;
        if (p1 - 15 > this.y) {
            this.ySpeed += 0.1;
        } else {
            this.ySpeed -= this.y - (p1 - 15);
            this.y = p1 - 15;
            grounded = 1;
        }
        if (!playing || grounded && Math.abs(this.rot) > Math.PI * 0.5) {
            playing = false;
            this.rSpeed = 5;
            k.ArrowUp = 1;
            this.x -= speed * 2.5;
            ctx.fillStyle = 'black';
            ctx.font = 'Bold 70px arial'
            ctx.fillText('Your Score', 450, 350);

            ctx.fillText(score, 580, 420, 100);
        }

        var angle = Math.atan2((p2 - 15) - this.y, (this.x + 5 - this.x));
        this.y += this.ySpeed;

        if (grounded && playing) {
            this.rot -= (this.rot - angle) * 0.5;
            this.rSpeed = this.rSpeed - (angle - this.rot);
        }

        this.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.05;
        this.rot -= this.rSpeed * 0.1;
        if (this.rot > Math.PI) this.rot = -Math.PI;
        if (this.rot < -Math.PI) this.rot = Math.PI;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.drawImage(this.img, -15, -15, 30, 30);
        ctx.restore();
    }
}

var y1 = -100; y2 = -900; season = 0;
var colors;
function snow() {
    ctx.drawImage(bg, 0, 0, c.width, c.height);
    colors = 'grey';
    ctx.drawImage(bg1, 0, y1, c.width, 900);
    y1++;
    if (y1 >= 0) {
        ctx.drawImage(bg1, 0, y2, c.width, 900);
        y2++;
        if (y2 >= 0) {
            y1 = 0;
            y2 = -900;
        }
    }
}
function indie() {
    colors = 'black';
    ctx.fillStyle = 'darkblue';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fill;
}
function spring() {
    colors = 'lime';
    ctx.drawImage(bg2, 0, 0, c.width, 900);
}
function flower() {
    colors = 'green';
    ctx.drawImage(bg3, 0, 0, c.width, 900);
}
function noon() {
    colors = 'maroon';
    ctx.drawImage(bg4, 0, 0, c.width, 900);
}

var t = 0;
var speed = 0;
var playing = true;
var k = { ArrowUp: 0, ArrowDown: 0, ArrowLeft: 0, ArrowRight: 0 };
function loop() {
    speed -= (speed - (k.ArrowUp - k.ArrowDown)) * 0.1;
    t += 10 * speed;
    season++;
    if (season >= 0) {
        snow();
        if (season >= 500) {
            spring();
            if (season >= 1000) {
                flower();
                if (season >= 1500) {
                    noon();
                    if (season >= 2000) {
                        indie();
                        if (season >= 3000) {
                            season = -10;
                        }
                    }
                } 
            }
        }
    }
    ctx.fillStyle = colors;
    ctx.beginPath();
    ctx.moveTo(0, c.height);
    ctx.font = 'Bold 30px arial';
    ctx.fillText('Score : '+score, 30, 50);
    for (let i = 0; i < c.width; i++)
        ctx.lineTo(i, c.height - noise(t + i) * 0.25);

    ctx.lineTo(c.width, c.height);
    ctx.fill();
    player.draw();
    requestAnimationFrame(loop);
}
onkeydown = d => k[d.key] = 1;
onkeyup = d => k[d.key] = 0;
loop();