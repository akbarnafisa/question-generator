"use client";

import { Loader2, Send } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";

type InputQuestionProps = {
  content: string;
  isLoading: boolean;
  onSubmit: (content: string) => void;
  onChange: (content: string) => void;
};

export default function InputQuestion({
  content,
  isLoading,
  onSubmit,
  onChange,
}: InputQuestionProps) {
  const $input = useRef<HTMLTextAreaElement>(null);
  const $bg = useRef<HTMLDivElement>(null);

  const handleAutoGrow = useCallback(() => {
    const el = $input.current;
    const bg = $bg.current;
    if (!el || !bg) return;
    el.style.height = "auto";
    el.style.height = `${$input.current.scrollHeight}px`;
    bg.style.height = `${$input.current.scrollHeight}px`;
  }, []);

  useEffect(() => {
    handleAutoGrow();
  }, [content, handleAutoGrow]);

  return (
    <div className=" z-10 m-auto flex min-h-12 w-full max-w-[90%] flex-col divide-zinc-600 overflow-hidden rounded-[24px] bg-gray-900 shadow-lg shadow-black/40 sm:max-w-lg">
      <div className="relative z-10 flex min-w-0 flex-1 items-center bg-gray-900 px-3 md:pl-4">
        <form
          className="h-full w-full"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(content);
          }}
        >
          <div
            className="relative flex h-fit min-h-full w-full items-center transition-all duration-300"
            ref={$bg}
          >
            <div className="relative flex min-w-0 flex-1 self-start">
              <textarea
                ref={$input}
                id="home-prompt"
                maxLength={200}
                minLength={10}
                className="min-w-[50%] flex-[1_0_50%] resize-none border-0 bg-transparent py-3 pl-1 pr-2 text-sm leading-relaxed text-white shadow-none outline-none ring-0 [scroll-padding-block:0.75rem] selection:bg-teal-300 selection:text-black placeholder:text-zinc-400 disabled:bg-transparent disabled:opacity-80"
                rows={1}
                placeholder='2 Geography questions, 8th grade, about Asian countries'
                style={{ colorScheme: "dark", height: "47px !important" }}
                value={content}
                onChange={(e) => onChange(e.target.value)}
                disabled={isLoading}
              ></textarea>
            </div>
            <div className="flex items-center">
              <Button
                size="icon"
                variant="default"
                disabled={content.trim() === "" || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Send color="white" size={16} />
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
