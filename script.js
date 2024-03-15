//
// ================================ VARIABLES====================================

// Define canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define the Buttons
const upgradeDamageButton = document.getElementById("upgradeDamage");
const upgradeAttackSpeedButton = document.getElementById("upgradeAttackSpeed");
const upgradeHealthButton = document.getElementById("upgradeHealth");
const upgradeHealthRegenButton = document.getElementById("upgradeHealthRegen");

// Define the "Start New Game" button
const startNewGameButton = document.getElementById("startNewGame");

// Game over flag
let gameOver = false;

// Game variables
let coins = 100;

let wave = 0;
let enemies = [];
let tower = {
  x: canvas.width / 2,
  y: canvas.height / 2.7,
  radius: 13,
  sides: 8,
  attack: 10,
  attackSpeed: 1,
  health: 100,
  healthregen: 0,
  range: 50,
  shootingCooldown: 50, // Define shooting cooldown
  currentCooldown: 0, // Initialize current cooldown
};

// Tower upgrade costs
let upgradeDamageCost = 5;
let upgradeAttackSpeedCost = 5;
let upgradeHealthCost = 5;
let upgradeHealthRegenCost = 5;

// Enemy properties
const enemySize = 7;
const enemySpeed = 2;
let enemyHealth = 10;

// Define projectile object
let projectiles = [];
const projectileSpeed = 5;
const projectileSize = 2;

// ================================ GAME LOGIC ====================================

// Update the game loop
function gameLoop() {
  if (!gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (enemies.length === 0) {
      spawnWave();
    }
    updateTower();
    updateEnemies();
    updateProjectiles();
    drawTowerRange(); // Add this line to draw tower range
    drawEnemies();
    drawProjectiles();
    displayInfo();
  } else {
    ctx.fillStyle = "red";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
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

// Display game information
function displayInfo() {
  ctx.fillStyle = "white";
  ctx.font = "15px Arial";
  ctx.fillText(`${wave}`, 290, 530);
  ctx.fillText(`Coins: ${coins}`, 10, 190);
  ctx.fillText(`${Math.floor(tower.health)}`, 90, 530);
  ctx.fillText(`Upgrade Damage: ${upgradeDamageCost} coins`, 10, 215);
  ctx.fillText(
    `Upgrade Attack Speed: ${upgradeAttackSpeedCost} coins`,
    10,
    240
  );
  ctx.fillText(`Upgrade Health: ${upgradeHealthCost} coins`, 10, 265);
  ctx.fillText(
    `Upgrade Health Regen: ${upgradeHealthRegenCost} coins`,
    10,
    290
  );
}
// ================================ TOWER ====================================

// Draw tower range
function drawTowerRange() {
  ctx.strokeStyle = "blue";
  ctx.beginPath();
  ctx.arc(tower.x, tower.y, tower.range, 0, Math.PI * 2);
  ctx.stroke();
}

// Update the tower's properties
function updateTower() {
  if (tower.health <= 0) {
    gameOver = true;
  }
  tower.currentCooldown--;

  // Check for enemy presence and attack
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    const distanceToEnemy = distance(tower, enemy);

    if (distanceToEnemy <= tower.radius + 5) {
      // Enemy is in contact with the tower, reduce tower's health
      tower.health -= 0.1;
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
    damage: tower.attack,
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
    console.log("Draw Projectiles");
  }
}

// Update projectiles' positions and check collisions
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
          coins += 10; // Reward for killing an enemy
        }
        projectiles.splice(i, 1);
        return; // No need to check other enemies
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
  console.log("createEnemy");
  return {
    x: x,
    y: y,
    health: health,
    alive: true, // Add 'alive' flag, initially set to true
  };
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
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    const distanceToTower = distance(tower, enemy);
    const minimumDistance = tower.radius + enemySize / 2; // Minimum distance to maintain
    if (distanceToTower <= minimumDistance) {
      // Enemy is too close to the tower, stop it
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

// ================================ BUTTONS ====================================

// Handle mouse click for upgrading tower
upgradeDamageButton.addEventListener("click", () => {
  if (coins >= upgradeDamageCost) {
    tower.attack += 5;
    coins -= upgradeDamageCost;
    upgradeDamageCost += 5;
  }
});

upgradeAttackSpeedButton.addEventListener("click", () => {
  if (coins >= upgradeAttackSpeedCost)
    if (coins >= upgradeAttackSpeedCost) {
      tower.attackSpeed += 0.2;
      coins -= upgradeAttackSpeedCost;
      upgradeAttackSpeedCost += 5;
    }
});

upgradeHealthButton.addEventListener("click", () => {
  if (coins >= upgradeHealthCost) {
    tower.health += 20;
    coins -= upgradeHealthCost;
    upgradeHealthCost += 5;
  }
});
upgradeHealthRegenButton.addEventListener("click", () => {
  if (coins >= upgradeHealthRegenCost) {
    tower.healthregen += 20;
    coins -= upgradeHealthRegenCost;
    upgradeHealthRegenCost += 5;
  }
});

// Handle "Start New Game" button click
startNewGameButton.addEventListener("click", () => {
  startNewGame();
});

// Function to reset the game
function startNewGame() {
  tower = {
    x: canvas.width / 2,
    y: canvas.height / 2.7,
    radius: 13,
    sides: 8,
    health: 10,
    attack: 100,
    attackSpeed: 1,
    range: 50,
    shootingCooldown: 60, // Define shooting cooldown
    currentCooldown: 0, // Initialize current cooldown
  };
  coins = 100;
  wave = 1;
  enemies = [];
  enemyHealth = 10;
  upgradeHealthCost = 50;
  upgradeAttackCost = 50;
  upgradeSpeedCost = 50;
  gameOver = false;
  startNewGameButton.style.display = "none";
}

// Start the game loop
gameLoop();
