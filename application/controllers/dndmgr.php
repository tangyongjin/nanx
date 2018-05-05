<?php
 
class Dndmgr extends CI_Controller
{
    

     function dnd()
    {
        $post   = file_get_contents('php://input');
        $para   = (array ) json_decode($post);
        $src    = (array ) $para['src'];
        $target = (array ) $para['target'];
        $opcode = $this->getDnDOpcode($src, $target);
        
        $all       = $this->DndActionConfig();
        $dnd_opcfg = $all[$opcode];
        
        $tbused    = $dnd_opcfg['tbused'];
        $dbcmdtype = $dnd_opcfg['dbcmdtype'];
        $paracfg   = $dnd_opcfg['paracfg'];
        
        $data = array();
        $data = $this->getDndData($paracfg, $src, $target);
        
        
        if ($dbcmdtype == 'update') {
            $wherecfg = $dnd_opcfg['wherecfg'];
            $where    = $this->getDndWhere($wherecfg, $src, $target);
            $this->db->update($tbused, $data, $where);
        } else {
            $this->db->insert($tbused, $data);
        }
        
        $errno = $this->db->_error_number();
        
        if ($errno == 0) {
            $res = array(
                'success' => true,
                'opcode' => $opcode,
                'msg' => $this->lang->line('dnd_op_success')
            );
        } else {
            $res = array(
                'success' => false,
                'opcode' => $opcode,
                'msg' => $this->lang->line('dnd_op_failure')
            );
        }
        echo json_encode($res);
    }


    function DndActionConfig()
    {
        $cfg = array(
            'dnd_set_activity_base_table' => array(
                'tbused' => 'nanx_activity',
                'dbcmdtype' => 'update',
                'paracfg' => array(
                    'base_table' => array(
                        'getFrom' => 'src',
                        'value' => 'value'
                    )
                ),
                'wherecfg' => array(
                    'id' => array(
                        'getFrom' => 'target',
                        'value' => 'id'
                    )
                )
            ),
            
            'dnd_create_activity_via_base_table' => array(
                'tbused' => 'nanx_activity',
                'dbcmdtype' => 'insert',
                'paracfg' => array(
                    'base_table' => array(
                        'getFrom' => 'src',
                        'value' => 'table'
                    ),
                    'grid_title' => array(
                        'getFrom' => 'src',
                        'function' => 'generate_act_name',
                        'value' => 'text'
                    ),
                    'activity_code' => array(
                        'getFrom' => 'src',
                        'function' => 'generate_act_code',
                        'value' => 'table'
                    ),
                    'pic_url' => array(
                        'getFrom' => 'local',
                        'value' => 'act_common.png'
                    ),
                    'activity_type' => array(
                        'getFrom' => 'local',
                        'value' => 'table'
                    ),
                    'win_size_height' => array(
                        'getFrom' => 'local',
                        'value' => '662'
                    ),
                    'win_size_width' => array(
                        'getFrom' => 'local',
                        'value' => '800'
                    )
                )
            ),
            
            'reset_raw_table' => array(
                'tbused' => 'nanx_biz_tables',
                'dbcmdtype' => 'update',
                'paracfg' => array(
                    'table_name' => array(
                        'getFrom' => 'src',
                        'value' => 'value'
                    )
                ),
                'wherecfg' => array(
                    'id' => array(
                        'getFrom' => 'target',
                        'value' => 'id'
                    )
                )
            ),
            
            'reuse_button' => array(
                'tbused' => 'nanx_activity_a2a_btns',
                'dbcmdtype' => 'insert',
                'paracfg' => array(
                    'activity_code' => 'hostby',
                    'btn_name' => 'btn_name',
                    'activity_for_btn' => 'nanxdropdown_0'
                )
            ),
            
            'dnd_user_role_add_activity' => array(
                'tbused' => 'nanx_user_role_privilege',
                'dbcmdtype' => 'insert',
                'paracfg' => array(
                    'activity_code' => array(
                        'getFrom' => 'src',
                        'value' => 'value'
                    ),
                    'role_code' => array(
                        'getFrom' => 'target',
                        'value' => 'value'
                    )
                )
            ),
            
            'dnd_user_role_add_service_activity' => array(
                'tbused' => 'nanx_user_role_privilege',
                'dbcmdtype' => 'insert',
                'paracfg' => array(
                    'activity_code' => array(
                        'getFrom' => 'src',
                        'value' => 'value'
                    ),
                    'role_code' => array(
                        'getFrom' => 'target',
                        'value' => 'value'
                    )
                )
            ),
            
            'dnd_user_role_add_js_activity' => array(
                'tbused' => 'nanx_user_role_privilege',
                'dbcmdtype' => 'insert',
                'paracfg' => array(
                    'activity_code' => array(
                        'getFrom' => 'src',
                        'value' => 'value'
                    ),
                    'role_code' => array(
                        'getFrom' => 'target',
                        'value' => 'value'
                    )
                )
            ),
            
            'dnd_user_role_add_sql_activity' => array(
                'tbused' => 'nanx_user_role_privilege',
                'dbcmdtype' => 'insert',
                'paracfg' => array(
                    'activity_code' => array(
                        'getFrom' => 'src',
                        'value' => 'value'
                    ),
                    'role_code' => array(
                        'getFrom' => 'target',
                        'value' => 'value'
                    )
                )
            ),
            
            
            'dnd_create_biz_table' => array(
                'tbused' => 'nanx_biz_tables',
                'dbcmdtype' => 'insert',
                'paracfg' => array(
                    'table_name' => array(
                        'getFrom' => 'src',
                        'value' => 'value'
                    ),
                    'table_screen_name' => array(
                        'getFrom' => 'src',
                        'prefix' => $this->lang->line('biz'),
                        'value' => 'value'
                    )
                )
            ),
            
            
            
            'dnd_user_role_add_html_activity' => array(
                'tbused' => 'nanx_user_role_privilege',
                'dbcmdtype' => 'insert',
                'paracfg' => array(
                    'activity_code' => array(
                        'getFrom' => 'src',
                        'value' => 'value'
                    ),
                    'role_code' => array(
                        'getFrom' => 'target',
                        'value' => 'value'
                    )
                )
            ),
            
            'add_user_to_role' => array(
                'tbused' => 'nanx_user_role_assign',
                'dbcmdtype' => 'insert',
                'paracfg' => array(
                    'user' => array(
                        'getFrom' => 'src',
                        'value' => 'value'
                    ),
                    'role_code' => array(
                        'getFrom' => 'target',
                        'value' => 'value'
                    )
                )
            )
        );
        return $cfg;
    }
    
