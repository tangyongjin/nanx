Ext.Ajax.addListener("requestcomplete",function(conn, response, options, eOpts){  
    if (typeof response.getResponseHeader == 'function') {
          var kickout = response.getResponseHeader('kickoutlogin');  
          if (kickout =='kickoutlogin'){
                 window.location.href=AJAX_ROOT+'home/logout'
          }
    }
     
},this);  


Ext.override(Ext.Window, {
    beforeShow: function(){
        delete this.el.lastXY;
        delete this.el.lastLT;
        if (this.x === undefined || this.y === undefined) {
            var xy = this.el.getAlignToXY(this.container, 'c-c');
            var pos = this.el.translatePoints(xy[0], xy[1]);
            this.x = this.x === undefined ? pos.left : this.x;
            this.y = this.y === undefined ? pos.top : this.y;
            if (this.cascadeOnFirstShow) {
                var prev;
                this.manager.each(function(w) {
                    if (w == this) {
                        if (prev) {
                            var o = (typeof this.cascadeOnFirstShow == 'number') ? this.cascadeOnFirstShow : 20;
                            var p = prev.getPosition();
                            this.x = p[0] + o;
                            this.y = p[1] + o;
                        }
                        return false;
                    }
                    if (w.isVisible()) prev = w;
                }, this);
            }
        }
        this.el.setLeftTop(this.x, this.y);
        if (this.expandOnShow) {
            this.expand(false);
        }

        if (this.modal) {
            Ext.getBody().addClass("x-body-masked");
            this.mask.setSize(Ext.lib.Dom.getViewWidth(true), Ext.lib.Dom.getViewHeight(true));
            this.mask.show();
        }
    }
});

Ext.ns('NANXplugin');
function NANXplugin() {}
Ext.ns('NANXplugin_button');
function NANXplugin_button() {}
Ext.ns('NANXplugin_window');
function NANXplugin_window() {}

Ext.ns('Act');

 
Act=function(cfg) {
    var winid = 'win_' + cfg.code;
    if (!Ext.getCmp(winid)) {
        this.init_all(cfg);
        this.showActivityWindow();
         
    } else {
        var grid_win = Ext.getCmp(winid);
        grid_win.toFront();
    }
}


Act.prototype.init_all = function(cfg) {

    this.cfg = cfg;
    this.with_checkbox_col = cfg.hasOwnProperty('checkbox') ? cfg.checkbox : true;
    this.gridHeader = cfg.hasOwnProperty('gridheader') ? cfg.gridheader : false;
    this.hideHeaders = cfg.hasOwnProperty('hideHeaders') ? cfg.hideHeaders : false;
    this.border = cfg.hasOwnProperty('border') ? cfg.border : false;
    this.scroable = cfg.hasOwnProperty('scroable') ? cfg.scroable : false;  
    this.nosm = cfg.hasOwnProperty('nosm')?cfg.nosm:false;     
    this.file_type = cfg.hasOwnProperty('file_type')?cfg.file_type:'normal'; 
    this.os_path = cfg.hasOwnProperty('os_path')?cfg.os_path:'/'; 
        
    this.single_selection = cfg.hasOwnProperty('singleSelect')?cfg.singleSelect:false;     
    this.grid_h = cfg.hasOwnProperty('grid_h') ? cfg.grid_h:null;
    this.getActCfgUrl = AJAX_ROOT + 'activity/getActCfg';
    this.excelUrl = AJAX_ROOT + 'grid2excel/index';
    this.deletedIDs = [];
    if (cfg.hasOwnProperty('renderto')) {
        this.renderto = cfg.renderto;
    }
    if (cfg.hasOwnProperty('pic_url')) {
        this.pic_url = cfg.pic_url;
    }
    if (cfg.hasOwnProperty('win_size_height')) {this.win_size_height = cfg.win_size_height; }
    if (cfg.hasOwnProperty('gridTitle')) {this.gridTitle = cfg.gridTitle; }
    if (cfg.hasOwnProperty('id_order')) {this.id_order = cfg.id_order; }
    if (cfg.hasOwnProperty('tbar_type')) {
 
     } 
    else{
        cfg.tbar_type ='stand';
        if(this.cfg.showwhere=='render_to_tabpanel'){
           cfg.tbar_type='render_to_tabpanel';
        }
    }
    if (cfg.hasOwnProperty('grid_id')) {
        this.grid_id = cfg.grid_id;
    } else {
        this.cfg.grid_id = Ext.id();
    }
};


Act.prototype.setcfg = function(ret) {


    this.actcode = ret.activity_code;
    this.activity_type = ret.activity_type;
    this.table = ret.base_table;
    this.gridTitle = ret.grid_title;
    this.colsCfg = ret.colsCfg;
    this.layoutCfg = ret.layoutCfg;
    this.whoami=ret.whoami;
    this.who_is_who=ret.who_is_who;
    this.owner_data_only=ret.owner_data_only?ret.owner_data_only:null;
    this.sql_syntax_error=ret.sql_syntax_error?ret.sql_syntax_error:false;
    this.dataUrl = ret.data_url;
    this.get_data_type=ret.get_data_type;
    this.pic_url = ret.pic_url;
    this.serviceUrl = ret.service_url;
    this.actBasedBtns = ret.activty_based_btns;
    this.batch_btns = ret.batch_btns;
    this.js_btns = ret.js_btns;
    this.sm = this.createSM();
    this.curdCfg = ret.curdCfg ? ret.curdCfg : null;
    if(!this.id_order)
    {
    this.id_order = ret.idOrder ? ret.idOrder : 'asc';
    }
    this.win_size_height = this.win_size_height ? this.win_size_height : ret.win_size_height;
    this.win_size_width = ret.win_size_width;
    this.win_size_width_operation = ret.win_size_width_operation;
    this.storeField = this.get_Fields();
    this.mainStore = this.getMainStore();
    this.getBtns(ret.layoutCfg);
    this.tBar = this.getTbar();
    this.bBar = this.getBbar();
    this.treeViewCfg={tree_text_field:ret.tree_text_field,tree_parent_field:ret.tree_parent_field}
};


Act.prototype.showActivityWindow=function(){
    var that=this;
    var subcfg={};
    for (var p in this.cfg) {
        if ((p !=='host')&&(p !=='callback')&&(p!=='filter_field')&&(p!=='filter_value')){
            subcfg[p]=this.cfg[p];
        }
    }

    var jsondata=Ext.encode(subcfg);
    WaitMask.show();
    Ext.Ajax.request({
        url:that.getActCfgUrl,
        jsonData:jsondata,
        callback:function(options,success,response){
            WaitMask.hide();
            var ret_json=Ext.util.JSON.decode(response.responseText);
            that.setcfg(ret_json);
          
            switch(ret_json.activity_type)
                {

                case 'html':
                     that.createActivityHtmlPanel();
                     break;

                
                case 'tree':
                     var treeGrid_cfg={}
                     treeGrid_cfg[that.treeViewCfg.tree_text_field]='新节点'
                     treeGrid_cfg.tree_text_field=that.treeViewCfg.tree_text_field
                     treeGrid_cfg.tree_parent_field=that.treeViewCfg.tree_parent_field
                     treeGrid_cfg.actcode=that.actcode
                     treeGrid_cfg.table=that.table
                     that.gridPanel=MenuTree.createActivityTreePanel( treeGrid_cfg );
                     break;
                     
                default:
                     that.createActivityGridPanel();
                }
            that.showWindow();
        }
    });
};


