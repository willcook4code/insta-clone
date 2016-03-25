var collectionUrl = 'http://small-tiyfe.herokuapp.com/collections/willsinsta'

var pic = $('.imgUrl');
var caption = $('.imgCaption');
var entries = [];

function collectEntries(entryObject) {
	entries.push(entryObject);
   
}
$('form').submit(function(e) {
    e.preventDefault();
    var entry = {
        image: pic.val(),
        description: caption.val()
    }
   collectEntries(entry);
   

entries.map(function(posting) {
    $.ajax({
    	url: collectionUrl,
    	type: 'post',
        data: posting,
    	dataType: 'json',
    	success: function(data) {
    		console.log(entries)
            return entries.pop();
    	},
    	error: function(err) {
    		console.log(err)
    	},
        complete: function() {
            console.log('I run.')
        }
    });
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









