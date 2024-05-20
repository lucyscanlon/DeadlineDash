
// declare variables

// preload 

let time;
let opacityPerc;
let timePassDirection;

let notificationArray;
let notificationTimeouts;

let bedTimeout;
let showerTimeout;
let socialTimeout;
let fridgeTimeout;

let previousEndTime;

let bedNeedHeight;
let showerNeedHeight;
let fridgeNeedHeight;
let socialNeedHeight;

let duckDirection;
let duckXCoord;
let duckYCoord;

let numberOfClicks;

let bedDuckX;
let bedDuckY;

let isMoving;

let toMoveX;
let toMoveY;

let toggleDirection;

function preload() {
    dayImg = loadImage('img/day.PNG');
    nightImg = loadImage('img/night.PNG');
    computerDayImg = loadImage('img/ComputerDay.PNG');
    computerDayHoverImg = loadImage('img/ComputerDayHover.PNG');
    bedDayImg = loadImage('img/BedDay.PNG');
    bedDayHoverImg = loadImage('img/BedDayHover.PNG');
    fridgeDayImg = loadImage('img/fridgeDay.PNG');
    fridgeDayHoverImg = loadImage('img/fridgeDayHover.PNG');
    showerDayImg = loadImage('img/showerDay.PNG');
    showerDayHoverImg = loadImage('img/showerDayHover.PNG');
    doorDayImg = loadImage('img/doorDay.PNG');
    doorDayHoverImg = loadImage('img/doorDayHover.PNG');

    //night 
    computerNightImg = loadImage('img/laptopNight.PNG');
    computerNightHoverImg = loadImage('img/laptopNightHover.PNG');
    bedNightImg = loadImage('img/bedNight.PNG');
    bedNightHoverImg = loadImage('img/bedNightHover.PNG');
    fridgeNightImg = loadImage('img/fridgeNight.PNG');
    fridgeNightHoverImg = loadImage('img/fridgeNightHover.PNG');
    showerNightImg = loadImage('img/showerNight.PNG');
    showerNightHoverImg = loadImage('img/showerNightHover.PNG');
    doorNightImg = loadImage('img/doorNight.PNG');
    doorNightHoverImg = loadImage('img/doorNightHover.PNG');

    // character 
    duckFront = loadImage('img/duckFront.PNG');
    duckLeft = loadImage('img/duckLeft.PNG');
    duckRight = loadImage('img/duckRight.PNG');
    duckBack = loadImage('img/duckBack.PNG');
}


// set up function 
function setup() {

    createCanvas(960, 700);

    time = 0;
    opacityPerc = 1;
    timePassDirection = true;

    notificationArray = [];
    notificationTimeouts = [];

    bedTimeout = 400;
    showerTimeout = 250;
    socialTimeout = 300;
    fridgeTimeout = 100;

    bedNeedHeight = 90;
    showerNeedHeight = 90;
    fridgeNeedHeight = 90;
    socialNeedHeight = 90;

    duckDirection = 'front';

    numberOfClicks = 0;

    duckStartingX = 250;
    duckStartingY = 320;

    duckXCoord = 250;
    duckYCoord = 320;

    bedDuckX = 140;
    bedDuckY = 433;

    isMoving = false;

    toggleDirection = 0;

}

// draw function 
function draw() {

    background(51); // Clear the background each frame
    noTint(); // Set tint before drawing image
    image(dayImg, 0, 0, 700, 700);
    tint(255, 0 + opacityPerc); // Invert tint for the second image
    image(nightImg, 0, 0, 700, 700);

    noTint();
    image(computerDayImg, 0, 0, 700, 700);
    image(bedDayImg, 0, 0, 700, 700);
    image(fridgeDayImg, 0, 0, 700, 700);
    image(showerDayImg, 0, 0, 700, 700);
    image(doorDayImg, 0, 0, 700, 700);
    
    tint(255, 0 + opacityPerc);
    image(computerNightImg, 0, 0, 700, 700);
    image(bedNightImg, 0, 0, 700, 700);
    image(fridgeNightImg, 0, 0, 700, 700);
    image(showerNightImg, 0, 0, 700, 700);
    image(doorNightImg, 0, 0, 700, 700);

    drawDuck();
    
    noTint();
    image(bedDayImg, 0, 0, 700, 700);
    image(doorDayImg, 0, 0, 700, 700);

    tint(255, 0 + opacityPerc);
    image(bedNightImg, 0, 0, 700, 700);
    image(doorNightImg, 0, 0, 700, 700);

    passTime();

    drawActionQueue();

    timeoutNotifications();

    drawNeedsPanel();

    decreaseNeeds();

    moveDuck();

    makeFirstNotificationActive();

}

