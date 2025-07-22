import fs from 'fs';
import path from 'path';
import { translateWithMyMemory } from '../utils/translate';

// Configure your email here to increase daily translation limit
const EMAIL = ''; // Optional: your-email@example.com

const MESSAGES_DIR = path.join(process.cwd(), 'messages');
const SOURCE_LANG = 'en';
const TARGET_LANGS = ['fr', 'es'];

// Read JSON file
function readJsonFile(filePath: string) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return {};
  }
}

// Write JSON file
function writeJsonFile(filePath: string, data: any) {
  try {
    const content = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully wrote to ${filePath}`);
  } catch (error) {
    console.error(`Error writing to file ${filePath}:`, error);
  }
}

// Recursively translate an object's values
async function translateObject(obj: any, targetLang: string) {
  const result: any = {};

  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Recursively translate nested objects
      result[key] = await translateObject(obj[key], targetLang);
    } else if (typeof obj[key] === 'string') {
      // Only translate strings that need translation
      if (obj[key] === '__STRING_NOT_TRANSLATED__' || obj[key].includes('__STRING_NOT_TRANSLATED__')) {
        // Sleep to avoid rate limiting (1 second between requests)
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Translating: "${obj[key]}" to ${targetLang}`);
        result[key] = await translateWithMyMemory(obj[key], SOURCE_LANG, targetLang, EMAIL);
      } else {
        result[key] = obj[key];
      }
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}

async function main() {
  try {
    // Read the source language file
    const sourceFilePath = path.join(MESSAGES_DIR, `${SOURCE_LANG}.json`);
    const sourceData = readJsonFile(sourceFilePath);

    // Process each target language
    for (const targetLang of TARGET_LANGS) {
      const targetFilePath = path.join(MESSAGES_DIR, `${targetLang}.json`);

      // Read existing target file if it exists
      let targetData = {};
      if (fs.existsSync(targetFilePath)) {
        targetData = readJsonFile(targetFilePath);
      }

      // Merge source and target data, keeping existing translations
      const mergedData = { ...sourceData, ...targetData };

      // Translate all missing translations
      const translatedData = await translateObject(mergedData, targetLang);

      // Write the updated translations back to the target file
      writeJsonFile(targetFilePath, translatedData);
    }

    console.log('Translation process completed!');
  } catch (error) {
    console.error('Error in translation process:', error);
  }
}

main().catch(console.error);
