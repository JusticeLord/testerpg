# RPG Lab — Esquema dos dados narrativos

**Versão:** `0.1-proposal` — **formato de intercâmbio proposto, não contrato de engine aprovado**. Os dois arquivos são UTF-8/JSON válido e não contêm scripts executáveis nem caminhos de assets.

## Convenções

- IDs: `snake_case` com prefixos de categoria; estáveis após aprovação, únicos no próprio namespace.
- Todos os textos de interface/conversa: pt-BR.
- `id` representa referência, não nome visível; referências externas precisam ser cadastradas por Gameplay/Arte.
- Campos opcionais aparecem apenas quando relevantes; `null` em `next_node_id` encerra a linha/conversa.
- `quantity` é inteiro positivo. Não implica taxa de drop, stack ou inventário existente.
- `schema_version` e `integration_status` indicam que a estrutura é proposta; **Gameplay deve aprovar/transformar os campos antes de consumi-los**.

## `data/narrative/dialogues.json`

| Campo | Tipo | Significado |
| --- | --- | --- |
| `schema_version` | string | Versão do formato proposto. |
| `locale` | string | Idioma, nesta fase `pt-BR`. |
| `npcs` | array | Cadastro narrativo mínimo dos três interlocutores. |
| `npcs[].id`, `.name`, `.location_id` | strings | ID estável, nome exibido e local proposto. |
| `dialogues` | array | Conversas existentes. |
| `dialogues[].id` | string | ID de conversa, como `dlg_mara_inicio`. |
| `dialogues[].npc_id` | string | NPC responsável, deve existir em `npcs`. |
| `dialogues[].availability` | string | Rótulo conceitual para estado (`quest_not_started`, `quest_active`, `quest_active_return`, `quest_completed`). Não é expressão executável. |
| `dialogues[].entry_node_id` | string | Nó inicial da própria conversa. |
| `dialogues[].nodes` | array | Falas da conversa. |
| `nodes[].id`, `.speaker_id`, `.text` | strings | ID da linha, interlocutor (`npc_*`) e texto literal. |
| `nodes[].next_node_id` | string ou null | Próxima linha, ou encerramento. Ausente em nós com `choices`. |
| `nodes[].choices` | array opcional | Duas opções de tom; somente no nó `node_mara_02`. |
| `choices[].id`, `.text`, `.next_node_id` | strings | ID da escolha, texto do jogador e próximo nó (na mesma conversa). |
| `dialogues[].outcomes` | array opcional | Variantes condicionais de fechamento, apenas no retorno à Mara. |
| `outcomes[].id`, `.condition_id`, `.text` | strings | ID, condição referida em quests.json e fala contextual. |
| `outcomes[].complete_objective_id` | string opcional | Objetivo concluído após uma entrega validada, sem assumir API real. |

**Interpretação pendente:** `outcomes` são alternativas **automáticas por condição**, não uma segunda escolha narrativa. Gameplay define prioridade, avaliação e momento da apresentação; o texto de sucesso só deve aparecer após validação transacional da entrega.

## `data/narrative/quests.json`

| Campo | Tipo | Significado |
| --- | --- | --- |
| `schema_version`, `locale` | strings | Versão proposta e idioma. |
| `quests` | array | Questlines. Nesta entrega, exatamente uma. |
| `quests[].id`, `.title`, `.summary` | strings | ID, nome e apresentação. |
| `start_npc_id`, `end_npc_id` | strings | Referências a NPCs declarados em dialogues.json. |
| `start_dialogue_id`, `end_dialogue_id`, `post_dialogue_id` | strings | Referências às conversas de início, retorno e pós-conclusão. |
| `location_ids` | array de strings | Regiões usadas; IDs conceituais para mapa. |
| `objectives` | array | Lista completa de objetivos. |
| `objectives[].id`, `.description` | strings | Identificação e instrução ao jogador. |
| `objectives[].kind` | string | Categoria conceitual: `dialogue_completed`, `location_reached`, `enemy_defeated`, `resource_gathered`, `recipe_crafted`, `handover`. |
| `objectives[].target_id` | string | ID do alvo de evento, item, NPC ou receita, conforme `kind`. |
| `objectives[].quantity` | inteiro positivo | Número de ocorrências/unidades exigidas. |
| `objectives[].required_tool_id` | string opcional | Ferramenta que Gameplay deve validar na coleta. |
| `objectives[].proposed_source_id` | string opcional | Fonte sugerida de couro; exige aprovação de Gameplay. |
| `objectives[].condition_id` | string opcional | Condição aplicada à entrega. |
| `progression` | objeto | Agrupamento declarativo para ordenação de objetivos. |
| `progression.intro_objective_ids` | array de strings | Diálogos iniciais em sequência. |
| `progression.exploration_objective_id` | string | Chegada à área de exploração. |
| `progression.field_objective_ids` | array de strings | Combate e coletas; ordem livre quando liberados. |
| `progression.craft_objective_id` | string | Fabricação da presilha. |
| `progression.final_objective_id` | string | Entrega e conclusão. |
| `progression.field_objectives_any_order` | booleano | Permite progredir nos objetivos de campo em ordem livre. |
| `conditions` | array | Verificações conceituais de itens para entrega. |
| `conditions[].id`, `.kind` | strings | ID e tipo (`all_items_present` ou `negation`). |
| `conditions[].items` | array opcional | Pares `id` e `quantity` necessários. |
| `conditions[].condition_id` | string opcional | Condição referida para negação. |
| `recipe_proposals` | array | Receitas propostas; **não configura o crafting engine automaticamente**. |
| `recipe_proposals[].id`, `.profession`, `.status` | strings | ID, profissão e pendência. |
| `recipe_proposals[].ingredients` | array | IDs e quantidades consumidas. |
| `recipe_proposals[].output` | objeto | ID e quantidade produzidos. |
| `reward` | objeto | Recompensa conceitual de quest. |
| `reward.id`, `.kind`, `.target_id`, `.state` | strings | ID, tipo `world_state`, alvo cenográfico e estado `aceso`. |
| `reward.grant_once` | booleano | Não repetir a concessão. |
| `integration_status` | string | `proposed_not_implemented` até validação. |

## Referências e namespaces

- NPCs: `npc_mara`, `npc_dario`, `npc_iria` em `dialogues.json`.
- Diálogos: `dlg_mara_inicio`, `dlg_dario_oficina`, `dlg_iria_erva`, `dlg_mara_retorno`, `dlg_mara_apos`.
- Escolhas: `choice_mara_pratico`, `choice_mara_pergunta`; ambas se encontram em `node_mara_04`.
- Quest: `quest_luz_caminho`; objetivos em `quests[].objectives`.
- Condições: `cond_entrega_completa`, `cond_entrega_incompleta`.
- Receita: `recipe_presilha_trilha`; recompensa: `reward_lampiao_aceso`.
- Recursos/itens/locais/inimigo: dependências externas identificadas em `NARRATIVE_BIBLE.md`; seus IDs são **propostos**, não registros de Gameplay.

## Contrato de execução ainda não aprovado

A execução de `availability`, `outcomes`, `kind`, `progression`, condições e recompensa só é válida quando Gameplay aprovar um parser ou mapear estes termos para seu modelo existente. Este JSON é uma **especificação narrativa de dados**, não uma afirmação de suporte da engine. Gatilhos concretos, transações de consumo, persistência e testes permanecem com Gameplay.