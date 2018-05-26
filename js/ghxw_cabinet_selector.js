/*
usage:

<script type="text/javascript" charset="utf-8">
		Ext.onReady(function() {
			
			var grid = new ghxw.ui.NameGrid({
				renderTo: 'grid'
			});
		});
	</script>

	*/
Ext.namespace("ghxw.ui");


ghxw.ui.CabinetSelector = Ext.extend(Ext.form.TextField, {

    width: 200,
    // height: 400,
    preventDefault: true,
    initComponent: function() {
         console.log(this.id)
         this.setRawValue('23')
         this.setValue('11-22-33888')
         ghxw.ui.CabinetSelector.superclass.initComponent.apply(this, arguments);
         console.log(this.id)
 
    },
    
    handlePanelClick: function() {
        var obj1 = {
            field_e: 'idcName',
            display_cfg: {
                field_c: 'idcName'
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
                field_c: 'building'
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
                field_c: 'floor'
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
                field_c: 'room'
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

        var obj5 = {
            field_e: 'cabinet',
            display_cfg: {
                field_c: 'cabinet'
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


        var triggers = [obj1, obj2, obj3, obj4, obj5]
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

        console.log(this.id)
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
            buttons: [{
                xtype: 'button',
                text: "确定",
                iconCls: 'n_exit',
                handler: function(e, f) {

                    var field = Ext.getCmp('cabinet');
                    var field_value = field.getValue();
                    console.log(field_value)
                    Ext.getCmp('cab_pop_win').close()

                }
            }],
            items: [meta5_form]
        });

        pop_win.show()

    },

    listeners: {
        render: function(p) {
            console.log(p)
            // Append the Panel to the click handler's argument list.
            p.getEl().on('click', this.handlePanelClick.createDelegate(this, [p], true));
        },
        single: true // Remove the listener after first invocation
    }

});




// Ext.reg('namegrid', ghxw.ui.NameGrid)
Ext.reg('CabinetSelector', ghxw.ui.CabinetSelector)