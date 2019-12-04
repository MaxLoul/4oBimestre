<?php
	include("conexao.php");
	$pg = 1;
	$consulta = "SELECT COUNT(*) AS qtd FROM doacao";
	
	//Verificando o Filtro e concatenando se não tiver vazio com a consulta
	if(!empty($_POST)){
		$nome = $_POST["nome_filtro"];
		$consulta .=" WHERE doador LIKE '%$nome%'";
	}

	$resultado = mysqli_query($conexao,$consulta) or die ("Erro." . mysqli_error($conexao));
	$linha = mysqli_fetch_assoc($resultado);
	$contador = $linha["qtd"];
	echo "<br/>";
	
	$botao = $contador/5;
	//echo $botao;
	
	$cor=" bg-info";
	
	while($botao > 0)
	{
		
		if($pg>1){
			$cor="";
		}
		echo"<button class='btn_pagina $cor' value='$pg'>$pg</button> ";
		$botao--;
		$pg++;
	}
?>