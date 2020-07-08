import axios from 'axios'
import qs from 'qs'
import {Secret} from '@/assets/commonjs/utils.js';

/**
 * 基础模块
 */
export const Base = new class {
    constructor(){
        this.uploadApi = '/api/user/upload';  //上传
        this.sendcodeApi = '/api/sms/send';//验证码
        this.imgcodeApi = '/api/Captcha/get'; //图形验证码
        this.bankApi = '/api/user/getbank';//银行
        this.download = '/api/app/info'; //下载
        this.uploadWgtApi = '/api/upload/upFile';//上传wgt
        this.downloadWgtAPi = '/api/upload/downfile';//下载资源更新
        this.getVersionAPi = '/api/upload/getVersion'; //获取服务器版本号
        this.getTextApi =  '/api/app/gettext'; //币与按钮名称
        this.dataApi = '/api/index/getImg'; //基础数据
        this.textSeAPi = '/api/demo/test1';//测试加解密

    }
    getBank(){
        return axios.post(this.bankApi).then((res)=>res.data);
    }
    upload(params){
        return  axios.post(this.uploadApi,params).then((res)=>res.data);
    }
    sendCode(params){
        return axios.post(this.sendcodeApi,qs.stringify(params)).then((res)=>res.data); 
    }
    getImgCode(params){
        return axios.get(this.imgcodeApi,{params}).then((res)=>res.data); 
    }
    getDownload(){
        return axios.get(this.download).then((res)=>res.data); 
    }
    uploadWgt(params){
        return axios.post(this.uploadWgtApi,params).then((res)=>res.data); 
    }
    getVersion(){
        return axios.get(this.getVersionAPi).then((res)=>res.data); 
    }
    getText(){
        return axios.get(this.getTextApi).then((res)=>res.data); 
    }
    getData(){
        return axios.post(this.dataApi).then(res=>res.data)
    }
    getTest(params){
        return axios.get(this.textSeAPi,{params}).then(res=>res.data)
    }
}

