var appCategory_List = [
    {
        category:'biz_tables',
        label:i18n.base_table,
        leaf:false
    }, {
        category:'activitys',
        label:i18n.activitys,
        leaf:false
    }, {
        category:'users',
        label:i18n.user_mnt,
        leaf:false
    }, {
        category:'roles',
        label:i18n.user_roles,
        leaf:false
    }, {
        category:'acls',
        label:i18n.role_privilege,
        leaf:false
    }, {
        category:'act_notifies',
        label:i18n.notification_rules,
        leaf:false
    },
    {
        category:'public_cols_show',
        label:i18n.biz_fields,
        leaf:false
    },
    {
        category:'codetable',
        label:i18n.codetable,
        leaf:false
    },
    
    {
        category:'medias',
        label:i18n.file_mnt,
        refer:'tab_filemnt',
        leaf:false
    }, {
        category:'syscfgs',
        label:i18n.app_cfg,
        leaf:true,
        refer:['tab1_app','NANX_SYS_CONFIG']  
    }
];

var rawDBCategory_List=[{
    category:'tables',
    label:i18n.database_tables,
    leaf:false,
    refer:'tab_tblmnt'
},{
    category:'fks',
    label:i18n.foreign_key,
    leaf:false
},
{
    category:'sql_runner',
    label:i18n.sql_runner,
    leaf:true
},
{
    category:'sqlhelper',
    label:i18n.db_tools,
    leaf:true
}];
 

//var gridAsForm = ['reorder_columns_grid', 'x_grid_for_dnd'];

var getCSSbyOpcode=function(opcode)
    {
     if(opcode.indexOf('add_')>=0){return 'menu_add';}
     if(opcode.indexOf('connect_')>=0){return 'menu_chain';}
     if(opcode.indexOf('create_')>=0){return 'menu_add';}
     if(opcode.indexOf('remove_')>=0){return 'menu_del';}
     if(opcode.indexOf('rename_')>=0){return 'menu_update';}
     if(opcode.indexOf('update_')>=0){return 'menu_update';}
     if(opcode.indexOf('edit_')>=0){return 'menu_update'; }
     if(opcode.indexOf('delete_')>=0){ return 'menu_del';}
     if(opcode.indexOf('set_')>=0){return 'menu_update';}
     if(opcode.indexOf('sms')>=0){ return 'menu_sms';}
     if(opcode.indexOf('truncate')>=0){return 'menu_del';}
     if(opcode.indexOf('export')>=0){ return 'menu_excel';}
     if(opcode.indexOf('drop')>=0){ return 'menu_del';}
     if(opcode.indexOf('copy')>=0){return 'menu_copy';}
     if(opcode.indexOf('paste')>=0){return 'menu_paste';}
     if(opcode.indexOf('preview')>=0){return 'menu_preview';}
     if(opcode.indexOf('view')>=0){return 'menu_preview';}
     if(opcode.indexOf('upload_file')>=0){return 'menu_upload_pic';}
     if(opcode.indexOf('manage_pic')>=0){return 'menu_pic_management';}
     if(opcode.indexOf('backup_system')>=0){return 'menu_backup_system';}
     if(opcode.indexOf('backup_')>=0){return 'menu_backup';}
     if(opcode.indexOf('restore_')>=0){return 'menu_restore';}
     if(opcode.indexOf('run_sql')>=0){return 'menu_sql_runner';}
     if(opcode.indexOf('manage_php_model')>=0){return 'php';}
     if(opcode.indexOf('manage_php_controller')>=0){return 'php';}
     if(opcode.indexOf('manage_js_upload')>=0){return 'js_file';}



    };


var getCategoryMenusByCategory=function(category){
        var menus = [];
        var ContextMenu=AppCategory.getContextMenus();
        
        for (var i = 0; i < ContextMenu.length; i++){
            var category_items = ContextMenu[i].category;
            var ind = category_items.indexOf(category);
            if (!(ind == -1)){
                for(var j=0;j<ContextMenu[i].menus.length;j++)
                  {
                    var opcode=ContextMenu[i].menus[j].opcode;
                    var css_str=AppCategory.getCSSbyOpcode(opcode);
                     ContextMenu[i].menus[j].iconCls=css_str;
                  }
                menus = menus.concat(ContextMenu[i].menus);
            }
        }
        
        return menus;
    };
    


var AppCategory = {
    AppCategory_List: appCategory_List,
    RawDBCategory_List: rawDBCategory_List,
    CategoryDnD: {
        biz_table:['activity','activitys'],
        table:['biz_tables'],
        button:['activity'],
        activity:['user_role_under_acls'],
        activity_js:['user_role_under_acls'],
        activity_sql:['user_role_under_acls'],
        activity_html:['user_role_under_acls'],
        activity_service:['user_role_under_acls'],
        user:['user_role']
    },

    ContextMenu:contextMenu,
    getGirdIDsForExtraData: function(){
        return this.GridAsForm;
    },
    getAppCategory: function(ctype){
        return this[ctype];
    },
   
    getDnDcfg: function(){
        return this.CategoryDnD;
    },

    getContextMenus: function(){
        return this.ContextMenu;
    },

    getBackendCrontroller:function(){
        return{
            controller:'nanx',
            func_name:'index'}
    },
    getCSSbyOpcode:getCSSbyOpcode,
    getCategoryMenusByCategory:getCategoryMenusByCategory,
    getSubMenuCfg:function(category,opcode){
        var nodemenus=this.getCategoryMenusByCategory(category);
        for (var i=0;i<nodemenus.length;i++){
            if (nodemenus[i].opcode==opcode){
                var m_item=DeepClone(nodemenus[i]);
                return m_item;
            }
        }
    }
};