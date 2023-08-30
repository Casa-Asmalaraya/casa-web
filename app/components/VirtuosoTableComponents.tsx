import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { TableComponents } from "react-virtuoso";

function VirtuosoTableComponents<T>(): TableComponents<T> {
  return {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} variant="outlined" {...props} ref={ref} />
    )),
    Table: (props) => <Table {...props} style={{ borderCollapse: "separate" }} />,
    TableHead: TableHead,
    TableRow: (props) => <TableRow {...props} hover />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };
}

export default VirtuosoTableComponents;
