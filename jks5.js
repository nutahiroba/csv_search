

//検索システムの部分
$(function () {
  //完全一致モード
  searchWord = function(){
    var searchText = $(this).val(), // 検索ボックスに入力された値
        targetText;

    $('.target-area tr').each(function() {
      targetText = $(this).text();

      // 検索対象となるリストに入力された文字列が存在するかどうかを判断
      if (targetText.indexOf(searchText) > -1) {
        $(this).removeClass('hidden');
      } else {
        $(this).addClass('hidden');
      }
    });
  };

  //ソートモード

  //レーベルシュたいん距離
levenshteinDistance = function(str1, str2) {
  let r, c, cost,
      d = [];
 
  for (r=0; r<=str1.length; r++) {
    d[r] = [r];
  }
  for (c=0; c<=str2.length; c++) {
    d[0][c] = c;
  }
  for (r=1; r<=str1.length; r++) {
    for (c=1; c<=str2.length; c++) {
      //一文字目の文字コードと二文字目の文字コードが一致ならばtrue?
      cost = str1.charCodeAt(r-1) == str2.charCodeAt(c-1) ? 0: 1;
      d[r][c] = Math.min(d[r-1][c]+1, d[r][c-1]+1, d[r-1][c-1]+cost);
    }
  }
  return d[str1.length][str2.length];
}

  sortWord=function(){
    let searchText=$(this).val();
    var    targetText;
    let    rank=[];
    let    number=0;
    $('.target-area tr').each(function(){
      targetText=$(this).text();
      //ここから計算式
      rank[number]=[number+1];
      rank[number][0]=levenshteinDistance(searchText,targetText);
      number+=1;
    })
  };

  //単語で判断モード
  selecttd=function(){
    $('.tablepart td').each(function(){
      targettd=$(this);
      console.log(targettd);
    })
  };

  // searchWordの実行
  //$('#search-text').on('input', searchWord);
//  $('#search-text').on('input',sortWord);
//  $('document').on('change',"#tags input",function(){
//    console.log("yes");
//});
});

