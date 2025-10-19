const scene = document.querySelector("#scene");

const boyElem = document.querySelector("#boy");
const girlElem = document.querySelector("#girl");
const jackElem = document.querySelector("#jack");
const treeElem = document.querySelector("#tree");

const sceneWidth = scene.clientWidth;
const jackX = sceneWidth / 2 - 130;
const treeX = sceneWidth / 2 - 200;
jackElem.style.left = jackX + "px";
treeElem.style.left = treeX + "px";

const boyData = {
    walkImgs: ["./images/boy_walking/walking e0000.png", "./images/boy_walking/walking e0001.png", "./images/boy_walking/walking e0002.png", "./images/boy_walking/walking e0003.png", "./images/boy_walking/walking e0004.png", "./images/boy_walking/walking e0005.png", "./images/boy_walking/walking e0006.png", "./images/boy_walking/walking e0007.png"],
    cheerImgs: ["./images/boy_cheering/cheering e0000.png", "./images/boy_cheering/cheering e0001.png", "./images/boy_cheering/cheering e0002.png", "./images/boy_cheering/cheering e0003.png", "./images/boy_cheering/cheering e0004.png", "./images/boy_cheering/cheering e0005.png", "./images/boy_cheering/cheering e0006.png", "./images/boy_cheering/cheering e0007.png", "./images/boy_cheering/cheering e0008.png"],
    stoppedImg: "./images/boy_stopped/stopped0006.png",
    elem: boyElem,
    x: 0,
    poseNumber: 0,
    mode: "walk",
    timerId: null,
    loopCount: 0
};

const girlData = {
    walkImgs: ["./images/girl_walking/walking e0000.png", "./images/girl_walking/walking e0001.png", "./images/girl_walking/walking e0002.png", "./images/girl_walking/walking e0003.png", "./images/girl_walking/walking e0004.png", "./images/girl_walking/walking e0005.png", "./images/girl_walking/walking e0006.png", "./images/girl_walking/walking e0007.png"],
    turnImgs: ["./images/girl_turning/turning e0000.png", "./images/girl_turning/turning se0001.png", "./images/girl_turning/turning s0002.png", "./images/girl_turning/turning sw0003.png"],
    runImgs: ["./images/girl_running/running w0000.png", "./images/girl_running/running w0001.png", "./images/girl_running/running w0002.png", "./images/girl_running/running w0003.png", "./images/girl_running/running w0004.png", "./images/girl_running/running w0005.png", "./images/girl_running/running w0006.png", "./images/girl_running/running w0007.png"],
    stoppedImg: "./images/girl_stopped/stopped0006.png",
    elem: girlElem,
    x: -80,
    poseNumber: 0,
    timerId: null
};

const jackImgs = ["./images/jack_popping/jack in a box0000.png", "./images/jack_popping/jack in a box0001.png", "./images/jack_popping/jack in a box0002.png", "./images/jack_popping/jack in a box0003.png", "./images/jack_popping/jack in a box0004.png", "./images/jack_popping/jack in a box0005.png", "./images/jack_popping/jack in a box0006.png", "./images/jack_popping/jack in a box0007.png", "./images/jack_popping/jack in a box0008.png", "./images/jack_popping/jack in a box0009.png", "./images/jack_popping/jack in a box0010.png", "./images/jack_popping/jack in a box0011.png", "./images/jack_popping/jack in a box0012.png", "./images/jack_popping/jack in a box0013.png", "./images/jack_popping/jack in a box0014.png", "./images/jack_popping/jack in a box0015.png", "./images/jack_popping/jack in a box0016.png", "./images/jack_popping/jack in a box0017.png", "./images/jack_popping/jack in a box0018.png"];

const moveBoyAndGirl = () => {
    boyData.timerId = setInterval(() => {
        const stopX = jackX - 100;
        if (boyData.x < stopX) {
            boyData.x += 8;
            boyData.elem.style.left = boyData.x + "px";

            // Boy Walking
            boyData.elem.src = boyData.walkImgs[boyData.poseNumber];
            boyData.poseNumber = (boyData.poseNumber + 1) % boyData.walkImgs.length;

            // Girl Walking
            girlData.x = boyData.x - 80;
            girlData.elem.style.left = girlData.x + "px";
            girlData.elem.src = girlData.walkImgs[girlData.poseNumber % girlData.walkImgs.length];
            girlData.poseNumber = (girlData.poseNumber + 1) % girlData.walkImgs.length;
        }
        else {
            clearInterval(boyData.timerId);
            boyData.elem.src = boyData.stoppedImg;
            girlElem.src = girlData.stoppedImg;
            startJackAnimation();
        }
    }, 100); 
};

// Jack Pops Up
const startJackAnimation = () => {
    let jackFrame = 0;
    const jackInterval = setInterval(() => {
        if (jackFrame < jackImgs.length) {
            jackElem.src = jackImgs[jackFrame];
            jackFrame++;
        }
        else {
            clearInterval(jackInterval);
            startBoyCheer();
            setTimeout(startGirlReaction, 300);
        }
    }, 100);
};

const startBoyCheer = () => {
    boyData.poseNumber = 0;
    boyData.loopCount = 0;
    boyData.mode = "cheer";

    boyData.timerId = setInterval(() => {
        const frames = boyData.cheerImgs;
        boyData.elem.src = frames[boyData.poseNumber];
        boyData.poseNumber++;

        if (boyData.poseNumber >= frames.length) {
            boyData.poseNumber = 0;
            boyData.loopCount++;
            if (boyData.loopCount >= 3) {
                clearInterval(boyData.timerId);
                boyData.elem.src = boyData.stoppedImg;
            }
        }
    }, 100); 
};

// Girl Turns Around and Runs
const startGirlReaction = () => {
    let frame = 0;

    const turnInterval = setInterval(() => {
        if (frame < girlData.turnImgs.length) {
            girlElem.src = girlData.turnImgs[frame];
            frame++;
        }
        else {
            clearInterval(turnInterval);
            runAway();
        }
    }, 100);
};

const runAway = () => {
    girlData.poseNumber = 0;
    girlData.timerId = setInterval(() => {
        girlData.x -= 10;
        girlElem.style.left = girlData.x + "px";
        girlElem.src = girlData.runImgs[girlData.poseNumber];
        girlData.poseNumber = (girlData.poseNumber + 1) % girlData.runImgs.length;

        if (girlData.x < -150) {
            clearInterval(girlData.timerId);
            girlElem.src = girlData.stoppedImg;
        }
    }, 100);
}

moveBoyAndGirl();
