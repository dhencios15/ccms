export {};
// import React from "react";
// import { createStyles, Table, ScrollArea } from "@mantine/core";
// import { useTable, Column } from "react-table";

// const useStyles = createStyles((theme) => ({
//   header: {
//     position: "sticky",
//     top: 0,
//     backgroundColor:
//       theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
//     transition: "box-shadow 150ms ease",

//     "&::after": {
//       content: '""',
//       position: "absolute",
//       left: 0,
//       right: 0,
//       bottom: 0,
//       borderBottom: `1px solid ${
//         theme.colorScheme === "dark"
//           ? theme.colors.dark[3]
//           : theme.colors.gray[2]
//       }`,
//     },
//   },

//   scrolled: {
//     boxShadow: theme.shadows.sm,
//   },
// }));

// export type DataTableProps<Data extends object> = {
//   data: Data[];
//   columns: Column<Data>[];
//   height?: string;
// };

// export function MainTable<Data extends object>({
//   data,
//   columns,
//   height = "70vh",
// }: DataTableProps<Data>) {
//   const { classes, cx } = useStyles();
//   const [scrolled, setScrolled] = React.useState(false);

//   const { getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
//     columns,
//     data,
//   });

//   return (
//     <ScrollArea
//       sx={{ height }}
//       onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
//     >
//       <Table striped verticalSpacing='sm' sx={{ minWidth: 700 }}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr
//               className={cx(classes.header, { [classes.scrolled]: scrolled })}
//               {...headerGroup.getHeaderGroupProps()}
//             >
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>
//                   {column.render("Header")}
//                   {/* Render the columns filter UI */}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row, i) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => {
//                   return (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </Table>
//     </ScrollArea>
//   );
// }
