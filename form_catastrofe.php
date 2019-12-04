<!DOCTYPE html>
<html>
	<head>
		<?php include("menu.php"); 
			  include("verificacao.php");
		?>
		<meta charset = "utf-8" />
		<script src="jquery-3.4.1.min.js"></script>
		<script src="form_catastrofe.js"></script>
	</head>
	<body>
		<?php
			// buscando a consulta e pegando o resultado
			include("conexao.php");
			$consulta = "SELECT * FROM catastrofe";
			$resultado = mysqli_query($conexao, $consulta) 
			or die("Erro. Não foi possivel consultar a lista de catastrofe no sistema");
		?>
	<div class = "container text-center mt-5">
		<legend>Inserindo Catastrofe</legend>
		<form method = "POST" action = "insere_catastrofe.php">
			<div class="form-row">
				<div class="form-group col-md-6">
					<input type = "text" class="form-control" name = "nome" placeholder="nome..."/>
				</div>
				<div class="form-group col-md-6">
					<input type = "date" class="form-control" name = "data_ocorrida" placeholder="data que ocorreu..." />
				</div>
				<div class="form-group col-md-6">
					<input type = "text" class="form-control" name = "local" placeholder="local..."/>   
				</div>
				<div class="form-group col-md-6">
					<input type = "text" class="form-control" name = "descricao" placeholder="o que houve..."  />    
				</div>
				
				<div class="form-group col-md-4">
					<input type = "text" class="form-control" name = "morte" placeholder="numero de mortes..." />
				</div>
				<div class="form-group col-md-4">
					<input type = "text" class="form-control" name = "area_abrangente" placeholder="local(s) afetados..."  />
				</div>
				<div class="form-group col-md-4">
					<input type = "text" class="form-control" name = "sobrevivente" placeholder="numero de sobreviventes..."  /> 
				</div>
				<div class="form-group col-md-12">
					<input type = "button" class="btn btn-primary btn_cadastrar" value = "Enviar"/>
				</div>
				<div class = "form-group col-md-12">	
					<input type = "text" name = "nome_filtro" placeholder = "Filtrar por nome..."/>
				</div>
				<div class="form-group col-md-12">
					<button type = "button" class="btn btn-primary" id = "filtrar">Filtrar</button>
				</div>
			</div>
		</form>
	</div>

	<div class="container">
	<table class="table table-striped table-bordered table-hover mt-5"> 
		<thead class = "bg-info">
			<tr>
						<th>Nome</th>
						<th>Local</th>
						<th>Morte</th>
						<th>Sobrevivente</th>
						<th>Descrição</th>
						<th>Data ocorrida</th>
						<th>Area abrangente</th>
						<th>Ação</th>
			</tr>
		</thead>
		<tbody id="tbody">
			
		</tbody>
	</table>
		<div id = "paginacao">
			<?php
			include("paginacao_catastrofe.php");
			?>
		</div>
	</div>
</body>
</html>