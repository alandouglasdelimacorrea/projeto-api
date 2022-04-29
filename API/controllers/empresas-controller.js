const mysql = require('../mysql').pool;

exports.getEmpresas = (req, res, next) => {
        
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM Empresas;',
            (error, result, field) => {
                conn.release();
                const response = {
                    registros: result.map(registro => {
                        return {
                            id_empresas: registro.id_empresas,
                            nome: registro.nome,
                            request: {
                                tipo: 'GET',
                                descricão: 'Lista todos os dados da tabela Empresas.',
                                url: 'http://localhost:3000/empresas/' + registro.id_empresas
                            }
                        }
                    })
                }
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send( response )
            }
        )
    })
}

exports.postEmpresas = (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO Empresas (id_empresas, nome) VALUES (?,?)',
            [req.body.id_empresas, req.body.nome],
            (error, result, field) => {
                conn.release();
                const response = {
                    mensagem: 'Empresa inserida com sucesso.',
                    registroCriado: {
                        id_empresas: result.id_empresas,
                        nome: req.body.nome
                    },
                    request: {
                        tipo: 'POST',
                        descricão: 'Cria um registro de uma empresa na tabela Empresas.',
                        url: 'http://localhost:3000/empresas'
                    }
                }
                
                if (error) { return res.status(500).send({ error: error }) };
                res.status(201).send( response );
            }
        )
    })
}

exports.deleteEmpresas = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'DELETE FROM Empresas WHERE id_empresas = ?;',
            [req.body.id_empresas],
            (error, result, field) => {
                conn.release();
                const response = {
                    mensagem: 'Empresa deletada com sucesso.',
                    registroDeletado: {
                        id_empresas: req.body.id_empresas,
                        nome: req.body.nome
                    },
                    request: {
                        tipo: 'DELETE',
                        descricão: 'Deleta um registro de uma empresa da tabela Empresas.',
                        url: 'http://localhost:3000/empresas'
                    }
                }
                if (error) { return res.status(500).send({ error: error }) };
                return res.status(202).send( response );
            }
        )
    })
}

exports.patchEmpresas = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            `UPDATE   Empresas
                SET   nome           = ?
                WHERE id_empresas    = ?   `,
            [req.body.nome, req.body.id_empresas],
            (error, result, field) => {
                conn.release();
                const response = {
                    mensagem: 'Empresa atualizada com sucesso.',
                    registroAtualizado: {
                        id_empresas: req.body.id_empresas,
                        nome: req.body.nome
                    },
                    request: {
                        tipo: 'PATCH',
                        descricão: 'Atualiza um registro de uma empresa da tabela Empresas.',
                        url: 'http://localhost:3000/empresas/' + req.body.id_empresas
                    }
                }
                if (error) { return res.status(500).send({ error: error }) };
                return res.status(201).send( response );
            }
        )
    })
}
