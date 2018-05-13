NANXplugin_window.prototype.entry_fun=function()
{
 
 

       var treeloader=new Ext.tree.TreeLoader({
                        dataUrl:AJAX_ROOT + 'sinnet_tree',
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


        
        var rootnode=new Ext.tree.AsyncTreeNode({   
            id:'1',   
            category:'sinnet',
            value:'',
            iconCls:'sinnet',
            text:'光环新网'   
        });   
           
        var treepanel = new Ext.tree.TreePanel({   
            rootVisible:true,     //隐藏根节点   
            // border:true,          //边框   
            animate:true,         //动画效果   
            autoScroll:true,      //自动滚动   
            height:564,
            containerScroll:true,   
            root:rootnode,        
            loader:treeloader               
        });   

       rootnode.expand(false,false);   

	   var Tree_win=new Ext.Window({
	        autoScroll:true,
	        closeAction:'destroy',
	        stateful:false,
	        constrain:true,
	        shadow:false,
	        cascadeOnFirstShow: 20,
	        width: 900,
	        height: 600,
	        id: 'cabinet_tree',
	        title:'IDC树',
	        items:[treepanel]
	    
	    });
	   
	    Tree_win.doLayout();
	    Tree_win.show();
}



  