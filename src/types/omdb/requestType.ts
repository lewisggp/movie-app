export interface OMDBTitleRequest {
    /** A valid IMDb ID */
    i?: string;
    /** Movie title to search for. */
    t?: string;
    /** Type of result to return. */
    type?: 'movie' | 'series' | 'episode';
    /** Year of release. */
    y?: number;
    /** Return short or full plot. */
    plot?: 'short' | 'full';
    /** The data type to return. */
    r?: 'json' | 'xml';
    /** JSONP callback name. */
    callback?: string;
    /** API version (reserved for future use). */
    v?: number;
}

export interface OMDBSearchRequest {
    /** Movie title to search for. */
    s: string;
    /** Type of result to return. */
    type?: 'movie' | 'series' | 'episode';
    /** Year of release. */
    y?: string;
    /** The data type to return. */
    r?: 'json' | 'xml';
    /** Page number to return. */
    page?: string;
    /** JSONP callback name. */
    callback?: string;
    /** API version (reserved for future use). */
    v?: number;
}
