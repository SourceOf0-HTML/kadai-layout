
/* global $ */

function ajaxSearch(keyword, num) {
  $.ajax({
    url: 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
    type: 'GET',
    cache: false,
    dataType: 'json',
    timeout: 5000,
    data: {
      applicationId: '1034703502895606418',
      keyword: keyword,
      imageFlag: 1,
      hits: num,
    }
  }).done(function(data, status) {
    if (status === 'success') {
      _getItems(data);
    }
  });
}

function _getItems(data) {
  console.log(data);
  
  var $list = $('#main .row');
  var dataStat = data.count;
  
  $list.empty();
  
  if (dataStat > 0) {
    $.each(data.Items, function(i, items) {
      var item = items.Item;
      var affiliateUrl = item.affiliateUrl;
      var imageUrl = item.mediumImageUrls[0].imageUrl;
      var itemName = item.itemName;
      var itemTitle = itemName;
      
      var htmlTemplate = $(
        '<li class="col-lg-6"><a href="' + affiliateUrl + '" alt="' + itemTitle + '">' +
          '<h3><strong>' + itemTitle + '</strong></h3>' +
          '<div class="clearfix">' +
            '<img src="' + imageUrl + '" alt="' + itemTitle + '">' +
            '<p>' + itemName + '</p>' +
          '</div>' +
        '</a></li>'
      );
      
      //テンプレートを追加
      $list.append(htmlTemplate);
      
    });//each
  }
}

$(function() {
  ajaxSearch("猫", 4);
});
