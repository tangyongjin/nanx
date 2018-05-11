<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Log extends CI_Controller
{
    
    
    function index()
    {

        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);

        $base_url = $this->config->item('base_url');
        $this->load->helper('file');
        $jstr = '<script src="' . $base_url . 'jslib/jquery/jquery-1.7.1.min.js" type="text/javascript" charset="utf-8"></script>';
        $jstr .= '<script src="' . $base_url . 'js/log.js" type="text/javascript" charset="utf-8"></script>';
        $css     = $base_url . "css/log.css";
        $css_str = "<link rel='stylesheet' href=$css><link rel='shortcut icon' href='/imgs/log.ico'>";
        echo '<html><head><meta http-equiv="content-type" content="text/html;charset=utf-8">' . $jstr . $css_str . '<title>API日志</title></head>';
        echo "<body><div>";
        echo "<input onclick=clear_log() type=button value=Clear_log name=Hide_Input>";
        echo "</div>";
        $logfile = helper_getlogname();
        $string = read_file(helper_getlogname());
        $php_errmsg='<h2>PHP error info:(/tmp/php_error.log)</h2>'.read_file('/tmp/php_error.log');
        echo "<pre>" . $php_errmsg . "</pre>";
        echo "<h2>Docker:logfile=$logfile </h2>";
        echo "<br/>";
        echo "<pre>" . $string . "</pre>";
        echo "</body></html>";
    }
    
    
    public function clearlog()
    {
        file_put_contents(helper_getlogname(), '');
        file_put_contents('/tmp/php_error.log', '');
    
    }
    

    public function test(){

     
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);
        // $php_errmsg=read_file('/var/log/apache2/error.log');
        

        // $file_handle = fopen("/var/log/apache2/error.log", "r");
        // die;
        // while (!feof($file_handle)) {
        //    $line = fgets($file_handle);
        //    echo $line;
        // }
        // fclose($file_handle);


        try
    {
      $fileName = '/var/log/apache2/error.log';

      
      $fp = fopen($fileName, "rb");
      if ( !$fp ) {
        throw new Exception('File open failed.');
      } 

      
      if ( !file_exists($fileName) ) {
        throw new Exception('file not found ???? ');
      }


      $str = stream_get_contents($fp);
      fclose($fp);

      // send success JSON

    } catch ( Exception $e ) {

        // print_r($e);

      // send error message if you can
    } 

  

    }
    
     
    
    
}
?>