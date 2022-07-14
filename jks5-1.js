//csvファイル取得・表示
let fileInput = document.getElementById('csv_file');
let message = document.getElementById('message');
let fileReader = new FileReader();

// ファイル変更時イベント
fileInput.onchange = () => {
  message.innerHTML = "読み込み中..."

  let file = fileInput.files[0];
  fileReader.readAsText(file, "utf-8");
};

// ファイル読み込み時
let items = [];
fileReader.onload = () => {
  // ファイル読み込み
  let fileResult = fileReader.result.split('\r\n');
  // 先頭行をヘッダとして格納
  let h = fileResult[0].replace(/"|'/g,"");
  let head =h.split(",");
  head.unshift("データ番号");
  // 先頭行の削除
  fileResult.shift();
  

  // CSVから情報を取得
  let count=1;
  items = fileResult.map(
    item => {
    let database = item.replace(/"|'/g,'');
    let datas = database.split(",");
    let result = [];
    for (const index in head) {
      result[index] = datas[index-1];
    }
    result[0]=count;
    count+=1
    return result;
  });

  // テーブル初期化
  let tbody = document.querySelector('#output_csv');
  tbody.innerHTML = "";

  //　CSVの内容を表示

  let header = '';
  header += '<tr>';
  let tag="";
  tag+="<div id='tags'>";
  let tagid=0;
  head.forEach((element) => {
      header += `<td id=${tagid}>${element}</td>`
      tag+=`<input type="checkbox" id="${tagid}" checked>${element}</input>`
      tagid+=1;
    });
  header += '</tr>';
  tag+="</div>";

  let insertElement="";
  items.forEach((element) => {
  insertElement += '<tr>'
    let itemid=0;
    element.forEach((childElement) => {
    insertElement += `<td id="${itemid}">${childElement}</td>`
    itemid+=1;
    });
  insertElement += '</tr>';
  });

  tbody.innerHTML = insertElement;

  document.getElementById("get_tag").innerHTML=tag;
  document.getElementById("header").innerHTML=header;
  message.innerHTML = items.length + "件のデータを読み込みました。"
}

// ファイル読み取り失敗時
fileReader.onerror = () => {
  items = [];
  message.innerHTML = "ファイル読み取りに失敗しました。"
}

function valueChange(){
  for (i=0; i<header.length;i++){
    document.getElementById(i)
  }
}

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


  selectmode=function(){
    let elements=document.getElementsByName("mode");
    len=elements.length;
    let checkValue = '';
  for (let i = 0; i < len; i++){
      if (elements.item(i).checked){
          checkValue = elements.item(i).value;
      }
    }
    console.log(checkValue)
  if(checkValue=="sort"){
  let searchText=$("#search-text").val();
  var    targetText;
  let    rank=[];
  let    number=0;
  for (i=0;i<items.length;i++){
    targetText=items[i].join(" ")
    items[i][-1]=levenshteinDistance(searchText,targetText);
  }
  items.sort((a,b)=>{
    return a[-1]-b[-1]
  })
  console.log(items);

// テーブル初期化
let tbody = document.querySelector('#output_csv');
tbody.innerHTML = "";

  let insertElement="";
  items.forEach((element) => {
  insertElement += '<tr>'
    let itemid=0;
    element.forEach((childElement) => {
    insertElement += `<td id="${itemid}">${childElement}</td>`
    itemid+=1;
    });
  insertElement += '</tr>';
  });

  tbody.innerHTML = insertElement;
  }else if(checkValue=="word"){
    alert("非対応です")
  }else if(checkValue=="part"){
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
  }
  };
$("#search-text").on("input",selectmode);