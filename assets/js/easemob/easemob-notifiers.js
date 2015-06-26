/**
 * Created by kenshinn on 15-6-10.
 */

// 查询证书信息
function getAppCertificateIOS(pageAction){
    $('#paginauIOS').html('');
    var access_token = $.cookie('access_token');
    var orgName = $.cookie('orgName');
    var appName = $.cookie('appName');
    if('next' == pageAction){
        pageNo += 1;
    } else if('forward' == pageAction){
        pageNo -= 1;
    }
    var temp = '';
    if(typeof(pageAction)!='undefined' && pageAction != ''){
        temp = '&cursor='+cursors[pageNo];
    }

    var loading = '<tr id="tr_loading"><td class="text-center" colspan="6"><img src ="/assets/img/loading.gif">&nbsp;&nbsp;&nbsp;' + $.i18n.prop('app_notifiers_tableIOS_loading') + '</span></td></tr>';
    $('#appCredentialBodyIOS').empty();
    $('#appCredentialBodyIOS').append(loading);
    $.ajax({
        url:baseUrl+'/'+ orgName +'/' + appName + '/notifiers?limit=8'+temp,
        type:'GET',
        headers:{
            'Authorization':'Bearer ' + access_token,
            'Content-Type':'application/json'
        },
        error: function(jqXHR, textStatus, errorThrown) {

        },
        success: function(respData, textStatus, jqXHR) {
            if(pageAction != 'forward'){
                cursors[pageNo + 1] =	respData.cursor;
            } else {
                cursors[pageNo + 1] = null;
            }

            var option = '';
            var IOSCertificates = [];
            $(respData.entities).each(function(){

                var certificate = {};
                if(this.provider == 'APNS'){
                    var environment = '';
                    if(this.environment == 'DEVELOPMENT') {
                        environment = $.i18n.prop('app_notifiers_tableIOS_notifier_dev');
                    } else if(this.environment == 'PRODUCTION'){
                        environment = $.i18n.prop('app_notifiers_tableIOS_notifier_production');
                    }
                    certificate.name = this.name;
                    certificate.certificateId = this.uuid;
                    certificate.provider = this.provider;
                    certificate.created = format(this.created);
                    certificate.modified = format(this.modified);
                    certificate.environment = environment;
                    IOSCertificates.push(certificate);
                }
            });


            $(IOSCertificates).each(function(){
                var name = this.name;
                var certificateId = this.uuid;
                var provider = this.provider;
                if(provider == 'APNS'){
                    var environment = '';
                    if(this.environment == 'DEVELOPMENT') {
                        environment = $.i18n.prop('app_notifiers_tableIOS_notifier_dev');
                    } else if(this.environment == 'PRODUCTION'){
                        environment = $.i18n.prop('app_notifiers_tableIOS_notifier_production');
                    }

                    var created = format(this.created);
                    var modified = format(this.modified);
                    option += '<tr>'+
                        '<td class="text-center">'+name+'</td>'+
                        '<td class="text-center">'+environment+'</td>'+
                        '<td class="text-center">'+created+'</td>'+
                        '<td class="text-center">'+modified+'</td>'+
                        '<td class="text-center">&nbsp;<a href="javascript:void(0);" onclick="deleteAppNotifiersIOS(\''+ certificateId + '\',\''+ appName +'\')">' + $.i18n.prop('app_notifiers_tableIOS_notifier_delete') + '</a></td>'+
                        '</tr>';
                }
            });


            $('#appCredentialBodyIOS').html('');
            $('#appCredentialBodyIOS').append(option);

            var tbody = document.getElementsByTagName("tbody")[0];
            if(!tbody.hasChildNodes()){
                var option = '<tr><td class="text-center" colspan="6">'+$.i18n.prop('table_data_nodata')+'</td></tr>';
                $('#tr_loading').remove();
                $('#appUserAdminBody').append(option);
                var pageLi = $('#paginauIOS').find('li');
                for(var i=0;i<pageLi.length;i++){
                    $(pageLi[i]).hide();
                }
            } else {
                var ulB = '<ul>';
                var ulE = '</ul>';
                var textOp1 = '<li> <a href="javascript:void(0);" onclick="getPrevAppNotifiersIOS();">' + $.i18n.prop('app_notifiers_tableIOS_notifier_nav_previous') + '</a> </li>';
                var textOp2 = '<li> <a href="javascript:void(0);" onclick="getNextAppNotifiersIOS();">' + $.i18n.prop('app_notifiers_tableIOS_notifier_nav_next') + '</a> </li>';
                $('#paginau').html('');

                // 首页
                if(pageNo == 1){
                    if(respData.cursor == null){
                        $('#paginauIOS').append(ulB + ulE);
                    } else {
                        $('#paginauIOS').append(ulB + textOp2 + ulE);
                    }
                    // 尾页
                } else if(cursors.length != 0 && respData.cursor == null){
                    $('#paginauIOS').append(ulB + textOp1 + ulE);
                } else {
                    $('#paginauIOS').append(ulB + textOp1 + textOp2 + ulE);
                }
            }
            if(IOSCertificates.length == 0){
                var option = '<tr><td class="text-center" colspan="6">' + $.i18n.prop('app_notifiers_tableIOS_notifier_nodata') + '</td></tr>';
                $('#appCredentialBodyIOS').append(option);
            }
        }
    });
}





