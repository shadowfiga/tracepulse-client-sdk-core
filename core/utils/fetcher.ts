import 'cross-fetch/polyfill'

export type RecordMap<T = unknown> = Record<string, T>

export interface RequestOptions {
    headers?: RecordMap<string>
    params?: RecordMap<string | boolean | number>
}

type PreRequest = (options?: RequestOptions) => RequestOptions | undefined

export interface FetcherOptions {
    onPreRequest?: PreRequest
    baseUrl?: string
}

class Fetcher {
    private readonly onPreRequest?: PreRequest
    private readonly baseUrl?: string

    constructor(options?: FetcherOptions) {
        this.onPreRequest = options?.onPreRequest
        this.baseUrl = options?.baseUrl
    }

    public static create(options?: FetcherOptions): Fetcher {
        return new Fetcher(options)
    }

    private async makeRequest<T>(
        method: string,
        url: string,
        data?: T,
        options?: RequestOptions
    ): Promise<Response> {
        const modifiedOptions = this.onPreRequest?.(options) || options
        const parametrizedUrl = this.getUrl(url, modifiedOptions)
        const headers = modifiedOptions?.headers || {}

        if (data && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json'
        }

        const body = data ? JSON.stringify(data) : undefined

        const response = await fetch(parametrizedUrl, {
            method,
            headers,
            body,
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return response
    }

    public get(url: string, options?: RequestOptions): Promise<Response> {
        return this.makeRequest('GET', url, undefined, options)
    }

    public post<T>(
        url: string,
        data?: T,
        options?: RequestOptions
    ): Promise<Response> {
        return this.makeRequest('POST', url, data, options)
    }

    public put<T>(
        url: string,
        data?: T,
        options?: RequestOptions
    ): Promise<Response> {
        return this.makeRequest('PUT', url, data, options)
    }

    public patch<T>(
        url: string,
        data?: T,
        options?: RequestOptions
    ): Promise<Response> {
        return this.makeRequest('PATCH', url, data, options)
    }

    public delete(url: string, options?: RequestOptions): Promise<Response> {
        return this.makeRequest('DELETE', url, undefined, options)
    }

    public getUrl(url: string, options?: RequestOptions): string {
        if (!options?.params) {
            return url
        }
        const { params } = options
        const parametrizedUrl = new URL(url, this.baseUrl)
        Object.entries(params).forEach(([key, value]) =>
            parametrizedUrl.searchParams.append(key, this.paramToString(value))
        )
        return parametrizedUrl.toString()
    }

    private paramToString(param: string | boolean | number): string {
        if (typeof param === 'boolean' || typeof param === 'number') {
            return param.toString()
        }
        return param
    }
}

export default Fetcher
