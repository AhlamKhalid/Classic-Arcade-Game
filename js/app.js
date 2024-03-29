// Enemies our player must avoid
class Enemy {
  constructor(speed, positionX, positionY) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
    // initial position
    this.positionX = positionX;
    this.positionY = positionY;
    // enemy speed
    this.speed = speed;
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // change position at x-axis continuously
    this.positionX += dt * this.speed;
    // if enemey gets out of canvas, reset its position
    if (this.positionX > 600) {
      this.positionX = -100;
    }
  }
  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
  }
}

// Player class
class Player {
  // constructor
  constructor() {
    // image
    this.sprite = "images/char-boy.png";
    // x-axis position
    this.positionX = 200;
    // Y-axis position
    this.positionY = 406;
    // counter helps to get the diamonds
    this.winCounter = 0;
    // flag to deteremine if there is a collision
    this.isCollied = false;
  }
  // change player
  setSprite(sprite) {
    this.sprite = sprite;
  }
  // reset player if collision happened
  update() {
    // x-axis position
    this.positionX = 200;
    // Y-axis position
    this.positionY = 406;
  }
  // draw the player on canvas
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
  }
  // move player according to the pressed arrow
  handleInput(arrow) {
    // left arrow
    if (arrow === "left") {
      // prevent player from getting out screen(left)
      if (this.positionX > 0) {
        // modify x position
        this.positionX -= 100;
      }
    }
    // right arrow
    else if (arrow === "right") {
      // prevent player from getting out screen(right)
      if (this.positionX !== 400) {
        // modify x position
        this.positionX += 100;
      }
    }
    // up arrow
    else if (arrow === "up") {
      // prevent player from getting out screen(up)
      if (this.positionY > 6) {
        // modify y position
        this.positionY -= 100;
        // winning case
        // player should be in third rock line & is not collied with any enemy
        if (this.positionY === 6 && !this.checkCollisions()) {
          // call reachWater function
          this.reachWater();
        }
      }
    }
    // down arrow
    else if (arrow === "down") {
      // prevent player from getting out screen(down)
      if (this.positionY < 406) {
        // modify y position
        this.positionY += 100;
      }
    }
  }
  // when player reaches the water
  reachWater() {
    // to win, user reaches water three times only
    if (this.winCounter < 3) {
      // increment counter
      this.winCounter += 1;
      // player wins for the first time (blue diamond)
      if (this.winCounter === 1) {
        // make diamond visible
        blueDiamond.classList.remove("transparent");
        blueDiamond.classList.add("visible");
        // update text above diamonds
        text.innerHTML = "Keep going..";
      }
      // player wins for the second time (gold diamond)
      else if (this.winCounter === 2) {
        goldDiamond.classList.remove("transparent");
        goldDiamond.classList.add("visible");
        text.innerHTML = "You're almost there";
      }
      // player wins for the third time (green diamond)
      else if (this.winCounter === 3) {
        greenDiamond.classList.remove("transparent");
        greenDiamond.classList.add("visible");
        text.innerHTML = "You win!!";
      }
    }
    // move player to initial location
    setTimeout(() => {
      this.positionX = 200;
      this.positionY = 406;
    }, 200);
  }
  // detects collision with enemies
  checkCollisions() {
    // reset isCollied flag
    this.isCollied = false;
    // compare player x & y position against enemy x & y position
    // x position: to ensure detection in any part of enemy (tail, center, head)
    // y position: handle colliding in each of the rock lines
    allEnemies.forEach(enemy => {
      if (
        this.positionX <= Math.floor(enemy.positionX) + 60 &&
        this.positionX >= Math.floor(enemy.positionX) - 60 &&
        (this.positionY === enemy.positionY ||
          (this.positionY === 106 && enemy.positionY === 130) ||
          (this.positionY === 6 && enemy.positionY === 50))
      ) {
        // there is collision
        this.isCollied = true;
      }
    });
    // return isCollied value
    return this.isCollied;
  }
}

// generates random speed between 100 and 400(included)
function generateSpeed() {
  return Math.floor(Math.random() * (400 - 100 + 1)) + 100;
}

// create enemy objects
// speed = random (as the speed increases, the enemey becomes faster)
// positionX = -100 (out of canvas from the left)
// positionY equals to first, second and third rock lines
function createEnemies() {
  // loop of three iterations
  for (iteration of [1, 2, 3]) {
    // loop through each rock line
    for (rockLine of [50, 130, 206]) {
      // enemy
      const enemy = new Enemy(generateSpeed(), -100, rockLine);
      // push enemy to allEnemies array
      allEnemies.push(enemy);
    }
  }
}

// determine which player user selected
function choosePlayer(event) {
  // what was clicked
  const eventTarget = event.target;
  // if it is image 
  if (eventTarget.nodeName.toLowerCase() === "img") {
    // change player
    player.setSprite(eventTarget.getAttribute("src"));
  }
}

// get the canvas as part of the window object(this)
const ctx = this.ctx;

// Player object
const player = new Player();

// array of enemies
const allEnemies = [];

// call createEnemies function
createEnemies();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

// container holds player images
const imgContainer = document.querySelector(".img-container");
// Event listner to choose a player
imgContainer.addEventListener("click", choosePlayer);

// text above diamonds
const text = document.querySelector(".diamonds-text");
// blue diamond
const blueDiamond = document.querySelector("#blue-diamond");
// gold diamond
const goldDiamond = document.querySelector("#gold-diamond");
// green diamond
const greenDiamond = document.querySelector("#green-diamond");
