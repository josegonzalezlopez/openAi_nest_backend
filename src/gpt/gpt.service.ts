import { Injectable } from '@nestjs/common';
import { orthographyUseCase } from './use-cases/orthography.use-cases';
import { OrthographyDto } from './dtos/orthography.dto';
import OpenAI from 'openai';

@Injectable()
export class GptService {

    private openAi = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })
    async orthographyCheck(orthographyDto: OrthographyDto){
        return await orthographyUseCase(this.openAi, { prompt: orthographyDto.prompt });
    }
}


