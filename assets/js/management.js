//document.write("<script src='/assets/js/easemob/config.js' language=javascript></script>")

var baseUrl = 'https://a1.easemob.com';

// 初始化加载
$(function() {
	// 支持Crossdomain
	$.support.cors = true;
		
	// 显示已登录用户nd
	$('#user_info').html('<small>Welcome,</small>'+$.cookie('cuserName'));
		
	// 注册按钮状态
	$("#agreeCBox").bind("click", function () {
		if($('#agreeCBox').attr('checked')){
			$('#formSubBtn').addClass('btn-success');
			$('#formSubBtn').disabled = false;
		} else {
			$('#formSubBtn').removeClass('btn-success');
			$('#formSubBtn').disabled = true;
		}
	});
	if($('#agreeCBox').attr('checked')){
		$('#formSubBtn').addClass('btn-success');
		$('#formSubBtn').disabled = false;
	} else {
		$('#formSubBtn').removeClass('btn-success');
		$('#formSubBtn').disabled = true;
	}
});

// 全角转换成半角
function ToCDB(str) {
	var tmp = "";
	for(var i=0;i<str.length;i++) {
		if(str.charCodeAt(i)>65248&&str.charCodeAt(i)<65375) {
			tmp += String.fromCharCode(str.charCodeAt(i)-65248);
		} else {
			tmp += String.fromCharCode(str.charCodeAt(i));
		}
	}

	return tmp
}

// 获取url参数
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

// 获得token
function getToken() {
	var access_token = $.cookie('access_token');
	return access_token;
}

// app概况
function showCode(boxId){
	// IOS
	if('iosTab' == boxId){
		$('#iosTab').addClass('visible');
		
		var androidTabClassVal = $('#androidTab').attr('class');
		if(androidTabClassVal.indexOf("visible") > -1){
			$('#androidTab').removeClass('visible');
		}
	}
	// Android
	if('androidTab' == boxId){
		$('#androidTab').addClass('visible');
		
		var iosTabClassVal = $('#iosTab').attr('class');
		if(iosTabClassVal.indexOf("visible") > -1){
			$('#iosTab').removeClass('visible');
		}
	}
}


// 设置新密码
function resetPasswdReq(token,uuid){
	var password1=$('#password1').val();
	var	password2=$('#password2').val();
	var d = {
		'password1':password1,
		'password2':password2,
		'token':token
	}
	if(resetPasswdReqFormValidate()){
		$.ajax({
			url:baseUrl + '/management/users/'+uuid+'/resetpw',
			type:'POST',
			data:JSON.stringify(d),
			headers:{
				'Content-Type':'multipart/form-data'
			},
			success:function(respData){
				alert('提示!\n重置密码成功!');
				window.location.href = 'index.html';
			},
			error:function(data){
				alert('提示!\n重置密码失败!');
			}
		});
	}
}



function checkTel(value) {
	var isChinaPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
	var isChina = /^(((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[0123456789][0-9]{8}|18[0123456789][0-9]{8}|14[0123456789][0-9]{8}))$/;
	var isMalaysia = /^(((\+?60)|(\(\+60\)))?([0123456789]{7}|[0123456789]{8}|[0123456789]{9}))$/;
	var isSingapore = /^(((\+?65)|(0065)|(\+0065)|(\(\+65\)))?[0123456789]{7,10})$/;
	if (isChinaPhone.test(value) || isSingapore.test(value) || isChina.test(value) || isMalaysia.test(value)) {
		return true;
	} else {
		return false;
	}
}




// 时间格式转换 1399434332770 -> 
function add0(m){
	return m<10 ? '0'+m : m;
}
function format(timeST){
	var time = new Date(parseInt(timeST));
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}


// app列表页
function toAppList(){
	window.location.href = "app_list.html";
}


// 分页基础数据
var cursors = {};
var pageNo = 1;
cursors[1] = '';
var total = 0;
var cursors1 = {};
cursors1[1] = '';

// 分页条更新
function updateUsersPageStatus(){
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
			url:baseUrl+'/'+ orgName +'/' + appUuid + '/users?limit=1000',
			type:'GET',
			headers:{
				'Authorization':'Bearer '+access_token,
				'Content-Type':'application/json'
			},
			error: function(jqXHR, textStatus, errorThrown) {
			},
			success: function(respData, textStatus, jqXHR) {
				total = respData.count;
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


function setUsername(appUuid,username){
	$('#usernameMondify').val(username);
	$('#appUuidHidd').val(appUuid);
	$('#pwdMondify').val('');
}



//调用方法
function deleteAppUsers(appUuid,username){
	var access_token = $.cookie('access_token');
	var orgName = $.cookie('orgName');
	var flag ;
		$.ajax({
			async: false, 
			url:baseUrl + '/' + orgName +'/' + appUuid + '/users/' + username,
			type:'DELETE',
			headers:{
				'Authorization':'Bearer ' + access_token,
				'Content-Type':'application/json'
			},		
			error:function(){
				flag =false;
			},
			success:function(respData){
				flag =true;
			}
		});
		return flag;
}


// 退出登录
function logout() {
	// 销毁cookie
	$.cookie("access_token",null,{path:"/"});
	$.cookie("cuser",null,{path:"/"});
	$.cookie("cuserName",null,{path:"/"});
	$.cookie("orgName",null,{path:"/"});
	$.cookie("email",null,{path:"/"});
	$.cookie("companyName",null,{path:"/"});
	$.cookie("telephone",null,{path:"/"});
	// 转到登陆页面
	window.location.href = "index.html";
}



String.prototype.Trim = function() { 
	var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/); 
	return (m == null) ? "" : m[1]; 
} 
String.prototype.isMobile = function() { 
	return (/^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})$/.test(this.Trim())); 
} 
String.prototype.isTel = function() { 
	//"兼容格式: 国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)" 
	return (/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(this.Trim())); 
}