Act.prototype.createActivityGridPanel=function(){
    
    if (this.sql_syntax_error){
        return;
    }

    var that=this;
    var gridcfg={
        store:this.mainStore,
        id:this.cfg.grid_id||'grid_'+this.actcode,
        scope:this,
        border:this.border,
        hideHeaders:this.hideHeaders,
        bodyBorder:true,
        columnLines:true,
        trackMaskOver:true,
        cm:this.getColModel(),
        file_type:this.file_type,
        os_path:this.os_path,
        header:this.gridHeader,
        scroable:true,
        tbar:this.tBar,
        bbar:this.bBar,
        listeners:{
            rowdblclick:function(grid,row,col){
                
                if(this.file_type=='img'){
                    alert(this.file_type)
                    return;
                }
                
                grid.getStore().each(function(item,idx){
                    grid.getSelectionModel().clearSelections();
                    grid.getSelectionModel().selectRow(row);
                });

                var edit_btn=that.gridPanel.getTopToolbar().findById('pub_edit');
                if (edit_btn){
                    edit_btn.handler.call(edit_btn);
                }
            },

            cellclick:that.handleCellClick,
            celldblclick:function(grid,row,col)
            {
               if(this.file_type=='img')
                {
                   alert('here img')
                   var src = FileMgr.getFileValue(grid, row, col) ;
                   grid.stopEditing();
                   FileMgr.showPic(src.filename);
                   return;
                }           
            },
            beforeedit:function(col){
                if (col.field=='id'){
                    return false;
                }

                if (this.id=='x_grid_for_dnd'|| this.file_type=='img'||this.id=='grid_FILE' ){
                    return false;
                }

                if (this.id=='grid_NANX_SYS_CONFIG'){
                
                  if( col.field=='config_key' || col.field=='config_memo' ||col.field=='memo_of_config_item'  ) {
                    return false;
                  }        
                   _colvar=col.record.data.config_key;
                  if(_colvar=='APP_PREFIX' || _colvar=='VER' ||_colvar=='SECRET_KEY'  ) {
                    return false;
                  }        
                }
            },
            afteredit:function(row){
                that.handleAfterEdit(row)
            }
        }
    };
    
    if(!this.nosm){gridcfg.sm=this.sm;}
    

    this.gridPanel=(this.cfg.edit_type==='noedit')?new Ext.grid.GridPanel(gridcfg):new Ext.grid.EditorGridPanel(gridcfg);
     
    if(this.gridPanel.getStore() ){
          this.gridPanel.getStore().on('load',function(ds){this.autoHeader(); }, this);
    }

       
    if (this.cfg.callback){
        for (var i=0;i<this.cfg.callback.length;i++){
            this.gridPanel.addListener(this.cfg.callback[i].event, this.cfg.callback[i].fn);
        }
    }

       this.mainStore.load({
        params:{
            start:0,
            limit:pageSize
        }
    });
}

 
Act.prototype.createActivityFolderPanel=function(){
    
    var btn1={
        text:i18n.refresh,
        iconCls:'table_data_refresh',
        handler:function(){
            var panel=this.ownerCt.ownerCt.ownerCt;
            panel.doAutoLoad();
        }
    };

    var tbar=[{
        xtype:'buttongroup',
        items:[btn1]
    }];
    
    var f=new Ext.Panel({

        autoScroll:true,
        tbar:tbar,
        frame:true,
        width:250,
        height:250,
        autoLoad:{
            url:AJAX_ROOT+this.serviceUrl
        }

      
    });
    this.gridPanel=f;
}


Act.prototype.createActivityHtmlPanel=function(){
    var btn1={
        text:i18n.refresh,
        iconCls:'table_data_refresh',
        handler:function(){
            var panel=this.ownerCt.ownerCt.ownerCt;
            panel.doAutoLoad();
        }
    };
    var tbar=[{
        xtype:'buttongroup',
        items:[btn1]
    }];
    var f=new Ext.Panel({
        autoScroll:true,
        tbar:tbar,
        autoLoad:AJAX_ROOT+this.dataUrl
    });
    this.gridPanel=f;
}


Act.prototype.handleAfterEdit=function(row) {
    if (row.record.newRow){
        this.newTableRow=row.record.data
    }

    if (row.value==row.originalValue){
        return;
    } else{
        var a=this.gridPanel.getTopToolbar();
        var btnsave=a.find('nanx_type','toggle_save');
        btnsave[0].enable();
    }
};

 
         
Act.prototype.handleCellClick=function(grid,rowIndex,columnIndex,e){
    if (grid.file_type=='img') {
      
        return;
     }
     
    if (grid.id=='grid_NANX_TBL_INDEX') {
        if (columnIndex==3){
            return false;
        }
        if (columnIndex==4){
            Act.prototype.editIndexCols(rowIndex, e.xy);
            return false;
        }
    } else{
        if (grid.constructor.xtype=='grid'){
            return false;
        }
    }
    grid.startEditing(rowIndex,columnIndex);
}


Act.prototype.createSM =function(){
    
    var is_singleSelect = this.cfg.hasOwnProperty('singleSelect') ? this.cfg.singleSelect :false;
    var checksm=new Ext.grid.CheckboxSelectionModel({
        checkOnly:true,
        singleSelect:is_singleSelect,
        listeners:{
            selectionchange:function(c){
                if (['grid_NANX_TBL_DATA','grid_NANX_TBL_STRU','grid_NANX_TBL_INDEX'].indexOf(this.grid.id)==-1){
                    return;
                }
                var add_del=this.grid.getTopToolbar().get(3);
                var del_btn=add_del.get(1);
                if (c.getCount()> 0) {
                    del_btn.enable();
                } else {
                    del_btn.disable();
                }
            }
        }
    });
    return checksm;
}

