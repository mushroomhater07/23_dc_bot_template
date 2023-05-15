const { SlashCommandBuilder } = require("@discordjs/builders");

const banCommand = new SlashCommandBuilder()
  .setName("ban")
  .setDescription("Bans a user from the guild.")
  .addSubcommandGroup((group) =>
    group
      .setName("user")
      .setDescription("user")
      .addSubcommand((subcommand) =>
        subcommand
          .setName("temp")
          .setDescription("Temporary bans a user")
          .addUserOption((option) =>
            option.setName("user").setDescription("user to be banned")
          )
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("perma")
          .setDescription("Permanently bans a user")
          .addUserOption((option) =>
            option.setName("user").setDescription("user to be banned")
          )
      )
  )

  .addSubcommand((subcommand) =>
    subcommand
      .setName("channel")
      .setDescription("view channel")
      .addChannelOption((option) =>
        option
          .setName("channel")
          .setDescription("channel to be banned")
          .setRequired(true)
      )
      .addBooleanOption((option) =>
        option
          .setName("deletemsgs")
          .setDescription("Delete the messages")
          .setRequired(true)
      )
  );
module.exports = banCommand.toJSON();

//addRoleOption
//addStringOption