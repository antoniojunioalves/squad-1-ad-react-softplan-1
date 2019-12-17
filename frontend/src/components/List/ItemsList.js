import React, { useState, useEffect } from "react";
import Item from "./ItemList";
import { Table, Form, Pagination } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../store/ducks/error";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

const Items = props => {
  const filteredErrors = useSelector(
    ({ error: { filteredErrors } }) => filteredErrors
  );
  const dispatch = useDispatch();

  const [selectAll, setSelectAll] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([]);
  const [activePageErros, setActivePageErros] = useState([]);
  const pageSize = 5;

  useEffect(() => {
    filteredErrors.forEach(item => {
      item.selected = selectAll;
    });
    let items = filteredErrors.filter(e => e);
    dispatch(Actions.updateFilteredErrors(items));
  }, [selectAll]); //eslint-disable-line
  // Foi desabilitado o eslint pois não é necessário ficar escutando as alterações nos métodos "dispatch" e "filteredErrors"

  const handlePageChange = (event, page) => {
    event.preventDefault();
    event.stopPropagation();
    setActivePage(page);
  };

  useEffect(() => {
    var items = filteredErrors.length;
    if (items <= pageSize) setActivePage(1);
    var pages = [];
    var quotient = Math.trunc(items / pageSize);
    var remainder = items % pageSize;
    var totalPages = quotient + (remainder > 0 ? 1 : 0);
    for (let number = 1; number <= totalPages; number++) {
      pages.push(
        <Pagination.Item
          onClick={e => handlePageChange(e, number)}
          key={number}
          active={number === activePage}
        >
          {number}
        </Pagination.Item>
      );
    }
    setPages(pages);
    var initial = (activePage - 1) * pageSize;
    var pageErrors = filteredErrors.slice(initial, initial + pageSize);
    setActivePageErros(pageErrors);
  }, [filteredErrors, activePage]);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                value={selectAll}
                checked={selectAll}
                onChange={e => setSelectAll(e.target.checked)}
              />
            </th>
            <th>Level</th>
            <th>Log</th>
            <th>{isMobile ? "#" : "Eventos"}</th>
          </tr>
        </thead>
        <tbody style={{ cursor: "pointer" }}>
          {activePageErros.map((item, idx) => {
            return (
              <Item key={idx} item={item} idx={idx} history={props.history} />
            );
          })}
        </tbody>
      </Table>
      <Pagination>{pages}</Pagination>
    </>
  );
};

export default Items;
