/**
 * Created by kenshinn on 15-6-10.
 */

$(function () {
    var browserVersion = getBrowserVersion();
    if (browserVersion != '' && browserVersion < 10) {
        alert('系统检测到您的浏览器版本是IE10以下,为了不影响您的使用,建议先升级浏览器或更换其它浏览器!')
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