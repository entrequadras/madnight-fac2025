// Modificação MÍNIMA no game.js - apenas a função handleMapTransition

// Substituir a função handleMapTransition no game.js:
function handleMapTransition() {
    if (gameState.phase === 'escape') {
        // Voltando durante a fuga
        if (gameState.currentMap > 0) {
            gameState.currentMap--;
            loadMap(gameState.currentMap, true);
        } else {
            // Chegou ao início - vitória!
            handleVictory();
        }
    } else if (gameState.phase === 'infiltration') {
        // MODIFICAÇÃO: Limitar até mapa 2
        if (gameState.currentMap < 2) {  // MUDANÇA: era "maps.getCount() - 1", agora é "2"
            gameState.currentMap++;
            loadMap(gameState.currentMap);
        } else {
            // NOVO: Após mapa 2, mostrar vitória e voltar ao menu
            console.log('Demo concluída! Voltando ao menu...');
            
            // Mostrar mensagem de fim da demo
            if (ui && ui.showMessage) {
                ui.showMessage('DEMO CONCLUÍDA!\nObrigado por jogar!', 3000);
            }
            
            // Voltar ao menu após 3 segundos
            setTimeout(() => {
                if (window.MadNightMain && window.MadNightMain.backToMenu) {
                    window.MadNightMain.backToMenu();
                }
            }, 3000);
        }
    }
}
