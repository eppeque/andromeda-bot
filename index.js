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

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'joins');
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
    } else if (command === 'bot-info' || command === 'bi') {
        client.commands.get('bot-info').execute(message);
    } else if (command === 'user-info' || command === 'ui') {
        client.commands.get('user-info').execute(message);
    } else if (command === 'server-info' || command === 'si') {
        client.commands.get('server-info').execute(message, client);
    }
});

client.login(token);