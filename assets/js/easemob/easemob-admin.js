/**
 * Created by kenshinn on 15-6-10.
 */


// 登录用户信息
function loginAdminInfo(){
    // get org admin token
    var access_token = $.cookie('access_token');
    var cuser = $.cookie('cuser');
    var orgName = $.cookie('orgName');
    var companyName = $.cookie('companyName');
    var telephone = $.cookie('telephone');
    var email = $.cookie('email');
    if(!access_token || access_token==''){
        alert('提示\n\n会话已失效,请重新登录!');
        window.location.href = 'index.html';
    } else {
        $('#username').text(cuser);
        $('#email').text(email);
        $('#companyName').text(companyName);
        $('#telephone').text(telephone);
    }
}



// 修改登录用户信息
function updateAdminInfo(username, companyName, telephone){
    // get org admin token
    var access_token = $.cookie('access_token');
    var cuser = $.cookie('cuser');
    var orgName = $.cookie('orgName');
    var d = {};
    if(companyName != '' && companyName != null){
        d.companyName = companyName;
    }
    if(telephone != '' && telephone != null){
        d.telephone = telephone;
    }

    if(!access_token || access_token==''){
        alert('提示\n\n会话已失效,请重新登录!');
        window.location.href = 'index.html';
    } else {
        $.ajax({
            url: baseUrl + '/management/users/' + username,
            type:'PUT',
            data:JSON.stringify(d),
            headers:{
                'Authorization':'Bearer ' + access_token,
                'Content-Type':'application/json'
            },
            error:function(respData, textStatus, jqXHR){
            },
            success:function(respData, textStatus, jqXHR){
                alert('修改成功!');

                $('#companyNameInput').val('');
                $('#telephoneInput').val('');
                $('#companyNameInput').hide();
                $('#telephoneInput').hide();
                $('#showEditBtn').show();
                $('#saveAdminInfoBtn').hide();
                $('#cancelSaveAdminInfoBtn').hide();
                $('#telephone').show();
                $('#companyName').show();

                var date = new Date();
                date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
                $.cookie('companyName', companyName,{path:'/',expires:date});
                $.cookie('telephone', telephone,{path:'/',expires:date});

                loginAdminInfo();
            }
        });
    }
}

// 修改登录用户密码表单校验
function updateAdminPasswdFormValidate(){
    // 表单校验
    var oldpassword = $('#oldpassword').val();
    var newpassword = $('#newpassword').val();
    var renewpassword = $('#renewpassword').val();

    if('' == oldpassword){
        $('#oldpasswordEMsg').text('原密码不能为空！');
        $('#oldpassword').focus();
        return false;
    }
    $('#oldpasswordEMsg').text('');
    if('' == newpassword){
        $('#newpasswordEMsg').text('新密码不能为空！');
        $('#newpassword').focus();
        return false;
    }

    if(newpassword.length < 6 || newpassword.length > 20){
        $('#newpasswordEMsg').text('新密码长度在6-20个字符之间！');
        $('#newpassword').focus();
        return false;
    }
    $('#newpasswordEMsg').text('');
    if(renewpassword != newpassword){
        $('#renewpasswordEMsg').text('两次新密码不一致');
        return false;
    }

    $('#renewpasswordEMsg').text('');
    return true;
}

// 修改登录用户密码
validateAccessToken = '';
function updateAdminPasswd() {
    var access_token = $.cookie('access_token');
    var oldpassword = $('#oldpassword').val();
    var	newpassword = $('#newpassword').val();
    var username = $.cookie('cuser');
    var d = {
        'oldpassword':oldpassword,
        'newpassword':newpassword
    }
    var dtoken = {
        'grant_type':'password',
        'username':username,
        'password':oldpassword
    }
    if(updateAdminPasswdFormValidate()){
        //校验旧密码
        $.ajax({
            url:baseUrl+'/management/token',
            type:'POST',
            data:JSON.stringify(dtoken),
            error: function(jqXHR, textStatus, errorThrown) {
                $('#oldpasswordEMsg').text('原密码不正确!');
            },
            success: function(respData, textStatus, jqXHR) {
                if(respData.access_token == ''){
                    return ;
                }

                $.ajax({
                    url:baseUrl + '/management/users/' + username + '/password',
                    type:'POST',
                    data:JSON.stringify(d),
                    headers:{
                        'Content-Type':'application/json'
                    },
                    success:function(respData){
                        alert('提示!\n密码修改成功!');
                    },
                    error:function(data){
                        alert('提示!\n密码修改失败!');
                    }
                });
            }
        });
    }

}


