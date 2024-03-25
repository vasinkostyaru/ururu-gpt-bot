import { openai } from './openai.js'
import config from "config";
import axios from 'axios';
import { code } from "telegraf/format";

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
    // пушим сообщения пользователя в сессию (в контекст)
    ctx.session.messages.push({ role: openai.roles.USER, content })
    // пушим сообщения бота в сессию (в контекст)
    const response = await openai.chat(ctx.session)
    ctx.session.messages.push({
      role: openai.roles.ASSISTANT,
      content: response.content,
    })
    await ctx.reply(response.content, { parse_mode: 'Markdown' })
  } catch (e) {
    console.log('Error while proccesing text to gpt', e.message)
  }
}

export const getBalance = async (ctx) => {
  await ctx.reply(code(`загрузка баланса..`));
  try {
    const response = await axios.get('https://api.proxyapi.ru/proxyapi/balance', {
      headers: {
        Authorization: `Bearer ${config.get('OPENAI_KEY')}`
      }
    });
    console.log(response.data.balance);
    await ctx.reply(code(`Баланс: ${response.data.balance.toFixed(2)} ₽`));
  } catch (error) {
    //console.error(error.message);
  }
};