Act.prototype.editIndexCols=function(rowindex,a){
    var currenttable=Dbl.UserActivity2["table"];
    var tree=Ext.getCmp('AppTree');
    var colindex=getCurrentColandIndex(rowindex);
    var leftData=colindex.allcol;
    var rightData=colindex.usedcol;
    var split2col=new Fb.split2col(leftData,rightData,{
        label:i18n.choosecol,
        id:'cols4index'
    },true);
    var f=new Ext.Container({
        items:split2col
    });

    var opform=new Ext.form.FormPanel({
        id:'edit_index_form',
        frame:true,
        border:false,
        layout:'fit',
        labelAlign:'left',
        bodyStyle:'padding-left:10px;',
        defaults:{
            width:200,
            allowBlank:false
        },
        name:"opform",
        items:f
    });
    var handler=function(){
        var b=Ext.getCmp('edit_index_form');
        if (b.getForm().isValid()){
            var fieldlist=b.getForm().getValues().cols4index;
            var grid=Ext.getCmp('grid_NANX_TBL_INDEX');
            var row=grid.getStore().getAt(rowindex);
            var record=grid.getColumnModel().getDataIndex(3);
            row.set(record,fieldlist);
        }
        var tb=Ext.getCmp("grid_NANX_TBL_INDEX").getTopToolbar();
        tb.get(1).enable();
        Ext.getCmp('back_op_win').close();
    };
    var wincfg={
        opcode:'manage_index',
        node:{},
        width:550,
        title:'<img src='+BASE_URL+'imgs/thumbs/backop.png' + ' />&nbsp;'+i18n.manage_index,
        althandler:handler
    };
    this.actionWin('backend',opform,wincfg);
}


Act.prototype.get_Fields=function(){
    var fields=[];
    for (var i=0;i<this.colsCfg.length;i++) {
        (this.colsCfg[i]['field_e']=='id')?fields.push({
            name:this.colsCfg[i]['field_e'],
            type:'int'
        }) : fields.push({
            name: this.colsCfg[i]['field_e']
        });
    }
    return fields;
}

Act.prototype.getOneColModel = function(colCfg) {
    if (colCfg['field_e'] == 'primary_key') {
        return Fb.primaryKeyColumn(colCfg.display_cfg.field_c);
    }
    if (colCfg['field_e'] == 'not_null') {
        return Fb.notNullColumn(colCfg.display_cfg.field_c);
    }
    if (colCfg['field_e'] == 'unsigned') {
        return Fb.unsignedColumn(colCfg.display_cfg.field_c);
    }
    if (colCfg['field_e'] === 'auto_increment') {
        return Fb.autoIncrColumn(colCfg.display_cfg.field_c);
    }
    var editor = new Ext.form.TextField({
        'name': colCfg['field_e']
    });

    if ((colCfg.editor_cfg) && (colCfg.editor_cfg.combo)) {
        editor = Fb.getDirectComboEditor(colCfg.editor_cfg.combo);
    }
    
        _hid=false;
        if(colCfg.display_cfg.idhidden){
           _hid=true;
        }
    
    var oneColModel = {
        header: colCfg['display_cfg']['field_c'] || colCfg['field_e'],
        dataIndex: colCfg['field_e'],
        hidden:_hid,
        'asPic': colCfg.display_cfg.show_as_pic,
        editor: editor,
        renderer: (colCfg.display_cfg.show_as_pic == 1) ? function(v) {
            return '<div class=grid_pic_holder><img    src="' + v + '"></div>'
        } : function(v) {
            return v;
        },
        sortable: true
    };
    
    
    
    
     var renderimg = function(a) {
         return a;
         return '<img src="' + a + '">';
     };

     
    
    
    if (colCfg['field_e']=='id'){
        oneColModel.renderer = function(value) {
            return '<span  class="x-grid3-cell-inner" style="color:#004080;">' + value + '</span>'
        };
        oneColModel.editor.readOnly = true;
    }
    if (colCfg['field_e'] == 'add_column') {
        var fn = function(b, a){
            return '<a href="javascript:void(0);"><div class="index_add_cols">a</div></a>'
        }
        oneColModel.renderer = fn;
    }
    return oneColModel;
}

Act.prototype.getColModel=function(){
    var cols=[];
    for (var i=0;i<this.colsCfg.length;i++){
        var onecolModel=this.getOneColModel(this.colsCfg[i]);
        cols.push(onecolModel);
    }
    var sm=this.sm;
    var check_col=[sm];
    var cols_array =this.with_checkbox_col?check_col.concat(cols):cols;
    var cm = new Ext.grid.ColumnModel({
        columns:cols_array
    });
    return cm;
}

Act.prototype.getMainStore=function(){
    if (this.activity_type=='table'){
        var mainStore=this.getStoreByTableAndField(this.table,this.storeField,this.cfg);
    }


    if (this.activity_type=='tree'){
        var mainStore=this.getStoreByTableAndField(this.table,this.storeField,this.cfg);
    }

    if (this.activity_type=='service'){
        var mainStore=this.getStoreByService();
    }
    
    if (this.activity_type=='sql'){
        var mainStore=this.getStoreBySql();
    }

   if (this.activity_type=='menugroup'){
        var mainStore=this.getStoreBySql();
    }


    return mainStore;
}

Act.prototype.getStoreByService=function(){
    var url_obj={};
    for (p in this.cfg) {
        if ((p !=='host')&&(p !=='callback')){
            url_obj[p]=this.cfg[p];
        }
    }
    url_obj.serviceUrl=this.serviceUrl;
    var url=this.dataUrl;

    if(this.get_data_type=='model'){
        url='dataproxy/index/';
        url_obj.getDataUrl=this.dataUrl;
    }



    var ds = new Ext.data.JsonStore({
        proxy: new Ext.data.HttpProxy({
            url:AJAX_ROOT+url,
            method:'POST',
            jsonData:Ext.encode(url_obj)
        }),
        fields:this.storeField,
        root:'rows',
        totalProperty:'total'
    });
    return ds;
}


Act.prototype.getStoreBySql=function(){
    var url_obj={};
    for (p in this.cfg) {
        if ((p !== 'host') && (p !== 'callback')) {
            url_obj[p]=this.cfg[p];
        }
    }
    url_obj['activity_type']='sql';
    var ds=new Ext.data.JsonStore({
        proxy:new Ext.data.HttpProxy({
            url:AJAX_ROOT + this.dataUrl,
            method:'POST',
            jsonData:Ext.encode(url_obj)
        }),
        fields:this.storeField,
        root:'rows',
        totalProperty: 'total'
    });
    return ds;
}



Act.prototype.filter2QueryCfg=function(cfg)
{
  var querycfg=null;   
  if(cfg.filter_field){
    var querydata={};
    querydata['field_0']=cfg.filter_field;
    querydata['operator_0']='=';
    querydata['and_or_0']='and';
    querydata['vset_0']=cfg.filter_value;
    querycfg={
            count:1,
            lines:querydata
          }
    }
   return querycfg;
}


Act.prototype.getStoreByTableAndField=function(basetable,fields,cfg,codetable_filter_cfg){
    
    
    if(!codetable_filter_cfg){
        codetable_filter_cfg={}
    }

    var whoami=this.whoami;
     
    if (this.id_order) {
        var id_order = this.id_order.id_order;
    } else {
        id_order = 'asc';
    }
    var querycfg=this.filter2QueryCfg(cfg);
    var table_query_obj={
        table:basetable,
        code:this.actcode,
        whoami:this.whoami,
        who_is_who:this.who_is_who,
        owner_data_only:this.owner_data_only,
        id_order:id_order,
        query_cfg:querycfg,
        codetable_filter_cfg:codetable_filter_cfg
    };

    var table_query_json=Ext.encode(table_query_obj);
   

    var ds=new Ext.data.JsonStore({
        proxy:new Ext.data.HttpProxy({
            url:CURD_GETDATA_URL,
            method:'POST',
            jsonData:table_query_obj
        }),
        listeners:{
            'beforeload':function(){
                WaitMask.show();
            },
            'load':function(){
                WaitMask.hide();
            }
        },
        fields:fields,
        root:'rows',
        storeId:Ext.id(),
        totalProperty:'total'
    });

    ds.on('loadexception',function(store,records,options){
        var ret_json =Ext.util.JSON.decode(options.responseText);
        Ext.Msg.alert(i18n.error,ret_json.msg);
        WaitMask.hide();
    }, this);

    return ds;
}


