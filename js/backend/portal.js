Ext.override(Ext.tree.TreeLoader,{
        processResponse:function(response,node,callback){
                var e=Ext.util.JSON.decode(response.responseText);
                var rows=e.server_resp;
                node.beginUpdate();
                for (var i=0,len=rows.length;i<len;i++) {
                        if(!rows[i].hasOwnProperty('value'))
                        {
                          rows[i].value=rows[i].field_e;
                        }
                        
                        var n=this.createNode(rows[i]);
                        if(n){
                                node.appendChild(n);
                        }
                }
                node.endUpdate();
                if (typeof callback=="function"){
                        callback(this,node);
                }
        }
});

Ext.override(Ext.Component,{
        findParentBy:function(fn){
                for(var p=this.ownerCt;
                (p != null)&&!fn(p);p=p.ownerCt);
                return p;
        },
        findParentByType:function(xtype){
                return typeof xtype=='function'?this.findParentBy(function(p){
                        return p.constructor===xtype;
                }):this.findParentBy(function(p){
                        return p.constructor.xtype===xtype;
                });
        }
});
 


var Portal={
        init:function(){
                Topmenu.init();
                Explorer.init();
                Portal.MainTabPanel=new Dbl.MainTabPanel();
                Explorer.buildTreeWithDefault();
                this.rightPanel=new Ext.Panel({
                        region:"center",
                        split: true,
                        margins: "0 0 0 0",
                        border:false,
                        layout:"border",
                        items:[Portal.MainTabPanel]
                });
                new Ext.Viewport({
                        layout: "border",
                        items: [Topmenu.menuPanel, Explorer.explorerPanel, this.rightPanel]
                });
        }
};
var Explorer={
        init:function(){
                Explorer.explorerPanel=new Ext.Panel({
                        title:i18n.app_mnt,
                        id:"App_manage_panel",
                        region:"west",
                        margins:"0 0 0 2",
                        width:250,
                        minSize:250,
                        maxSize:400,
                        split:true,
                        layout:"fit",
                        border:false,
                        style:{
                                borderWidth:"0px",
                                borderRightWidth:"0px",
                                borderLeftWidth:"1px"
                        },
                        collapsible:true,
                        tbar:{items:["->"]}
                });
        }, 
        buildTreeWithDefault:function(){
                explorerTreeeObj=new Explorer.explorerTreePanel;
                Explorer.explorerPanel.add(explorerTreeeObj);
                Explorer.explorerPanel.doLayout();
        },
        explorerTreePanel:function(){
                this.appNodes=this.getGroups('AppCategory_List');
                this.dbNodes=this.getGroups('RawDBCategory_List');
                var treeRoot=new Ext.tree.AsyncTreeNode({
                        category: 'treeroot',
                        id: 'tree_root_0',
                        level: 0,
                        expanded: true,
                        children: [
                        {
                                text:i18n.biz_mnt,
                                category:'app',
                                expanded:true,
                                iconCls:'appmnt',
                                id:'app_root',
                                children:this.appNodes
                        },
                        {
                                text:i18n.db_mnt,
                                category:'rawdb',
                                expanded:true,
                                iconCls:'raw_db',
                                id:'rawdb_root',
                                children:this.dbNodes
                        }]
                });

                var treeListener={
                        contextmenu:this.onContextMenu,
                        click:this.treeNodeClick,
                        expandnode:this.handleExpandnode,
                        nodedragover:function(e){
                                return (this.checkDnD(e))
                        },
                        nodedrop:function(e){
                                this.processDnD(e)
                        },
                        beforenodedrop:function(e){
                                var n=e.dropNode;
                                var copy=new Ext.tree.TreeNode(
                                Ext.apply({},n.attributes));
                                e.dropNode=copy;
                        },
                        scope:this
                };

                var treeLoader=new Ext.tree.TreeLoader({
                        dataUrl:AJAX_ROOT + 'tree',
                        preloadChildren: false,
                        listeners:{
                                beforeload: function(loader, node) 
                                {
                                          loader.baseParams.category_to_use=node.attributes.category;
                                          loader.baseParams.value=node.attributes.value;
                                },
                                scope:this
                        }
                });

                Explorer.explorerTreePanel.superclass.constructor.call(this, {
                        id:"AppTree",
                        autoScroll:true,
                        animate:true,
                        enableDD:true,
                        allowDrag:false,
                        animCollapse:true,
                        rootVisible:false,
                        useArrows:true,
                        layout:"fit",
                        style:"margin-top:3px",
                        border:false,
                        root:treeRoot,
                        listeners:treeListener,
                        loader:treeLoader
                })
        }
};

 