/**
 * 用户模块
 */
 export const Init = new class {
     constructor(){
        this.registerApi = '/api/user/register';  //注册
        // this.changepwdApi = '/api/user/getbackpass';  //修改密码
        this.changepwdApi = '/api/user/uppass';  //修改密码
        this.backpwdApi = '/api/user/getbackpass';  //忘记密码
        this.userApi = '/api/user/getinfo'; //用户信息
        this.capitalApi = ''; //用户资产
        this.realApi = '/api/user/changeisreal';  //实名认证
        this.loginApi = '/api/user/login';  //登录
        this.backTradeApi = '/api/user/uppaypsw';//修改交易密码
        this.quitApi = '/api/user/logout';//退出登录

        this.otherCbdListApi='/addons/litestore/api.my/other_cbd_list'//共享停车/车联互助CBD余额明细
        this.switchCbdRmbApi='/addons/litestore/api.order/switch_cbd_rmb'//充值数额转换
        this.rechargeOrderAddApi='/addons/litestore/api.order/recharge_order_add'//充值CBD

        this.userIndexApi='/addons/litestore/api.my/index'//个人信息
        this.clhzApplyApi='/api/user/clhz_apply'//车联互助申请
        this.kLineApi='/api/otc/k_line'//交易k线图
        this.kParamApi='/api/otc/k_param'//交易基数
        this.createSellOrderApi='/api/otc/createSellOrder'//创建卖单
        this.createBuyOrderApi='/api/otc/createBuyOrder'//创建买单

        this.myorderApi='/api/otc/myorder'//我的订单
        this.orderdetailApi='/api/otc/orderdetail'//订单详情
        this.getCcParamApi='/api/otc/getCcParam'//交易基数
        this.otcOrderApi='/api/otc/otcOrder'//交易基数
        this.otcOrderdetailApi='/api/otc/otcOrderdetail'//买卖单中心订单详情
        this.orderSellOrderApi='/api/otc/orderSellOrder'//买入卖单
        this.orderBuyOrderApi='/api/otc/orderBuyOrder'//卖出买单
        this.payOrderApi='/api/otc/payOrder'//买家付款
        this.dealOrderApi='/api/otc/dealOrder'//卖家确认
        this.complaintApi='/api/otc/complaint'//卖家申诉

        this.getUsernameApi='/api/user/get_username'//随机获取会员编号
        this.gxtcruleApi='/api/notice/gxtcrule'//共享停车规则
        this.clhzruleApi='/api/notice/clhzrule'//车联互助规则
        this.recharge_infoApi='/addons/litestore/api.order/recharge_info'//充值信息
        
 
    }

    recharge_info(params){
        return axios.get(this.recharge_infoApi,{params}).then((res)=>res.data)
    }
    gxtcrule(params){
        return axios.get(this.gxtcruleApi,{params}).then((res)=>res.data)
    }
    clhzrule(params){
        return axios.get(this.clhzruleApi,{params}).then((res)=>res.data)
    }
    complaint(params){
        return  axios.post(this.complaintApi,qs.stringify(params)).then((res)=>res.data)
    }
    dealOrder(params){
        return  axios.post(this.dealOrderApi,qs.stringify(params)).then((res)=>res.data)
    }
    payOrder(params){
        return  axios.post(this.payOrderApi,qs.stringify(params)).then((res)=>res.data)
    }
    orderBuyOrder(params){
        return  axios.post(this.orderBuyOrderApi,qs.stringify(params)).then((res)=>res.data)
    }
    orderSellOrder(params){
        return  axios.post(this.orderSellOrderApi,qs.stringify(params)).then((res)=>res.data)
    }
    otcOrderdetail(params){
        return  axios.post(this.otcOrderdetailApi,qs.stringify(params)).then((res)=>res.data)
    }
    otcOrder(params){
        return axios.get(this.otcOrderApi,{params}).then((res)=>res.data)
    }
    getCcParam(params){
        return axios.get(this.getCcParamApi,{params}).then((res)=>res.data)
    }
    
    orderdetail(params){
        return  axios.post(this.orderdetailApi,qs.stringify(params)).then((res)=>res.data)
    }
    myorder(params){
        return  axios.post(this.myorderApi,qs.stringify(params)).then((res)=>res.data)
    }
    createBuyOrder(params){
        return  axios.post(this.createBuyOrderApi,qs.stringify(params)).then((res)=>res.data)
    }
    createSellOrder(params){
        return  axios.post(this.createSellOrderApi,qs.stringify(params)).then((res)=>res.data)
    }
    kParam(params){
        return axios.get(this.kParamApi,{params}).then((res)=>res.data)
    }
    kLine(params){
        return  axios.post(this.kLineApi,qs.stringify(params)).then((res)=>res.data)
    }
    clhzApply(params){
        return  axios.post(this.clhzApplyApi,qs.stringify(params)).then((res)=>res.data)
    }
    userIndex(params){
        return  axios.get(this.userIndexApi,{params}).then((res)=>res.data)
    }
    rechargeOrderAdd(params){
        return  axios.get(this.rechargeOrderAddApi,{params}).then((res)=>res.data)
    }
    switchCbdRmb(params){
        return  axios.get(this.switchCbdRmbApi,{params}).then((res)=>res.data)
    }
    otherCbdList(params){
        return  axios.get(this.otherCbdListApi,{params}).then((res)=>res.data)
    } 
    register(params){
        return  axios.post(this.registerApi,qs.stringify({data:Secret.encrypt(JSON.stringify(params))})).then((res)=>res.data)
    }
    changePwd(params){
        return  axios.post(this.changepwdApi,qs.stringify({data:Secret.encrypt(JSON.stringify(params))})).then((res)=>res.data)
    }
    
    getUsername(params){
        return  axios.post(this.getUsernameApi,qs.stringify(params)).then((res)=>res.data)
    }
    backpwd(params){
        return axios.post(this.backpwdApi,qs.stringify({data:Secret.encrypt(JSON.stringify(params))})).then(res => res.data); 
    }
    getUser(params){
        return  axios.post(this.userApi,qs.stringify(params)).then((res)=>res.data)
    }
    getCapital(params){
        return  axios.post(this.capitalApi,qs.stringify(params)).then((res)=>res.data)
    }
    toReal(params){
        return  axios.post(this.realApi,qs.stringify({data:Secret.encrypt(JSON.stringify(params))})).then((res)=>res.data)
    }
    login(params){
        return  axios.post(this.loginApi,qs.stringify({data:Secret.encrypt(JSON.stringify(params))})).then((res)=>res.data)
    }
    backTrade(params){
        // return  axios.post(this.backTradeApi,qs.stringify(params)).then((res)=>res.data)
        return  axios.post(this.backTradeApi,qs.stringify({data:Secret.encrypt(JSON.stringify(params))})).then((res)=>res.data)
    }
    quit(){
        return  axios.get(this.quitApi).then((res)=>res.data)
    }
 }
 

