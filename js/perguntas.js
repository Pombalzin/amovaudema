/**
 * Banco de questões — História.
 *
 * Cada questão guarda a RESPOSTA certa e um POOL de distratores. O app sorteia
 * 3 distratores diferentes a cada rodada e depois embaralha a ordem, então:
 *
 *   - as alternativas nunca são as mesmas duas rodadas seguidas;
 *   - a resposta certa muda de posição o tempo todo;
 *   - não dá para decorar a letra, tem que saber a matéria.
 */

const BANCO_DE_QUESTOES = [
  /* ============================== ANTIGUIDADE ============================== */
  {
    id: 'ant-01',
    categoria: 'Antiguidade',
    pergunta: 'Quem foi o primeiro imperador de Roma?',
    resposta: 'Augusto (Otávio)',
    distratores: ['Júlio César', 'Nero', 'Trajano', 'Constantino', 'Tibério', 'Pompeu'],
    explicacao:
      'Otávio, cognominado Augusto, venceu a guerra civil após a morte de Júlio César e foi coroado em 27 a.C., inaugurando o Principado, o primeiro período imperial de Roma.',
  },
  {
    id: 'ant-02',
    categoria: 'Antiguidade',
    pergunta: 'Em que cidade foi erguida a maior pirâmide do Egito Antigo?',
    resposta: 'Gizé',
    distratores: ['Luxor', 'Karnak', 'Mênfis', 'Saqqara', 'Abú Simbel'],
    explicacao:
      'A Grande Pirâmide de Gizé, erguida no IV dinastia para Quéops, tem cerca de 146 metros de altura e é a maior construção do Antigo Egito.',
  },
  {
    id: 'ant-03',
    categoria: 'Antiguidade',
    pergunta: 'Qual civilização inventou a escrita cuneiforme?',
    resposta: 'A suméria',
    distratores: ['A egípcia', 'A fenícia', 'A hitita', 'A minóica', 'A persa'],
    explicacao:
      'Os sumérios, na Mesopotâmia, gravaram em tablets de barro usando cunha. Derivados dessa escrita surgiram o acádio e o babilônio.',
  },
  {
    id: 'ant-04',
    categoria: 'Antiguidade',
    pergunta: 'Qual sistema de escrita os egípcios usavam em pedra e em papiros?',
    resposta: 'Hieróglifos',
    distratores: ['Cuneiforme', 'Alfabeto fenício', 'Linear A', 'Runas', 'Ogham'],
    explicacao:
      'A escrita egípcia usava hieróglifos, desenhos que representam sons. Os escribas também usavam a hierática, uma versão cursiva para documentos do dia a dia.',
  },
  {
    id: 'ant-05',
    categoria: 'Antiguidade',
    pergunta: 'Qual conjunto de reis expandiu o Império Persa Achemenida do Oriente ao Ocidente?',
    resposta: 'Ciro, Dario e Xerxes',
    distratores: [
      'Ramsés e Tutancâmon',
      'Nabucodonosor e Belshazzar',
      'Moisés e Josué',
      'Hamurábi e Samsi-Addu',
      'Aníbal e Escipião',
    ],
    explicacao:
      'Os três soberanos persas ampliaram o império a partir da Média e da Pérsia, chegando da Babilônia ao Egito e à Índia.',
  },
  {
    id: 'ant-06',
    categoria: 'Idade Moderna',
    pergunta: 'Quem formulou a teoria da gravitação universal e as três leis do movimento?',
    resposta: 'Isaac Newton',
    distratores: ['Galileu Galilei', 'Johannes Kepler', 'René Descartes', 'Christiaan Huygens', 'Roger Bacon'],
    explicacao:
      'Em 1687, Newton publicou os Principia, unificando o movimento dos corpos celestes e dos corpos terrrestres numa única lei de gravitação.',
  },
  {
    id: 'ant-07',
    categoria: 'Antiguidade',
    pergunta: 'Quem liderou a expedição espanhola que conquistou o Império Inca?',
    resposta: 'Francisco Pizarro',
    distratores: ['Hernán Cortés', 'Diogo Álvares Cabral', 'Pedro Álvares Cabral', 'Cabeza de Vaca', 'Gonzalo Pizarro'],
    explicacao:
      'Em 1532, Pizarro partiu do Panamá e, no ano seguinte, tomou Cuzco e capturou o imperador Atahualpa. Cortés havia sido quem conquistou o Império Asteca.',
  },
  {
    id: 'ant-08',
    categoria: 'Antiguidade',
    pergunta: 'Quem comandou os persas na Batalha de Maratona, em 490 a.C.?',
    resposta: 'Dario I',
    distratores: ['Xerxes I', 'Ciro, o Grande', 'Cambises', 'Artaxerxes I', 'Psáutilo'],
    explicacao:
      'Dario I enviou Datis e Artáfernes contra os atenienses. A vitória grega de Maratona é considerada um dos maiores revezes da História Antiga.',
  },
  {
    id: 'ant-09',
    categoria: 'Antiguidade',
    pergunta: 'Quem foi o general romano que derrotou Aníbal na Batalha de Zama?',
    resposta: 'Escipião Africano',
    distratores: ['Júlio César', 'Pompeu', 'Mário', 'Cato, o censor', 'Marco Antônio'],
    explicacao:
      'Em 202 a.C., Escipião derrotou Aníbal na África, encerrando a Segunda Guerra Púnica e consolidando o domínio romano sobre o Mediterrâneo.',
  },
  {
    id: 'ant-10',
    categoria: 'Antiguidade',
    pergunta: 'Quem liderou a grande revolta de escravizados contra Roma entre 73 e 71 a.C.?',
    resposta: 'Espártaco',
    distratores: ['Cato, o censor', 'Catilina', 'Cícero', 'Crasso', 'Sula'],
    explicacao:
      'A guerra dos escravizados foi a maior da história de Roma. Espártaco morreu em 71 a.C., mas sua revolta obrigou Roma a rever suas leis sobre a guerra e a escravidão.',
  },
  {
    id: 'ant-11',
    categoria: 'Antiguidade',
    pergunta: 'Quem foi o aluno mais famoso de Platão e mestre de Alexandre, o Grande?',
    resposta: 'Aristóteles',
    distratores: ['Sócrates', 'Heródoto', 'Pitágoras', 'Demócrito', 'Epicuro'],
    explicacao:
      'Aristóteles fundou o Liceu em Atenas e foi preceptor de Alexandre Magno. Criticava a teoria platônica de que o conhecimento das ideias vem antes das coisas.',
  },
  {
    id: 'ant-12',
    categoria: 'Antiguidade',
    pergunta: 'Qual povo germânico saqueou a cidade de Roma em 410 d.C.?',
    resposta: 'Os visigodos',
    distratores: ['Os vândalos', 'Os ostrogodos', 'Os hunos', 'Os francos', 'Os saxões'],
    explicacao:
      'Sob a liderança de Alarico, os visigodos pilharam Roma em 410. Foi a primeira vez em séculos que a chamada Cidade Eterna era saqueada.',
  },
  {
    id: 'ant-13',
    categoria: 'Antiguidade',
    pergunta: 'Quem é chamado de pai da História, segundo a tradição?',
    resposta: 'Heródoto',
    distratores: ['Tucídides', 'Xenofonte', 'Homero', 'Platão', 'Aristóteles'],
    explicacao:
      'Heródoto percorreu o Mediterrâneo e o Oriente e registrou o conflito grego-persa. Tucídides é considerado o pai da historiografia científica.',
  },
  {
    id: 'ant-14',
    categoria: 'Antiguidade',
    pergunta: 'Qual cidade romana foi soterrada pela erupção do Vesúvio em 79 d.C.?',
    resposta: 'Pompeia',
    distratores: ['Herculano', 'Ostriano', 'Capua', 'Benevento', 'Brundísio'],
    explicacao:
      'A erupção do Vesúvio preservou Pompeia, Herculano e Estábia sob cinzas vulcânicas, dando-nos um retrato quase intacto da vida romana.',
  },
  {
    id: 'ant-15',
    categoria: 'Antiguidade',
    pergunta: 'De qual povo os gregos adaptaram o alfabeto?',
    resposta: 'Dos fenícios',
    distratores: ['Dos egípcios', 'Dos sumérios', 'Dos persas', 'Dos hititas', 'Dos etruscos'],
    explicacao:
      'A Grécia Antiga não inventou a letra: adaptou o alfabeto fenício, ajustando os sinais para os sons do grego.',
  },
  {
    id: 'ant-16',
    categoria: 'Antiguidade',
    pergunta: 'Qual guerra opôs Atenas e Esparta?',
    resposta: 'A Guerra do Peloponeso',
    distratores: [
      'A Guerra das Persianas',
      'A Guerra dos Babilônios',
      'A Guerra dos Samnitas',
      'A Guerra Civil Romana',
      'A Guerra dos Etruscos',
    ],
    explicacao:
      'A Guerra do Peloponeso (431 a 404 a.C.) opôs a demosfera de Atenas ao poder militar de Esparta e terminou com a derrota ateniense.',
  },
  {
    id: 'ant-17',
    categoria: 'Antiguidade',
    pergunta: 'Qual império possuía a capital Cuzco e dominava a cordilheira dos Andes?',
    resposta: 'O Império Inca',
    distratores: ['O Império Asteca', 'O Império Maia', 'O Império Olmeca', 'O Império Tolteca', 'O Império Moche'],
    explicacao:
      'O Império Inca estendia-se por quatro mil quilômetros ao longo dos Andes, do=colambo Equador ao centro do Chile, com Cuzco como capital.',
  },
  {
    id: 'ant-18',
    categoria: 'Antiguidade',
    pergunta: 'Em que asteca tinha sua capital em Tenochtitlan?',
    resposta: 'Os astecas',
    distratores: ['Os incas', 'Os maias', 'Os olmecas', 'Os toltecas', 'Os quimbaya'],
    explicacao:
      'Tenochtitlan foi fundada em 1325 sobre um islote do lago Texcoco e chegou a ser uma das maiores cidades do mundo na época.',
  },
  {
    id: 'ant-19',
    categoria: 'Antiguidade',
    pergunta: 'Que documento gravado em estela foi o primeiro conjunto de leis escritas da História?',
    resposta: 'O Código de Hamurábi',
    distratores: ['As Leis de Drácon', 'As Leis de Platão', 'A Carta de Normandia', 'O Código de Justiniano', 'As Leis de Sólon'],
    explicacao:
      'O Código de Hamurábi, da Babilônia (cerca de 1754 a.C.), reúne 282 artigos e é uma das primeiras compilações escritas de leis da História.',
  },
  {
    id: 'ant-20',
    categoria: 'Antiguidade',
    pergunta: 'Quem projetou a pirâmide de degraus de Djoser, em Saqqara?',
    resposta: 'Imhotep',
    distratores: ['Senenmut', 'Unas', 'Bek', 'Hemiunu', 'Senusret'],
    explicacao:
      'Imhotep, depois deificado, é considerado o primeiro arquiteto de nome conhecido da História. A pirâmide de Djoser inaugurou a arquitetura egípcia em pedra.',
  },

  /* ========================= MUNDOS PRÉ-COLONIAIS ========================= */
  {
    id: 'pre-01',
    categoria: 'Mundos Pré-Coloniais',
    pergunta: 'Qual civilização andina ergueu a cidade de Machu Picchu?',
    resposta: 'Os incas',
    distratores: ['Os astecas', 'Os maias', 'Os olmecas', 'Os moche', 'Os nazcas'],
    explicacao:
      'Machu Picchu é uma cidade inca do século XV, a cerca de 2.400 metros de altitude nos Andes, e nunca foi vista pelos espanhóis.',
  },
  {
    id: 'pre-02',
    categoria: 'Mundos Pré-Coloniais',
    pergunta: 'Qual povo mesoamericano tinha sua capital em Tenochtitlan?',
    resposta: 'Os astecas',
    distratores: ['Os incas', 'Os maias', 'Os olmecas', 'Os toltecas', 'Os quimbaya'],
    explicacao:
      'Tenochtitlan foi fundada em 1325 sobre um islote do lago Texcoco e chegou a ser uma das maiores cidades do mundo na época.',
  },
  {
    id: 'pre-03',
    categoria: 'Mundos Pré-Coloniais',
    pergunta: 'Qual civilização antiga da América Central é conhecida pelas cabeças gigantes esculpidas em basalto?',
    resposta: 'A olmeca',
    distratores: ['A maia', 'A asteca', 'A inca', 'A moche', 'A mixteca'],
    explicacao:
      'Os olmecas, na zona do Golfo do México, esculpiam cabeças gigantes de basalto e são considerados uma das civilizações mais antigas das Américas.',
  },
  {
    id: 'pre-04',
    categoria: 'Mundos Pré-Coloniais',
    pergunta: 'Qual civilização mesoamericana ergueu Chichén Itzá, Tikal e Palenque?',
    resposta: 'A maia',
    distratores: ['A asteca', 'A inca', 'A olmeca', 'A tolteca', 'A mixteca'],
    explicacao:
      'A civilização maia floresceu no sul do México e na América Central. Tikal e Palenque são suas maiores cidades arqueológicas.',
  },
  {
    id: 'pre-05',
    categoria: 'Mundos Pré-Coloniais',
    pergunta: 'Qual império africano controlava o comércio do ouro e do sal no interior do Sahel?',
    resposta: 'O Império do Mali',
    distratores: ['O Império Aksum', 'O Antigo Egito', 'O Reino do Congo', 'O Império Ashanti', 'O Reino de Axum'],
    explicacao:
      'Controlando as rotas de Lake Chad ao Atlântico, o Mali floresceu entre os séculos XIII e XV. Mansa Musa é o soberano mais famoso.',
  },
  {
    id: 'pre-06',
    categoria: 'Mundos Pré-Coloniais',
    pergunta: 'Qual produto ocupava o lugar mais importante no comércio entre a Europa e a África Ocidental?',
    resposta: 'O tráfico de pessoas escravizadas',
    distratores: ['Ouro', 'Marfim', 'Sal', 'Pimenta', 'Cobre'],
    explicacao:
      'O tráfico negreiro foi o maior movimento comercial da história moderna. Ouro, marfim e sal funcionavam como moeda de troca.',
  },
  {
    id: 'pre-07',
    categoria: 'Mundos Pré-Coloniais',
    pergunta: 'Há cerca de quanto tempo os aborígenes australianos chegaram ao continente?',
    resposta: 'Cerca de 60 mil anos',
    distratores: ['Cerca de 5 mil anos', 'Cerca de 20 mil anos', 'Cerca de 150 mil anos', 'Cerca de 500 anos'],
    explicacao:
      'As datações indicam entre 50 e 70 mil anos, o que torna a Aboriginal Australia o processo contínuo de ocupação mais antigo do mundo.',
  },
  {
    id: 'pre-08',
    categoria: 'Mundos Pré-Coloniais',
    pergunta: 'Qual povo é o povo originário da Nova Zelândia?',
    resposta: 'O povo maori',
    distratores: ['O povo aborígena australiano', 'O povo havaiano', 'O povo maasai', 'O povo espartano', 'O povo inuit'],
    explicacao:
      'Os maori chegaram à Nova Zelândia por via marítima na Idade do Bronze, trazendo a língua, a cultura e a haka.',
  },
  {
    id: 'pre-09',
    categoria: 'Mundos Pré-Coloniais',
    pergunta: 'Qual era a capital do Império Inca?',
    resposta: 'Cusco',
    distratores: ['Tenochtitlan', 'Quito', 'Tiahuanaco', 'Machu Picchu', 'La Paz'],
    explicacao:
      'A civilização inca tinha o Inti, o Sol, como divindade principal, e se organizava em um império de quatro mil quilômetros de extensão.',
  },
  {
    id: 'pre-10',
    categoria: 'Mundos Pré-Coloniais',
    pergunta: 'Qual cultura andina tinha Tiwanaku como grande centro cerimonial, às margens do Lago Titicaca?',
    resposta: 'Tiwanaku',
    distratores: ['Machu Picchu', 'Tenochtitlan', 'Chichén Itzá', 'Cusco', 'Pachacamac'],
    explicacao:
      'Tiwanaku, às margens do Lago Titicaca, foi um importante centro ceremonial e comercial dos Andes anteriores aos incas.',
  },
  {
    id: 'pre-11',
    categoria: 'Mundos Pré-Coloniais',
    pergunta: 'Qual povo habitava a região que hoje corresponde ao norte do Brasil antes da chegada dos portugueses?',
    resposta: 'Os povos de língua tupi',
    distratores: ['Os xingues', 'Os aymarás', 'Os maoris', 'Os inuis', 'Os mapuches'],
    explicacao:
      'A faixa costeira do Brasil era habitada por povos tupi e guarani, que foram incorporados ao sistema colonial português.',
  },

  /* ============================== IDADE MÉDIA ============================== */
  {
    id: 'med-01',
    categoria: 'Idade Média',
    pergunta: 'Quem foi o profeta fundador do Islã?',
    resposta: 'Maomé (Muhammad)',
    distratores: ['Abu Bakr', 'Omar', 'Ali', 'Otmane', 'Harun al-Rashid'],
    explicacao:
      'Maomé, de Meca, começou a pregar por volta de 610 d.C. Após sua morte, Abu Bakr foi o primeiro califa.',
  },
  {
    id: 'med-02',
    categoria: 'Idade Média',
    pergunta: 'Qual cidade italiana dominava o comércio com o Oriente no Mediterrâneo medieval?',
    resposta: 'Veneza',
    distratores: ['Gênova', 'Pisa', 'Florença', 'Nápoles', 'Bolonha'],
    explicacao:
      'Veneza controlava as rotas das especiarias e era a porta da Europa para o Oriente. Gênova e Pisa foram suas principais concorrentes.',
  },
  {
    id: 'med-03',
    categoria: 'Idade Média',
    pergunta: 'O que caracterizava o sistema feudal?',
    resposta: 'A troca de terras por serviços militares e fidelidade',
    distratores: [
      'A troca de dinheiro por mão de obra',
      'O comércio de mercadorias',
      'A divisão do trabalho entre guilda e corporação',
      'A cobrança de impostos pela Igreja',
    ],
    explicacao:
      'O feudalismo se sustentava na relação entre senhores e vasalos: terra (o feudo) em troca de serviço militar e obediência.',
  },
  {
    id: 'med-04',
    categoria: 'Idade Média',
    pergunta: 'Qual evento de 1453 é apontado como o fim convencional da Idade Média?',
    resposta: 'A queda de Constantinopla',
    distratores: ['A queda de Roma', 'A descoberta da América', 'A assinatura da Magna Carta', 'A Batalha de Hastings', 'A coroação de Charlemagne'],
    explicacao:
      'Em 29 de maio de 1453, os otomanos tomaram Constantinopla, encerrando o Império Bizantino, marco tradicional do fim da Idade Média.',
  },
  {
    id: 'med-05',
    categoria: 'Idade Média',
    pergunta: 'Quem fundou o Império Mongol no século XIII?',
    resposta: 'Gêngis Khan',
    distratores: ['Kublai Khan', 'Tamerlão', 'Atila', 'Suleiman', 'Batu Khan'],
    explicacao:
      'Gêngis Khan unificou as tribos mongóis em 1206 e fundou o maior império terrestre da História, que ia da China à Europa Oriental.',
  },
  {
    id: 'med-06',
    categoria: 'Idade Média',
    pergunta: 'Em que ano a Magna Carta foi selada na Inglaterra?',
    resposta: '1215',
    distratores: ['1066', '1348', '1415', '1492', '1216'],
    explicacao:
      'O rei João, chamado de João Sem Terra, foi obrigado a selar a Magna Carta em 1215, limitando o poder real e exigindo um conselho do reino.',
  },
  {
    id: 'med-07',
    categoria: 'Idade Média',
    pergunta: 'Qual império é também conhecido como Império Romano do Oriente?',
    resposta: 'O Império Bizantino',
    distratores: ['O Império Persa', 'O Império Selêucida', 'O Sultanado Otomano', 'O Reino de Aksum', 'O Reino de Pérsia'],
    explicacao:
      'O Império Bizantino durou cerca de mil anos (330-1453) e tinha Constantinopla como capital. Os próprios habitantes o chamavam de Romanos.',
  },
  {
    id: 'med-08',
    categoria: 'Idade Média',
    pergunta: 'Qual cidade africana foi um grande centro de erudição e de manuscritos?',
    resposta: 'Timbuktu',
    distratores: ['Cairo', 'Meca', 'Marraquexe', 'Bagdá', 'Alexandria'],
    explicacao:
      'Com a Universidade de Sankore e uma rede de escribas que copiava manuscritos, Timbuktu chegou a ser um dos maiores centros de estudo do mundo islâmico.',
  },
  {
    id: 'med-09',
    categoria: 'Idade Média',
    pergunta: 'Quem liderou a Guerra dos Camponeses Alemães, em 1524-1525?',
    resposta: 'Thomas Müntzer',
    distratores: ['Martinho Lutero', 'Karl Marx', 'Ulrich von Hutten', 'Johannes Gutenberg', 'Frederico III'],
    explicacao:
      'Müntzer, pastor e revolucionário, liderou os camponeses alemães contra os senhores feudais. A revolta foi esmagada e ele foi executado.',
  },
  {
    id: 'med-10',
    categoria: 'Idade Média',
    pergunta: 'Qual papa convocou os cruzados no Concílio de Clermont, em 1095?',
    resposta: 'Urbano II',
    distratores: ['Gregório VII', 'Inocêncio III', 'Leão X', 'Pio XII', 'Clemente V'],
    explicacao:
      'No Concílio de Clermont, o papa Urbano II pregou a cruzada para retomar Jerusalém. A resposta foi imediata e mobilizou reis e cavaleiros de toda a Europa.',
  },
  {
    id: 'med-11',
    categoria: 'Idade Média',
    pergunta: 'Qual país europeu é considerado o berço do feudalismo?',
    resposta: 'França',
    distratores: ['Alemanha', 'Inglaterra', 'Itália', 'Espanha', 'Dinamarca'],
    explicacao:
      'O modelo feudal nasceu na França dos primeiros séculos medievais e se espalhou depois por toda a Europa ocidental.',
  },
  {
    id: 'med-12',
    categoria: 'Idade Média',
    pergunta: 'A Reconquista na Península Ibérica terminou com a queda de Granada em que ano?',
    resposta: '1492',
    distratores: ['1453', '1494', '1519', '1415', '1500'],
    explicacao:
      'A queda de Granada em 1492 encerrou a Reconquista e coincidiu com a chegada de Colombo à América. No mesmo ano, os Reis Católicos uniram as coroas de Castela e Aragão.',
  },
  {
    id: 'med-13',
    categoria: 'Idade Média',
    pergunta: 'Em que século a Inquisição foi oficialmente instituída pela Igreja Católica?',
    resposta: 'No século XVI',
    distratores: ['No século XII', 'No século XIII', 'No século XIV', 'No século XVIII', 'No século IX'],
    explicacao:
      'O papa Paulo III criou oficialmente o Tribunal do Santo Ofício em 1541, depois de a Inquisição espanhola já atuar desde 1478.',
  },
  {
    id: 'med-14',
    categoria: 'Idade Média',
    pergunta: 'Qual era a capital do Império Bizantino?',
    resposta: 'Constantinopla',
    distratores: ['Roma', 'Atenas', 'Alexandria', 'Bagdá', 'Trebizonda'],
    explicacao:
      'Constantinopla, hoje Istambul, foi fundada por Constantino em 330 d.C. e resistiu por mil anos como a maior cidade do mundo cristão.',
  },
  {
    id: 'med-15',
    categoria: 'Idade Média',
    pergunta: 'Qual território muçulmano da Península Ibérica teve Córdoba como capital?',
    resposta: 'O Emirado e o Califado de Córdoba',
    distratores: ['O Reino de Aragão', 'O Império Otomano', 'O Emirado de Granada', 'O Reino de Castela', 'O Califado de Bagdá'],
    explicacao:
      'Governado pelos omaiadas de Córdoba entre os séculos VIII e XIII, o território muçulmano da Ibéria foi recuperado pela reação cristã a partir do século XI.',
  },
  {
    id: 'med-16',
    categoria: 'Idade Média',
    pergunta: 'Qual líder mongol fundou a dinastia Yuan e transferiu a capital para Dadu, atual Pequim?',
    resposta: 'Kublai Khan',
    distratores: ['Gêngis Khan', 'Tamerlão', 'Ogodei Khan', 'Timur', 'Batú Khan'],
    explicacao:
      'Kublai Khan, neto de Gêngis Khan, fundou a dinastia Yuan e fez de Dadu (Pequim) a capital do império na China.',
  },
  {
    id: 'med-17',
    categoria: 'Idade Média',
    pergunta: 'Qual guerra opôs a França à Inglaterra entre 1337 e 1453?',
    resposta: 'A Guerra dos Cem Anos',
    distratores: ['A Guerra dos Trinta Anos', 'A Guerra dos Oito Anos', 'A Guerra da Restauração', 'A Guerra Civil Inglesa', 'A Guerra de Cambrai'],
    explicacao:
      'A Guerra dos Cem Anos opôs a França à Inglaterra pela Guyenne e terminou com a Reconquista do território e a morte de Carlos V.',
  },
  {
    id: 'med-18',
    categoria: 'Idade Média',
    pergunta: 'Em que ano os cruzados da quarta cruzada saquearam Constantinopla?',
    resposta: '1204',
    distratores: ['1099', '1187', '1215', '1260', '1453'],
    explicacao:
      'Em 1204, os cruzados tomaram e saquearam Constantinopla, causando um golpe definitivo no Império Bizantino e dando origem à Liga Latina.',
  },

  /* ============================== IDADE MODERNA ============================== */
  {
    id: 'mod-01',
    categoria: 'Idade Moderna',
    pergunta: 'Quem pintou o teto da Capela Sistina, no Vaticano?',
    resposta: 'Michelangelo',
    distratores: ['Leonardo da Vinci', 'Rafael', 'Botticelli', 'Donatello', 'Giotto'],
    explicacao:
      'Michelangelo pintou o teto entre 1508 e 1512. Existiu outra Capela Sistina, decorada por Giotto, mas ela foi demolida no século XV.',
  },
  {
    id: 'mod-02',
    categoria: 'Idade Moderna',
    pergunta: 'Qual navegador genovês chegou às Índias em 1498, abrindo a rota marítima para o Oriente?',
    resposta: 'Vasco da Gama',
    distratores: ['Cristóvão Colombo', 'Fernão de Magalhães', 'Bartolomeu Dias', 'Pedro Álvares Cabral', 'Amerigo Vespúcio'],
    explicacao:
      'Vasco da Gama dobrou o Cabo da Boa Esperança e chegou a Calecute em 1498, abrindo a rota direta entre a Europa e as Índias.',
  },
  {
    id: 'mod-03',
    categoria: 'Idade Moderna',
    pergunta: 'Em que ano foi assinado o Tratado de Tordesillas?',
    resposta: '1494',
    distratores: ['1492', '1519', '1522', '1498', '1517'],
    explicacao:
      'Tordesillas dividiu o mundo novo entre Portugal e Espanha, com a linha demarcada a 370 léguas a oeste das ilhas de Cabo Verde.',
  },
  {
    id: 'mod-04',
    categoria: 'Idade Moderna',
    pergunta: 'Qual navegador, numa viagem financiada pela Espanha, chegou às Américas em 1492?',
    resposta: 'Cristóvão Colombo',
    distratores: ['Vasco da Gama', 'Fernão de Magalhães', 'Amerigo Vespúcio', 'Bartolomeu Dias', 'Diogo Cão'],
    explicacao:
      'Colombo navegou da Espanha e chegou às Bahamas em outubro de 1492, abrindo o período das viagens europeias às Américas.',
  },
  {
    id: 'mod-05',
    categoria: 'Idade Moderna',
    pergunta: 'Em que ano teve início a Guerra dos Trinta Anos?',
    resposta: '1618',
    distratores: ['1519', '1648', '1688', '1700', '1600'],
    explicacao:
      'A Guerra dos Trinta Anos (1618-1648) começou com a Revolta da Boémia e terminou com a Paz de Vestfália.',
  },
  {
    id: 'mod-06',
    categoria: 'Idade Moderna',
    pergunta: 'Qual soberano europeu ficou conhecido como o "Sol-Rei"?',
    resposta: 'Luís XIV',
    distratores: ['Luís XV', 'Filipe V', 'Carlos V', 'Napoleão Bonaparte', 'Frederico II'],
    explicacao:
      'Luís XIV reinou na França entre 1643 e 1715 e concentrou o poder na corte de Versalhes, onde mandou construir o palácio que leva seu nome.',
  },
  {
    id: 'mod-07',
    categoria: 'Idade Moderna',
    pergunta: 'Em que ano começou a Revolução Francesa?',
    resposta: '1789',
    distratores: ['1776', '1815', '1688', '1648', '1799'],
    explicacao:
      'A Revolução Francesa começou com a tomada da Bastilha, em 14 de julho de 1789.',
  },
  {
    id: 'mod-08',
    categoria: 'Idade Moderna',
    pergunta: 'Quem escreveu "O Contrato Social"?',
    resposta: 'Jean-Jacques Rousseau',
    distratores: ['Voltaire', 'Montesquieu', 'Immanuel Kant', 'Denis Diderot', 'Hegel'],
    explicacao:
      'Publicado em 1762, o tratado de Rousseau influenciou a Revolução Francesa e a formação do conceito de soberania popular.',
  },
  {
    id: 'mod-09',
    categoria: 'Idade Moderna',
    pergunta: 'Quem escreveu o livro "Leviatã", em 1651?',
    resposta: 'Thomas Hobbes',
    distratores: ['John Locke', 'Jean-Jacques Rousseau', 'Voltaire', 'René Descartes', 'Isaac Newton'],
    explicacao:
      'Hobbes afirmou que o homem precisa de um Estado forte para sair do estado de natureza, defendendo um poder absoluto e centralizado.',
  },
  {
    id: 'mod-10',
    categoria: 'Idade Moderna',
    pergunta: 'Quem inventou o water frame, base da primeira fábrica têxtil mecanizada?',
    resposta: 'Richard Arkwright',
    distratores: ['James Watt', 'George Stephenson', 'Robert Fulton', 'Samuel Slater', 'Edmund Cartwright'],
    explicacao:
      'Arkwright criou o water frame em 1769 e ergueu a primeira fábrica de tecidos mecanizados em Cromford, em 1771.',
  },
  {
    id: 'mod-11',
    categoria: 'Idade Moderna',
    pergunta: 'Qual companhia inglesa dominou o comércio com a Índia nos séculos XVII e XVIII?',
    resposta: 'A Companhia Britânica das Índias Orientais',
    distratores: [
      'A Companhia Holandesa das Índias Orientais',
      'A Companhia de Jesus',
      'A Companhia das Índias Ocidentais',
      'O Banco da Inglaterra',
    ],
    explicacao:
      'Fundada em 1600, a companhia chegou a ter um exército próprio e participou ativamente da dominação britânica na Índia.',
  },
  {
    id: 'mod-12',
    categoria: 'Idade Moderna',
    pergunta: 'Em 1688, a "Revolução Gloriosa" levou ao trono da Inglaterra qual casa?',
    resposta: 'A casa de Orange',
    distratores: ['A casa de Stuart', 'A casa de Tudor', 'A casa de Bourbon', 'A casa de Habsburgo', 'A casa de Hanover'],
    explicacao:
      'A Revolução Gloriosa de 1688 restaurou a monarquia e levou Guilherme de Orange e Maria Stuart ao trono, abrindo a era Hanoveriana.',
  },
  {
    id: 'mod-13',
    categoria: 'Idade Moderna',
    pergunta: 'Qual metal trazido das Américas contribuiu para a alta dos preços na Europa do século XVII?',
    resposta: 'Ouro e prata',
    distratores: ['Ferro e cobre', 'Estanho e chumbo', 'Sal e açúcar', 'Bronze e latão', 'Alumínio e níquel'],
    explicacao:
      'A entrada maciça de ouro e prata das minas americanas provocou a revolução dos preços do século XVII, travando o crescimento dos salários reais.',
  },
  {
    id: 'mod-14',
    categoria: 'Idade Moderna',
    pergunta: 'Em que país começou a Revolução Industrial?',
    resposta: 'Inglaterra',
    distratores: ['França', 'Alemanha', 'Estados Unidos', 'Bélgica', 'Holanda'],
    explicacao:
      'A Revolução Industrial começou na Inglaterra no século XVIII, com a mecanização têxtil, o uso do vapor e a concentração da indústria em Manchester.',
  },
  {
    id: 'mod-15',
    categoria: 'Idade Moderna',
    pergunta: 'Qual cidade italiana foi o principal berço do Renascimento?',
    resposta: 'Florença',
    distratores: ['Roma', 'Veneza', 'Milão', 'Nápoles', 'Turim'],
    explicacao:
      'Florença, com seus banqueiros e mercadores, financiou Brunelleschi, Ghirlandaio e Botticelli, e foi berço de nomes como Leonardo, Michelangelo e Dante.',
  },
  {
    id: 'mod-16',
    categoria: 'Idade Moderna',
    pergunta: 'Qual navegador português, a serviço da Espanha, tentou chegar às Índias passando pelo oeste das Américas?',
    resposta: 'Fernão de Magalhães',
    distratores: ['Vasco da Gama', 'Bartolomeu Dias', 'Pedro Álvares Cabral', 'Diogo Cão', 'Jorge Álvares'],
    explicacao:
      'Fernão de Magalhães partiu da Espanha, dobrou o estreito ao sul da América do Sul e terminou sua viagem nas Ilhas Filipinas, onde morreu em 1521.',
  },

  /* ======================= BRASIL: COLÔNIA E IMPÉRIO ======================= */
  {
    id: 'brc-01',
    categoria: 'Brasil: Colônia e Império',
    pergunta: 'Qual foi o primeiro produto de exportação do Brasil?',
    resposta: 'Pau-brasil',
    distratores: ['Café', 'Açúcar', 'Ouro', 'Algodão', 'Tabaco'],
    explicacao:
      'Do pau-brasil, extraído para pigmento e combustível, Portugal encheu seus navios até o século XVI, quando o açúcar tomou o lugar.',
  },
  {
    id: 'brc-02',
    categoria: 'Brasil: Colônia e Império',
    pergunta: 'Quantas capitanias hereditárias foram criadas em 1534?',
    resposta: 'Quinze',
    distratores: ['Doze', 'Vinte e sete', 'Nove', 'Quarenta e seis', 'Seis'],
    explicacao:
      'A criação das capitanias hereditárias, em 1534, tentou povoar o território. Só algumas delas, como Pernambuco e São Vicente, prosperaram de fato.',
  },
  {
    id: 'brc-03',
    categoria: 'Brasil: Colônia e Império',
    pergunta: 'Quem recebeu a primeira capitania hereditária, a de Pernambuco?',
    resposta: 'Duarte Coelho',
    distratores: ['Tomé de Sousa', 'Jorge de Almeida', 'Francisco de Almeida', 'Lucas Vaz', 'Pedro de Ataíde'],
    explicacao:
      'Duarte Coelho, cavaleiro da Ordem de Santiago, fundou Olinda e Porto Calvo, o primeiro povoamento português no Pernambuco.',
  },
  {
    id: 'brc-04',
    categoria: 'Brasil: Colônia e Império',
    pergunta: 'Quem foi o primeiro governador-geral do Brasil?',
    resposta: 'Tomé de Sousa',
    distratores: ['Duarte Coelho', 'Jorge de Almeida', 'Martim Afonso de Sousa', 'Lucas Vaz', 'Mem de Sá'],
    explicacao:
      'Tomé de Sousa chegou em 1549 com uma grande frota, fundou Salvador e foi o primeiro governador a administrar o Brasil em nome de Portugal.',
  },
  {
    id: 'brc-05',
    categoria: 'Brasil: Colônia e Império',
    pergunta: 'Em que ano foi instalado no Brasil o Tribunal do Santo Ofício?',
    resposta: '1594',
    distratores: ['1500', '1550', '1620', '1711', '1534'],
    explicacao:
      'O Tribunal do Santo Ofício chegou à Bahia em 1594, funcionou até 1821 e teve sua sede na cidade de Salvador.',
  },
  {
    id: 'brc-06',
    categoria: 'Brasil: Colônia e Império',
    pergunta: 'Qual navegador português chegou ao Brasil em 1500?',
    resposta: 'Pedro Álvares Cabral',
    distratores: ['Vasco da Gama', 'Bartolomeu Dias', 'Fernão de Magalhães', 'Cristóvão Colombo', 'Amerigo Vespúcio'],
    explicacao:
      'A frota de Cabral chegou à costa da Bahia em 22 de abril de 1500, tomando posse do território em nome de Portugal.',
  },
  {
    id: 'brc-07',
    categoria: 'Brasil: Colônia e Império',
    pergunta: 'Em que ano o Brasil deixou de ser Vice-Reino e se tornou Reino?',
    resposta: '1808',
    distratores: ['1763', '1815', '1822', '1791', '1821'],
    explicacao:
      'Com a invasão napoleônica de Portugal, a corte veio para o Rio de Janeiro em 1808 e o Brasil foi elevado à categoria de Reino.',
  },
  {
    id: 'brc-08',
    categoria: 'Brasil: Colônia e Império',
    pergunta: 'Qual foi o primeiro produto de exportação brasileiro a alcançar grande escala no século XIX?',
    resposta: 'O açúcar',
    distratores: ['O café', 'O algodão', 'O ouro', 'O mate', 'O arroz'],
    explicacao:
      'O açúcar foi a base da economia colonial brasileira desde o século XVI, com o auge dos engenhos no Nordeste.',
  },
  {
    id: 'brc-09',
    categoria: 'Brasil: Colônia e Império',
    pergunta: 'Qual guerra opôs o Império do Brasil ao Paraguai entre 1864 e 1870?',
    resposta: 'A Guerra do Paraguai',
    distratores: ['A Guerra dos Farrapos', 'A Guerra do Contestado', 'A Guerra de Canudos', 'A Guerra dos Emboadas', 'A Guerra do Acre'],
    explicacao:
      'A Guerra do Paraguai começou com a invasão do Mato Grosso e terminou com a derrota do Paraguai e a morte do presidente Solano López.',
  },
  {
    id: 'brc-10',
    categoria: 'Brasil: Colônia e Império',
    pergunta: 'Qual foi o primeiro documento constitucional do Brasil?',
    resposta: 'A Carta Magna de 1824',
    distratores: ['A Constituição de 1824', 'A Constituição de 1888', 'A Constituição de 1891', 'A Lei Áurea', 'A Constituição de 1937'],
    explicacao:
      'Outorgada por D. Pedro I em 1824, a Carta Magna concentrou poderes no Imperador e foi a primeira Constituição brasileira.',
  },
  {
    id: 'brc-11',
    categoria: 'Brasil: Colônia e Império',
    pergunta: 'Que documento, assinado em 1888, extinguiu a escravidão no Brasil?',
    resposta: 'A Lei Áurea',
    distratores: ['A Lei do Ventre Livre', 'A Lei Eusébio de Queirós', 'A Carta Magna', 'A Lei dos Liberatos', 'O Código de Hamurábi'],
    explicacao:
      'A Lei Áurea, sancionada em 13 de setembro de 1888 pela Princesa Isabel, encerrou a escravidão no país.',
  },
  {
    id: 'brc-12',
    categoria: 'Brasil: Colônia e Império',
    pergunta: 'Em que ano começou o Segundo Reinado?',
    resposta: '1831, com a morte de D. Pedro I',
    distratores: [
      '1822, com a Independência',
      '1824, com a Carta Magna',
      '1832, com a morte de José Bonifácio',
      '1826, com a Abdicação',
      '1840, com a Guerra dos Caboclos',
    ],
    explicacao:
      'A morte de D. Pedro I, em 1831, encerrou o Primeiro Reinado e abriu o Segundo Reinado, com D. Pedro II no trono.',
  },
  {
    id: 'brc-13',
    categoria: 'Brasil: Colônia e Império',
    pergunta: 'Qual foi a capital do Brasil entre 1763 e 1960?',
    resposta: 'Rio de Janeiro',
    distratores: ['Salvador', 'Recife', 'São Paulo', 'Brasília', 'Belo Horizonte'],
    explicacao:
      'Com a criação do Vice-Reino em 1763, o Rio de Janeiro virou a capital do país e permaneceu como centro político até a inauguração de Brasília.',
  },
  {
    id: 'brc-14',
    categoria: 'Brasil: Colônia e Império',
    pergunta: 'Qual foi o último vice-rei do Brasil?',
    resposta: 'Luís de Vasconcelos e Sousa',
    distratores: ['Marcos de Noronha', 'Francisco do Rego Barreto', 'Rodrigues de Oliveira', 'Dom Pedro II', 'Joaquim Xavier Curado'],
    explicacao:
      'Luís de Vasconcelos e Sousa governou de 1808 a 1809, como último vice-rei, antes da elevação do Brasil a Reino.',
  },
  {
    id: 'brc-15',
    categoria: 'Brasil: Colônia e Império',
    pergunta: 'Qual ato de 1824 dissolveu o Estado do Brasil e outorgou a Carta Magna?',
    resposta: 'O Ato Adotivo do Império do Brasil',
    distratores: ['O Ato Adotivo das Províncias', 'O Ato Adotivo da Monarquia', 'A Lei do Ventre Livre', 'A Lei Áurea', 'O Código de Hamurábi'],
    explicacao:
      'O Ato Adotivo, de 12 de outubro de 1824, dissolveu o Estado do Brasil e criou o Império do Brasil, outorgando a Carta Magna no mesmo ano.',
  },

  /* ========================= BRASIL: REPÚBLICA ========================= */
  {
    id: 'brr-01',
    categoria: 'Brasil: República',
    pergunta: 'Quem foi o primeiro presidente da República Brasileira?',
    resposta: 'Deodoro da Fonseca',
    distratores: ['Floriano Peixoto', 'Getúlio Vargas', 'Tancredo Neves', 'Prudente de Morais', 'Juscelino Kubitschek'],
    explicacao:
      'Deodoro da Fonseca proclamou a República em 15 de novembro de 1889 e chefiou o governo como primeiro presidente do país.',
  },
  {
    id: 'brr-02',
    categoria: 'Brasil: República',
    pergunta: 'Em que ano foi proclamada a República Brasileira?',
    resposta: '1889',
    distratores: ['1888', '1891', '1824', '1822', '1870'],
    explicacao:
      'A República foi proclamada em 15 de novembro de 1889, encerrando o Segundo Reinado.',
  },
  {
    id: 'brr-03',
    categoria: 'Brasil: República',
    pergunta: 'Em que ano foi promulgada a Constituição Federal vigente no Brasil?',
    resposta: '1988',
    distratores: ['1985', '1967', '1946', '1891', '1937'],
    explicacao:
      'A Constituição de 1988, chamada de Constituição Cidadã, foi promulgada em 5 de outubro de 1988.',
  },
  {
    id: 'brr-04',
    categoria: 'Brasil: República',
    pergunta: 'Qual foi o período da Ditadura Militar no Brasil?',
    resposta: '1964 a 1985',
    distratores: ['1937 a 1945', '1954 a 1964', '1930 a 1937', '1985 a 1990', '1945 a 1964'],
    explicacao:
      'A Ditadura Militar durou de 1964 a 1985, com o fim marcado pela Lei de Anistia e a posse de José Sarney.',
  },
  {
    id: 'brr-05',
    categoria: 'Brasil: República',
    pergunta: 'Qual presidente ficou conhecido como o "homem da confiança" e o "coronel"?',
    resposta: 'Getúlio Vargas',
    distratores: ['Juscelino Kubitschek', 'João Goulart', 'Artur Bernardes', 'Washington Luís', 'Castelo Branco'],
    explicacao:
      'Getúlio Vargas governou entre 1930 e 1945 e depois entre 1951 e 1954. No Estado Novo (1937-1945), concentrou poderes com o apoio das Forças Armadas.',
  },
  {
    id: 'brr-06',
    categoria: 'Brasil: República',
    pergunta: 'Em 1930, qual movimento derrubou a República Velha?',
    resposta: 'A Revolução de 1930',
    distratores: ['A Revolução de 1932', 'A Revolução Constitucionalista', 'O Movimento de 1922', 'A Revolução de 1964', 'A Coluna Prestes'],
    explicacao:
      'A Revolução de 1930, liderada por Getúlio Vargas, derrubou Washington Luís e inaugurou a República Nova.',
  },
  {
    id: 'brr-07',
    categoria: 'Brasil: República',
    pergunta: 'Quem foi o presidente deposto pelo movimento de 1930?',
    resposta: 'Washington Luís',
    distratores: ['Getúlio Vargas', 'Artur Bernardes', 'Epitácio Pessoa', 'Hermes da Fonseca', 'Jânio Quadros'],
    explicacao:
      'Washington Luís foi deposto pelo movimento de 1930, e sua deposição levou à segunda etapa da Revolução de 1930.',
  },
  {
    id: 'brr-08',
    categoria: 'Brasil: República',
    pergunta: 'Em que ano entrou em vigor a Consolidação das Leis do Trabalho (CLT)?',
    resposta: '1943',
    distratores: ['1930', '1937', '1945', '1951', '1967'],
    explicacao:
      'A CLT, criada em 1943 durante o Estado Novo, consolidou as leis trabalhistas e foi a base do direito do trabalho brasileiro por décadas.',
  },
  {
    id: 'brr-09',
    categoria: 'Brasil: República',
    pergunta: 'Quem foi o presidente da República entre 1946 e 1951?',
    resposta: 'Eurico Gaspar Dutra',
    distratores: ['Getúlio Vargas', 'Café Filho', 'Juscelino Kubitschek', 'Carlos Luz', 'Nereu Ramos'],
    explicacao:
      'Dutra, o primeiro eleito por voto direto em 1945, governou entre 1946 e 1951.',
  },
  {
    id: 'brr-10',
    categoria: 'Brasil: República',
    pergunta: 'Quem assumiu a presidência após o golpe militar de 1964?',
    resposta: 'Humberto de Alencar Castelo Branco',
    distratores: ['Artur da Costa e Silva', 'João Baptista Figueiredo', 'Tancredo Neves', 'Artur Bernardes', 'Emílio Médici'],
    explicacao:
      'Castelo Branco, chefe do Estado Maior do Exército, assumiu em 1964 e comandou o governo militar até 1967.',
  },
  {
    id: 'brr-11',
    categoria: 'Brasil: República',
    pergunta: 'Quem foi o primeiro presidente civil após o fim da Ditadura Militar?',
    resposta: 'José Sarney',
    distratores: ['Fernando Collor', 'Itamar Franco', 'Fernando Henrique Cardoso', 'Tancredo Neves', 'João Goulart'],
    explicacao:
      'Sarney tomou posse em 15 de março de 1985, com a anistia e a redemocratização, e presidiu até 1990.',
  },
  {
    id: 'brr-12',
    categoria: 'Brasil: República',
    pergunta: 'Em que ano o Rio de Janeiro deixou de ser a capital do Brasil?',
    resposta: '1960',
    distratores: ['1950', '1964', '1970', '1889', '1954'],
    explicacao:
      'Com a inauguração de Brasília, em 21 de abril de 1960, a capital foi transferida do Rio para o Planalto Central.',
  },
  {
    id: 'brr-13',
    categoria: 'Brasil: República',
    pergunta: 'Quem foi o primeiro presidente eleito diretamente por voto popular, em 1894?',
    resposta: 'Prudente de Morais',
    distratores: ['Deodoro da Fonseca', 'Floriano Peixoto', 'Campos Sales', 'Rodrigues Alves', 'Epitácio Pessoa'],
    explicacao:
      'Prudente de Morais foi o primeiro eleito pelo voto direto, em 1894, sucedendo Deodoro. Todos os anteriores eram militares e assumiram o poder por golpe.',
  },
  {
    id: 'brr-14',
    categoria: 'Brasil: República',
    pergunta: 'Quem presidiu a assembleia constituinte que redigiu a Constituição de 1988?',
    resposta: 'Ulysses Guimarães',
    distratores: ['José Sarney', 'Tancredo Neves', 'Afonso Arinos', 'Bernardo Cabral', 'Sarney Filho'],
    explicacao:
      'Ulysses Guimarães presidiu a Assembleia Nacional Constituinte instalada em 1987, que elaborou a Constituição de 1988.',
  },
  {
    id: 'brr-15',
    categoria: 'Brasil: República',
    pergunta: 'A Guerra de Canudos (1896-1897) ocorreu em qual estado?',
    resposta: 'Bahia',
    distratores: ['Pernambuco', 'Ceará', 'Minas Gerais', 'Piauí', 'Sergipe'],
    explicacao:
      'Canudos, no sertão da Bahia (hoje Monte Santo), foi o palco do conflito entre o povoado de Antônio Conselheiro e o governo federal.',
  },
  {
    id: 'brr-16',
    categoria: 'Brasil: República',
    pergunta: 'Qual foi o primeiro presidente da República Velha, período que se estendeu de 1894 a 1930?',
    resposta: 'Floriano Peixoto',
    distratores: ['Prudente de Morais', 'Campos Sales', 'Rodrigues Alves', 'Afonso Pena', 'Epitácio Pessoa'],
    explicacao:
      'Floriano Peixoto, sucessor de Deodoro, foi o primeiro presidente da República Velha, que se encerrou com a Revolução de 1930.',
  },

  /* ======================== MUNDO CONTEMPORÂNEO ======================== */
  {
    id: 'con-01',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Em que ano começou a Primeira Guerra Mundial?',
    resposta: '1914',
    distratores: ['1918', '1904', '1939', '1912', '1916'],
    explicacao:
      'A guerra começou em 1914, após o assassinato do arquiduque da Áustria, Francisco Ferdinando.',
  },
  {
    id: 'con-02',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Em que ano começou a Segunda Guerra Mundial?',
    resposta: '1939',
    distratores: ['1938', '1940', '1941', '1937', '1945'],
    explicacao:
      'A guerra começou em 1º de setembro de 1939, com a invasão da Polônia pela Alemanha.',
  },
  {
    id: 'con-03',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Qual conflito opôs Estados Unidos e União Soviética, sem confronto direto entre as duas superpotências?',
    resposta: 'A Guerra Fria',
    distratores: ['A Segunda Guerra Mundial', 'A Guerra do Vietnã', 'A Guerra da Coréia', 'A Guerra do Golfo', 'A Guerra Franco-Prussiana'],
    explicacao:
      'A Guerra Fria (1947-1991) opôs os dois blocos, a OTAN e o Pacto de Varsóvia, em uma disputa de ideologias e corrida armamentista.',
  },
  {
    id: 'con-04',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Em que ano caiu o Muro de Berlim?',
    resposta: '1989',
    distratores: ['1991', '1985', '1979', '1961', '1990'],
    explicacao:
      'O Muro de Berlim caiu em 9 de novembro de 1989, marco do fim da Guerra Fria. A Alemanha foi reunificada no ano seguinte.',
  },
  {
    id: 'con-05',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Em que ano foi erguido o Muro de Berlim?',
    resposta: '1961',
    distratores: ['1949', '1953', '1969', '1979', '1957'],
    explicacao:
      'Construído em 1961, o muro separou a cidade por 28 anos e virou o símbolo mais forte da Guerra Fria.',
  },
  {
    id: 'con-06',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Qual organização internacional foi criada em 1945 para manter a paz mundial?',
    resposta: 'A Organização das Nações Unidas (ONU)',
    distratores: ['A Liga das Nações', 'A OTAN', 'A UNESCO', 'A Organização Mundial do Comércio', 'O Conselho da Europa'],
    explicacao:
      'A ONU foi fundada em 26 de junho de 1945, em São Francisco, como sucessora da Liga das Nações.',
  },
  {
    id: 'con-07',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Em que ano a ONU aprovou a Declaração Universal dos Direitos Humanos?',
    resposta: '1948',
    distratores: ['1945', '1951', '1960', '1966', '1946'],
    explicacao:
      'A Declaração Universal dos Direitos Humanos foi aprovada em 10 de dezembro de 1948, em Paris.',
  },
  {
    id: 'con-08',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Quem foi o primeiro presidente dos Estados Unidos?',
    resposta: 'George Washington',
    distratores: ['Thomas Jefferson', 'Abraham Lincoln', 'John Adams', 'Franklin D. Roosevelt', 'James Madison'],
    explicacao:
      'Eleito em 1789, Washington comandou o Exército Continental na Guerra de Independência e se tornou o primeiro presidente do país.',
  },
  {
    id: 'con-09',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Quem liderou a luta pela independência da Índia com a estratégia da não violência?',
    resposta: 'Mahatma Gandhi',
    distratores: ['Jawaharlal Nehru', 'Muhammad Ali Jinnah', 'Sardar Vallabhbhai Patel', 'B. R. Ambedkar', 'Subhas Chandra Bose'],
    explicacao:
      'Gandhi liderou o movimento de não violência e desobediência civil contra o domínio britânico, com a Marcha do Sal de 1930 como marco.',
  },
  {
    id: 'con-10',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Em que ano foi lançado o primeiro satélite artificial, o Sputnik?',
    resposta: '1957',
    distratores: ['1947', '1961', '1969', '1959', '1954'],
    explicacao:
      'A URSS lançou o Sputnik 1 em 4 de outubro de 1957, abrindo a corrida espacial e a era dos satélites artificiais.',
  },
  {
    id: 'con-11',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Quem foi o primeiro ser humano a pisar na Lua?',
    resposta: 'Neil Armstrong',
    distratores: ['Buzz Aldrin', 'Yuri Gagarin', 'John Glenn', 'Michael Collins', 'Alan Shepard'],
    explicacao:
      'Armstrong pisou na Lua em 20 de julho de 1969, na missão Apollo 11. Gagarin tinha sido o primeiro homem no espaço, em 1961.',
  },
  {
    id: 'con-12',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Em que ano se desfez a União Soviética?',
    resposta: '1991',
    distratores: ['1989', '1985', '1990', '1979', '1945'],
    explicacao:
      'A URSS se dissolveu em dezembro de 1991, com a criação da Comunidade de Estados Independentes e o fim da Guerra Fria.',
  },
  {
    id: 'con-13',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Em que ano a Alemanha foi reunificada?',
    resposta: '1990',
    distratores: ['1989', '1991', '1949', '1953', '1993'],
    explicacao:
      'A reunificação ocorreu em 3 de outubro de 1990, com a entrada da Alemanha Oriental na República Federal da Alemanha.',
  },
  {
    id: 'con-14',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Qual país foi invadido pela Alemanha em setembro de 1939, dando início à Segunda Guerra Mundial?',
    resposta: 'Polônia',
    distratores: ['Tchecoslováquia', 'Áustria', 'Dinamarca', 'Hungria', 'Holanda'],
    explicacao:
      'A invasão da Polônia em 1º de setembro de 1939 acionou as declarações de guerra da França e do Reino Unido.',
  },
  {
    id: 'con-15',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Quem foi o presidente dos Estados Unidos durante a Guerra Civil Americana?',
    resposta: 'Abraham Lincoln',
    distratores: ['George Washington', 'Andrew Jackson', 'Ulysses Grant', 'Thomas Jefferson', 'Woodrow Wilson'],
    explicacao:
      'Lincoln dirigiu a União entre 1861 e 1865 e assinou a Proclamação de Emancipação em 1863.',
  },
  {
    id: 'con-16',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Em que ano Mao Zedong proclamou a República Popular da China?',
    resposta: '1949',
    distratores: ['1937', '1945', '1953', '1966', '1950'],
    explicacao:
      'A República Popular foi proclamada em 1º de outubro de 1949, dois meses após a vitória dos comunistas na guerra civil.',
  },
  {
    id: 'con-17',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Qual presidente dos EUA anunciou o Plano Marshall, em 1947?',
    resposta: 'Harry Truman',
    distratores: ['Dwight Eisenhower', 'Franklin Roosevelt', 'John Kennedy', 'Lyndon Johnson', 'Richard Nixon'],
    explicacao:
      'O Plano Marshall, de recuperação econômica europeia, foi anunciado em 5 de junho de 1947 por Truman, na Universidade de Harvard.',
  },
  {
    id: 'con-18',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Qual guerra opôs o Vietnã do Norte, apoiado pela China e pela URSS, ao Vietnã do Sul, apoiado pelos EUA?',
    resposta: 'A Guerra do Vietnã',
    distratores: ['A Guerra da Coréia', 'A Guerra do Camboja', 'A Guerra da China', 'A Guerra do Afeganistão', 'A Guerra da Argélia'],
    explicacao:
      'A Guerra do Vietnã durou de 1955 a 1975 e terminou com a unificação do Vietnã sob a direção do Norte.',
  },
  {
    id: 'con-19',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Em que ano a Alemanha nazista foi derrotada na Segunda Guerra Mundial?',
    resposta: '1945',
    distratores: ['1939', '1944', '1946', '1942', '1950'],
    explicacao:
      'A rendição da Alemanha foi assinada em 8 de maio de 1945, encerrando a guerra na Europa; a guerra no Pacífico continuaria até setembro.',
  },
  {
    id: 'con-20',
    categoria: 'Mundo Contemporâneo',
    pergunta: 'Em que cidades japonesas foram lançadas as bombas atômicas, em 1945?',
    resposta: 'Hiroshima e Nagasaki',
    distratores: ['Tóquio e Osaka', 'Kyoto e Kobe', 'Tóquio e Nagoya', 'Osaka e Yokohama', 'Sapporo e Sendai'],
    explicacao:
      'Hiroshima e Nagasaki foram as duas cidades atingidas, em 6 e 9 de agosto de 1945, encerrando a guerra no Pacífico.',
  },
];

/**
 * Categorias na ordem em que aparecem na tela inicial.
 * O app usa esta lista para montar o seletor, os atalhos e os recordes.
 */
const CATEGORIAS_HISTORIA = [
  'Antiguidade',
  'Mundos Pré-Coloniais',
  'Idade Média',
  'Idade Moderna',
  'Brasil: Colônia e Império',
  'Brasil: República',
  'Mundo Contemporâneo',
];
