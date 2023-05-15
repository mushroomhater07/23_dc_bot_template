const {ActionRowBuilder,StringSelectMenuBuilder} = require('discord.js')
module.exports = function(module) {
    const RowComponent = new ActionRowBuilder().setComponents(
        new StringSelectMenuBuilder().setCustomId('food_options').setOptions([
          { label: 'Cake', value: 'cake' },
          { label: 'Pizza', value: 'pizza' },
          { label: 'Sushi', value: 'sushi' },
        ])
      );
      return RowComponent.toJSON()
}
// return (actionRowComponent.toJSON(), actionRowComponent.toJSON())