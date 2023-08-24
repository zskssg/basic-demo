<!--
 * @Date: 2023-04-18 13:41:43
 * @LastEditors: zhangsk
 * @LastEditTime: 2023-04-20 14:33:40
 * @FilePath: \basic-demo\src\pages\map\index.vue
 * @Label: Do not edit
-->
<template>
  <div>
    <div id="map"></div>
    <div>
      <a-input-search
        v-model:value="searchValue"
        placeholder="请输入地址"
        enter-button="搜索"
        @search="onSearch2"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted } from "vue";

const script = document.createElement("script");
script.type = "text/javascript";
script.src =
  "https://api.map.baidu.com/api?v=1.0&&type=webgl&ak=ulNZ2unVhubYTAOKLUaqdGZciFaYeL1W&callback=initialize";
document.body.appendChild(script);
const mapExample: any = ref(undefined);
const geocExample: any = ref(undefined);
const city = ref("杭州市");
//
window.initialize = function () {
  const BMapGL = window.BMapGL;
  //  创建地图实例
  const map = new BMapGL.Map("map", {
    enableIconClick: true, //  icon可点击
  });
  const geoc = new BMapGL.Geocoder();

  console.log(map, geoc);
  mapExample.value = map;
  geocExample.value = geoc;
  //  创建点坐标
  let point = new BMapGL.Point(116.404, 39.915);
  // 初始化地图，设置中心点坐标和地图级别
  map.centerAndZoom(point, 15);

  //  开启滚轮缩放  默认关闭
  map.enableScrollWheelZoom(true);
  //  设置地图旋转角度和倾斜角度
  map.setHeading(64.5); //  设置旋转角度
  map.setTilt(10); //  设置倾斜度

  /**
   * // 禁止地图旋转和倾斜可以通过配置项进行设置
      var map = new BMapGL.Map("allmap",{
          enableRotate: false,
          enableTilt: false
      });
   */

  // 添加控件
  const scaleCtrl = new BMapGL.ScaleControl(); // 添加比例尺控件
  map.addControl(scaleCtrl);
  const zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件
  map.addControl(zoomCtrl);
  // const cityCtrl = new BMapGL.CityListControl(); // 添加城市列表控件
  // map.addControl(cityCtrl);

  //  个性化地图配置
  // map.setMapStyleV2({
  //   styleId: "39f9b32d020f8f1297538b83e99b4b87",
  // });

  //  添加信息窗口
  var opts = {
    width: 250, // 信息窗口宽度
    height: 50, // 信息窗口高度
    title: "你好zsk", // 信息窗口标题
  };

  //  点击获取点信息
  let timer = null as any;
  map.addEventListener("click", (e: any) => {
    const itemId = map.getIconByClickPosition(e);
    console.log(itemId, "itemId", map);

    if (itemId) {
      timer = setTimeout(() => {
        clickOne(e);
        clearTimeout(timer);
        timer = null;
      }, 600);
    }
  });
  //  单击事件
  const clickOne = (e: any) => {
    //  获取经纬度
    const { lat, lng } = e.latlng;
    console.log(lat, lng, e.latlng);
    //  根据经纬度进行逆地址解析
    geoc.getLocation(e.latlng, (rs: any) => {
      console.log("解析结果", rs);
      let infoWindow = new BMapGL.InfoWindow(rs.address, opts); // 创建信息窗口对象
      map.openInfoWindow(infoWindow, { lat, lng });
      // let point2 = new BMapGL.Point(lat, lng);
      // let marker = new BMapGL.Marker(point2); // 创建标注
      // map.addOverlay(marker);
    });
  };
};
//  正解析地址
const positiveAnalysis = () => {
  console.log(searchValue.value, "正解析");
  const geoc = new window.BMapGL.Geocoder();

  if (geocExample.value)
    geocExample.value.getPoint(
      searchValue.value,
      (rs: any) => {
        console.log(rs);
        if (rs && mapExample.value) {
          mapExample.value.centerAndZoom(rs, 18);
          mapExample.value.addOverlay(
            new window.BMapGL.Marker(rs, { title: searchValue.value })
          );
        }
      },
      city.value
    );
};
//  搜索
const searchValue = ref("");
const onSearch2 = () => {
  positiveAnalysis();
  console.log(mapExample.value);
};
</script>

<style lang="scss" scoped>
#map {
  width: 50%;
  height: 50vh;
  margin: 100px auto;
}
</style>
