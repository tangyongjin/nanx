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
    
    //1、模拟数据结构
    var data = {
        "cabinetName":"10012",
        "roomNumber":"302",
        "cabinetType":"标准机柜",
        "belongUser":"北京三块科技股份有限公司",
        "location_x":"1",
        "location_y":"1",
        "powerArk":"PDU4-3",
        "leaseNature":"整包",
        "equipmentCount":"3",
        "u_count":42,
        "equipmentList":[
            {"id":"10001","equipmentName":"暂无","shelvesDate":"2018-03-28","u_location":19,"u_count":2,"equipmentType":"服务器","model":"DELL R730","IP_address":"10.73.10.60","serialNumber":"29304823"},
            {"id":"10002","equipmentName":"暂无","shelvesDate":"2018-04-12","u_location":30,"u_count":4,"equipmentType":"网络设备","model":"联想 R730","IP_address":"10.73.10.61","serialNumber":"30304823"},
            {"id":"10003","equipmentName":"暂无","shelvesDate":"2018-05-11","u_location":10,"u_count":5,"equipmentType":"其他","model":"苹果 R730","IP_address":"10.73.10.62","serialNumber":"41304823"}
        ]
    } 

    //2、页面展示部分
    var html1 = '<div style="padding-left:40px; padding-right:40px;">';
    html1 +=        '<div style="height:5px;">';
    html1 +=            '<div style="float:left; width:15px; height:5px; background-color:rgba(38, 53, 82, 1);"></div>';
    html1 +=            '<div style="float:right; width:15px; height:5px; background-color:rgba(38, 53, 82, 1);"></div>';
    html1 +=        '</div>';
    html1 +=        '<div style="border: 15px solid rgba(38, 53, 82, 1); padding:8px;">';
    //遍历机柜U数量
    for(var i = 1; i <= data.u_count;){
        //h 1U默认高度，plusSum 循环计数器默认为1，has_equipment 是否匹配到了设备所在坐标
        var h = 15, plusSum=1, has_equipment = false;
        //匹配设备 展示位置
        $(data.equipmentList).each(function(index, item){
            //匹配到了设备坐标
            if(i == item.u_location){
                has_equipment = true;
                //根据设备所占U数量，合并展示
                html1 +=    '<div style="border: 5px solid rgba(38, 53, 82, 1); cursor: pointer; margin-bottom:2px;">';
                for (var j = 0; j < item.u_count; j++) {
                    if(j==(item.u_count-1)){
                        html1 +=    '<div style="width:100%; height:' + h + 'px; background-color:rgba(38, 53, 82, 1);"></div>';
                    } else {
                        html1 +=    '<div style="width:100%; height:' + h + 'px; background-color:rgba(38, 53, 82, 1); margin-bottom:1px;"></div>';
                    }
                }
                html1 +=    '</div>';
                plusSum = item.u_count;
            }
        });
        if(!has_equipment){
            html1 +=        '<div style="width:100%; height:' + h + 'px; background-color:rgba(242, 242, 242, 1); margin-bottom:2px; cursor: pointer;"></div>';
        }
        i=i+plusSum;
    };
    html1 +=        '</div>';
    html1 +=        '<div>';
    html1 +=            '<div style="float:left; width:20%; height:20px; background-color:rgba(38, 53, 82, 1); margin-left:20%;"></div>';
    html1 +=            '<div style="float:left; width:20%; height:20px; background-color:rgba(38, 53, 82, 1); margin-left:20%;"></div>';
    html1 +=        '</div>';
    html1 +=    '</div>';
    var html2 = '<div>→右边容器</div>';
    
    var u1=new Ext.Panel({
        columnWidth:0.5,
        html:html1,
        border:false,
        bodyStyle:'background-color: transparent;'
    });

    var u2=new Ext.Panel({
        columnWidth:0.5,
        height:400,
        html:html2,
        border:false,
        bodyStyle:'background-color: transparent;'
    });

   
    var cabinet_win = new Ext.Window({
        title: '机柜详情',
        width: 940,
        modal: true,
        padding : '10px',
        height: 700,
        autoScroll:true,
        preventBodyReset: true,
        layout:'column',
        items:[u1,u2]
    });

    cabinet_win.show();
}



var rightMenu = new Ext.menu.Menu({
        items : [
                {
                    iconCls:'appmnt',
                    category:'cabinet',
                    text:'查看机柜详情'
                },
                {
                    iconCls:'appmnt',
                    category:'debug',
                    text:'节点信息'
                }

                ],
          listeners: {
            itemclick: function(item){
                if(item.category=='debug')       
                {
                        debug_fun(this.contextNode)
                }

                  if(item.category=='cabinet')       
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
        autoDestroy : true,
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