
Ext.ns('Fb');
var Fb = {};
var WaitMask = {
    mask: null,
    'ajaxinfo': i18n.mask_text,
    'uploadinfo': i18n.upload_wait_text,
    show: function(type) {
        this.mask = new Ext.LoadMask(Ext.getBody(), {
            msg: type ? this.uploadinfo : this.ajaxinfo
        })
        document.body.style.cursor = "wait";
        this.mask.show();
    },
    hide: function() {
        document.body.style.cursor = "auto";
        this.mask.hide();
        return true;
    }
}




Ext.data.Node.prototype.getJson = function(node) {
    // Should deep copy so we don't affect the tree
    var json = this.attributes;
    delete json['loader'];

    json.children = [];
    for (var i = 0; i < node.childNodes.length; i++) {
        json.children.push(node.childNodes[i].getJson(node.childNodes[i]))
    }
    return json;
}


Fb.getDetailBtn = function(combo_table) {
    var btn_detail = new Ext.Button({
        text: i18n.detail_with_dot,
        handler: function() {
            var combox = this.ownerCt.items.items[0];
            if (!combox.getValue()) {
                return;
            }
            new Act({
                code: 'NANX_TBL_DATA',
                table: combo_table,
                filter_field: combox.valueField,
                filter_value: combox.getValue(),
                tbar_type: 'hide',
                win_size_height: 150,
                wintitle: i18n.detail + ':' + combox.getRawValue(),
                showwhere: 'autowin',
                transfer: true
            });
        }
    });
    return btn_detail;
}



Fb.getDirectComboEditor = function(jsonarray) {

    return {
        xtype: 'combo',
        store: new Ext.data.JsonStore({
            fields: ['code', 'value'],
            data: jsonarray
        }),
        displayField: 'value',
        editable: false,
        valueField: 'code',
        mode: 'local',
        typeAhead: true,
        triggerAction: 'all',
        lazyRender: true
    };

}


Fb.getHtmlEditor = function(id, label, value) {
    var htmlEditor = {
        xtype: "StarHtmleditor",
        fieldLabel: label,
        id: id,
        value: value,
        width: 680
    };
    return htmlEditor;
}




Fb.getDateTypeEditor = function(oneFieldCfg, readonly_flag, datetype) {
    var dateEditor = {
        fieldLabel: oneFieldCfg['display_cfg'].field_c,
        id: oneFieldCfg['field_e'],
        width: 200,
        height: 25,
        value: oneFieldCfg.editor_cfg.ini,
        readOnly: readonly_flag,
        blankText: i18n.not_allow_blank
    }
    if (datetype == 'date') {
        var xtype = 'datefield';
        var dateformat = 'Y-m-d';
    }
    if (datetype == 'datetime') {
        var xtype = 'datetimefield';
    }
    if (datetype == 'time') {
        var xtype = 'timepickerfield';
    }
    dateEditor.xtype = xtype;
    if (typeof dateformat !== 'undefined') {
        dateEditor.format = dateformat;
    }
    return dateEditor;
}


Fb.getTextAreaEditor = function(oneFieldCfg, readonly_flag) {
    textAreaEditor = {
        fieldLabel: oneFieldCfg['display_cfg'].field_c,
        id: oneFieldCfg['field_e'],
        width: 660,
        height: 60,
        value: oneFieldCfg.editor_cfg.default_v,
        xtype: 'textarea',
        readOnly: readonly_flag,
        blankText: i18n.not_allow_blank
    }
    return textAreaEditor;
}




Fb.set_cfg_callback_value = function(itemcfg, backdata) {
    itemcfg_setted = DeepClone(itemcfg);
    if (itemcfg_setted.item_type == 'combo_group') {
        var idname = itemcfg_setted.root_combox.id;
        itemcfg_setted.root_combox.ini = backdata[idname];
        for (var i = 0; i < itemcfg_setted.slave_comboxes.length; i++) {
            idname = itemcfg_setted.slave_comboxes[i].id;

            itemcfg_setted.slave_comboxes[i].ini = backdata[idname]
        };
    } else {
        var idname = itemcfg_setted.id
        itemcfg_setted.ini = backdata[idname]
    }
    return itemcfg_setted;

}


