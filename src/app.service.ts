import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  
  dbConfig: string;

  constructor(private configService: ConfigService) {
    this.dbConfig = this.configService.get('database');
  }

  getHello(): string {
    return this.dbConfig;    
  }
}
