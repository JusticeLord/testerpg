# XP Forge — RPG Lab
## Auditoria e planejamento de direção artística v0.1

**Atualização de publicação — 07/11/2026:** Gabriel aprovou os quatro samples e autorizou o commit no branch art. A aprovação cobre a direção visual e as referências de conceito. Escala, motor, animações, slots e contratos de execução continuam pendentes de validação técnica. Não existem assets finais neste pacote. O histórico de auditoria abaixo descreve o estado anterior à publicação; o estado corrente é definido por esta nota, ART_BIBLE.md e ASSET_MANIFEST.md.



**Data:** 07/11/2026. **Responsável de aprovação:** Gabriel.
**Estado atual:** direção visual e quatro conceitos aprovados; publicação deste pacote autorizada em art. Assets finais e contratos técnicos continuam pendentes.
**Questline de referência:** `quest_luz_caminho` — A Luz do Caminho.

## 1. Resultado da auditoria

Os oito documentos obrigatórios foram consultados diretamente no GitHub. Nenhum está ausente. A narrativa foi tomada como referência de conteúdo, preservando a distinção entre aprovação editorial e contrato técnico: os dados ainda declaram `0.1-proposal`, `proposed_not_implemented` e dependências de Gameplay.

| Branch | Revisão observada | Situação relevante |
| --- | --- | --- |
| main | d8dea81201ad064f2bbd82aaddba550fe1741ec1 | Brief e regras centrais disponíveis; pacote narrativo também aparece nesta árvore; documentos de arte vazios. |
| narrative | 03072ebda429ee7488666f1b27f64d62cc2ed50f | Seis arquivos narrativos requeridos disponíveis. Foi a fonte consultada para a narrativa. |
| art | 2489e97173ba9e8056c1a168c429aa802e69f7db | Apenas README.md; nenhum asset ou contrato artístico existente. |
| feat | 2489e97173ba9e8056c1a168c429aa802e69f7db | Apenas README.md; não há motor, loader ou implementação que possa ser validada. |

As árvores retornaram completas, sem truncamento. Não foi feito checkout, alteração remota, merge ou commit. Os documentos de outros departamentos permanecem intactos. A presença da narrativa em main foi apenas constatada; nenhuma operação de integração foi executada.

`docs/art/ART_BIBLE.md` e `docs/art/ASSET_MANIFEST.md`, no main, contêm somente uma quebra de linha. Não há direção artística anterior registrada nesses arquivos. Não foram importados assets de outros projetos do XP Forge.

### Fontes consultadas