Fb.set_trigger_line_ini = function(itemcfg, backdata) {
    itemcfg_setted = DeepClone(itemcfg);
    if (itemcfg_setted.item_type == 'combo_group') {
        var idname = itemcfg_setted.root_combox.id;
        itemcfg_setted.root_combox.ini = backdata[idname];
        for (var i = 0; i < itemcfg_setted.slave_comboxes.length; i++) {
            idname = itemcfg_setted.slave_comboxes[i].id;

            itemcfg_setted.slave_comboxes[i].ini = backdata[idname]
        };
    } else {
        var idname = itemcfg_setted.id
        itemcfg_setted.ini = backdata[idname]
    }
    return itemcfg_setted;

}




Fb.split2col = function(pleft, pright, cfg, directData) {
    if (directData) {
        var ds_left = pleft;
        var ds_right = pright;
    } else {
        var ds_cfg_left = {
            autoLoad: true,
            proxy: new Ext.data.HttpProxy({
                url: TREE_URL
            }),
            root: 'server_resp_left',
            fields: ['value', 'text'],
            baseParams: pleft
        };
        var ds_cfg_right = {};
        Ext.apply(ds_cfg_right, ds_cfg_left);
        ds_cfg_right.root = 'server_resp_right';
        var ds_left = (pleft == null) ? new Ext.data.ArrayStore() : new Ext.data.JsonStore(ds_cfg_left);
        var ds_right = (pright.data == false) ? new Ext.data.ArrayStore() : new Ext.data.JsonStore(ds_cfg_right);
    }
    var multiselector = {
        items: [{
            html: '<br/>' + cfg.label + ':'
        }, {
            bodyStyle: "margin-top:10px;",
            xtype: "itemselector",
            name: cfg.id,
            id: cfg.id,
            right_forced_one: pright.right_forced_one,
            imagePath: "../../jslib/ext/ux/images/",
            border: false,
            multiselects: [{
                id: 'leftList',
                width: 225,
                height: 300,
                displayField: "text",
                valueField: "value",
                store: ds_left
            }, {
                id: 'rightList',
                width: 225,
                height: 300,
                displayField: "text",
                valueField: "value",
                store: ds_right
            }],
            listeners: {
                change: function() {
                    if (!this.right_forced_one) {
                        return;
                    }
                    ds_right.suspendEvents();
                    var items = ds_right.data.items;
                    if (items.length > 0) {
                        var REC_LAST = items.pop();
                        ds_right.removeAll();
                        ds_right.add(REC_LAST);
                        ds_left.add(items);
                        var r = Ext.getCmp('rightList');
                        r.view.refresh();
                        this.hiddenField.dom.value = REC_LAST.data.value;
                    }
                    ds_right.resumeEvents();
                }
            }
        }]
    };
    return multiselector;
};




Fb.buildTriggerStore = function(treecfg) {
    baseParaObj = {};
    baseParaObj.category_to_use = treecfg.category_to_use;
    baseParaObj.value = treecfg.value;


    var id = treecfg.id ? treecfg.id : Ext.id();
    if (treecfg.hasOwnProperty('serial')) {
        id = id + '_' + treecfg.serial;
    }

    var ds_auto = treecfg.hasOwnProperty('ds_auto') ? treecfg['ds_auto'] : true;
    var store = new Ext.data.JsonStore({
        proxy: new Ext.data.HttpProxy({
            url: TREE_URL,
            method: 'POST'
        }),
        storeId: 'store_' + id,
        autoLoad: ds_auto,
        displayField: 'text',
        valueField: 'value',
        fields: ['value', 'text'],
        baseParams: baseParaObj,
        root: 'server_resp'
    });
    return store;
}


