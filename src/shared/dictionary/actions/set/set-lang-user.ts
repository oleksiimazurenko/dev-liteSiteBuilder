'use server'

import { auth } from '@/shared/lib/auth/model/auth'
import prisma from '@/shared/lib/prisma-client'
import { z } from 'zod'


const langSchema = z.string().regex(/^[a-z]{2}(-[A-Z]{2})?$/);

const setLangUser = async (lang: string) => {
  
  const parsedLang = langSchema.safeParse(lang);

  if (!parsedLang.success) {
    return {
      success: false,
      message: 'Invalid language format. Notice in file: shared/dictionary/actions/user/set/set-lang-user.ts'
    }
  }

  try {
    const session = await auth();

    if (!session) {
      return {
        success: false,
        message: 'Session not found. Notice in file: shared/dictionary/actions/user/set/set-lang-user.ts'
      };
    }

    const response = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        lang: parsedLang.data
      }
    });

    return { data: response.lang, success: true };
  } catch (error) {
    console.error('Error updating user language:', error);
    return {
      success: false,
      message: 'Error updating language preference.'
    };
  }
}

export { setLangUser }
