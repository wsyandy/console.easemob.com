/**
 * Created by kenshinn on 15-6-10.
 */


// 用户名
function onBlurCheckIMUsername(imUsername){
    var imUsernameReg =  /^[a-zA-Z0-9_\-./]*$/;
    if('' == imUsername) {
        $('#imUsernameMsg').text($.i18n.prop('app_users_form_username_error'));
        return false;
    }

    if(!imUsernameReg.test(imUsername)){
        $('#imUsernameMsg').text($.i18n.prop('app_users_form_username_error'));
        return false;
    }

    $('#imUsernameMsg').text('');
    return true;
}
// 一次密码
function onBlurCheckIMPassword(password){
    var passwordReg =  /^[\s\S]*$/;
    if('' == password) {
        $('#passwordMsg').text($.i18n.prop('app_users_form_password_error'));
        return false;
    }
    if(!passwordReg.test(password)){
        $('#passwordMsg').text($.i18n.prop('app_users_form_password_error'));
        return false;
    }
    $('#passwordMsg').text('');
    return true;
}

// 二次密码
function onBlurCheckIMConfirmPassword(confirmPassword){
    var password = $('#password').val();
    if('' == confirmPassword) {
        $('#confirmPasswordMsg').text($.i18n.prop('app_users_form_password_error'));
        return false;
    }
    if(password != confirmPassword){
        $('#confirmPasswordMsg').text($.i18n.prop('app_users_form_confirm_password_error_notmatch'));
        return false;
    }

    $('#confirmPasswordMsg').text('');
    return true;
}

