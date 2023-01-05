module.exports = {
  banco: {
    nome: 'Cubos Bank',
    numero: '123',
    agencia: '0001',
    senha: 'Cubos123Bank',
  },
  contas: [
    {
      numero: 1,
      saldo: 1110,
      usuario: {
        nome: 'Foo Bar 1',
        cpf: '00011122231',
        data_nascimento: '2021-03-15',
        telefone: '71999998888',
        email: 'foo1@bar.com',
        senha: '12345',
      },
    },
    {
      numero: 2,
      saldo: 900,
      usuario: {
        nome: 'Foo Bar 2',
        cpf: '00011122232',
        data_nascimento: '2021-03-15',
        telefone: '71999998888',
        email: 'foo2@bar.com',
        senha: '12345',
      },
    },
  ],
  saques: [
    {
      data: '2023-01-05T12:23:18-03:00',
      numero_conta: 1,
      valor: 90,
    },
    {
      data: '2023-01-05T12:23:21-03:00',
      numero_conta: 1,
      valor: 200,
    },
    {
      data: '2023-01-05T12:23:24-03:00',
      numero_conta: 1,
      valor: 1000,
    },
    {
      data: '2023-01-05T12:25:19-03:00',
      numero_conta: 2,
      valor: 200,
    },
    {
      data: '2023-01-05T12:25:24-03:00',
      numero_conta: 2,
      valor: 450,
    },
    {
      data: '2023-01-05T12:25:27-03:00',
      numero_conta: 2,
      valor: 1250,
    },
  ],
  depositos: [
    {
      data: '2023-01-05T12:22:40-03:00',
      numero_conta: 1,
      valor: 100,
    },
    {
      data: '2023-01-05T12:22:42-03:00',
      numero_conta: 1,
      valor: 500,
    },
    {
      data: '2023-01-05T12:22:44-03:00',
      numero_conta: 1,
      valor: 700,
    },
    {
      data: '2023-01-05T12:22:47-03:00',
      numero_conta: 1,
      valor: 1100,
    },
    {
      data: '2023-01-05T12:24:52-03:00',
      numero_conta: 2,
      valor: 300,
    },
    {
      data: '2023-01-05T12:24:54-03:00',
      numero_conta: 2,
      valor: 800,
    },
    {
      data: '2023-01-05T12:24:56-03:00',
      numero_conta: 2,
      valor: 1700,
    },
  ],
  transferencias: [],
};
