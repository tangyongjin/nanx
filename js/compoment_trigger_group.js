/*
compoment_trigger_group.js

*/


Ext.ns('TriggerGroup');

var TriggerGroup = {};



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



 TriggerGroup.create_comboxs_line=function(item,node,meta_data){
       // alert('create_comboxs_line')
       console.log(item)
       console.log(node)
       
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
             if(this.serial==current_counter)  //只能删除最后一行
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
        

        
        console.log(fixed_sub_item_cfg)
        
        if (meta_data){  
             fixed_sub_item_cfg=Fb.set_trigger_line_ini(fixed_sub_item_cfg,meta_data);
        }
        
        console.log(fixed_sub_item_cfg)
        
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
     var trigger_row=TriggerGroup.create_comboxs_line(item, node,meta);
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
