<?php
	include("conexao.php");
	
	$id = $_GET["id"];

	$remocao = "DELETE FROM voluntario WHERE id_voluntario ='$id'";

	mysqli_query($conexao,$remocao)
			or die("0");

	echo "1";
?>