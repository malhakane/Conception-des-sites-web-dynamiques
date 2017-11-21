$(document).ready(function(){
    
    if(localStorage.length != 0){
        $('.shopping-cart').append($('<span></span>').attr('class','count').text(listLocalStorage()));        
    }
});


function listLocalStorage() {
    var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;
    var sum = 0;

    while ( i-- ) {
        sum +=parseInt(localStorage.getItem(keys[i]));
    }

    return sum;
}