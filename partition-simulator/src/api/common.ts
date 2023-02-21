const API_BASE_URL = import.meta.env.PUBLIC_PARTITION_SIM_API_URL;

export async function get<O, E = string>(endpoint: string): Promise<O> {
  return fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => err as E);
}

export async function post<I, O, E = string>(
  endpoint: string,
  body: I
): Promise<O> {
  return fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((err) => err as E);
}
