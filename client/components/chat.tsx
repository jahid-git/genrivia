'use client';

import type { Attachment, ChatRequestOptions, CreateMessage, Message } from 'ai';
import { useState, useRef } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import { ChatHeader } from '@/components/chat-header';
import type { Vote } from '@/lib/db/schema';
import { fetcher, generateUUID } from '@/lib/utils';

import { Block } from './block';
import { MultimodalInput } from './multimodal-input';
import { Messages } from './messages';
import { VisibilityType } from './visibility-selector';
import { useBlockSelector } from '@/hooks/use-block';
import { toast } from 'sonner';

export function Chat({
  id,
  initialMessages,
  selectedChatModel,
  selectedVisibilityType,
  isReadonly,
}: {
  id: string;
  initialMessages: Array<Message>;
  selectedChatModel: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const { mutate } = useSWRConfig();

  const [messages, setMessages] = useState<Array<Message>>(initialMessages);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  const handleSubmit = async () => {
    if (!input) return;

    const newMessage: Message = {
      id: generateUUID(),
      role: 'user',
      content: input,
      toolInvocations: [],
      experimental_attachments: attachments.length > 0 ? attachments : undefined,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setInput('');
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload: { messages, prompt: input },
          selectedChatModel,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const words = data[0].reasoning.split(' ');
      let reasoning = "";

      setMessages((prevMessages) => [...prevMessages, {
        id: data[0].id,
        content: data[0].content,
        role: data[0].role,
        reasoning,
      }]);

      for (let i = 0; i < words.length; i++) {
        reasoning += words[i] + " ";
        await new Promise(resolve => setTimeout(resolve, 30));
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          return [
            ...prevMessages.slice(0, -1),
            {
              ...lastMessage,
              reasoning,
            },
          ];
        });
      }

      await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          messages: [
            newMessage,
            {
              id: data[0].id,
              role: data[0].role,
              content: data[0].reasoning,
              toolInvocations: [],
              experimental_attachments: attachments.length > 0 ? attachments : undefined,
            }
          ],
          selectedChatModel,
        }),
      });
    } catch (error) {
      toast.error('An error occurred, please try again!');
    } finally {
      setIsLoading(false);
      mutate('/api/history')
    }
  };

  const stop = () => {
    mutate('/api/history')
    setIsLoading(false);
  };

  const append = async (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions): Promise<string | null | undefined> => {
    setInput(message.content)
    return null;
  };

  const reload = async (): Promise<string | null | undefined> => {
    return null;
  };

  const { data: votes } = useSWR<Array<Vote>>(
    `/api/vote?chatId=${id}`,
    fetcher,
  );

  const isBlockVisible = useBlockSelector((state) => state.isVisible);

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <ChatHeader
          chatId={id}
          selectedModelId={selectedChatModel}
          selectedVisibilityType={selectedVisibilityType}
          isReadonly={isReadonly}
        />

        <Messages
          chatId={id}
          isLoading={isLoading}
          votes={votes}
          messages={messages}
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly}
          isBlockVisible={isBlockVisible}
        />

        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          {!isReadonly && (
            <MultimodalInput
              chatId={id}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              stop={stop}
              attachments={attachments}
              setAttachments={setAttachments}
              messages={messages}
              setMessages={setMessages}
              append={append}
            />
          )}
        </form>
      </div>

      <Block
        chatId={id}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
        attachments={attachments}
        setAttachments={setAttachments}
        append={append}
        messages={messages}
        setMessages={setMessages}
        reload={reload}
        votes={votes}
        isReadonly={isReadonly}
      />
    </>
  );
}
