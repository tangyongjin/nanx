
/*
工具类函数
*/


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
             ajaxPostData(url, obj, null);
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
                     FileMgr.showDownload(ret.fname);
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



function getCurrentColandIndex(rowindex){
    var grid=Ext.getCmp("grid_NANX_TBL_INDEX");
    ds=grid.getStore();
    var cols4index = ds.reader.jsonData.cols4index;
    var tb_col_arr = [];
    for (var i=0;i<cols4index.length;i++) {
        var d = cols4index[i]['Field'];;
        tb_col_arr[i]=[d,d];
    }
    var indexcol=[];
    var current_cols=Ext.getCmp("grid_NANX_TBL_INDEX").store.getAt(rowindex);
    var columns=current_cols.data.columns;
    if (columns){
        columns=columns.split(",");
        if (columns.length){
            for (var i=0;i<columns.length;i++){
                var onecol=(columns[i]);
                indexcol.push([onecol,onecol]);
            }
        }
    }
    var aviableCols=getAviableCols(tb_col_arr,indexcol);
    var colreader=new Ext.data.ArrayReader({},[{name:'text'},{name:'value'}]);
    var dscfg1={
        fields:['value', 'text'],
        reader:colreader
    };
    var dscfg2={};
    Ext.apply(dscfg2, dscfg1);
    dscfg1.data=aviableCols;
    dscfg2.data=indexcol;
    var leftData=new Ext.data.ArrayStore(dscfg1);
    var rightData = new Ext.data.ArrayStore(dscfg2);
    return {
        allcol:leftData,
        usedcol:rightData
    };
}




function getSqlfromDs(ds)
{
    var cols = [];
    var s = [];
    var pk_cols = [];
    var sql = "";
    for (var i = 0, fieldnum = ds.data.items.length; i < fieldnum; i++) {
        var field = ds.data.items[i].data;
        if (field.field_name || field.datatype) {
            cols.push(field)
        }
    }
    for (var i = 0; i < cols.length; i++) {
        var field = cols[i];
        var col_define = '';
        col_define += field.field_name;
        col_define += " " + field.datatype;
        if (field.length) {
            col_define += "(" + field.length + ")"
        }
        if (field.unsigned) {
            col_define += " UNSIGNED ";
        }
        if (field.primary_key || field.not_null) {
            col_define += " NOT NULL "
        } else {
            col_define += " NULL "
        }
        if (field.default_value) {
            var r = field.default_value;
            field.default_value = r.replace(/[\']{1}/gi, "");
            var m = /\s/g;
            if (m.test(field.default_value) || field.datatype.toLowerCase() == "enum") {
                field.default_value = "'" + field.default_value + "'"
            }
            col_define += " DEFAULT " + field.default_value;
        }
        if (field.auto_increment) {
            col_define += " AUTO_INCREMENT "
        }
        if (field.comment) {
            col_define += " COMMENT '" + field.comment + "' "
        }
        s.push(col_define);
        if (field.primary_key) {
            pk_cols.push(field.field_name)
        }
    }
    if (pk_cols.length) {
        var f = pk_cols.join(", ");
        var p = " PRIMARY KEY (" + f + ")";
        s.push(p);
    }
    var sql = "CREATE TABLE TB_TO_REPLACE ( " + s + " )";
    return sql;
}



function getColRange(grid,x,y,event){
     var gridBox=grid.getBox();
     var hh=grid.getColumnModel();
     var max_right_postion=gridBox.x+hh.getTotalWidth();

     var col_count_exists=hh.getColumnCount();
     var col_postion=[];
     for (var jj=0; jj < col_count_exists; jj++){
         var col_width_so_for=0;
         for (var i=0; i <= jj; i++){
             col_width_so_for += hh.getColumnWidth(i);
         }

         var this_width=hh.getColumnWidth(jj);
         col_postion.push({
             col_index:jj,
             col_width_so_for:col_width_so_for,
             x_start:gridBox.x + col_width_so_for - this_width,
             x_end:gridBox.x + col_width_so_for
         });
     }

     var rows_count=grid.getStore().getCount();
     if (rows_count > 0){
         var row=grid.getView().getRow(0);
         var row_height=Ext.get(row).getHeight();
         var row_box=Ext.get(row).getBox();
         var y_start=row_box.y;
         var row_used=Math.ceil((y - y_start) / row_height);

         var new_row=false;
         if (row_used > rows_count){
             row_used=rows_count - 1;
             new_row=true;
         } else {
             row_used=row_used - 1;
             new_row=false;
         }

     } else {
         var new_row=true;
         var row_used=0;
     }
     if (x > max_right_postion){
         return {
             new_row:new_row,
             out:true,
             col:col_count_exists,
             row:row_used
         };
     } else {
         for (k=0; k < col_postion.length; k++){
             if ((x > col_postion[k].x_start) && (x < col_postion[k].x_end)){
                 var found=k;
                 break;
             }
         }
         return {
             new_row:new_row,
             out:false,
             col:found,
             row:row_used
         };
     }
 };
 
 
function getAviableCols(tblcols,usedcols){
     var result=[];
     for (var i=0; i < tblcols.length; i++){
         var found=-1;
         var col=tblcols[i];
         for (var j=0; j < usedcols.length; j++){
             if (usedcols[j][0] == col[0]){
                 found=0;
                 break;
             }
         }
         if (found == -1){
             result.push(col);
         }
     }
     return result;
}


