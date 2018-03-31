/*
compoment_file_upload.js
*/


Ext.ns('FileUpload');

var FileUpload = {};




 FileUpload.showPic = function(pic) {
     var xwin = new Ext.Window({
         constrain: true,
         modal: true,
         title: i18n.origin_pic + '   ' + pic,
         html: '<br/>&nbsp;&nbsp;' + pic + "<br/><img style='margin:10px;' src='" + pic + "'>"
     });
     xwin.show();
 }

 

 FileUpload.getAttachmentEditor = function(cfg) {
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
                  var ftype=FileUpload.getFileType(file);
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
                             FileUpload.showUploadResult(r,postcfg);
                             form.uptasks--;
                             form.upload_errcount++;
                         },
                         success:function(f,r) {
                             WaitMask.hide();
                             if (r.result.success){
                                 var fd = form.getForm().findField(cfg.name);
                                 fd.setValue(r.result.serverURL);
                                 form.uptasks--;
                                 Act.prototype.FormAction(form);
                             }
                             FileUpload.showUploadResult(r);
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
     var box = FileUpload.geFileWrapper(cfg);
     return [compo, box];
 }
 
 

 FileUpload.showUploadResult=function(r)
 {
   if(r.result.show_client_upload_info)
        {
        Ext.Msg.alert(i18n.message, r.result.msg);
        }
 
   if(Ext.getCmp('grid_FILE')){
     Ext.getCmp('grid_FILE').getStore().reload();
   }
 }




 FileUpload.getFileType=function(name)
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

 FileUpload.geFileWrapper = function(field) {
     if (!field.value) {
         var box = {
             xtype: 'box'
         };
         return box;
     }

     var fname = field.value.split('/').pop();
     var ftype=FileUpload.getFileType(fname);

    
     if (ftype == 'img'){
         var box = {
             xtype: 'box',
             html: '<div class=pic_holder><span>' + i18n.dbl_click_to_viewe_origin_pic + '</br></span><img id="' + field.name + '_img_mask" src="' + field.value + '"></div>',
             listeners: {
                 afterrender: function(b) {
                     var pic = Ext.get(field.name + '_img_mask');
                     pic.on('dblclick', function() {
                         FileUpload.showPic(field.value);
                     }, this)
                 }
             }
         };
     } else {
         var box = {
             xtype:'box',
             html: '<div  style="height:44px"  class=pic_holder><table><tr><td><img src="' + BASE_URL+ 'css/images/' + ftype + '.png "></td><td><a onClick=FileUpload.showDownload(' + "'" + field.value + "'" + ')  href=#>' + fname + '</a></td></tr></div>',
         };
     }
     return box;
 }


  FileUpload.showDownload = function(fname) {
     var xwin = new Ext.Window({
         constrain: true,
         modal: true,
         height: 180,
         title: i18n.excel_download,
         html: '<br/><div style="margin:20px;">' + i18n.clk_to_download + '<br/><br/><a href=' + fname + '>' + fname + '</a></div>'
     });
     xwin.show();
 }


 FileUpload.getFileValue = function(grid,row,col) {
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

 