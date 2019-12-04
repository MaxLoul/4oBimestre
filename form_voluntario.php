<!DOCTYPE html>
<html>
	<head>
		<?php include("menu.php"); include("verificacao.php"); ?>
		<meta charset = "utf-8" />
		<script src = "jquery-3.4.1.min.js"> </script>
		<script src="form_voluntario.js"></script>
	</head>
	<body>
		<?php
			include("conexao.php");
		?>
	<div class = "container text-center mt-5">
		<legend>Inserindo Volunt√°rios</legend>
		<form method = "POST" action = "insere_voluntario.php">
			<div class="form-row">
	

				<br /><div class="form-group col-md-6">
					<input type = "text" class="form-control" name = "nome_voluntario" placeholder="nome..."  /> 
				</div>
				<div class="form-group col-md-6">
					<input type = "date" class="form-control" name = "data_partida" placeholder="Data partida..."  /> 
					<label for="data_partida" style="margin-left:-430px;">Data de partida</label>
				</div>
				
				<div class="form-group col-md-6">
					<input type = "date" class="form-control" name = "data_retorno" placeholder="Data retorno..."  /> 
					<label for="data_retorno" style="margin-left:-430px;">Data de Retorno</label>
				</div>
		
	
				<div class="form-group col-md-12">
					<select name = "id_catastrofe" class="form-control">
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
					<input type = "button" class="btn btn-info btn_cadastrar" id = "btn_cadastrar" value = "Enviar"/>
				</div>
				
				<div class = "col-md-12">	
					<input type = "text" class = "form-control" name = "nome_filtro" placeholder = "Filtrar por nome..."/>
					</br>
					<button type = "button" class="btn btn-info" id = "filtrar">Filtrar</button>
				</div>
			</div>
		</form>
	</div>
	
	<div class="container">
		<table class="table table-striped table-bordered table-hover mt-5"> 
			<thead class = "bg-info">
				<tr>
					<th>Nome</th>
					<th>Data partida</th>
					<th>Data retorno</th>
					<th>Catastrofe</th>
					<th>AÁao</th>
				</tr>
			</thead>
			<tbody id="tbody">
				
			</tbody>
		</table>
		<div id = "paginacao">
			<?php
			include("paginacao_voluntario.php");
			?>
		</div>
	</div>
</body>
</html>