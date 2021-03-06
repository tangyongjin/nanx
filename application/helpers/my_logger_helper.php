 <?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');





function helper_getlogname()
{
    
    $CI =& get_instance();
    $logfile    = $CI->config->item('logfilename');
    $logdir     = FCPATH . $CI->config->item('logdir');
    $log_divide = $CI->config->item('log_divide');
    
    
    
    $fname = pathinfo($logfile, PATHINFO_FILENAME);
    $ext   = pathinfo($logfile, PATHINFO_EXTENSION);
    
    
    
    if ($log_divide == 'one') {
        $fname = $fname;
    }
    
    if ($log_divide == 'day') {
        $fname = $fname . '-' . date("Y-m-d", time());
    }
    
    if ($log_divide == 'month') {
        $fname = $fname . '-' . date("Y-m", time());
    }
    
    
    if ($log_divide == 'year') {
        $fname = $fname . '-' . date("Y", time());
    }
    
    return $logdir . '/' . $fname . ".$ext";
    
}


function logtext($txt)
{
    $log = fopen(helper_getlogname(), "a+");
    fwrite($log, $txt);
    fwrite($log, "\n");
    fclose($log);
}


function write_log($uri, $post)
{
    $ci =& get_instance();
    if (!$ci->config->item('uselog')) {
        return;
    }
    
    $fname = helper_getlogname();
    @$log = fopen($fname, 'a+');
    if (!$log) {
        return;
    }
    
    fwrite($log, "<hr/>");
    $time = strftime("%Y-%m-%d %H:%M:%S", time());
    fwrite($log, "<div><span class =functionname>" . $uri . '</span></div>');
    fwrite($log, "<div>" . $time . "</div>");
    fwrite($log, $post);
    fclose($log);
}





?> 