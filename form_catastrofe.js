var filtro = null;
pg_catastrofe = 0;
$(document).ready(function(){
	
		$(document).on("click",".btn_pagina",function(){
		//$(".btn_pagina").click(function(){//quando eu clico em algum botão da página
			$(".btn_pagina").removeClass("bg-info");
			$(this).addClass("bg-info");
		
			valor_botao = $(this).val(); //pego o valor do botaõ
			pg_catastrofe = (valor_botao - 1)*5;// faço a conta pra pegar o bloco que vou querer
			$("#tbody").html("");//limpo para não acumular as noticias
			carrega_catastrofe(pg_catastrofe);//carrego a função para pegar noticias novas
		});
			
		function carrega_catastrofe(pg_catastrofe){
			$.ajax({
				url: "webservice_catastrofe.php",
				type: "POST",
				data: {pagina: pg_catastrofe, nome_filtro: filtro},
				success: function(matriz_catastrofe){
					$("#tbody").html("");
					for(i=0;i<matriz_catastrofe.length;i++){
						catastrofe = "<tr class = 'tbody'>";
						catastrofe += "<td class='nome'>" + matriz_catastrofe[i].nome + "</td>";
						catastrofe += "<td class = 'local'>" + matriz_catastrofe[i].local + "</td>";
						catastrofe += "<td class = 'morte'>" + matriz_catastrofe[i].morte + "</td>";
						catastrofe += "<td class = 'sobrevivente'>" + matriz_catastrofe[i].sobrevivente + "</td>";
						catastrofe += "<td class = 'descricao'>" + matriz_catastrofe[i].descricao + "</td>";
						catastrofe += "<td class = 'data_ocorrida'>" + matriz_catastrofe[i].data_ocorrida + "</td>";
						catastrofe += "<td class = 'area_abrangente'>" + matriz_catastrofe[i].area_abrangente + "</td>";
						catastrofe += "<td><button type='button' class = 'alterar'  value='" + matriz_catastrofe[i].id_catastrofe + "'>Alterar</button> <button type='button' class = 'btn_excluir'  value='" + matriz_catastrofe[i].id_catastrofe + "'>Remover</button> </td>";
						catastrofe += "</tr>";
								
						$("#tbody").append(catastrofe);
						
					}//fechando o for
					
					if(matriz_catastrofe.length==0){
						linha="<tr><td colspan='8'>Não há catastrofes cadastradas!</td></tr>";
						$("#tbody").append(linha);
					}
				}//fechando o sucesso
			});//fechando o ajax
		}//término da função carrega_noticias
			carrega_catastrofe(pg_catastrofe);
			
	$(document).on("click",".btn_cadastrar",function(){
		$.ajax({ // o ajax faz uma requisição assincrona. Ele pega os dados leva pro insere e reorna na mesma pagina do formulário.
				// Diferente da requisição sincrona que pega os dados leva para a pagina inere e la mesmo retorna a informção.
			url: "insere_catastrofe.php", // vai solicitar o recebe_post.
			type: "POST", //metodo de envio.
			data: {id_catastrofe:$("input[name='id_catastrofe']").val(),
				   nome:$("input[name='nome']").val(),
				   local:$("input[name='local']").val(),
				   morte:$("input[name='morte']").val(),
				   sobrevivente:$("input[name='sobrevivente']").val(),
				   descricao:$("input[name='descricao']").val(),
				   data_ocorrida:$("input[name='data_ocorrida']").val(),
				   area_abrangente:$("input[name='area_abrangente']").val()
				}, // data = dados, ele manda os dados que deseja pelo metodo post para a recebe_post.


				beforeSend: function(){ // antes de enviar 
						$("#resultado").html("Carregando..."); // mostra uma mensagem.
						$("#resultado").css("color", "yellow");
				},

				success: function(data){ // se a requisição tiver sucesso ela mostra os dados na requisição "resultado" que eu pedi.
					if(data==1){
						$("#resultado").html("Catastrofe inserido com sucesso!"); 
						$("#resultado").css("color", "green");

						//Limpando os input's
						$("input[name='id_catastrofe']").val("");
						$("input[name='nome']").val("");
						$("input[name='local']").val("");
						$("input[name='morte']").val("");
						$("input[name='sobrevivente']").val("");
						$("input[name='descricao']").val("");
						$("input[name='data_ocorrida']").val("");
						$("input[name='area_abrangente']").val("");
						carrega_catastrofe(0);
					}
					else{
						$("#resultado").html("Catastrofe já existente no sistema."); // senão tiver sucesso retorna com erro.
						$("#resultado").css("color", "red");
					}
				},

				error: function(e){
					$("#resultado").hmt("Erro no sistema: Contate o administrador!"); // senão tiver sucesso retorna com erro.
					$("#resultado").css("color", "red");
				}
		});
	});
	
	
	//alterar inline para o campo nome:
	$(document).on("click",".nome",function(){
		td = $(this);
		nome = td.html();
		input = "<input type='text' name='nome_alterar' value='" + nome + "' />";
		td.html(input);
		td.attr("class","nome_alterar");
		$("input[name='nome_alterar']").focus();
		
	});
	
	$(document).on("blur","input[name='nome_alterar']",function(){
		td = $(this).closest("td");
		nome = $("input[name='nome_alterar']").val();
		id_catastrofe = $(this).closest("tr").find("button").val();
		
		$.ajax({
			url: "alterar_inline.php",
			type:"post",
			data: {tabela:"catastrofe",coluna:"nome",valor: nome, id: id_catastrofe},
			success: function(d){
				td.html(nome);
				td.attr("class","nome");
			}
		});
		
	});
	
	//alterar inline para o campo local:
	$(document).on("click",".local",function(){
		td = $(this);
		local = td.html();
		input = "<input type='text' name='local_alterar' value='" + local + "' />";
		td.html(input);
		td.attr("class","local_alterar");
		$("input[name='local_alterar']").focus();
		
	});
	
	$(document).on("blur","input[name='local_alterar']",function(){
		td = $(this).closest("td");
		local = $("input[name='local_alterar']").val();
		id_catastrofe = $(this).closest("tr").find("button").val();
		
		$.ajax({
			url: "alterar_inline.php",
			type:"post",
			data: {tabela:"catastrofe",coluna:"local",valor: local, id: id_catastrofe},
			success: function(d){
				td.html(local);
				td.attr("class","local");
			}
		});
		
	});
	
	//alterar inline para o campo morte:
	$(document).on("click",".morte",function(){
		td = $(this);
		morte = td.html();
		input = "<input type='text' name='morte_alterar' value='" + morte + "' />";
		td.html(input);
		td.attr("class","morte_alterar");
		$("input[name='morte_alterar']").focus();
		
	});
	
	$(document).on("blur","input[name='morte_alterar']",function(){
		td = $(this).closest("td");
		morte = $("input[name='morte_alterar']").val();
		id_catastrofe = $(this).closest("tr").find("button").val();
		
		$.ajax({
			url: "alterar_inline.php",
			type:"post",
			data: {tabela:"catastrofe",coluna:"morte",valor: morte, id: id_catastrofe},
			success: function(d){
				td.html(morte);
				td.attr("class","morte");
			}
		});
		
	});
	
	//alterar inline para o campo sobrevivente:
	$(document).on("click",".sobrevivente",function(){
		td = $(this);
		sobrevivente = td.html();
		input = "<input type='text' name='sobrevivente_alterar' value='" + sobrevivente + "' />";
		td.html(input);
		td.attr("class","sobrevivente_alterar");
		$("input[name='sobrevivente_alterar']").focus();
		
	});
	
	$(document).on("blur","input[name='sobrevivente_alterar']",function(){
		td = $(this).closest("td");
		sobrevivente = $("input[name='sobrevivente_alterar']").val();
		id_catastrofe = $(this).closest("tr").find("button").val();
		
		$.ajax({
			url: "alterar_inline.php",
			type:"post",
			data: {tabela:"catastrofe",coluna:"sobrevivente",valor: sobrevivente, id: id_catastrofe},
			success: function(d){
				td.html(sobrevivente);
				td.attr("class","sobrevivente");
			}
		});
		
	});
	
	//alterar inline para o campo descrição:
	$(document).on("click",".descricao",function(){
		td = $(this);
		descricao = td.html();
		input = "<input type='text' name='descricao_alterar' value='" + descricao + "' />";
		td.html(input);
		td.attr("class","descricao_alterar");
		$("input[name='descricao_alterar']").focus();
		
	});
	
	$(document).on("blur","input[name='descricao_alterar']",function(){
		td = $(this).closest("td");
		descricao = $("input[name='descricao_alterar']").val();
		id_catastrofe = $(this).closest("tr").find("button").val();
		
		$.ajax({
			url: "alterar_inline.php",
			type:"post",
			data: {tabela:"catastrofe",coluna:"descricao",valor: descricao, id: id_catastrofe},
			success: function(d){
				td.html(descricao);
				td.attr("class","descricao");
			}
		});
		
	});
	
	//alterar inline para o campo data_ocorrida:
	$(document).on("click",".data_ocorrida",function(){
		td = $(this);
		data_ocorrida = td.html();
		input = "<input type='date' name='data_ocorrida_alterar' value='" + data_ocorrida + "' />";
		td.html(input);
		td.attr("class","data_ocorrida_alterar");
		$("input[name='data_ocorrida_alterar']").focus();
		
	});
	
	$(document).on("blur","input[name='data_ocorrida_alterar']",function(){
		td = $(this).closest("td");
		data_ocorrida = $("input[name='data_ocorrida_alterar']").val();
		id_catastrofe = $(this).closest("tr").find("button").val();
		
		$.ajax({
			url: "alterar_inline.php",
			type:"post",
			data: {tabela:"catastrofe",coluna:"data_ocorrida",valor: data_ocorrida, id: id_catastrofe},
			success: function(d){
				td.html(data_ocorrida);
				td.attr("class","data_ocorrida");
			}
		});
		
	});
	
	//alterar inline para o campo area_abrangente:
	$(document).on("click",".area_abrangente",function(){
		td = $(this);
		area_abrangente = td.html();
		input = "<input type='text' name='area_abrangente_alterar' value='" + area_abrangente + "' />";
		td.html(input);
		td.attr("class","area_abrangente_alterar");
		$("input[name='area_abrangente_alterar']").focus();
		
	});
	
	$(document).on("blur","input[name='area_abrangente_alterar']",function(){
		td = $(this).closest("td");
		area_abrangente = $("input[name='area_abrangente_alterar']").val();
		id_catastrofe = $(this).closest("tr").find("button").val();
		
		$.ajax({
			url: "alterar_inline.php",
			type:"post",
			data: {tabela:"catastrofe",coluna:"area_abrangente",valor: area_abrangente, id: id_catastrofe},
			success: function(d){
				td.html(area_abrangente);
				td.attr("class","area_abrangente");
			}
		});
		
	});
	
	///////ALTERANDO EM BLOCO /////
	
	$(document).on("click",".alterar",function(){
		id = $(this).attr("value");
		$.ajax({
			url: "alterar_catastrofe.php",
			type: "post",
			data: {id: id},
			success: function(vetor){
				$("input[name='nome']").val(vetor.nome);
				$("input[name='local']").val(vetor.local);
				$("input[name='morte']").val(vetor.morte);
				$("input[name='sobrevivente']").val(vetor.sobrevivente);
				$("input[name='descricao']").val(vetor.descricao);
				$("input[name='data_ocorrida']").val(vetor.data_ocorrida);
				$("input[name='area_abrangente']").val(vetor.area_abrangente);
				
				///////
				$(".btn_cadastrar").attr("class","alteracao btn btn-primary"); // removo a class de cadastrar pra ficar só com uma 
				$(".alteracao").val("Alterar Catastrofe"); //coloco um novo nome no botão 				
			}
		});
	});
	
	/////////////////
	$(document).on("click",".alteracao",function(){
		$.ajax({ 
			url: "alteracao_catastrofe.php",
			type: "post",
			data:{ id: id,
				nome:$("input[name='nome']").val(), 
				local:$("input[name='local']").val(), 
				morte:$("input[name='morte']").val(), 
				sobrevivente:$("input[name='sobrevivente']").val(), 
				descricao:$("input[name='descricao']").val(), 
				data_ocorrida:$("input[name='data_ocorrida']").val(), 
				area_abrangente:$("input[name='area_abrangente']").val() 
			},		
			success: function(data){
				console.log(data);
				if (data==1){
					$("#resultado").val("Catastrofe alterado com sucesso!");
					carrega_catastrofe(0);
					
					//limpa os inputs
					$("input[name='nome']").val("");
					$("input[name='local']").val("");
					$("input[name='morte']").val("");
					$("input[name='sobrevivente']").val("");
					$("input[name='descricao']").val("");
					$("input[name='data_ocorrida']").val("");
					$("input[name='area_abrangente']").val("");
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
			url:"paginacao_catastrofe.php",
			type:"POST",
			data:{
				nome_filtro: $("input[name='nome_filtro']").val()
			},
			success: function(data){ //Colocando os botões que retorna do paginacao_cadastro na div paginacao
				$("#paginacao").html(data);
				filtro = $("input[name='nome_filtro']").val();
				carrega_catastrofe(0);
			}
		});
	});
	
	//Removendo Catastrofe
	$(document).on("click", '.btn_excluir', function(){
		id_catastrofe = $(this).val();
		linha = $(this).closest("tr");
		$.ajax({
			url: "remove_catastrofe.php",
			type: "POST", 
			data:{id: id_catastrofe},

			beforeSend: function(){
				$("#resultado").html("Excluindo catastrofe...");
				$("#resultado").css("color", "blue");
			},

			success: function(data){
				if(data==1){
					$("#resultado").html("Catastrofe excluida com sucesso!");
					$("#resultado").css("color", "green");
					
					carrega_catastrofe(0);
				}else{
					$("#resultado").html("Erro: Cqatastrofe não pode ser excluído.");
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