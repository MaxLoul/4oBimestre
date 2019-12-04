<?php
	include("conexao.php");
	$id = $_POST["id"];
	$nome_vitima = $_POST["nome_vitima"];
	$idade = $_POST["idade"];
	$catastrofe = $_POST["catastrofe"];
	
	$update = "UPDATE vitima SET 
		nome_vitima = '$nome_vitima',
		idade = '$idade',
		cod_catastrofe = '$catastrofe'
		WHERE id_vitima = $id";
		
	mysqli_query($conexao,$update)
			or die(mysqli_error($conexao));
			
			
	echo "1";


?> 