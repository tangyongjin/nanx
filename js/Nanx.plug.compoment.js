Ext.ns("Util");  
Util.StepForm = Ext.extend(Ext.Container,{  


    build_header:function(headers){

        var head_tb="<table><tr>";
         for(var i=0;i<headers.length;i++)
         {
          head_tb+='<td width=140px>'+i18n[headers[i]]+'</td>';
         }
         head_tb+="</tr></table>";
         return  new Ext.Container({html:head_tb});

    },
    
    build_button:function(item,node){
         return new Ext.Button({
         text:i18n.add_trigger,
         id:'add_trigger_button',
         handler: function() {
             {
                 alert(1)
                 var form = this.findParentByType('form');
                 var trigger_rows =form.find('nanx_type','trigger_row');
                 item.serial=trigger_rows.length+1;
                 var newline =   TriggerGroup.create_comboxs_line(item,node);
                 this.ownerCt.ownerCt.insert(12,newline);
                 this.ownerCt.ownerCt.doLayout();
             }
         }
     })
     
    },

    


    constructor:function(config){  
        var headers = config.headers; 
        var item = config.item;  
        var node = config.node;  
        
        console.log(headers)
        console.log(item)
        console.log(node)
        
        
        var header=this.build_header(headers)
        
        var button=this.build_button(item,node)
 
        Util.StepForm.superclass.constructor.apply(  
            this,[{  
                width:config.width,  
                height:40,
                layout:'table',  
                items:[button,header]
                // [  
                //     new Ext.Container({  
                //         height:120,
                //         items:bodys  
                //     })

                // ]  
            }]  
        );  

         
    } 
});  
Ext.reg('stepform', Util.StepForm);  