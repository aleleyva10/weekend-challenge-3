$(document).ready(function() {
  console.log('JQ')
  getList();
  $('#createBtn').on('click', function() {
    addTask();
    getList();
  });

});

//add task function
function addTask() {
  console.log('button clicked');
  //test get call to server
  var objectToSend = {
    task: $('#taskInput').val(),
    description: $('#descripInput').val()
  };
  // end of add task function
  $.ajax({
    type: 'POST',
    url: '/getTask',
    data: objectToSend,
    success: function(response) {
      console.log('back from post call with: ', response);
    } // end success
  }); // end ajax
} // end postList

//get task
function getList() {
  $.ajax({
    type: 'GET',
    url: '/getTask',
    success: function(response) {
      console.log(response);
      $('.outputDiv').empty();
      for (var i = 0; i < response.length; i++) {
        var $div = '<div class="taskItem">';
        $div += '<h3>Task</h3>' + response[i].tasks;
        $div += '<h3>Description</h3>' + response[i].description;
        $div += '</div>';

        $('.outputDiv').append($div);
      }
    } // end success
  }); // end ajax
}; // end getList
