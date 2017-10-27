$(document).ready(function(){
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