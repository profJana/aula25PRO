const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;
var balls = []; //criando o matriz para receber as bolas
var barcos = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);
  barco = new Barco(width-70, height-60, 170,170, -80);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  push();
  fill("brown");
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  pop();

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();

  for (var i = 0; i < balls.length; i++) { //percorrer a matriz das bolas, para cada bola adicionada
    showCannonBalls(balls[i]); //mostrar a bola
  }

  cannon.display();


  Matter.Body.setVelocity(barco.body,{
    x: -0.9,
    y: 0
  });

  mostrarBarcos();

  barco.display();
}

function keyPressed() { //função de tecla pressionada
  if (keyCode === DOWN_ARROW) { //se a tecla for a seta para baixo
    var cannonBall = new CannonBall(cannon.x, cannon.y); //cria uma nova bola no canhao
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall); //adiciona o a bola dentro da matriz bolas
  }
}


function showCannonBalls(ball) { //função para mostrar as bolas
  if (ball) { //se tiver uma bola
    ball.display(); //mostre a bola
  }
}

function keyReleased() { //função de tecla liberada
  if (keyCode === DOWN_ARROW) { //se a tecla de seta para baixo por liberada
    balls[balls.length - 1].shoot(); //primeiro ele acha a última bola da matriz e atira
  }
}

function mostrarBarcos() {
  if (barcos.length > 0) {
    if (
      barcos[barcos.length - 1] === undefined ||
      barcos[barcos.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var barco = new Barco(width, height - 100, 170, 170, position);

      barcos.push(barco);
    }

    for (var i = 0; i < barcos.length; i++) {
      if (barcos[i]) {
        Matter.Body.setVelocity(barcos[i].body, {
          x: -0.9,
          y: 0
        });

        barcos[i].display();
      } 
    }
  } else {
    var barco = new Barco(width, height - 60, 170, 170, -60);
    barcos.push(barco);
  }
}