/*
compoment_basic_combo.js

*/

 
Ext.ns('COMBOX');

var COMBOX = {};

 
 COMBOX.findSlaves = function(form, grp_id, level, direct) {
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

     var combox_width=cfg.width?cfg.width:300
     combox_width=140;
     console.log(store)
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
         // pageSize:pageSize,           //显示下拉列表的分页
         pageSize:100,           //显示下拉列表的分页
         name: com_id,
         width:combox_width,
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
      store.addListener('load', COMBOX.loadHandler.createDelegate(store,[cfg,combox_cfg,combo],false));
      combo.addListener('select', COMBOX.refreshSlaveStore.createDelegate(combo,[cfg],true));
      
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


COMBOX.ComboStoreChangeHandler=function(combo,field_cfg){

         var fm = combo.findParentByType('form');
         var tmp_v = combo.getValue();
          
         

         if (Ext.isEmpty(tmp_v)) {
             console.log( 'return for isEmpty  tmp_v ' ) 
             return;
         }
         
         var current_rec = combo.findRecord(combo.valueField || combo.displayField, tmp_v);
         var v = current_rec.json[field_cfg.value_key_for_slave];
         
         if (Ext.isEmpty(v)) {
             v = tmp_v;
         }
         
         var x_group_id = field_cfg.group_id;

         var level = field_cfg.level;COMBOX
         var all_slaves = COMBOX.findSlaves(fm, x_group_id, level);
         var direct_slaves = COMBOX.findSlaves(fm, x_group_id, level, true);

         for (var i = 0; i < all_slaves.length; i++) {
             all_slaves[i].getStore().clearData();
             all_slaves[i].clearValue();
         }

         for (var i = 0; i < direct_slaves.length; i++) {
             var ds = direct_slaves[i].getStore();
             var path='query_cfg.lines.vset_'+i;
             COMBOX.setStorePara(ds, path, v);
             ds.reload();
         }

}


COMBOX.refreshSlaveStore=function(combo,record,idx,field_cfg){
         
         COMBOX.setFollowFieldValue.createDelegate(this, [combo, record, field_cfg], true)();
         COMBOX.ComboStoreChangeHandler(combo,field_cfg)
         
}

COMBOX.loadHandler=function(field_cfg,combox_cfg,combo){ 
         

          if (field_cfg.ini) {
             combo.setValue(field_cfg.ini);
             field_cfg.ini = null;
          } else {
             combo.setValue(combo.getValue());
          }
         

         //bug: 导致后台setvalue失败?
         // combo.setRawValue(field_cfg.raw_value); //显示下拉框的文本, 因为store分页,有可能不在当前page里面,所有强制设定
         // console.log(field_cfg)
         // console.log(field_cfg.raw_value)

         var x_group_id = combox_cfg.group_id;

         var tfm = Ext.getCmp(combox_cfg.id).findParentByType('form');
         var tmp_v = combo.getValue();
         if (Ext.isEmpty(tmp_v)) {
             return;
         }

         var current_rec = combo.findRecord(combo.valueField || combo.displayField, tmp_v);
         
         if(!current_rec){
            console.log("return for current_rec by : "+  combo.valueField || combo.displayField +tmp_v)
            return;
         }else{
             
         }
        
       
         var current_v = current_rec.json[field_cfg.value_key_for_slave] || combo.getValue();
         var level = combox_cfg.level;
         var direct_slaves = COMBOX.findSlaves(tfm, x_group_id, level, true);
         for (var i = 0; i < direct_slaves.length; i++) {
             var ds = direct_slaves[i].getStore();
             var path='query_cfg.lines.vset_'+i;
             
             COMBOX.setStorePara(ds, path,current_v);
             direct_slaves[i].getStore().load();
         }


}


 COMBOX.setStorePara = function(store, key, value) {
     if (store.proxy.conn.jsonData) {
          setJsonPath(store.proxy.conn.jsonData,key,value);
     } else {
         store.baseParams.value = value;
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

     var ds_root = Fb.buildTriggerStore(root_cfg);
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
         var ds_slave = Fb.buildTriggerStore(slave_cfg);
         var f_slave = COMBOX.getBasicCombo(slave_cfg, ds_slave);
         // skip 第一个  filter_field
         if( !(slave_cfg.id == 'filter_field' &&  slave_cfg.serial==1 ) ){
                f.push(f_slave);
         } 
     }

     return f;
 }


 
