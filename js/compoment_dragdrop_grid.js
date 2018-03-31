/*
compoment_dragdrop_grid.js
*/


Ext.ns('DDGrid');

var DDGrid = {};


 
 DDGrid.dndgrid = function(grid_cfg) {
     var col_need = [];
     var fields = [];
     var col_model = [];
     for (var i = 0; i < grid_cfg.fields.length; i++) {
         var single_col = {};
         single_col.name = grid_cfg.fields[i].column;
         single_col.dataIndex = grid_cfg.fields[i].column;
         single_col.header = grid_cfg.fields[i].column_title;
         single_col.width = 150;

        if( grid_cfg.fields[i].hasOwnProperty('width')){
              single_col.width=grid_cfg.fields[i].width;
         } 
         if( grid_cfg.fields[i].hasOwnProperty('hidden')){
              single_col.hidden=grid_cfg.fields[i].hidden;
         } 


         col_need.push(single_col);
         fields.push(grid_cfg.fields[i].column);
     }

     var need = Ext.data.Record.create(col_need);
     var category_params = grid_cfg;
     var ds_cfg = {
         reader: new Ext.data.ArrayReader(need),
         baseParams: grid_cfg,
         proxy: new Ext.data.HttpProxy({
             url: TREE_URL,
             method: 'POST'
         }),
         root: 'server_resp',
         fields: fields
     };

     var cm = new Ext.grid.ColumnModel(col_need);
     var ds = new Ext.data.JsonStore(ds_cfg);
     ds.load();
     

     console.log(col_need)
     console.log(ds)
     
     var groupName='NANX_gridDD'
     if (grid_cfg.DD_group){
          groupName =grid_cfg.DD_group
     }

     var Dragable_grid  = new Ext.grid.GridPanel({
         'title': grid_cfg.gridlabel,
         id: grid_cfg.grid_ext_id,
         height: 360,
         width: grid_cfg.grid_width,
         store: ds,
         border: true,
         cm: cm,
         columnLines: true,
         ddGroup: 'NANX_gridDD',
         enableDragDrop: true,
         autoScroll: true,
         sm: new Ext.grid.RowSelectionModel({
             singleSelect: true
         })
        });
     
     Dragable_grid.addListener('afterrender', DDGrid.grid_dnd_mgr.createDelegate(this,[],true));
     return {
         items: [Dragable_grid]
     };
 };


  
 DDGrid.grid_dnd_mgr = function(grid) {
  
                var firstGridDropTargetEl =  grid.getView().scroller.dom;
                var firstGridDropTarget = new Ext.dd.DropTarget(firstGridDropTargetEl, {
                ddGroup    : 'NANX_gridDD',
                notifyDrop : function(DragSource, event, DragData)
                {  

                     if (  DragSource instanceof  Ext.grid.GridDragZone)
                      {   // 内部数据
                          var ds = grid.store;
                             var selModel = grid.getSelectionModel();
                             var selected_rows = selModel.getSelections();
                             if (DragSource.getDragData(event)) {
                                 var row_index = DragSource.getDragData(event).rowIndex;
                                 if (typeof(row_index) != "undefined") {
                                     for (i = 0; i < selected_rows.length; i++) {
                                         ds.remove(ds.getById(selected_rows[i].id))
                                     }
                                     ds.insert(row_index, DragData.selections);
                                     selModel.clearSelections();
                                 }
                             }

                     }else{   // 从外部tree来的数据
                          
                          if( DragData.node.attributes.id =='root_menu_id_1234'){
                            return 
                          }
                          
                          if  (DragData.node.attributes.value.indexOf('mgroup') === 0){
                            alert('不能拖拽这种节点')
                            return 
                          }

                       

                          DragData.node.parentNode.removeChild(DragData.node)

                          var tree_rec = new Ext.data.Record(DragData.node.attributes.json);
                          grid.store.add(tree_rec)
                     }

                   return true
                }
               });
 }
