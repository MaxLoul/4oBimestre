$(document).ready(function(){
	pg = 0;
		$(".btn_pagina").click(function(){//quando eu clico em algum botão da página
			$(".btn_pagina").removeClass("bg-info");
			$(this).addClass("bg-info");
			
			
		
			valor_botao = $(this).val(); //pego o valor do botaõ
			p = (valor_botao - 1)*5;// faço a conta pra pegar o bloco que vou querer
			$("#tbody").html("");//limpo para não acumular as noticias
			carrega_doacao(p);//carrego a função para pegar noticias novas
		});
			
		
		/////////PAGINAÇÃO///////////
		function carrega_doacao(pg){
			$.ajax({
				url: "webservice_doacao.php",
				type: "POST",
				data: {pagina: pg,
						nome_filtro: $("input[name='nome_filtro']").val()
				},
				success: function(matriz_doacao){
					$("#tbody").html("");
					console.log(matriz_doacao);
						$("#tbody").html("");
						for(i=0;i<matriz_doacao.length;i++){
							doacao = "<tr class = 'tbody'>";
							doacao += "<td class = 'doador'>" + matriz_doacao[i].doador + "</td>";
							doacao += "<td class = 'produto_doado'>" + matriz_doacao[i].produto_doado + "</td>";
							doacao += "<td class = 'catastrofe'>" + matriz_doacao[i].nome + "</td>";
							doacao += "<td><button type='button' class = 'alterar'  value='" + matriz_doacao[i].id_doacao + "'>Alterar</button> <button type='button' class = 'btn_excluir'  value='" + matriz_doacao[i].id_doacao + "'>Remover</button> </td>";
							doacao += "</tr>";
									
							$("#tbody").append(doacao);
						}//fechando o for
						if(matriz_doacao.length==0){
							linha="<tr><td colspan='5'>Não há doações cadastrados!</td></tr>";
							$("#tbody").append(linha);
						}
						
				}//fechando o sucesso
			});//fechando o ajax
		}//término da função carrega_noticias
		
		carrega_doacao(pg);
			
	//////////CADASTRAR DOAÇÃO//////////
	$(document).on("click","#btn_cadastrar",function(){
		
		$.ajax({ // o ajax faz uma requisição assincrona. Ele pega os dados leva pro insere e reorna na mesma pagina do formulário.
				// Diferente da requisição sincrona que pega os dados leva para a pagina inere e la mesmo retorna a informção.
			url: "insere_doacao.php", // vai solicitar o recebe_post.
			type: "POST", //metodo de envio.
			data: {id_doacao:$("input[name='id_doacao']").val(),
				   doador:$("input[name='doador']").val(),
				   produto_doado:$("select[name='produto_doado']").val(),
				   id_catastrofe:$("select[name='id_catastrofe']").val()
				}, // data = dados, ele manda os dados que deseja pelo metodo post para a recebe_post.


				beforeSend: function(){ // antes de enviar 
						$("#resultado").html("Carregando..."); // mostra uma mensagem.
						$("#resultado").css("color", "yellow");
				},

				success: function(data){ // se a requisição tiver sucesso ela mostra os dados na requisição "resultado" que eu pedi.
					if(data==1){
						$("#resultado").html("Doacao inserido com sucesso!"); 
						$("#resultado").css("color", "green");

						//Limpando os input's
						$("input[name='doador']").val("");
						$("select[name='produto_doado']").val("");
						$("select[name='id_catastrofe']").val("");
						carrega_doacao(0);
					}
					else{
						$("#resultado").html("Doacao já existente no sistema."); // senão tiver sucesso retorna com erro.
						$("#resultado").css("color", "red");
					}
				},

				error: function(e){
					$("#resultado").hmt("Erro no sistema: Contate o administrador!"); // senão tiver sucesso retorna com erro.
					$("#resultado").css("color", "red");
				}
		});

	});
	
	//alterar inline para o campo doador:
	$(document).on("click",".doador",function(){
		td = $(this);
		doador = td.html();
		input = "<input type='text' name='doador_alterar' value='" + doador + "' />";
		td.html(input);
		td.attr("class","doador_alterar");
		$("input[name='doador_alterar']").focus();
		
	});
	
	$(document).on("blur","input[name='doador_alterar']",function(){
		td = $(this).closest("td");
		doador = $("input[name='doador_alterar']").val();
		id_produto = $(this).closest("tr").find("button").val();
		
		$.ajax({
			url: "alterar_inline.php",
			type:"post",
			data: {tabela:"doacao",coluna:"doador",valor: doador, id: id_produto},
			success: function(d){
				console.log(d);
				td.html(doador);
				td.attr("class","doador");
			}
		});
		
	});
	
	//alterar inline para o campo produto_doado:
	$(document).on("click",".produto_doado",function(){
		td = $(this);
		produto_doado = td.html();
		select = "<select name='produto_doado_alterar'>";
		select += $("select[name='produto_doado']").html(); 
		select += "</select>";
		td.html(select);
		td.attr("class","produto_doado_alterar");
		$("select[name='produto_doado_alterar']").focus();
		
	});
	
	$(document).on("blur","select[name='produto_doado_alterar']",function(){
		td = $(this).closest("td");
		produto_doado = $("select[name='produto_doado_alterar']").val();
		id_doacao = $(this).closest("tr").find("button").val();
		
		$.ajax({
			url: "alterar_inline.php",
			type:"post",
			data: {tabela:"doacao",coluna:"produto_doado",valor: produto_doado, id: id_doacao},
			success: function(d){
				console.log(d);
				td.html(produto_doado);
				td.attr("class","produto_doado");
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
		id_doacao = $(this).closest("tr").find("button").val();
		
		$.ajax({
			url: "alterar_inline.php",
			type:"post",
			data: {tabela:"doacao",coluna:"cod_catastrofe",valor: catastrofe, id: id_doacao},
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
			url: "doador_alterar.php",
			type: "post",
			data: {id: id},
			success: function(vetor){
				$("input[name='doador']").val(vetor.doador);
				$("select[name='produto_doado']").val(vetor.produto_doado);
				$("select[name='id_catastrofe']").val(vetor.cod_catastrofe);
				
				///////
				$(".btn_cadastrar").attr("class","alteracao btn btn-primary"); // removo a class de cadastrar pra ficar só com uma 
				$(".alteracao").attr("id","alteracao");
				$(".alteracao").val("Alterar Doação"); //coloco um novo nome no botão 				
			}
		});
	});
	
	/////////////////
	$(document).on("click",".alteracao",function(){
		
		$.ajax({ 
			url: "alteracao_doacao.php",
			type: "post",
			data:{ id: id,
				doador:$("input[name='doador']").val(), 
				produto_doado:$("select[name='produto_doado']").val(), 
				catastrofe:$("select[name='id_catastrofe']").val()
			},		
			success: function(data){
				console.log(data);
				if (data==1){
					$("#resultado").val("Doacao alterada com sucesso!");
					carrega_doacao(0);
					
					//limpa os inputs
					$("input[name='doador']").val("");
					$("select[name='produto_doado']").val("");
					$("select[name='id_catastrofe']").val("");
					
					$(".alteracao").attr("class","btn_cadastrar  btn btn-primary");
					$(".btn_cadastrar").attr("id","btn_cadastrar");
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
			url:"paginacao_doacao.php",
			type:"POST",
			data:{
				nome_filtro: $("input[name='nome_filtro']").val()
			},
			success: function(data){ //Colocando os botões que retorna do paginacao_cadastro na div paginacao
				$("#paginacao").html(data);
				filtro = $("input[name='nome_filtro']").val();
				carrega_doacao(0);
			}
		});
	});
	
	//Removendo Doacao
	$(document).on("click", '.btn_excluir', function(){
		id_doacao = $(this).val();
		linha = $(this).closest("tr"); //closest = mais próximo
		$.ajax({ //envia de forma assincrona para remove doacao
			url: "remove_doacao.php",
			type: "POST", 
			data:{id: id_doacao},

			beforeSend: function(){ //antes de enviar
				$("#resultado").html("Excluindo doação...");
				$("#resultado").css("color", "blue");
			},

			success: function(data){
				console.log(data);
				if(data==1){
					$("#resultado").html("Doação excluida com sucesso!");
					$("#resultado").css("color", "green");
					
					carrega_doacao(0);
				}else{
					$("#resultado").html("Erro: Doação não pode ser excluído.");
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