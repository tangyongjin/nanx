/*
form.formbuilder.js
*/
Ext.ns('FormBuilder');

var FormBuilder = {};

FormBuilder.backendForm = function(category, opcode, xnode) {

    var o_mcfg = AppCategory.getSubMenuCfg(category, opcode);

    //查看联动租,从 增加联动租 取得 字段配置.
    if (opcode == 'view_trigger_group_debug') {
        o_mcfg_create = AppCategory.getSubMenuCfg('trigger_groups', 'add_trigger_group');
        o_mcfg.itemcfg = o_mcfg_create.itemcfg // 借用上级的 itemcfg
    }

    // if( opcode=='view_trigger_group_debug'){
    //    o_mcfg_create = AppCategory.getSubMenuCfg('trigger_groups', 'add_trigger_group');
    //    o_mcfg.itemcfg=o_mcfg_create.itemcfg    // 借用上级的 itemcfg
    // }


    var opform = this.getOperationForm(xnode, o_mcfg);
    return opform;
}

FormBuilder.backendFromWrapper = function(opform, opcode) {
    var help_panel = new Ext.Panel({
        autoLoad: HELP_DIR + opcode,
        height: 400,
        autoScroll: true
    });

    var form2items = new Ext.Panel({
        border: false,
        layout: "accordion",
        layoutConfig: {
            animate: true
        },
        items: [{
            title: i18n.operation,
            items: opform
        }, {
            title: i18n.operation_help,
            items: help_panel
        }],
        opform: opform
    });
    return form2items;
};


