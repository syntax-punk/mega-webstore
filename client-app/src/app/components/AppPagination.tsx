import { Box, Typography, Pagination } from "@mui/material";
import { Metadata } from "../models/pagination";

interface Props {
  metadata: Metadata;
  onPageChange: (page: number) => void;
}

function AppPagination({ metadata, onPageChange }: Props) {
  const {currentPage, pageSize, totalCount, totalPages} = metadata;

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>
        {`Displaying 
          ${(currentPage - 1) * pageSize + 1} - 
          ${currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize } of 
          ${totalCount}`}
      </Typography>
      <Pagination 
        count={totalPages} 
        color="primary" 
        size="large" 
        page={currentPage} 
        onChange={(_, page) => onPageChange(page)}/>
    </Box>
  );
}

export { AppPagination }