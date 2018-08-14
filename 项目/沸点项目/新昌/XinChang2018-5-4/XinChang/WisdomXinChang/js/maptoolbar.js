var measure, measuresurface, mark, polyline, polygon;
var infowin;
//地图右上角 工具栏操作 显示/隐藏
$('#tLi').on('click', function () {
	var ul = $(this).children('ul');
	if ($(ul).hasClass('toolshow')) {
		$(ul).css('display', 'none').removeClass('toolshow');
		if (!$(ul).prev('span#toolCur').hasClass('rang_more')) {
			$(ul).prev('span#toolCur').removeClass('rang_more_show').addClass('rang_more');
		}
	} else {
		$(ul).css('display', 'block').addClass('toolshow');
		if ($(ul).prev('span#toolCur').hasClass('rang_more')) {
			$(ul).prev('span#toolCur').removeClass('rang_more').addClass('rang_more_show');
		}
	}
});

// 工具项各功能
// 测量工具
function toolbarmeasure() {
	map.disableDoubleClickZoom();
	if (mark) mark.close();
	if (polyline) polyline.close();
	if (polygon) polygon.close();
	if (measuresurface) measuresurface.close();
	var config = {
		showLabel: true,
		color: "red",
		weight: 10
	};
	//创建标注工具对象
	measure = new T.PolylineTool(map, config);
	//开启测量
	measure.open();

	//监听标线工具的画图事件
	measure.addEventListener('draw', function () {
		var str = '';
		for (var i = 0; i < 5; i++) {
			var num = (Math.random() * 100 + 10).toString();
			str += num
		}
		for (var i = 0; i < $('.tdt-overlay-pane>svg>g>path').length; i++) {
			if (!$($('.tdt-overlay-pane>svg>g>path')[i]).attr('measposition') && !$($('.tdt-overlay-pane>svg>g>path')[i]).attr('measurposition') && !$($('.tdt-overlay-pane>svg>g>path')[i]).attr('plposition') && !$($('.tdt-overlay-pane>svg>g>path')[i]).attr('pgposition')) {
				$($('.tdt-overlay-pane>svg>g>path')[i]).attr('measposition', str);
			}
		}
		map.enableDoubleClickZoom();
	})
}

// 测面工具
function toolbarmeasuremask() {
	map.disableDoubleClickZoom();
	if (mark) mark.close();
	if (polyline) polyline.close();
	if (polygon) polygon.close();
	if (measure) measure.close();
	var config = {
		showLabel: true,
		color: "red", weight: 3, opacity: 0.5, fillColor: "#FFFFFF", fillOpacity: 0.5
	};
	//创建标注工具对象
	measuresurface = new T.PolygonTool(map, config);
	//开启测面工具
	measuresurface.open();

	//监听标面工具的画图事件
	measuresurface.addEventListener('draw', function () {
		var str = '';
		for (var i = 0; i < 5; i++) {
			var num = (Math.random() * 100 + 10).toString();
			str += num
		}
		for (var i = 0; i < $('.tdt-overlay-pane>svg>g>path').length; i++) {
			if (!$($('.tdt-overlay-pane>svg>g>path')[i]).attr('measposition') && !$($('.tdt-overlay-pane>svg>g>path')[i]).attr('measurposition') && !$($('.tdt-overlay-pane>svg>g>path')[i]).attr('measposition') && !$($('.tdt-overlay-pane>svg>g>path')[i]).attr('plposition') && !$($('.tdt-overlay-pane>svg>g>path')[i]).attr('pgposition')) {
				$($('.tdt-overlay-pane>svg>g>path')[i]).attr('measurposition', str);
			}
		}
		map.enableDoubleClickZoom();
	})
}

