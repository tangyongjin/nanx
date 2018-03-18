<?php
class MDatafactory extends CI_Model
{
    function setSqlbyBasetable($basetable,$id_order)
    {
        $where = array(
            'base_table' => $basetable
        );
        
        $combo_fields = $this->db->select('base_table,field_e,combo_table,list_field,value_field,filter_field,group_id,level')->get_where('nanx_biz_column_trigger_group', $where)->result_array();
        $base_fields  = $this->db->list_fields($basetable);
        
        $transed_fields = array();
        $joins         = array();
        $ghosts        = array();
        
        $field_list_str = '';
        $join_str       = '';
        $ghosts_str     = '';
        
        // 对每个列,查找combo_fields,看是否需要替换为left join形式.
        $this->load->model('MFieldcfg');
        foreach ($base_fields as $table_field) {
            logtext("----->");
            // logtext($basetable);
            // logtext($table_field);
            // logtext($combo_fields);
            


            $found           = $this->MFieldcfg->getTransedField($basetable, $table_field, $combo_fields);
            
            logtext($found);
            
            $transed_fields[] = $found['transed'];
            $ghosts[]        = $found['ghost'];
            $joins[]         = $found['join'];
        }


        
        
        foreach ($transed_fields as $field) {
            $field_list_str .= $field . ",";
        }
        
        foreach ($ghosts as $ghost) {
            if (strlen($ghost) > 10) {
                $ghosts_str .= $ghost . ",";
            }
        }
        
        $live_and_ghost = $field_list_str . $ghosts_str;
        $live_and_ghost = substr($live_and_ghost, 0, -1);
        foreach ($joins as $join) {
            $join_str .= $join;
        }
        
        $sql = "select $live_and_ghost from $basetable ";
        $sql_select = $sql . $join_str;
        $sql_select .= " order by $basetable.id $id_order";
        return $sql_select;
    }
    

     

    function join_view_filter($sql,$view_filter)
    {
      $view_filter=trim($view_filter);
      if (strlen($view_filter)==0){
        return $sql;
      } 

      
      if (strpos($sql,'where') !== false)
      {
         $new_where=" and $view_filter ";
      }else{
        $new_where=" where $view_filter ";
      }

      $orderbystring_pos=strrpos($sql,'order');

      $sql_add_filter = substr_replace($sql, $new_where, $orderbystring_pos, 0);
      return $sql_add_filter;


    }


    function join_who_is_who($sql,$who_is_who_found)
    {
      $who_is_who_found=trim($who_is_who_found);
      if (strlen($who_is_who_found)==0){
        return $sql;
      } 

      
      if (strpos($sql,'where') !== false)
      {
         $new_where=" and $who_is_who_found ";
      }else{
        $new_where=" where $who_is_who_found ";
      }

      $orderbystring_pos=strrpos($sql,'order');

      $sql_add_whoiswho = substr_replace($sql, $new_where, $orderbystring_pos, 0);
      return $sql_add_whoiswho;


    }
    
    function getDatabyBasetable($table, $id_order, $query_cfg,$who_is_who_found,$view_filter)
    {
        $transfer = true;
        $sql      = $this->setSqlbyBasetable($table,$id_order);
        if ($query_cfg) {
            $all_fields = $this->db->query("show full fields from  $table")->result_array();
            $all_fields = array_retrieve($all_fields, array(
                'Field',
                'Type'
            ));
            $this->load->model('MFieldcfg');
            $need_types   = $this->MFieldcfg->getMysqlDataTypes('wrap');
            $needs        = $this->check_col_wrapper($need_types, $all_fields);
            $query_cfg    = (array) ($query_cfg);
            $search_count = $query_cfg['count'];
            $search_cfg   = (array) $query_cfg['lines'];
            $sql          = $this->buildSql($table, $sql, $search_count, $search_cfg, $needs);
        }

        $sql=$this->join_who_is_who($sql,$who_is_who_found);
        $sql=$this->join_view_filter($sql,$view_filter);
        
        
        $total=$this->getRowsCount($table);     // 如果 table 数据太多,有可能导致php 内存用满.直接采取 count(*)计算总条数

        
        
        if (isset($_GET['start'])) {
            $start = $_GET['start'];
            $limit = $_GET['limit'];
            $sql   = $sql . " limit $start,$limit";
        }
        
        logtext($sql);

        $rows          = $this->db->query($sql)->result_array();
        $data['rows']  = $rows;
        $data['total'] = $total;
        $data['table'] = $table;
        $data['sql']   = $sql;
        return $data;
   

    }
    
