$(document).ready(function(){

    if(listLocalStorage()==0) {
        $('.count').hide();               
    }else{
        $('.count').text(listLocalStorage()) 
    }
    
    $('button').click(function(){
		if($('#order-form').valid()){
			console.log("Bravo");
			saveData();
		}
	});
 
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
                ccExpiry:true

            }
            
            
        },
        
        submitHandler: function(form) {				
			form.submit();
		},
    });
});


jQuery.validator.addMethod("ccExpiry", function(value, element) {
  // allow any non-whitespace characters as the host part
  return this.optional( element ) || /^(0[1-9]|1[0-2])\/?(1[8-9]|[2-9][0-9])$/.test( value );
}, "La date d'expiration de votre carte de crédit est invalide.");


function saveData(){
	var commande = sessionStorage.getItem("commande");
	console.log(commande);

	if(commande == undefined){
		sessionStorage.setItem("commande", 1);
	}
	else{
		sessionStorage.setItem("commande",parseInt(commande)+1);
	};
	
	sessionStorage.setItem("name", $('#first-name').val());
	sessionStorage.setItem("lastname", $('#last-name').val());
}

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
