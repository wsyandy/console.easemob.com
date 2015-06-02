/**
 * Created by kenshinn on 15-6-2.
 */


//初始开始时间段
//记录当前时间
var nowTime;
var timePikerInput = function(){
    return {
        init:function(){
            //记录计算过后的时间
            var startTime;

            //计算当前时间
            var type = "Y-M-D";
            //获取年-月-日
            var myDate = new Date();
            //年份：如2013
            Y = myDate.getFullYear();
            //月份：如06
            M = myDate.getMonth() + 1 < 10 ? "0" + (myDate.getMonth() + 1) : myDate.getMonth() + 1;
            //日：如15
            D = myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate();
            nowTime = type.replace("Y", Y).replace("M", M).replace("D", D);

            //计算前7天时间
            if (D - 6 <= 0) {
                startTime = new Date(Y, M - 1, D - 6).format('yyyy-MM-dd');
            } else {
                startTime = new Date(Y, M - 1, D - 6).format('yyyy-MM-dd');
            }
            $('#pickerStartDate').val(startTime);
            $('#pickerEndDate').val(nowTime);
        }
    };
}();



// 趋势
var drawChartFunction = function () {
    return {
        draw: function (labels, datas) {
            var data = {
                // 横坐标值
                labels: labels,
                datasets: [
                    {
                        fillColor: "rgba(151,187,205,0.5)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",

                        data:datas
                    }
                ]
            };

            // 渲染
            var countersChartsCtx = $("#countersCharts").get(0).getContext("2d");
            var options = {
                //Boolean - If we show the scale above the chart data
                scaleOverlay : false,

                //Boolean - If we want to override with a hard coded scale
                scaleOverride : false,

                //** Required if scaleOverride is true **
                //Number - The number of steps in a hard coded scale
                scaleSteps : null,

                //Number - The value jump in the hard coded scale
                scaleStepWidth : 20,

                // Y 轴的起始值
                scaleStartValue : null,

                // Y/X轴的颜色
                scaleLineColor : "rgba(0,0,0,.1)",

                // X,Y轴的宽度
                scaleLineWidth : 1,

                // 刻度是否显示标签, 即Y轴上是否显示文字
                scaleShowLabels : true,

                // Y轴上的刻度,即文字
                scaleLabel : "<%=value%>",

                // 字体
                scaleFontFamily : "'Arial'",

                // 文字大小
                scaleFontSize : 12,

                // 文字样式
                scaleFontStyle : "normal",

                // 文字颜色
                scaleFontColor : "#666",

                // 是否显示网格
                scaleShowGridLines : true,

                // 网格颜色
                scaleGridLineColor : "rgba(0,0,0,.05)",

                // 网格宽度
                scaleGridLineWidth : 2,

                // 是否使用贝塞尔曲线? 即:线条是否弯曲
                bezierCurve : false,

                // 是否显示点数
                pointDot : true,

                // 圆点的大小
                pointDotRadius : 4,

                // 圆点的笔触宽度, 即:圆点外层白色大小
                pointDotStrokeWidth : 1,

                // 数据集行程
                datasetStroke : true,

                // 线条的宽度, 即:数据集
                datasetStrokeWidth : 1,

                // 是否填充数据集
                datasetFill : true,

                // 是否执行动画
                animation : true,

                // 动画的时间
                animationSteps : 120,

                // 动画的特效
                animationEasing : "easeOutQuart",

                // 动画完成时的执行函数
                onAnimationComplete : null
            };

            new Chart(countersChartsCtx).Line(data);
            //new Chart(countersChartsCtx).Line(data, options);
        }
    };
}();


