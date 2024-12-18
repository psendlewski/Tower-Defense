//
// ============================================ DRAW CANVAS ELEMENTS====================================================

// Define canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Draw Elements:
function drawElements() {
  // Draw health bar
  ctx.strokeStyle = "grey";
  ctx.strokeRect(10, 400, 245, 80);

  ctx.beginPath();
  ctx.moveTo(11, 429);
  ctx.lineTo(254, 429);
  ctx.stroke();

  // Draw Wave bar
  ctx.strokeStyle = "grey";
  ctx.strokeRect(260, 400, 245, 80);

  ctx.beginPath();
  ctx.moveTo(261, 429);
  ctx.lineTo(504, 429);
  ctx.stroke();

  //---------------------- Draw Pause button------------------
  ctx.beginPath();
  ctx.fillStyle = "gray";
  ctx.roundRect(480, 65, 30, 30, 3);
  ctx.stroke();
  ctx.fill();
}
// -----------------------Draw the tower---------------------
function drawTower() {
  ctx.strokeStyle = "red";
  ctx.lineWidth = 1;
  ctx.beginPath();
  const angleIncrement = (2 * Math.PI) / tower.sides;
  for (let i = 0; i < tower.sides; i++) {
    const angle = i * angleIncrement;
    const x = tower.x + tower.radius * Math.cos(angle);
    const y = tower.y + tower.radius * Math.sin(angle);
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = "transparent";
  ctx.fill();
}

// Draw tower range
function drawTowerRange() {
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(tower.x, tower.y, tower.range, 0, Math.PI * 2);
  ctx.stroke();
}

// ==========================================Display game information====================================

function displayInfo2() {
  ctx.fillStyle = "white";
  ctx.font = "18px Arial, sans serif";

  ctx.textAlign = "left";
  // Cash
  ctx.fillText(`$ ${cash}`, 10, 80);

  // Coins
  ctx.fillText(`© ${localStorage.getItem("coins")}`, 10, 102);

  ctx.fillText(`Highest Wave: ${localStorage.getItem("highestWave")}`, 180, 77);

  ctx.font = "25px Arial, sans serif";
  ctx.textAlign = "center";
  // Wave Bar
  ctx.fillText(`Wave`, 380, 425);
  ctx.fillText(`${wave}`, 380, 460);

  // Health Bar
  ctx.fillText(`Health`, 132, 425);
  ctx.fillText(`${Math.floor(tower.health)}`, 120, 460);
}

// =================================================== BUTTONS =========================================================
// Event Handler for Buttons inside Canvas
canvas.addEventListener("click", function (event) {
  // Menu
  const rect5 = { x: 430, y: 55, width: 30, height: 30 }; // Rectangle 5 coordinates

  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;
  console.log(mouseX, mouseY);
  /*
  // Damage
  if (isInsideRect(mouseX, mouseY, rect1)) {
    console.log("Damage Button");
    if (cash >= upgradeDamageCost) {
      tower.damage += 5;
      cash -= upgradeDamageCost;
      upgradeDamageCost += 5;
    }
    // Attack Speed
  } else if (isInsideRect(mouseX, mouseY, rect2)) {
    console.log("Attack Speed Button");
    if (cash >= upgradeAttackSpeedCost) {
      tower.attackSpeed += 0.1;
      attackSpeedMax = tower.attackSpeed.toFixed(1);
      console.log(tower.attackSpeed);
      cash -= upgradeAttackSpeedCost;
      upgradeAttackSpeedCost += 5;
      tower.shootingCooldown = 100 / tower.attackSpeed;
    }
    // Health
  } else if (isInsideRect(mouseX, mouseY, rect3)) {
    console.log("Health Button");
    if (cash >= upgradeHealthCost) {
      tower.healthMax += 20;
      cash -= upgradeHealthCost;
      upgradeHealthCost += 5;
      if (tower.health < tower.healthMax - 20) {
        tower.health += 20;
      }
    }
    // Health Regen
  } else if (isInsideRect(mouseX, mouseY, rect4)) {
    console.log("Health Regen Button");
    if (cash >= upgradeHealthRegenCost) {
      tower.healthRegen += 1;
      cash -= upgradeHealthRegenCost;
      upgradeHealthRegenCost += 5;
    }};*/

  // Menu
  /*else*/ if (isInsideRect(mouseX, mouseY, rect5)) {
    pause = !pause;
    if (pause) drawPause();
    console.log(pause);
  }
});

function isInsideRect(x, y, rect) {
  if (
    x >= rect.x &&
    x <= rect.x + rect.width &&
    y >= rect.y &&
    y <= rect.y + rect.height
  ) {
    return true;
  }
}
// =================================================UPGRADE BUTTONS======================================================
const attackSection = document.querySelector(".attacksection");
const healthSection = document.querySelector(".healthsection");
const utilitySection = document.querySelector(".utilitysection");
//======Upgrade Buttons========
const aub = document.querySelectorAll(".Aub");
console.log(aub);
const hub = document.querySelectorAll(".Hub");
const uub = document.querySelectorAll(".Uub");
//======Upgrade Buttons- text======
const aubt = document.querySelectorAll(".Aub-t");
const hubt = document.querySelectorAll(".Hub-t");
const uubt = document.querySelectorAll(".Uub-t");
//======Attack=====
const a1 = document.getElementById("a1");
const a2 = document.getElementById("a2");
const a3 = document.getElementById("a3");
const a4 = document.getElementById("a4");
const a5 = document.getElementById("a5");
const a6 = document.getElementById("a6");
const a7 = document.getElementById("a7");
const a8 = document.getElementById("a8");
//======Health======
const h1 = document.getElementById("h1");
const h2 = document.getElementById("h2");
const h3 = document.getElementById("h3");
const h4 = document.getElementById("h4");
const h5 = document.getElementById("h5");
const h6 = document.getElementById("h6");
const h7 = document.getElementById("h7");
const h8 = document.getElementById("h8");
//======Utility=======
const u1 = document.getElementById("u1");
const u2 = document.getElementById("u2");
const u3 = document.getElementById("u3");
const u4 = document.getElementById("u4");
const u5 = document.getElementById("u5");
const u6 = document.getElementById("u6");
const u7 = document.getElementById("u7");
const u8 = document.getElementById("u8");

//================================SECTION BUTTONS EVENT LISTENER===========================
attackSection.addEventListener("click", function () {
  aub.forEach((element) => {
    element.style.display = "block";
  });
  hub.forEach((element) => {
    element.style.display = "none";
  });
  uub.forEach((element) => {
    element.style.display = "none";
  });
  aubt.forEach((element) => {
    element.style.display = "block";
  });
  hubt.forEach((element) => {
    element.style.display = "none";
  });
  uubt.forEach((element) => {
    element.style.display = "none";
  });
});

healthSection.addEventListener("click", function () {
  aub.forEach((element) => {
    element.style.display = "none";
  });
  hub.forEach((element) => {
    element.style.display = "block";
  });
  uub.forEach((element) => {
    element.style.display = "none";
  });
  aubt.forEach((element) => {
    element.style.display = "none";
  });
  hubt.forEach((element) => {
    element.style.display = "block";
  });
  uubt.forEach((element) => {
    element.style.display = "none";
  });
});

utilitySection.addEventListener("click", function () {
  aub.forEach((element) => {
    element.style.display = "none";
  });
  hub.forEach((element) => {
    element.style.display = "none";
  });
  uub.forEach((element) => {
    element.style.display = "block";
  });
  aubt.forEach((element) => {
    element.style.display = "none";
  });
  hubt.forEach((element) => {
    element.style.display = "none";
  });
  uubt.forEach((element) => {
    element.style.display = "block";
  });
});

// ==== Menu ==============
let isMenuVisible = true; // Flag to track menu visibility

// Define menu options
const menuOptions = ["Option 1", "Option 2", "Option 3"];
/*
//Define menu styling
const menuX = 50;
const menuY = 50;
const optionHeight = 50;
const optionPadding = 20;
const optionTextSize = 16;
*/
// Draw menu function
function drawPause() {
  /* // Draw menu background
  ctx.fillStyle = "grey";
  ctx.fillRect(
    menuX,
    menuY,
    150,
    menuOptions.length * optionHeight + (menuOptions.length - 1) * optionPadding
  );*/
  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Pause", canvas.width / 2, canvas.height / 3);
}
/*
  // Draw menu options
  ctx.fillStyle = "white";
  ctx.font = optionTextSize + "px Arial";
  menuOptions.forEach((option, index) => {
    const optionY =
      menuY +
      index * (optionHeight + optionPadding) +
      optionHeight / 2 +
      optionTextSize / 2;
    ctx.fillText(option, menuX + optionPadding, optionY);
  });
} // Clear canvas to hide menu
*/
// Menu click event listener
/*
canvas.addEventListener("click", function (event) {
  console.log("Menu Click");
  if (!isMenuVisible) return; // Exit if menu is not visible
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;

  menuOptions.forEach((option, index) => {
    const optionY = menuY + index * (optionHeight + optionPadding);
    if (
      mouseX >= menuX &&
      mouseX <= menuX + 150 &&
      mouseY >= optionY &&
      mouseY <= optionY + optionHeight
    ) {
      console.log("Selected option: " + option);
      isMenuVisible = false; // Hide menu after option is selected
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas to hide menu
    }
  });
});*/

// ===================================================== VARIABLES========================================================

// Define the Buttons
const upgradeDamageButton = document.getElementById("upgradeDamage");
const upgradeAttackSpeedButton = document.getElementById("upgradeAttackSpeed");
const upgradeHealthButton = document.getElementById("upgradeHealth");
const upgradeHealthRegenButton = document.getElementById("upgradeHealthRegen");
const menuButton = document.getElementById("menu");

// Define the "Start New Game" button
const startNewGameButton = document.getElementById("startNewGame");

// Game over flag
let gameOver = false;

let newGame = false;
let pause = true;

// Game variables
let cash = 100;

let wave = 0;
let enemies = [];
let enemiesTouchingTower = [];

let attackSpeed = 3;

let tower = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 13,
  sides: 6,
  damage: 10,
  health: 1000,
  healthMax: 1000,
  healthRegen: 0,
  range: 100,
  shootingCooldown: 100 / attackSpeed, // Define shooting cooldown
  currentCooldown: 0, // Initialize current cooldown
  healthRegenCooldown: 100,
};

