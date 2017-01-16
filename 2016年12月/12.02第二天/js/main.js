/**
 * Created by Administrator on 2016/12/2 0002.
 */

require.config({
    paths:{
        "jquery":"jquery.min",
          a:"a",
         b:"b"
    }
})
require(['jquery',"a","b"],function($,a,b){
    console.log($("#div1"))
    console.log(b.fo())

})
