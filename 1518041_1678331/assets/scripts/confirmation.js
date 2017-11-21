$(document).ready(function(){
	
    
	$('#name').text(sessionStorage.getItem('name')+ " "+sessionStorage.getItem('lastname'));
	$('#confirmation-number').text( "0000"+sessionStorage.getItem('commande'));
	//localStorage.clear();
    $('.count').hide();

	
});