// Function to reset the game
function startNewGame() {
  newGame = true;
  pause = false;
  tower = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 13,
    sides: 6,
    health: 100,
    healthMax: 100,
    healthRegen: 0,
    damage: 10,
    range: 100,
    shootingCooldown: 100 / attackSpeed, // Define shooting cooldown
    currentCooldown: 0, // Initialize current cooldown
    healthRegenCooldown: 100,
  };
  cash = 100;
  wave = 1;
  enemies = [];
  enemiesTouchingTower = [];
  enemyHealth = 10;
  upgradeDamageCost = 5;
  upgradeAttackSpeedCost = 5;
  upgradeHealthCost = 5;
  upgradeHealthRegenCost = 5;
  gameOver = false;
  startNewGameButton.style.display = "none";
  enemiesCooldown = 100;
  enemiesCurrentCooldown = 0;
}

let attackSpeedMax = attackSpeed.toFixed(1);

// Tower upgrade costs
let upgradeDamageCost = 5;
let upgradeAttackSpeedCost = 5;
let upgradeHealthCost = 5;
let upgradeHealthRegenCost = 5;

// Enemy properties
const enemySize = 10;
const enemySpeed = 1.5;
let enemyHealth = 10;
let enemiesCooldown = 100;
let enemiesCurrentCooldown = 0;

