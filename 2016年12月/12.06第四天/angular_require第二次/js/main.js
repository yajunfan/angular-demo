/**
 * Created by Administrator on 2016/12/6 0006.
 */
require.config({
    paths:{
        'jquery':'jquery.min',
        'angular':'angular',
        'angular-route':'angular-route',
        'ng-grid':'ng-grid',
        'test1':'test1',
        'app':'app'
    },
    shim:{
        'angular' : { exports: 'angular'},
        'angular-route': { deps: ['angular'],exports: 'angularRouter'},
        'ng-grid':{deps:['angular','jquery'],exports: 'ngGrid'}
    }
});
require(['app'],function () {
    function add(x,y) {
        return x+y
    }
    console.log(add(2,3))

})