Act.prototype.getPublicBtns=function(){
    var that=this;
    var public_btns=[];
    if ((this.curdCfg.fn_add===1)||(this.curdCfg.fn_add === '1')){
        public_btns.push({
            xtype:'button',
            text:i18n.add,
            iconCls:'n_add',
            style:{
                marginRight:'6px'
            },
            ctCls:'x-btn-over',
            handler:function(){
                that.addData()
            }
        });
    }

    if ((this.curdCfg.fn_update===1)||(this.curdCfg.fn_update=== '1')){
        public_btns.push({
            text:i18n.update,
            iconCls:'n_edit',
            style:{
                marginRight: '6px'
            },
            ctCls:'x-btn-over',
            id:'pub_edit',
            handler:function(){
                that.editData(this)
            }
        });
    }

    if ((this.curdCfg.fn_del===1)||(this.curdCfg.fn_del==='1')){
        public_btns.push({
            text:i18n.erase,
            iconCls:'n_del',
            style:{
                marginRight:'6px'
            },
            ctCls:'x-btn-over',
            handler:function(){
                that.delData(this)
            }
        });

    }
    var excel_exp_btn={
        text:'Excel',
        iconCls:'n_excel',
        ctCls:'x-btn-over',
        transfer:true,
        style:{
            marginRight: '6px'
        },
        handler:function(btn,e){
            that.writeExcel(btn,e)
        }
    };
    if (!this.cfg.nosearch){
        //ActPlug.getQueryBtn
        console.log(this)
        var qbtn=ActPlug.getQueryBtn(this);
        public_btns.push(qbtn);
    }

    public_btns.push(excel_exp_btn);

    if (that.activity_type=='sql'){
        var public_btns=[excel_exp_btn]
    }
    return public_btns;
}


Act.prototype.buildTopToolbar_backend=function(){
    if (this.actcode=='NANX_TBL_DATA'){
        var addtext=i18n.addrecord;
        var deltext=i18n.delrecord
    }

    if (this.actcode=='NANX_TBL_INDEX'){
        var addtext=i18n.addindex;
        var deltext=i18n.delindex;
    }

    if ((this.actcode=='NANX_TBL_STRU')||(this.actcode=='NANX_TBL_CREATE')){
        var addtext=i18n.addcol;
        var deltext=i18n.delcol;
    }
    var that=this;
    var refresh=this.getRefreshButtonGroup();
    var tbinfo=i18n.currenttable+':'+this.table;

    if (this.table=='nanx_shadow'){
        tbinfo=i18n.createtable
    }
    var tbname_btn={
        xtype:'buttongroup',
        items:[{
            text:tbinfo,
            style:'color:red',
            iconCls:"redtable",
            scope:this
        }]
    };
    var save={
        xtype:"buttongroup",
        nanx_type:'toggle_save',
        disabled:true,
        items:[{
            text:this.actcode=='NANX_TBL_CREATE'?i18n.create_table:i18n.save,
            tooltip:i18n.savechange,
            iconCls:'update_table_data',
            width:60,
            handler:function(btn,e){
                that.SaveChanges(btn,e)
            }
        }, {
            text:i18n.cancel,
            tooltip:i18n.cancelupdate,
            iconCls:'cancel_table_update',
            width:60,
            handler:this.cancelTableModifications,
            scope:this
        }]
    };
    var add_del={
        xtype:'buttongroup',
        items:[{
            text:addtext,
            iconCls:'add',
            width:60,
            handler:function(btn,e){
                that.insertRow(btn,e)
            }
        },{
            text:deltext,
            iconCls:'remov',
            disabled:true,
            width:60,
            handler:function(btn,e){
                that.deleteSelectedRows(btn,e)
            },
            scope:this
        }]
    };
    var exportdata={
        text:i18n.exportdata,
        id:'export_table_data',
        iconCls: "copy_table",
        width:60,
        transfer:false,
        handler:function(btn,e){
            that.writeExcel(btn,e);
        }
    };

    var tbar=[tbname_btn,save,"-",add_del,"-",refresh,"-"];

    if (this.actcode=='NANX_APP_SUMMARY'){
        var tbar=[refresh];
    }


    if (this.actcode=='NANX_TBL_DATA'){
        if (this.table=='nanx_system_cfg'){
            var tbar=[tbname_btn,save,"-",refresh,"-"];
        } else{
            tbar=tbar.concat(exportdata);
        }
    }
    return tbar;
}


Act.prototype.getLayoutedForms=function(total_cfg,optype,row,orgin_act){
     
    var number_of_params = arguments.length;
    if(number_of_params==4){
        var master_act=orgin_act;
    }
    else
    {
       var master_act=this;
    }


    
    var layoutCfg=total_cfg.layoutCfg;
    var whoami_cfg={whoami:total_cfg.whoami,who_is_who:total_cfg.who_is_who,owner_data_only:total_cfg.owner_data_only };
    var all_lines=[];
    var max_col=0;
    var line_width=0;
    for (var i=0;i<layoutCfg.length;i++){
        var single_line={};
        single_line.layout='column';
        single_line.items =[];
        var field_list=layoutCfg[i].field_list;
        var fields=field_list.split(",")
        for (var j=0;j< fields.length;j++){
            var single_field = fields[j];
            if (!(single_field=='NULL')){
                for (var x=0;x<master_act.colsCfg.length;x++){
                    if (master_act.colsCfg[x].field_e==single_field){
                        var colsCfg_found=master_act.colsCfg[x];
                    }
                }
                
                var item_one=Fb.getFieldEditor(master_act,optype,colsCfg_found,row,whoami_cfg);
         
                if (item_one){
                    var tmp={};
                    tmp.layout='form';
                    tmp.items=[item_one[0]];
                    if (item_one[0].id==single_field){
                        single_line.items.push(tmp);
                    }

                    if (item_one[0].nanx_type=='combo_with_detail'){
                        single_line.items.push(tmp);
                    }

                    if (item_one[0].isArray){
                        if (item_one[0][0].fake_id==single_field){
                            single_line.items.push(tmp);
                        }
                    }
                }
            }
        }
        all_lines.push(single_line);
    }

    return  all_lines;
}
 


