$(document).ready(function(){
     init(1);

     if(listLocalStorage()!=0) {
        $('.shopping-cart').append( $('<span></span>').attr('class','count').text(listLocalStorage()));                
    }

     $('#basHaut').click(function() {
        init(1);
        changeColor($(this),'product-criteria');
    });

     $('#hautBas').click(function() {
         init(2);
         //$('#product-criteria button').css({"background-color": "#fff"});         
         //$(this).css({ "background-color": "#ddf2fb"});
         changeColor($(this),'product-criteria');         
     });

     $('#nomAZ').click(function(){
         init(3);
         changeColor($(this),'product-criteria');         
     });
     
     $('#nomZA').click(function(){
        init(4);
        changeColor($(this),'product-criteria');        
    });

    $('#cameras').click(function(){
        init(5);
        changeColor($(this),'product-categories');        
    });

    $('#consoles').click(function(){
        init(6);
        changeColor($(this),'product-categories');        
    });
    $('#screens').click(function(){
        init(7);       
        changeColor($(this),'product-categories');        
        
    });
    $('#computers').click(function(){
        init(8);
        changeColor($(this),'product-categories');        
    });

    $('#allProducts').click(function(){
        init(1);        
        changeColor($(this),'product-categories');        
    });
    
});

function incrSortByPrice(jsonStr) {
   var _sorted = jsonStr.sort(function(a,b) {
       return a.price - b.price;
   });
   return _sorted;
}

function changeColor(el,grpType) {
    if(String(grpType)=='product-criteria') {
        $('#product-criteria button').css({"background-color": "#fff"});                 
    }
    if(String(grpType)=='product-categories') {
        $('#product-categories button').css({"background-color": "#fff"});                         
    }
    el.css({ "background-color": "#ddf2fb"}); 
}

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

 function sortByTheme(category,res) {
    var resultat=res.filter(function(a){
        console.log(String(a.category.toLowerCase())==String(category));
        return String(a.category.toLowerCase())==String(category);
    });
    return resultat;          
 }

function init(direction) {
    $.getJSON('./data/products.json',function(result) {

        $('#products-list').empty();        
        switch(direction) {
            case 1:
                incrSortByPrice(result);
                break;
            case 2:
                incrSortByPrice(result).reverse();
                console.log(result);
                break;
            case 3:
                incrSortByName(result);
                console.log(result);                
                break;
            case 4:
                incrSortByName(result).reverse();
                console.log(result);                
                break;
            case 5:
                result=sortByTheme('cameras',result);
                console.log(result);
                break;
            case 6:
                result=sortByTheme('consoles',result);
                console.log(result);
                break;
            case 7:
                result=sortByTheme('screens',result);
                console.log(result);
                break;
            case 8:
                result=sortByTheme('computers',result);
                console.log(result);
                break;
            case 9:
                result=sortByTheme('computers',result);
                console.log(result);
                break;
            default:
                incrSortByPrice(result)
        } 

        $('#products-count').text(result.length + ' produits');
        
        $.each(result,function(i,field) {
            var _a = $('<a></a>');
            _a.attr('href','./product.html?id='+ field.id);
            _a.attr('title','En savoir plus...');

            var _h2 = $('<h2></h2>').text(field.name);

            var _img = $('<img></img>').attr('alt',field.name);
            _img = _img.attr('src','./assets/img/'+ field.image);

            var _small = $('<small></small>').text('Prix : ');

            var _p = $('<p></p>').text(field.price + '$');
            _p.prepend(_small);

            _a.append(_h2);
            _a.append(_img);
            _a.append(_p);

            var _div = $('<div></div>').attr('class','product');
            _div.append(_a);
            $('#products-list').append(_div);
        });
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



