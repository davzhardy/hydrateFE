import React, { useCallback } from "react";
import classNames from "classnames";
import {
  Typography,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  withStyles
} from "@material-ui/core";

const styles = theme => ({
  tableSortLabel: {
    cursor: "text",
    userSelect: "auto",
    color: "inherit !important"
  },
  noIcon: {
    "& path": {
      display: "none !important"
    }
  },
  paddingFix: {
    paddingLeft: theme.spacing(3)
  }
});

function EnhancedTableHead(props) {
  const { order, orderBy, columns, onRequestSort, classes } = props;

  const createSortHandler = useCallback(
    property => event => {
      onRequestSort(event, property);
    },
    [onRequestSort]
  );

  return (
    <TableHead>
      <TableRow>
        {columns.map((column, index) => (
          <TableCell
            key={index}
            align={column.numeric ? "right" : "inherit"}
            padding="default"
            sortDirection={orderBy === column.name ? order : false}
            className={index === 0 ? classes.paddingFix : null}
          >
            {onRequestSort ? (
              <Tooltip
                title="Sort"
                placement={column.numeric ? "bottom-end" : "bottom-start"}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={createSortHandler(column.id)}
                >
                  <Typography variant="body2">{column.label}</Typography>
                </TableSortLabel>
              </Tooltip>
            ) : (
              <TableSortLabel
                className={classNames(classes.tableSortLabel, classes.noIcon)}
              >
                <Typography variant="body2" className={classes.label}>
                  {column.label}
                </Typography>
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default withStyles(styles, { withTheme: true })(EnhancedTableHead);
