// Define canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define the buttons
const upgradeDamageButton = document.getElementById("upgradeDamage");
const upgradeAttackSpeedButton = document.getElementById("upgradeAttackSpeed");
const upgradeHealthButton = document.getElementById("upgradeHealth");
const upgradeHealthRegenButton = document.getElementById("upgradeHealthRegen");

// Define the "Start New Game" button
const startNewGameButton = document.getElementById("startNewGame");

// Game variables
let coins = 100;
let wave = 0;
let enemies = [];
let tower = {
  x: canvas.width / 2,
  y: canvas.height / 2.7,
  radius: 23,
  sides: 8,
  health: 100,
  attack: 10,
  attackSpeed: 1,
};

// Enemy properties
const enemySize = 10;
const enemySpeed = 2;
let enemyHealth = 10;

// Tower upgrade costs
let upgradeDamageCost = 5;
let upgradeAttackSpeedCost = 5;
let upgradeHealthCost = 5;
let upgradeHealthRegenCost = 5;

// Game over flag
let gameOver = false;

// Game loop
function gameLoop() {
  if (!gameOver) {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Spawn enemies
    if (enemies.length === 0) {
      spawnWave();
    }

    // Update and draw tower
    updateTower();

    // Update and draw enemies
    updateEnemies();
    drawEnemies();

    // Display game info
    displayInfo();
  } else {
    // Display game over message and "Start New Game" button
    ctx.fillStyle = "red";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
    startNewGameButton.style.display = "block";
  }

  requestAnimationFrame(gameLoop);
}

// Spawn a new wave of enemies
function spawnWave() {
  for (let i = 0; i < wave * 2; i++) {
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

    enemies.push({ x, y, health: enemyHealth });
  }

  wave++;
  enemyHealth += 5;
}

// Update the tower's properties
function updateTower() {
  if (tower.health <= 0) {
    gameOver = true;
  }
  // Check for enemy presence and attack
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    const distanceToEnemy = distance(tower, enemy);
    if (distanceToEnemy <= tower.radius) {
      // Enemy is in contact with the tower, reduce tower's health
      tower.health -= 0.1;
    } else if (distanceToEnemy <= tower.range) {
      // Enemy is within tower's range, shoot it
      if (tower.currentCooldown <= 0) {
        shootProjectile(enemy);
        tower.currentCooldown = tower.shootingCooldown;
      }
    }
  }
  tower.currentCooldown--;
}
// Update the enemies' positions
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

// Calculate the distance between two points
function distance(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Display game information
function displayInfo() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Wave: ${wave}`, 10, 30);
  ctx.fillText(`Coins: ${coins}`, 10, 60);
  ctx.fillText(`Tower Health: ${tower.health}`, 10, 90);
  ctx.fillText(`Upgrade Damage: ${upgradeDamageCost} coins`, 10, 150);
  ctx.fillText(
    `Upgrade Attack Speed: ${upgradeAttackSpeedCost} coins`,
    10,
    180
  );
  ctx.fillText(`Upgrade Health: ${upgradeHealthCost} coins`, 10, 120);
  ctx.fillText(
    `Upgrade Health Regen: ${upgradeHealthRegenCost} coins`,
    10,
    150
  );
}

// Handle mouse click for upgrading tower

upgradeDamageButton.addEventListener("click", () => {
  if (coins >= upgradeDamageCost) {
    tower.attack += 5;
    coins -= upgradeDamageCost;
    upgradeDamageCost += 50;
  }
});

upgradeAttackSpeedButton.addEventListener("click", () => {
  if (coins >= upgradeAttackSpeedCost)
    if (coins >= upgradeAttackSpeedCost) {
      tower.attackSpeed += 0.2;
      coins -= upgradeAttackSpeedCost;
      upgradeAttackSpeedCost += 50;
    }
});

upgradeHealthButton.addEventListener("click", () => {
  if (coins >= upgradeHealthCost) {
    tower.health += 20;
    coins -= upgradeHealthCost;
    upgradeHealthCost += 50;
  }
});
upgradeHealthRegenButton.addEventListener("click", () => {
  if (coins >= upgradeHealthRegenCost) {
    tower.healthregen += 20;
    coins -= upgradeHealthRegenCost;
    upgradeHealthRegenCost += 50;
  }
});

// Handle "Start New Game" button click
/*
startNewGameButton.addEventListener("click", () => {
  startNewGame();
});

// Function to reset the game
function startNewGame() {
  tower = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 30,
    sides: 8,
    health: 100,
    attack: 10,
    attackSpeed: 1,
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
*/
// Start the game loop
gameLoop();
