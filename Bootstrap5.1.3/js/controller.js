function charger(formulaire) {
	$('#centre').load('view/'+formulaire+'.html');
	medecinlist();
	rendez_vouslist();
}
function afficher(){ 

	var nom_utilisateur='';
	var mot_de_passe='';
	nom_utilisateur=$('#login').val();
	mot_de_passe=$('#mdp').val();
	if(nom_utilisateur !='' && mot_de_passe !=''){
		$.ajax ({
			url:"./modele/connexion.php",
			type:"POST",
			data:{'ent':'Connexion', 'login':nom_utilisateur, 'mdp':mot_de_passe},
			error:function (data){console.log(data)},
			success: function (data){
				data=JSON.parse(data);
				if(data[0] != 0){
				sessionStorage.setItem('Login_us',data[1] );
				sessionStorage.setItem('statut',data[2] );
				sessionStorage.setItem('photoprofile',data[3] );
				
					location.href="list.html";
				
					
				   
				}else{
					alert('information sont invalide');
					$('#login').val('');
					$('#mdp').val('');
					$('#login').focus();
				}
			}
		});
	}
	else{
		alert('Remplissez tout les champs');
	$('#login').val('');
		$('#mdp').val('');
		$('#login').focus(); 
	}
}

function deconexionApplication(){
    sessionStorage.setItem("Login_us","");
    location.href = "index.html";     
}
function validation_utilisateur(){
    
    if (!sessionStorage.getItem("Login_us") || sessionStorage.getItem("Login_us") == "")
    {
    location.href ="index.html";
    }else{

        $('#username').html((sessionStorage.getItem("Login_us")).toUpperCase());
		$('#profile').attr("src","./uti-image/"+sessionStorage.getItem("photoprofile"));
		if (sessionStorage.getItem("statut").toLowerCase()=="admin") {
			$("#gerer").css({display: "block"});

			
		}else{
			$("gerer").css({display: "none"});
		}
		if (sessionStorage.getItem("photprofile")=="") {
			$('#profile').attr("src","./uti-image/default.jpg");
			
		}else{
			$('#profile').attr("src","./uti-image/"+sessionStorage.getItem("photoprofile"));
    }
}
}
function Ajouter_rece(){
	
	var nompatient=$('#nompatient').val();
	var date_naiss =$('#date_naiss').val();
	var adresse =$('#adresse').val();
	var paiement =$('#paiement').val();
	var telephone =$('#telephone').val();
	var etat_civil =$('#etat_civil').val();
	
	
	if(nompatient !='' && date_naiss !='' && adresse!='' &&  paiement !='' && telephone !='' && etat_civil!=''){
		if(confirm("Etes-vous sûr de vouloir enregistrer?")){
			$.ajax ({
				url:"./modele/connexion.php",
				type:"POST",
				data:{'ent':'Ajouter_rece', "nompatient": nompatient, "date_naiss": date_naiss, "adresse": adresse, "paiement": paiement, "telephone": telephone, "etat_civil": etat_civil},
				error:function (data){console.log(data)},
				success: function (data){
					var data2=JSON.parse(data);
					if(data2[0] != 0){
					
						
						$('#nompatient').val('');
						$('#date_naiss').val('');
						$('#adresse').val('');
						$('#paiement').val('');
						$('#telephone').val('');
						$('#etat_civil').val('');	
						$('#nompatient').focus();
						receptionlist();			
					   
					}
				}
			});
		}else{

		}
		
	}
	else{
		alert('Remplissez tous les champs svp');

	}
}
function Ajouter_consultation(){
	
	var date_arriver=$('#date_arriver').val();
	var date_regle=$('#date_regle').val();
	var poid =$('#poid').val();
	
	alert(date_arriver+'ok'+date_regle+" "+poid)
	
	if(date_arriver !='' && date_regle !='' && poid!='' ){
		if(confirm('êtes-vous sûr de vouloir confirmer')){
			$.ajax ({
				url:"./modele/connexion.php",
				type:"POST",
				data:{'ent':'Ajouter_consultation', "date_arriver": date_arriver, "date_regle": date_regle, "poid": poid, },
				error:function (data){console.log(data)},
				success: function (data){
					var data2=JSON.parse(data);
					if(data2[0] != 0){
					
						
						$('#date_arriver').val('');
						$('#date_regle').val('');
						$('#poid').val('');
						
						consultationlist();
							
					   
					}
				}
			});
		}
		else{
			alert('Remplissez tous les champs svp');
	
		}
	}

		}
		
