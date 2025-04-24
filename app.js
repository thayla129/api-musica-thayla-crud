/**********************************************************************************************************************************************************************************
 * Objetivo: API responsável pelas requisições do projeto de controle música
 * Data: 13/02/2025
 * Autor: Thayla Amorim Mateus
 * Versões: 1.0
 ***********************************************************************************************************************************************************************************/

//Import das bibliotecas para criar a API 
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Import das controllers do projeto
const controllerMusica = require('./api-musica-app-main/controller/musica/controllerMusica.js')
const controllerGenero = require('./api-musica-app-main/controller/genero/controllerGenero.js')


//Cria o formato de dados que será recebido no body da requisição (POST/PUT)
const bodyParserJSON = bodyParser.json()

//Cria o objeto app para criar a API
const app = express()

//Configura as permissões do CORS
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())
    next()
})


/***********************
    ENDPOINT DA MUSICA
 **********************/


// Endpoint POST: Cadastra uma nova música
app.post('/v1/controle-musicas/musica', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await controllerMusica.inserirMusica(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Endpoint GET: Lista todas as músicas cadastradas
app.get('/v1/controle-musicas/musica', cors(), async function (request, response) {
    let result = await controllerMusica.listarMusica()

    response.status(result.status_code)
    response.json(result)
})

// Endpoint GET: Busca uma música específica pelo ID
app.get('/v1/controle-musicas/musica/:id', cors(), async function (request, response) {
    let idMusica = request.params.id
    let result = await controllerMusica.buscarMusica(idMusica)

    response.status(result.status_code)
    response.json(result)
})

// Endpoint DELETE: Exclui uma música do sistema
app.delete('/v1/controle-musicas/musica/:id', cors(), async function (request, response) {
    let idMusica = request.params.id
    let result = await controllerMusica.excluirMusica(idMusica)

    response.status(result.status_code)
    response.json(result)
})

// Endpoint PUT: Atualiza os dados de uma música existente

app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let idMusica = request.params.id
    let dadosBody = request.body

    let result = await controllerMusica.atualizarMusica(dadosBody, idMusica, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

/***********************
    ENDPOINT DE GÊNERO
 ***********************/

// POST - Cadastrar novo gênero
app.post('/v1/controle-musicas/genero', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let result = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

// GET - Listar todos os gêneros
app.get('/v1/controle-musicas/genero', cors(), async function (request, response) {
    let result = await controllerGenero.listarGeneros()
    console.log(result)


    response.status(result.status_code)
    response.json(result)
})

// GET - Buscar gênero por ID
app.get('/v1/controle-musicas/genero/:id', cors(), async function (request, response) {
    let idGenero = request.params.id
    let result = await controllerGenero.buscarGenero(idGenero)

    response.status(result.status_code)
    response.json(result)
})

// PUT - Atualizar gênero por ID
app.put('/v1/controle-musicas/genero/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let idGenero = request.params.id
    let dadosBody = request.body

    let result = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(result.status_code)
    response.json(result)
})

// DELETE - Excluir gênero por ID
app.delete('/v1/controle-musicas/genero/:id', cors(), async function (request, response) {
    let idGenero = request.params.id
    let result = await controllerGenero.excluirGenero(idGenero)

    response.status(result.status_code)
    response.json(result)
})





//Inicia o servidor na porta 8080
app.listen(8080, function() {
    console.log('Servidor aguardando novas requisições....')
})