// counters 数据按时间段查询
function drawCountersCharts(period) {

    var textStartTime = $("#pickerStartDate").val();
    var textEndTime = $("#pickerEndDate").val();

    var counterName = '';
    if (textStartTime > textEndTime || textStartTime == textEndTime) {
        alert("请重新选择时间，开始时间必须小于结束时间");
        return;
    } else if (textEndTime > nowTime) {
        alert("请重新选择结束日期，结束日期不能大于本日日期");
        return;
    }

    var restStr = '';
    var counterType = $('#drawCountersChartsType').val();

    switch(counterType){
        case 'register_users':
            counterName = 'application.collection.users';
            break;
        case 'daily_active_users':
            counterName = 'daily_active_user';
            break;
        case 'daily_chat_users':
            counterName = 'daily_chat_user';
            break;
        case 'daily_new_active_users':
            counterName = 'daily_new_user';
            break;
        case 'msg_outgoing_chat':
            counterName = 'application.collection.chatmessages';
            restStr = 'direction=outgoing&chat_type=chat';
            break;
        case 'msg_outgoing_groupchat':
            counterName = 'application.collection.chatmessages';
            restStr = 'direction=outgoing&chat_type=groupchat';
            break;
        case 'msg_offline_chat':
            counterName = 'application.collection.chatmessages';
            restStr = 'direction=offline&chat_type=chat';
            break;
        case 'msg_offline_groupchat':
            counterName = 'application.collection.chatmessages';
            restStr = 'direction=offline&chat_type=groupchat';
            break;
        default:
            counterName = '';
            break;
    }

    var type = "Y-M-D";
    if (period == "oneday") {
        //计算当前时间
        endTime = type.replace("Y", Y).replace("M", M).replace("D", D);
        if (D - 1 <= 0) {
            startTime = new Date(Y, M - 1, D - 1).format('yyyy-MM-dd');
        } else {
            startTime = new Date(Y, M - 1, D - 1).format('yyyy-MM-dd');
        }
        company = "六小时";
        restStr = restStr + '&resolution=six_hour';
        $('#pickerStartDate').val(startTime);
        $('#pickerEndDate').val(endTime);
    } else if (period == "sevendays") {
        //计算当前时间
        endTime = type.replace("Y", Y).replace("M", M).replace("D", D);
        if (D - 6 <= 0) {
            startTime = new Date(Y, M - 1, D - 6).format('yyyy-MM-dd');
        } else {
            startTime = new Date(Y, M - 1, D - 6).format('yyyy-MM-dd');
        }
        company = "天";
        restStr = restStr + '&resolution=day';
        $('#pickerStartDate').val(startTime);
        $('#pickerEndDate').val(endTime);
    } else {
        restStr = '&resolution=day';
    }

    var chartDatas = applyCountersData(appUuid, counterName, restStr);
    drawChartFunction.draw(chartDatas.labels, chartDatas.datas);
}



function applyCountersData(appUuid, counterName, restStr) {
    var applyRequest = {
        orgName: $.cookie('orgName'),
        access_token: $.cookie('access_token'),
        appUuid: appUuid,
        start_time: '',
        end_time: '',
        pad: 'false'
    };

    var chartData = {};
    var datas = [], labels = [];

    var startTime = $("#pickerStartDate").val();
    var endTime = $("#pickerEndDate").val();

    //开始时间
    var dt = Date.parse(startTime.replace(/-/g, "/"));
    var startTime1 = new Date(dt);
    var nowtime = startTime1.getTime();
    //结束时间
    var dt1 = Date.parse(endTime.replace(/-/g, "/"));
    var theTime = new Date(dt1);
    var nowtime1 = theTime.getTime();
    applyRequest.start_time = nowtime;
    applyRequest.end_time = nowtime1;

    var tokenStr = applyRequest.access_token;

    var payloadd = {
        'grant_type': 'client_credentials',
        'client_id': '',
        'client_secret': ''
    };

    if (counterName == 'application.collection.chatmessages') {
        // fetch credentials for app
        $.ajax({
            url: baseUrl + '/' + applyRequest.orgName + '/' + applyRequest.appUuid + '/credentials',
            type: 'GET',
            async: false,
            headers: {
                'Authorization': 'Bearer ' + applyRequest.access_token,
                'Content-Type': 'application/json'
            },
            error: function (jqXHR, textStatus, errorThrown) {
            },
            success: function (respData, textStatus, jqXHR) {
                payloadd.client_id = respData.credentials.client_id;
                payloadd.client_secret = respData.credentials.client_secret;
            }
        });

        // fetch apptoken
        $.ajax({
            url: baseUrl + '/' + applyRequest.orgName + '/' + applyRequest.appUuid + '/token',
            type: 'POST',
            async: false,
            data: JSON.stringify(payloadd),
            headers: {
                'Content-Type': 'application/json'
            },
            crossDomain: true,
            error: function (respData, textStatus, errorThrown) {
            },
            success: function (respData, textStatus, jqXHR) {
                tokenStr = respData.access_token;
            }
        });
    }

    // fetch counters
    $.ajax({
        url: baseUrl + '/' + applyRequest.orgName + '/' + applyRequest.appUuid + '/counters?counter=' + counterName + '&start_time=' + applyRequest.start_time + '&end_time=' + applyRequest.end_time + '&pad=' + applyRequest.pad + restStr,
        type: 'GET',
        async: false,
        headers: {
            'Authorization': 'Bearer ' + tokenStr,
            'Content-Type': 'application/json'
        },
        success: function (respData, textStatus, jqXHR) {
            $.each(respData.counters, function () {
                if (this.values.length == 0) {
                    labels.push(0);
                    datas.push(0);
                } else {
                    $.each(this.values, function () {
                        labels.push(format1(this.timestamp));
                        datas.push(this.value);
                    });
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('提示\n\n数据获取失败!');
        }
    });

    chartData.labels = labels;
    chartData.datas = datas;

    return chartData;
}


function format1(timeST) {
    return date('Y-m-d', timeST);
}