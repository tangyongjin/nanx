<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');
class Home extends CI_Controller
{
    
    function index()
    {
        
        $this->load->model('MXmenu');
        
        $this->setsession();
        $lang = $lang = $this->i18n->get_current_locale();
        $this->load->model('MUi');
        $page          = $this->MUi->getCommPage('front', $lang);
        $page['left']  = 'jpanel_left';
        $page['right'] = 'jpanel_right';
        
        $allsession = $this->session->all_userdata();
        $roles      = $allsession['roles'][0]['role_code'];
        
        $page['bootstrap_menu'] = $this->MXmenu->getThemeMenu($roles);
        $this->load->view('framework', $page);
        
    }
    
    
    
    
    function checkDatabaseConnection()
    {
        if ($this->load->database() === FALSE) {
            exit('Database not setted.');
        } else {
            return true;
        }
    }
    
    function login()
    {
        
        if ($this->uri->segment(3) === FALSE) {
            $lang = $this->i18n->get_current_locale();
            $this->i18n->load_language();
        } else {
            $lang = $this->uri->segment(3);
            $this->i18n->set_current_locale($lang);
        }
        
        $this->load->model('MUi');
        
        $page              = $this->MUi->getCommPage("login", $lang);
        $page['lang']      = $lang;
        $page['loginview'] = 'loginview';
        $this->load->view('framework', $page);
        
    }
    
    
    function dologin()
    {
        $post = file_get_contents('php://input');
        $p    = (array) json_decode($post);
        $u    = array(
            'user' => $p['account']
        );
        
        $result = array();
        
        $user = $this->db->select('id,user,password,staff_name,active,salt')->get_where('nanx_user', $u)->result_array();
        
        
        if (sizeof($user) != 1) {
            $result['code']  = -1;
            $result['msg']   = $this->lang->line('login_err');
            $result['einfo'] = 'auth failed';
            echo json_encode($result, JSON_UNESCAPED_UNICODE);
            return;
        }
        
        
        if ($user[0]['active'] != 'Y') {
            $result['code'] = -2;
            $result['msg']  = $this->lang->line('user_locked');
            echo json_encode($result, JSON_UNESCAPED_UNICODE);
            return;
        }
        
        
        if (sizeof($user) == 1) {
            $salt              = $user[0]['salt'];
            $pwd_db            = $user[0]['password'];
            $pwd_try           = $p['password'];
            $pwd_try_with_salt = md5(md5($pwd_try) . $salt);
            
            
            if ($pwd_try_with_salt == $pwd_db) {
                $result['code'] = 0;
                $result['msg']  = '';
                $result['user'] = $p['account'];
                
                $user_logged = $p['account'];
                
                
                $this->session->set_userdata('user', $user_logged);
                
                $this->db->where('user', $user_logged);
                $user_roles = $this->db->get('nanx_user_role_assign')->result_array();
                $this->session->set_userdata('roles', $user_roles);
                echo json_encode($result);
                return;
            } else {
                $result['code']  = -1;
                $result['msg']   = $this->lang->line('login_err');
                $result['einfo'] = 'auth failed';
                echo json_encode($result, JSON_UNESCAPED_UNICODE);
                return;
            }
        }
    }
    
    function getFirstLevelActs()
    {
        
        $post = file_get_contents('php://input');
        $para = (array ) json_decode($post);
        
        $parent = $para['parent'];
        
         
        $this->load->model('MXmenu');
        $this->load->model('MUi');
        $allsession = $this->session->all_userdata();
        $roles         = $allsession['roles'];
        $activity_list = $this->MXmenu->getActivitybyRoleCode($roles, $parent);
        
        $ret = array();
        $tmp = array();
        foreach ($activity_list as $act) {
            
            $block                = $this->MXmenu->getOneBlockbyActivityCode($act['activity_code']);
            $tmp['activity_code'] = $act['activity_code'];
            $tmp['block']         = $block;
            $ret[]                = $tmp;
        }
        echo json_encode($ret, JSON_UNESCAPED_UNICODE);
    }
    
    function setsession()
    {
        
        $session_data = array();
        $user = $this->session->userdata('user');
        
        
        $this->load->model('MUserRole');
        $this->load->model('MSystempara');
        $session_data['user'] = $user;
        
        
        $sql = "select role_code from nanx_user_role_assign where user='" . $user . "' ";
        $roles                 = $this->db->query($sql)->result_array();
        $session_data['roles'] = $roles;
        
        
        $activity_list = $this->MUserRole->getActivitybyRoleCode($roles);
        
        $activity                      = array_retrieve($activity_list, 'activity_code');
        $session_data['user_activity'] = $activity;
        
        $sql                        = "select  *  from nanx_user where user='" . $user . "'";
        $user_get                   = $this->db->query($sql)->row_array();
        $session_data['staff_name'] = $user_get['staff_name'];
        
        
        $sql                        = "select  *  from nanx_who_is_who where user='" . $user . "'";
        $who_is_who                 = $this->db->query($sql)->result_array();
        $session_data['who_is_who'] = $who_is_who;
        
        $page_title   = $this->MSystempara->getCfgItem('PAGE_TITLE');
        $banner_title = $this->MSystempara->getCfgItem('BANNER_TITLE');
        
        $session_data['page_title']   = $page_title;
        $session_data['banner_title'] = $banner_title;
        $this->session->set_userdata($session_data);
    }
    
    function logout()
    {
        print_r($this->session->userdata);
        $this->session->sess_destroy();
        print_r($this->session->userdata);
        redirect('home/login');
    }
    
    
    function testemail()
    {
        $this->load->library('email');
        $this->email->from('tangyongjin97@qq.com', 'Tang');
        $this->email->to('tangyongjin97@qq.com');
        $this->email->subject('Email Test');
        $this->email->message('测试邮件,中文');
        $this->email->send();
        echo $this->email->print_debugger();
    }
}
?>