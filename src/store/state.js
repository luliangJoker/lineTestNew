// 用户关闭本地存储功能或使用引申模式，使用localStorage可能会使浏览器抛出异常

let defaultCity ='北京';
let defalutCityID = 'bj';

//
// try{
//     if (localStorage.city){
//         defaultCity = localStorage.city
//     }
//     if (localStorage.cityID){
//         defaultCityID = localStorage.cityID
//     }
//
//     // alert(localStorage.city)
//     // alert(localStorage.cityID)
//
// }catch (e) {
//
// }
export default {
    city: defaultCity,  //城市名称
    cityID:defalutCityID, //城市编号
    Comm_ID:'', // 小区id
    Comm_Nm:'', //小区名称

}
