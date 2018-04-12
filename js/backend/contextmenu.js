var menu_for_all = {
    category: ['all'],
    menus: [{
            title: i18n.sms,
            place: 'context',
            opcode: 'p2p_sms',
            itemcfg: [{
                    item_type: 'field',
                    label: i18n.msg_title,
                    width: 200,
                    id: 'title'
                },
                {
                    item_type: 'StarHtmleditor',
                    label: i18n.message,
                    edit_as_html: 1,
                    id: 'msg'
                },
                {
                    item_type: 'check_group',
                    label: i18n.select_msg_recever,
                    group_category: 'users',
                    id: 'sms_receivers'
                }
            ]
        },
        {
            title: i18n.sms,
            place: 'context',
            opcode: 'read_sms',
            callback_set_url: 'sms/getSms',
            callback_set_json_key: '/',
            json: {
                id: '#id'
            },
            itemcfg: [{
                    item_type: 'field',
                    label: i18n.sender,
                    path: 'sender',
                    width: 200,
                    readonly: true,
                    id: 'sender'
                },
                {
                    item_type: 'field',
                    label: i18n.msg_title,
                    path: 'title',
                    width: 200,
                    readonly: true,
                    id: 'title'
                },
                {
                    item_type: 'StarHtmleditor',
                    label: i18n.message,
                    edit_as_html: 1,
                    path: 'msg',
                    id: 'msg'
                }
            ]
        }
    ]
}

var menu_for_syscfgs = {
    category: ['syscfgs'],
    menus: [{
        title: i18n.backup_system,
        place: 'context',
        opcode: 'backup_system',
        itemcfg: [{
            item_type: 'field',
            label: i18n.backup_system_name,
            id: 'backup_name'
        }]
    }]
}


var menu_for_biz_tables = {
    category: ['biz_tables'],
    menus: [{
        title: i18n.create_new_biztable,
        place: 'context',
        opcode: 'create_biz_table',
        itemcfg: [{
            item_type: 'field',
            label: i18n.business_table_name,
            id: 'table_screen_name'
        }, {
            item_type: 'dnd_2_col',
            id: 'table_name',
            label: i18n.select_table_for_biz,
            left_category: 'tables',
            right_forced_one: true,
            right_value: false
        }]
    }]
}


var menu_for_tables = {
    category: ['tables'],
    menus: [{
            title: i18n.backup_db,
            place: 'context',
            opcode: 'backup_db',
            itemcfg: [{
                item_type: 'field',
                label: i18n.backup_name,
                id: 'backup_name'
            }, {
                item_type: 'dnd_2_col',
                id: 'table_name',
                label: i18n.select_table,
                left_category: 'tables',
                right_value: false
            }]
        },
        {
            title: i18n.restore_db,
            place: 'context',
            opcode: 'restore_db',
            itemcfg: [{
                item_type: 'uploadFile',
                label: i18n.select_db_restore_file,
                name: 'restore_file',
                id: 'restore_file'
            }]
        },

        {
            title: i18n.create_new_table,
            opcode: 'create_table',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.table_name,
                id: 'newtable',
                validate_rule: 'check_table_prefix',
                value: APP_PREFIX + '_'
            }, {
                item_type: 'field',
                label: i18n.set_to_biz_table,
                id: 'base_table'
            }]
        }, {
            title: i18n.createtable_from_excel,
            opcode: 'create_table_from_excel',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.table_name,
                id: 'table_name',
                value: APP_PREFIX + '_'
            }, {
                item_type: 'uploadFile',
                file_type: 'xls',
                label: i18n.select_excel_file,
                name: 'excel',
                id: 'excel'
            }]
        }
    ]
}

var menu_for_trigger_groups = {
    category: ['trigger_groups'],
    menus: [{
        title: i18n.add_trigger_group, //增加 联动组
        opcode: 'add_trigger_group',
        place: 'context',
        width: 1000,
        itemcfg: [
        {
                item_type: 'field',
                id: 'group_id',
                width: 170,
                value: '#text',
                label: i18n.trigger_group 
            },
            {
                item_type: 'DropdownCompoment',
                using_follow:true,
                id: 'reg_form_1',
                headers: ['base_table_col', 'trigger_table', 'trigger_table_value', 'trigger_table_list', 'trigger_table_filter'],
                width: 170,
                label: i18n.trigger_group,
                horizon_items:[
                    {
                        item_type: 'combo_list',
                        id: 'field_e',
                        value: '#hostby',
                        width: 140,
                        displayField: 'text',
                        valueField: 'value',
                        category_to_use: 'biz_cols'
                    },
                    {
                        item_type: 'combo_group',
                        root_combox: {
                            id: 'combo_table',
                            ds_auto: true,
                            level: 1,
                            width: 140,
                            nanx_type: 'root',
                            value_key_for_slave: 'value',
                            category_to_use: 'biz_tables'
                        },
                        slave_comboxes: [
                            {
                                id: 'value_field',
                                ds_auto: false,
                                level: 2,
                                width: 140,
                                nanx_type: 'slave',
                                category_to_use: 'biz_cols'
                            },
                            
                            {
                                id: 'list_field',
                                ds_auto: false,
                                level: 2,
                                width: 140,
                                nanx_type: 'slave',
                                category_to_use: 'biz_cols'
                            }, 
                            
                            {
                                id: 'filter_field',
                                ds_auto: false,
                                level: 2,
                                width: 140,
                                nanx_type: 'slave',
                                category_to_use: 'biz_cols'
                            }
                        ]
            }]
        }
       
        ]
    }]
}



