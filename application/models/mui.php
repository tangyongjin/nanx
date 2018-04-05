<?php
class MUI extends CI_Model
{
    
    
    
    function get_login_file_need($lang_folder)
    {
        
        return array(
            'css' => array(
                'css/country.css',
                'css/template.css',
                'css/reveal.css',
                'jslib/ext/resources/css/ext-all.css'
            ),
            'js' => array(
                'js/language/' . $lang_folder . '/i18n.js',
                'jslib/jquery/jquery-1.7.1.min.js',
                'jslib/jquery/country.js',
                'js/login.js',
                'js/fixheight.js',
                'js/globalvars.js',
                'js/jquery.reveal.js'
            )
        );
    }
    
    function get_front_file_need($lang_folder)
    {
        return array(
            'css' => array(
                'menutheme/css/menu.css',
                'menutheme/css/font-awesome.css',
                'css/template.css',
                'jslib/ext/resources/css/ext-all.css',
                'jslib/ext/ux/fileuploadfield/css/fileuploadfield.css',
                'jslib/Datetime/Spinner.css',
                'css/toolbars.css'
                
            ),
            
            'js' => array(
                'jslib/jquery/jquery-1.7.1.min.js',
                'js/language/' . $lang_folder . '/i18n.js',
                'jslib/ext/ext-base.js',
                'jslib/ext/ext-all.js',
                'jslib/Datetime/Spinner.js',
                'jslib/Datetime/SpinnerField.js',
                'jslib/Datetime/DateTimeField.js',
                'jslib/ext/Power_htmleditor.js',
                'jslib/ext/ux/fileuploadfield/fileuploadfield.js',
                'js/globalvars.js',
                'js/activity.plug.js',
                'js/activity_curd.js',
                'js/backend/backend_tree_tab_cfg.js',
                'js/util.js',
                'js/compoment_menu_tree.js',
                'js/compoment_basic_combo.js',
                'js/form.formbuilder.js',
                'js/compoment_file_upload.js',
                'js/fb.js',
                'js/fixheight.js',
                'js/event_list.js',
                'js/boot.js',
                'menutheme/js/function.js'
            )
        );
    }
    
    function get_backend_file_need($lang_folder)
    {
        return array(
            'css' => array(
                'jslib/ext/resources/css/ext-all.css',
                'css/backend/dblite.css',
                'css/backend/multiselect.css',
                'jslib/ext/ux/fileuploadfield/css/fileuploadfield.css',
                'jslib/ext/ux/css/data-view.css',
                'css/toolbars.css'
            ),
            'js' => array(
                'js/language/' . $lang_folder . '/i18n.js',
                'jslib/ext/ext-base.js',
                'jslib/ext/ext-all.js',
                'jslib/ext/ux/CheckColumn.js',
                'jslib/ext/ux/MultiSelect.js',
                'jslib/Datetime/Spinner.js',
                'jslib/Datetime/SpinnerField.js',
                'jslib/Datetime/DateTimeField.js',
                'jslib/ext/ux/ItemSelector.js',
                'jslib/ext/Power_htmleditor.js',
                'jslib/ext/ux/fileuploadfield/fileuploadfield.js',
                'js/globalvars.js',
                'js/backend/contextmenu.js',
                'js/backend/backend_tree_tab_cfg.js',
                'js/util.js',
                'js/form.formbuilder.js',
                'js/compoment_file_upload.js',
                'js/compoment_menu_tree.js',
                'js/compoment_basic_combo.js',
                'js/compoment_layoutmanager.js',
                'js/compoment_dragdrop_grid.js',
                'js/compoment_trigger_group.js',
                'js/fb.js',
                'js/backend/portal.js',
                'js/activity_curd.js',
                'js/backend/tabsmnt.js',
                'js/backend/topmenu.js'
            )
        );
    }
    
    
    function getCssJSCfg($lang_folder)
    {
        
        $cfg = array(
            'login' => $this->get_login_file_need($lang_folder),
            'front' => $this->get_front_file_need($lang_folder),
            'backend' => $this->get_backend_file_need($lang_folder)
        );
        
        $bs_url = $this->config->item('base_url');
        
        
        if (substr($bs_url, -1) == "/") {
            
            $bs_url = substr($bs_url, 0, -1);
        }
        
        
        while (list($key, $value) = each($cfg)) {
            for ($index = 0; $index < count($cfg[$key]['css']); $index++) {
                $onefile                  = $cfg[$key]['css'][$index];
                $css                      = "<link rel='stylesheet' href='BASE_URL/$onefile'/>";
                $css                      = str_replace("BASE_URL", $bs_url, $css);
                $cfg[$key]['css'][$index] = $css;
            }
            
            for ($index = 0; $index < count($cfg[$key]['js']); $index++) {
                $onefile                 = $cfg[$key]['js'][$index];
                $js                      = "<script type='text/javascript' src='BASE_URL/$onefile'/></script>";
                $js                      = str_replace("BASE_URL", $bs_url, $js);
                $cfg[$key]['js'][$index] = $js;
            }
        }
        return $cfg;
    }
    
    
    function getCssJsList($flag, $lang_folder)
    {
        $cfg     = $this->getCssJSCfg($lang_folder);
        $jsfile  = $cfg[$flag]['js'];
        $cssfile = $cfg[$flag]['css'];
        $js      = '';
        $css     = '';
        foreach ($jsfile as $one) {
            $js .= $one;
        }
        foreach ($cssfile as $one) {
            $css .= $one;
        }
        
        $bs_url = $this->config->item('base_url');
        
        if (!($flag == 'login')) {
            $app_js = $this->getPluginJs();
            foreach ($app_js as $one) {
                $jsfile = $one['jsfile'];
                $js .= "<script type='text/javascript' src={$bs_url}js/upload/$jsfile></script>";
            }
        }
        return array(
            'js' => $js,
            'css' => $css
        );
    }
    

     
    function getPluginJs()
    {
        $sql   = 'select distinct jsfile ,function_name  from nanx_activity_js_btns where jsfile is not null and length(jsfile)>3
                union 
                select distinct extra_js as jsfile,service_url as function_name from nanx_activity where activity_type="js" ';
        $query = $this->db->query($sql);
        $js    = $query->result_array();
        $js    = array_retrieve($js, array(
            'jsfile',
            'function_name'
        ));
        
        return $js;
    }
    
    
    function getCommPage($flag, $lang_folder)
    {
        $bs_url = $this->config->item('base_url');
        $this->load->model('MSystempara');
        $page_title   = $this->MSystempara->getCfgItem('PAGE_TITLE');
        $logo_pic     = $this->MSystempara->getCfgItem('COMPANY_LOGO');
        $css_js_array = $this->getCssJsList($flag, $lang_folder);
        $topbar       = $this->getTopBar();
        $page         = array(
            'logo_pic' => $logo_pic,
            'page_title' => $page_title,
            'css_and_js' => $css_js_array['css'] . $css_js_array['js'],
            'current_user_info' => $topbar['current_user_info'],
            'banner_title' => $topbar['banner_title'],
            'sms_info' => $topbar['sms_info'],
            'mail_info' => $topbar['mail_info'],
            'logout_info' => $topbar['logout_info'],
            'backend_info' => $topbar['backend_info']
        );
        return $page;
    }
    
