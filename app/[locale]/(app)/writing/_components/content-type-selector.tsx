import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WritingContentType } from "@/types/writing";
import { Button } from "@/components/ui/button";

interface ContentTypeSelectorProps {
  contentTypes: WritingContentType[];
  activeContentType: string | null;
  onSelect: (id: string) => void;
}

export function ContentTypeSelector({ contentTypes, activeContentType, onSelect }: ContentTypeSelectorProps) {
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
  }, [contentTypes]);

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
        <div className="absolute -left-10 top-0 bottom-0 w-16 bg-gradient-to-r from-background via-background/80 to-transparent z-10 flex items-center justify-start pointer-events-none">
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
        <div className="absolute -right-10 top-0 bottom-0 w-16 bg-gradient-to-l from-background via-background/80 to-transparent z-10 flex items-center justify-end pointer-events-none">
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
        <div className="flex items-stretch gap-4 w-max">
          {contentTypes.map(ct => (
            <button
              key={ct.id}
              className={`group relative flex flex-col items-start justify-between gap-3 w-44 p-4 rounded-2xl border-2 text-left transition-all snap-start ${activeContentType === ct.id
                ? "border-primary bg-primary/10 shadow-[0_4px_0_0_rgba(99,102,241,0.2)] translate-y-[-4px]"
                : "border-border bg-card shadow-[0_4px_0_0_rgba(0,0,0,0.02)] hover:border-primary/40 hover:bg-primary/5 hover:translate-y-[-2px]"
                } flex-shrink-0`}
              onClick={() => onSelect(ct.id)}
            >
              <div className="space-y-1 w-full mt-1">
                <h4 className="font-bold text-sm text-heading line-clamp-1 break-words pr-4">{ct.name}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2 break-words" title={ct.description}>{ct.description || "Select this type"}</p>
              </div>

              {/* Active indicator dot */}
              {activeContentType === ct.id && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary ring-2 ring-primary/20" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
