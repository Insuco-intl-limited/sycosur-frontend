import axios from 'axios';

interface MyMemoryTranslationResponse {
  responseData: {
    translatedText: string;
  };
  matches: Array<{
    id: string;
    segment: string;
    translation: string;
    quality: string;
    reference: string;
    usage_count: number;
    subject: string;
    created_by: string;
    last_updated_by: string;
    create_date: string;
    last_update_date: string;
    match: number;
  }>;
}

export async function translateWithMyMemory(
  text: string,
  sourceLang: string = 'en',
  targetLang: string,
  email?: string
): Promise<string> {
  try {
    if (!text || text === '__STRING_NOT_TRANSLATED__') {
      return text;
    }

    const url = 'https://api.mymemory.translated.net/get';
    const params = {
      q: text,
      langpair: `${sourceLang}|${targetLang}`,
      ...(email && { de: email })
    };

    const response = await axios.get<MyMemoryTranslationResponse>(url, { params });

    if (response.data && response.data.responseData) {
      return response.data.responseData.translatedText;
    }

    return text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}
