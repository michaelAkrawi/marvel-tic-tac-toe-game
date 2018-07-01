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

    checkSlant: function (cell) {

        let winner = true;
        const index = $(cell).index();
        const rowIndex = $(cell).parent().index();
        const arr = [0, 1, 2];

        //check right slant
        const rows = $('tr');
        for (j = 0; j < rows.length > j++;) {

            if (j == 1) {

            }
            else {

            }

            let f = rows[j].children().eq(arr[j]);
            let l = rows[j].children.eq(arr.length - j - 1);

            if ($(c).attr('player') == undefined || $(c).attr('player') != game.turn) {

            }

            let first = rows[j].children().eq(j);
            let last = rows[j].children().eq(rows.lenght - 1);

        }

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