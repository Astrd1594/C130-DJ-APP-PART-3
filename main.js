song = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
leftWristScore = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('PoseNet model initialized');
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[9].score;
        console.log('left wrist score: ' + scoreLeftWrist);
        console.log('right wrist score: ' + scoreRightWrist);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y
        console.log('Right wrist x: ' + rightWristX + ". Right wrist y:" + rightWristY);
        console.log('Left wrist x: ' + leftWristX + ". Left wrist y: " + leftWristY);
    }
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill('#FF0000');
    stroke('#DC143C');
    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        leftWristYNumber = Number(leftWristY);
        remove_decimals = floor(leftWristYNumber);
        volume = remove_decimals / 500;
        document.getElementById('volume').innerHTML = 'Volume: ' + volume;
        song.setVolume(volume);
    }
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        if(rightWristY > 0 && rightWristY <= 100){
            document.getElementById('speed').innerHTML = 'Song speed: 0.5x';
            song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById('speed').innerHTML = 'Song speed: 1x';
            song.rate(1);
        }
        else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = 'Song speed: 1.5x';
            song.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY <= 400){
            document.getElementById('speed').innerHTML = 'Song speed: 2x';
            song.rate(2);
        }
        else if(rightWristY > 400 && rightWristY <= 500){
            document.getElementById('speed').innerHTML = 'Song speed: 2.5x';
            song.rate(2.5); 
        }
    }
}
function play(){
    song.play();
    song.setVolume(volume);
    song.rate(1);
}
function stop(){
    song.stop();
}