Act.prototype.fixLayout=function(type,orgin_act){
    var id_found=false;
    if (orgin_act.layoutCfg.length==0){
        for (var i=0;i<this.colsCfg.length;i++){
            if (this.colsCfg[i].field_e=='id'){
                id_found=true;
            }
            this.layoutCfg.push({
                row:i,
                field_list:this.colsCfg[i].field_e
            });
        }
    } else{
        for(i=0;i<this.layoutCfg.length;i++){
            var fields=this.layoutCfg[i].field_list.split(",")
            if (fields.indexOf('id')!==-1){
                id_found=true;
            }
        }
    }
    if((type=='update')&&(!id_found)){
        this.layoutCfg.push({
            row:this.layoutCfg.length+1,
            field_list:'id'
        });
    }
}


 
Act.prototype.getLayoutWidth=function(x)
{ 
  var w=0;
  for(var i=0;i<x.length;i++)
  {
    var line_w=0;
    for(var j=0;j<x[i].items.length;j++)
     {
       var item_w=x[i].items[j].items[0].width?x[i].items[j].items[0].width:320;
       line_w+=item_w+100+20;
     }
   w=Math.max(w,line_w); 
  } 
  return w+186;
}

Act.prototype.addData=function(){
    
    var that=this;
    if (Ext.getCmp('add_win')){
        Ext.getCmp('add_win').close();
    }
    this.fixLayout('add',this);

    var x=this.getLayoutedForms(this,'add',null);
    var width=this.getLayoutWidth(x);
    var add_form = new Ext.form.FormPanel({
        xtype:'form',
        id:'add_form',
        width:width,
        table:this.table,
        actcode:this.actcode,
        fileMgr:true,
        borderStyle:'padding-top:3px',
        frame:true,
        labelAlign:'right',
        defaluts:{
            allowBlank:false,
            width:200
        },
        items:x
    });
    this.actionWin('add',add_form);
}

Act.prototype.editData=function(btn){
    var host_grid_id=btn.ownerCt.ownerCt.id;
    var that=this;
    if (Ext.getCmp('update_win')) {
        Ext.getCmp('update_win').close();
    }
    var userRecord = Ext.getCmp(host_grid_id).getSelectionModel().getSelections();
    if (!(userRecord.length == 1)) {
        Ext.Msg.alert(i18n.tips, i18n.choose_only_one_record);
        return false;
    }

    this.fixLayout('update',this);
    var all_fields_form=this.getLayoutedForms(this, 'update', userRecord[0]);


    var w=this.getLayoutWidth(all_fields_form)*1.0;
    var updateForm =new Ext.form.FormPanel({
        xtype:'form',
        id:'update_form',
        autoHeight:true,
        fileMgr:true,
        width:w,
        table:this.table,
        actcode:this.actcode,
        borderStyle:'padding-top:3px',
        frame:true,
        labelAlign:'right',
        defaluts:{
            allowBlank:false,
            width:200
        },
        items: all_fields_form 
    });
    this.actionWin('update', updateForm);
}

Act.prototype.batchUpdate=function(btn){
    var host_grid_id=btn.ownerCt.ownerCt.id;
    var that=this;
    if (Ext.getCmp('batch_win')) {
        Ext.getCmp('batch_win').close();
    }
    var userRecord = Ext.getCmp(host_grid_id).getSelectionModel().getSelections();
    var len = userRecord.length;
    if (len == 0) {
        Ext.Msg.alert(i18n.alert, i18n.choose_only_one_record);
        return false;
    }
    this.layoutCfg = [{
        'field_list': btn.op_field,
        'row':0
    }];
    

    var x = this.getLayoutedForms(this,'update',userRecord[0]);
    var ids_batch = [];
    for (var i = 0; i < len; i++) {
        ids_batch.push(userRecord[i].get('id'));
    }
    var helper_btns = that.getbatchHelpBtns(btn.op_field);
    var batchForm = new Ext.form.FormPanel({
        xtype:'form',
        table:this.table,
        actcode:this.actcode,
        'ids_batch': ids_batch,
        id:'batch_form',
        tbar:{
            xtype:'buttongroup',
            title:i18n.click_2_set,
            style:{
                marginLeft: '102px',
                marginBottom: '10px'
            },
            items:helper_btns
        },
        fileMgr:true,
        borderStyle:'padding-top:3px',
        frame:true,
        labelAlign:'right',
        defaluts:{
            allowBlank:false,
            width:200
        },
        items: x
    });
    this.actionWin('batch',batchForm);
}



 
Act.prototype.delData=function(btn){
    var that=this;
    var host_grid_id=btn.ownerCt.ownerCt.id;
    var userRecord=Ext.getCmp(host_grid_id).getSelectionModel().getSelections();
    var len=userRecord.length;
    if (len==0){
        Ext.Msg.alert(i18n.tips,i18n.choose_record_to_del);
        return false;
    }
    Ext.Msg.confirm(i18n.confirm,i18n.really_delete+"?",function(btn){
        var id_to_del=[];
        if (btn=='yes'){
            for (var i=0;i<len;i++){
                id_to_del.push(userRecord[i].get('id'));
            }
            var del_data={
                id_to_del:id_to_del,
                actcode:that.actcode
            };
            var succ=function(){
                that.gridPanel.getStore().load();
            }
            del_data.table=that.table;
            ajaxPostData(CURD_URL +'deleteData',del_data,succ);
        }
    });
}

Act.prototype.getbatchHelpBtns=function(opfield){
    var whoami=document.getElementById('whoami');
    whoami=whoami.innerHTML;
    var nowdate=new Date();
    var ass_btns=
    [{
        text:i18n.set_to_me,
        value:whoami
    }, {
        text:i18n.set_to_current_date,
        value:nowdate.yyyymmdd()
    }, {
        text:i18n.set_to_current_datetime,
        value:nowdate.yymmddhhmmss()
    }, {
        text:i18n.set_to_Y,
        value:'Y'
    }, {
        text:i18n.set_to_N,
        value:'N'
    }, {
        text:i18n.set_to_null,
        value:null
    }];
    
    for(var i=0;i<ass_btns.length;i++)
    {
               ass_btns[i].handler=function(btn){
               var field2set=Ext.getCmp(opfield);  
               field2set.setValue(this.value);
     }
    }
    return ass_btns;
}

Act.prototype.writeExcel=function(btn,e){

    var querycfg=this.filter2QueryCfg(this.cfg);
    var girdtitle = this.gridTitle;
    var excel_cfg={
        code:this.cfg.code,
        table:this.table,
        transfer:btn.transfer,
        whoami:this.whoami,
        query_cfg:querycfg,
        who_is_who:this.who_is_who,
        owner_data_only:this.owner_data_only,
        activity_type:this.activity_type,
        excel_name:(this.actcode=="NANX_TBL_DATA")?this.table:girdtitle
    };
    ajaxPostData(AJAX_ROOT+'activity/grid2excel',excel_cfg,null)
};