// 查询证书信息
function getAppCertificateAndroid(pageAction){
    $('#paginauAndroid').html('');
    var access_token = $.cookie('access_token');
    var orgName = $.cookie('orgName');
    var appName = $.cookie('appName');
    if('next' == pageAction){
        pageNo += 1;
    } else if('forward' == pageAction){
        pageNo -= 1;
    }
    var temp = '';
    if(typeof(pageAction)!='undefined' && pageAction != ''){
        temp = '&cursor='+cursors[pageNo];
    }

    var loading = '<tr id="tr_loading"><td class="text-center" colspan="6"><img src ="/assets/img/loading.gif">&nbsp;&nbsp;&nbsp;' + $.i18n.prop('app_notifiers_tableAndroid_loading') + '</span></td></tr>';
    $('#appCredentialBodyAndroid').empty();
    $('#appCredentialBodyAndroid').append(loading);
    $.ajax({
        url:baseUrl+'/'+ orgName +'/' + appName + '/notifiers?limit=8'+temp,
        type:'GET',
        headers:{
            'Authorization':'Bearer ' + access_token,
            'Content-Type':'application/json'
        },
        error: function(jqXHR, textStatus, errorThrown) {

        },
        success: function(respData, textStatus, jqXHR) {
            if(pageAction != 'forward'){
                cursors[pageNo + 1] =	respData.cursor;
            } else {
                cursors[pageNo + 1] = null;
            }

            var option = '';
            var AndroidCertificates = [];
            $(respData.entities).each(function(){
                var certificate = {};
                if(this.provider == 'Android'){
                    certificate.name = this.name;
                    certificate.certificateId = this.uuid;
                    certificate.provider = this.provider;
                    certificate.created = format(this.created);
                    certificate.modified = format(this.modified);
                    AndroidCertificates.push(certificate);
                }
            });

            $(AndroidCertificates).each(function(){
                var name = this.name;
                var certificateId = this.uuid;
                var provider = this.provider;
                if(provider == 'Android'){
                    var environment = '';
                    if(this.environment == 'DEVELOPMENT') {
                        environment = $.i18n.prop('app_notifiers_tableAndroid_notifier_dev');
                    } else if(this.environment == 'PRODUCTION'){
                        environment = $.i18n.prop('app_notifiers_tableAndroid_notifier_production');
                    }

                    var created = format(this.created);
                    var modified = format(this.modified);
                    option += '<tr>'+
                        '<td class="text-center">'+name+'</td>'+
                        '<td class="text-center">'+environment+'</td>'+
                        '<td class="text-center">'+environment+'</td>'+
                        '<td class="text-center">'+created+'</td>'+
                        '<td class="text-center">'+modified+'</td>'+
                        '<td class="text-center">&nbsp;<a href="javascript:void(0);" onclick="deleteAppNotifiersAndroid(\''+ certificateId + '\',\''+ appName +'\')">' + $.i18n.prop('app_notifiers_tableAndroid_notifier_delete') + '</a></td>'+
                        '</tr>';
                }
            });


            $('#appCredentialBodyAndroid').html('');
            $('#appCredentialBodyAndroid').append(option);

            var tbody = document.getElementsByTagName("tbody")[0];
            if(!tbody.hasChildNodes()){
                var option = '<tr><td class="text-center" colspan="6">'+$.i18n.prop('table_data_nodata')+'</td></tr>';
                $('#tr_loading').remove();
                $('#appUserAdminBody').append(option);
                var pageLi = $('#paginauAndroid').find('li');
                for(var i=0;i<pageLi.length;i++){
                    $(pageLi[i]).hide();
                }
            } else {
                var ulB = '<ul>';
                var ulE = '</ul>';
                var textOp1 = '<li> <a href="javascript:void(0);" onclick="getPrevAppNotifiersAndroid();">' + $.i18n.prop('app_notifiers_tableAndroid_notifier_nav_previous') + '</a> </li>';
                var textOp2 = '<li> <a href="javascript:void(0);" onclick="getNextAppNotifiersAndroid();">' + $.i18n.prop('app_notifiers_tableAndroid_notifier_nav_next') + '</a> </li>';
                $('#paginauAndroid').html('');

                // 首页
                if(pageNo == 1){
                    if(respData.cursor == null){
                        $('#paginauAndroid').append(ulB + ulE);
                    } else {
                        $('#paginauAndroid').append(ulB + textOp2 + ulE);
                    }
                    // 尾页
                } else if(cursors.length != 0 && respData.cursor == null){
                    $('#paginauAndroid').append(ulB + textOp1 + ulE);
                } else {
                    $('#paginauAndroid').append(ulB + textOp1 + textOp2 + ulE);
                }
            }
            if(AndroidCertificates.length == 0){
                var option = '<tr><td class="text-center" colspan="6">' + $.i18n.prop('app_notifiers_tableAndroid_notifier_nodata') + '</td></tr>';
                $('#appCredentialBodyAndroid').append(option);
            }
        }
    });
}