FormBuilder.getBackendFormItem = function(mcfg,item, node) {
    var readonly = item.readonly ? item.readonly : false;
    var hidden = item.hidden ? item.hidden : false;
    var checked = item.all_checked ? item.all_checked : false;
    var field_v = item.value;


    switch (item.item_type) {

        case 'field':

            var f = this.getCommonField(item)
            break;

        case 'raw_table':
            var container_id = 'raw_table_' + Ext.id();
            var f = new Ext.Container({
                layout: 'absolute',
                height: item.grid_h,
                autoScroll: true,
                border: true,
                width: 400,
                id: container_id,
                x: 105,
                y: 0
            });

            new Act({
                edit_type: 'noedit',
                code: 'NANX_TBL_DATA',
                table: item.value,
                transfer: false,
                singleSelect: true,
                grid_id: 'raw_table_grid_id',
                showwhere: 'container',
                tbar_type: 'hide',
                renderto: container_id
            });
            break;



        case 'StarHtmleditor':
            var html = {
                fieldLabel: item.label,
                id: item.id,
                name: item.id,
                width: 450,
                height: 250,
                xtype: 'StarHtmleditor',
                readOnly: readonly,
                value: field_v
            };
            var f = new Ext.Container({
                items: [{
                        html: item.label + ':<br/>'
                    },
                    html
                ]
            });
            break;

        case 'dnd_2_col':
            var f = Fb.setDndForm(item, node);
            break;
        case 'checkbox':
            var f = {
                fieldLabel: item.label,
                id: item.id,
                name: item.id,
                xtype: 'checkbox',
                checked: true
            };
            break;

        case 'textarea':
            var f = {
                fieldLabel: item.label,
                id: item.id,
                name: item.id,
                xtype: 'textarea',
                width: 600,
                height: item.height ? item.height : 300
            };
            break;

        case 'html_container':
            var f = new Ext.Container({
                items: {
                    html: item.html
                }
            });
            break;

        case 'check_group_static':
            var f = {
                id: item.id,
                fieldLabel: item.label,
                autoHeight: true,
                items: item.items,
                defaultType: 'checkbox'
            };
            break;

        case 'check_group':
            var f = {
                id: item.id,
                hidden: hidden,
                hideMode: 'visibility',
                fieldLabel: item.label,
                defaultType: 'checkbox',
                items: []
            };
            var check_store = new Ext.data.JsonStore({
                proxy: new Ext.data.HttpProxy({
                    url: TREE_URL,
                    method: 'POST'
                }),
                fields: ['value', 'text'],
                baseParams: {
                    category_to_use: item.group_category,
                    value: item.value
                },
                root: 'server_resp'
            });
            check_store.load();
            check_store.on('load', function() {
                for (var i = 0; i < this.getCount(); i++) {
                    var rec = this.getAt(i).json;
                    var newitem = new Ext.form.Checkbox({
                        boxLabel: rec.text,
                        id: rec.value,
                        name: item.id,
                        checked: checked,
                        itemCls: '',
                        labelStyle: 'padding-left:10px;',
                        inputValue: rec.value
                    });
                    var check_items = Ext.getCmp(item.id).items;
                    check_items.add(newitem);
                }
                Ext.getCmp(item.id).doLayout();
            });
            break;

        case 'radio_group':
            var rg = [];
            for (i = 0; i < item.items.length; i++) {
                if (item.items[i].hasfollow) {
                    item.items[i].listeners = {
                        afterrender: function() {
                            var rd = Ext.get(this.id);
                            var field = '&nbsp;&nbsp;<input name=' + this.id + '_input style="margin-top:6px;"   class="x-form-text x-form-field">';
                            rd.parent().createChild(field);
                        }
                    }
                }

                rg.push(item.items[i]);
            }

            var f = new Ext.form.RadioGroup({
                reference_group_id: 111111222222,
                fieldLabel: item.label,
                labelStyle: 'white-space:nowrap;',
                layout: 'form',
                style: {
                    'margin-left': '0px',
                    'margin-top': '10px'
                },
                columns: 1,
                items: rg
            });

            break;

        case 'dndgrid':
            item.grid_width = item.width ? item.width : 470;
            item.value = node.attributes[[item.value_reference]];

            var f = new Ext.Container({
                items: new DDGrid.dndgrid(item)
            });
            break;


        case 'menuTreeGrid':
            item.rule_value = node.attributes[[item.value_reference]];
            var menutree = MenuTree.getMenuTreeGrid(item);
            console.log(item)

            var f = new Ext.Container({
                layout: 'absolute',
                items: menutree,
                x: 400,
                y: -360
            });

            break;

        case 'uploadFile':
            var f = FileMgr.getAttachmentEditor(item);
            break;


        case 'file_selector':
            var container_id = 'media_grid_' + Ext.id();



            var f = new Ext.Container({
                layout: 'absolute',
                height: item.grid_h,
                autoScroll: true,
                border: true,
                id: container_id,
                x: 0,
                y: 0
            });

            item.grid_id = 'grid_FILE';
            var act_config = DeepClone(item);
            act_config.renderto = container_id;

            act_config.tbar_type = 'file_' + item.file_type;
            act_config.showwhere = 'container';

            console.log(act_config)

            var Act_f = new Act(act_config);
            break;

        case 'combo_list':

            item.displayField = 'text';
            item.valueField = 'value';
            var store = Fb.buildTriggerStore(item);
            var f = COMBOX.getBasicCombo(item, store);
            break;

        case 'combo_group':
            alert('will create combo_group ')
            var f = COMBOX.getComboGroup(item);
            break;



        case 'layout_panel':
            var container_id = 'r_grid_' + Ext.id();
            var f = new Ext.Container({
                layout: 'absolute',
                height: 360,
                autoScroll: true,
                id: container_id,
                x: 220,
                y: 0
            });


            var Act_f = new Act({
                code: "NANX_TB_LAYOUT",
                activity_type: "sql",
                edit_type: 'edit',
                tbar_type: 'hide',
                showwhere: "container",
                grid_id: item.grid_ext_id,
                renderto: container_id,
                gridheader: true,
                checkbox: false,
                para_json: {
                    'table': field_v
                },
                callback: [{
                    event: 'cellcontextmenu',
                    fn: Layout.RestoreField
                }, {
                    event: 'render',
                    fn: Layout.LayoutManager
                }]
            });

            break;

        case 'DropdownCompoment':
            
           

            var f = new Util.DropdownCompoment({
                width: 500,
                height: 30,
                using_follow: item.using_follow,
                headers: item.headers,
                item: item,
                node: node,
                callback_set_url: mcfg.callback_set_url,
                callback_set_json_key: '/'
            });



            break;


        default:
            var f = {};
    }
    return f;
}



