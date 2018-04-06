/*
file_mgr.js
*/


Ext.ns('FileMgr');

var FileMgr = {};




 FileMgr.showPic = function(pic) {
     var xwin = new Ext.Window({
         constrain: true,
         modal: true,
         title: i18n.origin_pic + '   ' + pic,
         html: '<br/>&nbsp;&nbsp;' + pic + "<br/><img style='margin:10px;' src='" + pic + "'>"
     });
     xwin.show();
 }

 

 FileMgr.getAttachmentEditor = function(cfg) {
     var xid = Ext.id();
     var fake_id = cfg.name;
     upload_field = [{
         xtype: 'fileuploadfield',
         emptyText: i18n.choose_file_to_upload,
         value: cfg.value,
         fieldLabel: cfg.label,
         id: cfg.name,
         name: cfg.name,
         buttonCfg: {
             iconCls: 'upload-icon'
         },
         width: 200,
         listeners:{
             'fileselected':function(obj,file){
                  var ftype=FileMgr.getFileType(file);
                  if(cfg.file_type)
                   {
                    if(cfg.file_type!==ftype){
                           Ext.Msg.alert(i18n.message, i18n.check_file_type);
                           return;
                          }
                   }
                  
                 var form=Ext.getCmp(xid).findParentByType('form');
                 if (form) {
                     this.ownerCt.field_realupload=true;
                     form.uptasks++;
                     form.realupload = true;
                 }
             }
         }
     }, {
         xtype: 'button',
         cls: 'hidden_upload_btn',
         hidden: true,
         listeners: {
             'click': function(){
                 var form = Ext.getCmp(xid).findParentByType('form');
                 if (!this.ownerCt.field_realupload) {
                     form.uptasks--;
                     return;
                 }
                 var p = {
                     'formfield': cfg.name,
                     'os_path': cfg.os_path || 'uploads'
                 };
                 var postcfg = {
                     'params': Ext.encode(p)
                 };
                 if (form.getForm().isValid()){
                     form.getForm().submit({
                         url: AJAX_ROOT + UPLOAD_URL,
                         params:postcfg,
                         failure: function(f, r) {
                             WaitMask.hide();
                             FileMgr.showUploadResult(r,postcfg);
                             form.uptasks--;
                             form.upload_errcount++;
                         },
                         success:function(f,r) {
                             console.log(f)
                             console.log(r.result)
                             WaitMask.hide();
                             if (r.result.success){
                                  var fd = form.getForm().findField(cfg.name);
                                 fd.setValue(r.result.serverURL);
                                 form.uptasks--;
                                 Act.prototype.FormAction(form);
                             }
                             FileMgr.showUploadResult(r);
                         }
                     });
                 } 
             }
         }
     }];
     var compo = {
         xtype: 'compositefield',
         anchor: '100%',
         fake_id: fake_id,
         id: xid,
         fieldLabel: cfg.label,
         items: [upload_field]
     };
     var box = FileMgr.geFileWrapper(cfg);
     return [compo, box];
 }
 
 

 FileMgr.showUploadResult=function(r)
 { 
    
   if(r.result.show_client_upload_info)
        {
        Ext.Msg.alert(i18n.message, r.result.msg);
        }
 
   if(Ext.getCmp('grid_FILE')){
     Ext.getCmp('grid_FILE').getStore().reload();
   }
 }




 FileMgr.getFileType=function(name)
 {    
      var pictype = ['gif', 'bmp', 'png', 'jpg', 'jpeg', 'tif'];
      var no_pic = ['avi', 'css', 'doc', 'docx', 'midi', 'mov', 'mp3', 'mpeg', 'pdf', 'ppt', 'pptx', 'proj', 'psd', 'pst', 'rar', 'txt',
         'wav', 'wma', 'wmv', 'xls', 'zip'
      ];
      var xlstype=['xls'];
      var jstype=['js'];
      var sqltype=['sql'];
      var phptype=['php'];
      var meta = name.split('.').pop().toLowerCase();
      var ftype='unknow';
      if(pictype.indexOf(meta)!== -1){
         ftype = 'img';
      }
      if(sqltype.indexOf(meta)!== -1){
         ftype = 'sql';
      }
      if(jstype.indexOf(meta)!== -1){
         ftype = 'js';
      }
      if(phptype.indexOf(meta)!== -1){
         ftype = 'php';
      }
      if (no_pic.indexOf(meta) !== -1) {
         ftype = meta;
      }
      return ftype;
 }

 FileMgr.geFileWrapper = function(field) {
     if (!field.value) {
         var box = {
             xtype: 'box'
         };
         return box;
     }

     var fname = field.value.split('/').pop();
     var ftype=FileMgr.getFileType(fname);

    
     if (ftype == 'img'){
         var box = {
             xtype: 'box',
             html: '<div class=pic_holder><span>' + i18n.dbl_click_to_viewe_origin_pic + '</br></span><img id="' + field.name + '_img_mask" src="' + field.value + '"></div>',
             listeners: {
                 afterrender: function(b) {
                     var pic = Ext.get(field.name + '_img_mask');
                     pic.on('dblclick', function() {
                         FileMgr.showPic(field.value);
                     }, this)
                 }
             }
         };
     } else {
         var box = {
             xtype:'box',
             html: '<div  style="height:44px"  class=pic_holder><table><tr><td><img src="' + BASE_URL+ 'css/images/' + ftype + '.png "></td><td><a onClick=FileMgr.showDownload(' + "'" + field.value + "'" + ')  href=#>' + fname + '</a></td></tr></div>',
         };
     }
     return box;
 }


  FileMgr.showDownload = function(fname) {
     var xwin = new Ext.Window({
         constrain: true,
         modal: true,
         height: 180,
         title: i18n.excel_download,
         html: '<br/><div style="margin:20px;">' + i18n.clk_to_download + '<br/><br/><a href=' + fname + '>' + fname + '</a></div>'
     });
     xwin.show();
 }


 FileMgr.getFileValue = function(grid,row,col) {
         var str='';
         str= Fb.getCellStr(grid, row, col);
         
         if(grid.file_type=='php'|| grid.file_type=='js' ){
           col=1;  // point to Filename
           return {os_path:grid.os_path,filename:str};
         }

         var tag='src';
         var reg_str = "<img[^>]+"+tag+'="http:\\\/\\\/([^">]+)';
         var reg_rule=new RegExp(reg_str,'g');
         var results = reg_rule.exec(str);

         if(results){
         var found= results[1];
         if(tag=='src'){found="http://"+found}
         return {os_path:grid.os_path,filename:found};
         }
            else
            {
              return {os_path:grid.os_path,filename:null};
            }
     };    

 



