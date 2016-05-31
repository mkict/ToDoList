$('document').ready(function() {
	var socket = io();
	var $btn = $('.todo #btn');
	var $list = $('.todo #messages');
	var count = 0;
	
	$('form').submit(function() {
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	});

	socket.on('chat message', function(msg) {
		var $sublist = $('<li id = todo-' + count + '>');
		$list.append($sublist.text(msg));
		var tcount = count;
		$sublist.click(function(e) {
			socket.emit('click', tcount);
		});
		count++;
	});
	
	socket.on('remove', function(tcount){
		var $removelist = $('#todo-'+tcount);
		$removelist.remove();
		
	});

});

