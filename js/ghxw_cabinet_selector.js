Ext.namespace("ghxw.ui");



var global_meta_4=[]

function getPublicMeta4(){
        
        var obj1 = {
            field_e: 'idcName',
            display_cfg: {
                field_c: 'IDC'
            },
            displayField: "idcName",
            editor_cfg: {
                id: 'idcName',
                follow_cfg: [],
                trigger_cfg: {
                    codetable_category_value: null,
                    combo_table: "boss_IDC",
                    filter_field: null,
                    group_id: "0c5axzEriN",
                    level: "1",
                    list_field: "idcName",
                    value_field: "id"
                }
            }
        }

        var obj2 = {
            field_e: 'building',
            display_cfg: {
                field_c: '楼宇'
            },
            displayField: "building",
            editor_cfg: {
                id: 'building',
                follow_cfg: [],
                trigger_cfg: {
                    codetable_category_value: null,
                    combo_table: "boss_IDC_building",
                    filter_field: 'IDCid',
                    group_id: "0c5axzEriN",
                    level: "2",
                    list_field: "buildName",
                    value_field: "id"
                }
            }
        }


        var obj3 = {
            field_e: 'floor',
            display_cfg: {
                field_c: '楼层'
            },
            displayField: "floor",
            editor_cfg: {
                follow_cfg: [],
                id: 'floor',
                trigger_cfg: {
                    codetable_category_value: null,
                    combo_table: "boss_IDC_building_floor",
                    filter_field: 'buildID',
                    group_id: "0c5axzEriN",
                    level: "3",
                    list_field: "floorName",
                    value_field: "id"
                }
            }
        }

        var obj4 = {
            field_e: 'room',
            display_cfg: {
                field_c: '机房'
            },
            displayField: "room",
            editor_cfg: {
                follow_cfg: [],
                id: 'room',
                trigger_cfg: {
                    codetable_category_value: null,
                    combo_table: "boss_IDC_room",
                    filter_field: 'floorID',
                    group_id: "0c5axzEriN",
                    level: "4",
                    list_field: "roomName",
                    value_field: "id"
                }
            }
        }

    return  [obj1, obj2, obj3, obj4]

}

ghxw.ui.CabinetSelector_weak = Ext.extend(Ext.form.TextField, {

    width: 200,
    // height: 400,
    preventDefault: true,
    initComponent: function() {
         ghxw.ui.CabinetSelector_weak.superclass.initComponent.apply(this, arguments);
    },
    
    getValue:function(){
     return  this.getRawValue()  
    },

    popwin: function() {

        var obj5 = {
            field_e: 'cabinet',
            display_cfg: {
                field_c: '弱电柜'
            },
            displayField: "cabinet",
            editor_cfg: {
                follow_cfg: [],
                id: 'cabinet',
                trigger_cfg: {
                    codetable_category_value: null,
                    combo_table: "boss_cabinet_weak",
                    filter_field: 'roomID',
                    group_id: "0c5axzEriN",
                    level: "5",
                    list_field: "cabinetName",
                    value_field: "id"
                }
            }
        }

        
        var triggers=getPublicMeta4();
        triggers.push(obj5)
        var meta5 = Act.prototype.LayoutBuilder(triggers)

        var meta5_form = new Ext.form.FormPanel({
            xtype: 'form',
            id: 'meta5_form',
            width: 430,
            fileMgr: true,
            borderStyle: 'padding-top:3px',
            frame: true,
            labelAlign: 'right',
            defaluts: {
                allowBlank: false,
                width: 200
            },
            items: [meta5]
        });

        var event_source_id=this.id  // 从哪个输入框来的

        var pop_win = new Ext.Window({
            autoScroll: true,
            shadow: false,
            autoDestroy: true,
            cascadeOnFirstShow: 20,
            width: 450,
            height: 350,
            modal: true,
            closable: false,
            closeAction: 'destroy',
            id: 'cab_pop_win',
            title: '选择弱电柜',
            buttons: [
            
            {
                xtype: 'button',
                text: "取消",
                iconCls: 'n_exit',
                handler: function(e, f) {
                     Ext.getCmp('cab_pop_win').close()
                }
            },{
                xtype: 'button',
                text: "确定",
                iconCls: 'n_exit',
                handler: function(e, f) {
                    var field = Ext.getCmp('cabinet');
                    var field_value = field.getValue();
                    if(field_value){

                          Ext.getCmp(event_source_id).setRawValue(field_value)
                          Ext.getCmp(event_source_id).setValue(field_value)
                          Ext.getCmp('cab_pop_win').close()
                    } else
                    {
                          Ext.Msg.alert(i18n.tips, '请选择弱电柜')
                    }
                }
            }
            ],
            items: [meta5_form]
        });

        pop_win.show()

    },

    listeners: {
        render: function(p) {
            console.log(p)
            // Append the Panel to the click handler's argument list.
            p.getEl().on('click', this.popwin.createDelegate(this, [p], true));
        },
        single: true // Remove the listener after first invocation
    }

});


