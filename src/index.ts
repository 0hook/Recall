import { 
  Client, 
  GatewayIntentBits, 
  Events 
} from 'discord.js'
import { parse } from 'ini'
import { readFileSync } from 'fs'
import ora from 'ora'
import chalk from 'chalk'
import gradient from 'gradient-string'
import createCommandHandlers, { registerCommandAliases } from './commands.js'
import { Config } from './types.js'

const config = parse(readFileSync('./config.ini', 'utf-8')) as Config
const PREFIX = config.settings.prefix
const TOKEN = config.settings.token

const OPERATORS = Array.isArray(config.settings.operators) 
  ? config.settings.operators 
  : config.settings.operators.includes(',')
  ? config.settings.operators.split(',').map(id => id.trim()) 
  : [config.settings.operators.trim()]

const Recall = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildWebhooks,
  ]
})

const commandHandlers = createCommandHandlers(PREFIX)
registerCommandAliases(commandHandlers)

Recall.on(Events.MessageCreate, async (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return

  if (!OPERATORS.some(id => id === message.author.id)) {
    return message.reply('eww, u freak! ur not allowed to use this bot :3').catch(() => {})
  }

  const args = message.content.slice(PREFIX.length).trim().split(/ +/)
  const command = args.shift()?.toLowerCase() || ''

  try {
    const handler = commandHandlers[command]
    if (handler) {
      await handler(message, args)
    } else {
      return message.reply('wat, i do not even know what that means 🙃')
    }
  } catch (error) {
    console.error('Error:', error)
    return message.reply('omg, something broke, not my fault tho 😭')
  }
})

const _taag = `
${gradient(['#add8e6', '#d8a7f7'])('         :::::::::  :::::::::: ::::::::      :::     :::        :::  ')}
${gradient(['#add8e6', '#d8a7f7'])('        :+:    :+: :+:       :+:    :+:   :+: :+:   :+:        :+:   ')}
${gradient(['#add8e6', '#d8a7f7'])('       +:+    +:+ +:+       +:+         +:+   +:+  +:+        +:+    ')}
${gradient(['#add8e6', '#d8a7f7'])('      +#++:++#:  +#++:++#  +#+        +#++:++#++: +#+        +#+     ')}
${gradient(['#add8e6', '#d8a7f7'])('     +#+    +#+ +#+       +#+        +#+     +#+ +#+        +#+    ')}
${gradient(['#add8e6', '#d8a7f7'])('    #+#    #+# #+#       #+#    #+# #+#     #+# #+#        #+#     ')}
${gradient(['#add8e6', '#d8a7f7'])('   ###    ### ########## ########  ###     ### ########## ##########  ')}
`

const _ct = gradient(['#add8e6', '#d8a7f7'])(`
╭────────────────────────────────────────────────────────────────────╮
│ !dc                  │ !dr                  │ !cr                  │
│ !ka                  │ !ba                  │ !mp                  │
│ !dw                  │ !kb                  │ !bb                  │
│ !k                   │ !b                   │ !mc                  │
│ !nuke                │ !help                │                      │
╰────────────────────────────────────────────────────────────────────╯
`)

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason)
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err)
})

Recall.once(Events.ClientReady, (client) => {
  console.log(_taag)
  console.log(_ct)
  ora(chalk.green(`Burning rubber! Logged in as ${client.user.tag}`)).succeed()
})

Recall.login(TOKEN) 