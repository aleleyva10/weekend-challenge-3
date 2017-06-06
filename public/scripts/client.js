$(document).ready(function() {
  console.log('JQ')
  getList();
  $('#createBtn').on('click', function() {
    addTask();
    getList();
  });
  $('.outputDiv').on('click', '#deleteBtn', function() {
    var getId = {
      id: $(this).parent().attr('id')
    }
    $.ajax({
      type: 'DELETE',
      url: '/getTask',
      data: getId,
      success: function(response) {
        console.log('delete task', response);
        getList();
      }
    });
  });

  function toggleCompletion() {

  }
$('.outputDiv').on('click', '#completeBtn', function() {
  var $id = $(this); // this is what was changed
  var complete = false;
  var taskItem = $(this).parent();

  if(taskItem.hasClass('complete')) {
    taskItem.removeClass('complete'); // comlete is a class that exists in main.css

  } else {
    complete = true;
    taskItem.addClass('complete');
  }
  var getId = {
    id: $(this).parent().attr('id'),
    data: complete,
     }
  $.ajax({
    type: 'PUT',
    url: '/getTask',
    data: getId,
    success: function(response) {
      console.log('completed task', response);
      getList();
    }
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
          var id = response[i].id;
          console.log(id);
          var $div = '<div id=' + id + ' class="taskItem">';
          $div += '<p><strong>Task:</strong> ' + response[i].tasks + '</p>';
          $div += '<p><strong>Description:</strong> ' + response[i].description + '</p>';
          $div += '<button id="completeBtn">Complete</button>';
          $div += '<button id="deleteBtn">Delete</button>';

          $div += '</div>';


          $('.outputDiv').append($div);
        }
      } // end success
    }); // end ajax
  }// end getList
}); // end document ready