| Fonte | Branch | SHA do arquivo |
| --- | --- | --- |
| [docs/PROJECT_BRIEF.md](https://github.com/JusticeLord/testerpg/blob/main/docs/PROJECT_BRIEF.md) | main | `8503d512fdef6c283a67154991b0a7c74c26711a` |
| [docs/INTEGRATION_RULES.md](https://github.com/JusticeLord/testerpg/blob/main/docs/INTEGRATION_RULES.md) | main | `07c685c0e59180055b526bda77200b94f43d4ed2` |
| [first-quest/docs/narrative/NARRATIVE_BIBLE.md](https://github.com/JusticeLord/testerpg/blob/narrative/first-quest/docs/narrative/NARRATIVE_BIBLE.md) | narrative | `bd37083a689de18264dd0d0a4eca43c83dd499bb` |
| [first-quest/docs/narrative/CHARACTERS.md](https://github.com/JusticeLord/testerpg/blob/narrative/first-quest/docs/narrative/CHARACTERS.md) | narrative | `f27adf414c26ca76ee59e4ff264252ffd427d2f2` |
| [first-quest/docs/narrative/QUESTS.md](https://github.com/JusticeLord/testerpg/blob/narrative/first-quest/docs/narrative/QUESTS.md) | narrative | `c35bbd6aeb5c571efc6fde4080633d9aca9659c5` |
| [first-quest/docs/narrative/DATA_SCHEMA.md](https://github.com/JusticeLord/testerpg/blob/narrative/first-quest/docs/narrative/DATA_SCHEMA.md) | narrative | `77ccec9f84fc141747847f08526f872d7ce057bd` |
| [first-quest/data/narrative/dialogues.json](https://github.com/JusticeLord/testerpg/blob/narrative/first-quest/data/narrative/dialogues.json) | narrative | `cb2c70cd7983ef67e9c03a48fb19e63effd228ab` |
| [first-quest/data/narrative/quests.json](https://github.com/JusticeLord/testerpg/blob/narrative/first-quest/data/narrative/quests.json) | narrative | `96d515853700e43260b7b8af92fd9f21e90027ac` |

## 2. Direção visual proposta

**Conceito:** o cuidado material mantém a comunidade viva. A vila transmite trabalho, abrigo e familiaridade; a mata oferece exploração e risco local; o lampião restaurado torna visível o resultado da ajuda.

- **Perspectiva candidata:** top-down em três quartos, projeção ortográfica, chão e fachadas visíveis; sem grade isométrica em losangos. Os samples exploram essa linguagem; não constituem câmera calibrada.
- **Linguagem:** pixel art com agrupamentos de cor deliberados, silhuetas expressivas, volume por luz e sombra, contornos seletivos. A resolução das imagens de apresentação não define a resolução dos sprites.
- **Arquitetura:** bases de pedra, madeira castanha, reboco creme, telhas de barro; volumes modestos com telhados e chaminés distintos. Nenhuma construção decorativa autoriza comércio ou novo NPC.
- **Terreno:** trilha de terra ocre com margens irregulares; grama em massas, variações controladas e transições naturais. Centro de circulação limpo; maior densidade de detalhes nas bordas.
- **Vegetação:** freixos estilizados e folhagem verde, raízes, arbustos e vegetação rasteira; copas em massas legíveis. A diversidade será principalmente de forma, altura e valor.
- **Iluminação:** luz suave do alto à esquerda, sombras azul-ardósia e contato consistente. Bruma discreta na periferia, sem encobrir objetos ou percursos. Luz âmbar reservada ao fogo e ao lampião restaurado.
- **Hierarquia:** ator e objeto interativo se destacam do chão; decoração recua. Erva-cinza se distingue por folhas prateadas serrilhadas; minério por veios ferruginosos angulosos. Evitar depender somente de cor ou brilho.
- **Originalidade:** referências de atmosfera e legibilidade não transferem mapas, silhuetas distintivas, símbolos, personagens ou assets de outras franquias.

### Paleta de trabalho — proposta, não paleta indexada final

| Função | Cor candidata | Uso |
| --- | --- | --- |
| Sombra profunda | `#252C38` | Contato e separação pontual |
| Ardósia | `#596579` | Sombras frias, ferro |
| Madeira | `#694735` | Vigas, armações, ferramentas |
| Telha | `#B85C3D` | Coberturas |
| Terra | `#B88D58` | Caminhos |
| Reboco/linho | `#E7D2AB` | Fachadas e tecidos claros |
| Verde escuro | `#344C37` | Copas e sombra vegetal |
| Verde médio | `#71824B` | Vegetação exposta |
| Cinza vegetal | `#B2BDB0` | Erva-cinza |
| Âmbar | `#E1AE51` | Lampião e seleção |
| Azul-petróleo | `#48666D` | Exemplo do protagonista |

Os códigos orientam a próxima revisão; não são uma medição das imagens geradas. A paleta final requer testes de contraste e leitura no tamanho de jogo.

## 3. Proposta espacial e escala

Brumaflor deve se organizar em torno de uma praça irregular, com a oficina num lado e o canteiro de Iria no outro. Mara ocupa a circulação próxima à saída. A trilha conduz a uma curva reconhecível com o único lampião da missão, e depois à borda da mata. A clareira permite contornar obstáculos nas diagonais; minério e erva ficam fora da faixa principal de passagem. A área do javali oferece espaço de leitura e reposicionamento, sem definir alcances ou hitboxes.

O lampião visto nos dois samples é uma referência ao MESMO ponto `loc_lampiao_freixo`; não são dois objetos exigidos pela narrativa. A conexão espacial exata entre os enquadramentos precisa ser resolvida no mapa de Gameplay. Os quadros de antes/depois na mata são comparação de arte e não duplicação do objeto no mundo.

| Decisão | Candidato para teste | Condição de aceite |
| --- | --- | --- |
| Grid | Tiles de 32 × 32 px | Validar colisão diagonal, transições, composição e custo de mapa |
| Personagem, opção A | Canvas de 48 × 64 px | Comparar detalhe, leitura, custo de animação e densidade da vila |
| Personagem, opção B | Canvas de 32 × 48 px | Comparar legibilidade de rostos, ferramentas e silhuetas |
| Proporção | Aproximadamente quatro cabeças no sprite de referência | Reavaliar nas duas opções; não redimensionar samples para declarar sprite final |
| Câmera | Ortográfica, três quartos | Testar sobreposição de fachadas/copas e visibilidade dos pés |
| Ampliação | Fatores inteiros, amostragem nearest-neighbor | Verificar nitidez no viewport escolhido |
| Colisão | Volume funcional definido por Gameplay | Não deduzir colisão pelo tamanho do desenho |
| Pivô visual | Referência de contato no chão | Fixar coordenadas somente com escala e importador aprovados |

Nenhum valor desta tabela está fixado como contrato. A recomendação inicial é comparar A e B com a mesma pequena composição de chão, árvore, porta e lampião. Não há engine ou equipe externa contatada nesta execução; a aprovação técnica permanece pendente.

### Camadas propostas

1. Solo base e transições.
2. Detalhes baixos sem obstrução.
3. Bases de construções, troncos e objetos.
4. Atores e volumes ordenados pela referência no chão.
5. Copas/telhados com tratamento de oclusão a acordar.
6. Efeitos de estado/luz, sem comprometer a leitura.
7. Interface em espaço de tela.

Essa ordem é conceitual. Sorting, recorte de telhados, sombras e colisões dependem do motor; a Arte não implementa automaticamente esses sistemas.

## 4. Personagens e criatura

| Entidade | Silhueta e roupa | Paleta/identificador | Animações previstas para estudo |
| --- | --- | --- | --- |
| Mara — `npc_mara` | Adulta; capa curta gasta sobre roupa reforçada; postura resoluta | Ocre e marrom, cabelo preso, corda/chaveiro | Idle e reação de conversa; locomoção somente se Gameplay necessitar |
| Dario — `npc_dario` | Adulto; tronco amplo, avental de trabalho com fuligem, ferramentas simples | Azul-ardósia e couro escuro; avental retangular | Idle, conversa e gesto de trabalho se utilizado; não pressupõe crafting automático do NPC |
| Iria — `npc_iria` | Adulta; roupas de fibras claras manchadas de vegetais, cesto | Linho, verde-sálvia, trança e cesto arredondado | Idle e conversa; gesto de cuidado do canteiro opcional |
| Protagonista — sem ID narrativo | Exemplo de viajante em túnica simples; identidade não fixada | Azul-petróleo, marrom, botas práticas | Idle, caminhada, ataque, defesa, dano e derrota conforme sistema |
| Javali — `enemy_javali_freixo` | Corpo baixo, dorso eriçado, presas curtas, ameaça territorial | Marrom escuro com focinho e presas contrastantes | Idle/alerta, movimento, ataque, dano e derrota sem gore |

As aparências propostas para cabelo e fisionomia são estudos, não acréscimos à história. O protagonista mostrado não fixa gênero, raça, classe, origem ou personalização. Os retratos são estudos opcionais; não obrigam a implementação de retratos no diálogo.

**Oito direções:** movimento do jogador exige N, NE, E, SE, S, SO, O e NO. A proposta de melhor consistência é produzir vistas dedicadas. Espelhamento só pode ser aceito após demonstrar que mantém luz, roupa, objetos e ação corretos; não basta um sprite frontal. Não presumir arma, escudo ou animação de classe para representar Q/G. Quantidade de quadros, duração e direção de ataque aguardam Gameplay.

O javali deve ter orientação compatível com seu movimento e ataque; o conjunto exato de vistas depende da lógica aprovada. O estado de derrota não declara automaticamente a fonte esfolável. A apresentação de esfolamento será não gráfica, sem órgãos ou sangue; sinal de elegibilidade e término de coleta dependem da regra aprovada.

## 5. Catálogo priorizado e mapeamento de IDs

**Situação de TODAS as entradas:** proposta / aguardando aprovação; nenhum arquivo abaixo é um asset final já criado. Os caminhos são destinos sugeridos para o futuro branch art. Os nomes de arquivos não criam novos IDs de Gameplay.

### Prioridade P0 — viabilizar a primeira área e o fluxo narrativo

| ID existente / referência | Representação necessária | Arquivo ou pasta proposto |
| --- | --- | --- |
| `loc_brumaflor` | Praça, casas, portas e circulação; uma composição de mapa | `assets/art/environments/brumaflor/` |
| `loc_oficina_dario` | Oficina, bancada, forja e bigorna; papel funcional da estação pendente | `assets/art/environments/oficina_dario/` |
| `loc_trilha_freixo` | Terra, margens, curvas, transição vila/mata | `assets/art/tilesets/trilha_freixo/` |
| `loc_borda_mata` | Chão, freixos, arbustos, pedras e clareira | `assets/art/environments/borda_mata/` |
| Sem ID próprio | Grama/terra/sombra e variações de chão compartilhadas | `assets/art/tilesets/terrain/` |
| Sem ID próprio | Bases, copas, vegetação e decoração da área | `assets/art/environments/vegetation/` |
| `npc_mara` | Sprite-base, vistas necessárias e idle/conversa | `assets/art/characters/npc_mara/` |
| `npc_dario` | Sprite-base, vistas necessárias e idle/conversa | `assets/art/characters/npc_dario/` |
| `npc_iria` | Sprite-base, vistas necessárias e idle/conversa | `assets/art/characters/npc_iria/` |
| Protagonista, sem ID narrativo | Base neutra e oito direções; ações do protótipo | `assets/art/characters/player_sample/` |
| `enemy_javali_freixo` | Movimento, ataque, dano e derrota | `assets/art/enemies/enemy_javali_freixo/` |
| `resource_minerio_ferro` | Depósito mineral e ícone do minério | `assets/art/resources/resource_minerio_ferro/` |
| `resource_erva_cinza` | Planta coletável e ícone de porção | `assets/art/resources/resource_erva_cinza/` |
| `resource_couro_cru` | Ícone de couro e feedback de obtenção | `assets/art/resources/resource_couro_cru/` |
| `item_picareta` | Ícone e representação na coleta, se utilizada | `assets/art/objects/tools/item_picareta/` |
| `item_pa` | Ícone e representação na coleta, se utilizada | `assets/art/objects/tools/item_pa/` |
| `item_faca_esfolamento` | Ícone e feedback de obtenção, se utilizado | `assets/art/objects/tools/item_faca_esfolamento/` |
| `item_presilha_trilha` | Peça metálica simples e ícone | `assets/art/objects/item_presilha_trilha/` |
| `recipe_presilha_trilha` | Apresentação da receita utilizando os ícones existentes | `assets/art/ui/crafting/` |
| `loc_lampiao_freixo` | Mesmo objeto, danificado/apagado e restaurado/aceso | `assets/art/objects/loc_lampiao_freixo/` |
| `reward_lampiao_aceso` | Associação ao estado aceso do lampião; sem item de prêmio | `assets/art/objects/loc_lampiao_freixo/` |

Depósito e erva no mundo são representações de fontes. Os IDs próprios de nós/instâncias não foram definidos pela narrativa; Gameplay deve fornecê-los. Não substituir ID de nó por ID de item inadvertidamente.

### Prioridade P1 — interface necessária ao fluxo

| Referência existente | Entrega | Destino proposto |
| --- | --- | --- |
| `dlg_mara_inicio`, `dlg_dario_oficina`, `dlg_iria_erva`, `dlg_mara_retorno`, `dlg_mara_apos` | Janela compartilhada, nome do interlocutor, avanço e escolha única | `assets/art/ui/dialogue/` |
| `quest_luz_caminho` e seus dez objetivos | Cabeçalho, lista/progresso, estado concluído | `assets/art/ui/quest/` |
| Requisitos E e I | Foco/interação, inventário com avatar central e grupos laterais | `assets/art/ui/inventory/`, `assets/art/ui/interaction/` |
| Três coletas e ferramentas já referidas | Elegível, indisponível e ferramenta ausente, sem cronômetro presumido | `assets/art/ui/gathering/` |
| `recipe_presilha_trilha` | Insumos, resultado, indisponibilidade e confirmação | `assets/art/ui/crafting/` |
| Requisitos Q e G | Feedback legível de ataque, defesa e dano | `assets/art/ui/combat/` |

Interface deve preservar pt-BR e falas literais. O sample usa um trecho da primeira fala de Mara somente como demonstração tipográfica; a implementação carrega o texto integral de dialogues.json. Objetivos e falas permanecem separados.

**Estados candidatos de UI:** normal, foco/seleção, pressionado, indisponível e confirmação. Correspondência de input, foco de janelas, ausência de ferramenta, inventário cheio e encerramento transacional precisam ser aprovados. Seleção deve usar contorno/forma além da cor. Quantidade e tipos de slots mostrados são ilustrativos, não capacidade aprovada. Tipografia renderizada do mockup não é arquivo de fonte ou solução de acessibilidade pronta.

### Prioridade P2 — acabamento e testes complementares

- Variações decorativas de piso, vegetação e fachadas após o núcleo funcionar.
- Retratos, caso adotados, e pequenos gestos contextuais.
- Assets de receitas demonstrativas de Engenheiro, Joalheiro, Escriba, Alquimista e Coureiro: **pendentes de lista de receitas/outputs de Gameplay**. O brief exige esses testes; a ausência de especificações impede catalogar ícones finais sem inventar itens. Nenhuma nova encomenda narrativa será criada para isso.
- Nenhuma expansão de região, classe, loja ou facção.

## 6. Samples apresentados — Etapa 2

| Sample | Conteúdo para avaliação | Limite |
| --- | --- | --- |
| Vila Brumaflor — revisão 2 | Arquitetura, praça, oficina, canteiro, quatro personagens e saída com lampião danificado | Composição de conceito; mapa e escala não implementados |
| Mata do Freixo — revisão 2 | Trilha, árvore/solo, minério, erva-cinza, javali, protagonista e comparação do lampião | Não é tileset nem folha de estados exportável |
| Personagens — revisão 1 | Mara, Dario, Iria e protagonista; silhueta, roupa, paleta, retrato e estudo de costas | Não contém oito direções nem animações finais |
| Interface — revisão 2 | Inventário central/laterais/abaixo; diálogo, objetivo, coleta, crafting e combate | Quantidade de slots e aparência do avatar ilustrativas |

As imagens foram geradas e revisadas individualmente. Na revisão, o lampião da vila passou ao estado apagado/danificado, os acessórios extras do viajante na mata foram removidos e os equipamentos laterais da UI deram lugar a placeholders vazios. O cenário decorativo distante e o emblema da UI foram removidos.

**Pontos deliberadamente ainda não consolidados:** proporção do avatar de inventário frente ao sprite de mundo; pequenas diferenças de modelagem entre personagens de cena e prancha; padronização fina dos materiais e da câmera; versão técnica final do suporte do lampião. Um pequeno acessório de cintura/ombro permanece no viajante da vila como estudo visual e não declara item de inventário. A próxima produção deve usar o sprite-base aprovado como fonte única de continuidade, em vez de recortar cada personagem dos cenários.

**Distinção de qualidade:** a direção e o nível de detalhe dos samples orientam os assets; não há promessa de que recortar/redimensionar essas cenas produza tiles sem costura ou sprites consistentes. Cada recurso final exige produção específica, limpeza de pixels e inspeção no jogo.

## 7. Dependências e decisões de Gameplay

| Tema | Evidência atual | Validação necessária antes de produção final |
| --- | --- | --- |
| Motor | feat não tem implementação | Motor/importador; PixiJS 8 só se compatível |
| Escala | Brief deixa câmera/grid em aberto | Escolher resolução, viewport, zoom, grid e proporções |
| Movimento | Oito direções aprovadas; WASD proposto | Vistas, direções de ataque, animações e espelhamento |
| Combate | Q ataca e G defende | Ações visuais, duração, feedback, colisão; sem presumir armas/escudo |
| Interação | E obrigatório | Alcance, prioridade, indicador e oclusão de objetos |
| Inventário | Avatar central, dois grupos laterais, inventário abaixo | Tipos/capacidade de slots, pilhas, estados e foco |
| Recursos | Três ferramentas/categorias; IDs propostos | Registro de fontes, elegibilidade, consumo e exaustão; sem assumir respawn |
| Couro | Javali derrotado é fonte proposta | Aceitar/rejeitar a fonte e estados de coleta |
| Receita obrigatória | Dois minérios → uma presilha, proposta | Confirmar simplificação sem refino oculto e estação |
| Outras profissões | Cinco receitas complementares ainda sem outputs | Fornecer lista para estimar arte e ícones |
| Lampião | Recompensa world_state, alvo loc_lampiao_freixo, estado aceso | Troca de sprite/luz após entrega validada; persistência |
| Caminhos | first-quest/ permanece no pacote | Definir promoção canônica ou prefixo do loader |

A Bíblia usa uma formulação plural para lampiões na premissa, enquanto o fluxo e a recompensa identificam um único alvo de reparo. Para esta entrega, representa-se somente o lampião funcional da quest, sem alterar o texto ou criar objetivos adicionais. A referência a haste quebrada e a fala sobre presilha rompida será resolvida visualmente como suporte danificado, presilha quebrada e tira rompida; confirmação de Narrative/coordenação necessária antes do objeto final.

Não há ausência documental bloqueando os conceitos. Há ausência de contrato técnico bloqueando a declaração de assets finais como integráveis. Não foi afirmado contato ou aprovação de Gameplay que não tenha ocorrido.

## 8. Organização proposta para o futuro branch art

| Caminho | Função |
| --- | --- |
| `docs/art/ART_BIBLE.md` | Direção aprovada, câmera, escala, paleta e regras visuais |
| `docs/art/ASSET_MANIFEST.md` | Catálogo, status e mapeamento de IDs |
| `docs/art/INTEGRATION_NOTES.md` | Contrato validado com Gameplay e pendências |
| `concept-art/first-quest/` | Samples de referência; nunca carregados como assets finais por engano |
| `assets/art/characters/` | Sprites dos NPCs e exemplo do protagonista |
| `assets/art/environments/` | Construções, vegetação e conjuntos ambientais |
| `assets/art/tilesets/` | Terreno e transições |
| `assets/art/objects/` | Lampião, presilha, ferramentas e objetos |
| `assets/art/resources/` | Fontes de coleta e ícones de recursos |
| `assets/art/enemies/` | Javali |
| `assets/art/ui/` | Interface e ícones de apresentação |
| `assets/art/animations/` | Metadados comuns ou atlas, conforme importador aprovado |

Esta é uma proposta de estrutura, não publicação. Não são necessários IDs narrativos para cada tufo de grama ou detalhe decorativo.

### Ficha mínima de cada asset definitivo

ID da entidade já existente quando aplicável; chave local de arte distinta do ID narrativo; propósito; caminho; versão e estado de aprovação; dimensão de canvas; área visível; pivô; orientação; estado; sequência e duração dos quadros; camadas; transparência; perfil de cor; escala; tratamento de sombra; associação de colisão aprovada por Gameplay; dependências; autoria/origem e revisão.

PNG RGBA e metadados JSON são candidatos comuns, mas formato de atlas e schema dependem do importador. Textos continuam nos dados narrativos e caminhos de imagem ficam no catálogo de Arte. Não inserir arquivos gráficos nem APIs no JSON narrativo.

## 9. Plano de produção após os samples

1. Gabriel avalia separadamente vila, mata, personagens e UI. Registrar aprovado/revisar e os ajustes solicitados.
2. Arte/Gameplay validam uma pequena prova de escala: chão, porta, árvore, protagonista e lampião. Aprovar câmera/grid/pivôs antes de replicar trabalho.
3. Produzir P0 em lotes pequenos: primeiro chão e vegetação; arquitetura essencial; sprites; objetos/recursos e ações.
4. Produzir P1 compatível com os estados realmente suportados. Reservar P2 até o núcleo estar validado.
5. Preparar atlas/metadados e verificar transparência, corte, pivôs, alinhamento entre frames, oito direções, ordenação e colisões no motor.
6. Entregar catálogo com arquivos reais e validação; solicitar autorização explícita de publicação no branch art. Não modificar main, narrative ou feat.

Os passos acima descrevem dependências, não aprovações já concedidas. Aprovar a aparência não resolve automaticamente Gameplay nem autoriza um commit.

## 10. Verificação realizada e pendências

**Verificado nesta entrega:** leitura das oito fontes; inventário das árvores de main/art/feat; documentos de arte vazios; parse estrito dos dois JSONs; três NPCs, cinco diálogos e dez objetivos; IDs internos únicos e referências de diálogo checadas; inspeção visual dos quatro samples e revisões pontuais.

**Não verificado:** execução no motor, custo de renderização, animações, colisões, acessibilidade no viewport final, oito direções exportadas e testes de ponta a ponta. Não existem assets definitivos ou código novo nesta entrega.

**Aceite visual concedido:** direção visual e quatro samples aprovados por Gabriel. Publicação deste pacote autorizada no branch art. Assets finais e decisões técnicas permanecem pendentes de validação.
