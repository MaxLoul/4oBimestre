<?php
	include("conexao.php");
	include("menu.php");
	
	$usuario = $_POST["usuario"];
	$senha = $_POST["senha"];

	$consulta = "SELECT * FROM usuario WHERE email = '$usuario' AND senha = '$senha'";
	$resultado = mysqli_query($conexao,$consulta) 
	or die ("Erro ao consultar a lista de usuarios.");
	
	if(mysqli_num_rows($resultado)==1)
	{
		session_start();
		$linha = mysqli_fetch_assoc($resultado);
		$_SESSION["autorizado"] = $linha["id_usuario"];
		header("location: form_catastrofe.php");
	}
	else
	{
		header("location: form_login.php?erro=1");
	}
?>