import axs from "../http-common";

const getAll = () => {
  return axs.http.get("/Product");
};

const get = id => {
  return axs.http.get(`/Product/${id}`);
};

const create = data => {
  return axs.securehttp.post("/Product", data);
};

const update = (id, data) => {
  return axs.securehttp.put(`/Product/${id}`, data);
};

const remove = id => {
  return axs.securehttp.delete(`Product/${id}`);
};

const removeAll = () => {
  return axs.securehttp.delete(`/Product`);
};

const findByTitle = title => {
  return axs.http.get(`/Product?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};
