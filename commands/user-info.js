const Discord = require('discord.js');

module.exports = {
    name: "user-info",
    description: "Les profils des joueurs",
    execute(message) {
        const author = message.author;
        const createdAt = author.createdAt;
        const joinedAt = message.member.joinedAt;
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
            'Décembre'
        ];
        const monthIndex = createdAt.getMonth();
        const days = [
            'Dimanche',
            'Lundi',
            'Mardi',
            'Mercredi',
            'Jeudi',
            'Vendredi',
            'Samedi'
        ];
        const dayIndex = createdAt.getDay();
        const embed = new Discord.MessageEmbed()
            .setAuthor(`Profil de ${author.username}`, author.avatarURL())
            .setThumbnail(author.avatarURL())
            .addFields(
                {
                    name: 'Nom',
                    value: author.tag,
                    inline: true,
                },
                {
                    name: 'ID',
                    value: author.id,
                    inline: true,
                },
                {
                    name: 'Compte créé le',
                    value: `${days[dayIndex]} ${createdAt.getDate()} ${months[monthIndex]} ${createdAt.getFullYear()}`,
                    inline: true,
                },
                {
                    name: 'A rejoint le serveur le',
                    value: `${days[joinedAt.getDay()]} ${joinedAt.getDate()} ${months[joinedAt.getMonth()]} ${joinedAt.getFullYear()}`,
                    inline: false,
                },
            )
            .setColor('#4885ed');

        message.channel.send(embed);
    }
}