    function getTopBar()
    {
        $bs_url = $this->config->item('base_url');
        
        
        $current_user_info = '';
        $sms_info          = '';
        $mail_info         = '';
        $logout_info       = '';
        $backend_info      = '';
        
        $user = $this->session->userdata('user');
        if (!empty($user)) {
            $s                  = $this->session->all_userdata();
            $staff_name         = $this->session->userdata('staff_name');
            $inner_table_value  = $this->session->userdata('inner_table_value');
            $inner_table_column = $this->session->userdata('inner_table_column');
            
            
            date_default_timezone_set('PRC');
            $current_user_info = "<a class=tbar_a href=# id=userpanel>$user/$staff_name</a>";
            $current_user_info .= "<span style='display:none;' id=whoami>$user</span>";
            $current_user_info .= "<span style='display:none;' id=inner_table_value>$inner_table_value</span>";
            $current_user_info .= "<span style='display:none;' id=inner_table_column>$inner_table_column</span>";
            
            $sms_info = '<a class=tbar_a  href=# id=send_sms>' . $this->lang->line('sms') . '</a>';
            
            
            $logout_info  = "<a class=tbar_a  href={$bs_url}home/logout>" . $this->lang->line('logout') . "</a>";
            $backend_info = "<a class=tbar_a  href={$bs_url}backend/admin>" . $this->lang->line('backend') . "</a>";
            $roles        = $this->session->userdata('roles');
            $role_list    = array_retrieve($roles, 'role_code');
            $isadmin      = false;
            if (in_array('admin', $role_list)) {
                $isadmin = true;
            }
            if (!$isadmin) {
                $backend_info = '';
            }
        }
        
        $banner_title = $this->MSystempara->getCfgItem('BANNER_TITLE');
        
        $banner_title = "<a id='company_title' href=#>$banner_title</a>";
        return array(
            'current_user_info' => $current_user_info,
            'sms_info' => $sms_info,
            'mail_info' => $mail_info,
            'logout_info' => $logout_info,
            'banner_title' => $banner_title,
            'backend_info' => $backend_info
        );
    }
    
    
    function getLangSelector($lang)
    {
        $rows = $this->db->get('nanx_country')->result_array();
        $o    = '<div id="polyglotLanguageSwitcher"><form action="#">';
        $o .= '<select id="polyglot-language-options">';
        foreach ($rows as $r) {
            $o .= "<option id=\$r['id'] value=\$r['value'] > \$r['lang_text']</option>";
        }
        $o .= '</select></form></div>';
        return $o;
    }
}
?>