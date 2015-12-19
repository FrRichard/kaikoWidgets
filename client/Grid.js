define('Grid', ['gridstack','dashboard_conf'], function(Gridstack, Conf) {
	var grid = function() {

		var options = {
	  			width: 12,
                always_show_resize_handle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                resizable: {
                    handles: 'e, se, s, sw, w'
                }
	    };
	    var gridstack = $('.grid-stack').gridstack(options).data('gridstack');
	    console.log(Conf.trading);

	    _.each(Conf.trading, function(widget) {
	    	gridstack.add_widget( '<div class=grid-stack-item> <div class="grid-stack-item-content"> </div> </div>',
	    		widget.col,
	    		widget.row,
	    		widget.width,
	    		widget.height
	    	);
	    });

	}



	return grid;
});