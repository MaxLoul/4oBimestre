<!DOCTYPE html>
<html>
	<head>
		<?php include("menu.php"); include("verificacao.php"); ?>
		<meta charset = "utf-8" />
		<script src = "jquery-3.4.1.min.js"> </script>
		<script src="form_doacao.js"></script>

	</head>
	<body>
		<?php
			// buscando a consulta e pegando o resultado
			include("conexao.php");
		?>
		<div class = "container text-center mt-5">
		<legend>Inserindo Doação</legend>
		<form method = "POST" action = "insere_doacao.php">
		
		<div class="form-row">
			<div class="form-group col-md-6"> 
				<input type = "text" class="form-control" name = "doador" placeholder="Doador..."/>				
			</div>
			
			<div class="form-group col-md-6">
				<select name = "produto_doado" class="form-control" placeholder="Selecione um produto...">
					<option> Dinheiro </option>
					<option> Produto de Higiene</option>
					<option> Comida </option>
				</select>
			</div>
	
			<div class="form-group col-md-12">
				<select name = "id_catastrofe" class="form-control" placeholder="Selecione uma catastrofe...">
					<option>Selecione uma catastrofe</option>
					<?php
						include("conexao.php");
						
						$consulta = "SELECT * FROM catastrofe";
						
						$resultado = mysqli_query($conexao,$consulta);
						
						while($linha = mysqli_fetch_assoc($resultado)){
							echo '<option value = "'.$linha["id_catastrofe"].'">'.$linha["nome"].'</option>';
						}
					?>
				</select>
			</div>
			<div class="form-group col-md-12">
				<input type = "button" class="btn btn-primary btn_cadastrar" id = "btn_cadastrar" value = "Enviar"/>
			</div>
			
			<div class = "form-group col-md-12">	
				<input type = "text" name = "nome_filtro" placeholder = "Filtrar por nome..."/>
			</div>
			
			<div class="form-group col-md-12">
				<button type = "button" class="btn btn-primary" id = "filtrar">Filtrar</button>
			</div>
		
			
	
		</form>
		</div>
		</div>
	


		<div class="container">
		<table class="table table-striped table-bordered table-hover mt-5"> 
			<thead class = "bg-info">
				<tr>
					<th>Doador</th>
					<th>Produto doado</th>
					<th>Catastrofe</th>
					<th>Ação</th>
				</tr>
			</thead>
			<tbody id="tbody">
				
			</tbody>
		</table>
		
		<div id = "paginacao">
			<?php
			include("paginacao_doacao.php");
			?>
		</div>
		
	</div>
</body>
</html>