Fb.getInheritEditor = function(oneFieldCfg, rowOriginalValue) {

    inheritEditor = {
        xtype: 'textfield',
        fieldLabel: oneFieldCfg['display_cfg'].field_c,
        id: oneFieldCfg['field_e'],
        width: 300,
        height: 25,
        value: rowOriginalValue,
        readOnly: true,
        blankText: i18n.not_allow_blank
    }
    return inheritEditor;
}

Fb.getFieldWidth = function(cfg) {
    var f_width = 300;
    if (cfg.display_cfg.field_width == null) {
        f_width = 300;
    } else {
        f_width = cfg.display_cfg.field_width;
    }
    return f_width * 1.0;
}


Fb.leaving_field = function(master_act, form) {

    for (var i = 0; i < master_act.colsCfg.length; i++) {
        var cal_string = master_act.colsCfg[i].editor_cfg.cal_string;
        if (cal_string) {

            var field_value_list = FormBuilder.getFormData(form)

            for (var obj_key in field_value_list) {

                var strx = 'var ' + obj_key + '=field_value_list.' + obj_key;
                eval(strx);
            }

            var field_to_set = master_act.colsCfg[i].field_e;
            eval_string = 'field_value_list.' + master_act.colsCfg[i].field_e + '=' + cal_string;
            eval(eval_string);
            Ext.getCmp(field_to_set).setValue(field_value_list[field_to_set]);
        }

    }
}

Fb.checkIdHidden = function(oneFieldCfg) {
    if ((oneFieldCfg.field_e == 'id') && (oneFieldCfg.display_cfg.idhidden)) {
        return true;
    } else {
        return false;
    }
}


Fb.getDefaultEditor = function(master_act, oneFieldCfg, readonly_flag) {

    _hide = Fb.checkIdHidden(oneFieldCfg);
    var that = this;
    var f_width = Fb.getFieldWidth(oneFieldCfg);
    var defaultEditor = {
        fieldLabel: oneFieldCfg['display_cfg'].field_c,
        id: oneFieldCfg['field_e'],
        width: f_width,
        height: 25,
        value: oneFieldCfg.editor_cfg.ini,
        readOnly: readonly_flag,
        hidden: _hide,
        xtype: 'textfield',
        blankText: i18n.not_allow_blank,
        onBlur: function(e, f, g, h) {
            that.leaving_field(master_act, this.findParentByType('form'));
        },
        onChange: function(e, f, g, h) {

            that.leaving_field(master_act, this.findParentByType('form'));
        },
        onFocus: function(e, f, g, h) {

            that.leaving_field(master_act, this.findParentByType('form'));
        }
    }
    return defaultEditor;
}

Fb.getTriggerWhoIsWho = function(one_col_cfg, whoami_cfg) {
   
     

    var trigger_cfg = one_col_cfg.editor_cfg.trigger_cfg;
    var trigger_table = trigger_cfg.combo_table;
    var level = trigger_cfg.level;
    var who_is_who = whoami_cfg.who_is_who;
    var login_user = whoami_cfg.whoami;
    var connected_value = null;
    for (var i = 0; i < who_is_who.length; i++) {
        if (who_is_who[i].inner_table == trigger_table && who_is_who[i].user == login_user) {
            connected_value = who_is_who[i].inner_table_value;
            break;
        }
    };
    return connected_value;
}


Fb.getDropdownOption = function(one_col_cfg) {
 

    var fields = [one_col_cfg.editor_cfg.trigger_cfg.list_field, one_col_cfg.editor_cfg.trigger_cfg.value_field];
    var table = one_col_cfg.editor_cfg.trigger_cfg.combo_table;
    var filter_cfg = {
        filter_field: one_col_cfg.editor_cfg.trigger_cfg.filter_field
    };

    var getDropdownOption={
        'table': table,
        'fields': fields,
        'filter_cfg': filter_cfg
    }
   
    return getDropdownOption;

}


