const Discord = require('discord.js');

module.exports = {
    name: 'server-info',
    description: 'Get the server infos',
    execute(message, client) {
        const createdAt = message.guild.createdAt;
        const days = [
            'Dimanche',
            'Lundi',
            'Mardi',
            'Mercredi',
            'Jeudi',
            'Vendredi',
            'Samedi',
        ];
        const dayIndex = createdAt.getDay();

        const months = [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Août',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre',
        ];
        const monthIndex = createdAt.getMonth();

        const embed = new Discord.MessageEmbed()
            .setAuthor('Cayde-6', 'https://cdn.discordapp.com/avatars/748429269415493722/8efde9546924fc32cfae679d737235ce.png?size=256')
            .addFields(
                {
                    name: 'Propriétaire',
                    value: 'Eppeque#4928',
                    inline: true,
                },
                {
                    name: 'ID du serveur',
                    value: message.guild.id,
                    inline: true,
                },
                {
                    name: 'Membres',
                    value: message.guild.memberCount - 3, // 3 is the number of bots on the server. They aren't included in the count
                    inline: true,
                },
            )
            .addFields(
                {
                    name: 'Date de création du serveur',
                    value: `${days[dayIndex]} ${createdAt.getDate()} ${months[monthIndex]} ${createdAt.getFullYear()}\n${createdAt.getHours()}:${createdAt.getMinutes()}`,
                    inline: true,
                },
                {
                    name: 'Salons',
                    value: `${client.channels.cache.size} salons vocaux`,
                    inline: true,
                },
                {
                    name: `Rôles (${message.guild.roles.cache.size})`,
                    value: message.guild.roles.cache.map(role => role),
                    inline: false,
                },
            )
            .setFooter('Cayde-6 - Clan Androméda')
            .setColor('#4885ed');

        message.channel.send(embed);
    }
}