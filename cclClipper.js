//Add click events to all of the buttons
function loadClickEvents(){
    
    //Add the click events to the buttons
    $("#ccl_clip").click(function(){
        createClippedString();
        
        //Highlight the clipped string
        var outputElem = $("#cclParsedString")[0];
        var txtLen = outputElem.value.length;
        outputElem.selectionStart = 0;
        outputElem.selectionEnd = txtLen;    
    });
    $("#json_search").click(function(){
        jsonSearch();
    });
    
    $("#ccl_input").focus();
    
}


function createClippedString(){
    var inputArray = [];
    var sourceString = "";
    var arrCnt = 0
    ,tempCnt = 0
    ,tempStr = ""
    ,sliceStr = "";
    
    //Get the content in the ccl_input
    sourceString = $("#ccl_input").val();
    inputArray[0] = sourceString;
    arrCnt = inputArray.length;
    
    for(var i = 0; i < arrCnt; i++){
        tempCnt = inputArray[i].length;
        if(tempCnt > 128){
            tempStr = inputArray[i];
            inputArray[i] = tempStr.slice(0,128);
            sliceStr = tempStr.slice(128,tempCnt);
            inputArray.splice(i+1, 0, sliceStr);
            arrCnt = arrCnt + 1;
        }
    
    }
    
    //copy the param string into the cclParsedString
    var checkbox = $("#putSlash").is(':checked');
    if(checkbox == true)
        $("#cclParsedString").val(inputArray.join("\\\n"));
    else
        $("#cclParsedString").val(inputArray.join("\n"));
}

setTimeout(loadClickEvents, 100);