var ExplorerMenuItems={
        refreshTreeNode: function(node) {
                return {
                        itemId:"refreshTreeNode",
                        text:i18n.refresh,
                        iconCls:"refresh",
                        listeners:{
                                click:function(d,c){
                                        if (!node.leaf) {
                                                node.reload();
                                        } else {
                                                node.parentNode.reload();
                                        }
                                }
                        }
                }
        },
        whatisthis:function(node) {
                return {
                        itemId:"tips_for",
                        text:i18n.debug,
                        iconCls:"tips",
                        listeners:{
                                click:function(d,c){
                                        var props1="";
                                        var props2="";
                                        for (var p in node.attributes) {
                                                if ((typeof(node.attributes[p]) != "function") && (typeof(node.attributes[p]) != "object")) {
                                                        props1 += p + "=>" + node.attributes[p] + "<br/>";
                                                }
                                        }
                                        if (node.parentNode) {
                                                var par=node.parentNode;
                                                for (var p in par.attributes) {
                                                        if ((typeof(par.attributes[p]) != "function") && (typeof(par.attributes[p]) != "object")) {
                                                                props2 += p + "=>" + par.attributes[p] + "<br/>";
                                                        }
                                                }
                                        }
                                        var win=new Ext.Window({
                                                title:i18n.debuginfo,
                                                width:640,
                                                height:500,
                                                preventBodyReset: true,
                                                html:'<div style="margin:20px;">'+i18n.this_node_info+'<br/>'+props1+'<br/><hr/>'+i18n.parent_node_info+'<br/>' + props2 + '</div>'
                                        });
                                        win.show();
                                }
                        }
                }
        }
};


function specialCodeRoute(node,category,opcode)
{

     if (opcode=='mem_copy'){
                  common_fn=function(){
                  var  copypaste_src={'category':node.attributes.category,
                                    'id':node.attributes.id,
                                    'id':node.attributes.id,
                                    'text':node.attributes.text,
                                    'value':node.attributes.value 
                                     };
                  MEM_COPY_PASTE.source=copypaste_src;
                  Ext.Msg.alert(i18n.msg,i18n.dup_success);                
                         }
                }
                
                
                if (opcode=='mem_paste'){
                  common_fn=function(){
                    var  copypaste_target={'category':node.attributes.category,
                                    'id':node.attributes.id,
                                    'text':node.attributes.text,
                                    'value':node.attributes.value 
                                  };
                                  
                    MEM_COPY_PASTE.target=copypaste_target;              
                    ajaxPostData(AJAX_ROOT +'copynode/',MEM_COPY_PASTE,function(){});
                         }
                }
                 
                if (opcode=='create_table'){
                        common_fn=function(){
                                var mainTab=Ext.getCmp('MainTab');
                                  mainTab.activeTabL1L2(['tab_tblmnt','NANX_TBL_CREATE']);
                        }
                }
                
                if (opcode=='preview_activity'){
                        common_fn=function(){
                        var grid_type='table';
                        if ('activity_sql'==node.attributes.category){grid_type='sql';}
                        new Act({'edit_type':'noedit','code': node.attributes.value,  'showwhere': 'autowin', 'host': null });
                        }
                     }
                     
                     
                if (opcode=='edit_public_field'){
                        common_fn=function(){
                        var host=Ext.getCmp('table_data');
                        new Act({edit_type:'edit',table:'nanx_activity_field_public_display_cfg',code:'NANX_TBL_DATA',showwhere:'autowin',wintitle:i18n.title_setdisplycfg,host:null});
                        }
                }


                if (opcode=='edit_codetable'){
                        common_fn=function(){
                        var host=Ext.getCmp('table_data');
                        new Act({edit_type:'edit',table:'nanx_code_table',code:'NANX_TBL_DATA',showwhere:'autowin',wintitle:i18n.title_setdisplycfg,host:null});
                        }
                }
          return common_fn;
}


