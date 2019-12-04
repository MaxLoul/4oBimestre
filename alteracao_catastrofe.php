<?php
	include("conexao.php");
	$id = $_POST["id"];
	$nome = $_POST["nome"];
	$local = $_POST["local"];
	$morte = $_POST["morte"];
	$sobrevivente = $_POST["sobrevivente"];
	$data_ocorrida = $_POST["data_ocorrida"];
	$area_abrangente = $_POST["area_abrangente"];
	
	$update = "UPDATE catastrofe SET 
		nome = '$nome',
		local = '$local',
		morte = '$morte',
		sobrevivente = '$sobrevivente',
		data_ocorrida = '$data_ocorrida',
		area_abrangente = '$area_abrangente'
		WHERE id_catastrofe = $id";
		
	mysqli_query($conexao,$update)
			or die(mysql_error($conexao));
			
			
	echo "1";


?> 