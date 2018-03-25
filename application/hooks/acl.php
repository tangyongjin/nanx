<?php

class ACL 
{
    private $url_model; 
    private $url_method; 
    private $url_param; 
    private $CI;
    
    function check_login()
    {
       $CI=&get_instance();
       $session_id = $this->CI->session->userdata('session_id');
       $user = $this->CI->session->userdata('user');
       $alluserdata=$this->CI->session->all_userdata();
       if (empty($user)){return false;} 
       return true;
    }
    
    function filter()
    {
       
       
        $this->CI = & get_instance();
        

        //无论url是否有index.php,先替换掉index.php
       
        $url = str_replace( '/index.php','', $_SERVER['REQUEST_URI']);
        
        // $url = str_replace( '//home','/home', $_SERVER['REQUEST_URI']);
        

        $arr = explode('/', $url);

        // debug($arr);  
        $arr = array_slice($arr, array_search('index.php', $arr) + 1, count($arr));
        $this->url_model = isset($arr[0]) ? $arr[0] : '';
        $this->url_method = isset($arr[1]) ? $arr[1] : 'index';
        $this->url_param = isset($arr[2]) ? $arr[2] : '';
 
       
   

        if(in_array($this->url_method,array('auto_load_language','logger','listEvent','login','ie6issue','dologin','logout','writelog','showlog','clearlog','writelog')))
        {  
          return true;
        }

        $is_login= $this->check_login();

        if(!$is_login) 
        { 
            
            $login_url= $this->CI->config->item('login_url');
            logtext("check_login failed, will return; login_url is $login_url");
            // $login_url=
            header("Location:$bs_url/home/login");
            return false ;             
        }
         else 
        {
          return  true;
        }
    }
}

?>
