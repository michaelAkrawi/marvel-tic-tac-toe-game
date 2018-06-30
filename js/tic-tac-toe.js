var skin = {
    marvel : {
        icons : ['images/spiderman_web.png', 'images/captain-america_shield .png'], 
    }
}


var game =  {

    skin : skin.marvel,

    turn : 'player1',
    
    setup : function(){
        game.bindEvents();
    },

    bindEvents : function(){
      
        let $cells = $('td');
        $cells.each(function(){

            $cell = $(this);
            $cell.click(function(){
                $cell = $(this);
                game.setPlayerIcon($cell);
            });    

        });
    },

    

    setPlayerIcon : function(cell){
        
        $img = $('<img>');
        if(game.turn == 'player1'){
            $img.attr('src', game.skin.icons[0]);
        }
        else{
            $img.attr('src', game.skin.icons[1]);
        }
        cell.append($img);
    }

};

$(document).ready(function(){
    game.setup();
});