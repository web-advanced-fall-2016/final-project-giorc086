(function(){
  let URL = "http://localhost:8080/api/resort";
  let searchField = document.querySelector('#search');
  let resortNames = [];
  let resultElement = document.querySelector('.results');

//searches through the resort names from user input on keyup
  $('#search').keyup(function() {
    let key = $('#search').val();  //value inputed in search field
    let regEx = new RegExp(key,'i');
    let newArray = [];

    if(key === ''){
      resultElement.innerHTML = '';
      return; //ends execution of function
    }
    for(let i = 0; i < resortNames.length; i++){
      if(regEx.test(`${resortNames[i].resortName}`)){
        newArray.push(resortNames[i]);
      }//else do nothing
    }
    console.log(newArray);
    resultElement.innerHTML = '';
    for(item of newArray){
      let newLi = document.createElement('li'); //creares new li element in html
      newLi.innerText = item.resortName; //show name in li
      newLi.dataset.myCustomId = item._id; //add new data type to li tag with corresponding id
      resultElement.appendChild(newLi);
    }
    $('li').click(function() {
      let clickedResortId = this.dataset.myCustomId;
      console.log(clickedResortId);

      $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/resort/" + clickedResortId
      })
      .done(function(response){
        console.log(response);
        resortTemp = response;
        $('#temp').text('Temperature');
        $('#temp').text('Temperature: ' + response.resortTemp);
      });
    });
  });
  $.ajax({
          method: "GET",
          url: URL
      })
      .done(function(response) {
          console.log(response); //logs the array
          resortNames = response;
          searchField.removeAttribute('disabled');
      });
})();