Act.prototype.insertRow=function(btn,e){
    var grid=btn.ownerCt.ownerCt.ownerCt;
    var g=grid.getStore().getCount();
    var record_type=grid.getStore().recordType;
    var record ={};
    var cm=grid.getColumnModel();
    for (var i=1;i<cm.columns.length;i++){
        var col=cm.columns[i];
        var h=col.header;
        if (h=='id'){record['id']='';}
    }
    var rec=new record_type(record);
    rec.newRow=true;
    rec.v_id=Ext.id(null,'virtual_');
    rec.forgetit=false;
    grid.stopEditing();
    grid.store.insert(g,rec);
    grid.startEditing(g,1)
    var c=grid.getTopToolbar();
    c.get(1).enable();
}

Act.prototype.deleteSelectedRows=function(btn,e){
    var grid=btn.ownerCt.ownerCt.ownerCt;
    var modified=grid.getStore().modified;
    var selections=grid.getSelectionModel().getSelections();
    for (var i=0;i<selections.length;i++){
        if (selections[i].newRow){
            this.lookupModified(modified,selections[i].v_id);
            continue;
        } else{
            this.deletedIDs.push(selections[i].data.id);
        }
    }
    var selected= grid.getSelectionModel().getSelections();
    var ds=grid.getStore();
    for (var i=0;i<selected.length;i++){
        var rec = selected[i];
        if (!(rec.data.field_name=='id')){
            ds.remove(rec);
        }
    }
    var t = grid.getTopToolbar();
    t.get(1).enable();
}

Act.prototype.lookupModified=function(modified,v_id){
    for (var i=0;i<modified.length;i++){
        if (v_id==modified[i].v_id){
            modified[i].forgetit=true;
        }
    }
}

Act.prototype.SaveChanges=function(btn,e){
    var grid=btn.ownerCt.ownerCt.ownerCt;
    var gridid = grid.id;
    if (gridid=='grid_NANX_TBL_CREATE'){
        this.createTable(btn,e)
    } else {
        this.SaveDataChanges(btn, e)
    }
}

Act.prototype.SaveDataChanges=function(btn,e){
    var grid=btn.ownerCt.ownerCt.ownerCt;
    var data_modified=[];
    var data_new_insert=[];
    var xxx=grid.getStore().modified;
    for (var i=0;i<xxx.length;i++){
        if (xxx[i].newRow){
            if (!xxx[i].forgetit){
                data_new_insert.push(xxx[i].data);
            }
        } else {
            data_modified.push(xxx[i]);
        }
    }
    var data_modified_kv=[];
    var tb=this.table;
    data_modified_kv=this.getModifiedFieldsValue(data_modified);
    var adu={
        optype:this.actcode,
        table:tb,
        a:data_new_insert,
        d:this.deletedIDs,
        u:data_modified_kv
    };

    grid.getStore().modified=[];
    this.deletedIDs=[];
    var succ=function(){
        grid.getStore().reload()
    };
    btn.ownerCt.disable();
    adu.table=this.table;
    ajaxPostData(AJAX_ROOT+'rdbms/adu',adu,succ);
}


Act.prototype.createTable=function(btn,e){
    var grid = btn.ownerCt.ownerCt.ownerCt;
    var ds = grid.getStore();
    sql=getSqlfromDs(ds);
    var tree=Ext.getCmp('AppTree');
    var vnode=tree.getNodeById('tree_tables');
    vnode.attributes.DDL=sql;
    var opform=Fb.backendForm('tables','create_table',vnode);
    var wincfg={
        title:i18n.create_new_table,
        category:'tables',
        opcode:'create_table',
        node:vnode
    };
    var win = this.actionWin('backend',opform,wincfg);
}


Act.prototype.cancelTableModifications=function(btn,e){
    var grid = btn.ownerCt.ownerCt.ownerCt;
    grid.store.rejectChanges();
    this.resetEditParams();
    grid.store.reload();
    var a = grid.getTopToolbar();
    a.get(1).disable();
}

Act.prototype.getModifiedFieldsValue=function(changedrows){
    var modified_kv=[];
    for (var i=0;i<changedrows.length;i++){
        var thisrow=changedrows[i];
        var modified=thisrow.modified;
        thisrow.modified.id=thisrow.data.id;
        for (var p in thisrow.modified){
            thisrow.modified[p]=thisrow.data[p];
        }
        modified_kv.push(thisrow.modified);
    }
    return modified_kv;
}
 
Act.prototype.getBtns=function( ){
   
     
    if (this.cfg.tbar_type=='stand'){
        this.btns=this.getStandBtns();
    }

    if (this.cfg.tbar_type=='file_php'||this.cfg.tbar_type=='file_img'||this.cfg.tbar_type=='file_js'){
        this.btns=FileMgr.getFileBasedBtns( this.cfg.file_type );
    }
}


Act.prototype.getStandBtns=function(){
    var publicBtns=this.getPublicBtns();
    var rowBasedActBtns=this.getRowBasedActBtns();
    var jsBtns=this.getJsBtns();
    var batchBtns=this.getBatchBtns();
    return  publicBtns.concat(rowBasedActBtns,jsBtns,batchBtns);
}

Act.prototype.getRowBasedActBtns=function(){
    var that=this;
    var a2a_btns =[];
    for (var i=0;i<this.actBasedBtns.length;i++){
        activity_for_btn=this.actBasedBtns[i].activity_for_btn;
        mainField=this.actBasedBtns[i].field_for_main_activity;
        subField=this.actBasedBtns[i].field_for_sub_activity;
        var obj={id:'btn'+Ext.id()};
        obj.ctCls ='x-btn-over';
        obj.ACT_option={
            panelid:that.panelId,
            btn_ref_act:activity_for_btn,
            mainCol:mainField,
            subFCol:subField
        };
        obj.text=this.actBasedBtns[i].btn_name;
        obj.handler=function(btn){
            that.rowBasedActivityHandler(btn)
        };
        a2a_btns.push(obj);
    }
    return a2a_btns;
}


Act.prototype.getJsBtns=function(){
    var specialBtns=[];
    var btns=this.js_btns;
    var orgin_act=this;
    for (var i=0;i<btns.length;i++){
        var obj={ctCls:'x-btn-over'};
        obj.text=btns[i].btn_name;
        obj.fnname=btns[i].function_name;
        obj.handler=function(btn,event){
            if (NANXplugin.prototype[this.fnname]){
                NANXplugin.prototype[this.fnname](btn,orgin_act);
            }else{
                Ext.MessageBox.alert(i18n.alert,i18n.entry_function+':<span class=red>['+this.fnname+']</span>'+i18n.not_exists+","
                   		  +i18n.pls_check_js_upload+".<br/><br/>"+i18n.code_sample+" <br/><br/>______________________________________________<br/><br/>"
                   		  + "NANXplugin_window.prototype."+i18n.entry_function+"=function()<br/>"
                   		  +"{<br/>"
                   		  +"//code here<br/>"
                   		  +"}<br/>______________________________________________"
                   		  );
            }
        };
        specialBtns.push(obj);
    }
    return specialBtns;
}

