
UnBordo - A aventura do conhecimento 
Documento de Arquitetura 
Versão 0.1

Histórico de Revisão 
Data 
Versão 
Descrição 
Autor(es)
18/12/2024
0.1
Primeira versão do documento
David, Gabriel, João, Sophia e Willian


















Autores:
Matrícula 
Nome 
Papel 
% de contribuição
231027032
ARTHUR EVANGELISTA DE OLIVEIRA
Seção 1
10
232001649
DAVID WILLIAM LEMOS FERREIRA
Seção 1
10
232013980
GABRIEL ANDRADE MAGIOLI
Seção 2
10
231038644
GIOVANA DE SOUZA 
Seção 2
10
222008691
GUSTAVO RIBEIRO LINHARES
Seção 2
10
221022604
JOÃO VICTOR DA SILVA BATISTA DE FARIAS
Seção 2
10
231035455
LETICIA MARIA DE JESUS LOPES
Seção 2
10
231026886
SOPHIA SOUZA DA SILVA
Seção 2
10
231011865
WILLIAN WAGNER XAVIER RAMOS DA SILVA
Seção 2
10
231038303
YAN MATHEUS SANTA BRIGIDA DE AGUIAR
Seção 2
10



Sumário 

1 Introdução	4
1.1 Finalidade	4
1.2 Escopo	4
2 Representação Arquitetural	4
2.1 Definições	4
2.2 Justifique sua escolha.	4
2.3 Detalhamento	5
2.4 Metas e restrições arquiteturais	5
2.5 Visão de Casos de uso	6
2.6 Visão lógica	8
Cadastro	8
Login	8
Fórum de Perguntas Públicas	9
Módulo de Chat 1:1	9
Razão Lógica:	9
Comunicação:	9
Proposta de Tecnologia:	9
Dependências:	10
2.7 Visão de Implementação	11
2.8 Visão de Implantação	13
2.9 Restrições adicionais	14
3 Bibliografia	15



1 Introdução 
   1.1 Finalidade 
Este documento descreve a arquitetura do sistema sendo desenvolvido pelo grupo Wunjo, na disciplina de MDS – Métodos de Desenvolvimento de Software – edição do segundo semestre de 2024 <UnBordo - A aventura do conhecimento>, a fim de capturar e transmitir decisões arquiteturais tomadas durante o processo de desenvolvimento do sistema, fornecendo uma visão abrangente do sistema para desenvolvedores, testadores e demais interessados.
    1.2 Escopo 
O detalhamento do escopo se encontra no documento <Documento de visão e produto de software - UnBordo>. 
Em linhas gerais, o escopo do produto se trata de uma aplicação mobile gamificada, onde um aluno da Faculdade de Ciências e Tecnologia em Engenharia (FCTE) se cadastra utilizando seu nome, matrícula, curso e senha, e recebe um código no seu e-mail institucional para confirmar o cadastro. 
Dentro da aplicação, esse estudante pode acessar o fórum de dúvidas, tanto para fazer uma pergunta, quanto para responder uma dúvida, sendo nesta última ele recebendo pontos, que, caso ele deseje participar, contam para sua posição no ranking da plataforma. O contato entre o estudante que perguntou e o que está respondendo ocorre por um chat privado.
2 Representação Arquitetural 
2.1 Definições 
O sistema seguirá, no back-end, o padrão arquitetural Hexagonal, utilizando portas e adaptadores, e, no front-end, a arquitetura Component-Based Architecture (CBA).

2.2 Justifique sua escolha. 
Um dos objetivos da aplicação é que ela seja escalável, pensando nisso, foi escolhida a hexagonal no back-end, que enfatiza a separação entre o núcleo da aplicação e suas dependências externas. Essa abordagem permite maior flexibilidade, manutenção, testabilidade e escalabilidade da aplicação, pois as camadas são desacopladas e conectadas por meio de portas e adaptadores.
No front-end, a escolha se deu para aproveitar o comportamento do React, utilizando a CBA para criar componentes reutilizáveis, promovendo a qualidade de código, manutenção e testes de software.
2.3 Detalhamento 
Figura 1: Diagrama Hexagonal
Elementos de modelo:
Núcleo da Aplicação: Contém as regras de negócio e a lógica central do sistema;
Portas: Utilizadas para interações entre as camadas da aplicação e garantem o desacoplamento entre o sistema e ferramentas utilizadas.
Adaptadores de Entrada e Saída: Facilitam a interação entre o núcleo da aplicação e ferramentas externas como usuários, interfaces de programação de aplicação (APIs) e bancos de dados);
2.4 Metas e restrições arquiteturais 

