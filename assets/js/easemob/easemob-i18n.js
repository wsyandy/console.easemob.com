/**
 * Created by kenshinn on 15-6-16.
 */

var I18NPropsLoader = function(){

    return {

        // load properties used in every page
        loadCommon: function(){
            $.i18n.properties({
                name: 'easemob-i18n',
                path: '/assets/i18n/',
                mode: 'map',
                language: 'en',
                callback: function () {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#logo_index').attr('src', $.i18n.prop('logo_index'));
                    $('#logo_home').text($.i18n.prop('logo_home'));
                    $('#nav_index').text($.i18n.prop('nav_index'));
                    $('#nav_doc').text($.i18n.prop('nav_doc'));
                    $('#nav_help').text($.i18n.prop('nav_help'));
                    $('#nav_community').text($.i18n.prop('nav_community'));
                    $('#nav_download').text($.i18n.prop('nav_download'));
                    $('#nav_account').text($.i18n.prop('nav_account'));
                    $('#nav_signout').text($.i18n.prop('nav_signout'));
                    $('#second_nav_myapp').text($.i18n.prop('second_nav_myapp'));
                    $('#third_nav_appprofile').text($.i18n.prop('third_nav_appprofile'));
                    $('#third_nav_imusers').text($.i18n.prop('third_nav_imusers'));
                    $('#third_nav_chatgroups').text($.i18n.prop('third_nav_chatgroups'));
                    $('#third_nav_notifier').text($.i18n.prop('third_nav_notifier'));
                    $('#third_nav_counter').text($.i18n.prop('third_nav_counter'));
                }
            });
        },

        // load properties used in index.html page
        loadIndex: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#index_span_login').text($.i18n.prop('index_span_login'));
                    $('#index_span_register').text($.i18n.prop('index_span_register'));
                    $('#index_login_username').text($.i18n.prop('index_login_username'));
                    $('#index_login_password').text($.i18n.prop('index_login_password'));
                    $('#index_login_rememberme').text($.i18n.prop('index_login_rememberme'));
                    $('#index_bnt_login').text($.i18n.prop('index_bnt_login'));
                    $('#index_input_username').text($.i18n.prop('index_input_username'));
                    $('#index_forgot_password_link').text($.i18n.prop('index_forgot_password_link'));
                    $('#index_bnt_find_password').text($.i18n.prop('index_bnt_find_password'));
                    $('#index_bnt_backtologin').text($.i18n.prop('index_bnt_backtologin'));
                    $('#index_span_register_orgname').text($.i18n.prop('index_span_register_orgname'));
                    $('#index_span_register_userneme').text($.i18n.prop('index_span_register_userneme'));
                    $('#index_span_register_password').text($.i18n.prop('index_span_register_password'));
                    $('#index_span_register_tel').text($.i18n.prop('index_span_register_tel'));
                    $('#index_span_register_repassword').text($.i18n.prop('index_span_register_repassword'));
                    $('#index_span_register_email').text($.i18n.prop('index_span_register_email'));
                    $('#index_span_register_company').text($.i18n.prop('index_span_register_company'));
                    $('#index_span_register_comefromInternet').text($.i18n.prop('index_span_register_comefromInternet'));
                    $('#index_span_register_comefromFriends').text($.i18n.prop('index_span_register_comefromFriends'));
                    $('#index_span_register_comefromOfficial').text($.i18n.prop('index_span_register_comefromOfficial'));
                    $('#index_span_register_comefromExhibition').text($.i18n.prop('index_span_register_comefromExhibition'));
                    $('#index_span_register_comefromMedia').text($.i18n.prop('index_span_register_comefromMedia'));
                    $('#index_span_register_formSubBtn').text($.i18n.prop('index_span_register_formSubBtn'));
                    $('#index_span_register_agree').text($.i18n.prop('index_span_register_agree'));
                    $('#index_span_register_agree_service').text($.i18n.prop('index_span_register_agree_service'));
                    $('#index_span_register_agree_returntilogin').text($.i18n.prop('index_span_register_agree_returntilogin'));
                }
            });
        },

        // load properties used in admin_create.html page
        load_admin_create: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#admin_create_second_nav_orgInfo').text($.i18n.prop('admin_create_second_nav_orgInfo'));
                    $('#admin_create_third_nav_addOrgAdmin').text($.i18n.prop('admin_create_third_nav_addOrgAdmin'));
                    $('#admin_create_second_nav_addOrgAdmin').text($.i18n.prop('admin_create_second_nav_addOrgAdmin'));
                    $('#admin_create_confirm').text($.i18n.prop('admin_create_confirm'));
                    $('#admin_create_backtolist').text($.i18n.prop('admin_create_backtolist'));
                    $('#admin_create_adminCompanyOMsg').text($.i18n.prop('admin_create_adminCompanyOMsg'));
                    $('#admin_create_adminCompanyEMsg').text($.i18n.prop('admin_create_adminCompanyEMsg'));
                    $('#admin_create_adminCompanyMsg').text($.i18n.prop('admin_create_adminCompanyMsg'));
                    $('#admin_create_form_adminCompany').text($.i18n.prop('admin_create_form_adminCompany'));
                    $('#admin_create_adminTelOMsg').text($.i18n.prop('admin_create_adminTelOMsg'));
                    $('#admin_create_adminTelEMsg').text($.i18n.prop('admin_create_adminTelEMsg'));
                    $('#admin_create_adminTelMsg').text($.i18n.prop('admin_create_adminTelMsg'));
                    $('#admin_create_form_adminTel').text($.i18n.prop('admin_create_form_adminTel'));
                    $('#admin_create_adminEmailOMsg').text($.i18n.prop('admin_create_adminEmailOMsg'));
                    $('#admin_create_adminEmailEEMsg').text($.i18n.prop('admin_create_adminEmailEEMsg'));
                    $('#admin_create_adminEmailEMsg').text($.i18n.prop('admin_create_adminEmailEMsg'));
                    $('#admin_create_adminEmailMsg').text($.i18n.prop('admin_create_adminEmailMsg'));
                    $('#admin_create_form_email').text($.i18n.prop('admin_create_form_email'));
                    $('#admin_create_adminRePasswordOMsg').text($.i18n.prop('admin_create_adminRePasswordOMsg'));
                    $('#admin_create_adminRePasswordEMsg').text($.i18n.prop('admin_create_adminRePasswordEMsg'));
                    $('#admin_create_adminRePasswordMsg').text($.i18n.prop('admin_create_adminRePasswordMsg'));
                    $('#admin_create_form_repassword').text($.i18n.prop('admin_create_form_repassword'));
                    $('#admin_create_adminPasswordOMsg').text($.i18n.prop('admin_create_adminPasswordOMsg'));
                    $('#admin_create_adminPasswordMsg').text($.i18n.prop('admin_create_adminPasswordMsg'));
                    $('#admin_create_form_password').text($.i18n.prop('admin_create_form_password'));
                    $('#admin_create_adminUserNameOMsg').text($.i18n.prop('admin_create_adminUserNameOMsg'));
                    $('#admin_create_adminUserNameEEMsg').text($.i18n.prop('admin_create_adminUserNameEEMsg'));
                    $('#admin_create_adminUserNameEMsg').text($.i18n.prop('admin_create_adminUserNameEMsg'));
                    $('#admin_create_adminUserNameMsg').text($.i18n.prop('admin_create_adminUserNameMsg'));
                    $('#admin_create_form_username').text($.i18n.prop('admin_create_form_username'));
                }
            });
        },

        // load properties used in admin_home.html page
        load_admin_home: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#admin_home_second_nav_accountInfo').text($.i18n.prop('admin_home_second_nav_accountInfo'));
                    $('#admin_home_second_nav_btn_accountInfo').text($.i18n.prop('admin_home_second_nav_btn_accountInfo'));
                    $('#admin_home_second_nav_resetpassword').text($.i18n.prop('admin_home_second_nav_resetpassword'));
                    $('#admin_home_login_account').text($.i18n.prop('admin_home_login_account'));
                    $('#admin_home_login_email').text($.i18n.prop('admin_home_login_email'));
                    $('#admin_home_login_companyName').text($.i18n.prop('admin_home_login_companyName'));
                    $('#admin_home_login_telephone').text($.i18n.prop('admin_home_login_telephone'));
                    $('#admin_home_cancel').text($.i18n.prop('admin_home_cancel'));
                    $('#admin_home_save').text($.i18n.prop('admin_home_save'));
                    $('#admin_home_update').text($.i18n.prop('admin_home_update'));
                }
            });
        },

        // load properties used in admin_home_password.html page
        load_admin_home_password: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#admin_home_password_second_nav_accountInfo').text($.i18n.prop('admin_home_password_second_nav_accountInfo'));
                    $('#admin_home_password_second_nav_btn_accountInfo').text($.i18n.prop('admin_home_password_second_nav_btn_accountInfo'));
                    $('#admin_home_password_second_nav_resetpassword').text($.i18n.prop('admin_home_password_second_nav_resetpassword'));
                    $('#admin_home_password_form_oldpassword').text($.i18n.prop('admin_home_password_form_oldpassword'));
                    $('#admin_home_password_form_newpassword').text($.i18n.prop('admin_home_password_form_newpassword'));
                    $('#admin_home_password_form_renewpassword').text($.i18n.prop('admin_home_password_form_renewpassword'));
                    $('#admin_home_password_form_back').text($.i18n.prop('admin_home_password_form_back'));
                    $('#admin_home_password_form_confirm').text($.i18n.prop('admin_home_password_form_confirm'));
                }
            });
        },

        // load properties used in admin_list.html page
        load_admin_list: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#second_nav_myapp').text($.i18n.prop('second_nav_myapp'));
                    $('#second_nav_orgInfo').text($.i18n.prop('second_nav_orgInfo'));
                    $('#second_nav_orgAdminList').text($.i18n.prop('second_nav_orgAdminList'));
                    $('#admin_list_second_nav_addOrgAdmin').text($.i18n.prop('admin_list_second_nav_addOrgAdmin'));
                    $('#admin_list_table_username').text($.i18n.prop('admin_list_table_username'));
                    $('#admin_list_table_email').text($.i18n.prop('admin_list_table_email'));
                    $('#admin_list_table_company').text($.i18n.prop('admin_list_table_company'));
                    $('#admin_list_table_telephone').text($.i18n.prop('admin_list_table_telephone'));
                    $('#admin_list_table_accountstatus').text($.i18n.prop('admin_list_table_accountstatus'));
                    $('#admin_list_table_operation').text($.i18n.prop('admin_list_table_operation'));
                }
            });
        },

        // load properties used in app_chatgroups_users.html page
        load_app_chatgroups_users: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#app_chatgroups_form_add_title').text($.i18n.prop('app_chatgroups_form_add_title'));
                    $('#app_chatgroups_btn_deleteBatch').text($.i18n.prop('app_chatgroups_btn_deleteBatch'));
                    $('#app_chatgroups_btn_sendMsg').text($.i18n.prop('app_chatgroups_btn_sendMsg'));
                    $('#app_chatgroups_btn_search').text($.i18n.prop('app_chatgroups_btn_search'));
                    $('#app_chatgroups_table_checkall').text($.i18n.prop('app_chatgroups_table_checkall'));
                    $('#app_chatgroups_table_cancel').text($.i18n.prop('app_chatgroups_table_cancel'));
                    $('#app_chatgroups_form_add_groupName').text($.i18n.prop('app_chatgroups_form_add_groupName'));
                    $('#app_chatgroups_form_add_groupDesc').text($.i18n.prop('app_chatgroups_form_add_groupDesc'));
                    $('#app_chatgroups_form_add_groupdescSpan').text($.i18n.prop('app_chatgroups_form_add_groupdescSpan'));
                    $('#app_chatgroups_form_add_private').text($.i18n.prop('app_chatgroups_form_add_private'));
                    $('#app_chatgroups_form_add_public').text($.i18n.prop('app_chatgroups_form_add_public'));
                    $('#app_chatgroups_form_add_unApproval').text($.i18n.prop('app_chatgroups_form_add_unApproval'));
                    $('#app_chatgroups_form_add_approval').text($.i18n.prop('app_chatgroups_form_add_approval'));
                    $('#app_chatgroups_form_add_groupApprovalSpan').text($.i18n.prop('app_chatgroups_form_add_groupApprovalSpan'));
                    $('#app_chatgroups_form_add_maxusers').text($.i18n.prop('app_chatgroups_form_add_maxusers'));
                    $('#app_chatgroups_form_add_groupMaxuserSpan').text($.i18n.prop('app_chatgroups_form_add_groupMaxuserSpan'));
                    $('#app_chatgroups_form_add_groupOwner').text($.i18n.prop('app_chatgroups_form_add_groupOwner'));
                    $('#app_chatgroups_form_add_groupOwnerSpan').text($.i18n.prop('app_chatgroups_form_add_groupOwnerSpan'));
                    $('#app_chatgroups_form_add_BtnAdd').text($.i18n.prop('app_chatgroups_form_add_BtnAdd'));
                    $('#app_chatgroups_form_add_BtnCancel').text($.i18n.prop('app_chatgroups_form_add_BtnCancel'));
                    $('#app_chatgroups_form_modify_title').text($.i18n.prop('app_chatgroups_form_modify_title'));
                    $('#app_chatgroups_form_modify_groupName').text($.i18n.prop('app_chatgroups_form_modify_groupName'));
                    $('#app_chatgroups_form_modify_groupNameSpan').text($.i18n.prop('app_chatgroups_form_modify_groupNameSpan'));
                    $('#app_chatgroups_form_modify_groupDesc').text($.i18n.prop('app_chatgroups_form_modify_groupDesc'));
                    $('#app_chatgroups_form_modify_groupIsPublic_private').text($.i18n.prop('app_chatgroups_form_modify_groupIsPublic_private'));
                    $('#app_chatgroups_form_modify_groupIsPublic_public').text($.i18n.prop('app_chatgroups_form_modify_groupIsPublic_public'));
                    $('#app_chatgroups_form_modify_groupIsPublicSpan').text($.i18n.prop('app_chatgroups_form_modify_groupIsPublicSpan'));
                    $('#app_chatgroups_form_modify_groupisApproval_unApproval').text($.i18n.prop('app_chatgroups_form_modify_groupisApproval_unApproval'));
                    $('#app_chatgroups_form_modify_groupisApproval_approval').text($.i18n.prop('app_chatgroups_form_modify_groupisApproval_approval'));
                    $('#app_chatgroups_form_modify_isApprovalSpan').text($.i18n.prop('app_chatgroups_form_modify_isApprovalSpan'));
                    $('#app_chatgroups_form_modify_maxusers').text($.i18n.prop('app_chatgroups_form_modify_maxusers'));
                    $('#app_chatgroups_form_modify_maxUsersSpan').text($.i18n.prop('app_chatgroups_form_modify_maxUsersSpan'));
                    $('#app_chatgroups_form_modify_owner').text($.i18n.prop('app_chatgroups_form_modify_owner'));
                    $('#app_chatgroups_form_modify_btnAdd').text($.i18n.prop('app_chatgroups_form_modify_btnAdd'));
                    $('#app_chatgroups_form_modify_btnCancel').text($.i18n.prop('app_chatgroups_form_modify_btnCancel'));
                    $('#app_chatgroups_form_sendMsg_title').text($.i18n.prop('app_chatgroups_form_sendMsg_title'));
                    $('#app_chatgroups_sendMsg_label_selectPicture').text($.i18n.prop('app_chatgroups_sendMsg_label_selectPicture'));
                    $('#app_chatgroups_sendMsg_label_wait').text($.i18n.prop('app_chatgroups_sendMsg_label_wait'));
                    $('#app_chatgroups_sendMsg_label_input').text($.i18n.prop('app_chatgroups_sendMsg_label_input'));
                    $('#app_chatgroups_sendMsg_btn_send').text($.i18n.prop('app_chatgroups_sendMsg_btn_send'));
                    $('#app_chatgroups_sendMsg_btn_cancel').text($.i18n.prop('app_chatgroups_sendMsg_btn_cancel'));
                }
            });
        },

        // load properties used in app_chatgroups.html page
        load_app_chatgroups: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#second_nav_chatgroups').text($.i18n.prop('second_nav_chatgroups'));
                    $('#second_nav_chatgroupmembers').text($.i18n.prop('second_nav_chatgroupmembers'));
                    $('#app_chatgroups_btn_addmembers').text($.i18n.prop('app_chatgroups_btn_addmembers'));
                    $('#app_chatgroups_users_table_members').text($.i18n.prop('app_chatgroups_users_table_members'));
                    $('#app_chatgroups_users_table_operation').text($.i18n.prop('app_chatgroups_users_table_operation'));
                }
            });
        },

        // load properties used in app_collection_counters.html page
        load_app_collection_counters: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#app_collection_counters_tab_user').text($.i18n.prop('app_collection_counters_tab_user'));
                    $('#app_collection_counters_tab_chatmessages').text($.i18n.prop('app_collection_counters_tab_chatmessages'));
                    $('#app_collection_counters_tab_chatgroups').text($.i18n.prop('app_collection_counters_tab_chatgroups'));
                    $('#app_collection_counters_text_dataType').text($.i18n.prop('app_collection_counters_text_dataType'));
                    $('#app_collection_counters_chatType_imusers').text($.i18n.prop('app_collection_counters_chatType_imusers'));
                    $('#app_collection_counters_chatType_dailyActiveUser').text($.i18n.prop('app_collection_counters_chatType_dailyActiveUser'));
                    $('#app_collection_counters_chatType_dailyNewActiveUser').text($.i18n.prop('app_collection_counters_chatType_dailyNewActiveUser'));
                    $('#app_collection_counters_chatType_dailySendMsgUser').text($.i18n.prop('app_collection_counters_chatType_dailySendMsgUser'));
                    $('#app_collection_counters_text_dateInterval').text($.i18n.prop('app_collection_counters_text_dateInterval'));
                    $('#app_collection_counters_text_dateIntervalFrom').text($.i18n.prop('app_collection_counters_text_dateIntervalFrom'));
                    $('#app_collection_counters_text_dateIntervalTo').text($.i18n.prop('app_collection_counters_text_dateIntervalTo'));
                    $('#app_collection_counters_text_quickSearch').text($.i18n.prop('app_collection_counters_text_quickSearch'));
                    $('#app_collection_counters_text_quickSearchOneDay').text($.i18n.prop('app_collection_counters_text_quickSearchOneDay'));
                    $('#app_collection_counters_text_quickSearchSevenDays').text($.i18n.prop('app_collection_counters_text_quickSearchSevenDays'));
                }
            });
        },

        // load properties used in app_create.html page
        load_app_create: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#second_nav_createApp').text($.i18n.prop('second_nav_createApp'));
                    $('#app_create_form_appName').text($.i18n.prop('app_create_form_appName'));
                    $('#app_create_form_appNameMsg').text($.i18n.prop('app_create_form_appNameMsg'));
                    $('#app_create_form_productName').text($.i18n.prop('app_create_form_productName'));
                    $('#app_create_form_productNameMsg').text($.i18n.prop('app_create_form_productNameMsg'));
                    $('#app_create_form_registrationModel').text($.i18n.prop('app_create_form_registrationModel'));
                    $('#app_create_form_registrationModel_open').text($.i18n.prop('app_create_form_registrationModel_open'));
                    $('#app_create_form_registrationModel_auth').text($.i18n.prop('app_create_form_registrationModel_auth'));
                    $('#app_create_form_appDesc').text($.i18n.prop('app_create_form_appDesc'));
                    $('#app_create_form_appDescMsg').text($.i18n.prop('app_create_form_appDescMsg'));
                    $('#app_create_form_backlist').text($.i18n.prop('app_create_form_backlist'));
                    $('#app_create_form_confirm').text($.i18n.prop('app_create_form_confirm'));
                }
            });
        }
        ,

        // load properties used in app_list.html page
        load_app_list: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#second_nav_myapp').text($.i18n.prop('second_nav_myapp'));
                    $('#second_nav_createapp').text($.i18n.prop('second_nav_createapp'));
                    $('#second_nav_appname').text($.i18n.prop('second_nav_appname'));
                    $('#second_nav_appusercount').text($.i18n.prop('second_nav_appusercount'));
                    $('#second_nav_appstatus').text($.i18n.prop('second_nav_appstatus'));
                }
            });
        },

        // load properties used in app_notifiers.html page
        load_app_notifiers: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#app_notifiers_table_title').text($.i18n.prop('app_notifiers_table_title'));
                    $('#app_notifiers_table_th_notifierName').text($.i18n.prop('app_notifiers_table_th_notifierName'));
                    $('#app_notifiers_table_th_notifierType').text($.i18n.prop('app_notifiers_table_th_notifierType'));
                    $('#app_notifiers_table_th_created').text($.i18n.prop('app_notifiers_table_th_created'));
                    $('#app_notifiers_table_th_modified').text($.i18n.prop('app_notifiers_table_th_modified'));
                    $('#app_notifiers_table_th_operation').text($.i18n.prop('app_notifiers_table_th_operation'));
                    $('#app_notifiers_form_addNewNotifier').text($.i18n.prop('app_notifiers_form_addNewNotifier'));
                    $('#app_notifiers_href_makeNotifier').text($.i18n.prop('app_notifiers_href_makeNotifier'));
                    $('#app_notifiers_form_appName').text($.i18n.prop('app_notifiers_form_appName'));
                    $('#app_notifiers_form_notifierName').text($.i18n.prop('app_notifiers_form_notifierName'));
                    $('#app_notifiers_form_notifier').text($.i18n.prop('app_notifiers_form_notifier'));
                    $('#app_notifiers_form_notifierPassword').text($.i18n.prop('app_notifiers_form_notifierPassword'));
                    $('#app_notifiers_form_notifierType').text($.i18n.prop('app_notifiers_form_notifierType'));
                    $('#app_notifiers_form_notifierType_dev').text($.i18n.prop('app_notifiers_form_notifierType_dev'));
                    $('#app_notifiers_form_notifierType_product').text($.i18n.prop('app_notifiers_form_notifierType_product'));
                }
            });
        },

        // load properties used in app_profile.html page
        load_app_profile: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#app_profile_text_appkey').text($.i18n.prop('app_profile_text_appkey'));
                    $('#app_profile_text_created').text($.i18n.prop('app_profile_text_created'));
                    $('#app_profile_text_modified').text($.i18n.prop('app_profile_text_modified'));
                    $('#app_profile_text_model').text($.i18n.prop('app_profile_text_model'));
                    $('#app_profile_btn_change').text($.i18n.prop('app_profile_btn_change'));
                    $('#app_profile_btn_update').text($.i18n.prop('app_profile_btn_update'));
                    $('#app_profile_text_thumbnail_long').text($.i18n.prop('app_profile_text_thumbnail_long'));
                    $('#app_profile_text_thumbnail_Width').text($.i18n.prop('app_profile_text_thumbnail_Width'));
                    $('#app_profile_text_thumbnail').text($.i18n.prop('app_profile_text_thumbnail'));
                    $('#app_profile_text_quickIntegration').text($.i18n.prop('app_profile_text_quickIntegration'));
                    $('#app_profile_text_android').text($.i18n.prop('app_profile_text_android'));
                    $('#app_profile_text_ios').text($.i18n.prop('app_profile_text_ios'));
                    $('#app_profile_text_modifyThumbnail').text($.i18n.prop('app_profile_text_modifyThumbnail'));
                    $('#app_profile_form_thumbnail_long').text($.i18n.prop('app_profile_form_thumbnail_long'));
                    $('#app_profile_form_thumbnail_Width').text($.i18n.prop('app_profile_form_thumbnail_Width'));
                    $('#app_profile_text_thumbnail_confirm').text($.i18n.prop('app_profile_text_thumbnail_confirm'));
                    $('#app_profile_text_thumbnail_cancel').text($.i18n.prop('app_profile_text_thumbnail_cancel'));
                }
            });
        },

        // load properties used in app_users.html page
        load_app_users: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#app_users_fourth_nav_deleteImUserBatch').text($.i18n.prop('app_users_fourth_nav_deleteImUserBatch'));
                    $('#app_users_fourth_nav_registImUser').text($.i18n.prop('app_users_fourth_nav_registImUser'));
                    $('#app_users_fourth_nav_sendMsg').text($.i18n.prop('app_users_fourth_nav_sendMsg'));
                    $('#app_users_fourth_nav_modify').text($.i18n.prop('app_users_fourth_nav_modify'));
                    $('#app_users_fourth_nav_search').text($.i18n.prop('app_users_fourth_nav_search'));
                    $('#app_users_th_checkAll').text($.i18n.prop('app_users_th_checkAll'));
                    $('#app_users_th_username').text($.i18n.prop('app_users_th_username'));
                    $('#app_users_th_notification').text($.i18n.prop('app_users_th_notification'));
                    $('#app_users_th_nickname').text($.i18n.prop('app_users_th_nickname'));
                    $('#app_users_th_muteType').text($.i18n.prop('app_users_th_muteType'));
                    $('#app_users_th_mutePeriod').text($.i18n.prop('app_users_th_mutePeriod'));
                    $('#app_users_th_notifiername').text($.i18n.prop('app_users_th_notifiername'));
                    $('#app_users_th_created').text($.i18n.prop('app_users_th_created'));
                    $('#app_users_th_operation').text($.i18n.prop('app_users_th_operation'));
                    $('#app_users_selections_operation').text($.i18n.prop('app_users_selections_operation'));
                    $('#app_users_selections_contacts').text($.i18n.prop('app_users_selections_contacts'));
                    $('#app_users_selections_resetpassword').text($.i18n.prop('app_users_selections_resetpassword'));
                    $('#app_users_selections_modify').text($.i18n.prop('app_users_selections_modify'));
                    $('#app_users_selections_delete').text($.i18n.prop('app_users_selections_delete'));
                    $('#app_users_selections_sendMessages').text($.i18n.prop('app_users_selections_sendMessages'));
                    $('#userInbox').attr('placeholder', $.i18n.prop('app_users_text_search_box_placeholder'));
                    $('#app_users_passwordModify_title').text($.i18n.prop('app_users_passwordModify_title'));
                }
            });
        },

        // load properties used in app_users_contacts.html page
        load_app_users_contacts: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#second_nav_imusers').text($.i18n.prop('second_nav_imusers'));
                    $('#second_nav_contacts').text($.i18n.prop('second_nav_contacts'));
                    $('#app_users_contacts_bnt_addNewContacts').text($.i18n.prop('app_users_contacts_bnt_addNewContacts'));
                    $('#app_users_contacts_table_operation').text($.i18n.prop('app_users_contacts_table_operation'));
                    $('#app_users_contacts_table_username').text($.i18n.prop('app_users_contacts_table_username'));
                    $('#app_users_contacts_text_addNewContacts').text($.i18n.prop('app_users_contacts_text_addNewContacts'));
                    $('#app_users_contacts_text_contactsName').text($.i18n.prop('app_users_contacts_text_contactsName'));
                    $('#app_users_contacts_bnt_add').text($.i18n.prop('app_users_contacts_bnt_add'));
                    $('#app_users_contacts_bnt_cancel').text($.i18n.prop('app_users_contacts_bnt_cancel'));
                }
            });
        },

        // load properties used in app_users_create.html page
        load_app_users_create: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#second_nav_imuser').text($.i18n.prop('second_nav_imuser'));
                    $('#second_nav_create_imuser').text($.i18n.prop('second_nav_create_imuser'));
                    $('#app_users_create_form_password').text($.i18n.prop('app_users_create_form_password'));
                    $('#app_users_create_form_username').text($.i18n.prop('app_users_create_form_username'));
                    $('#app_users_create_form_backlist').text($.i18n.prop('app_users_create_form_backlist'));
                    $('#app_users_create_form_confirmPassword').text($.i18n.prop('app_users_create_form_confirmPassword'));
                    $('#app_users_create_form_confirm').text($.i18n.prop('app_users_create_form_confirm'));
                }
            });
        },

        // load properties used in confirm_failure.html page
        load_confirm_failure: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#confirm_failure_alert').text($.i18n.prop('confirm_failure_alert'));
                    $('#confirm_failure_toSignIn').text($.i18n.prop('confirm_failure_toSignIn'));
                }
            });
        },

        // load properties used in confirm_success.html page
        load_confirm_success: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#confirm_success_alert').text($.i18n.prop('confirm_success_alert'));
                    $('#confirm_failure_toSignIn').text($.i18n.prop('confirm_failure_toSignIn'));
                }
            });
        },

        // load properties used in regist_org_success.html page
        load_regist_org_success: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#regist_org_success_alert').text($.i18n.prop('regist_org_success_alert'));
                    $('#regist_org_success_backtoindex').text($.i18n.prop('regist_org_success_backtoindex'));
                }
            });
        },

        // load properties used in resetpw_failure.html page
        load_resetpw_failure: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#resetpw_failure_alert').text($.i18n.prop('resetpw_failure_alert'));
                    $('#resetpw_failure_toSignIn').text($.i18n.prop('resetpw_failure_toSignIn'));
                }
            });
        },

        // load properties used in resetpw_input.html page
        load_resetpw_input: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#resetpw_input_text_setNewPassword').text($.i18n.prop('resetpw_input_text_setNewPassword'));
                    $('#resetpw_input_form_confirm').text($.i18n.prop('resetpw_input_form_confirm'));
                    $('#resetpw_input_form_cancel').text($.i18n.prop('resetpw_input_form_cancel'));
                }
            });
        },

        // load properties used in resetpw_success.html page
        load_resetpw_success: function(){
            $.i18n.properties({
                name : 'easemob-i18n',
                path : '/assets/i18n/',
                mode : 'map',
                language : 'en',
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#resetpw_success_alert').text($.i18n.prop('resetpw_success_alert'));
                    $('#resetpw_success_toSignIn').text($.i18n.prop('resetpw_success_toSignIn'));
                }
            });
        }
    }
}();