var menu_for_trigger_group = {
    category: ['trigger_group'],
    menus: [
        {
            title: i18n.view_trigger_group, //查看联动组
            json: {
                'value': '#value',
                'hostby': '#hostby'
            },
            opcode: 'not_need',
            place: 'context',
            viewonly: true,
            callback_set_url: 'nanx/getTriggerGroup',
            callback_set_json_key: '/',
            width: 1000,
            itemcfg: [{
                    item_type: 'field',
                    label: i18n.trigger_group,
                    id: 'group_id',
                    value: '#text',
                    hidden: false
                },
                {
                    item_type: 'trigger_group_header',
                    place: 'context',
                    path: 'server_resp',
                    headers: ['base_table_col', 'trigger_table', 'trigger_table_list', 'trigger_table_value', 'trigger_table_filter'],
                    horizon_items: [{
                            item_type: 'combo_list',
                            id: 'field_e',
                            value: '#hostby',
                            width: 140,
                            displayField: 'text',
                            valueField: 'value',
                            category_to_use: 'biz_cols'
                        },
                        {
                            item_type: 'combo_group',
                            root_combox: {
                                id: 'combo_table',
                                ds_auto: true,
                                level: 1,
                                width: 140,
                                nanx_type: 'root',
                                value_key_for_slave: 'value',
                                category_to_use: 'biz_tables'
                            },
                            slave_comboxes: [{
                                    id: 'list_field',
                                    ds_auto: false,
                                    level: 2,
                                    width: 140,
                                    nanx_type: 'slave',
                                    category_to_use: 'biz_cols'
                                }, 
                               {
                                    id: 'value_field',
                                    ds_auto: false,
                                    level: 2,
                                    width: 140,
                                    nanx_type: 'slave',
                                    category_to_use: 'biz_cols'
                                },
                                {
                                    id: 'filter_field',
                                    ds_auto: false,
                                    level: 2,
                                    width: 140,
                                    nanx_type: 'slave',
                                    category_to_use: 'biz_cols'
                                }

                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: "i18n.查看联动组",  // 联动
            json: {
                'value': '#value',
                'hostby': '#hostby'
            },
            opcode: 'view_trigger_group_debug',
            place: 'context',
            viewonly: true,
            callback_set_url: 'nanx/getTriggerGroup',
            callback_set_json_key: '/',
            path:'server_resp',
            width: 1000,
            itemcfg: [
                {
                    item_type: 'field',
                    label: i18n.trigger_group,
                    id: 'group_id',
                    value: '#text',
                    hidden: false
                }
                 
            ]
        },

        {
            title: i18n.delete_trigger_group,
            json: {
                'value': '#value',
                'hostby': '#hostby'
            },
            opcode: 'delete_trigger_group',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.trigger_group,
                id: 'group_id',
                value: '#value'
            }]
        }
    ]
}


var menu_for_buttons = {
    category: ['buttons'],
    menus: [{
            title: i18n.add_record_based_btn,
            opcode: 'add_a2a_button',
            place: 'context',
            itemcfg: [{
                    item_type: 'field',
                    id: 'btn_name',
                    label: i18n.button_text
                },
                {
                    item_type: 'combo_list',
                    label: i18n.field,
                    id: 'field_for_main_activity',
                    value: '#maintable',
                    xyz: '123',
                    category_to_use: 'biz_cols',
                },
                {
                    item_type: 'combo_group',
                    root_combox: {
                        id: 'activity_for_btn',
                        label: i18n.select_source_table,
                        path: 'used_activity',
                        group_id: 'a2a_gp',
                        level: 1,
                        value_key_for_slave: 'base_table',
                        category_to_use: 'activitys'
                    },
                    slave_comboxes: [{
                        id: 'field_for_sub_activity',
                        label: i18n.value_col_in_source_table,
                        ds_auto: false,
                        group_id: 'a2a_gp',
                        level: 2,
                        path: 'filter_field',
                        category_to_use: 'biz_cols'
                    }]
                }
            ]
        },
        {
            title: i18n.add_js_button,
            opcode: 'add_js_button',
            place: 'context',
            itemcfg: [{
                    item_type: 'field',
                    label: i18n.button_text,
                    id: 'btn_name'
                },
                {
                    item_type: 'uploadFile',
                    file_type: 'js',
                    label: i18n.select_js_file,
                    name: 'jsfile',
                    dest: 'js/upload',
                    id: 'jsfile',
                    value: ''
                },
                {
                    item_type: 'field',
                    label: i18n.entry_function_name,
                    id: 'function_name'
                }
            ]
        }, {
            title: i18n.add_batch_btn,
            opcode: 'add_batch_update_btn',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.button_text,
                id: 'btn_name'
            }, {
                item_type: 'dnd_2_col',
                label: i18n.select_batch_field,
                left_category: 'biz_cols_by_actcode',
                left_filter_value: 'hostby',
                right_category: null,
                right_value: false,
                right_forced_one: true,
                id: 'op_field'
            }]
        }
    ]
}


var menu_for_medias = {
    category: ['medias'],
    menus: [{
        title: i18n.pic_upload,
        place: 'context',
        opcode: 'upload_file',
        enable: false,
        controller: null,
        itemcfg: [{
            item_type: 'uploadFile',
            file_type: '#file_type',
            label: i18n.select_pic,
            name: 'file2upload',
            id: 'file2upload',
            os_path: '#os_path',
            value: ''
        }]
    }, {
        title: i18n.pic_management,
        opcode: 'manage_pic',
        place: 'context',
        itemcfg: [{
            code: 'NANX_FS_2_TABLE',
            item_type: 'file_selector',
            grid_h: 386,
            file_type: 'img',
            file_trunk: 5,
            nosm: true,
            hideHeaders: true,
            checkbox: false,
            id_order: 'desc',
            os_path: 'imgs'
        }]
    }, {
        title: i18n.php_controller,
        opcode: 'manage_php_controller',
        place: 'context',
        width: 900,
        itemcfg: [
        {
            code: 'NANX_FS_2_TABLE',
            item_type: 'file_selector',
            grid_h: 386,
            file_type: 'php',
            nosm: true,
            edit_type: 'noedit',
            hideHeaders: false,
            checkbox: false,
            id_order: 'desc',
            os_path: 'application/controllers'
        }]
    }, {
        title: i18n.php_model,
        opcode: 'manage_php_model',
        place: 'context',
        width: 900,
        itemcfg: [{
            code: 'NANX_FS_2_TABLE',
            item_type: 'file_selector',
            grid_h: 386,
            edit_type: 'noedit',
            file_type: 'php',
            nosm: true,
            hideHeaders: false,
            checkbox: false,
            id_order: 'desc',
            os_path: 'application/models'
        }]
    }, {
        title: i18n.jsfile,
        opcode: 'manage_js_upload',
        place: 'context',
        width: 900,
        itemcfg: [{
            code: 'NANX_FS_2_TABLE',
            item_type: 'file_selector',
            grid_h: 386,
            file_type: 'js',
            edit_type: 'noedit',
            nosm: true,
            hideHeaders: false,
            checkbox: false,
            id_order: 'desc',
            os_path: 'js/upload'
        }]
    }]
}

var menu_for_table = {
    category: ['table'],
    menus: [{
            title: i18n.manage_index,
            place: 'context',
            opcode: 'manage_index',
            enable: false,
            itemcfg: []
        },
        {
            title: i18n.drop,
            place: 'context',
            opcode: 'drop_table',
            itemcfg: [{
                item_type: 'field',
                label: i18n.drop_tabe,
                id: 'table',
                value: '#text'
            }]
        }, {
            title: i18n.truncate_table,
            opcode: 'truncate_table',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.table,
                value: '#text',
                readonly: true,
                id: 'usedtable'
            }]
        }, {
            title: i18n.reorder_column,
            opcode: 'set_col_order',
            place: 'context',
            itemcfg: [{
                    item_type: 'field',
                    label: i18n.table,
                    value: '#text'
                },
                {
                    item_type: 'dndgrid',
                    gridlabel: i18n.col_reorder_help,
                    category_to_use: 'table',
                    dndgrid: true,
                    self_dnd: true,
                    grid_ext_id: 'reorder_columns_grid',
                    value_reference: 'value',
                    width: 470,
                    fields: [{
                        column: 'value',
                        column_title: i18n.field
                    }, {
                        column: 'field_def',
                        column_title: i18n.field_def
                    }]
                }
            ]
        }, {
            title: i18n.export_data,
            opcode: 'export_table',
            controller: 'activity',
            func_name: 'grid2excel',
            transfer: false,
            place: 'context',
            itemcfg: [{
                    item_type: 'field',
                    label: i18n.table,
                    value: '#text',
                    value: '#text',
                    id: 'excel_name',
                    readonly: true
                }, {
                    item_type: 'dnd_2_col',
                    label: i18n.select_fields_to_export,
                    id: 'cols_selected',
                    left_category: 'table_columns',
                    right_category: 'table_columns',
                    left_filter_value: 'value',
                    right_value: false
                },
                {
                    item_type: 'field',
                    id: 'code',
                    value: 'NANX_TBL_DATA',
                    readonly: true,
                    hidden: true
                }, {
                    item_type: 'field',
                    value: '#value',
                    id: 'table',
                    readonly: true,
                    hidden: true
                }, {
                    item_type: 'field',
                    value: 'service',
                    id: 'activity_type',
                    readonly: true,
                    hidden: true
                },
                {
                    item_type: 'field',
                    value: false,
                    id: 'transfer',
                    hidden: true
                }
            ]
        }, {
            title: i18n.duplicate_table,
            opcode: 'copy_table',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.new_table_name,
                value: '#text',
                postfix: '_copy'
            }]
        }, {
            title: i18n.rename,
            opcode: 'rename_table',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.new_table_name,
                value: '#text'
            }]
        }
    ]
}

