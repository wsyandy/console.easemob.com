/**
 * Created by kenshinn on 15-6-10.
 */

// 创建应用表单校验
function createAppFormValidate(){
    // 表单校验
    var appName = $('#appName').val();
    var nick = $('#nick').val();
    var appDesc = $('#appDesc').val();

    if('' == appName){
        $('#appNameMsg').text('应用名不能为空！');
        $('#appNameMsg').css('color','red');
        $('#appName').focus();
        return false;
    }
    var appNameRegex = /^[0-9a-zA-Z\-]*$/;
    if(!appNameRegex.test(appName)){
        $('#appNameMsg').text('作为环信体系中的一个app唯一标识,只能是字母,数字或字母数字组合!');
        $('#appNameMsg').css('color','red');
        $('#appName').focus();
        return false;
    }
    $('#appNameMsg').text('输入正确！');
    $('#appNameMsg').css('color','blue');

    if('' == nick){
        $('#nickMsg').text('产品名称不能为空！');
        $('#nickMsg').css('color','red');
        $('#nick').focus();
        return false;
    }
    var nickRegex = /^[0-9a-zA-Z-_\u4e00-\u9faf]*$/;
    if(!nickRegex.test(nick)){
        $('#nickMsg').text('您的这款app对应的产品叫什么? 只能是汉字,字母,数字、横线、下划线及其组合!');
        $('#nickMsg').css('color','red');
        $('#nick').focus();
        return false;
    }
    $('#nickMsg').text('输入正确！');
    $('#nickMsg').css('color','blue');

    if('' == appDesc){
        $('#appDescMsg').text('应用描述不能为空！');
        $('#appDescMsg').css('color','red');
        $('#appDesc').focus();
        return false;
    }
    var appDescReg = /^[0-9a-zA-Z,.?。，？、\/'":\u4e00-\u9faf]{0,100}$/;
    if(!appDescReg.test(appDesc)){
        $('#appDescMsg').text('应用描述只能输入字母，数字或者汉字,字数在一百字以内!');
        $('#appDescMsg').css('color','red');
        $('#appDesc').focus();
        return false;
    }

    $('#appDescMsg').text('输入正确！');
    $('#appDescMsg').css('color','blue');

    return true;
}

// 创建app
function saveNewApp(){
    // get org admin token
    var access_token = $.cookie('access_token');
    var cuser = $.cookie('cuser');
    var orgName = $.cookie('orgName');
    var appname = $('#appName').val();
    var allow_open_registration = $('input[name="allow_open_registration"]:checked').val();
    var appDesc = $('#appDesc').val();

    var dataBody = {
        'name':appname,
        'allow_open_registration':allow_open_registration,
        'appDesc':appDesc
    };

    if(!access_token || access_token==''){
        alert('提示\n\n会话已失效,请重新登录!');
        window.location.href = 'index.html';
    } else {
        if(createAppFormValidate()){
            // 保存数据
            $.ajax({
                url:baseUrl+'/management/organizations/'+ orgName +'/applications',
                type:'POST',
                headers:{
                    'Authorization':'Bearer '+access_token,
                    'Content-Type':'application/json'
                },
                data:JSON.stringify(dataBody),
                error: function(jqXHR, textStatus, errorThrown) {
                    alert('提示\n\n应用创建失败!\n更换应用名?');
                },
                success: function(respData, textStatus, jqXHR) {
                    alert('app创建成功!');
                    $(respData.entities).each(function(){
                        window.location.href = 'app_profile.html?appUuid=' + this.uuid;
                    });
                }
            });
        }
    }
}


// 获取app列表
function getAppList(){
    // get org admin token
    var access_token = $.cookie('access_token');
    var cuser = $.cookie('cuser');
    var orgName = $.cookie('orgName');
    userCount = 0;
    if(!access_token || access_token=='') {
        alert('提示\n\n会话已失效,请重新登录!');
        window.location.href = 'index.html';
    } else {
        var loading = '<tr id="tr_loading"><td class="text-center" colspan="9"><img src ="assets/img/loading.gif">&nbsp;&nbsp;&nbsp;<span>正在读取数据...</span></td></tr>';
        $('#appListBody').empty();
        $('#appListBody').append(loading);
        $.ajax({
            url:baseUrl+'/management/organizations/'+ orgName +'/applications',
            type:'GET',
            crossDomain:true,
            headers:{
                'Authorization':'Bearer '+access_token,
                'Content-Type':'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
            },
            success: function(respData, textStatus, jqXHR) {
                var appData = jQuery.parseJSON(JSON.stringify(respData.data));
                var uuidArr = [];
                var nameArr = [];
                var option = '';
                $.each(appData, function(key,value){
                    nameArr.push(key);
                    uuidArr.push(value);
                    key = key.substring(key.indexOf('/')+1);
                    userCount = 0;
                    $.ajax({
                        url:baseUrl+'/'+ orgName +'/' + value + '/counters?counter=application.collection.users&pad=true',
                        type:'GET',
                        async:false,
                        headers:{
                            'Authorization':'Bearer '+access_token,
                            'Content-Type':'application/json'
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                        },
                        success: function(respData, textStatus, jqXHR) {
                            $.each(respData.counters, function(){
                                if(this.values.lenght == 0){
                                    userCount = 0;
                                } else {
                                    $.each(this.values,function(){
                                        var userValue = parseInt(this.value);
                                        if(userValue < 0){
                                            userValue = 0;
                                        }
                                        userCount = userValue;
                                    });
                                }
                            });
                        }
                    });

                    option += '<tr><td class="text-center"><a href="app_profile.html?appUuid='+key+'&Application='+key+'">'+key+'</a></td>'+
                        '<td class="text-center">'+userCount+'</td>'+
                        '<td class="text-center">上线运行中</td>'+
                        '</tr>';

                });
                $('#tr_loading').remove();
                $('#appListBody').append(option);
                // 无数据
                var tbody = document.getElementsByTagName("tbody")[0];
                if(!tbody.hasChildNodes()){
                    var option = '<tr><td class="text-center" colspan="7">无数据!</td></tr>';
                    $('#appListBody').append(option);
                }
            }
        });
    }
}


// 获取app详情
function getAppProfile(appUuid){
    // 获取token
    var access_token = $.cookie('access_token');
    var cuser = $.cookie('cuser');
    var orgName = $.cookie('orgName');
    if(!access_token || access_token==''){
        alert('提示\n\n会话已失效,请重新登录!');
        window.location.href = 'index.html';
    } else {
        // 获取app基本信息
        $.ajax({
            url:baseUrl + '/management/organizations/' + orgName + '/applications/' + appUuid,
            type:'GET',
            headers:{
                'Authorization':'Bearer ' + access_token,
                'Content-Type':'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
            },
            success: function(respData, textStatus, jqXHR) {
                $(respData.entities).each(function(){
                    var uuid = this.uuid;
                    var name = this.name;
                    var created = format(this.created);
                    var modified = format(this.modified);
                    var applicationName = this.applicationName;
                    var organizationName = this.organizationName;
                    var allowOpen = this.allow_open_registration?'开放注册':'授权注册';
                    var tag = this.allow_open_registration?'0':'1';
                    var image_thumbnail_width = '170';
                    if(this.image_thumbnail_width != null && this.image_thumbnail_width != undefined){
                        image_thumbnail_width = this.image_thumbnail_width;
                    }
                    var image_thumbnail_height = '170';
                    if(this.image_thumbnail_height != null && this.image_thumbnail_height!= undefined){
                        image_thumbnail_height=this.image_thumbnail_height;
                    }
                    $('#appKey').text(organizationName+'#'+applicationName);
                    $('#xmlandroidAppkey').text(organizationName+'#'+applicationName);
                    $('#created').text(created);
                    $('#modified').text(modified);
                    $('#allowOpen').text(allowOpen);
                    $('#allowOpenHdd').val(tag);
                    $('#image_thumbnail_width').text(image_thumbnail_width+'px');
                    $('#image_thumbnail_height').text(image_thumbnail_height+'px');
                    $('#imageHeightHide').val(image_thumbnail_width);
                    $('#imageWidthHide').val(image_thumbnail_height);
                });

                $('#showName').text(respData.applicationName);
            }
        });

        $.ajax({
            url: baseUrl + '/' + orgName + '/' + appUuid + '/credentials',
            type:'GET',
            headers:{
                'Authorization':'Bearer ' + access_token,
                'Content-Type':'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
            },
            success: function(respData, textStatus, jqXHR) {
                $('#client_id').text(respData.credentials.client_id);
                $('#client_secret').text(respData.credentials.client_secret);
            }
        });

    }
}





//修改缩略图大小
function updateImage(appUuid){
    var access_token = $.cookie('access_token');
    var cuser = $.cookie('cuser');
    var orgName = $.cookie('orgName');
    var imgReg =  /^[0-9]*$/;
    var imgwidth = $('#imageWidth').val();
    var imgheight = $('#imageHeight').val();

    if(imgwidth == ''){
        $('#imageWidthSpan').text('缩略图高度不能为空!');
        return;
    }
    if(imgheight == ''){
        $('#imageHeightSpan').text('缩略图长度不能为空!');
        return;
    }

    $('#imageWidthSpan').text('');
    $('#imageHeightSpan').text('');

    if(!imgReg.test(imgheight)){
        $('#imageHeightSpan').text('缩略图长宽只能是正整数');
    }else if(!imgReg.test(imgwidth)){
        $('#imageWidthSpan').text('缩略图长宽只能是正整数');
    }else{

        var d ={
            image_thumbnail_width:parseInt(imgwidth),
            image_thumbnail_height:parseInt(imgheight)
        };
        $.ajax({
            url: baseUrl + '/' + orgName + '/' + appUuid ,
            type:'PUT',
            data:JSON.stringify(d),
            headers:{
                'Authorization':'Bearer ' + access_token,
                'Content-Type':'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('修改失败!');
            },
            success: function(respData, textStatus, jqXHR) {
                alert('修改成功!');
                location.replace(location.href);
            }
        });
    }
}

// 切换app注册模式
function changeAllowOpen(){
    var access_token = $.cookie('access_token');
    var orgName = $.cookie('orgName');
    var appKey = $('#appKey').text().replace('#','/');
    var tag = $('#allowOpenHdd').val();

    if(tag == 0){
        allow_open_registration = false;
    } else {
        allow_open_registration = true;
    }

    var d = {
        'allow_open_registration':allow_open_registration
    }

    $.ajax({
        url:baseUrl+'/'+ appKey,
        type:'PUT',
        data:JSON.stringify(d),
        headers:{
            'Authorization':'Bearer ' + access_token,
            'Content-Type':'application/json'
        },
        success:function(respData){
            alert('提示!\n\模式切换成功!');
            //toApppofile();
            $(respData.entities).each(function(){
                var tag = this.allow_open_registration?'0':'1';
                var modified = format(this.modified);
                $('#modified').text(modified);
                $('#allowOpenHdd').val(tag);
                if(this.allow_open_registration){
                    $('#allowOpen').text('开放注册');
                }else {
                    $('#allowOpen').text('授权注册');
                }
            });
        },
        error:function(data){
            alert('提示!\n模式切换失败!');
        }
    });
}

