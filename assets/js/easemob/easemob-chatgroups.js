/**
 * Created by kenshinn on 15-6-10.
 */


//群组发送消息
function sendUserMessages(){
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
            "target_type" : "chatgroups", //or chatgroups
            "target" : target, //注意这里需要用数组, 即使只有一个用户, 也要用数组 ['u1']

            "msg" : {
                "type" : "txt",
                "msg" : messageContent //消息内容，参考[聊天记录](http://developer.easemob.com/docs/emchat/rest/chatmessage.html)里的bodies内容
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
//群组发送图片
function sendUserImgMessages(){
    if( $('#share-secret').val() == ''|| $('#share-secret').val() == null){
        alert('请先选择图片');
    }else{
        var users = document.getElementById('usernameMessage').value;
        var appUuid = document.getElementById('appUuidMessage').value;
        var orgName = $.cookie('orgName');
        var token = $.cookie('access_token');
        var messageContent = $('#messegeContent').val();
        var target = users.split(',');
        var str = $('#share-secret').val().split(',');
        var d = {
            "target_type" : "chatgroups",
            "target" : target,
            "msg" : {
                "type":"img","filename":str[0], "secret": str[1],"url":$('#imgUuid').val()
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
                alert('发送失败');
            },
            success:function(respData){
                layer.close(layerNum);
                $('#closeButn').click();
                $('#uploadresspan').text('等待上传图片');
                alert('发送成功');
            }
        });
    }
}


// 获取app群组列表
function getAppChatrooms(appUuid, pageAction){

    // 获取token
    var access_token = $.cookie('access_token');
    var cuser = $.cookie('cuser');
    var orgName = $.cookie('orgName');
    if(!access_token || access_token==''){
        alert('提示\n\n会话已失效,请重新登录!');
        window.location.href = 'index.html';
    } else {
        if('next' == pageAction){
            pageNo += 1;
        } else if('forward' == pageAction){
            pageNo -= 1;
        }

        var tmp = '';
        if(typeof(pageAction) != 'undefined' && pageAction != '' && cursors[pageNo] != ''){
            tmp = '&cursor=' + cursors[pageNo];
        }
        var loading = '<tr id="tr_loading"><td class="text-center" colspan="4"><img src ="assets/img/loading.gif">&nbsp;&nbsp;&nbsp;<span>正在读取数据...</span></td></tr>';
        $('#appChatroomBody').empty();
        $('#appChatroomBody').append(loading);
        $.ajax({
            url:baseUrl+'/'+ orgName + "/" + appUuid + '/chatgroups?limit=10' + tmp,
            type:'GET',
            headers:{
                'Authorization':'Bearer '+access_token,
                'Content-Type':'application/json'
            },
            error:function(respData){

            },
            success:function(respData){

                $('tbody').html('');
                $(respData.data).each(function(){
                    var groupid = $.trim(this.groupid);
                    var groupname = $.trim(this.groupname);
                    if(groupname == '' || groupname == null){
                        groupname = '-';
                    }
                    var nums = 0;
                    var admin='';
                    var selectOptions = '<tr>'+
                        '<td class="text-center"><label><input style="opacity:1;" name="checkbox" type="checkbox" value="'+groupid+'" />&nbsp;&nbsp;&nbsp;</label></td>'+
                        '<td class="text-center" width="222px" style="word-break:break-all">'+ groupid +'</td>'+
                        '<td class="text-center" width="666px" style="word-break:break-all">'+ groupname +'</td>'+
                        '<td class="text-center">'+
                        '<ul class="text-center" class="nav-pills" style="list-style-type:none">'+
                        '<li class="dropdown all-camera-dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">操作<b class="caret"></b></a>'+
                        '<ul class="dropdown-menu">'+
                        '<li data-filter-camera-type="all"><a href="javascript:togroupaddAppAdminuserusers(\''+appUuid+'\',\''+groupid+'\')">查看群组成员</a></li>'+
                        '<li data-filter-camera-type="Alpha"><a href="javascript:deleteAppChatroom(\''+appUuid+'\',\''+groupid+'\')">删除</a></li>'+
                        '<li data-filter-camera-type="Zed"><a href="javascript:sendMessgeOne(\''+appUuid+'\',\''+groupid+'\')">发送消息</a></li>'+
                        '</ul>'+
                        '</li>'+
                        '</ul>'+
                        '</td>'+
                        '</tr>';
                    $('#tr_loading').remove();
                    $('#appChatroomBody').append(selectOptions);
                });

                var tbody = document.getElementsByTagName("tbody")[0];
                if(!tbody.hasChildNodes()){
                    var option = '<tr><td class="text-center" colspan="7">无数据!</td></tr>';
                    $('#appChatroomBody').append(option);
                    var pageLi = $('#pagina').find('li');
                    for(var i=0;i<pageLi.length;i++){
                        $(pageLi[i]).hide();
                    }
                }

                var ulB = '<ul>';
                var ulE = '</ul>';
                var textOp1 = '<li> <a href="javascript:void(0);" onclick="getAppChatrooms(\'' + appUuid + '\',\'forward\')">上一页</a> </li>';
                var textOp2 = '<li> <a href="javascript:void(0);" onclick="getAppChatrooms(\'' + appUuid + '\',\'next\')">下一页</a> </li>';
                $('#paginau').html('');
                var hasNext = (respData.cursor != undefined);
                cursors[pageNo+1] = respData.cursor;
                if(pageNo == 1){
                    if(hasNext){
                        $('#paginau').append(ulB + textOp2 + ulE);
                    } else {
                        $('#paginau').append(ulB + ulE);
                    }
                } else {
                    if(hasNext){
                        $('#paginau').append(ulB + textOp1 + textOp2 + ulE);
                    } else {
                        $('#paginau').append(ulB + textOp1 + ulE);
                    }
                }
            }
        });
    }
}


// 搜索app群组
function getAppChatgroups(appUuid, groupid, pageAction){
    $('#paginau').html('');
    var access_token = $.cookie('access_token');
    var cuser = $.cookie('cuser');
    var orgName = $.cookie('orgName');
    if(!access_token || access_token==''){
        alert('提示\n\n会话已失效,请重新登录!');
        window.location.href = 'index.html';
    } else {
        if('forward' == pageAction){
            pageNo += 1;
        } else if('next' == pageAction){
            pageNo -= 1;
        }

        var tmp = '';
        if(typeof(pageAction)!='undefined' && pageAction != ''){
            tmp = '&cursor=' + cursors[pageNo];
        }
        var loading = '<tr id="tr_loading"><td class="text-center" colspan="4"><img src ="assets/img/loading.gif">&nbsp;&nbsp;&nbsp;<span>正在读取数据...</span></td></tr>';
        $('#appChatroomBody').empty();
        $('#appChatroomBody').append(loading);
        $.ajax({
            url:baseUrl+'/'+ orgName + "/" + appUuid + '/chatgroups/'+groupid,
            type:'GET',
            headers:{
                'Authorization':'Bearer '+access_token,
                'Content-Type':'application/json'
            },
            error:function(respData){
                var error = jQuery.parseJSON(respData.responseText).error;
                $('tbody').html('');
                if('service_resource_not_found' == error || 'illegal_argument' == error){
                    var option = '<tr><td class="text-center" colspan="4">该群id不存在，请重新输入!</td></tr>';
                    $('#appChatroomBody').append(option);
                }
            },
            success:function(respData){
                // 缓存游标,下次next时候存新的游标
                if(pageAction!='forward'){
                    cursors[pageNo+1] =	respData.cursor;
                } else {
                    cursors[pageNo+1] = null;
                }
                $('tbody').html('');
                var groupid = respData.data[0].id;
                var groupname = respData.data[0].name;
                var errors=respData.data[0].error;
                if(errors != null){
                    var option = '<tr><td class="text-center" colspan="4">该群id不存在，请重新输入!</td></tr>';
                    $('#appChatroomBody').append(option);
                    return;
                }
                if(groupname == '' || groupname == null){
                    groupname = '-';
                }

                var selectOptions = '<tr>'+
                    '<td class="text-center"><label><input style="opacity:1;" name="checkbox" type="checkbox" value="'+groupid+'" />&nbsp;&nbsp;&nbsp;</label></td>'+
                    '<td class="text-center">'+groupid+'</td>'+
                    '<td class="text-center">'+ groupname +'</td>'+
                    '<td class="text-center">'+
                    '<ul class="text-center" class="nav-pills" style="list-style-type:none">'+
                    '<li class="dropdown all-camera-dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">操作<b class="caret"></b></a>'+
                    '<ul class="dropdown-menu">'+
                    '<li data-filter-camera-type="all"><a href="javascript:togroupaddAppAdminuserusers(\''+appUuid+'\',\''+groupid+'\')">查看群组成员</a></li>'+
                    '<li data-filter-camera-type="Alpha"><a href="javascript:deleteAppChatroom(\''+appUuid+'\',\''+groupid+'\')">删除</a></li>'+
                    '<li data-filter-camera-type="Zed"><a href="javascript:sendMessgeOne(\''+appUuid+'\',\''+groupid+'\')">发送消息</a></li>'+
                    '</ul>'+
                    '</li>'+
                    '</ul>'+
                    '</td>'+
                    '</tr>';

                $('#tr_loading').remove();
                $('#appChatroomBody').append(selectOptions);
            }
        });
    }

}
// 查看群组成员
function togroupaddAppAdminuserusers(appUuid,groupid){
    window.location.href = 'app_chatgroup_users.html?appUuid=' + appUuid + '&groupid=' + groupid;
}

// 获取群组成员列表
function getAppChatroomsuser(appUuid,groupid,pageAction){
    // 获取token
    $('#paginau').html('');
    var access_token = $.cookie('access_token');
    var cuser = $.cookie('cuser');
    var orgName = $.cookie('orgName');
    if(!access_token || access_token==''){
        alert('提示\n\n会话已失效,请重新登录!');
        window.location.href = 'index.html';
    } else {
        if('forward' == pageAction){
            pageNo += 1;
        } else if('next' == pageAction){
            pageNo -= 1;
        }

        var tmp = '';
        if(typeof(pageAction)!='undefined' && pageAction != ''){
            tmp = '&cursor=' + cursors[pageNo];
        }
        $.ajax({
            url:baseUrl + '/' +orgName +'/'+appUuid+'/chatgroups/' +groupid+'/users',
            type:'GET',
            headers:{
                'Authorization':'Bearer '+access_token,
                'Content-Type':'application/json'
            },
            error:function(respData){
            },
            success:function(respData){
                if(pageAction!='forward'){
                    cursors[pageNo+1] = respData.cursor;
                } else {
                    cursors[pageNo+1] = null;
                }
                if(respData.entities.length ==0 && pageAction == 'no'){
                    getAppChatroomsuser(appUuid,groupid,'forward' );
                }else{
                    $('#showUsername').text(cuser)
                    $('tbody').html('');
                    $(respData.data).each(function(){

                        var members = this.member;
                        var owner = this.owner;
                        if(owner !=undefined){
                            $.cookie('owner',owner);

                            var selectOptions = '<tr>'+
                                '<td class="text-center" style="color:#FF0000;"><i class="icon-user"></i>&nbsp;'+owner+'</td>'+
                                '<td class="text-center">对群主禁用'+
                                '</td>'+
                                '</tr>';

                            $('#appIMBody').append(selectOptions);
                        }

                        if(members != undefined) {
                            var selectOptions = '<tr>'+
                                '<td class="text-center">'+members+'</td>'+
                                '<td class="text-center">'+
                                '<ul class="text-center" class="nav-pills" style="list-style-type:none">'+
                                '<li class="dropdown all-camera-dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">操作<b class="caret"></b></a>'+
                                '<ul class="dropdown-menu" style="left:200px">'+
                                '<li><a href="javascript:deleteAppChatroomUsers(\''+appUuid+'\',\''+groupid+'\',\''+members+'\')">移除</a></li>'+
                                '</ul>'+
                                '</li>'+
                                '</ul>'+
                                '</td>'+
                                '</tr>';
                            $('#appIMBody').append(selectOptions);

                        }
                    });
                }
                var tbody = document.getElementsByTagName("tbody")[0];
                if(!tbody.hasChildNodes()){
                    var option = '<tr><td class="text-center" colspan="3">无数据!</td></tr>';
                    $('#appIMBody').append(option);
                    var pageLi = $('#pagina').find('li');
                    for(var i=0;i<pageLi.length;i++){
                        $(pageLi[i]).hide();
                    }
                }
            }
        });
    }

}
// 删除app下的群组
function deleteAppChatroom(appUuid,groupuuid){
    var access_token = $.cookie('access_token');
    var orgName = $.cookie('orgName');

    if(confirm('确定要删除此群组吗?')){
        $.ajax({
            url:baseUrl + '/' +orgName +'/'+appUuid+'/chatgroups/' + groupuuid,
            type:'DELETE',
            headers:{
                'Authorization':'Bearer ' + access_token,
                'Content-Type':'application/json'
            },
            error:function(){
                alert('提示\n\n删除失败!');
            },
            success:function(respData){
                alert('提示\n\n删除成功!');
                window.location.href = 'app_chatgroups.html?appUuid='+appUuid;
            }
        });
    }
}
// 移除群组下的成员
function deleteAppChatroomUsers(appUuid,groupuuid,usersname){
    var access_token = $.cookie('access_token');
    var orgName = $.cookie('orgName');

    if(confirm('确定要把该成员移除此群组吗?')){
        $.ajax({
            url:baseUrl + '/' +orgName +'/'+appUuid+'/chatgroups/' +groupuuid+'/users/'+usersname,
            type:'DELETE',
            headers:{
                'Authorization':'Bearer ' + access_token,
                'Content-Type':'application/json'
            },
            error:function(){
                alert('提示\n\n移除失败!');
            },
            success:function(respData){
                alert('提示\n\n移除成功!');
                location.replace(location.href);
            }
        });
    }
}
// 添加群内成员
function addChatgroupMember(appUuid, groupid, newmember) {
    var orgName = $.cookie('orgName');
    var access_token = $.cookie('access_token');
    if (newmember == ''){
        $('#newmemberEMsg').text('请输入有效用户名!');
    }else{
        $.ajax({
            url:baseUrl+'/'+ orgName +'/' + appUuid +'/users/' + newmember,
            type:'POST',
            headers:{
                'Authorization':'Bearer '+access_token,
                'Content-Type':'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#newmemberEMsg').text('该用户不存在，请检查输入!');
            },
            success: function(respData, textStatus, jqXHR) {
                var owner = $.cookie('owner');
                if(newmember != owner){
                    $.ajax({
                        url:baseUrl + '/' +orgName +'/' + appUuid+'/chatgroups/' + groupid + '/users/' + newmember,
                        type:'POST',
                        headers:{
                            'Authorization':'Bearer '+access_token,
                            'Content-Type':'application/json'
                        },
                        error: function(jqXHR, textStatus, errorThrown) {

                        },
                        success: function(respData, textStatus, jqXHR) {
                            alert('添加成功');
                            //getAppChatroomsuser(appUuid, groupid);
                            location.replace(location.href);
                        }
                    });
                }else{
                    $('#newmemberEMsg').text('该用户已经是管理员不能添加!');
                }
            }
        });
    }
}


