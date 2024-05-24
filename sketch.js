
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

let currentDay;
let currentHour1;
let currentHour2;
let currentMinute1;
let currentMinute2;
let minuteCount;

let essay1Progress;
let projectProgress;
let videoPresentationProgress;
let essay2Progress;

let activeAssignment;

let assignmentProgressPace;
let workingSpeed;

let dayOfWeek;

let qualityOfWork;

let page;

let grade1;
let grade2;
let grade3;
let grade4;

let grade1Array;
let grade2Array;
let grade3Array;
let grade4Array;

let typingSoundPlayed;
let microwavingSoundPlayed;
let snoringSoundPlayed;
let showerSoundPlayed;
let partySoundPlayed;
let backgroundMusicPlayed;

function preload() {
    dayImg = loadImage('img/day1.png');
    nightImg = loadImage('img/night1.png');
    computerDayImg = loadImage('img/ComputerDay.png');
    bedDayImg = loadImage('img/BedDay.png');
    fridgeDayImg = loadImage('img/fridgeDay.png');
    showerDayImg = loadImage('img/showerDay.png');
    doorDayImg = loadImage('img/doorDay.png');

    //night 
    computerNightImg = loadImage('img/laptopNight.png');
    bedNightImg = loadImage('img/bedNight.png');
    fridgeNightImg = loadImage('img/fridgeNight.png');
    showerNightImg = loadImage('img/showerNight.png');
    doorNightImg = loadImage('img/doorNight.png');

    // character 
    duckFront = loadImage('img/duckFront.png');
    duckLeft = loadImage('img/duckLeft.png');
    duckRight = loadImage('img/duckRight.png');
    duckBack = loadImage('img/duckBack.png');

    // active 
    socialActiveImgNight = loadImage('img/socialActiveNight.png');
    socialActiveImgDay = loadImage('img/socialActiveDay.png');
    bedActiveImgNight =loadImage('img/bedActiveNight.png');
    bedActiveImgDay = loadImage('img/bedActiveDay.png');
    fridgeActiveImgDay = loadImage('img/fridgeActiveDay.png');
    fridgeActiveImgNight = loadImage('img/fridgeActiveNight.png');
    laptopActiveImgDay = loadImage('img/laptopActiveDay.png');
    laptopActiveImgNight = loadImage('img/laptopActiveNight.png');

    // action bar
    partyHat = loadImage('img/partyHat.png');
    laptop = loadImage('img/laptop.png');
    sleepZ = loadImage('img/sleepZ.png');
    apple = loadImage('img/apple.png');
    showerHead = loadImage('img/showerHead.png');

    //sound
    typingFast = loadSound('sound/typingFast.mp3');
    microwaving = loadSound('sound/microwave.mp3');
    snoring = loadSound('sound/snoring.mp3');
    shower = loadSound('sound/shower.mp3');
    party = loadSound('sound/party.mp3');
    backgroundMusic = loadSound('sound/backgroundMusic.mp3');

    openingPage = loadImage('img/openingPage.PNG');
    endingPage = loadImage('img/endingPage.PNG');
    
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

    bedModFrameRate = 240;
    showerModFrameRate = 200;
    fridgeModFrameRate = 120;
    socialModFrameRate = 220;

    previousAction = 0;

    activeAction = 0;

    currentHour1 = 1;
    currentHour2 = 2;

    currentMinute1 = 0;
    currentMinute2 = 0;

    minuteCount = 0;

    essay1Progress = 0;
    projectProgress = 0;
    videoPresentationProgress = 0;
    essay2Progress = 0;

    activeAssignment = 1;

    assignmentProgressPace = 0.1;
    workingSpeed = "fast";

    dayOfWeek = "Monday";

    qualityOfWork = "A";

    page = 0;

    grade1Array = [];
    grade2Array = [];
    grade3Array = [];
    grade4Array = [];

    typingSoundPlayed = false;
    microwavingSoundPlayed = false;
    snoringSoundPlayed = false;
    showerSoundPlayed = false;
    backgroundMusicPlayed = false;

}

