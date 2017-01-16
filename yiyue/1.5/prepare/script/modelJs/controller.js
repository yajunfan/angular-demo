/**
 * Created by Administrator on 2017/1/4 0004.
 */
define(['jquery', "angular", "angular-route", "angular-ui-router", "ng-grid", 'angular-animate'], function ($, angular) {
    var ruleCtrlMod = angular.module('ruleCtrlMod', ['ngGrid']);
    ruleCtrlMod.controller('loginCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
        $scope.login = function () {
            $scope.userInfo = {
                name: $scope.user_name,
                password: $scope.user_password
            };
            $scope.user = [{"email": "fyj@163.com", "password": "qwer00"}];
            angular.forEach($scope.user, function (item) {
                if (item.email == $scope.userInfo.name && item.password == $scope.userInfo.password) {
                    $('.wrapContainer').fadeOut('slow', function () {
                        $state.go('homePage', {creditGroup: 1});
                    });

                    return;
                }
                alert('请先注册')
            })
        }
    }]);
    ruleCtrlMod.controller('myMenu', ['$scope', '$http', '$state', function ($scope, $http, $state) {
        $scope.shrinkage = function () {
            if (parseFloat($('.ribbon').css('left')) == 0) {
                $('.ribbon').css({"left": "-1050px", "transition": "0.5s all"});
                $('.arrow span').removeClass('off').addClass('on');
            } else {
                $('.ribbon').css({"left": "0px", "transition": "0.5s all"});
                $('.arrow span').removeClass('on').addClass('off');
            }
        };

    }]);
    ruleCtrlMod.controller('myContent', ['$scope', '$http', '$state', '$stateParams', '$rootScope', function ($scope, $http, $state, $stateParams, $rootScope) {

        function getNowFormatDate() {
            var date = new Date();
            var seperator1 = ".";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
            return currentdate;
        }
        $scope.show=function () {
            $('.fraudScore ul.first li.more').css("display","none");
            $('.fraudScore ul.two').show('slow');
        };
        $scope.blank=function () {
            $('.fraudScore ul.first li.more').css("display","block");
            $('.fraudScore ul.two').hide('slow');
        };
        $scope.close=function () {
            $('.modelReport').hide('slow');
        };
        // $scope.flag=true;
        $oDiv=$('.setting div');
        $oDiv.each(function (index) {
           $(this).on('click',function () {
               $oDiv.each(function (index) {
                   $(this).css({"background":"#adadad","box-shadow": "2px 2px 2px darkgrey"});

               });
               $(this).css({"background":"#6263ff","box-shadow": "2px 2px 2px blue"});
           })
        });


        var aa = $stateParams.creditGroup;
        //0:未审核；1：通过 2：拒绝
        $http.get('./data/daiqian' + aa + ".json").success(function (data) {
            $scope.infos = angular.fromJson(data);
            $scope.infoss = angular.fromJson(data);
            $scope.persons=angular.fromJson(data);

            //console.log($scope.infos);//这是一个数组，数组中有三组数据，这是表示当前这个路由的三组数据，包括日期时间和data
            $scope.arySuccess = [];
            $scope.aryReject = [];
            $scope.aryNo = [];
            $scope.didi = [];
            $scope.objDidi = {};
            $scope.objPingan = {};
            $scope.objYixin = {};
            $scope.pingan = [];
            $scope.yixin = [];
            for (var i = 0; i < $scope.infos.length; i++) {
                for (j = 0; j < $scope.infos[i].data.length; j++) {
                    if ($scope.infos[i].data[j].company == "滴滴") {
                        //现在已经获取到各自的对应的日期下的数据，但是同一个日期的不在一起，怎么把一个日期下的进行合并
                        $scope.objDidi[j] = {};
                        $scope.objDidi[j].data = [];
                        $scope.objDidi[j].date = $scope.infos[i].date;
                        if ($scope.objDidi[j].date == $scope.infos[i].date) {
                            $scope.objDidi[j].data.push($scope.infos[i].data[j]);
                            $scope.didi.push($scope.objDidi[j]);
                        }
                    } else if ($scope.infos[i].data[j].company == "平安") {
                        $scope.objPingan[j] = {};
                        $scope.objPingan[j].data = [];
                        $scope.objPingan[j].date = $scope.infos[i].date;
                        if ($scope.objPingan[j].date == $scope.infos[i].date) {
                            $scope.objPingan[j].data.push($scope.infos[i].data[j]);
                            $scope.pingan.push($scope.objPingan[j]);
                        }

                    } else if ($scope.infos[i].data[j].company == "宜信") {
                        $scope.objYixin[j] = {};
                        $scope.objYixin[j].data = [];
                        $scope.objYixin[j].date = $scope.infos[i].date;
                        if ($scope.objYixin[j].date == $scope.infos[i].date) {
                            $scope.objYixin[j].data.push($scope.infos[i].data[j]);
                            $scope.yixin.push($scope.objYixin[j]);
                        }
                    }
                }
            }
            $scope.changervar = function () {
                if ($scope.model1 == "滴滴") {
                    $scope.infos = $scope.didi;
                } else if ($scope.model1 == "平安") {
                    $scope.infos = $scope.pingan;
                } else if ($scope.model1 == "宜信") {
                    $scope.infos = $scope.yixin;
                } else if (!$scope.model1) {
                    $scope.infos = $scope.infoss;
                }
                for (var m = 0; m < $scope.infos.length; m++) {
                    //这个数组中包括四个对象，对象中有日期和data
                    //对四个对象中的日期进行比较，当比较相同的时候，后面的这个对象中的数据给前面的这个，并且后面您的这个对象清空
                    for (var n = m + 1; n < $scope.infos.length; n++) {
                        if ($scope.infos[m].date == $scope.infos[n].date) {
                            $scope.infos[m].data.push($scope.infos[n].data[0]);
                            $scope.infos.splice(n, 1);
                            n--;
                        }
                    }


                }

                // for(var i=0;i<$scope.infos.length;i++){
                //
                //
                // }

                $('.selectType input').click(function (e) {
                    e=e||window.event;
                    for (var i = 0; i < $scope.infos.length; i++) {
                        var curLists = $scope.infos[i];
                        for (var j = 0; j < curLists.data.length; j++) {
                            var curList = curLists.data[j];
                            if ($(e.target).val() == "未审核") {
                                if (curList.check !== "0") {
                                    curLists.data.splice(j, 1);
                                }
                            } else if ($(e.target).val() == "通过") {
                                if (curList.check !== "1") {
                                    curLists.data.splice(j, 1);
                                }
                            }else if($(e.target).val() == "拒绝"){
                                if (curList.check !== "2") {
                                    curLists.data.splice(j, 1);
                                }
                            }
                        }
                    }
                });
            };



            angular.forEach($scope.infos, function (items) { //表示这个路由下的每一组数据,包括日期和这个日期下的这组data的这组数据；
                $scope.aryLists = items;
                // console.log($scope.aryLists);


                angular.forEach($scope.aryLists.data, function (item) {
                    //对当前的路由中的每一组数据进行遍历循环,这组数据包括日期和当前的全部data
                    // console.log(item)
                    if (parseFloat(item.check) == 1) {
                        $scope.arySuccess.push(item);

                        $(".firstRow .mark").css('background', 'lightgreen');
                    } else if (item.check == 2) {
                        $scope.aryReject.push(item);
                        $(".firstRow ul li i").css('background', 'red');
                    } else {
                        $scope.aryNo.push(item);
                        $(".firstRow ul li i").css('background', 'yellow');
                    }


                });

            });
            $scope.s = $scope.arySuccess.length;
            $scope.r = $scope.aryReject.length;
            $scope.n = $scope.aryNo.length;

        });

        $scope.names = ['滴滴', '宜信', '平安'];
        $scope.clear = function () {
            $scope.input1 = "";
        };
        if (aa == "1") {
            $rootScope.datas = "贷前审核";
        } else if (aa == "2") {
            $rootScope.datas = "贷中跟踪";
        } else if (aa == "3") {
            $rootScope.datas = "逾期催款";
        }
       $scope.modelReport=function () {
            $scope.person=$(this)[0]["aa"];
           $('.modelReport').show('slow');
       };
        // $scope.flag=true;

    }]).directive('aI', function () {
        return {
            restrict: "ECMA",
            link: function (scope, element, attrs) {
                if (attrs.x == "0") {
                    element.css("background", "yellow")
                } else if (attrs.x == "1") {
                    element.css("background", "lightgreen")
                } else if (attrs.x == "2") {
                    element.css("background", "red")
                }
            }
        }
    })
});