Fb.getColInitValueAndRawValue = function(one_col_cfg, row, whoami_cfg) {

    var _ini = '';
    var _raw = '';
    var connected_value = this.getTriggerWhoIsWho(one_col_cfg, whoami_cfg);
    if (connected_value) {
        readonly_flag = true;
    }
    ghost_field = 'ghost_' + one_col_cfg['field_e'];

    if (row) { // edit mode
        _ini = row.json[ghost_field];
        _raw = row.data[one_col_cfg['field_e']]
    } else {
        if (connected_value) {
            _ini = connected_value;
            _raw = null;
        } else {
            _ini = one_col_cfg.editor_cfg.default_v;
            _raw = null;
        }
    }
   
    return {
        '_ini': _ini,
        '_raw_value': _raw
    }
}

//下拉字段
Fb.getDropdownlistEditor = function(one_col_cfg, row, readonly_flag, whoami_cfg) {

    
    console.log('下拉:',one_col_cfg)
    var row_value = this.getColInitValueAndRawValue(one_col_cfg, row, whoami_cfg)
    one_col_cfg.ini = row_value._ini
    one_col_cfg.raw_value = row_value._raw_value


    one_col_cfg.id = one_col_cfg.field_e;
    one_col_cfg.valueField = one_col_cfg.editor_cfg.trigger_cfg.value_field;
    one_col_cfg.displayField = one_col_cfg.editor_cfg.trigger_cfg.list_field;
    one_col_cfg.level = one_col_cfg.editor_cfg.trigger_cfg.level;

    if (one_col_cfg.editor_cfg.trigger_cfg.level == 1) {
        one_col_cfg.nanx_type = 'root';
    } else {
        one_col_cfg.nanx_type = 'slave';
    }
    one_col_cfg.group_id = one_col_cfg.editor_cfg.trigger_cfg.group_id;
    
    // one_col_cfg.detail_btn = true;

    var dropdownOption = this.getDropdownOption(one_col_cfg)


    var codetable_filter_cfg = {}
    // codetable 增加送给后台的筛选配置

    if (dropdownOption.table == 'nanx_code_table') {
        codetable_filter_cfg = {
            codetable_category_value: one_col_cfg.editor_cfg.trigger_cfg.codetable_category_value
        }
    }

    var combo_store = Act.prototype.getStoreByTableAndField(dropdownOption.table, dropdownOption.fields, dropdownOption.filter_cfg, codetable_filter_cfg);
    return COMBOX.getBasicCombo(one_col_cfg, combo_store, readonly_flag);
}


Fb.getWhoami = function() {
    var whoami = document.getElementById('whoami');
    if (!whoami) {
        whoami = 'admin';
    } else {
        whoami = whoami.innerHTML;
    }
    return whoami;
}

Fb.determineOriginalValue = function(op_type, editCfg, row) {


    var rowOriginalValue = null;
    if (op_type == 'update') {
        rowOriginalValue = row.get(editCfg['field_e']);
    }
    if ((op_type == 'add') && (editCfg.editor_cfg.default_v)) {
        rowOriginalValue = editCfg.editor_cfg.default_v;

        if (editCfg.editor_cfg.default_v == 'date') {
            rowOriginalValue = getDate();
        }

        if (editCfg.editor_cfg.default_v == 'datetime') {
            rowOriginalValue = new Date();
        }
    }


    if (editCfg.editor_cfg.is_produce_col == 1) {
        whoami = this.getWhoami();
        if (op_type == 'add') {

            rowOriginalValue = whoami;

        }

        if (op_type == 'update') {
            rowOriginalValue = row.get(editCfg['field_e']);
            if (!rowOriginalValue.length > 0) {
                rowOriginalValue = whoami;
            }
        }

        if (op_type == 'batchUpdate') {
            rowOriginalValue = whoami;

        }
    }

    editCfg.editor_cfg.ini = rowOriginalValue;
}


