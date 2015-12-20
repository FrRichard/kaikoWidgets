define('grid', ['gridstack','dashboard_conf'], function(Gridstack, Conf) {
	var grid = function(type) {
		console.log(type,Conf);
		var options = {
	  			width: 12,
                always_show_resize_handle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                resizable: {
                    handles: 'e, se, s, sw, w'
                }
	    };
	    var gridstack = $('.grid-stack').gridstack(options).data('gridstack');
	    
	    //clean previous grid
	    gridstack.remove_all();


	    _.each(Conf[type], function(widget) {
	    	gridstack.add_widget( '<div class=grid-stack-item id={id}> <div class="grid-stack-item-content"> </div> </div>'.replace('{id}',widget.id),
	    		widget.col,
	    		widget.row,
	    		widget.width,
	    		widget.height
	    	);
	    });

	}



	return grid;
});