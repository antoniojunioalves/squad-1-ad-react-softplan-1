import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../store/ducks/error";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils";
const Item = props => {
  const filteredErrors = useSelector(({ error: { filteredErrors } }) => filteredErrors);
  const dispatch = useDispatch()

  const setSelected = key => {
    filteredErrors.forEach(item => {
      if (item._id === key) {
        item.selected = !item.selected;
      };
    });
    let items = filteredErrors.filter(e => e);
    dispatch(Actions.updateFilteredErrors(items));
  };

  const handleChange = () => {
    setSelected(props.item._id);
  };

  const goToErrorPage = () => {
    props.history.push(`./error-details/${props.item._id}`);
  };

  return (
    <tr>
      <th scope="row" style={{ cursor: "pointer" }}>
        <Form.Check
          inline
          type="checkbox"
          value={props.item.selected}
          checked={props.item.selected}
          onChange={() => handleChange()}
        />
      </th>
      <td onClick={goToErrorPage}>{props.item.level}</td>
      <td onClick={goToErrorPage} className="" style={{wordBreak: "break-all"}}>
        <div>{props.item.description.title}</div>
        <div>{props.item.origin}</div>
        <div>{formatDate(props.item.lastOccurrence.date)}</div>
      </td>
      <td onClick={goToErrorPage}>{props.item.occurrences}</td>
    </tr>
  );
};

export default Item;
