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
    border-collapse: separate;
    border-spacing: 0 5px;
  }

  th,
  td {
    padding: 15px 0 15px 30px;
    vertical-align: middle !important;
    border-color: transparent !important;

    :first-child {
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    }

    :last-child {
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      padding-right: 15px;
    }
  }

  thead tr {
    background: #f0f2f7;
  }

  tbody tr:nth-child(2n) {
    background: white;
  }
`;

interface Props<T extends object> extends TableOptions<T> {
  collectionName: string;
  breakpoint?: number;
}

export const PrimaryTable = function <T extends object = any>({
  collectionName,
  columns,
  data,
  breakpoint,
}: Props<T>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  }: TableInstance<any> = useTable({
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
