img = "";
status1 = "";
objects = [];
function preload()
{
    img = loadImage("dog_cat.jpg");
}
function modelLoaded()
{
    console.log("Model Loaded!");
    status1 = true;
    //executing cocossd model//
    object_detected.detect(img, gotResults);
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
    
}

function setup()
{
    canvas = createCanvas(500, 400);
    canvas.center();
    //initializing the cocossd model//
    object_detected = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: detecting objects";
}

function draw()
{
    image(img, 0, 0, 500, 400);
    //If the model is loaded, then the status will not be empty//
    if(status1 != "")
    {
        for(i = 0; i < objects.length; i++)
        {
        document.getElementById("status").innerHTML = "Status : Object Detected";
        fill("#4c616e");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke("#000000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}
