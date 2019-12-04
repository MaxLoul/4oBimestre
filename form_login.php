		<?php
			include("menu.php");
		?>
		<div class = "container text-center mt-5">
		<legend>Login</legend>
		<form action = "validacao.php" method = "POST">
			<div class="form-row">
				<div class="form-group col-md-6">
					<input type = "email" class="form-control" name="usuario" placeholder="Usuario..." />
				</div>
				<div class="form-group col-md-6">
					<input type = "password" class="form-control" name="senha" placeholder="Senha..." />
				</div>
				
				<div class="form-group col-md-12">
					<input type = "submit" class="btn btn-primary" id = "btn_cadastrar" value = "Enviar"/>
				</div>
				
				<?php 
					if(isset($_GET["erro"])) //se tiver setado o erro da pagina validação ele volta para o login mostrando essa mensagem.
					{
						echo "<h3> Usuario e/ou senha invalida! </h3>";
					}
				?>
				
			</div>
		</form>
		</div>
	</body>
</html>