/**
 * 个人中心
 */
export const Owner = new class {
    constructor(){
        this.bespeakListApi = '';//预约列表
        this.teamApi = '/api/user/team';//团队
        this.kjfeeApi = '/api/user/getkjfee';//充值矿机费率
        this.payInfoApi = '/api/user/payinfo';//支付信息
        this.bindaliApi = '/api/user/uppay'; //支付宝绑定
        this.bindwechatApi = '/api/user/upwechar'; //微信绑定
        this.userCoinApi= '/api/user/getUserCoin'; //资产模块
        this.coinOrderApi = '/api/user/getCoinOrder';//明细 
        this.coinApi = '/api/user/getCoin';//矿机与推广收益
        this.transferApi = '/api/user/transfer';//转出
        this.shaituApi = '/api/usershow/add';  //晒图
        this.rechargeInfoApi = '/api/user/getRechargeInfo'; //矿机充值信息
        this.rechargeApi = '/api/user/addRechargeLog'; //充值信息
        this.booklistApi = '/api/booking/booking/getlog'; //预约记录
        this.sellInfoApi = '/api/order/order/getSellPay'; //预约记录
        this.bindbankApi = '/api/user/upbank'; //银行卡绑定
        this.payApi= '/api/order/order/payment'; //支付
        this.diallistApi = '/api/turntable/getlist';  //转盘奖品
        this.rewardApi = '/api/turntable/getreward';  //奖品

        // 矿机记录
        this.buystutasApi = '/api/order/order/buyStutas'; //抢矿中列表
        this.buystutas2Api = '/api/order/order/buyStutas2'; //抢矿收益中列表
        this.buyappealApi = '/api/order/order/buyAppeal'; //抢矿申诉列表
        
        // 转让记录
        this.sellstatusApi = '/api/order/order/sellStatus'; //待转让列表
        this.sellstatus2Api = '/api/order/order/sellStatus2'; //转让中列表
        this.sellstatus4Api = '/api/order/order/sellStatus4'; //转让完成列表
        this.sellappealApi = '/api/order/order/sellAppeal'; //转让申诉列表
        // 申诉记录
        this.setappealApi = '/api/order/order/setAppeal';  //申诉
        this.buyerApi = '/api/order/order/payment'; //买家信息

        this.contractApi = '/api/order/order/renewContract'; //续约

        this.sellLogApi = '/api/order/sell/getselllog';  //收益出售记录   !!!!暂时不用！！！
        this.setSellApi = '/api/order/sell/setselllog';  //收益出售

        this.applyApi = '/api/wallet/apply'; //提取
        this.applyLogApi = '/api/wallet/lists'; //提取记录
        this.rateApi = '/api/wallet/getRate'; //兑换比例
        this.titleApi = '/api/notice/gettitles';  //公告
        this.noticeDetailApi = '/api/notice/details';  //公告详情

    }

    getTeam(params){
        return  axios.post(this.teamApi,qs.stringify(params)).then((res)=>res.data);
    }
    getPayInfo(params){
        return  axios.get(this.payInfoApi,{params}).then((res)=>res.data);
    }
    getUserCoin(params){
        return  axios.get(this.userCoinApi,{params}).then((res)=>res.data);
    }
    getCoinOrder(params){
        return  axios.get(this.coinOrderApi,{params}).then((res)=>res.data);
    }
    getCoin(params){
        return  axios.post(this.coinApi,qs.stringify(params)).then((res)=>res.data);
    }
    getTransfer(params) {
        return axios.post(this.transferApi,qs.stringify({data:Secret.encrypt(JSON.stringify(params))})).then(res => res.data);
    }
    shaitu(params) {
        return axios.post(this.shaituApi,qs.stringify(params)).then(res => res.data);
    }
    getRechargeInfo(params) {
        return axios.post(this.rechargeInfoApi,qs.stringify(params)).then(res => res.data);
    }
    recharge(params) {
        return axios.post(this.rechargeApi,qs.stringify({data:Secret.encrypt(JSON.stringify(params))})).then(res => res.data);
    }
    getBooklist(params) {
        return axios.get(this.booklistApi,{params}).then(res => res.data);
    }
    getSellInfo(params) {
        return axios.get(this.sellInfoApi,{params}).then(res => res.data);
    }
    bindAli(params) {
        return axios.post(this.bindaliApi,qs.stringify({data:Secret.encrypt(JSON.stringify(params))})).then(res => res.data);
    }
    bindwechat(params) {
        return axios.post(this.bindwechatApi,qs.stringify({data:Secret.encrypt(JSON.stringify(params))})).then(res => res.data);
    }
    getOrder(params) {
        return axios.get(this.orderListApi,{params}).then(res => res.data);
    }
    addBank(params) {
        return axios.post(this.bindbankApi,qs.stringify({data:Secret.encrypt(JSON.stringify(params))})).then(res => res.data);
    }
    buyStutas(params){
        return axios.get(this.buystutasApi,{params}).then(res => res.data);
    }
    buyStutas2(params){
        return axios.get(this.buystutas2Api,{params}).then(res => res.data);
    }
    buyAppeal(params){
        return axios.get(this.buyappealApi,{params}).then(res => res.data);
    }
    sellStatus(params){
        return axios.get(this.sellstatusApi,{params}).then(res => res.data);
    }
    sellStatus2(params){
        return axios.get(this.sellstatus2Api,{params}).then(res => res.data);
    }
    sellStatus4(params){
        return axios.get(this.sellstatus4Api,{params}).then(res => res.data);
    }
    sellAppeal(params){
        return axios.get(this.sellappealApi,{params}).then(res => res.data);
    }
    setAppeal(params){
        return axios.post(this.setappealApi,params).then(res => res.data);
    }
    minePay(params){
        return axios.post(this.payApi,qs.stringify({data:Secret.encrypt(JSON.stringify(params))})).then(res => res.data);
    }
    buyer(params){
        return axios.get(this.buyerApi,{params}).then(res => res.data);
    }
    getDialList(params){
        return axios.get(this.diallistApi,{params}).then(res => res.data);
    }
    getReward(params){
        return axios.get(this.rewardApi,{params}).then(res => res.data);
    }
    contract(params){
        return axios.post(this.contractApi,qs.stringify(params)).then(res => res.data);
    }
    sellLog(){
        return axios.get(this.sellLogApi).then(res => res.data);
    }
    setSell(params){
        return axios.post(this.setSellApi,qs.stringify({data:Secret.encrypt(JSON.stringify(params))})).then(res => res.data);
    }
    apply(params){
        return axios.post(this.applyApi,qs.stringify(params)).then(res => res.data);
    }
    getapplyList(params){
        return axios.get(this.applyLogApi,{params}).then(res => res.data);
    }
    getrate(){
        return axios.get(this.rateApi).then(res => res.data);
    }
    getKjfee(){
        return axios.get(this.kjfeeApi).then(res => res.data);
    }
    getTitle(params){
        return axios.get(this.titleApi,{params}).then(res=>res.data)
    }
    getNoticeDetail(params){
        return axios.get(this.noticeDetailApi,{params}).then(res=>res.data)
    }
}

