const bancoDeDados = require('./dados/bancodedados');
const { contas } = require('./dados/bancodedados');

const validaSenha = (req, res, next) => {
  const { senha_banco } = req.query;
  if (senha_banco !== 'Cubos123Bank') {
    return res
      .status(401)
      .json({ mensagem: 'A senha do banco informada é inválida!' });
  }
  next();
};

const validaContaESenha = (req, res, next) => {
  const numero_conta = Number(req.query.numero_conta);
  const senha = req.query.senha;

  const contaEncontrada = bancoDeDados.contas.find(
    (conta) => conta.numero === numero_conta,
  );
  if (!contaEncontrada) {
    return res.status(404).json({ mensagem: 'Conta bancária não encontada!' });
  }
  if (contaEncontrada.usuario.senha !== senha) {
    return res.status(401).json({ mensagem: 'Senha inválida.' });
  }
  next();
};

const validaDeposito = (req, res, next) => {
  const numero_conta = Number(req.body.numero_conta);
  const valor = Number(req.body.valor);

  const conta = bancoDeDados.contas.find(
    (conta) => conta.numero === numero_conta,
  );

  if (!conta) {
    return res.status(404).json({ mensagem: 'Conta não encontrada.' });
  }
  if (!valor || valor < 0) {
    return res.status(400).json({
      mensagem: 'O campo valor precisa ser informado com valor maior que 0.',
    });
  }

  next();
};

module.exports = { validaSenha, validaContaESenha, validaDeposito };
