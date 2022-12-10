var button = $('.submit-btn');
button.on("click", addList);

function addList(e){
  e.preventDefault();
  //access the user's input
    var userInput = $('.name').val() + '<br>_______________________________________________________________________';
  //access the container
    var container = $('.inside-box');
  //append to the container
    container.append(`
    <article class="blog-post">
    <p>${userInput}</p>
    </article>`);
    clearInput(); 
}

function clearInput(){
  var userInput = $('.name');
  userInput.val("");
}