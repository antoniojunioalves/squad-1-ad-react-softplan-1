import React from "react";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../store/ducks/error";
import { useSelector } from "react-redux";
import SelectedList from "./SelectedList";

const SimpleFilters = ({ classname }) => {

  const allErrors = useSelector(({ error: { allErrors } }) => allErrors);
  const filteredErrors = useSelector(({ error: { filteredErrors } }) => filteredErrors);
  const dispatch = useDispatch(); 

  const changeAmbiente = filterAmbiente => {
    const filters = {
      "Produção": "production",
      "Homologação": "homologation",
      "Dev": "development"
    };
    const filter = filters[filterAmbiente];
    let items = allErrors;
    if (filter) items = items.filter(e => e.environment === filter);
    dispatch(Actions.updateFilteredErrors(items));
  };

  const changeOrderBy = orderBy => {
    switch (orderBy) {
      case "Frequência":
        filteredErrors.sort((a, b) => a.occurrences - b.occurrences);
        break;
      case "Level":
        filteredErrors.sort((a, b) => a.level.localeCompare(b.level));
        break;
      default:
        filteredErrors.sort((a, b) => (
          new Date(b.lastOccurrence.date) - new Date(a.lastOccurrence.date))
        );
    }
    const items = filteredErrors.filter(e => e);
    dispatch(Actions.updateFilteredErrors(items));
  };

  return (
    <div className="d-flex flex-row">
      <SelectedList
        title="Origem"
        options={["Todas", "Produção", "Homologação", "Dev"]}
        handleChange={changeAmbiente}
        classname={classname}
      />
      <SelectedList
        title="Ordenar"
        options={["Data", "Level", "Frequência"]}
        handleChange={changeOrderBy}
        classname={classname}
      />
    </div>
  );
}

export default SimpleFilters;
