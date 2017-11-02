$(document).ready(function(){

    init();
    PriceTotal();

    if(listLocalStorage()==0) {
        $('.shopping-cart .count').hide();               
    }else{
        $('.shopping-cart .count').text(listLocalStorage()) 
    }

    $(document).on('click','.remove-item-button',function(){
        deleteItem($(this));
        
    });

    $(document).on('click','.remove-quantity-button',function(){
        var el = $(this).parent().next();
        var nom=el.parent().parent().prev().prev().children().eq(0).text();
        var part =el.parent().parent().prev().prev().children().eq(0).text();        
        if(parseInt(el.text()) ==2){
            el.text(String(parseInt(el.text()) -1));
            localStorage.setItem(nom,el.text());                       
            $(this).attr('disabled','');
        } else{
            el.text(String(parseInt(el.text()) -1)); 
            localStorage.setItem(nom,el.text());            
        } 
        partialTotal(part,el.parent().parent().next());
        PriceTotal();
        $('.count').text(listLocalStorage());
        //
    });

    $(document).on('click','.add-quantity-button',function(){
        var el = $(this).parent().prev();
        el.text(String(parseInt($(this).parent().prev().text()) +1));
        $('.remove-quantity-button').removeAttr('disabled');
        var nom=el.parent().parent().prev().prev().children().eq(0).text();
        localStorage.setItem(nom,el.text());
        $('.count').text(listLocalStorage());
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
            $('.count').hide();
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
                _tr.append($('<td><button class="remove-item-button" title="Supprimer"><i class="fa fa-times"></i></button></td>'));
                _tr.append($('<td></td>').append($('<a></a>').attr('href','./product.html?id='+ res.id).text(res.name)));
                _tr.append($('<td></td>').append(String(res.price).replace('.',',') + '&thinsp;$'));
                var _td4 = $('<td></td>');
                var _div = $('<div></div>').attr('class','row');
                if(localStorage.getItem(res.name) == 1) {
                    _div.append($('<div class="col"><button class="remove-quantity-button" title="Retirer" disabled=""><i class="fa fa-minus"></i></button></div>'));                    
                }else{
                    _div.append($('<div class="col"><button class="remove-quantity-button" title="Retirer"><i class="fa fa-minus"></i></button></div>'));                    
                }
                _div.append($('<div class ="quantity"></div>').text(String(localStorage.getItem(res.name))));
                _div.append($('<div class="col"><button class="add-quantity-button" title="Ajouter"><i class="fa fa-plus"></i></button></div>'));
                _td4.append(_div);
                _tr.append(_td4);
                _tr.append($('<td class="price"></td>').append(String((res.price * parseInt(localStorage.getItem(res.name))).toFixed(2)).replace('.',',') + '&thinsp;$'));
                $('tbody').append(_tr);
    
                sumTotal += res.price * parseInt(localStorage.getItem(res.name)).toFixed(2);
                
            });
    
            $('#total-amount').text(String(sumTotal.toFixed(2)).replace('.',',') + '$');
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
        var elmt = el.parent().next().children().eq(0).text();
        if(localStorage.length == 1) {
            $('article').empty().append('<h1>Panier</h1>');
            $('article').append($('<p></p>').text('Aucun produit dans le panier.'));
            $('.count').remove();
            localStorage.removeItem(elmt);            
        }else{
            localStorage.removeItem(elmt);
            el.parent().parent().remove();              
            $('.count').text(listLocalStorage());
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
        $('#total-amount').text(String(sumTotal.toFixed(2)).replace('.',',') + '$');
    });
}

function partialTotal(name,el) {
    $.getJSON('./data/products.json',function(result){
        var resultat = result.find(function(field){
            return field.name == name;
        })
        el.text(String((resultat.price* localStorage.getItem(resultat.name)).toFixed(2)).replace('.',',')+'$');
    });

}