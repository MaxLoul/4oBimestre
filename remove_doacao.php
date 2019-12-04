<?php
	include("conexao.php");
	
	$id = $_POST["id"];

	$remocao = "DELETE FROM doacao WHERE id_doacao ='$id'";

	mysqli_query($conexao,$remocao)
			or die("0");

	echo "1";
?>