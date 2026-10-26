import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  async criar(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.criar(createProdutoDto);
  }

  @Get()
  async listar() {
    return this.produtosService.listar();
  }

  @Get(':id')
  async buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.produtosService.buscarPorId(id);
  }

  @Patch(':id')
  async atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: Partial<CreateProdutoDto>,
  ) {
    return this.produtosService.atualizar(id, dados);
  }

  @Delete(':id')
  async remover(@Param('id', ParseIntPipe) id: number) {
    return this.produtosService.remover(id);
  }
}