O sistema além de lidar com dados como nome, matrícula e curso do usuário, deve implementar um chat 1:1 entre eles, sendo necessário a proteção da privacidade e dos dados pessoais. 
Para realizar o cadastro na plataforma, será enviado um código de confirmação para o e-mail institucional do usuário;
Os dados serão utilizados apenas para fins de cadastro e identificação na plataforma, armazenando-os de forma segura;
Para assegurar a privacidade dos chats será utilizado a criptografia end-to-end;
O usuário poderá solicitar a alteração dos seus dados, exceto matrícula, e a exclusão de sua conta.

O sistema deve suportar uma alta quantidade de requisições, possuir uma rápida atualização das mensagens entre os tutores e alunos e funcionar em celulares mais antigos. 
Para as requisições de leitura e escrita, será utilizado o banco de dados PostgreSQL, que possui um alto desempenho;
Será utilizado tecnologias como Typescript, NodeJs, ExpressJs e React Native, que funcionam com alta performance, melhorando o desempenho da aplicação;
Pensando na inter operacionalidade, será utilizado o Docker, que garantirá que a aplicação funcione de maneira esperada em diversos dispositivos. 

2.5 Visão de Casos de uso
Cadastro de Usuários:
Descrição: Permitir que um usuário se registre na plataforma.
Ator(es): Alunos.
Fluxo Principal:
O usuário insere suas informações (nome, matrícula, curso e senha).
O sistema valida as informações fornecidas e verifica o usuário através do email institucional.
O sistema armazena os dados e retorna uma confirmação.
Autenticação de Usuários:
Descrição: Permitir que um usuário faça login na plataforma.
Ator(es): Alunos.
Fluxo Principal:
O usuário insere matrícula e senha.
O sistema valida as credenciais contra os dados no banco de dados.
O sistema retorna um token de sessão ou mensagem de erro.
Cobertura Arquitetural: Interage com a camada de serviços e repositório.
Consulta de Dúvidas no Fórum:
Descrição: Permitir que o usuário visualize dúvidas cadastradas no fórum de dúvidas dos estudantes.
Ator(es): Alunos.
Fluxo Principal:
O usuário solicita dados ao entrar na página de fórum do sistema.
O sistema processa a solicitação por meio do serviço apropriado.
O sistema retorna os dados para o usuário.
Cobertura Arquitetural: Explora a interação entre os adaptadores de entrada e a camada de serviços.
Fazer uma pergunta no fórum:
Descrição: Permitir que um aluno faça perguntas sobre algum conteúdo.
Ator(es): Alunos.
Fluxo Principal:
O envia dados de suas dúvidas para o sistema.
O sistema processa a solicitação por meio do serviço apropriado.
O sistema faz o cadastro dos dados para o usuário no fórum de dúvidas.
Cobertura Arquitetural: Explora a interação entre as portas de entrada e a camada de serviços.
Responder uma pergunta do fórum:
Descrição: Permitir que um tutor responda a dúvida de um aluno de forma privada.
Ator(es): Alunos, Tutores.
Fluxo Principal:
O envia dados da mensagem de um tutor para um aluno.
O sistema processa a solicitação por meio do serviço apropriado.
O sistema criptografa as mensagens enviadas.
O sistema faz o envio das mensagens entre um usuário e outro.
Cobertura Arquitetural: Explora a interação entre as portas de entrada e a camada de serviços.
Visualizar ranking de participantes:
Descrição: Permitir que um usuário visualize o ranking dos usuários que mais contribuem na plataforma.
Ator(es): Alunos.
Fluxo Principal:
O envia a requisição para o sistema buscando os dados dos usuários no ranking.
O sistema valida se o usuário está logado na plataforma.
O sistema processa a solicitação por meio do serviço apropriado.
O sistema retorna a resposta com os dados para o usuário.
Cobertura Arquitetural: Explora a interação entre as portas de entrada e a camada de serviços.
Visualizar perfil:
Descrição: Permitir que um usuário visualize o seu perfil na plataforma.
Ator(es): Alunos.
Fluxo Principal:
O envia a requisição para o sistema buscando os dados dos usuários no ranking.
O sistema valida se o usuário está logado na plataforma.
O sistema processa a solicitação por meio do serviço apropriado.
O sistema retorna a resposta com os dados para o usuário.
Cobertura Arquitetural: Explora a interação entre as portas de entrada e a camada de serviços.
Atualizar perfil:
Descrição: Permitir que um usuário atualize informações sobre seu perfil.
Ator(es): Alunos.
Fluxo Principal:
O envia os dados que serão alterados em sua conta.
O sistema valida se o usuário está logado na plataforma.
O sistema processa a solicitação por meio do serviço apropriado.
O sistema retorna a resposta com os dados para o usuário.
O sistema faz as alterações solicitadas pelo usuário.
Cobertura Arquitetural: Explora a interação entre as portas de entrada e a camada de serviços.
Com base nessas principais funcionalidades, o grupo decidiu por usar a arquitetura Hexagonal, a fim de possuir uma maior estruturação do sistema pensando em sua escalabilidade ao longo do tempo.

