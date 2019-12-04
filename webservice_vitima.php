<?php
	header("Content-Type: Application/json");
	include("conexao.php");

	$p = $_POST["pagina"];
	
	$consulta = "SELECT * FROM vitima 
						INNER JOIN catastrofe 
							ON vitima.cod_catastrofe=catastrofe.id_catastrofe";

	if(isset($_POST["nome_filtro"])){
		$nome = $_POST["nome_filtro"];
		$consulta .= " WHERE nome_vitima LIKE '%$nome%'";
	}
	
	$consulta .= " ORDER BY nome_vitima LIMIT $p,5"; //O segundo número é sempre a quantidade que vou exibir e o primeiro é a partir dele que vou exibir
	$resultado = mysqli_query($conexao,$consulta);
	//or die($consulta);
	while($linha=mysqli_fetch_assoc($resultado)){
		$matriz[] = $linha;
	}
	if(!isset($matriz)){
		 $matriz = array();
	 }
	 //echo $consulta;
	echo json_encode($matriz);
?>