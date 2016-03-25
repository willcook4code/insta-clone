//main page~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var collectionUrl = 'http://small-tiyfe.herokuapp.com/collections/willsinsta'
//assigned variables from html~~~~~~~~~~~
var pic = $('.imgUrl');
var caption = $('.imgCaption');
var entries = [];
//push object into entries array~~~~~~~~~
// function collectEntries(entryObject) {
// 	entries.push(entryObject);
// }
//onPost functions~~~~~~~~~~~~~~~~~~~~~~~
function onPostSuccess(data) {
    console.log('I run good.')
}
function onPostError(err) {
    console.log('I run bad.');
}
function onPostComplete() {
    console.log('I run.');
}
//on event to send entry~~~~~~~~~~~~~~~
$('form').submit(function(e) {
    e.preventDefault();
    //build entry object
    var entry = {
        image: pic.val(),
        description: caption.val()
    }
    console.log(entry);
    //post settings
    $.ajax({
    	url: collectionUrl,
    	type: 'post',
        data: entry,
    	dataType: 'json',
    	success: onPostSuccess,
    	error: onPostError,
        complete: onPostComplete
    });
});


var getSettings = {
	url: collectionUrl,
	type: 'get',
	dataType: 'json',
	success: function(data) {
		return data;
	},
	error: function(err) {
		console.log(err);
	}
}
$.ajax(getSettings);









