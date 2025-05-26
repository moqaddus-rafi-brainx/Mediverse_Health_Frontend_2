/* eslint-disable react/prop-types */
/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo, useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonSelect from "components/ArgonSelect";
import ArgonInput from "components/ArgonInput";
import ArgonPagination from "components/ArgonPagination";
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 PRO MUI example components
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";
import FilterIcon from "../../../assets/icons/Filter.svg";
import "./DataTable.css";
import { Box, Collapse, TableCell, TableHead, Typography } from "@mui/material";
import _ from "lodash";

function DataTable({
  entriesPerPage,
  totalEntries,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
  setEntriesPerPage,
  setSearch,
  setPageNo,
  pageNo,
  totalPages,
  search,
  spinner,
  canFilter,
  showFilter,
  customWidth,
  cellWidth,
  custom,
  nestedRowObject,
  open,
  additionalRow,
  additionalData,
  typeFilter,
  handleFilter,
  setBounceSearch,
}) {
  const defaultValue = entriesPerPage;
  const entries = entriesPerPage.entries ? entriesPerPage.entries : [5, 10, 15, 20, 25];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);
  const pageOptions = Array.from({ length: totalPages }, (_, index) => index + 1);

  const tableInstance = useTable(
    { columns, data, initialState: { page: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows, page, setPageSize } =
    tableInstance;

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(entriesPerPage || 5), [entriesPerPage]);

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <ArgonPagination item key={option} onClick={() => setPageNo(option)} active={pageNo === option}>
      {option}
    </ArgonPagination>
  ));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart = pageNo === 0 ? pageNo : pageNo * entriesPerPage + 1 - entriesPerPage;
  // Setting the entries ending point
  let entriesEnd = pageNo * entriesPerPage < totalEntries ? pageNo * entriesPerPage : totalEntries;

  // const debouncedSearch = _.debounce((value) => {
  //   setSearch(value);
  // }, 100);

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setBounceSearch(search);
  //   }, 500);

  //   // Cleanup timeout if value changes (also on unmount)
  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [search]);

  return (
    <TableContainer sx={{ boxShadow: "none", overflow: "visible" }}>
      {entriesPerPage || canSearch ? (
        <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          {entriesPerPage && !custom && (
            <ArgonBox display="flex" alignItems="center">
              <ArgonBox width="25%">
                <ArgonSelect
                  defaultValue={{ value: defaultValue, label: defaultValue }}
                  options={entries.map((entry) => ({ value: entry, label: entry }))}
                  onChange={({ value }) => setEntriesPerPage(value)}
                  size="small"
                />
              </ArgonBox>
              <ArgonTypography variant="caption" color="secondary">
                &nbsp;&nbsp;entries per page
              </ArgonTypography>
            </ArgonBox>
          )}
          {canSearch && (
            <ArgonBox width="12rem" ml="auto">
              <ArgonInput
                placeholder="Search by name or ID..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </ArgonBox>
          )}
          {typeFilter && handleFilter()}
          {canFilter && (
            <button onClick={showFilter} className="filterButton">
              <img src={FilterIcon} alt="img" />
              &nbsp; Filter
            </button>
          )}
        </ArgonBox>
      ) : null}
      {spinner ? (
        <></>
      ) : (
        <Table {...getTableProps()}>
          <ArgonBox component="thead">
            {headerGroups.map((headerGroup, key) => (
              <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <DataTableHeadCell
                    key={index}
                    {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                    width={column.width ? column.width : "auto"}
                    align={column.align ? column.align : "space-between"}
                    sorted={setSortedValue(column)}
                    cellWidth={cellWidth}
                  >
                    {column.render("Header")}
                  </DataTableHeadCell>
                ))}
              </TableRow>
            ))}
          </ArgonBox>
          {rows.length ? (
            <>
              <TableBody {...getTableBodyProps()}>
                {page.map((row, key) => {
                  prepareRow(row);
                  return (
                    <>
                      <TableRow key={key} {...row?.getRowProps()}>
                        {row.cells.map((cell, index) => (
                          <DataTableBodyCell
                            key={index}
                            noBorder={noEndBorder && rows.length - 1 === key}
                            align={cell.column.align ? cell.column.align : "space-between"}
                            customWidth={customWidth ? true : false}
                            {...cell.getCellProps()}
                            cellWidth={cellWidth}
                          >
                            {cell.render("Cell")}
                          </DataTableBodyCell>
                        ))}
                      </TableRow>
                      {nestedRowObject ? (
                        <TableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse
                              in={open && open === row?.original?._id}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box sx={{ backgroundColor: "#F2F8FE !important" }}>
                                <Table {...getTableProps()}>
                                  <TableRow key={key} {...row?.getRowProps()}>
                                    {Object.keys(row?.original?.[nestedRowObject]?.[0] || [])?.map(
                                      (header) => (
                                        <DataTableHeadCell key={header}>{header}</DataTableHeadCell>
                                      )
                                    )}
                                  </TableRow>
                                  {row?.original?.[nestedRowObject]?.map((nestedRow, index) => (
                                    <TableRow key={index}>
                                      {Object.values(nestedRow).map((cell) => (
                                        <DataTableBodyCell key={cell}>{cell}</DataTableBodyCell>
                                      ))}
                                    </TableRow>
                                  ))}
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
              </TableBody>
            </>
          ) : (
            <>
              <div className="no-records">No Records Found</div>
            </>
          )}
        </Table>
      )}
      {additionalRow && <div className="total-vehicle">{additionalData}</div>}

      <ArgonBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
        mt={additionalRow ? 3 : 0}
      >
        {showTotalEntries && !custom && (
          <ArgonBox mb={{ xs: 3, sm: 0 }}>
            <ArgonTypography variant="button" color="secondary" fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {totalEntries} entries
            </ArgonTypography>
          </ArgonBox>
        )}
        {pageOptions.length > 1 && (
          <ArgonPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            <ArgonPagination item onClick={() => setPageNo(pageNo - 1)}>
              <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
            </ArgonPagination>
            {renderPagination}
            <ArgonPagination item onClick={() => setPageNo(pageNo + 1)}>
              <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
            </ArgonPagination>
          </ArgonPagination>
        )}
      </ArgonBox>
    </TableContainer>
  );
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

// Typechecking props for the DataTable
DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};

export default DataTable;
