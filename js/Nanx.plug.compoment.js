
Ext.ns("Util");

Util.DropdownCompoment = Ext.extend(Ext.Container, {
    build_header: function(headers) {

        var head_tb = "<table><tr>";
        for (var i = 0; i < headers.length; i++) {
            head_tb += '<td width=140px>' + i18n[headers[i]] + '</td>';
        }
        head_tb += "</tr></table>";
        return new Ext.Container({
            width:800,
            html: head_tb
        });
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
                Ext.each(data_from_json, function(meta_item) {
                    var newline = that.create_comboxs_line(config.item, config.node, meta_item)
                    backend_active_form.insert(12, newline);
                    backend_active_form.doLayout();
                });
            }
        });
    },


    create_comboxs_line: function(item, node, meta_data) {

        var backend_active_form = Ext.getCmp('back_opform');
        trigger_rows = backend_active_form.find('nanx_type', 'trigger_row');
        trigger_rows_count = trigger_rows.length + 1;
        item.serial = trigger_rows_count;
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
            var sub_item = FormBuilder.getBackendFormItem(fixed_sub_item_cfg, node);
            subitems.push(sub_item);

        }

        var field_link = new Ext.Container({
            'id': 'followRow_' + Ext.id(),
            'layout': 'table',
            'nanx_type': 'trigger_row',
            'style': '{margin-left:105px;}',
            items: subitems
        });
        return field_link;
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
         fieldLabel:i18n.group_item,
         layout:'table',
         items:[button,header],
         'style': '{margin-left:105px;}',
        });
         
        console.log(f)

        Util.DropdownCompoment.superclass.constructor.apply(
            this, [{
                width: config.width,
                height: 40,
                layout: 'table',
                items:[f]
            }]
        );
    }
});

Ext.reg('DropdownCompoment', Util.DropdownCompoment);