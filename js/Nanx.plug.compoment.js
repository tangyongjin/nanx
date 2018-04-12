Ext.ns("Util");

Util.DropdownCompoment = Ext.extend(Ext.Container, {

    build_header: function(headers) {

        var head_tb = "<table><tr>";
        for (var i = 0; i < headers.length; i++) {
            head_tb += '<td width=140px>' + i18n[headers[i]] + '</td>';
        }
        head_tb += "</tr></table>";
        return new Ext.Container({
            width: 800,
            html: head_tb
        });
    },


    create_follow_line: function(cfg) {

        var left_tree_cfg = {
            item_type: 'combo_list',
            id: 'base_field' + Ext.id(),
            value: cfg.base_table,
            ini: cfg.base_table,
            nanx_type: 'root',
            level: 1,
            displayField: 'text',
            valueField: 'value',
            category_to_use: 'biz_cols'
        }

        var ds_l = Fb.buildTriggerStore(left_tree_cfg);
        var xxx_combo = COMBOX.getBasicCombo(left_tree_cfg, ds_l);

        var right_tree_cfg = {
            item_type: 'combo_list',
            id: 'refer_field' + Ext.id(),
            nanx_type: 'slave',
            level: 2,
            group_id: 'follow_gp',
            value: cfg.refer_table,
            displayField: 'text',
            valueField: 'value',
            ini: cfg.right_ini,
            category_to_use: 'biz_cols'
        }

        var ds_r = Fb.buildTriggerStore(right_tree_cfg);
        var yyy_combo = COMBOX.getBasicCombo(right_tree_cfg, ds_r);


        var btn_del = new Ext.Button({
            text: i18n.remove,
            handler: function() {
                this.ownerCt.ownerCt.remove(this.ownerCt);
            }
        });

        var equ = new Ext.BoxComponent({
            autoEl: {
                tag: 'div',
                html: ' = '
            }
        });

        var field_link = new Ext.Container({
            'id': 'follow_row_' + Ext.id(),
            'owner_row_id': cfg.row_serial,
            'layout': 'table',
            'nanx_type': 'follow_row',
            'style': '{margin-left:62px;margin-top:2px;}',
            'items': [btn_del, xxx_combo, equ, yyy_combo],
            getfollowValue: function() {
                alert('alert getfollowValue')
                var obj = {}
                obj.owner_row_id = cfg.row_serial;
                obj.base_table_follow_field = xxx_combo.getValue()
                obj.combo_table_follow_field = yyy_combo.getValue()
                console.log(obj)
                return obj

            }
        });



        return field_link;
    },


    create_follow_header: function(row_serial) {
        var that = this
        var follow_add = new Ext.Button({
            text: i18n.add,
            handler: function() {
                var combo_table_id = 'combo_table_' + row_serial
                var combo_in_this_group = Ext.getCmp(combo_table_id)
                if (combo_in_this_group) {
                    var ref_tab = combo_in_this_group.getValue();
                }


                if (!Ext.isEmpty(ref_tab)) {
                    var newline = that.create_follow_line({
                        'row_serial': row_serial,
                        'base_table': that.base_table,
                        'refer_table': ref_tab
                    });

                    this.ownerCt.ownerCt.insert(12, newline);
                    this.ownerCt.ownerCt.doLayout();
                } else {
                    Ext.Msg.alert(i18n.error, '请先选择联动表格');
                }
            }
        })

        var lb0 = new Ext.Container({
            'html': '  ' + i18n.follow_col + '&nbsp;&nbsp;&nbsp;&nbsp;'
        });

        var lb1 = new Ext.Container({
            'html': '  ' + i18n.base_table_col
        });

        var lb2 = new Ext.Container({
            'html': '<span style="margin-left:68px;">= ' + i18n.reference_table_col + '</span>'
        });

        var f = new Ext.Container({
            'fieldLabel': i18n.follow_col,
            'layout': 'table',
            items: [lb0, follow_add, lb1, lb2]
        });
        return f;
    },


    getFollowPanel: function(serial) {
        console.log(serial)
        var header = this.create_follow_header(serial)
        var f = new Ext.Container({
            width: 590,
            border: 1,
            height: 'auto',
            nanx_type: 'follow_panel',
            layout: 'auto',
            style: {
                'margin': '2px 0 6px 105px',
                'padding': '6px 0 6px 0',
                borderColor: '#F7F7F7',
                borderStyle: 'solid',
                'min-height': '40px',
                borderWidth: '1px'
            },

            items: [header]
        });
        return f;
    },


    callback_setvalue: function(btn, config) {

        var that = this
        var json = {
            'value': config.node.attributes.value,
            'hostby': config.node.attributes.hostby
        }
        Ext.Ajax.request({
            url: AJAX_ROOT + config.callback_set_url,
            jsonData: Ext.encode(json),

            callback: function(options, success, response) {
                var ret_json = Ext.util.JSON.decode(response.responseText);
                var key_used = 'server_resp'
                var data_from_json = ret_json[key_used];
                var backend_active_form = Ext.getCmp('back_opform');
                var serial = 1
                Ext.each(data_from_json, function(meta_item) {
                    config.item.serial = serial
                    var newline = that.create_comboxs_line(config.item, config.node, meta_item)
                    serial = serial + 1
                    backend_active_form.insert(12, newline);
                    backend_active_form.doLayout();
                });
            }
        });
    },


    create_comboxs_line: function(item, node, meta_data) {

        var that = this
        var backend_active_form = Ext.getCmp('back_opform');

        var btn_del = new Ext.Button({
            text: i18n.remove,
            id: Ext.id(),
            serial: item.serial,
            handler: function() {

                var form = this.findParentByType('form');
                var tr = form.find('nanx_type', 'trigger_row');
                var current_counter = tr.length;
                if (this.serial == current_counter) //只能删除最后一行
                {

                    var follow_panel = this.ownerCt.ownerCt.find('nanx_type', 'follow_panel')
                    console.log(follow_panel)
                    if (follow_panel.length > 0) {
                        this.ownerCt.ownerCt.remove(follow_panel[0]);
                    }
                    this.ownerCt.ownerCt.remove(this.ownerCt);
                }
            }
        });


        var subitems = [];
        subitems.push(btn_del);
        for (var i = 0; i < item.horizon_items.length; i++) {

            var sub_item_cfg = item.horizon_items[i];
            sub_item_cfg.serial = item.serial;

            fixed_sub_item_cfg = Fb.preProcessNodeAtt(sub_item_cfg, node);
            fixed_sub_item_cfg.using_serial = true;

            if (meta_data) {
                fixed_sub_item_cfg = Fb.set_trigger_line_ini(fixed_sub_item_cfg, meta_data);
            }


            if (fixed_sub_item_cfg.item_type == 'combo_list') {
                fixed_sub_item_cfg.displayField = 'text'
                fixed_sub_item_cfg.valueField = 'value'
                var _store = Fb.buildTriggerStore(fixed_sub_item_cfg);
                var sub_item = COMBOX.getBasicCombo(fixed_sub_item_cfg, _store);
            }

            if (fixed_sub_item_cfg.item_type == 'combo_group') {
                var sub_item = COMBOX.getComboGroup(fixed_sub_item_cfg)
            }

            if (fixed_sub_item_cfg.item_type == 'field') {
                var sub_item = FormBuilder.getCommonField(fixed_sub_item_cfg)
            }
            subitems.push(sub_item);

        }


        var field_link = new Ext.Container({
            'id': 'followRow_' + Ext.id(),
            'layout': 'table',
            width: 950,
            'nanx_type': 'trigger_row',
            'style': '{margin-left:105px;}',
            items: subitems
        });

        var joined = new Ext.Container({
            'nanx_type': 'joined',
            items: item.using_follow ? [field_link, that.getFollowPanel(item.serial)] : [field_link]
        })


        return joined;
    },


    build_button: function(config, item, node) {
        var that = this

        console.log(node.attributes.category)
        var addbtn = new Ext.Button({
            text: i18n.add_trigger,
            nanx_type: 'trigger_add_button',
            id: 'add_trigger_button',
            handler: function() {
                {
                    var form = this.findParentByType('form');
                    var trigger_rows = form.find('nanx_type', 'trigger_row');
                    item.serial = trigger_rows.length + 1;
                    var newline = that.create_comboxs_line(item, node);
                    form.insert(12, newline);
                    form.doLayout();
                }
            }
        })

        addbtn.addListener('render', that.callback_setvalue.createDelegate(this, [config], true));
        return addbtn
    },

    constructor: function(config) {
        var headers = config.headers;
        var item = config.item;
        var node = config.node;
        var callback_set_url = config.callback_set_url
        var callback_set_json_key = config.callback_set_json_key
        var header = this.build_header(headers)
        var button = this.build_button(config, item, node)

        var f = new Ext.Container({
            fieldLabel: i18n.group_item,
            layout: 'table',
            items: [button, header],
            'style': '{margin-left:105px;}',
        });

        console.log(f)

        Util.DropdownCompoment.superclass.constructor.apply(
            this, [{
                base_table: config.node.attributes.value,
                width: config.width,
                height: 40,
                layout: 'table',
                items: [f]
            }]
        );
    }
});

Ext.reg('DropdownCompoment', Util.DropdownCompoment);