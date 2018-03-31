Ext.override(Ext.Component,{
        Callback_setValue:function(value){
                var xtype=this.getXType();
                console.log(this)
                console.log(xtype)
                console.log(value)
                
                if(xtype=='textfield'||xtype=='textarea'||xtype=='combo'||xtype=='StarHtmleditor') 
                    {
                        this.setValue(value);
                        // this.setRawValue(value);
                    }

                if((xtype=='panel') &&( this.items.itemAt(0).getXType()=='checkbox' )) 
                {
                               for( var i=0;i< this.items.getCount();i++)
                               {
                               if(value.indexOf(this.items.itemAt(i).inputValue) !== -1)
                                 {
                                  this.items.itemAt(i).setValue(true);
                                 }
                                 else
                                  {
                                        this.items.itemAt(i).setValue(false);
                                  }
                               } 
                }
        } 
});

 
 Ext.ns('Fb');

 var Fb = {};

 var WaitMask = {
     mask: null,
     'ajaxinfo': i18n.mask_text,
     'uploadinfo': i18n.upload_wait_text,
     show: function(type) {
         this.mask = new Ext.LoadMask(Ext.getBody(), {
             msg: type ? this.uploadinfo : this.ajaxinfo
         })
         document.body.style.cursor = "wait";
         this.mask.show();
     },
     hide: function() {
         document.body.style.cursor = "auto";
         this.mask.hide();
         return true;
     }
 }
 

 


