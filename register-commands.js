const { REST, Routes } = require('discord.js');

require('dotenv').config()

const commands = [
    {
        name: 'rozdelnas',
        description: 'Rozdeli hracov do timov'
    },
];

const rest = new REST({version: '10'}).setToken("MTEwMjE5NzQzMTUyNzAxNDQ0MA.Gu7iNa.PPyNKk3NKu9FbzesC7P65TdplJ748Rdx3gu5nI");

(async () => {
    try {

        console.log('Registrujem prikazy...')
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands}
        )

        console.log('Zaregistrovane...')
    } catch (error) {
        console.log("Vyskytol sa problem :( :" + error);
    }
})();