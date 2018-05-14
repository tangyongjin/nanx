var Ext = {};
function login(){
    var account = document.getElementById('mod-login-username').value;
    var pwd = document.getElementById('mod-login-password').value;
    if (account == ""){
        document.getElementById('log_res').innerHTML =i18n.account_need;
        $('#login_main_form').shake(2, 13, 250);
        return false;
    }
    if (pwd == ""){
        document.getElementById('log_res').innerHTML =i18n.password_need;
        $('#login_main_form').shake(2,13,250);
        return false;
    }

     
     

    var curr=$($( ".current" )[0]);
    var lang=curr.attr('id')
    var o='{"lang":"'+lang+'","account":"'+account+'","password":"'+pwd+'"}';
    
    $.ajax({
        type:"POST",
        url:AJAX_ROOT+'home/dologin',
        data:o,
        

        contentType:"application/json",
        dataType:"json",
        success:function(data){
            if (data.code != 0){
                document.getElementById('log_res').innerHTML = data.msg;
                $('#login_main_form').shake(2, 13, 250);
            } else{
                
                 $('#myModal').reveal();
                 
                 window.location.href = AJAX_ROOT+'home/index?ts='+Math.floor(Date.now() / 1000)
                 // alert('will href to '+AJAX_ROOT+'home/index/' );
                // window.location.href = AJAX_ROOT+'home/index/' 
                
                 
            }
        }
    });
}
 
function fit_img(imgid,divid){
    var divElem = $("#" + divid);
   
    var container_h = divElem.height();
    var container_w = divElem.width();
    var imgElem = $("#" + imgid);
    var img_h = imgElem.height();
    var img_w = imgElem.width();
    if (img_h<img_w) {
        if (img_w>container_w) {
            imgElem.css({
                'height':"auto",
                'width':container_w
            });
        }else{
            imgElem.css({
                'height': "auto",
                'width': img_w
            });
        }
    } else if (img_h > img_w) {
        if (img_h>container_h) {
            imgElem.css({
                'height':container_h,
                'width':"auto"
            });
        }else{
            imgElem.css({
                'height':img_h,
                'width':"auto"
            });
        }
    }
    var img_h_fixed=imgElem.height();
    var img_w_fixed=imgElem.width();
    var margin_left=(container_w-img_w_fixed)/2;
    var margin_top=(container_w-img_h_fixed)/2;
    imgElem.css({
        'margin-left':margin_left,
        'margin-top':margin_top
    });
    var logopic=$("#img_logo_150");
    logopic.show();
}
  
  $(document).ready(function(){
            $('#polyglotLanguageSwitcher').polyglotLanguageSwitcher({
			        	effect:'fade',
                testMode:true,
                onChange: function(evt){
                    window.location=LOGIN_URL+'/'+evt.selectedItem;
                }
		       	});
        });
        
$(document).ready(function(){
    $("#login_main_form").hide();
    $(function(){
        document.onkeydown = function(e) {
            var ev=document.all?window.event:e;
            if (ev.keyCode==13){
                login();
            }
        }
    });

    // $(window).resize(function(){
    //     resize();
    // });
    // resize();

});

  
jQuery.fn.shake = function(intShakes, intDistance, intDuration) {
    this.each(function() {
        $(this).css({
            position: "relative"
        });
        for (var x = 1; x <= intShakes; x++) {
            $(this).animate({
                left: (intDistance * -1)
            }, (((intDuration / intShakes) / 4))).animate({
                left: intDistance
            }, ((intDuration / intShakes) / 2)).animate({
                left: 0
            }, (((intDuration / intShakes) / 4)));
        }
    });
    return this;
};


       


       
