


 function  DeepClone (obj) {

     var seenObjects = [];
     var mappingArray = [];
     var f = function(simpleObject) {
         var indexOf = seenObjects.indexOf(simpleObject);
         if (indexOf == -1) {
             switch (Ext.type(simpleObject)) {
                 case 'object':
                     seenObjects.push(simpleObject);
                     var newObject = {};
                     mappingArray.push(newObject);
                     for (var p in simpleObject)
                         newObject[p] = f(simpleObject[p]);
                     return newObject;

                 case 'array':
                     seenObjects.push(simpleObject);
                     var newArray = [];
                     mappingArray.push(newArray);
                     for (var i = 0, len = simpleObject.length; i < len; i++)
                         newArray.push(f(simpleObject[i]));
                     return newArray;

                 default:
                     return simpleObject;
             }
         } else {
             return mappingArray[indexOf];
         }
     };
     return f(obj);
 }
 


function randomString (){
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}



function  getDate()
{
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd
        } 
        if(mm<10) {
            mm='0'+mm
        } 
        today = yyyy+'-'+ mm+'-'+dd;
        return today;
}


 Date.prototype.yyyymmdd = function() {

      
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
     var dd = this.getDate().toString();
     return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
 };


 Date.prototype.yymmddhhmmss = function() {
 
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
     var dd = this.getDate().toString();
     var hour = "" + this.getHours();
     if (hour.length == 1) {
         hour = "0" + hour;
     }
     var minute = "" + this.getMinutes();
     if (minute.length == 1) {
         minute = "0" + minute;
     }
     var second = "" + this.getSeconds();
     if (second.length == 1) {
         second = "0" + second;
     }
     return yyyy + "-" + mm + "-" + dd + " " + hour + ":" + minute + ":" + second;
 }



 function setJsonPath(obj,path, val) {
  var fields = path.split('.');
  var result = obj;
  for (var i = 0, n = fields.length; i < n && result !== undefined; i++) {
    var field = fields[i];
    if (i === n - 1) {
      result[field] = val;
    } else {
      if (typeof result[field] === 'undefined') {
        result[field] = {};
      }
      result = result[field];

    }
  }
}

//????
 function helps_prod() {
     var x = AppCategory.getContextMenus();
     for (var i = 0; i < x.length; i++) {
         menus = x[i].menus;
         for (var j = 0; j < menus.length; j++) {
             obj = {};
             obj.title = menus[j].title;
             obj.opcode = menus[j].opcode;
             items = [];
             if (menus[j].itemcfg) {
                 for (k = 0; k < menus[j].itemcfg.length; k++) {
                     if (!menus[j].itemcfg[k].hasOwnProperty('hidden')) {
                         items.push(menus[j].itemcfg[k].label);
                     }
                 }
             }
             obj.items = items;

             var url = "http://127.0.0.1/newoss/index.php/dbdocu/help_generator";
             Fb.ajaxPostData(url, obj, null);
         }
     }
     return;
 }




 function ajaxPostData (url, para, callback) {
     WaitMask.show();
     var json = Ext.encode(para);
     var that = this;
     Ext.Ajax.request({
         url: url,
         jsonData: json,
         method: 'POST',
         success: function(response, opts) {
             WaitMask.hide();
             var ret = Ext.util.JSON.decode(response.responseText);
             if (ret.success) {
                 if (ret.file_operation) {
                     return;
                 }
                 
                 if (ret.showdownload) {
                     FileUpload.showDownload(ret.fname);
                     return;
                 }
                 
                 if ((ret.msg.length > 0) && (!ret.hasOwnProperty('show_msg_on_error'))) {
                     Ext.Msg.alert(i18n.msg, ret.msg);
                 }

                 if (callback) {
                     callback(ret);
                 }

             } else {
                 if(ret.errmsg){Ext.Msg.alert(i18n.error, ret.errmsg);}else{Ext.Msg.alert(i18n.error, ret.msg);}
             }
         },
         failure: function(response, opts) {
             WaitMask.hide();
             Ext.Msg.alert(i18n.msg, response.responseText);
         }
     });
 }

 function getGridExtraData() {
     var gridid = 'not_exists_grid_id';
     if (Ext.getCmp('reorder_columns_grid')) {
         gridid = 'reorder_columns_grid';
     }

     if (Ext.getCmp('x_grid_for_dnd')) {
         gridid = 'x_grid_for_dnd';
     }

  

    if (Ext.getCmp('reorder_activity_order_grid')) {
         gridid = 'reorder_activity_order_grid';
     }
 


    if (Ext.getCmp('raw_table_grid_id')) {
         gridid = 'raw_table_grid_id';
     }
  
 

     if (!Ext.getCmp(gridid)) {
         return null;
     }

     var ds = Ext.getCmp(gridid).getStore();
     
     var destGrid=Ext.getCmp(gridid);
     
     if(destGrid.selModel.singleSelect &&  ! gridid=='reorder_columns_grid' )
     {
      var singleSelectGrid=true;   
      var items=destGrid.getSelectionModel().getSelections();
     }
     else
     {
     var singleSelectGrid=false;
     var items = ds.data.items;
     }

     

     var griddata = [];
     for (var i = 0; i < items.length; i++) {
         var c = items[i].data;
         griddata.push(c);
     }

     var cm =destGrid.getColumnModel();
     
     var col_count = cm.getColumnCount();
     return {
         mustHaveOneRow:singleSelectGrid,
         data: griddata,
         col_count: col_count,
         row_count: items.length
     }
 }



function getTreeData(treeid){

                var tree=Ext.getCmp(treeid);
                var rootnode=tree.getRootNode()
                var treejson=tree.getRootNode().getJson(rootnode);
                return treejson;
                 
                 
}