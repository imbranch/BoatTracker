<?php
    class TableALLController {
    	
    	function __construct($conn) {
    		$this->conn = $conn;    	
    	}

        
        public function index() {
            ini_set('memory_limit', '2024M');
            $data  =  array();
            $sql   =  "SELECT * FROM SteamReviews LIMIT 10000";            
            $result =  $this->conn->query($sql);            
            
            if($result->num_rows > 0) {            
                $data =  mysqli_fetch_all($result, MYSQLI_ASSOC);            
            }          
           
            
                  

           return $data;


        }

        public function indexMG() {
            ini_set('memory_limit', '2024M');
            $data  =  array();
            $sql   =  "SELECT * FROM SteamGames";            
            $result =  $this->conn->query($sql);            
            if($result->num_rows > 0) {            
                $data =  mysqli_fetch_all($result, MYSQLI_ASSOC);            
            }          
           
            
                   

           return $data;


        }
        public function indexEAR(){
            ini_set('memory_limit', '2024M');
            $data = array();
            $sql = "SELECT sr.review_id,sr.authorsteamid FROM SteamReviews sr WHERE earlyaccess = 'True' LIMIT 10000";
            $result =  $this->conn->query($sql);            
            if($result->num_rows > 0) {            
                $data =  mysqli_fetch_all($result, MYSQLI_ASSOC);            
            }  

            return $data;
        }
    }
?>