Ext.data.Node.prototype.getJson = function ( node) {
      // Should deep copy so we don't affect the tree
      var json = this.attributes;
      delete json['loader'];

      json.children = [];
      for (var i=0; i < node.childNodes.length; i++) {
          json.children.push( node.childNodes[i].getJson(node.childNodes[i]) )
      }
      return json;
}
 
 
 Fb.getDetailBtn = function(combo_table) {
     var btn_detail = new Ext.Button({
         text: i18n.detail_with_dot,
         handler: function() {
             var combox = this.ownerCt.items.items[0];
             if (!combox.getValue()) {
                 return;
             }
             new Act({
                 code: 'NANX_TBL_DATA',
                 table: combo_table,
                 filter_field: combox.valueField,
                 filter_value: combox.getValue(),
                 tbar_type:'hide',
                 win_size_height:150,
                 wintitle: i18n.detail + ':' + combox.getRawValue(),
                 showwhere: 'autowin',
                 transfer: true
             });
         }
     });
     return btn_detail;
 }



 Fb.getDirectComboEditor = function(jsonarray) {
 
     return {
         xtype: 'combo',
         store: new Ext.data.JsonStore({
             fields: ['code', 'value'],
             data: jsonarray
         }),
         displayField: 'value',
         editable: false,
         valueField: 'code',
         mode: 'local',
         typeAhead: true,
         triggerAction: 'all',
         lazyRender: true
     };
 
 }

 
  Fb.getHtmlEditor = function(id, label, value) {
     var htmlEditor = {
         xtype: "StarHtmleditor",
         fieldLabel: label,
         id: id,
         value: value,
         width: 680
     };
     return htmlEditor;
 }

 



 Fb.getDateTypeEditor = function(oneFieldCfg,readonly_flag,datetype) {
     var dateEditor = {
         fieldLabel: oneFieldCfg['display_cfg'].field_c,
         id: oneFieldCfg['field_e'],
         width: 200,
         height: 25,
         value:oneFieldCfg.editor_cfg.ini,
         readOnly: readonly_flag,
         blankText: i18n.not_allow_blank
     }
        if(datetype=='date'){var xtype='datefield';var dateformat='Y-m-d';}
        if(datetype=='datetime'){var xtype='datetimefield';}
        if(datetype=='time'){var xtype='timepickerfield';}
        dateEditor.xtype=xtype;
        if (typeof dateformat !== 'undefined') {
         dateEditor.format=dateformat;
       }
     return dateEditor;
 }


 Fb.getTextAreaEditor = function(oneFieldCfg, readonly_flag) {
     textAreaEditor = {
         fieldLabel: oneFieldCfg['display_cfg'].field_c,
         id: oneFieldCfg['field_e'],
         width: 660,
         height: 60,
         value:oneFieldCfg.editor_cfg.default_v,
         xtype: 'textarea',
         readOnly: readonly_flag,
         blankText: i18n.not_allow_blank
     }
     return textAreaEditor;
 }



 


 Fb.getTriggerBar12 = function(main_table) {
     var follow_add = new Ext.Button({
         text: i18n.add,
         handler: function() {
             var tfm = this.findParentByType('form');
             var root_combo = Ext.getCmp('combo_table');
             var ref_tab = root_combo.getValue();
             if (!Ext.isEmpty(ref_tab)) {
                 var newline = Fb.triggerRow12({
                     'serial': Ext.id(),
                     'base_table': main_table,
                     'refer_table': ref_tab
                 });

                 this.ownerCt.ownerCt.insert(12, newline);
                 this.ownerCt.ownerCt.doLayout();
             }
         }
     })
     var lb1 = new Ext.Container({
         'html': '&nbsp;&nbsp;' + i18n.base_table_col
     });
     var lb2 = new Ext.Container({
         'html': '<span style="margin-left:140px;">=' + i18n.reference_table_col + '</span>'
     });
     var f = new Ext.Container({
         'fieldLabel': i18n.follow_col,
         'layout': 'table',
         items: [follow_add, lb1, lb2]
     });
     return f;
 }
 
 Fb.addTriggerRow12_from_response = function(follow_cfg) {
     var current_form = Ext.getCmp('back_opform');
     for (var n = 0; n < follow_cfg.length; n++) {
         var field_2 = Fb.triggerRow12({
             serial:Ext.id(),
             base_table: follow_cfg[n].base_table,
             refer_table: follow_cfg[n].combo_table,
             left_ini: follow_cfg[n]['base_table_follow_field'],
             right_ini: follow_cfg[n]['combo_table_follow_field']
         });
         current_form.insert(11 + n, field_2);
     }
     current_form.doLayout();
 }
 
  Fb.triggerRow12 = function(cfg) {
     var left_tree_cfg = {
         item_type: 'combo_list',
         id: 'base_field' + Ext.id(),
         value: cfg.base_table,
         ini: cfg.left_ini,
         nanx_type:'root',
         level:1,
         displayField: 'text',
         valueField:'value',
         category_to_use: 'biz_cols'
     }

     var ds_l = Fb.buildTreeStore(left_tree_cfg);
     var xxx_combo = COMBOX.getBasicCombo(left_tree_cfg, ds_l);

     var right_tree_cfg = {
         item_type: 'combo_list',
         id: 'refer_field' + Ext.id(),
         nanx_type:'slave',
         level: 2,
         group_id:'follow_gp',
         value: cfg.refer_table,
         displayField: 'text',
         valueField: 'value',
         ini: cfg.right_ini,
         category_to_use: 'biz_cols'
     }

     var ds_r = Fb.buildTreeStore(right_tree_cfg);
     var yyy_combo = COMBOX.getBasicCombo(right_tree_cfg, ds_r);


     var btn_del = new Ext.Button({
         text: i18n.remove,
         handler: function() {
             this.ownerCt.ownerCt.remove(this.ownerCt);
         }
     });

     var equ = new Ext.BoxComponent({
         autoEl: {
             tag: 'div',
             html: '&nbsp;=&nbsp;'
         }
     });

     var field_link = new Ext.Container({
         'id': 'followRow' + cfg.serial,
         'layout': 'table',
         'nanx_type': 'follow_row',
         'style': '{margin-left:104px;}',
         items: [btn_del, xxx_combo, equ, yyy_combo]
     });
     return field_link;
 } 

 
 Fb.create_group_table_header=function(headers){

     var head_tb="<table><tr>";
     for(var i=0;i<headers.length;i++)
     {
      head_tb+='<td width=140px>'+i18n[headers[i]]+'</td>';
     }
     head_tb+="</tr></table>";
     var tb_c=new Ext.Container({html:head_tb});
     return tb_c;

 }


 


 Fb.horizon_line=function(item,node){
     var line_add_btn = new Ext.Button({
         text:i18n.add_trigger,
         id:'trigger_bar_button',
         handler: function() {
             {
                 var form = this.findParentByType('form');
                 var trigger_rows =form.find('nanx_type','trigger_row');
                 item.serial=trigger_rows.length+1;
                 var newline =   Fb.create_horizon_line(item,node);
                 this.ownerCt.ownerCt.insert(12,newline);
                 this.ownerCt.ownerCt.doLayout();
             }
         }
     })
    
     tb_c=this.create_group_table_header(item.headers);

     var f = new Ext.Container({
         fieldLabel:i18n.group_item,
         layout:'table',
      items:[line_add_btn,tb_c]
     });
     return f;


 }


 Fb.create_horizon_line=function(item,node,meta_data){

       var backend_active_form=Ext.getCmp('back_opform');
     
       trigger_rows =backend_active_form.find('nanx_type','trigger_row');
       trigger_rows_count=trigger_rows.length+1;
       item.serial=trigger_rows_count;



       var btn_del = new Ext.Button({
         text: i18n.remove,
         id:Ext.id(),
         serial:item.serial,
         handler: function(){

             var form = this.findParentByType('form');
             var tr =form.find('nanx_type','trigger_row');
             var current_counter=tr.length;
             if(this.serial==current_counter)
                 {
                   this.ownerCt.ownerCt.remove(this.ownerCt);
                 }
         }
       });


       var subitems=[];
       subitems.push(btn_del);
      


     for(var i=0;i<item.horizon_items.length;i++)
     {

        var sub_item_cfg=item.horizon_items[i];
        sub_item_cfg.serial=item.serial;

        fixed_sub_item_cfg = Fb.preProcessNodeAtt(sub_item_cfg, node);
        fixed_sub_item_cfg.using_serial=true;
        
        if (meta_data){
          fixed_sub_item_cfg=Fb.set_cfg_callback_value(fixed_sub_item_cfg,meta_data);
        }

        var sub_item=FormBuilder.getBackendFormItem(fixed_sub_item_cfg,node);
        subitems.push(sub_item);
     
      }     

      var field_link = new Ext.Container({
         'id': 'followRow_'+Ext.id(),
         'layout':'table',
         'nanx_type':'trigger_row',
         'style':'{margin-left:105px;}',
         items: subitems
     });
     return field_link;

  
 }

 Fb.set_cfg_callback_value=function(itemcfg,backdata)
 {
   itemcfg_setted=DeepClone(itemcfg);
   if (  itemcfg_setted.item_type=='combo_group')
   {
     var idname=itemcfg_setted.root_combox.id;
     itemcfg_setted.root_combox.ini=backdata[idname];
     for (var i =0;i< itemcfg_setted.slave_comboxes.length;i++) 
       {
           idname=     itemcfg_setted.slave_comboxes[i].id;
         
           itemcfg_setted.slave_comboxes[i].ini=backdata[idname]
       };  
    }

   else
   {  
      var idname=itemcfg_setted.id
      itemcfg_setted.ini=backdata[idname]   
   }
   return  itemcfg_setted ; 

 }

    



 
 Fb.show_trigger_lines=function(triggers,node,item)
 {
     

    for(var i=0;i<triggers.length;i++)
    {
     var meta=triggers[i];
     item.serial=i+1; 
    

     var trigger_row=Fb.create_horizon_line(item, node,meta);
     var btn=Ext.getCmp('trigger_bar_button');
     var tfm = btn.findParentByType('form');
     
     tfm.insert(12,trigger_row);
     tfm.doLayout();
    }
 }
  
 

 Fb.split2col = function(pleft, pright, cfg, directData) {
     if (directData) {
         var ds_left = pleft;
         var ds_right = pright;
     } else {
         var ds_cfg_left = {
             autoLoad: true,
             proxy: new Ext.data.HttpProxy({
                 url: TREE_URL
             }),
             root: 'server_resp_left',
             fields: ['value', 'text'],
             baseParams: pleft
         };
         var ds_cfg_right = {};
         Ext.apply(ds_cfg_right, ds_cfg_left);
         ds_cfg_right.root = 'server_resp_right';
         var ds_left = (pleft == null) ? new Ext.data.ArrayStore() : new Ext.data.JsonStore(ds_cfg_left);
         var ds_right = (pright.data == false) ? new Ext.data.ArrayStore() : new Ext.data.JsonStore(ds_cfg_right);
     }
     var multiselector = {
         items: [{
             html: '<br/>' + cfg.label + ':'
         }, {
             bodyStyle: "margin-top:10px;",
             xtype: "itemselector",
             name: cfg.id,
             id: cfg.id,
             right_forced_one: pright.right_forced_one,
             imagePath: "../../jslib/ext/ux/images/",
             border: false,
             multiselects: [{
                 id: 'leftList',
                 width: 225,
                 height: 300,
                 displayField: "text",
                 valueField: "value",
                 store: ds_left
             }, {
                 id: 'rightList',
                 width: 225,
                 height: 300,
                 displayField: "text",
                 valueField: "value",
                 store: ds_right
             }],
             listeners: {
                 change: function() {
                     if (!this.right_forced_one) {
                         return;
                     }
                     ds_right.suspendEvents();
                     var items = ds_right.data.items;
                     if (items.length > 0) {
                         var REC_LAST = items.pop();
                         ds_right.removeAll();
                         ds_right.add(REC_LAST);
                         ds_left.add(items);
                         var r = Ext.getCmp('rightList');
                         r.view.refresh();
                         this.hiddenField.dom.value = REC_LAST.data.value;
                     }
                     ds_right.resumeEvents();
                 }
             }
         }]
     };
     return multiselector;
 };

 Fb.findSlaves = function(form, grp_id, level, direct) {
 
     if(!form){return []}
     var found = [];
     var slaves = form.find('group_id', grp_id);
    
     

     for (i = 0; i < slaves.length; i++) {
         if (arguments.length == 4) 
            {
             if (slaves[i].level - 1 == level) {
                 found.push(slaves[i]);
             }
         } else 
            {
             if (slaves[i].level > level) {
                 found.push(slaves[i]);
             }
         }
     }
     return found;
 }




 Fb.setStorePara = function(store, key, value) {
     if (store.proxy.conn.jsonData) {
          setJsonPath(store.proxy.conn.jsonData,key,value);
     } else {
         store.baseParams.value = value;
     }
 }



 Fb.buildTreeStore = function(treecfg) {
     baseParaObj = {};
     baseParaObj.category_to_use = treecfg.category_to_use;
     baseParaObj.value = treecfg.value;
     

     var id = treecfg.id ? treecfg.id : Ext.id();
     if(  treecfg.hasOwnProperty('serial') )
     {
        id=id+'_'+treecfg.serial;
     }
    
     var ds_auto = treecfg.hasOwnProperty('ds_auto') ? treecfg['ds_auto'] : true;
     var store = new Ext.data.JsonStore({
         proxy: new Ext.data.HttpProxy({
             url: TREE_URL,
             method: 'POST'
         }),
         storeId: 'store_' + id,
         autoLoad: ds_auto,
         displayField: 'text',
         valueField: 'value',
         fields: ['value', 'text'],
         baseParams: baseParaObj,
         root: 'server_resp'
     });
     return store;
 }

 
 Fb.getInheritEditor = function(oneFieldCfg, rowOriginalValue) {

     inheritEditor = {
         xtype: 'textfield',
         fieldLabel: oneFieldCfg['display_cfg'].field_c,
         id: oneFieldCfg['field_e'],
         width: 300,
         height: 25,
         value: rowOriginalValue,
         readOnly:true,
         blankText: i18n.not_allow_blank
     }
     return inheritEditor;
 }

 Fb.getFieldWidth = function(cfg) {
     var f_width = 300;
     if (cfg.display_cfg.field_width == null) {
         f_width = 300;
     } else {
         f_width = cfg.display_cfg.field_width;
     }
     return f_width * 1.0;
 }


 Fb.leaving_field=function(master_act,form){
    
    for (var i = 0; i < master_act.colsCfg.length; i++) {
         var cal_string=master_act.colsCfg[i].editor_cfg.cal_string;
         if ( cal_string )
         {

              var  field_value_list=FormBuilder.getFormData(form)
           
              for(var obj_key  in field_value_list){ 

                  var strx='var '+obj_key+'=field_value_list.'+obj_key;
                  eval(strx);
              }

              var field_to_set= master_act.colsCfg[i].field_e ;
              eval_string='field_value_list.'+master_act.colsCfg[i].field_e+'='+cal_string;
              eval(eval_string);
              Ext.getCmp(field_to_set).setValue(field_value_list[field_to_set] );
         }

    }
 }

 Fb.checkIdHidden=function(oneFieldCfg){
    if ((oneFieldCfg.field_e=='id')&&(oneFieldCfg.display_cfg.idhidden)){
      return true;
   } 
   else
   {
  return false;
   }
 }


 Fb.getDefaultEditor = function( master_act, oneFieldCfg,readonly_flag) {

    _hide=Fb.checkIdHidden(oneFieldCfg);
     var that=this;
     var f_width = Fb.getFieldWidth(oneFieldCfg);
     var defaultEditor = {
         fieldLabel: oneFieldCfg['display_cfg'].field_c,
         id: oneFieldCfg['field_e'],
         width: f_width,
         height: 25,
         value:oneFieldCfg.editor_cfg.ini,
         readOnly: readonly_flag,
         hidden:_hide,
         xtype: 'textfield',
         blankText: i18n.not_allow_blank,
         onBlur :function(e,f,g,h)
         {
            that.leaving_field(master_act,this.findParentByType('form'));
         },
         onChange:function(e,f,g,h){
            
             that.leaving_field(master_act,this.findParentByType('form'));
         },
          onFocus:function(e,f,g,h){
            
            that.leaving_field(master_act,this.findParentByType('form'));
          }
         }
          return defaultEditor;
     }


     


     
 

 Fb.getTriggerWhoIsWho=function  (one_col_cfg,whoami_cfg)
 {

    var trigger_cfg=one_col_cfg.editor_cfg.trigger_cfg;
    var trigger_table=trigger_cfg.combo_table;
    var level=trigger_cfg.level;
    var who_is_who=whoami_cfg.who_is_who;
    var login_user=whoami_cfg.whoami;
    var connected_value=null;   
    for (var i = 0; i < who_is_who.length; i++) {
        if(who_is_who[i].inner_table==trigger_table  &&  who_is_who[i].user==login_user )
        {
        connected_value=who_is_who[i].inner_table_value;
        break;
        }
    };
    return connected_value;
 }


   Fb.getDropdownOption=function (one_col_cfg){

     var fields = [one_col_cfg.editor_cfg.trigger_cfg.list_field, one_col_cfg.editor_cfg.trigger_cfg.value_field];
     var table = one_col_cfg.editor_cfg.trigger_cfg.combo_table;
     var filter_cfg = {filter_field: one_col_cfg.editor_cfg.trigger_cfg.filter_field };
     return {'table':table,'fields':fields,'filter_cfg':filter_cfg}

   } 
   

   Fb.getColInitValueAndRawValue=function(one_col_cfg,row,whoami_cfg){
     
     var _ini='';
     var _raw='';
     var connected_value=  this.getTriggerWhoIsWho(one_col_cfg,whoami_cfg);
     if (connected_value){readonly_flag=true;} 
     ghost_field = 'ghost_' + one_col_cfg['field_e'];

     if (row) {   // edit mode
        _ini = row.json[ghost_field];
        _raw=row.data[one_col_cfg['field_e']]
     }
     else
     {
        if(connected_value){
             _ini=connected_value;
             _raw=null;
       }else
       {
            _ini=one_col_cfg.editor_cfg.default_v;
            _raw=null;
       }
     }
     console.log(row);
     return {'_ini':_ini,'_raw_value':  _raw}  
   }

  //下拉字段
   Fb.getDropdownlistEditor = function(  one_col_cfg, row,readonly_flag,whoami_cfg) {
     

     console.log(one_col_cfg.editor_cfg.trigger_cfg)

     var row_value= this.getColInitValueAndRawValue(one_col_cfg,row,whoami_cfg) 
     one_col_cfg.ini=row_value._ini
     one_col_cfg.raw_value=row_value._raw_value


     one_col_cfg.id = one_col_cfg.field_e;
     one_col_cfg.valueField = one_col_cfg.editor_cfg.trigger_cfg.value_field;
     one_col_cfg.displayField = one_col_cfg.editor_cfg.trigger_cfg.list_field;
     one_col_cfg.level = one_col_cfg.editor_cfg.trigger_cfg.level;

     if (one_col_cfg.editor_cfg.trigger_cfg.level == 1) {
         one_col_cfg.nanx_type = 'root';
     } else {
         one_col_cfg.nanx_type = 'slave';
     }
     one_col_cfg.group_id = one_col_cfg.editor_cfg.trigger_cfg.group_id;
     one_col_cfg.detail_btn = true;

     var dropdownOption=this.getDropdownOption(one_col_cfg)
     
     console.log(dropdownOption)

     var codetable_filter_cfg={}
     // codetable 增加送给后台的筛选配置
     
     if( dropdownOption.table=='nanx_code_table'){
           codetable_filter_cfg={codetable_category_value:one_col_cfg.editor_cfg.trigger_cfg.codetable_category_value}
     }
     
     var combo_store = Act.prototype.getStoreByTableAndField(dropdownOption.table, dropdownOption.fields, dropdownOption.filter_cfg,codetable_filter_cfg);

     return COMBOX.getBasicCombo(one_col_cfg, combo_store,readonly_flag);
 }


