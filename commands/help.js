const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'A help command to discover commands',
    execute(message) {
        const embed = new Discord.MessageEmbed()
            .attachFiles(['./help.png'])
            .setAuthor("Menu d'aide", 'attachment://help.png')
            .setDescription('Bonjour, voici la documentation de Cayde-6.')
            .addFields(
                {
                    name: 'Général (4)',
                    value: '`bot-info`, `help`, `server-info`, `user-info`'
                },
                {
                    name: 'Staff (3)',
                    value: '`clear`, `status`, `warn`',
                }
            )
            .setColor('#4885ed')
            .setFooter('Cayde-6 - Clan Androméda', 'https://cdn.discordapp.com/avatars/748429269415493722/8efde9546924fc32cfae679d737235ce.png?size=256');

        message.channel.send(embed);
    }
}