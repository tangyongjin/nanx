<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Util extends CI_Controller {

	 function backupdb(){
   $this->load->dbutil();

   // 备份整个数据库并将其赋值给一个变量
   $backup =& $this->dbutil->backup(); 
    
 

   // 加载文件辅助函数并将文件写入你的服务器
   $this->load->helper('file');
  
   $datestr=date('Ymd_His');
   $fname = "downloads\\".$datestr.".gz";   
   
   write_file( $fname, $backup); 

   // 加载下载辅助函数并将文件发送到你的桌面
   $this->load->helper('download');
   $f=date("Ymd_His");
   $fname=$f.'.gz';   
 
   force_download($fname, $backup); 

}
}
?>