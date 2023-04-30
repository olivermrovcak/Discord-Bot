const { Client, IntentsBitField } =  require('discord.js');
require('dotenv').config()

const client = new Client ({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]


});


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

client.on('ready',(c) => {
  console.log(`${c.user.username}`)
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return ;
  if (interaction.commandName === 'rozdelnas') {
    // Get the voice channel of the user who sent the command
    const member = interaction.member;
    const channel = member?.voice.channel;
    if (!channel) {
      return interaction.reply('You must be in a voice channel to use this command.');
    }

    // Get the members in the voice channel
    const members = channel.members.map(member => member.user);

    const shuffledMembers = shuffle(members);

    // Divide the members into two teams
    const team1 = shuffledMembers.slice(0, Math.ceil(members.length / 2));
    const team2 = shuffledMembers.slice(Math.ceil(members.length / 2));

    const team1Names = team1.map((member) => member.username).join(', ');
    const team2Names = team2.map((member) => member.username).join(', ');
    // Send the teams to the text channel

    interaction.reply(`Team 1: ${team1Names}\nTeam 2: ${team2Names}`);
  }
});

client.login(process.env.DISCORD_TOKEN);