
const time= 30;
const moveBall= 20;
const moveBar= 20;

const player1= document.getElementById("player1");
const player2= document.getElementById("player2");
const ball= document.getElementById("ball");

const topIniPlayer= parseInt(window.getComputedStyle(player1).getPropertyValue("top").split("px")[0]);
const topIniBall= parseInt(window.getComputedStyle(ball).getPropertyValue("top").split("px")[0]);
const leftIniBall= parseInt(window.getComputedStyle(ball).getPropertyValue("left").split("px")[0]);


const widthBarr= parseInt(window.getComputedStyle(document.getElementById("player1")).getPropertyValue("width").split("px")[0]);
const heightBarr= parseInt(window.getComputedStyle(document.getElementById("player1")).getPropertyValue("height").split("px")[0]);
const widthBall= parseInt(window.getComputedStyle(document.getElementById("ball")).getPropertyValue("width").split("px")[0]);

const widthZoneGame= document.documentElement.clientWidth - widthBarr - widthBarr;
const heightScreen= document.documentElement.clientHeight;
const heightBall= parseInt(window.getComputedStyle(ball).getPropertyValue("height").split("px")[0]);

var marcador1= document.getElementById("marcador1");
var marcador2= document.getElementById("marcador2");

var playing=false;

var direction="up"; //dirección hacia donde saldrá la bola

var juego=null;
var turno="player2";

window.addEventListener("keydown", fmoveBar);


function fmoveBar(event){

    let keyCode= event.keyCode;   

    switch(keyCode){
        case 87: muevePlayer1(keyCode); break; //pulsa W
        case 83: muevePlayer1(keyCode); break; //pulsa S
        case 79: muevePlayer2(keyCode); break; //Pulsa O
        case 76: muevePlayer2(keyCode); break; //Pulsa L
        case 32: if(!playing)
                    startGame(keyCode); break; //Pulsa barra espaciadora
    }
}



function muevePlayer1(keyCode){

    let topPlayer= parseInt(window.getComputedStyle(player1).getPropertyValue("top").split("px")[0]);
    let heightPlayer= parseInt(window.getComputedStyle(player1).getPropertyValue("height").split("px")[0]);

    let topBall= parseInt(window.getComputedStyle(ball).getPropertyValue("top").split("px")[0]);

    if(keyCode==83 && !playing)
        direction="down";
    else if(keyCode==87 && !playing)
        direction="up";

    if(keyCode==83 && (topPlayer < heightScreen - heightPlayer - 20)){ //se pulsó S
        player1.style.top= topPlayer+moveBar+"px";

        if(!playing && turno!="player1"){ //NO ha empezado el juego y NO se pulsó L
            if(topBall < heightScreen-50)
                ball.style.top= topBall+moveBall+"px";
        }
    }
    else if(keyCode==87 && (topPlayer>topIniPlayer)){ //se pulsó W
        player1.style.top= topPlayer-moveBar+"px";

        if(!playing && turno!="player1"){ //NO ha empezado el juego
            if(topBall > topIniBall)
                ball.style.top= topBall-moveBall+"px";
        }
    }
}



function muevePlayer2(keyCode){

    let topPlayer= parseInt(window.getComputedStyle(player2).getPropertyValue("top").split("px")[0]);
    let heightPlayer= parseInt(window.getComputedStyle(player2).getPropertyValue("height").split("px")[0]);

    let topBall= parseInt(window.getComputedStyle(ball).getPropertyValue("top").split("px")[0]);
    
    if(keyCode==76 && !playing)
        direction="down";
    else if(keyCode==79 && !playing)
        direction="up";

    if(keyCode==76 && (topPlayer < heightScreen - heightPlayer - 20)){ //se pulsó L
        player2.style.top= topPlayer+moveBar+"px";

        if(!playing && turno!="player2"){ //NO ha empezado el juego
            if(topBall < heightScreen)
                ball.style.top= topBall+moveBall+"px";
        }
    }

    else if(keyCode==79 && (topPlayer>topIniPlayer)){ //se pulsó O
        player2.style.top=topPlayer-moveBar+"px";

        if(!playing && turno!="player2"){ //NO ha empezado el juego
            if(topBall > topIniBall)
                ball.style.top= topBall-moveBall+"px";
        }     
    }
}


function startGame(){

    playing=true;

    if(direction=="up"){ //se irá hacia arriba
        juego= setInterval(mueveBall, 50);
    }
    else{//se irá hacia abajo
        juego= setInterval(mueveBall, 50);
    }
}


