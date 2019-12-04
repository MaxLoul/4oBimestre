<?php
	//local no qual o banco de dados ser� instalado
	$local = "localhost:3307";
	$usuario = "root";
	$senha = "usbw";
	$bd = "catastrofe";
	
	$conexao = mysqli_connect($local,$usuario,$senha,$bd) or die("ERRO");
?>