Fb.getWhoami=function()
{
      var whoami = document.getElementById('whoami');
     if (!whoami) {
         whoami = 'admin';
     } else {
         whoami = whoami.innerHTML;
     }
  return whoami;
}

  Fb.determineOriginalValue = function(op_type, editCfg, row) {
    
     var rowOriginalValue = null;
     if (op_type == 'update') {
         rowOriginalValue = row.get(editCfg['field_e']);
     }
     if ((op_type == 'add') && (editCfg.editor_cfg.default_v)) {
          rowOriginalValue = editCfg.editor_cfg.default_v;

         if (editCfg.editor_cfg.default_v == 'date') {
             rowOriginalValue=getDate();
         }

         if (editCfg.editor_cfg.default_v == 'datetime'){
             rowOriginalValue = new Date();
         }
     }


     if (editCfg.editor_cfg.is_produce_col == 1) {
         whoami=this.getWhoami();
         if (op_type == 'add') {
 
             rowOriginalValue = whoami;
           
         }
         
         if (op_type == 'update') {
             rowOriginalValue = row.get(editCfg['field_e']);
             if (!rowOriginalValue.length > 0) {
                 rowOriginalValue = whoami;
             }
         }

         if (op_type == 'batchUpdate') {
             rowOriginalValue = whoami;
             
         }
     }
    
   editCfg.editor_cfg.ini=rowOriginalValue;   
 }


  Fb.getFieldEditor = function(master_act,op_type, one_col_cfg, row,whoami_cfg) {
      
     this.determineOriginalValue(op_type, one_col_cfg, row);
     var readonly_flag = false;
     var skip_flag = false;
     if (one_col_cfg['field_e']=='id'){
         readonly_flag = true;
     }

     
     if(  one_col_cfg.editor_cfg.hasOwnProperty('readonly')){ 
        if(one_col_cfg.editor_cfg.readonly=='1')
        readonly_flag=true;
     }

     if (one_col_cfg.editor_cfg.is_produce_col == 1){ readonly_flag = true;} 
     if ((one_col_cfg['field_e'] == 'id') && (op_type == 'add')) {skip_flag = true;}
     if (skip_flag){return null;}
     
    if ((one_col_cfg['field_e'] == master_act.cfg.filter_field) && (op_type == 'add')) {
         return [this.getInheritEditor(one_col_cfg, master_act.cfg.filter_value)];
     }

     if (!Ext.isEmpty(one_col_cfg.editor_cfg.trigger_cfg)) {
         return [Fb.getDropdownlistEditor(  one_col_cfg, row, readonly_flag,whoami_cfg )];
     } 
     
     

     if (one_col_cfg.editor_cfg.need_upload == 1) { 
         var cfg = {
             label: one_col_cfg.display_cfg.field_c,
             name: one_col_cfg['field_e'],
             value: one_col_cfg.editor_cfg.ini
         };
         return [FileUpload.getAttachmentEditor(cfg)];
     }

     if (one_col_cfg.editor_cfg.edit_as_html == 1) {
         return [this.getHtmlEditor(one_col_cfg['field_e'], one_col_cfg['display_cfg'].field_c, one_col_cfg['editor_cfg']['ini']     )];
     }

     if (one_col_cfg.editor_cfg.datetime == 'datetime' || one_col_cfg.editor_cfg.datetime == 'date' ||one_col_cfg.editor_cfg.datetime == 'time' ) {
         return [this.getDateTypeEditor(one_col_cfg, readonly_flag,one_col_cfg.editor_cfg.datetime)];
     }


     if (one_col_cfg['edit_type'] == 'textarea') {
         return [this.getTextAreaEditor(one_col_cfg,readonly_flag)];
     }

     if ((one_col_cfg['edit_type'] == null) || (one_col_cfg['edit_type'] == '')) {
         return [this.getDefaultEditor(master_act,one_col_cfg, readonly_flag)];
     }

 }

 Fb.primaryKeyColumn = function(c) {
     return new Ext.ux.grid.CheckColumn({
         header: c,
         dataIndex: "primary_key"
     });
 }


 Fb.notNullColumn = function(c) {
     return new Ext.ux.grid.CheckColumn({
         header: c,
         dataIndex: "not_null"
     });
 }

 Fb.unsignedColumn = function(c) {
     return new Ext.ux.grid.CheckColumn({
         header: c,
         dataIndex: "unsigned"
     });
 }

 Fb.autoIncrColumn = function(c) {
     return new Ext.ux.grid.CheckColumn({
         header: c,
         dataIndex: "auto_increment"
     });
 }

 Fb.zerofillColumn = function(c) {
     return new Ext.ux.grid.CheckColumn({
         header: c,
         dataIndex: "zerofill"
     });
 }


 
 Fb.getFollowCfg = function(form) {
     var follow_rows = form.find('nanx_type', 'follow_row');
     var l_r_group = [];
     for (var i = 0; i < follow_rows.length; i++) {
         var l_r = follow_rows[i].findByType(['combo']);
         l_r_group.push({
             'base_table_follow_field': l_r[0].value,
             'combo_table_follow_field': l_r[1].value
         });
     }
     return l_r_group;
 }



 Fb.setDndForm = function(cfg, node) {
     var pleft = {
         left_category: cfg.left_category,
         right_category: cfg.right_category
     };
     if (cfg.hasOwnProperty('left_filter_value')) {
         pleft.value = node.attributes[[cfg.left_filter_value]]
     }
     var pright = {};
     if (!(cfg.right_value == false)) {
         Ext.apply(pright, pleft);
         pright.category_to_use = cfg.right_category;
         pright.value = node.attributes[[cfg.right_filter_value]];
     } else {
         pright.data = false;
     }
     pright.right_forced_one = (cfg.hasOwnProperty('right_forced_one')) ? true : false;
     var split2col = new Fb.split2col(pleft, pright, cfg, false);
     var f = new Ext.Container({
         items: split2col
     });
     return f;
 };





 Fb.triggerRow12345 = function(cfg,meta5){

    var hostcfg = {
         item_type: 'combo_list',
         id: 'field_e_' + cfg.serial,
         value: cfg.base_table,
         width:140,
         displayField: 'text',
         valueField: 'value',
         category_to_use: 'biz_cols'
     }
     if(meta5&&meta5.field_e)hostcfg.ini=meta5.field_e;
     var store = Fb.buildTreeStore(hostcfg);
     var host_combo = COMBOX.getBasicCombo(hostcfg, store);
     group_id = 'TR_' + cfg.serial;
     var combo_cfg = {
         item_type: 'combo_group',
         root_combox: {
             id: 'combo_table_' + cfg.serial,
             ds_auto: true,
             group_id: group_id,
             level: 1,
             width:140,
             nanx_type: 'root',
             value_key_for_slave: 'value',
             category_to_use: 'biz_tables' 
         },
         slave_comboxes: [{
             id: 'list_field_' + cfg.serial,
             ds_auto: false,
             level: 2,
             width:140,
             group_id: group_id,
             nanx_type: 'slave',
             category_to_use: 'biz_cols'
         }, {
             id: 'value_field_' + cfg.serial,
             ds_auto: false,
             group_id: group_id,
             level: 2,
             width:140,
             nanx_type: 'slave',
             category_to_use: 'biz_cols'
         }
         ]
     };
     
     if(meta5&&meta5.combo_table)combo_cfg.root_combox.ini=meta5.combo_table;
     if(meta5&&meta5.list_field)combo_cfg.slave_comboxes[0].ini=meta5.list_field;
     if(meta5&&meta5.value_field)combo_cfg.slave_comboxes[1].ini=meta5.value_field;
     
     
     if(cfg.serial>1){
     combo_cfg.slave_comboxes.push(
     {
             id: 'filter_field_' + cfg.serial,
             ds_auto: false,
             group_id: group_id,
             level: 2,
             width:140,
             nanx_type: 'slave',
             category_to_use: 'biz_cols'
         });
     }

     if(meta5&&meta5.filter_field)combo_cfg.slave_comboxes[2].ini=meta5.filter_field;
         
         
     var root_slave = COMBOX.getComboGroup(combo_cfg);
     var btn_del = new Ext.Button({
         text: i18n.remove,
         id:Ext.id(),
         serial:cfg.serial,
         handler: function(){
             var form = this.findParentByType('form');
             var tr =form.find('nanx_type','trigger_row');
             if(this.serial==tr.length)
                 {
                   this.ownerCt.ownerCt.remove(this.ownerCt);
                 }
         }
     });

     var field_link = new Ext.Container({
         'id': 'followRow_'+Ext.id(),
         'layout':'table',
         'nanx_type':'trigger_row',
         'style':'{margin-left:105px;}',
         items:[btn_del,host_combo,root_slave]
     });
     return field_link;
 }




 Fb.getTriggerBar12345 = function(item,node) {


     main_table=node.attributes.value;
     
     var dropdown_item_add = new Ext.Button({
         text:i18n.add_trigger,
         id:'trigger_bar_button',
         handler: function() {
             {

                 var form = this.findParentByType('form');
                 var trigger_rows =form.find('nanx_type','trigger_row');
                 var newline = Fb.triggerRow12345({
                     'serial': trigger_rows.length+1,
                     'base_table': main_table
                 });
                 this.ownerCt.ownerCt.insert(12,newline);
                 this.ownerCt.ownerCt.doLayout();
             }
         }
     })
    
     var headers=['base_table_col','trigger_table','trigger_table_list','trigger_table_value','trigger_table_filter'];
     var head_tb="<table><tr>";
     for(var i=0;i<headers.length;i++)
     {
      head_tb+='<td width=140px>'+i18n[headers[i]]+'</td>';
     }
     head_tb+="</tr></table>";
     var tb_c=new Ext.Container({html:head_tb});
     var f = new Ext.Container({
         fieldLabel:i18n.group_item,
         layout:'table',
      items:[dropdown_item_add,tb_c]
     });
     return f;
 }