function passTime() {
    if(frameCount % 20 === 0) {
        time = time + 1;

        if(timePassDirection === true) {
            opacityPerc = opacityPerc + 1;
            if(opacityPerc === 255) {
                timePassDirection = false;
            }
        }

        if (timePassDirection === false) {
            opacityPerc = opacityPerc - 1;

            if(opacityPerc === 0) {
                timePassDirection = true;
            }
        }
        
    }
    
}

function mouseClicked() {

    // objects 
    if(((mouseX >= 0) && (mouseX <= 451)) && ((mouseY >=476) && (mouseY <= 700))) {
        console.log("Bed clicked");

        var newNotification = {type: 1, startTime: addEndTime(), endTime: addEndTime() + bedTimeout, XCoord: 148, YCoord: 394, active: false};
        notificationArray.push(newNotification);
        previousEndTime = newNotification.endTime;

        isMoving = true;

        numberOfClicks = numberOfClicks + 1;

        console.log(notificationArray);
        console.log(previousEndTime);
    } 

    if(((mouseX >= 509) && (mouseX <= 690)) && ((mouseY >= 554) && (mouseY <= 700))) {
        console.log("Door clicked");

        var newNotification = {type: 2, startTime: addEndTime(), endTime: addEndTime() + bedTimeout, XCoord: 492, YCoord: 698, active: false};
        notificationArray.push(newNotification);
        previousEndTime = newNotification.endTime;

        isMoving = true;

        numberOfClicks = numberOfClicks + 1;
    }

    if(((mouseX >=106) && (mouseX <= 221)) && ((mouseY >= 147) && (mouseY <= 253))) {
        console.log("laptop clicked");

        var newNotification = {type: 3, startTime: addEndTime(), endTime: addEndTime() + bedTimeout, XCoord: 130, YCoord: 276, active: false};
        notificationArray.push(newNotification);
        previousEndTime = newNotification.endTime;

        isMoving = true;

        numberOfClicks = numberOfClicks + 1;
    }

    if(((mouseX >= 319) && (mouseX <= 438)) && ((mouseY >= 151) && (mouseY <= 347))) {
        console.log("fridge clicked");

        var newNotification = {type: 4, startTime: addEndTime(), endTime: addEndTime() + bedTimeout, XCoord: 314, YCoord: 264, active: false};
        notificationArray.push(newNotification);
        previousEndTime = newNotification.endTime;

        isMoving = true;

        numberOfClicks = numberOfClicks + 1;
    }

    if(((mouseX >= 551) && (mouseX <= 700)) && ((mouseY >= 0) && (mouseY <= 288))) {
        console.log("shower clicked");

        var newNotification = {type: 5, startTime: addEndTime(), endTime: addEndTime() + bedTimeout, XCoord: 604, YCoord: 306, active: false};
        notificationArray.push(newNotification);
        previousEndTime = newNotification.endTime;

        numberOfClicks = numberOfClicks + 1;

        isMoving = true;
    }

    // action queue - notification 1
    if(((mouseX >= 9) && (mouseX <= 90)) && ((mouseY >= 28) && (mouseY <= 110))) {
        console.log("notification one pressed");

        notificationArray.splice(0, 1);
    }

    // notification 2
    if(((mouseX >= 109) && (mouseX <= 190)) && ((mouseY >= 30) && (mouseY <= 110))) {
        console.log("notification two pressed");

        notificationArray.splice(1, 1);
    }

    // notification 3
    if(((mouseX >= 211) && (mouseX <= 289)) && ((mouseY >= 30) && (mouseY <= 110))) {
        console.log("notification three pressed");

        notificationArray.splice(2, 1);
    }

    // notification 4
    if(((mouseX >= 310) && (mouseX <= 389)) && ((mouseY >= 30) && (mouseY <= 110))) {
        console.log("notification four pressed");

        notificationArray.splice(3, 1);
    }
    
    console.log("X: " + mouseX + ", Y: " + mouseY);

}

function drawActionQueue() {
    fill(0, 0, 0, 150);
    noStroke();
    rect(0, 0, 700, 120);

    textSize(16);
    fill(255);
    text("Action Queue:", 10, 22);

    for(let i = 0; i < notificationArray.length; i++) {
        fill(0, 0, 0);
        rect(10 + ((i * 80) + (i * 20)), 30, 80, 80, 10);
    }

    
}

