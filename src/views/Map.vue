<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-redpacket_fill"></i> 支持作者
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div id="container" style="height: 800px;width: 800px;"></div>
        </div>
    </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
    mounted(){

    },
    setup(){
    AMapLoader.load({
        "key": "9f0483633db13ae723a4fea69f158afe",                                          // 申请好的Web端开发者Key，首次调用 load 时必填
        "version": "1.4.15",                                // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        "plugins": [],                                      // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        "AMapUI": {                                         // 是否加载 AMapUI，缺省不加载
            "version": '1.1',                               // AMapUI 缺省 1.1
            "plugins":[],                                   // 需要加载的 AMapUI ui插件
        },
        "Loca":{                                            // 是否加载 Loca， 缺省不加载
            "version": '1.3.2'                              // Loca 版本，缺省 1.3.2
        },
    }).then((AMap)=>{
        var marker = new AMap.Marker({
            position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: '北京'
        });
        var map = new AMap.Map('container', {
            zoom:11,                                        //级别
            center: [116.397428, 39.90923],  
            pitch:75,               //中心点坐标
            viewMode:'3D',
            // mapStyle: 'amap://styles/blue',
        });
        map.add(marker)
    }).catch(e => {
        console.log(e);
    })
},
};
</script>

<style>
</style>