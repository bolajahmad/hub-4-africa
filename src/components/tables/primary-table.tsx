/* eslint-disable react/jsx-key */
import { lowerCase } from 'lodash';
import React from 'react';
import { TableInstance, TableOptions, useTable } from 'react-table';
import styled from 'styled-components';
import { useWindowDimensions } from '../../utils';

const Wrapper = styled.div<{
  width: number;
  breakpoint?: number;
}>`
  table {
    font-weight: bold;
    border-collapse: collapse;
    border-spacing: 0 5px;
    width: 100%;
  }

  th,
  td {
    text-align: left;
    padding: 15px;
    text-transform: capitalize;
    border-top: 1px solid #eaeaea;

    &:first-child {
      padding-left: 30px;
    }

    &:last-child {
      padding-right: 30px;
    }
  }

  th {
    opacity: 0.5;
    vertical-align: middle !important;
    border-color: transparent !important;

    &:first-child {
      border-top-left-radius: 8px;
    }

    &:last-child {
      border-top-right-radius: 8px;
    }
  }

  tr:last-child {
    td {
      &:first-child {
        border-bottom-left-radius: 8px;
      }

      &:last-child {
        border-bottom-right-radius: 8px;
      }
    }
  }

  thead tr {
    background: white;
  }

  tbody tr {
    background-color: white;
  }
`;

interface Props<T extends object> extends TableOptions<T> {
  collectionName: string;
  breakpoint?: number;
}

export const PrimaryTable = function <T extends object = any>({ collectionName, columns, data, breakpoint }: Props<T>) {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows }: TableInstance<any> = useTable({
    columns,
    data,
  });
  const { width } = useWindowDimensions();

  return (
    <Wrapper width={width} breakpoint={breakpoint}>
      {data.length > 0 ? (
        <React.Fragment>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, i) => (
                    <th {...column.getHeaderProps()}>
                      <div>
                        <b>{column.render('Header')}</b>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={i}>
                    {row.cells.map((cell, j) => {
                      return (
                        <td {...cell.getCellProps()} key={j}>
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </React.Fragment>
      ) : (
        <span>There are no {lowerCase(collectionName)}.</span>
      )}
    </Wrapper>
  );
};
