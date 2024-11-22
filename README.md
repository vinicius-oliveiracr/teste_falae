# teste_falae
Projeto destinado à realização do teste para seleção do estágio da Falaê

CONFIGURAÇÃO

Processo de configuração:
    -BACK-END
        - `npm install` para obtenção das dependências utilizadas
        - `npm run dev` para inicializar o back-end
    -FRONT-END
        -`cd frontend` para entrar na pasta onde foram desenvolvidas as telas
        -`npm install` para obtenção das dependências utilizadas
        -`npm run dev` para inicializar o front-end




BACK-END

O back-end do projeto foi desenvolvido utilizando Fastify, Prisma ORM e banco de dados SQL

Nele, são configuradas rotas para

- USUÁRIOS
        -Cadastro de Usuários através do endpoint(método POST): "http://localhost:3333/api/auth/register"

- PRODUTOS
        -Cadastro de produtos no banco de dados(método POST):"http://localhost:3333/api/products/create"
        -Obtenção de todos os produtos cadastrados no banco de dados (método GET): "http://localhost:3333/api/products"
        -Obtenção de detalhes sobre um produto(método GET): "http://localhost:3333/api/products/{Id}", onde o Id é um valor numérico gerado pelo banco de dados
        -Atualização de informações sobre um produto (método PUT): "http://localhost:3333/api/products/{Id}", onde Id é um valor numérico gerado pelo banco de dados
        -Deleção de um produto do banco de dados (método DELETE): "http://localhost:3333/api/products/{Id}", onde Id é um valor numérico gerado pelo banco de dados

- PEDIDOS
        -Cadastro de pedido através do endpoint(método POST):"http://localhost:3333/api/orders/create"
        -Obtenção de todos os pedidos cadastrados no banco de dados (método GET): "http://localhost:3333/api/orders/"
        -Obtenção de detalhes sobre um produto(método GET): "http://localhost:3333/api/orders/{Id}", onde o Id é um UUID gerado pelo banco de dados
        -Atualização de informações sobre um produto (método PUT): "http://localhost:3333/api/products/{Id}", onde Id é um UUID gerado pelo banco de dados
        -Deleção de um produto do banco de dados (método DELETE): "http://localhost:3333/api/products/{Id}", onde Id é um UUID gerado pelo banco de dados

FRONT-END
O front-end foi desenvolvido utilizando React, inicializado com Vite e Typescript.