FormBuilder.getCommonField = function(item) {

    var readonly = item.readonly ? item.readonly : false;
    var hidden = item.hidden ? item.hidden : false;


    if (item.hasOwnProperty('using_serial')) {
        serial = '_' + item.serial
    } else {
        serial = ''
    }


    var f = {
        fieldLabel: item.label,
        id: item.id ? item.id + serial : "input_" + i,
        name: item.id ? item.id + serial : "input_" + i,
        xtype: 'textfield',
        allowBlank: false,
        width: item.width ? item.width : 200,
        readOnly: readonly,
        hidden: hidden,
        validator: item.validate_rule ? function(v) {
            return Fb[item.validate_rule].apply(null, [v]);
        } : function(v) {
            if (Ext.isEmpty(v)) {
                return false;
            } else {
                return true;
            }
        },
        value: item.postfix ? item.value + item.postfix : item.value
    };

    if (item.hasOwnProperty('ini')) {
        f.value = item.ini
    }

    if (item.inputType) {
        f.inputType = item.inputType;
    }

    return f;

}



FormBuilder.getFormData = function(form) {

    if (!form.getForm().isValid() && !Ext.getCmp('force_not_check')) {
        Ext.Msg.alert(i18n.error, i18n.check_input);
        return false;
    }

    var fmdata = {};
    var formel = form.getEl();
    var ipts = formel.query('input');

    for (var i = 0; i < ipts.length; i++) {
        var field_id = ipts[i].getAttribute("id");
        if (Ext.getCmp(field_id)) {
            var field = Ext.getCmp(field_id);
            var field_type = field.getXType();
            var field_value = field.getValue();
            if ((field_type == 'datefield') || (field_type == 'datetimefield')) {
                var testdate = new Date(field_value);
                if (isNaN(testdate.valueOf())) {
                    field_value = null;
                }
            }
            fmdata[field_id] = field_value;
        }

    }
    var xtypes = form.findByType("timepickerfield");

    for (var i = 0; i < xtypes.length; i++) {
        fmdata[xtypes[i].id] = xtypes[i].getValue();
    }

    var fm_tmp_v = form.getForm().getValues();

    Ext.applyIf(fmdata, form.getForm().getValues());
    for (var p in fmdata) {
        if ((p.substring(0, 7) == 'ext-gen') || (p.substring(0, 8) == 'ext-comp')) {
            console.log("delete ----")
            delete fmdata[p];
        };
    }

    if (fmdata.opcode && fmdata.opcode.indexOf('set_biz_field_combo_follow') >= 0) {
        fmdata['nanx_follow_cfg'] = Fb.getFollowCfg(form);
    }

    var trigger_rows = form.find('nanx_type', 'trigger_row');
    if (trigger_rows.length > 0) {
        fmdata['trigger_counts'] = trigger_rows.length;
    }



    if (fmdata.opcode && fmdata.opcode.indexOf('set_activity_pic') >= 0) {

        var fileGrid = Ext.getCmp('grid_FILE');
        file_choosed = FileMgr.getMediaGridValue(fileGrid);
        var picname = file_choosed[0].split('/').pop();
        fmdata['activity_pic'] = picname;
    }


    var extradata = getGridExtraData();

    if (Ext.getCmp('menutree')) {
        Ext.getCmp('menutree').getRootNode().expand(true);
        extradata = getTreeData('menutree');

    }



    if (extradata) {
        if (extradata.mustHaveOneRow && 0 == extradata.row_count) {
            alert(i18n.choose_only_one_record);
            return;
        }
    }

    if (extradata) {
        fmdata.extradata = extradata;
    }

    if (fmdata.hasOwnProperty('transfer')) {
        if (fmdata.transfer == 'false') {
            fmdata.transfer = false;
        }
        if (fmdata.transfer == 'true') {
            fmdata.transfer = true;
        }
    }

    return fmdata;
}


