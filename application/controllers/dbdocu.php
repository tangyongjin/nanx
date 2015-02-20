<?php if (!defined('BASEPATH')) {exit('No direct script access allowed');
}

class Dbdocu extends CI_Controller {

	function print_table($tab) {
		echo '
  	<style type="text/css">
table{
	width:700px;
	margin:0px auto;
	font:Georgia 11px;
	color:#333333;
	text-align:left;
	border-collapse:collapse;
}
table td{
	border:1px solid blue;
//	width:100px;
	height:30px;
}
</style>

';

		echo '<table  border="1" cellspacing="0" cellpadding="0">';
		echo "<tr><td colspan=2 style='font-size:18px; font-weight:bold;'>" . $tab['name'] . '&nbsp;&nbsp;(' . $tab['comm'] . ")</td></tr>";

		foreach ($tab['cols'] as $onecol) {
			echo "<tr><td style='width:30%;'>" . $onecol['COLUMN_NAME'] . "</td><td>" . $onecol['COLUMN_COMMENT'] . "</td></tr>";
		}

		echo "</table>";
		echo "<br/>";

	}

   function t2(){
 	$webroot = $this->config->item('webroot');
   $c= "\$i18n=\"{a:'name',sex:'22'}\";" ;
   
   $this->load->helper('file');

   $cjs = $webroot . '/js/language/zh-cn/i18n.js';


   $string ='$'. read_file($cjs ) .';';
   
   


   echo $string;
  
    eval($string);
    

   echo $c;
    
   eval($c);
   


   $dd=  json_encode($i18n);
   var_dump( $dd );
   
   var_dump( json_decode($dd) );

   $xx=array( 'a'=>'name','sex'=>'22'  ) ;

   $a=json_encode($xx);
   var_dump($a);

   $p=json_decode($a);

   debug($p);



   }

	function test() {

		$tables = $this->db->list_tables();

		foreach ($tables as $table) {
			$tab_info         = array();
			$tab_info['name'] = $table;

			$sql1 = "select table_name,table_comment FROM information_schema.TABLES T where  table_name='$table'  and  table_schema='kx1000' ";
			$comm = $this->db->query($sql1)->result_array();

			$tab_info['comm'] = $comm[0]['table_comment'];

			$sql2             = "SELECT  C.`COLUMN_NAME`, C.`COLUMN_COMMENT`  FROM information_schema.`COLUMNS` C where  table_schema='kx1000'  and  table_name='$table'";
			$col              = $this->db->query($sql2)->result_array();
			$tab_info['cols'] = $col;

			$this->print_table($tab_info);

		}

	}

	function help_generator() {
		$post = file_get_contents('php://input');
		$para = (array ) json_decode($post);
		$this->write($para);
	}

	function lang_js() {
		$this->load->helper('file');

		echo "/js/language/en/i18n.js  与 /js/language/zh-cn/i18n.js 比较: <br/>";
		

		$webroot = $this->config->item('webroot');
		$ejs     = $webroot . '/js/language/en/i18n.js';

		$e     = fopen($ejs, 'r');
		$e_arr = array();
		while (!feof($e)) {
			$line = fgets($e);
			$line = str_replace('{', '', $line);
			$line = str_replace('}', '', $line);
			if (strpos($line, ':') == true) {
				$kv      = explode(":", $line);
				$e_arr[] = $kv[0];
			}
		}

		$cjs = $webroot . '/js/language/zh-cn/i18n.js';

		$c     = fopen($cjs, 'r');
		$c_arr = array();
		while (!feof($c)) {
			$line = fgets($c);
			$line = str_replace('{', '', $line);
			$line = str_replace('}', '', $line);
			if (strpos($line, ':') == true) {
				$kv      = explode(":", $line);
				$c_arr[] = $kv[0];
			}
		}

		debug($e_arr);
		debug($c_arr);
		$diff = array_diff($e_arr, $c_arr);

		echo "中文缺少:";
		debug($diff);

        echo "英文缺少:";

		$diff = array_diff($c_arr, $e_arr);
		debug($diff);

		$sql = "select  concat('cp  en/i18n.js   ',id,'/i18n.js   ' ) as vv from  nanx_lang where id not in ('en','zh-cn');";
		$bat = $this->db->query($sql)->result_array();
		//debug($bat);
		foreach ($bat as $cp) {
			echo $cp['vv'] . "<br/>";
		}
		return;
	}

	function lang_php() {

		echo " /application/language/en/messages_lang.php  与 /application/language/zh-cn/messages_lang.php 比较: <br/>";
		$webroot = $this->config->item('webroot');
        require( $webroot . '/application/language/en/messages_lang.php' );
        $e_config=$lang;
        $e_arr=array_keys($e_config);
        debug($e_arr);
        unset($lang);
        require( $webroot . '/application/language/zh-cn/messages_lang.php' );
        $c_config=$lang;
        $c_arr=array_keys($c_config);
        debug($c_arr);

		$diff = array_diff($c_arr, $e_arr);
        echo "中文缺少:";
        debug($diff);
        
        $diff = array_diff($e_arr, $c_arr);
        echo "英文缺少:";
        debug($diff);
        
		
		$sql = "select  concat('cp  en/messages_lang.php   ',id,'/messages_lang.php   ' ) as vv from  nanx_lang where id not in ('en','zh-cn');";
		$bat = $this->db->query($sql)->result_array();
		foreach ($bat as $cp) {
			echo $cp['vv'] . "<br/>";
		}
		return;

	}

	function write($cfg) {

		printjson_encode($cfg, JSON_UNESCAPED_UNICODE);
		$this->load->helper('file');
		$fname = 'c:/wamp/www/newoss/helps/' . $cfg['opcode'] . ".html";

		$doc_operation  = $this->lang->line('doc_operation');
		$doc_items_desc = $this->lang->line('doc_items_desc');
		$doc_notice     = $this->lang->line('doc_notice');

		$content = "<div class=back_help>\n<h1>$doc_operation:_OPERATION</h1>\n<div class=operation_desc>deschere</div>\n<div class=back_item_list>_ITEMS</div>\n<div class=back_demo></div>\n<div class=back_notice>$doc_notice</div>\n</div>";
		$op      = $cfg['title'];
		$ul      = "<h1 class=back_items>$doc_items_desc</h1><table class=docu_table>";
		for ($i = 0; $i < count($cfg['items']); $i++) {
			$ul .= '<tr><td>' . $cfg['items'][$i] . '</td><td><div clsss=field_desc>xxxxxx</div></td></tr>';
		}
		$ul .= '</table>';
		$content = str_replace('_OPERATION', $op, $content);
		$content = str_replace('_ITEMS', $ul, $content);
		$content .= "<div class=operation_notice></div>";
		write_file($fname, $content, 'w+');
	}

	function gethelp() {
		$code = $this->uri->segment(3);
		$lang = $this->i18n->get_current_locale();
		if ($code == 'set_biz_field_combo_resorce,set_biz_field_combo_follow') {
			$code = 'set_biz_field_combo_and_follow';
		}
        $baseurl=config_item('base_url');
        $rand=time();
		$v = $baseurl."/application/language/" . $lang . "/" . $code . '.html?rand='.$rand;
	    redirect($v, 'location', 301);
	}
}
?>
