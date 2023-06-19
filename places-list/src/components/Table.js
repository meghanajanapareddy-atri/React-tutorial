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
import PopUpTable from "./PopUpTable";

export const Table = ({
  data: tableData,
  columns: tableColumns,
  title,
  onDelete,
  onEdit,
}) => {
  const data = useMemo(() => tableData, [tableData]);
  const columns = useMemo(() => tableColumns, [tableColumns]);
  const [open, setOpen] = useState(false);
  const [editRow, setEditRow] = useState({});

  const handleDelete = (row) => {
    onDelete(row);
  };

  const displayPopup = (row) => {
    setEditRow(row);
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
              <tr key={row.id}>
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
                  <button
                    className="tablebtn"
                    onClick={() => {
                      setOpen(true);
                      displayPopup(row.original);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: "#c1aa93" }}
                    />
                  </button>
                  {open ? (
                    <PopUpTable
                      rowdata={editRow}
                      onEdit={onEdit}
                      closePopup={() => setOpen(false)}
                    />
                  ) : null}

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
