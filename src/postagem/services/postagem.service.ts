import { TemaService } from './../../tema/services/tema.services';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DeleteResult, ILike, Repository } from "typeorm"
import { Postagem } from "../entities/postagem.entity"

@Injectable()
export class PostagemService{
    postagem: any;
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository <Postagem>,
        private TemaService: TemaService
    ){}

    async findAll(): Promise <Postagem[]>{
        return await this.postagemRepository.find({
            relations:{
                tema: true,
                usuario: true
            }
    })

    }

    
    async findById(id: number): Promise <Postagem> {
       let Postagem = await this.postagemRepository.findOne({
            where:{
                id
            },
            relations:{
                tema: true,
                usuario: true
            }
        });

        if (!Postagem)
            throw new HttpException ('Postagem não encontrada', HttpStatus.NOT_FOUND);
        return  Postagem;
    }


    async findByTitulo(titulo: string): Promise <Postagem[]> {
        return await this.postagemRepository.find({
            where:{
                titulo:ILike(`%${titulo}%`)
            },
            relations:{
                tema: true,
                usuario: true

            }
        });

    }

     async create(Postagem: Postagem): Promise <Postagem> {
        if (this.postagem.tema){
            let tema = await this.TemaService.findById(Postagem.tema.id)
        if (!tema)
        throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND)
        }
        return await this.postagemRepository.save(Postagem);
    }


    async update(postagem: Postagem): Promise <Postagem> {
        let buscaPostagem: Postagem = await this.findById(postagem.id);

        if(!buscaPostagem || !postagem.id)
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);

        if (postagem.tema){

            let tema = await this.TemaService.findById(postagem.tema.id)

            if (!tema)
                throw new HttpException ('Tema não encontrado', HttpStatus.NOT_FOUND);
            return await this.postagemRepository.save(postagem);
        }
    }

    async delete(id: number): Promise <DeleteResult>{
        let buscaPostagem = await this.findById(id);

        if (!buscaPostagem)
        throw new HttpException(' Postagem não encontrada', HttpStatus.NOT_FOUND);
        return await this.postagemRepository.delete(id)
    }





}
