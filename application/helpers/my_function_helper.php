<?php
 
 
 
 
 function sysdatetime()
 {
  date_default_timezone_set("Asia/Chongqing");
  $cur= date("Y-m-d H:i:s", time()); 
  return $cur;
 }
 
 function sysdate()
 {
 	date_default_timezone_set("Asia/Chongqing");
  $cur= date("Y-m-d", time()); 
  return $cur;
 }
 
 function sysdate_format($format)
 {
 	date_default_timezone_set("Asia/Chongqing");
  $cur= date($format, time()); 
  return $cur;
 }


 function resize_image($file, $w, $h, $crop = false) {
		list($width, $height) = getimagesize($file);
		$r                    = $width / $height;
		if ($crop) {
			if ($width > $height) {
				$width = ceil($width-($width * ($r - $w / $h)));
			} else {
				$height = ceil($height-($height * ($r - $w / $h)));
			}
			$newwidth  = $w;
			$newheight = $h;
		} else {
			if ($w / $h > $r) {
				$newwidth  = $h * $r;
				$newheight = $h;
			} else {
				$newheight = $w / $r;
				$newwidth  = $w;
			}
		}
		$src = imagecreatefromjpeg($file);
		$dst = imagecreatetruecolor($newwidth, $newheight);
		imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
		return $dst;
}


 

function        randstr($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

 
?>