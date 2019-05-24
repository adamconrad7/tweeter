ntweets = document.getElementsByClassName("twit-container")[0].childElementCount;

//Opens create twit modal and backdrop when create twit button is pressed:
document.getElementById('create-twit-button').addEventListener("click", function(){
  document.getElementById('create-twit-modal').style.display = "block";
  document.getElementById('modal-backdrop').style.display = "block";
  document.getElementById('twit-text-input').value = "";
  document.getElementById('twit-attribution-input').value = "";
})

//Closes create twit modal and backdrop when 'x' or cancel button is pressed:
//Note: the selector for this function only works when an index is specified eg. '[0]'.
document.getElementsByClassName("modal-close-button")[0].addEventListener("click", function(){
  //Closes create twit modal and backdrop when 'x' button is pressed:
  document.getElementById('create-twit-modal').style.display = "none";
  document.getElementById('modal-backdrop').style.display = "none";
  //Clears input fields within create twit modal:
  document.getElementById('twit-text-input').value = "";
  document.getElementById('twit-attribution-input').value = "";
})
document.getElementsByClassName("modal-cancel-button")[0].addEventListener("click", function(){
  //Closes create twit modal and backdrop when 'x' button is pressed:
  document.getElementById('create-twit-modal').style.display = "none";
  document.getElementById('modal-backdrop').style.display = "none";
  //Clears input fields within create twit modal:
  document.getElementById('twit-text-input').value = "";
  document.getElementById('twit-attribution-input').value = "";
})

//Makes new twit when 'create twit' button is pressed:
document.getElementsByClassName("modal-accept-button")[0].addEventListener("click", function(){
  var input = document.getElementById('twit-text-input');
  var input2 = document.getElementById('twit-attribution-input');
  //Alerts user if fields are left empty.
  if( input.value == "" || input2.value == "" ){
    alert("Field(s) left empty.");
  }else{
      //Making new article for twit:
      var newtwit = document.createElement('article');
      newtwit.classList.add('twit');
        //Making new div for twit:
        var newicon = document.createElement('div');
        newicon.classList.add('twit-icon');
          //Making new i for twit:
          var newimage = document.createElement('i');
          newimage.classList.add('fa');
          newimage.classList.add('fa-bullhorn');
          //adding i to div:
          newicon.appendChild(newimage);
        //making another div for twit's content:
        var newcontent = document.createElement('div');
        newcontent.classList.add('twit-content');
          //Making new p:
          var newtext = document.createElement('p');
          newtext.classList.add('twit-text');
          //Storing text from user in variable:
          var input = document.getElementById('twit-text-input');
          //Adding text to p:
          var text = document.createTextNode(input.value);
          newtext.appendChild(text);
          //Making new p:
          var newauthor = document.createElement('p');
          newauthor.classList.add('twit-author');
          //Storing text from user in variable:
          var input2 = document.getElementById('twit-attribution-input');
          var text2 = document.createTextNode(input2.value);
          //Adding text to p:
          newauthor.appendChild(text2);
        //Adding two new ps to div:
        newcontent.appendChild(newtext);
        newcontent.appendChild(newauthor);
      //Adding 2 new divs to article:
      newtwit.appendChild(newicon);
      newtwit.appendChild(newcontent);
      //Adding new twit to twit container:
      var parentElement = document.getElementsByClassName('twit-container')[0];
      parentElement.appendChild(newtwit);
      //Closes create twit modal and backdrop:
      document.getElementById('create-twit-modal').style.display = "none";
      document.getElementById('modal-backdrop').style.display = "none";
      ntweets++;
  }
})



//Searches twits when search button is pressed:
document.getElementById("navbar-search-button").addEventListener("click", function(){
  //Storing text from user in variable:
  var input = document.getElementById('navbar-search-input');
  var text = document.createTextNode(input.value);
  var query = text.textContent;
//  const ntweets = document.getElementsByClassName("twit-container")[0].childElementCount;
  // Object.freeze(ntweets);
  // const nteeets = ntweets;

  for(var i =ntweets -1; i >= 0; i--){
    var name = document.getElementsByClassName("twit-author")[i].innerText;
    var content = document.getElementsByClassName('twit-text')[i].innerText;

    console.log("loop index: ", i);
    console.log("current number of twits: ", document.getElementsByClassName("twit-container")[0].childElementCount)

    // searches content and author of twit to find if query exists as a substring.
    var n1 = content.search(query);
    var n2 = name.search(query);
    if(n1 == -1 && n2 == -1){
      var tempcontent = content.detach;
      document.getElementsByClassName('twit')[i].remove();
    }
  }
})

alert('JS successfully loaded.');
