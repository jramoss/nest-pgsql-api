import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';

@Controller('/')
export class AppController {
    @Get()
    show(): string {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    @Get(':id')
    
    async findOne(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
    ) {
    return `teste${id}`;
    }   
}