function  getMenuItemHandler(node,category,opcode,alt_win_id)
{
    var specialCodes = ["mem_copy", "mem_paste", "create_table", "preview_activity","edit_public_field","edit_codetable"];
    var route = specialCodes.indexOf(opcode);
    if(route>=0)
    {
      var common_fn=specialCodeRoute(node,category,opcode);
      return common_fn;
    }

    var common_fn=function(){
              var opform=FormBuilder.backendForm(category,opcode,node);
              var wincfg={
                 category:category,
                 opcode:opcode, 
                 node:node
                 };
                 
                 if(alt_win_id){wincfg.alt_id=alt_win_id;}
                 var mcfg=AppCategory.getSubMenuCfg( category,opcode);
                 if(!mcfg){alert('MCFG is null');return;};
                 if(mcfg.viewonly){wincfg.viewonly=true;}
                 var defaultCF=AppCategory.getBackendCrontroller();
                 Ext.applyIf(mcfg,defaultCF);
                 var url=null;
                 if(!Ext.isEmpty(mcfg.controller))
                 {
                 var  url=AJAX_ROOT+mcfg.controller+'/'+mcfg.func_name;

                 }
                 wincfg.url=url;
                 wincfg.width=(mcfg&&mcfg.width)?mcfg.width:550;
                 wincfg.title=(mcfg && mcfg.title)?mcfg.title : '';
                 var win=Act.prototype.actionWin('backend',opform,wincfg);
    };
    return common_fn;
}


