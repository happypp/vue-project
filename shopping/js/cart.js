/**
 * Created by pp on 2017/10/7.
 */
let vm = new Vue({
  el: "#app",
  data: {  //用于数据的绑定
    title: "hello vue, i come",
    productList: [],
    totalMoney: 0,
    checkedAllFlag: false,
    mdShowFlag: false,
    curProduct: ''
  },
  methods: {  //用于方法的绑定
    cartVue: function () {
      this.title = "i come, hello vue";
      let _this = this;
      this.$http.get("data/cart.json",{id: 123}).then(function (res) {
        _this.productList = res.data.result.list;
        // _this.totalHoney = res.data.result.totalMoney;
      });

      _this.$http.get("/apis/hello").then(function (res) {
        _this.title = JSON.stringify(res);
      });

    },
    selectProduct: function (item) {
      if(typeof item.checked === 'undefined'){
        this.$set(item,"checked",true); //局部设置
        // Vue.set(item,"checked",true); //全局设置
      }else {
        item.checked = !item.checked;
      }
      this.calcTotalMoney();
    },
    changeMoney: function (item,type) {
      if(type > 0){
        item.count++;
      }else {
        item.count--;
        if(item.count < 1){
          item.count = 1;
        }
      }
      this.calcTotalMoney();
    },
    checkedAll: function (flag) {
      this.checkedAllFlag = flag;
      this.productList.forEach((item,index) => {
        if(typeof item.checked === 'undefined'){
          this.$set(item,"checked",this.checkedAllFlag);
        }else {
          item.checked = this.checkedAllFlag;
        }
      });
      this.calcTotalMoney();
    },
    calcTotalMoney: function () {
      this.totalMoney = 0;
      this.productList.forEach((item,index) => {
        if(item.checked){
          this.totalMoney += item.count * item.price;
        }
      });
    },
    delConfirm: function (item) {
      this.mdShowFlag = true;
      this.curProduct = item;
    },
    delProduct: function () {
      let index = this.productList.indexOf(this.curProduct);
      this.productList.splice(index,1);
      this.mdShowFlag = false;
    }
  },
  filters: {  //过滤器 v-text 不支持 | 过滤器这个语法
    formatMoney: function (value) {
      return "￥" + value.toFixed(2);
    }
  },
  mounted: function () { //初始化成功之后所做的
    this.$nextTick(function () {  //确保所有DOM初始化完成    this可以用vm来替换
      vm.cartVue();
    });
  },
  component: {

  }

});
//全局过滤器
Vue.filter("money",function (value, type) {
  return "￥" + value +" "+ type;
});