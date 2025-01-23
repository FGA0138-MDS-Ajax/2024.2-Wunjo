## **Controle de Versões**

|            **Autor(a)**             |       **Detalhamento**       | **Versão** |    **Data**    |
| :---------------------------------: | :--------------------------: | :--------: | :------------: |
|         **Gabriel Magioli**         |   **Criação do documento**   |  **0.1**   | **09/11/2024** |
|          **David William**          |  **Revisão do documento**    |  **0.2**   | **10/11/2024** |
| **David William e Gabriel Magioli** | **Atualização do Documento** |  **0.3**   | **15/11/2024** |
| **Gabriel Magioli**                 | **Atualização do Documento** |  **0.4**   | **28/11/2024** |
| **Gabriel Magioli**                 | **Atualização do Documento** |  **0.5**   | **09/12/2024** |
| **Gabriel Magioli**                 | **Atualização do Documento** |  **0.6**   | **22/01/2025** |

### **INTRODUÇÃO**

A plataforma solicitada pelo cliente consiste em uma aplicação voltada para a comunidade acadêmica da UnB/FCTE, que posteriormente poderá ser escalada para os demais campi da universidade. Trata-se de uma plataforma gamificada onde os alunos poderão tirar dúvidas entre si por meio de bate-papos privados.

### **DESCRIÇÃO DOS REQUISITOS**
## **Requisitos Funcionais**

  Requisitos funcionais descrevem as funcionalidades e as ações que um sistema ou produto deve ser capaz de executar. Eles detalham as tarefas específicas que este produto deve realizar para atender às necessidades do usuário.


| RQ01 | O sistema deverá possuir um fórum de dúvidas público onde os alunos podem publicar suas dúvidas.                                                                                                 |
| :--: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RQ02 | O sistema deverá permitir com que um estudante selecione uma dúvida do fórum de dúvidas público para responder em um chat privado entre os dois estudantes.                                      |
| RQ03 | O sistema deverá permitir que o tutor cancele um bate-papo sem limite de cancelamentos.                                                                                                          |
| RQ04 | O sistema deverá permitir que o aluno que está fazendo uma pergunta cancele bate-papos privados 3 vezes por semana.                                                                              |
| RQ05 | O sistema deverá possuir chats privados entre os alunos e tutores.                                                                                                                               |
| RQ06 | O sistema deverá possuir um filtro de dúvidas por matéria.                                                                                                                                       |
| RQ07 | O sistema deverá buscar as matérias através do SIGAA.                                                                                                                                            |
| RQ08 | O sistema deverá permitir que, após a dúvida ser sanada, o usuário marque-a como resolvida para fechar a questão.                                                                                |
| RQ09 | O sistema deverá permitir com que usuários cadastrem suas dúvidas indicando qual a matéria se trata e a urgência da dúvida(Alta, Média, Baixa).                                                  |
| RQ10 | O sistema deverá permitir que quando os usuários cadastrem suas dúvidas possam indicar a dificuldade da dúvida(Alta, Média, Baixa).                                                              |
| RQ11 | O sistema deverá permitir que as dúvidas sejam colocadas em forma de texto e/ou foto.                                                                                                            |
| RQ12 | O sistema deverá possuir um filtro de dúvidas por urgência.                                                                                                                                      |
| RQ13 | O sistema deverá fazer com que o aluno avalie o tutor após o entendimento para que a dúvida seja fechada.                                                                                        |
| RQ14 | O sistema deverá permitir que os usuários façam denúncias de outros em caso de comunicação imprópria, agressão, uso indevido da plataforma.                                                      |
| RQ15 | O sistema deverá ser gamificado, incentivando os usuários a compartilhar conhecimentos e dar feedbacks constantes.                                                                               |
| RQ16 | A gamificação deverá possuir um ranking dos alunos.                                                                                                                                              |
| RQ17 | O sistema deverá permitir que o usuário selecione se deseja ou não participar do ranqueamento.                                                                                                   |
| RQ18 | O sistema deverá permitir que um tutor seja temporariamente privado de responder dúvidas caso suas respostas sejam frequentemente reportadas como incorretas ou tenha uma avaliação muito baixa, por um período de 3 dias. |
| RQ19 | O sistema deverá permitir o cadastro de usuário com nome, matrícula, e curso (voltado inicialmente para cursos da UnB/FCTE)                                                                      |
| RQ20 | O sistema deverá aumentar o valor em pontos das dúvidas conforme a dificuldade da pergunta.                                                                                                      |
| RQ21 | A gamificação deverá recompensar tutores com pontos/moedas de acordo com seu desempenho e participação.                                                                                          |
| RQ22 | A gamificação deverá fazer com que os tutores tenham sua média de avaliação reduzida conforme a avaliação de um aluno sobre seu atendimento.                                                                       |
| RQ23 | O sistema deverá enviar notificações por e-mail para o usuário denunciado para alertar sobre denúncias de comportamento impróprio.                                                               |
| RQ24 | O sistema deverá permitir que o usuário delete sua própria conta (soft delete).                                                                                                                  |
| RQ25 | O sistema deverá manter o chat privado com todos os tutores/ajudados dos usuários.                                                                                                               |
| RQ26 | A gamificação deverá possuir uma página de perfil onde o usuário poderá ver todas suas moedas, avaliação dos usuários que ajudou.                                             |
| RQ27 | O sistema deverá notificar um aluno quando um tutor enviar uma mensagem privada para ele tirando sua dúvida.                                                                                     |
| RQ28 | O sistema deverá permitir a edição de perfil, incluindo informações como nome, matrícula, curso e status de participação no ranking.                                                             |
| RQ29 | O sistema deverá exibir no ranking dos tutores cada tutor junto de suas médias e quantidade de atendimentos completos.                                                             |
| RQ30 | O sistema deverá receber a matrícula do aluno e enviar para o email institucional uma validação de cadastro.                                                             |
| RQ31 | A gamificação deverá possuir temporadas com duração de 6 meses onde os rankings serão reiniciados após esse tempo.                                                            |
| RQ32 | O sistema deverá possuir a opção de recuperar senha                                                            |
| RQ33 | O sistema deverá permitir que um estudante acesse o perfil de outro através do ranking e também através do chat privado, podendo visualizar o perfil do tutor que está tirando sua dúvida.                                                                  **  |



## **Requisitos Não Funcionais**

Requisitos não funcionais descrevem características e qualidades do sistema ou produto. Eles estão relacionados a aspectos como desempenho, confiabilidade, segurança, usabilidade e compatibilidade.

| RQNF01 | O sistema deverá ter foco nos alunos da UnB.                                                                           |
| :----: | ---------------------------------------------------------------------------------------------------------------------- |
| RQNF02 | O sistema deverá suportar uma alta quantidade de requisições.                                                          |
| RQNF03 | O sistema deverá ser intuitivo e fácil de navegar, promovendo a usabilidade para todos os perfis de usuários.          |
| RQNF04 | O sistema deverá armazenar dados de maneira segura, respeitando a privacidade e a proteção das informações dos alunos. |
| RQNF05 | O sistema deverá permitir que o usuário selecione uma avatar de perfil caso queira utilizar.                             |
| RQNF06 | O sistema deverá possuir uma rápida atualização das mensagens entre os tutores e alunos.                               |
| RQNF07 | O sistema deverá ser feito para plataformas mobile.                                                                    |
| RQNF08 | O sistema deverá enviar a recuperação de senha pelo email institucional do estudante.                                                                   |
| RQNF09 | O sistema deverá possuir um termo de política e privacidade.                                                                  |
