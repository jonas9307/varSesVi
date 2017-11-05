function getJSON(handleData) {
  // $.get("https://api.myjson.com/bins/l8bkb", function(data, textStatus, jqXHR) {
  //   $("#test")[0].innerHTML = JSON.stringify(data);
  // });

  $.ajax({
    async: false,
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
    async: false,
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
      name : $("#group-name").val(),
      type :  $("#places-type").val(),
      description : $("#group-description").val()
    }

    jsonData.groups.push(newgroup);
    $("#test")[0].innerHTML = JSON.stringify(jsonData);
    putJSON(JSON.stringify(jsonData));
  });

  var selected = $("#group-name").val();
  
  $("#group-name").val("");
  $("#group-description").val("");
  $("#create-group").hide();
  $("#manage-groups").show();
  $("#default-open").removeClass("active");
  $("#manage-group-tab").addClass("active");

  getGroups(selected);
  

}

// --- Adds groups as items in #manage-groups#selectgroup
function getGroups(selected) {
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
  
  if(typeof selected !== "undefined")
    $("#select-group").val(selected);
  showGroup();
}

function showGroup() {
  getJSON(function(jsonData) {
    var groups = jsonData.groups;
    groups.forEach(function (obj) {
      var name = obj["name"];
      var text = $("#select-group").val();
      if(name === text) {
        $("#manage-groups-info").empty();
        // Name
        // $("#manage-groups-info").append("<h5>Namn</h5>" + JSON.stringify(obj.name).replace(/\"/g, ""));
        // Type
        $("#manage-groups-info").append("<h5>Typ</h5>" + JSON.stringify(obj.type).replace(/\"/g, ""));
        // Description
        $("#manage-groups-info").append("<h5>Beskrivning</h5>" + JSON.stringify(obj.description).replace(/\"/g, ""));
        // Members
        if("members" in obj)
          $("#manage-groups-info").append(function() {
            var returnValue = "<h5>Medlemmar</h5>";
            obj.members.forEach(function(member){
              returnValue += JSON.stringify(member).replace(/\"/g, "") + "<br>"
            });
            return returnValue;
          });
      }
    });
	});
}

function joinGroup() {
  getJSON(function(jsonData) {
    var groupName = $("#select-group").val();
    var member = $("#add-member").val();

    jsonData.groups.forEach(function (group) {
      if(groupName === group["name"]) {
      
      if("members" in group)
        group.members.push(member);
      else
        group.members = [member];
      }
    });

    putJSON(JSON.stringify(jsonData));
    $("#add-member").val("");
  });
}


function test() {
  $("#select-group").val("Hahaha").change();
}