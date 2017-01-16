/**
 * Created by Administrator on 2016/12/5 0005.
 */
require.config({
    path:{
        'angular':'angular',
        'angular-route':'angular-route',
        'app':'app'
    },
    shim:{
        'angular' : { exports: 'angular' },
        'angular-route': { deps: ['angular'] }
    }
})
require(['angular','angular-route'],function (angular){
    console.log(angular.version)
})

require(['app'],function (app) {


})