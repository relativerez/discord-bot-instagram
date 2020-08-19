exports.run = async (client, message, args, axios, prefix) => {
  let colorList = [
    "1752220",
    "3066993",
    "3447003",
    "10181046",
    "15844367",
    "15105570",
    "15158332",
    "9807270",
    "8359053",
    "3426654",
    "1146986",
    "2067276",
    "2123412",
    "7419530",
    "12745742",
    "11027200",
    "10038562",
    "9936031",
    "12370112",
    "2899536",
    "16580705",
    "12320855",
  ];
  let colorRand = colorList[Math.floor(Math.random() * colorList.length)];
  const username = args[0];
  const { data } = await axios.get(`https://www.instagram.com/${username}/?__a=1`);

  if (!args.length) return message.channel.send(`*Use:* ${"`"}${prefix}instagram @username${"`"}`);

  message.channel.send({
    embed: {
      color: colorRand,
      author: {
        name: `${data["graphql"]["user"].full_name} (@${username})`,
      },
      thumbnail: {
        url: data["graphql"]["user"].profile_pic_url,
      },
      fields: [
        {
          name: "Seguidores",
          value: data["graphql"]["user"]["edge_followed_by"].count,
          inline: true,
        },
        {
          name: "Seguindo",
          value: data["graphql"]["user"]["edge_follow"].count,
          inline: true,
        },
        {
          name: "Biografia",
          value: data["graphql"]["user"].biography,
        },
      ],
      //footer: {
      //text: `Criado por Acacio De Lima`
      //icon_url: 'https://i.imgur.com/1nrsIPc.png'
      //},
    },
  });
};
