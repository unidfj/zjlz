import Vue from 'vue';
import Router from 'vue-router';
import { Util } from '@/assets/commonjs/utils.js';
// import store from '../store/index';
// import { resolve } from 'url';

const notFoundPage = () => import('@/views/404Page');
const Welcome = () => import('@/views/welcome');
const UploadWgt = () => import('@/views/uploadWgt');




//淘金区
const PanGold = () => import('@/views/pan-gold/index.vue');
const Service = () => import('@/views/service/index.vue');
const Share=()=>import('@/views/share/index.vue');
const Interaction=()=>import('@/views/interaction/index.vue');
const Transaction=()=>import('@/views/transaction/index.vue');

const My = () => import('@/views/my/index.vue');

const ApplyUse = () => import('@/views/interaction/applyUse.vue');
const QueryDetails = () => import('@/views/interaction/queryDetails.vue');
const RechargeRar = () => import('@/views/interaction/rechargeRar.vue');



// 淘金区模块  --start

const StartMining = resolve => require(['@/views/pan-gold/start-mining.vue'], resolve)
const BuyResule = resolve => require(['@/views/pan-gold/buy-result.vue'], resolve)
//申诉
const Appeal = resolve => require(['@/views/pan-gold/appeal.vue'], resolve)
const NoticeDetail = resolve => require(['@/views/pan-gold/noticeDetail.vue'], resolve)
const Notice = resolve => require(['@/views/pan-gold/notice.vue'], resolve)
const pDetail = resolve => require(['@/views/pan-gold/detail.vue'], resolve)
const pOrder = resolve => require(['@/views/pan-gold/order.vue'], resolve)
const Type = resolve => require(['@/views/pan-gold/type.vue'], resolve)
const List = resolve => require(['@/views/pan-gold/list.vue'], resolve)
const Cart = resolve => require(['@/views/pan-gold/cart.vue'], resolve)
// 淘金区模块  --end


//客服中心
const Customer = resolve => require(['@/views/service/customer.vue'], resolve)
const Help = resolve => require(['@/views/service/help.vue'], resolve)
const Problem = resolve => require(['@/views/service/problem.vue'], resolve)
const QuestionDetails = resolve => require(['@/views/service/question-details.vue'], resolve)
const QuestionList = resolve => require(['@/views/service/question-list.vue'], resolve)


// 服务  ----start

// 服务  ----end



// 我的  --start
const Bestpeak = resolve => require(['@/views/my/record/bestpeak.vue'], resolve);
const Mine = resolve => require(['@/views/my/record/mine.vue'], resolve);
const Attorn = resolve => require(['@/views/my/record/attorn.vue'], resolve);
const Detail = resolve => require(['@/views/my/record/detail.vue'], resolve);
const Invite = resolve => require(['@/views/my/nav/invite.vue'], resolve);
const Certify = resolve => require(['@/views/my/nav/certify.vue'], resolve);
const PayInfo = resolve => require(['@/views/my/nav/pay/index.vue'], resolve);
const AddCard = resolve => require(['@/views/my/nav/pay/add-card.vue'], resolve);
const Bind = resolve => require(['@/views/my/nav/pay/bind.vue'], resolve);
const Team = resolve => require(['@/views/my/nav/team/index.vue'], resolve);
const TeamList = resolve => require(['@/views/my/nav/team/team-list.vue'], resolve);
const Set = resolve => require(['@/views/my/set.vue'], resolve);
const ShaiTu = resolve => require(['@/views/my/shaitu.vue'], resolve);
const Dial = resolve => require(['@/views/my/dial.vue'], resolve);
const BlockMine = resolve => require(['@/views/my/middle/block-mine.vue'], resolve);
const Extract = resolve => require(['@/views/my/middle/extract.vue'], resolve);
const ExtractRecord = resolve => require(['@/views/my/middle/extract-record.vue'], resolve)
const MiningMachine = resolve => require(['@/views/my/middle/mining-machine.vue'], resolve)
const TurnOut = resolve => require(['@/views/my/middle/turn-out.vue'], resolve)
const Recharge = resolve => require(['@/views/my/middle/recharge.vue'], resolve)
const CheckUpdate = resolve => require(['@/views/my/checkUpdate.vue'], resolve)
const Chi = resolve => require(['@/views/my/chi.vue'], resolve)
const Chi2 = resolve => require(['@/views/my/chi2.vue'], resolve)
const Contribution = resolve => require(['@/views/my/contribution.vue'], resolve)
const Address = resolve => require(['@/views/my/address.vue'], resolve)
const Add = resolve => require(['@/views/my/addAddress.vue'], resolve)
const TransactionOrder = resolve => require(['@/views/my/transactionOrder.vue'], resolve)
const OrderNew = resolve => require(['@/views/my/orderNew.vue'], resolve)
const OrderPayment = resolve => require(['@/views/my/orderPayment.vue'], resolve)
const OrderWaitFor = resolve => require(['@/views/my/orderWaitFor.vue'], resolve)
const OrderType = resolve => require(['@/views/my/orderType.vue'], resolve)
const Collection = resolve => require(['@/views/my/collection.vue'], resolve)
const cDetail = resolve => require(['@/views/my/cDetail.vue'], resolve)
const cbdDetail = resolve => require(['@/views/my/cbdDetail.vue'], resolve)
const CBD = resolve => require(['@/views/my/cbd.vue'], resolve)