var menu_for_biz_table = {
    category: ['biz_table'],
    menus: [{
            title: i18n.connect_user,
            place: 'context',
            opcode: 'connect_user',
            itemcfg: [{
                    item_type: 'raw_table',
                    grid_h: 256,
                    code: 'preview_activity',
                    value: '#table'
                },
                {
                    item_type: 'combo_list',
                    id: 'field_e',
                    label: i18n.select_system_user,
                    level: 1,
                    value: '#value',
                    category_to_use: 'system_users'
                }

            ]
        },
        {
            title: i18n.select_table,
            place: 'context',
            opcode: 'set_biz_table_ref',
            itemcfg: [{
                item_type: 'field',
                label: i18n.business_table_name,
                value: '#text',
                readonly: true
            }, {
                item_type: 'dnd_2_col',
                id: 'selected_table',
                label: i18n.select_db_table,
                left_category: 'tables',
                right_category: 'table_by_name',
                right_forced_one: true,
                right_value: true,
                left_filter_value: 'value'
            }]
        }, {
            title: i18n.erase,
            place: 'context',
            opcode: 'delete_biz_table',
            itemcfg: [{
                item_type: 'field',
                label: i18n.delete_biz_table,
                value: '#text'
            }]
        }, {
            title: i18n.truncate_table,
            opcode: 'truncate_table',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.delete_all_data,
                value: '#value',
                id: 'usedtable',
                hidden: true,
                readonly: true
            }, {
                item_type: 'field',
                label: i18n.business_table_name,
                value: '#text',
                readonly: true
            }]
        }, {
            title: i18n.export_data,
            opcode: 'export_table',
            place: 'context',
            controller: 'activity',
            func_name: 'grid2excel',
            transfer: true,
            itemcfg: [{
                    item_type: 'field',
                    label: i18n.business_table_name,
                    value: '#text',
                    id: 'excel_name',
                    readonly: true
                }, {
                    item_type: 'field',
                    id: 'code',
                    value: 'NANX_TBL_DATA',
                    readonly: true,
                    hidden: true
                }, {
                    item_type: 'field',
                    value: '#table',
                    id: 'table',
                    readonly: true,
                    hidden: true
                }, {
                    item_type: 'field',
                    value: 'table',
                    id: 'activity_type',
                    readonly: true,
                    hidden: true
                },
                {
                    item_type: 'field',
                    value: true,
                    id: 'transfer',
                    hidden: true
                }
            ]
        }, {
            title: i18n.rename,
            opcode: 'rename_biz_table',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.business_table_rename,
                value: '#text',
                id: 'table_screen_name'
            }]
        }
    ]
}

var menu_for_column = {
    category: ['column'],
    menus: [{
            title: i18n.delete_col,
            opcode: 'delete_col',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.erase,
                value: '#value'
            }]
        },
        {
            title: i18n.rename_column,
            opcode: 'rename_col',
            place: 'context',
            itemcfg: [{
                    item_type: 'field',
                    label: i18n.new_column_name,
                    value: '#value'
                },
                {
                    item_type: 'field',
                    label: i18n.new_column_name,
                    id: 'field_def',
                    value: '#field_def'
                }


            ]
        }
    ]
}



var menu_for_act_notifies = {
    category: ['act_notifies'],
    menus: [{
        title: i18n.add_notify_rule,
        opcode: 'add_notify_rule',
        place: 'context',
        itemcfg: [{
            item_type: 'field',
            label: i18n.rule_name,
            width: 400,
            id: 'rule_name'
        }, {
            item_type: 'combo_list',
            label: i18n.select_activity,
            id: 'activity_code',
            category_to_use: 'activitys'
        }, {
            item_type: 'check_group_static',
            label: i18n.action,
            id: 'action',
            items: [{
                boxLabel: i18n.add,
                name: 'action',
                inputValue: 'add',
                checked: true
            }, {
                boxLabel: i18n.update,
                name: 'action',
                inputValue: 'update',
                checked: true
            }, {
                boxLabel: i18n.erase,
                name: 'action',
                inputValue: 'delete',
                checked: true
            }, {
                boxLabel: i18n.execute,
                name: 'action',
                inputValue: 'execute',
                checked: false
            }]
        }, {
            item_type: 'check_group',
            label: i18n.receiver_role_list,
            group_category: 'roles',
            id: 'receiver_role_list'
        }]
    }]
}


