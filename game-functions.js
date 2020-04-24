var canvas = document.getElementById("game");

var c  = canvas.getContext('2d');


const 	GAME_WIDTH = 800;
const   GAME_HEIGHT = 600;
var score = 0;
var life = 3;
var sticks = 0;

//  Classes
class Game {
	constructor(gamewidth,gameheight){
		this.gamewidth = gamewidth;
		this.gameheight = gameheight;
	}
	start(){
		this.stick =  new Stick(this);
		this.blackball = new Blackball(this);
		this.greenball = new Greenball(this);
		this.redball = new Redball(this);
		this.blueball = new Blueball(this);

		this.gameObject = [
			this.blackball ,
			this.greenball,
			this.redball,
			this.blueball,
			this.stick,
			
		];
		new InputHandler(this.stick);

	}

	stop(){

		c.font = "30px Comic Sans MS";
		c.textAlign = "center";
        c.fillStyle = "black";
		c.fillText("Game Over! Please press ENTER to restart the game!", GAME_WIDTH/2, GAME_HEIGHT/2);
		this.gameObject.forEach(object => object.stop());
		document.addEventListener("keydown",(event)=>{
			if(event.keyCode==13)
				location.reload();
		})
	}

	draw(c){
	
		this.gameObject.forEach(object => object.draw(c));	
		c.font = "20px Comic Sans MS";
		c.textAlign = "start";
		c.fillStyle = "black";
        c.fillText(`Life : ${life}`, 20, 30);
        c.fillText(`Score : ${score}`, 700, 30);
	}

	update(change){
	
		this.gameObject.forEach(object => object.update(change));	
	
	}
}

//Black Ball

class Blackball{
	constructor(game){
	this.image = document.getElementById('blackball')
	this.x = 700;
	this.y = 100;
	this.dx = -7;
	this.dy =  80;
	}

	draw(c){
	    c.drawImage(this.image, this.x, this.y, 20, 20);
	    this.x += this.dx;
	}

	update(){
		if(this.x<0)
		{
			if(this.y>=sticks && this.y<=sticks+60)
				score+=5;
			this.x=700;
			this.y+=this.dy;
			if(this.y<0 || this.y>600)
				this.y=80;
		}
	}

	stop(){
		this.dx = 0;
		this.dy = 0;
	}

}


// Greeen ball


class Greenball{
	constructor(game){
		this.image = document.getElementById('greenball')
	    this.x = 700;
	    this.y = 250;
		this.dx = -5;
		this.dy = 100;
	}
    
	draw(c){
		c.drawImage(this.image, this.x, this.y, 20, 20);
		this.x += this.dx;
	}
	

	update(){
		if(this.x<0)
		{
			this.x=700;
			this.y+=this.dy;
			if(this.y<0 || this.y>600)
				  this.y=50;
		}
	}

	stop(){
		this.dx = 0;
		this.dy = 0;
	}

}

// Red Ball

class Redball{
	constructor(game){
		this.image = document.getElementById('redball')
	    this.x = 700;
	    this.y = 400;
		this.dx = -6;
		this.dy = 100;
	}

	draw(c){
		c.drawImage(this.image, this.x, this.y, 20, 20);
		this.x += this.dx;
	}

	update(){
		if(this.x<0)
		{
			if(this.y>=sticks && this.y<=sticks+60)
				  life--;

			this.x=700;
			this.y+=this.dy;
			if(this.y<0 || this.y>600)
				  this.y=100;
		}
	}
	
	stop(){
		this.dx = 0;
		this.dy = 0;
	}

}
// Blue Ball

class Blueball{
	constructor(game){
		this.image = document.getElementById('blueball')
	    this.x = 700;
	    this.y = 550;
		this.dx = -4;
		this.dy = 150;
	}

	draw(c){
		c.drawImage(this.image, this.x, this.y, 20, 20);
		this.x += this.dx;
	}

	update(){
		if(this.x<0)
		{
			this.x=700;
			this.y+=this.dy;
			if(this.y<0 || this.y>600)
				  this.y=150;
		}
	}

	stop(){
		this.dx = 0;
		this.dy = 0;
	}

}


class Stick{
    constructor(game){
		 this.x = 0;
		 this.y = 0;
		 this.dy = 2;
	}
	
	moveUp(){
		this.dy = this.dy<0?this.dy:-this.dy;
	}

	moveDown(){
		this.dy = this.dy>0?this.dy:-this.dy;
	}

    draw(c){
		c.fillStyle = 'yellow';
		c.fillRect(this.x, this.y, 10, 60);
		c.beginPath();
        c.moveTo(this.x,this.y);
        c.lineTo(this.x+15,this.y+50);
        c.lineTo(this.x-15,this.y+50);
	}

	update(change) {
		sticks = this.y;
		this.y += this.dy;
		if(this.y<0)
			this.y=600;
		if(this.y>600)
			this.y=0;
	}

	stop(){
		this.dy = 0;
	}

}

class InputHandler{
	constructor(stick){
	document.addEventListener('keyup', (event) => {
	
		switch(event.keyCode){
			case 38:
				stick.moveUp();
				break;
			case 40:
				stick.moveDown();
				break;
		}
	});
	}
}

// Classes end

//  Raw code

var previous = 0;
var game = new Game(GAME_WIDTH,GAME_HEIGHT);
game.start();

function gameLoop(position){
	var change = position - previous;
	previous = position;
	c.clearRect(0,0,innerWidth,innerHeight);
	
	game.draw(c);
	game.update(change);

	if(life==0)
	{
		window.alert(`You lost! \n Score : ${score}`);
		game.stop();
		return;
	}

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);