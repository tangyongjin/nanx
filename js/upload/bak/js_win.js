﻿ NANXplugin_window.prototype.jsfun=function()
 {    
 	
 	
 	var form = new Ext.form.FormPanel({
      
       width : 650,
       autoHeight : true,
       frame : true,
       
       layout : "form", // 整个大的表单是form布局
       labelWidth : 65,
       labelAlign : "right",
       items : [{ // 行1
        layout : "column", // 从左往右的布局
        items : [{
           columnWidth : .3, // 该列有整行中所占百分比
           layout : "form", // 从上往下的布局
           items : [{
              xtype : "textfield",
              fieldLabel : "姓",
              width : 120
             }]
          }, {
           columnWidth : .3,
           layout : "form",
           items : [{
              xtype : "textfield",
              fieldLabel : "名",
              width : 120
             }]
          }, {
           columnWidth : .3,
           layout : "form",
           items : [{
              xtype : "textfield",
              fieldLabel : "英文名",
              width : 120
             }]
          }]
       }, { // 行2
          layout : "column",
          items : [{
             columnWidth : .27,
             layout : "form",
             items : [{
                xtype : "textfield",
                fieldLabel : "座右铭1",
                width : 80
               }]
            }, {
             columnWidth : .7,
             layout : "form",
             items : [{
                xtype : "textfield",
                fieldLabel : "座右铭2",
                width : 100
               }]
            }]
         }, {// 行3
          layout : "form",
          items : [{
             xtype : "textfield",
             fieldLabel : "奖励",
             width : 500
            }, {
             xtype : "textfield",
             fieldLabel : "处罚",
             width : 500
            }]
         }, {// 行4
          layout : "column",
          items : [{
             layout : "form",
             columnWidth : 0.2,
             items : [{
                xtype : "textfield",
                fieldLabel : "电影最爱",
                width : 50
               }]
            }, {
             layout : "form",
             columnWidth : 0.2,
             items : [{
                xtype : "textfield",
                fieldLabel : "音乐最爱",
                width : 50
               }]
            }, {
             layout : "form",
             columnWidth : 0.2,
             items : [{
                xtype : "textfield",
                fieldLabel : "明星最爱",
                width : 50
               }]
            }, {
             layout : "form",
             columnWidth : 0.2,
             items : [{
                xtype : "textfield",
                fieldLabel : "运动最爱",
                width : 50
               }]
            }]
         }, {// 行5
          layout : "form",
          items : [{
             xtype : "htmleditor",
             fieldLabel : "获奖文章",
             enableLists : false,
             enableSourceEdit : false,
             height : 150
            }]
         }],
       buttonAlign : "center",
       buttons : [{
          text : "提交"
         }, {
          text : "重置"
         }]
      });
    
   
   
   
 	 
   
 	    var grid_win = new Ext.Window(
  {
  title : "AbsoluteLayout Container",
  height:400,
  width:800,
  items : [form]
  }
                        );
                        grid_win.doLayout();
                        grid_win.show();
 
 
 }