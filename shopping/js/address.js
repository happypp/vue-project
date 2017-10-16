let vm = new Vue({
    el: '.container',
    data: {
        addressList: "",
        addressNum: 3,
        currentAddress: 0,
        distributionMethod: 1
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    computed: { //自定义for循环对象
        resultAddres: function () {
            return this.addressList.slice(0,this.addressNum);
        }
    },
    methods: {
        getAddressList: function () {
            let _this = this;
            this.$http.get("data/address.json").then(function (res) {
                console.log(res);
                if(res.status === 200){
                    _this.addressList = res.data.result;
                }
            });
        },
        setDefualtAddr: function (addressId) {
            this.addressList.forEach(function (address, index) {
               if(address.addressId === addressId){
                   address.isDefault = true;
               }else {
                   address.isDefault = false;
               }
            });
        }
    }
});