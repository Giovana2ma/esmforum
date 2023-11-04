const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando acesso de uma pergunta', () => {
  const id_pergunta = modelo.cadastrar_pergunta('1 + 1 = ?');
  const pergunta = modelo.get_pergunta(id_pergunta); 
  expect(pergunta.texto).toBe('1 + 1 = ?');
});

test('Testando cadastro de três respostas', () => {
  const id_perg1 = modelo.cadastrar_pergunta('1 + 1 = ?');
  const id_perg2 = modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_resposta(id_perg1,'2');
  modelo.cadastrar_resposta(id_perg2,'4');
  modelo.cadastrar_resposta(id_perg2,'5');
  const num_resp1 = modelo.get_num_respostas(id_perg1);
  const num_resp2 = modelo.get_num_respostas(id_perg2);
  expect(num_resp1).toBe(1);
  expect(num_resp2).toBe(2);
  const resp1 = modelo.get_respostas(id_perg1);
  const resp2 = modelo.get_respostas(id_perg2);
  expect(resp1[0].texto).toBe('2');
  expect(resp2[0].texto).toBe('4');
  expect(resp2[1].texto).toBe('5')
});
