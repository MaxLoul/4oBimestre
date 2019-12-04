<?php
	include("conexao.php");
	$pg_catastrofe = 1;
	
	$sql = "SELECT COUNT(*) AS qtd FROM catastrofe";
	
	//Verificando o Filtro e concatenando se não tiver vazio com a consulta
	if(!empty($_POST)){
		$nome = $_POST["nome_filtro"];
		$sql .=" WHERE nome LIKE '%$nome%'";
	}
	
	$resultado = mysqli_query($conexao,$sql) or die ("Erro." . mysqli_error($conexao));
	$linha = mysqli_fetch_assoc($resultado);
	$contador = $linha["qtd"];
	//echo $contador;
	echo "<br/>";
	
	$botao = $contador/5;
	//echo $botao;
	
	$cor=" bg-info";
	
	while($botao > 0)
	{
		if($pg_catastrofe>1){
			$cor="";
		}
		echo"<button class='btn_pagina $cor' value='$pg_catastrofe'>$pg_catastrofe</button> ";
		$botao--;
		$pg_catastrofe++;
	}
?>