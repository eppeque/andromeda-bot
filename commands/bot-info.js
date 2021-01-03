const Discord = require('discord.js');

module.exports = {
    name: 'bot-info',
    description: 'To get infos about the bot',
    execute(message) {
        const embed = new Discord.MessageEmbed()
            .setAuthor('Cayde-6', 'https://cdn.discordapp.com/avatars/748429269415493722/8efde9546924fc32cfae679d737235ce.png?size=256')
            .addFields(
                {
                    name: 'Informations générales',
                    value: '**Développeurs** : `Eppeque#4928`, `OuiCKirb76#8666`\nCréé le `27/08/2020`, le bot tourne actuellement sur la version `1.0.0`',
                },
                {
                    name: 'Autres renseignements',
                    value: '**Machine** : `linux` - `(x64)`\n**Version discord.js** : `12.5.1`',
                },
            )
            .setColor('#4885ed')
            .setFooter('Page Github : https://github.com/eppeque/andromeda-bot');
        message.channel.send(embed);
    }
}