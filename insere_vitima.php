<?php 
	include("conexao.php");
	
	$nome_vitima = $_POST["nome_vitima"];
	$idade = $_POST["idade"];
	$cod_catastrofe = $_POST["id_catastrofe"];
	
	$insercao = 
		"INSERT INTO vitima (nome_vitima, idade, cod_catastrofe)
				VALUE ('$nome_vitima', '$idade','$cod_catastrofe')";
				
	// mysqli_error($conexao)
	mysqli_query($conexao,$insercao) or die("0");
	
	echo "1";	
		
?>