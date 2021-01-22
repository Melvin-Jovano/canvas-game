var dead = new Image();
dead.src = 'img/raven22.png';
var char1 = new Image();
char1.src = 'img/raven1.png';
var bg = new Image();
bg.src = 'img/dungeon.jpg';
var bg1 = new Image();
bg1.src = 'img/dungeon1.jpg'; 
var bg2 = new Image();
bg2.src = 'img/dungeon2.jpg';
var char2 = new Image();
char2.src = 'img/raven22.png';
var poleI = new Image();
poleI.src = 'img/tiang.jpg';
var crash = new Audio();
crash.src = 'audio/Crash.wav';

window.addEventListener('load', start());

function start() {
var c =   document.querySelector('canvas');
var cc = c.getContext('2d');
c.width = c.scrollWidth;
c.height = c.scrollHeight;
var cw = c.width;
var ch = c.height;

window.addEventListener('load', main());

function main(){
    var chan = false;

    function Bg() {
        this.x = 0;
        this.render = function () {
            cc.drawImage(bg, this.x -= 1, 0, 2400, 1100);
            if (this.x == -1000) {
                this.x = 0;
            }
        }
    }

    var back = new Bg();
    function Char(){
        this.x = 100; this.y = 200; this.width = 100; this.height = 100; this.i = 0;
        this.render = function() {
            if (chan) {
                cc.drawImage(char2, this.x, this.y += 5, 100, 100);
                this.i++;
                if (this.i == 5) {
                    chan = false;
                    this.i =0;
                }
            }else{
                cc.drawImage(char1, this.x, this.y += 5, 100, 100);
            }
        };
    }

    var char = new Char();
    var pole = [];
    addPole();
    function addPole(){
        var x=1350; y=0; w=5; h=300;
        var ran = Math.floor(Math.random() * 280);
        pole.push({'x':x, 'y':y-ran, 'w':w, 'h':h});
    }

    var score = 0;
    function finish(){
        clearInterval(inter);
        cc.clearRect(0, 0, cw,ch);
        back.render();
        renderP();
        cc.drawImage(dead, char.x, char.y, 100, 100);
        cc.font = 'Bold 50px arial';
        cc.fillStyle = 'white';
        cc.fillText('Your Total Score = ' + score, 420, 360);
        cc.font = 'bold 80px arial';
        cc.fillText('Game Over', 450, 250);
    }
    
    var count = 0;
    function renderP(){
        for (let i = 0; i < pole.length; i++) {
            cc.drawImage(poleI, pole[i].x--, pole[i].y);
            cc.drawImage(poleI, pole[i].x--, pole[i].y + 700, 50, 700);

            cc.font = 'Bold 40px arial';
            cc.fillStyle = 'white';
            cc.fillText('Score = '+score, 20, 50);

            if (pole[i].x+pole[i].w < -50) {
                pole.splice(i, 1);
                score++;
            }
        }
        count++;
        if (count == 250) {
            addPole();
            count=0;
        }
    }
    function hit() {
        for (let i = 0;i  < pole.length; i++) {
            var p = pole[i];
            if ( (char.x + 100 > p.x && char.y < p.y+p.h && char.x < p.x+ 50) || 
            (char.x+100 > p.x && char.y+100 > p.y+p.h+420 && char.x<p.x+50) )  {
                    crash.play();
                    finish();
            }            
        }
        if (char.y <= 0) {crash.play(); finish();}
        if (char.y >= 680) { crash.play(); finish();}
    }

    function anim(){
        cc.save();
        cc.clearRect(0, 0, cw, ch);
        back.render();
        char.render();
        renderP();
        hit();
        cc.restore();
    }
    var seconde = 20;
    var inter = setInterval(anim, seconde);
    document.addEventListener('mousedown', function (e) {
            char.y -= 110;
            chan = true;
    });

    document.addEventListener('keydown', KeyPush);
}
}
    function KeyPush(e){
        switch (e.keyCode) {
            case 32:
                alert('Paused\nClick Ok Or Spacebar To Continue')
                break;
        }
    }