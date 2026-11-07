# XP Forge — RPG Lab: Asset Manifest v0.1

**Estado:** somente as quatro referências em concept-art/first-quest existem como imagens aprovadas. Os caminhos assets/art listados abaixo são planejados; não são arquivos disponíveis para runtime.

## Arquivos de conceito realmente entregues

| Arquivo | Estado | Uso permitido neste pacote |
| --- | --- | --- |
| concept-art/first-quest/01_brumaflor_v2.png | Conceito aprovado | Referência de vila |
| concept-art/first-quest/02_mata_freixo_v2.png | Conceito aprovado | Referência de mata, recursos e lampião |
| concept-art/first-quest/03_personagens_v1.png | Conceito aprovado | Referência de personagens |
| concept-art/first-quest/04_interface_v2.png | Conceito aprovado | Referência de organização visual da UI |

Dimensões e SHA-256 dos arquivos reais: [manifest.json](../../concept-art/first-quest/manifest.json).

## Catálogo de produção planejada

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

## Organização e ficha técnica propostas

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

Nenhum ID externo foi renomeado ou criado por esta publicação. IDs de recursos, fontes, inimigo, receita e ferramentas conservam a condição de proposta até aceitação de Gameplay.
