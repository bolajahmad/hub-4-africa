import { StorageService } from '../services';
import { StorageEnums } from '../utils';

/* eslint-disable no-unused-vars */
export type QueryParams = Record<string, any>;

export interface ApiResponse<T = never> {
  success: boolean;
  statusCode: number;
  message: string;
  payload?: T;
}

interface ApiRequest<T = any> {
  body?: T;
  query?: QueryParams;
  model?: T;
}

export enum HttpMethods {
  Get = 'GET',
  Post = 'POST',
  Patch = 'PATCH',
  Delete = 'DELETE',
  Put = 'PUT',
}

function logRequests<R, T>(
  method: HttpMethods,
  endpoint: string,
  response: ApiResponse<R>,
  isError: boolean,
  request?: T
) {
  const styles = `
        color: ${isError ? 'red' : 'green'};
        font-weight: bold;
        font-size: 14px;
        letter-spacing: 1px;
    `;
  if (process.env.NODE_ENV !== 'production') {
    console.log(`%c Made [${method}] API call to [${endpoint}]:`, styles, {
      request,
      response,
    });
  }
}

export class ApiClient {
  private static abortController = new AbortController();
  private static sessionTimeout: NodeJS.Timeout | null = null;

  private static extractToken() {
    const token = StorageService.getFromLocal<string>(StorageEnums.AUTH_TOKEN)!;
    return token;
  }

  public static getBearerToken() {
    return `Bearer ${this.extractToken()}`;
  }

  public static getFetchConfig(formData?: boolean) {
    const host = `${window.location.protocol}//${window.location.host}`;

    const headers: Headers = new Headers();

    if (!formData) {
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
    }
    if (this.extractToken()) {
      headers.append('Authorization', this.getBearerToken());
    }

    const corsOptions: Partial<RequestInit> = {
      mode: 'cors',
    };

    const isOrigin = process.env.REACT_APP_ROOT_URL === host;

    const options: RequestInit = {
      headers,
      signal: this.abortController.signal,
      ...(isOrigin ? {} : corsOptions),
    };

    return options;
  }

  public static setToken(token: string) {
    StorageService.setToLocal(StorageEnums.AUTH_TOKEN, token);
  }

  public static unsetToken() {
    StorageService.removeFromLocal([
      StorageEnums.AUTH_TOKEN,
      StorageEnums.TOKEN_DETAILS,
    ]);
    this.abort();
  }

  private static async requestType<ResponseType = any, RequestType = any>(
    method: HttpMethods,
    endpoint: string,
    request?: ApiRequest<RequestType>,
    isFormData?: boolean
  ): Promise<ApiResponse<ResponseType>> {
    this.abortController = new AbortController();
    const base = process.env.REACT_APP_BASE_URL;
    this.extractToken();
    this.resetSessionTimeout();

    const requestContent: { body?: string | FormData } = {};

    if (request && request.query) {
      const query = Object.entries(request.query)
        .filter(([_, value]) => value)
        .map(([field, value]) => field + '=' + value)
        .join('&');
      endpoint += query ? '?' + query : '';
    }

    if (request && request.body) {
      if ('finalize' in request.body) {
        (request.body as any).finalize();
      }

      requestContent.body = isFormData
        ? (request.body as unknown as FormData)
        : JSON.stringify(request.body);
    }

    try {
      const options: RequestInit = {
        ...this.getFetchConfig(isFormData),
        method,
        ...requestContent,
      };

      const response = await fetch(base + endpoint, options);
      let responseContent: ApiResponse<ResponseType>;
      try {
        responseContent = (await response.json()) as ApiResponse<ResponseType>;
      } catch (error) {
        throw new Error('Invalid response');
      }
      logRequests<ResponseType, RequestType>(
        method,
        endpoint,
        responseContent,
        !response.ok,
        request?.body
      );

      if (response.status >= 400 && response.status !== 401) {
        throw responseContent;
      }

      if (response.status === 401) {
      }

      if (!response.ok) {
        throw responseContent;
      }

      return responseContent;
    } catch (error) {
      throw error;
    }
  }

  public static abort() {
    this.abortController.abort();
    this.cancelTimeout();
  }

  public static resetSessionTimeout() {
    if (this.sessionTimeout) clearTimeout(this.sessionTimeout);
    if (this.extractToken()) {
      const TIMEOUT_DURATION =
        process.env.NODE_ENV === 'development' ? 5 * 2000 * 200 : 5 * 60 * 1000; // 5 Minutes
      this.sessionTimeout = setTimeout(() => {
        this.abort();
      }, TIMEOUT_DURATION);
    }
  }

  public static cancelTimeout() {
    if (this.sessionTimeout) clearTimeout(this.sessionTimeout);
    this.sessionTimeout = null;
  }

  public static get<T>(endpoint: string, query?: QueryParams) {
    return this.requestType<T>(
      HttpMethods.Get,
      endpoint,
      query ? { query } : undefined
    );
  }

  public static post<RequestType, ResponseType = any>(
    endpoint: string,
    body?: RequestType,
    isFormData?: boolean
  ) {
    return this.requestType<ResponseType>(
      HttpMethods.Post,
      endpoint,
      { body },
      isFormData
    );
  }

  public static patch<RequestType, ResponseType = RequestType>(
    endpoint: string,
    body?: RequestType,
    isFormData?: boolean
  ) {
    return this.requestType<ResponseType, RequestType>(
      HttpMethods.Patch,
      endpoint,
      { body },
      isFormData
    );
  }

  public static put<RequestType = any, ResponseType = RequestType>(
    endpoint: string,
    body: RequestType,
    isFormData?: boolean
  ) {
    return this.requestType<ResponseType, RequestType>(
      HttpMethods.Put,
      endpoint,
      { body },
      isFormData
    );
  }

  public static delete<T = any>(endpoint: string) {
    return this.requestType<T>(HttpMethods.Delete, endpoint);
  }
}

// ApiClient.resetSessionTimeout();
