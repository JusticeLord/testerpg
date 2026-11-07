# RPG Lab — Bíblia Narrativa: A Luz do Caminho

**Versão:** proposta 0.1 para aprovação | **Idioma:** pt-BR | **Escopo:** primeiro teste narrativo.
**Documentos superiores:** `docs/PROJECT_BRIEF.md` e `docs/INTEGRATION_RULES.md` do `main`.

## Premissa

Em **Vila Brumaflor**, uma comunidade medieval cercada de hortas, oficinas e estradas de terra, os lampiões da **Trilha do Freixo** deixaram de acender. A trilha margeia uma floresta usada por moradores ao cair da tarde. Uma haste foi quebrada e o couro que prendia a proteção do lampião se rompeu. Sem iluminação, animais se aproximam do caminho. Não há catástrofe nem mistério sobrenatural: é um problema pequeno, mas importante para quem mora ali.

**Mara**, responsável por manter a trilha utilizável, pede ajuda. **Dario**, ferreiro, explica que é preciso refazer uma presilha metálica; **Iria**, herborista, precisa de uma erva da margem da mata para preparar uma mistura usada na limpeza do lampião. O protagonista atravessa o limite da floresta, recolhe minério, erva e couro, enfrenta um javali agressivo, fabrica a presilha na oficina e retorna com os materiais para que Mara conclua o reparo. O gesto final é um lampião que volta a iluminar a estrada.

## Princípio dramático

Uma comunidade se sustenta por trabalhos comuns. O protagonista não é o escolhido de uma profecia: é alguém capaz de ajudar em algo concreto. O encerramento é a retomada segura da trilha, não uma promessa de grande aventura.

## Tom e escrita

- Fantasia medieval cotidiana, acolhedora, com risco moderado nos arredores.
- Conversas diretas, humanas, com pequenas hesitações, preocupações e humor discreto. Evitar fala de tutorial disfarçada de diálogo.
- Personagens falam sobre o que sabem; ninguém recita lore nem explica mecânicas de teclado.
- Violência sem gore. O javali é uma ameaça territorial, não uma criatura maligna.
- Originalidade obrigatória: sem nomes, locais, mapas ou personagens de *World of Warcraft* ou *MU*.

## Geografia mínima

| ID | Local | Função |
| --- | --- | --- |
| `loc_brumaflor` | Vila Brumaflor | Praça, casas e acesso à oficina; abriga os três NPCs relevantes. |
| `loc_oficina_dario` | Oficina de Dario | Local narrativo de confecção da presilha; eventual estação depende de Gameplay. |
| `loc_trilha_freixo` | Trilha do Freixo | Caminho que liga o povoado à borda da floresta; contém o lampião danificado. |
| `loc_borda_mata` | Borda da Mata do Freixo | Área contida nos arredores; oferece pontos de coleta e o encontro hostil. |

A distância exata, o mapa, os tiles e a câmera são decisões de Arte e Gameplay. Nenhum destino fora desse conjunto é necessário.

## Personagens

1. `npc_mara` — Mara, guardiã informal do caminho; inicia e encerra o pedido.
2. `npc_dario` — Dario, ferreiro prático; dá contexto à presilha e à fabricação.
3. `npc_iria` — Iria, herborista atenta; esclarece a utilidade da erva.

São os **únicos três NPCs relevantes** da questline. O protagonista não recebe nome, classe ou origem obrigatórios.

## Vocabulário de recursos e objetos (propostas sujeitas a Gameplay)

- `resource_minerio_ferro`: minério de ferro; coleta com `item_picareta`.
- `resource_erva_cinza`: erva-cinza; coleta com `item_pa`.
- `resource_couro_cru`: couro cru obtido de fonte esfolável, proposta: `enemy_javali_freixo` derrotado; coleta com `item_faca_esfolamento`.
- `recipe_presilha_trilha`: receita demonstrativa de **Ferreiro**; consome 2 unidades de minério de ferro e produz `item_presilha_trilha`.
- `item_presilha_trilha`: peça metálica criada pelo jogador para o reparo.
- `loc_lampiao_freixo`: ponto de referência do lampião danificado (objeto de cenário, não NPC).

O uso de minério bruto diretamente na receita é uma **simplificação de protótipo**; caso Gameplay exija refino, a receita precisa ser aprovada/ajustada **sem introduzir uma profissão ou etapa oculta**. Ferramentas, itens, inimigo, ponto de coleta e receitas não são declarados implementados por esta bíblia.

## Limites narrativos

- Uma questline, um conflito local, três NPCs, um inimigo-tipo, três categorias de recurso e uma receita obrigatória.
- No máximo uma escolha de tom no diálogo inicial, com reconvergência imediata e **sem consequência sistêmica**.
- Nada de facções, classes, equipamentos lendários, lojas, mercado, eventos sobrenaturais, segundo povoado ou sequência prometida.
- As demais cinco profissões pertencem ao **plano de testes de Gameplay**, não a esta narrativa; devem receber receitas demonstrativas no sistema, sem forçar seis encomendas na questline.

## Conclusão dramática

Mara recebe a presilha, a erva e o couro; o lampião volta a acender. A conclusão exige os registros de missão adequados, mas não supõe uma cena cinemática, um sistema complexo de reparo ou uma ação de crafting adicional. A iluminação pode ser representada por uma troca de estado visual aprovada por Arte/Gameplay.