function Ajouter_medecin(){
	
	var nommed=$('#nommed').val();
	var idfich =$('#idfich').val();
	var telephone =$('#telephone').val();
	var sexe =$('#sexe').val();
	
	
	
	if(nommed !='' && idfich !='' && telephone!='' && sexe !='' ){
		if(confirm('êtes-vous sûr de vouloir confirmer')){
			$.ajax ({
				url:"./modele/connexion.php",
				type:"POST",
				data:{'ent':'Ajouter_medecin', "nommed": nommed, "idfich": idfich, "telephone": telephone, "sexe": sexe,},
				error:function (data){console.log(data)},
				success: function (data){
					var data2=JSON.parse(data);
					if(data2[0] != 0){
					
						
						$('#nommed').val('');
						$('#idfich').val('');
						$('#telephone').val('');
						$('#sexe').val('');

						medecinlist();
								
					   
					}
				}
			});
		}
		else{
			alert('Remplissez tous les champs svp');
	
		}
		}

}
function Ajouter_rendez_vous(){
	
	var idmed=$('#idmed').val();
	var idfich =$('#idfich').val();
	var date_arriver =$('#date_arriver').val();
	var date_rendez_vous =$('#date_rendez_vous').val();

	
	alert(idmed+''+idfich+'' +date_arriver+''+date_rendez_vous+'');
	
	
	
	if(idmed !='' && idfich!='' && date_arriver!='' && date_rendez_vous!='' ){
		$.ajax ({
			url:"./modele/connexion.php",
			type:"POST",
			data:{'ent':'Ajouter_rendez_vous', "idmed": idmed, "idfich": idfich, "date_arriver": date_arriver, "date_rendez_vous": date_rendez_vous, },
			error:function (data){console.log(data)},
			success: function (data){
				var data2=JSON.parse(data);
				if(data2[0] != 0){
				
					
					$('#idmed').val('');
					$('#idfich').val('');
					$('#date_arriver').val('');
					$('#date_rendez_vous').val('');
					 rendez_vouslist();		
				   
				}
			}
		});
	}
	else{
		alert('Remplissez tous les champs svp');

	}
}
function receptionlist(){
	$.ajax ({
		url:"./modele/connexion.php",
		type:"POST",
		data:{'ent':'receptionlist' },
		error:function (data){console.log(data)},
		success: function (data){
			var result= $.parseJSON(data);
			var i = 0;
            var string='';
                    $.each( result, function( key, value ) { 
							i+=1;							
							string += '<tr>'+ 
                            
                                '<td>'+ value['nompatient']+'</td>'+
                                '<td>'+value['date_nais']+'</td>'+
                                '<td>'+value['adresse']+'</td>'+
                                '<td>'+value['paiement']+'</td>'+
                                '<td>'+value['telephone']+'</td>'+
                                '<td>'+value['etat_civil']+'</td>'+
                                
                               
                                
                           '</tr>';			
              	 
					   						
				  });
      
        $("#receptionlist").empty().append(string);	
		}
	});

}
function consultationlist(){
	$.ajax ({
		url:"./modele/connexion.php",
		type:"POST",
		data:{'ent':'consultationlist' },
		error:function (data){console.log(data)},
		success: function (data){
			var result= $.parseJSON(data);
			var i = 0;
            var string='';
                    $.each( result, function( key, value ) { 
							i+=1;							
							string += '<tr>'+ 
                            
                                '<td>'+ value['date_arriver']+'</td>'+
                                '<td>'+value['date_regle']+'</td>'+
                                '<td>'+value['poid']+'</td>'+
                             
                                
                           '</tr>';			
              	 
					   						
				  });
      
        $("#consultationlist").empty().append(string);	
		}
	});

}
function medecinlist(){
	$.ajax ({
		url:"./modele/connexion.php",
		type:"POST",
		data:{'ent':'medecinlist' },
		error:function (data){console.log(data)},
		success: function (data){
			var result= $.parseJSON(data);
			var i = 0;
            var string='';
                    $.each( result, function( key, value ) { 
							i+=1;							
							string += '<tr>'+ 
                            
                                '<td>'+ value['nommed']+'</td>'+
                                '<td>'+value['idfich']+'</td>'+
                                '<td>'+value['telephone']+'</td>'+
                                '<td>'+value['sexe']+'</td>'+
                             
                                
                               
                                
                           '</tr>';			
              	 
					   						
				  });
      
        $("#medecinlist").empty().append(string);	
		}
	});

}
function  rendez_vouslist(){
	$.ajax ({
		url:"./modele/connexion.php",
		type:"POST",
		data:{'ent':'rendez_vouslist' },
		error:function (data){console.log(data)},
		success: function (data){
			var result= $.parseJSON(data);
			var i = 0;
            var string='';
                    $.each( result, function( key, value ) { 
							i+=1;							
							string += '<tr>'+ 
                            
                                '<td>'+ value['idmed']+'</td>'+
                                '<td>'+value['idfich']+'</td>'+
                                '<td>'+value['date_arriver']+'</td>'+
                                '<td>'+value['date_rendez_vous']+'</td>'+
                             
                                
                               
                                
                           '</tr>';			
              	 
					   						
				  });
      
        $("#rendez_vouslist").empty().append(string);	
		}
	});

}
function recherchermedecin(){
	var id=$('#recherche').val();
	//var id = elm;
	if(id !=''){
		alert("c'est bon");
		$.ajax ({
			url:"./modele/connexion.php",
			type:"POST",
			data:{'ent':'recherchermedecin', "id": id,},
			error:function (data){console.log(data)},
			success: function (data){
				var data2=JSON.parse(data);
				if(data2[0] != 0){
					alert('OK');
					$('#id').val(data2[1]);
					$('#nom').val(data2[2]);
					$('#sexe').val(data2[3]);
					$('#telephone').val(data2[4]);		
				}
			}
		});
	}
	else{
		alert('Remplissez le champs de recherche svp');
	}
}
function editermedecin(){
	var id=$('#recherche').val();
	var nom = $('#nom').val();
	var sexe = $('#sexe').val();
	var telephone = $('#telephone').val();
	//var id = elm;
	alert(id);
	if(id !=''){
		$.ajax ({
			url:"./modele/connexion.php",
			type:"POST",
			data:{'ent':'editermedecin', "id": id, "nom": nom, "sexe": sexe, "telephone": telephone},
			error:function (data){console.log(data)},
			success: function (data){
				var data2=JSON.parse(data);
				if(data2[0] != 0){
					$('#id').val('');
					$('#nom').val('');
					$('#sexe').val('');
					$('#telephone').val('');
					alert('modification effectuée avec succès');		
				}
			}
		});
	}
	else{
		alert('Remplissez le champs de recherche svp');
	}
}
function supprimermedecin(){
	var id=$('#recherche').val();
	//var id = elm;
	alert(id);
	if(id !=''){
		if(confirm('voulez vous vraiment supprimer?')){
		$.ajax ({
			url:"./modele/connexion.php",
			type:"POST",
			data:{'ent':'supprimermedecin', "id": id},
			error:function (data){console.log(data)},
			success: function (data){
				var data2=JSON.parse(data);
				if(data2[0] != 0){
					
					$('#id').val('');
					$('#nom').val('');
					$('#sexe').val('');
					$('#telephone').val('');		
					alert('suprression effectuée avec succès');
				}
			}
		});
		}
	}
	else{
		alert('Remplissez le champs de recherche svp');
	}
}

