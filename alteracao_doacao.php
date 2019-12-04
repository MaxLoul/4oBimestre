<?php
	include("conexao.php");
	$id = $_POST["id"];
	$doador = $_POST["doador"];
	$produto_doado = $_POST["produto_doado"];
	$catastrofe = $_POST["catastrofe"];
	
	$update = "UPDATE doacao SET 
		doador = '$doador',
		produto_doado = '$produto_doado',
		cod_catastrofe = '$catastrofe'
		WHERE id_doacao = $id";
		
	mysqli_query($conexao,$update)
			or die(mysqli_error($conexao));
			
			
	echo "1";


?> 