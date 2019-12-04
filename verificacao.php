<?php

	if(!isset($_SESSION["autorizado"]))
	{
		echo "<div class = 'autentificacao'>";
		echo "<h4> Você não está autorizado a usar esta página. </h4>";
		echo "Faca <a href = 'form_login.php'> Login </a>";
		die(); // Esse comando faz parar o programa, ou seja não exibe mais nada!
		echo "</div></body></html>";
	}
?>