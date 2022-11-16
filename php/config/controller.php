<?php
    class DBcontrol {
        private $serverName = 'washington.uww.edu';
        private $userName = 'grinkazr27';
        private $passwordName = 'zg8216';
        private $dbName = 'cs366-2221_grinkazr27';
    
        public function connect() {
            $db = new mysqli($this->serverName,$this->userName,$this->passwordName,$this->dbName); 
            return $db;
        }
        

        public function close($db){
            $db -> close();
        }
    }


?>