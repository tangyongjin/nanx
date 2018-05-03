
Ext.override(Ext.Button, {
    setupclick: function() {
        alert('setupclick')
        this.getEl().dom.click();
    }
});


Ext.override(Ext.Component, {
    Callback_setValue: function(value) {
        var xtype = this.getXType();
        if (xtype == 'textfield' || xtype == 'textarea' || xtype == 'combo' || xtype == 'StarHtmleditor') {
            this.setValue(value);
            // this.setRawValue(value);
        }

        if ((xtype == 'panel') && (this.items.itemAt(0).getXType() == 'checkbox')) {
            for (var i = 0; i < this.items.getCount(); i++) {
                if (value.indexOf(this.items.itemAt(i).inputValue) !== -1) {
                    this.items.itemAt(i).setValue(true);
                } else {
                    this.items.itemAt(i).setValue(false);
                }
            }
        }
    }
});


Ext.override(Ext.tree.TreeLoader,{
        processResponse:function(response,node,callback){
                var e=Ext.util.JSON.decode(response.responseText);
                var rows=e.server_resp;
                node.beginUpdate();
                for (var i=0,len=rows.length;i<len;i++) {
                        if(!rows[i].hasOwnProperty('value'))
                        {
                          rows[i].value=rows[i].field_e;
                        }
                        
                        var n=this.createNode(rows[i]);
                        if(n){
                                node.appendChild(n);
                        }
                }
                node.endUpdate();
                if (typeof callback=="function"){
                        callback(this,node);
                }
        }
});

Ext.override(Ext.Component,{
        findParentBy:function(fn){
                for(var p=this.ownerCt;
                (p != null)&&!fn(p);p=p.ownerCt);
                return p;
        },
        findParentByType:function(xtype){
                return typeof xtype=='function'?this.findParentBy(function(p){
                        return p.constructor===xtype;
                }):this.findParentBy(function(p){
                        return p.constructor.xtype===xtype;
                });
        }
});




Ext.override(Ext.Component, {
    Callback_setValue: function(value) {
        var xtype = this.getXType();
        if (xtype == 'textfield' || xtype == 'textarea' || xtype == 'combo' || xtype == 'StarHtmleditor') {
            this.setValue(value);
            // this.setRawValue(value);
        }

        if ((xtype == 'panel') && (this.items.itemAt(0).getXType() == 'checkbox')) {
            for (var i = 0; i < this.items.getCount(); i++) {
                if (value.indexOf(this.items.itemAt(i).inputValue) !== -1) {
                    this.items.itemAt(i).setValue(true);
                } else {
                    this.items.itemAt(i).setValue(false);
                }
            }
        }
    }
});



Ext.override(Ext.tree.TreeLoader,{
        processResponse:function(response,node,callback){
                var e=Ext.util.JSON.decode(response.responseText);
                var rows=e.server_resp;
                node.beginUpdate();
                for (var i=0,len=rows.length;i<len;i++) {
                        if(!rows[i].hasOwnProperty('value'))
                        {
                          rows[i].value=rows[i].field_e;
                        }
                        
                        var n=this.createNode(rows[i]);
                        if(n){
                                node.appendChild(n);
                        }
                }
                node.endUpdate();
                if (typeof callback=="function"){
                        callback(this,node);
                }
        }
});

Ext.override(Ext.Component,{
        findParentBy:function(fn){
                for(var p=this.ownerCt;
                (p != null)&&!fn(p);p=p.ownerCt);
                return p;
        },
        findParentByType:function(xtype){
                return typeof xtype=='function'?this.findParentBy(function(p){
                        return p.constructor===xtype;
                }):this.findParentBy(function(p){
                        return p.constructor.xtype===xtype;
                });
        }
});
 
 



Ext.ns('App');
App.init = function(){
     Ext.QuickTips.init();
     App.bind();
};
  