Fb.getFieldEditor = function(master_act, op_type, one_col_cfg, row, whoami_cfg) {
    
    if(one_col_cfg.editor_cfg.editor_plug_name ){
         console.log(one_col_cfg)
         console.log(one_col_cfg.field_e)
 
         console.log(op_type)
         console.log(row)


         if(op_type=='update'){
              var _plugvalue=row.data[one_col_cfg.field_e]
         }else{
              var _plugvalue=null
         }
    
         //对某个字段采用插件编辑方式.
         console.log(_plugvalue)
         return FormBuilder.getUiPluginEditor(_plugvalue,one_col_cfg.field_e, 
            one_col_cfg.display_cfg.field_c ,one_col_cfg.editor_cfg.editor_plug_name)
         }
    

    this.determineOriginalValue(op_type, one_col_cfg, row);
    var readonly_flag = false;
    var skip_flag = false;
    
    if (one_col_cfg['field_e'] == 'id') {
        readonly_flag = true;
    }

    if (one_col_cfg['field_e'] == 'uuid') {
        if(op_type=='update') {readonly_flag = true; }
     }
     

    if (one_col_cfg.editor_cfg.hasOwnProperty('readonly')) {
        if (one_col_cfg.editor_cfg.readonly == '1')
            readonly_flag = true;
    }

    if (one_col_cfg.editor_cfg.is_produce_col == 1) {
        readonly_flag = true;
    }

   //增加新记录时候,强制设定readonly_flag为 false
    if(op_type=='add'){
          readonly_flag = false;
    }

    
    if ((one_col_cfg['field_e'] == 'id') && (op_type == 'add')) {
        skip_flag = true;
    }

    if (skip_flag) {
        return null;
    }

    if ((one_col_cfg['field_e'] == master_act.cfg.filter_field) && (op_type == 'add')) {
        return [this.getInheritEditor(one_col_cfg, master_act.cfg.filter_value)];
    }
              

    if (!Ext.isEmpty(one_col_cfg.editor_cfg.trigger_cfg)) {
        return [Fb.getDropdownlistEditor(one_col_cfg, row, readonly_flag, whoami_cfg)];
    }



    if (one_col_cfg.editor_cfg.need_upload == 1) {
        var cfg = {
            label: one_col_cfg.display_cfg.field_c,
            name: one_col_cfg['field_e'],
            value: one_col_cfg.editor_cfg.ini
        };
        return [FileMgr.getAttachmentEditor(cfg)];
    }

    if (one_col_cfg.editor_cfg.edit_as_html == 1) {
        return [this.getHtmlEditor(one_col_cfg['field_e'], one_col_cfg['display_cfg'].field_c, one_col_cfg['editor_cfg']['ini'])];
    }

    if (one_col_cfg.editor_cfg.datetime == 'datetime' || one_col_cfg.editor_cfg.datetime == 'date' || one_col_cfg.editor_cfg.datetime == 'time') {
        return [this.getDateTypeEditor(one_col_cfg, readonly_flag, one_col_cfg.editor_cfg.datetime)];
    }


    if (one_col_cfg['edit_type'] == 'textarea') {
        return [this.getTextAreaEditor(one_col_cfg, readonly_flag)];
    }

    if ((one_col_cfg['edit_type'] == null) || (one_col_cfg['edit_type'] == '')) {
        return [this.getDefaultEditor(master_act, one_col_cfg, readonly_flag)];
    }

}

Fb.primaryKeyColumn = function(c) {
    return new Ext.ux.grid.CheckColumn({
        header: c,
        dataIndex: "primary_key"
    });
}


Fb.notNullColumn = function(c) {
    return new Ext.ux.grid.CheckColumn({
        header: c,
        dataIndex: "not_null"
    });
}

Fb.unsignedColumn = function(c) {
    return new Ext.ux.grid.CheckColumn({
        header: c,
        dataIndex: "unsigned"
    });
}

Fb.autoIncrColumn = function(c) {
    return new Ext.ux.grid.CheckColumn({
        header: c,
        dataIndex: "auto_increment"
    });
}

Fb.zerofillColumn = function(c) {
    return new Ext.ux.grid.CheckColumn({
        header: c,
        dataIndex: "zerofill"
    });
}



