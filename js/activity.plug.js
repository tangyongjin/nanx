/*
activity.plug.js
*/

Ext.ns('ActPlug')

var ActPlug = {}



ActPlug.getQueryBtn = function(act_instance){

    var gp_id=act_instance.cfg.grid_id;
    var qBtn={
        text:i18n.query,
        iconCls:'n_query',
        ctCls:'x-btn-over',
        refer_grid_id:gp_id,
        style: {
            marginRight: '6px'
        },
        handler: function(){
            if (Ext.getCmp('query_builder') && Ext.getCmp('query_builder').isVisible()){
                return;
            }

            Ext.getCmp(this.refer_grid_id).setHeight(Ext.getCmp(this.refer_grid_id).getHeight() - 100);
            if (Ext.getCmp('query_builder')){
                Ext.getCmp('query_builder').show();
            } else{
                var table=act_instance.table;
                var colsCfg=act_instance.colsCfg;
                var store_id=act_instance.gridPanel.store.storeId;
                var win=this.findParentByType('window');
                var search_pn=ActPlug.getSerachPanel(act_instance,table,store_id,win.getId());
                win.insert(0,search_pn);
                win.doLayout();
            }
        }
    };
    return qBtn;
}




ActPlug.getSerachPanel=function(act_instance,table,storeId,winid){
    
    // var that=this;

    var btn_add=new Ext.Button({
        text:i18n.addquerylien,
        iconCls:'n_add',
        listeners:{
            'click':function(){
                ActPlug.insertQueryLine(act_instance,table,'nanx_query_holder');
            },
            'afterrender':function(){
                this.fireEvent('click', this)
            }
        }
    });

    var execute=new Ext.Button({
        text:i18n.execute,
        nanx_query_cfg:{
            table:table,
            storeId:storeId
        },
        iconCls:'n_run',
        style:{
            'margin-left': '10px'
        },
        handler:function(){
            var ds=Ext.StoreMgr.key(storeId);
            var ext_sp=this.ownerCt.ownerCt;
            var fm=ext_sp.getForm();
            var data=FormBuilder.getFormData(ext_sp);
            if (!data){
                return;
            }

            data['and_or_0']='and';
            var condition_rows=sp.find('nanx_type','query_line');
            var puredata={};
            for (var i=0;i<condition_rows.length;i++){
                puredata['and_or_'+i]=data['and_or_'+i];
                puredata['field_'+i]=data['field_'+i];
                puredata['operator_'+i]=data['operator_'+i];
                puredata['vset_'+i]=data['vset_'+i];
            }
            ds.proxy.conn.jsonData['query_cfg']={
                count:condition_rows.length,
                lines:puredata
            };


            ds.load({
                params:{
                    start:0,
                    limit:pageSize
                }
            });

            delete ds.proxy.conn.jsonData.nanx_query_cfg;
        }
    });

    var btn_close_query = new Ext.Button({
        text:i18n.close,
        iconCls:'n_close',
        style:{
            'margin-left': '10px'
        },
        listeners:{
            'click':function(){
                var qb=Ext.getCmp('query_builder');

                var hostwin=qb.ownerCt;
                var hostgrid=hostwin.findByType('grid');
                var hoststore=hostgrid[0].getStore();

                hoststore.reload();


                Ext.getCmp('query_builder').hide();
                var gp=Ext.getCmp(winid).findByType('panel');
                gp[2].setHeight(gp[2].getHeight() + 100);
                gp[2].doLayout();
            }
        }
    });


    var btn_search_bar=new Ext.Container({
        layout:'table',
        height:30,
        items:[btn_add, execute, btn_close_query]
    });

    var pnl=new Ext.FormPanel({
        id:'nanx_query_holder',
        items:[btn_search_bar]
    });

    var sp=new Ext.Panel({
        width:Ext.getCmp(winid).getWidth() - 14,
        frame:true,
        autoScroll:true,
        height:95,
        bodyStyle:{
            'margin':'5px 0px 0px 5px'
        },
        id:'query_builder',
        items:pnl
    });
    return sp;
}





