'use strict';

// jQueryを使う時のお約束
$(document).ready(() => {
  // 各変数宣言

  // 「住所を検索」ボタンを押したときにイベントが発火
  $('#zipSearch').on('click', () => {
    // 入力された郵便番号を変数に格納
    var zipCode = $('#zipCode').val();
    console.log(zipCode);

    // apiを叩き住所を取得する
    var apiKey = 'dj00aiZpPUJsQ3ZlMHoxU0pKViZzPWNvbnN1bWVyc2VjcmV0Jng9ZWE-';

    var url = 'https://map.yahooapis.jp/search/zip/V1/zipCodeSearch?query=' + zipCode + '&appid=' + apiKey + '&o=json&callback=showResult';

    console.log(url);

    // function callJSONP(url){
    //   var target = document.createElement('script');
    //   target.charset = 'utf-8';
    //   target.src = url;
    //   document.body.appendChild(target);
    // };
    // var results = callJSONP(url);

    // function showResult( result ) {
    //   if ( result.Count > 0 ) {
    //     alert( result.Count + "件の結果が見つかりました。\n" +
    //           result.Item[0].Title + "の住所は" + result.Item[0].Address + "です。" );
    //   } else {
    //     alert( "検索結果が見つかりませんでした。" );
    //   }
    // }

    // console.log(results);

    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'jsonp'
    }).done((resp) => {
      console.log(resp);
    }).fail((err) => {
      console.log(err);
    });

    // 表に書き込む
    $('.addressTable').find('td')[0].textContent = '○○県○○市';   
    $('.addressTable').find('td')[1].textContent = 'keido';
    $('.addressTable').find('td')[2].textContent = 'ido';
    $('.addressTable').find('td')[3].textContent = '○○駅'
  });



});



