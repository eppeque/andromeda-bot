const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const command = require('./command');

client.once('ready', () => {
    console.log('The bot is connected!');

    command(client, ['ping', 'test'], (message) => {
        message.channel.send('Pong!');
    });

    command(client, ['help', 'h'], (message) => {
        const embed = new Discord.MessageEmbed()
            .attachFiles(['./help.png'])
            .setAuthor("Menu d'aide", 'attachment://help.png')
            .setDescription('Bonjour, voici la documentation de Cayde-6.')
            .addFields(
                {
                    name: 'Général (5)',
                    value: '`bot-info`, `help`, `server-info`, `set-suggestion`, `user-info`'
                },
                {
                    name: 'Staff (5)',
                    value: '`approved-suggestion`, `clear`, `status`, `voted-suggestion`',
                }
            )
            .setColor('#4885ed')
            .setFooter('Cayde-6 - Clan Androméda', client.user.displayAvatarURL());

        message.channel.send(embed);
    });
    
    command(client, ['clear'], (message) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then(messages => {
                message.channel.bulkDelete(messages, true);
            });
        }
    });

    command(client, ['status'], (message) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            const content = message.content.replace('!status ', '');

            client.user.setPresence({
                activity: {
                    name: content,
                    type: 0,
                },
            });

            message.channel.send('Statut changé avec succès !');
        }
    });

    command(client, ['bot-info', 'bi'], (message) => {
        const embed = new Discord.MessageEmbed()
            .setAuthor('Cayde-6', client.user.displayAvatarURL())
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
    });

    command(client, ['user-info', 'ui'], (message) => {
        const author = message.author;
        const createdAt = author.createdAt;
        const joinedAt = message.member.joinedAt;
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
                    value: `${config.days[createdAt.getDay()]} ${createdAt.getDate()} ${config.months[createdAt.getMonth()]} ${createdAt.getFullYear()}`,
                    inline: true,
                },
            )
            .addFields(
                {
                    name: 'A rejoint le serveur le',
                    value: `${config.days[joinedAt.getDay()]} ${joinedAt.getDate()} ${config.months[joinedAt.getMonth()]} ${joinedAt.getFullYear()}`,
                    inline: true,
                },
                {
                    name: 'Nombre de rôles',
                    value: message.guild.member(author).roles.cache.size - 1,
                    inline: true,
                },
            )
            .setFooter('Cayde-6 - Clan Androméda')
            .setColor('#4885ed');

        message.channel.send(embed);
    });

    command(client, ['server-info', 'si'], (message) => {
        const createdAt = message.guild.createdAt;

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
                    value: `${config.days[createdAt.getDay()]} ${createdAt.getDate()} ${config.months[createdAt.getMonth()]} ${createdAt.getFullYear()}\n${createdAt.getHours()}:${createdAt.getMinutes()}`,
                    inline: true,
                },
                {
                    name: 'Salons',
                    value: `${client.channels.cache.size} salons`,
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
    });

    command(client, ['set-suggestion'], (message) => {
        if (message.channel.id != '782731496124579860') {
            message.channel.send('Exécute cette commande dans le salon dédié aux suggestions !');
        } else {
            const suggestion = message.content.replace('!set-suggestion', '');

            if (suggestion === '') {
                return message.channel.send('Pourrais-tu me dire ta suggestion ?!');
            }

            const embed = new Discord.MessageEmbed()
                .setAuthor(`Suggestion de ${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(suggestion)
                .setTimestamp()
                .setColor('#4885ed');
                        
            message.channel.send(embed).then(m => {
                m.react("✅");
                m.react("❌");
            });
            message.delete();
        }
    });

    command(client, ['voted-suggestion'], (message) => {
        if (message.member.hasPermission('ADMININSTRATOR')) {
            const user = message.mentions.users.first();
            const channel = message.guild.channels.cache.find(ch => ch.id === '782731496124579860');
            channel.send(
                `<@${user.id}>, le peuple a approuvé ton idée. C'est désormais au Staff de décider si ton idée sera prise en compte pour l'amélioration de ce serveur. Merci pour ton investissement en tous cas !`
            );
            message.delete();
        }
    });

    command(client, ['approved-suggestion'], (message) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            const user = message.mentions.users.first();
            const channel = message.guild.channels.cache.find(ch => ch.id === '782731496124579860');
            channel.send(
                `<@${user.id}>, Félicitations ! Le Staff a approuvé ton idée. Ce n'est désormais qu'une question de temps avant de voir ta suggestion appliquée au serveur !`
            );
            message.delete();
        }
    });
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.id === '795703040769523732');
    const user = member.user;

    if (!channel) return;

    const embed = new Discord.MessageEmbed()
        .setTitle("Arrivée d'un nouveau membre !")
        .setDescription(`Dites bonjour à **${user.tag}** qui est arrivé sur le serveur !`)
        .setFooter("Cayde-6 - Clan Androméda")
        .setThumbnail(user.displayAvatarURL())
        .setColor('#4885ed');

    channel.send(embed);
});

client.login(config.token);