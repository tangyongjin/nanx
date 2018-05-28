<?php 


class MGhxwhook extends CI_Model{

 
    function debug_update($para){


        logtext('钩子开始工作:MGhxwhook debug_update:data recevied is');   
       

        $rawdata=(array)$para['rawdata'];
        $cabinetWeekId=$rawdata['cabinetWeekId'];
        $id=$rawdata['id'];
        $text=$this->getCabinetWeakPath($cabinetWeekId);
        $this->db->where('id', $id);
        $data=array('cabinetName'=>$text);
        $this->db->update('boss_cabinet_weak_facility', $data);
    }

    
    function debug_add($para){
        logtext('钩子开始工作:MGhxwhook debug_add:data recevied is');   
        logtext('--------------------------------');
        logtext($para);   
        $rawdata=(array)$para['rawdata'];
        logtext($rawdata);   
        $cabinetWeekId=$rawdata['cabinetWeekId'];
        $text=$this->getCabinetWeakPath($cabinetWeekId);
        $id=$rawdata['new_inserted_row_id'];

        $this->db->where('id', $id);
        $data=array('cabinetName'=>$text);
        $this->db->update('boss_cabinet_weak_facility', $data);

        
    }


     //由弱电柜的ID取得 IDC/楼宇/楼层/机房 字符串
    function getCabinetWeakPath($cabinetWeekId){

        $sql="select * from boss_cabinet_weak where id =$cabinetWeekId";
        logtext($sql);
        $row=$this->db->query($sql)->row_array();

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
        return  $text;
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