    function getWhoIsProducer_where($p)
    {
       $sql_who_is_who='';  
       $maintable=$p['table'];
       $whoami=$p['whoami'];
       $sql="select field_e from  nanx_biz_column_editor_cfg where base_table='$maintable' and is_produce_col=1 "; 
    
       $row=$this->db->query($sql)->row_array();
       if ($row)
       {
        $main_table_field=$row['field_e'];
        
        $sql_who_is_who=" $maintable.$main_table_field='$whoami'";
       }
       return $sql_who_is_who;
    }
    
    function getWhoIsWho_where($p)
    {

      

      $this->load->model('MRdbms');
      if(! array_key_exists('whoami', $p) ) {return '';}  
      $sql_who_is_who='';  
      $who_is_who=$p['who_is_who'];
      if (count($who_is_who)>=1 )
              {
              $maintable=$p['table'];
              $logged_user=$p['whoami'];
              $who_is_who=$p['who_is_who'][0];
              $who_is_who_value=$who_is_who->inner_table_value;  
              $staff_table=$who_is_who->inner_table;
              $sql=" select * from nanx_biz_column_trigger_group where base_table='$maintable'  and combo_table='$staff_table' and level=1 limit 1 ";
              $row=$this->db->query($sql)->row_array();
              if($row){
                $main_table_field=$row['field_e'];

                $field_is_number_type = $this->MRdbms->check_filed_is_number_type($maintable,$main_table_field );
                if($field_is_number_type){
                 $sql_who_is_who=" $maintable.$main_table_field = $who_is_who_value";
                }
                else{
                 $sql_who_is_who=" $maintable.$main_table_field ='".$who_is_who_value."'";
                }
               } 
            }

     return $sql_who_is_who;
    }

    function buildSql($table, $sql, $count, $lines, $needs)
    {
        $fix   = 'where 1=1 and(';
        $where = '';
        for ($i = 0; $i < $count; $i++) {
            $and_or = $lines['and_or_' . $i];
            if ($i == 0) {
                $and_or = '';
            }
            $field = $lines['field_' . $i];
            if (in_array($field, $needs)) {
                $wrapp_text = "'";
            } else {
                $wrapp_text = "";
            }
            
            $field = $table . "." . $lines['field_' . $i];
            
            $operator = $lines['operator_' . $i];
            $arg      = $lines['vset_' . $i];
            
            if ($operator == 'like') {
                $arg = '%' . $arg . '%';
            }
            if ($operator == 'like_begin') {
                $operator = 'like';
                $arg      = $arg . '%';
            }
            if ($operator == 'like_end') {
                $operator = 'like';
                $arg      = '%' . $arg;
            }
            
            
            $where .= $and_or . ' (' . $field . ' ' . $operator . ' ' . $wrapp_text . $arg . $wrapp_text . ') ';
            
        }
        $sql = str_replace('order', $fix . $where . ') order ', $sql);
        return $sql;
    }
    
    function check_col_wrapper($need_types, $all_fields)
    {
        $need = array();
        foreach ($all_fields as $one) {
            $field = $one['Field'];
            $a     = explode('(', $one['Type']);
            $type  = $a[0];
            if (in_array($type, $need_types)) {
                $need[] = $field;
            }
        }
        return $need;
    }
    
    function getDatabySql($sql)
    {

        $data=array();
        $this->load->model('Mactivity');
        $sqltype=$this->Mactivity->judeSqlType($sql);
        $dbres=$this->db->query($sql);
        if ($dbres){
                    if($sqltype=='select')
                    {
                        $data['dbok']=true;
                        $data['rows']=$dbres->result_array();
                        $total         = count($data['rows']);
                        $data['total'] = $total;
                     
                    }
                     else
                    {
                           $data['dbok']=true;
                           $data['total'] = 1;
                           $effected=$this->db->affected_rows();
                           $data['rows']=array(array('sqltype'=>$sqltype,'effected'=>$effected) );
                    }
                    

            }else
               {
                $data['dbok']=false;
                $data['rows']=null;
                $data['sql_code']=$this->db->_error_number();
                $data['sql_error_msg']=   $this->db->_error_message();
                }

        $data['sql']=$sql; 
        return $data;
    }



    function getRowsCount($table){
           $sql="select count(*) as rowscoutn from $table";
           $dbres=$this->db->query($sql)->row_array();
           return   $dbres['rowscoutn'];
    }
    
    
}
?>