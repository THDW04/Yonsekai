<?php
class PDOFactory
{
    public static function getMysqlConnexion()
    {
        $db = new PDO('mysql:host=localhost;dbname=vilasse_yonsekai', 'vilasse_nathalia', '#Leeroy-1715');
        $db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $db;
    }
}
$db = PDOFactory::getMysqlConnexion();
?>