FileMgr.getFileBasedBtns=function(file_type){
    var that=this;
    var public_btns=[];
        if (file_type=='img'){
        public_btns.push({
            text:i18n.set_as_logo,
            iconCls:'view_item',
            style:{
                marginRight: '6px'
            },
            ctCls:'x-btn-over',
            id:'pub_upload',
            handler:function(a){
                FileMgr.setLogo(a.findParentByType('grid') || a.findParentByType('editorgrid'))
            }
        });
        }

        public_btns.push({
            xtype:'button',
            text:i18n.upload_file,
            iconCls:'n_add',
            style:{
                marginRight:'6px'
            },
            ctCls:'x-btn-over',
            handler:function(a){
            FileMgr.uploadFile(a.findParentByType('grid') || a.findParentByType('editorgrid'))

            }
        });
    
        public_btns.push({
            text:i18n.view_or_edit,
            iconCls:'n_edit',
            style:{
                marginRight: '6px'
            },
            ctCls:'x-btn-over',
            id:'pub_edit',
            handler:function(a){
                FileMgr.editFile(a.findParentByType('grid') || a.findParentByType('editorgrid'))
            }
        });
    
        public_btns.push({
            text:i18n.delete_file,
            iconCls:'n_del',
            style:{
                marginRight:'6px'
            },
            ctCls:'x-btn-over',
            handler:function(a){
                console.log(a)
                console.log( a.findParentByType('grid') || a.findParentByType('editorgrid') )
                FileMgr.delFile( a.findParentByType('grid') || a.findParentByType('editorgrid'))
            }
        });
    return public_btns;
}



FileMgr.uploadFile=function(grid){
    
    console.log(grid.initialConfig)

    var os_path=grid.initialConfig.os_path;
    
    var vnode={attributes:{os_path:os_path,file_type:grid.initialConfig.file_type}};
    var category='medias';
    var opcode='upload_file';
    view_file_fun=getMenuItemHandler(vnode,category,opcode,Ext.id());
    view_file_fun();
}

FileMgr.editFile=function(grid){
    var os_path=grid.initialConfig.os_path;
    
    var meida_value=this.getMediaGridValue(grid);
     if(meida_value.length==0){
                Ext.Msg.alert(i18n.alert,i18n.choose_atleast_one_record);
                return false;
     }

     if (grid.file_type=='img'){
          FileMgr.showPic(meida_value[0]);
     }
        else
        {
          var vnode={attributes:{os_path:os_path,text:meida_value[0],value:meida_value[0]}};
          var category='js_file';
          var opcode='update_file_content';
          console.log(vnode)
          console.log(opcode)
          
          view_file_fun=getMenuItemHandler(vnode,category,opcode,Ext.id());
          view_file_fun();    
        }
}


FileMgr.delFile=function(grid){



    var os_path=grid.initialConfig.os_path;
    var meida_value=this.getMediaGridValue(grid);
    if(meida_value.length==0){
                Ext.Msg.alert(i18n.alert,i18n.choose_atleast_one_record);
                return false;
     }

    Ext.Msg.confirm(i18n.confirm,i18n.really_delete+"?",function(btn){
        var file_to_del=[];
        if (btn=='yes'){
            var files_to_del=[];
            for (var i=0;i<meida_value.length;i++){
                    files_to_del.push({ os_path:os_path,filename:meida_value[i]});
            }
            var del_data={
                'cmd':'delete',
                'files':files_to_del
            };
            var succ=function(){
                 grid.getStore().load();
            }
            ajaxPostData(AJAX_ROOT+'file/deleteFile',del_data,succ);
        }
    });
}






FileMgr.getMediaGridValue=function(grid){
    
     console.log(grid.getXType())

     var selected=[];
     if(grid.getXType()=='grid')
     {
            var userRecord=grid.getSelectionModel().getSelections();
            var len=userRecord.length;
            for (var i = 0; i < userRecord.length; i++) {
                selected.push(userRecord[i].get('Filename')); 
            };
  
     }else  
      {
       if(grid.getSelectionModel().selection){
            var cell= FileMgr.getFileValue(grid,grid.getSelectionModel().selection.cell[0],grid.getSelectionModel().selection.cell[1]);
            selected.push(cell.filename);
       }
     }
    return selected;     
}




FileMgr.setLogo=function(grid){
      var meida_value=this.getMediaGridValue(grid);
      if(meida_value.length==0){
                Ext.Msg.alert(i18n.alert,i18n.choose_atleast_one_record);
                return false;
      }

      var picname = meida_value[0].split('/').pop();
      var fmv = {
             rawdata: {
                 'opcode': 'set_logo',
                 'picfile': picname,
                 'key': 'COMPANY_LOGO'
             }
         };
     ajaxPostData(AJAX_ROOT + 'nanx', fmv, function() {});
}

