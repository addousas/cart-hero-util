function getAjax(url, success) {
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
      if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send();
  return xhr;
}

function postAjax(url, data, success) {
  var params = typeof data == 'string' ? data : Object.keys(data).map(
          function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
      ).join('&');

  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  xhr.open('POST', url);
  xhr.onreadystatechange = function() {
      if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);
  return xhr;
}

function getMouseXY (e) {
  var tempY = 0;
  var tempX = 0;

  if (window.IE) {
    // grab the x-y pos.s if browser is IE
    tempX = event.clientX + document.body.scrollLeft
    tempY = event.clientY + document.body.scrollTop
  } else {
    // grab the x-y pos.s if browser is NS
    tempX = e.pageX
    tempY = e.pageY
  }
  // catch possible negative values in NS4
  if (tempX < 0) {
    tempX = 0
  }
  if (tempY < 0) {
    tempY = 0
  }
  // show the position values in the form named Show
  // in the text fields named MouseX and MouseY
  window.tempX = tempX
  window.tempY = tempY
  return true
}

  
function pushCartContent(){
  console.log('MY_APP pushCartContent')
  
//    window.appLayer.cartContent.items.forEach(
//     function(item){
//        
//        var xhttp = new XMLHttpRequest()
//        var itemStr = JSON.stringify(item)
//        alert('pushCartContent: ' + itemStr)
//        console.log('MY_APP ' + itemStr)
//        xhttp.open('POST', 'http://www.litlife.io/products?hello='+ itemStr);
//       xhttp.send()

//      })

}

function checkCart (e) {
  console.log('MY_APP checkCart 1')
  getMouseXY(e)

  setTimeout(function () { 
    getAjax('/cart.js', function(data){ 
      console.log( 'testing: '+ data);
      var cartContent = JSON.parse(data)
      window.appLayer.cartContent = cartContent

      if (window.appLayer.cart_items_count != cartContent.item_count){
        console.log('MY_APP Change in cart' + window.appLayer.cart_items_count + '!=' + cartContent.item_count)
        window.appLayer.cart_items_count = cartContent.item_count
        // push content
        pushCartContent()
      }

    });
  }, 1000)
}
