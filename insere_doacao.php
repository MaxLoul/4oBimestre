<?php 
	include("conexao.php");
	
	$produto_doado = $_POST["produto_doado"];
	$doador = $_POST["doador"];
	$cod_catastrofe = $_POST["id_catastrofe"];
	
	$insercao = 
		"INSERT INTO doacao (produto_doado, doador, cod_catastrofe)
				VALUE ('$produto_doado', '$doador','$cod_catastrofe')";
				
	//mysqli_error($conexao);
	mysqli_query($conexao,$insercao) or die("0");
	
	echo "1";	
		
?>