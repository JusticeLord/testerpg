# XP Forge — RPG Lab
## INTEGRATION RULES

**Status:** acordo inicial entre departamentos; contratos técnicos específicos exigem validação de Gameplay.
**Fonte de escopo:** `docs/PROJECT_BRIEF.md` no branch `main`.
**Objetivo:** integrar um protótipo técnico de RPG 2D sem escopo crescente ou suposições incompatíveis.

## 1. Fonte de verdade e precedência

1. O `PROJECT_BRIEF.md` aprovado governa visão, escopo e requisitos de experiência.
2. Este documento governa processos, pastas, contratos e integração.
3. Um contrato técnico explícito e versionado, aprovado pelos departamentos afetados, governa a implementação dos dados a que se refere, **sem contrariar o brief**.
4. Documentos de departamento especificam detalhes locais; não podem modificar unilateralmente controles, categorias de coleta, profissões, escopo ou interfaces.
5. Divergências são registradas como **pendência** e levadas ao responsável do projeto; não escolher silenciosamente uma versão.

## 2. Responsabilidades

| Departamento | Entrega | Não deve fazer unilateralmente |
| --- | --- | --- |
| Narrative Design | Premissa, NPCs, diálogos, missão/questline, objetivos narrativos, textos e dados narrativos | Inventar mecânicas, classes, itens funcionais não suportados, novos sistemas ou regras de combate. |
| Gameplay | Movimento, interação, combate, inventário, equipamentos, coleta, crafting, progresso de quests, carregadores/validação de dados | Reescrever identidade, diálogos ou motivações sem revisão narrativa. |
| Arte | Direção visual, cenários, sprites, personagens, itens e layout/estados de UI | Alterar IDs, hitboxes ou requisitos funcionais sem acordar com Gameplay. |
| Coordenação/Lead | Aprovação de escopo, resolução de conflitos e aceite de integração | Declarar concluído sem testes de ponta a ponta. |

## 3. Branches e organização

- `main`: referência integrada/aprovada. Não receber conteúdo narrativo experimental sem revisão e aprovação.
- `narrative`: branch de trabalho do departamento narrativo.
- Pasta do primeiro pacote: `first-quest/` **dentro de `narrative`**.
- Caminhos esperados do pacote:
  - `first-quest/docs/narrative/NARRATIVE_BIBLE.md`
  - `first-quest/docs/narrative/CHARACTERS.md`
  - `first-quest/docs/narrative/QUESTS.md`
  - `first-quest/docs/narrative/DATA_SCHEMA.md`
  - `first-quest/data/narrative/dialogues.json`
  - `first-quest/data/narrative/quests.json`
- Outros branches existentes são propriedade dos respectivos departamentos. Não assumir que código ou assets de branch paralelo já estão no `main`.

**Atenção ao caminho:** os arquivos do primeiro pacote estarão sob `first-quest/` no branch narrativo; no momento da integração, Gameplay e coordenação decidirão se os dados devem ser **promovidos aos caminhos canônicos** `docs/narrative/` e `data/narrative/` do `main`, ou se o loader deve ler o prefixo. Não misturar as duas alternativas implicitamente.

## 4. Política de alterações e publicação

1. Ler a versão atual de `main` de ambos os documentos centrais antes de trabalhar.
2. Propor conteúdo mínimo, revisar a coerência internamente e entregar arquivos completos para aprovação.
3. Após aprovação explícita, publicar somente no branch do departamento, preservando `main`.
4. Validar diferenças, JSONs, IDs e referências cruzadas; registrar dependências e testes.
5. Integração no `main` ocorre apenas por revisão/autorização da coordenação, preferencialmente via pull request.
6. Não executar merge automático, não sobrescrever arquivos de outro departamento e não modificar branches paralelos sem autorização.
7. Documentar qualquer mudança de escopo no brief antes de implementá-la.

## 5. IDs estáveis e nomenclatura

- IDs técnicos: `snake_case`, minúsculos, sem acentos, espaços ou caracteres especiais; únicos **dentro de cada categoria**.
- Prefixos recomendados: `npc_`, `dlg_`, `quest_`, `obj_`, `choice_`, `item_`, `resource_`, `recipe_`, `reward_`, `loc_`, `enemy_`, `event_`.
- Referências cruzadas sempre usam o ID, nunca a posição em array nem o texto exibido.
- IDs publicados são imutáveis por padrão. Renomear exige migração explícita e atualização de todos os consumidores.
- Textos visíveis ao jogador permanecem em português brasileiro (`pt-BR`) nesta fase; código e IDs podem permanecer em inglês técnico.
- Identificadores de recursos, ferramentas, receitas, inimigos e equipamentos **precisam ser acordados com Gameplay antes de serem tratados como definitivos**. IDs narrativos propostos não criam itens automaticamente.

## 6. Contratos de dados narrativos

