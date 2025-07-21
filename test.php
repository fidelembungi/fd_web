<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
  try{
    $db=new PDO("mysql:dbname=formation;host=localhost;","root","");
    $db->exec("SET NAMES UTF8");
    $db->SETAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC);
    
}catch(PDOexeception $e)
{
die('erreur:'.$e->getMessage());

}
$sql="select * from t_users where login='kalala'";
$l=$db->query($sql);
$r=$l->fetchall();
echo "<pre>";
var_dump($r);
echo "<pre>";
    ?>
</body>
</html>