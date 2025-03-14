'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { memo } from 'react';

interface SuggestedActionsProps {
  chatId: string;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'Suggest personalized diet plans',
      label: 'for improving well-being',
      action: 'Suggest personalized diet plans for improving well-being',
    },
    {
      title: 'Tell me about BMI calculation',
      label: 'and how it affects health?',
      action: 'Tell me about BMI calculation and how it affects health?',
    },
    {
      title: 'Recommend mental health exercises',
      label: 'for reducing stress',
      action: 'Recommend mental health exercises for reducing stress',
    },
    {
      title: 'Advise on family medical history',
      label: 'and its impact on health',
      action: 'Advise on family medical history and its impact on health',
    }
  ];

  return (<></>
    // <div className="grid sm:grid-cols-2 gap-2 w-full sm:hidden">
    //   {suggestedActions.map((suggestedAction, index) => (
    //     <motion.div
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       exit={{ opacity: 0, y: 20 }}
    //       transition={{ delay: 0.05 * index }}
    //       key={`suggested-action-${suggestedAction.title}-${index}`}
    //       className={index > 1 ? 'sm:block' : 'block'}
    //     >
    //       <Button
    //         variant="ghost"
    //         type="button"
    //         onClick={async () => {
    //           window.history.replaceState({}, '', `/chat/${chatId}`);
    //           append({
    //             role: 'user',
    //             content: suggestedAction.action,
    //           });
    //         }}
    //         className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 w-full h-auto justify-start items-start"
    //       >
    //         <span className="font-medium">{suggestedAction.title}</span>
    //         <span className="text-muted-foreground">
    //           {suggestedAction.label}
    //         </span>
    //       </Button>
    //     </motion.div>
    //   ))}
    // </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
