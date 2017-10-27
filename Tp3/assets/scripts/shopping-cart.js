$(document).ready(function(){

    init();
    //console.log($('.col').text());
    PriceTotal();

    $(document).on('click','td > button',function(){
        deleteItem($(this));
        
    });

    $(document).on('click','button[title=Retirer]',function(){
        var el = $(this).parent().next();
        var nom=el.parent().parent().prev().prev().children().eq(0).text();
        var part =el.parent().parent().prev().prev().children().eq(0).text();        
        if(parseInt(el.text()) ==2){
            el.text(parseInt(el.text()) -1);
            localStorage.setItem(nom,el.text());                       
            $(this).attr('disabled','');
        } else{
            el.text(parseInt(el.text()) -1); 
            localStorage.setItem(nom,el.text());            
        } 
        partialTotal(part,el.parent().parent().next());
        PriceTotal();
        $('.shopping-cart').append($('<span></span>').attr('class','count').text(listLocalStorage()));        
        //
    });

    $(document).on('click','button[title=Ajouter]',function(){
        var el = $(this).parent().prev();
        el.text(parseInt($(this).parent().prev().text()) +1);
        $('button[title=Retirer]').removeAttr('disabled');
        var nom=el.parent().parent().prev().prev().children().eq(0).text();
        localStorage.setItem(nom,el.text());
        $('.shopping-cart').append($('<span></span>').attr('class','count').text(listLocalStorage()));
        var part =el.parent().parent().prev().prev().children().eq(0).text();
        partialTotal(part,el.parent().parent().next());
        PriceTotal();       
    });

    $('#remove-all-items-button').click(function(){
        var conf = confirm("Voulez-vous supprimer tous les produits du panier ?");
        if(conf){
            $('article').empty().append('<h1>Panier</h1>');
            $('article').append($('<p></p>').text('Aucun produit dans le panier.'));
            localStorage.clear();
            $('.count').remove();
        }
    })
});


function incrSortByName(jsonStr) {
    var _sorted = jsonStr.sort(function(a,b) {
        var a_low = a.name.toLowerCase();
        var b_low = b.name.toLowerCase();
        if(a_low < b_low) {
            return -1;
        }
        if(a_low > b_low) {
            return 1;
        }
        return 0; 
    });
    return _sorted;
 }


 function init(){
     if(localStorage.length == 0) {
        $('article').empty().append('<h1>Panier</h1>');
        $('article').append($('<p></p>').text('Aucun produit dans le panier.'));
     }else{
        $('.shopping-cart').append($('<span></span>').attr('class','count').text(listLocalStorage()));                
        var items = Object.keys(localStorage);    
        $.getJSON('./data/products.json',function(result){
            var results = incrSortByName(getSortByName(items,result));
            var sumTotal =0;
            $.each(results,function(i,res) {
                var _tr =$('<tr></tr>');
                _tr.append($('<td><button title="Supprimer"><i class="fa fa-times"></i></button></td>'));
                _tr.append($('<td></td>').append($('<a></a>').attr('href','./product.html?id='+ res.id).text(res.name)));
                _tr.append($('<td></td>').text(res.price + '$'));
                var _td4 = $('<td></td>');
                var _div = $('<div></div>').attr('class','row');
                if(localStorage.getItem(res.name) == 1) {
                    _div.append('<div class="col"><button title="Retirer" disabled=""><i class="fa fa-minus"></i></button></div>');                    
                }else{
                    _div.append('<div class="col"><button title="Retirer"><i class="fa fa-minus"></i></button></div>');                    
                }
                _div.append($('<div></div>').attr('class','col').text(String(localStorage.getItem(res.name))));
                _div.append('<div class="col"><button title="Ajouter"><i class="fa fa-plus"></i></button></div>');
                _td4.append(_div);
                _tr.append(_td4);
                _tr.append($('<td></td>').text((res.price * parseInt(localStorage.getItem(res.name))).toFixed(2)+'$'));
                $('tbody').append(_tr);
    
                sumTotal += res.price * parseInt(localStorage.getItem(res.name)).toFixed(2);
                
            });
    
            $('.shopping-cart-total strong').text(sumTotal.toFixed(2) + '$');
        });
     }
    
 }

 function getSortByName(items,res) {
    var resultat = [];
    $.each(items,function(i,item){
        var temp = res.find(function(field){
            return String(field.name) == String(item);
        });
        resultat.push(temp);
    })

    return resultat;          
 }

 function getNumberItems(items,name) {
     var nb = items.find(function(item){
         return item.key == name;
     });

     return nb.value;
 }

 function deleteItem(el) {
     var result = confirm('Voulez-vous supprimer le produit du panier ?');
     if(result){
        el.parent().parent().remove();  
        var elmt = el.parent().next().children().eq(0).text();
        if(localStorage.length == 1) {
            $('article').empty().append('<h1>Panier</h1>');
            $('article').append($('<p></p>').text('Aucun produit dans le panier.'));
            $('.count').remove();
            localStorage.removeItem(elmt);            
            PriceTotal();
        }else{
            localStorage.removeItem(elmt);            
            $('.shopping-cart').append($('<span></span>').attr('class','count').text(listLocalStorage()));
            PriceTotal();
        }
        PriceTotal();
    }
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


function PriceTotal() {
    var items = Object.keys(localStorage);    
    $.getJSON('./data/products.json',function(result){
        var results = incrSortByName(getSortByName(items,result));
        var sumTotal =0;
        $.each(results,function(i,res) {
            sumTotal += res.price * parseInt(localStorage.getItem(res.name)).toFixed(2);
        });
        $('.shopping-cart-total strong').text(sumTotal.toFixed(2) + '$');
    });
}

function partialTotal(name,el) {
    $.getJSON('./data/products.json',function(result){
        var resultat = result.find(function(field){
            return field.name == name;
        })
        el.text((resultat.price* localStorage.getItem(resultat.name)).toFixed(2)+'$');
    });

}