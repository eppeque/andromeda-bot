const Discord = require('discord.js');
const fs = require('fs');
const token = require('./token');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('The bot is connected');
});

client.on('message', message => {
    const messageContent = message.content.toLowerCase();

    if (message.mentions.has(client.user)) {
        client.commands.get('hello').execute(message);
    }

    const prefix = '!';

    if (!messageContent.startsWith(prefix) || message.author.bot) return;

    const args = messageContent.slice(prefix.length).split(/ +/);
    const command = args.shift();

    if (command === 'clear') {
        client.commands.get('clear').execute(message);
    } else if (command === 'status') {
        client.commands.get('status').execute(message, client);
    } else if (command === 'help') {
        client.commands.get('help').execute(message);
    } else if (command === 'bot-info') {
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
            .setFooter('[Github](https://github.com/eppeque)');
        message.channel.send(embed);
    }
});

client.login(token);