2.6 Visão lógica 
Cadastro
Razão Lógica:
O módulo de cadastro gerencia o registro de novos usuários. Ele valida as informações recebidas e armazena os dados no repositório apropriado, garantindo consistência e segurança.
Comunicação:
Porta de Entrada: Recebe requisições REST para criar novos usuários.
Porta de Saída: Interage com o banco de dados por meio de um adaptador que implementa as operações de persistência.
Dependências:
Validação de dados (camada de domínio).
Persistência (adaptador para banco de dados).

Login
Razão Lógica:
Gerencia a autenticação dos usuários. Inclui validação de credenciais, geração de tokens de segurança e gerenciamento de autenticação dos usuários da plataforma.
Comunicação:
Porta de Entrada: Interface REST para envio de credenciais de login.
Porta de Saída: Serviço interno de autenticação e repositório de usuários.
Dependências:
Serviço de token para geração e validação de sessões (JSON Web Tokens).
Repositório para busca de usuários através do Prisma ORM.

Fórum de Perguntas Públicas
Razão Lógica:
Este módulo permite que os usuários criem e visualizem perguntas públicas no fórum, promovendo interações e troca de conhecimento.
Comunicação:
Porta de Entrada: APIs REST para postagem, leitura e busca de perguntas.
Porta de Saída: Adaptador para interagir com o Prisma ORM para fazer as devidas manipulações da entidade de perguntas no banco de dados e para facilitar as buscas.
Dependências:
Camada de domínio para validação de perguntas.
Módulo de Chat 1:1
Razão Lógica:
O módulo de chat 1:1 gerencia a troca de mensagens entre dois usuários em tempo real. Ele garante a entrega confiável das mensagens, mantém o histórico entre as partes envolvidas.
Comunicação:
Portas de Entrada:
WebSocket para envio e recebimento de mensagens em tempo real.
API REST para consulta de histórico de mensagens.
Portas de Saída:
Persistência: O Firebase Firestore ou Supabase pode ser usado para armazenar as mensagens.
Proposta de Tecnologia:
Firebase:
O Firestore armazena mensagens com esquema flexível e escalável.
O Firebase Realtime Database fornece sincronização instantânea e eventos para atualização de mensagens em tempo real.
Supabase:
PostgreSQL com suporte a eventos em tempo real para sincronização de mensagens.
Oferece APIs REST e WebSocket nativos para comunicação entre os adaptadores e o banco de dados.
Dependências:
Serviço de WebSocket para comunicação em tempo real.
Serviço de persistência para armazenar mensagens (Firebase Firestore, Realtime Database ou Supabase).
				Fluxo de Cadastro e Login: 
	
Figura 2: Fluxo de cadastro e login
  			Fluxo de cadastro de dúvidas no Fórum:          
Figura 3: Fluxo de cadastro de dúvidas o fórum
   Fluxo de chat e resposta de dúvidas:

Figura 4: Fluxo de chat e resposta de dúvidas
2.7 Visão de Implementação 
Banco de Dados: o Prisma ORM é utilizado para queries e sincronização das entidades com o PostgreSQL.
Transmissão de Mensagens: dados entre as camadas são transmitidos em formato JSON, que garantem padronização entre todas as aplicações.
Interrupções: problemas como timeouts nas queries ou falhas em integrações são tratados por meio de mecanismos de retry e logs detalhados para diagnóstico, em que o pŕoprio Prisma ORM faz, e os membros podem revisar..
Camada de Apresentação
Pacotes: routes, middlewares;
Função:
receber requisições HTTP.;
validar entradas por meio de middlewares;
direcionar as requisições aos controladores adequados na camada de negócio.
Processos leves: validação de inputs, controle de acesso (via middleware);
Comunicação: requisições HTTP encaminhadas para as rotas com resposta JSON.
O protótipo de baixa fidelidade está no repositório, com teste de vitalidade em relação ao servidor, e manipulação de erros reportados pelo banco e clientes primários.
Camada de Lógica de Negócios
Pacotes: domain, application;
Função:
centralizar regras e fluxos de negócio;
encapsular a complexidade das operações em componentes reutilizáveis.
Processos leves: validações internas de entidades, lógica de pontuação e ranking;
Processos pesados: cálculos relacionados ao ranking de tutores, atualização de de posições e notificações;
Comunicação: integração direta com infraestrutura por meio de serviços e chamadas assíncronas.
Camada de Infraestrutura
Pacotes: infra.logger, infra.orm;
Função:
gerenciar conexão com banco de dados (PostgreSQL).
implementar o Prisma ORM para abstração de dados e migrations.
gerenciar logs centralizados.
Processos leves: consultas básicas ao banco de dados.
Processos pesados: execução de migrations e operações complexas de agregados no banco.
Comunicação: uso do Prisma para realizar queries no banco e do logger para registro de eventos.