- `dialogues.json`: diálogos, participantes, nós/linhas, transições e no máximo uma escolha narrativa simples.
- `quests.json`: questline, etapas/objetivos, gatilhos/condições de conclusão, referências a NPCs/diálogos/recursos/receitas e recompensas.
- `DATA_SCHEMA.md`: significado, tipo, obrigatoriedade, valores permitidos e exemplo de cada campo efetivamente utilizado.
- Os arquivos devem ser **JSON estritamente válido** (sem comentários ou vírgulas finais); usar UTF-8.
- Todas as referências internas precisam existir; estruturas de controle não podem conter caminhos de asset ou chamadas diretas de engine.
- Narrativa descreve intenções e condições; Gameplay implementa listeners, mudanças de estado, contadores e concessão de recompensa.
- O formato exato de nós, expressões de condição, gatilhos, payloads de eventos e schemas de recompensa depende de validação explícita de Gameplay **antes da publicação como contrato final**.

## 7. Interface de eventos e estados — contrato a acordar

Gameplay deve fornecer uma tabela estável para eventos que Narrative poderá referenciar. Capacidades mínimas esperadas:

| Domínio | Evento/estado necessário (conceitual, não nome de API) |
| --- | --- |
| Interação | Jogador interagiu com um NPC/objeto via `E`. |
| Diálogo | Nó visto, conversa encerrada, escolha única registrada. |
| Exploração | Área/ponto de interesse relevante alcançado. |
| Combate | Inimigo elegível derrotado e uso de defesa testável. |
| Coleta | Recurso adquirido; ferramenta exigida validada. |
| Crafting | Receita concluída; insumos consumidos; produto obtido. |
| Inventário | Item adquirido, consumido ou equipado conforme sistema. |
| Quest | Objetivo iniciado, progredido, concluído; quest concluída; recompensa concedida uma única vez. |

Nenhuma string de evento, propriedade do estado, API ou limiar numérico nesta tabela deve ser tomada como já implementada. Gameplay estabelece nomes e semântica; Narrative os referencia depois.

## 8. Interfaces com Arte

Para cada NPC, item importante, inimigo e local necessário, Narrative entrega **ID, nome de exibição, função em cena e descrição breve**. Arte devolve o mapeamento de ID para asset aprovado. Gameplay associa o asset ao objeto.

- Não usar caminhos de imagem como identificadores de entidades.
- A referência estética a World of Warcraft e o arranjo funcional de inventário de MU não autorizam reprodução de seus assets, nomes ou desenhos.
- O layout de inventário aprovado exige avatar ao centro, equipamentos em dois grupos laterais e inventário abaixo; detalhes como número e tipo de slots serão validados entre Arte e Gameplay.
- Sprites/animações devem atender às oito direções acordadas ou à solução de espelhamento documentada; não presumir que um asset isolado resolve todas as orientações.

## 9. Regras de escopo e colaboração

- Priorizar um fluxo **jogável e verificável** em vez de quantidade de diálogos, quests, objetos ou locais.
- Primeira questline: no máximo três NPCs relevantes e uma escolha narrativa; sem facções, classes, dungeons extensas ou lore fora do vilarejo/arredores.
- As seis profissões devem ter verificação demonstrativa, mas a história exige apenas o crafting necessário para testar o sistema.
- Pedidos que acrescentem mecânica nova devem ser sinalizados como **dependência de Gameplay** e submetidos à coordenação.
- Em caso de conflito entre prazo e escopo, reduzir conteúdo opcional antes de reduzir a integridade dos testes centrais.

## 10. Checklist de revisão cruzada

Antes da aprovação de um pacote narrativo:
- [ ] Brief e regras consultados na versão mais recente do `main`.
- [ ] Três NPCs, cenário e enredo originais; diálogos naturais, concisos e coerentes.
- [ ] Questline curta cobre exploração, `E`, conversa, `Q`/`G`, coleta e crafting.
- [ ] Não há mais de uma escolha nem ramificações extensas.
- [ ] `dialogues.json` e `quests.json` são válidos e aderentes a `DATA_SCHEMA.md`.
- [ ] IDs únicos e referências cruzadas íntegras; recursos, ferramentas e receitas aceitos por Gameplay.
- [ ] Arte conhece a lista de assets e os estados/ângulos necessários.
- [ ] Não há referência a API, inimigo, item ou equipamento presumido como implementado.
- [ ] Testes de sucesso, bloqueio e conclusão sem repetição indevida de recompensa definidos.
- [ ] Coordenação aprova a publicação no branch do departamento; integração no `main` ocorre separadamente.

## 11. Pendências imediatas

1. Gameplay validar os controles propostos para movimentação, o comportamento de ataque/defesa, os estados do inventário e o contrato de eventos/quest.
2. Gameplay validar as fontes e regras de minério, erva e couro e as seis receitas de demonstração.
3. Arte e Gameplay definir câmera, grid, escala visual, mapa e arranjo definitivo de slots.
4. Narrative apresentar nome original do povoado, três NPCs e questline curta, sem confirmar mecânicas não aprovadas.
5. Coordenação confirmar localização canônica dos arquivos ao promover `first-quest/` para integração.
