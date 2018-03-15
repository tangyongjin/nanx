<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');
class Log extends CI_Controller
{
     

    function showlog(){


    $base_url=       $this->config->item('base_url');

    $this->load->helper('file');
		$jstr = '<script src="'.$base_url . 'jslib/jquery/jquery-1.7.1.min.js" type="text/javascript" charset="utf-8"></script>';
		$jstr .= '<script src="'. $base_url .'js/log.js" type="text/javascript" charset="utf-8"></script>';
		$css  = $base_url."css/log.css";
		$css_str = "<link rel='stylesheet' href=$css><link rel='shortcut icon' href='/imgs/log.ico'>";
		echo '<html><head><meta http-equiv="content-type" content="text/html;charset=utf-8">' . $jstr . $css_str . 
    '<title>和园区API日志</title></head>';
		echo "<body><div>";        
		echo "<input onclick=clear_log() type=button value=Clear_log name=Hide_Input>";
		echo "</div>";
        $logfile=helper_getlogname();
		echo "<h2>Docker:logfile=$logfile </h2>";
		echo "<br/>";
		$string = read_file( helper_getlogname()  );
        echo  "<pre>" .$string."</pre>";
        echo "</body></html>";
    }


     public function clearlog(){
         file_put_contents( helper_getlogname(),'');
     }
     
      public function test(){
      	 echo "111" ;
      	 echo helper_getlogname();
     }

   function tree($arr,$p_id='0') {
      $tree = array();
      foreach($arr as $row){
          if($row['parent_id']==$p_id){
              $tmp = $this->tree($arr,$row['id']);
              if($tmp){
                  $row['children']=$tmp;
                  $row['leaf']=false ;
              }
              else
              {
                 $row['leaf']=true ;
              }
              $tree[]=$row;                
          }
      }
      return $tree;         
   } 
     

     public function abc(){

         $this->load->model('MTree');
         
         $sql = "SELECT id,title as text, parent_id FROM parkos_org  ";
         $results = $this->db->query($sql)->result_array();
         $tree = $this->tree($results,0);
         print_r( json_encode(  $tree));

 
     }

      
    
    
}
?>
