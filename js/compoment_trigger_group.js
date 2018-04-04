/*
compoment_trigger_group.js

*/


Ext.ns('TriggerGroup');

var TriggerGroup = {};



 TriggerGroup.triggerMeta5 = function(cfg,meta5){

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
     var store = Fb.buildTriggerStore(hostcfg);
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




 TriggerGroup.getTriggerGroupHeader = function(item,node) {


     main_table=node.attributes.value;
     
     var dropdown_item_add = new Ext.Button({
         text:i18n.add_trigger,
         id:'trigger_bar_button',
         handler: function() {
             {
 
                 var form = this.findParentByType('form');
                 var trigger_rows =form.find('nanx_type','trigger_row');
                 var newline = TriggerGroup.triggerMeta5({
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



 TriggerGroup.getTriggerBar12 = function(main_table) {
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
 
 

 
  TriggerGroup.triggerRow12 = function(cfg) {
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

     var ds_l = Fb.buildTriggerStore(left_tree_cfg);
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

     var ds_r = Fb.buildTriggerStore(right_tree_cfg);
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



 TriggerGroup.create_horizon_line=function(item,node,meta_data){
       
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



 
 TriggerGroup.show_trigger_lines=function(triggers,node,item)
 {
     

    for(var i=0;i<triggers.length;i++)
    {
     var meta=triggers[i];
     item.serial=i+1; 
    

     var trigger_row=TriggerGroup.create_horizon_line(item, node,meta);
     var btn=Ext.getCmp('trigger_bar_button');
     var tfm = btn.findParentByType('form');
     
     tfm.insert(12,trigger_row);
     tfm.doLayout();
    }
 }
  
 


 TriggerGroup.addTriggerRow12_from_response = function(follow_cfg) {
     var current_form = Ext.getCmp('back_opform');
     for (var n = 0; n < follow_cfg.length; n++) {
         var field_2 = TriggerGroup.triggerRow12({
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
