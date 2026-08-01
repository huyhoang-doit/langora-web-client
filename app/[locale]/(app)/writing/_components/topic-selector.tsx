import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WritingTopic } from "@/types/writing";
import { Button } from "@/components/ui/button";

interface TopicSelectorProps {
  topics: WritingTopic[];
  activeTopic: string | null;
  onSelect: (id: string) => void;
}

export function TopicSelector({ topics, activeTopic, onSelect }: TopicSelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [topics]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      {/* Left Arrow */}
      {showLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background via-background/80 to-transparent z-10 flex items-center justify-start pointer-events-none">
          <Button 
            variant="outline" 
            size="icon" 
            className="w-8 h-8 rounded-full shadow-md bg-background border-2 pointer-events-auto -ml-2 text-foreground hover:bg-muted"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Right Arrow */}
      {showRight && (
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background via-background/80 to-transparent z-10 flex items-center justify-end pointer-events-none">
          <Button 
            variant="outline" 
            size="icon" 
            className="w-8 h-8 rounded-full shadow-md bg-background border-2 pointer-events-auto -mr-2 text-foreground hover:bg-muted"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4 pt-1 px-1 scroll-smooth snap-x snap-mandatory"
      >
        <div className="flex items-center gap-3 w-max">
          {topics.map(topic => (
            <button
              key={topic.id}
              className={`group relative flex items-center gap-3 px-6 py-3.5 rounded-full border-2 text-left transition-all snap-start ${
                activeTopic === topic.id 
                  ? "border-emerald-500 bg-emerald-500/10 shadow-[0_4px_0_0_rgba(16,185,129,0.2)] text-emerald-700 dark:text-emerald-400 translate-y-[-2px]" 
                  : "border-border bg-card shadow-[0_2px_0_0_rgba(0,0,0,0.02)] hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:translate-y-[-1px] text-foreground"
              } flex-shrink-0 min-w-32`}
              onClick={() => onSelect(topic.id)}
            >
              <span className="font-bold text-sm whitespace-nowrap">{topic.name}</span>
              
              {/* Active check indicator */}
              {activeTopic === topic.id && (
                <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
