import echarts from 'echarts/lib/echarts';

import './scatter3D/Scatter3DSeries';
import './scatter3D/Scatter3DView';

import symbolVisual from 'echarts/lib/visual/symbol';
import opacityVisual from './common/opacityVisual';
echarts.registerVisual(echarts.util.curry(symbolVisual, 'scatter3D', 'circle', null));

echarts.registerVisual(echarts.util.curry(opacityVisual, 'scatter3D'));

echarts.registerLayout(function (ecModel, api) {
    ecModel.eachSeriesByType('scatter3D', function (seriesModel) {
        var data = seriesModel.getData();
        var coordSys = seriesModel.coordinateSystem;

        if (coordSys) {
            var coordDims = coordSys.dimensions;
            if (coordDims.length < 3) {
                if (__DEV__) {
                    console.error('scatter3D needs 3D coordinateSystem');
                }
                return;
            }
            var dims = coordDims.map(function (coordDim) {
                return seriesModel.coordDimToDataDim(coordDim)[0];
            });

            var points = new Float32Array(data.count() * 3);

            var item = [];
            var out = [];

            if (coordSys) {
                data.each(dims, function (x, y, z, idx) {
                    item[0] = x;
                    item[1] = y;
                    item[2] = z;
                    coordSys.dataToPoint(item, out);
                    points[idx * 3] = out[0];
                    points[idx * 3 + 1] = out[1];
                    points[idx * 3 + 2] = out[2];
                });
            }
            data.setLayout('points', points);
        }
    });
});