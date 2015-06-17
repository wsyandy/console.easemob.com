/**
 * Created by kenshinn on 15-6-10.
 */

var Login = function(){

}();


$(function () {
    var browserVersion = getBrowserVersion();
    if (browserVersion != '' && browserVersion < 10) {
        alert($.i18n.prop('index_alert_IEDisable'));
    }

    //读取cookie
    if ($('#rememberme:checked').length > 0) {
        $('#username').val($.cookie('tvs-cookies-userName'));
        $('#password').val($.cookie('tvs-cookies-password'));
    } else {
        $('#username').val($.cookie('tvs-cookies-userName'));
        $('#password').val($.cookie('tvs-cookies-password'));
    }

    $('#username').focus();

    var QSTR = getQueryString('comeFrom');
    if (QSTR == 'easemobHome' || QSTR == '51cto') {
        $('#btnRegist').trigger('click');
    }

    checkBoxStatus();
});

/**
 * 判断浏览器;
 * @return
 */
function getBrowser() {
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        return "MSIE";
    }
    if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
        return "Firefox";
    }
    if (isChrome = navigator.userAgent.indexOf("Chrome") > 0) {
        return "Chrome";
    }
}

function checkBoxStatus() {
    if ($("#agreeCBox").prop("checked")) {
        $('#agreeCBoxEMsg').text('');
    }
}

/**
 * 判断浏览器具体版本号
 * @return
 */
function getBrowserVersion() {
    if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
        return "6";
    }
    if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
        return "7";
    }
    if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {
        return "8";
    }
    if (navigator.userAgent.indexOf("MSIE 9.0") > 0) {
        return "9";
    }
    if (navigator.userAgent.indexOf("MSIE 10.0") > 0) {
        return "10";
    }
    if (navigator.userAgent.indexOf("MSIE 11.0") > 0) {
        return "11";
    }
}

// 回车键登录
function keyLogin() {
    if (!$('#login-box').hasClass('visible')) {
        return;
    }
    if (getBrowser() == 'Firefox') {
        //判断IE还是火狐浏览器;
        $("html").die().live("keydown", function (event) {
            if (event.keyCode == 13) {
                //调用登陆方法;
                $('#loginBtn').click();//调用登录按钮的登录事件
                $('#loginBtn').attr('disable', 'true');
            }
        });
    } else if (getBrowser() == 'MSIE' || getBrowser() == 'Chrome') {
        if (event.keyCode == 13) {
            //调用登陆方法;
            $('#loginBtn').click();//调用登录按钮的登录事件
        }
    }
}

function onBlurRegOrgNameCheck() {
    $('#regOrgName').val($('#regOrgName').val().trim());

    var regOrgName = $('#regOrgName').val();
    var regOrgNameRegex = /^(?!-)(?!.*?-$)[a-zA-Z0-9-]+$/;
    if (regOrgName != '' && !regOrgNameRegex.test(regOrgName)) {
        $('#regOrgNameSMsg').css('display', 'none');
        $('#regOrgNameEMsg').text('只能使用数字,字母,横线,且不能以横线开头和结尾！');
        return;
    }
    if (regOrgName != '' && regOrgName.length < 1) {
        $('#regOrgNameSMsg').css('display', 'none');
        $('#regOrgNameEMsg').text('企业ID长度在至少一个字符！');
        return;
    }

    $('#regOrgNameSMsg').css('display', 'block');
    $('#regOrgNameEMsg').text('');
    $('#regOrgNameEMsg').css('display', 'block');
}

function onBlurRegUserNameCheck() {
    $('#regUserName').val($('#regUserName').val().trim());

    var regUserName = $('#regUserName').val();

    var regUserNameRegex = /^[0-9a-zA-Z]*$/;
    if (regUserName != '' && !regUserNameRegex.test(regUserName)) {
        $('#regUserNameSMsg').css('display', 'none');
        $('#regUserNameEMsg').text('只能使用字母,数字或字母数字组合！');
        return;
    }
    if (regUserName != '' && regUserName.length < 1) {
        $('#regUserNameSMsg').css('display', 'none');
        $('#regUserNameEMsg').text('用户长度在至少一个字符！');
        return;
    }

    $('#regUserNameSMsg').css('display', 'block');
    $('#regUserNameEMsg').text('');
    $('#regUserNameEMsg').css('display', 'block');
}

