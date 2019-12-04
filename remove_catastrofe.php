<?php
	include("conexao.php");
	
	$id = $_POST["id"];

	$remocao = "DELETE FROM catastrofe WHERE id_catastrofe ='$id'";

	mysqli_query($conexao,$remocao)
			or die("0");

	echo "1";
?>