// 添加群组
function createNewChatgroups(appUuid,qunzuname,qunzumiaosu,approval,publics,qunzuguan){
    var orgName = $.cookie('orgName');
    var access_token = $.cookie('access_token');
    var owner_username = $('#usernameFriend').val();
    var maxusers = $('#maxusers').val();
    var friend_username = $('#friendUsername').val();

    if (qunzuname == ''){
        $('#groupnameSpan').text('群组名称不能为空!');
        return false;
    }

    if(qunzumiaosu ==''){
        $('#groupnameSpan').text('');
        $('#groupdescSpan').text('群组描述不能为空!');
        return false;
    }
    var maxusersReg = /^[0-9]+$/;
    if (maxusers == ''){
        $('#groupnameSpan').text('');
        $('#groupdescSpan').text('');
        $('#groupmaxuserSpan').text('请输入群组最大成员数!');
        return false;
    } else if(!(maxusersReg.test(maxusers) && parseInt(maxusers) >= 1)) {
        $('#groupmaxuserSpan').text('群组最大成员数只能是>1的数值!');
    }else if(qunzuguan==''){
        $('#groupnameSpan').text('');
        $('#groupdescSpan').text('');
        $('#groupmaxuserSpan').text('');
        $('#qunzuguanSpan').text('群组管理员不能为空');
        return false;
    }else{
        $('#groupnameSpan').text('');
        $('#groupdescSpan').text('');
        $('#groupmaxuserSpan').text('');
        $('#qunzuguanSpan').text('');
        var qun={
            "groupname":qunzuname,
            "desc":qunzumiaosu,
            "public":publics,
            "owner":qunzuguan,
            "maxusers":parseInt(maxusers)
        };
        if(publics==true){
            qun.approval=approval;
        }
        $.ajax({
            url:baseUrl + '/' +orgName +'/'+appUuid+'/chatgroups',
            type:'POST',
            data:JSON.stringify(qun),
            headers:{
                'Authorization':'Bearer '+access_token,
                'Content-Type':'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#qunzuguanSpan').text('该用户不存在，请检查用户名!');
            },
            success: function(respData, textStatus, jqXHR) {
                $('#qunzuguanSpan').text('');
                location.replace(location.href);
            }
        });
    }
}


// 批量删除app下的群组的Ajax
function deleteAppChatrooms(appUuid,groupuuid){
    var access_token = $.cookie('access_token');
    var orgName = $.cookie('orgName');
    $.ajax({
        async: false,
        url:baseUrl + '/' +orgName +'/'+appUuid+'/chatgroups/' + groupuuid,
        type:'DELETE',
        headers:{
            'Authorization':'Bearer ' + access_token,
            'Content-Type':'application/json'
        },
        error:function(){
        },
        success:function(respData){
        }
    });
}


//批量删除app下的群组调用
function deleteAppChatgroupsCheckBox(appUuid){
    var checkbox = document.getElementsByName("checkbox");
    var num = 0;
    for (var i=0;i<checkbox.length;i++){
        if(checkbox[i].checked){
            num++;
        }
    }
    if(num>0){
        if(confirm('确定要删除这些群组吗?')){
            for (var i=0;i<checkbox.length;i++){
                if(checkbox[i].checked){
                    deleteAppChatrooms(appUuid, checkbox[i].value);
                }
            }
            location.replace(location.href);
        }
    }else{
        alert('至少选择一个群组!');
    }
}

