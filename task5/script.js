'use strict';

// jQueryを使う時のお約束
$(document).ready(() => {

  // 「住所を検索」ボタンを押したときにイベントが発火
  $('#zipSearch').on('click', () => {
    // 入力された郵便番号を変数に格納
    var zipCode = $('#zipCode').val();

    // APIの実行に必要な情報を変数に格納
    var apiKey = 'dj00aiZpPUJsQ3ZlMHoxU0pKViZzPWNvbnN1bWVyc2VjcmV0Jng9ZWE-';
    var url = 'https://map.yahooapis.jp/search/zip/V1/zipCodeSearch?query=' + zipCode + '&appid=' + apiKey + '&output=json';
    
    // APIを実行
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'jsonp'
    }).done((resp) => {
      // レスポンスデータから住所、緯度経度、最寄りの駅を抽出・成形
      var addressData = resp.Feature[0].Property;
      var geometryData = resp.Feature[0].Geometry.Coordinates.split(',');
      var stationData = addressData.Station;
      var nearStations = new String();

      for (var i = 0; i < stationData.length; i++) {
        var nearStation = stationData[i].Name + '(' + stationData[i].Railway + '),';
        nearStations += nearStation;
      };

      // 表に書き込む
      $('.addressTable').find('td')[0].textContent = addressData.Address;   
      $('.addressTable').find('td')[1].textContent = geometryData[0];
      $('.addressTable').find('td')[2].textContent = geometryData[1];
      $('.addressTable').find('td')[3].textContent = nearStations.slice(0, -1);
    }).fail((err) => {
      console.log(err);
    });
  });
});