// 标点工具
function toolbarmarkspot() {
	// label限制符
	var createLabel = true;
	if (polyline) polyline.close();
	if (polygon) polygon.close();
	if (measure) measure.close();
	if (measuresurface) measuresurface.close();
	//创建标注工具对象
	mark = new T.MarkTool(map, { follow: true });
	//开启标点工具
	mark.open();

	// 监听标点工具的标注事件
	mark.addEventListener('mouseup', function (data) {
		var lng = data.currentLnglat.lng.toFixed(6),
			lat = data.currentLnglat.lat.toFixed(6);
		var _thisX = data.currentMarker.Gr._tdt_pos.x,
			_thisY = data.currentMarker.Gr._tdt_pos.y;

		// 设置唯一识别符
		var strThis;
		strThis = 'axisX' + _thisX.toString() + ' axisY' + _thisY.toString();
		// 字符串转数组 图标
		for (var i = 0; i < $('.tdt-marker-pane>img').length; i++) {
			if (!$($('.tdt-marker-pane>img')[i]).attr('body3dposition')) {
				$($('.tdt-marker-pane>img')[i]).attr('body3dposition', strThis);
			}
		}
		// 阴影
		for (var i = 0; i < $('.tdt-mw-pane>img').length; i++) {
			if (!$($('.tdt-mw-pane>img')[i]).attr('body3dposition')) {
				$($('.tdt-mw-pane>img')[i]).attr('body3dposition', strThis);
			}
		}
		markTextSpot(lng, lat, _thisX, _thisY, createLabel);

		var markers = data.allMarkers;
		for (var i = 0; i < markers.length; i++) {
			(markers[i]).addEventListener('click', function (data) {
				createLabel = false;
				// 经纬度
				var lng = data.lnglat.lng.toFixed(6),
					lat = data.lnglat.lat.toFixed(6);
				// 获取唯一辨识符
				var beingString = (data.target.Gr.outerHTML).toString();
				var first_num = beingString.indexOf('body3dposition="axisX');
				var second_num = beingString.indexOf(' axisY');
				var end_num = beingString.indexOf('" style="');
				var _thisX = beingString.substring(first_num + 21, second_num);
				var _thisY = beingString.substring(second_num + 6, end_num);
				markTextSpot(lng, lat, _thisX, _thisY, createLabel);
			});
		}
	});
}

//标点工具文本框
function markTextSpot(lng, lat, _thisX, _thisY, createLabel) {
	var isContent, labelX, labelY;
	if (infowin) infowin.closeInfoWindow();
	// 固定信息文本框
	var label = new T.Label({
		text: "天地图",
		position: new T.LngLat(lng, lat),
		offset: new T.Point(5, -25)
	});
	// 设置表框颜色
	label.setBorderColor('red');
	label.addEventListener('click', function () {
		createLabel = false;
		markTextSpot(lng, lat, _thisX, _thisY, createLabel);
	});
	//创建地图文本对象
	if (createLabel) {
		map.addOverLay(label);

		var strLabel;
		strLabel = 'axisX' + _thisX.toString() + 'axisY' + _thisY.toString();
		// 设置唯一识别符
		for (var i = 0; i < $('.tdt-overlay-pane>div.tdt-label').length; i++) {
			if (!$($('.tdt-overlay-pane>div.tdt-label')[i]).attr('labelposition')) {
				$($('.tdt-overlay-pane>div.tdt-label')[i]).attr('labelposition', strLabel);
			}
		}
		if ($('.tdt-overlay-pane>div.tdt-label[labelposition=' + strLabel + ']').length > 1) {
			$($('.tdt-overlay-pane>div.tdt-label[labelposition=' + strLabel + ']')[0]).remove();
		}
	}
	// 设置内容文本框
	var lnglat = new T.LngLat(lng, lat);
	//创建信息窗口对象
	isContent =
		"<div class='edit_box'>" +
		"<div class='title'><span title='点标注'>点标注</span></div>" +
		"<div class='edit_content'>" +
		"<div class='content_item clearfix'>" +
		"<div class='content_left'>" +
		"<div class='edit_content_item clearfix'><span class='edit_label'>名称</span> <input type='text' placeholder='点标注' maxlength='15' class='edit_input'></div>" +
		"<div class='edit_content_item clearfix'><span class='edit_label'>备注</span> <textarea placeholder='您最多可以输入200个字' maxlength='200' name='textarea' class='edit_textarea'></textarea></div>" +
		"</div>" +
		"</div>" +
		"<div class='edit_btn_group clearfix'>" +
		"<a href='javascript:;' class='delet' onclick='delete_win_mark(" + _thisX + "," + _thisY + ")'>删除</a>" +
		"<a href='javascript:;' class='save'>保存</a>" +
		"</div>" +
		"</div>" +
		"</div>";
	infowin = new T.InfoWindow(isContent, { offset: new T.Point(0, -35) });
	infowin.setLngLat(lnglat);
	//向地图上添加信息窗口
	map.addOverLay(infowin);
}

