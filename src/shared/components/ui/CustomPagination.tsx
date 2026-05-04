import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedIcon } from "./AnimatedIcon";

interface CustomPaginationProps{
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export const CustomPagination = ({ page, total, limit, onPageChange }: CustomPaginationProps ) => {
  const totalPages = Math.ceil(total / limit);
  const isFirst = page === 0;
  const isLast = (page + 1) * limit >= total;

  return(
    <div className="flex items-center justify-center gap-4 mt-6">
      <div className={isFirst ? 'opacity-30 pointer-events-none' : ''}>
        <AnimatedIcon
          onClick={() => !isFirst && onPageChange(page - 1)}
        >
          <ChevronLeft size={22} className="text-accent" />
        </AnimatedIcon>
      </div>

      <span className="text-sm text-text-primary/60 min-w-25 text-center">
        Página <span className="font-semibold text-text-primary">{page + 1}</span> de <span className="font-semibold text-text-primary">{totalPages}</span>
      </span>

      <div className={isLast ? 'opacity-30 pointer-events-none' : ''}>
        <AnimatedIcon
          onClick={() => !isLast && onPageChange(page + 1)}        
        >
          <ChevronRight size={22} className="text-accent" />
        </AnimatedIcon>
      </div>
    </div>
  )
}