Fb.getFollowCfg = function(form) {
    var follow_rows = form.find('nanx_type', 'follow_row');
    var l_r_group = [];
    for (var i = 0; i < follow_rows.length; i++) {
        var l_r = follow_rows[i].findByType(['combo']);
        l_r_group.push({
            'base_table_follow_field': l_r[0].value,
            'combo_table_follow_field': l_r[1].value
        });
    }
    return l_r_group;
}



Fb.setDndForm = function(cfg, node) {
    var pleft = {
        left_category: cfg.left_category,
        right_category: cfg.right_category
    };
    if (cfg.hasOwnProperty('left_filter_value')) {
        pleft.value = node.attributes[[cfg.left_filter_value]]
    }
    var pright = {};
    if (!(cfg.right_value == false)) {
        Ext.apply(pright, pleft);
        pright.category_to_use = cfg.right_category;
        pright.value = node.attributes[[cfg.right_filter_value]];
    } else {
        pright.data = false;
    }
    pright.right_forced_one = (cfg.hasOwnProperty('right_forced_one')) ? true : false;
    var split2col = new Fb.split2col(pleft, pright, cfg, false);
    var f = new Ext.Container({
        items: split2col
    });
    return f;
};


// Fb.setSingleField=function(jsondata, item) {
//          console.log(jsondata)
//          console.log(item)

//          if (item.path) {
//              var v = jsondata[item.path];
//              console.log("setting ",v)
//              var compent = Ext.getCmp(item.id);
//              console.log(compent)

//              if (compent) { compent.Callback_setValue(v) };
//             }
// }




Fb.preProcessNodeAtt = function(cfg, xnode) {


    var fixed = DeepClone(cfg);

    function fix_obj_tag(taged, node) {
        if (taged.substring(0, 2) == '##') {
            var skey = taged.substring(2, taged.length);
            return xnode.parentNode.attributes[skey];
        }
        if (taged.substring(0, 1) == '#') {
            var skey = taged.substring(1, taged.length);
            return xnode.attributes[skey];
        }

        if (taged.substring(0, 7) == '@random') {
            return randomString();
        }


        return taged;
    }



    if (fixed.value) {
        if ((typeof fixed.value) == 'number') {
            fixed.value = fixed.value;
        } else {
            if (fixed.value === true) {
                fixed.value = 'true';
            } else {
                fixed.value = fix_obj_tag(fixed.value, xnode);
            }
        }
    }

    if (fixed.file_type) {
        fixed.file_type = fix_obj_tag(fixed.file_type, xnode);
    }


    if (fixed.main_table) {
        fixed.main_table = fix_obj_tag(fixed.main_table, xnode);
    }



    if (fixed.os_path) {
        fixed.os_path = fix_obj_tag(fixed.os_path, xnode);
    }


    if (fixed.json) {
        for (var subkey in fixed.json) {
            fixed.json[subkey] = fix_obj_tag(fixed.json[subkey], xnode);
        }
    }
    return fixed;
}


Fb.getCellStr = function(grid, rowIndex, colIndex) {
    var rec = grid.getStore().getAt(rowIndex);
    var columnName = grid.getColumnModel().getDataIndex(colIndex);
    var cellValue = rec.get(columnName);
    return cellValue;
};




Fb.check_table_prefix = function(v) {
    var tablename = Ext.util.Format.trim(v);
    if (tablename.indexOf(' ') >= 0) {
        return false;
    }

    if (tablename.length == APP_PREFIX.length) {
        return false;
    }
    if (tablename == APP_PREFIX + '_') {
        return false;
    }

    if (!(tablename.indexOf(APP_PREFIX) == 0)) {
        return false;
    }
    return true;
}



Fb.validate_password_input = function(v) {

    var pwd = Ext.getCmp('password').getValue();
    var pwd2 = Ext.getCmp('password2').getValue();
    if (pwd.length < 1) {
        return false;
    }
    if (!(pwd === pwd2)) {
        return false;
    } else {
        return true;
    }

}