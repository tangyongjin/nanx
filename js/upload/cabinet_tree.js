// var treeloader = new Ext.tree.TreeLoader({
//     dataUrl: AJAX_ROOT + 'sinnet_tree',
//     preloadChildren: false,
//     listeners: {
//         beforeload: function(loader, node) {
//             loader.baseParams.category_to_use = node.attributes.category;
//             loader.baseParams.value = node.attributes.value;
//         },
//         scope: this
//     }
// });


// var rootnode = new Ext.tree.AsyncTreeNode({
//     id: '1',
//     category: 'sinnet',
//     value: 'sinnet',
//     iconCls: 'sinnet',
//     text: '光环新网'
// });




// var treepanel = new Ext.tree.TreePanel({
//     rootVisible: true, //隐藏根节点   
//     animate: false, //动画效果   
//     autoScroll: true, //自动滚动   
//     height: 714,
//     containerScroll: true,
//     root: rootnode,
//     loader: treeloader
// });

// var debug_fun = function(node) {
//     var props1 = "";
//     var props2 = "";
//     for (var p in node.attributes) {
//         if ((typeof(node.attributes[p]) != "function") && (typeof(node.attributes[p]) != "object")) {
//             props1 += p + "=>" + node.attributes[p] + "<br/>";
//         }
//     }
//     if (node.parentNode) {
//         var par = node.parentNode;
//         for (var p in par.attributes) {
//             if ((typeof(par.attributes[p]) != "function") && (typeof(par.attributes[p]) != "object")) {
//                 props2 += p + "=>" + par.attributes[p] + "<br/>";
//             }
//         }
//     }

//     var debugwin = new Ext.Window({
//         title: i18n.debuginfo,
//         width: 640,
//         modal: true,
//         height: 500,
//         preventBodyReset: true,
//         html: '<div style="margin:20px;">节点信息<br/>' + props1 + '<br/><hr/>父节点信息<br/>' + props2 + '</div>'
//     });

//     debugwin.show();
// }

// var cabinet_detail = function(node) {



//     var carb={
         
//     "units":[
//             {"value":"1","text":"A"}, 
//             {"value":"2","text":"B"}, 
//             {"value":"3","text":"C"}, 
//             {"value":"4","text":"D"}, 
//             {"value":"5","text":"E"}
//        ]
//     } 

//     var u1=new Ext.Panel({
//         layout: 'absolute',
//         width:400,
//         height:40,
//         bodyStyle:{"background-color":"black"}
//     });

//     var u2=new Ext.Panel({
//         layout: 'absolute',
//         width:400,
//         height:40,
//         html:'<div style="color:red;">AAAA</div>',
//         bodyStyle:{"background-color":"black"}
//     });

//     var cabinet_win = new Ext.Window({
//         title: '机柜详情',
//         width: 940,
//         modal: true,
//         padding : '10px',
//         height: 700,
//         preventBodyReset: true,
//         items:[u1,u2]
//     });

//     cabinet_win.show();
// }



// var rightMenu = new Ext.menu.Menu({
//         items : [
//                 {
//                     id:'rMenu_cabinet_info',
//                     iconCls:'appmnt',
//                     text:'查看机柜详情'
//                 },
//                 {
//                     id:'rMenu_debug',
//                     iconCls:'appmnt',
//                     text:'节点信息'
//                 }

//                 ],
//           listeners: {
//             itemclick: function(item){
//                 if(item.id=='rMenu_debug')       
//                 {
//                         debug_fun(this.contextNode)
//                 }

//                   if(item.id=='rMenu_cabinet_info')       
//                 {
//                         cabinet_detail(this.contextNode)
//                 }
//             }
//         }
//     });


NANXplugin_window.prototype.entry_fun = function() {

    var treeloader = new Ext.tree.TreeLoader({
    dataUrl: AJAX_ROOT + 'sinnet_tree',
    preloadChildren: false,
    listeners: {
        beforeload: function(loader, node) {
            loader.baseParams.category_to_use = node.attributes.category;
            loader.baseParams.value = node.attributes.value;
        },
        scope: this
    }
});


var rootnode = new Ext.tree.AsyncTreeNode({
    id: '1',
    category: 'sinnet',
    value: 'sinnet',
    iconCls: 'sinnet',
    text: '光环新网'
});




var treepanel = new Ext.tree.TreePanel({
    rootVisible: true, //隐藏根节点   
    animate: false, //动画效果   
    autoScroll: true, //自动滚动   
    height: 714,
    containerScroll: true,
    root: rootnode,
    loader: treeloader
});

var debug_fun = function(node) {
    var props1 = "";
    var props2 = "";
    for (var p in node.attributes) {
        if ((typeof(node.attributes[p]) != "function") && (typeof(node.attributes[p]) != "object")) {
            props1 += p + "=>" + node.attributes[p] + "<br/>";
        }
    }
    if (node.parentNode) {
        var par = node.parentNode;
        for (var p in par.attributes) {
            if ((typeof(par.attributes[p]) != "function") && (typeof(par.attributes[p]) != "object")) {
                props2 += p + "=>" + par.attributes[p] + "<br/>";
            }
        }
    }

    var debugwin = new Ext.Window({
        title: i18n.debuginfo,
        width: 640,
        modal: true,
        height: 500,
        preventBodyReset: true,
        html: '<div style="margin:20px;">节点信息<br/>' + props1 + '<br/><hr/>父节点信息<br/>' + props2 + '</div>'
    });

    debugwin.show();
}

var cabinet_detail = function(node) {



    var carb={
         
    "units":[
            {"value":"1","text":"A"}, 
            {"value":"2","text":"B"}, 
            {"value":"3","text":"C"}, 
            {"value":"4","text":"D"}, 
            {"value":"5","text":"E"}
       ]
    } 

    var u1=new Ext.Panel({
        layout: 'absolute',
        width:400,
        height:40,
        bodyStyle:{"background-color":"black"}
    });

    var u2=new Ext.Panel({
        layout: 'absolute',
        width:400,
        height:40,
        html:'<div style="color:red;">AAAA</div>',
        bodyStyle:{"background-color":"black"}
    });

    var cabinet_win = new Ext.Window({
        title: '机柜详情',
        width: 940,
        modal: true,
        padding : '10px',
        height: 700,
        preventBodyReset: true,
        items:[u1,u2]
    });

    cabinet_win.show();
}



var rightMenu = new Ext.menu.Menu({
        items : [
                {
                    id:'rMenu_cabinet_info',
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
                if(item.id=='rMenu_debug')       
                {
                        debug_fun(this.contextNode)
                }

                  if(item.id=='rMenu_cabinet_info')       
                {
                        cabinet_detail(this.contextNode)
                }
            }
        }
    });

    treepanel.on('contextmenu', function(node, event) {
        event.preventDefault();
        rightMenu.contextNode = node
        rightMenu.showAt(event.getXY());
    });

    rootnode.expand(true, true);

    var Tree_win = new Ext.Window({
        autoScroll: true,
        shadow: false,
        cascadeOnFirstShow: 20,
        width: 1200,
        height: 750,
        closeAction:'destroy',
        id: 'cabinet_tree',
        title: 'IDC树',
        items: [treepanel]
    });
    Tree_win.doLayout();
    Tree_win.show();
}