function onBlurRegPasswordCheck() {
    $('#regPassword').val($('#regPassword').val().trim());

    var regPassword = $('#regPassword').val();

    if (regPassword != '' && regPassword.length < 1) {
        $('#regPasswordSMsg').css('display', 'none');
        $('#regPasswordEMsg').text('密码长度在至少一个字符！');
        return;
    }

    $('#regPasswordSMsg').css('display', 'block');
    $('#regPasswordEMsg').text('');
}

function onBlurRegRePasswordCheck() {
    var regPassword = $('#regPassword').val();
    $('#regRePassword').val($('#regRePassword').val().trim());

    var regRePassword = $('#regRePassword').val();
    var regPassword = $('#regPassword').val();
    if ('' != regPassword && regPassword != regRePassword) {
        $('#regRePasswordEMsg').text('两次输入密码不一致！');
        return;
    }

    $('#regRePasswordEMsg').text('');
}

function onBlurRegEmailCheck() {
    $('#regEmail').val($('#regEmail').val().trim());
    var regEmail = $('#regEmail').val();

    var emailReg = /^([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z0-9]{1,10}$/;
    if (regEmail != '' && !emailReg.test(regEmail)) {
        $('#regEmailSEMsg').css('display', 'none');
        $('#regEmailEMsg').text('请输入有效的邮箱！');
        return;
    } else if (regEmail == '') {
        $('#regEmailSEMsg').css('display', 'none');
        return;
    }

    $('#regEmailEMsg').text('');
}

function onBlurRegCompanyNameCheck() {
    var regCompanyName = $('#regCompanyName').val();

    if (regCompanyName != '') {
        $('#regCompanyNameSEMsg').css('display', 'none');
        $('#regCompanyNameEMsg').text('');
        return;
    }

}


function onBlurRegTelCheck() {
    $('#regTel').val($('#regTel').val().trim());
    var regTel = $('#regTel').val();
    if (regTel != '' && !checkTel(regTel)) {
        $('#regTelSEMsg').css('display', 'none');
        $('#regTelEMsg').text('电话号码格式不正确！');
        return;
    } else if (regTel == '') {
        $('#regTelSEMsg').css('display', 'none');
        $('#regTelEMsg').text('');
        return;
    }
    $('#regTelEMsg').text('');
}

function onBlurCheckLoginUsername() {
    $('#username').val($('#username').val().trim());

    var loginUserName = $('#username').val();
    if ('' == loginUserName) {
        $('#usernameEMsg').text('用户名不能为空！');
        return false;
    }

    $('#usernameEMsg').text('');
}

function onBlurCheckLoginPassword() {
    var loginPassword = $('#password').val();
    if ('' == loginPassword) {
        $('#passwordEMsg').text('密码不能为空！');
        return false;
    }

    $('#passwordEMsg').text('');
}

function onBlurCheckResetEmail() {
    var resetEmail = $('#email').val();
    if ('' == resetEmail) {
        $('#emailEMsg').text('用户名不能为空！');
        return false;
    }

    $('#emailEMsg').text('');
}

function login() {
    orgAdminLogin();
}

function app_org() {
    var adminType = $('#loginRole').find('option:selected').val();
    if (adminType == 'app') {
        $('#qiyeid').show();
        $('#yingyongname').show();
        //appAdminLogin();
    } else if (adminType == 'org') {
        $('#qiyeid').hide();
        $('#yingyongname').hide();
    }
}

// 点击返回登录清空注册数据
function clearBox() {
    $('#regOrgName').val('');
    $('#regUserName').val('');
    $('#regPassword').val('');
    $('#regRePassword').val('');
    $('#regEmail').val('');
    $('#regCompanyName').val('');
    $('#regTel').val('');

    $('#regOrgNameEMsg').text('');
    $('#regUserNameEMsg').text('');
    $('#regPasswordEMsg').text('');
    $('#regRePasswordEMsg').text('');
    $('#regEmailEMsg').text('');
    $('#regTelEMsg').text('');
    $('#agreeCBoxEMsg').text('');
}


// 显示不同窗口
function show_box(boxId){
    // 登录
    if('login-box' == boxId){
        $('#login-box').addClass('visible');

        var oldSignupClassVal = $('#signup-box').attr('class');
        if(oldSignupClassVal.indexOf("visible") > -1){
            $('#signup-box').removeClass('visible');
        }

        var oldForgotClassVal = $('#forgot-box').attr('class');
        if(oldForgotClassVal.indexOf("visible") > -1){
            $('#forgot-box').removeClass('visible');
        }
    }
    // 注册
    if('signup-box' == boxId){
        $('#signup-box').addClass('visible');

        var oldLoginClassVal = $('#login-box').attr('class');
        if(oldLoginClassVal.indexOf("visible") > -1){
            $('#login-box').removeClass('visible');
        }

        var oldForgotClassVal = $('#forgot-box').attr('class');
        if(oldForgotClassVal.indexOf("visible") > -1){
            $('#forgot-box').removeClass('visible');
        }
    }
    // 找回密码
    if('forgot-box' == boxId){
        $('#forgot-box').addClass('visible');

        var oldLoginClassVal = $('#login-box').attr('class');
        if(oldLoginClassVal.indexOf("visible") > -1){
            $('#login-box').removeClass('visible');
        }

        var oldSignupClassVal = $('#signup-box').attr('class');
        if(oldSignupClassVal.indexOf("visible") > -1){
            $('#signup-box').removeClass('visible');
        }
    }
}

// 找回密码表单校验
function resetPasswdFormValidate(){
    // 表单校验
    var email = $('#email').val();

    if('' == email){
        $('#emailEMsg').text('请填写正确的企业管理员用户名！');
        $('#email').focus();
        return false;
    }

    $('#emailEMsg').text();
    return true;
}

// 找回密码
function resetPasswd(){
    var email = $('#email').val();
    var orgName = $('#orgName').val();

    if(resetPasswdFormValidate()){
        $.ajax({
            url:baseUrl + '/management/users/' + email + '/resetpw',
            type:'PUT',
            data:{},
            crossDomain:true,
            success:function(respData){
                if(respData.status && respData.status == 'ok') {
                    alert('提示!\n\n邮件已发送,请前往邮箱继续找回密码.');
                }
            },
            error:function(respData){
                var str = JSON.stringify(respData.responseText).replace('}','').replace('{','').split(',');
                var tmpArr = new Array();
                var errorMsg = '';
                for(var i = 0; i < str.length; i++) {
                    tmpArr.push(str[i].replace(/\\/g,'').replace(/\"/g,'').split(':'));
                }
                for(var i = 0; i < tmpArr.length; i++) {
                    if('error_description' == tmpArr[i][0]){
                        if(tmpArr[i][1].indexOf("Could not find organization for email") > -1 || tmpArr[i][1].indexOf("Could not find organization for username") > -1) {
                            errorMsg = '该邮箱未注册过环信!';
                        } else if(tmpArr[i][1].indexOf("username") > -1) {
                            errorMsg = '请联系系统管理员 !';
                        }
                    }
                }

                alert('提示\n\n' + errorMsg);
            }
        });
    }
}

// 找回密码表单校验
function resetPasswdReqFormValidate(){
    // 表单校验
    var password1 = $('#password1').val();
    var password2 = $('#password2').val();

    if('' == password1){
        alert('提示\n\n密码不能为空！');
        $('#password1').focus();
        return false;
    }
    if(password1.length < 6 || password1.length > 20){
        $('#password1').focus();
        alert('提示\n\n密码长度在6-20个字符之间！');
        return false;
    }
    if(password2 != password1){
        alert('提示\n\n两次输入密码不一致！');
        $('#password2').focus();
        return false;
    }

    return true;
}

// 注册表单校验
function regsFormValidate(){
    // 表单校验
    var regOrgName = $('#regOrgName').val();
    var regUserName = $('#regUserName').val();
    var regEmail = $('#regEmail').val();
    var regPassword = $('#regPassword').val();
    var regRePassword = $('#regRePassword').val();
    var regCompanyName = $('#regCompanyName').val();
    var regTel = $('#regTel').val();
    var comefrom = $('input:radio[name="comefrom"]:checked').val();

    if('' == regOrgName){
        $('#regOrgNameSMsg').css('display','none');
        $('#regOrgNameEMsg').text('企业ID名不能为空！');
        return false;
    }
    var regOrgNameRegex = /^(?!-)(?!.*?-$)[a-zA-Z0-9-]+$/;
    if(!regOrgNameRegex.test(regOrgName)){
        $('#regOrgNameSMsg').css('display','none');
        $('#regOrgNameEMsg').text('只能使用数字,字母,横线,且不能以横线开头和结尾！');
        return false;
    }
    if(regOrgName != '' && regOrgName.length < 1){
        $('#regOrgNameSMsg').css('display','none');
        $('#regOrgNameEMsg').text('企业ID长度至少一个字符！');
        return false;
    }
    $('#regOrgNameSMsg').css('display','block');

    if('' == regUserName){
        $('#regUserNameSMsg').css('display','none');
        $('#regUserNameEMsg').text('用户名不能为空！');
        return false;
    }
    var regUserNameRegex = /^[a-zA-Z0-9_\-./]*$/;
    if(!regUserNameRegex.test(regUserName)){
        $('#regUserNameEMsg').text('用户名至少一个字符，包括[字母,数字,下划线,横线,斜线,英文点]');
        return false;
    }
    if(regUserName != '' && regUserName.length < 1){
        $('#regUserNameSMsg').css('display','none');
        $('#regUserNameEMsg').text('用户长度至少一个字符！');
        return false;
    }
    $('#regUserNameSMsg').css('display','block');
    if('' == regPassword){
        $('#regPasswordSMsg').css('display','none');
        $('#regPasswordEMsg').text('密码不能为空！');
        return false;
    }
    if(regPassword.length < 1){
        $('#regPasswordEMsg').text('密码长度至少一个字符！');
        return false;
    }
    $('#regPasswordSMsg').css('display','block');
    if('' == regRePassword){
        $('#regRePasswordEMsg').text('请再次输入密码！');
        return false;
    }
    if('' != regRePassword && regPassword != regRePassword){
        $('#regRePasswordEMsg').text('两次密码不一致!');
        return false;
    }
    var emailReg = /^([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z0-9]{1,10}$/;
    if('' == regEmail){
        $('#regEmailEMsg').text('请输入邮箱！');
        return false;
    }
    if(regEmail != '' && !emailReg.test(regEmail)){
        $('#regEmailEMsg').text('请输入有效的邮箱！');
        return false;
    }

    if('' == regCompanyName){
        $('#regCompanyNameSEMsg').css('display','none');
        $('#regCompanyNameEMsg').text('请输入企业名称！');
        return false;
    }

    if('' == regTel){
        $('#regTelSEMsg').css('display','none');
        $('#regTelEMsg').text('请输入联系电话！');
        return false;
    }
    if(!checkTel(regTel)){
        $('#regTelSEMsg').css('display','none');
        $('#regTelEMsg').text('电话号码格式不正确！');
        return false;
    }

    if(typeof(comefrom) == 'undefined'){
        $('#comeFromEMsg').text('请选择获知渠道！');
        return false;
    }
    $('#comeFromEMsg').css('display','none');
    $('#comeFromEMsg').text('');

    if(!$("#agreeCBox").prop("checked")) {
        $('#agreeCBoxEMsg').text('请先同意环信开发者平台服务协议！');
        return false;
    }


    $('#regOrgNameEMsg').text('');
    $('#regUserNameEMsg').text('');
    $('#regPasswordEMsg').text('');
    $('#regRePasswordEMsg').text('');
    $('#regEmailEMsg').text('');
    $('#regCompanyNameEMsg').text('');
    $('#regTelEMsg').text('');
    $('#agreeCBoxEMsg').text('');

    return true;
}


//注册表单清空
function resetForm(){
    $('#regOrgName').val('');
    $('#regUserName').val('');
    $('#regPassword').val('');
    $('#regRePassword').val('');
    $('#regEmail').val('');
    $('#regCompanyName').val('');
    $('#regTel').val('');

    $('#regOrgNameEMsg').text('');
    $('#regUserNameEMsg').text('');
    $('#regPasswordEMsg').text('');
    $('#regRePasswordEMsg').text('');
    $('#regEmailEMsg').text('');
    $('#regCompanyNameEMsg').text('');
    $('#regTelEMsg').text('');
}

// 注册
function formSubmit(){
    var regOrgName = $('#regOrgName').val();
    var regUserName = $('#regUserName').val();
    var regEmail = $('#regEmail').val();
    var regPassword = $('#regPassword').val();
    var regCompanyName = $('#regCompanyName').val();
    var regTel = $('#regTel').val();
    var mailSuffix = regEmail.substring(regEmail.indexOf('@')+1);
    var comefrom = $('input:radio[name="comefrom"]:checked').val();


    var d = {
        organization:regOrgName,
        username:regUserName,
        email:regEmail,
        password:regPassword,
        companyName:regCompanyName,
        telephone:regTel,
        comefrom:comefrom
    };

    if(regsFormValidate()){
        // 注册用户信息
        $.ajax({
            url:baseUrl + '/management/organizations',
            type:'POST',
            crossDomain:true,
            headers:{
                'Content-Type':'application/json'
            },
            data:JSON.stringify(d),
            success: function(respData, textStatus, jqXHR) {
                $('#signup-box').removeClass('visible');
                $('#login-box').addClass('visible');
                $('#username').val(regUserName);

                window.location.href = 'regist_org_success.html?mailSuffix='+mailSuffix+'&regEmail='+regEmail;
            },
            error: function(respData, textStatus, jqXHR) {
                var str = JSON.stringify(respData.responseText).replace('}','').replace('{','').split(',');
                var tmpArr = new Array();
                var errorMsg = '';
                for(var i = 0; i < str.length; i++) {
                    tmpArr.push(str[i].replace(/\\/g,'').replace(/\"/g,'').split(':'));
                }
                for(var i = 0; i < tmpArr.length; i++) {
                    if('error_description' == tmpArr[i][0]){
                        if(tmpArr[i][1].indexOf("path") > -1) {
                            errorMsg = '企业ID重复！';
                        }
                        if(tmpArr[i][1].indexOf("username") > -1) {
                            errorMsg = '用户名重复 !';
                        }
                        if(tmpArr[i][1].indexOf("email") > -1) {
                            errorMsg = '邮箱账户重复 !';
                        }
                    }
                }
                alert('注册失败!\n\n' + errorMsg);
            }
        });
    }
}


// 登录表单校验
function loginFormValidate(){
    // 表单校验
    var loginUserName = $('#username').val();
    var loginPassword = $('#password').val();
    if('' == loginUserName){
        $('#usernameEMsg').text('用户名不能为空！');
        $('#username').focus();
        return false;
    }
    if('' == loginPassword){
        $('#passwordEMsg').text('密码不能为空！');
        $('#password').focus();
        return false;
    }

    $('#usernameEMsg').text('');
    $('#passwordEMsg').text('');
    return true;
}

// ORG管理员登录
function orgAdminLogin() {
    var loginUser = $('#username').val();
    var d = {
        'grant_type':'password',
        'username':loginUser,
        'password':$('#password').val()
    };
    if($('#rememberme:checked').length>0){
        $.cookie('tvs-cookies-userName',$('#username').val());
        $.cookie('tvs-cookies-password',$('#password').val());
    }else{
        $.cookie('tvs-cookies-userName','');
        $.cookie('tvs-cookies-password','');
    }
    if(loginFormValidate()){
        $('#cont').text('登录中...');
        $('#loginBtn').attr("disabled",true);

        // 登录获取token
        $.ajax({
            url:baseUrl+'/management/token',
            type:'POST',
            data:JSON.stringify(d),
            headers:{
                'Content-Type':'application/json'
            },
            crossDomain:true,
            error: function(respData, textStatus, errorThrown) {
                $('#cont').text('登录');
                $('#loginBtn').attr("disabled",false);

                var str = JSON.stringify(respData.responseText).replace('}','').replace('{','').split(',');
                var tmpArr = new Array();
                var errorMsg = '';
                for(var i = 0; i < str.length; i++) {
                    tmpArr.push(str[i].replace(/\\/g,'').replace(/\"/g,'').split(':'));
                }
                for(var i = 0; i < tmpArr.length; i++) {
                    if('error_description' == tmpArr[i][0]){
                        if(tmpArr[i][1].indexOf("User must be confirmed to authenticate") > -1) {
                            errorMsg = '登陆失败，账户未激活!';
                        }
                        if(tmpArr[i][1].indexOf("invalid username or password") > -1) {
                            errorMsg = '登陆失败，用户名或者密码错误!';
                        }
                    }
                }
                alert(errorMsg);
            },
            success: function(respData, textStatus, jqXHR) {
                var access_token = respData.access_token;
                var cuser = respData.user.username;
                var cuserName = respData.user.username;
                var email = respData.user.email;
                var companyName = respData.user.properties.companyName;
                var telephone = respData.user.properties.telephone;
                var orgName = '';
                var orgs = respData.user.organizations;

                $.each(orgs, function(i) {
                    orgName = i;
                });

                if(orgName == '') {
                    alert('抱歉,系统找不到该用户对应的企业ID.\n请联系系统管理员!');
                    window.location.href = 'index.html';
                } else {
                    var date = new Date();
                    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
                    $.cookie('access_token', access_token,{path:'/',expires:date});
                    $.cookie('cuser', cuser,{path:'/',expires:date});
                    $.cookie('cuserName', cuserName,{path:'/',expires:date});
                    $.cookie('email', email,{path:'/',expires:date});
                    $.cookie('orgName', orgName,{path:'/',expires:date});
                    $.cookie('companyName', companyName,{path:'/',expires:date});
                    $.cookie('telephone', telephone,{path:'/',expires:date});

                    window.location.href = 'app_list.html';
                    location.replace('app_list.html');
                }
            }
        });
    } else {
        $('#cont').text('登录');
        $('#loginBtn').attr("disabled",false);
    }
}