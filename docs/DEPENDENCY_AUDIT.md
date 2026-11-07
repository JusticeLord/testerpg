# Auditoria de Dependências de Ecossistemas — XP Forge RPG LAB

**Status de Verificação Inicial — Branch `main`**  
Data de Auditoria: 2026-11-07  
Responsável: Lead Game Designer & Coordenador Técnico

---

## 1. Contexto e Objetivo
O projeto visa validar a cooperação entre três ecossistemas autônomos de IA (Engenharia/Game Design, Arte e Narrativa). Conforme o procedimento operacional padrão da XP Forge:
- Documentos e arquivos canônicos aprovados não devem ser inventados nem falsificados.
- Dependências ausentes devem ser registradas formalmente.
- O time de Engenharia e Game Design deve prover contratos e interfaces estritas, operando com dados de teste (`MOCK / TEST DATA`) e arte temporária claramente sinalizados até que as entregas dos respectivos departamentos sejam disponibilizadas.

---

## 2. Inventário de Arquivos Requeridos no Briefing

| Caminho Esperado | Status no Repositório | Ação Adotada pelo Game Design / Engenharia |
| :--- | :--- | :--- |
| `docs/PROJECT_BRIEF.md` | **AUSENTE** | Requisitos técnicos e escopo extraídos diretamente da diretriz de comando da XP Forge. |
| `docs/INTEGRATION_RULES.md` | **AUSENTE** | Regras de integração documentadas e formalizadas em `docs/TECHNICAL_INTERFACES.md`. |
| `docs/art/ART_BIBLE.md` | **AUSENTE** | Identificado como pendência do Departamento de Arte. Não inventado. |
| `docs/art/ASSET_MANIFEST.md` | **AUSENTE** | Especificação técnica de formatos e resoluções disponibilizada para o Departamento de Arte. |
| `docs/narrative/NARRATIVE_BIBLE.md` | **AUSENTE** | Identificado como pendência do Departamento de Narrativa. Não inventado. |
| `data/narrative/dialogues.json` | **AUSENTE** | Substituído por `src/data/mock/dialogues.mock.json` isolado e identificado. |
| `data/narrative/quests.json` | **AUSENTE** | Substituído por `src/data/mock/quests.mock.json` isolado e identificado. |

---

## 3. Estratégia de Mitigação e Isolamento Técnico

1. **Camada de Dados:**
   - Criação de adaptadores em `src/data/loaders/` que suportam carregar tanto arquivos canônicos (quando fornecidos) quanto os dados de teste (`mock`).
   - Nenhuma dependência estrutural interna acopla o jogo a caminhos rígidos sem fallback seguro.

2. **Camada Visual:**
   - Geração procedural/canvas de sprites e tiles em pixel art 16x16 / 32x32 com paleta retrô de teste.
   - Texturas temporárias claramente identificadas em log e código (`[TEMPORARY_TEST_ART]`).

3. **Próxima Ação Requerida dos Departamentos Externos:**
   - **Departamento de Arte:** Produzir spritesheet / tilesets segundo as especificações em `docs/TECHNICAL_INTERFACES.md`.
   - **Departamento de Narrativa:** Homologar e commitar `data/narrative/dialogues.json` e `data/narrative/quests.json` conforme os contratos estabelecidos.
