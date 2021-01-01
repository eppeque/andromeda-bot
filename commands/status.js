module.exports = {
    name: 'status',
    description: 'Set the bot status',
    execute(message, client) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            const content = message.content.replace('!status', '');

            client.user.setPresence({
                activity: {
                    name: content,
                    type: 0,
                },
            });

            message.channel.send('Status changé avec succès !');
        }
    }
}