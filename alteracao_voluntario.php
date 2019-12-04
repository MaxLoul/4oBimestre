<?php
	include("conexao.php");
	$id = $_POST["id"];
	$nome_voluntario = $_POST["nome_voluntario"];
	$data_partida = $_POST["data_partida"];
	$data_retorno = $_POST["data_retorno"];
	$catastrofe = $_POST["catastrofe"];
	
	$update = "UPDATE voluntario SET 
		nome_voluntario = '$nome_voluntario',
		data_partida = '$data_partida',
		data_retorno = '$data_retorno',
		cod_catastrofe = '$catastrofe'
		WHERE id_voluntario = $id";
		
	mysqli_query($conexao,$update)
			or die(mysqli_error($conexao));
			
			
	echo "1";


?> 