# RPG Lab — Personagens e diálogos essenciais

**Versão:** proposta 0.1. As falas literais estão estruturadas também em `data/narrative/dialogues.json`.

## `npc_mara` — Mara

- **Papel:** responsável informal pelo estado da Trilha do Freixo; inicia a questline e confirma sua conclusão.
- **Presença:** praça / saída da vila em `loc_brumaflor`.
- **Personalidade:** resoluta, cansada de improvisos; pede ajuda sem teatralidade. Importa-se com as pessoas que usam a estrada.
- **Objetivo imediato:** voltar a iluminar a curva da trilha antes de anoitecer.
- **Direção visual para Arte:** adulta, roupa de trabalho reforçada, capa curta gasta, chaveiro ou corda de serviço; silhueta distinta, sem reproduzir NPCs de outras franquias.
- **Voz:** períodos curtos; ironia seca quando está preocupada.
- **Falas-chave:**
  - “O lampião da curva apagou de vez. Ontem quase tropeçaram ali no escuro.”
  - “Sei que é pedir muito. Mas aquela trilha não pode ficar assim.”
  - “Pronto. Já dá para ver o caminho de novo. Obrigada.”
- **Diálogos:** `dlg_mara_inicio`, `dlg_mara_retorno`, `dlg_mara_apos`.

## `npc_dario` — Dario

- **Papel:** ferreiro; apresenta o problema material e a fabricação obrigatória.
- **Presença:** `loc_oficina_dario`.
- **Personalidade:** meticuloso, objetivo; demonstra confiança no trabalho bem-feito, não em discursos.
- **Objetivo imediato:** substituir a presilha quebrada do lampião.
- **Direção visual para Arte:** avental com marcas de fuligem, ferramentas simples, postura de quem passou o dia na bancada.
- **Voz:** pragmático; explica pouco, mas explica o suficiente.
- **Falas-chave:**
  - “A presilha abriu no meio. Amarrar com barbante não dura uma noite.”
  - “Duas porções de minério bastam. Faz a peça aqui e leva para Mara.”
- **Diálogo:** `dlg_dario_oficina`.

## `npc_iria` — Iria

- **Papel:** herborista; liga a colheita de ervas ao problema do lampião.
- **Presença:** pequeno canteiro em `loc_brumaflor`.
- **Personalidade:** observadora, cuidadosa; tem humor suave e evita exageros.
- **Objetivo imediato:** conseguir erva-cinza para retirar a crosta do vidro e da armação, de acordo com o reparo planejado.
- **Direção visual para Arte:** cesto de folhas, roupas de fibras claras e pequenas manchas vegetais; sem adereços mágicos obrigatórios.
- **Voz:** ponderada; não soa como uma enciclopédia de plantas.
- **Falas-chave:**
  - “O vidro também está tomado de fuligem. Tem uma erva na mata que ajuda a soltar aquilo.”
  - “Se encontrar erva-cinza, traga uma porção. Não precisa arrancar o canteiro inteiro.”
- **Diálogo:** `dlg_iria_erva`.

## Protagonista

Sem identidade, classe, gênero, origem ou aparência fixa. Pode responder em uma única escolha de tom em `dlg_mara_inicio`:

- `choice_mara_pratico`: “Eu cuido disso.”
- `choice_mara_pergunta`: “O que aconteceu com o lampião?”

As duas respostas levam ao mesmo pedido e **não alteram quests nem recompensas**.

## Orientação de interpretação

Não inserir botões de teclado nas falas. O aviso de interação (`E`), combate (`Q`/`G`) ou inventário (`I`) é instrução de interface, responsabilidade de Gameplay. Se a fala precisar reaparecer, preferir variantes curtas já previstas a repetir o início integral da quest.