import { AButton } from "@/components/atoms/AButton/AButton";

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export const MPagination = ({ currentPage, pageCount, onPageChange }: PaginationProps) => (
  <nav
    className="flex items-center gap-3"
    aria-label="Collection pages"
  >
    <AButton
      variant="secondary"
      aria-label="Previous page"
      isDisabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
    >
      Previous
    </AButton>
    <span className="text-sm text-muted">
      Page {currentPage} of {pageCount}
    </span>
    <AButton
      variant="secondary"
      aria-label="Next page"
      isDisabled={currentPage === pageCount}
      onClick={() => onPageChange(currentPage + 1)}
    >
      Next
    </AButton>
  </nav>
);
