$(document).ready(function(){
	$(document).on("click", '.btn_excluir', function(){
		id_voluntario = $(this).attr("valor");
		linha = $(this).closest("tr");
		$.ajax({
			url: "remove_voluntario.php",
			type: "GET", 
			data:{id: id_voluntario},

			beforeSend: function(){
				$("#resultado").html("Excluindo voluntário...");
				$("#resultado").css("color", "blue");
			},

			success: function(data){
				if(data==1){
					$("#resultado").html("Voluntário excluido com sucesso!");
					$("#resultado").css("color", "green");
					
					linha.remove();

					qtd_linha = $('#tbody tr').length;
					qtd_coluna = $('#tbody td').length;

					if(qtd_linha==0 && qtd_coluna==0){
						linha="<tr><td colspan='6'>Não há voluntários cadastrados!</td></tr>";
						$("#tbody").append(linha);
					}
				}else{
					$("#resultado").html("Erro: Voluntário não pode ser excluído.");
					$("#resultado").css("color", "red");
				}
			},

			error: function(e){
				$("#resultado").html("Erro: Sistema de remoção insdisponível.");
				$("#resultado").css("color", "red");
			}
		});
	});
});