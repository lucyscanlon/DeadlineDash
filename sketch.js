
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
let laptopDuckX;
let laptopDuckY;
let showerDuckX;
let showerDuckY;
let fridgeDuckX;
let fridgeDuckY;
let doorDuckX;
let doorDuckY;

let isMoving;

let toMoveX;
let toMoveY;

let toggleDirection;

let previousAction;

let activeAction;

function preload() {
    dayImg = loadImage('img/day1.PNG');
    nightImg = loadImage('img/night1.PNG');
    computerDayImg = loadImage('img/ComputerDay.PNG');
    bedDayImg = loadImage('img/BedDay.PNG');
    fridgeDayImg = loadImage('img/fridgeDay.PNG');
    showerDayImg = loadImage('img/showerDay.PNG');
    doorDayImg = loadImage('img/doorDay.PNG');

    //night 
    computerNightImg = loadImage('img/laptopNight.PNG');
    bedNightImg = loadImage('img/bedNight.PNG');
    fridgeNightImg = loadImage('img/fridgeNight.PNG');
    showerNightImg = loadImage('img/showerNight.PNG');
    doorNightImg = loadImage('img/doorNight.PNG');

    // character 
    duckFront = loadImage('img/duckFront.PNG');
    duckLeft = loadImage('img/duckLeft.PNG');
    duckRight = loadImage('img/duckRight.PNG');
    duckBack = loadImage('img/duckBack.PNG');

    // active 
    socialActiveImgNight = loadImage('img/socialActiveNight.PNG');
    socialActiveImgDay = loadImage('img/socialActiveDay.PNG');
    bedActiveImgNight =loadImage('img/bedActiveNight.PNG');
    bedActiveImgDay = loadImage('img/bedActiveDay.PNG');
    fridgeActiveImgDay = loadImage('img/fridgeActiveDay.PNG');
    fridgeActiveImgNight = loadImage('img/fridgeActiveNight.PNG');
    laptopActiveImgDay = loadImage('img/laptopActiveDay.PNG');
    laptopActiveImgNight = loadImage('img/laptopActiveNight.PNG');
    
}


// set up function 
function setup() {

    createCanvas(960, 700);

    time = 0;
    opacityPerc = 1;
    timePassDirection = true;

    notificationArray = [];
    notificationTimeouts = [];

    bedTimeout = 100;
    showerTimeout = 250;
    socialTimeout = 300;
    fridgeTimeout = 40;

    bedNeedHeight = 200;
    showerNeedHeight = 200;
    fridgeNeedHeight = 200;
    socialNeedHeight = 200;

    duckDirection = 'front';

    numberOfClicks = 0;

    duckStartingX = 252;
    duckStartingY = 320;

    duckXCoord = 250;
    duckYCoord = 320;

    bedDuckX = 142;
    bedDuckY = 396;
    laptopDuckX = 134;
    laptopDuckY = 276;
    showerDuckX = 566;
    showerDuckY = 264;
    fridgeDuckX = 314;
    fridgeDuckY = 260;
    doorDuckX = 494;
    doorDuckY = 632;

    isMoving = false;

    toggleDirection = 0;

    bedModFrameRate = 200;
    showerModFrameRate = 100;
    fridgeModFrameRate = 80;
    socialModFrameRate = 200;

    previousAction = 0;

    activeAction = 0;

}

