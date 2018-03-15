clear_log=function()
{


  var url = window.location.href

  var arr = url.split("/");

  var domain=  arr[0] + "//" + arr[2]  ;


  urlx=domain+'/log/clearlog';

  // alert(urlx);

  $.ajax({url:urlx,async:false});
  location.reload();

}


hide_class=function( clsname)
{
var dx = document.getElementsByClassName(clsname);
alert(1);
for(var i=0;i<dx.length;i++) {dx[i].style.display="none"};

}
