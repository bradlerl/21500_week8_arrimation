const characterData = {
    boyWalkImgs: ["./images/boy_walking/walking e0000.png", "./images/boy_walking/walking e0001.png", "./images/boy_walking/walking e0002.png", "./images/boy_walking/walking e0003.png", "./images/boy_walking/walking e0004.png", "./images/boy_walking/walking e0005.png", "./images/boy_walking/walking e0006.png", "./images/boy_walking/walking e0007.png"],
    boyCheerImgs: ["./images/boy_cheering/cheering e000.png", "./images/boy_cheering/cheering e0001.png", "./images/boy_cheering/cheering e0002.png", "./images/boy_cheering/cheering e0003.png", "./images/boy_cheering/cheering e0004.png", "./images/boy_cheering/cheering e0005.png", "./images/boy_cheering/cheering e0006.png", "./images/boy_cheering/cheering e0007.png", "./images/boy_cheering/cheering e0008.png"],
    boyStoppedImg: "./images/boy_stopped/stopped0006.png",
    boyElem: document.querySelector("#neil"),
    scene: document.querySelector("#scene"),
    x: 0,
    y: 300,
    poseNumber: 0,
    mode: "walk",
    timerId: null,
    loopCount: 0
};

function move() {
    characterData.timerId = setInterval(frame, 100);
}

function frame() {
    const centerX = characterData.scene.clientWidth / 2 - 75;

    if (characterData.mode == "walk") {
        if (characterData.x < centerX) {
            characterData.x += 5;
            characterData.boyElem.style.left = characterData.x + "px";
            const frames = characterData.boyWalkImgs;
            characterData.boyElem.src = frames[characterData.poseNumber];
            characterData.poseNumber = (characterData.poseNumber + 1) % frames.length;
        }
        else {
            characterData.mode = "pause";
            characterData.boyElem.src = characterData.boyStoppedImg;
            clearInterval(characterData.timerId);
        }
    }
}

move();