App.renewHash=function(parent){

  var subcfg={'parent':parent};
                 var jsondata=Ext.encode(subcfg);
                 Ext.Ajax.request({
                  url:GET_FIRST_LEVEL_URL,
                  jsonData:jsondata,
                  callback:function(options,success,response){
                      var div=Ext.fly('nanx_act_blocks')
                      var ret_json=Ext.util.JSON.decode(response.responseText);
                      var newhtml=''
                      for (var i=0;i<ret_json.length;i++){
                                 newhtml=newhtml+ret_json[i]['block']
                          }
                      div.update( newhtml )
                  }
                });


}

   
App.bind = function() {



  Ext.getBody().on('dblclick', function(event, target){
                      alert('dblclick')
                      console.log(event);
                      console.log(target);
    }, this, {
        delegate: '.folder_title'
    });

  

   Ext.getBody().on('click', function(event, target){

                        var activity_type = target.getAttribute('activity_type');
                        var acode = target.getAttribute('id');
                        var fnname= target.getAttribute('fnname');
                        var service_url= target.getAttribute('service_url');
                        var grid_title=target.getAttribute('grid_title');
                         var memo=target.getAttribute('memo');
                        App.route(activity_type, acode,fnname,service_url,memo,grid_title);
        

    }, this, {
        delegate: '.nanx-4-ext a'
    });

        


    if (Ext.get('border-top')){
            Ext.get('border-top').on('click', function(e, target){
            	       var whoami =Ext.get('whoami').dom.innerHTML;
            	       var vnode={attributes:{value:whoami,text:whoami}};
            	       var opform=Fb.backendForm('user','reset_pwd', vnode);
                     var wincfg={title:i18n.reset_pwd,category:'user',opcode:'reset_pwd',node:vnode};
                     var win=Act.prototype.actionWin('backend',opform,wincfg);
            }, this,{
                    delegate: 'a#userpanel'
            })
    }
    
    if (Ext.get('border-top')){
            Ext.get('border-top').on('click',function(e, target){
            	      var whoami =Ext.get('whoami').dom.innerHTML;
            	      var vnode={};
            	      vnode.attributes={value:whoami,text:whoami};
            	      var opform=Fb.backendForm('all','p2p_sms', vnode);
                    var xwin=Act.prototype.actionWin('backend',opform,{ title:i18n.sms,category:'all',opcode:'p2p_sms',node:vnode});
            }, this,{
                    delegate: 'a#send_sms'
            })
    }
    
    if (Ext.get('work_event')){
            Ext.get('work_event').on('click',function(e, target){
                var id=target.getAttribute('id');
                console.log(id);
                    var vnode={};
            	      vnode.attributes={id:id};
            	      var opform=Fb.backendForm('all','read_sms', vnode);
                    var xwin=Act.prototype.actionWin('backend',opform,{viewonly:true,title:i18n.read_sms,category:'all',opcode:'read_sms',node:vnode});
            }, this,{
                    delegate:'a.sms_tag'
            })
    }

    if (Ext.get('accordion_holder')){
            Ext.get('accordion_holder').on('click',function(e, target){
             var whoami =Ext.get('whoami').dom.innerHTML;
             new Act({
             code: 'NANX_TBL_DATA',
             table: 'nanx_sms',
             id_order:'desc',
             filter_field:'receiver',
             filter_value:whoami,
             wintitle:i18n.message,
             showwhere: 'autowin' 
               }) 
            }, this,{delegate:'span#show_all_sms'})
    }
    
        
        
        
}

App.route = function(activity_type, code,fnname,service_url,memo,grid_title){
  
	      if(activity_type=='js'){
	       if(NANXplugin_window.prototype[fnname]) 
                    {
                   NANXplugin_window.prototype[fnname]();
                    }else
                   	{   
                   		  Ext.MessageBox.alert(i18n.alert,i18n.entry_function+':[<span class=red>'+fnname+'</span>]'+i18n.not_exists+","
                   		  +i18n.pls_check_js_upload+".<br/><br/>"+i18n.code_sample+" <br/><br/>______________________________________________<br/><br/>"
                   		  + "NANXplugin_window.prototype."+i18n.entry_function+"=function()<br/>"
                   		  +"{<br/>"
                   		  +"//code here<br/>"
                   		  +"}<br/>______________________________________________"
                   		  
                   		  );
                   	}
	      } 


	      if(activity_type=='table')
        	{
           
           new Act({
                'code': code,
                'edit_type':'noedit',
                'showwhere': 'autowin',
                'host': null
                });
          }

        if(activity_type=='tree')
          {
           new Act({
                'code': code,
                'edit_type':'noedit',
                'showwhere': 'autowin',
                'host': null
                });
          }

        
        if(activity_type=='sql')
        	{
           new Act({
                'code': code,
                'edit_type':'noedit',
                'showwhere': 'autowin',
                'host': null
                });
          }
          
        if(activity_type=='service')
        	{
           Act_service(code,service_url,memo);
          }

        if(activity_type=='folder')
          {
                  App.renewHash(code)
          }

              

        if(activity_type=='html')
          {
           Act_iframe(code,service_url,memo,grid_title);
          }


}
 

Ext.onReady(function(){
       App.init();
       App.renewHash('mgroup_root')  
})

   

 document.onmouseover = function() {
    //User's mouse is inside the page.
    window.innerDocClick = true;
}

document.onmouseleave = function() {
    //User's mouse has left the page.
    window.innerDocClick = false;
}

window.onhashchange = function(event) {
    if (window.innerDocClick) {
     //浏览器内部导致hash变化,不用管.
    } else {
      console.log('xxx-bbaaa')
      console.log(event)

      var hash = event.newURL.substring(event.newURL.indexOf('#')+1);

      if( hash.indexOf("http") == 0 ) {
            hash='mgroup_root'
      }

      if( hash.length == 0 ) {
            hash='mgroup_root'
      }
      
      App.renewHash(hash)  // 刷新 icons 列表
    }
}