function timeoutNotifications() {
    for(let i = 0; i < notificationArray.length; i++) {
        notificationTimeouts[i] = notificationArray[i].endTime;
    }

    for(let i = 0; i < notificationTimeouts.length; i++) {
        if(frameCount === notificationTimeouts[i]) {
            notificationArray.splice(i, 1);
        }
    }
}

function addEndTime() {
    if(notificationArray === undefined || notificationArray.length === 0) {
        return frameCount;
    } else {
        return previousEndTime;
    }
}

function drawNeedsPanel() {
    fill(100, 200, 255);
    rect(700, 0, 270, 310);

    fill(255);
    textSize(20);
    text("Needs:", 730, 40);

    fill(100, 100, 255);
    rect(730, 60, 90, 90, 10);
    rect(840, 60, 90, 90, 10);
    rect(730, 170, 90, 90, 10);
    rect(840, 170, 90, 90, 10);

    fill(0, 255, 0, 100);
    rect(730, 60 + (90 - bedNeedHeight), 90, bedNeedHeight, 10);
    rect(840, 60 + (90 - showerNeedHeight), 90, showerNeedHeight, 10);
    rect(730, 170 + (90 - fridgeNeedHeight), 90, fridgeNeedHeight, 10);
    rect(840, 170 + (90 - socialNeedHeight), 90, socialNeedHeight, 10);

    fill(255);
    text("bed", 751, 100);
    text("shower", 868, 100);
    text("fridge", 754, 214);
    text("social", 859, 214);
}

function decreaseNeeds() {

    if(frameCount % 80 === 0) {
        if(bedNeedHeight > 0) {
            bedNeedHeight = bedNeedHeight - 10;
        }
    }

    if(frameCount % 40 === 0) {
        if(showerNeedHeight > 0) {
            showerNeedHeight = showerNeedHeight - 10;
        }
    }

    if(frameCount % 60 === 0) {
        if(fridgeNeedHeight > 0) {
            fridgeNeedHeight = fridgeNeedHeight - 10;
        }
    }

    if(frameCount % 90 === 0) {
        if(socialNeedHeight > 0) {
            socialNeedHeight = socialNeedHeight - 10;
        }
    }

}


function drawDuck() {
    
    noTint();
    fill(255);

    if(duckDirection === 'front') {
        image(duckFront, duckXCoord, duckYCoord, 130, 130);
    } else if (duckDirection === 'left') {
        image(duckLeft, duckXCoord, duckYCoord, 130, 130);
    } else if (duckDirection === 'right') {
        image(duckRight, duckXCoord, duckYCoord, 130, 130);
    } else if (duckDirection === 'back') {
        image(duckBack, duckXCoord, duckYCoord, 130, 130);
    }

}

function moveDuck() {

    if(duckYCoord === 698) {
        toggleDirection = 1;
    }

    if(isMoving === true) {

        if(toggleDirection === 0) {
            if(duckXCoord >= toMoveX) {
                if(duckXCoord >= toMoveX) {
                    duckXCoord = duckXCoord - 2;
                    duckDirection = 'left';
                }
            } else if (duckXCoord <= toMoveX) {
                if(duckXCoord <= toMoveX) {
                    duckXCoord = duckXCoord + 2;
                    duckDirection = 'right';
                }
            }
        }

        if(duckXCoord === toMoveX) {
            toggleDirection = 1;
        }

        if(toggleDirection === 1) {
            if(duckYCoord >= toMoveY) {
                duckYCoord = duckYCoord - 2;
                duckDirection = 'back';
            } else if (duckYCoord <= toMoveY) {
                duckYCoord = duckYCoord + 2;
                duckDirection = 'front';
            }
        }

        if(duckYCoord === toMoveY) {

            if(notificationArray < 1) {
                isMoving = false;
                
            }

            toggleDirection = 0;
            duckXCoord = toMoveX;
            duckYCoord = toMoveY;

            if((duckYCoord === 394) || (duckYCoord === 698) || (duckYCoord === 698)) {
                duckDirection = 'front';
            } else if ((duckYCoord === 276) || (duckYCoord === 264)) {
                duckDirection = 'back';
            }
            
            
            
        }

} else if (isMoving === false) {
    if((duckYCoord === 394) || (duckYCoord === 698) || (duckYCoord === 698)) {
        duckDirection = 'front';
    } else if ((duckYCoord === 276) || (duckYCoord === 264)) {
        duckDirection = 'back';
    }
}


    
}

function makeFirstNotificationActive() {

    if(notificationArray.length > 0) {
        notificationArray[0].active = true;
        toMoveX = notificationArray[0].XCoord;
        toMoveY = notificationArray[0].YCoord;
    
    }

    if(notificationArray.length > 1) {
        isMoving = true;
    }
    
}