// 我的  --end


// 用户相关  -start
const SetPwd = resolve => require(['@/views/init/set-pwd.vue'], resolve);
const Login = resolve => require(['@/views/init/login.vue'], resolve);
const BackPwd = resolve => require(['@/views/init/back-pwd.vue'], resolve);
const Register = resolve => require(['@/views/init/register.vue'], resolve); 

const BuyBill = resolve => require(['@/views/transaction/buyBill.vue'], resolve);
const TD = resolve => require(['@/views/transaction/tOrder.vue'], resolve);
const tDetail = resolve => require(['@/views/transaction/detail.vue'], resolve);
const myOrder = resolve => require(['@/views/transaction/myOrder.vue'], resolve);
const myDetail = resolve => require(['@/views/transaction/myDetail.vue'], resolve);

// 用户相关  -end

// 下载
const Download = resolve => require(['@/views/download.vue'], resolve)



Vue.use(Router);
let routes = [
    {
        path: '/',
        redirect: { name: 'PanGold' }
    },
    {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome
    },
    {
        path: '/uploadwgt',
        name: 'UploadWgt',
        component: UploadWgt
    },
    {
        path: '/applyUse',
        name: 'ApplyUse',
        component: ApplyUse
    },
    {
        path: '/transaction/buyBill',
        name: 'BuyBill',
        component: BuyBill
    },
    {
        path: '/transaction/td',
        name: 'TD',
        component: TD
    },
    {
        path: '/transaction/detail',
        name: 'tDetail',
        component: tDetail
    },
    {
        path: '/transaction/myOrder',
        name: 'myOrder',
        component: myOrder
    },
    {
        path: '/transaction/myDetail',
        name: 'myDetail',
        component: myDetail
    },
    {
        path: '/my/transactionOrder',
        name: 'TransactionOrder',
        component: TransactionOrder
    },
    {
        path: '/my/orderType',
        name: 'OrderType',
        component: OrderType
    },
    {
        path: '/my/cbdDetail',
        name: 'cbdDetail',
        component: cbdDetail
    },
    {
        path: '/my/cDetail',
        name: 'cDetail',
        component: cDetail
    },
    {
        path: '/my/collection',
        name: 'Collection',
        component: Collection
    },
    {
        path: '/my/cbd',
        name: 'CBD',
        component: CBD
    },

    {
        path: '/my/orderPayment',
        name: 'OrderPayment',
        component: OrderPayment
    },
    {
        path: '/my/orderWaitFor',
        name: 'OrderWaitFor',
        component: OrderWaitFor
    },




    // {
    //     name:'Share',
    //     component:Share
    // },
    // {
    //     path:'/interaction',
    //     name:'Interaction',
    //     component:Interaction
    // },
    // {
    //     path:'/transaction',
    //     name:'Transaction',
    //     component:Transaction
    // },
    {
        path:'/pan-gold',
        name:'PanGold',
        component:PanGold
    },
    
    {
        path:'/my/orderNew',
        name: 'OrderNew',
        component: OrderNew
    },
    {
        path: '/rechargeRar',
        name: 'RechargeRar',
        component: RechargeRar
    },

    {
        path: '/queryDetails',
        name: 'QueryDetails',
        component: QueryDetails
    },

    //淘金区
    {
        path: '/pan-gold',
        name: 'PanGold',
        component: PanGold
    },
    {

        path: '/transaction',
        name: 'Transaction',
        component: Transaction
    },
    {

        path: '/share',
        name: 'Share',
        component: Share
    },
    {

        path: '/interaction',
        name: 'Interaction',
        component: Interaction
    },
    {
        path: '/service',
        name: 'Service',
        component: Service
    },
    {
        path: '/my',
        name: 'My',
        component: My
    },
    {
        path: '/bestpeak',
        name: 'Bestpeak',
        component: Bestpeak
    },
    {
        path: '/mine',
        name: 'Mine',
        component: Mine
    },
    {
        path: '/attorn',
        name: 'Attorn',
        component: Attorn
    },
    {
        path: '/detail',
        name: 'Detail',
        component: Detail
    },
    {
        path: '/invite',
        name: 'Invite',
        component: Invite
    },
    {
        path: '/certify',
        name: 'Certify',
        component: Certify
    },
    {
        path: '/payinfo',
        name: 'PayInfo',
        component: PayInfo
    },
    {
        path: '/addcard',
        name: 'AddCard',
        component: AddCard
    },
    {
        path: '/team',
        name: 'Team',
        component: Team
    },
    {
        path: '/teamlist',
        name: 'TeamList',
        component: TeamList
    },
    {
        path: '/bind/:type',
        name: 'Bind',
        component: Bind
    },
    {
        path: '/set',
        name: 'Set',
        component: Set
    },
    {
        path: '/setpwd',
        name: 'SetPwd',
        component: SetPwd
    },
    {
        path: '/shaitu',
        name: 'ShaiTu',
        component: ShaiTu
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/backpwd',
        name: 'BackPwd',
        component: BackPwd
    },
 
     
    {
        // path: '/register/:id/:mobile',
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/dial',
        name: 'Dial',
        component: Dial
    },
    {
        path: '/my/middle/block-mine',
        name: 'BlockMine',
        component: BlockMine
    },
    {
        path: '/my/middle/extract',
        name: 'Extract',
        component: Extract
    },
    {
        path: '/my/middle/extract-record',
        name: 'ExtractRecord',
        component: ExtractRecord
    },
    {
        path: '/my/middle/mining-machine',
        name: 'MiningMachine',
        component: MiningMachine
    },
    {
        path: '/my/middle/turn-out',
        name: 'TurnOut',
        component: TurnOut
    },
    {
        path: '/my/middle/recharge',
        name: 'Recharge',
        component: Recharge
    },
    {
        path: '/pan-gold/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/pan-gold/notice',
        name: 'Notice',
        component: Notice
    },
    {
        path: '/pan-gold/noticeDetail/:id',
        name: "NoticeDetail",
        component: NoticeDetail
    },
    {
        path: '/pan-gold/detail',
        name: "pDetail",
        component: pDetail
    },
    {
        path: '/pan-gold/type',
        name: "Type",
        component: Type
    },
    {
        path: '/pan-gold/list',
        name: "List",
        component: List
    },
    {
        path: '/my/chi',
        name: "Chi",
        component: Chi
    },
    {
        path: '/my/chi2',
        name: "Chi2",
        component: Chi2
    },
    {
        path: '/my/contribution',
        name: "Contribution",
        component: Contribution
    },
    {
        path: '/my/address',
        name: "Address",
        component: Address
    },
    {
        path: '/my/add',
        name: "Add",
        component: Add
    },
    {
        path: '/pan-gold/order',
        name: "pOrder",
        component: pOrder
    },
    {
        path: '/my/checkupdate',
        name: "CheckUpdate",
        component: CheckUpdate
    },



    // 淘金区模块  --start
    {
        path: '/pan-gold/start-mining/:level',
        name: 'StartMining',
        component: StartMining
    },
    {
        path: '/pan-gold/buy-result',
        name: 'BuyResule',
        component: BuyResule
    },
    {
        path: '/pan-gold/appeal',
        name: "Appeal",
        component: Appeal
    },


    //客服中心
    {
        path: '/service/customer',
        name: 'Customer',
        component: Customer
    },
    {
        path: '/service/help',
        name: 'Help',
        component: Help
    },
    {
        path: '/service/problem',
        name: 'Problem',
        component: Problem
    },
    {
        path: '/service/question-details',
        name: 'QuestionDetails',
        component: QuestionDetails
    },
    {
        path: '/service/question-list',
        name: 'QuestionList',
        component: QuestionList
    },

    {
        path: '/download',
        name: 'Download',
        component: Download
    },
    {
        path: '*',
        name: '404Page',
        component: notFoundPage
    }
];
// routes = routes.concat(myCenterRouter);

let router = new Router({
    mode: "hash",
    routes: routes
});
router.beforeEach((to, from, next) => {
    if (localStorage.getItem('cookie')) {
        if (Util.isWhite(to.name)) {
            if (to.name == 'Login') {
                next({ name: 'PanGold' })
            } else {
                next({ name: from.name });
            }
        } else {
            next();
        }
    } else {
        if (Util.isWhite(to.name)) {
            next();
        } else {
            next({ name: 'Login' });
            // next({name:'Welcome'});
        }
    }
});

// router.beforeEach((to,from,next)=>{
//     if(localStorage.getItem('vip') ||to.name =='Login'){
//         next()
//     }else {
//         next({name:'Login'});
//     }
// });
export default router;