// 获取orgadmin列表
function getOrgAdminList(){
    // 获取token
    var access_token = $.cookie('access_token');
    var orgName = $.cookie('orgName');
    var loginUser = $.cookie('cuser');
    if(!access_token || access_token==''){
        alert('提示\n\n会话已失效,请重新登录!');
        window.location.href = 'index.html';
    } else {
        var loading = '<tr id="tr_loading"><td class="text-center" colspan="9"><img src ="assets/img/loading.gif">&nbsp;&nbsp;&nbsp;<span>正在读取数据...</span></td></tr>';
        $('#orgadminsBody').empty();
        $('#orgadminsBody').append(loading);

        $.ajax({
            url:baseUrl+'/management/organizations/'+ orgName +'/users',
            type:'GET',
            headers:{
                'Authorization':'Bearer ' + access_token,
                'Content-Type':'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
            },
            success: function(respData, textStatus, jqXHR) {
                $('tbody').html('');
                var selectOptions = '';
                $(respData.data).each(function(){
                    var username = this.username;
                    var confirmedStr = (this.confirmed == true) ? "已激活" : "未激活";
                    var email = this.email;
                    var companyName = this.properties.companyName;
                    var telephone = this.properties.telephone;

                    var ops = '';
                    if(username != loginUser){
                        ops = '<li class="dropdown all-camera-dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">操作<b class="caret"></b></a>'+
                            '<ul class="dropdown-menu">'+'<li data-filter-camera-type="all"><a href="javascript:disConnAdminAndOrg(\''+username+'\')">移出管理员</a></li>';
                    } else {
                        ops = '当前登录账户禁止操作';
                    }

                    selectOptions += '<tr>'+
                        '<td class="text-center">'+username+'</td>'+
                        '<td class="text-center">'+email+'</td>'+
                        '<td class="text-center">'+companyName+'</td>'+
                        '<td class="text-center">'+telephone+'</td>'+
                        '<td class="text-center">'+confirmedStr+'</td>'+
                        '<td class="text-center">'+
                        '<ul class="nav-pills" style="list-style-type:none">'+ ops
                    '</ul>'+
                    '</li>'+
                    '</ul>'+
                    '</td>'+
                    '</tr>';
                });
                $('#tr_loading').remove();
                $('#orgadminsBody').append(selectOptions);
                // 无数据
                var tbody = document.getElementsByTagName("tbody")[0];
                if(!tbody.hasChildNodes()){
                    var option = '<tr><td class="text-center" colspan="9">无数据!</td></tr>';
                    $('#tr_loading').remove();
                    $('#orgadminsBody').append(option);
                }
            }
        });
    }
}

// remove user from organization
function disConnAdminAndOrg(adminUserName){
    var access_token = $.cookie('access_token');
    var orgName = $.cookie('orgName');
    var loginUser = $.cookie('cuser');
    if(!access_token || access_token==''){
        alert('提示\n\n会话已失效,请重新登录!');
        window.location.href = 'index.html';
    } else {
        if(adminUserName != ''){
            if(loginUser == adminUserName){
                alert('当前登录账户禁止操作');
                return;
            } else {
                if(confirm("确定要移出该管理员吗?")){
                    $.ajax({
                        url:baseUrl　+　'/management/users/' + adminUserName + '/orgs/' + orgName,
                        type:'DELETE',
                        headers:{
                            'Authorization':'Bearer ' + access_token,
                            'Content-Type':'application/json'
                        },
                        error: function(respData, textStatus, jqXHR) {
                            var error_description = jQuery.parseJSON(respData.responseText).error_description;
                            if('Organizations must have at least one member.' == error_description){
                                alert('企业管理员至少要有一个!!');
                            } else {
                                alert('移出管理员失败!');
                            }
                        },
                        success: function(respData, textStatus, jqXHR) {
                            var orgname = respData.data.name;
                            if(orgName == orgname){
                                alert('移出管理员成功!');
                                window.location.href = 'admin_list.html';
                            }
                        }
                    });
                }
            }
        }
    }
}

