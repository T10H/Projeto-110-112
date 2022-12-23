gestoText = "";
Webcam.set({
    width:350,
    height:300,
    imageFormat:'png',
    pngQuality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}   

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Q9U6AzZAO/model.json', modelLoaded);

function modelLoaded()
{
        console.log('Model Loaded!')
}
function speak() {
    var synth = window.speechSynthesis;
    speakData = "O seu Gesto é: " + gestoText;
    var utterThis = new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
}
function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
function gotResult(error, results)
{
    if(error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("resultNomeGesto").innerHTML = results[0].label;
        gestoText = results[0].label;
        speak();
        if (results[0].label == "Tranquilo")
        {
        document.getElementById("updateEmoji").innerHTML = "&#129305"
        }
        if (results[0].label == "Legal")
        {
        document.getElementById("updateEmoji").innerHTML = "&#128077"
        }
        if (results[0].label == "Vitória")
        {
        document.getElementById("updateEmoji").innerHTML = "&#9996"
        }
    }
}