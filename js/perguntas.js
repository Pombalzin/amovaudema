/**
 * Banco de questões — Geografia e História.
 *
 * Cada questão tem sempre 4 alternativas. O app embaralha as alternativas
 * toda vez que a questão é exibida, então a posição da resposta muda a cada
 * tentativa e não dá para decorar a letra.
 */

const BANCO_DE_QUESTOES = [
  /* ------------------------- GEOGRAFIA ------------------------- */
  {
    id: 'geo-01',
    categoria: 'Geografia',
    pergunta: 'Qual é a capital do estado do Pará?',
    alternativas: ['Belém', 'Manaus', 'Rio Branco', 'Porto Velho'],
    correta: 0,
    explicacao:
      'Belém é a capital do Pará. Fica no extremo norte do estado, na foz do rio Guajará, e é conhecida como a Cidade das Mangueiras e pela fartura de açaí.',
  },
  {
    id: 'geo-02',
    categoria: 'Geografia',
    pergunta: 'Qual é o maior bioma brasileiro em extensão territorial?',
    alternativas: ['Caatinga', 'Pantanal', 'Floresta Amazônica', 'Mata Atlântica'],
    correta: 2,
    explicacao:
      'A Floresta Amazônica ocupa cerca de 4,5 milhões de km², sendo o maior bioma do Brasil. A Caatinga é o segundo maior e é o único bioma exclusivo do país.',
  },
  {
    id: 'geo-03',
    categoria: 'Geografia',
    pergunta: 'Qual é o maior estado brasileiro em extensão territorial?',
    alternativas: ['Pará', 'Mato Grosso', 'Amazonas', 'Minas Gerais'],
    correta: 2,
    explicacao:
      'O Amazonas tem aproximadamente 1.560 mil km² de área — quase o tamanho do México. O Pará é o segundo maior.',
  },
  {
    id: 'geo-04',
    categoria: 'Geografia',
    pergunta: 'Qual região do Brasil concentra a maior parte da população?',
    alternativas: ['Sul', 'Nordeste', 'Centro-Oeste', 'Sudeste'],
    correta: 3,
    explicacao:
      'O Sudeste abriga mais da metade dos brasileiros, graças aos grandes centros como São Paulo, Rio de Janeiro, Belo Horizonte e Campinas.',
  },
  {
    id: 'geo-05',
    categoria: 'Geografia',
    pergunta:
      'Qual serra se estende pelo litoral dos estados de São Paulo, Rio de Janeiro e Espírito Santo?',
    alternativas: ['Serra da Mantiqueira', 'Serra do Mar', 'Serra do Cerrado', 'Serra Geral'],
    correta: 1,
    explicacao:
      'A Serra do Mar acompanha o litoral desses três estados e separa o litoral do planalto atlântico. A Mantiqueira é o divisor de águas entre o litoral e o interior.',
  },
  {
    id: 'geo-06',
    categoria: 'Geografia',
    pergunta: 'Qual é a capital do estado do Maranhão?',
    alternativas: ['Teresina', 'São Luís', 'Fortaleza', 'Natal'],
    correta: 1,
    explicacao:
      'São Luís é a única capital brasileira fundada por franceses e a única capital de estado insular, localizada numa ilha.',
  },
  {
    id: 'geo-07',
    categoria: 'Geografia',
    pergunta: 'Qual capital da Região Norte é conhecida como a "Cidade das Mangueiras"?',
    alternativas: ['Boa Vista', 'Palmas', 'Macapá', 'Rio Branco'],
    correta: 2,
    explicacao:
      'Macapá, capital do Amapá, tem o maior manguezal urbano do mundo e fica no Equador — é a única capital brasileira situada no hemisfério norte.',
  },
  {
    id: 'geo-08',
    categoria: 'Geografia',
    pergunta: 'Qual é o maior rio do mundo em volume de água?',
    alternativas: ['Rio Nilo', 'Rio Amazonas', 'Rio Yangtzé', 'Rio Mississippi'],
    correta: 1,
    explicacao:
      'O Amazonas despeja no oceano cerca de 20% de toda a água doce dos rios do mundo — mais que os dez maiores rios somados.',
  },
  {
    id: 'geo-09',
    categoria: 'Geografia',
    pergunta: 'Qual é o maior oceano do planeta?',
    alternativas: ['Oceano Atlântico', 'Oceano Índico', 'Oceano Pacífico', 'Oceano Ártico'],
    correta: 2,
    explicacao:
      'O Pacífico cobre cerca de um terço da superfície da Terra, com aproximadamente 165 milhões de km².',
  },
  {
    id: 'geo-10',
    categoria: 'Geografia',
    pergunta: 'Qual é o menor continente do mundo?',
    alternativas: ['Europa', 'Oceania', 'América do Sul', 'África'],
    correta: 1,
    explicacao:
      'A Oceania tem cerca de 8,5 milhões de km² e é o menor continente. A Europa é o segundo menor, com aproximadamente 10,2 milhões de km².',
  },
  {
    id: 'geo-11',
    categoria: 'Geografia',
    pergunta: 'A Linha do Equador divide a Terra em quais hemisférios?',
    alternativas: ['Norte e Sul', 'Leste e Oeste', 'Oriental e Ocidental', 'Superior e Inferior'],
    correta: 0,
    explicacao:
      'O Equador separa o Hemisfério Norte do Sul. O meridiano de Greenwich separa o hemisfério oriental (leste) do ocidental (oeste).',
  },
  {
    id: 'geo-12',
    categoria: 'Geografia',
    pergunta: 'Qual é a capital do Canadá?',
    alternativas: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'],
    correta: 2,
    explicacao:
      'Ottawa é a capital do Canadá desde 1857. Toronto é a maior cidade do país, mas não é a capital.',
  },
  {
    id: 'geo-13',
    categoria: 'Geografia',
    pergunta: 'Quantos fusos horários existem no mundo?',
    alternativas: ['12', '24', '36', '48'],
    correta: 1,
    explicacao:
      'A Terra é dividida em 24 fusos horários de 15 graus cada, porque gira 360 graus em 24 horas.',
  },
  {
    id: 'geo-14',
    categoria: 'Geografia',
    pergunta: 'Qual é o principal rio que percorre a região Nordeste do Brasil?',
    alternativas: ['São Francisco', 'Tietê', 'Paraná', 'Amazonas'],
    correta: 0,
    explicacao:
      'O São Francisco é o maior e mais importante rio do Nordeste, cortando Bahia, Minas Gerais, Sergipe, Alagoas e Pernambuco.',
  },
  {
    id: 'geo-15',
    categoria: 'Geografia',
    pergunta: 'Qual é a capital do Brasil?',
    alternativas: ['Rio de Janeiro', 'Salvador', 'Brasília', 'Belo Horizonte'],
    correta: 2,
    explicacao:
      'Brasília foi inaugurada em 21 de abril de 1960, com projeto do Lucio Costa. Planejada para substituir o Rio de Janeiro como capital.',
  },

  /* ------------------------- HISTÓRIA ------------------------- */
  {
    id: 'his-01',
    categoria: 'Historia',
    pergunta: 'Quem foi o primeiro presidente do Brasil?',
    alternativas: ['Floriano Peixoto', 'Deodoro da Fonseca', 'Getúlio Vargas', 'Tancredo Neves'],
    correta: 1,
    explicacao:
      'Deodoro da Fonseca proclamou a República em 15 de novembro de 1889 e chefiou o governo como primeiro presidente do país.',
  },
  {
    id: 'his-02',
    categoria: 'Historia',
    pergunta: 'Em que ano foi proclamada a República Brasileira?',
    alternativas: ['1888', '1889', '1891', '1824'],
    correta: 1,
    explicacao:
      'A República foi proclamada em 15 de novembro de 1889, encerrando o Segundo Reinado.',
  },
  {
    id: 'his-03',
    categoria: 'Historia',
    pergunta: 'Em que ano foi abolida a escravidão no Brasil?',
    alternativas: ['1888', '1870', '1890', '1850'],
    correta: 0,
    explicacao:
      'A Lei Áurea, sancionada em 13 de setembro de 1888, extinguiu a escravidão no Brasil.',
  },
  {
    id: 'his-04',
    categoria: 'Historia',
    pergunta: 'Qual documento extinguiu a escravidão no Brasil?',
    alternativas: [
      'Lei do Ventre Livre',
      'Lei Eusébio de Queirós',
      'Lei Áurea',
      'Carta Magna',
    ],
    correta: 2,
    explicacao:
      'A Lei Áurea aboliu a escravidão. A Lei do Ventre Livre (1871) já dava liberdade aos filhos de escravizadas, e a Lei Eusébio de Queirós (1850) proibiu o tráfico negreiro.',
  },
  {
    id: 'his-05',
    categoria: 'Historia',
    pergunta: 'Qual foi o período da Ditadura Militar no Brasil?',
    alternativas: ['1937 – 1945', '1954 – 1964', '1964 – 1985', '1990 – 1994'],
    correta: 2,
    explicacao:
      'A Ditadura Militar durou de 1964 a 1985, com o fim marcado pela Lei de Anistia.',
  },
  {
    id: 'his-06',
    categoria: 'Historia',
    pergunta: 'Em que ano foi promulgada a Constituição Federal vigente no Brasil?',
    alternativas: ['1985', '1988', '1991', '1967'],
    correta: 1,
    explicacao:
      'A Constituição de 1988 é a chamada "Constituição Cidadã", promulgada em 5 de outubro de 1988.',
  },
  {
    id: 'his-07',
    categoria: 'Historia',
    pergunta: 'Quem chefiou a expedição que chegou ao Brasil em 1500?',
    alternativas: [
      'Vasco da Gama',
      'Bartolomeu Dias',
      'Fernão de Magalhães',
      'Pedro Álvares Cabral',
    ],
    correta: 3,
    explicacao:
      'Pedro Álvares Cabral liderou a fleet que chegou à costa da Bahia em 22 de abril de 1500.',
  },
  {
    id: 'his-08',
    categoria: 'Historia',
    pergunta: 'Qual foi a primeira Constituição do Brasil?',
    alternativas: [
      'Carta Magna',
      'Constituição de 1891',
      'Constituição de 1937',
      'Constituição de 1824',
    ],
    correta: 0,
    explicacao:
      'A Carta Magna, outorgada em 1824, foi a primeira Constituição brasileira, vigente durante o Primeiro Reinado.',
  },
  {
    id: 'his-09',
    categoria: 'Historia',
    pergunta: 'Quem assinou a Lei Áurea em 1888?',
    alternativas: ['Dom Pedro II', 'Princesa Isabel', 'José Bonifácio', 'Rui Barbosa'],
    correta: 1,
    explicacao:
      'A Princesa Isabel assinou a Lei Áurea após forte pressão do movimento abolicionista, com o aval do imperador.',
  },
  {
    id: 'his-10',
    categoria: 'Historia',
    pergunta: 'Qual presidente ficou conhecido como o "homem da confiança" e o "coronel"?',
    alternativas: [
      'Juscelino Kubitschek',
      'João Goulart',
      'Getúlio Vargas',
      'Artur Bernardes',
    ],
    correta: 2,
    explicacao:
      'Getúlio Vargas governou entre 1930 e 1945 e, depois, entre 1951 e 1954. No Estado Novo (1937-1945), concentrou poderes com o apoio das Forças Armadas.',
  },
  {
    id: 'his-11',
    categoria: 'Historia',
    pergunta: 'Em que ano começou a Primeira Guerra Mundial?',
    alternativas: ['1914', '1918', '1904', '1939'],
    correta: 0,
    explicacao:
      'A guerra começou em 1914, após o assassinato do arquiduque da Áustria, Francisco Ferdinando.',
  },
  {
    id: 'his-12',
    categoria: 'Historia',
    pergunta: 'Em qual conflito o Brasil participou ao lado dos Aliados?',
    alternativas: ['Primeira Guerra Mundial', 'Segunda Guerra Mundial', 'Guerra Fria', 'Guerra do Vietnã'],
    correta: 1,
    explicacao:
      'O Brasil entrou na Segunda Guerra Mundial em 1942, ao lado dos Aliados, e enviou a Força Expedicionária Brasileira.',
  },
  {
    id: 'his-13',
    categoria: 'Historia',
    pergunta: 'Em que ano terminou a Segunda Guerra Mundial?',
    alternativas: ['1944', '1945', '1939', '1946'],
    correta: 1,
    explicacao:
      'A guerra terminou em 1945, com a rendição da Alemanha em maio e do Japão em setembro.',
  },
  {
    id: 'his-14',
    categoria: 'Historia',
    pergunta: 'Em que ano começou a Revolução Francesa?',
    alternativas: ['1776', '1789', '1815', '1688'],
    correta: 1,
    explicacao:
      'A Revolução Francesa começou em 1789, com a tomada da Bastilha, em 14 de julho.',
  },
  {
    id: 'his-15',
    categoria: 'Historia',
    pergunta: 'Em que ano caiu o Muro de Berlim?',
    alternativas: ['1989', '1991', '1985', '1979'],
    correta: 0,
    explicacao:
      'O Muro de Berlim caiu em 9 de novembro de 1989, marco do fim da Guerra Fria. A Alemanha foi reunificada no ano seguinte.',
  },
];
