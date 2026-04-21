import { Card } from "@/components/ui";

type SimulationPromptChatProps = {
  prompt: string;
};

export function SimulationPromptChat({ prompt }: SimulationPromptChatProps) {
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        User Prompt
      </div>
      <div className="mt-3 rounded-[1.2rem] border border-line bg-white/90 p-4 sm:p-5">
        <p className="text-sm leading-relaxed text-ink sm:text-base">{prompt}</p>
      </div>
      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-accentSoft px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
        Prompt applied to this simulation
      </div>
    </Card>
  );
}