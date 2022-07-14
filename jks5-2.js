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
  let header = fileResult[0].split(',')
  // 先頭行の削除
  fileResult.shift();
  document.getElementById('header').innerHTML= header;

  // CSVから情報を取得
  convertArray(fileResult);

  message.innerHTML = items.length + "件のデータを読み込みました。"
}

function convertArray(data) {
  const dataArray = [];
  dataText = data.replace(/"/g,"");
  const dataString = dataText.split('\n');
  for (let i = 0; i < dataString.length; i++) {
    dataArray[i] = dataString[i].split(',');
    }
    let insertElement = '';
    dataArray.forEach((element) => {
    insertElement += '<tr>';
      element.forEach((childElement) => {
      insertElement += `<td>${childElement}</td>`
      });
    insertElement += '</tr>';
    });
  document.getElementById('output_csv').innerHTML = insertElement;
  document.getElementById('name').innerHTML=dataArray[1][1];
  document.getElementById('number').innerHTML=dataArray[1][0];
  }

// ファイル読み取り失敗時
fileReader.onerror = () => {
  items = [];
  message.innerHTML = "ファイル読み取りに失敗しました。"
}