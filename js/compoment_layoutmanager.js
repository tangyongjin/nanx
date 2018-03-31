
/*
compoment_layoutmanager.js
*/

Ext.ns('Layout');

var Layout = {};



 Layout.LayoutManager = function(grid) {
     var c = new Ext.dd.DropTarget(grid.getView().scroller.dom, {
         ddGroup: "NANX_gridDD",
         notifyDrop: function(DragSource, event, DragData) {
             var orgStore = DragSource.grid.getStore();
             var records = DragSource.dragData.selections;
             var index = orgStore.find('value', records[0].data.value);
             var xy = event.getXY();
             var landed = getColRange(grid, xy[0], xy[1], event);

            

             var col_use = landed.col;
             var col_name = 'col_' + col_use;
             var cell = {};
             cell[col_name] = records[0].data.value;
             var Field_rec = new Ext.data.Record(cell);
             if (landed.out) {
                 var new_col_config = {
                     dataIndex: 'col_' + landed.col,
                     header: i18n.col_prefix + landed.col
                 };
                 var cm = grid.getColumnModel();
                 cm.config.push(new_col_config);
                 cm.setConfig(cm.config);
                 grid.doLayout();
             }
             if (landed.new_row) {
                 grid.store.add(Field_rec);

             } else {
                 var current_row = grid.getStore().getRange(landed.row, landed.row);
                 var fieldName = 'col_' + landed.col;
                 var tmpvalue = current_row[0].get('col_' + landed.col);
                 if (!(tmpvalue === undefined)) {
                     var restore_Field = new Ext.data.Record({
                         value: tmpvalue
                     });
                 }
                 current_row[0].set('col_' + landed.col, records[0].data.value);
                 grid.store.commitChanges();
             }
         }
     });
 };

 

 Layout.RestoreField = function(grid, row, col, event) {
     var cellMenu = new Ext.menu.Menu({
         items: [{
             text: i18n.remove,
             iconCls: "menu_del"
         }],
         listeners: {
             click: function(item) {
                 var current_row = grid.getStore().getRange(row, row);
                 var tmpvalue = current_row[0].get('col_' + col);
                 current_row[0].set('col_' + col, undefined);
                 var x = Ext.getCmp('reorder_columns_grid');
                 var restore_Field = new Ext.data.Record({
                     value: tmpvalue
                 });

                 if (tmpvalue.length > 0) {
                     var index = x.getStore().find('value', tmpvalue);
                     if (index == -1) {
                         x.getStore().add(restore_Field);
                     }
                 }
             }
         }
     });
     event.stopEvent();
     cellMenu.showAt(event.xy);
 };