// draw function 
function draw() {
    

    if(page === 0) {
        drawStartingPage();
    } else if(page === 1) {
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
    
        //console.log(activeAction);
    
        if((activeAction === 1) && ((duckXCoord !== bedDuckX) || (duckYCoord !== bedDuckY))) {
            drawDuck();
        } else if ((activeAction === 3) && ((duckXCoord !== laptopDuckX) || (duckYCoord !== laptopDuckY))) {
            drawDuck();
        } else if ((activeAction === 2) && ((duckXCoord !== doorDuckX) || (duckYCoord !== doorDuckY))) {
            drawDuck();
        } else if ((activeAction === 5) && ((duckXCoord !== showerDuckX) || (duckYCoord !== showerDuckY))) {
            drawDuck(); 
        } else if ((activeAction === 0) || (activeAction === 4) || (activeAction === 'undefined')){
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
    
        //timeoutNotifications();
    
        drawNeedsPanel();
    
        decreaseNeeds();
    
        moveDuck();
    
        makeFirstNotificationActive();
    
        increaseStats();
    
        drawTimeBar();
    
        drawAssignmentPanel();
    
        determineQualityOfWork();
    } else if (page === 2) {
        drawEndPage();
    }


}

function passTime() {
    if(frameCount % 11 === 0) {
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


    if(page === 1) {
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
    
    } else if (page === 0) {
        if(((mouseX >= 379) && (mouseX <= 577)) && ((mouseY >= 411) && (mouseY <= 449))) {
            page = 1;
            if(backgroundMusicPlayed === false) {
                backgroundMusic.setVolume(0.2);
                backgroundMusic.loop();
                backgroundMusicPlayed = true;
            }
        }
    }
    // objects 
    

    console.log("MouseX: " + mouseX + " MouseY: " + mouseY);
    

    
}

function drawActionQueue() {
    fill(243, 214, 145, 200);
    noStroke();
    rect(0, 0, 700, 100);

    for(let i = 0; i < notificationArray.length; i++) {

        var typeOfAction = notificationArray[i].type
        var imageToDisplay;

        if(typeOfAction === 1) {
            imageToDisplay = sleepZ;
        } else if (typeOfAction === 2) {
            imageToDisplay = partyHat;
        } else if (typeOfAction === 3) {
            imageToDisplay = laptop;
        } else if (typeOfAction === 4) {
            imageToDisplay = apple;
        } else if (typeOfAction === 5) {
            imageToDisplay = showerHead;
        }

        fill(255, 255, 255, 255);
        rect(10 + ((i * 80) + (i * 20)), 10, 80, 80, 10);

        noTint();
        image(imageToDisplay, 15 + ((i * 80) + (i * 20)), 15, 70, 70);
        //rect(10 + ((i * 80) + (i * 20)), 10, 80, 80, 10);
    }
}


/*
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
}*/

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
    rect(720, 74, 45, 200);
    rect(778, 74, 45, 200);
    rect(838, 74, 45, 200);
    rect(895, 74, 45, 200);

     // status 
     if(showerNeedHeight > 50) {
        fill(177, 210, 141, 255); 
     } else {
        fill(243, 113, 113, 120);
     }

     rect(720, 74 + (200 - showerNeedHeight), 45, showerNeedHeight);

     if(fridgeNeedHeight > 50) {
        fill(177, 210, 141, 255);     
     } else {
        fill(243, 113, 113, 120);
     }

     rect(778, 74 + (200 - fridgeNeedHeight), 45, fridgeNeedHeight);

     if(bedNeedHeight > 50) {
        fill(177, 210, 141, 255);   
     } else {
        fill(243, 113, 113, 120);
     }
     rect(838, 74 + (200 - bedNeedHeight), 45, bedNeedHeight);

     if(socialNeedHeight > 50) {
        fill(177, 210, 141, 255);    
     } else {
        fill(243, 113, 113, 120);
     }

     rect(895, 74 + (200 - socialNeedHeight), 45, socialNeedHeight);

    // outlines 
    fill(176, 140, 55, 255);

    // rect 1
    rect(720, 74, 4, 200);
    rect(764, 74, 4, 200);
    rect(720, 74, 45, 4);
    rect(723, 270, 45, 4);


    // rect 2
    rect(778, 74, 4, 200);
    rect(823, 74, 4, 200);
    rect(778, 74, 45, 4);
    rect(778, 270, 45, 4);

    // rect 3
    rect(838, 74, 4, 200);
    rect(883, 74, 4, 200);
    rect(838, 74, 45, 4);
    rect(838, 270, 45, 4);

    // rect 4
    rect(895, 74, 4, 200);
    rect(940, 74, 4, 200);
    rect(895, 74, 45, 4);
    rect(895, 270, 45, 4);


    fill(0);
    textFont('Courier New');
    textStyle(BOLD);
    angleMode(DEGREES);
    textSize(23);

    push();
    translate(749, 258);
    rotate(-90);
    text("Hygiene", 0, 0);
    pop();

    push();
    translate(807, 258);
    rotate(-90);
    text("Hunger", 0, 0);
    pop();

    push();
    translate(868, 258);
    rotate(-90);
    text("Sleep", 0, 0);
    pop();

    push();
    translate(925, 258);
    rotate(-90);
    text("Social", 0, 0);
    pop();

    text("Needs status:", 746, 37);
    textSize(15);
    text("Working Speed: ", 746, 60);
    text(workingSpeed, 877, 60);

    text("Quality of work:", 743, 305);

    fill(177, 210, 141, 255)
    rect(895, 283, 35, 35, 5);

    fill(0);
    textSize(23);
    text(qualityOfWork, 906, 308);

}

function decreaseNeeds() {

    if(activeAction !== 1) {
        if(frameCount % bedModFrameRate === 0) {
            if(bedNeedHeight > 10) {
                bedNeedHeight = bedNeedHeight - 10;
            }
        }
    }

    if(activeAction !== 5) {
        if(frameCount % showerModFrameRate === 0) {
            if(showerNeedHeight > 10) {
                showerNeedHeight = showerNeedHeight - 10;
            }
        }
    }

    if(activeAction !== 4) {
        if(frameCount % fridgeModFrameRate === 0) {
            if(fridgeNeedHeight > 10) {
                fridgeNeedHeight = fridgeNeedHeight - 10;
            }
        }
    }

    if(activeAction !== 2) {
        if(frameCount % socialModFrameRate === 0) {
            if(socialNeedHeight > 10) {
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
    //console.log(notificationArray[0]);
    
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
        if(frameCount % (bedModFrameRate / 5) === 0) {

            if((snoringSoundPlayed === false) && (activeAction === 1)) {
                snoring.loop();
                snoringSoundPlayed = true;
            } else if (activeAction !== 1) {
                snoring.stop();
                snoringSoundPlayed = false;
            }


            if(bedNeedHeight < 200) {
                bedNeedHeight = bedNeedHeight + 10;
            }
        }
    } else if (duckYCoord === doorDuckY) {
        if(frameCount % (socialModFrameRate / 10) === 0) {

            if((partySoundPlayed === false) && (activeAction === 2)) {
                party.loop();
                partySoundPlayed = true;
            } else if (activeAction !== 2) {
                party.stop();
                partySoundPlayed = false;
            }

            if(socialNeedHeight < 200) {
                socialNeedHeight = socialNeedHeight + 10;
            }
        }
    } else if (duckYCoord === fridgeDuckY) {
        if((microwavingSoundPlayed === false) && (activeAction === 4)) {
            microwaving.loop();
            microwavingSoundPlayed = true;
        } else if (activeAction !== 4) {
            microwaving.stop();
            microwavingSoundPlayed = false;
        }

        if(frameCount % (fridgeModFrameRate / 10) === 0) {
            if(fridgeNeedHeight < 200) {
                fridgeNeedHeight = fridgeNeedHeight + 10;
            }
        }
    } else if (duckYCoord === showerDuckY) {
        if(frameCount % (showerModFrameRate / 5) === 0) {

            if((showerSoundPlayed === false) && (activeAction === 5)) {
                shower.loop();
                showerSoundPlayed = true;
            } else if (activeAction !== 5) {
                shower.stop();
                showerSoundPlayed = false;
            }

            if(showerNeedHeight < 200) {
                showerNeedHeight = showerNeedHeight + 10;
            }
        }
    } else if ((duckYCoord === laptopDuckY) && (activeAction === 3)) {
        if(typingSoundPlayed === false) {
            typingFast.loop();
            typingSoundPlayed = true;
        } 
        
    } else {

        if(activeAction !== 3) {
            typingFast.stop();
            typingSoundPlayed = false;
        }

        if(activeAction !== 4) {
            microwavingSoundPlayed = false;
            microwaving.stop();
        }

        if(activeAction !== 1) {
            snoring.stop();
            snoringSoundPlayed = false;
        }

        if(activeAction !== 5) {
            shower.stop();
            showerSoundPlayed = false;
        }

        if(activeAction !== 2) {
            party.stop();
            partySoundPlayed = false;
        }
    }

    // remove notifications if the needs bar is full

        if((notificationArray.length > 0) && (frameCount > 500) && (notificationArray !== 'undefined')) {
            if((bedNeedHeight === 200) && (notificationArray[0].type === 1)) {
    
                    previousAction = notificationArray[0].type;
                    notificationArray.splice(0, 1);
    
                    if(notificationArray.length > 0) {
                        notificationArray[0].startTime = frameCount;
                    }

            }
    
            if((showerNeedHeight === 200) && (notificationArray[0].type === 5)) {
                    previousAction = notificationArray[0].type;
                    notificationArray.splice(0, 1);
    
                    if(notificationArray.length > 0) {
                        notificationArray[0].startTime = frameCount;
                    }
            }
    
            if((fridgeNeedHeight === 200) && (notificationArray[0].type === 4)) {
                    previousAction = notificationArray[0].type;
                    notificationArray.splice(0, 1);
    
                    if(notificationArray.length > 0) {
                        notificationArray[0].startTime = frameCount;
                    }
            }
    
            if((socialNeedHeight === 200) && (notificationArray[0].type === 2)) {
                if(notificationArray[0].type === 2) 
                    previousAction = notificationArray[0].type;
                    notificationArray.splice(0, 1);
    
                    if(notificationArray.length > 0) {
                        notificationArray[0].startTime = frameCount;
                    }
            } 
        } else if ((notificationArray === 'undefined') || notificationArray.length === 0) {
            // do nothing
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


function drawTimeBar() {
    fill(201, 177, 120, 255);

    rect(700, 329, 270, 100);

    fill(50, 44, 30);
    
    rect(832, 338, 110, 45, 10);

    textSize(20);
    fill(255);
    text(currentHour1, 849, 366);
    text(currentHour2, 863, 366);
    text(":", 879, 366);
    text(currentMinute1, 895, 366);
    text("0", 912, 366);

    //fill(50, 44, 30);
    textSize(19);
    fill(255);
    text("day:", 728, 355);
    fill(50, 44, 30);
    textSize(18);
    text(dayOfWeek, 728, 380);

    if(frameCount % 4 === 0) {
        currentMinute2 = (currentMinute2 + 1) % 10;
        minuteCount = minuteCount + 1;

        //console.log(minuteCount);

        if(minuteCount % 10 === 0) {
            currentMinute1 = (currentMinute1 + 1) % 6;
        }

        if(minuteCount % 60 === 0) {
            currentHour2 = (currentHour2 + 1) % 10;
        }

        if(minuteCount % 600 === 0) {
            currentHour1 = (currentHour1 + 1) % 10;
        }

        if((str(currentHour1) + str(currentHour2)) === '24') {
            currentHour1 = 0;
            currentHour2 = 0;
            minuteCount = 0;

            if(dayOfWeek === "Monday") {
                dayOfWeek = "Tuesday";
            } else if (dayOfWeek === "Tuesday") {
                dayOfWeek = "Wednesday";
            } else if (dayOfWeek === "Wednesday") {
                dayOfWeek = "Thursday";
            } else if (dayOfWeek === "Thursday") {
                dayOfWeek = "Friday";
            }
        }
    }


    if(dayOfWeek === "Friday" && currentHour1 === 1 && currentHour2 === 2) {
        page = 2;
    }

    

}

function drawAssignmentPanel() {
    fill(243, 214, 145);
    rect(700, 394, 270, 330);

    fill(0);
    textSize(23);
    text("Assignments:", 749, 432);

    fill(50, 44, 30);
    rect(724, 445, 210, 35, 5);

    fill(255);
    textSize(16);
    text("DUE: Friday 12pm", 750, 467);

    fill(255);
    rect(723, 499, 210, 35);
    rect(723, 545, 210, 35);
    rect(723, 591, 210, 35);
    rect(723, 637, 210, 35);

    fill(177, 210, 141, 255); 
    rect(723, 499, essay1Progress, 35);
    rect(723, 545, projectProgress, 35);
    rect(723, 591, videoPresentationProgress, 35);
    rect(723, 637, essay2Progress, 35);

    

    fill(176, 140, 55, 255);
    rect(723, 499, 210, 5);
    rect(723, 534, 210, 5);
    rect(723, 499, 5, 35);
    rect(928, 499, 5, 35);

    rect(723, 545, 210, 5);
    rect(723, 579, 210, 5);
    rect(723, 545, 5, 35);
    rect(928, 545, 5, 35);

    rect(723, 591, 210, 5);
    rect(723, 625, 210, 5);
    rect(723, 591, 5, 35);
    rect(928, 591, 5, 35);

    rect(723, 637, 210, 5);
    rect(723, 669, 210, 5);
    rect(723, 637, 5, 35);
    rect(928, 637, 5, 35);

    fill(0);
    textSize(16.5);
    text("Essay 1", 739, 525);
    text("Project", 739, 570);
    text("Video Presentation", 739, 615);
    text("Essay 2", 739, 660);

    //console.log(activeAssignment);

    let statAverage = ((bedNeedHeight + showerNeedHeight + socialNeedHeight + fridgeNeedHeight) / 4);

    if((activeAction === 3) && (duckXCoord === laptopDuckX) && (duckYCoord === laptopDuckY)) {
        if(activeAssignment === 1) {

            if(essay1Progress < 210) {
                essay1Progress = essay1Progress + assignmentProgressPace;
                grade1Array.push(statAverage);
                //console.log("pushed grade 1");
                if(essay1Progress > 209) {
                    activeAssignment = 2;
                }
            } 
            
        }

        if(activeAssignment === 2) {

            if(projectProgress < 210) {
                projectProgress = projectProgress + assignmentProgressPace;
                grade2Array.push(statAverage);
               // console.log("pushed grade 2: " + statAverage)
                //console.log("pushed grade 2");
                if(projectProgress > 209) {
                    activeAssignment = 3;
                }
            } 
            
        }

        if(activeAssignment === 3) {

            if(videoPresentationProgress < 210) {
                videoPresentationProgress = videoPresentationProgress + assignmentProgressPace;
                grade3Array.push(statAverage);
                //console.log("pushed grade 3");
                if(videoPresentationProgress > 209) {
                    activeAssignment = 4;
                }
            } 
            
        }

        if(activeAssignment === 4) {

            if(essay2Progress < 210) {
                essay2Progress = essay2Progress + assignmentProgressPace;
                grade4Array.push(statAverage);
                //console.log("pushed grade 4");
                if(essay2Progress > 209) {
                    activeAssignment = 4;
                }
            } 
            
        }
    }

    if((bedNeedHeight < 60) || (showerNeedHeight < 60) || (fridgeNeedHeight < 60) || (socialNeedHeight < 60)) {
        assignmentProgressPace = 0.05;
        workingSpeed = "slow";
        //console.log(assignmentProgressPace);
    } else {
        assignmentProgressPace = 0.1;
        workingSpeed = "fast";
    }
    

}

function determineQualityOfWork() {
    var statAverage = ((bedNeedHeight + showerNeedHeight + socialNeedHeight + fridgeNeedHeight) / 4);

    //console.log("stat average: " + statAverage);
    if(statAverage >= 170) {
        qualityOfWork = "A";
    } else if (statAverage >= 130) {
        qualityOfWork = "B";
    } else if (statAverage >= 100) {
        qualityOfWork = "C";
    } else if (statAverage >= 80) {
        qualityOfWork = "D";
    } else if (statAverage >= 60) {
        qualityOfWork = "E";
    } else if (statAverage < 59) {
        qualityOfWork = "F";
    }
}

function drawStartingPage() {
    background(243, 214, 145);

    image(openingPage, 0, 0, width, height);

    textSize(40);
    fill(0);
    textFont('Courier New');
    textStyle(BOLD);

    textSize(14);
    textStyle(BOLD);
    fill(255);
    text("Complete four assignments before the deadline on Friday.", 244, 267);
    text("Keep up with your personal needs: ", 346, 297);
    text("hygiene, hunger, social and sleep.", 340,327);
    text("High personal need stats lead to high quality work,", 264, 357);
    text("and a faster work pace.", 384, 387);

    fill(243, 214, 145);
    rect(379, 411, 200, 40, 10);

    fill(0);
    textStyle(BOLD);
    textSize(23);
    text("Start Game", 412, 437);
}


function drawEndPage() {
    background(243, 214, 145);

    image(endingPage, 0, 0, width, height);

    shower.stop();
    party.stop();
    typingFast.stop();
    snoring.stop();
    microwaving.stop();

    fill(255);
    textFont('Courier New');
    textSize(14);
    textStyle(BOLD);
    text("The deadline has passed and completed work has been submitted.", 224, 263);
    text("Here are your final grades:", 374, 287);
    text("Essay 1:", 334, 327);
    text("Project:", 334, 367);
    text("Video Presentation:", 334, 407);
    text("Essay 2:", 334, 447);

    var grade1Total = 0;
    var grade2Total = 0;
    var grade3Total = 0;
    var grade4Total = 0;

    if(essay1Progress > 209) {
        for(let i = 0; i < grade1Array.length; i++) {
            grade1Total = grade1Total + grade1Array[i];
        }
    }

    if(projectProgress > 209) {
        for(let i = 0; i < grade2Array.length; i++) {
            grade2Total = grade2Total + grade2Array[i];
        }
    }

    if(videoPresentationProgress > 209) {
        for(let i = 0; i < grade3Array.length; i++) {
            grade3Total = grade3Total + grade3Array[i];
        }
    }

    if(essay2Progress > 209) {
        for(let i = 0; i < grade4Array.length; i++) {
            grade4Total = grade4Total + grade4Array[i];
        }
    } 
    

    if(essay1Progress > 209) {
        grade1 = grade1Total / (grade1Array.length);

        if(grade1 >= 170) {
            grade1 = "A";
        } else if (grade1 >= 130) {
            grade1 = "B";
        } else if (grade1 >= 100) {
            grade1 = "C";
        } else if (grade1 >= 80) {
            grade1 = "D";
        } else if (grade1 >= 60) {
            grade1 = "E";
        } else if (grade1 < 59) {
            grade1 = "F";
        }
    } else {
        grade1 = "FAIL";
    }

    //console.log("stat average: " + statAverage);
    
    
    if(projectProgress > 209) {
        grade2 = grade2Total / (grade2Array.length);

        if(grade2 >= 170) {
            grade2 = "A";
        } else if (grade2 >= 130) {
            grade2 = "B";
        } else if (grade2 >= 100) {
            grade2 = "C";
        } else if (grade2 >= 80) {
            grade2 = "D";
        } else if (grade2 >= 60) {
            grade2 = "E";
        } else if (grade2 < 59) {
            grade2 = "F";
        }
    } else {
        grade2 = "FAIL";
    }

    if(videoPresentationProgress > 209) {
        grade3 = grade3Total / (grade3Array.length);

        if(grade3 >= 170) {
            grade3 = "A";
        } else if (grade3 >= 130) {
            grade3 = "B";
        } else if (grade3 >= 100) {
            grade3 = "C";
        } else if (grade3 >= 80) {
            grade3 = "D";
        } else if (grade3 >= 60) {
            grade3 = "E";
        } else if (grade3 < 59) {
            grade3 = "F";
        }
    } else {
        grade3 = "FAIL";
    }

    if(essay2Progress > 209) {
        grade4 = grade4Total / (grade4Array.length);

        if(grade4 >= 170) {
            grade4 = "A";
        } else if (grade4 >= 130) {
            grade4 = "B";
        } else if (grade4 >= 100) {
            grade4 = "C";
        } else if (grade4 >= 80) {
            grade4 = "D";
        } else if (grade4 >= 60) {
            grade4 = "E";
        } else if (grade4 < 59) {
            grade4 = "F";
        }
    } else {
        grade4 = "FAIL";
    }
    
    //console.log(grade1);
    text(grade1, 600, 327);
    text(grade2, 600, 367);
    text(grade3, 600, 407);
    text(grade4, 600, 447);

}
