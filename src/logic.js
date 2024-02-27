import { openai } from './openai.js'

export const INITIAL_SESSION = {
  messages: [],
  version: 'gpt-3.5-turbo',
}

export const INITIAL_SESSION4 = {
  messages: [],
  version: 'gpt-4-turbo-preview',
}

export async function initCommand(ctx) {
  ctx.session = INITIAL_SESSION;

  await ctx.reply('Жду вашего голосового или текстового сообщения')
}

export async function initCommand4(ctx) {
  ctx.session = INITIAL_SESSION4;
  await ctx.reply('Жду вашего голосового или текстового сообщения(4-Turbo)')
}

export async function processTextToChat(ctx, content) {
  try {
    console.log("processTextToChat");
    // пушим сообщения пользователя в сессию (в контекст)
    ctx.session.messages.push({ role: openai.roles.USER, content })
    // пушим сообщения бота в сессию (в контекст)
    const response = await openai.chat(ctx.session)
    ctx.session.messages.push({
      role: openai.roles.ASSISTANT,
      content: response.content,
    })
    await ctx.reply(response.content)
  } catch (e) {
    console.log('Error while proccesing text to gpt', e.message)
  }
}
