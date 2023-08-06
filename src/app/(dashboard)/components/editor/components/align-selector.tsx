import { Editor } from "@tiptap/core";
import {
  Check,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  TextQuote,
  ListOrdered,
  TextIcon,
  Code,
  CheckSquare, AlignLeft, AlignRight, AlignCenter,
} from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";

import { BubbleMenuItem } from "./EditorBubbleMenu";

interface AlignSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const AlignSelector: FC<AlignSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const items: BubbleMenuItem[] = [
    {
      name: "Left",
      icon: AlignLeft,
      command: () =>{
        editor.chain().setTextAlign("left" ).run()
      },
      // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
      isActive: () => editor.isActive({ textAlign: 'left' }),
    },
    {
      name: "Center",
      icon: AlignCenter,
      command: () =>{
        editor.chain().setTextAlign("center" ).run()
      },
      // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
      isActive: () => editor.isActive({ textAlign: 'center' }),
    },
    {
      name: "Right",
      icon: AlignRight,
      command: () =>{
        editor.chain().setTextAlign("right" ).run()
      },
      // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
      isActive: () => editor.isActive({ textAlign: 'right' }),
    },

  ];

  const activeItem = items.filter((item) => item.isActive()).pop() ?? {
    name: "Multiple",
  };

  return (
    <div className="relative h-full">
      <button
        className="flex h-full items-center gap-1 whitespace-nowrap p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{activeItem?.name}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <section className="fixed top-full z-[99999] mt-1 flex w-48 flex-col overflow-hidden rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.command();
                setIsOpen(false);
              }}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
            >
              <div className="flex items-center space-x-2">
                <div className="rounded-sm border border-stone-200 p-1">
                  <item.icon className="h-3 w-3" />
                </div>
                <span>{item.name}</span>
              </div>
              {activeItem.name === item.name && <Check className="h-4 w-4" />}
            </button>
          ))}
        </section>
      )}
    </div>
  );
};
