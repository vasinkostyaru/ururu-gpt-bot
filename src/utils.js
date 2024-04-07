import { unlink } from 'fs/promises';
import config from "config";

export async function removeFile(path) {
  try {
    await unlink(path)
  } catch (e) {
    console.log('Error while removing file', e.message)
  }
}

export function isGoodId(id) {
  return config.get('MY_IDS').includes(id);
}
