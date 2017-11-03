$(document).ready(function(){
    
    init();

    if(listLocalStorage()==0) {
        $('.shopping-cart .count').hide();               
    }else{
        $('.shopping-cart .count').text(listLocalStorage());
    }
    $(document).on('submit', '#add-to-cart-form', function(e){ // Make your changes here
        addItem();
        e.preventDefault(); 

        $('#dialog').show(0).delay(5000).hide(0);
        
    });
});


function getParameters(name){
    var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}


function init() {
    $.getJSON('./data/products.json',function(result) {
        var id = getParameters('id');
        var resultat = result.find(function(field){
            return field.id == id;
        });
        console.log(resultat);
        
        if( resultat != undefined) {
			$('#dialog').hide();
            $('#product-name').text(resultat.name);

            $('#product-image').attr('alt',resultat.name).attr('src','./assets/img/'+ resultat.image);
             
            $('#product-desc').append(resultat.description);

            $.each(resultat.features,function(i,feature){
                $('#product-features').append($('<li></li>').text(feature));
            });
            $('#product-price strong').text(String(resultat.price).replace('.',',') + '$');  
        }
        else{
            $('article').empty().append($('<h1>Page non trouvée!</h1>'));
        }
    });
}

function saveData(item)  {
    localStorage.setItem(String(item),  $("#product-quantity").val());   
}

function loadData(){
    if (localData != null) {
        $("#localData").val(localStorage.getItem("localData"));
    }
}

function addItem() {
    $.getJSON('./data/products.json',function(result) {
        var id = getParameters('id');
        var resultat = result.find(function(field){
            return field.id == id;
        });               
        if(resultat != undefined && $("#product-quantity").val() != 0) {            
            saveData(resultat.name);
            if(listLocalStorage()!=0) {
                $('.shopping-cart .count').show();               
                $('.shopping-cart .count').text(listLocalStorage());
            }
        }
    });
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