// 删除开发者推送证书
function deleteAppNotifiersIOS(credentialId){
    var access_token = $.cookie('access_token');
    var orgName = $.cookie('orgName');
    var appName = $.cookie('appName');
    if(confirm($.i18n.prop('app_notifiers_delete_confirm'))){
        var layerNum = layer.load($.i18n.prop('app_notifiers_delete_layer_pending'));
        $.ajax({
            url:baseUrl+'/'+ orgName +'/' + appName + '/notifiers/' + credentialId,
            type:'DELETE',
            headers:{
                'Authorization':'Bearer ' + access_token,
                'Content-Type':'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
                layer.close(layerNum);
                alert($.i18n.prop('app_notifiers_delete_failed'))
            },
            success: function(respData, textStatus, jqXHR) {
                layer.close(layerNum);
                alert($.i18n.prop('app_notifiers_delete_succ'))
                getAppCertificateIOS('no');
            }
        });
    }
}


// 删除开发者推送证书
function deleteAppNotifiersAndroid(credentialId){
    var access_token = $.cookie('access_token');
    var orgName = $.cookie('orgName');
    var appName = $.cookie('appName');
    if(confirm($.i18n.prop('app_notifiers_delete_confirm'))){
        var layerNum = layer.load($.i18n.prop('app_notifiers_delete_layer_pending'));
        $.ajax({
            url:baseUrl+'/'+ orgName +'/' + appName + '/notifiers/' + credentialId,
            type:'DELETE',
            headers:{
                'Authorization':'Bearer ' + access_token,
                'Content-Type':'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
                layer.close(layerNum);
                alert($.i18n.prop('app_notifiers_delete_failed'))
            },
            success: function(respData, textStatus, jqXHR) {
                layer.close(layerNum);
                alert($.i18n.prop('app_notifiers_delete_succ'))
                getAppCertificateIOS('no');
            }
        });
    }
}



// 上一页数据
function getPrevAppNotifiersIOS() {
    getAppCertificateIOS('forward');
}
function getPrevAppNotifiersAndroid() {
    getAppCertificateAndroid('forward');
}
// 下一页数据
function getNextAppNotifiersIOS() {
    getAppCertificateIOS('next');
}
function getNextAppNotifiersAndroid() {
    getAppCertificateAndroid('next');
}


function check() {
    if (count == 0) {
        count++;
        return true;
    } else {
        return false;
    }
}