Figura 5: Camada de Infraestrutura
2.8 Visão de Implantação 
O software será implantado em dispositivos móveis, onde os ambientes operacionais estão organizados em cliente, servidor de aplicativo e banco de dados. O cliente consiste no sistema operacional a ser utilizado no aparelho do usuário, em que pode ser tanto o Android quanto o iOS, pois são os mais utilizados pelas fabricantes de smartphones e tablets. Outrossim, o servidor de aplicação engloba a parte que será utilizada para a execução do código da aplicação e interação com outros componentes de software, como sistemas de mensagens e a conexão com o banco de dados. Sendo assim, para o funcionamento e interação entre esses ambientes, serão utilizadas as seguintes tecnologias:
ExpressJs: framework backend para gerenciar APIs REST e comunicação entre cliente e servidor;
React Native: framework que auxilia no desenvolvimento de aplicativos móveis com interfaces nativas em Android e iOS;
NodeJs: ambiente de execução do lado do servidor, permitindo escalabilidade e alta performance na manipulação de requisições;
Prisma ORM: ferramenta para facilitar a interação com bancos de dados relacionais, gerenciando consultas, migrações e estruturação de dados;
Firebase: usado para autenticação, armazenamento em tempo real e notificações push;
Supabase: módulo do ORM para utilização de seu serviço de chat em tempo real entre os usuários, fundamental para resolução de dúvidas do fórum.
Assim como o banco de dados PostgreSQL, pois além de ser uma ferramenta open-source, ele consegue fornecer um alto desempenho para as operações de manipulação de dados, recurso de autenticação e autorização robusta aos usuários, e uma boa integração com as outras tecnologias que serão utilizadas no projeto.
2.9 Restrições adicionais
O Prisma ORM, contendo o banco de dados, PostgreSQL, estará conectado em um sistema próprio e seguro, onde o acesso será restrito aos membros do time, e eles poderão modificar, e analisar como o banco está rodando. O licenciamento será MIT, permitindo que o software possa ser contribuído de diversas fontes diferentes ao redor do mundo, e seu código-fonte será livre para acesso no repositório. As senhas no banco serão armazenadas criptografadas, para que nem membros do time possam vê-las em seu formato original. Tal banco possuirá módulos seguindo a arquitetura Hexagonal, com um dos módulos de Supabase e suas funcionalidades de dados em tempo real para a base direta do chat no aplicativo.

O software é acessível diretamente pelo aplicativo em celular pŕoprio, mas exige registro e login para que o usuário acesse suas funcionalidades, com vários estudantes logados concomitantemente, sem perda de qualidade de requisições entre o cliente, servidor, e banco de dados. Assim podemos organizar os dados de cada estudante, e utilizar de outras funcionalidades, como identificação por imagem, nome, e outros dados. Mecanismos de acessibilidade foram considerados para serem construídos em versões posteriores do software.

A usabilidade é vital em muitos aspectos de funcionalidade; Como para gamificação, o ranking é atualizado rapidamente; Postar dúvidas e responder não ser um processo burocrático, lento, e inútil, se não leva ao desuso e desmotivação dos estudantes. E que haja uma boa portabilidade de outros mecanismos que os alunos e tutores já usam entre si, como plataformas de conversa pessoais para se ajudar; Mas agora, incentivando a ideia de manter dados salvos, a competição entre si como motivação de ajudar e compartilhar suas dúvidas com outros estudantes. Metas de temporadas para também servir como controle de uso, para que os estudantes se sintam motivados a entrar no ranking, esforçando em utilizar o aplicativo junto a gamificação.

Uma característica extremamente importante para uma boa construção de nosso projeto é o de confiabilidade: com os alunos tendo segurança em suas conversas privadas com os tutores, e tendo o poder de reportá-los por mal comportamento; isso é importante, pois os usos estão diretamente ligados com o quanto o aluno e tutor tem confiança na eficaz do aplicativo.
3 Bibliografia 
Documento de Visão - UnBordo. 02 dez. 2024. Grupo 6 - Wunjo. Disponível em: Documento de Visão.

Documento de Requisitos. 09 dez. 2024. Grupo 6 - Wunjo. Disponível em: Documento de Requisitos.

Documento de Arquitetura de Software. FUNPAR. Disponível em: Artefato: Documento de Arquitetura de Software.

MÉTODOS DE DESENVOLVIMENTO DE SOFTWARE. 2024.2-Wunjo [repositório GitHub]. Disponível em: FGA0138-MDS-Ajax: 2024.2-Wunjo. Acesso em: 18 dez. 2024.

