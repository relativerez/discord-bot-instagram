exports.run = async (client, message, args, axios) => {
  const { data } = await axios.get(`https://www.instagram.com/${args[0]}/?__a=1`)
  message.channel.send({
    embed: {
      color: 0xffff00,
      author: {
        name: `${data['graphql']['user'].full_name} (@${args[0]})`,
      },
      thumbnail: {
        url: data['graphql']['user'].profile_pic_url,
      },
      fields: [
        {
          name: "Seguidores",
          value: data['graphql']['user']['edge_followed_by'].count,
          inline: true
        },
        {
          name: "Seguindo",
          value: data['graphql']['user']['edge_follow'].count,
          inline: true
        },
        {
          name: "Biografia",
          value: data['graphql']['user'].biography
        }
      ],
      //footer: {
        //text: `Criado por Acacio De Lima`
        //icon_url: 'https://i.imgur.com/1nrsIPc.png'
      //},
    }
  });
}