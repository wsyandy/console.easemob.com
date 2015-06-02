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
                scaleStepWidth : null,
                //Number - The scale starting value
                scaleStartValue : null,

                //String - Colour of the scale line
                scaleLineColor : "rgba(0,0,0,.1)",

                //Number - Pixel width of the scale line
                scaleLineWidth : 1,

                //Boolean - Whether to show labels on the scale
                scaleShowLabels : true,

                //Interpolated JS string - can access value
                scaleLabel : "<%=value%>",

                //String - Scale label font declaration for the scale label
                scaleFontFamily : "'Arial'",

                //Number - Scale label font size in pixels
                scaleFontSize : 12,

                //String - Scale label font weight style
                scaleFontStyle : "normal",

                //String - Scale label font colour
                scaleFontColor : "#666",

                ///Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines : true,

                //String - Colour of the grid lines
                scaleGridLineColor : "rgba(0,0,0,.05)",

                //Number - Width of the grid lines
                scaleGridLineWidth : 1,

                //Boolean - Whether the line is curved between points
                bezierCurve : false,

                //Boolean - Whether to show a dot for each point
                pointDot : true,

                //Number - Radius of each point dot in pixels
                pointDotRadius : 3,

                //Number - Pixel width of point dot stroke
                pointDotStrokeWidth : 1,

                //Boolean - Whether to show a stroke for datasets
                datasetStroke : true,

                //Number - Pixel width of dataset stroke
                datasetStrokeWidth : 2,

                //Boolean - Whether to fill the dataset with a colour
                datasetFill : true,

                //Boolean - Whether to animate the chart
                animation : true,

                //Number - Number of animation steps
                animationSteps : 60,

                //String - Animation easing effect
                animationEasing : "easeOutQuart",

                //Function - Fires when the animation is complete
                onAnimationComplete : null
            };

            new Chart(countersChartsCtx).Line(data, options);
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