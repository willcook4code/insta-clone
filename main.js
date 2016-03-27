//main page~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var collectionUrl;
//assigned variables from html~~~~~~~~~~~
var pic = $('#imgUrl');
var caption = $('#imgCaption');
var noUrl = $('#imgErr');
var noCap = $('#capErr');
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
//Hide add bar on page load~~~~~~~~~~~~~~
$('form').hide();
//Add bar toggle~~~~~~~~~~~~~~~~~~~~~~~~~
$('.plus').click(function() {
    $('form').slideToggle();
});
//Cancel Operation~~~~~~~~~~~~~~~~~~~~~~~
$('#stop').click(function() {
    $('#imgUrl').val('');
    $('#imgCaption').val('');
    noUrl.html('');
    noCap.html('');
});
//Login Operation~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$('#register').click(function() {
    if ($('#un').val()==='') {
        alert('Please create a unique username.');
    } else if ($('#pw').val().length < 7) {
        alert('Password must have at least 7 characters.');
    } else {
        var userName = $('#un').val();
        collectionUrl = ('http://small-tiyfe.herokuapp.com/collections/'+userName);
        var getSettings = {
            url: collectionUrl,
            type: 'get',
            dataType: 'json',
            success: function(data) {
                var container = $('#container');
                console.log(data);
                data.forEach(function (val) {
                    var outerBox = $('<div class="outerBox"></div>');
                    var imageBox = $('<img>', {'src': val.image});
                    var descriptionBox = $('<div id="description"></div>').html(val.description);

                    outerBox.append(imageBox);
                    outerBox.append(descriptionBox);

                    container.append(outerBox);
                });

            },
            error: function(err) {
                console.log("Get run bad.");
            }
        }
    }   
    $('#container').html('');
    $.ajax(getSettings);
    $('form').submit(function(e) {
        e.preventDefault();
        //build entry object
        var entry;
        if ((pic.val().indexOf('http://') === -1) && (pic.val().indexOf('https://') === -1)) {
            noUrl.html('URL must begin with "http://" or "https://"');
            return;
        } else if ((pic.val().indexOf('jpg') === -1) && (pic.val().indexOf('png') === -1) && (pic.val().indexOf('gif') === -1)) {
            noUrl.html('URL must end with ".png", ".jpg", or ".gif"');
            return;
        } else {
            noUrl.html('');
        }
        if (caption.val() === '') {
            noCap.html('You must enter a caption.');
            return;
        } else {
            noCap.html('');
        }
        entry = {
            image: pic.val(),
            description: caption.val()
        }
        $('#imgUrl').val('');
        $('#imgCaption').val('');
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
        $('form').slideUp();
        //Clear out old array~~~~~~~~~~~~~~~
        $('#container').html('');
        //Display new array~~~~~~~~~~~~~~~~~
        $.ajax(getSettings);
    });
});

//on event to send entry~~~~~~~~~~~~~~~~~
// $('form').submit(function(e) {
//     e.preventDefault();
//     //build entry object
//     var entry;
//     if ((pic.val().indexOf('http://') === -1) && (pic.val().indexOf('https://') === -1)) {
//         noUrl.html('URL must begin with "http://" or "https://"');
//         return;
//     } else if ((pic.val().indexOf('jpg') === -1) && (pic.val().indexOf('png') === -1) && (pic.val().indexOf('gif') === -1)) {
//         noUrl.html('URL must end with ".png", ".jpg", or ".gif"');
//         return;
//     } else {
//         noUrl.html('');
//     }
//     if (caption.val() === '') {
//         noCap.html('You must enter a caption.');
//         return;
//     } else {
//         noCap.html('');
//     }
//     entry = {
//         image: pic.val(),
//         description: caption.val()
//     }
//     $('#imgUrl').val('');
//     $('#imgCaption').val('');
//     console.log(entry);
//     //post settings
//     $.ajax({
//     	url: collectionUrl,
//     	type: 'post',
//         data: entry,
//     	dataType: 'json',
//     	success: onPostSuccess,
//     	error: onPostError,
//         complete: onPostComplete
//     });
//     $('form').slideUp();
//     //Clear out old array~~~~~~~~~~~~~~~
//     $('#container').html('');
//     //Display new array~~~~~~~~~~~~~~~~~
//     $.ajax(getSettings);
// });

//get event to display entries~~~~~~~~~~
// var getSettings = {
// 	url: collectionUrl,
// 	type: 'get',
// 	dataType: 'json',
// 	success: function(data) {
//         var container = $('#container');
// 		console.log(data);
//         data.forEach(function (val) {
//             var outerBox = $('<div class="outerBox"></div>');
//             var imageBox = $('<img>', {'src': val.image});
//             var descriptionBox = $('<div id="description"></div>').html(val.description);

//             outerBox.append(imageBox);
//             outerBox.append(descriptionBox);

//             container.append(outerBox);
//         });

// 	},
// 	error: function(err) {
// 		console.log("Get run bad.");
// 	}
// }







