import React from "react";
import { Grid, GridCellProps, GridColumn } from "@progress/kendo-react-grid";

import { getPositions } from "../services/dataService";
import Loading from "../layout/Loading";
import { Position } from "../data/models";

const NumberCell = (props: GridCellProps) => {
  const field = props.field || "";
  const startingValue = props.dataItem[field];
  let finalValue = (startingValue / 1000000).toFixed(2) + "M";
  if (startingValue > 1000000000) {
    finalValue = (startingValue / 1000000000).toFixed(2) + "B";
  }

  return <td>{finalValue}</td>
}

const ChangeCell = (props: GridCellProps) => {
  const value = props.dataItem[props.field || ""];
  return (
    <td style={{ color: value > 0 ? "green" : "red" }}>
      {value}%
    </td>
  )
}


export default function PositionsPanel() {
  const [positions, setPositions] = React.useState<Position[]>();

  React.useEffect(() => {
    getPositions().then((data: Position[]) => {
      setPositions(data);
    });
  }, []);

  return (
    <>
      {!positions && <Loading />}
      <Grid
        data={positions}
        style={{ opacity: positions ? "1" : "0" }}
      >
        <GridColumn title="Symbol" field="symbol" locked={true} width={100} />
        <GridColumn title="Name" field="name" />
        <GridColumn title="Change" field="day_change" cell={ChangeCell} />
        <GridColumn title="% Change" field="change_pct" cell={ChangeCell} />
        <GridColumn title="Volume" field="volume" cell={NumberCell} />
        <GridColumn title="Market Cap" field="market_cap" cell={NumberCell} />
      </Grid>
    </>
  )
}
