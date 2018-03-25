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
 
Fb.getDate=function()
{
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd
        } 
        if(mm<10) {
            mm='0'+mm
        } 
        today = yyyy+'-'+ mm+'-'+dd;
        return today;
}



 
 Fb.showPic = function(pic) {
     var xwin = new Ext.Window({
         constrain: true,
         modal: true,
         title: i18n.origin_pic + '   ' + pic,
         html: '<br/>&nbsp;&nbsp;' + pic + "<br/><img style='margin:10px;' src='" + pic + "'>"
     });
     xwin.show();
 }

 

Fb.toggle_combo=function(togglefalg)
{
   //enable or disable all combo in form
   var current_form = Ext.getCmp('back_opform');
   var cbs = current_form.findByType(['combo']);
   for (var i = 0; i < cbs.length; i++){
       if (togglefalg){cbs[i].enable(); }else{cbs[i].disable(); }
   }
}

 Fb.getFileType=function(name)
 {    
      var pictype = ['gif', 'bmp', 'png', 'jpg', 'jpeg', 'tif'];
      var no_pic = ['avi', 'css', 'doc', 'docx', 'midi', 'mov', 'mp3', 'mpeg', 'pdf', 'ppt', 'pptx', 'proj', 'psd', 'pst', 'rar', 'txt',
         'wav', 'wma', 'wmv', 'xls', 'zip'
      ];
      var xlstype=['xls'];
      var jstype=['js'];
      var sqltype=['sql'];
      var phptype=['php'];
      var meta = name.split('.').pop().toLowerCase();
      var ftype='unknow';
      if(pictype.indexOf(meta)!== -1){
         ftype = 'img';
      }
      if(sqltype.indexOf(meta)!== -1){
         ftype = 'sql';
      }
      if(jstype.indexOf(meta)!== -1){
         ftype = 'js';
      }
      if(phptype.indexOf(meta)!== -1){
         ftype = 'php';
      }
      if (no_pic.indexOf(meta) !== -1) {
         ftype = meta;
      }
      return ftype;
 }

 Fb.geFileWrapper = function(field) {
     if (!field.value) {
         var box = {
             xtype: 'box'
         };
         return box;
     }

     var fname = field.value.split('/').pop();
     var ftype=Fb.getFileType(fname);

    
     if (ftype == 'img'){
         var box = {
             xtype: 'box',
             html: '<div class=pic_holder><span>' + i18n.dbl_click_to_viewe_origin_pic + '</br></span><img id="' + field.name + '_img_mask" src="' + field.value + '"></div>',
             listeners: {
                 afterrender: function(b) {
                     var pic = Ext.get(field.name + '_img_mask');
                     pic.on('dblclick', function() {
                         Fb.showPic(field.value);
                     }, this)
                 }
             }
         };
     } else {
         var box = {
             xtype:'box',
             html: '<div  style="height:44px"  class=pic_holder><table><tr><td><img src="' + BASE_URL+ 'css/images/' + ftype + '.png "></td><td><a onClick=Fb.showDownload(' + "'" + field.value + "'" + ')  href=#>' + fname + '</a></td></tr></div>',
         };
     }
     return box;
 }

 Fb.getAttachmentEditor = function(cfg) {
     var xid = Ext.id();
     var fake_id = cfg.name;
     upload_field = [{
         xtype: 'fileuploadfield',
         emptyText: i18n.choose_file_to_upload,
         value: cfg.value,
         fieldLabel: cfg.label,
         id: cfg.name,
         name: cfg.name,
         buttonCfg: {
             iconCls: 'upload-icon'
         },
         width: 200,
         listeners:{
             'fileselected':function(obj,file){
                  var ftype=Fb.getFileType(file);
                  if(cfg.file_type)
                   {
                    if(cfg.file_type!==ftype){
                           Ext.Msg.alert(i18n.message, i18n.check_file_type);
                           return;
                          }
                   }
                  
                 var form=Ext.getCmp(xid).findParentByType('form');
                 if (form) {
                     this.ownerCt.field_realupload=true;
                     form.uptasks++;
                     form.realupload = true;
                 }
             }
         }
     }, {
         xtype: 'button',
         cls: 'hidden_upload_btn',
         hidden: true,
         listeners: {
             'click': function(){
                 var form = Ext.getCmp(xid).findParentByType('form');
                 if (!this.ownerCt.field_realupload) {
                     form.uptasks--;
                     return;
                 }
                 var p = {
                     'formfield': cfg.name,
                     'os_path': cfg.os_path || 'uploads'
                 };
                 var postcfg = {
                     'params': Ext.encode(p)
                 };
                 if (form.getForm().isValid()){
                     form.getForm().submit({
                         url: AJAX_ROOT + UPLOAD_URL,
                         params:postcfg,
                         failure: function(f, r) {
                             WaitMask.hide();
                             Fb.showUploadResult(r,postcfg);
                             form.uptasks--;
                             form.upload_errcount++;
                         },
                         success:function(f,r) {
                             WaitMask.hide();
                             if (r.result.success){
                                 var fd = form.getForm().findField(cfg.name);
                                 fd.setValue(r.result.serverURL);
                                 form.uptasks--;
                                 Act.prototype.FormAction(form);
                             }
                             Fb.showUploadResult(r);
                         }
                     });
                 } 
             }
         }
     }];
     var compo = {
         xtype: 'compositefield',
         anchor: '100%',
         fake_id: fake_id,
         id: xid,
         fieldLabel: cfg.label,
         items: [upload_field]
     };
     var box = Fb.geFileWrapper(cfg);
     return [compo, box];
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


Fb.getTreeBtns=function(yy){
   
    var public_btns=[];
    {
        public_btns.push({
            xtype:'button',
            text:i18n.add,
            iconCls:'n_add',
            style:{
                marginRight:'6px'
            },
            ctCls:'x-btn-over',
            handler:function(){


                var tree=Ext.getCmp('menutree');
                var rootnode=tree.getRootNode()
                var currentNode=tree.getSelectionModel().getSelectedNode() || tree.root;
                currentNode.appendChild({
                 text : '菜单',
                 activity_code: 'mgroup_'.concat(Fb.randomString()),
                 leaf : false,
                 children:[]
                  });
            }
        });
    }

   
   public_btns.push({
            text:i18n.drop,
            iconCls:'n_del',
            style:{
                marginRight: '6px'
            },
            ctCls:'x-btn-over',
            id:'pub_delete',
            handler:function(e,x){
              
            
                var tree=Ext.getCmp('menutree');
                var sm=tree.getSelectionModel()
                var record = tree.getSelectionModel().getSelectedNode() 
                 if(record){
                     record.remove(true);
                 }
            }
        });
        
     
   
        public_btns.push({
            text:i18n.update,
            iconCls:'n_edit',
            style:{
                marginRight: '6px'
            },
            ctCls:'x-btn-over',
            id:'pub_edit',
            handler:function(){
                var tree=Ext.getCmp('menutree');
                var currentNode=tree.getSelectionModel().getSelectedNode() || tree.root;
            }
        });
    return public_btns;
}


 Fb.getTreeGrid=function(cfg){
    var tree = new Ext.tree.TreePanel(
     {
        root:{text:'root',leaf:false,activity_code:'',id:'root',expanded:false, children:[]}
        ,enableDD:true
        ,ddGroup:'NANX_gridDD'

        ,id:'menutree'
        ,region:'east'
        ,title:'菜单'
        ,layout:'fit'
        ,width:300
        ,height:360
         ,tbar:{
            xtype:'buttongroup',
            title:'',
            items:this.getTreeBtns()
        }

        ,split:true
        ,bodyStyle:'background-color:white;'
        ,border:true
        ,collapsible:true
        ,autoScroll:true
        ,listeners:{
            // create nodes based on data from grid
            beforenodedrop:{fn:function(e) {

                // e.data.selections is the array of selected records
                if(Ext.isArray(e.data.selections)) {

                    // reset cancel flag
                    e.cancel = false;
                    // setup dropNode (it can be array of nodes)
                    e.dropNode = [];
                    var r;
                    for(var i = 0; i < e.data.selections.length; i++) {

                        // get record from selectons
                        r = e.data.selections[i];
                        // create node from record data
                        e.dropNode.push(this.loader.createNode({
                             text:r.get('text')
                            ,leaf:true,
                             activity_code:r.get('value')
                        }));
                    }
                    return true;
                }
            }}
        }
    });



    var te = new Ext.tree.TreeEditor(tree, new Ext.form.TextField({
        allowBlank: false,
        blankText:''
    }), {
        editDelay: 100,
        revertInvalid: false
    });

    te.on('beforestartedit', function(ed, boundEl, value) {
        if (ed.editNode.leaf)
            return false;
    });
    return tree;
 }


 Fb.showUploadResult=function(r)
 {
   if(r.result.show_client_upload_info)
        {
        Ext.Msg.alert(i18n.message, r.result.msg);
        }
 
   if(Ext.getCmp('grid_FILE')){
     Ext.getCmp('grid_FILE').getStore().reload();
   }
 }
 

 Fb.setFollowFieldValue = function(e, record, oneFieldCfg) {
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
     var xxx_combo = Fb.getBasicCombo(left_tree_cfg, ds_l);

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
     var yyy_combo = Fb.getBasicCombo(right_tree_cfg, ds_r);


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

        var sub_item=Fb.getBackendFormItem(fixed_sub_item_cfg,node);
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
   itemcfg_setted=Fb.DeepClone(itemcfg);
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
  
 
 
 Fb.dndgrid = function(grid_cfg) {
     var col_need = [];
     var fields = [];
     var col_model = [];
     for (var i = 0; i < grid_cfg.fields.length; i++) {
         var single_col = {};
         single_col.name = grid_cfg.fields[i].column;
         single_col.dataIndex = grid_cfg.fields[i].column;
         single_col.header = grid_cfg.fields[i].column_title;
         single_col.width = 150;

        if( grid_cfg.fields[i].hasOwnProperty('width')){
              single_col.width=grid_cfg.fields[i].width;
         } 
         if( grid_cfg.fields[i].hasOwnProperty('hidden')){
              single_col.hidden=grid_cfg.fields[i].hidden;
         } 


         col_need.push(single_col);
         fields.push(grid_cfg.fields[i].column);
     }

     var need = Ext.data.Record.create(col_need);
     var category_params = grid_cfg;
     var ds_cfg = {
         reader: new Ext.data.ArrayReader(need),
         baseParams: grid_cfg,
         proxy: new Ext.data.HttpProxy({
             url: TREE_URL,
             method: 'POST'
         }),
         root: 'server_resp',
         fields: fields
     };

     var cm = new Ext.grid.ColumnModel(col_need);
     var ds = new Ext.data.JsonStore(ds_cfg);
     ds.load();


     var singleCol = new Ext.grid.GridPanel({
         'title': grid_cfg.gridlabel,
         id: grid_cfg.grid_ext_id,
         height: 360,
         width: grid_cfg.grid_width,
         store: ds,
         border: true,
         cm: cm,
         columnLines: true,
         ddGroup: "NANX_gridDD",
         enableDragDrop: true,
         autoScroll: true,
         sm: new Ext.grid.RowSelectionModel({
             singleSelect: true
         })
     });
     singleCol.addListener('render', Fb.dnd_mgr.createDelegate(this, [grid_cfg.self_dnd], true));
     return {
         items: [singleCol]
     };
 };

 Fb.dnd_mgr = function(grid, self_dnd) {
     if (!self_dnd) {
         return;
     }
     var c = new Ext.dd.DropTarget(grid.container, {
         ddGroup: "NANX_gridDD",
         copy: false,
         notifyDrop: function(DragSource, event, DragData) {
             var ds = grid.store;
             var selModel = grid.getSelectionModel();
             var selected_rows = selModel.getSelections();
             if (DragSource.getDragData(event)) {
                 var row_index = DragSource.getDragData(event).rowIndex;
                 if (typeof(row_index) != "undefined") {
                     for (i = 0; i < selected_rows.length; i++) {
                         ds.remove(ds.getById(selected_rows[i].id))
                     }
                     ds.insert(row_index, DragData.selections);
                     selModel.clearSelections();
                 }
             }
         }
     });
 };

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


 Fb.getBasicCombo = function(xcfg, store,_readOnly) {

   var cfg=Fb.DeepClone(xcfg);
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

         Fb.setFollowFieldValue.createDelegate(this, [c, record, cfg], true)();
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


Fb.setJsonPath=function(obj,path, val) {
  var fields = path.split('.');
  var result = obj;
  for (var i = 0, n = fields.length; i < n && result !== undefined; i++) {
    var field = fields[i];
    if (i === n - 1) {
      result[field] = val;
    } else {
      if (typeof result[field] === 'undefined') {
        result[field] = {};
      }
      result = result[field];

    }
  }
}


 Fb.setStorePara = function(store, key, value) {
     if (store.proxy.conn.jsonData) {
         this.setJsonPath(store.proxy.conn.jsonData,key,value);
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

              var  field_value_list=this.getFormData(form)
           
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

     return this.getBasicCombo(one_col_cfg, combo_store,readonly_flag);
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
             rowOriginalValue=Fb.getDate();
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
         return [this.getAttachmentEditor(cfg)];
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

 Fb.getFormData = function(form) {

     if (!form.getForm().isValid()  &&  !Ext.getCmp('force_not_check')   ) {
         Ext.Msg.alert(i18n.error, i18n.check_input);
         return false;
     }

     var fmdata = {};
     var formel = form.getEl();
     var ipts = formel.query('input');
     console.log(ipts)

     for (var i = 0; i < ipts.length; i++) {
         var field_id = ipts[i].getAttribute("id");
         
         console.log(field_id)

         if (Ext.getCmp(field_id)) {
             var field = Ext.getCmp(field_id);
             var field_type = field.getXType();
             var field_value = field.getValue();
             if ((field_type == 'datefield') || (field_type == 'datetimefield')) {
                 var testdate = new Date(field_value);
                 if (isNaN(testdate.valueOf())) {
                     field_value = null;
                 }
             }
             fmdata[field_id] = field_value;
         }else
         {

            console.log("!!!!!!!!!!!!!not found")
         }
     }
     console.log('fmdata',fmdata)

     var xtypes = form.findByType("timepickerfield");
     
     for (var i = 0; i < xtypes.length; i++) {
         fmdata[xtypes[i].id] = xtypes[i].getValue();
     }

     var fm_tmp_v = form.getForm().getValues();
     console.log(fm_tmp_v)

     Ext.applyIf(fmdata, form.getForm().getValues());
     for (var p in fmdata) {
         if ((p.substring(0, 7) == 'ext-gen') || (p.substring(0, 8) == 'ext-comp')) {
             console.log("delete ----")
             delete fmdata[p];
         };
     }

     if (fmdata.opcode && fmdata.opcode.indexOf('set_biz_field_combo_follow') >= 0) {
         fmdata['nanx_follow_cfg'] = Fb.getFollowCfg(form);
     }
  
        var trigger_rows =form.find('nanx_type','trigger_row');
        if(trigger_rows.length>0){
            fmdata['trigger_counts'] = trigger_rows.length;
        }
         


     if (fmdata.opcode && fmdata.opcode.indexOf('set_activity_pic') >= 0){
     
         var fileGrid=Ext.getCmp('grid_FILE');        
         file_choosed=Act.prototype.getMediaGridValue(fileGrid);
         var picname = file_choosed[0].split('/').pop();
         fmdata['activity_pic']=picname;
     }

 
     var extradata = getGridExtraData();

     if( Ext.getCmp('menutree') ){
        Ext.getCmp('menutree').getRootNode().expand(true);
        extradata= getTreeData('menutree');
     }



     if (extradata){
       if (extradata.mustHaveOneRow && 0==extradata.row_count)
         {
          alert(i18n.choose_only_one_record);
          return; 
         }
       }

     if (extradata){
         fmdata.extradata = extradata;
     }
     
     if (fmdata.hasOwnProperty('transfer')){
         if (fmdata.transfer == 'false'){
             fmdata.transfer = false;
         }
         if (fmdata.transfer == 'true'){
             fmdata.transfer = true;
         }
     }
     return fmdata;
 }

  

 Fb.getComboGroup = function(xitem) {

     var item=Fb.DeepClone(xitem);

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
     var f_root = Fb.getBasicCombo(root_cfg, ds_root);
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
         var f_slave = Fb.getBasicCombo(slave_cfg, ds_slave);
         f.push(f_slave);
     }
     return f;
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

 Fb.showDownload = function(fname) {
     var xwin = new Ext.Window({
         constrain: true,
         modal: true,
         height: 180,
         title: i18n.excel_download,
         html: '<br/><div style="margin:20px;">' + i18n.clk_to_download + '<br/><br/><a href=' + fname + '>' + fname + '</a></div>'
     });
     xwin.show();
 }

 Fb.ajaxPostData = function(url, para, callback) {
     WaitMask.show();
     var json = Ext.encode(para);
     var that = this;
     Ext.Ajax.request({
         url: url,
         jsonData: json,
         method: 'POST',
         success: function(response, opts) {
             WaitMask.hide();
             var ret = Ext.util.JSON.decode(response.responseText);
             if (ret.success) {
                 if (ret.file_operation) {
                     return;
                 }
                 
                 if (ret.showdownload) {
                     Fb.showDownload(ret.fname);
                     return;
                 }
                 
                 if ((ret.msg.length > 0) && (!ret.hasOwnProperty('show_msg_on_error'))) {
                     Ext.Msg.alert(i18n.msg, ret.msg);
                 }

                 if (callback) {
                     callback(ret);
                 }

             } else {
                 if(ret.errmsg){Ext.Msg.alert(i18n.error, ret.errmsg);}else{Ext.Msg.alert(i18n.error, ret.msg);}
             }
         },
         failure: function(response, opts) {
             WaitMask.hide();
             Ext.Msg.alert(i18n.msg, response.responseText);
         }
     });
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



 Fb.LayoutManager = function(grid) {
     var c = new Ext.dd.DropTarget(grid.getView().scroller.dom, {
         ddGroup: "NANX_gridDD",
         notifyDrop: function(DragSource, event, DragData) {
             var orgStore = DragSource.grid.getStore();
             var records = DragSource.dragData.selections;
             var index = orgStore.find('value', records[0].data.value);
             var xy = event.getXY();
             var landed = getColRange(grid, xy[0], xy[1], event);
             var col_use = landed.col;
             var col_name = 'col_' + col_use;
             var cell = {};
             cell[col_name] = records[0].data.value;
             var Field_rec = new Ext.data.Record(cell);
             if (landed.out) {
                 var new_col_config = {
                     dataIndex: 'col_' + landed.col,
                     header: i18n.col_prefix + landed.col
                 };
                 var cm = grid.getColumnModel();
                 cm.config.push(new_col_config);
                 cm.setConfig(cm.config);
                 grid.doLayout();
             }
             if (landed.new_row) {
                 grid.store.add(Field_rec);

             } else {
                 var current_row = grid.getStore().getRange(landed.row, landed.row);
                 var fieldName = 'col_' + landed.col;
                 var tmpvalue = current_row[0].get('col_' + landed.col);
                 if (!(tmpvalue === undefined)) {
                     var restore_Field = new Ext.data.Record({
                         value: tmpvalue
                     });
                 }
                 current_row[0].set('col_' + landed.col, records[0].data.value);
                 grid.store.commitChanges();
             }
         }
     });
 };

 

 Fb.RestoreField = function(grid, row, col, event) {
     var cellMenu = new Ext.menu.Menu({
         items: [{
             text: i18n.remove,
             iconCls: "menu_del"
         }],
         listeners: {
             click: function(item) {
                 var current_row = grid.getStore().getRange(row, row);
                 var tmpvalue = current_row[0].get('col_' + col);
                 current_row[0].set('col_' + col, undefined);
                 var x = Ext.getCmp('reorder_columns_grid');
                 var restore_Field = new Ext.data.Record({
                     value: tmpvalue
                 });

                 if (tmpvalue.length > 0) {
                     var index = x.getStore().find('value', tmpvalue);
                     if (index == -1) {
                         x.getStore().add(restore_Field);
                     }
                 }
             }
         }
     });
     event.stopEvent();
     cellMenu.showAt(event.xy);
 };

 Fb.getOperationForm = function(node, orginal_mcfg) {

     var  mcfg = Fb.preProcessNodeAtt(orginal_mcfg, node);
     var layout = 'form';
     var forms = [];
     var needsend = ['id','group_id', 'table', 'hostby', 'column_definition', 'DDL'];
     var hidden = {
         opcode: mcfg.opcode,
         nodevalue: node.attributes.value
     };
     for (var i = 0; i < needsend.length; i++) {
         var nodekey = needsend[i];
         if (node.attributes.hasOwnProperty(nodekey)) {
             hidden[nodekey] = node.attributes[nodekey];
         }
     }
     for (var property in hidden) {
         var hiddenfield = {
             id: property,
             xtype: 'hidden',
             value: hidden[property]
         };
         forms.push(hiddenfield);
     }

     if (mcfg.place == 'context') {
         var items = mcfg.itemcfg;
         for (var i = 0; i < items.length; i++) {
             if (items[i].hasOwnProperty('layout_panel')) {
                 var layout = 'absolute';
             }

              var item = Fb.DeepClone(items[i]);
              item = Fb.preProcessNodeAtt(item, node);
              var f = Fb.getBackendFormItem(item, node);
             if (f){
                if (f.isArray){
                 for (var j = 0; j < f.length; j++) {
                     forms.push(f[j]);
                 }
             } else {
                 forms.push(f);
             }
           }
              
         }
     }


     var label_w = 100;
     if (mcfg.label_width) {
         label_w = mcfg.label_width;
     }
     var opform = new Ext.form.FormPanel({
         id: "back_opform",
         frame: true,
         autoScroll: true,
         autoDestroy: true,
         border: false,
         layout: layout,
         height: 400,
         labelWidth: label_w,
         fileUpload: true,
         labelAlign: 'right',
         bodyStyle: "padding-left:10px;",
         defaults: {
             allowBlank: false
         },
         name: "opform",
         items: forms
     });
     
     if( mcfg.callback_set_url)
     {
     opform.on('render',function(){  Fb.CallbackSetFieldValue.createDelegate(this, [mcfg,node], true)() });
     }
     return opform;
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
     var host_combo = Fb.getBasicCombo(hostcfg, store);
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
         
         
     var root_slave = Fb.getComboGroup(combo_cfg);
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

     var fixed = Fb.DeepClone(cfg);
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
             return   Fb.randomString();
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


 Fb.getBackendFormItem = function(item,node) {

     var readonly = item.readonly ? item.readonly : false;
     var hidden = item.hidden ? item.hidden : false;
     var checked = item.all_checked ? item.all_checked : false;
     var field_v=item.value;
   

     switch (item.item_type) {
         case 'field':

            if(  item.hasOwnProperty('using_serial') )
             {
                  serial='_'+item.serial
             }
             else
             {
                 serial=''
             }


             var f = {
                 fieldLabel:item.label,
                 id:   item.id ? item.id+serial : "input_" + i,
                 name: item.id ? item.id+serial : "input_" + i,
                 xtype: 'textfield',
                 allowBlank:false,
                 width: item.width ? item.width : 200,
                 readOnly: readonly,
                 hidden: hidden,
                 validator: item.validate_rule ? function(v) {
                     return Fb[item.validate_rule].apply(null, [v]);
                 } : function(v){
                     if(Ext.isEmpty(v)){return false;}else{return true;}
                   },
                 value:item.postfix ? field_v + item.postfix : field_v
             }; 

             if ( item.hasOwnProperty('ini')){
                f.value=item.ini
             }

             if(item.inputType){f.inputType=item.inputType;}
             break;

         case 'raw_table':
              var container_id = 'raw_table_' + Ext.id();
              var f = new Ext.Container({
                 layout: 'absolute',
                 height: item.grid_h,
                 autoScroll: true,
                 border:true,
                 width:400,
                 id:container_id,
                 x:105,
                 y:0
             });
               
            new Act({
            edit_type:'noedit',
            code:'NANX_TBL_DATA',
            table:item.value,
            transfer:false,
            singleSelect:true,
            grid_id:'raw_table_grid_id',
            showwhere:'container',
            tbar_type:'hide',
            renderto: container_id
                    });
             break;



         case 'StarHtmleditor':
             var html = {
                 fieldLabel: item.label,
                 id: item.id,
                 name: item.id,
                 width:450,
                 height:250,
                 xtype:'StarHtmleditor',
                 readOnly:readonly,
                 value: field_v
             };
             var f = new Ext.Container({
                 items: [{
                         html: item.label + ':<br/>'
                     },
                     html
                 ]
             });
             break;
         case 'dnd_2_col':
             var f = Fb.setDndForm(item, node);
             break;
         case 'checkbox':
             var f = {
                 fieldLabel: item.label,
                 id: item.id,
                 name: item.id,
                 xtype: 'checkbox',
                 checked: true
             };
             break;

         case 'textarea':
             var f = {
                 fieldLabel: item.label,
                 id: item.id,
                 name: item.id,
                 xtype: 'textarea',
                 width: 600,
                 height: item.height ? item.height : 300
             };
             break;
             
         case 'html_container':
             var f = new Ext.Container({
                 items: {
                     html: item.html
                 }
             });
             break;
         
         case 'check_group_static':
             var f = {
                 id: item.id,
                 fieldLabel: item.label,
                 autoHeight: true,
                 items: item.items,
                 defaultType: 'checkbox'
             };
             break;

         case 'check_group':
             var f = {
                 id: item.id,
                 hidden: hidden,
                 hideMode: 'visibility',
                 fieldLabel: item.label,
                 defaultType: 'checkbox',
                 items: []
             };
             var check_store = new Ext.data.JsonStore({
                 proxy: new Ext.data.HttpProxy({
                     url: TREE_URL,
                     method: 'POST'
                 }),
                 fields: ['value', 'text'],
                 baseParams: {
                     category_to_use: item.group_category,
                     value: item.value
                 },
                 root: 'server_resp'
             });
             check_store.load();
             check_store.on('load', function() {
                 for (var i = 0; i < this.getCount(); i++) {
                     var rec = this.getAt(i).json;
                     var newitem = new Ext.form.Checkbox({
                         boxLabel: rec.text,
                         id: rec.value,
                         name: item.id,
                         checked: checked,
                         itemCls: '',
                         labelStyle: 'padding-left:10px;',
                         inputValue: rec.value
                     });
                     var check_items = Ext.getCmp(item.id).items;
                     check_items.add(newitem);
                 }
                 Ext.getCmp(item.id).doLayout();
             });
             break;

         case 'radio_group':
             var rg = [];
             for (i = 0; i < item.items.length; i++) {
                 if (item.items[i].hasfollow) {
                     item.items[i].listeners = {
                         afterrender: function() {
                             var rd = Ext.get(this.id);
                             var field = '&nbsp;&nbsp;<input name=' + this.id + '_input style="margin-top:6px;"   class="x-form-text x-form-field">';
                             rd.parent().createChild(field);
                         }
                     }
                 }

                 rg.push(item.items[i]);
             }

             var f = new Ext.form.RadioGroup({
                 reference_group_id:111111222222,
                 fieldLabel: item.label,
                 labelStyle: 'white-space:nowrap;',
                 layout: 'form',
                 style: {
                     'margin-left': '0px',
                     'margin-top': '10px'
                 },
                 columns: 1,
                 items: rg
             });

             break;

         case 'dndgrid':
             item.grid_width = item.width ? item.width : 470;
             item.value = node.attributes[[item.value_reference]];
             var dndgrid = new Fb.dndgrid(item);
             var f = new Ext.Container({
                 items: dndgrid
             });
             break;

         case 'uploadFile':
             var f = Fb.getAttachmentEditor(item);
             break;


         case 'treeGrid':
              var menutree = Fb.getTreeGrid(item);
              var f = new Ext.Container({
                  layout: 'absolute',
                  items: menutree,
                  x:400,
                  y:-360
             });

           break;

         case 'file_selector':
              var container_id = 'media_grid_' + Ext.id();
             
              var f = new Ext.Container({
                 layout: 'absolute',
                 height: item.grid_h,
                 autoScroll: true,
                 border:true,
                 id: container_id,
                 x: 0,
                 y: 0
             });

                item.grid_id='grid_FILE';
                var act_config = Fb.DeepClone(item);
                act_config.renderto=f.id;
                act_config.tbar_type='file_'+item.file_type;
                act_config.showwhere='container';
               var Act_f= new Act(act_config);
             break;

         case 'combo_list':

             item.displayField = 'text';
             item.valueField = 'value';
             var store = Fb.buildTreeStore(item);
             var f = Fb.getBasicCombo(item, store);
             break;
         
         case 'combo_group':
             var f = Fb.getComboGroup(item);
             break;




         case 'horizon_line':
              var f=Fb.horizon_line(item,node);
              return f;

         case 'follow_tbar':
               var f=Fb.getTriggerBar12(node.attributes.hostby);
             break;

         case 'trigger_bar':
          
             var f = Fb.getTriggerBar12345(item,node);
             break;

         case 'layout_panel':
             var container_id = 'r_grid_' + Ext.id();
             var f = new Ext.Container({
                 layout: 'absolute',
                 height: 360,
                 autoScroll: true,
                 id: container_id,
                 x: 220,
                 y: 0
             });
 

             var Act_f = new Act({
                 code: "NANX_TB_LAYOUT",
                 activity_type: "sql",
                 edit_type: 'edit',
                 tbar_type:'hide',
                 showwhere:"container",
                 grid_id: item.grid_ext_id,
                 renderto: container_id,
                 gridheader: true,
                 checkbox: false,
                 para_json: {
                     'table': field_v
                 },
                 callback:[{
                     event:'cellcontextmenu',
                     fn:Fb.RestoreField
                 },{
                     event:'render',
                     fn:Fb.LayoutManager
                 }]
             });
             
             break;
         default:
             var f = {};
     }
     return f;
 }


Fb.getCellStr = function(grid, rowIndex, colIndex) {
         var rec = grid.getStore().getAt(rowIndex);
         var columnName = grid.getColumnModel().getDataIndex(colIndex);
         var cellValue = rec.get(columnName);
         return cellValue;
     };
     
Fb.getFileValue = function(grid,row,col) {
         var str='';
         str= Fb.getCellStr(grid, row, col);
         
         if(grid.file_type=='php'|| grid.file_type=='js' ){
           col=1;  // point to Filename
           return {os_path:grid.os_path,filename:str};
         }

         var tag='src';
         var reg_str = "<img[^>]+"+tag+'="http:\\\/\\\/([^">]+)';
         var reg_rule=new RegExp(reg_str,'g');
         var results = reg_rule.exec(str);

         if(results){
         var found= results[1];
         if(tag=='src'){found="http://"+found}
         return {os_path:grid.os_path,filename:found};
         }
            else
            {
              return {os_path:grid.os_path,filename:null};
            }
     };    
     
     
     
 Fb.formBuilder = function(opform, opcode) {
        
     var help_panel = new Ext.Panel({
         autoLoad: HELP_DIR + opcode,
         height: 400,
         autoScroll: true
     });

     var form2items = new Ext.Panel({
         border: false,
         layout: "accordion",
         layoutConfig: {
             animate: true
         },
         items: [{
             title: i18n.operation,
             items: opform
         }, {
             title: i18n.operation_help,
             items: help_panel
         }],
         opform: opform
     });
     return form2items;
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
 

 Fb.backendForm = function(category, opcode, xnode) {
     var o_mcfg = AppCategory.getSubMenuCfg(category, opcode);
     var opform = Fb.getOperationForm(xnode, o_mcfg);
     return opform;
 }



 function helps_prod() {
     var x = AppCategory.getContextMenus();
     for (var i = 0; i < x.length; i++) {
         menus = x[i].menus;
         for (var j = 0; j < menus.length; j++) {
             obj = {};
             obj.title = menus[j].title;
             obj.opcode = menus[j].opcode;
             items = [];
             if (menus[j].itemcfg) {
                 for (k = 0; k < menus[j].itemcfg.length; k++) {
                     if (!menus[j].itemcfg[k].hasOwnProperty('hidden')) {
                         items.push(menus[j].itemcfg[k].label);
                     }
                 }
             }
             obj.items = items;

             var url = "http://127.0.0.1/newoss/index.php/dbdocu/help_generator";
             Fb.ajaxPostData(url, obj, null);
         }
     }
     return;
 }


 Date.prototype.yyyymmdd = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
     var dd = this.getDate().toString();
     return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
 };


 Date.prototype.yymmddhhmmss = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
     var dd = this.getDate().toString();
     var hour = "" + this.getHours();
     if (hour.length == 1) {
         hour = "0" + hour;
     }
     var minute = "" + this.getMinutes();
     if (minute.length == 1) {
         minute = "0" + minute;
     }
     var second = "" + this.getSeconds();
     if (second.length == 1) {
         second = "0" + second;
     }
     return yyyy + "-" + mm + "-" + dd + " " + hour + ":" + minute + ":" + second;
 }


 function getGridExtraData() {
     var gridid = 'not_exists_grid_id';
     if (Ext.getCmp('reorder_columns_grid')) {
         gridid = 'reorder_columns_grid';
     }

     if (Ext.getCmp('x_grid_for_dnd')) {
         gridid = 'x_grid_for_dnd';
     }

  

    if (Ext.getCmp('reorder_activity_order_grid')) {
         gridid = 'reorder_activity_order_grid';
     }
 


    if (Ext.getCmp('raw_table_grid_id')) {
         gridid = 'raw_table_grid_id';
     }
  
 

     if (!Ext.getCmp(gridid)) {
         return null;
     }

     var ds = Ext.getCmp(gridid).getStore();
     
     var destGrid=Ext.getCmp(gridid);
     
     if(destGrid.selModel.singleSelect &&  ! gridid=='reorder_columns_grid' )
     {
      var singleSelectGrid=true;   
      var items=destGrid.getSelectionModel().getSelections();
     }
     else
     {
     var singleSelectGrid=false;
     var items = ds.data.items;
     }

     

     var griddata = [];
     for (var i = 0; i < items.length; i++) {
         var c = items[i].data;
         griddata.push(c);
     }

     var cm =destGrid.getColumnModel();
     
     var col_count = cm.getColumnCount();
     return {
         mustHaveOneRow:singleSelectGrid,
         data: griddata,
         col_count: col_count,
         row_count: items.length
     }
 }


function getTreeData(treeid){

                var tree=Ext.getCmp(treeid);
                var rootnode=tree.getRootNode()
                var treejson=tree.getRootNode().getJson(rootnode);
                return treejson;
                // return JSON.stringify(treejson) ;
                 
}


 Fb.DeepClone = function(obj) {

     var seenObjects = [];
     var mappingArray = [];
     var f = function(simpleObject) {
         var indexOf = seenObjects.indexOf(simpleObject);
         if (indexOf == -1) {
             switch (Ext.type(simpleObject)) {
                 case 'object':
                     seenObjects.push(simpleObject);
                     var newObject = {};
                     mappingArray.push(newObject);
                     for (var p in simpleObject)
                         newObject[p] = f(simpleObject[p]);
                     return newObject;

                 case 'array':
                     seenObjects.push(simpleObject);
                     var newArray = [];
                     mappingArray.push(newArray);
                     for (var i = 0, len = simpleObject.length; i < len; i++)
                         newArray.push(f(simpleObject[i]));
                     return newArray;

                 default:
                     return simpleObject;
             }
         } else {
             return mappingArray[indexOf];
         }
     };
     return f(obj);
 }
 
 
 Fb.randomString=function (){
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}