ActPlug.insertQueryLine=function(act_instance,table,holderid){
    var field_def=[];
    for (var i=0;i<act_instance.colsCfg.length;i++){
        field_def.push([act_instance.colsCfg[i].field_e, act_instance.colsCfg[i]['display_cfg'].field_c,
         act_instance.colsCfg[i]['editor_cfg'].datetime]);
    }
    var holder=Ext.getCmp(holderid);
    var lines=(holder.find('nanx_type','query_line')).length;
    var field_def_store=new Ext.data.SimpleStore({
        fields: ['value','text','dt'],
        data:field_def,
        autoLoad:true
    });

    var combo=new Ext.form.ComboBox({
        valueField:'value',
        displayField:'text',
        mode:'local',
        allowBlank:lines==0?true:false,
        hideMode:'visibility',
        id:'field_'+lines,
        editable:false,
        triggerAction:'all',
        style:{
            'margin-left':'10px'
        },
        listeners:{
            select:function(combo,record,index){
                if (record.data.dt.length>=4){
                    if(record.data.dt=='date'){
                        var xtype = 'datefield';
                        var fmt="Y-m-d"
                    }
                    if(record.data.dt=='datetime'){
                        var xtype='datetimefield';
                        var fmt='Y-m-d h:m:s';
                    }
                    if(record.data.dt=='time'){
                        var xtype='timepickerfield';
                        var fmt='h:m:s';
                    }
                    var input_f ={
                        id:'vset_'+lines,
                        width:200,
                        value:'',
                        xtype:xtype,
                        format:fmt,
                        allowBlank:false,
                        style:{
                            'margin-left':'10px'
                        }
                    };

                }else{
                    input_f={
                        id:'vset_'+lines,
                        xtype:'textfield',
                        width:200,
                        style:{
                            'margin-left': '10px'
                        }
                    };
                }

                var line_container=this.ownerCt;
                var vfield=Ext.getCmp('vset_'+lines);
                vfield.destroy();
                line_container.insert(3,input_f);
                line_container.doLayout();

            }
        },
        store:field_def_store
    });

    var and_or=new Ext.form.ComboBox({
        width:50,
        valueField:'value',
        displayField:'text',
        mode:'local',
        allowBlank:lines==0?true:false,
        hidden:lines==0?true:false,
        hideMode:'visibility',
        id:'and_or_'+lines,
        editable:false,
        triggerAction:'all',
        style:{
            'margin-left':'10px'
        },
        store: new Ext.data.ArrayStore({
            fields:['value','text'],
            data:[
                ['and',i18n.and],
                ['or',i18n.or]
            ]
        })
    });


    var operator=new Ext.form.ComboBox({
        width:80,
        valueField:'value',
        displayField:'text',
        editable:false,
        id:'operator_'+lines,
        allowBlank:false,
        triggerAction:'all',
        mode:'local',
        style:{
            'margin-left':'10px'
        },
        store:new Ext.data.ArrayStore({
            fields:['value','text'],
            data:[
                ['=',i18n.equal],
                ['<',i18n.less],
                ['>',i18n.biger],
                ['<>',i18n.notequal],
                ['like',i18n.contain],
                ['like_end',i18n.endwidh],
                ['like_begin',i18n.beginwith]
            ]
        })
    });

    var btn_remove=new Ext.Button({
        text:i18n.remove,
        disabled:lines==0?true:false,
        style:{
            'margin-left': '10px'
        },
        handler:function(){
            this.ownerCt.ownerCt.remove(this.ownerCt);
        }
    });
    var trigger={
        id:'vset_'+lines,
        xtype:'textfield',
        width:200,
        height:22,
        style:{
            'margin-left':'10px'
        }
    };

    var query_line=new Ext.Container({
        layout:'table',
        width:600,
        style:{
            'margin-top': '4px'
        },
        nanx_type:'query_line',
        items:[btn_remove,and_or,combo,operator,trigger]
    });
    holder.insert(lines+1,query_line);
    holder.ownerCt.doLayout();
}
