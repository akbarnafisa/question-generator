"use client";

import { Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";

type InputQuestionProps = {
  content: string;
  onSubmit: (content: string) => void;
};

export default function InputQuestion({
  content,
  onSubmit,
}: InputQuestionProps) {
  const [getContent, setContent] = useState("");

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

  const addEventListener = useCallback(() => {
    if ($input.current && $bg.current) {
      $input.current.style.height = `${$input.current.scrollHeight}px`;
      $bg.current.style.height = `${$input.current.scrollHeight}px`;

      $input.current.addEventListener("input", handleAutoGrow);
    }
  }, [handleAutoGrow]);

  useEffect(() => {
    setContent(content ?? "");
  }, [content]);

  useEffect(() => {
    addEventListener();

    return () => {
      addEventListener();
    };
  }, [addEventListener]);
  return (
    <div className=" z-10 m-auto flex min-h-12 w-full max-w-[90%] flex-col divide-zinc-600 overflow-hidden rounded-[24px] bg-gray-900 shadow-lg shadow-black/40 sm:max-w-lg">
      <div className="relative z-10 flex min-w-0 flex-1 items-center bg-gray-900 px-3 md:pl-4">
        <form
          className="h-full w-full"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(getContent);
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
                maxLength={500}
                minLength={2}
                className="min-w-[50%] flex-[1_0_50%] resize-none border-0 bg-transparent py-3 pl-1 pr-2 text-sm leading-relaxed text-white shadow-none outline-none ring-0 [scroll-padding-block:0.75rem] selection:bg-teal-300 selection:text-black placeholder:text-zinc-400 disabled:bg-transparent disabled:opacity-80"
                rows={1}
                placeholder='A "report an issue" modal'
                style={{ colorScheme: "dark", height: "47px !important" }}
                value={getContent}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className="flex items-center">
              <Button
                size="icon"
                variant="default"
                disabled={getContent.trim() === ""}
              >
                <Send color="white" size={16} />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}