Act.prototype.getBatchBtns=function(){
    var that=this;
    var BatchBtns=[];
    var btns=this.batch_btns;
    for (var i=0;i<btns.length;i++){
        var obj={ctCls:'x-btn-over'};
        obj.text=btns[i].btn_name;
        obj.id='batch_btn_'+btns[i].btn_name;
        obj.op_field=btns[i].op_field;
        obj.handler=function(btn){
            that.batchUpdate(this);
        };
        BatchBtns.push(obj);
    }
    return BatchBtns;
}


Act.prototype.rowBasedActivityHandler=function(btn){
    var cfg = btn.ACT_option;
    var motherPanel_id=btn.ownerCt.ownerCt.id;
    var mainCol=cfg.mainCol;
    var subFCol=cfg.subFCol;
    var btn_ref_act=cfg.btn_ref_act;

    var userRecord = Ext.getCmp(motherPanel_id).getSelectionModel().getSelections();
    if (!(userRecord.length == 1)){
        Ext.Msg.alert(i18n.alert,i18n.choose_atleast_one_record);
        return false;
    }
    var row = userRecord[0];
    var filtervalue = row.get(mainCol);
    new Act({
        gridtype: 'grid',
        code: btn_ref_act,
        nosearch: true,
        showwhere: 'autowin',
        filter_field: subFCol,
        filter_value: filtervalue
    });
}

Act.prototype.getTbar=function(){
    

    if (this.cfg.tbar_type=='hide'){
        return null;
    }
    if (this.cfg.tbar_type=='stand'){
        var bar=this.btns;
    }
    if (this.cfg.tbar_type=='render_to_tabpanel'){
         var bar=this.buildTopToolbar_backend();
    }

    if (this.cfg.tbar_type=='file_php'||this.cfg.tbar_type=='file_js'){
        var bar=this.btns;
        console.log(bar)
    }
    
    if (this.cfg.tbar_type=='file_img'){
        var bar=this.btns;
    }
    
     
    return bar;
}

Act.prototype.getRefreshButtonGroup=function(){
    var b={
        text:i18n.refresh,
        iconCls:'table_data_refresh',
        iconAlign:'left',
        disabled:false,
        width:60,
        handler:this.refreshCurrentPage,
        scope:this
    };
    return [{
        xtype:'buttongroup',
        id:'tabledata_refresh_btns',
        disabled:false,
        items:[b]
    }]
}

Act.prototype.refreshCurrentPage=function(){
    this.gridPanel.getStore().rejectChanges();
    this.paginator.doRefresh();
    this.resetEditParams();
    var a = this.gridPanel.getTopToolbar();
    a.get(1).disable();
}

Act.prototype.resetEditParams = function(){
    this.deletedIDs=[];
};

Act.prototype.getBbar=function(){
    var that=this;
    this.paginator=new Ext.PagingToolbar({
        pageSize:pageSize,
        store:this.mainStore,
        displayInfo:true,
        displayMsg:i18n.bbar_display + " {0} - {1} of {2}",
        emptyMsg:i18n.no_record,
        width:"100%",
        style:{
            borderWidth: "0px"
        }
    });
    return new Ext.Toolbar({
        items:[this.paginator]
    });
};

Act.prototype.showWindow = function(){
     

    if (this.sql_syntax_error){
        Ext.MessageBox.minWidth=250;
        Ext.Msg.alert(i18n.error,i18n.sql_syntax_error);
        return;
    }

    var title ='<img src='+BASE_URL+'imgs/thumbs/'+this.pic_url+' />&nbsp;'+this.gridTitle;
    if (this.cfg.wintitle){
        var title=this.cfg.wintitle;
    }
    
    
    var win_w=this.win_size_width||this.cfg.width;
    var win_h=this.win_size_height||this.cfg.height;

    if (this.cfg.showwhere=='autowin'){
        this.cfg.tbar_type='stand';
 

        this.gridPanel.height=win_h * 1.0 - 34;
        var winid = 'win_' + this.actcode;
        if (!Ext.getCmp(winid)){
            var w = win_w * 1.0;
            var h = win_h * 1.0;
            var grid_win=new Ext.Window({
                autoScroll:true,
                closeAction:'destroy',
                stateful:false,
                constrain:true,
                shadow:false,
                cascadeOnFirstShow: 20,
                width: win_w * 1.0,
                height: win_h * 1.0,
                id: winid,
                title:title,
                items:[this.gridPanel]
            });
            
            grid_win.on('render',function(){
            });

            grid_win.doLayout();
            grid_win.show();
        
        } else {
            var grid_win=Ext.getCmp(winid);
            grid_win.toFront();
        }
    }


    if (this.cfg.showwhere == 'render_to_tabpanel') {
        

        this.cfg.host.removeAll();
        this.cfg.host.add(this.gridPanel);
        this.cfg.host.doLayout();
    }

   


  if (this.cfg.showwhere == 'container'  )
    {
        var motherBoard = Ext.getCmp(this.renderto);
        var h=motherBoard.getHeight();
        this.gridPanel.setTitle(i18n.layout);
        this.gridPanel.render(this.renderto);
        this.gridPanel.setHeight(this.grid_h||h);
    }

}
 

Act.prototype.autoHeader =function(){
    
    if(this.gridPanel.file_type=='img')
    {
      for(var i=0;i<this.gridPanel.colModel.columns.length;i++)
      {
       this.gridPanel.colModel.setColumnWidth(i,98);
      }
     return;
    }
     
    
    if (this.gridPanel.colModel){
        for (var i=0;i<this.gridPanel.colModel.columns.length;i++){
            this.autoSizeColumn(i,
            this.gridPanel.colModel.columns[i].header,
            this.gridPanel.colModel.columns[i].dataIndex,
            this.gridPanel.colModel.columns[i].asPic);
        }
    }
}



Act.prototype.autoSizeColumn = function(colindex,header,dataIndex,asPic){
    if (colindex == 0){
        return;
    }
    var rowtotal=this.gridPanel.getStore().getCount();
    var celldata;
    var hiddenLabel=new Ext.form.Label({
        text:'0',
        style:'font-family:arial,?tahoma,?helvetica,?sans-serif;font-size:12px;',
        hidden:true,
        renderTo:document.body
    });

    var textmeter=Ext.util.TextMetrics.createInstance(hiddenLabel.el);
    hiddenLabel.setText(header);
    var headerWidth=textmeter.getWidth(header);
    var colwidth=0;

    for (var i=0;i<rowtotal;i++){
        var rec=this.gridPanel.getStore().getAt(i);
        celldata="'"+rec.get(dataIndex)+"'";
        hiddenLabel.setText(celldata);
        var cellwidth=textmeter.getWidth(celldata);
        colwidth=Math.max(colwidth, cellwidth);
    }
    if (asPic=='1'){
        colwidth=75;
    }
    this.gridPanel.colModel.setColumnWidth(colindex, Math.max(headerWidth,colwidth)+19);
}