// 增加orgadminuser表单校验
function createAdminUserFormValidate(){
    // 表单校验
    $('#adminUserName').val($('#adminUserName').val().trim());
    var adminUserName = $('#adminUserName').val();
    if(adminUserName == ''){
        $('#adminUserNameMsg').hide();
        $('#adminUserNameEEMsg').hide();
        $('#adminUserNameEMsg').show();
        $('#adminUserNameOMsg').hide();
        return false;
    }
    var adminUserNameRegex = /^[0-9a-zA-Z]*$/;
    if(adminUserName != '' && !adminUserNameRegex.test(adminUserName)){
        $('#adminUserNameMsg').hide();
        $('#adminUserNameOMsg').hide();
        $('#adminUserNameEEMsg').hide();
        $('#adminUserNameEMsg').show();
        return false;
    }

    $('#adminPassword').val($('#adminPassword').val().trim());
    var adminPassword = $('#adminPassword').val();
    if(adminPassword == ''){
        $('#adminPasswordMsg').show();
        $('#adminPasswordOMsg').hide();
        return false;
    }

    $('#adminRePassword').val($('#adminRePassword').val().trim());
    var adminRePassword = $('#adminRePassword').val();
    var adminPassword = $('#adminPassword').val();

    if(adminRePassword == ''){
        $('#adminRePasswordMsg').hide();
        $('#adminRePasswordEMsg').show();
        $('#adminRePasswordEMsg').show();
        return false;
    }
    if('' != adminRePassword && adminPassword != adminRePassword){
        $('#adminRePasswordMsg').hide();
        $('#adminRePasswordEMsg').show();
        $('#adminRePasswordOMsg').hide();
        return false;
    }

    $('adminEmail').val($('#adminEmail').val().trim());
    var adminEmail = $('#adminEmail').val();
    if(adminEmail == ''){
        $('#adminEmailMsg').show();
        $('#adminEmailEMsg').hide();
        $('#adminEmailEEMsg').hide();
        $('#adminEmailOMsg').hide();
        return false;
    }
    var adminEmailRegex = /^([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z0-9]{1,10}$/;
    if(adminEmail != '' && !adminEmailRegex.test(adminEmail)){
        $('#adminEmailMsg').hide();
        $('#adminEmailEMsg').show();
        $('#adminEmailEEMsg').hide();
        $('#adminEmailOMsg').hide();
        return false;
    }

    var adminCompany = $('#adminCompany').val();
    if(adminCompany == ''){
        $('#adminCompanyMsg').show();
        $('#adminCompanyEMsg').hide();
        $('#adminCompanyOMsg').hide();
        return false;
    }
    var adminCompanyRegex = /^[0-9a-zA-Z\-_\u4e00-\u9faf]*$/;
    if (adminCompany != '' && !adminCompanyRegex.test(adminCompany)) {
        $('#adminCompanyMsg').hide();
        $('#adminCompanyEMsg').show();
        $('#adminCompanyOMsg').hide();
        return false;
    }

    $('#adminTel').val($('#adminTel').val().trim());
    var regTel = $('#adminTel').val();
    if(regTel == ''){
        $('#adminTelMsg').show();
        $('#adminTelEMsg').hide();
        $('#adminTelOMsg').hide();
        return false;
    }

    if(regTel != '' && !checkTel(regTel)){
        $('#adminTelMsg').hide();
        $('#adminTelEMsg').show();
        $('#adminTelOMsg').hide();
        return false;
    }

    return true;
}

// 添加企业管理员
function saveNewAdminUserSubmit(adminUsername, adminPassword, adminEmail, adminCompany, adminTel){
    var access_token = $.cookie('access_token');
    var orgName = $.cookie('orgName');

    if(!access_token || access_token=='') {
        alert('提示\n\n会话已失效,请重新登录!');
        window.location.href = 'index.html';
    } else {
        if(createAdminUserFormValidate()){
            if(confirm("确定提交?")) {
                var data ={
                    username:adminUsername,
                    password:adminPassword,
                    email:adminEmail,
                    companyName:adminCompany,
                    telephone:adminTel,
                    category:'admin_append'
                };

                // 创建管理员用户
                $.ajax({
                    url:baseUrl+'/management/users',
                    type:'POST',
                    headers:{
                        'Authorization':'Bearer ' + access_token,
                        'Content-Type':'application/json'
                    },
                    async:false,
                    data:JSON.stringify(data),
                    error: function(respData, textStatus, errorThrown) {
                        var error_description = jQuery.parseJSON(respData.responseText).error_description;
                        if(error_description.indexOf("Entity user requires that property named username be unique") > -1) {
                            $('#adminUserNameEEMsg').show();
                            $('#adminUserNameEMsg').hide();
                            $('#adminUserNameOMsg').hide();
                        } else if(error_description.indexOf("Entity user requires that property named email be unique") > -1) {
                            $('#adminEmailEEMsg').show();
                            $('#adminEmailOMsg').hide();
                            $('#adminEmailEMsg').hide();
                        } else {
                            alert('添加APP管理员失败!');
                        }
                    },
                    success: function(respData, textStatus, jqXHR) {
                        clearNewAdminUserBox();
                        var adminUserName = respData.data.username;
                        if(adminUserName != '') {
                            //　建立关系
                            $.ajax({
                                url:baseUrl　+　'/management/users/' + adminUserName + '/orgs/' + orgName,
                                type:'PUT',
                                headers:{
                                    'Authorization':'Bearer ' + access_token,
                                    'Content-Type':'application/json'
                                },
                                error: function(jqXHR, textStatus, errorThrown) {
                                    alert('管理员添加失败!');
                                },
                                success: function(respData, textStatus, jqXHR) {
                                    var orgname = respData.data.name;
                                    if(orgName == orgname){
                                        alert('添加管理员成功!\n请查收邮件并激活该账户,确保正常使用!');
                                        window.location.href = 'admin_list.html';
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    }
}





