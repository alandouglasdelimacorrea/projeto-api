const mysql = require('../mysql').pool;

exports.getVagas = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Vagas;',
            (error, result, field) => {
                conn.release();
                const response = {
                    registros: result.map(registro => {
                        return {
                            id_vagas: registro.insertId,
                            titulo: registro.titulo,
                            salario: registro.salario,
                            descricao: registro.descricao,
                            empresas_id: registro.empresas_id_fk,
                            request: {
                                tipo: 'GET',
                                descricão: 'Lista todos os dados da tabela Vagas.',
                                url: 'http://localhost:3000/vagas/' + registro.id_vagas
                            }
                        }
                    })
                }
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send(response)
            }
        )
    })
}

exports.postVagas = (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) } 
        conn.query(
            'INSERT INTO Vagas (titulo, salario, descricao, empresas_id_fk) VALUES (?,?,?,?)',
            [ 
                req.body.titulo, 
                req.body.salario, 
                req.body.descricao, 
                req.body.empresas_id
            ],
            
            (error, result, field) => {
                conn.release();
                const response = {
                    mensagem: 'Empresa inserida com sucesso.',
                    registroCriado: {
                        titulo: req.body.titulo,
                        salario: req.body.salario, 
                        descricao: req.body.descricao, 
                        empresas_id_fk: req.body.empresas_id
                    },
                    request: {
                        tipo: 'POST',
                        descricão: 'Cria um registro de uma vaga na tabela Vagas.',
                        url: 'http://localhost:3000/vagas'
                    }
                }
                
                if (error) { return res.status(500).send({ error: error }) };
                res.status(201).send( response );
            }
        )
    })
}

exports.deleteVagas = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'DELETE FROM Vagas WHERE id_vagas = ?;',
            [req.body.id_vagas],
            (error, result, field) => {
                conn.release();
                const response = {
                    mensagem: 'Vaga deletada com sucesso.',
                    registroDeletado: {
                        id_vagas: req.body.id_vagas,
                        titulo: req.body.titulo,
                        salario: req.body.salario, 
                        descricao: req.body.descricao, 
                        empresas_id_fk: req.body.empresas_id
                    },
                    request: {
                        tipo: 'DELETE',
                        descricão: 'Deleta um registro de uma vaga da tabela Vagas.',
                        url: 'http://localhost:3000/vagas'
                    }
                }
                if (error) { return res.status(500).send({ error: error }) };
                return res.status(202).send( response );
            }
        )
    })

}

exports.patchVagas = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            `UPDATE Vagas
                SET titulo = ?,
                    salario = ?,
                    descricao = ?,
                    empresas_id_fk = ?
              WHERE id_vagas = ?`,
                [ 
                    req.body.titulo, 
                    req.body.salario, 
                    req.body.descricao, 
                    req.body.empresas_id,
                    req.body.id_vagas
                ],
            (error, result, field) => {
                conn.release();
                const response = {
                    mensagem: 'Vaga atualizada com sucesso.',
                    registroAtualizado: {
                        titulo: req.body.titulo, 
                        salario: req.body.salario, 
                        descricao: req.body.descricao, 
                        empresas_id_fk: req.body.empresas_id,
                        id_vagas: req.body.id_vagas 
                    },
                    request: {
                        tipo: 'PATCH',
                        descricão: 'Atualiza um registro de uma vaga da tabela Vagas.',
                        url: 'http://localhost:3000/vagas/' + req.body.id_vagas
                    }
                }
                if (error) { return res.status(500).send({ error: error }) };
                return res.status(201).send( response );
            }
        )
    })

}