// 提交表单
function saveNewIMUser(appUuid){
    var imUsername = $('#imUsername').val();
    var password = $('#password').val();
    var confirmPassword = $('#confirmPassword').val();

    var token = $.cookie('access_token');
    var orgName = $.cookie('orgName');

    var flag = onBlurCheckIMUsername(imUsername) && onBlurCheckIMPassword(password) && onBlurCheckIMConfirmPassword(confirmPassword);
    if(flag){
        // Create a user
        var d ={
            username:imUsername,
            password:password
        };
        $.ajax({
            url:baseUrl + '/' + orgName + '/' + appUuid + '/users',
            type:'POST',
            data:JSON.stringify(d),
            headers:{
                'Authorization':'Bearer ' + token,
                'Content-Type':'application/json'
            },
            success:function(respData){
                alert($.i18n.prop('app_users_form_msg_username_saved'));
                window.location.href = 'app_users.html?appUuid=' + appUuid;
            },
            error:function(data){
                var str = JSON.stringify(data.responseText).replace('}','').replace('{','').split(',');
                var tmpArr = new Array();
                var errorMsg = '';
                for(var i = 0; i < str.length; i++) {
                    tmpArr.push(str[i].replace(/\\/g,'').replace(/\"/g,'').split(':'));
                }
                for(var i = 0; i < tmpArr.length; i++) {
                    if('error_description' == tmpArr[i][0]){
                        if(tmpArr[i][1].indexOf("Entity user requires that property named username be unique") > -1) {
                            errorMsg = $.i18n.prop('app_users_form_errorMsg_username_duplicated');
                        } else {
                            errorMsg = $.i18n.prop('app_users_form_errorMsg_username_failure');
                        }
                    }
                }
                alert(errorMsg);
            }
        });
    }
}


function selectAppUser(sel,appUuid,username){
    var value = sel.value;

    if(value == 'appIMList'){
        toAppIMList(username);
    }else if(value == 'setUsername'){
        setUsername(appUuid, username);
    }else if(value == 'sendMsg'){
        sendMessgeOne(appUuid, username);
    }else if(value == 'deleteUAdmin'){
        deleteAppUser(appUuid, username);
    }else if(value == 'excute'){
        excute(appUuid, username);
    }
}

// 获取某个app下的用户
function getAppUserList(appUuid, pageAction){

    fakePageOne = 1;

    // 获取token
    document.getElementById('checkAll').checked = false;
    $('#paginau').html('');
    var access_token = $.cookie('access_token');
    var cuser = $.cookie('cuser');
    var orgName = $.cookie('orgName');
    if(!access_token || access_token==''){
        EasemobCommon.disPatcher.sessionTimeOut();
    } else {
        var loading = '<tr id="tr_loading"><td class="text-center" colspan="9"><img src ="assets/img/loading.gif">&nbsp;&nbsp;&nbsp;<span>正在读取数据...</span></td></tr>';
        $('#appUserBody').empty();
        $('#appUserBody').append(loading);
        var userPage = $.cookie('userPage');
        if('next' == pageAction){
            pageNo += 1;
        } else if('forward' == pageAction){
            if(pageNo >= 2) {
                pageNo -= 1;
            } else {
                pageNo = 1;
            }
        }
        var temp = '';
        if(typeof(pageAction) != 'undefined' && pageAction != '' || pageAction == 'no'){
            temp = '&cursor=' + cursors[pageNo];
        }
        $.ajax({
            url:baseUrl+'/'+ orgName +'/' + appUuid + '/users?limit=10' + temp,
            type:'GET',
            headers:{
                'Authorization':'Bearer ' + access_token,
                'Content-Type':'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
            },
            success: function(respData, textStatus, jqXHR) {
                if(pageAction != 'forward'){
                    if(respData.cursor){
                        cursors[pageNo+1] = respData.cursor;
                    }else{
                        cursors[pageNo+1] = null;
                    }
                }

                if(respData.entities.length == 0 && respData.cursor == '' && (pageAction == 'next' || typeof(pageAction) == 'undefined')){
                    getNextAppUserList();
                } else if(respData.entities.length == 0 && pageAction == 'forward'){
                    if(pageNo >= 2){
                        getPrevAppUserList();
                    } else if(pageNo == 1){
                        getNextAppUserList();
                    }
                } else {
                    $('tbody').html('');
                    var selectOptions = '';
                    $(respData.entities).each(function(){
                        var username = this.username;
                        var created = format(this.created);
                        var notification_display_style = '';
                        if(this.notification_display_style == 0){
                            notification_display_style = $.i18n.prop('app_users_text_notification_display_style_summary');
                        }else if(this.notification_display_style == 1){
                            notification_display_style = $.i18n.prop('app_users_text_notification_display_style_detail');
                        }
                        var nickname = this.nickname;
                        if(nickname == undefined){
                            nickname='';
                        }
                        var notification_no_disturbing = this.notification_no_disturbing;
                        var notification_no_disturbing_time='----';
                        if(this.notification_no_disturbing){
                            notification_no_disturbing = $.i18n.prop('app_users_text_notification_no_disturbing_open');
                            notification_no_disturbing_time = this.notification_no_disturbing_start + ':00'+'--'+this.notification_no_disturbing_end + ':00';
                        }else{
                            notification_no_disturbing = $.i18n.prop('app_users_text_notification_no_disturbing_close');
                        }
                        var notifier_name = this.notifier_name;
                        if(notifier_name == undefined){
                            notifier_name='';
                        }
                        var user_name_show = username;

                        selectOptions += '<tr>'+
                            '<td class="text-center"><label><input style="opacity:1;" name="checkbox" type="checkbox" value="'+username+'" />&nbsp;&nbsp;&nbsp;</label></td>'+
                            '<td class="text-center">'+user_name_show+'</td>'+
                            '<td class="text-center">'+notification_display_style+'</td>'+
                            '<td class="text-center">'+nickname+'</td>'+
                            '<td class="text-center">'+notification_no_disturbing+'</td>'+
                            '<td class="text-center">'+notification_no_disturbing_time+'</td>'+
                            '<td class="text-center">'+notifier_name+'</td>'+
                            '<td class="text-center">'+created+'</td>'+
                            '<td class="text-center">'+
                            '<ul class="nav-pills" style="list-style-type:none">'+
                            '<li class="dropdown all-camera-dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">' + $.i18n.prop('app_users_selections_operation') + '<b class="caret"></b></a>'+
                            '<ul class="dropdown-menu">'+
                            '<li data-filter-camera-type="all"><a href="javascript:toAppIMList(\''+username+'\')">' + $.i18n.prop('app_users_selections_contacts') + '</a></li>'+
                            '<li data-filter-camera-type="Zed"><a href="javascript:showUpdateInfo(\''+appUuid+'\',\''+username+'\')">' + $.i18n.prop('app_users_selections_modify') + '</span></a></li>'+
                            '<li data-filter-camera-type="Zed"><a href="javascript:deleteAppUser(\''+appUuid+'\',\''+username+'\')">' + $.i18n.prop("app_users_selections_delete") + '</a></li>'+
                            '<li data-filter-camera-type="Alpha"><a href="#passwordMondify" id="passwdMod${status.index }" onclick="setUsername(\'' + appUuid + '\',\''+ username +'\');" data-toggle="modal" role="button">'+$.i18n.prop('app_users_selections_resetpassword')+'</a></li>'+
                            '<li data-filter-camera-type="Zed"><a href="javascript:sendMessgeOne(\''+appUuid+'\',\''+username+'\')">' + $.i18n.prop('app_users_selections_sendMessages') + '</a></li>'+
                            '</ul>'+
                            '</li>'+
                            '</ul>'+
                            '</td>'+
                            '</tr>';
                    });
                    $('#tr_loading').remove();
                    $('#appUserBody').append(selectOptions);
                }
                // 无数据
                var tbody = document.getElementsByTagName("tbody")[0];
                if(!tbody.hasChildNodes()){
                    var option = '<tr><td class="text-center" colspan="9">无数据!</td></tr>';
                    $('#tr_loading').remove();
                    $('#appUserBody').append(option);
                    var pageLi = $('#paginau').find('li');
                    for(var i=0;i<pageLi.length;i++){
                        $(pageLi[i]).hide();
                    }
                } else {
                    var ulB = '<ul>';
                    var ulE = '</ul>';
                    var textOp1 = '<li> <a href="javascript:void(0);" onclick="getPrevAppUserList();">上一页</a> </li>';
                    var textOp2 = '<li> <a href="javascript:void(0);" onclick="getNextAppUserList();">下一页</a> </li>';
                    $('#paginau').html('');


                    // 首页
                    if(pageNo == 1){
                        if(respData.cursor == null){
                            $('#paginau').append(ulB + ulE);
                        } else {
                            if(pageAction == 'no'){
                                $('#paginau1').append(ulB + textOp2 + ulE);
                            } else {
                                $('#paginau').append(ulB + textOp2 + ulE);
                            }
                        }
                        // 尾页
                    } else if(cursors.length != 0 && respData.cursor == null){
                        $('#paginau').append(ulB + textOp1 + ulE);
                    } else {
                        $('#paginau').append(ulB + textOp1 + textOp2 + ulE);
                    }
                }
            }
        });
    }
}

// 搜索IM用户
function searchUser(appUuid, queryString){
    // 获取token
    var access_token = $.cookie('access_token');
    var cuser = $.cookie('cuser');
    var orgName = $.cookie('orgName');

    if(!access_token || access_token=='') {
        EasemobCommon.disPatcher.sessionTimeOut();
    } else {

        $.ajax({
            url:baseUrl+'/'+ orgName +'/' + appUuid + '/users/' + queryString,
            type:'GET',
            headers:{
                'Authorization':'Bearer '+access_token,
                'Content-Type':'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('tbody').html('');
                var option = '<tr><td class="text-center" colspan="9">用户不存在!</td></tr>';
                $('#appUserBody').append(option);
                $('#paginau').hide();
            },
            success: function(respData, textStatus, jqXHR) {
                $('tbody').html('');
                $(respData.entities).each(function(){
                    var username = this.username;
                    var created = format(this.created);
                    var notification_display_style='';
                    if(this.notification_display_style == 0){
                        notification_display_style='仅通知';
                    }else if(this.notification_display_style == 1){
                        notification_display_style='发送详情';
                    }
                    var nickname = this.nickname;
                    if(nickname == undefined){
                        nickname='';
                    }
                    var notification_no_disturbing = this.notification_no_disturbing;
                    if(this.notification_no_disturbing){
                        var notification_no_disturbing='已开启';
                        var notification_no_disturbing_time = this.notification_no_disturbing_start + ':00'+'--'+this.notification_no_disturbing_end + ':00';
                    }else{
                        var notification_no_disturbing='未开启';
                        var notification_no_disturbing_time='----';
                    }
                    var notifier_name = this.notifier_name;
                    if(notifier_name == undefined){
                        notifier_name='';
                    }
                    var user_name_show = username;
                    var selectOptions = '<tr>'+
                        '<td class="text-center"><label><input style="opacity:1;" name="checkbox" type="checkbox" value="'+username+'" />&nbsp;&nbsp;&nbsp;</label></td>'+
                        '<td class="text-center">'+user_name_show+'</td>'+
                        '<td class="text-center">'+notification_display_style+'</td>'+
                        '<td class="text-center">'+nickname+'</td>'+
                        '<td class="text-center">'+notification_no_disturbing+'</td>'+
                        '<td class="text-center">'+notification_no_disturbing_time+'</td>'+
                        '<td class="text-center">'+notifier_name+'</td>'+
                        '<td class="text-center">'+created+'</td>'+
                        '<td class="text-center">'+
                        '<ul class="text-center" class="nav-pills" style="list-style-type:none">'+
                        '<li class="dropdown all-camera-dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">操作<b class="caret"></b></a>'+
                        '<ul class="dropdown-menu">'+
                        '<li data-filter-camera-type="all"><a href="javascript:toAppIMList(\''+username+'\')">查看用户好友</a></li>'+
                        '<li data-filter-camera-type="Alpha"><a href="#passwordMondify" id="passwdMod${status.index }" onclick="setUsername(\'' + appUuid + '\',\''+ username +'\');" data-toggle="modal" role="button">重置密码</a></li>'+
                        '<li data-filter-camera-type="Zed"><a href="javascript:showUpdateInfo(\''+appUuid+'\',\''+username+'\')">修改信息</a></li>'+
                        '<li data-filter-camera-type="Zed"><a href="javascript:deleteAppUser(\''+appUuid+'\',\''+username+'\')">删除</a></li>'+
                        '<li data-filter-camera-type="Zed"><a href="javascript:sendMessgeOne(\''+appUuid+'\',\''+username+'\')">发送消息</a></li>'+

                        '</ul>'+
                        '</li>'+
                        '</ul>'+
                        '</td>'+
                        '</tr>';

                    $('#appUserBody').append(selectOptions);

                    $('#paginau').hide();
                });
            }
        });
    }
}


// 重置app用户密码
function updateAppUserPassword(){
    var username = $('#usernameMondify').val();
    var orgName = $.cookie('orgName');
    var token = $.cookie('access_token');
    var appUuid = $('#appUuidHidd').val();

    var pwdMondifyVal = $('#pwdMondify').val();
    var pwdMondifytwoVal = $('#pwdMondifytwo').attr('value');

    var passwordReg = /^[0-9a-zA-Z]{1,100}$/;
    if(pwdMondifyVal == ''){
        $('#pwdMondify').focus();
        $('#pwdMondifySpan').html('请输入新密码');
        return;
    } else if(!passwordReg.test(pwdMondifyVal)){
        $('#pwdMondify').focus();
        $('#pwdMondifySpan').html('只能输入1~100位字母或者数字');
        return;
    } else {
        $('#pwdMondifySpan').html('');

        if(pwdMondifytwoVal == ''){
            $('#pwdMondifytwo').focus();
            $('#pwdMondifytwoSpan').html('请再次输入新密码');
            return;
        }else if(pwdMondifytwoVal != pwdMondifyVal){
            $('#pwdMondifytwo').focus();
            $('#pwdMondifytwoSpan').html('两次密码不一致');
            return;
        }else {
            $('#pwdMondifySpan').text('');
            $('#pwdMondifytwoSpan').text('');

            var d ={
                newpassword:pwdMondifyVal
            };
            var layerNum = layer.load('正在修改密码...');
            $.ajax({
                url:baseUrl + '/' + orgName + '/' + appUuid + '/users/' + username + '/password',
                type:'POST',
                data:JSON.stringify(d),
                headers:{
                    'Authorization':'Bearer ' + token,
                    'Content-Type':'application/json'
                },
                success:function(respData){
                    layer.close(layerNum);
                    alert('提示!\n密码重置成功!');
                    $('#pwdMondifySpan').text('');
                    $('#pwdMondifytwoSpan').text('');
                    $('#pwdMondify').val('');
                    $('#pwdMondifytwo').val('');
                    $('#passwordMondify').modal('hide');
                },
                error:function(data){
                    layer.close(layerNum);
                    alert('提示!\n密码重置失败!');
                }
            });
        }

    }
}

// 删除app下的用户
function deleteAppUser(appUuid,username){
    var access_token = $.cookie('access_token');
    var orgName = $.cookie('orgName');
    if(confirm('确定要删除此用户吗?')){
        var layerNum = layer.load('正在删除...');
        $.ajax({
            url:baseUrl + '/' + orgName +'/' + appUuid + '/users/' + username,
            type:'DELETE',
            headers:{
                'Authorization':'Bearer ' + access_token,
                'Content-Type':'application/json'
            },
            error:function(){
                layer.close(layerNum);
                alert('提示\n\n删除失败!');
            },
            success:function(respData){
                layer.close(layerNum);
                alert('提示\n\n删除成功!');
                getAppUserList(appUuid,'no');
            }
        });
    }
}
//批量删除app下的用户
function deleteAppUserCheckBox(appUuid){
    var checkbox=document.getElementsByName("checkbox");
    var num=0;
    for (var i=0;i<checkbox.length;i++){
        if(checkbox[i].checked){
            num++;
        }
    }
    if(num>0){
        if(confirm('确定要删除这些用户吗?')){
            var layerNum = layer.load('正在删除...');
            var success = 0;
            var fail = 0;
            for (var i=0;i<checkbox.length;i++){
                if(checkbox[i].checked){
                    var flag = deleteAppUsers(appUuid,checkbox[i].value);
                    if(flag){
                        success ++;
                    }else{
                        fail ++;
                    }
                }
            }
            layer.close(layerNum);
            alert('删除完成！'+success+'个成功，'+fail+'个失败!')
            getAppUserList(appUuid);
        }
    }else{
        alert('至少选择一个用户!');
    }
}


//弹出发送消息
function sendMessge(appUuid){
    var checkbox=document.getElementsByName("checkbox");
    var num=0;
    for (var i=0;i<checkbox.length;i++){
        if(checkbox[i].checked){
            num++;
        }
    }
    if(num>0){
        var users = new Array();
        for (var i=0;i<checkbox.length;i++){
            if(checkbox[i].checked){
                users.push(checkbox[i].value);
            }
        }
        $('#usernameMessage').val(users);
        $('#appUuidMessage').val(appUuid);
        $('#messegeContent').val('');
        document.getElementById('messegeContent').style.display="block";
        $('#img1').remove();
        $('#share-secret').val('');
        $('#file').val('');
        $('#f_file').val('');
        $('#sendMessageA').click();
    }else{
        alert('至少选择一个用户!');
    }
}

//单个消息发送
function sendMessgeOne(appUuid,users){
    $('#usernameMessage').val(users);
    $('#appUuidMessage').val(appUuid);
    $('#messegeContent').val('');
    document.getElementById('messegeContent').style.display="block";
    $('#img1').remove();
    $('#share-secret').val('');
    $('#file').val('');
    $('#f_file').val('');
    $('#sendMessageA').click();
}

//发送消息
function sendUserMessage1(){
    var users = document.getElementById('usernameMessage').value;
    var appUuid = document.getElementById('appUuidMessage').value;
    var orgName = $.cookie('orgName');
    var token = $.cookie('access_token');
    var messageContent = $('#messegeContent').val().trim();
    var target = users.split(',');
    if ( messageContent ==''){
        alert('消息不能为空');
    }else{
        var d = {
            "target_type" : "users",
            "target" : target,

            "msg" : {
                "type" : "txt",
                "msg" : messageContent //消息内容
            }
        }
        var layerNum = layer.load('正在发送...');
        $.ajax({
            url:baseUrl+'/'+ orgName + "/" + appUuid + '/messages',
            type:'POST',
            headers:{
                'Authorization':'Bearer '+token,
                'Content-Type':'application/json'
            },
            data:JSON.stringify(d),
            error:function(respData){
                layer.close(layerNum);
                //alert('发送失败');
            },
            success:function(respData){
                layer.close(layerNum);
                $('#closeButn').click();
                //alert('发送成功');
            }
        });
    }

}

//发送消息
function sendUserMessage(){
    var users = document.getElementById('usernameMessage').value;
    var appUuid = document.getElementById('appUuidMessage').value;
    var orgName = $.cookie('orgName');
    var token = $.cookie('access_token');
    var messageContent = $('#messegeContent').val().trim();
    var target = users.split(',');
    if ( messageContent ==''){
        alert('消息不能为空');
    }else{
        var d = {
            "target_type" : "users",
            "target" : target,

            "msg" : {
                "type" : "txt",
                "msg" : messageContent //消息内容
            }
        };
        var layerNum = layer.load('正在发送...');
        $.ajax({
            url:baseUrl+'/'+ orgName + "/" + appUuid + '/messages',
            type:'POST',
            headers:{
                'Authorization':'Bearer '+token,
                'Content-Type':'application/json'
            },
            data:JSON.stringify(d),
            error:function(respData){
                layer.close(layerNum);
                alert('发送失败');
            },
            success:function(respData){
                layer.close(layerNum);
                $('#closeButn').click();
                alert('发送成功');
            }
        });
    }

}
//发送图片
function sendUserImgMessage(){
    if($('#sndBtn').attr('disabled') == 'disabled'){
        return ;
    }

    if( $('#share-secret').val() == ''|| $('#share-secret').val() == null){
        alert('请先选择图片');
    } else {
        var users = document.getElementById('usernameMessage').value;
        var appUuid = document.getElementById('appUuidMessage').value;
        var orgName = $.cookie('orgName');
        var token = $.cookie('access_token');
        var target = users.split(',');
        var str = $('#share-secret').val().split(',');
        var d = {
            "target_type" : "users", //or chatgroups
            "target" : target, //注意这里需要用数组, 即使只有一个用户, 也要用数组 ['u1']
            "msg" : {
                "type":"img","filename":str[0], "secret": str[1],"url":$('#imgUuid').val()
            }
        };
        var layerNum = layer.load('正在发送...');
        $.ajax({
            url:baseUrl+'/'+ orgName + "/" + appUuid + '/messages',
            type:'POST',
            headers:{
                'Authorization':'Bearer '+token,
                'Content-Type':'application/json'
            },
            data:JSON.stringify(d),
            error:function(respData){
                layer.close(layerNum);
                alert('发送失败');
            },
            success:function(respData){
                layer.close(layerNum);
                $('#closeButn').click();
                alert('发送成功');
                // 清空图片元素
                $('#uploadresspan').text('等待上传图片');
                $('#img2').attr("src","assets/img/140144.jpg");
            }
        });
    }

}


// 用户好友列表
function toAppIMList(owner_username){
    window.location.href = 'app_users_contacts.html?appUuid='+appUuid+'&owner_username='+owner_username;
}

//获取用户好友列表
function getAppIMList(appUuid, owner_username){
    // 获取token
    var access_token = $.cookie('access_token');
    var cuser = $.cookie('cuser');
    var orgName = $.cookie('orgName');
    if(!access_token || access_token==''){
        EasemobCommon.disPatcher.sessionTimeOut();
    } else {
        var loading = '<tr id="tr_loading"><td class="text-center" colspan="3"><img src ="assets/img/loading.gif">&nbsp;&nbsp;&nbsp;<span>正在读取数据...</span></td></tr>';
        $('#appIMBody').empty();
        $('#appIMBody').append(loading);
        $.ajax({
            url:baseUrl+'/'+ orgName +'/' + appUuid + '/users/'+owner_username+'/contacts/users',
            type:'GET',
            headers:{
                'Authorization':'Bearer '+access_token,
                'Content-Type':'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
            },
            success: function(respData, textStatus, jqXHR) {
                $('tbody').html('');
                var i=0;
                var selectOptions = '';
                $(respData.data).each(function(){
                    selectOptions += '<tr>'+
                        '<td style=" visibility:visible;"><input type="checkbox" value="fff"  style="width:100px; height:20px;border:1px solid #F00;"/>'+(i+1)+'</td>'+
                        '<td>'+respData.data[i]+'</td>'+
                        '<td class="text-center">'+
                        '<ul class="text-center" class="nav-pills" style="list-style-type:none">'+
                        '<li class="dropdown all-camera-dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">操作<b class="caret"></b></a>'+
                        '<ul class="dropdown-menu" style="left:150px;">'+
                        '<li><a href="javascript:deleteAppIMFriend(\''+appUuid+'\', \''+owner_username+'\',\''+respData.data[i]+'\')">解除好友关系</a></li>'+
                        '</ul>'+
                        '</li>'+
                        '</ul>'+
                        '</td>'+
                        '</tr>';
                    i++;

                });
                $('#tr_loading').remove();
                $('#appIMBody').append(selectOptions);
                // 无数据
                var tbody = document.getElementsByTagName("tbody")[0];
                if(!tbody.hasChildNodes()){
                    var option = '<tr><td class="text-center" colspan="3">无数据!</td></tr>';
                    $('#appIMBody').append(option);
                    var pageLi = $('#paginau').find('li');
                    for(var i=0;i<pageLi.length;i++){
                        $(pageLi[i]).hide();
                    }
                }
            }
        });
    }
}


//删除某个好友
function deleteAppIMFriend(appUuid, owner_username, friend_username){
    //获取token
    var orgName = $.cookie('orgName');
    var access_token = $.cookie('access_token');
    if(!access_token || access_token==''){
        EasemobCommon.disPatcher.sessionTimeOut();
    } else {
        if(window.confirm('确定删除此好友？')){
            $.ajax({
                url:baseUrl+'/'+ orgName +'/' + appUuid + '/users/'+owner_username+'/contacts/users/'+friend_username,
                type:'DELETE',
                headers:{
                    'Authorization':'Bearer '+access_token,
                    'Content-Type':'application/json'
                },
                error: function(jqXHR, textStatus, errorThrown) {
                },
                success: function(respData, textStatus, jqXHR) {
                    location.replace(location.href);
                }
            });
        }
    }

}

//弹出添加好友页面
function showAddFriend(appUuid,username){
    $('#usernameFriend').val(username);
    $('#appUuidFriend').val(appUuid);
    $('#friendUsername').val('');
    $('#showAddFriend').click();
}

//添加好友
function addIMFriend(){
    var orgName = $.cookie('orgName');
    var access_token = $.cookie('access_token');
    var owner_username = $('#usernameFriend').val();
    var appUuid = $('#appUuidFriend').val();
    var friend_username = $('#friendUsername').val();
    if (friend_username == ''){
        alert('好友名称不能为空!');
    }else{
        var layerNum = layer.load('正在验证名称...');
        $.ajax({
            url:baseUrl+'/'+ orgName +'/' + appUuid +'/users/' + friend_username,
            type:'POST',
            headers:{
                'Authorization':'Bearer '+access_token,
                'Content-Type':'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
                layer.close(layerNum);
                alert('提示\n\n该用户不存在，请检查用户名!');
            },
            success: function(respData, textStatus, jqXHR) {
                var layerNum = layer.load('正在添加好友...');
                $.ajax({
                    url:baseUrl+'/'+ orgName +'/' + appUuid +'/users/' + owner_username + '/contacts/users/' + friend_username,
                    type:'POST',
                    headers:{
                        'Authorization':'Bearer '+access_token,
                        'Content-Type':'application/json'
                    },
                    error: function(jqXHR, textStatus, errorThrown) {

                    },
                    success: function(respData, textStatus, jqXHR) {
                        layer.close(layerNum);
                        alert('添加好友成功!');
                        location.replace(location.href);
                    }
                });
            }
        });


    }

}


// 好友分页条更新
function updateIMPageStatus(owner_username){
    var pageLi = $('#paginau').find('li');

    // 获取token
    var access_token = $.cookie('access_token');
    var cuser = $.cookie('cuser');
    var orgName = $.cookie('orgName');
    if(!access_token || access_token==''){
        EasemobCommon.disPatcher.sessionTimeOut();
    } else {
        $.ajax({
            url:baseUrl+'/'+ orgName +'/' + appUuid + '/users/'+owner_username+'/contacts/users?limit=1000',
            type:'GET',
            headers:{
                'Authorization':'Bearer '+access_token,
                'Content-Type':'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
            },
            success: function(respData, textStatus, jqXHR) {
                total = respData.entities.length;
                var totalPage = (total % 10 == 0) ? (parseInt(total / 10)) : (parseInt(total / 10) + 1);
                var ulB = '<ul>';
                var ulE = '</ul>';
                var textOp1 = '<li> <a href="javascript:void(0);" onclick="getPrevAppUserList();">上一页</a> </li>';
                var textOp2 = '<li> <a href="javascript:void(0);" onclick="getNextAppUserList();">下一页</a> </li>';
                $('#paginau').html('');
                // 首页
                if(pageNo == 1){
                    if(totalPage == 1){
                        $('#paginau').append(ulB + ulE);
                    } else {
                        $('#paginau').append(ulB + textOp2 + ulE);
                    }
                    // 尾页
                } else if(totalPage ==  pageNo){
                    $('#paginau').append(ulB + textOp1 + ulE);
                } else {
                    $('#paginau').append(ulB + textOp1 + textOp2 + ulE);
                }
            }
        });
    }
}


//弹出修改信息框
function showUpdateInfo(appUuid, username){
    // 获取token
    var access_token = $.cookie('access_token');
    var cuser = $.cookie('cuser');
    var orgName = $.cookie('orgName');

    if(!access_token || access_token=='') {
        EasemobCommon.disPatcher.sessionTimeOut();
    } else {
        $.ajax({
            url:baseUrl+'/'+ orgName +'/' + appUuid + '/users/' + username,
            type:'GET',
            headers:{
                'Authorization':'Bearer '+access_token,
                'Content-Type':'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
            },
            success: function(respData, textStatus, jqXHR) {
                $(respData.entities).each(function(){
                    var username = this.username;
                    var notification_display_style = this.notification_display_style;
                    var nickname = this.nickname;
                    var notification_no_disturbing=this.notification_no_disturbing;
                    var notification_no_disturbing_start = this.notification_no_disturbing_start;
                    var notification_no_disturbing_end = this.notification_no_disturbing_end ;
                    $('#username').text(username);
                    document.getElementById('messageType_0').checked=false;
                    document.getElementById('messageType_1').checked=false;
                    if(notification_display_style == 0){
                        document.getElementById('messageType_0').checked='checked';
                    }else if(notification_display_style == 1){
                        document.getElementById('messageType_1').checked='checked';
                    }
                    $('#nickname').val(nickname);
                    document.getElementById('notification_true').checked=false;
                    document.getElementById('notification_false').checked=false;
                    if(notification_no_disturbing){
                        document.getElementById('notification_true').checked='checked';
                        document.getElementById('notification_time_div').style.display="block";
                        $('#notification_starttime').val(notification_no_disturbing_start);
                        $('#notification_endtime').val(notification_no_disturbing_end);
                    }else if(!notification_no_disturbing){
                        document.getElementById('notification_false').checked='checked';
                        document.getElementById('notification_time_div').style.display="none";
                        $('#notification_starttime').val('');
                        $('#notification_endtime').val('');
                    }
                    $('#showUpdateInfoA').click();
                });
            }
        });
    }
}

//修改信息
function updateInfo(appUuid){
    var access_token = $.cookie('access_token');
    var cuser = $.cookie('cuser');
    var orgName = $.cookie('orgName');
    var username =$('#username').text();
    var notification_display_style;
    if(document.getElementById('messageType_0').checked){
        notification_display_style = 0;
    }else if(document.getElementById('messageType_1').checked){
        notification_display_style = 1;
    }else{
        notification_display_style = '';
    }
    var nickname =$('#nickname').val();
    var notification_no_disturbing;
    var notification_no_disturbing_start;
    var notification_no_disturbing_end;
    if(document.getElementById('notification_true').checked){
        notification_no_disturbing = true;
        notification_no_disturbing_start = $('#notification_starttime').val();
        notification_no_disturbing_end = $('#notification_endtime').val();
    }else if(document.getElementById('notification_false').checked){
        notification_no_disturbing = false;
        notification_no_disturbing_start = '';
        notification_no_disturbing_end = '';
    }else{

    }
    var flag = true;
    if(nickname.length>20){
        flag =false;
    }

    if(document.getElementById('notification_true').checked){
        var numReg = /^[0-9]*$/;
        if(numReg.test(notification_no_disturbing_start) && numReg.test(notification_no_disturbing_end)){

            notification_no_disturbing_end = parseInt(notification_no_disturbing_end);
            notification_no_disturbing_start = parseInt(notification_no_disturbing_start);

            if(notification_no_disturbing_end >= 0 && notification_no_disturbing_end<=24 && notification_no_disturbing_start >= 0 && notification_no_disturbing_start <= 24){
                var d ={
                    notification_display_style : notification_display_style,
                    nickname : nickname,
                    notification_no_disturbing :  notification_no_disturbing,
                    notification_no_disturbing_start : notification_no_disturbing_start,
                    notification_no_disturbing_end : notification_no_disturbing_end
                };
                var layerNum = layer.load('正在修改...');
                if(flag){
                    $.ajax({
                        url:baseUrl+'/'+ orgName +'/' + appUuid + '/users/' + username,
                        type:'PUT',
                        headers:{
                            'Authorization':'Bearer '+access_token,
                            'Content-Type':'application/json'
                        },
                        data:JSON.stringify(d),
                        error: function(jqXHR, textStatus, errorThrown) {
                            layer.close(layerNum);
                            alert('修改失败!');
                        },
                        success: function(respData, textStatus, jqXHR) {
                            layer.close(layerNum);
                            alert('修改成功!');
                            $('#infoCloseButn').click();
                            getAppUserList(appUuid,'no');
                        }
                    });
                }else{
                    alert('昵称不能超过20个字符!');
                }
            }else{
                alert('时间格式不正确，请输入00 ~ 24！');
            }

        }else{
            alert('时间格式不正确，请输入00 ~ 24！');
        }

    }else if(!document.getElementById('notification_true').checked){
        var d ={
            notification_display_style : notification_display_style,
            nickname : nickname,
            notification_no_disturbing :  notification_no_disturbing,
            notification_no_disturbing_start : notification_no_disturbing_start,
            notification_no_disturbing_end : notification_no_disturbing_end
        };
        if(flag){
            $.ajax({
                url:baseUrl+'/'+ orgName +'/' + appUuid + '/users/' + username,
                type:'PUT',
                headers:{
                    'Authorization':'Bearer '+access_token,
                    'Content-Type':'application/json'
                },
                data:JSON.stringify(d),
                error: function(jqXHR, textStatus, errorThrown) {
                    alert('修改失败!');
                },
                success: function(respData, textStatus, jqXHR) {
                    alert('修改成功!');
                    $('#infoCloseButn').click();
                    getAppUserList(appUuid,'no');
                }
            });
        }else{
            alert('昵称不能超过20个字符!');
        }
    }
}


