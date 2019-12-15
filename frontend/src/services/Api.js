import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import { getUser, setUser } from "./Auth.js";

const cache = setupCache({
  maxAge: 15 * 60 * 1000
});

const API = axios.create({
  baseURL: "http://localhost:3030",
  adapter: cache.adapter
});

const getConfig = () => {
  let config = {
    headers: {
      Authorization: `bearer ${getUser().authtoken}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Allow-Headers":
        "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    }
  };
  return config;
};

const getErrors = async load => {
  let config = getConfig();
  try {
    const { data } = await API.get("/logs/", config);
    data.forEach(item => {
      item.selected = false;
    });
    load(data);
    return data;
  } catch (error) {
    console.log("Erro ao buscar os itens da lista: ", error);
    return [];
  }
};

const getErrorById = async (id, remove) => {
  let config = getConfig();
  try {
    const { data } = await API.get(`/logs/${id}`, config);
    return data;
  } catch (error) {
    console.log("Erro ao buscar os detalhes do erro: ", error);
    return [];
  }
};

const deleteError = async (id, remove) => {
  let config = getConfig();
  try {
    await API.delete(`/logs/${id}`, config);
    remove(id);
    return true;
  } catch (error) {
    console.log("Erro ao deletar o erro: ", error);
    return false;
  }
};

const archiveError = async (id, archive) => {
  let config = getConfig();
  try {
    await API.put(`/logs/${id}/archive`, [], config);
    archive(id);
    return true;
  } catch (error) {
    console.log("Erro ao arquivar o erro: ", error);
    return false;
  }
};

const createNewUser = async (name, email, password) => {
  let config = getConfig();
  try {
    var payLoad = `{"name": \"${name}\","email": \"${email}\","password": \"${password}\"}`;
    await API.post(`/users`, payLoad, config);
    return true;
  } catch (error) {
    console.log("Erro ao cadastrar novo usuário: ", error);
    return false;
  }
};

const loginUser = async (email, password) => {
  let config = getConfig();
  try {
    var payLoad = `{"email": \"${email}\","password": \"${password}\"}`;
    var { data } = await API.post(`/sessions`, payLoad, config);
    await setUser(data);
    return true;
  } catch (error) {
    console.log("Erro ao fazer o login: ", error);
    return false;
  }
};

export {
  getErrors,
  getErrorById,
  deleteError,
  archiveError,
  createNewUser,
  loginUser
};