FormBuilder.getOperationForm = function(node, orginal_mcfg) {
    
    console.log(orginal_mcfg)
    var mcfg = Fb.preProcessNodeAtt(orginal_mcfg, node);

    var layout = 'form';
    var forms = [];
    var needsend = ['id', 'group_id', 'table', 'hostby', 'column_definition', 'DDL'];
    var hidden = {
        opcode: mcfg.opcode,
        nodevalue: node.attributes.value
    };
    for (var i = 0; i < needsend.length; i++) {
        var nodekey = needsend[i];
        if (node.attributes.hasOwnProperty(nodekey)) {
            hidden[nodekey] = node.attributes[nodekey];
        }
    }
    for (var property in hidden) {
        var hiddenfield = {
            id: property,
            xtype: 'hidden',
            value: hidden[property]
        };
        forms.push(hiddenfield);
    }

    if (mcfg.place == 'context') {
        var items = mcfg.itemcfg;
        for (var i = 0; i < items.length; i++) {
            if (items[i].hasOwnProperty('layout_panel')) {
                var layout = 'absolute';
            }

            var item = DeepClone(items[i]);
            item = Fb.preProcessNodeAtt(item, node);
            var f = FormBuilder.getBackendFormItem(mcfg,item, node);
            if (f) {
                if (f.isArray) {
                    for (var j = 0; j < f.length; j++) {
                        forms.push(f[j]);
                    }
                } else {
                    forms.push(f);
                }
            }

        }
    }


    var label_w = 100;
    if (mcfg.label_width) {
        label_w = mcfg.label_width;
    }
    var opform = new Ext.form.FormPanel({
        id: "back_opform",
        frame: true,
        autoScroll: true,
        autoDestroy: true,
        autoShow: true,
        border: false,
        layout: layout,
        height: 400,
        labelWidth: label_w,
        fileUpload: true,
        labelAlign: 'right',
        bodyStyle: "padding-left:10px;",
        defaults: {
            allowBlank: false
        },
        name: "opform",
        items: forms
    });


    return opform;
};




  FormBuilder.BackendFormHandler=function(node,category,opcode,alt_win_id) {
    var specialCodes = ["mem_copy", "mem_paste", "create_table", "preview_activity","edit_public_field","edit_codetable"];
    var route = specialCodes.indexOf(opcode);
    if(route>=0)
    {
      var common_fn=specialCodeRoute(node,category,opcode);
      return common_fn;
    }

    

    var common_fn=function(){
              var opform=FormBuilder.backendForm(category,opcode,node);
              var wincfg={
                 category:category,
                 opcode:opcode, 
                 node:node
                 };
                 
                 if(alt_win_id){wincfg.alt_id=alt_win_id;}
                 var mcfg=AppCategory.getSubMenuCfg( category,opcode);
                 if(!mcfg){alert('MCFG is null');return;};
                 if(mcfg.viewonly){wincfg.viewonly=true;}
                 var defaultCF=AppCategory.getBackendCrontroller();
                 Ext.applyIf(mcfg,defaultCF);
                 var url=null;
                 if(!Ext.isEmpty(mcfg.controller))
                 {
                 var  url=AJAX_ROOT+mcfg.controller+'/'+mcfg.func_name;

                 }
                 wincfg.url=url;
                 wincfg.width=(mcfg&&mcfg.width)?mcfg.width:550;
                 wincfg.title=(mcfg && mcfg.title)?mcfg.title : '';
                 var win=Act.prototype.actionWin('backend',opform,wincfg);
    };
    return common_fn;
}
