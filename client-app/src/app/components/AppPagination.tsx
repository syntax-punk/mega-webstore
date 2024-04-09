import { Box, Typography, Pagination } from "@mui/material";
import { Metadata } from "../models/pagination";
import { useState } from "react";

interface Props {
  metadata: Metadata;
  onPageChange: (page: number) => void;
}

function AppPagination({ metadata, onPageChange }: Props) {
  const {currentPage, pageSize, totalCount, totalPages} = metadata;
  const [pageNumber, setPageNumber] = useState(currentPage);

  function handlePageChange(page: number) {
    setPageNumber(page);
    onPageChange(page);
  }

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
        page={pageNumber} 
        onChange={(_, page) => handlePageChange(page)}/>
    </Box>
  );
}

export { AppPagination }