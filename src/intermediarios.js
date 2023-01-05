const bancoDeDados = require('./dados/bancodedados');
const { buscarConta } = require('./utilitarios');

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

  const conta = buscarConta(numero_conta, bancoDeDados.contas);

  if (!numero_conta || !senha) {
    return res.status(400).json({
      mensagem: `Os campos 'numero_conta' e 'senha' são obrigatórios`,
    });
  }
  if (!conta) {
    return res.status(404).json({ mensagem: 'Conta bancária não encontada!' });
  }
  if (conta.usuario.senha !== senha) {
    return res.status(401).json({ mensagem: 'Senha inválida.' });
  }
  next();
};

const validaDeposito = (req, res, next) => {
  const numero_conta = Number(req.body.numero_conta);
  const valor = Number(req.body.valor);

  const conta = buscarConta(numero_conta, bancoDeDados.contas);

  if (!conta) {
    return res.status(404).json({ mensagem: 'Conta não encontrada.' });
  }
  if (!valor || valor < 0) {
    return res.status(400).json({
      mensagem: 'O valor informado precisa ser maior que 0.',
    });
  }

  next();
};

const validaSaque = (req, res, next) => {
  const numero_conta = Number(req.body.numero_conta);
  const valor = Number(req.body.valor);
  const senha = req.body.senha;

  const conta = buscarConta(numero_conta, bancoDeDados.contas);

  if (!numero_conta || !valor || !senha) {
    return res.status(400).json({
      mensagem: `Os campos 'numero_conta', 'valor' e 'senha' são obrigatórios.`,
    });
  }

  if (!conta) {
    return res.status(404).json({ mensagem: 'Conta não encontrada.' });
  }
  if (conta.usuario.senha !== senha) {
    return res.status(401).json({ mensagem: 'Senha inválida.' });
  }
  if (!valor || valor < 0) {
    return res.status(400).json({
      mensagem: 'O valor informado precisa ser maior que 0.',
    });
  }
  if (valor > conta.saldo) {
    return res.status(400).json({
      mensagem: 'Saldo insuficiente.',
    });
  }

  next();
};

const validaTransferencia = (req, res, next) => {
  const numero_conta_origem = Number(req.body.numero_conta_origem);
  const numero_conta_destino = Number(req.body.numero_conta_destino);
  const valor = Number(req.body.valor);
  const senha = req.body.senha;

  const contaOrigem = buscarConta(numero_conta_origem, bancoDeDados.contas);
  const contaDestino = buscarConta(numero_conta_destino, bancoDeDados.contas);

  if (!(numero_conta_origem && numero_conta_destino && valor && senha)) {
    return res.status(400).json({
      mensagem: `Os campos 'numero_conta_origem', 'numero_conta_destino', 'valor' e 'senha' são obrigatórios.`,
    });
  }

  if (!contaOrigem) {
    return res
      .status(404)
      .json({ mensagem: 'Conta de origem não encontrada.' });
  }
  if (!contaDestino) {
    return res
      .status(404)
      .json({ mensagem: 'Conta de destino não encontrada.' });
  }
  if (contaOrigem.usuario.senha !== senha) {
    return res.status(401).json({ mensagem: 'Senha inválida.' });
  }
  if (valor < 0) {
    return res.status(400).json({
      mensagem: 'O valor informado precisa ser maior que 0.',
    });
  }
  if (valor > contaOrigem.saldo) {
    return res.status(400).json({
      mensagem: 'Saldo insuficiente.',
    });
  }

  next();
};

module.exports = {
  validaSenha,
  validaContaESenha,
  validaDeposito,
  validaSaque,
  validaTransferencia,
};
