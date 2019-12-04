<?php
	include("conexao.php");
	
	$id = $_POST["id"];

	$remocao = "DELETE FROM vitima WHERE id_vitima ='$id'";

	mysqli_query($conexao,$remocao)
			or die("0");

	echo "1";
?>