<?php 


class MGhxwhook extends CI_Model{

 
    function debug($para){

        // logtext('MGhxwhook called:data recevied is');   
        // logtext('--------------------------------');
        // logtext($para);   

        $rawdata=(array)$para['rawdata'];
        logtext($rawdata);   

        $cabinetWeekId=$rawdata['cabinetWeekId'];

        
        $sql="select * from boss_cabinet_weak where id =$cabinetWeekId";

        $row=$this->db->query($sql)->row_array();
        
        $id=$rawdata['id'];
        $idcID=$row['idcID'];
        $buildingID=$row['buildingID'];
        $floorID=$row['floorID'];
        $roomID=$row['roomID'];
         
        $idc=$this->getIDC($idcID);
        $build=$this->getBuilding($buildingID);
        $floor=$this->getFloor($floorID);
        $room=$this->getRoom($roomID); 
        $cabinetName=$this->getWeakCabinet($cabinetWeekId);
        $text=$idc.'/'.$build.'/'.$floor.'/'.$room.'/'.$cabinetName;
        
        $this->db->where('id', $id);
        $data=array('cabinetName'=>$text);
        $this->db->update('boss_cabinet_weak_facility', $data);
        $sql = $this->db->last_query();
        logtext($sql);    
    }



    function getIDC($idcID){
        $sql="select * from boss_IDC where id=$idcID";
        logtext($sql);
        $row=$this->db->query($sql)->row_array();
        return  $row['idcName'];
    }

  
    function getBuilding($buildingID){
        $sql="select * from boss_IDC_building where id=$buildingID";
        $row=$this->db->query($sql)->row_array();
        return  $row['buildName'];
    }
    

    function getFloor($floorID){
        $sql="select * from boss_IDC_building_floor where id=$floorID";
        logtext($sql);
        $row=$this->db->query($sql)->row_array();
        return  $row['floorName'];
    }
    


    function getRoom ($roomID){
        $sql="select * from boss_IDC_room   where  id=$roomID";
        logtext($sql);
        $row=$this->db->query($sql)->row_array();
        return  $row['roomName'];
    }
    
   
   function getWeakCabinet($cabinetWeekId){
        $sql="select * from boss_cabinet_weak   where  id=$cabinetWeekId";
        logtext($sql);
        $row=$this->db->query($sql)->row_array();
        return  $row['cabinetName'];

   }
  
 

   
 
 


   
    }




?>
