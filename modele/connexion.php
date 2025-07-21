<?php
    try{
      $db=new PDO("mysql:dbname=formation;host=localhost;","root","");
      $db->exec("SET NAMES UTF8");
      $db->SETAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC);
      // echo "la connexion ça marche";
  }catch(PDOexeception $e)
  {
  die('erreur:'.$e->getMessage());
  }
  if (isset($_POST["ent"])) {
    $ent = $_POST["ent"];
    $resultat = array();
    switch ($ent) {
        case 'Connexion':            
            
            $nom_utilisateur=addslashes($_POST["login"]);
            $mot_de_passe=addslashes($_POST["mdp"]);   
            $sql="select * from t_users where login ='$nom_utilisateur' and mdp ='$mot_de_passe'";
            $requete=$db->query($sql);
            $data = $requete->fetchAll();
            $n = $requete->rowcount();
            if ($n == 1) {
                //$resultat = array(1);
                $resultat = array(1, $data[0]["login"],$data[0]["statut"],$data[0]["image"]);
            } else {
                $resultat = array(0);
            }
            break;
        case 'receptionlist':            
            $sql="select *,date_format(date_naiss, '%d%m%Y') as date_nais from t_reception";
            $requete=$db->query($sql);
            $data = $requete->fetchAll(PDO::FETCH_ASSOC);
            $n = $requete->rowcount();
            if ($n >0) {
               foreach($data as $ligne){
                $resultat[]=$ligne;
               }
            } 
            break;
        
            case 'Ajouter_rece':
                $nompatient=addslashes($_POST["nompatient"]);
                $date_naiss =addslashes($_POST["date_naiss"]);
                $adresse =addslashes($_POST["adresse"]);
                $paiement =addslashes($_POST["paiement"]);
                $telephone =addslashes($_POST["telephone"]);
                $etat_civil =addslashes($_POST["etat_civil"]);
             
                             
                if ($requete=$db->query("insert into t_reception(id, nompatient, date_naiss, adresse, paiement, telephone,	etat_civil) values(null, '$nompatient', '$date_naiss', '$adresse', '$paiement', '$telephone', '$etat_civil')")) {
                    
                    $resultat = array(1);
                } else {
                    $resultat = array(0);
                }
                break;
                case 'consultationlist':            
                    $sql="select *,date_format(date_arriver, '%d%m%Y') as date_arriver from t_consultation";
                    $requete=$db->query($sql);
                    $data = $requete->fetchAll(PDO::FETCH_ASSOC);
                    $n = $requete->rowcount();
                    if ($n >0) {
                       foreach($data as $ligne){
                        $resultat[]=$ligne;
                       }
                    } 
                    break;
                case 'Ajouter_consultation':
                    $date_arriver=addslashes($_POST["date_arriver"]);
                    $date_regle =addslashes($_POST["date_regle"]);
                    $poid =addslashes($_POST["poid"]);
                    
                   
                                 
                    if ($requete=$db->query("insert into t_consultation(id, date_arriver, date_regle, poid) values(null, '$date_arriver', '$date_regle', '$poid')")) {
                        
                        $resultat = array(1);
                    } else {
                        $resultat = array(0);
                    }
                    break;
                    case 'Ajouter_medecin':
                        $nommed=addslashes($_POST["nommed"]);
                        $idfich=addslashes($_POST["idfich"]);
                        $telephone=addslashes($_POST["telephone"]);
                        $sexe =addslashes($_POST["sexe"]);
                     
                     
                                     
                        if ($requete=$db->query("insert into t_medecin(id, nommed, idfich, telephone, sexe ) values(null, '$nommed', '$idfich', '$telephone', '$sexe')")) {
                            
                            $resultat = array(1);
                        } else {
                            $resultat = array(0);
                        }
                        break;
                        case 'medecinlist':            
                            $sql="select * from t_medecin";
                            $requete=$db->query($sql);
                            $data = $requete->fetchAll(PDO::FETCH_ASSOC);
                            $n = $requete->rowcount();
                            if ($n >0) {
                               foreach($data as $ligne){
                                $resultat[]=$ligne;
                               }
                            } 
                            break;
                        case 'Ajouter_imagelist':            
                            $sql="select * from gestion_image";
                            $requete=$db->query($sql);
                            $data = $requete->fetchAll(PDO::FETCH_ASSOC);
                            $n = $requete->rowcount();
                            if ($n >0) {
                               foreach($data as $ligne){
                                $resultat[]=$ligne;
                               }
                            } 
                            break;
                    
                        case 'Ajouter_rendez_vous':
                            $idmed=addslashes($_POST["idmed"]);
                            $idfich=addslashes($_POST["idfich"]);
                            $date_arriver=addslashes($_POST["date_arriver"]);
                            $date_rendez_vous =addslashes($_POST["date_rendez_vous"]);
                         
                         
                                         
                            if ($requete=$db->query("insert into t_rendez_vous(id, idmed, idfich, date_arriver, date_rendez_vous ) values(null, '$idmed', '$idfich', '$date_arriver', '$date_rendez_vous')")) {
                                
                                $resultat = array(1);
                            } else {
                                $resultat = array(0);
                            }
                            break;
                            case 'Ajouter_image':
            
                                $photo="";
                                $nom=addslashes($_POST["nom"]);
                                $prix =addslashes($_POST["prix"]); 			
                                $nom_image =  $nom."_".$prix;
                                //$nom_image = str_replace('/', '_',$nom_image);
                                  if(isset($_FILES['FichierEnvoye']['name'])){
                                    $avatarExploded = explode('.',$_FILES['FichierEnvoye']['name']);
                                    $image_ext = strtolower(end($avatarExploded));
                    
                                        if(!in_array($image_ext,array('jpg','jpeg','png','gif','pdf')))
                                        {
                                          echo"<script>alert('Fichier invalide');</script>";
                                        }else{					 				
                                        $name_file =$nom_image  . "." .  $image_ext;  //recuperation du nom du fichier pour enregistrer un nouveau a la destination $_POST['pseudouser']"CE-2011"
                                        //$name_file =$_FILES['file']['name'];				
                                        // on copie le fichier dans le dossier de destination
                                         move_uploaded_file($_FILES['FichierEnvoye']['tmp_name'], "../uti_image/".$name_file); 
                                      
                                        }
                                          $photo=$name_file;		
                                            
                                    }
                                      
                                if ($requete=$db->query("insert into gestion_image(id, nom, prix, images) values(null, '$nom', '$prix', '$photo')")) {
                                    $resultat = array(1);
                                } else {
                                    $resultat = array(0);
                                }
                            break;
                                
                                case'recherchermedecin':
                                    $id=addcslashes($_POST['id']);
                                    $sql="select * from t_medecin where id='$id' ";
                                    $requete=$db->query($sql);
                                    $data=$requete->fetchAll();
                                    $n=$requete->rowcount();
                                    if($n==1){
                                        //$resultat = array(1); Textes complets
                                        $resultat = array(1,$data[0]["id"],$data[0]["nommed"],$data[0]["telephone"],$data[0]["sexe"]);
                                    }else{
                                        $resultat = array(0);
                                    }
                                    break;
                                    case ' supprimermedecin':
                                        $id=addcslashes($_POST['id']);
                                        $sql=" delete * from t_medecin where id='$id' ";
                                        $requete=$db->query($sql);  
                                    
                                        if($requete=$db->query("delete from t_medecin where id='$id'")){
                                          
                                            $resultat = array(1);
                                        }else{
                                            $resultat = array(0);
                                        }
                                        break;
                                        case ' editermedecin':
                                            $id=addcslashes($_POST['id']);
                                            $nom=addcslashes($_POST['nom']);
                                            $telephone=addcslashes($_POST['telephone']);
                                            $sexe=addcslashes($_POST['sexe']);
                                            $sql=" update  t_medecin set nommed= '$nommed',telephone= '$telephone' , sexe='$sexe' ";
                                            $requete=$db->query($sql);  
                                        
                                            if($requete=$db->query($sql)){
                                              
                                                $resultat = array(1);
                                            }else{
                                                $resultat = array(0);
                                            }
                                            break;
                                                
                                } 
                                
                               
                                 
                                


     echo (json_encode($resultat));
    } else {
        $resultat = array("n" => 500);
        echo (json_encode($resultat));
    }

?>