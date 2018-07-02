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

        let reset = $('#btn-reset');
        reset.click(function () {
            game.resetGame();
        });

    },

    checkWinner: function (cell) {

        if (game.verticalWining(cell) ||
            game.horizontalWining(cell) ||
            game.slantWining())

            game.showWinnerMessage();
        else if (game.checkDraw())
            game.showDrawMessage();
        
           

    },

    checkDraw: function () {

        let draw = true;            
        let $cells = $('td');

        $cells.each(function () {
            if ($(this).is(':empty'))
                draw = false;                    

        });

        return draw;
    },

    horizontalWining: function ($cell) {

        let winner = true;
        const arr = [0, 1, 2];
        const index = $cell.index();
        const row = $cell.parent();

        let filter = arr.filter(x => x != index);
        for (let j = 0; j < filter.length; j++) {
            let c = row.children().eq(filter[j]);
            if (!game.hasAttr(c)) {
                winner = false;
                break;
            }
        }

        return winner;
    },

    verticalWining: function (cell) {

        const index = $(cell).index();
        const rows = $('tr');
        for (var j = 0; j < rows.length; j++) {

            const c = $(rows[j]).children().eq(index);
            if (!game.hasAttr(c)) {
                return false;
            }
        }

        return true;
    },

    slantWining: function () {

        return game.leftSlantWinner() || game.rightSlantWinner();

    },

    leftSlantWinner: function () {
        let winner = true;
        const rows = $('tr');
        let i = 2;
        for (let j = 0; j < rows.length; j++) {
            let c = $(rows[j]).children().eq(i);
            if (!game.hasAttr(c)) {
                winner = false;
                break;
            }
            i--;
        }

        return winner;

    },

    rightSlantWinner: function () {

        let winner = true;
        const rows = $('tr');
        for (let j = 0; j < rows.length; j++) {
            let c = $(rows[j]).children().eq(j);
            if (!game.hasAttr(c)) {
                winner = false;
                break;
            }

        }

        return winner;

    },

    hasAttr: function (cell) {
        let b = $(cell).attr('player') != undefined && $(cell).attr('player') == game.turn;
        return b;
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
    },

    showWinnerMessage: function () {

        let message = document.querySelector('#message');
        message.innerHTML = `The Winner Is ${game.turn}`;
        $('#winner').modal('show');

    },

    showDrawMessage: function () {

        let message = document.querySelector('#message');
        message.innerHTML = `A Draw! Try Agian`;
        $('#winner').modal('show');
    },

    resetGame: function () {

        let cells = document.querySelectorAll('td');
        cells.forEach(function (c) {
            $(c).empty();
            $(c).removeAttr('player');
        });

        game.turn = 'player1';
        $('#winner').modal('hide');

    }

};

$(document).ready(function () {
    game.setup();
});