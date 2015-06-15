/**
 * Created by kenshinn on 15-6-10.
 */


// 分页条更新
function updatequnzuPageStatus(){
    var pageLi = $('#paginau').find('li');

    // 获取token
    var access_token = $.cookie('access_token');
    var cuser = $.cookie('cuser');
    var orgName = $.cookie('orgName');
    if(!access_token || access_token==''){
        alert('提示\n\n会话已失效,请重新登录!');
        window.location.href = 'index.html';
    } else {
        $.ajax({
            url:baseUrl+'/'+ orgName +'/' + appUuid + '/notifiers?limit=1000',
            type:'GET',
            headers:{
                'Authorization':'Bearer '+access_token,
                'Content-Type':'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
            },
            success: function(respData, textStatus, jqXHR) {
                total = respData.entities.length;
                var totalPage = (total % 5 == 0) ? (parseInt(total / 5)) : (parseInt(total / 5) + 1);
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

// 查询证书信息
function getAppNotifiers(appUuid, pageAction){
    $('#paginau').html('');
    var access_token = $.cookie('access_token');
    var orgName = $.cookie('orgName');
    if('next' == pageAction){
        pageNo += 1;
    } else if('forward' == pageAction){
        pageNo -= 1;
    }
    var temp = '';
    if(typeof(pageAction)!='undefined' && pageAction != ''){
        temp = '&cursor='+cursors[pageNo];
    }

    var loading = '<tr id="tr_loading"><td class="text-center" colspan="6"><img src ="assets/img/loading.gif">&nbsp;&nbsp;&nbsp;<span>正在读取数据...</span></td></tr>';
    $('#appCredentialBody').empty();
    $('#appCredentialBody').append(loading);
    $.ajax({
        url:baseUrl+'/'+ orgName +'/' + appUuid + '/notifiers?limit=8'+temp,
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
            $(respData.entities).each(function(){
                var statusStr = '异常';

                var name = this.name;
                var credentialUuid = this.uuid;
                var credentialId = this.uuid;
                var passphrase = this.passphrase;
                var environment = '';
                if(this.environment == 'DEVELOPMENT') {
                    environment = '开发';
                } else if(this.environment == 'PRODUCTION'){
                    environment = '生产';
                }

                var created = format(this.created);
                var modified = format(this.modified);
                option += '<tr>'+
                    '<td class="text-center">'+name+'</td>'+
                    '<td class="text-center">'+environment+'</td>'+
                    '<td class="text-center">'+created+'</td>'+
                    '<td class="text-center">'+modified+'</td>'+
                    '<td class="text-center">&nbsp;<a href="javascript:deleteAppNotifiers(\''+ credentialId + '\',\''+ appUuid +'\')">删除</a></td>'+
                    '</tr>';

            });
            $('#appCredentialBody').html('');
            $('#appCredentialBody').append(option);

            // 无数据
            var tbody = document.getElementsByTagName("tbody")[0];
            if(!tbody.hasChildNodes()){
                var option = '<tr><td class="text-center" colspan="6">无数据!</td></tr>';
                $('#tr_loading').remove();
                $('#appUserAdminBody').append(option);
                var pageLi = $('#paginau').find('li');
                for(var i=0;i<pageLi.length;i++){
                    $(pageLi[i]).hide();
                }
            } else {
                var ulB = '<ul>';
                var ulE = '</ul>';
                var textOp1 = '<li> <a href="javascript:void(0);" onclick="getPrevAppNotifiers();">上一页</a> </li>';
                var textOp2 = '<li> <a href="javascript:void(0);" onclick="getNextAppNotifiers();">下一页</a> </li>';
                $('#paginau').html('');

                // 首页
                if(pageNo == 1){
                    if(respData.cursor == null){
                        $('#paginau').append(ulB + ulE);
                    } else {
                        $('#paginau').append(ulB + textOp2 + ulE);
                    }
                    // 尾页
                } else if(cursors.length != 0 && respData.cursor == null){
                    $('#paginau').append(ulB + textOp1 + ulE);
                } else {
                    $('#paginau').append(ulB + textOp1 + textOp2 + ulE);
                }
            }
            if(respData.entities.length == 0){
                var option = '<tr><td class="text-center" colspan="6">暂无证书!</td></tr>';
                $('#appCredentialBody').append(option);
            }
        }
    });
}

// 证书验证
function verifyCredential(credentialUuid,appUuid){
    $('#'+credentialUuid).html('......');
    var access_token = $.cookie('access_token');
    var orgName = $.cookie('orgName');
    $.ajax({
        url:baseUrl + '/' +orgName +'/'+appUuid+'/verify/' + credentialUuid,
        type:'GET',
        headers:{
            'Authorization':'Bearer ' + access_token
        },
        error:function(){
            $('#'+credentialUuid).html('异常');
        },
        success:function(respData){
            var creStatus = respData.status;
            if(creStatus == 'ok'){
                $('#'+credentialUuid).html('正常');
            } else {
                $('#'+credentialUuid).html('异常');
            }
        }
    });
}

// 删除开发者推送证书
function deleteAppNotifiers(credentialId,appUuid){
    var access_token = $.cookie('access_token');
    var orgName = $.cookie('orgName');
    if(confirm('确定删除这个证书吗?')){
        var layerNum = layer.load('正在删除...');
        $.ajax({
            url:baseUrl+'/'+ orgName +'/' + appUuid + '/notifiers/' + credentialId,
            type:'DELETE',
            headers:{
                'Authorization':'Bearer ' + access_token,
                'Content-Type':'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
                layer.close(layerNum);
                alert('证书删除失败!')
            },
            success: function(respData, textStatus, jqXHR) {
                layer.close(layerNum);
                alert('证书已删除!')
                getAppNotifiers(appUuid,'no');
            }
        });
    }
}


