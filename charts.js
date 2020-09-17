function loadCharts(){
  var base = document.getElementById("base").value 
  var compare = document.getElementById("compare").value
  var start_at = document.getElementById("start_at").value
  var end_at = document.getElementById("end_at").value
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200)
    {
      var mapParams = getMapParams(this.response);
      Plotly.newPlot('bar', mapParams.data, mapParams.layout); 
    }
  };
  xhttp.open("GET", "/currency/"+base+"/"+compare+"/"+start_at+"/"+end_at);
  xhttp.send();

  var xhttpUSD = new XMLHttpRequest();
  xhttpUSD.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200)
    {
      var mapParams = getMapParams2(this.response);
      Plotly.newPlot('charts', mapParams.data, mapParams.layout); 
    }
  };
  xhttpUSD.open("GET", "/usd");
  xhttpUSD.send(); 
}

function reload(){
  var base = document.getElementById("base").value 
  var compare = document.getElementById("compare").value
  var start_at = document.getElementById("start_at").value
  var end_at = document.getElementById("end_at").value
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200)
    {
      var mapParams = getMapParams(this.response);
      Plotly.newPlot('bar', mapParams.data, mapParams.layout); 
    }
  };
  xhttp.open("GET", "/currency/"+base+"/"+compare+"/"+start_at+"/"+end_at);
  xhttp.send();
}

function setupGraph(master){
  var arr_dates = Object.keys(master[0]);
  var arr_values = master[1];
  console.log(Object.keys(master[0]))
  console.log(arr_values)
  for (var i = arr_dates.length-1; i>=0; i--){
    for (var j= 1; j<=1; j++) {
      if (arr_dates[j-1]>arr_dates[j]) {
        var storing_data = arr_dates[j-1];
        arr_dates[j-1] = arr_dates[j];
        arr_dates[j] = storing_data;
        var storing_next_data = arr_values[j-1];
        arr_values[j-1] = arr_values[j];
        arr_values[j] = storing_next_data;
      }
    }
  }

  var data = [{
    type:'scatter',
    mode:'markers',
    x : arr_dates,
    y : arr_values,
  }];

  return data;
}

function setupGraph2(master){
  var arr_currency = Object.keys(master);
  var arr_values = Object.values(master);

  var data = [{
    type:"pie",
    values : arr_values,
    labels : arr_currency,
  }];

  return data;
}

function setupLayout(){
  var layout = {
    height : 400,
    width : 400
  };
}

function getMapParams(master){
  var ver = JSON.parse(master);
  var retVal ={
    data:setupGraph(ver),
    layout:setupLayout()
  };
  return retVal;
}

function getMapParams2(master){
  var ver = JSON.parse(master);
  var retVal ={
    data:setupGraph2(ver),
    layout:setupLayout()
  };
  return retVal;
}

