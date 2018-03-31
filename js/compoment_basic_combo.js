/*
compoment_basic_combo.js

*/

 
Ext.ns('COMBOX');

var COMBOX = {};



 COMBOX.getBasicCombo = function(xcfg, store,_readOnly) {

   var cfg=DeepClone(xcfg);
   if ( _readOnly== undefined) {  
         _readOnly=false;  
    }  

     if(   cfg.hasOwnProperty('using_serial')  )
     {
         com_id=cfg.id+'_'+cfg.serial;
     }
     else
     {
        com_id=cfg.id;
        cfg.serial=0;
     }

     var combox_cfg = {
         id: com_id,
         serial:cfg.serial,
         triggerAction: 'all',
         displayField: cfg.displayField,
         valueField: cfg.valueField,
         emptyText: i18n.combo_choose,
         fieldLabel: cfg.label,
         forceSelection: true,
         editable: true,
         pageSize:pageSize,           //显示下拉列表的分页
         // readOnly:_readOnly,
         name: com_id,
         width:cfg.width?cfg.width+100:300,
         allowBlank: cfg.hasOwnProperty('allowBlank') ? cfg.allowBlank : true,
         style: cfg.style ? cfg.style : null,
         group_id: cfg.group_id ? cfg.group_id : 'RS_' + Ext.id(),
         nanx_type: cfg.nanx_type,
         level: cfg.level,
         border: true,
         mode: 'remote',
         store: store,
         typeAhead: true,
         selectOnFocus: true
     };
     


     var combo = new Ext.form.ComboBox(combox_cfg);
      
     store.on('load', function() {
         
          var p = Ext.getCmp(combox_cfg.id);
          
          if (cfg.ini) {
             p.setValue(cfg.ini);
           
             cfg.ini = null;

         } else {
             p.setValue(p.getValue());
         }
         

         //bug: 导致后台setvalue失败?
        // p.setRawValue(cfg.raw_value); //显示下拉框的文本, 因为store分页,有可能不在当前page里面,所有强制设定

         var tfm = Ext.getCmp(combox_cfg.id).findParentByType('form');
         var tmp_v = combo.getValue();
         if (Ext.isEmpty(tmp_v)) {
           
             return;
         }

         var current_rec = combo.findRecord(combo.valueField || combo.displayField, tmp_v);
         if(!current_rec){
            return;
         }

         var current_v = current_rec.json[cfg.value_key_for_slave] || combo.getValue();
         var x_group_id = combox_cfg.group_id;
         var level = combox_cfg.level;
         
         var direct_slaves = Fb.findSlaves(tfm, x_group_id, level, true);
         
         for (var i = 0; i < direct_slaves.length; i++) {
             var ds = direct_slaves[i].getStore();
             var path='query_cfg.lines.vset_'+i;
             Fb.setStorePara(ds, path,current_v);
             direct_slaves[i].getStore().load();
         }
     });


     combo.on("select", function(c, record) {

         COMBOX.setFollowFieldValue.createDelegate(this, [c, record, cfg], true)();
         var fm = c.findParentByType('form');
         var tmp_v = c.getValue();

         if (Ext.isEmpty(tmp_v)) {
             return;
         }
         
         var current_rec = c.findRecord(c.valueField || c.displayField, tmp_v);
         var v = current_rec.json[cfg.value_key_for_slave];
         
         if (Ext.isEmpty(v)) {
             v = tmp_v;
         }
         
         var x_group_id = cfg.group_id;
         var level = cfg.level;
         var all_slaves = Fb.findSlaves(fm, x_group_id, level);
         var direct_slaves = Fb.findSlaves(fm, x_group_id, level, true);

         for (var i = 0; i < all_slaves.length; i++) {
             all_slaves[i].getStore().clearData();
             all_slaves[i].clearValue();
         }

         for (var i = 0; i < direct_slaves.length; i++) {
             var ds = direct_slaves[i].getStore();
             var path='query_cfg.lines.vset_'+i;
             Fb.setStorePara(ds, path, v);
             ds.reload();
         }
     });
     
      

     if (cfg.detail_btn) {
         var table = cfg.editor_cfg.trigger_cfg.combo_table;
         var btn_detail = Fb.getDetailBtn(table);
         var combowithdetail = new Ext.Container({
             fieldLabel: cfg['display_cfg'].field_c,
             layout: 'table',
             nanx_type: 'combo_with_detail',
             items: [combo, btn_detail]
         });
         return combowithdetail;
     } else {
         return combo;
     }
 }




 COMBOX.setFollowFieldValue = function(e, record, oneFieldCfg) {
     if (!oneFieldCfg['editor_cfg']) return;
     for (var i = 0; i < oneFieldCfg['editor_cfg']['follow_cfg'].length; i++) {
         var f = oneFieldCfg['editor_cfg']['follow_cfg'][i]['base_table_follow_field'];
         var ref_f = oneFieldCfg['editor_cfg']['follow_cfg'][i]['combo_table_follow_field'];
         var v = record.json[ref_f];
         var f2set = this.findParentByType('form').findById(f);
         if (f2set){
             var orginal_v= f2set.getValue();
            // if(!Ext.isEmpty(orginal_v)){return;}
             f2set.addClass('x-form-linked');
             f2set.setValue(v);
             f2set.el.applyStyles({
                 top: 200,
                 left: 400,
                 color: '#000040',
                 backgroundColor:'#8080FF'
             }).frame("#000040", 1, {
                 duration1: 0.3
             });

         }
     }
 }



 COMBOX.getComboGroup = function(xitem) {

     var item=DeepClone(xitem);

     var f = [];
     var root_cfg = item.root_combox;
      
    if(   item.hasOwnProperty('using_serial')){
     root_cfg.using_serial=true;
     root_cfg.serial=item.serial;
    }

     
     root_cfg.nanx_type = 'root';
     
     if (!root_cfg.group_id) {
         var x_group_id = Ext.id();
         root_cfg.group_id = x_group_id;
     }
     else
     {
         root_cfg.group_id = root_cfg.group_id+'_'+root_cfg.serial;
     }

     
     root_cfg.displayField = 'text';
     root_cfg.valueField = 'value';
     

      

     var ds_root = Fb.buildTreeStore(root_cfg);
     var f_root = COMBOX.getBasicCombo(root_cfg, ds_root);
     f.push(f_root);

     for (var k = 0; k < item.slave_comboxes.length; k++) {

         var slave_cfg = item.slave_comboxes[k];

         if(   item.hasOwnProperty('using_serial')){
            slave_cfg.using_serial=true;
            slave_cfg.serial=item.serial;
         }

         slave_cfg.group_id = root_cfg.group_id  ;
         slave_cfg.nanx_type = 'slave';
         slave_cfg.displayField = 'text';
         slave_cfg.valueField = 'value';
         var ds_slave = Fb.buildTreeStore(slave_cfg);
         var f_slave = COMBOX.getBasicCombo(slave_cfg, ds_slave);
         f.push(f_slave);
     }
     return f;
 }




COMBOX.toggle_combo=function(togglefalg)
{
   //enable or disable all combo in form
   var current_form = Ext.getCmp('back_opform');
   var cbs = current_form.findByType(['combo']);
   for (var i = 0; i < cbs.length; i++){
       if (togglefalg){cbs[i].enable(); }else{cbs[i].disable(); }
   }
}

