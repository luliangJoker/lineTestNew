export default {
    getCityID(state,cityID){
        // this.$store.commit('changeCity',{city:city,cityID:cityID})
        state.cityID = cityID
        alert('id进来了')
        alert('查询当前城市cityID')
        alert(state.cityID);
    },
    changeCity(state,obj) {
        state.city = obj.city
        state.cityID = obj.cityID

        // try {
        //     localStorage.city = obj.city
        //     localStorage.cityID = obj.cityID
        //
        // }
        // catch (e) {
        // }

        // alert(localStorage.city)
        // alert(localStorage.cityID)
    },
    changeCom(state,obj) {

        state.Comm_Nm = obj.comNm
        state.Comm_ID = obj.comID

        // alert(state.Comm_ID);
        // alert(state.Comm_Nm);


        // try {
        //     localStorage.city = obj.city
        //     localStorage.cityID = obj.cityID
        //
        // }
        // catch (e) {
        // }
        //
        // alert(localStorage.city)
        // alert(localStorage.cityID)
    },
}
