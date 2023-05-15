const {
  ActionRowBuilder,
  Client,
  GatewayIntentBits,
  InteractionType,
  ModalBuilder,
  Routes,
  StringSelectMenuBuilder,
  SelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const { REST } = require("@discordjs/rest");
const { config } = require("dotenv");
//environment variable - hidden from the public replit by creating .env file
// TOKEN=xxx bot bot secret
// CLIENT=xxx bot client id on developer
// GUILD=xxx channel id
config();

const select = require("./src/selection.js");
const BanCommand = require("./src/ban.js");
const First = require("./src/origin.js");
const GUIselect = require("./src/GUIslection");

const token = process.env.TOKEN;
const clientid = process.env.CLIENT;
const channelid = process.env.GUILD;

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on("ready", (e) => {
  // console.log(e) // getguild id
  console.log(`logged in as ${client.user.tag}!`);
});
client.on("messageCreate", (msg) => {
  console.log(msg);
  if (msg.content === "ping") msg.reply("pong");
});
client.on("interactionCreate", (inter) => {
  if (inter.isChatInputCommand) {
    if (inter.commandName == "order") {
      inter.reply({
        content: `${inter.user.username} called ${inter.commandName} ${
          inter.options.get("food").value
        }`,
      });
    } else if (inter.commandName == "guiorder") {
        const RowComponent = new ActionRowBuilder().setComponents(
            new StringSelectMenuBuilder().setCustomId('food_options').setOptions([
              { label: 'Cake', value: 'cake' },
              { label: 'Pizza', value: 'pizza' },
              { label: 'Sushi', value: 'sushi' },
            ])
          );
      inter.reply({ components: [RowComponent.toJSON()] });
    }
    if (inter.isUserContextMenuCommand){
      if (inter.commandName === "wave") {
        inter.reply(`hi ${inter.targetMember}`);
      } 
    }
    if (inter.isStringSelectMenu) {
      if (inter.customId === "food_options") {
        inter.reply(`you ordered ${JSON.stringify(inter.values)}`);
      } 
    }
  }
});

async function main() {
  const commands = [BanCommand, First, (GUIselect),{name:"wave",type:2}];
  try {
    console.log("Started registering / commands.");
    await rest.put(Routes.applicationGuildCommands(clientid, channelid), {
      body: commands,
    });
    client.login(token);
  } catch (err) {
    console.log(err);
  }
}

main();

//database
// const Database = require("@replit/database")
// const db = new Database()
// db.set("key", "value").then(() => {})
// db.get("key").then(value => {})
// db.delete("key").then(() => {})

//modal
// const modal = new ModalBuilder()
//         .setTitle("Register User Form")
//         .setCustomId("registerUserModal")
//         .setComponents(
//           new ActionRowBuilder().setComponents(
//             new TextInputBuilder()
//               .setLabel("username")
//               .setCustomId("username")
//               .setStyle(TextInputStyle.Short)
//           ),
//           new ActionRowBuilder().setComponents(
//             new TextInputBuilder()
//               .setLabel("email")
//               .setCustomId("email")
//               .setStyle(TextInputStyle.Short)
//           ),
//           new ActionRowBuilder().setComponents(
//             new TextInputBuilder()
//               .setLabel("comment")
//               .setCustomId("comment")
//               .setStyle(TextInputStyle.Paragraph)
//           )
//         );

//       inter.showModal(modal);
// if (inter.type === interType.ModalSubmit) {
//   console.log("Modal Submitted...");
//   if (inter.customId === "registerUserModal") {
//     console.log(inter.fields.getTextInputValue("username"));
//     inter.reply({
//       content: "You successfully submitted your details!",
//     });
//   }
// }
