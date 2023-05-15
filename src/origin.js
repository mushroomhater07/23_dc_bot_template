module.exports = {
    name: "order",
    description: "type in food that you want to order",
    options: [
      {
        name: "food",
        description: "food choice",
        type: 3,
        required: true,
        choices: [
          {
            name: "Cake",
            value: "cake",
          },
          {
            name: "Soup",
            value: "soup",
          },
        ],
      },
      {
        name: "zrink",
        description: "drink choice",
        type: 3,
        required: false,
        choices: [
          {
            name: "Coke",
            value: "coke",
          },
          {
            name: "Sprite",
            value: "sprite",
          },
        ],
      },
    ],
  }  //type 7 channel
  //type 6 member
  //type 3 time