import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export const Table = ({
  data: tableData,
  columns: tableColumns,
  title,
  onDelete,
}) => {
  const [data, setTableData] = useState(tableData);
  const columns = useMemo(() => tableColumns, [tableColumns]);

  // const localStorageKeys = Object.keys(localStorage);

  const handleDelete = (row) => {
    const delData = data.filter((tbd) => {
      return row.id !== tbd.id;
    });
    setTableData(delData);
    onDelete(row);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div>{title && <h3>{title}</h3>}</div>{" "}
      <MDBTable hover>
        <MDBTableHead className="tableheader">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan} scope="col">
                    {header.isPlaceholder ? null : (
                      <div>
                        <span>
                          <b>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </b>
                        </span>
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </MDBTableHead>
        <MDBTableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} onClick={() => console.log(row.original)}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      <Link to="/placedetails" state={{ data: row.original }}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Link>
                    </td>
                  );
                })}

                <td>
                  <button className="tablebtn">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: "#c1aa93" }}
                    />
                  </button>

                  <button
                    className="tablebtn"
                    onClick={() => handleDelete(row.original)}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#c1aa93" }}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};