var menu_for_act_notify = {
    category: ['act_notify'],
    menus: [{
        title: i18n.delete_notify_item,
        opcode: 'delete_notify_rule',
        place: 'context',
        itemcfg: [{
            item_type: 'field',
            label: i18n.notify_item,
            value: '#text',
            readonly: true
        }]
    }, {
        title: i18n.edit_notify_item,
        opcode: 'edit_notify_rule',
        place: 'context',
        callback_set_url: 'event/getNotifyDetail',
        json: {
            rule_name: '#value'
        },
        callback_set_json_key: '/',
        itemcfg: [{
            item_type: 'field',
            label: i18n.notify_item,
            width: 200,
            value: '#text',
            id: 'rule_name'
        }, {
            item_type: 'combo_list',
            label: i18n.select_activity,
            id: 'activity_code',
            path: 'activity_code',
            category_to_use: 'activitys'
        }, {
            item_type: 'check_group_static',
            label: i18n.action,
            id: 'action',
            path: 'action',
            items: [{
                boxLabel: i18n.on_add,
                name: 'action',
                id: 'add',
                inputValue: 'add',
                checked: true
            }, {
                boxLabel: i18n.on_update,
                name: 'action',
                id: 'update',
                inputValue: 'update',
                checked: true
            }, {
                boxLabel: i18n.on_delete,
                name: 'action',
                id: 'delete',
                inputValue: 'delete',
                checked: true
            }, {
                boxLabel: i18n.on_execute,
                name: 'action',
                id: 'execute',
                inputValue: 'execute',
                checked: false
            }]
        }, {
            item_type: 'check_group',
            label: i18n.select_notify_recever,
            group_category: 'roles',
            path: 'receiver_role_list',
            id: 'receiver_role_list'
        }]
    }]
}


var menu_for_biz_col = {
    category: ['biz_col'],
    menus: [{
            title: i18n.set_display_text,
            opcode: 'set_display_text',
            place: 'context',
            itemcfg: [{
                id: 'field_c',
                item_type: 'field',
                label: i18n.display_text,
                value: '#text'
            }]
        },
        {
            title: i18n.set_field_width,
            opcode: 'set_field_width',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.field,
                readonly: true,
                value: '#text'
            }, {
                item_type: 'field',
                label: i18n.display_width,
                value: 200,
                id: 'field_width'
            }]
        },
        {
            title: i18n.delete_this_col,
            opcode: 'delete_col',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.erase,
                value: '#text'
            }]
        }, {
            title: i18n.set_to_me,
            opcode: 'set_to_me',
            place: 'context',
            itemcfg: [{
                    item_type: 'field',
                    hidden: true,
                    id: 'force_not_check'
                },

                {
                    item_type: 'field',
                    label: i18n.field,
                    readonly: true,
                    value: '#text',
                    json: {
                        'vvv': '##category',
                        'ddd': '#category'
                    }
                },
                {
                    item_type: 'checkbox',
                    label: i18n.set_to_me,
                    checkbox: 'true',
                    id: 'is_produce_col'
                }

            ]
        }, {
            title: i18n.using_html_editor,
            opcode: 'set_use_html_editor',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.field,
                readonly: true,
                value: '#text'
            }, {
                item_type: 'checkbox',
                label: i18n.check_as_html_editor,
                checkbox: 'true',
                id: 'edit_as_html'
            }]
        }, {
            title: i18n.show_as_pic,
            opcode: 'set_show_as_pic',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.field,
                value: '#text'
            }, {
                item_type: 'checkbox',
                label: i18n.show_as_pic,
                readonly: true,
                id: 'show_as_pic',
                checkbox: 'true'
            }]
        }, {
            title: i18n.upload_enable,
            opcode: 'set_upload_field',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.field,
                readonly: true,
                value: '#text'
            }, {
                item_type: 'checkbox',
                label: i18n.upload_enable,
                checkbox: 'true',
                id: 'need_upload'
            }]
        }, {
            title: i18n.set_field_default_value,
            opcode: 'set_field_default_value',
            place: 'context',
            itemcfg: [{
                item_type: 'radio_group',
                label: i18n.default_value_type,
                id: 'field_default_type',
                items: [{
                    xtype: 'radio',
                    boxLabel: i18n.fixed_value,
                    id: 'f_def_fix',
                    name: 'f_def',
                    checked: false,
                    hasfollow: true
                }, {
                    xtype: 'radio',
                    boxLabel: i18n.current_date,
                    id: 'f_def_date',
                    name: 'f_def',
                    checked: false
                }, {
                    xtype: 'radio',
                    boxLabel: i18n.current_time,
                    id: 'f_def_datetime',
                    name: 'f_def',
                    checked: false
                }, {
                    xtype: 'radio',
                    boxLabel: i18n.no_fixed_value,
                    id: 'f_def_null',
                    name: 'f_def',
                    checked: true
                }]
            }]
        }
    ]
}

var menu_for_dropdown_item = {
    category: ['dropdown_item'],
    menus: [{
            title: 'i18n.view_follow_and_source继承',
            json: {
                'value': '#value',
                'hostby': '#hostby'
            },
            opcode: 'view_dropdown_and_follow',     
            place: 'context',
            callback_set_url: 'nanx/getFieldSource_and_follow',
            callback_set_json_key: 'combo_cfg',
            viewonly: true,
            width: 700,
            itemcfg: [{
                    item_type: 'field',
                    label: i18n.field,
                    value: '#text',
                    readonly: true
                },
                {
                    item_type: 'combo_group',
                    root_combox: {
                        id: 'combo_table',
                        label: i18n.select_source_table,
                        path: 'combo_table',
                        group_id: 'follow_gp',
                        level: 1,
                        value_key_for_slave: 'value',
                        category_to_use: 'biz_tables_can_follow'
                    },
                    slave_comboxes: [{
                            id: 'value_field',
                            label: i18n.value_col_in_source_table,
                            path: 'value_field',
                            level: 2,
                            group_id: 'follow_gp',
                            ds_auto: false,
                            category_to_use: 'biz_cols'
                        },
                        {
                            id: 'list_field',
                            group_id: 'follow_gp',
                            label: i18n.display_col_in_source_table,
                            path: 'list_field',
                            level: 2,
                            ds_auto: false,
                            category_to_use: 'biz_cols'
                        }
                    ]
                }, {
                    item_type: 'follow_tbar',
                    path: 'follow_cfg'
                }
            ]
        },
        {
            title: i18n.delete_dropdown_item,
            json: {
                'value': '#value',
                'hostby': '#hostby'
            },
            opcode: 'delete_dropdown_item',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.field,
                value: '#text',
                readonly: true
            }]
        }
    ]
}

