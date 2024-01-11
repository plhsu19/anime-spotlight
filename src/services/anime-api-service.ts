import axios, { AxiosInstance } from 'axios';
import { AnimeResponse, AnimesResponse, DeleteAnimeRespone } from '@/types/services/anime-api-service-types';
import { AnimeFields } from '@/types/anime-types';

class AnimeApiService {
  private restClient: AxiosInstance;
  private static TIMEOUT: number = 30000;
  
  // TODO: move host URLs to .env(?) for prod/dev
  private static DEVELOPMENT_BASE_URL: string = 'http://localhost:8080';
  private static PRODUCTION_BASE_URL: string = 'http://production-host';
  private static URL: string = '/animes';

  constructor() {
    this.restClient = axios.create({
      baseURL:
        process.env.NODE_ENV === 'development'
          ? AnimeApiService.DEVELOPMENT_BASE_URL
          : AnimeApiService.PRODUCTION_BASE_URL,
      timeout: AnimeApiService.TIMEOUT,
    });
  }

  // get anime list
  public async getAnimes(): Promise<AnimesResponse> {
    const response = await this.restClient.get(`${AnimeApiService.URL}`);
    return response.data;
  }

  // get anime by id
  public async getAnimeById(id: string): Promise<AnimeResponse> {
    const response = await this.restClient.get(`${AnimeApiService.URL}/${id}`);
    return response.data;
  }

  // create new anime
  public async createAnime(animeFields: AnimeFields): Promise<AnimeResponse> {
    const response = await this.restClient.post(
      `${AnimeApiService.URL}`,
      animeFields,
    );
    return response.data;
  }

  // update anime by id
  public async updateAnime(
    id: number,
    animeFields: AnimeFields,
  ): Promise<AnimeResponse> {
    const response = await this.restClient.put(
      `${AnimeApiService.URL}/${id}`,
      animeFields,
    );
    return response.data;
  }

  // delete anime by id
  public async deleteAnimeById(id: number): Promise<DeleteAnimeRespone> {
    const response = await this.restClient.delete(`${AnimeApiService.URL}/${id}`);
    return response.data;
  }
}

const animeApiService = new AnimeApiService();

export default animeApiService;
