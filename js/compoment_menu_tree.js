/*
compoment_menu_tree.js

*/


Ext.ns('MenuTree');

var MenuTree = {};

MenuTree.getMenuTreeBtns=function(menutree_id){
   
    var public_btns=[];

    public_btns.push({
        xtype:'button',
        text:'增加菜单组',
        iconCls:'n_add',
        style:{
            marginRight:'6px'
        },
        ctCls:'x-btn-over',
        handler:function(){
            var tree=Ext.getCmp(menutree_id);
            var rootnode=tree.getRootNode()
            var currentNode=tree.getSelectionModel().getSelectedNode() || tree.root;
            currentNode.appendChild({
             text : '菜单组',
             value: 'mgroup_'.concat(randomString()),
             leaf : false,
             expanded:false,
             iconCls:'x-grid-tree-node-expanded', 
             children:[]
              });
        }
    });


   
   public_btns.push({
            text:i18n.drop,
            iconCls:'n_del',
            style:{
                marginRight: '6px'
            },
            ctCls:'x-btn-over',
            id:'pub_delete',
            handler:function(e,x){
              
            
                var tree=Ext.getCmp(menutree_id);
                var record = tree.getSelectionModel().getSelectedNode() 
                
                if(record){
                     
                     if(record.id=='root_menu_id_1234'){
                        alert("根节点不能删除")
                        return
                     }

                     if(  record.attributes.value.indexOf('mgroup_')=== -1 ){
                              alert('只能删除空白的组合节点,菜单项可以拖拽到左边')
                              return 
                       
                     } 
                      

                     if(  record.attributes.value.indexOf('mgroup_')===0 ){
                          if( record.childNodes.length >0){
                              alert("节点下面有菜单项,请先拖拽到左边")
                              return
                          }else
                          {
                              record.remove(true);
                          }
                     } 
                 }
            }
        });
        
   
    public_btns.push({
            text:i18n.refresh,
            iconCls:'n_edit',
            style:{
                marginRight: '6px'
            },
            ctCls:'x-btn-over',
            id:'pub_refresh',
            handler:function(){

                alert('refresh')
                var tree=Ext.getCmp(menutree_id);
                console.log(tree )
                tree.getLoader().load(tree.root);
                
            }
        });
    return public_btns;
}


