import axios, { AxiosInstance } from "axios";
import JwtService from "./jwt.service";
import config from "@/ConfigProvider";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

// Define types for the ApiService instance
interface ApiServiceType {
  api1: AxiosInstance | null; // Main API
  api2: AxiosInstance | null; // Upload API
  init(): void;
  setHeader(): void;
  query<T>(resource: string, params?: object): Promise<T>;
  get<T>(resource: string, params?: { session?: string }): Promise<T>;
  post<T>(resource: string, params: object): Promise<T>;
  upload<T>(resource: string, params: File): Promise<T>;
  update<T>(resource: string, slug: string, params: object): Promise<T>;
  put<T>(resource: string, params: object): Promise<T>;
  patch<T>(resource: string, params: object): Promise<T>;
  delete<T>(resource: string): Promise<T>;
}

const ApiService: ApiServiceType = {
  api1: null,
  api2: null,

  init() {
    // Initialize both axios instances with cookie jar support
    this.api1 = wrapper(
      axios.create({
        baseURL: config.value("API_URL"), // Main API endpoint
      }),
    );

    this.api2 = wrapper(
      axios.create({
        baseURL: config.value("API_UPLOAD"), // Upload API endpoint
      }),
    );

    // Set authorization header for api1 (Main API)
    this.setHeader();
  },

  setHeader() {
    if (this.api1) {
      this.api1.defaults.headers.common["Authorization"] = `Bearer ${JwtService.getSession()}`;
    }
  },

  // Query method for main API
  async query<T>(resource: string, params?: object): Promise<T> {
    if (!this.api1) {
      return Promise.reject(new Error("ApiService is not initialized"));
    }

    return this.api1.get<T>(resource, { params })
      .then(response => response.data)
      .catch((error: any) => {
        throw new Error(`ApiService ${error}`);
      });
  },

  // GET request for main API (supports session cookies)
  async get<T>(resource: string, params?: { session?: string }): Promise<T> {
    if (!this.api1) {
      return Promise.reject(new Error("ApiService is not initialized"));
    }

    if (params?.session) {
      const cookieJar = new CookieJar();
      return this.api1.get<T>(resource, {
        jar: cookieJar,
        params,
      }).then(response => response.data);
    } else {
      return this.api1.get<T>(resource, { params })
        .then(response => response.data);
    }
  },

  // POST request for main API
  async post<T>(resource: string, params: object): Promise<T> {
    if (!this.api1) {
      return Promise.reject(new Error("ApiService is not initialized"));
    }
      const response = await this.api1.post<T>(resource, params, {
        headers: {
          "Content-Type": "application/json", // Use JSON content type for main API
        },
      });
      return response.data;
  },

  // Upload method for upload API (accepts File as parameter)
  async upload<T>(resource: string, params: object): Promise<T> {
    if (!this.api2) {
      return Promise.reject(new Error("ApiService is not initialized"));
    }

    const response = await this.api2.post<T>(resource, params, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure upload content type is correct
      },
    });

    return response.data;
  },

  // PUT request for main API
  update<T>(resource: string, slug: string, params: object): Promise<T> {
    if (!this.api1) {
      return Promise.reject(new Error("ApiService is not initialized"));
    }

    return this.api1.put<T>(`${resource}/${slug}`, params)
      .then(response => response.data)
      .catch((error: any) => {
        throw new Error(`ApiService ${error}`);
      });
  },

  // PUT request for main API with general content
  async put<T>(resource: string, params: object): Promise<T> {
    if (!this.api1) {
      return Promise.reject(new Error("ApiService is not initialized"));
    }
    
    const response = await this.api1.put<T>(resource, params, {
      headers: {
        "Content-Type": "application/json", // Use JSON content type
      },
    });

    return response.data;
  },

  // PATCH request for main API
  patch<T>(resource: string, params: object): Promise<T> {
    if (!this.api1) {
      return Promise.reject(new Error("ApiService is not initialized"));
    }

    return this.api1.patch<T>(resource, params)
      .then(response => response.data)
      .catch((error: any) => {
        throw new Error(`ApiService ${error}`);
      });
  },

  // DELETE request for main API
  delete<T>(resource: string): Promise<T> {
    if (!this.api1) {
      return Promise.reject(new Error("ApiService is not initialized"));
    }

    return this.api1.delete<T>(resource)
      .then(response => response.data)
      .catch((error: any) => {
        throw new Error(`ApiService ${error}`);
      });
  }
};

export default ApiService;
