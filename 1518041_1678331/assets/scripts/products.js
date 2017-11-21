
$(document).ready(function(){


    if(listLocalStorage()==0) {
        $('.shopping-cart .count').hide();               
    }else{
        $('.shopping-cart .count').text(listLocalStorage()) 
    }
     
     var nature=0;
     var direction=0;

     init(nature,direction);

     $('#basHaut').click(function() {
         direction = 1;
        init(nature,direction);
        changeColor($(this),'product-criteria');
    });

     $('#hautBas').click(function() {
        direction = 2;
        init(nature,direction);
        changeColor($(this),'product-criteria');         
     });

     $('#nomAZ').click(function(){
        direction = 3;
        init(nature,direction);
        changeColor($(this),'product-criteria');         
     });
     
     $('#nomZA').click(function(){
        direction = 4;
        init(nature,direction);
        changeColor($(this),'product-criteria');        
    });

    $('#cameras').click(function(){
        nature = 1;
        init(nature,direction);
        changeColor($(this),'product-categories');        
    });

    $('#consoles').click(function(){
        nature = 2;
        init(nature,direction);
        changeColor($(this),'product-categories');        
    });
    $('#screens').click(function(){
        nature = 3;
        init(nature,direction);
        changeColor($(this),'product-categories');        
        
    });
    $('#computers').click(function(){
        nature = 4;
        init(nature,direction);
        changeColor($(this),'product-categories');        
    });

    $('#allProducts').click(function(){
        nature=0;
        direction=0;
        init(nature,direction);
        changeColor($(this),'product-categories');        
    });
    
});



function changeColor(el,grpType) {
    if(String(grpType)=='product-criteria') {
        $('#product-criteria button').css({"background-color": "#fff"});                 
    }
    if(String(grpType)=='product-categories') {
        $('#product-categories button').css({"background-color": "#fff"});                         
    }
    el.css({ "background-color": "#ddf2fb"}); 
}



function init(nature,direction) {
    
    $.getJSON('./data/products.json',function(result) {

        $('#products-list').empty();        
        switch(nature) {
            case 0:
                incrSortByPrice(result);
                break;
            case 1:
                result=sortByTheme('cameras',result);
                break;
            case 2:
                result=sortByTheme('consoles',result);
                break;
            case 3:
                result=sortByTheme('screens',result);
                break;
            case 4:
                result=sortByTheme('computers',result);
                break;
            default:
                incrSortByPrice(result)
        } 

        switch(direction ){
            case 0:
                incrSortByPrice(result);
                break;
            case 1:
                incrSortByPrice(result);
                break;
            case 2:
                incrSortByPrice(result).reverse();
                break;
            case 3:
                incrSortByName(result);
                break;
            case 4:
                incrSortByName(result).reverse();
                break;
            default:
                incrSortByPrice(result)
        }

        updateView(result);
    });
 }

 function updateView(result) {
    $('#products-count').text(result.length + ' produits');
    
    $.each(result,function(i,field) {
        var _a = $('<a></a>');
        _a.attr('href','./product.html?id='+ field.id);
        _a.attr('title','En savoir plus...');

        var _h2 = $('<h2></h2>').text(field.name);

        var _img = $('<img></img>').attr('alt',field.name);
        _img = _img.attr('src','./assets/img/'+ field.image);

        var _small = $('<small></small>').text('Prix : ');

        var _p = $('<p></p>').text(String(field.price).replace('.',',') + '$');
        _p.prepend(_small);

        _a.append(_h2);
        _a.append(_img);
        _a.append(_p);

        var _div = $('<div></div>').attr('class','product');
        _div.append(_a);
        $('#products-list').append(_div);
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

 function incrSortByPrice(jsonStr) {
    var _sorted = jsonStr.sort(function(a,b) {
        return a.price - b.price;
    });
    return _sorted;
 }



