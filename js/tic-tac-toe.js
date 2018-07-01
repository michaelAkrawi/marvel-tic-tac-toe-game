var skin = {
    marvel: {
        icons: ['images/spiderman_web.png', 'images/captain-america_shield .png'],
    }
}


var game = {

    skin: skin.marvel,

    turn: 'player1',

    setup: function () {
        game.bindEvents();
    },

    bindEvents: function () {

        let $cells = $('td');
        $cells.each(function () {

            $cell = $(this);
            $cell.click(function () {

                $cell = $(this);
                if ($cell.is(':empty')) {

                    game.setPlayerIcon($cell);
                    game.checkWinner($cell);
                    game.changePlayerTurn();
                }


            });

        });
    },

    checkWinner: function (cell) {

        if (game.checkVertical(cell) ||
            game.checkHorizontal(cell) || 
            game.checkSlant())

            window.alert('winner');

    },

    checkHorizontal: function ($cell) {

        let winner = true;
        const arr = [0, 1, 2];
        const index = $cell.index();
        const row = $cell.parent();

        let filter = arr.filter(x => x != index);
        for (let j = 0; j < filter.length; j++) {
            let c = row.children().eq(filter[j]);
            if ($(c).attr('player') == undefined || $(c).attr('player') != game.turn) {
                winner = false;
                break;
            }
        }

        return winner;
    },

    checkVertical: function (cell) {

        const index = $(cell).index();
        const rows = $('tr');
        for (var j = 0; j < rows.length; j++) {

            const c = $(rows[j]).children().eq(index);
            if ($(c).attr('player') == undefined || $(c).attr('player') != game.turn) {
                return false;
            }
        }

        return true;
    },

    checkSlant: function () {

       return game.leftSlantWinner() || game.rightSlantWinner();
            
    },

    leftSlantWinner : function(){
            let winner = true;
            const rows = $('tr');
            for(let j = rows.length - 1 ;  j >= 0; j --){
                let c   = $(rows[j]).children().eq(j);
                if(!game.hasAtrr(c)){
                        winner = false;
                        break;
                }
    
            }
            
            return winner;
    
    },

    rightSlantWinner : function(){

        let winner = true;
        const rows = $('tr');
        for(let j = 0;  j < rows.length; j ++){
            let c   = $(rows[j]).children().eq(j);
            if(!game.hasAtrr(c)){
                    winner = false;
                    break;
            }

        }
        
        return winner;

    },

    hasAtrr : function(cell){
        return ($(cell).attr('player') == undefined || $(cell).attr('player') != game.turn);
    },

    changePlayerTurn: function () {

        if (game.turn == 'player1')
            game.turn = 'player2';
        else
            game.turn = 'player1';
    },

    setPlayerIcon: function (cell) {

        $img = $('<img>');
        if (game.turn == 'player1') {
            $img.attr('src', game.skin.icons[0]);
        }
        else {
            $img.attr('src', game.skin.icons[1]);
        }

        cell.append($img);
        $(cell).attr('player', game.turn);
    }

};

$(document).ready(function () {
    game.setup();
});