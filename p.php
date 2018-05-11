<?php


 error_reporting(E_ALL);
 ini_set('display_errors', 1);
 echo 'read';
 echo "/var/log/apache2/error.log" ;
 // ccc();
 // ccc();
 // 

 // $myfile = fopen("/tmp/abcd.txt", "a+");

 echo file_get_contents("/var/log/apache2/error.log" );

?>