// draw function 
function draw() {

    background(51); // Clear the background each frame
    noTint(); // Set tint before drawing image
    image(dayImg, 0, 0, 700, 700);
    tint(255, 0 + opacityPerc); // Invert tint for the second image
    image(nightImg, 0, 0, 700, 700);

    displayActiveActionImgBehind()

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

    console.log(activeAction);

    if((activeAction === 1) && ((duckXCoord !== bedDuckX) || (duckYCoord !== bedDuckY))) {
        drawDuck();
    } else if ((activeAction === 3) && ((duckXCoord !== laptopDuckX) || (duckYCoord !== laptopDuckY))) {
        drawDuck();
    } else if ((activeAction === 2) && ((duckXCoord !== doorDuckX) || (duckYCoord !== doorDuckY))) {
        drawDuck();
    } else if ((activeAction === 5) && ((duckXCoord !== showerDuckX) || (duckYCoord !== showerDuckY))) {
        drawDuck(); 
    } else if ((activeAction === 0) || (activeAction === 4)){
        drawDuck();
    }
    
    
    noTint();
    image(bedDayImg, 0, 0, 700, 700);
    image(doorDayImg, 0, 0, 700, 700);

    tint(255, 0 + opacityPerc);
    image(bedNightImg, 0, 0, 700, 700);
    image(doorNightImg, 0, 0, 700, 700);

    displayActiveActionImgFront()

    passTime();

    drawActionQueue();

    timeoutNotifications();

    drawNeedsPanel();

    decreaseNeeds();

    moveDuck();

    makeFirstNotificationActive();

    increaseStats();

    //console.log(duckXCoord + " " + duckYCoord);

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

    //.log(200 - bedNeedHeight);

    // objects 
    if(((mouseX >= 0) && (mouseX <= 451)) && ((mouseY >=476) && (mouseY <= 700))) {
        console.log("Bed clicked");

        var newNotification = {type: 1, startTime: addEndTime(), endTime: addEndTime() + 2000, XCoord: bedDuckX, YCoord: bedDuckY, active: false};
        notificationArray.push(newNotification);
        previousEndTime = newNotification.endTime;

        isMoving = true;

        numberOfClicks = numberOfClicks + 1;

        //console.log(notificationArray[0]);

        //console.log(notificationArray);
        //console.log(previousEndTime);
    } 

    if(((mouseX >= 509) && (mouseX <= 690)) && ((mouseY >= 554) && (mouseY <= 700))) {
        console.log("Door clicked");

        var newNotification = {type: 2, startTime: addEndTime(), endTime: addEndTime() + 5000, XCoord: doorDuckX, YCoord: doorDuckY, active: false};
        notificationArray.push(newNotification);
        previousEndTime = newNotification.endTime;

        isMoving = true;

        numberOfClicks = numberOfClicks + 1;
    }

    if(((mouseX >=106) && (mouseX <= 221)) && ((mouseY >= 147) && (mouseY <= 253))) {
        console.log("laptop clicked");

        var newNotification = {type: 3, startTime: addEndTime(), endTime: addEndTime() + 5000, XCoord: laptopDuckX, YCoord: laptopDuckY, active: false};
        notificationArray.push(newNotification);
        previousEndTime = newNotification.endTime;

        isMoving = true;

        numberOfClicks = numberOfClicks + 1;
    }

    if(((mouseX >= 319) && (mouseX <= 438)) && ((mouseY >= 151) && (mouseY <= 347))) {
        console.log("fridge clicked");

        var newNotification = {type: 4, startTime: addEndTime(), endTime: addEndTime() + 5000, XCoord: fridgeDuckX, YCoord: fridgeDuckY, active: false};
        notificationArray.push(newNotification);
        previousEndTime = newNotification.endTime;

        isMoving = true;

        numberOfClicks = numberOfClicks + 1;
    }

    if(((mouseX >= 551) && (mouseX <= 700)) && ((mouseY >= 0) && (mouseY <= 354))) {
        console.log("shower clicked");

        var newNotification = {type: 5, startTime: addEndTime(), endTime: addEndTime() + 5000, XCoord: showerDuckX, YCoord: showerDuckY, active: false};
        notificationArray.push(newNotification);
        previousEndTime = newNotification.endTime;

        numberOfClicks = numberOfClicks + 1;

        isMoving = true;
    }

    // action queue - notification 1
    if(((mouseX >= 9) && (mouseX <= 90)) && ((mouseY >= 28) && (mouseY <= 110))) {
        console.log("notification one pressed");
        previousAction = notificationArray[0].type;
        notificationArray.splice(0, 1);
        
    }

    // notification 2
    if(((mouseX >= 109) && (mouseX <= 190)) && ((mouseY >= 30) && (mouseY <= 110))) {
        console.log("notification two pressed");
        previousAction = notificationArray[0].type;
        notificationArray.splice(1, 1);
    }

    // notification 3
    if(((mouseX >= 211) && (mouseX <= 289)) && ((mouseY >= 30) && (mouseY <= 110))) {
        console.log("notification three pressed");
        previousAction = notificationArray[0].type;
        notificationArray.splice(2, 1);
    }

    // notification 4
    if(((mouseX >= 310) && (mouseX <= 389)) && ((mouseY >= 30) && (mouseY <= 110))) {
        console.log("notification four pressed");
        previousAction = notificationArray[0].type;
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
            previousAction = notificationArray[0];
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
    fill(243, 214, 145);
    rect(700, 0, 270, 330);

    // white bars
    fill(255);
    rect(720, 94, 45, 200);
    rect(778, 94, 45, 200);
    rect(838, 94, 45, 200);
    rect(895, 94, 45, 200);

     // status 
     fill(214, 94, 209, 120);

     rect(720, 94 + (200 - showerNeedHeight), 45, showerNeedHeight);
     rect(778, 94 + (200 - fridgeNeedHeight), 45, fridgeNeedHeight);
     rect(838, 94 + (200 - bedNeedHeight), 45, bedNeedHeight);
     rect(895, 94 + (200 - socialNeedHeight), 45, socialNeedHeight);

    // black outlines 
    fill(72, 36, 69);

    // rect 1
    rect(720, 94, 4, 200);
    rect(764, 94, 4, 200);
    rect(720, 94, 45, 4);
    rect(723, 290, 45, 4);


    // rect 2
    rect(778, 94, 4, 200);
    rect(823, 94, 4, 200);
    rect(778, 94, 45, 4);
    rect(778, 290, 45, 4);

    // rect 3
    rect(838, 94, 4, 200);
    rect(883, 94, 4, 200);
    rect(838, 94, 45, 4);
    rect(838, 290, 45, 4);

    // rect 4
    rect(895, 94, 4, 200);
    rect(940, 94, 4, 200);
    rect(895, 94, 45, 4);
    rect(895, 290, 45, 4);


    fill(0);
    textFont('Courier New');
    textStyle(BOLD)
    angleMode(DEGREES);
    textSize(23);

    push();
    translate(749, 278);
    rotate(-90);
    text("Hygiene", 0, 0);
    pop();

    push();
    translate(807, 278);
    rotate(-90);
    text("Hunger", 0, 0);
    pop();

    push();
    translate(868, 278);
    rotate(-90);
    text("Sleep", 0, 0);
    pop();

    push();
    translate(925, 278);
    rotate(-90);
    text("Social", 0, 0);
    pop();

    text("Needs status:", 746, 62);

}

function decreaseNeeds() {

    if(duckYCoord !== bedDuckY) {
        if(frameCount % bedModFrameRate === 0) {
            if(bedNeedHeight > 0) {
                bedNeedHeight = bedNeedHeight - 10;
            }
        }
    }

    if(duckYCoord !== showerDuckY) {
        if(frameCount % showerModFrameRate === 0) {
            if(showerNeedHeight > 0) {
                showerNeedHeight = showerNeedHeight - 10;
            }
        }
    }

    if(duckYCoord !== fridgeDuckY) {
        if(frameCount % fridgeModFrameRate === 0) {
            if(fridgeNeedHeight > 0) {
                fridgeNeedHeight = fridgeNeedHeight - 10;
            }
        }
    }

    if(duckYCoord !== doorDuckY) {
        if(frameCount % socialModFrameRate === 0) {
            if(socialNeedHeight > 0) {
                socialNeedHeight = socialNeedHeight - 10;
            }
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

    if(isMoving === true && (previousAction === 2)) {
            moveDuckFromDoor();
    
            function moveDuckFromDoor() {
            
            //console.log("CALLED");
            
            toggleDirection = 1;

            duckDirection = 'back';
            
            if(duckYCoord >= 348) {
                duckYCoord = duckYCoord - 4;
            }

            if(duckYCoord === 348) {
                previousAction = 1;
                isMoving = true;
                toggleDirection = 0;

            }
            
        }
} else if ((isMoving === true) && (previousAction !== 2)) {
    moveDuckXAxis();
    moveDuckYAxis();         
} else if (isMoving === false) {
    if((duckYCoord === bedDuckY) || (duckYCoord === doorDuckY)) {
        duckDirection = 'front';
    } else if ((duckYCoord === laptopDuckY) || (duckYCoord === fridgeDuckY) || (duckYCoord === showerDuckY)) {
        duckDirection = 'back';
    }
}
     

    //console.log(previousAction);
    //console.log(isMoving);
    
}

function makeFirstNotificationActive() {

    if(notificationArray.length > 0) {
        notificationArray[0].active = true;
        activeAction = notificationArray[0].type;
        toMoveX = notificationArray[0].XCoord;
        toMoveY = notificationArray[0].YCoord;
    
    } else {
        activeAction = 0;
    }

    if(notificationArray.length > 0) {
        isMoving = true;
    } else {
        isMoving = false;
    }

    
}

function moveDuckXAxis() {
    if(toggleDirection === 0) {
        if(duckXCoord > toMoveX) {
            if(duckXCoord >= toMoveX) {
                duckXCoord = duckXCoord - 4;
                duckDirection = 'left';
                //console.log("left being called");
            }
        } else if (duckXCoord <= toMoveX) {
            if(duckXCoord <= toMoveX) {
                duckXCoord = duckXCoord + 4;
                duckDirection = 'right';
                //console.log("right being called");
            }
        }
    }

    if(duckXCoord === toMoveX) {
        toggleDirection = 1;
    }
}

function moveDuckYAxis() {
    if(toggleDirection === 1) {
        if(duckYCoord >= toMoveY) {
            duckYCoord = duckYCoord - 4;
            duckDirection = 'back';
        } else if (duckYCoord <= toMoveY) {
            duckYCoord = duckYCoord + 4;
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
    isMoving = false;

    if((duckYCoord === bedDuckY) || (duckYCoord === doorDuckY)) {
        duckDirection = 'front';
    } else if ((duckYCoord === laptopDuckY) || (duckYCoord === fridgeDuckY) || (duckYCoord === showerDuckY)) {
        duckDirection = 'back';
    }  
    
    }
}

function increaseStats() {
    if(duckYCoord === bedDuckY) {
        if(frameCount % (bedModFrameRate / 2) === 0) {
            if(bedNeedHeight < 200) {
                bedNeedHeight = bedNeedHeight + 10;
            }
        }
    } else if (duckYCoord === doorDuckY) {
        if(frameCount % (socialModFrameRate / 5) === 0) {
            if(socialNeedHeight < 200) {
                socialNeedHeight = socialNeedHeight + 10;
            }
        }
    } else if (duckYCoord === fridgeDuckY) {
        if(frameCount % (fridgeModFrameRate / 10) === 0) {
            if(fridgeNeedHeight < 200) {
                fridgeNeedHeight = fridgeNeedHeight + 10;
            }
        }
    } else if (duckYCoord === showerDuckY) {
        if(frameCount % (showerModFrameRate / 5) === 0) {
            if(showerNeedHeight < 200) {
                showerNeedHeight = showerNeedHeight + 10;
            }
        }
    }


    // remove notifications if the needs bar is full

    if(((notificationArray.length > 0 && frameCount > 200))) {
        if(bedNeedHeight === 200) {
            if(notificationArray[0].type === 1) {

                previousAction = notificationArray[0].type;
                notificationArray.splice(0, 1);

                

                if(notificationArray.length > 0) {
                    notificationArray[0].startTime = frameCount;
                }
            }
        }

        if(showerNeedHeight === 200) {
            if(notificationArray[0].type === 5) {
                previousAction = notificationArray[0].type;
                notificationArray.splice(0, 1);

                if(notificationArray.length > 0) {
                    notificationArray[0].startTime = frameCount;
                }
            }
        }

        if(fridgeNeedHeight === 200) {
            if(notificationArray[0].type === 4) {
                previousAction = notificationArray[0].type;
                notificationArray.splice(0, 1);

                if(notificationArray.length > 0) {
                    notificationArray[0].startTime = frameCount;
                }
            }
        }

        if(socialNeedHeight === 200) {
            if(notificationArray[0].type === 2) {
                previousAction = notificationArray[0].type;
                notificationArray.splice(0, 1);

                if(notificationArray.length > 0) {
                    notificationArray[0].startTime = frameCount;
                }
            }
        }
    } else if (notificationArray !== undefined) {

    }

    //console.log(bedNeedHeight);
}


function displayActiveActionImgBehind() {

    if((activeAction === 2) && (duckXCoord === doorDuckX) && (duckYCoord === doorDuckY)) {
        console.log("door active");
        noTint();
        image(socialActiveImgDay, 0, 0, 700, 700);

        tint(255, 0 + opacityPerc);
        image(socialActiveImgNight, 0, 0, 700, 700);

    }

}

function displayActiveActionImgFront() {
    if((activeAction === 1) && (duckXCoord === bedDuckX) && (duckYCoord === bedDuckY)) {
        noTint();
        image(bedActiveImgDay, 0, 0, 700, 700);

        tint(255, 0 + opacityPerc);
        image(bedActiveImgNight, 0, 0, 700, 700);
    }

    if((activeAction === 3) && (duckXCoord === laptopDuckX) && (duckYCoord === laptopDuckY)) {
        noTint();
        image(laptopActiveImgDay, 0, 0, 700, 700);

        tint(255, 0 + opacityPerc);
        image(laptopActiveImgNight, 0, 0, 700, 700);
    }

    if((activeAction === 4) && (duckXCoord === fridgeDuckX) && (duckYCoord === fridgeDuckY)) {
        noTint();
        image(fridgeActiveImgDay, 0, 0, 700, 700);

        tint(255, 0 + opacityPerc);
        image(fridgeActiveImgNight, 0, 0, 700, 700);
    }
}

