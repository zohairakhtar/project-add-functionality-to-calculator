(function(){
  var makeElements = function(element){
    if(element.charAt(0) == "#"){
      return document.querySelector(element);
    }
    return document.querySelectorAll(element);
  }
  // Let's define our variables
  var viewer = makeElements("#screen1");
  var equals = makeElements("#equal");
  var oldNum;
  var currentNum = 0;
  var resultNum;
  var operator;
  var allNumbers = makeElements(".num");
  var allOperators = makeElements(".ops");
  var whenNumClick = function(){
    if(resultNum){
      var getId = this.getAttribute("id");
      var getElement = document.getElementById(getId);
      var getValue = getElement.firstChild.firstChild.nodeValue
      currentNum = getValue;
      resultNum = 0;
    }
    else {
      var getId = this.getAttribute("id");
      console.log(getId);
      var getElement = document.getElementById(getId);
      console.log(getElement);
      var getValue = document.getElementById(getId).firstChild.firstChild.nodeValue;
      console.log(getValue);
      currentNum += getValue;
    }
    viewer.innerHTML = currentNum;
  }
  var getOperator = function(){
    oldNum = currentNum;
    currentNum = "";
    var getOperatorId = this.getAttribute("id");
    var getOperatorElement = document.getElementById(getOperatorId);
    var getOperatorValue = getOperatorElement.firstChild.firstChild.nodeValue;
    
    operator = getOperatorValue;
    
  }
  var displayEverything = function(){
    oldNum = parseFloat(oldNum);
    console.log(oldNum);
    currentNum = parseFloat(currentNum);
    console.log(currentNum);
    console.log(operator);
    switch (operator) {
        case "+":
        resultNum = oldNum + currentNum;
        break;

      case "-":
        resultNum = oldNum - currentNum;
        break;

      case "x":
        resultNum = oldNum * currentNum;
        break;

      case "/":
        resultNum = oldNum / currentNum;
        break;

        // If equal is pressed without an operator, keep number and continue
      default:
        resultNum = currentNum;
    }
  
  // we also have to account for the fact that the user may mess up the calculations which would result in a NaN or infinite number. 
  if(!isFinite(resultNum)){
    if(isNaN(resultNum)){
       resultNum = "This is not good. Try Again. Please.";
       }
    else {
      resultNum = "No. We don't allow infinity here.";
    }
     }
  // now we want to take care of displaying the result on the screen;
  viewer.innerHTML = resultNum;
  
  oldNum = 0;
  currentNum = resultNum;
  }
  var theClearButton = function() {
    oldNum = "";
    currentNum = "";
    viewer.innerHTML = "0";
    
  }
  //now we'll add the functionality for the delete button
  var delButton = function(){
    var convertNumToArray = currentNum.split("");
    convertNumToArray.pop();
    currentNum = convertNumToArray.join("");
    viewer.innerHTML = currentNum;        
  }
  // Now we will go ahead and add click events to all of our calculator's numbers.
  var totalNum = allNumbers.length;
  for (var x = 0; x < totalNum;x++){
    allNumbers[x].onclick = whenNumClick;
  }
  // now we want to add elcick events to the operator buttons
  var totalOperators = allOperators.length;
  for (var x = 0; x < totalOperators;x++){
    allOperators[x].onclick = getOperator;
  }
 equals.onclick = displayEverything;
 makeElements("#clear").onclick = theClearButton;
 makeElements("#del").onclick = delButton;
 
}());
