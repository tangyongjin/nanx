<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');
class Ts extends CI_Controller
{
    function   test()
    {
    
     
     echo 111;
     $para="select * fro '111'  ";
     $logtext = var_dump($para,false);
     echo  $logtext;

  
    }
    
     
     
    
     
    

    
    
}
?>
