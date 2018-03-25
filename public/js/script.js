var socket = io();
$(() => {
    //click on send button
    $('#add').click(() => {
        message = {
            name : $('#name').val(),
            message : $('#message').val()
        }
        postMessage(message);
    });

    //Display list of messages
    getListMessages();
});

socket.on('message', addNewMessage);

//Add a new message to a list
function addNewMessage(message){
    $('#listOfMessages').append(
        `
            <h3> ${message.name} </h3>
            <p> ${message.message} </p>

        `
    );
};

//get the list off messages
function getListMessages(){
    $.ajax({
        url: 'http://localhost:3000/messages',
        type: 'GET',
        success: function(data){ 
            data.forEach(element => {
                addNewMessage(element);
            });
        },
        error: function(data) {
            console.log('can\'t display data');
        }
    });
}

//Add message with POST methode
function postMessage(data){
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/messages',
        data : data,
        success: () => { 
                //console.log(data);
                //addNewMessage(data);
        }
    });
}


