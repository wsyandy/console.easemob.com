/**
 * Created by kenshinn on 15-6-16.
 */

var I18NPropsLoader = function(){

    var resourceFilePrefix = 'easemob-i18n';
    var resourceFilePath = '/assets/resources/';
    var resourcePropertiesMode = 'map';

    return {
        getPageName: function(){
            var pathname = window.location.pathname;
            var r = (pathname.match(/\/([^\/?#]+)$/i) || [,''])[1];
            if (r != null)
                return r.split('.html')[0];

            return null;
        },

        getNavigatorLanguage: function() {
            var language = navigator.userLanguage? navigator.userLanguage: navigator.language;
            var locale = $.cookie('locale');

            if(locale) {
                return locale;
            } else {
                if (language.indexOf('zh') > -1) {
                    return 'zh';
                } else {
                    return 'en';
                }
            }
        },

        loadPropertiesByPage: function(pageName){
            switch(pageName){
                case 'app_chatgroups':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageAppChatgroups();
                    break;
                case 'app_chatgroup_users':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageAppChatgroupsUsers();
                    break;
                case 'org_admin_passwd':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageAdminHomePassword();
                    break;
                case 'org_admin_list':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageAdminList();
                    break;
                case 'org_admin_create':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageAdminCreate();
                    break;
                case 'org_admin_home':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageAdminHome();
                    break;
                case 'index_resetpw_success':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageResetpwSuccess();
                    break;
                case 'index_resetpw_input':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageResetpwInput();
                    break;
                case 'index_resetpw_failure':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageResetpwFailure();
                    break;
                case 'index_regist_org_success':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageRegisterOrgSuccess();
                    break;
                case 'index':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageIndex();
                    break;
                case 'index_confirm_success':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageConfirmSuccess();
                    break;
                case 'index_confirm_failure':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageConfirmFailure();
                    break;
                case 'app_user_create':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageAppUsersCreate();
                    break;
                case 'app_list':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageAppList();
                    break;
                case 'app_profile':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageAppProfile();
                    break;
                case 'app_user_contacts':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageAppUsersContacts();
                    break;
                case 'app_counters':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageAppCollectionCounters();
                    break;
                case 'app_create':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageAppCreate()();
                    break;
                case 'app_users':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageAppUsers();
                    break;
                case 'app_notifiers':
                    this.loadPropertiesCommon();
                    this.loadPropertiesForPageAppNotifiers();
                    break;
            }
        },

        // load resources used in every page
        loadPropertiesCommon: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language: this.getNavigatorLanguage(),
                callback: function () {
                    $('#index_title').text($.i18n.prop('index_title'));
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

        // load resources used in index.html page
        loadPropertiesForPageIndex: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#logo_index').attr('src', $.i18n.prop('logo_index'));
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

        // load resources used in org_admin_create.html page
        loadPropertiesForPageAdminCreate: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#logo_home').attr('src', $.i18n.prop('logo_home'));
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

        // load resources used in org_admin_home.html page
        loadPropertiesForPageAdminHome: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#logo_home').attr('src', $.i18n.prop('logo_home'));
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

        // load resources used in admin_home_password.html page
        loadPropertiesForPageAdminHomePassword: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#logo_home').attr('src', $.i18n.prop('logo_home'));
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

        // load resources used in org_admin_list.html page
        loadPropertiesForPageAdminList: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#logo_home').attr('src', $.i18n.prop('logo_home'));
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

        // load resources used in app_chatgroups_users.html page
        loadPropertiesForPageAppChatgroupsUsers: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#logo_home').attr('src', $.i18n.prop('logo_home'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#second_nav_chatgroups').text($.i18n.prop('second_nav_chatgroups'));
                    $('#second_nav_chatgroupmembers').text($.i18n.prop('second_nav_chatgroupmembers'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#app_chatgroups_btn_addmembers').text($.i18n.prop('app_chatgroups_btn_addmembers'));
                    $('#app_chatgroups_users_table_members').text($.i18n.prop('app_chatgroups_users_table_members'));
                    $('#app_chatgroups_users_table_operation').text($.i18n.prop('app_chatgroups_users_table_operation'));
                    $('#newmember').attr('placeholder', $.i18n.prop('app_chatgroups_btn_newmember_placeholder'));
                }
            });
        },

        // load resources used in app_chatgroups.html page
        loadPropertiesForPageAppChatgroups: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#logo_home').attr('src', $.i18n.prop('logo_home'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#second_nav_chatgroups').text($.i18n.prop('second_nav_chatgroups'));
                    $('#second_nav_chatgroupmembers').text($.i18n.prop('second_nav_chatgroupmembers'));
                    $('#app_chatgroups_btn_addchatgroup').text($.i18n.prop('app_chatgroups_btn_addchatgroup'));
                    $('#app_chatgroups_btn_deleteBatch').text($.i18n.prop('app_chatgroups_btn_deleteBatch'));
                    $('#app_chatgroups_btn_sendMsg').text($.i18n.prop('app_chatgroups_btn_sendMsg'));
                    $('#app_chatgroups_btn_search').text($.i18n.prop('app_chatgroups_btn_search'));
                    $('#groupid').attr('placeholder', $.i18n.prop('app_chatgroups_btn_search_placeholder'));
                    $('#app_chatgroups_table_checkall').text($.i18n.prop('app_chatgroups_table_checkall'));
                    $('#app_chatgroups_table_groupid').text($.i18n.prop('app_chatgroups_table_groupid'));
                    $('#app_chatgroups_table_groupname').text($.i18n.prop('app_chatgroups_table_groupname'));
                    $('#app_chatgroups_table_operation').text($.i18n.prop('app_chatgroups_table_operation'));
                    $('#app_chatgroups_form_add_title').text($.i18n.prop('app_chatgroups_form_add_title'));
                    $('#app_chatgroups_form_add_groupName').text($.i18n.prop('app_chatgroups_form_add_groupName'));
                    $('#app_chatgroups_form_add_groupDesc').text($.i18n.prop('app_chatgroups_form_add_groupDesc'));
                    $('#app_chatgroups_form_add_private').text($.i18n.prop('app_chatgroups_form_add_private'));
                    $('#app_chatgroups_form_add_public').text($.i18n.prop('app_chatgroups_form_add_public'));
                    $('#app_chatgroups_form_add_unApproval').text($.i18n.prop('app_chatgroups_form_add_unApproval'));
                    $('#app_chatgroups_form_add_approval').text($.i18n.prop('app_chatgroups_form_add_approval'));
                    $('#app_chatgroups_form_add_maxusers').text($.i18n.prop('app_chatgroups_form_add_maxusers'));
                    $('#app_chatgroups_form_add_groupOwner').text($.i18n.prop('app_chatgroups_form_add_groupOwner'));
                    $('#app_chatgroups_form_add_BtnAdd').text($.i18n.prop('app_chatgroups_form_add_BtnAdd'));
                    $('#app_chatgroups_form_add_BtnCancel').text($.i18n.prop('app_chatgroups_form_add_BtnCancel'));
                    $('#groupName').attr('placeholder', $.i18n.prop('app_chatgroups_form_add_groupName_placeholder'));
                    $('#groupDesc').attr('placeholder', $.i18n.prop('app_chatgroups_form_add_groupDesc_placeholder'));
                    $('#maxusers').attr('placeholder', $.i18n.prop('app_chatgroups_form_add_maxusers_placeholder'));
                    $('#groupOwner').attr('placeholder', $.i18n.prop('app_chatgroups_form_add_groupOwner_placeholder'));
                    $('#app_chatgroups_form_label_isPublic').text($.i18n.prop('app_chatgroups_form_label_isPublic'));
                    $('#app_chatgroups_form_label_isApprovals').text($.i18n.prop('app_chatgroups_form_label_isApprovals'));
                    $('#app_chatgroups_form_sendMsg_title').text($.i18n.prop('app_chatgroups_form_sendMsg_title'));
                    $('#app_chatgroups_sendMsg_label_selectPicture').text($.i18n.prop('app_chatgroups_sendMsg_label_selectPicture'));
                    $('#app_chatgroups_sendMsg_label_wait').text($.i18n.prop('app_chatgroups_sendMsg_label_wait'));
                    $('#app_chatgroups_sendMsg_label_input').text($.i18n.prop('app_chatgroups_sendMsg_label_input'));
                    $('#app_chatgroups_sendMsg_btn_send').text($.i18n.prop('app_chatgroups_sendMsg_btn_send'));
                    $('#app_chatgroups_sendMsg_btn_cancel').text($.i18n.prop('app_chatgroups_sendMsg_btn_cancel'));
                    $('#app_chatgroups_btn_addmembers').text($.i18n.prop('app_chatgroups_btn_addmembers'));
                    $('#app_chatgroups_users_table_members').text($.i18n.prop('app_chatgroups_users_table_members'));
                    $('#app_chatgroups_users_table_operation').text($.i18n.prop('app_chatgroups_users_table_operation'));
                    $('#app_chatgroups_label_tips').text($.i18n.prop('app_chatgroups_label_tips'));


                }
            });
        },

        // load resources used in app_counters.html page
        loadPropertiesForPageAppCollectionCounters: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#logo_home').attr('src', $.i18n.prop('logo_home'));
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
                    $('#countersSearchBtn').val($.i18n.prop('app_collection_counters_text_searchBtn'));
                }
            });
        },

        // load resources used in app_create.html page
        loadPropertiesForPageAppCreate: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#logo_home').attr('src', $.i18n.prop('logo_home'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#second_nav_createApp').text($.i18n.prop('second_nav_createApp'));
                    $('#app_create_form_appName').text($.i18n.prop('app_create_form_appName'));
                    $('#app_create_form_appNameMsg').text($.i18n.prop('app_create_form_appNameMsg'));
                    $('#app_create_form_productName').text($.i18n.prop('app_create_form_productName'));
                    $('#app_create_form_productNameMsg').text($.i18n.prop('app_create_form_productNameMsg'));
                    $('#app_create_form_registrationModel').text($.i18n.prop('app_create_form_registrationModel'));
                    $('#allowOpenMsg').text($.i18n.prop('app_create_form_registrationModel_open'));
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

        // load resources used in app_list.html page
        loadPropertiesForPageAppList: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#logo_home').attr('src', $.i18n.prop('logo_home'));
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

        // load resources used in app_notifiers.html page
        loadPropertiesForPageAppNotifiers: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#logo_home').attr('src', $.i18n.prop('logo_home'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#nameIOS').attr('placeholder' ,$.i18n.prop('app_notifiers_formIOS_name_placeholder'));
                    $('#passphraseIOS').attr('placeholder' ,$.i18n.prop('app_notifiers_formIOS_passphrase_placeholder'));
                    $('#app_notifiers_tableIOS_th_notifierName').text($.i18n.prop('app_notifiers_tableIOS_th_notifierName'));
                    $('#app_notifiers_tableIOS_th_notifierType').text($.i18n.prop('app_notifiers_tableIOS_th_notifierType'));
                    $('#app_notifiers_tableIOS_th_created').text($.i18n.prop('app_notifiers_tableIOS_th_created'));
                    $('#app_notifiers_tableIOS_th_modified').text($.i18n.prop('app_notifiers_tableIOS_th_modified'));
                    $('#app_notifiers_tableIOS_th_operation').text($.i18n.prop('app_notifiers_tableIOS_th_operation'));
                    $('#app_notifiers_href_makeNotifier').text($.i18n.prop('app_notifiers_href_makeNotifier'));
                    $('#app_notifiers_formIOS_addNewNotifier').text($.i18n.prop('app_notifiers_formIOS_addNewNotifier'));
                    $('#app_notifiers_formIOS_appName').text($.i18n.prop('app_notifiers_formIOS_appName'));
                    $('#app_notifiers_formIOS_notifierName').text($.i18n.prop('app_notifiers_formIOS_notifierName'));
                    $('#app_notifiers_formIOS_notifier').text($.i18n.prop('app_notifiers_formIOS_notifier'));
                    $('#app_notifiers_formIOS_button').attr('value' ,$.i18n.prop('app_notifiers_formIOS_button_value'));
                    $('#app_notifiers_formIOS_button_upload').attr('value' ,$.i18n.prop('app_notifiers_formIOS_button_upload_value'));
                    $('#app_notifiers_formIOS_notifierPassword').text($.i18n.prop('app_notifiers_formIOS_notifierPassword'));
                    $('#app_notifiers_formIOS_notifierType').text($.i18n.prop('app_notifiers_formIOS_notifierType'));
                    $('#app_notifiers_formIOS_notifierType_dev').text($.i18n.prop('app_notifiers_formIOS_notifierType_dev'));
                    $('#app_notifiers_formIOS_notifierType_product').text($.i18n.prop('app_notifiers_formIOS_notifierType_product'));

                    $('#app_notifiers_tableAndroid_th_notifierName').text($.i18n.prop('app_notifiers_tableAndroid_th_notifierName'));
                    $('#app_notifiers_tableAndroid_th_notifierType').text($.i18n.prop('app_notifiers_tableAndroid_th_notifierType'));
                    $('#app_notifiers_tableAndroid_th_notifierPassword').text($.i18n.prop('app_notifiers_tableAndroid_th_notifierPassword'));
                    $('#app_notifiers_tableAndroid_th_created').text($.i18n.prop('app_notifiers_tableAndroid_th_created'));
                    $('#app_notifiers_tableAndroid_th_modified').text($.i18n.prop('app_notifiers_tableAndroid_th_modified'));
                    $('#app_notifiers_tableAndroid_th_operation').text($.i18n.prop('app_notifiers_tableAndroid_th_operation'));
                    $('#nameAndroid').attr('placeholder' ,$.i18n.prop('app_notifiers_formAndroid_name_placeholder'));
                    $('#passphraseAndroid').attr('placeholder' ,$.i18n.prop('app_notifiers_formAndroid_passphrase_placeholder'));
                    $('#app_notifiers_formAndroid_addNewNotifier').text($.i18n.prop('app_notifiers_formAndroid_addNewNotifier'));
                    $('#app_notifiers_formAndroid_appName').text($.i18n.prop('app_notifiers_formAndroid_appName'));
                    $('#app_notifiers_formAndroid_notifierName').text($.i18n.prop('app_notifiers_formAndroid_notifierName'));
                    $('#app_notifiers_formAndroid_notifier').text($.i18n.prop('app_notifiers_formAndroid_notifier'));
                    $('#app_notifiers_formAndroid_button').attr('value' ,$.i18n.prop('app_notifiers_formAndroid_button_value'));
                    $('#app_notifiers_formAndroid_button_upload').attr('value' ,$.i18n.prop('app_notifiers_formAndroid_button_upload_value'));
                    $('#app_notifiers_formAndroid_notifierPassword').text($.i18n.prop('app_notifiers_formAndroid_notifierPassword'));
                    $('#app_notifiers_formAndroid_notifierType').text($.i18n.prop('app_notifiers_formAndroid_notifierType'));
                    $('#app_notifiers_formAndroid_notifierType_dev').text($.i18n.prop('app_notifiers_formAndroid_notifierType_dev'));
                    $('#app_notifiers_formAndroid_notifierType_product').text($.i18n.prop('app_notifiers_formAndroid_notifierType_product'));
                }
            });
        },

        // load resources used in app_profile.html page
        loadPropertiesForPageAppProfile: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#logo_home').attr('src', $.i18n.prop('logo_home'));
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

        // load resources used in app_users.html page
        loadPropertiesForPageAppUsers: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#logo_home').attr('src', $.i18n.prop('logo_home'));
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
                    $('#app_users_infoModify_title').text($.i18n.prop('app_users_infoModify_title'));
                    $('#app_users_infoModify_form_label_username').text($.i18n.prop('app_users_infoModify_form_label_username'));
                    $('#app_users_infoModify_form_label_messageType').text($.i18n.prop('app_users_infoModify_form_label_messageType'));
                    $('#app_users_infoModify_form_label_messageType_summary').text($.i18n.prop('app_users_infoModify_form_label_messageType_summary'));
                    $('#app_users_infoModify_form_label_messageType_detail').text($.i18n.prop('app_users_infoModify_form_label_messageType_detail'));
                    $('#app_users_infoModify_form_label_mute').text($.i18n.prop('app_users_infoModify_form_label_mute'));
                    $('#app_users_infoModify_form_label_nickname').text($.i18n.prop('app_users_infoModify_form_label_nickname'));
                    $('#app_users_infoModify_form_label_mute_open').text($.i18n.prop('app_users_infoModify_form_label_mute_open'));
                    $('#app_users_infoModify_form_label_mute_close').text($.i18n.prop('app_users_infoModify_form_label_mute_close'));
                    $('#app_users_infoModify_form_label_mute_period').text($.i18n.prop('app_users_infoModify_form_label_mute_period'));
                    $('#app_users_infoModify_form_confirm').text($.i18n.prop('app_users_infoModify_form_confirm'));
                    $('#app_users_infoModify_form_cancel').text($.i18n.prop('app_users_infoModify_form_cancel'));
                    $('#app_users_infoModify_layer_saved').text($.i18n.prop('app_users_infoModify_layer_saved'));
                    $('#app_users_infoModify_layer_content').text($.i18n.prop('app_users_infoModify_layer_content'));
                    $('#app_users_infoModify_layer_saveerror').text($.i18n.prop('app_users_infoModify_layer_saveerror'));
                    $('#app_users_infoModify_layer_nicknameError').text($.i18n.prop('app_users_infoModify_layer_nicknameError'));
                    $('#app_users_infoModify_layer_periodError').text($.i18n.prop('app_users_infoModify_layer_periodError'));
                    $('#app_users_table_tab_previous').text($.i18n.prop('app_users_table_tab_previous'));
                    $('#app_users_table_tab_next').text($.i18n.prop('app_users_table_tab_next'));
                    $('#app_users_table_nav_previous').text($.i18n.prop('app_users_table_nav_previous'));
                    $('#app_users_table_nav_next').text($.i18n.prop('app_users_table_nav_next'));
                    $('#app_users_confirm_delete_user').text($.i18n.prop('app_users_confirm_delete_user'));
                    $('#app_users_delete_layer_user').text($.i18n.prop('app_users_delete_layer_user'));
                    $('#app_users_delete_alert_deleted').text($.i18n.prop('app_users_delete_alert_deleted'));
                    $('#app_users_delete_alert_deleteError').text($.i18n.prop('app_users_delete_alert_deleteError'));
                    $('#app_users_alert_deleteNoteItem').text($.i18n.prop('app_users_alert_deleteNoteItem'));
                    $('#app_users_delete_alert_deleteNoteDone').text($.i18n.prop('app_users_delete_alert_deleteNoteDone'));
                    $('#app_users_passwordModify_label_newpassword').text($.i18n.prop('app_users_passwordModify_label_newpassword'));
                    $('#pwdMondify').attr('placeholder', $.i18n.prop('app_users_passwordModify_label_newpassword_placeholder'));
                    $('#pwdMondifytwo').attr('placeholder', $.i18n.prop('app_users_passwordModify_label_confirm_newpassword_placeholder'));
                    $('#app_users_passwordModify_label_confirmnewpassword').text($.i18n.prop('app_users_passwordModify_label_confirmnewpassword'));
                    $('#app_users_passwordModify_label_confirmnewpasswordplaceholder').text($.i18n.prop('app_users_passwordModify_label_confirmnewpasswordplaceholder'));
                    $('#app_users_passwordModify_label_confirm').text($.i18n.prop('app_users_passwordModify_label_confirm'));
                    $('#app_users_passwordModify_label_cancel').text($.i18n.prop('app_users_passwordModify_label_cancel'));
                    $('#app_users_sendMessage_title').text($.i18n.prop('app_users_sendMessage_title'));
                    $('#app_users_sendMessage_note').text($.i18n.prop('app_users_sendMessage_note'));
                    $('#app_users_sendMessage_selectPicture').text($.i18n.prop('app_users_sendMessage_selectPicture'));
                    $('#app_users_alert_upload_picture_waiting').text($.i18n.prop('app_users_alert_upload_picture_waiting'));
                    $('#app_users_alert_sendMessage_confirm').text($.i18n.prop('app_users_alert_sendMessage_confirm'));
                    $('#app_users_alert_sendMessage_cancel').text($.i18n.prop('app_users_alert_sendMessage_cancel'));
                    $('#app_users_alert_sendMessage_messageContent').text($.i18n.prop('app_users_alert_sendMessage_messageContent'));
                }
            });
        },

        // load resources used in app_user_contacts.html page
        loadPropertiesForPageAppUsersContacts: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#logo_home').attr('src', $.i18n.prop('logo_home'));
                    $('#left_nav_myapp').text($.i18n.prop('left_nav_myapp'));
                    $('#left_nav_userInfo').text($.i18n.prop('left_nav_userInfo'));
                    $('#left_nav_orgInfo').text($.i18n.prop('left_nav_orgInfo'));
                    $('#second_nav_imusers').text($.i18n.prop('second_nav_imusers'));
                    $('#second_nav_contacts').text($.i18n.prop('second_nav_contacts'));
                    $('#app_users_contacts_bnt_addNewContacts').text($.i18n.prop('app_users_contacts_bnt_addNewContacts'));
                    $('#app_users_contacts_table_username').text($.i18n.prop('app_users_contacts_table_username'));
                    $('#app_users_contacts_text_addNewContacts').text($.i18n.prop('app_users_contacts_text_addNewContacts'));
                    $('#app_users_contacts_text_contactsName').text($.i18n.prop('app_users_contacts_text_contactsName'));
                    $('#app_users_contacts_bnt_add').text($.i18n.prop('app_users_contacts_bnt_add'));
                    $('#app_users_contacts_bnt_cancel').text($.i18n.prop('app_users_contacts_bnt_cancel'));
                    $('#app_users_contacts_table_loading').text($.i18n.prop('app_users_contacts_table_loading'));
                    $('#app_users_contacts_table_operation').text($.i18n.prop('app_users_contacts_table_operation'));
                }
            });
        },

        // load resources used in app_user_create.html page
        loadPropertiesForPageAppUsersCreate: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#logo_home').attr('src', $.i18n.prop('logo_home'));
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

        // load resources used in index_confirm_failure.html page
        loadPropertiesForPageConfirmFailure: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#confirm_failure_alert').text($.i18n.prop('confirm_failure_alert'));
                    $('#confirm_failure_toSignIn').text($.i18n.prop('confirm_failure_toSignIn'));
                }
            });
        },

        // load resources used in index_confirm_success.html page
        loadPropertiesForPageConfirmSuccess: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#confirm_success_alert').text($.i18n.prop('confirm_success_alert'));
                    $('#confirm_failure_toSignIn').text($.i18n.prop('confirm_failure_toSignIn'));
                }
            });
        },

        // load resources used in index_regist_org_success.html page
        loadPropertiesForPageRegisterOrgSuccess: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#regist_org_success_alert').text($.i18n.prop('regist_org_success_alert'));
                    $('#regist_org_success_backtoindex').text($.i18n.prop('regist_org_success_backtoindex'));
                }
            });
        },

        // load resources used in index_resetpw_failure.html page
        loadPropertiesForPageResetpwFailure: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#resetpw_failure_alert').text($.i18n.prop('resetpw_failure_alert'));
                    $('#resetpw_failure_toSignIn').text($.i18n.prop('resetpw_failure_toSignIn'));
                }
            });
        },

        // load resources used in index_resetpw_input.html page
        loadPropertiesForPageResetpwInput: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#resetpw_input_text_setNewPassword').text($.i18n.prop('resetpw_input_text_setNewPassword'));
                    $('#resetpw_input_form_confirm').text($.i18n.prop('resetpw_input_form_confirm'));
                    $('#resetpw_input_form_cancel').text($.i18n.prop('resetpw_input_form_cancel'));
                }
            });
        },

        // load resources used in index_resetpw_success.html page
        loadPropertiesForPageResetpwSuccess: function(){
            $.i18n.properties({
                name: resourceFilePrefix,
                path: resourceFilePath,
                mode: resourcePropertiesMode,
                language : this.getNavigatorLanguage(),
                callback : function() {
                    $('#index_title').text($.i18n.prop('index_title'));
                    $('#resetpw_success_alert').text($.i18n.prop('resetpw_success_alert'));
                    $('#resetpw_success_toSignIn').text($.i18n.prop('resetpw_success_toSignIn'));
                }
            });
        }
    }
}();