Fb.setSingleField=function(jsondata, item) {
         if (item.path) {
             var v = jsondata[item.path];
             console.log("setting ",v)
             var compent = Ext.getCmp(item.id);
             console.log(compent)
             
             if (compent) { compent.Callback_setValue(v) };
            }
}
 



 Fb.CallbackSetFieldValue = function(mcfg,node) {
 
         Ext.Ajax.request({
             url: AJAX_ROOT + mcfg.callback_set_url,
             jsonData: Ext.encode(mcfg.json),
             callback: function(options, success, response) {
                 var ret_json = Ext.util.JSON.decode(response.responseText);
                 var key_used = mcfg.callback_set_json_key;
                 if (key_used == '/'){
                     var data_from_json = ret_json;
                 } else {
                     var data_from_json = ret_json[key_used];
                 }
                 console.log("后台返回:")
                 console.log(data_from_json)

                 Ext.each(mcfg.itemcfg, function(item) {

                     switch (item.item_type){
                      case 'combo_group':
                         console.log("setting combo_group:")
                         Fb.setSingleField(data_from_json, item.root_combox);
                         for (var i = 0; i < item.slave_comboxes.length; i++) {
                            console.log("setSingleField :",data_from_json,item.slave_comboxes[i])
                         
                             Fb.setSingleField(data_from_json, item.slave_comboxes[i]);
                         }

                             Ext.getCmp(item.root_combox.id).getStore().reload();
                      
                         break;
                      
                      case 'follow_tbar':
                             follow_key_used = item.path;
                             Fb.addTriggerRow12_from_response(ret_json[follow_key_used]);
                             break;
                      
                      case 'trigger_bar':
                             break;

                       
                      case 'horizon_line':
                      follow_key_used = item.path;
                       Fb.show_trigger_lines(ret_json[follow_key_used], node,item);
                      break;
                      
                      default:
                         Fb.setSingleField(data_from_json, item);
                     }
                 });
             }
         });
 }



 Fb.preProcessNodeAtt = function(cfg, xnode) {

     var fixed = DeepClone(cfg);
     function fix_obj_tag(taged, node) {
         if (taged.substring(0, 2) == '##') {
             var skey = taged.substring(2, taged.length);
             return xnode.parentNode.attributes[skey];
         }
         if (taged.substring(0, 1) == '#') {
             var skey = taged.substring(1, taged.length);
             return xnode.attributes[skey];
         }
         
         if (taged.substring(0,7) == '@random') {
             return   randomString();
         }
         
         
         return taged;
     }

     if (fixed.value) {
        if((typeof fixed.value)=='number' ){fixed.value=fixed.value;}
        else
          { 
            if(fixed.value===true){fixed.value='true';}
            else{ fixed.value = fix_obj_tag(fixed.value, xnode);}
          }
     }

    if (fixed.file_type) {
             fixed.file_type = fix_obj_tag(fixed.file_type, xnode);
     }


    if (fixed.main_table) {
             fixed.main_table = fix_obj_tag(fixed.main_table, xnode);
     }



    if (fixed.os_path) {
             fixed.os_path = fix_obj_tag(fixed.os_path, xnode);
     }


     if (fixed.json) {
         for (var subkey in fixed.json) {
             fixed.json[subkey] = fix_obj_tag(fixed.json[subkey], xnode);
         }
     }
     return fixed;
 }


