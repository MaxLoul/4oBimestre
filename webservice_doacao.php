<?php
	header("Content-Type: Application/json");
	include("conexao.php");

	$p = $_POST["pagina"];
	
	$consulta = "SELECT * FROM doacao 
						INNER JOIN catastrofe 
							ON doacao.cod_catastrofe=catastrofe.id_catastrofe";
	
	
	if(isset($_POST["nome_filtro"])){
		$nome = $_POST["nome_filtro"];
		$consulta .= " WHERE doador LIKE '%$nome%' ";
	}

	$consulta .= " ORDER BY doador LIMIT $p,5"; //O segundo número é sempre a quantidade que vou exibir e o primeiro é a partir dele que vou exibir
	$resultado = mysqli_query($conexao,$consulta);
	
	
	while($linha=mysqli_fetch_assoc($resultado)){
		$matriz[] = $linha;
	}
	 //echo $consulta;
	 if(!isset($matriz)){
		 $matriz = array();
	 }
		echo json_encode($matriz);
	
?>