function jsonSearch(){
    var jsonString = $("#ccl_input").val();
    var json = null;
    var searchString = $("#search_string").val().toUpperCase();
    var resultArr = [], returnVal;
    
    try{
        json = (jsonString === "")? null: JSON.parse(jsonString.toUpperCase());
    }
    catch(e){
        $("#cclParsedString").val(e.message);
        return;
    }
    if(json && searchString !== ""){
        var option = parseInt($('input[name="group1"]:checked').val());
        switch(option){
            case 0:
                returnVal = getValues(json, searchString);
                break;
            
            case 1:
                returnVal = getKeys(json, searchString);
                break;
        }
        
         
        var finalResult = (returnVal.length > 0)? returnVal.join("\n"): "No matches found";
        $("#cclParsedString").val(finalResult);
    }
    else{
        $("#cclParsedString").val("Input not valid");
    }
    
}


function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));    
        } else 
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}
 
//return an array of values that match on a certain key
function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}
 
//return an array of keys that match on a certain value
function getKeys(obj, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getKeys(obj[i], val));
        } else if (obj[i] == val) {
            objects.push(i);
        }
    }
    return objects;
}