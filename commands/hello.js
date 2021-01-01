module.exports = {
    name: 'hello',
    description: 'The bot answers hello',
    execute(message) {
        if (message.content.toLowerCase().includes('salut')) {
            message.reply('Salut à toi !');
        } else {
            message.channel.send('Désolé mais je ne sais pas quoi faire là...');
        }
    }
}