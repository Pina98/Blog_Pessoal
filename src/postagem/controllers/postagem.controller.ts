import { Postagem } from '../entities/postagem.entity';
import { PostagemService } from '../services/postagem.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common"
import{ JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Postagem')
@UseGuards(JwtAuthGuard)
@Controller("/postagens")
export class PostagemController{
    constructor(private readonly postagemService: PostagemService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise <Postagem[]> {
        return this.postagemService.findAll();
    }
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe)id: number): Promise <Postagem> {
        return this.postagemService.findById(id);
    }

    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTitulo( @Param('titulo')titulo: string): Promise <Postagem[]> {
        return this.postagemService.findByTitulo(titulo);
    }
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create (@Body() Postagem: Postagem): Promise <Postagem>{
        return this.postagemService.create(Postagem);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update (@Body()postagem: Postagem): Promise <Postagem>{
        return this.postagemService.update(postagem);
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe)id: number){
        return this.postagemService.delete(id);
    }


}