// Define projectile object
let projectiles = [];
const projectileSpeed = 5;
const projectileSize = 2;
// ================================================ LOCAL STORAGE ========================================================

// ===========================Highest Wave ============================
function updateHighestWave(newWave) {
  // Retrieve existing highest wave from local storage
  const highestWave = localStorage.getItem("highestWave");

  // Check if highest wave data exists and compare with new wave
  if (highestWave !== null) {
    if (newWave > parseInt(highestWave)) {
      // Convert to integer for comparison
      // New wave is higher, update highest wave in local storage
      localStorage.setItem("highestWave", newWave.toString()); // Convert back to string before saving
    }
  } else {
    // Highest wave data doesn't exist, store new wave as highest wave
    localStorage.setItem("highestWave", newWave.toString());
  }
}

//=========================== Coins ============================
// Initialize the currency
let coins;

// Function to update the currency
function updateCoins(amount) {
  // Update the currency
  coins += amount;

  // Save the updated currency to local storage
  localStorage.setItem("coins", coins);
}

// Function to retrieve the currency from local storage
function retrieveCoins() {
  // Retrieve the currency from local storage
  const storedCoins = localStorage.getItem("coins");

  // Check if the currency exists in local storage
  if (storedCoins !== null) {
    // Convert the stored currency to a number and update the global currency variable
    coins = parseInt(storedCoins);
  } else {
    // If the currency doesn't exist in local storage, initialize it to 0
    coins = 0;
    localStorage.setItem("coins", coins);
  }
}