    function DnDSrcTargetCfg()
    {
        $cfg = array(
            'dnd_set_activity_base_table' => array(
                'src' => 'biz_table',
                'target' => 'activity'
            ),
            
            'dnd_create_activity_via_base_table' => array(
                'src' => 'biz_table',
                'target' => 'activitys'
            ),
            
            'reset_raw_table' => array(
                'src' => 'table',
                'target' => 'biz_table'
            ),
            'reuse_button' => array(
                'src' => 'button',
                'target' => 'activity'
            ),
            
            'dnd_user_role_add_activity' => array(
                'src' => 'activity',
                'target' => 'user_role_under_acls'
            ),
            
            'dnd_user_role_add_service_activity' => array(
                'src' => 'activity_service',
                'target' => 'user_role_under_acls'
            ),
            
            'dnd_user_role_add_js_activity' => array(
                'src' => 'activity_js',
                'target' => 'user_role_under_acls'
            ),
            
            'dnd_user_role_add_sql_activity' => array(
                'src' => 'activity_sql',
                'target' => 'user_role_under_acls'
            ),
            
            'dnd_user_role_add_html_activity' => array(
                'src' => 'activity_html',
                'target' => 'user_role_under_acls'
            ),
            
            'dnd_create_biz_table' => array(
                'src' => 'table',
                'target' => 'biz_tables'
            ),
            
            'add_user_to_role' => array(
                'src' => 'user',
                'target' => 'user_role'
            )
        );
        return $cfg;
    }
    
   
    
    
    function getDndData($paracfg, $src, $target)
    {
        $data = array();
        foreach ($paracfg as $field => $field_cfg) {
            $field_src = $field_cfg['getFrom'];
            
            $key_for_value = $field_cfg['value'];
            if ($field_src == 'src') {
                $value = $src[$key_for_value];
                
                
            }
            
            if ($field_src == 'target') {
                $value = $target[$key_for_value];
                
            }
            
            if (array_key_exists('prefix', $field_cfg)) {
                $value = $field_cfg['prefix'] . '_' . $value;
            }
            
            
            if ($field_src == 'local') {
                $value = $field_cfg['value'];
            }
            
            if (array_key_exists('function', $field_cfg)) {
                $value = $this->process_dnd_data_with_fun($field_cfg['function'], $value);
            }
            $data[$field] = $value;
            
        }
        return $data;
    }
    
    
    function process_dnd_data_with_fun($fun, $v)
    {
        if ($fun == 'generate_act_code') {
            $v = 'act_' . $v . '_' . mt_rand();
        }
        
        if ($fun == 'generate_act_name') {
            $act_prefix = $this->lang->line('activity');
            $v          = $act_prefix . '_' . $v;
        }
        
        return $v;
    }
    
    function getDndWhere($paracfg, $src, $target)
    {
        $where = array();
        foreach ($paracfg as $field => $field_cfg) {
            $f_src      = $field_cfg['getFrom'];
            $f_key_used = $field_cfg['value'];
            if ($f_src == 'src') {
                $value = $src[$f_key_used];
            }
            if ($f_src == 'target') {
                $value = $target[$f_key_used];
            }
            $where[$field] = $value;
        }
        return $where;
    }
    
    function getDnDOpcode($src, $target)
    {
        $src          = $src['category'];
        $target       = $target['category'];
        $cfgs         = $this->DnDSrcTargetCfg();
        $opcode_found = null;
        foreach ($cfgs as $opcode => $cfg) {
            if (($cfg['src'] == $src) && ($cfg['target'] == $target)) {
                $opcode_found = $opcode;
                break;
            }
        }
        return $opcode_found;
    }
    
}
?>