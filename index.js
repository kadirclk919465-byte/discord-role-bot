require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Partials
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.GuildMember]
});

const MAIN_GUILD = "1524160244278624276";
const CHECK_GUILD = "1478841380393586709";
const ROLE_ID = "1524417130823549149";

client.once("ready", () => {
  console.log(`${client.user.tag} hazır!`);
});

client.on("guildMemberAdd", async (member) => {
  if (member.guild.id !== MAIN_GUILD) return;

  try {
    const checkGuild = await client.guilds.fetch(CHECK_GUILD);

    let target;

    try {
      target = await checkGuild.members.fetch(member.id);
    } catch {
      return;
    }

    if (target) {
      await member.roles.add(ROLE_ID);
      console.log(`${member.user.tag} rol aldı.`);
    }

  } catch (err) {
    console.log(err);
  }
});

client.login(process.env.TOKEN);
