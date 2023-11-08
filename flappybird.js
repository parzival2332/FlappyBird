//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context; //going to be used to draw on the canvas

//bird
let birdWidth = 34; //actual width/height ration of the bird image is 408/228 = 17/12
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdimage;

//bird JS object
let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

//pipes
let pipesarray = []; //throughout the game there will be alot of pipes and we need to keep track of them so we will use an array
let pipeWidth = 64; //actual image ration = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth; //we will randomize this later
let pipeY = 0; //we will randomize this later

let toppipeimage;
let bottompipeimage;

//game physics
let velocityX = -2; //to make it look like the bird is moving to the right we will move the pipes to the left hence the negative velocity



window.onload = function () {
  //when the window loads, we want to run this function
  board = document.getElementById("board"); //get the canvas element with the id "board"
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d"); //used for drawing on board

  //drawing the flappy bird first create a rectangle so we will know where to draw the bird
//   context.fillStyle = "green"; //make the pen color green
//   context.fillRect(bird.x, bird.y, bird.width, bird.height); //draw a rectangle at (bird.x, bird.y) with width and height of the bird

  //load the bird image
    birdimage = new Image();
    birdimage.src = "./flappybird.png";
    birdimage.onload = function () {  //when the image loads, call the function which will paint the bird on the canvas
      context.drawImage(birdimage, bird.x, bird.y, bird.width, bird.height);
    }

    toppipeimage = new Image();
    toppipeimage.src = "./toppipe.png";

    bottompipeimage = new Image();
    bottompipeimage.src = "./bottompipe.png";

    requestAnimationFrame(gameLoop); //call the gameLoop function
    setInterval(createPipe, 1500); //every 1.5 seconds call the createPipe function
};

function gameLoop() {
    requestAnimationFrame(gameLoop); //call the gameLoop function again
    context.clearRect(0, 0, board.width, board.height); //everytime we update our frame we want to clear the previous frame otherwise frames will stack on top of each other
    
    //draw the bird over and over again to make it look like it is moving
    context.drawImage(birdimage, bird.x, bird.y, bird.width, bird.height);

    //look through our pipes array and draw each pipe
    for (let i = 0; i < pipesarray.length; i++) {
        let pipe = pipesarray[i];
        pipe.x += velocityX; //right before we draw the pipe we want to move it to the left
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    }
}

function createPipe() {

    let randompipeY = pipeY - pipeHeight/4 - Math.random() * (pipeHeight/2); //randomize the pipe height

    let toppipe = {
        img : toppipeimage,
        x : pipeX,
        y : randompipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false // we will use this to check if the bird has passed the pipe
    }

    pipesarray.push(toppipe); //add the pipe to the array
}