Act.prototype.actionWin = function(type,form,wincfg){
     
    var  runStandSqlActivity=function(){
        new Act({'edit_type':'noedit','code': 'NANX_SQL_ACTIVITY',  'showwhere': 'autowin', 'host': null });
    };

    if(type=='add'||type=='update'||type=='batch')
      { 
        var that=this;
        var refresh = function(){ that.gridPanel.getStore().reload();};
        var title=i18n[type]+"@"+this.gridTitle; 
        var id=type+'_win';
        var url=CURD_URL+type+'Data';
        form.extra_url=url;
        form.extra_fn=refresh;
      } 
    else  //for backend window
      { 
        var refresh = function(){
            if (wincfg.node.parentNode){
                wincfg.node.parentNode.reload();
            }
        };
        var id='back_op_win';

        if (wincfg.hasOwnProperty('alt_id')){
            id=wincfg.alt_id;
        }
        
        var backendUrl=AppCategory.getBackendCrontroller();
        var url=wincfg.url?wincfg.url:AJAX_ROOT+backendUrl.controller+'/'+backendUrl.func_name;
        
         

        var title ='<img src=' + BASE_URL+ 'imgs/thumbs/backop.png' + ' />&nbsp;'+wincfg.title;
        form.extra_url=url;
        
        form.extra_fn=refresh;
        if (wincfg.opcode=='run_sql'){form.extra_fn=runStandSqlActivity;}
        form=FormBuilder.backendFromWrapper(form,wincfg.opcode);
      }
    
      if(wincfg&&wincfg.althandler){
       var afterClick=wincfg.althandler;
      }
       else
      {
        var afterClick=Act.prototype.ConfirmBtnHandler;  
      }
      
      form.on('render',function(){
          var roots = form.find('nanx_type','root');
          for(var i=0;i<roots.length;i++)
          {
              roots[i].getStore().load({params:{start:0,limit:pageSize}});
          }

             // var trigger_btn= Ext.getCmp('add_trigger_button' )
             // trigger_btn.on('render',function(a,b,c){
             //       console.log(a,b,c)
             //       a.setupclick()
             //       alert('trigger_btn show!')  
             // })



      });

      

      
      var win_cfg={
        title:title,
        items:form,
        stateful:false,
        constrain:true,
        draggable:true,
        autoHeight:true,
        id:id,
        closeAction:'destroy',
        modal:true,
        buttons:[{
            xtype:'button',
            text:i18n.close,
            iconCls:'n_exit',
            handler:function(){
                win.close();
            }
        },{
            xtype:'button',
            btntype:type,  
            text:i18n.confirm,
            iconCls:'n_save',
            handler:afterClick
        }]
    };

      win_cfg.width=600;  
      if (type=="backend"){win_cfg.width=wincfg.width?wincfg.width:550}
      if(wincfg&&wincfg.viewonly){win_cfg.buttons[1].disabled=true;};    
      var win = new Ext.Window(win_cfg);
      form.show()
      win.doLayout();
      win.show();
   
      win.syncSize();
}

Act.prototype.ConfirmBtnHandler=function(btn){

        var w=btn.findParentByType('window');
        var fm_array= w.findByType('form');
        var fm=fm_array[0];
        fm.upload_errcount=0;
        var btns=Ext.select('.hidden_upload_btn');
        fm.uptasks=(btns.elements).length;
       
        Ext.select('.hidden_upload_btn').each(function(el){
            var button = Ext.getCmp(el.id);
            button.fireEvent('click', button);
        });    
        Act.prototype.FormAction(fm);
        this.disable();
        return;
 
}

Act.prototype.FormAction=function(form){
        var that=this;
        if((form.uptasks==0)&&(form.upload_errcount==0))
        {
            var formData=FormBuilder.getFormData(form);
            if (!formData){
                return;
            }
            
         
            // 如果存在trigger_row ,说明是下拉配置
            trigger_rows = form.find('nanx_type', 'trigger_row');
            if( trigger_rows.length>0){
               alert('   // 如果存在trigger_row ,说明是下拉配置')   
               alert(trigger_rows.length)
               //follow_row
               follow_row_value=[]
               follow_rows= form.find('nanx_type', 'follow_row')
               for (var i = 0; i < follow_rows.length; i++) {
                     follow_row_value.push( follow_rows[i].getfollowValue())
                } 

            
              if( follow_row_value.length>0){
                   formData.follow_rows=follow_row_value
              }

            }
            console.log(formData)
            var dataSend={
                table:form.table,
                rawdata:formData,
                actcode:form.actcode,
                batch_ids:form.ids_batch
            };
             if(!Ext.isEmpty(form.extra_url))
             {
             ajaxPostData(form.extra_url,dataSend,form.extra_fn);
             }
        }
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}




function Act_service(acode,service_url,memo){
    button = {
        xtype:'button',
        text:i18n.execute,
        height:30,
        iconCls:'service_remote',
        iconAlign:"left",
        width:90,
        handler:function(){
            Ext.Msg.confirm(i18n.confirm,i18n.confirm_execute,function(btn){
                if (btn=='yes'){
                    WaitMask.show();
                    Ext.Ajax.request({
                        url: AJAX_ROOT + service_url,
                        success: function(response, opts) 
                        {
                            WaitMask.hide();
                            if(  (response.responseText ).length >0  )
                            {
                                  if (isJson(response.responseText))
                                     {
                                         var obj = Ext.decode(response.responseText);
                                         if(obj.msg){ Ext.Msg.alert(i18n.message,obj.msg);}else{Ext.Msg.alert(i18n.message, response.responseText);}
                                     }
                                     else
                                     {
                                        Ext.Msg.alert(i18n.message, response.responseText);
                                     }
                              
                            }
                            else
                            {
                              Ext.Msg.alert(i18n.message,i18n.service_exec_done);
                            }
                        },
                        failure: function(response, opts) {
                            WaitMask.hide();
                            Ext.Msg.alert(i18n.message, i18n.service_call_err);
                        }
                    });
                }
            });
        }
    };

    var f=new Ext.Container({
        items:[button],
        style:"margin-left:158px;margin-top:30px;"
    });
    var memo = new Ext.Container({
        html: memo,
        style: "margin-left:10px;margin-top:10px;"
    });

    var service_win=new Ext.Window({
        autoScroll:true,
        closeAction:'destroy',
        constrain:true,
        width:400,
        height:248,
        id:'win_'+acode,
        title:i18n.execute,
        items:[memo,f],
        modal:true
    });
    service_win.show();
}
 

function Act_iframe(acode,service_url,memo,grid_title){
    

  var iframeContainer = new Ext.BoxComponent({
    autoEl: {
        tag: 'iframe',
        frameborder: '0',
        src: 'http://61.232.6.35:9002/plugin/3d/rfid_report/index.html'
    },

    width: 900,  
    height: 800  ,

    listeners: {
        afterrender: function () {
            console.log('rendered');

            this.getEl().on('load', function () {
                console.log('loaded');
            });
        }
    }
    });

    var iframe_win=new Ext.Window({
        autoScroll:true,
        closeAction:'destroy',
        constrain:true,
        width:930,
        height:820,
        id:'win_'+acode,
        title:grid_title,
        items:[iframeContainer],
        modal:true
    });

    iframe_win.show();
}
