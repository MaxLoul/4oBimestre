<?php 
	include("conexao.php");
	
	$nome_voluntario = $_POST["nome_voluntario"];
	$data_partida = $_POST["data_partida"];
	$data_retorno = $_POST["data_retorno"];
	$cod_catastrofe = $_POST["id_catastrofe"];
	
	$insercao = 
		"INSERT INTO voluntario (id_voluntario, nome_voluntario, data_partida, data_retorno,cod_catastrofe)
				VALUE (null, '$nome_voluntario', '$data_partida', '$data_retorno','$cod_catastrofe')";
				
	// mysqli_error($conexao)
	mysqli_query($conexao,$insercao) or die("0");
	
	echo "1";	
	
?>