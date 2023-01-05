const bancoDeDados = require('../dados/bancodedados');
const { buscarConta } = require('../utilitarios');
const buscarContas = (req, res) => {
  res.status(200).json(bancoDeDados.contas);
};

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  const numeroDaConta = bancoDeDados.contas.length + 1;

  if (!nome) {
    return res
      .status(400)
      .json({ mensagem: 'O campo nome deve ser informado.' });
  }
  if (!data_nascimento) {
    return res
      .status(400)
      .json({ mensagem: 'A data de nascimento deve ser informada.' });
  }
  if (!telefone) {
    return res.status(400).json({ mensagem: 'O telfone deve ser informado.' });
  }
  if (!senha) {
    return res.status(400).json({ mensagem: 'A senha deve ser informada.' });
  }
  if (!cpf) {
    return res.status(400).json({ mensagem: 'O cpf deve ser informado.' });
  }
  if (!email) {
    return res.status(400).json({ mensagem: 'O email deve ser informado.' });
  }
  if (!cpfEhValido(cpf)) {
    return res.status(400).json({
      mensagem: 'O cpf informado já está cadastrado.',
    });
  }
  if (!emailEhValido(email)) {
    return res
      .status(400)
      .json({ mensagem: 'O email informado já está cadastrado.' });
  }

  const novaConta = {
    numero: numeroDaConta,
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };

  bancoDeDados.contas.push(novaConta);

  res.status(201).send();
};

const atualizarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  const numeroConta = Number(req.params.numeroConta);
  if (!nome) {
    return res
      .status(400)
      .json({ mensagem: 'O campo nome deve ser informado.' });
  }
  if (!data_nascimento) {
    return res
      .status(400)
      .json({ mensagem: 'A data de nascimento deve ser informada.' });
  }
  if (!telefone) {
    return res.status(400).json({ mensagem: 'O telfone deve ser informado.' });
  }
  if (!senha) {
    return res.status(400).json({ mensagem: 'A senha deve ser informada.' });
  }
  if (!cpf) {
    return res.status(400).json({ mensagem: 'O cpf deve ser informado.' });
  }
  if (!email) {
    return res.status(400).json({ mensagem: 'O email deve ser informado.' });
  }
  if (!existeConta(numeroConta)) {
    return res.status(400).json({ mensagem: 'Conta inválida.' });
  }

  const buscaPorCpf = bancoDeDados.contas.find(
    (conta) => conta.usuario.cpf === cpf,
  );
  if (buscaPorCpf && buscaPorCpf.numero !== numeroConta) {
    return res
      .status(400)
      .json({ mensagem: 'O cpf informado já está cadastrado.' });
  }

  const buscaPorEmail = bancoDeDados.contas.find(
    (conta) => conta.usuario.email === email,
  );

  if (buscaPorEmail && buscaPorEmail.numero !== numeroConta) {
    return res
      .status(400)
      .json({ mensagem: 'O e-mail informado já está cadastrado.' });
  }

  const conta = bancoDeDados.contas.find(
    (conta) => conta.numero === Number(numeroConta),
  );

  conta.usuario.nome = nome;
  conta.usuario.data_nascimento = data_nascimento;
  conta.usuario.telefone = telefone;
  conta.usuario.senha = senha;
  conta.usuario.cpf = cpf;
  conta.usuario.email = email;

  return res.status(200).send();
};

const excluirConta = (req, res) => {
  const numeroConta = Number(req.params.numeroConta);
  const contaEncontrada = bancoDeDados.contas.find(
    (conta) => conta.numero === numeroConta,
  );
  if (!contaEncontrada) {
    return res.status(404).json({ mensagem: 'Conta não encontrada.' });
  }
  if (contaEncontrada.saldo !== 0) {
    return res
      .status(404)
      .json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
  }
  const index = bancoDeDados.contas.findIndex(
    (conta) => conta.numero === numeroConta,
  );
  bancoDeDados.contas.splice(index, 1);
  res.status(204).send();
};

const consultarSaldo = (req, res) => {
  const numero_conta = Number(req.query.numero_conta);
  const conta = bancoDeDados.contas.find(
    (conta) => conta.numero === numero_conta,
  );

  return res.status(200).json({ saldo: conta.saldo });
};

const consultarExtrato = (req, res) => {
  const numero_conta = Number(req.query.numero_conta);

  const depositos = bancoDeDados.depositos.filter(
    (deposito) => deposito.numero_conta === numero_conta,
  );
  const saques = bancoDeDados.saques.filter(
    (saque) => saque.numero_conta === numero_conta,
  );
  const transferenciasEnviadas = bancoDeDados.transferencias.filter(
    (transferencia) => transferencia.numero_conta_origem === numero_conta,
  );
  const transferenciasRecebidas = bancoDeDados.transferencias.filter(
    (transferencia) => transferencia.numero_conta_destino === numero_conta,
  );

  const resposta = {
    depositos,
    saques,
    transferenciasEnviadas,
    transferenciasRecebidas,
  };

  return res.status(200).json(resposta);
};

function cpfEhValido(cpf) {
  return !bancoDeDados.contas.find((conta) => conta.usuario.cpf === cpf);
}

function emailEhValido(email) {
  return !bancoDeDados.contas.find((conta) => conta.usuario.email === email);
}

function existeConta(numero) {
  return !!bancoDeDados.contas.find((conta) => conta.numero === numero);
}

module.exports = {
  buscarContas,
  criarConta,
  atualizarConta,
  excluirConta,
  consultarSaldo,
  consultarExtrato,
};