ghxw.ui.CabinetSelector_strong = Ext.extend(Ext.form.TextField, {

    width: 200,
    // height: 400,
    preventDefault: true,
    initComponent: function() {
         
         ghxw.ui.CabinetSelector_strong.superclass.initComponent.apply(this, arguments);
         console.log(this.id)
 
    },
    
    getValue:function(){
     return  this.getRawValue()  
    },

    popwin: function() {

        
        var obj5 = {
            field_e: 'cabinet',
            display_cfg: {
                field_c: '强电柜'
            },
            displayField: "cabinet",
            editor_cfg: {
                follow_cfg: [],
                id: 'cabinet',
                trigger_cfg: {
                    codetable_category_value: null,
                    combo_table: "boss_cabinet_strong",
                    filter_field: 'roomID',
                    group_id: "0c5axzEriN",
                    level: "5",
                    list_field: "cabinetName",
                    value_field: "id"
                }
            }
        }

        var triggers=getPublicMeta4();
        triggers.push(obj5)
        var meta5 = Act.prototype.LayoutBuilder(triggers)

        var meta5_form = new Ext.form.FormPanel({
            xtype: 'form',
            id: 'meta5_form',
            width: 430,
            fileMgr: true,
            borderStyle: 'padding-top:3px',
            frame: true,
            labelAlign: 'right',
            defaluts: {
                allowBlank: false,
                width: 200
            },
            items: [meta5]
        });

        var event_source_id=this.id  // 从哪个输入框来的

        var pop_win = new Ext.Window({
            autoScroll: true,
            shadow: false,
            autoDestroy: true,
            cascadeOnFirstShow: 20,
            width: 450,
            height: 350,
            modal: true,
            closable: false,
            closeAction: 'destroy',
            id: 'cab_pop_win',
            title: '选择强电柜',
            buttons: [
            
            {
                xtype: 'button',
                text: "取消",
                iconCls: 'n_exit',
                handler: function(e, f) {
                     Ext.getCmp('cab_pop_win').close()
                }
            },{
                xtype: 'button',
                text: "确定",
                iconCls: 'n_exit',
                handler: function(e, f) {
                    var field = Ext.getCmp('cabinet');
                    var field_value = field.getValue();
                    if(field_value){

                          Ext.getCmp(event_source_id).setRawValue(field_value)
                          Ext.getCmp(event_source_id).setValue(field_value)
                          Ext.getCmp('cab_pop_win').close()
                    } else
                    {
                          Ext.Msg.alert(i18n.tips, '请选择强电柜')
                    }
                }
            }
            ],
            items: [meta5_form]
        });

        pop_win.show()

    },

    listeners: {
        render: function(p) {
            console.log(p)
            // Append the Panel to the click handler's argument list.
            p.getEl().on('click', this.popwin.createDelegate(this, [p], true));
        },
        single: true // Remove the listener after first invocation
    }

});



ghxw.ui.CabinetSelector_device = Ext.extend(Ext.form.TextField, {

    width: 200,
    // height: 400,
    preventDefault: true,
    initComponent: function() {
         
         ghxw.ui.CabinetSelector_device.superclass.initComponent.apply(this, arguments);
         console.log(this.id)
 
    },
    
    getValue:function(){
     return  this.getRawValue()  
    },

    popwin: function() {
       

        var obj5 = {
            field_e: 'cabinet',
            display_cfg: {
                field_c: '设备机柜'
            },
            displayField: "cabinet",
            editor_cfg: {
                follow_cfg: [],
                id: 'cabinet',
                trigger_cfg: {
                    codetable_category_value: null,
                    combo_table: "boss_cabinet_weak",
                    filter_field: 'roomID',
                    group_id: "0c5axzEriN",
                    level: "5",
                    list_field: "cabinetName",
                    value_field: "id"
                }
            }
        }

        

        var triggers =  getPublicMeta4()
        triggers.push(obj5)

        var meta5 = Act.prototype.LayoutBuilder(triggers)

        var meta5_form = new Ext.form.FormPanel({
            xtype: 'form',
            id: 'meta5_form',
            width: 430,
            fileMgr: true,
            borderStyle: 'padding-top:3px',
            frame: true,
            labelAlign: 'right',
            defaluts: {
                allowBlank: false,
                width: 200
            },
            items: [meta5]
        });

        var event_source_id=this.id  // 从哪个输入框来的

        var pop_win = new Ext.Window({
            autoScroll: true,
            shadow: false,
            autoDestroy: true,
            cascadeOnFirstShow: 20,
            width: 450,
            height: 350,
            modal: true,
            closable: false,
            closeAction: 'destroy',
            id: 'cab_pop_win',
            title: '选择机柜',
            buttons: [
            
            {
                xtype: 'button',
                text: "取消",
                iconCls: 'n_exit',
                handler: function(e, f) {
                     Ext.getCmp('cab_pop_win').close()
                }
            },{
                xtype: 'button',
                text: "确定",
                iconCls: 'n_exit',
                handler: function(e, f) {
                    var field = Ext.getCmp('cabinet');
                    var field_value = field.getValue();
                    if(field_value){

                          Ext.getCmp(event_source_id).setRawValue(field_value)
                          Ext.getCmp(event_source_id).setValue(field_value)
                          Ext.getCmp('cab_pop_win').close()
                    } else
                    {
                          Ext.Msg.alert(i18n.tips, '请选择设备机柜')
                    }
                }
            }
            ],
            items: [meta5_form]
        });

        pop_win.show()

    },

    listeners: {
        render: function(p) {
            console.log(p)
            // Append the Panel to the click handler's argument list.
            p.getEl().on('click', this.popwin.createDelegate(this, [p], true));
        },
        single: true // Remove the listener after first invocation
    }

});


