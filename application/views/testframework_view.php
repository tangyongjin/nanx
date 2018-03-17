<!DOCTYPE html>
<html xmlns=http://www.w3.org/1999/xhtml>
<head> <title>ParkOS-项目测试框架</title>


  <meta http-equiv=Content-Type content="text/html;charset=utf-8">  
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=7200" />  


  <script src="/js/jquery.min.js"></script>
  <script src="/js/shCore.js"></script>
  <script src="/js/shBrushPhp.js"></script>
  <script src="/js/shBrushJScript.js"></script>
  <script src="/js/jsoneditor.js"></script>
  
  <script src="/js/tsf_run.js"></script>
  <link rel="shortcut icon" href="images/testframework.ico"> 
  <link rel="stylesheet" href="/css/shCore.css">
  <link rel="stylesheet" href="/css/shThemeDefault.css">
  <link rel="stylesheet" href="/css/jsoneditor.css">
  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <link rel="stylesheet" href="/css/docs.min.css">
 
  <link rel='shortcut icon' href='/imgs/testframework.ico'>

 </head>
<body>
 
 
<br/>
<table><tr>
<td>
    <div class="col-md-9"  style="width:650px;"  role="main">
      <div id="reg_wrapper" class="panel panel-default">
          <div class="panel-heading">

          <!--
          value = $("#test_version_input").val(); 
          -->

           测试版本  <input id="test_version_input"  name="test_version_input"   value=<?php echo $version_to_test;  ?>    style="font-size:20px;width:60px;height:30px;"   /> 
             <span>&nbsp;&nbsp;&nbsp;SID=</span><span id=http_sid></span>
          </div>
          <br>
          <div class="container">
            <form class="form-horizontal">
            <fieldset>
            		<table>
            			 <?php foreach ($controller_and_methods as $one) {echo $one; } ?>
            		</table>
            </fieldset>
            </form>
          </div>
           <br>
      </div>
      <div id="reg_wrapper" class="panel panel-default">
          <div class="panel-heading">


           参数串 {"name":"18600089281","password":"111111"}{"name":"13001027134","password":"zhang000"}
          </div>


          <br/>
      
          <div class="container">
          <form class="form-horizontal">
            <fieldset>
            <div class="form-group">
              <div class="col-md-8">
              <input id="args_str"  name="args_str" type="text" value="{'startingTime':'2017-12-21 14:28:05','endingTime':'2018-01-24 19:28:05' }"  style="width:580px;" class="form-control input-sm">
              </div>

              <div class="col-md-8">
              <br/>
                      <button type="button"     onclick="clear_arg()"  class="btn btn-primary">清除</button>

              </div>

            </div>
            </fieldset>
           </form>
          </div>
           <br>
       </div>

      <br/> 
      <div style="margin-top:10px;" class="well well-sm">
        <button type="button"  id="btn_set_para"   onclick="set_args_from_log()"  class="btn btn-primary">设置输入参数</button>
        <button type="button"     onclick="getJSON()"  class="btn btn-primary">显示输入参数</button>
        <button type="button"     onclick="remote_execute()"  class="btn btn-primary">请求</button>
        <button type="button"     onclick="remote_execute2()"  class="btn btn-primary">加密请求</button>
        <button type="button"     onclick="edit_php()"  class="btn btn-primary">编辑</button>
        <button type="button"     onclick="decypt()"  class="btn btn-warning">解密</button>
        <button type="button"     onclick="autologin()"  class="btn btn-warning">自动登录</button>
        
      </div>
    </div>
</td>
<td>
  <div class="col-md-9"  style="valign:top;height:600px;  width:770px;"  role="main">
  <div id="reg_wrapper" class="panel panel-default">
      <div class="panel-heading">
       输入参数
      </div>
        <div id="jsoneditor_args" style="width:736px;height:352px;"></div>
  </div>
   <div class="panel panel-default">
      <div  style="height:160px;" class="panel-body">
      <button type="button" onclick="php_last_error_log(this)"     class="btn btn-xs btn-primary">PHP Error Log(最后三行)</button>
          <div style="font-size:12px;" id="php_err_log" > </div>
      </div>
   </div>


</div>
</td>
</tr>
<tr><td colspan="2"> 
    <div id="reg_wrapper" style="width:1390px;margin-left:14px;" class="panel panel-default">
      <div class="panel-heading">
       服务器返回
      </div>
       <div id='server_html' ></div>
        <div id="jsoneditor_result" style="width: 1386px;"></div>
  </div> </td></tr>
</table>
    
 

<div  id="backend_src_code"   class="panel panel-default">
       
   </div>



 </body>
</html>

 