import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(private readonly prisma: PrismaService) {}

  async criar(dto: CreateProdutoDto) {
    const { categoriaId, ...dadosProduto } = dto;
    return this.prisma.produto.create({
      data: {
        ...dadosProduto,
        categoria: {
          connect: { id: categoriaId },
        },
      },
      include: { categoria: true },
    });
  }

  async listar() {
    return this.prisma.produto.findMany({
      include: { categoria: true },
    });
  }

  async buscarPorId(id: number) {
    return this.prisma.produto.findUnique({
      where: { id },
      include: { categoria: true },
    });
  }

  async atualizar(id: number, dto: UpdateProdutoDto) {
    const { categoriaId, ...dadosProduto } = dto;
    return this.prisma.produto.update({
      where: { id },
      data: {
        ...dadosProduto,
        ...(categoriaId && {
          categoria: {
            connect: { id: categoriaId },
          },
        }),
      },
      include: { categoria: true },
    });
  }

  async remover(id: number) {
    return this.prisma.produto.delete({
      where: { id },
    });
  }
}