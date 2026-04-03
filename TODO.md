# Task: Adicionar links CSS específicos em cada view EJS

## Status: Em progresso ✅

### 1. ✅ CONCLUÍDO - layouts/main.ejs
- Adicionado bloco dinâmico de CSS no <head>

### 2. ✅ CONCLUÍDO - Controllers públicos atualizados
- homeController.js: cssFiles = ['style.css', 'home.css', 'animations.css']
- secaoController.js: index=['style.css', 'secao-index.css'], post=['style.css', 'secao-post.css']
- afazeresController.js: ['style.css', 'afazeres-index.css']
- comentariosController.js: ['style.css', 'site-comentarios.css', 'comentarios.css']
- simpleAuthController.js: ['style.css', 'auth-simple-login.css']

### 3. [PENDENTE] Verificar controllers admin
- Confirmar que já passam cssFiles específicos

### 4. [PENDENTE] Testar
- Executar `cd src && node app.js`
- Verificar CSS em: /, /secao/..., /admin, etc.

### 5. [PENDENTE] Finalizar
- Marcar como concluído e attempt_completion