ghxw.ui.CabinetSelector_udf = Ext.extend(Ext.form.TextField, {

    width: 200,
    // height: 400,
    preventDefault: true,
    initComponent: function() {
         
         ghxw.ui.CabinetSelector_udf.superclass.initComponent.apply(this, arguments);
         console.log(this.id)
 
    },
    
    getValue:function(){
     return  this.getRawValue()  
    },

    popwin: function() {
        
        var obj5 = {
            field_e: 'cabinet',
            display_cfg: {
                field_c: '弱电柜'
            },
            displayField: "cabinet",
            editor_cfg: {
                follow_cfg: [],
                id: 'cabinet',
                trigger_cfg: {
                    codetable_category_value: null,
                    combo_table: "boss_cabinet_weak",
                    filter_field: 'roomID',
                    group_id: "0c5axzEriN",
                    level: "5",
                    list_field: "cabinetName",
                    value_field: "id"
                }
            }
        }

        var obj6 = {
            field_e: 'udf',
            display_cfg: {
                field_c: 'UDF架'
            },
            displayField: "udf",
            editor_cfg: {
                follow_cfg: [],
                id: 'udf',
                trigger_cfg: {
                    codetable_category_value: null,
                    combo_table: "boss_cabinet_weak_facility",
                    filter_field: 'cabinetWeekId',
                    group_id: "0c5axzEriN",
                    level: "6",
                    list_field: "deviceName",
                    value_field: "id"
                }
            }
        }

        var triggers =  getPublicMeta4()
        triggers.push(obj5,obj6)

        var meta5 = Act.prototype.LayoutBuilder(triggers)

        var meta5_form = new Ext.form.FormPanel({
            xtype: 'form',
            id: 'meta5_form',
            width: 430,
            fileMgr: true,
            borderStyle: 'padding-top:3px',
            frame: true,
            labelAlign: 'right',
            defaluts: {
                allowBlank: false,
                width: 200
            },
            items: [meta5]
        });

        var event_source_id=this.id  // 从哪个输入框来的

        var pop_win = new Ext.Window({
            autoScroll: true,
            shadow: false,
            autoDestroy: true,
            cascadeOnFirstShow: 20,
            width: 450,
            height: 350,
            modal: true,
            closable: false,
            closeAction: 'destroy',
            id: 'cab_pop_win',
            title: '选择机柜',
            buttons: [
            
            {
                xtype: 'button',
                text: "取消",
                iconCls: 'n_exit',
                handler: function(e, f) {
                     Ext.getCmp('cab_pop_win').close()
                }
            },{
                xtype: 'button',
                text: "确定",
                iconCls: 'n_exit',
                handler: function(e, f) {
                    var field = Ext.getCmp('udf');
                    var field_value = field.getValue();
                    if(field_value){

                          Ext.getCmp(event_source_id).setRawValue(field_value)
                          Ext.getCmp(event_source_id).setValue(field_value)
                          Ext.getCmp('cab_pop_win').close()
                    } else
                    {
                          Ext.Msg.alert(i18n.tips, '请选择配线架')
                    }
                }
            }
            ],
            items: [meta5_form]
        });

        pop_win.show()

    },

    listeners: {
        render: function(p) {
            console.log(p)
            // Append the Panel to the click handler's argument list.
            p.getEl().on('click', this.popwin.createDelegate(this, [p], true));
        },
        single: true // Remove the listener after first invocation
    }

});


Ext.reg('CabinetSelector_device', ghxw.ui.CabinetSelector_device)
Ext.reg('CabinetSelector_strong', ghxw.ui.CabinetSelector_strong)
Ext.reg('CabinetSelector_weak', ghxw.ui.CabinetSelector_weak)
Ext.reg('CabinetSelector_udf',  ghxw.ui.CabinetSelector_udf)