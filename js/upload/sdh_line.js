NANXplugin_window.prototype.sdh_line_editor = function() {

    var one_col_cfg = {}
    one_col_cfg.detail_btn = false;
    one_col_cfg.displayField = 'subName'
    one_col_cfg.display_cfg = {
        field_c: '客户',
        show_as_pic: 0,
        value: 'custid',
        width: 200
    }

    var trigger_cfg = {
        codetable_category_value: null,
        combo_table: "boss_customer",
        filter_field: null,
        group_id: "EDHXsaUTA2",
        level: "1",
        list_field: "subName",
        value_field: "id"
    }


    one_col_cfg.editor_cfg = {
        follow_cfg: [],
        found: false,
        ini: null,
        trigger_cfg: trigger_cfg,
        rowbasevalue: null
    }

    one_col_cfg.field_e = 'custid'
    one_col_cfg.group_id = 1111;
    one_col_cfg.id = 'custid'
    one_col_cfg.level = 1
    one_col_cfg.nanx_type = 'root'
    one_col_cfg.raw_value = null
    one_col_cfg.value_field = 'id'


    var row = null;
    var readonly_flag = false;
    var whoami_cfg = {
        owner_data_only: null,
        who_is_who: [],
        whoami: 'admin'
    }
    var customer_selector = Fb.getDropdownlistEditor(one_col_cfg, row, readonly_flag, whoami_cfg);

    var sdh_number = {
        fieldLabel: 'SDH号码',
        id: 'sdh_number',
        name: 'sdh_number',
        xtype: 'textfield',
        allowBlank: false
    };




    var addbtn = new Ext.Button({
        text: '增加跳线节点',
        nanx_type: 'trigger_add_button',
        id: 'add_trigger_button',
        style: 'margin-left:106px;margin-bottom:6px;',
        handler: function() {
            {
                var form = this.findParentByType('form');
                var sdh_points = form.find('nanx_type', 'sdh_point');
                console.log(sdh_points)
                var point_id = 'point_' + parseInt(sdh_points.length + 1)
                var loc_id = 'loc_' + parseInt(sdh_points.length + 1)
                
                var point = new ghxw.ui.CabinetSelector_udf({
                    id: point_id,
                    fieldLabel: '配线架',
                    'nanx_type': 'sdh_point',
                    readOnly: true
                });
                
                var location = new Ext.form.TextField({
                id:loc_id,
                fieldLabel:'位置',
                name:'textName'
                });


                var one_row = new Ext.Container({
                    xtype: 'container',
                    width: 500,
                    layout: 'form',
                    items: [{
                        layout: 'column', //定义该元素为布局为列布局方式
                        items: [{
                                columnWidth: .5, //该列占用的宽度，标识为50％
                                layout: 'form',
                                border: false,
                                items: [point]
                            },
                            {
                                columnWidth: .5,
                                layout: 'form',
                                border: false,
                                items: [location ]
                            }
                        ]
                    }]
                })

                form.add(one_row);
                form.doLayout();
            }
        }
    })



    var xadd_form = new Ext.form.FormPanel({
        xtype: 'form',
        id: 'sdh_line_form',
        width: 700,
        fileMgr: true,
        borderStyle: 'padding-top:3px',
        frame: true,
        labelAlign: 'right',
        defaluts: {
            allowBlank: false,
            width: 200
        },
        items: [customer_selector, sdh_number, addbtn]
    });

    var sdh_win = new Ext.Window({
        autoScroll: true,
        shadow: false,
        autoDestroy: true,
        cascadeOnFirstShow: 20,
        width: 800,
        height: 450,
        closeAction: 'destroy',
        id: 'sdh_line_editor',
        title: 'SDH跳线记录',
        items: xadd_form,
        buttons: [{
            xtype: 'button',
            text: "确定",
            iconCls: 'n_exit',
            handler: function(e, f) {
                // var form=
                var fm_array = sdh_win.findByType('form');
                var fm = fm_array[0];
                console.log(fm)
                var fmdata = FormBuilder.getFormData(fm)
                console.log(fmdata)
            }
        }]
    });




    xadd_form.show()
    sdh_win.doLayout();
    sdh_win.show();


}