var menu_for_dropdown_groups = {
    category: ['dropdown_groups'],
    menus: [{
            title: i18n.add_dropdown_and_follow,
            json: {
                'value': '#value',
                'hostby': '#hostby'
            },
            opcode: 'set_biz_field_combo_resorce,set_biz_field_combo_follow',
            place: 'context',
            callback_set_url: 'nanx/getFieldSource_and_follow',
            callback_set_json_key: 'combo_cfg',
            width: 700,
            itemcfg: [{
                    item_type: 'field',
                    id: 'group_id',
                    value: '@random',
                    hidden: true
                },
                {
                    item_type: 'combo_list',
                    id: 'field_e',
                    label: i18n.value_col_in_base_table,
                    level: 1,
                    value: '#value',
                    category_to_use: 'biz_cols'
                },
                {
                    item_type: 'combo_group',
                    root_combox: {
                        id: 'combo_table',
                        label: i18n.select_source_table,
                        path: 'combo_table',
                        group_id: 'follow_gp',
                        level: 1,
                        value_key_for_slave: 'value',
                        category_to_use: 'biz_tables_can_follow'
                    },
                    slave_comboxes: [{
                            id: 'value_field',
                            label: i18n.value_col_in_source_table,
                            path: 'value_field',
                            level: 2,
                            group_id: 'follow_gp',
                            ds_auto: false,
                            category_to_use: 'biz_cols'
                        },
                        {
                            id: 'list_field',
                            group_id: 'follow_gp',
                            label: i18n.display_col_in_source_table,
                            path: 'list_field',
                            level: 2,
                            ds_auto: false,
                            category_to_use: 'biz_cols'
                        }
                    ]
                }, {
                    item_type: 'follow_tbar',
                    path: 'follow_cfg'
                }
            ]
        },
        {
            title: i18n.add_codetable_config,
            json: {
                'value': '#value',
                'hostby': '#hostby'
            },
            opcode: '1set_biz_field_combo_resorce,1set_biz_field_combo_follow',
            place: 'context',
            // callback_set_url:'nanx/getFieldSource_and_follow',
            // callback_set_json_key:'combo_cfg',
            width: 700,
            itemcfg: [{
                    item_type: 'field',
                    id: 'group_id',
                    value: '@random',
                    hidden: true
                },
                {
                    item_type: 'combo_list',
                    id: 'field_e',
                    label: i18n.value_col_in_base_table,
                    level: 1,
                    value: '#value',
                    category_to_use: 'biz_cols'
                },
                {
                    item_type: 'combo_list',
                    id: 'category',
                    label: i18n.select_codetable_category,
                    displayField: 'text',
                    valueField: 'category',
                    category_to_use: 'codetable_category'
                }
            ]
        }
    ]
}



var menu_for_sql_runner = {
    category: ['sql_runner'],
    menus: [{
        title: i18n.run_sql,
        opcode: 'run_sql',
        place: 'context',
        width: 800,
        itemcfg: [{
            item_type: 'textarea',
            label: i18n.sql,
            textarea: 1,
            id: 'sql'
        }]

    }]
}


var menu_for_activitys =

    {
        category: ['activitys'],
        menus: [{
            title: i18n.add_table_activity,
            opcode: 'add_table_activity',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.activity_code,
                id: 'activity_code'
            }, {
                item_type: 'field',
                label: i18n.activity_memo,
                id: 'grid_title'
            }, {
                item_type: 'dnd_2_col',
                label: i18n.select_biz_table,
                id: 'base_table',
                left_category: 'biz_tables',
                right_forced_one: true,
                right_value: false
            }]
        }, {
            title: i18n.add_sql_activity,
            opcode: 'add_sql_activity',
            place: 'context',
            width: 800,
            itemcfg: [{
                item_type: 'field',
                label: i18n.activity_code,
                id: 'activity_code'
            }, {
                item_type: 'field',
                label: i18n.activity_memo,
                id: 'grid_title'
            }, {
                item_type: 'textarea',
                label: i18n.sql,
                textarea: 1,
                id: 'sql'
            }]
        }, {
            title: i18n.add_js_activity,
            opcode: 'add_js_activity',
            place: 'context',
            itemcfg: [{
                    item_type: 'field',
                    label: i18n.activity_code,
                    id: 'activity_code'
                }, {
                    item_type: 'field',
                    label: i18n.activity_memo,
                    id: 'grid_title'
                },
                {
                    item_type: 'uploadFile',
                    label: i18n.select_js_file,
                    name: 'extra_js',
                    file_type: 'js',
                    dest: 'js/upload',
                    id: 'extra_js',
                    value: ''
                },
                {
                    item_type: 'field',
                    label: i18n.entry_function_name,
                    id: 'js_function_point'
                }
            ]
        }, {
            title: i18n.add_service_activity,
            opcode: 'add_service_activity',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.activity_code,
                id: 'activity_code'
            }, {
                item_type: 'field',
                label: i18n.activity_memo,
                id: 'grid_title'
            }, {
                item_type: 'field',
                label: 'Service_URL',
                id: 'service_url'
            }, {
                item_type: 'textarea',
                label: i18n.memo,
                id: 'memo'
            }]
        }, {
            title: i18n.paste,
            opcode: 'mem_paste',
            place: 'context',
            itemcfg: []
        }]
    }

var menu_for_hooks = {
    category: ['hooks'],
    menus: [

        {
            title: i18n.addhock,
            opcode: 'set_activity_hook',
            place: 'context',
            width: 1100,
            serial: 1,
            itemcfg: [{
                    item_type: 'field',
                    id: 'base_activity',
                    value: '##text',
                    width: 100,
                    label: i18n.activity,
                    readonly: true
                },

                {
                    item_type: 'trigger_group_header',
                    place: 'context',
                    headers: ['hook_type', 'hook_when', 'hook_event', 'extra_ci_model', 'model_methods', 'memo'],
                    horizon_items: [

                        {
                            item_type: 'combo_list',
                            id: 'hook_type',
                            width: 140,
                            category_to_use: 'hook_type'
                        },

                        {
                            item_type: 'combo_list',
                            id: 'hook_when',
                            width: 140,
                            category_to_use: 'hook_when'
                        },

                        {
                            item_type: 'combo_list',
                            id: 'hook_event',
                            width: 140,
                            category_to_use: 'hook_event'
                        },

                        {
                            item_type: 'combo_group',
                            root_combox: {
                                width: 140,
                                id: 'extra_ci_model',
                                path: 'used_activity',
                                level: 1,
                                value_key_for_slave: 'extra_ci_model',
                                category_to_use: 'extra_ci_model'
                            },
                            slave_comboxes: [{
                                id: 'model_method',
                                ds_auto: false,
                                width: 140,
                                level: 2,
                                path: 'model_method',
                                category_to_use: 'model_method'
                            }]
                        },
                        {
                            item_type: 'field',
                            id: 'memo',
                            width: 150
                        }
                    ]
                }
            ]
        },
        {
            title: "i18n.addhock",
            opcode: 'set_activity_hook_debug',
            place: 'context',
            width: 1100,
            serial: 1,
            itemcfg: [{
                    item_type: 'field',
                    id: 'base_activity',
                    value: '##text',
                    width: 100,
                    label: i18n.activity,
                    readonly: true
                },

                {
                    item_type: 'DropdownCompoment',
                    place: 'context',
                    using_follow:false,
                    headers: ['hook_type', 'hook_when', 'hook_event', 'extra_ci_model', 'model_methods', 'memo'],
                    horizon_items: [

                        {
                            item_type: 'combo_list',
                            id: 'hook_type',
                            width: 140,
                            category_to_use: 'hook_type'
                        },

                        {
                            item_type: 'combo_list',
                            id: 'hook_when',
                            width: 140,
                            category_to_use: 'hook_when'
                        },

                        {
                            item_type: 'combo_list',
                            id: 'hook_event',
                            width: 140,
                            category_to_use: 'hook_event'
                        },

                        {
                            item_type: 'combo_group',
                            root_combox: {
                                width: 140,
                                id: 'extra_ci_model',
                                path: 'used_activity',
                                level: 1,
                                value_key_for_slave: 'extra_ci_model',
                                category_to_use: 'extra_ci_model'
                            },
                            slave_comboxes: [{
                                id: 'model_method',
                                ds_auto: false,
                                width: 140,
                                level: 2,
                                path: 'model_method',
                                category_to_use: 'model_method'
                            }]
                        },
                        {
                            item_type: 'field',
                            id: 'memo',
                            width: 150
                        }
                    ]
                }
            ]
        }
    ]
}


