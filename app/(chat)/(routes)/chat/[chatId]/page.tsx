import prismadb from '@/lib/prismadb';
import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import ChatClient from './components/chat-client';

interface ChatIdPage {
  params: { chatId: string };
}

const ChatIdPage = async ({ params }: ChatIdPage) => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }
  const companion = await prismadb.companion.findUnique({
    where: { id: params.chatId },
    include: {
      messages: { orderBy: { createdAt: 'asc' }, where: { userId } },
      _count: { select: { messages: true } },
    },
  });

  if (!companion) {
    return redirect('/');
  }
  return <ChatClient companion={companion} />;
};

export default ChatIdPage;
