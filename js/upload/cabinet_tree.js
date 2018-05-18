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
        "cabinetName":"10012",                          //机柜名称
        "roomNumber":"302",                             //所在房间
        "cabinetType":"标准机柜",                         //机柜类型
        "belongUser":"北京三块科技股份有限公司",            //所属客户
        "location_x":"1",                               //位置X
        "location_y":"1",                               //位置Y
        "leaseNature":"整包",                            //租赁性质
        "equipmentCount":"3",                            //设备总数
        "is_own_bring":"否",                             //是否自带
        "u_count":42,
        "equipmentList":[
            {
                "id":"10001",                           //设备ID
                "equipmentName":"暂无",                  //设备名称
                "shelvesDate":"2018-03-28",             //上架日期
                "u_location":19,                        //所在位置（第几U）
                "u_count":2,                            //所占容量（几U）
                "equipmentType":"服务器",                //设备类型
                "model":"DELL R730",                    //设备型号
                "IP_address":"10.73.10.60",             //IP地址
                "serialNumber":"29304823"               //主机编号
            },
            {"id":"10002","equipmentName":"暂无","shelvesDate":"2018-04-12","u_location":30,"u_count":4,"equipmentType":"网络设备","model":"联想 R730","IP_address":"10.73.10.61","serialNumber":"30304823"},
            {"id":"10003","equipmentName":"暂无","shelvesDate":"2018-05-11","u_location":10,"u_count":5,"equipmentType":"其他","model":"苹果 R730","IP_address":"10.73.10.62","serialNumber":"41304823"}
        ]
    } 

    //2、页面展示部分
    //左边容器 机柜结构
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
                html1 +=    '<div id="' + item.id + '" class="equipment-item" style="height:' + (h*item.u_count) + 'px;border: 2px solid rgba(38, 53, 82, 1); cursor: pointer; padding:5px; margin-bottom:2px;border-radius:8px;">';
                html1 +=        '<strong>设备名称：</strong>' + item.equipmentName + '，<strong>容量：</strong>' + item.u_count + 'U（' + i + '-' + (i+item.u_count-1) + '）' ;
                html1 +=    '</div>';
                plusSum = item.u_count;//存在设备，循环U数+设备所占U数
            }
        });
        //没有设备 生成空U
        if(!has_equipment){
            html1 +=        '<div style="width:100%; height:' + h + 'px; background-color:rgba(242, 242, 242, 1); margin-bottom:2px;">' + i + '</div>';
        }
        i=i+plusSum;
    };
    html1 +=        '</div>';
    html1 +=        '<div>';
    html1 +=            '<div style="float:left; width:20%; height:20px; background-color:rgba(38, 53, 82, 1); margin-left:20%;"></div>';
    html1 +=            '<div style="float:left; width:20%; height:20px; background-color:rgba(38, 53, 82, 1); margin-left:20%;"></div>';
    html1 +=        '</div>';
    html1 +=    '</div>';

    //右边容器 机柜详情和设备详情
    var html2 = '<div style="margin:20px;">';
    html2 +=        '<div>';
    html2 +=            '<div style="margin-bottom:10px">';
    html2 +=                '<h2 style="color:#676a6c;">机柜信息</h2>';
    html2 +=            '</div>';
    html2 +=            '<div>';
    html2 +=                '<ul style="list-style:none;margin:5px;">';
    html2 +=                    '<li><strong>机柜类型：</strong>' + data.cabinetType + '</li>';
    html2 +=                    '<li><strong>机柜名称：</strong>' + data.cabinetName + '</li>';
    html2 +=                    '<li><strong>所在房间：</strong>' + data.roomNumber + '</li>';
    html2 +=                    '<li><strong>机柜位置：</strong>' + data.location_x + '排*' + data.location_y + '列</li>';
    html2 +=                    '<li><strong>租赁性质：</strong>' + data.leaseNature + '</li>';
    html2 +=                    '<li><strong>设备总数：</strong>' + data.equipmentCount + '</li>';
    html2 +=                    '<li><strong>是否自带：</strong>' + data.is_own_bring + '</li>';
    html2 +=                '</ul>';
    html2 +=            '</div>';
    html2 +=        '</div>';
    html2 +=    '</div>';
    html2 +=    '<div style="margin:20px;">';
    html2 +=        '<div>';
    html2 +=            '<div style="margin-bottom:10px">';
    html2 +=                '<h2 style="color:#676a6c;">设备信息</h2>';
    html2 +=            '</div>';
    html2 +=            '<div id="equipment-detail">';
    html2 +=                '请选择左边机柜中的设备查看详情';
    html2 +=            '</div>';
    html2 +=        '</div>';
    html2 +=    '</div>';
    
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

    //为机柜中的设备  添加点击事件
    $(".equipment-item").click(function(){
        var equipmentItem = null;
        var id = $(this).attr("id");
        $.each(data.equipmentList, function(index, item){
            if(id == item.id){
                equipmentItem = item;
                return;
            }
        });
        if(equipmentItem != null){
            $("#equipment-detail").html("");
            var html = '<ul style="list-style:none;margin:5px;">';
            html +=         '<li><strong>上架日期：</strong>' + equipmentItem.shelvesDate + '</li>';
            html +=         '<li><strong>主机位置：</strong>' + equipmentItem.u_location + '</li>';
            html +=         '<li><strong>主机名称：</strong>' + equipmentItem.equipmentName + '</li>';
            html +=         '<li><strong>主机编号：</strong>' + equipmentItem.serialNumber + '</li>';
            html +=         '<li><strong>主机类型：</strong>' + equipmentItem.equipmentType + '</li>';
            html +=         '<li><strong>设备型号：</strong>' + equipmentItem.model + '</li>';
            html +=         '<li><strong>IP地址：</strong>' + equipmentItem.IP_address + '</li>';
            html +=    '</ul>';
            $("#equipment-detail").html(html);
            //选中样式
            $(".equipment-item").css({"border-color":"rgba(38, 53, 82, 1)"});
            $(this).css({"border-color":"#1ab394"});
        }
    });
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