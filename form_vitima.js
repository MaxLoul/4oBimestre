$(document).ready(function(){
	pg_vitima = 0;
		$(".btn_pagina").click(function(){//quando eu clico em algum botão da página
			$(".btn_pagina").removeClass("bg-info");
			$(this).addClass("bg-info");
			
			valor_botao = $(this).val(); //pego o valor do botaõ
			p = (valor_botao - 1)*5;// faço a conta pra pegar o bloco que vou querer
			$("#tbody").html("");//limpo para não acumular as noticias
			carrega_vitima(p);//carrego a função para pegar noticias novas
		});
			
			
		//////////PAGINAÇÃO///////////
		function carrega_vitima(pg_vitima){
			
			$.ajax({
				url: "webservice_vitima.php",
				type: "POST",
				data: {pagina: pg_vitima,
					   nome_filtro: $("input[name='nome_filtro']").val()
				},
				success: function(matriz_vitima){
					$("#tbody").html("");
					console.log(matriz_vitima);
						for(i=0;i<matriz_vitima.length;i++){
							vitima = "<tr class = 'tbody'>";
							vitima += "<td class = 'vitima'>" + matriz_vitima[i].nome_vitima + "</td>";
							vitima += "<td class = 'idade'>" + matriz_vitima[i].idade + "</td>";
							vitima += "<td class = 'catastrofe'>" + matriz_vitima[i].nome + "</td>";
							vitima += "<td><button type='button' class = 'alterar'  value='" + matriz_vitima[i].id_vitima + "'>Alterar</button> <button type='button' class = 'btn_excluir'  value='" + matriz_vitima[i].id_vitima + "'>Remover</button></td>";
							vitima += "</tr>";
									
							$("#tbody").append(vitima);
						}//fechando o for
						
						if(matriz_vitima.length==0){
						linha="<tr><td colspan='5'>Não há vítimas cadastradas!</td></tr>";
						$("#tbody").append(linha);
					}
				}//fechando o sucesso
			});//fechando o ajax
		}//término da função carrega_noticias
			carrega_vitima(pg_vitima);
			
			
	/////////////CADASTRAR/////////////
	$(document).on("click","#btn_cadastrar",function(){

		$.ajax({ // o ajax faz uma requisição assincrona. Ele pega os dados leva pro insere e reorna na mesma pagina do formulário.
				// Diferente da requisição sincrona que pega os dados leva para a pagina inere e la mesmo retorna a informção.
			url: "insere_vitima.php", // vai solicitar o recebe_post.
			type: "POST", //metodo de envio.
			data: {id_vitima:$("input[name='id_vitima']").val(),
				   nome_vitima:$("input[name='nome_vitima']").val(),
				   idade:$("input[name='idade']").val(),
				   id_catastrofe:$("select[name='id_catastrofe']").val()
				}, // data = dados, ele manda os dados que deseja pelo metodo post para a recebe_post.


				beforeSend: function(){ // antes de enviar 
						$("#resultado").html("Carregando..."); // mostra uma mensagem.
						$("#resultado").css("color", "yellow");
				},

				success: function(data){ // se a requisição tiver sucesso ela mostra os dados na requisição "resultado" que eu pedi.
					console.log(data);
					if(data==1){
						$("#resultado").html("Vitima inserido com sucesso!"); 
						$("#resultado").css("color", "green");
						
						//Limpando os input's
						$("input[name='id_vitima']").val("");
						$("input[name='nome_vitima']").val("");
						$("input[name='idade']").val("");
						$("select[name='id_catastrofe']").val("");
						carrega_vitima(0);
					}
					else{
						$("#resultado").html("Vitima já existente no sistema."); // senão tiver sucesso retorna com erro.
						$("#resultado").css("color", "red");
					}
				},

				error: function(e){
					$("#resultado").hmt("Erro no sistema: Contate o administrador!"); // senão tiver sucesso retorna com erro.
					$("#resultado").css("color", "red");
				}
		});
	});
	
	//alterar inline para o campo vitima:
	$(document).on("click",".vitima",function(){
		td = $(this);
		vitima = td.html();
		input = "<input type='text' name='vitima_alterar' value='" + vitima + "' />";
		td.html(input);
		td.attr("class","vitima_alterar");
		$("input[name='vitima_alterar']").focus();
		
	});
	
	$(document).on("blur","input[name='vitima_alterar']",function(){
		td = $(this).closest("td");
		vitima = $("input[name='vitima_alterar']").val();
		id_vitima = $(this).closest("tr").find("button").val();
		
		$.ajax({
			url: "alterar_inline.php",
			type:"post",
			data: {tabela:"vitima",coluna:"nome_vitima",valor: vitima, id: id_vitima},
			success: function(d){
				console.log(d);
				td.html(vitima);
				td.attr("class","vitima");
			}
		});
		
	});
	
	
	//alterar inline para o campo idade:
	$(document).on("click",".idade",function(){
		td = $(this);
		idade = td.html();
		input = "<input type='text' name='idade_alterar' value='" + idade + "' />";
		td.html(input);
		td.attr("class","idade_alterar");
		$("input[name='idade_alterar']").focus();
		
	});
	
	$(document).on("blur","input[name='idade_alterar']",function(){
		td = $(this).closest("td");
		idade = $("input[name='idade_alterar']").val();
		id_vitima = $(this).closest("tr").find("button").val();
		
		$.ajax({
			url: "alterar_inline.php",
			type:"post",
			data: {tabela:"vitima",coluna:"idade",valor: idade, id: id_vitima},
			success: function(d){
				console.log(d);
				td.html(idade);
				td.attr("class","idade");
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
		id_vitima = $(this).closest("tr").find("button").val();
		
		$.ajax({
			url: "alterar_inline.php",
			type:"post",
			data: {tabela:"vitima",coluna:"cod_catastrofe",valor: catastrofe, id: id_vitima},
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
			url: "alterar_vitima.php",
			type: "post",
			data: {id: id},
			success: function(vetor){
				$("input[name='nome_vitima']").val(vetor.nome_vitima);
				$("input[name='idade']").val(vetor.idade);
				$("select[name='id_catastrofe']").val(vetor.cod_catastrofe);
				
				///////
				$(".btn_cadastrar").attr("class","alteracao btn btn-primary"); // removo a class de cadastrar pra ficar só com uma 
				$(".alteracao").attr("id","alteracao");
				$(".alteracao").val("Alterar Vitima"); //coloco um novo nome no botão 				
			}
		});
	});
	
	/////////////////
	$(document).on("click",".alteracao",function(){
		$.ajax({ 
			url: "alteracao_vitima.php",
			type: "post",
			data:{ id: id,
				nome_vitima:$("input[name='nome_vitima']").val(), 
				idade:$("input[name='idade']").val(), 
				catastrofe:$("select[name='id_catastrofe']").val()
			},		
			success: function(data){
				console.log(data);
				if (data==1){
					$("#resultado").val("Vitima alterado com sucesso!");
					carrega_vitima(0);
					
					//limpa os inputs
					$("input[name='nome_vitima']").val("");
					$("input[name='idade']").val("");
					$("input[name='catastrofe']").val("");
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
		alert();
		$.ajax({
			url:"paginacao_vitima.php",
			type:"POST",
			data:{
				nome_filtro: $("input[name='nome_filtro']").val()
			},
			success: function(data){ //Colocando os botões que retorna do paginacao_cadastro na div paginacao
				$("#paginacao").html(data);
				filtro = $("input[name='nome_filtro']").val();
				carrega_vitima(0);
			}
		});
	});
	
	//////Remover Vitima
	
	$(document).on("click", '.btn_excluir', function(){
		id_vitima = $(this).val();
		linha = $(this).closest("tr");
		$.ajax({
			url: "remove_vitima.php",
			type: "POST", 
			data:{id: id_vitima},

			beforeSend: function(){
				$("#resultado").html("Excluindo vitima...");
				$("#resultado").css("color", "blue");
			},

			success: function(data){
				if(data==1){
					$("#resultado").html("Vítima excluida com sucesso!");
					$("#resultado").css("color", "green");
					
					carrega_vitima(0);
				}else{
					$("#resultado").html("Erro: Vítima não pode ser excluída.");
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