import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../store/ducks/error";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SelectedList from "./SelectedList";
import {
  Button,
  FormControl,
  Form
} from "react-bootstrap";

const SearchForm = () => {

  const allErrors = useSelector(({ error: { allErrors } }) => allErrors);
  const dispatch = useDispatch(); 
  
  const [filtro, setFiltro] = useState("");
  const [searchBy, setSearchBy] = useState("");

  const changeSearchBy = searchBy => setSearchBy(searchBy);

  const applyFilter = filter => {
    let items = []
    if (filter) {
      const pattern = new RegExp(filter.trim(), "i");
      switch (searchBy) {
        case "Level":
          items = allErrors.filter(item => item.level.match(pattern));
          break;
        case "Origem":
          items = allErrors.filter(item => item.environment.match(pattern));
          break;
        case "Descrição":
          items = allErrors.filter(item => {
            return (
              (item.description && item.description.title.match(pattern)) ||
              (item.description && item.description.stacktrace.match(pattern))
            );
          });
          break;
        default:
          items = allErrors.filter(item => {
            return (
              (item.description && item.description.title.match(pattern)) ||
              (item.description && item.description.stacktrace.match(pattern)) ||
              (item.environment.match(pattern)) ||
              (item.level.match(pattern)) ||
              (item.occurrences.toString().match(pattern))
            );
          });
      }
      dispatch(Actions.updateFilteredErrors(items));
    } else {
      dispatch(Actions.updateFilteredErrors(allErrors));
    }
  };

  const handleSubmit = (event, filter) => {
    event.preventDefault();
    event.stopPropagation();
    applyFilter(filter);
  };

  const handleChange = event => {
    event.preventDefault();
    setFiltro(event.target.value);
  };

  return (
    <div className="d-flex flex-row">
      <SelectedList
        title="Buscar"
        options={["Todos", "Level", "Descrição", "Origem"]}
        handleChange={changeSearchBy}
        classname="p2 pr-1"
      />
      <Form noValidate onSubmit={(e) => handleSubmit(e, filtro)}>
        <FormControl
          placeholder="Filtrar por..."
          value={filtro}
          onChange={handleChange}
        />
      </Form>
      <Button variant="light" className="ml-1" onClick={(e) => handleSubmit(e, filtro)}>
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </div>
  );
};

export default SearchForm;