function submitIOSCertificateForm() {
    if (check()) {
        var access_token = $.cookie('access_token');
        var orgName = $.cookie('orgName');
        var appName = $.cookie('appName');

        var notifierName = $('#nameIOS').val();
        var passphrase = $('#passphraseIOS').val();

        var notifierNameRegex = /^[A-Za-z0-9]{1,10}$/;
        var notifierPassPhraseRegex = /^[A-Za-z0-9]{1,40}$/;
        if (!notifierNameRegex.test(notifierName)) {
            alert($.i18n.prop('app_notifiers_formIOS_name_illegal'));
            return;
        }
        if (!validateSuffix($('#file').val())) {
            return;
        }
        if (!notifierPassPhraseRegex.test(passphrase)) {
            alert($.i18n.prop('app_notifiers_formIOS_phrase_illegal'));
            return;
        }

        var ajax_option = {
            url: baseUrl + '/' + orgName + '/' + appName + '/notifiers',
            headers: {
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip,deflate',
                'Authorization': 'Bearer ' + access_token,
            },
            success: function (data) {
                layer.close(layerNum);
                alert($.i18n.prop('app_notifiers_formIOS_save_succ'));
                //clear form
                $('#nameIOS').val('');
                $('#passphraseIOS').val('');

                getAppCertificateIOS();
            },
            error: function (data) {
                layer.close(layerNum);
                alert($.i18n.prop('app_notifiers_formIOS_save_failed'));
            }
        };
        var layerNum = layer.load($.i18n.prop('app_notifiers_layer_pending'), 3);
        $('#certificateFormIOS').ajaxSubmit(ajax_option);
    }
}

function submitAndroidCertificateForm() {
    if (check()) {
        var access_token = $.cookie('access_token');
        var orgName = $.cookie('orgName');
        var appName = $.cookie('appName');

        var notifierName = $('#nameAndroid').val();
        var passPhrase = $('#passphraseAndroid').val();
        var notifierNameRegex = /^[A-Za-z0-9]{1,10}$/;
        var notifierPassPhraseRegex = /^[A-Za-z0-9]{1,40}$/;
        if (!notifierNameRegex.test(notifierName)) {
            alert($.i18n.prop('app_notifiers_formAndroid_name_illegal'));
            return;
        }
        if (!notifierPassPhraseRegex.test(passPhrase)) {
            alert($.i18n.prop('app_notifiers_formAndroid_phrase_illegal'));
            return;
        }

        var ajax_option = {
            url: baseUrl + '/' + orgName + '/' + appName + '/notifiers',
            headers: {
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip,deflate',
                'Authorization': 'Bearer ' + access_token
            },
            success: function (data) {
                layer.close(layerNum);
                alert($.i18n.prop('app_notifiers_formAndroid_save_succ'));
                //clear form
                $('#nameAndroid').val('');
                $('#passphraseAndroid').val('');

                getAppCertificateAndroid();
            },
            error: function (data) {
                layer.close(layerNum);
                alert($.i18n.prop('app_notifiers_formAndroid_save_failed'));
            }
        };
        var layerNum = layer.load($.i18n.prop('app_notifiers_layer_pending'), 3);
        $('#certificateFormAndroid').ajaxSubmit(ajax_option);
    }
}

// 文件后缀校验
function validateSuffix(fileName) {
    var fileExt = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();
    var allowExt = '.p12';
    if (allowExt != fileExt) {
        alert($.i18n.prop('app_notifiers_layer_typeError') + fileExt);
        return false;
    }
    return true;
}

//显示制作证书按钮
function displayCertificate() {
    $('#certificate').show();
}
//隐藏制作证书按钮
function hideCertificate() {
    $('#certificate').hide();
}

function showAndroidPushCertificateTab() {
    $('#appNameAndroid').text($.cookie('appName'));
    $('#iosCertificateDiv').hide();
    $('#tableCertificateIOS').hide();
    $('#androidCertificateDiv').show();
    $('#tableCertificateAndroid').show();
    $('#app_notifiers_tableAndroid_title').text($.i18n.prop('app_notifiers_tableAndroid_title'));

    getAppCertificateAndroid();
}


function showIOSPushCertificateTab() {
    $('#appNameIOS').text($.cookie('appName'));
    $('#androidCertificateDiv').hide();
    $('#tableCertificateAndroid').hide();
    $('#iosCertificateDiv').show();
    $('#tableCertificateIOS').show();
    $('#app_notifiers_tableIOS_title').text($.i18n.prop('app_notifiers_tableIOS_title'));
    getAppCertificateIOS($.cookie('appName'));
}