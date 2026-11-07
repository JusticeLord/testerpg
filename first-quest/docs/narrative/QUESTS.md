# RPG Lab — Questline 01: A Luz do Caminho

**ID:** `quest_luz_caminho` | **Tipo:** questline principal curta e linear | **Status:** proposta sujeita à validação de Gameplay.

## Premissa jogável

Mara precisa recolocar em funcionamento o lampião da Trilha do Freixo. O reparo pede uma presilha de ferro, uma tira de couro e uma porção de erva-cinza. O jogador prepara os materiais na borda da floresta, enfrenta um javali hostil, fabrica a presilha na oficina e entrega tudo a Mara.

## Fluxo obrigatório

| Etapa | Objetivo (ID) | Comprovação de jogo esperada | Diálogo relacionado |
| --- | --- | --- | --- |
| 1 | `obj_falar_mara` | Conversa inicial concluída / quest aceita. | `dlg_mara_inicio` |
| 2 | `obj_falar_dario` | Conversa com Dario concluída. | `dlg_dario_oficina` |
| 3 | `obj_falar_iria` | Conversa com Iria concluída. | `dlg_iria_erva` |
| 4 | `obj_explorar_freixo` | Região `loc_borda_mata` alcançada. | — |
| 5 | `obj_derrotar_javali` | Um `enemy_javali_freixo` derrotado. | — |
| 6 | `obj_minerar_ferro` | Adquirir **2** de `resource_minerio_ferro` usando `item_picareta`. | — |
| 7 | `obj_colher_erva` | Adquirir **1** de `resource_erva_cinza` usando `item_pa`. | — |
| 8 | `obj_esfolar_couro` | Adquirir **1** de `resource_couro_cru` usando `item_faca_esfolamento` (fonte proposta: javali derrotado). | — |
| 9 | `obj_forjar_presilha` | Concluir `recipe_presilha_trilha`, recebendo `item_presilha_trilha`. | `dlg_dario_oficina` (referência ao local da oficina) |
| 10 | `obj_entregar_mara` | Retornar a Mara com presilha, couro e erva; validar entrega e encerrar a quest uma única vez. | `dlg_mara_retorno` |

**Ordem:** etapas 1–3 são sequenciais para clareza da primeira execução. Após entrar na mata, combate e as três coletas podem ocorrer em qualquer ordem; a fabricação depende da posse de minério suficiente. A entrega depende dos três insumos finais. Essa flexibilidade **não é uma ramificação narrativa**.

## Itens e resultados

- Ferramentas exigidas: `item_picareta`, `item_pa`, `item_faca_esfolamento`. **Distribuição inicial e posse/equipamento** devem ser decididos por Gameplay; a quest não cria NPC extra nem loja.
- Receita obrigatória: `recipe_presilha_trilha` (Ferreiro): 2 × `resource_minerio_ferro` → 1 × `item_presilha_trilha` (proposta, sem refino).
- Entrega final: 1 × `item_presilha_trilha`, 1 × `resource_couro_cru`, 1 × `resource_erva_cinza`. O consumo é de responsabilidade do fluxo transacional de Gameplay.
- Recompensa proposta: `reward_lampiao_aceso`, tipo **estado narrativo/visual**, sem dinheiro, experiência ou equipamento presumidos. O lampião passa ao estado de iluminação restaurada, e a quest termina.
- A demonstração de **defesa `G`** é um requisito de teste funcional do encontro com javali, não uma condição narrativa de derrota/quest (para evitar softlock se o inimigo morrer antes de defender).

## Escolha narrativa

Uma escolha **de tom**, no início: prontidão ou pedido de explicação. Ambas convergem para a aceitação da mesma quest. Sem flags permanentes, requisitos alternativos ou recompensas diferentes.

## Condições de conclusão e falha

- **Sucesso:** objetivo de entrega validado com itens corretos; recompensa concedida **uma vez**; `quest_luz_caminho` marcada como concluída; `dlg_mara_apos` disponível depois.
- **Tentativa sem materiais:** Mara usa a variante de retorno incompleto, sem concluir nem consumir itens.
- **Ferramenta ausente:** Gameplay impede a coleta e oferece feedback de interface; progresso preservado.
- **Combate interrompido / personagem derrotado:** retomada ou respawn conforme Gameplay; não inserir falha permanente de quest sem aprovação.
- **Inventário cheio:** Gameplay deve evitar perda silenciosa de recursos e impedir conclusão falsa.
- **Repetição:** diálogo final e premiação não podem duplicar recompensa nem reinicializar etapas.

## Dependências para Gameplay

1. Registro e retomada de estados/objetivos da questline; eventos de conclusão de diálogo, entrada em região, derrota, coleta, crafting e entrega.
2. Ferramentas identificadas e validação de picareta, pá e faca; meios de obtê-las sem NPC adicional.
3. Ao menos um depósito de minério, erva coletável e fonte esfolável; quantidades suficientes para completar a missão mesmo após consumo/falha.
4. Um javali hostil; ataque `Q` e defesa `G` exercitáveis com feedback claro.
5. Inventário com contagem correta; a receita de Ferreiro; validação e consumo atômico na entrega.
6. Interface para `E`, `I` e fluxo de diálogo; estados do lampião e conclusão persistente.
7. API/eventos concretos e nomes exatos ainda **não foram acordados**: os campos JSON descrevem **condições conceituais**, não código executável nem APIs existentes.
8. As cinco outras profissões (Engenheiro, Joalheiro, Escriba, Alquimista, Coureiro) precisam de **receitas demonstrativas para a suíte de testes**, não fazem parte da questline principal. Não implementar uma segunda trama para exercitá-las.

## Dependências para Arte

- Vila Brumaflor, praça, oficina, canteiro, trilha, borda da mata e lampião em dois estados visuais.
- Sprites dos três NPCs e de um javali; depósito mineral, erva e fonte de couro; ícones para três ferramentas, três recursos e a presilha.
- Arte original em pixel art, mantendo legibilidade das oito direções, sem copiar recursos de jogos de referência.

## Aceite narrativo

O jogador entende por que precisa sair da vila, conversa com os três NPCs, enfrenta um risco, coleta três tipos de material, cria uma peça e percebe a mudança concreta no mundo ao voltar. A narrativa termina ali.