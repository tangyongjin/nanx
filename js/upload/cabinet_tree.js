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
            height:714,
            containerScroll:true,   
            root:rootnode,        
            loader:treeloader
        });   

        var debug_fun=function(node){
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
                var debugwin=new Ext.Window({
                        title:i18n.debuginfo,
                        width:640,
                        modal: true,
                        height:500,
                        preventBodyReset: true,
                        html:'<div style="margin:20px;">节点信息<br/>'+props1+'<br/><hr/>父节点信息<br/>' + props2 + '</div>'
                });
                debugwin.show();
	    }

        var rightMenu = new Ext.menu.Menu({
                items : [
                        {
                            id:'rMenu_detail',
                            iconCls:'appmnt',
                            text:'查看机柜详情'
                        },
                        {
					        id:'rMenu_debug',
					        iconCls:'appmnt',
                            text:'节点信息'
                        }

                        ],

                  listeners: {
                    itemclick: function(item){
                        item.parentMenu.hide();
                        node=this.contextNode
                        if(item.id=='rMenu_debug')       
                        {
                                debug_fun(node)
                        }


                    }
                }

            });

         treepanel.on('contextmenu', function(node, event) {// 声明菜单类型
       	        	    event.preventDefault();// 阻止浏览器默认右键菜单显示
					    rightMenu.contextNode=node
                        console.log(node.attributes) 
		                rightMenu.showAt(event.getXY());// 取得鼠标点击坐标，展示菜单
            });

       rootnode.expand(false,false);   

	   var Tree_win=new Ext.Window({
	        autoScroll:true,
	        closeAction:'destroy',
	        stateful:false,
	        constrain:true,
	        shadow:false,
	        cascadeOnFirstShow: 20,
	        width: 1200,
	        height: 750,
	        id: 'cabinet_tree',
	        title:'IDC树',
	        items:[treepanel]
	    });
	    Tree_win.doLayout();
	    Tree_win.show();
}



  