var menu_for_hook = {
    category: ['hook'],
    menus: [{
            title: i18n.viewhook,
            json: {
                'value': '#value',
                'hostby': '#hostby'
            },
            opcode: 'view_trigger_group2',
            place: 'context',
            viewonly: true,
            callback_set_url: 'nanx/getHook',
            callback_set_json_key: '/',
            width: 1000,

            itemcfg: [{
                item_type: 'trigger_group_header',
                place: 'context',
                path: 'server_resp',
                headers: ['memo', 'hook_type', 'hook_when', 'hook_event', 'extra_ci_model', 'model_methods'],
                horizon_items: [{
                        item_type: 'field',
                        id: 'memo',
                        path: 'memo',
                        //  value:'##text',
                        width: 100,
                        readonly: true
                    },
                    {
                        item_type: 'combo_list',
                        id: 'hook_type',
                        width: 140,
                        category_to_use: 'hook_type'
                    },

                    {
                        item_type: 'combo_list',
                        id: 'hook_when',
                        width: 140,
                        category_to_use: 'hook_when'
                    },

                    {
                        item_type: 'combo_list',
                        id: 'hook_event',
                        width: 140,
                        category_to_use: 'hook_event'
                    },

                    {
                        item_type: 'combo_group',
                        root_combox: {
                            width: 140,
                            id: 'extra_ci_model',
                            ds_auto: true,
                            level: 1,
                            value_key_for_slave: 'extra_ci_model',
                            category_to_use: 'extra_ci_model'
                        },
                        slave_comboxes: [{
                            id: 'model_method',
                            ds_auto: false,
                            width: 140,
                            level: 2,
                            category_to_use: 'model_method'
                        }]
                    }

                ]

            }]
        },

        {
            title: i18n.deletehook,
            json: {
                'value': '#value',
                'hostby': '#hostby'
            },
            opcode: 'delete_hook',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.hookname,
                id: 'hook_id',
                value: '#text'
            }]

        }
    ]
}


var menu_for_user = {
    category: ['user'],
    menus: [{
            title: i18n.delete_user,
            opcode: 'delete_user',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.delete_user,
                value: '#text'
            }]
        }, {
            title: i18n.reset_pwd,
            opcode: 'reset_pwd',
            place: 'context',
            itemcfg: [{
                    item_type: 'field',
                    label: i18n.new_pwd,
                    inputType: 'password',
                    value: '',
                    validate_rule: 'validate_password_input',
                    id: 'password'
                },
                {
                    item_type: 'field',
                    label: i18n.new_pwd,
                    inputType: 'password',
                    validate_rule: 'validate_password_input',
                    value: '',
                    id: 'password2'
                }
            ]
        },
        {
            title: i18n.sms,
            opcode: 'user_sms',
            place: 'context',
            itemcfg: [{
                    item_type: 'field',
                    label: i18n.msg_title,
                    width: 200,
                    id: 'title'
                },
                {
                    item_type: 'StarHtmleditor',
                    label: i18n.message,
                    edit_as_html: 1,
                    id: 'msg'
                },
                {
                    item_type: 'field',
                    id: 'sender',
                    value: 'admin',
                    hidden: true
                }
            ]
        }
    ]
}



var menu_for_activity = {
    category: ['activity'],
    menus: [{
            title: i18n.setting_biz_table,
            opcode: 'set_activity_table',
            place: 'context',
            itemcfg: [{
                    item_type: 'field',
                    label: i18n.activity,
                    value: '#text',
                    readonly: true
                },
                {
                    item_type: 'dnd_2_col',
                    label: i18n.select_biz_table,
                    id: 'base_table',
                    left_category: 'biz_tables',
                    right_category: 'biz_table_by_base_table',
                    right_forced_one: true,
                    right_value: true,
                    left_filter_value: 'base_table'
                }
            ]
        },
        {
            title: i18n.setting_add_edit_delete_cfg,
            opcode: 'set_activity_curd',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.activity,
                value: '#text',
                readonly: true
            }, {
                item_type: 'checkbox',
                label: i18n.allow_add,
                checkbox: true,
                id: 'fn_add'
            }, {
                item_type: 'checkbox',
                label: i18n.allow_delete,
                checkbox: true,
                id: 'fn_del'
            }, {
                item_type: 'checkbox',
                label: i18n.allow_update,
                checkbox: true,
                id: 'fn_update'
            }]
        }, {
            title: i18n.copy,
            opcode: 'mem_copy',
            place: 'context',
            itemcfg: []
        }, {
            title: i18n.set_owner_data_only,
            opcode: 'set_owner_data_only',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.activity,
                value: '#text',
                readonly: true
            }, {
                item_type: 'checkbox',
                label: i18n.set_owner_data_only,
                checkbox: true,
                id: 'owner_data_only'
            }]
        }
    ]
}


var menu_for_js_file = {
    category: ['js_file'],
    menus: [{
        title: i18n.edit_js,
        opcode: 'update_file_content',
        width: 800,
        place: 'context',
        callback_set_url: 'file/getContent',
        json: {
            os_path: '#os_path',
            fname: '#value'
        },
        callback_set_json_key: '/',
        itemcfg: [{
                item_type: 'field',
                label: i18n.edit,
                value: '#text',
                readonly: true,
                id: 'file'
            }, {
                item_type: 'textarea',
                width: 850,
                height: 350,
                id: 'file_content',
                path: 'content'
            },
            {
                item_type: 'field',
                label: i18n.activity,
                value: '#os_path',
                hidden: true,
                id: 'os_path'
            }
        ]
    }]
}

var menu_for_sql_statement = {
    category: ['sql_statement'],
    menus: [{
        title: i18n.edit_sql,
        width: 800,
        opcode: 'update_sql',
        place: 'context',
        callback_set_url: 'activity/getActRawData',
        json: {
            id: '#id'
        },
        callback_set_json_key: '/',
        itemcfg: [{
            item_type: 'textarea',
            label: 'SQL',
            width: 850,
            height: 350,
            id: 'sql',
            path: 'sql'
        }]
    }]
}

