function getJSON(handleData) {
  // $.get("https://api.myjson.com/bins/l8bkb", function(data, textStatus, jqXHR) {
  //   $("#test")[0].innerHTML = JSON.stringify(data);
  // });

  $.ajax({
    url:"https://api.myjson.com/bins/l8bkb",
    type:"GET",
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    success: function(data, textStatus, jqXHR){
      handleData(data);
    }
  });
}

function putJSON(jsonData) {
  $.ajax({
    url:"https://api.myjson.com/bins/l8bkb",
    type:"PUT",
    data: jsonData,
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    success: function(data, textStatus, jqXHR){
    }
  });
}

function createGroup() {
  getJSON(function(jsonData) {
    //var data = JSON.stringify(jsonData);
  
    var newgroup = {
      name : $("#group-name")[0].value,
      type :  $("#places-type")[0].value,
      description : $("#group-description")[0].value
    }

    jsonData.groups.push(newgroup);
    $("#test")[0].innerHTML = JSON.stringify(jsonData);
    putJSON(JSON.stringify(jsonData));
  });
}

// --- Adds groups as items in #manage-groups#selectgroup
function getGroups() {
	getJSON(function(jsonData) {
		var groups = jsonData.groups;
		var list = $("#select-group");
    while (list[0].firstChild) {
      list[0].removeChild(list[0].firstChild);
    }
		for(var i = 0; i < groups.length; i++) {
      list.append('<option value="' + groups[i].name + '">' + groups[i].name + "</option>");
      
		}
		
	});
}

function showGroup() {

}

function joinGroup() {

}