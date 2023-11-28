const gridboxes=document.querySelectorAll(".box");
const newgame= document.querySelector(".newgame");
const gameinfo=document.querySelector(".gameinfo");

let currentPlayer;
let grids;
let winning_position=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [2,5,8],
    [1,4,7],
    [0,4,8],[2,4,6]
]

function gameinit(){
    currentPlayer="X";
    gameinfo.innerText=`Current Player- ${currentPlayer}`;
    grids=["","","","","","","","",""];
    gridboxes.forEach((box,index)=>{
        box.innerText="";
        gridboxes[index].style.pointerEvents="all";
        box.classList=(`box box${index+1}`);
    })
    newgame.classList.remove("active");
}
gameinit();

gridboxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleclick(index);
    })
})

function wincheck(){
    let answer="";
    let fill=0;
    winning_position.forEach((position)=>{
        if((grids[position[0]]!==""||grids[position[1]]!==""||grids[position[2]]!="")
        &&(grids[position[0]]==grids[position[1]])&&(grids[position[1]])==grids[position[2]] )
    {
           if(grids[position[0]]=="X")answer="X";
           else answer="O";

        //    winner found now disable pointer
        gridboxes.forEach((box)=>{
             box.style.pointerEvents="none";
        })
           //color the win area
           gridboxes[position[0]].classList.add("win");
           gridboxes[position[1]].classList.add("win");
           gridboxes[position[2]].classList.add("win");  }});

          console.log(answer);
           if(answer!==""){
            gameinfo.innerText=`WINNER-${answer}`;
            newgame.classList.add("active");
            return;
           }

        //    if all fill and no win
        // we are checking with every chance if there is a win or tie or game is moving on so we need to check this fill for sure
        grids.forEach((box)=>{

        if(box!="")fill++;
        }
        )
        if(fill===9){
            console.log(fill);
            gameinfo.innerText=`GAME TIED`;
            newgame.classList.add("active");
        }
           
    
    }

  


function swap_players(){
    if(currentPlayer=="X")
    currentPlayer="O";
     else 
      currentPlayer="X";
     gameinfo.innerText=`CURRENT PLAYER-${currentPlayer}`;
}

function handleclick(index){
    if(grids[index]===""){
        gridboxes[index].innerText=currentPlayer;
        grids[index]=currentPlayer;
        gridboxes[index].style.pointerEvents="none";   
        // pointerevents none ek br value set ho gyi phir cursor pointer nhi bnega arrow rhega 
        // swap players
        swap_players();
        // find if someone wins
        wincheck();
    }
   
}

newgame.addEventListener("click",gameinit);