function mueveBall(){

    let topBall= parseInt(window.getComputedStyle(ball).getPropertyValue("top").split("px")[0]);
    let leftBall= parseInt(window.getComputedStyle(ball).getPropertyValue("left").split("px")[0]);

    if(direction=="up"){ 

        if(turno=="player1"){ //irá hacia arriba y para la derecha

            if(topBall-moveBall>=0 && leftBall+moveBall<=widthZoneGame){ //aún puede subir más e ir hacia la derecha
                topBall= topBall-moveBall;
                leftBall= leftBall+moveBall;
                ball.style.top= topBall+"px";
                ball.style.left= leftBall+"px";
            }
            else{
                if(!(topBall-moveBall>=0)) //ha llegado arriba
                    direction="down";
                
                else if(!(leftBall+moveBall<=widthZoneGame)){ //ha llegado a la derecha del todo
                    turno="player2";
                    comprueba(turno);
                }
            }
        }
        else if(turno=="player2"){ //irá hacia arriba y para la izquierda

            if(topBall-moveBall>=0 && leftBall>=widthBarr){ //aún puede subir más e ir hacia la izquierda
                topBall= topBall-moveBall;
                leftBall= leftBall-moveBall;
                ball.style.top= topBall+"px";
                ball.style.left= leftBall+"px";
            }
            else{
                if(!(topBall-moveBall>=0)) //ha llegado arriba
                    direction="down";
                
                else if(!(leftBall>=widthBarr)){ //ha llegado a la izquierda del todo
                    turno="player1";
                    comprueba(turno);
                }
            }
        }
    }
    else if(direction=="down"){

        if(turno=="player1"){ //irá hacia abajo y para la derecha

            if(topBall+moveBall+heightBall<=heightScreen && leftBall+moveBall<=widthZoneGame){ //aún puede bajar más e ir hacia la derecha
                topBall= topBall+moveBall;
                leftBall= leftBall+moveBall;
                ball.style.top= topBall+"px";
                ball.style.left= leftBall+"px";
            }
            else{
                if(!(topBall+moveBall+heightBall<=heightScreen)) //ha llegado abajo
                    direction="up";
                
                if(!(leftBall+moveBall<=widthZoneGame)){ //ha llegado a la derecha del todo
                    turno="player2";
                    comprueba(turno);
                }
            }
        }
        else if(turno=="player2"){ //irá hacia abajo y para la izquierda

            if(topBall+moveBall+heightBall<=heightScreen && leftBall>widthBarr){ //aún puede bajar más e ir hacia la izquierda
                topBall= topBall+moveBall;
                leftBall= leftBall-moveBall;
                ball.style.top= topBall+"px";
                ball.style.left= leftBall+"px";
            }
            else{
                if(!(topBall+moveBall+heightBall<=heightScreen)) //ha llegado abajo
                    direction="up";
                
                if(!(leftBall>widthBarr)){ //ha llegado a la izquierda del todo
                    turno="player1";
                    comprueba(turno);
                }
            }
        }
    }
}



function comprueba(turno){

    let topBar;
    let topBall= parseInt(window.getComputedStyle(ball).getPropertyValue("top").split("px")[0]);

    if(turno=="player1"){ //estoy en el campo del player1, luego marca el player2

        topBar= parseInt(window.getComputedStyle(player1).getPropertyValue("top").split("px")[0]); //en que top está la barra1
        let puntos=0;
        if((topBall+widthBall<topBar)){
            puntos= parseInt(marcador2.textContent);
            puntos++;
            marcador2.innerHTML=puntos;
            clearInterval(juego);
            playing=false;
            ball.style.top=topIniBall+"px";
            ball.style.left=widthZoneGame+"px";
            player1.style.top=topIniPlayer+"px";
            player2.style.top=topIniPlayer+"px";
            turno="player2";
            
        }
        else if(topBall>topBar+heightBarr){
            puntos= parseInt(marcador2.textContent);
            puntos++;
            marcador2.innerHTML=puntos;
            clearInterval(juego);
            playing=false;
            ball.style.top=topIniBall+"px";
            ball.style.left=widthZoneGame+"px";
            player1.style.top=topIniPlayer+"px";
            player2.style.top=topIniPlayer+"px";
            turno="player2";            
        }

    }
    else if(turno=="player2"){ //estoy en el campo del player2, luego marca el player1

        topBar= parseInt(window.getComputedStyle(player2).getPropertyValue("top").split("px")[0]); //en que top está la barra2

        let puntos=0;
        if((topBall+widthBall<topBar)){
            puntos= parseInt(marcador1.textContent);
            puntos++;
            marcador1.innerHTML=puntos;
            clearInterval(juego);
            playing=false;
            ball.style.top=topIniBall+"px";
            ball.style.left=leftIniBall+"px";
            player1.style.top=topIniPlayer+"px";
            player2.style.top=topIniPlayer+"px";
            turno="player1";
            
        }
        else if(topBall>topBar+heightBarr){
            puntos= parseInt(marcador1.textContent);
            puntos++;
            marcador1.innerHTML=puntos;
            clearInterval(juego);
            playing=false;
            ball.style.top=topIniBall+"px";
            ball.style.left=leftIniBall+"px";
            player1.style.top=topIniPlayer+"px";
            player2.style.top=topIniPlayer+"px";
            turno="player1";            
        }
    }
}