Ext.extend(Explorer.explorerTreePanel,Ext.tree.TreePanel,{
        getGroups: function(xtype){
                var FirstLevel=AppCategory.getAppCategory(xtype);
                var retLevel=[];

                for (var i=0;i<FirstLevel.length;i++) {
                        var r={};
                        r.id='tree_'+FirstLevel[i].category;
                        r.category=FirstLevel[i].category;
                        
                        console.log( FirstLevel[i].refer )
                        console.log( xtype )

                        r.refer=FirstLevel[i].refer || '';
                        r.level=1;
                        r.value=FirstLevel[i].label;
                        r.text=FirstLevel[i].label;
                        r.leaf=FirstLevel[i].leaf;
                        r.iconCls=FirstLevel[i].category;
                        r.expanded=false;
                        retLevel.push(r);
                };
                return retLevel;
        },
        menuItemProcessor:function(node,category,opcode,title,css){
                var common_fn= getMenuItemHandler(node,category,opcode);
                return {
                        itemId:opcode,
                        text:title,
                        iconCls:css,
                        listeners:{click:common_fn}
                }
        },

        onContextMenu: function(node,g){
                if (this.menu) {
                        this.menu.removeAll()
                }
                var nc=node.attributes.category;
                var nodemenus=AppCategory.getCategoryMenusByCategory(nc);
                var menu=[];
                for(i=0;i<nodemenus.length;i++){
                	      var opcode=nodemenus[i].opcode;
                	      var title=nodemenus[i].title;
                	      var css=nodemenus[i].iconCls;

                        
                          var submenuitem=this.menuItemProcessor(node,nc,opcode,title,css);
                          var enabled=nodemenus[i].hasOwnProperty('enable')?nodemenus[i].enable:true;
                          if(enabled){ menu.push(submenuitem);}
                        
                }
                menu.push("-",ExplorerMenuItems.refreshTreeNode(node), ExplorerMenuItems.whatisthis(node));
                if (menu[0]=="-"){menu.shift()};
                this.menu=new Ext.menu.Menu({
                        items: menu,
                        defaults:{
                                scale:"small",
                                width:"100%"
                        }
                });
                this.menu.showAt(g.getXY())
        },

        processDnD:function(e){
                e.dropNode.attributes.listeners='';
                e.target.attributes.listeners='';
                e.dropNode.attributes.loader='';
                e.target.attributes.loader='';
                var p={'src':e.dropNode.attributes,'target': e.target.attributes };
                ajaxPostData(AJAX_ROOT+'nanx/dnd',p,function(ret){
                       if(e.target.parentNode){
                         var f=e.target.parentNode;
                         e.target.parentNode.on('load',function(){ f.expand(); },this,{single:true});
                         e.target.parentNode.reload();
                        }
                       else
                        {e.target.reload();} 
                        });
        },
        checkDnD: function(e){
                var dndcfg=AppCategory.getDnDcfg();
                var c1=e.dropNode.attributes.category;
                var c2=e.target.attributes.category;
                var cfg=dndcfg[c1];
                if (!cfg) {
                        return false;
                }
                if ((cfg.indexOf(c2)>= 0)&&(e.point=='append')){
                        return true;
                } else {
                        return false;
                }
        },

        getRefer:function(node){
                var refer=null;
                if (node.attributes.refer) {
                        refer=node.attributes.refer;
                }
                if (!refer){
                        if(node.parentNode){
                                if (node.parentNode.attributes.refer) {
                                        refer=node.parentNode.attributes.refer;
                                }
                        }
                }
                return refer;
        },
        
        treeNodeClick:function(node){
                var tmp=Dbl.UserActivity2['active_subtab'];
                var refer=this.getRefer(node);
                Dbl.MainTabPanel.prototype.activeTabL1L2(refer);
                var run_time_set=[{
                        key:"current_category",
                        value:node.attributes.value
                },
                {
                        key:node.attributes.category,
                        value:node.attributes.value
                }];

                
              
                
                Dbl.UserActivity2['current_category']=node.attributes.value
                Dbl.UserActivity2[node.attributes.category]=node.attributes.value
                if(node.attributes.os_path){
                     Dbl.UserActivity2['os_path']=node.attributes.os_path
                }

               
              
                
                if( run_time_set[0].value=='fs_table'){

                }else
                {   
                    if (node.parentNode){
                         run_time_set=[{
                                key:node.parentNode.attributes.category,
                                value:node.parentNode.attributes.value
                        }];
                  
                       Dbl.UserActivity2[node.parentNode.attributes.category]=node.parentNode.attributes.value
                    }
                }
                 
                var currentSubtabId=Dbl.UserActivity2['active_subtab']
                if (Ext.getCmp(currentSubtabId)){
                        var currentSub=Ext.getCmp(currentSubtabId);
                        currentSub.fireEvent('activate');
                } 
                
        
        },
        
        handleExpandnode: function(node){
                this.treeNodeClick(node);
        }
});


Ext.onReady(function(){
        Portal.init();
        new Ext.KeyMap(document,[{
                key: Ext.EventObject.F1,
                handler:function(){
                        var raw=Dbl.UserActivity2["current_category"];
                },
                stopEvent: true
        }])
});


getCurrentColandIndex=function(rowindex){
    var grid=Ext.getCmp("grid_NANX_TBL_INDEX");
    ds=grid.getStore();
    var cols4index = ds.reader.jsonData.cols4index;
    var tb_col_arr = [];
    for (var i=0;i<cols4index.length;i++) {
        var d = cols4index[i]['Field'];;
        tb_col_arr[i]=[d,d];
    }
    var indexcol=[];
    var current_cols=Ext.getCmp("grid_NANX_TBL_INDEX").store.getAt(rowindex);
    var columns=current_cols.data.columns;
    if (columns){
        columns=columns.split(",");
        if (columns.length){
            for (var i=0;i<columns.length;i++){
                var onecol=(columns[i]);
                indexcol.push([onecol,onecol]);
            }
        }
    }
    var aviableCols=getAviableCols(tb_col_arr,indexcol);
    var colreader=new Ext.data.ArrayReader({},[{name:'text'},{name:'value'}]);
    var dscfg1={
        fields:['value', 'text'],
        reader:colreader
    };
    var dscfg2={};
    Ext.apply(dscfg2, dscfg1);
    dscfg1.data=aviableCols;
    dscfg2.data=indexcol;
    var leftData=new Ext.data.ArrayStore(dscfg1);
    var rightData = new Ext.data.ArrayStore(dscfg2);
    return {
        allcol:leftData,
        usedcol:rightData
    };
}




