import echarts from 'echarts/lib/echarts';
import Vector3 from 'qtek/src/math/Vector3';
import glmatrix from 'qtek/src/dep/glmatrix';
import cartesian3DLayout from './cartesian3DLayout';
import evaluateBarSparseness from './evaluateBarSparseness';

var vec3 = glmatrix.vec3;

function globeLayout(seriesModel, coordSys) {
    var data = seriesModel.getData();
    var barMinHeight = seriesModel.get('minHeight') || 0;
    var barSize = seriesModel.get('barSize');
    var dims = ['lng', 'lat', 'alt'].map(function (coordDimName) {
        return seriesModel.coordDimToDataDim(coordDimName)[0];
    });
    if (barSize == null) {
        var perimeter = coordSys.radius * Math.PI;
        var fillRatio = evaluateBarSparseness(data, dims[0], dims[1]);
        barSize = [
            perimeter / Math.sqrt(data.count() / fillRatio),
            perimeter / Math.sqrt(data.count() / fillRatio)
        ];
    }
    else if (!echarts.util.isArray(barSize)) {
        barSize = [barSize, barSize];
    }
    data.each(dims, function (lng, lat, val, idx) {
        var stackedValue = data.get(dims[2], idx, true);
        var baseValue = data.stackedOn ? (stackedValue - val) : coordSys.altitudeAxis.scale.getExtent()[0];
        // TODO Stacked with minHeight.
        var height = Math.max(coordSys.altitudeAxis.dataToCoord(val), barMinHeight);
        var start = coordSys.dataToPoint([lng, lat, baseValue]);
        var end = coordSys.dataToPoint([lng, lat, stackedValue]);
        var dir = vec3.sub([], end, start);
        vec3.normalize(dir, dir);
        var size = [barSize[0], height, barSize[1]];
        data.setItemLayout(idx, [start, dir, size]);
    });

    data.setLayout('orient', Vector3.UP._array);
}

function geo3DLayout(seriesModel, coordSys) {
    var data = seriesModel.getData();
    var barSize = seriesModel.get('barSize');
    var barMinHeight = seriesModel.get('minHeight') || 0;
    var dims = ['lng', 'lat', 'alt'].map(function (coordDimName) {
        return seriesModel.coordDimToDataDim(coordDimName)[0];
    });
    if (barSize == null) {
        var size = Math.min(coordSys.size[0], coordSys.size[2]);

        var fillRatio = evaluateBarSparseness(data, dims[0], dims[1]);
        barSize = [
            size / Math.sqrt(data.count() / fillRatio),
            size / Math.sqrt(data.count() / fillRatio)
        ];
    }
    else if (!echarts.util.isArray(barSize)) {
        barSize = [barSize, barSize];
    }
    var dir = [0, 1, 0];
    data.each(dims, function (lng, lat, val, idx) {
        var stackedValue = data.get(dims[2], idx, true);
        var baseValue = data.stackedOn ? (stackedValue - val) : coordSys.altitudeAxis.scale.getExtent()[0];

        var height = Math.max(coordSys.altitudeAxis.dataToCoord(val), barMinHeight);
        var start = coordSys.dataToPoint([lng, lat, baseValue]);
        var size = [barSize[0], height, barSize[1]];
        data.setItemLayout(idx, [start, dir, size]);
    });

    data.setLayout('orient', [1, 0, 0]);
}

function mapboxLayout(seriesModel, coordSys) {
    var data = seriesModel.getData();
    var dimLng = seriesModel.coordDimToDataDim('lng')[0];
    var dimLat = seriesModel.coordDimToDataDim('lat')[0];
    var dimAlt = seriesModel.coordDimToDataDim('alt')[0];
    var barSize = seriesModel.get('barSize');
    var barMinHeight = seriesModel.get('minHeight') || 0;

    if (barSize == null) {
        var xExtent = data.getDataExtent(dimLng);
        var yExtent = data.getDataExtent(dimLat);
        var corner0 = coordSys.dataToPoint([xExtent[0], yExtent[0]]);
        var corner1 = coordSys.dataToPoint([xExtent[1], yExtent[1]]);

        var size = Math.min(
            Math.abs(corner0[0] - corner1[0]),
            Math.abs(corner0[1] - corner1[1])
        ) || 1;

        var fillRatio = evaluateBarSparseness(data, dimLng, dimLat);
        // PENDING, data density
        barSize = [
            size / Math.sqrt(data.count() / fillRatio),
            size / Math.sqrt(data.count() / fillRatio)
        ];
    }
    else {
        if (!echarts.util.isArray(barSize)) {
            barSize = [barSize, barSize];
        }
        barSize[0] /= coordSys.getScale() / 16;
        barSize[1] /= coordSys.getScale() / 16;
    }

    var dir = [0, 0, 1];

    data.each([dimLng, dimLat, dimAlt], function (lng, lat, val, idx) {
        var stackedValue = data.get(dimAlt, idx, true);
        var baseValue = data.stackedOn ? (stackedValue - val) : 0;

        var start = coordSys.dataToPoint([lng, lat, baseValue]);
        var end = coordSys.dataToPoint([lng, lat, stackedValue]);
        var height = Math.max(end[2] - start[2], barMinHeight);
        var size = [barSize[0], height, barSize[1]];
        data.setItemLayout(idx, [start, dir, size]);
    });

    data.setLayout('orient', [1, 0, 0]);
}

echarts.registerLayout(function (ecModel, api) {
    ecModel.eachSeriesByType('bar3D', function (seriesModel) {
        var coordSys = seriesModel.coordinateSystem;
        var coordSysType = coordSys && coordSys.type;
        if (coordSysType === 'globe') {
            globeLayout(seriesModel, coordSys);
        }
        else if (coordSysType === 'cartesian3D') {
            cartesian3DLayout(seriesModel, coordSys);
        }
        else if (coordSysType === 'geo3D') {
            geo3DLayout(seriesModel, coordSys);
        }
        else if (coordSysType === 'mapbox') {
            mapboxLayout(seriesModel, coordSys);
        }
        else {
            if (__DEV__) {
                if (!coordSys) {
                    throw new Error('bar3D doesn\'t have coordinate system.');
                }
                else {
                    throw new Error('bar3D doesn\'t support coordinate system ' + coordSys.type);
                }
            }
        }
    });
});