/**
 *  帮助中心 
 */
export const Help = new class {
    constructor(){
        this.getCategoryListApi = '/api/question/getCategoryList';//全部问题
        this.getAllListApi = '/api/question/getAllList'
        this.getDetailApi = '/api/question/getDetail';//问题详情
        this.getCenterApi = '/api/question/getCenter';
        this.feedbackApi = '/api/question/addFeedback';  //提交问题

    }
    getCategoryList(params) {
        return axios.get(this.getCategoryListApi,{params}).then((res) => res.data)
    }
    getAllList(params) {
        return axios.post(this.getAllListApi,qs.stringify(params)).then((res) => res.data)
    }

    getDetail(params) {
        return axios.post(this.getDetailApi,qs.stringify(params)).then((res) => res.data)
    }
    getCenter(params) {
        return axios.get(this.getCenterApi,{params}).then((res) => res.data)
    }
    addFeedback(params) {
        return axios.post(this.feedbackApi,qs.stringify(params)).then((res) => res.data)
    }
}

/**
 * 主页
 */
export const Index = new class {
    constructor(){
        // this.fa_blockApi = '/api/user/fa_block';  //矿机这也列表
        this.fa_blockApi = '/api/ore/ore/getorelevel';  //矿机这也列表
        this.miningApi = '/api/mining/mining/index';  //抢矿
        this.oreResultApi = '/api/mining/mining/getOreResult';  //抢矿结果
        this.bookingApi = '/api/booking/booking/setBooking';  //预约
        this.countDownApi = '/api/ore/ore/countDown'; //抢矿倒计时
        this.titleApi = '/api/notice/gettitles';  //公告
        this.bannerAPi = '/api/question/getTopImg';   //banner     


    }
    getMine(){
        return axios.get(this.fa_blockApi).then((res) => res.data)
    }
    mining(params){
        return axios.get(this.miningApi,{params}).then((res) => res.data)
    }
    booking(params){
        return axios.get(this.bookingApi,{params}).then((res) => res.data)
    }
    getcountDown(params){
        return axios.post(this.countDownApi,qs.stringify(params)).then(res=>res.data)
    }
    getoreResult(params){
        return axios.post(this.oreResultApi,qs.stringify(params)).then(res=>res.data)
    }
    getTitle(params){
        return axios.get(this.titleApi,{params}).then(res=>res.data)
    }
    getBanner(){
        return axios.post(this.bannerAPi).then(res=>res.data)

    }
}

