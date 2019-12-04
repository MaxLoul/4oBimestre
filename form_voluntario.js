$(document).ready(function(){
	pg_voluntario = 0;
		$(".btn_pagina").click(function(){//quando eu clico em algum botão da página
			$(".btn_pagina").removeClass("bg-info");
			$(this).addClass("bg-info");
			
			valor_botao = $(this).val(); //pego o valor do botaõ
			p = (valor_botao - 1)*5;// faço a conta pra pegar o bloco que vou querer
			$("#tbody").html("");//limpo para não acumular as noticias
			carrega_voluntario(p);//carrego a função para pegar noticias novas
		});
			
		function carrega_voluntario(pg_voluntario){
			
			$.ajax({
				url: "webservice_voluntario.php",
				type: "POST",
				data: {pagina: pg_voluntario,
						nome_filtro: $("input[name='nome_filtro']").val()
				},
				success: function(matriz_voluntario){
					$("#tbody").html("");
					console.log(matriz_voluntario);
						for(i=0;i<matriz_voluntario.length;i++){
							voluntario = "<tr class = 'tbody'>";
							voluntario += "<td class = 'nome_voluntario'>" + matriz_voluntario[i].nome_voluntario + "</td>";
							voluntario += "<td class = 'data_partida'>" + matriz_voluntario[i].data_partida + "</td>";
							voluntario += "<td class = 'data_retorno'>" + matriz_voluntario[i].data_retorno + "</td>";
							voluntario += "<td class = 'catastrofe'>" + matriz_voluntario[i].nome + "</td>";
							voluntario += "<td><button type='button' class = 'alterar'  value='" + matriz_voluntario[i].id_voluntario + "'>Alterar</button> <button type='button' class = 'btn_excluir'  value='" + matriz_voluntario[i].id_voluntario + "'>Remover</button></td>";
							voluntario += "</tr>";
									
							$("#tbody").append(voluntario);
						}//fechando o for
						
						if(matriz_voluntario.length==0){
						linha="<tr><td colspan='5'>Não há voluntários cadastrados!</td></tr>";
						$("#tbody").append(linha);
					}
				}//fechando o sucesso
			});//fechando o ajax
		}//término da função carrega_noticias
			carrega_voluntario(pg_voluntario);
			
	$(document).on("click","#btn_cadastrar",function(){

		$.ajax({ // o ajax faz uma requisição assincrona. Ele pega os dados leva pro insere e reorna na mesma pagina do formulário.
				// Diferente da requisição sincrona que pega os dados leva para a pagina inere e la mesmo retorna a informção.
			url: "insere_voluntario.php", // vai solicitar o recebe_post.
			type: "POST", //metodo de envio.
			data: {id_voluntario:$("input[name='id_voluntario']").val(),
				   nome_voluntario:$("input[name='nome_voluntario']").val(),
				   data_partida:$("input[name='data_partida']").val(),
				   data_retorno:$("input[name='data_retorno']").val(),
				   id_catastrofe:$("select[name='id_catastrofe']").val()
				}, // data = dados, ele manda os dados que deseja pelo metodo post para a recebe_post.


				beforeSend: function(){ // antes de enviar 
						$("#resultado").html("Carregando..."); // mostra uma mensagem.
						$("#resultado").css("color", "yellow");
				},

				success: function(data){ // se a requisição tiver sucesso ela mostra os dados na requisição "resultado" que eu pedi.
					if(data==1){
						$("#resultado").html("Voluntário inserido com sucesso!"); 
						$("#resultado").css("color", "green");

						//Limpando os input's
						$("input[name='id_voluntario']").val("");
						$("input[name='nome_voluntario']").val("");
						$("input[name='data_partida']").val("");
						$("input[name='data_retorno']").val("");
						$("select[name='id_catastrofe']").val("");
						carrega_voluntario(0);
					}
					else{
						$("#resultado").html("Voluntário já existente no sistema."); // senão tiver sucesso retorna com erro.
						$("#resultado").css("color", "red");
					}
				},

				error: function(e){
					$("#resultado").hmt("Erro no sistema: Contate o administrador!"); // senão tiver sucesso retorna com erro.
					$("#resultado").css("color", "red");
				}
		});
	});
	
	//alterar inline para o campo voluntario:
	$(document).on("click",".nome_voluntario",function(){
		td = $(this);
		nome_voluntario = td.html();
		input = "<input type='text' name='nome_voluntario_alterar' value='" + nome_voluntario + "' />";
		td.html(input);
		td.attr("class","nome_voluntario_alterar");
		$("input[name='nome_voluntario_alterar']").focus();
		
	});
	
	$(document).on("blur","input[name='nome_voluntario_alterar']",function(){
		td = $(this).closest("td");
		nome_voluntario = $("input[name='nome_voluntario_alterar']").val();
		id_voluntario = $(this).closest("tr").find("button").val();
		
		$.ajax({
			url: "alterar_inline.php",
			type:"post",
			data: {tabela:"voluntario",coluna:"nome_voluntario",valor: nome_voluntario, id: id_voluntario},
			success: function(d){
				td.html(nome_voluntario);
				td.attr("class","nome_voluntario");
			}
		});
		
	});
	
	//alterar inline para o campo data_partida:
	$(document).on("click",".data_partida",function(){
		td = $(this);
		data_partida = td.html();
		input = "<input type='date' name='data_partida_alterar' value='" + data_partida + "' />";
		td.html(input);
		td.attr("class","data_partida_alterar");
		$("input[name='data_partida_alterar']").focus();
		
	});
	
	$(document).on("blur","input[name='data_partida_alterar']",function(){
		td = $(this).closest("td");
		data_partida = $("input[name='data_partida_alterar']").val();
		id_voluntario = $(this).closest("tr").find("button").val();
		
		$.ajax({
			url: "alterar_inline.php",
			type:"post",
			data: {tabela:"voluntario",coluna:"data_partida",valor: data_partida, id: id_voluntario},
			success: function(d){
				td.html(data_partida);
				td.attr("class","data_partida");
			}
		});
		
	});
	
	//alterar inline para o campo data_retorno:
	$(document).on("click",".data_retorno",function(){
		td = $(this);
		data_retorno = td.html();
		input = "<input type='date' name='data_retorno_alterar' value='" + data_retorno + "' />";
		td.html(input);
		td.attr("class","data_retorno_alterar");
		$("input[name='data_retorno_alterar']").focus();
		
	});
	
	$(document).on("blur","input[name='data_retorno_alterar']",function(){
		td = $(this).closest("td");
		data_retorno = $("input[name='data_retorno_alterar']").val();
		id_voluntario = $(this).closest("tr").find("button").val();
		
		$.ajax({
			url: "alterar_inline.php",
			type:"post",
			data: {tabela:"voluntario",coluna:"data_retorno",valor: data_retorno, id: id_voluntario},
			success: function(d){
				td.html(data_retorno);
				td.attr("class","data_retorno");
			}
		});
		
	});
	
	//alterar inline para o campo catastrofe:
	$(document).on("click",".catastrofe",function(){
		td = $(this);
		catastrofe = td.html();
		select = "<select name='catastrofe_alterar'>";
		select += $("select[name='id_catastrofe']").html(); 
		select += "</select>";
		td.html(select);
		td.attr("class","catastrofe_alterar");
		$("select[name='catastrofe_alterar']").focus();
		
	});
	
	$(document).on("blur","select[name='catastrofe_alterar']",function(){
		td = $(this).closest("td");
		catastrofe = $("select[name='catastrofe_alterar']").val();
		id_voluntario = $(this).closest("tr").find("button").val();
		
		$.ajax({
			url: "alterar_inline.php",
			type:"post",
			data: {tabela:"voluntario",coluna:"cod_catastrofe",valor: catastrofe, id: id_voluntario},
			success: function(d){
				texto_catastrofe = $("select[name='catastrofe_alterar']").find("option[value='" + catastrofe+ "']").html();
				td.html(texto_catastrofe);
				td.attr("class","catastrofe");
			}
		});
		
	});
	
	///////ALTERANDO EM BLOCO /////
	
	$(document).on("click",".alterar",function(){
		id = $(this).attr("value");
		$.ajax({
			url: "alterar_voluntario.php",
			type: "post",
			data: {id: id},
			success: function(vetor){
				$("input[name='nome_voluntario']").val(vetor.nome_voluntario);
				$("input[name='data_partida']").val(vetor.data_partida);
				$("input[name='data_retorno']").val(vetor.data_retorno);
				$("select[name='id_catastrofe']").val(vetor.cod_catastrofe);
				
				///////
				$(".btn_cadastrar").attr("class","alteracao btn btn-primary"); // removo a class de cadastrar pra ficar só com uma 
				$(".alteracao").attr("id","alteracao");
				$(".alteracao").val("Alterar Catastrofe"); //coloco um novo nome no botão 				
			}
		});
	});
	
	/////////////////
	$(document).on("click",".alteracao",function(){
		$.ajax({ 
			url: "alteracao_voluntario.php",
			type: "post",
			data:{ id: id,
				nome_voluntario:$("input[name='nome_voluntario']").val(), 
				data_partida:$("input[name='data_partida']").val(), 
				data_retorno:$("input[name='data_retorno']").val(), 
				catastrofe:$("select[name='id_catastrofe']").val()
				
			},		
			success: function(data){
				console.log(data);
				if (data==1){
					$("#resultado").val("Voluntario alterado com sucesso!");
					carrega_voluntario(0);
					
					//limpa os inputs
					$("input[name='nome_voluntario']").val("");
					$("input[name='data_partida']").val("");
					$("input[name='data_retorno']").val("");
					$("input[name='id_catastrofe']").val("");
			
					$(".alteracao").attr("class","btn_cadastrar  btn btn-primary");
					$(".btn_cadastrar").val("Cadastrar");
				}else{
					console.log(data);
				}
			}
		});
	});
	
	//Filtro
	$("#filtrar").click(function(){
		$.ajax({
			url:"paginacao_voluntario.php",
			type:"POST",
			data:{
				nome_filtro: $("input[name='nome_filtro']").val()
			},
			success: function(data){ //Colocando os botões que retorna do paginacao_cadastro na div paginacao
				$("#paginacao").html(data);
				filtro = $("input[name='nome_filtro']").val();
				carrega_voluntario(0);
			}
		});
	});
	
	$(document).on("click", '.btn_excluir', function(){
		id_voluntario = $(this).val();
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
					
					carrega_voluntario(0);
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