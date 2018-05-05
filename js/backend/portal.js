

var Topmenu = {
        menuPanel:"",
        tbar:"",
        init:function() {
                Topmenu.userControls = new Ext.ButtonGroup({
                        xtype:"buttongroup",
                        id:"user_controls",
                        frame:false
                });
                Topmenu.menuPanel = this.createMenuPanel();
        },

        createMenuPanel:function() {
                return new Ext.Panel({
                        region:"north",
                        layout:"fit",
                        border:false,
                        tbar:{
                                id:"header_tbar",
                                style:{
                                        "padding-left":"20px"
                                },
                                items:[
                                {
                                        iconCls:"about_dblite",
                                        text:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp',
                                        handler:Topmenu.showAboutWindow
                                },
                                {
                                        xtype:"tbseparator"
                                },
                                {
                                        text:i18n.return_front_end,
                                        width:25,
                                        handler:function() {
                                                window.location.href = "../";
                                        }
                                }]
                        },
                        items:[]
                })
        },

        showAboutWindow:function() {
                Topmenu.createAboutWindow();
        },
        
        createAboutWindow:function() {
                this.win = new Ext.Window({
                        title:"NaN-X",
                        id:"about_window",
                        width:400,
                        height:400,
                        resizable:false,
                        autoScroll:true,
                        layout:"border",
                        modal:true,
                        plain:true,
                        stateful:true,
                        items:[{
                                xtype:"panel",
                                id:"about_panel",
                                region:"center",
                                frame:true,
                                items:[{
                                        cls:"dblite_about_logo"
                                },
                                {
                                        id:"about_dblite",
                                        autoEl:{
                                                tag:"div" 
                                        }
                                }] 
                        }],
                        buttons:[{
                                text:i18n.close,
                                handler:function() {
                                        this.ownerCt.ownerCt.close()
                                }
                        }]
                });
                this.win.show();
                Ext.Ajax.request({
                        url:HELP_DIR + 'about',
                        success:function(response) {
                                Ext.getCmp('about_dblite').update(response.responseText);
                        }
                });
        } 
};

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


 
Ext.extend(Explorer.explorerTreePanel,Ext.tree.TreePanel,{
        getGroups: function(xtype){
                var FirstLevel=AppCategory.getAppCategory(xtype);
                var retLevel=[];

                for (var i=0;i<FirstLevel.length;i++) {
                        var r={};
                        r.id='tree_'+FirstLevel[i].category;
                        r.category=FirstLevel[i].category;
                        
                     

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
                var common_fn= FormBuilder.BackendFormHandler(node,category,opcode);
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
                ajaxPostData(AJAX_ROOT+'dndmgr/dnd',p,function(ret){
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
