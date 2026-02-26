const CENTER_X = getWidth() / 2;
const CENTER_Y = getHeight() / 2;
const CANVAS_X = getWidth();
const CANVAS_Y = getHeight();

const ACORN_WIDTH = 50;
const ACORN_HEIGHT = 70;
const ACORN_DELAY = 1000;
let acornCount = 0;
let misses = 0;
let gameOver = false;
let score;
let messageLabel;
let acorn1 = null;
let acorn2 = null;
let acorn3 = null;
let dy1 = Randomizer.nextInt(50,100);
let dy2 = Randomizer.nextInt(50,100);
let dy3 = Randomizer.nextInt(50,100);

//player constants
const SCOUT_SIZE = 80;
let scoutPlayer;
let dxScout = SCOUT_SIZE;
let dyScout = SCOUT_SIZE;

function main() {
    background();
    drawLeaves();

    scoutPlayer = initScout(
        SCOUT_SIZE,
        SCOUT_SIZE,
        CENTER_X,
        CENTER_Y + 125
    );

    keyDownMethod(playerControl);
    setTimer(dropAcorns, ACORN_DELAY);
    setTimer(fall, ACORN_DELAY / 2);
    setTimer(checkCollision, 50);
    countAcorns();
}

//background
function background() {
    let sky = new Rectangle(getWidth(), getHeight());
    sky.setPosition(0, 0);
    sky.setColor("#82c8e5");
    sky.layer = 1;
    add(sky);

    let ground = new Rectangle(CANVAS_X, CANVAS_Y);
    ground.setPosition(0, CENTER_Y + 200);
    ground.setColor("#836539");
    add(ground);
}

//tree
function drawLeaves() {
    let leaf1 = new Circle(80);
    leaf1.setPosition(CENTER_X,
    50);
    leaf1.setColor("green");
    add(leaf1);

    let leaf2 = new Circle(60);
    leaf2.setPosition(CENTER_X / 2,
    30);
    leaf2.setColor("green");
    add(leaf2);

    let leaf3 = new Circle(70);
    leaf3.setPosition(350,
    50);
    leaf3.setColor("green");
    add(leaf3);

    let leaf4 = new Circle(70);
    leaf4.setPosition(300,
    40);
    leaf4.setColor("green");
    add(leaf4);

    let leaf5 = new Circle(70);
    leaf5.setPosition(25,
    20);
    leaf5.setColor("green");
    add(leaf5);
}

//Initiate Acorns
function dropAcorns(e) {
    if (acorn1 == null || acorn1.getY() >= getHeight()) {
        acorn1 = new WebImage("https://codehs.com/uploads/886b926d31fc9b99e6154fc1395d5c25");
        acorn1.setSize(ACORN_WIDTH, ACORN_HEIGHT);
        acorn1.setPosition(Randomizer.nextInt(0, getWidth() - ACORN_WIDTH), 0);
        add(acorn1);
    }
    
    if (acorn2 == null || acorn2.getY() >= getHeight()) {
        acorn2 = new WebImage("https://codehs.com/uploads/886b926d31fc9b99e6154fc1395d5c25");
        acorn2.setSize(ACORN_WIDTH, ACORN_HEIGHT);
        acorn2.setPosition(Randomizer.nextInt(0, getWidth() - ACORN_WIDTH), 0);
        add(acorn2);
    }
    
    if (acorn3 == null || acorn3.getY() >= getHeight()) {
        acorn3 = new WebImage("https://codehs.com/uploads/886b926d31fc9b99e6154fc1395d5c25");
        acorn3.setSize(ACORN_WIDTH, ACORN_HEIGHT);
        acorn3.setPosition(Randomizer.nextInt(0, getWidth() - ACORN_WIDTH), 0);
        add(acorn3);
    }
}


//Acorns Falling
function fall() {
    if (acorn1 != null && (acorn1.getY() + acorn1.getHeight() < getHeight())) {
        // Move acorn down the canvas here:
        acorn1.move(0, dy1);
    } else if (acorn1 != null) {
        remove(acorn1);
        acorn1 = null;
        misses++;
        countAcorns();
        if (misses >= 5) {
            endGame("Scout missed too many acorns. Game Over!");
        }
    }
    
    if (acorn2 != null && (acorn2.getY() + acorn2.getHeight() < getHeight())) {
        // Move acorn down the canvas here:
        acorn2.move(0, dy2);
    } else if (acorn2 != null) {
        remove(acorn2);
        acorn2 = null;
        misses++;
        countAcorns();
        if (misses >= 5) {
            endGame("Scout missed too many acorns. Game Over!");
        }
    }
    
    
    if (acorn3 != null && (acorn3.getY() + acorn3.getHeight() < getHeight())) {
        // Move acorn down the canvas here:
        acorn3.move(0, dy3);
    } else if (acorn3 != null) {
        remove(acorn3);
        acorn3 = null;
        misses++;
        countAcorns();
        if (misses >= 5) {
            endGame("Scout missed too many acorns. Game Over!");
        }
    }
}

