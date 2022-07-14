
//csvファイルの読み込み
function getCSV(){
  var data=new XMLHttpRequest();
  data.addEventListener('load',(event)=>{
    var response=event.target.responseText;
    convertArray(response);
    });
    data.open("get","seiseki.csv",true);
    data.send(null);
  }
      
      //データの組み換え
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
getCSV();