export interface Movie {
    id: number;
    url: string;
    imdb_code: string;
    title: string;
    title_english: string;
    title_long: string;
    slug: string;
    year: number;
    rating: number;
    runtime: number;
    genres?: (string)[] | null;
    download_count: number;
    like_count: number;
    description_intro: string;
    description_full: string;
    yt_trailer_code: string;
    language: string;
    mpa_rating: string;
    background_image: string;
    background_image_original: string;
    small_cover_image: string;
    medium_cover_image: string;
    large_cover_image: string;
    medium_screenshot_image1: string;
    medium_screenshot_image2: string;
    medium_screenshot_image3: string;
    large_screenshot_image1: string;
    large_screenshot_image2: string;
    large_screenshot_image3: string;
    cast?: (CastEntity)[] | null;
    torrents?: (TorrentsEntity)[] | null;
    date_uploaded: string;
    date_uploaded_unix: number;
}
export interface CastEntity {
    name: string;
    character_name: string;
    url_small_image: string;
    imdb_code: string;
}
export interface TorrentsEntity {
    url: string;
    hash: string;
    quality: string;
    type: string;
    seeds: number;
    peers: number;
    size: string;
    size_bytes: number;
    date_uploaded: string;
    date_uploaded_unix: number;
}
