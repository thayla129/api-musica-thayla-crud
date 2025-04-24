/*
* Objetivo: Model responsável pelo CRUD de dados de gênero no Banco de Dados 
* Data: 24\04\2025
* Autor: Thayla Amorim Mateus
* Versão: 1.0
*/

// Import da biblioteca Prisma/Client
const { PrismaClient } = require('@prisma/client')

// Instanciando o objeto para manipulação do SQL
const prisma = new PrismaClient()

// Função para inserir um novo gênero no banco de dados
const insertGenero = async function(genero) {
    try {
        let sql = `insert into genero (
                    nome,
                    descricao
                ) values (
                    '${genero.nome}',
                    ${genero.descricao ? `'${genero.descricao}'` : 'null'}
                )`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error(error)
        return false
    }
}

// Função para atualizar um gênero existente no banco de dados
const updateGenero = async function(genero) {
    try {
        let sql = `update tbl_genero set 
                    nome = '${genero.nome}',
                    descricao = ${genero.descricao ? `'${genero.descricao}'` : 'null'}
                   where id = ${genero.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error(error)
        return false
    }
}

// Função para excluir um gênero existente no banco de dados
const deleteGenero = async function(id) {
    try {
        let sql = `delete from tbl_genero where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error(error)
        return false
    }
}

// Função para retornar todos os gêneros do banco de dados
const selectAllGeneros = async function() {
    try {
        let sql = 'select * from tbl_genero order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        if(result) {
            return result
        } else {
            return false
        }
    } catch (error) {
        console.error(error)
        return false
    }
}

// Função para buscar um gênero pelo ID no banco de dados
const selectGeneroById = async function(id) {
    try {
        let sql = `select * from tbl_genero where id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)

        if(result && result.length > 0) {
            return result[0] // Retorna o primeiro elemento do array
        } else {
            return false
        }
    } catch (error) {
        console.error(error)
        return false
    }
}

// Função para buscar um gênero pelo nome no banco de dados
const selectGeneroByNome = async function(nome) {
    try {
        let sql = `select * from tbl_genero where nome = '${nome}'`
        let result = await prisma.$queryRawUnsafe(sql)

        if(result && result.length > 0) {
            return result[0] // Retorna o primeiro elemento do array
        } else {
            return false
        }
    } catch (error) {
        console.error(error)
        return false
    }
}

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGeneros,
    selectGeneroById,
    selectGeneroByNome
}