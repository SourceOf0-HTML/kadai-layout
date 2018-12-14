
/* global $ */

function ajaxSearch() {
  $.ajax({
    url: 'http://rss.rssad.jp/rss/ascii/rss.xml',
    type: 'GET',
    cache: false,
    dataType: 'xml',
    timeout: 5000,
  }).done(function(res, status) {
    console.log(status);
    if (status === 'success') {
      _getItems(res);
    }
  });
}

function _getItems(res) {
  console.log(res);
  
  var $list = $('#main .row');
  var $data = $($.parseXML(res.results[0]));
  var data = [];
  var row = 0;
  var nodeName;
  
  $list.empty();

  $data.find('item').each(function() {
    data[row] = {};
    $(this).children().each(function() { // 子要素を取得
      nodeName = $(this)[0].nodeName; // 要素名
      data[row][nodeName] = {}; // 初期化
      attributes = $(this)[0].attributes; // 属性を取得
      for (var i in attributes) {
        data[row][nodeName][attributes[i].name] = attributes[i].value; // 属性名 = 値
      }
      data[row][nodeName]['text'] = $(this).text();
    });
    row++;
  });
  
  data.forEach(function(item) {
    var affiliateUrl = item.link.text;
    var imageUrl = item.description.text.match(/src="(.+?)"/)[1].replace(/http:/, "https:");
    var itemName = item.title.text;
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
    
  });
}

$(function() {
  ajaxSearch();
});
