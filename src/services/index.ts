class ServiceAPI {
  protected static url = import.meta.env.VITE_API_BASE_URL;

  private static get headers() {
    const token = localStorage.getItem('token');

    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  private static async parseMessage(response: Response) {
    const text = await response.json();

    if (typeof text.message === 'string') return text.message;
    else return text.message[0];
  }

  protected static async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.url}${path}`, {
      headers: this.headers, //
    });

    if (!response.ok) {
      throw await this.parseMessage(response);
    }

    return await response.json();
  }

  protected static async post<T, K>(path: string, body: T): Promise<K> {
    const response = await fetch(`${this.url}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.headers,
    });

    if (!response.ok) {
      throw await this.parseMessage(response);
    }

    return await response.json();
  }
}

export default ServiceAPI;
