'use strict';

// jQueryを使う時のお約束
$(document).ready(() => {

  // 「住所を検索」ボタンを押したときにイベントが発火
  $('#zipSearch').on('click', () => {
    // 入力された郵便番号を変数に格納
    const zipCode = $('#zipCode').val();

    // 入力された値が郵便番号ではなかった場合にエラーを表示させて処理を中断する
    if (!zipCode.match(/^\d{3}-?\d{4}$/)) {
      if ($('.errMsg')[0]) {
        $('.errMsg').remove();
      }
      $('.searchField').append('<p class="errMsg" style="color:#ff0000; background-color:#ffcccc; width:50%; margin:0 auto">入力欄には7桁の半角数字を入力してください。<br>（ハイフンの有無は動作に影響しません）</p>');
      return false;
    }
    // APIの実行に必要な情報を変数に格納
    const apiKey = 'dj00aiZpPUJsQ3ZlMHoxU0pKViZzPWNvbnN1bWVyc2VjcmV0Jng9ZWE-';
    const url = `https://map.yahooapis.jp/search/zip/V1/zipCodeSearch?query=${zipCode}&appid=${apiKey}&output=json`;

    // APIを実行
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'jsonp'
    }).done((resp) => {
      if (resp.Feature) {
        if ($('.errMsg')[0]) {
          $('.errMsg').remove();
        }
        // レスポンスデータから住所、緯度経度、最寄りの駅を抽出・成形
        const addressData = resp.Feature[0].Property;
        const geometryData = resp.Feature[0].Geometry.Coordinates.split(',');
        const stationData = addressData.Station;
        let nearStations = "";

        // 最寄り駅を1行に連結
        for (let i = 0; i < stationData.length; i++) {
          const nearStation = `${stationData[i].Name}(${stationData[i].Railway}),`;
          nearStations += nearStation;
        };

        // 表に書き込む
        $('.addressTable').find('td')[0].textContent = addressData.Address;
        $('.addressTable').find('td')[1].textContent = geometryData[0];
        $('.addressTable').find('td')[2].textContent = geometryData[1];
        $('.addressTable').find('td')[3].textContent = nearStations.slice(0, -1);
      } else {
        if ($('.errMsg')[0]) {
          $('.errMsg').remove();
        }
        $('.searchField').append('<p class="errMsg" style="color:#ff0000; background-color:#ffcccc; width:50%; margin:0 auto">入力された郵便番号は存在しません。<br>もう一度確認して再入力してください。</p>');
      }
    }).fail((err) => {
      console.log(err);
      if ($('.errMsg')[0]) {
        $('.errMsg').remove();
      }
      $('.searchField').append('<p class="errMsg" style="color:#ff0000; background-color:#ffcccc; width:50%; margin:0 auto">検索システムが動作していません。<br>管理者にお問い合わせください。</p>');
    });
  });
});