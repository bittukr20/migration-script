import axios from "axios";
export async function request({ url, method, headers, body }) {
  try {
    const response = await axios({
      method,
      url,
      data: body,
    });
    const { status, data } = response;
    return { status_code: status, response: data, success: true };
  } catch (err) {
    const { status, data } = err.response;
    return { status_code: status, response: data, success: false };
  }
}