// Call the retrieveCurrency function to initialize the currency from local storage

// ================================================ GAME LOGIC ===========================================================

// Health Regen Function
function healthRegeneration() {
  // console.log(tower.healthRegenCooldown);
  if (
    tower.healthRegenCooldown <= 0 &&
    tower.health < tower.healthMax - tower.healthRegen
  ) {
    tower.health += tower.healthRegen;
    tower.healthRegenCooldown = 100;
  }
}
// Take Hit Function
function takeHit() {
  if (enemiesCurrentCooldown <= 0 && enemiesCooldown < 100) {
    tower.health -= 1;
    enemiesCurrentCooldown = enemiesCooldown;
  } else if (
    enemiesCurrentCooldown <= 0 &&
    enemiesCooldown === 100 &&
    enemiesTouchingTower.length > 0
  ) {
    tower.health -= 1;
    enemiesCurrentCooldown = enemiesCooldown;
  }
}

// Update the game loop
function gameLoop() {
  if (!newGame) {
    startNewGameButton.style.display = "block";
  } else if (!gameOver && newGame && !pause) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (enemies.length === 0) {
      spawnWave();
    }
    updateHighestWave(wave);
    retrieveCoins();
    drawElements();
    drawTower();
    updateTower();
    updateEnemies();
    takeHit();
    updateEnemiesCooldown();
    updateProjectiles();
    healthRegeneration();
    drawTowerRange(); // Add this line to draw tower range
    drawEnemies();
    drawProjectiles();
    displayInfo2();
  } else if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 1.5);
    startNewGameButton.style.display = "block";
  }
  requestAnimationFrame(gameLoop);
}

// Calculate the distance between two points
function distance(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// ================================ TOWER ====================================

// Update the tower's properties
function updateTower() {
  if (tower.health < 1) {
    gameOver = true;
  }

  tower.currentCooldown--;
  tower.healthRegenCooldown--;

  // Check for enemy presence and attack
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    const distanceToEnemy = distance(tower, enemy);

    if (distanceToEnemy <= tower.radius + 5) {
      // Enemy is in contact with the tower, reduce cooldown
      enemiesCurrentCooldown--;
      if (enemy.alive && tower.currentCooldown <= 0) {
        shootProjectile(enemy);
        tower.currentCooldown = tower.shootingCooldown;
      } // Reset cooldown
    } else if (
      distanceToEnemy <= tower.range &&
      tower.currentCooldown <= 0 &&
      enemy.alive
    ) {
      // Enemy is within tower's range, cooldown is expired, and enemy is alive, shoot it
      shootProjectile(enemy);
      tower.currentCooldown = tower.shootingCooldown; // Reset cooldown
    }
  }
  console.log(tower.currentCooldown);
  console.log(tower.shootingCooldown);
}
// ================================= PROJECTILES ====================================

/* =======================*/
// Function to shoot a projectile
function shootProjectile(targetEnemy) {
  const dx = targetEnemy.x - tower.x;
  const dy = targetEnemy.y - tower.y;
  const angle = Math.atan2(dy, dx);
  const velocity = {
    x: Math.cos(angle) * projectileSpeed,
    y: Math.sin(angle) * projectileSpeed,
  };
  projectiles.push({
    x: tower.x,
    y: tower.y,
    velocity,
    damage: tower.damage,
    target: targetEnemy,
  }); // Include target enemy in the projectile
}

