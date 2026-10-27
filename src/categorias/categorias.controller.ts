import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  criar(@Body() dto: CreateCategoriaDto) {
    return this.categoriasService.criar(dto);
  }

  @Get()
  listarTodas() {
    return this.categoriasService.listarTodas();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.categoriasService.buscarPorId(Number(id));
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() dto: UpdateCategoriaDto) {
    return this.categoriasService.atualizar(Number(id), dto);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.categoriasService.remover(Number(id));
  }
}