Fb.getCellStr = function(grid, rowIndex, colIndex) {
         var rec = grid.getStore().getAt(rowIndex);
         var columnName = grid.getColumnModel().getDataIndex(colIndex);
         var cellValue = rec.get(columnName);
         return cellValue;
     };
     

 Fb.UserActivity = {
     setKeys: function(kv) {
         for (var i = 0; i < kv.length; i++) {
             var c = kv[i];
             Fb.UserActivity.keys[c.key] = c.value;
         }
     },
     getValue: function(a) {
         return Fb.UserActivity.keys[a];
     },
     keys: {}
 };

  
 
 
  Fb.check_table_prefix = function(v) {
     var tablename=Ext.util.Format.trim(v);
     if(tablename.indexOf(' ') >= 0 )  
     {  
       return false;
     }  
       
     if (tablename.length == APP_PREFIX.length) {
         return false;
     }
     if (tablename == APP_PREFIX + '_') {
         return false;
     }
     
     if(!(tablename.indexOf(APP_PREFIX)==0))
     {
      return false;
     }
     return true;
 }


 
Fb.validate_password_input = function(v) {
      
      var pwd=Ext.getCmp('password').getValue();
      var pwd2=Ext.getCmp('password2').getValue();
      if(pwd.length<1){return false;} 
      if(!(pwd===pwd2)){return false;}
      else
        {return true;}
       
 }
 

 