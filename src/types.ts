import { Message } from 'discord.js'

export interface Config {
  settings: {
    prefix: string
    token: string
    operators: string | string[]
  }
}

export interface CommandHandler {
  (message: Message, args: string[]): Promise<void | Message>
}

export interface CommandHandlers {
  [command: string]: CommandHandler
} 