var menu_for_based_biz_table = {
    category: ['based_biz_table'],
    menus: [{
            title: i18n.set_forbidden_fields,
            opcode: 'set_forbidden_col',
            place: 'context',
            itemcfg: [{
                item_type: 'dnd_2_col',
                id: 'field',
                value: 'hostby',
                label: i18n.select_forbidden_field,
                left_category: 'biz_cols_by_actcode',
                right_category: 'forbidden_biz_cols_by_actcode',
                left_filter_value: 'hostby',
                right_value: true
            }]
        }, {
            title: i18n.set_order,
            opcode: 'set_id_order',
            place: 'context',
            itemcfg: [{
                item_type: 'radio_group',
                label: i18n.select_order,
                id: 'id_order_select',
                items: [{
                    xtype: 'radio',
                    boxLabel: i18n.asc,
                    id: 'id_order_asc',
                    name: 'id_order',
                    inputValue: 'asc',
                    checked: true
                }, {
                    xtype: 'radio',
                    boxLabel: i18n.desc,
                    id: 'id_order_desc',
                    name: 'id_order',
                    inputValue: 'desc'
                }]
            }]
        },
        {
            title: i18n.edit_layout,
            opcode: 'set_form_layout',
            place: 'context',
            width: 900,
            height: 420,
            itemcfg: [{
                item_type: 'dndgrid',
                gridlabel: i18n.mouse_drag_drop,
                category_to_use: 'table',
                dndgrid: true,
                self_dnd: false,
                grid_ext_id: 'reorder_columns_grid',
                value_reference: 'table',
                width: 200,
                fields: [{
                    column: 'value',
                    column_title: i18n.field
                }]
            }, {
                item_type: 'layout_panel',
                layout_panel: i18n.layout,
                id: 'x_layout_form',
                value: '#table',
                grid_ext_id: 'x_grid_for_dnd'
            }]
        }
    ]
}

var menu_for_btn_a2a = {
    category: ['btn_a2a'],
    menus: [{
            title: i18n.rename,
            opcode: 'rename_a2a_btn',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.rename,
                value: '#text'
            }]
        },
        {
            title: i18n.edit,
            opcode: 'edit_a2a_btn',
            place: 'context',
            callback_set_url: 'nanx/get_a2a_detail',
            json: {
                id: '#id'
            },
            callback_set_json_key: 'a2a_detail',
            itemcfg: [{
                    item_type: 'field',
                    id: 'btn_name',
                    value: '#text',
                    readonly: true,
                    label: i18n.button_text
                },
                {
                    item_type: 'combo_list',
                    label: 'this act field',
                    id: 'field_for_main_activity',
                    value: '##maintable',
                    path: 'field_for_main_activity',
                    category_to_use: 'biz_cols',
                },
                {
                    item_type: 'combo_group',
                    root_combox: {
                        id: 'activity_for_btn',
                        label: 'activity_for_btn',
                        path: 'activity_for_btn',
                        level: 1,
                        group_id: 'a2a_detail_gp',
                        ds_auto: false,
                        value_key_for_slave: 'base_table',
                        category_to_use: 'activitys'
                    },
                    slave_comboxes: [{
                        id: 'field_for_sub_activity',
                        label: 'field_for_sub_activity',
                        ds_auto: false,
                        level: 2,
                        group_id: 'a2a_detail_gp',
                        path: 'field_for_sub_activity',
                        category_to_use: 'biz_cols'
                    }]
                }
            ]
        },
        {
            title: i18n.remove_this_btn,
            opcode: 'remove_a2a_btn',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.remove,
                value: '#text'
            }]
        }
    ]
}


var menu_for_users = {
    category: ['users'],
    menus: [{
        title: i18n.add_user,
        opcode: 'add_user',
        place: 'context',
        itemcfg: [{
            item_type: 'field',
            label: i18n.account,
            id: 'user'
        }, {
            item_type: 'field',
            label: i18n.staff_name,
            id: 'staff_name'
        }]
    }, {
        title: i18n.group_sms,
        opcode: 'group_sms',
        place: 'context',
        itemcfg: [{
                item_type: 'field',
                label: i18n.sender,
                id: 'sender',
                value: 'admin',
                hidden: true
            },
            {
                item_type: 'field',
                label: i18n.msg_title,
                id: 'title'
            }, {
                item_type: 'StarHtmleditor',
                label: i18n.message,
                edit_as_html: 1,
                id: 'msg'
            }, {
                item_type: 'check_group',
                label: i18n.select_msg_recever,
                group_category: 'users',
                all_checked: true,
                height: 10,
                id: 'sms_receivers',
                hidden: true
            }
        ]
    }]
}


var menu_for_user_role_under_acls = {
    category: ['user_role_under_acls'],
    menus: [{
            title: i18n.set_activity_order,
            opcode: 'set_activity_order',
            place: 'context',
            itemcfg: [{
                    item_type: 'field',
                    label: i18n.table,
                    value: '#text'
                },
                {
                    item_type: 'dndgrid',
                    gridlabel: i18n.col_reorder_help,
                    category_to_use: 'activity_under_role',
                    dndgrid: true,
                    self_dnd: true,
                    grid_ext_id: 'reorder_activity_order_grid',
                    value_reference: 'value',
                    width: 470,
                    fields: [{
                            column: 'text',
                            width: 300,
                            column_title: i18n.activity
                        },
                        {
                            column: 'value',
                            hidden: true,
                            column_title: i18n.activity
                        }


                    ]
                }
            ]
        },
        {
            title: i18n.set_activity_menu,
            opcode: 'set_activity_menu',
            place: 'context',
            width: 800,
            height: 420,
            itemcfg: [{
                    item_type: 'field',
                    label: i18n.table,
                    value: '#text'
                },
                {
                    item_type: 'dndgrid',
                    gridlabel: i18n.col_reorder_help,
                    category_to_use: 'activity_under_role',
                    dndgrid: true,
                    self_dnd: false,
                    grid_ext_id: 'reorder_activity_order_grid',
                    value_reference: 'value',
                    width: 304,
                    fields: [{
                            column: 'text',
                            width: 200,
                            column_title: i18n.activity
                        },
                        {
                            column: 'value',
                            hidden: true,
                            column_title: i18n.activity
                        }
                    ]
                },
                {
                    item_type: 'menuTreeGrid', //取某个角色的菜单分组情况
                    value_reference: 'value'
                }
            ]
        }
    ]
}


var menu_for_user_under_role = {
    category: ['user_under_role'],
    menus: [{
        title: i18n.remove_user_from_role,
        opcode: 'remove_user',
        place: 'context',
        itemcfg: [{
            item_type: 'field',
            label: i18n.remove,
            value: '#text'
        }]
    }]
}


