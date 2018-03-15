<?php 

class MTree extends CI_Model{


   public $id;
   public $parent_id;
   public $value;
   public $children;
   public $depth;

  public function __construct()
    {
        // parent::__construct();
      // $this->id = $id;
      // $this->parent_id = $parent_id;
      // $this->value = $value;
      // $this->children = array();
      // $this->depth = 0;


    }


     function get_children_from_mysql() {
      $query = "SELECT * FROM parkos_org WHERE parent_id = '$this->id' ";
      $results = mysql_query($query);
      while ($next = mysql_fetch_array($results)) {
         $next_node = new Node($next['uid'], $next['parent_uid'], $next['value']);
         $this->children[$next_node->id] = $next_node;
         $next_node->get_children_from_mysql();
      }   
   }   


   function to_array() {
      if (count($this->children) > 0) {
         $arr = array();
         foreach ($this->children as $child) {
            array_push($arr, $child->to_array());
         }   
         return array($this->value => $arr);
      } else {
         return $this->value;
      }   
   }

   function to_json() {
      return json_encode($this->to_array());
   }
   

  
  }


 
?>