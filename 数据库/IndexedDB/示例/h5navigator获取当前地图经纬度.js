function updateLocation(position){
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
  //accuracy 精度
	var accuracy = position.coords.accuracy;

	document.getElementById('纬度').innerHTML = latitude;
	document.getElementById('经度').innerHTML = longitude;
	document.getElementById('准确度').innerHTML = accuracy +'米';
}

function handleLocationError(error){
	switch (error.code){
		case 0:
			updateStatus('尝试获取您的位置信息时发生错误：'+error.message);
			break;
		case 1:
			updateStatus('用户拒绝了获取位置信息请求。');
			break;
		case 2:
			updateStatus('浏览器无法获取您的位置信息。');
			break;
		case 3:
			updateStatus('获取您位置信息超时。');
			break;
	}
}

var myOptions = {
  //布尔值： 表示是否启用高精确度模式，如果启用这种模式，浏览器在获取位置信息时可能需要耗费更多的时间。
	enableHighAccuracy:true,
  //整数： 表示浏览需要在指定的时间内获取位置信息，否则触发errorCallback。
  timeout:30000,
  // 整数/常量： 表示浏览器重新获取位置信息的时间间隔。
  maximumAge:0
};

navigator.geolocation.getCurrentPosition(updateLocation , handleLocationError,myOptions);