// Draw projectiles
function drawProjectiles() {
  ctx.fillStyle = "red";
  for (const projectile of projectiles) {
    ctx.beginPath();
    ctx.arc(projectile.x, projectile.y, projectileSize, 0, Math.PI * 2);
    ctx.fill();
  }
}

function updateProjectiles() {
  for (let i = 0; i < projectiles.length; i++) {
    const projectile = projectiles[i];
    projectile.x += projectile.velocity.x;
    projectile.y += projectile.velocity.y;

    // Check for collisions with enemies
    for (let j = 0; j < enemies.length; j++) {
      const enemy = enemies[j];
      const distanceToEnemy = distance(projectile, enemy);

      if (
        distanceToEnemy < enemySize / 2 &&
        enemy === projectile.target &&
        enemy.alive
      ) {
        // Enemy hit, reduce its health
        enemy.health -= projectile.damage;
        if (enemy.health <= 0) {
          enemy.alive = false; // Set enemy to dead
          enemies.splice(j, 1);
          cash += 10;
          updateCoins(1); // Reward for killing an enemy
        }

        projectiles.splice(i, 1);
        i--; // Adjust index after removing projectile
        break; // Break out of collision loop for this projectile
      }
    }

    // Remove projectiles that are out of bounds
    if (
      projectile.x < 0 ||
      projectile.x > canvas.width ||
      projectile.y < 0 ||
      projectile.y > canvas.height
    ) {
      projectiles.splice(i, 1);
      i--; // Adjust index after removing projectile
    }
  }
}
// ================================ ENEMIES ====================================

// Function to create a new enemy
function createEnemy(x, y, health) {
  return {
    x: x,
    y: y,
    health: health,
    alive: true, // Add 'alive' flag, initially set to true
  };
}

// Draw the enemies
function drawEnemies() {
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 1;
  ctx.fillStyle = "transparent";
  for (const enemy of enemies) {
    ctx.strokeRect(
      enemy.x - enemySize / 2,
      enemy.y - enemySize / 2,
      enemySize,
      enemySize
    );
  }
}
// Spawn a new wave of enemies
function spawnWave() {
  for (let i = 0; i < wave + 1; i++) {
    let side = Math.floor(Math.random() * 4);
    let x, y;

    if (side === 0) {
      x = -enemySize;
      y = Math.random() * canvas.height;
    } else if (side === 1) {
      x = Math.random() * canvas.width;
      y = -enemySize;
    } else if (side === 2) {
      x = canvas.width + enemySize;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = canvas.height + enemySize;
    }

    enemies.push(createEnemy(x, y, enemyHealth)); // Create enemy object using createEnemy function
  }

  wave++;
  enemyHealth += 1;
}

// Update the enemies' positions and health
function updateEnemies() {
  enemiesTouchingTower = []; // Reset the array to start fresh

  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    const distanceToTower = distance(tower, enemy);
    const minimumDistance = tower.radius + enemySize / 2; // Minimum distance to maintain

    if (distanceToTower <= minimumDistance) {
      // Enemy is touching the tower, add it to the array
      enemiesTouchingTower.push(enemy);

      //console.log("Enemies Touching Tower", enemiesTouchingTower.length);
      // Optionally, you can continue to avoid further processing for this enemy
      continue;
    }

    const angle = Math.atan2(tower.y - enemy.y, tower.x - enemy.x);
    enemy.x += Math.cos(angle) * enemySpeed;
    enemy.y += Math.sin(angle) * enemySpeed;

    if (distance(tower, enemy) <= enemySize) {
      tower.health -= 5;
      enemies.splice(i, 1);
    }
  }
}

// Enemies Cooldown
function updateEnemiesCooldown() {
  enemiesCooldown = 100 / enemiesTouchingTower.length;
  if (enemiesCurrentCooldown === "Infinity") {
    enemiesCurrentCooldown = 0;
  }
}

// Handle "Start New Game" button click
startNewGameButton.addEventListener("click", () => {
  startNewGame();
});

// Start the game loop
gameLoop();
