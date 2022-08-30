
const player1= document.getElementById("player1");
const player2= document.getElementById("player2");

const widthP= parseInt(window.getComputedStyle(player1).getPropertyValue("width").split("px")[0]);

const ball= document.getElementById("ball");

var start=false;
const resultado= document.getElementById("resultado");

window.addEventListener("keydown", movePlayer);

const windowWidth= window.innerWidth;
const windowHeight= window.innerHeight;

const marcador1= document.getElementById("marcador1");
const marcador2= document.getElementById("marcador2");


var sube=false; //Empieza bajando
var juega1= true; //Empieza el player1


function movePlayer(event){

    let keyCode= event.keyCode;

    switch(keyCode){
        case 87: posicionPlayer1(keyCode); break; //pulsa W
        case 83: posicionPlayer1(keyCode); break; //pulsa S
        case 79: posicionPlayer2(keyCode); break; //Pulsa O
        case 76: posicionPlayer2(keyCode); break; //Pulsa L
        case 32: if(!start)
                    startGame(keyCode); break; //Pulsa barra espaciadora
    }
}

var play=null;
function startGame(keyCode){
    if(!start){
        start=true;
        play= setInterval(moveBall, 90);
    }
}



function moveBall(){

    //Obtengo el left y el top de la bola
    let leftB= window.getComputedStyle(ball).getPropertyValue("left");
    let topBall= window.getComputedStyle(ball).getPropertyValue("top");
    let widthBall= window.getComputedStyle(ball).getPropertyValue("width");


    //Obtengo el left, right y top del player1 y player2
    let leftPlay1= window.getComputedStyle(player1).getPropertyValue("left");
    let rigthPlay2= window.getComputedStyle(player2).getPropertyValue("right");
    let topPlay1= window.getComputedStyle(player1).getPropertyValue("top");
    let topPlay2= window.getComputedStyle(player2).getPropertyValue("top");

    //Lo paso a nº (quitando el px)
    leftB= parseInt(leftB.split("px")[0]);
    topBall= parseInt(topBall.split("px")[0]);
    widthBall= parseInt(widthBall.split("px")[0]);

    leftPlay1= parseInt(leftPlay1.split("px")[0]);
    rigthPlay2= parseInt(rigthPlay2.split("px")[0]);

    topPlay1= parseInt(topPlay1.split("px")[0]);
    topPlay2= parseInt(topPlay2.split("px")[0]);


    if((leftB+widthBall)+20>(windowWidth-rigthPlay2-widthP)){ //ha llegado a la derecha
        juega1=false;
    }

    if((topBall+widthBall)+20>windowHeight)//aún puede bajar más
        sube= true;    
    if(topBall<0) //llega arriba, ahora toca bajar        
        sube= false;



    if(!sube) //NO sube, luego hay que aumentar el top
        topBall= topBall+20;    
    else //Sube, luego hay que disminuir el top
        topBall= topBall-20;
    
    if(juega1)//Juega el player1. Se va hacia la derecha.
        leftB= leftB+20;
    else //Juega el player2. Se va hacia la izquierda.
        leftB= leftB-20;

    if(leftB==36)
        juega1=true   
    
    ball.style.left=leftB+"px";
    ball.style.top=topBall+"px";

    comprueba();
}





function posicionPlayer1(keyCode){

    let topBall= window.getComputedStyle(ball).getPropertyValue("top");
    topBall= parseInt(topBall.split("px")[0]);
    

    let top= window.getComputedStyle(player1).getPropertyValue("top");

    top= parseInt(top.split("px")[0]);

    if(keyCode==83){ //se pulsó S (down)        
        if((top+20)<windowHeight-101){
            top=top+20;
            topBall= topBall+20;
            player1.style.top=top+"px";
            if(!start)
                ball.style.top=topBall+"px";
        }
    }
    else{ //se pulso W (up)
        if((top-20)>=0){
            top=top-20;
            topBall= topBall-20;
            player1.style.top=top+"px";
            if(!start)
                ball.style.top=topBall+"px";
        }
        
    }
}



function posicionPlayer2(keyCode){

    let top= window.getComputedStyle(player2).getPropertyValue("top");

    top= parseInt(top.split("px")[0]);

    if(keyCode==76){ //se pulsó L (down)
        
        if((top+20)<windowHeight-101)
            top=top+20;
        
        player2.style.top=top+"px";
    }
    else{ //se pulso O (up)
        if((top-20)>=0)
            top=top-20;
        player2.style.top=top+"px";
    }
}


function comprueba(){

    let bola= document.getElementById("bola");

    let jugador1= player1.getBoundingClientRect();
    let b= ball.getBoundingClientRect();
    // let topPlay1= window.getComputedStyle(player1).getPropertyValue("top");
    // topPlay1= parseInt(topPlay1.split("px")[0]);


    marcador1.innerHTML= "Jugador 1 Y: " + Math.round(jugador1.y);
    bola.innerHTML= "BOLA X: " + Math.round(b.x) + "<br> BOLA Y: " + Math.round(b.y); 

    // let pelota= ball.getBoundingClientRect();

    // let yP1= (jugador1.y)+topPlay1;
    // let yBall= pelota.y;

    // if(juega1){

        

    // }
    // else{


    // }






    
}