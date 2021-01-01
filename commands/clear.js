module.exports = {
    name: 'clear',
    description: 'Delete all the messages in a channel',
    execute(message) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results);
            });
        }
    }
}