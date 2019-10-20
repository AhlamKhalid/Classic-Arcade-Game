// Enemies our player must avoid
class Enemy {
  constructor(speed, positionX, positionY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

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
        if (this.positionY === 6) {
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
}

// get the canvas as part of the window object(this)
const ctx = this.ctx;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Player object
const player = new Player();

// Enemy object.
// speed = 200 (as the speed increases, the enemey becomes faster)
// positionX = -100 (out of canvas from the left)
// positionY = 206 (first rock line)
const enemy = new Enemy(200, -100, 206);

// Add enemies to an array
const allEnemies = [enemy];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

// text above diamonds
const text = document.querySelector(".diamonds-text");
// blue diamond
const blueDiamond = document.querySelector("#blue-diamond");
// gold diamond
const goldDiamond = document.querySelector("#gold-diamond");
// green diamond
const greenDiamond = document.querySelector("#green-diamond");