/**
 * 交易
 */
export const Trade = new class {
    constructor(){
        this.getCategoryApi = '/addons/litestore/api.index/getCategory';  //分类
        this.indexApi = '/addons/litestore/api.index/index';  //商品
        this.bestApi = '/addons/litestore/api.goods/best';  //首页推荐商品
        this.ShowlistApi = '/addons/litestore/api.category/Showlist';  //全部分类
        this.category_listApi = '/addons/litestore/api.goods/category_list';  //分类商品
        this.detailApi = '/addons/litestore/api.goods/detail';  //商品详情
        this.addApi = '/addons/litestore/api.cart/add';  //加入购物车
        this.buyNowApi = '/addons/litestore/api.order/buyNow';  //购买详情
        this.getlistsApi = '/addons/litestore/api.cart/getlists';  //购物车列表
        this.subApi = '/addons/litestore/api.cart/sub';  //购物车减少

        this.listsApi = '/addons/litestore/api.adress/lists';  //收货地址列表
        this.adressApi = '/addons/litestore/api.adress/add';  //添加地址
        this.setdefaultApi = '/addons/litestore/api.adress/setdefault';  //更改默认地址
        this.editApi = '/addons/litestore/api.adress/edit';  //修改收货地址接口
        this.delApi = '/addons/litestore/api.adress/del';  //修改收货地址接口

        this.adressDetailApi = '/addons/litestore/api.adress/detail';  //收货地址列表
        this.buyNow_payApi = '/addons/litestore/api.order/buyNow_pay';  //立即购买——生成订单
        this.cart_payApi = '/addons/litestore/api.order/cart_pay';  //购物车商品——生成订单
        this.yuepayApi = '/addons/litestore/api.order/yuepay';  //购物车商品——生成订单
        this.collectionApi = '/api/log/collection';  //商品收藏列表接口
        this.cbd_listApi = '/addons/litestore/api.my/cbd_list';  //cbd明细
        this.get_jackpotApi = '/addons/litestore/api.my/get_jackpot';  //共燚池
        this.jackpot_listApi = '/addons/litestore/api.my/jackpot_list';  //共燚池明细
        this.infoApi = '/addons/litestore/api.my/index';  //个人信息
        this.experienceApi = '/addons/epay/index/experience';  //微信/支付宝支付接口
        this.collectionBonusApi = '/api/user/collectionBonus';  //收藏/取消收藏
        this.get_frjApi = '/api/user/get_frj';  //个人信息
        this.cbdpayApi = '/addons/litestore/api.order/cbdpay';  //CBD余额接口
        this.cbd_cateApi = '/addons/litestore/api.my/cbd_cate';  //CBD明细类别接口
        this.poolruleApi = '/api/notice/poolrule';  //共燚池规则
        this.notifyxApi = '/addons/epay/index/notifyx';  //现金支付回调测试
        this.cbd_yue_listApi = '/addons/litestore/api.my/cbd_yue_list';  //CBD余额明细接口
        this.deleteApi = '/addons/litestore/api.cart/delete';  //购物车删除接口
        this.gx_num_listApi = '/addons/litestore/api.my/gx_num_list';  //贡献值明细接口
        
    }

    del(params){
        return axios.get(this.delApi,{params}).then(res=>res.data)
    }
    edit(params){
        return axios.post(this.editApi,qs.stringify(params)).then(res=>res.data)
    }
    gx_num_list(params){
        return axios.get(this.gx_num_listApi,{params}).then(res=>res.data)
    }
    deleteCart(params){
        return axios.post(this.deleteApi,qs.stringify(params)).then(res=>res.data)
    }
    cbd_yue_list(params){
        return axios.get(this.cbd_yue_listApi,{params}).then(res=>res.data)
    }
    notifyx(params){
        return axios.get(this.notifyxApi,{params}).then(res=>res.data)
    }
    poolrule(params){
        return axios.get(this.poolruleApi,{params}).then(res=>res.data)
    }
    cbd_cate(params){
        return axios.get(this.cbd_cateApi,{params}).then(res=>res.data)
    }
    cbdpay(params){
        return axios.post(this.cbdpayApi,qs.stringify(params)).then(res=>res.data)
    }
    get_frj(params){
        return axios.get(this.get_frjApi,{params}).then(res=>res.data)
    }
    collectionBonus(params){
        return axios.post(this.collectionBonusApi,qs.stringify(params)).then(res=>res.data)
    }
    experience(params){
        return axios.post(this.experienceApi,qs.stringify(params)).then(res=>res.data)
        // return axios.get(this.experienceApi,{params}).then(res=>res.data)
    }
    info(params){
        return axios.get(this.infoApi,{params}).then(res=>res.data)
    }
    jackpot_list(params){
        return axios.get(this.jackpot_listApi,{params}).then(res=>res.data)
    }
    get_jackpot(params){
        return axios.get(this.get_jackpotApi,{params}).then(res=>res.data)
    }
    cbd_list(params){
        return axios.get(this.cbd_listApi,{params}).then(res=>res.data)
    }
    collection(params){
        return axios.get(this.collectionApi,{params}).then(res=>res.data)
    }
    yuepay(params){
        return axios.post(this.yuepayApi,qs.stringify(params)).then(res=>res.data)
    }
    cart_pay(params){
        return axios.post(this.cart_payApi,qs.stringify(params)).then(res=>res.data)
    }
    buyNow_pay(params){
        return axios.post(this.buyNow_payApi,qs.stringify(params)).then(res=>res.data)
    }
    adressDetail(params){
        return axios.get(this.adressDetailApi,{params}).then(res=>res.data)
    }
    setdefault(params){
        return axios.post(this.setdefaultApi,qs.stringify(params)).then(res=>res.data)
    }
    adress(params){
        return axios.post(this.adressApi,qs.stringify(params)).then(res=>res.data)
    }
    lists(params){
        return axios.get(this.listsApi,{params}).then(res=>res.data)
    }
    sub(params){
        return axios.get(this.subApi,{params}).then(res=>res.data)
    }
    getlists(params){
        return axios.get(this.getlistsApi,{params}).then(res=>res.data)
    }
    buyNow(params){
        return axios.post(this.buyNowApi,qs.stringify(params)).then(res=>res.data)
    }
    add(params){
        return axios.post(this.addApi,qs.stringify(params)).then(res=>res.data)
    }
    detail(params){
        return axios.get(this.detailApi,{params}).then(res=>res.data)
    }
    category_list(params){
        return axios.get(this.category_listApi,{params}).then(res=>res.data)
    }
    Showlist(params){
        return axios.get(this.ShowlistApi,{params}).then(res=>res.data)
    }
    best(params){
        return axios.get(this.bestApi,{params}).then(res=>res.data)
    }
    index(params){
        return axios.get(this.indexApi,{params}).then(res=>res.data)
    }
    getCategory(params){
        return axios.get(this.getCategoryApi,{params}).then(res=>res.data)
    }
}