var menu_for_codetable = {
    category: ['codetable'],
    menus: [{
        title: i18n.browse,
        opcode: 'edit_codetable',
        place: 'context'
    }]
}

var menu_for_public_cols_show = {
    category: ['public_cols_show'],
    menus: [{
        title: i18n.browse,
        opcode: 'edit_public_field',
        place: 'context'
    }, {
        title: i18n.add_item,
        opcode: 'add_public_item',
        place: 'context',
        itemcfg: [{
            item_type: 'field',
            id: 'field_e',
            label: i18n.field_name
        }, {
            item_type: 'field',
            id: 'field_c',
            label: i18n.field_display
        }]
    }]
}

var menu_for_single_col_display = {
    category: ['single_col_display'],
    menus: [{
        title: i18n.erase,
        opcode: 'delete_public_item',
        place: 'context',
        itemcfg: [{
            item_type: 'field',
            label: i18n.erase,
            value: '#text'
        }]
    }]
}

var menu_for_user_role = {
    category: ['user_role'],
    menus: [{
            title: i18n.rename,
            opcode: 'rename_role',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.new_role_code,
                value: '#text',
                id: 'role_name'
            }]
        }, {
            title: i18n.erase,
            opcode: 'delete_role',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.role_code,
                value: '#text'
            }]
        },
        {
            title: i18n.role_send_msg,
            opcode: 'role_sms',
            place: 'context',
            itemcfg: [{
                    item_type: 'field',
                    label: i18n.sender,
                    id: 'sender',
                    value: 'admin',
                    hidden: true
                },
                {
                    item_type: 'field',
                    label: i18n.msg_title,
                    id: 'title'
                }, {
                    item_type: 'StarHtmleditor',
                    label: i18n.message,
                    edit_as_html: 1,
                    id: 'msg'
                }, {
                    item_type: 'check_group',
                    label: i18n.select_msg_recever,
                    group_category: 'user_role',
                    value: '#value',
                    all_checked: true,
                    id: 'sms_receivers',
                    hidden: false
                }
            ]
        }
    ]
}


var menu_for_roles = {
    category: ['roles'],
    menus: [{
        title: i18n.add_new_role,
        opcode: 'add_role',
        place: 'context',
        itemcfg: [{
            item_type: 'field',
            label: i18n.role_code,
            id: 'role_code'
        }, {
            item_type: 'field',
            label: i18n.role_code_memo,
            id: 'role_name'
        }]
    }]
}


var menu_for_btn_js = {
    category: ['btn_js'],
    menus: [{
        title: i18n.rename,
        opcode: 'rename_js_btn',
        place: 'context',
        itemcfg: [{
            item_type: 'field',
            label: i18n.rename,
            value: '#text'
        }]
    }, {
        title: i18n.remove_this_btn,
        opcode: 'remove_js_btn',
        place: 'context',
        itemcfg: [{
            item_type: 'field',
            label: i18n.remove,
            value: '#text'
        }]
    }]
}


var menu_for_btn_batch = {
    category: ['btn_batch'],
    menus: [{
        title: i18n.rename,
        opcode: 'rename_batch_btn',
        place: 'context',
        itemcfg: [{
            item_type: 'field',
            label: i18n.rename,
            value: '#text'
        }]
    }, {
        title: i18n.remove_this_btn,
        opcode: 'remove_batch_btn',
        place: 'context',
        itemcfg: [{
            item_type: 'field',
            label: i18n.remove,
            value: '#text'
        }]
    }]
}

var contextMenu = [{
        category: ['activity', 'activity_sql', 'activity_js', 'activity_service'],
        menus: [{
            title: i18n.rename_activity,
            opcode: 'rename_activity',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.rename_activity,
                value: '#text',
                id: 'grid_title'
            }]
        }, {
            title: i18n.set_activity_icon,
            opcode: 'set_activity_pic',
            place: 'context',
            itemcfg: [{
                    item_type: 'field',
                    value: '#text',
                    label: i18n.set_activity_icon
                },
                {
                    code: 'NANX_FS_2_TABLE',
                    item_type: 'file_selector',
                    grid_h: 386,
                    file_type: 'img',
                    file_trunk: 5,
                    nosm: true,
                    hideHeaders: true,
                    checkbox: false,
                    id_order: 'desc',
                    os_path: 'imgs'
                }
            ]
        }, {
            title: i18n.delete_activity,
            opcode: 'delete_activity',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.delete_activity,
                value: '#text'
            }]
        }]
    },
    {
        category: ['activity', 'activity_sql', 'activity_service'],
        menus: [{
            title: i18n.set_activity_window_size,
            opcode: 'set_act_size',
            place: 'context',
            label_width: 190,
            itemcfg: [{
                item_type: 'field',
                value: 800,
                label: i18n.activity_display_w_width,
                id: 'win_size_width'
            }, {
                item_type: 'field',
                value: 644,
                label: i18n.activity_display_w_height,
                id: 'win_size_height'
            }, {
                item_type: 'field',
                value: 800,
                label: i18n.set_editing_window_width,
                id: 'win_size_width_operation'
            }]
        }, {
            title: i18n.preview_activity,
            opcode: 'preview_activity'
        }]
    },
    {
        category: ['btn_url', 'btn_html'],
        menus: [{
            title: i18n.rename,
            opcode: 'rename_a2a_btn',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.name,
                value: '#text'
            }]
        }]
    },
    {
        category: ['activity_under_role', 'acl_activity_html', 'acl_activity_js', 'acl_activity_service', 'acl_activity_table', 'acl_activity_sql'],
        menus: [{
            title: i18n.remove_activity,
            opcode: 'remove_activity',
            place: 'context',
            itemcfg: [{
                item_type: 'field',
                label: i18n.remove,
                value: '#text'
            }]
        }]
    }
]


contextMenu.push(
    menu_for_act_notifies, menu_for_act_notify, menu_for_activity, 
    menu_for_activitys, menu_for_all, menu_for_based_biz_table, 
    menu_for_biz_col, menu_for_biz_table, menu_for_biz_tables, 
    menu_for_btn_a2a, menu_for_btn_batch, menu_for_btn_js, 
    menu_for_buttons, menu_for_codetable, menu_for_column, 
    menu_for_dropdown_groups, menu_for_dropdown_item, menu_for_hook, 
    menu_for_hooks, menu_for_js_file, menu_for_medias, menu_for_public_cols_show, 
    menu_for_roles, menu_for_single_col_display, menu_for_sql_runner, 
    menu_for_sql_statement, menu_for_syscfgs, menu_for_table, 
    menu_for_trigger_group, menu_for_trigger_groups, menu_for_user, 
    menu_for_user_role, menu_for_user_role_under_acls, menu_for_tables,
    menu_for_user_under_role, menu_for_users)