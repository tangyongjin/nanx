 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>

       <?php
          if (isset($loginview)){
         	 header('content-type:text/html;charset=utf-8;');
             header('kickoutlogin:kickoutlogin') ;
          }else
          {
            header('content-type:text/html;charset=utf-8;');
          }
         echo '<title>' . $page_title .'</title>';
         echo $css_and_js;
      ?>
	</head>
    <body id="minwidth-body">
		<?php

		  
		echo '<div id="border-top" class="h_blue">';
		$bs_url = $this->config->item('base_url');
		 

		$hostname ='http://'.getenv('HTTP_HOST');

		echo "<div id=logo_nanx><a href=$hostname><img src=$bs_url/css/images/nanx_logo.png /></a></div>";
		 

		echo "<div id=menu_wrapper>";
		echo $banner_title;
		 
        if (!isset($loginview))
			{
			echo $current_user_info;
			echo $sms_info;
			echo $mail_info;
			echo $logout_info;
			echo $backend_info;
			}
        
         if( isset($bootstrap_menu) ){
            echo $bootstrap_menu;
         }
        

		echo '</div>';
		 
		echo '</div>';

		?>	 
   
	<div id="content-box">
					<?php
						$user_item = 'user';
						if (isset($loginview))
							{
						      $this->load->view($loginview);
							}
						  else
							{
							 $this->load->view($left);
					    	 $this->load->view($right);

							if (isset($activity_div))
								{
								echo $activity_div;
								}
							}

						 
						?>
		       
		 
	</div>
	<div id=footer>
	  <?php
	    date_default_timezone_set('PRC');
		$date = date('Y-m-d');
		$week = $this->lang->line('week') [date('w') ];
       echo "<div id=foot_date>$date $week</div>";
      ?>
	</div>
</body>
</html>
