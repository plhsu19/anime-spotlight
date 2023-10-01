import axios, { AxiosInstance } from 'axios';
import { AnimeResponse, AnimesResponse, DeleteAnimeRespone } from '@/types/anime-api-service-types';
import { AnimeFields } from '@/types/animes';

class AnimesApiService {
  private restClient: AxiosInstance;
  private static TIMEOUT: number = 30000;
  // move host host to .env
  private static DEVELOPMENT_BASE_URL: string = 'http://localhost:8080';
  private static PRODUCTION_BASE_URL: string = 'http://production-host';
  private static URL: string = '/animes';

  constructor() {
    this.restClient = axios.create({
      baseURL:
        process.env.NODE_ENV === 'development'
          ? AnimesApiService.DEVELOPMENT_BASE_URL
          : AnimesApiService.PRODUCTION_BASE_URL,
      timeout: AnimesApiService.TIMEOUT,
    });
  }

  // get anime list
  public async getAnimes(): Promise<AnimesResponse> {
    const response = await this.restClient.get(`${AnimesApiService.URL}`);
    return response.data;
  }

  // get anime by id
  public async getAnimeById(id: number): Promise<AnimeResponse> {
    const response = await this.restClient.get(`${AnimesApiService.URL}/${id}`);
    return response.data;
  }

  // create anime
  public async createAnime(animeFields: AnimeFields): Promise<AnimeResponse> {
    const response = await this.restClient.post(
      `${AnimesApiService.URL}`,
      animeFields,
    );
    return response.data;
  }

  // update anime by id
  public async updateAnime(
    id: number,
    animeFields: AnimeFields,
  ): Promise<AnimeResponse> {
    const response = await this.restClient.post(
      `${AnimesApiService.URL}/${id}`,
      animeFields,
    );
    return response.data;
  }

  // delete anime by id
  public async deleteAnimeById(id: number): Promise<DeleteAnimeRespone> {
    const response = await this.restClient.delete(`${AnimesApiService.URL}/${id}`);
    return response.data;
  }
}

const animesApiService = new AnimesApiService();

export default animesApiService;
