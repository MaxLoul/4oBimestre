<?php session_start();?>	
<!DOCTYPE html>
<html>
	<head>
		<title> Exercício Bootstrap </title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,
		initial-scale=1">
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<script src="js/jquery-3.4.1.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
	</head>
	<body>
		
		<div class="container-fluid text-center bg-info mt-16px text-warning">
			<?php
				if(isset($_SESSION["autorizado"]))
				{
					echo '<div class = "row">
						<div class = "col-2"><a href = "form_catastrofe.php" class = "text-warning">Inserir Catastrofe </a></div>
						<div class = "col-2"><a href = "form_doacao.php" class = "text-warning">Inserir Doações  </a></div>
						<ion-icon name="sad"></ion-icon> <div class = "col-2"><a href = "form_vitima.php" class = "text-warning">Inserir Vítimas </a></div>
						<div class = "col-2"><a href = "form_voluntario.php" class = "text-warning">Inserir Voluntários </a></div>
						<div class = "col-2"><a href = "logout.php" class = "text-warning">Logout </a></div>
						<div class = "col-2"><a href = "form_login.php" class = "text-warning">Login </a></div>
						<hr>
					</div>';
				}
				else
				{
					echo '<div class = "row">
						<div class = "col-6"><a href = "form_login.php" class = "text-warning">Login </a></div>
						<hr>
					</div>';
				}
			?>
		</div>
		
		