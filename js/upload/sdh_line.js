


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
    

   
    var sdh_number = {
        fieldLabel: 'SDH号码',
        id: 'sdh_number',
        name:  'sdh_number',
        xtype: 'textfield',
        // xtype: 'CabinetSelector',
        allowBlank: false,
        // width: 176,
        // value: '',
        validator: function(v) {
            if (Ext.isEmpty(v)) {
                return false;
            } else {
                return true;
            }
        }
    };
 

    var cabinet_selector = {
        fieldLabel: '机柜',
        id: 'cabinet_selector_weak_1',
        value:'',
        // name:  'cabinet_selector_weak_1',
        xtype: 'CabinetSelector'
        };
 
     
     


    var xadd_form = new Ext.form.FormPanel({
        xtype:'form',
        id:'add_form',
        width:700,
        fileMgr:true,
        borderStyle:'padding-top:3px',
        frame:true,
        labelAlign:'right',
        defaluts:{
            allowBlank:false,
            width:200
        },
        items:[customer_selector,sdh_number,cabinet_selector]
    });

    var sdh_win = new Ext.Window({
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
    sdh_win.doLayout();
    sdh_win.show();

 
}