getSqlfromDs=function(ds)
{
    var cols = [];
    var s = [];
    var pk_cols = [];
    var sql = "";
    for (var i = 0, fieldnum = ds.data.items.length; i < fieldnum; i++) {
        var field = ds.data.items[i].data;
        if (field.field_name || field.datatype) {
            cols.push(field)
        }
    }
    for (var i = 0; i < cols.length; i++) {
        var field = cols[i];
        var col_define = '';
        col_define += field.field_name;
        col_define += " " + field.datatype;
        if (field.length) {
            col_define += "(" + field.length + ")"
        }
        if (field.unsigned) {
            col_define += " UNSIGNED ";
        }
        if (field.primary_key || field.not_null) {
            col_define += " NOT NULL "
        } else {
            col_define += " NULL "
        }
        if (field.default_value) {
            var r = field.default_value;
            field.default_value = r.replace(/[\']{1}/gi, "");
            var m = /\s/g;
            if (m.test(field.default_value) || field.datatype.toLowerCase() == "enum") {
                field.default_value = "'" + field.default_value + "'"
            }
            col_define += " DEFAULT " + field.default_value;
        }
        if (field.auto_increment) {
            col_define += " AUTO_INCREMENT "
        }
        if (field.comment) {
            col_define += " COMMENT '" + field.comment + "' "
        }
        s.push(col_define);
        if (field.primary_key) {
            pk_cols.push(field.field_name)
        }
    }
    if (pk_cols.length) {
        var f = pk_cols.join(", ");
        var p = " PRIMARY KEY (" + f + ")";
        s.push(p);
    }
    var sql = "CREATE TABLE TB_TO_REPLACE ( " + s + " )";
    return sql;
}



getColRange=function(grid,x,y,event){
     var gridBox=grid.getBox();
     var hh=grid.getColumnModel();
     var max_right_postion=gridBox.x+hh.getTotalWidth();

     var col_count_exists=hh.getColumnCount();
     var col_postion=[];
     for (var jj=0; jj < col_count_exists; jj++){
         var col_width_so_for=0;
         for (var i=0; i <= jj; i++){
             col_width_so_for += hh.getColumnWidth(i);
         }

         var this_width=hh.getColumnWidth(jj);
         col_postion.push({
             col_index:jj,
             col_width_so_for:col_width_so_for,
             x_start:gridBox.x + col_width_so_for - this_width,
             x_end:gridBox.x + col_width_so_for
         });
     }

     var rows_count=grid.getStore().getCount();
     if (rows_count > 0){
         var row=grid.getView().getRow(0);
         var row_height=Ext.get(row).getHeight();
         var row_box=Ext.get(row).getBox();
         var y_start=row_box.y;
         var row_used=Math.ceil((y - y_start) / row_height);

         var new_row=false;
         if (row_used > rows_count){
             row_used=rows_count - 1;
             new_row=true;
         } else {
             row_used=row_used - 1;
             new_row=false;
         }

     } else {
         var new_row=true;
         var row_used=0;
     }
     if (x > max_right_postion){
         return {
             new_row:new_row,
             out:true,
             col:col_count_exists,
             row:row_used
         };
     } else {
         for (k=0; k < col_postion.length; k++){
             if ((x > col_postion[k].x_start) && (x < col_postion[k].x_end)){
                 var found=k;
                 break;
             }
         }
         return {
             new_row:new_row,
             out:false,
             col:found,
             row:row_used
         };
     }
 };
 
 
getAviableCols=function(tblcols,usedcols){
     var result=[];
     for (var i=0; i < tblcols.length; i++){
         var found=-1;
         var col=tblcols[i];
         for (var j=0; j < usedcols.length; j++){
             if (usedcols[j][0] == col[0]){
                 found=0;
                 break;
             }
         }
         if (found == -1){
             result.push(col);
         }
     }
     return result;
}


 