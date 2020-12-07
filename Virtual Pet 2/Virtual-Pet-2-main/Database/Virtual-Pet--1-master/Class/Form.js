class Form {
    constructor() {
      
    }
  
    display(){
      var title = createElement('h2')
      title.html("Feed The Dog");
      title.position(130, 0);
      
      var input = createInput("Name");
      var button = createButton('Play');
      
      input.position(130, 160);
      button.position(250, 200);
  
      button.mousePressed(function(){
        input.hide();
        button.hide();
  
        var name = input.value();
    });  
    }
}