MenuTree.getMenuTreeGrid=function(cfg){

    var menutree_id='menutree'
    var tree = new Ext.tree.TreePanel(
     {

       loader: new Ext.tree.TreeLoader(
            {
                url: CURD_TREE_GET_MENU_DATA_URL,
                requestMethod:"POST",
                method:"POST",
                baseParams:{rule:cfg.rule_value,'asktreedata':'yes'}
            }),

 
        root: {text:'菜单',nodeType:'async',leaf:false,disable:true,value:'mgroup_root_1234',id:'root_menu_id_1234',expanded:false },
        rootVisible:true,
        enableDD:true,
        ddGroup:'NANX_gridDD',
        id:menutree_id,
        region:'east',
        title:'菜单设置',
        layout:'fit',
        width:300,
        height:360,
        tbar:{
            xtype:'buttongroup',
            title:'',
            items:this.getMenuTreeBtns(menutree_id)
        },

        split:true,
        bodyStyle:'background-color:white;',
        border:true,
        collapsible:true,
        autoScroll:true,
        listeners:{
            render :function(){
              this.expandAll()
            },

            beforenodedrop:{fn:function(e,x) {
                 console.log( e.target.attributes.value )
                 if( e.target.attributes.value.indexOf('mgroup_')=== -1){
                    alert('菜单项只能放在菜单组下面')
                    return false
                 }
                
                 e.target.expand()            

                if(Ext.isArray(e.data.selections)) {
                    e.cancel = false;
                    e.dropNode = [];
                    
                    var selectedRecord =e.source.dragData.selections[0];
                    var node_to_add=selectedRecord.data
                    node_to_add.leaf=true;
                    node_to_add.json=selectedRecord.json
                    //从拖拽来的grid删除记录
                    e.source.grid.store.remove(selectedRecord);
                    //增加一个节点
                    var newnode=  new Ext.tree.TreeNode(node_to_add);
                    e.dropNode=newnode;
                    
                 
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
 



MenuTree.getTreeBtns_for_tree_activity=function(TreePanelId,treeGrid_cfg){

    var activity_btns=[];
    
        activity_btns.push({
            xtype:'button',
            text:i18n.add,
            iconCls:'n_add',
            style:{
                marginRight:'6px'
            },
            ctCls:'x-btn-over',
            handler:function(){
                
                var tree=Ext.getCmp(TreePanelId);
                var currentNode=tree.getSelectionModel().getSelectedNode() || tree.root;
                var rawdata={}
                if( currentNode.attributes.id == tree.getRootNode().id  && tree.getRootNode().childNodes.length>0 ){
                    alert('请选择一个节点')
                    return;
                }

                rawdata[treeGrid_cfg.tree_text_field]='新节点'
                rawdata[treeGrid_cfg.tree_parent_field]=currentNode.attributes.id
                var addObj={actcode:treeGrid_cfg.actcode,table:treeGrid_cfg.table,
                            rawdata:rawdata
                           } 
                Fb.ajaxPostData(CURD_TREE_ADD_DATA_URL,addObj, function(){  tree.getRootNode().reload(); tree.expandAll() }   );
            }
        });


   
   activity_btns.push({
            text:i18n.drop,
            iconCls:'n_del',
            style:{
                marginRight: '6px'
            },
            ctCls:'x-btn-over',
            id:'pub_delete',
            handler:function(e,x){
                var tree=Ext.getCmp(TreePanelId);
                var record = tree.getSelectionModel().getSelectedNode() 
                var id_to_del=[record.attributes.id]
                var delObj={actcode:treeGrid_cfg.actcode,table:treeGrid_cfg.table,
                            id_to_del:id_to_del
                           } 
                Fb.ajaxPostData(CURD_TREE_DEL_DATA_URL,delObj, function(){ tree.getRootNode().reload(); tree.expandAll() }   );
                }

        });
         


       activity_btns.push({
            text:i18n.refresh,
            iconCls:'n_edit',
            style:{
                marginRight: '6px'
            },
            ctCls:'x-btn-refresh',
            id:'pub_refresh',
            handler:function(){
                var tree=Ext.getCmp(TreePanelId);
                tree.getRootNode().reload();
                tree.expandAll() 
                
            }
        });
        
    return activity_btns;
}



MenuTree.createActivityTreePanel=function(treeGrid_cfg){

    var TreePanelId=Ext.id()
     var tree = new Ext.tree.TreePanel(
     {
        loader: new Ext.tree.TreeLoader({

                    url: CURD_TREE_GET_DATA_URL,
                    requestMethod:"POST",
                    baseParams:{actcode:treeGrid_cfg.actcode,'asktreedata':'yes'}
                }),

        root: {nodeType: 'async',disable:true},
        rootVisible:false,
        requestMethod:"POST",
        enableDD:true
        ,ddGroup:'NANX_gridDD'
        ,id:TreePanelId
        ,region:'east'
        ,layout:'fit'
        ,width:786
        ,height:360
        ,  tbar:{
            xtype:'buttongroup',
            title:'',
            items:this.getTreeBtns_for_tree_activity(TreePanelId,treeGrid_cfg)
        }
        ,split:true
        ,bodyStyle:'background-color:white;'
        ,border:true
        ,collapsible:true
        ,autoScroll:true
        ,listeners:
         {
            render :function(){
              this.expandAll()
            },
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
        editDelay: 1,
        revertInvalid: false
    });

    te.on('beforestartedit', function(ed, boundEl, value) {
            return true;
    });


    te.on("complete", function(treeEditer,value,startValue){   
          
            var rawdata={}
            rawdata[treeGrid_cfg.tree_text_field]=value 
            rawdata['id']=treeEditer.editNode.attributes.id
            var updateObj={actcode:treeGrid_cfg.actcode,table:treeGrid_cfg.table,
                        rawdata:rawdata
                       } 
            Fb.ajaxPostData(CURD_TREE_UPDATE_DATA_URL,updateObj, function(){  tree.getRootNode().reload();
                tree.expandAll()  }   );

       });   
    return tree;
    this.gridPanel=tree;
}
