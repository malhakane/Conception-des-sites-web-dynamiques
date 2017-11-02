$(document).ready(function(){

    if(listLocalStorage()==0) {
        $('.shopping-cart .count').hide();               
    }else{
        $('.shopping-cart .count').text(listLocalStorage()) 
    }
 
    $('#order-form').validate({
        rules:{
            "first-name":{
                required: true,
                minlength: 2
            },
            "last-name": {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email:true
            },
            phone:{
                required:true,
                phoneUS:true
            },
            "credit-card": {
                required:true,
                creditcard:true,
                
            },
            "credit-card-expiry":{
                required:true,

            }



        }
    });

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