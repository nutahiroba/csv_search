function getCSV(){
  var data=new XMLHttoRequest();
  data.open("get","seiseki.csv",true);
  data.send(null);

  data.onload=function(){
    convertCSVtoArray(data.responseText);
  }
}

function convertCSVtoArray(str){
  var result=[];
  var tmp=str.split("\n");

  for (var i=0;i<tmp.length;++i){
    result[i]=tmp[i].split(",");
  }
  alert(result[1][2]);
}
getCSV();