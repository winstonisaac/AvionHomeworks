var cells = document.querySelectorAll('div.chessCell');
cleanUp();
document.querySelector('input').addEventListener('click', function(){       //night mode
    document.querySelector('html').classList.toggle('night');
});
function makeMovables(){        //select intended piece to move
    var pieces = document.querySelectorAll('div.isNotEmpty');
    for(let piece of pieces) {        
        piece.onclick = function() {
            if (document.querySelectorAll('div.possibleMoves').length){
                var possibleMoves = document.querySelectorAll('div.possibleMoves');
                for(let possibleMove of possibleMoves) {     //cleanup click events if activate other piece
                    possibleMove.onclick = () => {};
                    possibleMove.classList.remove('possibleMoves');
                }
            }
            if (document.querySelectorAll('#active').length){
                if(piece.id === 'active'){
                    document.querySelector('#active').removeAttribute("id");
                    return;
                }
                document.querySelector('#active').removeAttribute("id");
            }
            piece.id = 'active';
        };
    }
}
function cleanUp(){         //clearing and reassigning click events
    for(cell of cells){
        cell.onclick = () => {};
    }
    makeMovables();
    knightMoves();
    pawnMoves();
}
function knightMoves(){
    var knights = document.querySelectorAll('div.knight');
    for(let knight of knights) {        //for knight movements
        knight.addEventListener('click', function() {
            console.log('knight to move');
            for(let index = 0; index < cells.length; index++){
                if(cells[index].className.includes('knight') && cells[index].id === 'active'){
                    if(index > 15 && index % 8 != 0 && cells[index-17].className.includes('isEmpty')){
                        cells[index-17].classList.add('possibleMoves');
                    }
                    if(index > 15 && (index+1) % 8 != 0 && cells[index-15].className.includes('isEmpty')){
                        cells[index-15].classList.add('possibleMoves');
                    }
                    if(index > 7 && index % 8 != 0 && (index - 1) % 8 != 0 && cells[index-10].className.includes('isEmpty')){
                        cells[index-10].classList.add('possibleMoves');
                    }
                    if(index > 7 && (index + 1) % 8 != 0 && (index + 2) % 8 != 0 && cells[index-6].className.includes('isEmpty')){
                        cells[index-6].classList.add('possibleMoves');
                    }
                    if(index < 48 && (index + 1) % 8 != 0 && cells[index+17].className.includes('isEmpty')){
                        cells[index+17].classList.add('possibleMoves');
                    }
                    if(index < 48 && index % 8 != 0 && cells[index+15].className.includes('isEmpty')){
                        cells[index+15].classList.add('possibleMoves');
                    }
                    if(index < 56 && (index + 1) % 8 != 0 && (index + 2) % 8 != 0 && cells[index+10].className.includes('isEmpty')){
                        cells[index+10].classList.add('possibleMoves');
                    }
                    if(index < 56 && index % 8 != 0 && (index - 1) % 8 != 0 && cells[index+6].className.includes('isEmpty')){
                        cells[index+6].classList.add('possibleMoves');
                    }
                    confirmMove();
                    break;
                }
            }
        })
    }
}
function pawnMoves(){
    var pawns = document.querySelectorAll('div.pawn');
    for(let pawn of pawns) {      //for pawn movements
        pawn.addEventListener('click', function() {
            console.log('pawn to move');
            for(let index = 0; index < cells.length; index++){
                if(cells[index].className.includes('pawn light') && cells[index].id === 'active' && cells[index-8].className.includes('isEmpty')){
                        cells[index-8].classList.add('possibleMoves');
                    if(cells[index].className.includes('init')){
                        cells[index-16].classList.add('possibleMoves');
                    }
                    confirmMove();
                    break;
                }
                if(cells[index].className.includes('pawn dark') && cells[index].id === 'active' && cells[index+8].className.includes('isEmpty')){
                        cells[index+8].classList.add('possibleMoves');
                    if(cells[index].className.includes('init')){
                        cells[index+16].classList.add('possibleMoves');
                    }
                    confirmMove();
                    break;
                }
            }
        })
    }
}
function confirmMove(){
    var possibleMoves = document.querySelectorAll('div.possibleMoves');
    for(let possibleMove of possibleMoves) {      //for confirming move
        possibleMove.onclick = function() {
            possibleMove.innerHTML = document.querySelector('#active').innerHTML;
            possibleMove.classList = document.querySelector('#active').classList;
            if (document.querySelector('#active').className.includes('init')){
                possibleMove.classList.remove('init');
            }
            document.querySelector('#active').classList = 'chessCell isEmpty';
            document.querySelector('#active').innerHTML = '';
            for(let possibleMove of possibleMoves) {
                possibleMove.classList.remove('possibleMoves');
            }
            document.querySelector('#active').removeAttribute("id");
            cleanUp();
        };
    }
}
