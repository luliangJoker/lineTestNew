<template>
  <div class="picker-term">
    <mt-picker valueKey="name" :slots="slots" :itemHeight="itemHeight" :showToolbar="showToolbar" :visible-item-count="3" @change="onValuesChange" >
      <p @click="cancel">取消</p>
      <p>请选择贷款期限</p>
      <p @click="confirm">确定</p>
    </mt-picker>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Picker } from 'mint-ui';

  Vue.component(Picker.name, Picker);

  export default {
    name: 'picker-time',
    props: ['slotsData'],
    data(){
      return{
        value: '',
        showToolbar: true,
        slots: [/*{values: ['1个月', '2个月', '3个月', '4个月', '5个月']}*/],
        itemHeight: 55
      }
    },
    methods: {
      onValuesChange(picker, values) {
        this.value = values[0].name;
        this.$emit('valuesid',values[0].id)
       console.log(this.value)
       console.log(picker)
       console.log(values)
      },
      cancel() {
        this.$emit('add-parent-cancel')
      },
      confirm() {
//        console.log(this.value)
        this.$emit('add-parent-confirm',this.value) 
      }
    },
    created () {
      this.slots = this.slotsData;
    }
  };
</script>
<style lang="scss">
  .picker-term{
    height: 100%;
    position: fixed;
    width: 100%;
    background: rgba(0,0,0,.7);
    bottom: 0;
    left: 0;
    z-index: 99999;
  }
  .picker{
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  .picker-items{
    background: #fff;
    margin-top: -1px;
  }
  .picker-center-highlight:before, .picker-center-highlight:after{
    background: transparent;
    height: 1px;
    border-top: 1px solid #ccc;
  }
  .picker-toolbar{
    font-size: 0.3rem;
    color: #333;
    display: flex;
    justify-content: space-between;
    background: #f5f5f5;
    padding: 0 0.2rem;
    height: 0.8rem;
    p{
      line-height: 0.8rem;
    }
  }
</style>