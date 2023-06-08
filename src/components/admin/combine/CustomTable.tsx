import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

type Props<T> = {
  data: T[];
  columns: (keyof T)[];
  tableCaption: string;
  controlColumn?: (args: T) => React.ReactNode;
};

const CustomTable = <T extends object>({
  data,
  columns,
  tableCaption,
  controlColumn,
}: Props<T>) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>{data.length === 0 ? tableCaption : null}</TableCaption>
        <Thead>
          <Tr>
            {columns.map((col, i) => (
              <Th key={i}>{col as string}</Th>
            ))}
            {controlColumn ? <Th isNumeric>-</Th> : null}
          </Tr>
        </Thead>
        {data.length > 0 ? (
          <Tbody>
            {data.map((d, i) => (
              <Tr key={i}>
                {columns.map((col) => (
                  <Td>
                    <Text>{d[col] as string}</Text>
                  </Td>
                ))}
                {controlColumn ? <Td isNumeric>{controlColumn(d)}</Td> : null}
              </Tr>
            ))}
          </Tbody>
        ) : null}
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
