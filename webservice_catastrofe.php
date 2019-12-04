<?php
	header("Content-Type: Application/json");
	include("conexao.php");

	$p = $_POST["pagina"];
	
	$sql = "SELECT * FROM catastrofe";
	
	if(isset($_POST["nome_filtro"])){
		$nome = $_POST["nome_filtro"];
		$sql .= " WHERE nome LIKE '%$nome%'";
	}
						
	$sql .= " ORDER BY nome LIMIT $p,5"; //O segundo número é sempre a quantidade que vou exibir e o primeiro é a partir dele que vou exibir
	$resultado = mysqli_query($conexao,$sql) or die ("Erro." . mysqli_error($conexao));
	
	while($linha=mysqli_fetch_assoc($resultado)){
		$matriz[] = $linha;
	}
	if(!isset($matriz)){
		 $matriz = array();
	 }
	 //echo $consulta;
	echo json_encode($matriz);
	
?>