import AXIOS from "../Config/Axios";
import headers from "../helpers/headers";
import Prefix from "../Config/ApiPrefix";

const Product = {
  getAll() {
    return AXIOS.get(`${Prefix.api}/category`, { headers: headers() });
  },
  create(data) {
    return AXIOS.post(
      `${Prefix.api}/category`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  get(id) {
    return AXIOS.get(`${Prefix.api}/category/${id}`, { headers: headers() });
  },
  update(data) {
    return AXIOS.put(
      `${Prefix.api}/category/${data.id}`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  remove(id) {
    return AXIOS.delete(`${Prefix.api}/category/${id}`, { headers: headers() });
  }
};

export default Product;
