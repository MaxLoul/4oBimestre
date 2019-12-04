<?php 
	//sleep(5);
	include("conexao.php");
	
	$nome = $_POST["nome"];
	$local = $_POST["local"];
	$morte = $_POST["morte"];
	$sobrevivente = $_POST["sobrevivente"];
	$descricao = $_POST["descricao"];
	$data_ocorrida = $_POST["data_ocorrida"];
	$area_abrangente = $_POST["area_abrangente"];
	
	
	$insercao = 
		"INSERT INTO catastrofe (id_catastrofe, nome, local, morte, sobrevivente, descricao, data_ocorrida, area_abrangente)
				VALUE (null, '$nome', '$local', '$morte', '$sobrevivente', '$descricao', '$data_ocorrida', '$area_abrangente')";
				
	// mysqli_error($conexao)
	mysqli_query($conexao,$insercao) or die("0");
	
	echo "1";	
?>