// 标线工具
function toolbarmarkline() {
	map.disableDoubleClickZoom();
	if (measure) measure.close();
	if (measuresurface) measuresurface.close();
	if (mark) mark.close();
	if (polygon) polygon.close();
	var config = {
		showLabel: false,
		color: "red", weight: 10
	};
	//开启标线工具
	polyline = new T.PolylineTool(map, config);
	polyline.open();

	//监听标线工具的画图事件
	polyline.addEventListener('draw', function (data) {
		var polyline_path = [];
		var delet_num_polyline;
		// lng lat 地图上文本出现的经纬度
		// dist 线长
		var lng = data.currentLnglats[0].lng.toFixed(6),
			lat = data.currentLnglats[0].lat.toFixed(6),
			dist = data.currentDistance;
		for (var i = 0; i < data.currentPolyline.Ct[0].length; i++) {
			polyline_path.push(data.currentPolyline.Ct[0][i].x, data.currentPolyline.Ct[0][i].y);
		}
		var cache = [];
		var polyline_path = JSON.stringify(polyline_path, function (key, value) {
			if (typeof value === 'object' && value !== null) {
				if (cache.indexOf(value) !== -1) {
					return;
				}
				cache.push(value);
			}
			return value;
		}).replace(/\"/g, "'");
		cache = null;
		// 设置唯一识别符
		var strM, strL = '', str;
		// 字符串转数组
		polyline_path = polyline_path.substring(1, polyline_path.length - 1).split(",");
		for (var i = 0; i < polyline_path.length; i++) {

			if (i <= 1) {
				strM = 'M' + polyline_path[0] + ' ' + polyline_path[1];
			} else {
				strL += 'L' + polyline_path[i] + ' ' + polyline_path[i + 1];
				i = i + 1;
			}
		}
		str = strM + strL;
		for (var i = 0; i < $('.tdt-overlay-pane>svg>g>path').length; i++) {
			if (!$($('.tdt-overlay-pane>svg>g>path')[i]).attr('measposition') && !$($('.tdt-overlay-pane>svg>g>path')[i]).attr('measurposition') && !$($('.tdt-overlay-pane>svg>g>path')[i]).attr('plposition') && !$($('.tdt-overlay-pane>svg>g>path')[i]).attr('pgposition')) {
				$($('.tdt-overlay-pane>svg>g>path')[i]).attr('plposition', str);
				delet_num_polyline = str;
			}
		}
		markTextPolyline(lng, lat, dist, delet_num_polyline);

		var lines = data.allPolylines;
		for (var i = 0; i < lines.length; i++) {
			(lines[i]).addEventListener("click", function (data) {
				var polyline_path = [];
				var lng = data.target.Kt[0].lng.toFixed(6),
					lat = data.target.Kt[0].lat.toFixed(6),
					dist = parseFloat(polyline.getDistance(data.target.Ct[0])).toFixed(6);
				for (var i = 0; i < data.target.Ct[0].length; i++) {
					polyline_path.push(data.target.Ct[0][i].x, data.target.Ct[0][i].y);
				}
				var cache = [];
				var polyline_path = JSON.stringify(polyline_path, function (key, value) {
					if (typeof value === 'object' && value !== null) {
						if (cache.indexOf(value) !== -1) {
							return;
						}
						cache.push(value);
					}
					return value;
				}).replace(/\"/g, "'");
				cache = null;
				// 获取唯一辨识符
				if (data.target.It.attributes) {
					var beingString = JSON.stringify(data.target.It.attributes[8].nodeValue);
					var end_num = beingString.length;
					var string = beingString.substring(1, end_num - 1);
					markTextPolyline(lng, lat, dist, string);
				}
			})
		}
		map.enableDoubleClickZoom();
	});
}

//标线工具文本框
function markTextPolyline(lng, lat, dist, delet_num_polyline) {
	delet_num_polyline = delet_num_polyline.split(' ');
	for (var i = 0; i < delet_num_polyline.length; i++) {
		delet_num_polyline[0] = delet_num_polyline[0].toString().replace(/\M/g, '');
		if (i < delet_num_polyline.length) {
			delet_num_polyline[i] = delet_num_polyline[i].split('L')
		}
	}
	var cache = [];
	var delet_num_polyline = JSON.stringify(delet_num_polyline, function (key, value) {
		if (typeof value === 'object' && value !== null) {
			if (cache.indexOf(value) !== -1) {
				return;
			}
			cache.push(value);
		}
		return value;
	}).replace(/\"/g, "");
	cache = null;
	if (infowin) infowin.closeInfoWindow();
	// 设置内容文本框
	var lnglat = new T.LngLat(lng, lat);
	var dist = parseFloat(dist).toFixed(6) + '千米';
	//创建信息窗口对象
	var isContent =
		"<div class='edit_box'>" +
		"<div class='title'><span title='点标注'>点标注</span></div>" +
		"<div class='edit_content'>" +
		"<div class='content_item clearfix'>" +
		"<div class='content_left'>" +
		"<div class='edit_content_item clearfix'><span class='edit_label'>名称</span> <input type='text' placeholder='点标注' maxlength='15' class='edit_input'></div>" +
		"<div class='edit_content_item clearfix'><span class='edit_label'>备注</span> <textarea placeholder='您最多可以输入200个字' maxlength='200' name='textarea' class='edit_textarea'></textarea></div>" +
		"</div>" +
		"</div>" +
		"<div class='edit_btn_group clearfix'>" +
		"<span class='edit_label'>长度</span>" +
		"<span class='popup_cal'>" + dist + "</span>" +
		"<a href='javascript:;' class='delet' onclick='delete_win_polyline(" + delet_num_polyline + ")'>删除</a>" +
		"<a href='javascript:;' class='save'>保存</a>" +
		"</div>" +
		"</div>" +
		"</div>";
	infowin = new T.InfoWindow(isContent, { offset: new T.Point(0, 0) });
	infowin.setLngLat(lnglat);
	//向地图上添加信息窗口
	map.addOverLay(infowin);
}

// 标面工具
function toolbarmarkmask() {
	map.disableDoubleClickZoom();
	if (measure) measure.close();
	if (measuresurface) measuresurface.close();
	if (mark) mark.close();
	if (polygon) polygon.close();
	var config = {
		// 关闭面积测试
		showLabel: false,
		color: "red", weight: 3, opacity: 0.5, fillColor: "#FFFFFF", fillOpacity: 0.5
	};
	//创建标注工具对象
	polygon = new T.PolygonTool(map, config);
	//开启标面工具
	polygon.open();

	//监听标面工具的画图事件
	polygon.addEventListener('draw', function (data) {
		var polygon_path = [];
		var delet_num_polygon;
		// lng lat 文本经纬度
		// area 面积
		var lng = data.currentLnglats[0].lng.toFixed(6),
			lat = data.currentLnglats[0].lat.toFixed(6),
			area = data.currentArea;
		for (var i = 0; i < data.currentPolygon.Ct[0].length; i++) {
			polygon_path.push(data.currentPolygon.Ct[0][i].x, data.currentPolygon.Ct[0][i].y);
		}
		var cache = [];
		var polygon_path = JSON.stringify(polygon_path, function (key, value) {
			if (typeof value === 'object' && value !== null) {
				if (cache.indexOf(value) !== -1) {
					return;
				}
				cache.push(value);
			}
			return value;
		}).replace(/\"/g, "'");
		cache = null;

		// 设置唯一识别符
		var strM, strL = '', str;
		// 字符串转数组
		polygon_path = polygon_path.substring(1, polygon_path.length - 1).split(",");
		for (var i = 0; i < polygon_path.length; i++) {

			if (i <= 1) {
				strM = 'M' + polygon_path[0] + ' ' + polygon_path[1];
			} else {
				strL += 'L' + polygon_path[i] + ' ' + polygon_path[i + 1];
				i = i + 1;
			}
		}
		str = strM + strL + 'z';
		for (var i = 0; i < $('.tdt-overlay-pane>svg>g>path').length; i++) {
			if (!$($('.tdt-overlay-pane>svg>g>path')[i]).attr('measposition') && !$($('.tdt-overlay-pane>svg>g>path')[i]).attr('measurposition') && !$($('.tdt-overlay-pane>svg>g>path')[i]).attr('pgposition') && !$($('.tdt-overlay-pane>svg>g>path')[i]).attr('plposition')) {
				$($('.tdt-overlay-pane>svg>g>path')[i]).attr('pgposition', str);
				delet_num_polygon = str;
			}
		}

		markTextPolygon(lng, lat, area, delet_num_polygon);

		var pgareas = data.allPolygons;
		for (var i = 0; i < pgareas.length; i++) {
			(pgareas[i]).addEventListener("click", function (data) {
				var polygon_path = [];
				var lng = data.target.Kt[0][0].lng.toFixed(6),
					lat = data.target.Kt[0][0].lat.toFixed(6),
					area = parseFloat(polygon.getArea(data.target.Kt[0])).toFixed(6);
				for (var i = 0; i < data.target.Ct[0].length; i++) {
					polygon_path.push(data.target.Ct[0][i].x, data.target.Ct[0][i].y);
				}
				var cache = [];
				var polygon_path = JSON.stringify(polygon_path, function (key, value) {
					if (typeof value === 'object' && value !== null) {
						if (cache.indexOf(value) !== -1) {
							return;
						}
						cache.push(value);
					}
					return value;
				}).replace(/\"/g, "'");
				cache = null;
				// 获取唯一辨识符
				var beingString = (data.target.It.outerHTML).toString();
				var first_num = beingString.indexOf('pgposition="');
				var end_num = beingString.indexOf('">');
				var string = beingString.substring(first_num + 12, end_num);
				markTextPolygon(lng, lat, area, string);
			})
		}

		map.enableDoubleClickZoom();
	});
}

//标面工具文本框
function markTextPolygon(lng, lat, area, delet_num_polygon) {
	// 去除字母
	delet_num_polygon = delet_num_polygon.split(' ');
	for (var i = 0; i < delet_num_polygon.length; i++) {
		delet_num_polygon[0] = delet_num_polygon[0].toString().replace(/\M/g, '');
		if (i < delet_num_polygon.length) {
			if (i == delet_num_polygon.length - 1) {
				delet_num_polygon[i] = delet_num_polygon[i].split('z');
			} else {
				delet_num_polygon[i] = delet_num_polygon[i].split('L');
			}
		}
	}
	var cache = [];
	var delet_num_polygon = JSON.stringify(delet_num_polygon, function (key, value) {
		if (typeof value === 'object' && value !== null) {
			if (cache.indexOf(value) !== -1) {
				return;
			}
			cache.push(value);
		}
		return value;
	}).replace(/\"/g, "");
	cache = null;
	if (infowin) infowin.closeInfoWindow();
	// 设置内容文本框
	var lnglat = new T.LngLat(lng, lat);
	var area = parseFloat(area).toFixed(6) + '平方千米';
	//创建信息窗口对象
	var isContent =
		"<div class='edit_box'>" +
		"<div class='title'><span title='点标注'>点标注</span></div>" +
		"<div class='edit_content'>" +
		"<div class='content_item clearfix'>" +
		"<div class='content_left'>" +
		"<div class='edit_content_item clearfix'><span class='edit_label'>名称</span> <input type='text' placeholder='点标注' maxlength='15' class='edit_input'></div>" +
		"<div class='edit_content_item clearfix'><span class='edit_label'>备注</span> <textarea placeholder='您最多可以输入200个字' maxlength='200' name='textarea' class='edit_textarea'></textarea></div>" +
		"</div>" +
		"</div>" +
		"<div class='edit_btn_group clearfix'>" +
		"<span class='edit_label'>面积</span>" +
		"<span class='popup_cal'>" + area + "</span>" +
		"<a href='javascript:;' class='delet' onclick='delete_win_polygon(" + delet_num_polygon + ")'>删除</a>" +
		"<a href='javascript:;' class='save'>保存</a>" +
		"</div>" +
		"</div>" +
		"</div>";
	infowin = new T.InfoWindow(isContent, { offset: new T.Point(0, 0) });
	infowin.setLngLat(lnglat);
	//向地图上添加信息窗口
	map.addOverLay(infowin);
}

// 删除标点的当前的信息窗口以及标点
function delete_win_mark(_thisX, _thisY) {
	if (infowin) infowin.closeInfoWindow();
	var str = 'axisX' + _thisX.toString() + ' axisY' + _thisY.toString();
	var str_label = 'axisX' + _thisX.toString() + 'axisY' + _thisY.toString();
	$('.tdt-marker-pane>img[body3dposition="' + str + '"]').remove();
	$('.tdt-mw-pane>img[body3dposition="' + str + '"]').remove();
	$('.tdt-overlay-pane>div.tdt-label[labelposition="' + str_label + '"]').remove();
}

//删除标线的当前的信息窗口以及线条
function delete_win_polyline(del_polyline) {
	var del_str_polyline = '';
	if (infowin) infowin.closeInfoWindow();
	for (var i = 0; i < del_polyline.length; i++) {
		if (i == 0) {
			del_str_polyline += 'M' + del_polyline[0] + ' ';
		} else if (0 < i < del_polyline.length) {
			var del_arr_polyline = [];
			for (var j = 0; j < del_polyline[i].length; j++) {
				del_arr_polyline.push(del_polyline[i][j]);
			}
			if (i == del_polyline.length - 1) {
				del_str_polyline += (del_arr_polyline).join('L');
			} else {
				del_str_polyline += (del_arr_polyline).join('L') + ' ';
			}
		}
	}
	$('.tdt-overlay-pane>svg>g>path[plposition="' + del_str_polyline + '"]').remove();
}

//删除标面的当前的信息窗口以及面积图
function delete_win_polygon(del_polygon) {
	var del_str_polygon = '';
	if (infowin) infowin.closeInfoWindow();
	for (var i = 0; i < del_polygon.length; i++) {
		if (i == 0) {
			del_str_polygon += 'M' + del_polygon[0] + ' ';
		} else if (0 < i < del_polygon.length) {
			var del_arr_polygon = [];
			for (var j = 0; j < del_polygon[i].length; j++) {
				del_arr_polygon.push(del_polygon[i][j]);
			}
			if (i == del_polygon.length - 1) {
				del_str_polygon += (del_arr_polygon) + 'z';
			} else {
				del_str_polygon += (del_arr_polygon).join('L') + ' ';
			}
		}
	}
	$('.tdt-overlay-pane>svg>g>path[pgposition="' + del_str_polygon + '"]').remove();
}