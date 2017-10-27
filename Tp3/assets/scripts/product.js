$(document).ready(function(){
    
    init();

    if(listLocalStorage()!=0) {
        $('.shopping-cart').append( $('<span></span>').attr('class','count').text(listLocalStorage()));                
    }

    $(document).on('submit', '.pull-right', function(e){ // Make your changes here
        addItem();
        e.preventDefault();        
        
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
            var _h1 = $('<h1></h1>').text(resultat.name);
            
                    var _div0 = $('<div></div>').attr('class','row');
            
                    var _div1 =$('<div class = "col"></div>');
                    var _img =$('<img id="product-image"></img>').attr('alt',resultat.name).attr('src','./assets/img/'+ resultat.image);
                    _div1.append(_img);
            
                    var _div2 =$('<div class = "col"></div>');
            
                    var _section1 =$('<section><h2>Description<h2/><section/>');
                    var _p1 = $('<p></p>').text(resultat.description);
                    _section1.append(_p1);
            
                    var _section2 =$('<section><h2>Caracteristiques<h2/><section/>');
                    var _ul = $('<ul></ul>');
                    $.each(resultat.features,function(i,feature){
                        _ul.append($('<li></li>').text(feature));
                    });
                    _section2.append(_ul);
            
                    var _form = $('<hr><form class="pull-right" ><label for="product-quantity">Quantité:</label><input class="form-control" id="product-quantity" type="number" value="1" min="1"><button class="btn" title="Ajouter au panier" type="submit"><i class="fa fa-cart-plus"></i>&nbsp; Ajouter</button></form>');
                    
                    var _p2 = $('<p>Prix:</p>').append($('<strong></strong').text (resultat.price));
                    
                    _div2.append(_section1).append(_section2).append(_form).append(_p2);
            
                    _div0.append(_div1).append(_div2);
            
                    $('article').append(_div0);
        }
        else{
            $('article').append($('<h2>Page non trouvée !</h2>'));
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
        console.log('Resultat :' + resultat);
        console.log('Quantity :' + $("#product-quantity").val());                
        if(resultat != undefined && $("#product-quantity").val() != 0) {
            console.log('Ablam');            
            saveData(resultat.name);
            if(listLocalStorage()!=0) {
                $('.shopping-cart').append( $('<span></span>').attr('class','count').text(listLocalStorage()));                
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