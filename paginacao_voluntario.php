<?php
	include("conexao.php");
	$pg_voluntario = 1;
	$consulta = "SELECT COUNT(*) as qtd FROM voluntario";
	
	//Verificando o Filtro e concatenando se não tiver vazio com a consulta
	if(!empty($_POST)){
		$nome = $_POST["nome_filtro"];
		$consulta .=" WHERE nome_voluntario LIKE '%$nome%'";
	}
	
	$resultado = mysqli_query($conexao,$consulta) or die(mysqli_error($conexao));
	$linha = mysqli_fetch_assoc($resultado);
	$contador = $linha["qtd"];
	echo "<br/>";
	
	$botao = $contador/5;
	//echo $botao;
	
	$cor=" bg-info";
	
	while($botao > 0)
	{
		
		if($pg_voluntario>1){
			$cor="";
		}
		echo"<button class='btn_pagina $cor' value='$pg_voluntario'>$pg_voluntario</button> ";
		$botao--;
		$pg_voluntario++;
	}
?>