function checkCollision() {
    let scoutLeft = scoutPlayer.getX();
    let scoutRight = scoutLeft + scoutPlayer.getWidth();
    let scoutTop = scoutPlayer.getY();
    let scoutBottom = scoutTop + scoutPlayer.getHeight();
    
    //Acorn 1 Check
    if (acorn1 != null) {
        let acornLeft = acorn1.getX();
        let acornRight = acornLeft + acorn1.getWidth();
        let acornTop = acorn1.getY();
        let acornBottom = acornTop + acorn1.getHeight();
        
        if (scoutRight > acornLeft && scoutLeft < acornRight && scoutBottom > acornTop && scoutTop < acornBottom) {
            remove(acorn1);
            acorn1 = null;
            acornCount++;
            countAcorns();
            if (acornCount >= 20) {
                endGame("Scout is full! You Win!");
            }
        }
    }
    
    //Acorn 2 Check
    if (acorn2 != null) {
        let acornLeft = acorn2.getX();
        let acornRight = acornLeft + acorn2.getWidth();
        let acornTop = acorn2.getY();
        let acornBottom = acornTop + acorn2.getHeight();
        
        if (scoutRight > acornLeft && scoutLeft < acornRight && scoutBottom > acornTop && scoutTop < acornBottom) {
            remove(acorn2);
            acorn2 = null;
            acornCount++;
            countAcorns();
            if (acornCount >= 20) {
                endGame("Scout is full! You Win!");
            }
        }
    }
    
    //Acorn 3 Check
    if (acorn3 != null) {
        let acornLeft = acorn3.getX();
        let acornRight = acornLeft + acorn3.getWidth();
        let acornTop = acorn3.getY();
        let acornBottom = acornTop + acorn3.getHeight();
        
        if (scoutRight > acornLeft && scoutLeft < acornRight && scoutBottom > acornTop && scoutTop < acornBottom) {
            remove(acorn3);
            acorn3 = null;
            acornCount++;
            countAcorns();
            if (acornCount >= 20) {
                endGame("Scout is full! You Win!");
            }
        }
    }
}

function initScout(width, height, x, y) {
    let scout = new WebImage(
        "https://codehs.com/uploads/821705977f53e4dfc267ce79d3712be1"
    );
    scout.setPosition(x, y);
    scout.setSize(width, height);
    add(scout);

    return scout;
}

function bounceWalls() {
    if (scoutPlayer.getX() + scoutPlayer.getWidth() > getWidth()) {
        dxScout = -dxScout;
    }

    if (scoutPlayer.getX() < 0) {
        dxScout = -dxScout;
    }

    if (scoutPlayer.getY() + scoutPlayer.getHeight() > getHeight()) {
        dyScout = -dyScout;
    }

    if (scoutPlayer.getY() < 0) {
        dyScout = -dyScout;
    }
}

function playerControl(e) {
    if (e.key == "ArrowLeft") {
        if (scoutPlayer.getX() > 0) {
            scoutPlayer.move(-dxScout, 0);
        }
    }
    if (e.key == "ArrowRight") {
        if (scoutPlayer.getX() + scoutPlayer.getWidth() < getWidth()) {
            scoutPlayer.move(dxScout, 0);
        }
    }
    if (e.key == "ArrowUp") {
        if (scoutPlayer.getY() - dyScout >= 0) {
            scoutPlayer.move(0, -dyScout);
        }
    }
    if (e.key == "ArrowDown") {
        if (scoutPlayer.getY() + scoutPlayer.getHeight() + dyScout <= getHeight()) {
            scoutPlayer.move(0, dyScout);
        }
    }
}

function countAcorns() {
    if (score != null) {
        remove(score);
    }
    score = new Text("Scout has collected " + acornCount + " acorns!" + " Scout has missed " + misses + " acorns!");
    score.setPosition(20,30);
    score.setColor("white");
    score.setFont("10pt Arial");
    add(score);
}

function endGame(message) {
    gameOver = true; 
    stopTimer(fall);
    stopTimer(dropAcorns);
    stopTimer(checkCollision);
    
    messageLabel = new Text(message);
    messageLabel.setPosition(20, CENTER_Y);
    messageLabel.setColor("red");
    messageLabel.setFont("12pt Arial");
    add(messageLabel);
}

main();