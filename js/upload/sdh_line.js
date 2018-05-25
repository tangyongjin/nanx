NANXplugin_window.prototype.sdh_line_editor = function() {
     
  
   
    var one_col_cfg={}

    one_col_cfg.detail_btn=false;
    one_col_cfg.displayField='subName'
    one_col_cfg.display_cfg={
        field_c:'客户',
        show_as_pic:0,
        value:'custid',
        width:200
    }

    

    var trigger_cfg=
    {codetable_category_value: null,combo_table:"boss_customer",filter_field:null,group_id:"EDHXsaUTA2",level:"1",list_field:"subName",value_field:"id"}


    one_col_cfg.editor_cfg={
       follow_cfg:[],
       found:false,
       ini:null,
       trigger_cfg:trigger_cfg,
       rowbasevalue:null
    }
    
    one_col_cfg.field_e='custid'
    one_col_cfg.group_id='adsfsfsa'
    one_col_cfg.id='custid'
    one_col_cfg.level=1
    one_col_cfg.nanx_type='root'
    one_col_cfg.raw_value=null
    one_col_cfg.value_field='id'


    var row=null;
    var readonly_flag=false;
    var whoami_cfg={owner_data_only:null,who_is_who:[],whoami:'admin'}
    var customer_selector=Fb.getDropdownlistEditor(one_col_cfg, row, readonly_flag, whoami_cfg);
    


    var obj1={
    field_e:'idcName',
    display_cfg:{field_c:'idcName'},
    displayField:"idcName",
    editor_cfg:{
          id:'idcName',
          follow_cfg:[],
          trigger_cfg:{
             codetable_category_value:null,combo_table:"boss_IDC",filter_field:null,group_id:"0c5axzEriN",level:"1",
             list_field:"idcName",value_field:"id"
        }
     }
    }

   var obj2={
    field_e:'building',
    display_cfg:{field_c:'building'},
    displayField:"building",
    editor_cfg:{
           id:'building',
               follow_cfg:[],
        trigger_cfg:{
             codetable_category_value:null,combo_table:"boss_IDC_building",filter_field:'IDCid',group_id:"0c5axzEriN",level:"2",
             list_field:"buildName",value_field:"id"
        }
     }
    }


    var obj3={
        field_e:'floor',
        display_cfg:{field_c:'floor'},
        displayField:"floor",
        editor_cfg:{
                follow_cfg:[],
                 id:'floor',
            trigger_cfg:{
                 codetable_category_value:null,combo_table:"boss_IDC_building_floor",filter_field:'buildID',group_id:"0c5axzEriN",level:"3",
                 list_field:"floorName",value_field:"id"
            }
         }
        }

    var obj4={
        field_e:'room',
        display_cfg:{field_c:'room'},
        displayField:"room",
        editor_cfg:{
                follow_cfg:[],
               id:'room',
               trigger_cfg:{
                 codetable_category_value:null,combo_table:"boss_IDC_room",filter_field:'floorID',group_id:"0c5axzEriN",level:"4",
                 list_field:"roomName",value_field:"id"
            }
         }
        }

    var obj5={
        field_e:'cabinet',
        display_cfg:{field_c:'cabinet'},
        displayField:"cabinet",
        editor_cfg:{
                follow_cfg:[],
                 id:'cabinet',
                  trigger_cfg:{
                 codetable_category_value:null,combo_table:"boss_cabinet",filter_field:'roomID',group_id:"0c5axzEriN",level:"5",
                 list_field:"cabinetName",value_field:"id"
            }
         }
        }


    var triggers=[obj1,obj2,obj3,obj4,obj5]
    var meta5= Act.prototype.LayoutBuilder(triggers)
    
    console.log(meta5)

    var sdh_number = {
        fieldLabel: 'SDH号码',
        id: 'sdh_number',
        name:  'sdh_number',
        xtype: 'textfield',
        allowBlank: false,
        width: 176,
        // value: '',
        validator: function(v) {
            if (Ext.isEmpty(v)) {
                return false;
            } else {
                return true;
            }
        }
    };
 
     

    var xadd_form = new Ext.form.FormPanel({
        xtype:'form',
        id:'add_form',
        width:900,
        fileMgr:true,
        borderStyle:'padding-top:3px',
        frame:true,
        labelAlign:'right',
        defaluts:{
            allowBlank:false,
            width:200
        },
        items:meta5
    });

    var Tree_win = new Ext.Window({
        autoScroll: true,
        shadow: false,
        autoDestroy : true,
        cascadeOnFirstShow: 20,
        width: 800,
        height: 450,
        closeAction:'destroy',
        id: 'sdh_line_editor',
        title: 'SDH跳线记录',
        items:xadd_form
    });

    xadd_form.show()
    Tree_win.doLayout();
    Tree_win.show();
}