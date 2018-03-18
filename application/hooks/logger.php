<?php

class Logger
{
    
     
 
    private $url_model;
    private $url_method;
    private $url_param;
    private $app_config;
   
  
    
    public function __construct() {
        
        require_once "/var/www/html/application/helpers/my_logger_helper.php";
       
    }

 
     
    function mlog()
    {
     
        header("Access-Control-Allow-Origin: * "); 
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept"); 
        error_reporting(E_ALL);
        ini_set('display_errors', 0);


        register_shutdown_function([&$this, 'shutdown_error']);
        set_error_handler([&$this, 'myErrorHandler']  );  

        $url              = $_SERVER['PHP_SELF'];
        $arr              = explode('/', $url);
        $arr              = array_slice($arr, array_search('index.php', $arr) + 1, count($arr));
        $this->url_model  = isset($arr[0]) ? $arr[0] : '';
        $this->url_method = isset($arr[1]) ? $arr[1] : 'index';
        $this->url_param  = isset($arr[2]) ? $arr[2] : '';
        
        if (strpos($_SERVER['REQUEST_URI'], 'showlog') > -1) {
            return false;
        }
        
        $post = file_get_contents('php://input');
        write_log($_SERVER['REQUEST_URI'], $post);
    }

    
 

 



    function shutdown_error()
    {
        
        $error = error_get_last();
        if ($error['type'] === E_ERROR) {
            logtext($error);
        }
        
    }


    function myErrorHandler($errno, $errstr, $errfile, $errline)
    {

        $errinfo='<div style="border:1px solid #990000;padding-left:20px;margin:0 0 10px 0;">';
        $errinfo.="Message: [$errno] $errstr<br/>";
        $errinfo.="Line Number: [$errline]<br/>";
        $errinfo.="Filename: [$errfile]</div>  ";
       
        logtext($errinfo);

    }
     
    
    
 



}

?>
