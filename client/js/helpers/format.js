function formatDate(timestamp) {
	if(!timestamp) {
		var date = new Date();
	} else {
		var date = new Date(timestamp);
	}
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();

	formattedDate = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	return formattedDate;
}

function formatPrice(price) {
	//limit 3 decimal
	var price = Math.floor(price*1000)/1000;
	return price;
}