function Ajouter_image(){
	var fd = new FormData(); 			
	var nom=$('#nom').val();
	var prix =$('#prix').val();
	var photo = $('#photo')[0].files;
	var fichier_a_charger = photo[0];
	if(nom !='' && prix !='' && $('#photo').val() !=""){
		if (confirm("Etes vous sûr d'ajouter la maison dans le fil d'actualité ?")) {
			fd.append("ent","Ajouter_image");
			fd.append('FichierEnvoye', fichier_a_charger);
			fd.append("nom",nom);
			fd.append("prix", prix);
			
			$.ajax ({
				url:"./modele/connexion.php", 			
			   type:'post',
			   data:fd,            
	    contentType:false,
	    processData:false,
		      error: function(data) {
				console.log(data);
			},
			success: function (data){
					var data2=JSON.parse(data);
					if(data2[0] != 0){
						$('#nom').val('');
						$('#prix').val('');
						$('#photo').val();
						alert("Ajouter avec succès");
						$('#nom').focus();
						Ajouter_imagelist();	
					}
				}
			});
		}else{
		}
	}
	else{
		alert('Remplissez tous les champs svp');

	}
}
function Ajouter_image(){
	var fd = new FormData(); 			
	var nom=$('#nom').val();
	var prix =$('#prix').val();
	var photo = $('#photo')[0].files;
	var fichier_a_charger = photo[0];
	if(nom !='' && prix !='' && $('#photo').val() !=""){
		if (confirm("Etes vous sûr d'ajouter la maison dans le fil d'actualité ?")) {
			fd.append("ent","Ajouter_image");
			fd.append('FichierEnvoye', fichier_a_charger);
			fd.append("nom",nom);
			fd.append("prix", prix);
			
			$.ajax ({
				url:"./modele/connexion.php", 			
			   type:'post',
			   data:fd,            
	    contentType:false,
	    processData:false,
		      error: function(data) {
				console.log(data);
			},
			success: function (data){
					var data2=JSON.parse(data);
					if(data2[0] != 0){
						$('#nom').val('');
						$('#prix').val('');
						$('#photo').val();
						alert("Ajouter avec succès");
						$('#nom').focus();
						Ajouter_imagelist();	
					}
				}
			});
		}else{
		}
	}
	else{
		alert('Remplissez tous les champs svp');

	}
}
function Ajouter_imagelist(){
	$.ajax ({
		url:"./modele/connexion.php",
		type:"POST",
		data:{'ent':'rendez_vouslist' },
		error:function (data){console.log(data)},
		success: function (data){
			var result= $.parseJSON(data);
			var i = 0;
            var string='';
                    $.each( result, function( key, value ) { 
							i+=1;							
							string += '<tr>'+ 
                            
                                '<td>'+ value['nom']+'</td>'+
                                '<td>'+value['prix']+'</td>'+
                                '<td>'+value['photo']+'</td>'+
                             
                                
                               
                                
                           '</tr>';			
              	 
					   						
				  });
      
        $("#rendez_vouslist").empty().append(string);	
		}
	});

}